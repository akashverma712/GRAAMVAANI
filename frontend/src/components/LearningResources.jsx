import React from "react";
import { motion } from "framer-motion";
import { FaHeadphones, FaVideo, FaFilePdf } from "react-icons/fa";
import AudioPlayer from "./AudioPlayer";

const resources = {
  audio: [
   {
    id: 1,
    title: "Health Awareness - Nutrition",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Education - Digital Learning",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Agriculture Guidance",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Government Schemes Info",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Women Empowerment Story",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  },
  {
    id: 6,
    title: "Skill Development Training",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3"
  },
  ],
  video: [
    { category: "Education", title: "Basic computer learning", url: "https://www.youtube.com/embed/6mbwJ2xhgzM" },
    { category: "Agriculture", title: "Modern irrigation techniques", url: "https://www.youtube.com/embed/UxszL_l3Q2M" },
  ],
  pdf: [
    { category: "Health", title: "Health & Safety Guide", url: "https://example.com/health-guide.pdf" },
    { category: "Education", title: "Education Policy", url: "https://example.com/education-policy.pdf" },
    { category: "Agriculture", title: "Farming Best Practices", url: "https://example.com/farming-guide.pdf" },
    { category: "Schemes", title: "Govt Schemes Info", url: "https://example.com/govt-schemes.pdf" },
  ],
};

const ResourceSection = () => {
  return (
    <section className="max-w-7xl mx-auto px-6 py-12 grid gap-8 md:grid-cols-3">
		{/* Video Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-blue-50 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-blue-800 flex items-center gap-2 mb-4">
          <FaVideo /> Helpful Videos
        </h3>
        {resources.video.map((v, i) => (
          <div key={i} className="mb-6">
            <h4 className="font-semibold text-gray-800">{v.category}</h4>
            <p className="text-sm text-gray-600">{v.title}</p>
            <iframe
              src={v.url}
              title={v.title}
              className="w-full aspect-video rounded mt-2"
              allowFullScreen
            />
          </div>
        ))}
      </motion.div>
      {/* Audio Section */}
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-green-50 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-green-800 flex items-center gap-2 mb-4">
          <FaHeadphones /> Useful Audios
        </h3>
        {resources.audio.map((a, i) => (
          <div key={i} className="mb-6">
            <h4 className="font-semibold text-gray-800">{a.category}</h4>
            <p className="text-sm text-gray-600">{a.title}</p>
            <audio controls className="w-full mt-2">
              <source src={a.url} type="audio/mpeg" />
            </audio>
          </div>
        ))}
		  <AudioPlayer/>
      </motion.div>



      {/* PDF Section */}
      <motion.div
        initial={{ opacity: 0, x: 50 }}
        whileInView={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-red-50 p-6 rounded-xl shadow-lg"
      >
        <h3 className="text-xl font-bold text-red-800 flex items-center gap-2 mb-4">
          <FaFilePdf />  PDFs
        </h3>
        {resources.pdf.map((p, i) => (
          <div key={i} className="mb-4">
            <h4 className="font-semibold text-gray-800">{p.category}</h4>
            <a
              href={p.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-red-600 hover:underline"
            >
              {p.title}
            </a>
          </div>
        ))}
      </motion.div>
    </section>
  );
};

export default ResourceSection;
