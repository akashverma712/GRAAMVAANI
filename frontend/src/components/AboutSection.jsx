import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
	return (
		<motion.section
			id="about"
			className="py-20 bg-green-100 text-center">
			<motion.h3
				initial={{ opacity: 0, y: 40 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.6 }}
				className="text-3xl font-bold text-green-800">
				Why GRAAMVAANI ?
			</motion.h3>
			<motion.p
				initial={{ opacity: 0, y: 20 }}
				whileInView={{ opacity: 1, y: 0 }}
				transition={{ delay: 0.3, duration: 0.6 }}
				className="mt-4 max-w-2xl mx-auto text-lg text-gray-700">
				GRAAMVAANI empowers rural communities by bridging the digital divide with a system that works anywhere, anytime.
			</motion.p>
		</motion.section>
	);
};

export default AboutSection;
