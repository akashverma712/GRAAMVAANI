// CommunityForum.jsx

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaUserCircle } from 'react-icons/fa';

const CommunityForum = () => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      user: 'Seema Devi',
      title: 'How to apply for government subsidies?',
      content: 'I want to know how to access farming subsidies. Can someone guide me?',
      comments: [
        { id: 1, user: 'Ravi Kumar', text: 'Visit your nearest panchayat office. They will help you.' },
        { id: 2, user: 'Anita Yadav', text: 'You can also apply through CSC centers.' }
      ]
    },
    {
      id: 2,
      user: 'Manoj Singh',
      title: 'Any tips on organic farming?',
      content: 'I want to switch to organic. Need help from someone experienced.',
      comments: []
    }
  ]);

  const [newPost, setNewPost] = useState({ title: '', content: '' });

  const handleNewPost = () => {
    if (newPost.title && newPost.content) {
      const newId = posts.length + 1;
      setPosts([
        ...posts,
        {
          id: newId,
          user: 'You',
          title: newPost.title,
          content: newPost.content,
          comments: []
        }
      ]);
      setNewPost({ title: '', content: '' });
    }
  };

  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="px-4 py-16 max-w-4xl mx-auto"
    >
      <h2 className="text-3xl font-bold text-green-800 mb-6 text-center">Community Forum</h2>

      <div className="mb-10 p-4 border rounded-xl shadow-sm bg-white">
        <h3 className="text-xl font-semibold mb-2">Start a New Discussion</h3>
        <input
          type="text"
          placeholder="Title"
          className="w-full p-2 border rounded mb-2"
          value={newPost.title}
          onChange={(e) => setNewPost({ ...newPost, title: e.target.value })}
        />
        <textarea
          placeholder="Your question or message..."
          className="w-full p-2 border rounded mb-2"
          rows={4}
          value={newPost.content}
          onChange={(e) => setNewPost({ ...newPost, content: e.target.value })}
        ></textarea>
        <button
          onClick={handleNewPost}
          className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
        >
          Post
        </button>
      </div>

      {posts.map((post) => (
        <motion.div
          key={post.id}
          whileHover={{ scale: 1.02 }}
          className="mb-6 p-4 border rounded-xl bg-white shadow-sm"
        >
          <div className="flex items-center gap-2 text-green-700 mb-1">
            <FaUserCircle size={24} />
            <span className="font-medium">{post.user}</span>
          </div>
          <h4 className="text-xl font-bold mb-1">{post.title}</h4>
          <p className="text-gray-700 mb-3">{post.content}</p>
          <div className="pl-4 border-l-2 border-green-300">
            {post.comments.map((comment) => (
              <p key={comment.id} className="text-sm text-gray-600 mb-1">
                <strong>{comment.user}:</strong> {comment.text}
              </p>
            ))}
          </div>
        </motion.div>
      ))}
    </motion.section>
  );
};

export default CommunityForum;
