import React from 'react';

const OverviewSection = () => {
  return (
    <div className="mt-8 grid gap-6 lg:grid-cols-2">
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4 text-green-700">Recent Users</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>👤 Ramesh Kumar – ramesh@example.com</li>
          <li>👤 Aarti Devi – aarti@example.com</li>
          <li>👤 Vijay Patel – vijay@example.com</li>
        </ul>
      </div>
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-lg font-bold mb-4 text-green-700">Recent Reports</h2>
        <ul className="text-sm text-gray-700 space-y-2">
          <li>📊 Reported content flagged by User #45</li>
          <li>📊 Abuse report: Forum Post ID 107</li>
          <li>📊 Spam issue: Article #203</li>
        </ul>
      </div>
    </div>
  );
};

export default OverviewSection;
