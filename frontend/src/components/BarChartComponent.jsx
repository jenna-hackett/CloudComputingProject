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

const mockData = [
  { diet: 'Vegan', protein: 18.5, carbs: 45.2, fat: 12.3 },
  { diet: 'Keto', protein: 42.1, carbs: 8.4, fat: 58.7 },
  { diet: 'Paleo', protein: 35.6, carbs: 22.1, fat: 28.4 },
  { diet: 'Mediterranean', protein: 28.3, carbs: 38.6, fat: 22.1 },
  { diet: 'Dash', protein: 24.7, carbs: 42.3, fat: 18.9 },
];

export default function BarChartComponent({ filter }) {
  const data = filter === 'All'
    ? mockData
    : mockData.filter((d) => d.diet === filter);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
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