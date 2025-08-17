import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  FaUpload,
  FaCalendarAlt,
  FaClipboard,
  FaTag,
  FaExclamationCircle,
  FaFilePdf,
  FaPhotoVideo,
  FaHeadphones,
  FaTrash,
} from "react-icons/fa";

const NoticeUpload = () => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    category: "General",
    priority: "Low",
    description: "",
    pdfUrl: "",
    imageUrl: "",
    audioUrl: "",
  });

  const [notices, setNotices] = useState([]);

  const categories = ["General", "Emergency", "Health", "Agriculture", "Education"];
  const priorities = ["Low", "Medium", "High"];

  // Load notices from localStorage on mount
  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("notices")) || [];
    setNotices(stored);
  }, []);

  // Save notices to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("notices", JSON.stringify(notices));
  }, [notices]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newNotice = {
      id: Date.now(),
      ...formData,
    };

    setNotices([newNotice, ...notices]);

    toast.success("✅ Notice Uploaded Successfully!", {
      position: "top-right",
      autoClose: 3000,
    });

    setFormData({
      title: "",
      date: "",
      category: "General",
      priority: "Low",
      description: "",
      pdfUrl: "",
      imageUrl: "",
      audioUrl: "",
    });
  };

  const handleDelete = (id) => {
    setNotices(notices.filter((n) => n.id !== id));
    toast.info("🗑️ Notice deleted", { autoClose: 2000 });
  };

  return (
    <motion.section
      className="max-w-3xl mx-auto px-6 py-10 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold text-green-700 mb-6 flex items-center gap-2">
        <FaUpload /> Upload Panchayat Notice
      </h2>

      {/* Upload Form */}
      <form className="space-y-5" onSubmit={handleSubmit}>
        {/* Title */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <FaClipboard /> Title
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Date */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <FaCalendarAlt /> Date
          </label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            required
          />
        </div>

        {/* Category */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <FaTag /> Category
          </label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            {categories.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>

        {/* Priority */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <FaExclamationCircle /> Priority
          </label>
          <select
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
          >
            {priorities.map((p) => (
              <option key={p} value={p}>
                {p}
              </option>
            ))}
          </select>
        </div>

        {/* Description */}
        <div>
          <label className="flex items-center gap-2 font-medium text-gray-700">
            <FaClipboard /> Description
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full border rounded px-3 py-2 mt-1"
            rows="3"
          />
        </div>

        {/* Attachments */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="flex items-center gap-2 text-gray-700">
              <FaFilePdf /> PDF Link
            </label>
            <input
              type="url"
              name="pdfUrl"
              value={formData.pdfUrl}
              onChange={handleChange}
              placeholder="https://example.com/file.pdf"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700">
              <FaPhotoVideo /> Image Link
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              placeholder="https://example.com/image.jpg"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>

          <div>
            <label className="flex items-center gap-2 text-gray-700">
              <FaHeadphones /> Audio Link
            </label>
            <input
              type="url"
              name="audioUrl"
              value={formData.audioUrl}
              onChange={handleChange}
              placeholder="https://example.com/audio.mp3"
              className="w-full border rounded px-3 py-2 mt-1"
            />
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full bg-green-600 text-white font-semibold py-2 rounded hover:bg-green-700 transition"
        >
          Upload Notice
        </button>
      </form>

      {/* Notices List */}
      <div className="mt-10 space-y-6">
        {notices.map((notice) => (
          <motion.div
            key={notice.id}
            className="p-5 border rounded-lg shadow-md bg-gray-50"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-green-700">{notice.title}</h3>
              <button
                onClick={() => handleDelete(notice.id)}
                className="text-red-600 hover:text-red-800"
              >
                <FaTrash />
              </button>
            </div>
            <p className="text-sm text-gray-600">📅 {notice.date}</p>
            <p className="text-sm">🏷️ {notice.category} | ⚡ {notice.priority}</p>
            <p className="mt-2 text-gray-800">{notice.description}</p>

            {/* Attachments */}
            <div className="mt-3 space-y-2">
              {notice.pdfUrl && (
                <a
                  href={notice.pdfUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="text-blue-600 underline flex items-center gap-1"
                >
                  <FaFilePdf /> View PDF
                </a>
              )}
              {notice.imageUrl && (
                <img
                  src={notice.imageUrl}
                  alt="Notice"
                  className="w-full max-h-60 object-cover rounded"
                />
              )}
              {notice.audioUrl && (
                <audio controls className="w-full mt-2">
                  <source src={notice.audioUrl} type="audio/mpeg" />
                  Your browser does not support audio playback.
                </audio>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <ToastContainer />
    </motion.section>
  );
};

export default NoticeUpload;
