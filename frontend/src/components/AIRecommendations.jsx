import React, { useState, useEffect } from "react";
import { FaLightbulb, FaRobot, FaSeedling } from "react-icons/fa";
import { motion } from "framer-motion";

const recommendationsData = [
  {
    id: 1,
    icon: <FaSeedling className="text-green-500 text-3xl" />,
    title: "Crop Recommendation",
    suggestion: "Based on current soil data, growing **Millets** will yield 25% more profit this season.",
  },
  {
    id: 2,
    icon: <FaRobot className="text-blue-500 text-3xl" />,
    title: "AI Irrigation Tip",
    suggestion: "Automated irrigation at **5 AM and 6 PM** saves up to 18% water usage.",
  },
  {
    id: 3,
    icon: <FaLightbulb className="text-yellow-500 text-3xl" />,
    title: "Fertilizer Optimization",
    suggestion: "Using **organic compost** reduces costs by 20% and improves soil quality long-term.",
  },
];

const AIRecommendations = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-change recommendation every 5 seconds
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
    <section className="bg-gradient-to-r from-green-50 to-blue-50 py-16" id="recommendations">
      <div className="max-w-5xl mx-auto px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-4 flex items-center justify-center gap-2">
          <FaRobot className="text-green-500" /> AI Recommendations
        </h2>
        <p className="text-gray-600 mb-10">
          Smart suggestions tailored for farmers, powered by AI insights.
        </p>

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
              {currentRecommendation.title}
            </h3>
          </div>
          <p className="text-gray-700 text-lg">{currentRecommendation.suggestion}</p>
        </motion.div>
      </div>
    </section>
  );
};

export default AIRecommendations;
