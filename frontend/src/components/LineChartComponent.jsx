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

const mockData = [
  { cuisine: 'Italian', protein: 28.4, carbs: 42.1, fat: 18.6 },
  { cuisine: 'Mexican', protein: 32.1, carbs: 38.4, fat: 22.3 },
  { cuisine: 'Indian', protein: 22.8, carbs: 48.6, fat: 15.2 },
  { cuisine: 'Chinese', protein: 26.3, carbs: 44.2, fat: 16.8 },
  { cuisine: 'American', protein: 38.5, carbs: 35.6, fat: 28.4 },
  { cuisine: 'French', protein: 30.2, carbs: 32.8, fat: 32.1 },
  { cuisine: 'Mediterranean', protein: 25.6, carbs: 40.3, fat: 20.4 },
];

export default function LineChartComponent({ filter }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={mockData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
        <XAxis dataKey="cuisine" tick={{ fill: '#9CA3AF', fontSize: 11 }} />
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