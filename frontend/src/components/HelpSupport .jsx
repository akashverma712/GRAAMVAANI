import React from "react";
import { motion } from "framer-motion";
import { FaPhone, FaEnvelope, FaHospital, FaGraduationCap, FaLeaf, FaExclamationTriangle } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const helpContactsData = [
  {
    id: 1,
    categoryKey: "help.health.category",
    icon: <FaHospital className="text-red-500 text-3xl" />,
    phone: "+91 98765 43210",
    email: "health@panchayat.gov.in",
    descriptionKey: "help.health.description",
  },
  {
    id: 2,
    categoryKey: "help.education.category",
    icon: <FaGraduationCap className="text-blue-500 text-3xl" />,
    phone: "+91 91234 56789",
    email: "education@panchayat.gov.in",
    descriptionKey: "help.education.description",
  },
  {
    id: 3,
    categoryKey: "help.agriculture.category",
    icon: <FaLeaf className="text-green-500 text-3xl" />,
    phone: "+91 99876 54321",
    email: "agriculture@panchayat.gov.in",
    descriptionKey: "help.agriculture.description",
  },
  {
    id: 4,
    categoryKey: "help.emergency.category",
    icon: <FaExclamationTriangle className="text-yellow-500 text-3xl" />,
    phone: "+91 100",
    email: "emergency@panchayat.gov.in",
    descriptionKey: "help.emergency.description",
  },
];

const HelpSupport = () => {
  const { t } = useTranslation();

  return (
    <section className="max-w-6xl mx-auto px-4 my-6 py-12 bg-gray-50 rounded-xl" id="help">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="text-3xl font-bold text-green-700 mb-8 text-center"
      >
        {t("help.title")}
      </motion.h2>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        {helpContactsData.map((contact, idx) => (
          <motion.div
            key={contact.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className="bg-white p-6 rounded-xl shadow hover:shadow-lg transition flex flex-col items-center text-center"
          >
            <div className="mb-4">{contact.icon}</div>
            <h3 className="text-xl font-semibold text-gray-800 mb-2">{t(contact.categoryKey)}</h3>
            <p className="text-gray-600 text-sm mb-3">{t(contact.descriptionKey)}</p>

            <div className="flex flex-col gap-2">
              <a href={`tel:${contact.phone}`} className="flex items-center justify-center gap-2 text-green-700 hover:underline">
                <FaPhone /> {contact.phone}
              </a>
              <a href={`mailto:${contact.email}`} className="flex items-center justify-center gap-2 text-green-600 hover:underline">
                <FaEnvelope /> {contact.email}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HelpSupport;
