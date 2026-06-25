'use client';

const stats = [
  { label: 'Total Recipes', value: '1,180', icon: '🍽️' },
  { label: 'Diet Types', value: '5', icon: '🥗' },
  { label: 'Cuisines', value: '12', icon: '🌍' },
  { label: 'Avg Protein (g)', value: '28.4', icon: '💪' },
];

export default function StatsCards() {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <div key={stat.label} className="bg-gray-900 rounded-2xl p-5 flex flex-col gap-2">
          <span className="text-2xl">{stat.icon}</span>
          <span className="text-2xl font-bold text-white">{stat.value}</span>
          <span className="text-sm text-gray-400">{stat.label}</span>
        </div>
      ))}
    </div>
  );
}