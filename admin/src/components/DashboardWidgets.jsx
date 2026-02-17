import React from 'react';
import { FaUsers, FaChartPie, FaFileAlt, FaBell } from 'react-icons/fa';

const widgets = [
  { icon: <FaUsers />, label: 'Users', value: 1200 },
  { icon: <FaChartPie />, label: 'Reports', value: 230 },
  { icon: <FaFileAlt />, label: 'Articles', value: 75 },
  { icon: <FaBell />, label: 'Notifications', value: 18 },
];

const DashboardWidgets = () => {
  return (
    <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {widgets.map((w, idx) => (
        <div key={idx} className="bg-white rounded-xl shadow p-4 border border-green-100">
          <div className="flex items-center gap-4">
            <div className="bg-green-100 p-3 rounded-full text-green-700">{w.icon}</div>
            <div>
              <p className="text-sm text-gray-500">{w.label}</p>
              <p className="text-lg font-semibold">{w.value}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardWidgets;
