import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaUsers, FaSeedling, FaSmileBeam } from "react-icons/fa";

const stories = [
  {
    id: 1,
    name: "Ravi Kumar",
    village: "Rampur",
    title: "Organic Farming Success",
    description:
      "Ravi transformed his 2-acre land into a profitable organic farm, increasing income by 60%.",
    image:
      "https://avatars.mds.yandex.net/i?id=39715e1d4a865f728df20ea8b795c5dbdeef336d-12496730-images-thumbs&n=13",
    achievements: [
      "Switched from chemical farming to organic methods",
      "Sold produce directly in urban organic markets",
      "Trained 25 other farmers in organic farming"
    ],
    impactStats: [
      { icon: <FaSeedling />, label: "Crop Yield", value: "↑ 60%" },
      { icon: <FaUsers />, label: "Farmers Trained", value: "25" },
      { icon: <FaSmileBeam />, label: "Family Income", value: "↑ 45%" }
    ],
    quote:
      "Organic farming not only increased my income, but also improved the health of my soil and my family."
  },
  {
    id: 2,
    name: "Sita Devi",
    village: "Lakhanpur",
    title: "Women Self Help Group",
    description:
      "Led a group of 20 women to start a handicraft business, creating jobs and economic independence.",
    image:
      "https://avatars.mds.yandex.net/i?id=c2a8aedcc82d1f6a2b348eee69ccc3de5270f8de-5014298-images-thumbs&n=13",
    achievements: [
      "Established a women-led handicraft cooperative",
      "Exported products to 3 different states",
      "Provided skill training to 50+ women"
    ],
    impactStats: [
      { icon: <FaUsers />, label: "Jobs Created", value: "20+" },
      { icon: <FaSeedling />, label: "States Reached", value: "3" },
      { icon: <FaSmileBeam />, label: "Income Growth", value: "↑ 70%" }
    ],
    quote:
      "Empowering women is the key to uplifting the whole village."
  },
  {
    id: 3,
    name: "Mohit Singh",
    village: "Dharampur",
    title: "Digital Literacy Advocate",
    description:
      "Started a free computer class for kids and adults in the village using old laptops.",
    image:
      "https://avatars.mds.yandex.net/i?id=d6ad55ba19099f6086fa06828f3cb263c1e3b176-5451642-images-thumbs&n=13",
    achievements: [
      "Collected and refurbished 15 old laptops",
      "Taught basic computer skills to 100+ people",
      "Partnered with NGOs for internet access"
    ],
    impactStats: [
      { icon: <FaUsers />, label: "Students Trained", value: "100+" },
      { icon: <FaSeedling />, label: "Laptops Donated", value: "15" },
      { icon: <FaSmileBeam />, label: "Community Satisfaction", value: "95%" }
    ],
    quote:
      "When a child learns how to use the internet for education, the whole family learns with them."
  }
];

const Stories = () => {
  const [selected, setSelected] = useState(null);

  return (
    <section className="py-12 px-4 max-w-6xl mx-auto">
      <h2 className="text-3xl font-bold text-green-700 mb-8">
        Success Story Wall
      </h2>

      <div className="grid md:grid-cols-3 gap-6">
        {stories.map((story, index) => (
          <motion.div
            key={story.id}
            whileHover={{ scale: 1.02 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="bg-white rounded-xl shadow hover:shadow-lg overflow-hidden"
          >
            <img
              src={story.image}
              alt={story.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-green-800">
                {story.title}
              </h3>
              <p className="text-sm text-gray-600 mt-1">
                by {story.name} from {story.village}
              </p>
              <p className="text-gray-700 mt-2 line-clamp-3">
                {story.description}
              </p>
              <button
                className="text-green-600 mt-3 font-medium hover:underline"
                onClick={() => setSelected(story)}
              >
                Read More →
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {selected && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => setSelected(null)}
        >
          <motion.div
            className="bg-white rounded-xl max-w-2xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-400 hover:text-red-500 text-2xl cursor-pointer m-4"
            >
              &times;
            </button>

            {/* Profile */}
            <img
              src={selected.image}
              alt={selected.title}
              className="w-full h-60 object-cover rounded-lg"
            />
            <h3 className="text-2xl font-bold mt-4 text-green-800">
              {selected.title}
            </h3>
            <p className="text-sm text-gray-600 mb-1">
              by {selected.name} from {selected.village}
            </p>

            {/* Story Overview */}
            <div className="mt-4">
              <h4 className="font-semibold text-lg text-gray-800">
                Story Overview
              </h4>
              <p className="text-gray-700 mt-2">{selected.description}</p>
            </div>

            {/* Achievements */}
            <div className="mt-4">
              <h4 className="font-semibold text-lg text-gray-800">
                Achievements
              </h4>
              <ul className="list-disc pl-5 text-gray-700 mt-2 space-y-1">
                {selected.achievements.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </div>

            {/* Impact Stats */}
            <div className="mt-4">
              <h4 className="font-semibold text-lg text-gray-800">
                Impact
              </h4>
              <div className="grid grid-cols-3 gap-4 mt-2">
                {selected.impactStats.map((stat, i) => (
                  <div
                    key={i}
                    className="flex flex-col items-center bg-gray-50 p-3 rounded-lg"
                  >
                    <div className="text-2xl text-green-600">{stat.icon}</div>
                    <div className="text-lg font-bold">{stat.value}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quote */}
            <div className="mt-4 bg-green-50 p-4 rounded-lg italic text-green-800">
              “{selected.quote}”
            </div>
          </motion.div>
        </motion.div>
      )}
    </section>
  );
};

export default Stories;
