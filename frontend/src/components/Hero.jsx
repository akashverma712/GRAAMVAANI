import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

export default function Hero() {
	const { t } = useTranslation();

	return (
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
						<strong className="text-green-700">GramVanni</strong> {t('hero.description')}
					</motion.p>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.4, duration: 0.6 }}
						className="mt-8 flex flex-wrap gap-4 justify-center md:justify-start">
						<button className="px-6 py-3 bg-green-600 hover:bg-green-700 text-white rounded-xl shadow-md">{t('hero.getStarted')}</button>
						<button className="px-6 py-3 border border-green-700 text-green-700 rounded-xl hover:bg-green-100">{t('hero.learnMore')}</button>
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
						alt="GramVanni village connection"
						className="w-full h-auto rounded-xl shadow-lg bg-cover"
					/>
				</motion.div>
			</div>
		</motion.section>
	);
}
