import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { FaMobileAlt, FaBroadcastTower, FaGlobe, FaSms, FaLock, FaServer, FaCloud, FaCodeBranch } from 'react-icons/fa';

export default function Hero() {
	const { t } = useTranslation();
	const [showPopup, setShowPopup] = useState(false);

	const workflowSteps = [
		{
			step: '1. Admin/Officials Post Notices',
			description: 'Authorized officials log in and create new notices, events, or announcements using the admin dashboard.',
		},
		{
			step: '2. Validation & Storage',
			description: 'The system validates inputs (title, content, category, date, media, etc.) and stores them securely in the database.',
		},
		{
			step: '3. Real-Time Display',
			description: 'Posted notices are instantly displayed on the website’s digital notice board for students, staff, and villagers.',
		},
		{
			step: '4. User Access',
			description: 'Users can browse notices, search/filter them by category, and read details without logging in.',
		},
		{
			step: '5. Success Stories & Community Impact',
			description: 'Beyond notices, users can explore impact stories, achievements, and updates that showcase growth and innovation.',
		},
	];

	return (
		<>
			<motion.section
				initial={{ opacity: 0, scale: 0.95 }}
				whileInView={{ opacity: 1, scale: 1 }}
				transition={{ duration: 0.8 }}
				className="relative bg-green-50 py-20 px-6 md:px-10 lg:px-16 overflow-hidden">
				{/* Decorative BG Circles */}
				<div className="absolute top-0 left-0 w-48 h-48 bg-green-900 rounded-full mix-blend-multiply opacity-30 animate-pulse blur-3xl"></div>
				<div className="absolute bottom-0 right-0 w-64 h-64 bg-green-200 rounded-full mix-blend-multiply opacity-40 blur-3xl"></div>

				<div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-10 relative z-10">
					{/* Text Content */}
					<div className="text-center md:text-left flex-1">
						<motion.h2
							initial={{ opacity: 0, y: 30 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ duration: 0.6 }}
							className="text-4xl md:text-5xl font-bold text-green-800 leading-snug">
							{t('hero.heading')}
						</motion.h2>

						<motion.p
							initial={{ opacity: 0, y: 20 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
							className="mt-4 max-w-xl text-lg text-gray-700">
							<strong className="text-green-700">GramVaani</strong> {t('hero.description')}
						</motion.p>

						<motion.div
							initial={{ opacity: 0, y: 10 }}
							whileInView={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
							className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">

							<button
								onClick={() => setShowPopup(true)}
								className="px-6 py-3 border border-green-700 text-green-700 rounded-xl hover:bg-green-100">
								{t('hero.learnMore')}
							</button>
						</motion.div>
					</div>

					{/* Hero Image */}
					<motion.div
						initial={{ opacity: 0, y: 50 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.3, duration: 0.7 }}
						className="w-full md:w-1/2">
						<img
							src="https://akm-img-a-in.tosshub.com/indiatoday/images/story/202304/national_panchayati_day_2023-sixteen_nine.jpg?VersionId=nG__5nxyCqTU4EdUFuoCzV0Gw9WaQbAi&size=690:388"
							alt="GramVaani village connection"
							className="w-full h-auto rounded-xl shadow-lg bg-cover"
						/>
					</motion.div>
				</div>
			</motion.section>

			{/* Popup Modal */}
			<AnimatePresence>
				{showPopup && (
					<motion.div
						className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}>
						<motion.div
							className="bg-white rounded-xl shadow-lg max-w-5xl w-full p-6 relative overflow-y-auto max-h-[90vh]"
							initial={{ scale: 0.8, opacity: 0 }}
							animate={{ scale: 1, opacity: 1 }}
							exit={{ scale: 0.8, opacity: 0 }}
							transition={{ duration: 0.3 }}>
							<h3 className="text-2xl font-bold text-green-800 mb-4 text-center"> Digital Notice Board System</h3>
							<h4 className="text-xl font-semibold text-green-700 mb-3"> Website Workflow</h4>
							<div className="space-y-4">
								{workflowSteps.map((step, index) => (
									<motion.div
										key={index}
										initial={{ opacity: 0, x: -20 }}
										animate={{ opacity: 1, x: 0 }}
										transition={{ delay: index * 0.1 }}
										className="p-4 border-l-4 border-green-600 bg-gray-50 rounded shadow-sm">
										<h5 className="font-semibold text-green-800">{step.step}</h5>
										<p className="text-gray-600">{step.description}</p>
									</motion.div>
								))}
							</div>
							{/* Feature Grid */}
							<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-8">
								{[
									{
										icon: <FaBroadcastTower />,
										title: 'Offline Functionality',
										desc: 'Access notices without internet, auto-syncs when online.',
									},
									{
										icon: <FaGlobe />,
										title: 'Multilingual Support',
										desc: 'Auto-translates into Hindi, Tamil, Telugu & more.',
									},
									{
										icon: <FaMobileAlt />,
										title: 'Multi-Channel Access',
										desc: 'Web, Mobile App, and SMS for all villagers.',
									},
									{
										icon: <FaSms />,
										title: 'SMS Integration',
										desc: 'Feature phone users receive updates instantly.',
									},
									{
										icon: <FaLock />,
										title: 'Secure & Role-Based',
										desc: 'Admins control content, villagers only view.',
									},
									{
										icon: <FaServer />,
										title: 'Local Server Support',
										desc: 'Raspberry Pi powered offline servers in Panchayats.',
									},
									{
										icon: <FaCloud />,
										title: 'Cloud Hosting',
										desc: 'AWS/Google Cloud ensures scalability & backups.',
									},
									{
										icon: <FaCodeBranch />,
										title: 'Scalable Architecture',
										desc: 'Easily add features like weather or emergency alerts.',
									},
								].map((feat, i) => (
									<motion.div
										key={i}
										initial={{ opacity: 0, y: 20 }}
										animate={{ opacity: 1, y: 0 }}
										transition={{ delay: i * 0.1 }}
										className="bg-green-50 rounded-lg p-4 text-center shadow hover:shadow-md hover:bg-green-100 transition">
										<div className="text-green-700 text-2xl mb-2">{feat.icon}</div>
										<p className="font-semibold text-green-800">{feat.title}</p>
										<p className="text-sm text-gray-600">{feat.desc}</p>
									</motion.div>
								))}
							</div>

							{/* Workflow Section */}

							{/* Close Button */}
							<button
								onClick={() => setShowPopup(false)}
								className="absolute top-3 right-3 cursor-pointer fixed text-gray-500 hover:text-gray-700">
								✖
							</button>
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</>
	);
}
