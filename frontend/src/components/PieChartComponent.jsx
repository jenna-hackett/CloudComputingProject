'use client';

import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const fallback = [
  { name: 'Vegan', value: 245 },
  { name: 'Keto', value: 189 },
  { name: 'Paleo', value: 312 },
  { name: 'Mediterranean', value: 278 },
  { name: 'Dash', value: 156 },
];

const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6'];

export default function PieChartComponent({ filter, data }) {
  const chartData = data
    ? data.map((d) => ({
        name: d.Diet_type,
        value: parseFloat(d['Protein(g)'].toFixed(1)),
      }))
    : fallback;

  const filtered = filter === 'All'
    ? chartData
    : chartData.filter((d) => d.name === filter);

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={filtered}
          cx="50%"
          cy="50%"
          outerRadius={100}
          dataKey="value"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
          labelLine={false}
        >
          {filtered.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{ backgroundColor: '#1F2937', border: 'none', borderRadius: '8px' }}
          labelStyle={{ color: '#F9FAFB' }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}