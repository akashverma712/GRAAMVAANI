import React from 'react';
import { motion } from 'framer-motion';

const Navbar = () => {
	return (
		<motion.header
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="bg-white shadow-md sticky top-0 z-20">
			<div className="max-w-6xl mx-auto flex justify-between items-center p-4">
				<h1 className="text-2xl font-bold text-green-700">GRAAMVAANI</h1>
				<nav className="space-x-4 text-sm">
					<a
						href="#features"
						className="hover:underline">
						Features
					</a>
					<a
						href="#about"
						className="hover:underline">
						About
					</a>
					<a
						href="#contact"
						className="hover:underline">
						Contact
					</a>
				</nav>
			</div>
		</motion.header>
	);
};

export default Navbar;
