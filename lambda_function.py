from azure.storage.blob import BlobServiceClient
import pandas as pd
import io
import json

def process_nutritional_data_from_azurite():
    connect_str = "UseDevelopmentStorage=true;"
    blob_service_client = BlobServiceClient.from_connection_string(connect_str)

    container_name = 'datasets'
    blob_name = 'All_Diets.csv'

    container_client = blob_service_client.get_container_client(container_name)
    blob_client = container_client.get_blob_client(blob_name)

    # Download CSV from Azurite
    stream = blob_client.download_blob().readall()
    df = pd.read_csv(io.BytesIO(stream))

    # Clean missing values
    df.fillna(df.select_dtypes(include='number').mean(), inplace=True)

    # Calculate average macronutrients per diet type
    avg_macros = df.groupby('Diet_type')[['Protein(g)', 'Carbs(g)', 'Fat(g)']].mean()

    # Save results to simulated NoSQL (JSON file)
    result = avg_macros.reset_index().to_dict(orient='records')
    with open('simulated_nosql/results.json', 'w') as f:
        json.dump(result, f, indent=2)

    print("Results saved to simulated_nosql/results.json")
    return "Data processed and stored successfully."

if __name__ == "__main__":
    output = process_nutritional_data_from_azurite()
    print(output)
