'use client';

import { useState } from 'react';
import BarChartComponent from '@/components/BarChartComponent';
import PieChartComponent from '@/components/PieChartComponent';
import LineChartComponent from '@/components/LineChartComponent';
import RadarChartComponent from '@/components/RadarChartComponent';

export default function Home() {
  const [dietFilter, setDietFilter] = useState('All');

  const dietTypes = ['All', 'Vegan', 'Keto', 'Paleo', 'Mediterranean'];

  return (
    <main className="min-h-screen bg-gray-950 text-white p-8">
      <div className="max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-blue-400 mb-2">Nutritional Insights</h1>
          <p className="text-gray-400">Explore macronutrient data across diet types and cuisines</p>
        </div>

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
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Average Macronutrients by Diet Type</h2>
            <BarChartComponent filter={dietFilter} />
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Recipe Distribution by Diet Type</h2>
            <PieChartComponent filter={dietFilter} />
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Protein Trends Across Cuisines</h2>
            <LineChartComponent filter={dietFilter} />
          </div>

          <div className="bg-gray-900 rounded-2xl p-6">
            <h2 className="text-lg font-semibold mb-4 text-gray-200">Nutrient Profile by Diet Type</h2>
            <RadarChartComponent filter={dietFilter} />
          </div>
        </div>

      </div>
    </main>
  );
}