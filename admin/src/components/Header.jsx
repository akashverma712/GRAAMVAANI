import React from 'react';
import { FaUserCircle } from 'react-icons/fa';

const Header = () => {
  return (
    <header className="bg-white shadow flex items-center justify-between p-4">
      <h1 className="text-xl font-semibold text-green-700">Dashboard</h1>
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">Admin</span>
        <FaUserCircle size={24} className="text-green-600" />
      </div>
    </header>
  );
};

export default Header;
