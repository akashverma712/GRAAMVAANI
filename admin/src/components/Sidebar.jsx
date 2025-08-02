import React from 'react';
import { FaUsers, FaChartLine, FaCog, FaHome } from 'react-icons/fa';

const Sidebar = () => {
  return (
    <aside className="w-64 bg-white border-r shadow-md hidden md:block">
      <div className="p-4 text-green-700 font-bold text-xl">AdminPanel</div>
      <nav className="flex flex-col gap-2 p-4 text-gray-700">
        <SidebarItem icon={<FaHome />} label="Dashboard" />
        <SidebarItem icon={<FaUsers />} label="Users" />
        <SidebarItem icon={<FaChartLine />} label="Reports" />
        <SidebarItem icon={<FaCog />} label="Settings" />
      </nav>
    </aside>
  );
};

const SidebarItem = ({ icon, label }) => (
  <button className="flex items-center gap-3 p-2 rounded hover:bg-gray-100 w-full text-left">
    <span className="text-green-600">{icon}</span>
    <span>{label}</span>
  </button>
);

export default Sidebar;
