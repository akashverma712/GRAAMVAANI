import React, { useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SendSMS = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);

  // API base URL from env (fallback to localhost)
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5000";

  const handleSend = async () => {
    if (!title.trim() || !description.trim()) {
      toast.warn("⚠️ Please fill in both Title and Description");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(`${API_BASE_URL}/api/sms/send`, {
        title: title.trim(),
        description: description.trim(),
      });

      if (res.data?.success) {
        toast.success("📩 SMS Sent Successfully!");
        setTitle("");
        setDescription("");
      } else {
        toast.error(res.data?.message || "Failed to send SMS");
      }
    } catch (err) {
      console.error("❌ SMS sending error:", err.response?.data || err.message);
      toast.error(err.response?.data?.message || "Error sending SMS");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          📲 Send Bulk SMS
        </h2>

        {/* Title Input */}
        <input
          type="text"
          placeholder="Enter SMS Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
        />

        {/* Description Input */}
        <textarea
          placeholder="Enter SMS Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-4 py-2 mb-4 border rounded-lg focus:ring-2 focus:ring-green-400 outline-none h-32 resize-none"
        />

        {/* Send Button */}
        <button
          onClick={handleSend}
          disabled={loading}
          className={`w-full py-2 rounded-lg text-white font-semibold transition duration-200 ${
            loading
              ? "bg-green-300 cursor-not-allowed"
              : "bg-green-500 hover:bg-green-600"
          }`}
        >
          {loading ? "Sending..." : "Send SMS"}
        </button>

        {/* Toast Notifications */}
        <ToastContainer position="top-right" autoClose={3000} />
      </div>
    </div>
  );
};

export default SendSMS;
