// components/SchemeForm.jsx
import React, { useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const SchemeForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    audioUrl: "",
    media: [""],
    description: "",
    eligibility: "",
    applicationProcess: "",
    deadlines: "",
  });

  const categories = ["health", "agriculture", "general", "schemes"];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleMediaChange = (index, value) => {
    const newMedia = [...formData.media];
    newMedia[index] = value;
    setFormData((prev) => ({ ...prev, media: newMedia }));
  };

  const addMediaField = () => {
    setFormData((prev) => ({ ...prev, media: [...prev.media, ""] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token"); // replace with secure token retrieval
      await axios.post("http://localhost:5000/api/governmentscheme", formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      toast.success("Scheme posted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to submit scheme.");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-6 rounded-lg shadow border">
      <h2 className="text-2xl font-bold mb-4 text-green-700">Post New Scheme</h2>
      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label className="block text-green-700 text-sm font-medium">Scheme Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Category</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border rounded-md"
          >
            <option value="">Select Category</option>
            {categories.map((cat) => (
              <option key={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Audio URL</label>
          <input
            name="audioUrl"
            type="url"
            value={formData.audioUrl}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Media URLs</label>
          {formData.media.map((media, idx) => (
            <input
              key={idx}
              type="url"
              placeholder="Media URL"
              value={media}
              onChange={(e) => handleMediaChange(idx, e.target.value)}
              className="w-full px-4 py-2 border rounded-md mb-2"
            />
          ))}
          <button
            type="button"
            onClick={addMediaField}
            className="text-green-500 hover:underline text-sm"
          >
            + Add another media
          </button>
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Description</label>
          <textarea
            name="description"
            rows="3"
            value={formData.description}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Eligibility</label>
          <textarea
            name="eligibility"
            rows="2"
            value={formData.eligibility}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Application Process</label>
          <textarea
            name="applicationProcess"
            rows="2"
            value={formData.applicationProcess}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <div>
          <label className="block text-green-700 text-sm font-medium">Deadline</label>
          <input
            type="date"
            name="deadlines"
            value={formData.deadlines}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md"
        >
          Submit Scheme
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SchemeForm;
