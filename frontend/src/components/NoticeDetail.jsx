import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const dummyNotices = [
  {
    id: 1,
    title: "Gram Sabha Meeting on Clean Water",
    date: "2025-07-21",
    category: "Health",
    description: "Discussion on safe drinking water initiatives and waterborne disease prevention.",
    pdfUrl: "/pdfs/clean-water-meeting.pdf",
  },
  {
    id: 2,
    title: "Government Scheme Awareness Drive",
    date: "2025-07-25",
    category: "Education",
    description: "Details about the schemes for youth and women development.",
    pdfUrl: "/pdfs/scheme-awareness.pdf",
  },
  {
    id: 3,
    title: "Farmer Loan Waiver Update",
    date: "2025-07-20",
    category: "Agriculture",
    description: "Updates on farmer loan waiver applications.",
    pdfUrl: "/pdfs/loan-waiver.pdf",
  },
];

const categories = ["All", "Health", "Education", "Agriculture"];

const Notices = () => {
  const [filter, setFilter] = useState("All");

  const filtered = filter === "All"
    ? dummyNotices
    : dummyNotices.filter(notice => notice.category === filter);

  return (
    <section className="px-4 py-12 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="text-3xl font-bold mb-6 text-center text-green-700">Latest Notices</h2>

        <div className="flex justify-center mb-6 gap-3 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              className={`px-4 py-2 rounded-full text-sm font-semibold border
                ${filter === cat ? "bg-green-600 text-white" : "text-green-700 border-green-600"}
              `}
              onClick={() => setFilter(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map(notice => (
            <motion.div
              key={notice.id}
              whileHover={{ scale: 1.02 }}
              className="border rounded-xl p-5 shadow-md hover:shadow-lg transition flex flex-col justify-between"
            >
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm text-gray-500">
                    {new Date(notice.date).toDateString()}
                  </span>
                  <span className="text-xs px-2 py-1 bg-green-100 text-green-700 rounded-full">
                    {notice.category}
                  </span>
                </div>
                <h3 className="text-xl font-semibold mb-1">{notice.title}</h3>
                <p className="text-sm text-gray-700">{notice.description}</p>
              </div>
              <div className="mt-4 flex gap-3">
                <Link
                  to={`/notice/${notice.id}`}
                  className="text-green-600 hover:underline text-sm font-medium"
                >
                  View Details
                </Link>
                <a
                  href={notice.pdfUrl}
                  download
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-600 hover:underline"
                >
                  📄 Download PDF
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  );
};

export default Notices;
