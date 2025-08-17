import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserCheck, FaAward, FaGlobeAsia } from "react-icons/fa";
import { motion } from "framer-motion";

const storiesData = [
  {
    id: 1,
    icon: <FaUserCheck className="text-green-500 text-4xl" />,
    titleKey: "successWall.stories.farmers.title",
    descriptionKey: "successWall.stories.farmers.description",
    locationKey: "successWall.stories.farmers.location",
  },
  {
    id: 2,
    icon: <FaAward className="text-yellow-500 text-4xl" />,
    titleKey: "successWall.stories.women.title",
    descriptionKey: "successWall.stories.women.description",
    locationKey: "successWall.stories.women.location",
  },
  {
    id: 3,
    icon: <FaGlobeAsia className="text-blue-500 text-4xl" />,
    titleKey: "successWall.stories.global.title",
    descriptionKey: "successWall.stories.global.description",
    locationKey: "successWall.stories.global.location",
  },
];

const SuccessStoryWall = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-gray-50 py-16" id="success-stories">
      <div className="max-w-7xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
          {t("successWall.title")}
        </h2>
        <p className="text-gray-600 mb-12 max-w-2xl mx-auto">
          {t("successWall.subtitle")}
        </p>

        <div className="grid gap-8 md:grid-cols-3">
          {storiesData.map((story) => (
            <motion.div
              key={story.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-left"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4 mb-4">
                {story.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {t(story.titleKey)}
                </h3>
              </div>
              <p className="text-gray-600">{t(story.descriptionKey)}</p>
              <p className="mt-3 text-sm text-gray-500 italic">
                📍 {t(story.locationKey)}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryWall;
