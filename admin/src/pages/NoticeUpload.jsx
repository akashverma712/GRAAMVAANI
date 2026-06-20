import React, { useState } from 'react';

const NoticeUpload = () => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [file, setFile] = useState(null);
  const [date, setDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !desc || !file) {
      alert('Please fill all required fields!');
      return;
    }

    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', desc);
    formData.append('file', file);
    formData.append('date', date);

    // 🔁 Send this formData to backend (example POST)
    // fetch('/api/notices', { method: 'POST', body: formData })

    console.log('Submitted!');
    alert('Notice uploaded!');
  };

  return (
    <div className="max-w-xl mx-auto bg-white p-6 rounded-xl shadow-md mt-10">
      <h2 className="text-2xl font-bold mb-4 text-green-700 text-center">Upload Notice</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
          <input
            type="text"
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Notice title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
          <textarea
            className="w-full px-4 py-2 border rounded-md"
            placeholder="Short description..."
            rows="3"
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            required
          ></textarea>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Attach PDF File *</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={(e) => setFile(e.target.files[0])}
            required
            className="w-full text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date (optional)</label>
          <input
            type="date"
            className="w-full px-4 py-2 border rounded-md"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700"
        >
          Upload Notice
        </button>
      </form>
    </div>
  );
};

export default NoticeUpload;
