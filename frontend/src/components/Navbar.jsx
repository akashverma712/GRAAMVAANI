import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import LanguageSwitcher from './LanguageSwitcher';
import { useTranslation } from 'react-i18next';

const Navbar = () => {
	const { t } = useTranslation();

	return (
		<motion.header
			initial={{ y: -60, opacity: 0 }}
			animate={{ y: 0, opacity: 1 }}
			transition={{ duration: 0.5 }}
			className="bg-white shadow-md sticky top-0 z-20">
			<div className="max-w-6xl mx-auto flex justify-between items-center p-4">
				<h1 className="text-2xl font-bold text-green-700">GRAAMVAANI</h1>

				<div className="flex items-center gap-4">
					<nav className="hidden sm:flex space-x-4 text-sm">
						<a
							href="#features"
							className="hover:underline">
							{t('navbar.features')}
						</a>
						<a
							href="#about"
							className="hover:underline">
							{t('navbar.about')}
						</a>
						<a
							href="#contact"
							className="hover:underline">
							{t('navbar.contact')}
						</a>
					</nav>

					<LanguageSwitcher />

					<Link to="/signup">
						<button className="px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm font-semibold shadow transition-all duration-300">{t('navbar.signup')}</button>
					</Link>
				</div>
			</div>
		</motion.header>
	);
};

export default Navbar;

{/* <div className="inline-block">
	<SignedOut>
		<SignInButton />
	</SignedOut>
	<SignedIn>
		<UserButton />
	</SignedIn>
</div>; */}
