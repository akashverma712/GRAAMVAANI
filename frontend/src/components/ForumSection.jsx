import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaSearch, FaThumbsUp, FaThumbsDown } from "react-icons/fa";

const forumPosts = [
  {
    id: 1,
    question: "How can I increase rice yield with sustainable farming?",
    answer:
      "Try crop rotation, organic fertilizers, and AI-powered weather predictions provided by our platform.",
    category: "Farming",
  },
  {
    id: 2,
    question: "How do I apply for the women entrepreneur microloan?",
    answer:
      "You can apply directly from our loan portal. Eligibility requires basic KYC and business plan submission.",
    category: "Finance",
  },
  {
    id: 3,
    question: "What AI tools are available for soil testing?",
    answer:
      "Our platform offers AI-driven soil analysis through image uploads and real-time data collection.",
    category: "Technology",
  },
];

const ForumSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [votes, setVotes] = useState({});

  const handleVote = (id, type) => {
    setVotes((prev) => ({
      ...prev,
      [id]: type === "up" ? (prev[id] === "up" ? null : "up") : (prev[id] === "down" ? null : "down"),
    }));
  };

  const filteredPosts = forumPosts.filter(
    (post) =>
      post.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section id="forum" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-6">
        

        {/* Search Bar */}
        <div className="flex items-center max-w-xl mx-auto bg-gray-100 rounded-full px-4 py-2 mb-10 shadow-md">
          <FaSearch className="text-gray-500" />
          <input
            type="text"
            placeholder="Search questions or categories..."
            className="flex-1 bg-transparent outline-none px-3"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Forum Posts */}
        <div className="space-y-6">
          {filteredPosts.map((post) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-gray-50 p-6 rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <h3 className="text-lg font-semibold text-gray-800">
                {post.question}
              </h3>
              <p className="text-sm text-green-600 mb-3">#{post.category}</p>
              <p className="text-gray-600">{post.answer}</p>

              {/* Voting System */}
              <div className="flex items-center gap-4 mt-4">
                <button
                  onClick={() => handleVote(post.id, "up")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    votes[post.id] === "up"
                      ? "bg-green-200 text-green-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaThumbsUp /> Upvote
                </button>
                <button
                  onClick={() => handleVote(post.id, "down")}
                  className={`flex items-center gap-1 px-3 py-1 rounded-full text-sm ${
                    votes[post.id] === "down"
                      ? "bg-red-200 text-red-800"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  <FaThumbsDown /> Downvote
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ForumSection;
