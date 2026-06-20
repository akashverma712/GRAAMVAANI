import React from "react";

const Dashboard = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-green-700 mb-4">Admin Dashboard</h1>
      <p className="text-gray-700 text-lg">
        Welcome back! Use the sidebar to navigate through different sections.
      </p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <StatCard title="Users" value="1,245" />
        <StatCard title="Notices" value="34" />
        <StatCard title="Site Visits" value="12,857" />
      </div>
    </div>
  );
};

const StatCard = ({ title, value }) => (
  <div className="bg-white p-4 rounded-2xl shadow hover:shadow-md transition duration-200">
    <h2 className="text-gray-600 text-sm">{title}</h2>
    <p className="text-2xl font-semibold text-green-700">{value}</p>
  </div>
);

export default Dashboard;
