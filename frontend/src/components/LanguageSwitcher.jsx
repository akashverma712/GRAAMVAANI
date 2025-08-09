import React, { useState, useEffect, useRef } from 'react';
import i18n from '../i18n';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="relative inline-block text-left" ref={dropdownRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1 px-2 py-2 bg-white rounded shadow-md hover:bg-gray-100 focus:outline-none focus:ring"
      >
        <FaGlobe className="text-green-700 text-lg" />
        <span className="text-sm font-medium hidden sm:inline">Language</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow-lg z-50 sm:w-44">
          {[
            { code: 'en', label: 'English' },
            { code: 'hi', label: 'हिंदी' },
            { code: 'ta', label: 'தமிழ்' },
            { code: 'te', label: 'తెలుగు' },
          ].map(({ code, label }) => (
            <button
              key={code}
              onClick={() => changeLanguage(code)}
              className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
            >
              {label}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
