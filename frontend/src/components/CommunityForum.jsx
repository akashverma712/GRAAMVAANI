import React, { useState } from 'react';
import { FaUserCircle, FaFilePdf, FaPhotoVideo, FaFileUpload } from 'react-icons/fa';
import { MdPostAdd } from 'react-icons/md';

const CommunityForum = () => {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState({ title: '', content: '', image: null, file: null });

  const handleFileChange = (e, type) => {
    const file = e.target.files[0];
    if (file) {
      setNewPost({ ...newPost, [type]: file });
    }
  };

  const handlePost = () => {
    if (!newPost.title && !newPost.content) return;

    const postData = {
      id: posts.length + 1,
      user: 'You',
      title: newPost.title,
      content: newPost.content,
      image: newPost.image,
      file: newPost.file,
      createdAt: new Date(),
    };

    setPosts([postData, ...posts]);
    setNewPost({ title: '', content: '', image: null, file: null });
  };

  const getFileUrl = (file) => {
    return file ? URL.createObjectURL(file) : '';
  };

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Community Forum</h2>

      {/* Create Post */}
      <div className="bg-white p-4 rounded-xl shadow mb-8">
        <div className="flex items-center gap-2 mb-3 text-green-700 font-semibold">
          <FaUserCircle size={26} />
          <span>You</span>
        </div>
        <input
          type="text"
          placeholder="Post title"
          className="w-full border p-2 rounded mb-2"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="What's your question or discussion?"
          rows={3}
          className="w-full border p-2 rounded mb-2"
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        />

        {/* Upload buttons */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-1 cursor-pointer text-green-700">
            <FaPhotoVideo />
            Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, 'image')}
            />
          </label>

          <label className="flex items-center gap-1 cursor-pointer text-green-700">
            <FaFilePdf />
            PDF
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) => handleFileChange(e, 'file')}
            />
          </label>
        </div>

        {newPost.image && (
          <img
            src={getFileUrl(newPost.image)}
            alt="Uploaded"
            className="w-full max-h-64 object-cover rounded mb-2"
          />
        )}
        {newPost.file && (
          <p className="text-sm text-gray-700 mb-2">
            📎 <strong>{newPost.file.name}</strong>
          </p>
        )}

        <button
          onClick={handlePost}
          className="bg-green-600 text-white px-4 py-2 rounded flex items-center gap-2 hover:bg-green-700"
        >
          <MdPostAdd />
          Post
        </button>
      </div>

      {/* Posts List */}
      {posts.map((post) => (
        <div key={post.id} className="bg-white p-4 rounded-xl shadow mb-6">
          <div className="flex items-center gap-2 text-green-700 mb-1 font-medium">
            <FaUserCircle size={22} />
            {post.user}
          </div>
          <h3 className="font-bold text-lg">{post.title}</h3>
          <p className="text-gray-800 mb-2">{post.content}</p>

          {post.image && (
            <img
              src={getFileUrl(post.image)}
              alt="Post"
              className="w-full max-h-64 object-cover rounded mb-2"
            />
          )}
          {post.file && (
            <a
              href={getFileUrl(post.file)}
              download={post.file.name}
              className="text-blue-600 underline"
            >
              📎 Download: {post.file.name}
            </a>
          )}
        </div>
      ))}
    </section>
  );
};

export default CommunityForum;
