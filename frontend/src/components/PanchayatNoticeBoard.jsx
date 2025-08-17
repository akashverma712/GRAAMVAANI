import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaFilePdf,
  FaPhotoVideo,
  FaHeadphones,
  FaExclamationCircle,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

const categories = ["All", "Emergency", "Health", "Agriculture", "Education"];

const PanchayatNoticeBoard = () => {
  // ✅ Load from localStorage or fallback to dummy data
  const [notices, setNotices] = useState(() => {
    const saved = localStorage.getItem("panchayat_notices");
    return saved
      ? JSON.parse(saved)
      : [
          {
            id: 1,
            title: "Water Contamination Alert",
            date: "2025-08-16",
            category: "Emergency",
            priority: "High",
            description:
              "Avoid using well water for drinking. Health authorities investigating.",
            pdfUrl: "/pdfs/water-contamination.pdf",
            imageUrl: "/images/water-safety.jpg",
            audioUrl: "/audio/water-alert.mp3",
          }
         
        ];
  });

  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [acknowledged, setAcknowledged] = useState(() => {
    const saved = localStorage.getItem("panchayat_acknowledged");
    return saved ? JSON.parse(saved) : [];
  });
  const [feedbacks, setFeedbacks] = useState(() => {
    const saved = localStorage.getItem("panchayat_feedbacks");
    return saved ? JSON.parse(saved) : {};
  });
  const [popupNotice, setPopupNotice] = useState(null);

  // ✅ Sync to localStorage whenever things change
  useEffect(() => {
    localStorage.setItem("panchayat_notices", JSON.stringify(notices));
  }, [notices]);

  useEffect(() => {
    localStorage.setItem("panchayat_acknowledged", JSON.stringify(acknowledged));
  }, [acknowledged]);

  useEffect(() => {
    localStorage.setItem("panchayat_feedbacks", JSON.stringify(feedbacks));
  }, [feedbacks]);

  // Filtered notices
  const filtered = notices.filter(
    (n) =>
      (filter === "All" || n.category === filter) &&
      n.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleAcknowledge = (id) => {
    if (!acknowledged.includes(id)) setAcknowledged([...acknowledged, id]);
  };

  const handleFeedback = (id, value) => {
    setFeedbacks({ ...feedbacks, [id]: value });
  };

  return (
    <section className="max-w-5xl mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">
        Panchayat Notices
      </h2>

      {/* Filters */}
      <div className="flex flex-wrap justify-center gap-4 mb-6">
        <input
          type="text"
          placeholder="Search notices..."
          className="border rounded px-3 py-2 w-full max-w-xs"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {categories.map((cat) => (
          <button
            key={cat}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition ${
              filter === cat
                ? "bg-green-600 text-white shadow"
                : "text-green-700 border-green-600 hover:bg-green-50"
            }`}
            onClick={() => setFilter(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Notices */}
      <div className="space-y-4">
        {filtered.map((notice) => (
          <motion.div
            key={notice.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="border-l-4 border-green-600 hover:bg-green-50 transition p-5 rounded shadow relative"
          >
            {/* Priority Tag */}
            {notice.priority === "High" && (
              <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold flex items-center gap-1">
                <FaExclamationCircle /> {notice.priority}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3 mb-2">
              <span className="flex items-center gap-1 text-sm text-gray-500">
                <FaCalendarAlt /> {new Date(notice.date).toLocaleDateString()}
              </span>
              <span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">
                {notice.category}
              </span>
            </div>

            <h3 className="text-lg font-semibold text-gray-800">
              {notice.title}
            </h3>
            <p className="text-gray-700 mb-2">{notice.description}</p>

            {/* Attachments */}
            <div className="flex flex-wrap gap-4 mt-2">
              {notice.pdfUrl && (
                <a
                  href={notice.pdfUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1 text-blue-600 hover:underline"
                >
                  <FaFilePdf /> PDF
                </a>
              )}
              {notice.imageUrl && (
                <a
                  onClick={() => setPopupNotice(notice)}
                  className="flex items-center gap-1 text-green-700 cursor-pointer hover:underline"
                >
                  <FaPhotoVideo /> View Image
                </a>
              )}
              {notice.audioUrl && (
                <audio controls className="w-full max-w-xs">
                  <source src={notice.audioUrl} type="audio/mp3" />
                </audio>
              )}
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-4 mt-3 text-sm">
              <button
                onClick={() => handleAcknowledge(notice.id)}
                disabled={acknowledged.includes(notice.id)}
                className={`flex items-center gap-1 px-3 py-1 rounded text-white font-semibold ${
                  acknowledged.includes(notice.id)
                    ? "bg-gray-400"
                    : "bg-green-600 hover:bg-green-700"
                }`}
              >
                <FaCheckCircle />{" "}
                {acknowledged.includes(notice.id)
                  ? "Acknowledged"
                  : "Acknowledge"}
              </button>

              <input
                type="text"
                placeholder="Leave feedback..."
                className="border rounded px-2 py-1 text-sm"
                value={feedbacks[notice.id] || ""}
                onChange={(e) => handleFeedback(notice.id, e.target.value)}
              />
              <button
                onClick={() =>
                  alert(`Feedback submitted: ${feedbacks[notice.id]}`)
                }
                className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
              >
                Submit
              </button>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Popup Modal for Image */}
      <AnimatePresence>
        {popupNotice && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg max-w-2xl w-full p-4 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <img
                src={popupNotice.imageUrl}
                alt={popupNotice.title}
                className="w-full rounded"
              />
              <button
                onClick={() => setPopupNotice(null)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 text-xl"
              >
                ✖
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PanchayatNoticeBoard;
