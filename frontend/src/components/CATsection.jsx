import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const CATsection = () => {
	const { t } = useTranslation();

	return (
		<motion.section
			initial={{ opacity: 0, scale: 0.95 }}
			whileInView={{ opacity: 1, scale: 1 }}
			transition={{ duration: 0.6 }}
			className="py-20 bg-green-700 text-white text-center"
		>
			<h3 className="text-3xl font-bold">{t('cat.title')}</h3>
			<p className="mt-4 text-lg">{t('cat.subtitle')}</p>
			<button className="mt-6 px-6 py-3 bg-white text-green-700 font-bold rounded-xl hover:bg-gray-100">
				{t('cat.button')}
			</button>
		</motion.section>
	);
};

export default CATsection;
