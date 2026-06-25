'use client';

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function BarChartComponent({ filter, data }) {
  const chartData = data?.avg_macros
    ? data.avg_macros.map((d) => ({
        diet: d.Diet_type,
        protein: parseFloat(d['Protein(g)'].toFixed(1)),
        carbs: parseFloat(d['Carbs(g)'].toFixed(1)),
        fat: parseFloat(d['Fat(g)'].toFixed(1)),
      }))
    : [];

  const filtered = filter === 'All'
    ? chartData
    : chartData.filter((d) => d.diet.toLowerCase() === filter.toLowerCase());

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={filtered} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="diet" tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend />
        <Bar dataKey="protein" name="Protein (g)" fill="#3B82F6" radius={[4, 4, 0, 0]} />
        <Bar dataKey="carbs" name="Carbs (g)" fill="#10B981" radius={[4, 4, 0, 0]} />
        <Bar dataKey="fat" name="Fat (g)" fill="#F59E0B" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}