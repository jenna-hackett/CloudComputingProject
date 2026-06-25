'use client';

export default function MetadataBar({ lastUpdated, executionTime, recordCount }) {
  return (
    <div className="flex flex-wrap gap-6 bg-gray-900 rounded-2xl px-6 py-4 mb-8 text-sm text-gray-400">
      <div className="flex items-center gap-2">
        <span className="text-blue-400">⏱</span>
        <span>Execution Time: <span className="text-white font-medium">{executionTime}ms</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-green-400">🕒</span>
        <span>Last Updated: <span className="text-white font-medium">{lastUpdated}</span></span>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-yellow-400">📊</span>
        <span>Records Processed: <span className="text-white font-medium">{recordCount}</span></span>
      </div>
    </div>
  );
}