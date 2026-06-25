'use client';

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Legend,
  Tooltip,
  ResponsiveContainer
} from 'recharts';

const mockData = [
  { nutrient: 'Protein', Vegan: 18.5, Keto: 42.1, Paleo: 35.6, Mediterranean: 28.3 },
  { nutrient: 'Carbs', Vegan: 45.2, Keto: 8.4, Paleo: 22.1, Mediterranean: 38.6 },
  { nutrient: 'Fat', Vegan: 12.3, Keto: 58.7, Paleo: 28.4, Mediterranean: 22.1 },
  { nutrient: 'Protein/Carbs', Vegan: 0.4, Keto: 5.0, Paleo: 1.6, Mediterranean: 0.7 },
  { nutrient: 'Carbs/Fat', Vegan: 3.7, Keto: 0.1, Paleo: 0.8, Mediterranean: 1.7 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

const dietTypes = ['Vegan', 'Keto', 'Paleo', 'Mediterranean'];

export default function RadarChartComponent({ filter }) {
  const diets = filter === 'All' ? dietTypes : [filter];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={mockData}>
        <PolarGrid stroke="#374151" />
        <PolarAngleAxis dataKey="nutrient" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <PolarRadiusAxis tick={{ fill: '#9CA3AF', fontSize: 10 }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend />
        {diets.map((diet, index) => (
          <Radar
            key={diet}
            name={diet}
            dataKey={diet}
            stroke={COLORS[index % COLORS.length]}
            fill={COLORS[index % COLORS.length]}
            fillOpacity={0.2}
          />
        ))}
      </RadarChart>
    </ResponsiveContainer>
  );
}