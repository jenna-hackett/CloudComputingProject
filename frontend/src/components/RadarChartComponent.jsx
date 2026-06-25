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

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function RadarChartComponent({ filter, data }) {
  const chartData = data?.avg_macros
    ? [
        {
          nutrient: 'Protein',
          ...Object.fromEntries(
            data.avg_macros.map((d) => [d.Diet_type, parseFloat(d['Protein(g)'].toFixed(1))])
          ),
        },
        {
          nutrient: 'Carbs',
          ...Object.fromEntries(
            data.avg_macros.map((d) => [d.Diet_type, parseFloat(d['Carbs(g)'].toFixed(1))])
          ),
        },
        {
          nutrient: 'Fat',
          ...Object.fromEntries(
            data.avg_macros.map((d) => [d.Diet_type, parseFloat(d['Fat(g)'].toFixed(1))])
          ),
        },
      ]
    : [];

  const availableDiets = data?.avg_macros ? data.avg_macros.map((d) => d.Diet_type) : [];
  const diets = filter === 'All' ? availableDiets : [filter.toLowerCase()];

  return (
    <ResponsiveContainer width="100%" height={300}>
      <RadarChart data={chartData}>
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