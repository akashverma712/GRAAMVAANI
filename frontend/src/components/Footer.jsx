import React from 'react';
import { useTranslation } from 'react-i18next';

const Footer = () => {
	const { t } = useTranslation();

	return (
		<footer
			id="contact"
			className="bg-gray-800 text-white py-10 text-sm">
			<div className="max-w-6xl mx-auto px-4 flex flex-col md:flex-row justify-between">
				<div>
					<h4 className="text-lg font-bold">{t('footer.title')}</h4>
					<p className="text-gray-400 mt-2">{t('footer.tagline')}</p>
				</div>
				<div className="space-y-1 mt-6 md:mt-0">
					<p>{t('footer.email')} : support@graamvaani.in</p>
					<p>{t('footer.phone')} : +91 98765 43210</p>
					<p>{t('footer.address')} : {t('footer.addressValue')}</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
