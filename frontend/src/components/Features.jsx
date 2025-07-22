import React from 'react';
import { motion } from 'framer-motion';
import { FaMobileAlt, FaBroadcastTower, FaGlobe, FaComments, FaShieldAlt } from 'react-icons/fa';

const Features = () => {
	return (
		<section
			id="features"
			className="py-20 bg-white">
			<motion.h3
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-3xl font-bold text-center text-green-800 mb-12">
				Key Features
			</motion.h3>
			<div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-8 px-4">
				<FeatureCard
					icon={<FaBroadcastTower />}
					title="Offline Notices"
					desc="Access notices even without internet."
					delay={0.1}
				/>
				<FeatureCard
					icon={<FaGlobe />}
					title="Multilingual"
					desc="Supports Hindi, Tamil, Telugu & more."
					delay={0.2}
				/>
				<FeatureCard
					icon={<FaMobileAlt />}
					title="Mobile + SMS"
					desc="App for smartphones, SMS for feature phones."
					delay={0.3}
				/>
				<FeatureCard
					icon={<FaComments />}
					title="Voice Broadcast"
					desc="Panchayats can send audio messages."
					delay={0.4}
				/>
				<FeatureCard
					icon={<FaShieldAlt />}
					title="Secure Access"
					desc="Only authorized admins can publish."
					delay={0.5}
				/>
				<FeatureCard
					icon={<FaMobileAlt />}
					title="Simple UI"
					desc="Easy for all ages and literacy levels."
					delay={0.6}
				/>
			</div>
		</section>
	);
};

export default Features;
const FeatureCard = ({ icon, title, desc, delay }) => (
	<motion.div
		initial={{ opacity: 0, y: 40 }}
		whileInView={{ opacity: 1, y: 0 }}
		transition={{ duration: 0.6, delay }}
		viewport={{ once: true }}
		className="bg-green-50 rounded-2xl shadow p-6 text-center hover:shadow-lg transition-all duration-300">
		<div className="text-green-700 text-4xl mb-3">{icon}</div>
		<h4 className="text-lg font-bold text-green-800">{title}</h4>
		<p className="text-sm text-gray-600 mt-2">{desc}</p>
	</motion.div>
);
