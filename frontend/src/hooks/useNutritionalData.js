'use client';

import { useState, useEffect } from 'react';

const mockData = [
  { Diet_type: 'Vegan', 'Protein(g)': 18.5, 'Carbs(g)': 45.2, 'Fat(g)': 12.3 },
  { Diet_type: 'Keto', 'Protein(g)': 42.1, 'Carbs(g)': 8.4, 'Fat(g)': 58.7 },
  { Diet_type: 'Paleo', 'Protein(g)': 35.6, 'Carbs(g)': 22.1, 'Fat(g)': 28.4 },
  { Diet_type: 'Mediterranean', 'Protein(g)': 28.3, 'Carbs(g)': 38.6, 'Fat(g)': 22.1 },
  { Diet_type: 'Dash', 'Protein(g)': 24.7, 'Carbs(g)': 42.3, 'Fat(g)': 18.9 },
];

const FUNCTION_URL = process.env.NEXT_PUBLIC_FUNCTION_URL || 'http://localhost:7071/api/nutritional_insights';

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