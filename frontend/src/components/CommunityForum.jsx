import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { FaUserCircle, FaFilePdf, FaPhotoVideo } from "react-icons/fa";
import { MdPostAdd } from "react-icons/md";
import ForumSection from "./ForumSection";

// ---------- LocalStorage Helpers ----------
const getPostsFromStorage = () => {
  return JSON.parse(localStorage.getItem("communityPosts")) || [];
};

const savePostsToStorage = (posts) => {
  localStorage.setItem("communityPosts", JSON.stringify(posts));
};

// Convert File → Base64
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });

const CommunityForum = () => {
  const queryClient = useQueryClient();
  const [newPost, setNewPost] = useState({
    title: "",
    content: "",
    image: null,
    file: null,
  });

  // Fetch posts with React Query
  const { data: posts = [] } = useQuery({
    queryKey: ["communityPosts"],
    queryFn: getPostsFromStorage,
  });

  // Mutation: Add a new post
  const addPostMutation = useMutation({
    mutationFn: (postData) => {
      const updated = [postData, ...getPostsFromStorage()];
      savePostsToStorage(updated);
      return updated;
    },
    onSuccess: (data) => {
      queryClient.setQueryData(["communityPosts"], data);
    },
  });

  // File upload handler
  const handleFileChange = async (e, type) => {
    const file = e.target.files[0];
    if (file) {
      const base64 = await toBase64(file);
      setNewPost({ ...newPost, [type]: { name: file.name, data: base64 } });
    }
  };

  // Post submit
  const handlePost = () => {
    if (!newPost.title && !newPost.content) return;

    const postData = {
      id: Date.now(),
      user: "You",
      title: newPost.title,
      content: newPost.content,
      image: newPost.image,
      file: newPost.file,
      createdAt: new Date().toISOString(),
    };

    addPostMutation.mutate(postData);
    setNewPost({ title: "", content: "", image: null, file: null });
  };

  return (
    <section className="max-w-3xl mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold mb-6 text-center text-green-700">
        Community Forum
      </h2>

      {/* New Post Box */}
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

        {/* File Uploads */}
        <div className="flex gap-4 mb-4">
          <label className="flex items-center gap-1 cursor-pointer text-green-700">
            <FaPhotoVideo />
            Image
            <input
              type="file"
              accept="image/*"
              hidden
              onChange={(e) => handleFileChange(e, "image")}
            />
          </label>

          <label className="flex items-center gap-1 cursor-pointer text-green-700">
            <FaFilePdf />
            PDF
            <input
              type="file"
              accept=".pdf,.doc,.docx"
              hidden
              onChange={(e) => handleFileChange(e, "file")}
            />
          </label>
        </div>

        {/* Preview Image/File */}
        {newPost.image && (
          <img
            src={newPost.image.data}
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
              src={post.image.data}
              alt="Post"
              className="w-full max-h-64 object-cover rounded mb-2"
            />
          )}
          {post.file && (
            <a
              href={post.file.data}
              download={post.file.name}
              className="text-blue-600 underline"
            >
              📎 Download: {post.file.name}
            </a>
          )}
        </div>
      ))}
      <ForumSection/>
    </section>
  );
};

export default CommunityForum;
