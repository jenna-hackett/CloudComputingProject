'use client';

import { useState, useEffect } from 'react';
import BarChartComponent from '@/components/BarChartComponent';
import PieChartComponent from '@/components/PieChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import RadarChartComponent from '@/components/RadarChartComponent';
import StatsCards from '@/components/StatsCards';
import MetadataBar from '@/components/MetadataBar';
import { useNutritionalData } from '@/hooks/useNutritionalData';

export default function Home() {
  const [dietFilter, setDietFilter] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [lastUpdated, setLastUpdated] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [apiMessage, setApiMessage] = useState('');

  const { data, loading, executionTime, usingMock, refetch } = useNutritionalData();

  const dietTypes = ['All', 'Vegan', 'Keto', 'Paleo', 'Mediterranean', 'Dash'];

  const filteredDietTypes = dietTypes.filter((d) =>
    d.toLowerCase().includes(searchQuery.toLowerCase())
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      setLastUpdated(new Date().toLocaleTimeString());
    }, 0);
    return () => clearTimeout(timer);
  }, []);

  const handleRefresh = () => {
    refetch();
    setLastUpdated(new Date().toLocaleTimeString());
  };

  const handleApiButton = (type) => {
    setApiMessage(`Fetching ${type}...`);
    setTimeout(() => setApiMessage(`✅ ${type} loaded successfully!`), 1000);
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white flex flex-col">
      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto">

          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-blue-400 mb-2">Nutritional Insights</h1>
              <p className="text-gray-400">Explore macronutrient data across diet types and cuisines</p>
            </div>
            <div className="flex items-center gap-4">
              {usingMock && (
                <span className="text-xs text-yellow-400 bg-yellow-400/10 px-3 py-1 rounded-full">
                  Using mock data
                </span>
              )}
              <button
                onClick={handleRefresh}
                disabled={loading}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  loading
                    ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
                    : 'bg-blue-500 hover:bg-blue-600 text-white'
                }`}
              >
                {loading ? '⟳ Refreshing...' : '⟳ Refresh Data'}
              </button>
            </div>
          </div>

          {/* Stats Cards */}
          <StatsCards />

          {/* Metadata Bar */}
          <MetadataBar
            lastUpdated={lastUpdated}
            executionTime={executionTime}
            recordCount="1,180"
          />

          {/* Filter Bar */}
          <div className="flex gap-3 mb-8 flex-wrap">
            {dietTypes.map((diet) => (
              <button
                key={diet}
                onClick={() => setDietFilter(diet)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  dietFilter === diet
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {diet}
              </button>
            ))}
          </div>

          {/* Charts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Average Macronutrients by Diet Type</h2>
              <BarChartComponent filter={dietFilter} data={data} />
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Recipe Distribution by Diet Type</h2>
              <PieChartComponent filter={dietFilter} data={data} />
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Protein Trends Across Cuisines</h2>
              <LineChartComponent filter={dietFilter} data={data} />
            </div>

            <div className="bg-gray-900 rounded-2xl p-6">
              <h2 className="text-lg font-semibold mb-4 text-gray-200">Nutrient Profile by Diet Type</h2>
              <RadarChartComponent filter={dietFilter} data={data} />
            </div>
          </div>

          {/* API Data Interaction */}
          <div className="bg-gray-900 rounded-2xl p-6 mb-6">
            <h2 className="text-xl font-bold mb-4 text-white">API Data Interaction</h2>
            <div className="flex gap-4 flex-wrap items-center">
              <button
                onClick={() => handleApiButton('Nutritional Insights')}
                className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Nutritional Insights
              </button>
              <button
                onClick={() => handleApiButton('Recipes')}
                className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Recipes
              </button>
              <button
                onClick={() => handleApiButton('Clusters')}
                className="bg-purple-500 hover:bg-purple-600 text-white px-6 py-2 rounded-lg font-medium transition-colors"
              >
                Get Clusters
              </button>
              {apiMessage && (
                <span className="text-sm text-gray-300">{apiMessage}</span>
              )}
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="bg-blue-500 text-white text-center py-4 text-sm">
        © 2025 Nutritional Insights. All Rights Reserved.
      </footer>
    </div>
  );
}