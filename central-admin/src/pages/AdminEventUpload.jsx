import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const categories = ["Community", "Health", "Agriculture", "Education", "Environment"];

const AdminEventUpload = () => {
  const [events, setEvents] = useState(() => {
    const saved = localStorage.getItem("events");
    return saved ? JSON.parse(saved) : [];
  });

  const [formData, setFormData] = useState({
    title: "",
    date: "",
    description: "",
    category: "Community",
  });

  // save to localStorage whenever events change
  useEffect(() => {
    localStorage.setItem("events", JSON.stringify(events));
  }, [events]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = { id: Date.now(), ...formData };
    setEvents([...events, newEvent]);
    toast.success("✅ Event Uploaded!");
    setFormData({ title: "", date: "", description: "", category: "Community" });
  };

  const handleDelete = (id) => {
    setEvents(events.filter((e) => e.id !== id));
    toast.info("🗑️ Event Deleted");
  };

  return (
    <motion.section
      className="max-w-3xl mx-auto px-6 py-8 bg-white shadow-lg rounded-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <h2 className="text-2xl font-bold text-green-700 mb-4"> Admin Event Upload</h2>

      <form className="space-y-4" onSubmit={handleSubmit}>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Event Title"
          className="w-full border rounded px-3 py-2"
          required
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
          required
        />
        <select
          name="category"
          value={formData.category}
          onChange={handleChange}
          className="w-full border rounded px-3 py-2"
        >
          {categories.map((c) => (
            <option key={c}>{c}</option>
          ))}
        </select>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Event Description"
          rows="3"
          className="w-full border rounded px-3 py-2"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Upload Event
        </button>
      </form>

      {/* Show uploaded events */}
      <div className="mt-6 space-y-3">
        {events.map((event) => (
          <div
            key={event.id}
            className="border p-3 rounded flex justify-between items-center bg-gray-50"
          >
            <div>
              <h3 className="font-semibold">{event.title}</h3>
              <p className="text-sm text-gray-600">
                {event.date} • {event.category}
              </p>
            </div>
            <button
              onClick={() => handleDelete(event.id)}
              className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </motion.section>
  );
};

export default AdminEventUpload;
