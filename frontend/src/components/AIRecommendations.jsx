import React, { useState, useEffect } from "react";
import { FaLightbulb, FaRobot, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const recommendationsData = [
  {
    id: 1,
    icon: <FaSeedling className="text-green-500 text-3xl" />,
    titleKey: "recommendations.crop.title",
    suggestionKey: "recommendations.crop.suggestion",
  },
  {
    id: 2,
    icon: <FaRobot className="text-blue-500 text-3xl" />,
    titleKey: "recommendations.irrigation.title",
    suggestionKey: "recommendations.irrigation.suggestion",
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
    titleKey: "recommendations.fertilizer.title",
    suggestionKey: "recommendations.fertilizer.suggestion",
  },
];

const AIRecommendations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { t } = useTranslation();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === recommendationsData.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const currentRecommendation = recommendationsData[currentIndex];

  return (
    <section
      className="bg-gradient-to-r from-green-50 to-blue-50 py-16"
      id="recommendations"
    >
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
          <FaRobot className="text-green-500" /> {t("recommendations.title")}
        </h2>
        <p className="text-gray-600 mb-10">{t("recommendations.subtitle")}</p>

        <motion.div
          key={currentRecommendation.id}
          className="bg-white shadow-xl rounded-2xl p-8 max-w-xl mx-auto border border-gray-100"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center gap-4 mb-4 justify-center">
            {currentRecommendation.icon}
            <h3 className="text-xl font-semibold text-green-800">
              {t(currentRecommendation.titleKey)}
            </h3>
          </div>
          <p className="text-gray-700 text-lg">
            {t(currentRecommendation.suggestionKey)}
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIRecommendations;
