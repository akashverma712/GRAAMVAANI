import React from 'react';
import { motion } from 'framer-motion';

const CATsection = () => {
	return (
		<motion.section
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6 }}
			className="py-20 bg-green-700 text-white text-center">
			<h3 className="text-3xl font-bold">Empower Your Panchayat</h3>
			<p className="mt-4 text-lg">Bring digital access to your community with GRAAMVAANI</p>
			<button className="mt-6 px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100">Request a Demo</button>
		</motion.section>
	);
};

export default CATsection;
