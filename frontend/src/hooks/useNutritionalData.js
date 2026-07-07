'use client';

import { useState, useEffect } from 'react';

const mockData = {
  avg_macros: [
    { Diet_type: 'dash', 'Protein(g)': 69.28, 'Carbs(g)': 160.54, 'Fat(g)': 101.15 },
    { Diet_type: 'keto', 'Protein(g)': 101.27, 'Carbs(g)': 57.97, 'Fat(g)': 153.12 },
    { Diet_type: 'mediterranean', 'Protein(g)': 101.11, 'Carbs(g)': 152.91, 'Fat(g)': 101.42 },
    { Diet_type: 'paleo', 'Protein(g)': 88.67, 'Carbs(g)': 129.55, 'Fat(g)': 135.67 },
    { Diet_type: 'vegan', 'Protein(g)': 56.16, 'Carbs(g)': 254.0, 'Fat(g)': 103.3 },
  ],
  top_protein_recipes: [
    { Diet_type: 'paleo', Recipe_name: "Swiss Paleo's Homemade Italian & Chorizo Sausage", 'Protein(g)': 1273.61 },
    { Diet_type: 'dash', Recipe_name: 'Salmon Mousse', 'Protein(g)': 1239.47 },
    { Diet_type: 'dash', Recipe_name: 'Homemade Turkey Alphabet Soup', 'Protein(g)': 1190.35 },
    { Diet_type: 'paleo', Recipe_name: 'Turkey Soup', 'Protein(g)': 1142.58 },
    { Diet_type: 'keto', Recipe_name: "Sara Louise's Keto Smoked Holiday Turkey", 'Protein(g)': 1092.0 },
  ],
  most_common_cuisines: [
    { Diet_type: 'dash', Most_common_cuisine: 'american' },
    { Diet_type: 'keto', Most_common_cuisine: 'american' },
    { Diet_type: 'mediterranean', Most_common_cuisine: 'mediterranean' },
    { Diet_type: 'paleo', Most_common_cuisine: 'american' },
    { Diet_type: 'vegan', Most_common_cuisine: 'american' },
  ],
  avg_protein_to_carbs_ratio: [
    { Diet_type: 'dash', Protein_to_Carbs_ratio: 1.49 },
    { Diet_type: 'keto', Protein_to_Carbs_ratio: 4.12 },
    { Diet_type: 'mediterranean', Protein_to_Carbs_ratio: 1.78 },
    { Diet_type: 'paleo', Protein_to_Carbs_ratio: 2.06 },
    { Diet_type: 'vegan', Protein_to_Carbs_ratio: 0.33 },
  ],
};

const FUNCTION_URL = process.env.NEXT_PUBLIC_FUNCTION_URL || 
  (typeof window !== 'undefined' && window.location.hostname !== 'localhost' 
    ? 'https://diet-analysis-afb4ceacghajcsbp.canadacentral-01.azurewebsites.net/api/nutritional-insights'
    : 'http://localhost:7071/api/nutritional-insights');

export function useNutritionalData() {
  const [data, setData] = useState(mockData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [executionTime, setExecutionTime] = useState(142);
  const [usingMock, setUsingMock] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    const start = Date.now();

    try {
      const response = await fetch(FUNCTION_URL);
      if (!response.ok) throw new Error('Function returned an error');
      const result = await response.json();
      setData(result);
      setUsingMock(false);
      setExecutionTime(Date.now() - start);
    } catch (err) {
      console.warn('Azure Function not available, using mock data:', err.message);
      setData(mockData);
      setUsingMock(true);
      setExecutionTime(Date.now() - start);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData();
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  return { data, loading, error, executionTime, usingMock, refetch: fetchData };
}