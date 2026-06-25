import azure.functions as func
import logging
import pandas as pd
import numpy as np
import json
import os


app = func.FunctionApp(http_auth_level=func.AuthLevel.ANONYMOUS)

@app.route(route="nutritional-insights")
def diets_analysis(req: func.HttpRequest) -> func.HttpResponse:
    logging.info("Diet analysis function triggered.")

    try:
        # --- LOAD CSV ---
        # LOCAL TESTING: read CSV directly from repo
        # TODO: swap this out for Blob Storage when deploying to Azure
        csv_path = os.path.join(os.path.dirname(__file__), "All_Diets.csv")
        df = pd.read_csv(csv_path)
        logging.info(f"Dataset loaded: {df.shape[0]} rows, {df.shape[1]} columns")

        # --- DATA CLEANING ---
        numeric_cols = ["Protein(g)", "Carbs(g)", "Fat(g)"]
        for col in numeric_cols:
            if df[col].isnull().any():
                df[col].fillna(df[col].mean(), inplace=True)

        # --- ANALYSIS 1: Average macronutrients per diet type ---
        avg_macros = (
            df.groupby("Diet_type")[numeric_cols]
            .mean()
            .reset_index()
            .round(2)
        )

        # --- ANALYSIS 2: Top 5 protein-rich recipes per diet type ---
        top_protein = (
            df.sort_values("Protein(g)", ascending=False)
            .groupby("Diet_type")
            .head(5)[["Diet_type", "Recipe_name", "Protein(g)", "Carbs(g)", "Fat(g)"]]
            .round(2)
        )

        # --- ANALYSIS 3: Most common cuisine per diet type ---
        most_common_cuisines = (
            df.groupby("Diet_type")["Cuisine_type"]
            .agg(lambda x: x.mode()[0] if len(x.mode()) > 0 else "N/A")
            .reset_index()
            .rename(columns={"Cuisine_type": "Most_common_cuisine"})
        )

        # --- ANALYSIS 4: Derived metrics ---
        df["Protein_to_Carbs_ratio"] = (
            df["Protein(g)"] / df["Carbs(g)"].replace(0, np.nan)
        ).round(2)

        avg_ratios = (
            df.groupby("Diet_type")["Protein_to_Carbs_ratio"]
            .mean()
            .reset_index()
            .round(2)
        )

        # --- BUILD RESPONSE ---
        result = {
            "avg_macros": avg_macros.to_dict(orient="records"),
            "top_protein_recipes": top_protein.to_dict(orient="records"),
            "most_common_cuisines": most_common_cuisines.to_dict(orient="records"),
            "avg_protein_to_carbs_ratio": avg_ratios.to_dict(orient="records"),
        }

        return func.HttpResponse(
            body=json.dumps(result, indent=2),
            mimetype="application/json",
            status_code=200
        )

    except Exception as e:
        logging.error(f"Error processing data: {str(e)}")
        return func.HttpResponse(
            body=json.dumps({"error": str(e)}),
            mimetype="application/json",
            status_code=500
        )