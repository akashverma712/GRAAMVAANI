// src/components/LanguageSwitcher.jsx
import React, { useState } from 'react';
import i18n from '../i18n';
import { FaGlobe } from 'react-icons/fa';

const LanguageSwitcher = () => {
  const [open, setOpen] = useState(false);

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
    setOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center gap-2 px-4 py-2 bg-white border rounded shadow hover:bg-gray-100"
      >
        <FaGlobe className="text-blue-600" />
        <span className="text-sm font-medium">Language</span>
      </button>

      {open && (
        <div className="absolute right-0 mt-2 w-40 bg-white border rounded shadow z-10">
          <button
            onClick={() => changeLanguage('en')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            English
          </button>
          <button
            onClick={() => changeLanguage('hi')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            हिंदी
          </button>
          <button
            onClick={() => changeLanguage('ta')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            தமிழ்
          </button>
          <button
            onClick={() => changeLanguage('te')}
            className="block w-full text-left px-4 py-2 hover:bg-gray-100"
          >
            తెలుగు
          </button>
        </div>
      )}
    </div>
  );
};

export default LanguageSwitcher;
