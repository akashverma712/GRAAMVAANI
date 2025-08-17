
import React from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';



import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";


const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-gray-900 text-gray-300 text-sm">
      {/* Main Footer */}
      <div className="max-w-6xl mx-auto px-6 py-12 grid grid-cols-1 md:grid-cols-4 gap-10">
        {/* Brand */}
        <div>
          <h4 className="text-xl font-bold text-white">{t("footer.title")}</h4>
          <p className="text-gray-400 mt-3">{t("footer.tagline")}</p>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-4">
            {t("footer.quickLinks")}
          </h5>
          <ul className="space-y-2">
            <li>
              <a href="/" className="hover:text-white transition-colors">
                {t("Home")}
              </a>
            </li>
            <li>
              <a href="/about" className="hover:text-white transition-colors">
                {t("About")}
              </a>
            </li>
            <li>
              <a href="/services" className="hover:text-white transition-colors">
                {t("Services")}
              </a>
            </li>
            <li>
              <a href="/contact" className="hover:text-white transition-colors">
                {t("Contact")}
              </a>
            </li>
          </ul>
        </div>

        {/* Contact */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-4">
            {t("footer.contactUs")}
          </h5>
          <p>
            <span className="font-medium">{t("footer.email")}:</span>{" "}
            support@graamvaani.in
          </p>
          <p>
            <span className="font-medium">{t("footer.phone")}:</span> +91 98765 43210
          </p>
          <p>
            <span className="font-medium">{t("footer.address")}:</span>{" "}
            {t("footer.addressValue")}
          </p>
        </div>

        {/* Social Media */}
        <div>
          <h5 className="text-lg font-semibold text-white mb-4">
            {t("footer.followUs")}
          </h5>
          <div className="flex space-x-4">
            <a href="#" className="hover:text-white">
              <FaFacebook size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaTwitter size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaInstagram size={20} />
            </a>
            <a href="#" className="hover:text-white">
              <FaLinkedin size={20} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="border-t border-gray-700 py-4 text-center text-gray-400 text-xs">
        © {new Date().getFullYear()} Graamvaani. {t("footer.rightsReserved")}
      </div>
    </footer>
  );
};

export default Footer;
