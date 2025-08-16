import React from "react";
import { useTranslation } from "react-i18next";
import { FaUserCheck, FaAward, FaGlobeAsia } from "react-icons/fa";
import { motion } from "framer-motion";

const stories = [
  {
    id: 1,
    icon: <FaUserCheck className="text-green-500 text-4xl" />,
    title: "Empowering Farmers",
    description:
      "Over 5,000 farmers have improved crop yields using our AI-powered guidance.",
    location: "Maharashtra, India",
  },
  {
    id: 2,
    icon: <FaAward className="text-yellow-500 text-4xl" />,
    title: "Women Entrepreneurs",
    description:
      "Our microloan program has helped 1,200 women start small businesses.",
    location: "Tamil Nadu, India",
  },
  {
    id: 3,
    icon: <FaGlobeAsia className="text-blue-500 text-4xl" />,
    title: "Global Recognition",
    description:
      "Recognized by UNDP for sustainable rural development initiatives.",
    location: "Global",
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
          {stories.map((story) => (
            <motion.div
              key={story.id}
              className="bg-white p-6 rounded-2xl shadow-lg hover:shadow-xl transition duration-300 text-left"
              whileHover={{ scale: 1.05 }}
            >
              <div className="flex items-center gap-4 mb-4">
                {story.icon}
                <h3 className="text-xl font-semibold text-gray-800">
                  {story.title}
                </h3>
              </div>
              <p className="text-gray-600">{story.description}</p>
              <p className="mt-3 text-sm text-gray-500 italic">
                📍 {story.location}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SuccessStoryWall;
