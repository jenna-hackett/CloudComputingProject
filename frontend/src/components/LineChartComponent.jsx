'use client';

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

export default function LineChartComponent({ filter, data }) {
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
      <LineChart data={filtered} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="diet" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
        <YAxis tick={{ fill: '#9CA3AF', fontSize: 12 }} />
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend />
        <Line type="monotone" dataKey="protein" name="Protein (g)" stroke="#3B82F6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="carbs" name="Carbs (g)" stroke="#10B981" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
        <Line type="monotone" dataKey="fat" name="Fat (g)" stroke="#F59E0B" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}