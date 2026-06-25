# 🥗 Nutritional Insights Dashboard

A cloud-native web dashboard that visualizes macronutrient data from the All_Diets dataset. Built with Next.js and deployed on Azure Static Web Apps, with a serverless backend powered by Azure Functions.

## 📋 Project Overview

This project is Phase 2 of a cloud computing project that moves a locally-tested Azure Function to the cloud and connects it to an interactive web dashboard. The dashboard displays nutritional insights across different diet types and cuisines.

## 🏗️ Architecture

\`\`\`
CloudComputingProject/
├── .github/workflows/ # CI/CD pipeline
│ └── deploy.yml
├── backend/ # Azure Function backend
│ ├── lambda_function.py # HTTP-triggered Azure Function
│ ├── data_analysis.py # Data processing logic
│ ├── requirements.txt # Python dependencies
│ └── All_Diets.csv # Dataset
├── frontend/ # Next.js dashboard
│ ├── src/
│ │ ├── app/
│ │ │ ├── page.js # Main dashboard page
│ │ │ └── layout.js # App layout
│ │ ├── components/ # React components
│ │ │ ├── BarChartComponent.jsx
│ │ │ ├── PieChartComponent.jsx
│ │ │ ├── LineChartComponent.jsx
│ │ │ ├── RadarChartComponent.jsx
│ │ │ ├── StatsCards.jsx
│ │ │ └── MetadataBar.jsx
│ │ └── hooks/
│ │ └── useNutritionalData.js
├── Dockerfile
└── compose.yaml
\`\`\`

## 🚀 Features

- **4 Interactive Charts** — Bar, Pie, Line, and Radar charts built with Recharts
- **Diet Type Filtering** — Filter all charts simultaneously by diet type
- **Stats Cards** — Quick summary of total recipes, diet types, cuisines, and average protein
- **Metadata Bar** — Displays function execution time, last updated time, and records processed
- **Refresh Button** — Fetches latest data from the Azure Function
- **Mock Data Fallback** — Automatically falls back to mock data if the Azure Function is unavailable
- **Responsive Design** — Works on desktop and mobile

## 📊 Visualizations

| Chart       | Description                                                       |
| ----------- | ----------------------------------------------------------------- |
| Bar Chart   | Average macronutrient content (protein, carbs, fat) per diet type |
| Pie Chart   | Recipe distribution across diet types                             |
| Line Chart  | Protein, carbs, and fat trends across cuisines                    |
| Radar Chart | Nutrient profile comparison across diet types                     |

## 🛠️ Tech Stack

**Frontend**

- Next.js 15
- Tailwind CSS
- shadcn/ui
- Recharts

**Backend**

- Python 3.9
- Azure Functions
- Azure Blob Storage
- Pandas

**DevOps**

- GitHub Actions (CI/CD)
- Docker
- Azure Static Web Apps

## ⚙️ Local Development

### Prerequisites

- Node.js 18+
- Python 3.9+
- Azure Functions Core Tools
- Docker Desktop

### Frontend Setup

\`\`\`bash
cd frontend
npm install
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Backend Setup

\`\`\`bash
cd backend
pip install -r requirements.txt
func start
\`\`\`

The Azure Function will run at `http://localhost:7071/api/nutritional_insights`.

### Environment Variables

Create a `.env.local` file in the `frontend` folder:

\`\`\`env
NEXT_PUBLIC_FUNCTION_URL=http://localhost:7071/api/nutritional_insights
\`\`\`

For production, update this to your deployed Azure Function URL.

## ☁️ Azure Deployment

### Backend (Azure Functions)

1. Create an Azure Function App in the Azure Portal
2. Upload `All_Diets.csv` to Azure Blob Storage
3. Set `AZURE_STORAGE_CONNECTION_STRING` in Function App environment variables
4. Deploy using Azure Functions Core Tools or GitHub Actions

### Frontend (Azure Static Web Apps)

1. Create an Azure Static Web App in the Azure Portal
2. Connect to your GitHub repository
3. Set build folder to `frontend`
4. Set `NEXT_PUBLIC_FUNCTION_URL` to your deployed Azure Function URL

## 👥 Team

| Members  
| ---------------
| Jenna Hackett
| Verity Boyd
| Aurora Choban

## 📄 License

This project was created for SAIT Cloud Computing — 4th Semester.
