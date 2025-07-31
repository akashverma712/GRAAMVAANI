import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import { useTranslation } from "react-i18next";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

const Navbar = () => {
  const { t } = useTranslation();

  return (
    <motion.header
      initial={{ y: -60, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white shadow-md sticky top-0 z-20"
    >
      <div className="max-w-6xl mx-auto flex justify-between items-center p-4">
        <h1 className="text-2xl font-bold text-green-700">GRAAMVAANI</h1>

        <div className="flex items-center gap-4">
          <nav className="hidden sm:flex space-x-4 text-sm">
            <Link to='/notice' className="hover:underline">
              {t("navbar.features")}
            </Link>
            <Link to='/forum' className="hover:underline">
              {t("navbar.about")}
            </Link>
            <Link to='/scheme' className="hover:underline">
              {t("navbar.contact")}
            </Link>
            <Link to='/additional-info' className="hover:underline">
              {t("navbar.moreInfo") || "More Info"}
            </Link>
          </nav>

          <LanguageSwitcher />
          
          <div className="inline-block">
            <SignedOut>
              <SignInButton />
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </motion.header>
  );
};

export default Navbar;
