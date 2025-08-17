import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';
import {
  SignInButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/clerk-react';
import {
  FaBell,
  FaComments,
  FaUserShield,
  FaHome,
  FaSignInAlt,
  FaBars,
  FaTimes,
  FaBook,
} from 'react-icons/fa';

const Navbar = () => {
  const { t } = useTranslation();
  const location = useLocation();
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isActive = (path) => location.pathname === path;

  const toggleMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md sticky top-0 z-50"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center px-4 py-3">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 text-green-700">
          <FaHome size={22} />
          <h1 className="text-2xl font-bold">GRAAMVAANI</h1>
        </Link>

        {/* Desktop Menu */}
        <nav className="hidden sm:flex gap-6 items-center text-sm font-medium">
          <NavItem
            to="/notice"
            active={isActive('/notice')}
            icon={<FaBell />}
            label={t('navbar.features')}
          />
          <NavItem
            to="/Forum"
            active={isActive('/Forum')}
            icon={<FaComments />}
            label={t('navbar.about')}
          />
          <NavItem
            to="/scheme"
            active={isActive('/scheme')}
            icon={<FaUserShield />}
            label={t('navbar.contact')}
          />
          <NavItem
            to="/resources"
            active={isActive('/resources')}
            icon={<FaBook />}
            label={t ('Resources')}
          />
          <NavItem
            to="/additional-info"
            active={isActive('/additional-info')}
            icon={<FaBook />}
            label={t ('additional')}
          />
        </nav>

        {/* Right Controls */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher />
          <SignedOut>
            <SignInButton>
              <div className="hidden sm:flex items-center gap-1 text-sm text-blue-600 border px-3 py-1 rounded hover:bg-blue-50 transition cursor-pointer">
                <FaSignInAlt />
                Sign In
              </div>
            </SignInButton>
          </SignedOut>
          <SignedIn>
            <UserButton appearance={{ elements: { userButtonAvatarBox: 'w-8 h-8' } }} />
          </SignedIn>

          {/* Hamburger menu icon (mobile only) */}
          <button onClick={toggleMenu} className="sm:hidden">
            {isMobileMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="sm:hidden bg-white shadow-md border-t border-gray-200 px-4 pb-4 pt-2"
          >
            <NavItem
              to="/notice"
              active={isActive('/notice')}
              icon={<FaBell />}
              label={t('navbar.features')}
              mobile
            />
            <NavItem
              to="/Forum"
              active={isActive('/Forum')}
              icon={<FaComments />}
              label={t('navbar.about')}
              mobile
            />
            <NavItem
              to="/scheme"
              active={isActive('/scheme')}
              icon={<FaUserShield />}
              label={t('navbar.contact')}
              mobile
            />
            <NavItem
              to="/resources"
              active={isActive('/resources')}
              icon={<FaBook />}
              label={t('navbar.resources') || 'Resources'}
              mobile
            />
            <NavItem
              to="/additional-info"
              active={isActive('/additional-info')}
              icon={<FaBook />}
              label={t('navbar.additional-info') || 'additional-info'}
              mobile
            />
            <SignedOut>
              <SignInButton>
                <div className="mt-3 flex items-center gap-2 text-blue-600 px-2 py-1 border rounded w-max">
                  <FaSignInAlt />
                  Sign In
                </div>
              </SignInButton>
            </SignedOut>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
};

// 🔹 Nav item subcomponent
const NavItem = ({ to, icon, label, active, mobile = false }) => (
  <Link
    to={to}
    className={`flex items-center gap-2 px-3 py-2 rounded-md transition ${
      active
        ? 'bg-green-100 text-green-800'
        : 'text-gray-700 hover:text-green-700 hover:bg-green-50'
    } ${mobile ? 'block w-full mt-1' : ''}`}
  >
    {icon}
    {label}
  </Link>
);

export default Navbar;