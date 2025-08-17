import { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaRegFilePdf, FaArrowRight, FaCalendarAlt } from 'react-icons/fa';
const dummyNotices = [
	{
		id: 1,
		title: 'Gram Sabha Meeting on Clean Water',
		date: '2025-07-21',
		category: 'Health',
		description: 'Discussion on safe drinking water initiatives and waterborne disease prevention.',
		pdfUrl: '/pdfs/clean-water-meeting.pdf',
	}
];

const categories = ['All', 'Health', 'Education', 'Agriculture'];

const Notices = () => {
	const [filter, setFilter] = useState('All');

	const filtered = filter === 'All' ? dummyNotices : dummyNotices.filter((notice) => notice.category === filter);

	return (
		<section className="px-4 py-12 max-w-5xl mx-auto">
			<motion.div
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				viewport={{ once: true }}>
				<h2 className="text-3xl font-bold mb-8 text-center text-green-700">Latest Notices</h2>

				{/* Category Filters */}
				<div className="flex justify-center mb-8 gap-3 flex-wrap">
					{categories.map((cat) => (
						<button
							key={cat}
							className={`px-4 py-2 rounded-full text-sm font-semibold border transition
                ${filter === cat ? 'bg-green-600 text-white shadow' : 'text-green-700 border-green-600 hover:bg-green-50'}
              `}
							onClick={() => setFilter(cat)}>
							{cat}
						</button>
					))}
				</div>

				{/* Notice List */}
				<div className="space-y-4">
					{filtered.map((notice, idx) => (
						<motion.div
							key={notice.id}
							whileHover={{ scale: 1.01, backgroundColor: '#f9fdfb' }}
							className="flex items-start gap-4 p-5 border rounded-lg shadow-sm hover:shadow-md transition">
							{/* Timeline Dot */}
							<div className="flex flex-col items-center">
								<span className="w-3 h-3 bg-green-600 rounded-full mt-2"></span>
								{idx < filtered.length - 1 && <span className="w-[2px] h-full bg-green-200"></span>}
							</div>

							{/* Notice Content */}
							<div className="flex-1">
								<div className="flex flex-wrap items-center gap-3 mb-2">
									<span className="flex items-center gap-1 text-sm text-gray-500">
										<FaCalendarAlt /> {new Date(notice.date).toLocaleDateString()}
									</span>
									<span className="px-2 py-0.5 text-xs font-medium bg-green-100 text-green-700 rounded-full">{notice.category}</span>
								</div>

								<h3 className="text-lg font-semibold text-gray-800">{notice.title}</h3>
								<p className="text-sm text-gray-600 mt-1">{notice.description}</p>

								{/* Actions */}
								<div className="mt-3 flex gap-4 text-sm">
									<Link
										to={`/notice/${notice.id}`}
										className="flex items-center gap-1 text-green-600 font-medium hover:underline">
										View Details <FaArrowRight size={12} />
									</Link>
									{notice.pdfUrl && (
										<a
											href={notice.pdfUrl}
											download
											target="_blank"
											rel="noopener noreferrer"
											className="flex items-center gap-1 text-blue-600 hover:underline">
											<FaRegFilePdf /> Download PDF
										</a>
									)}
								</div>
							</div>
						</motion.div>
					))}
				</div>
			</motion.div>
		</section>
	);
};

export default Notices;
