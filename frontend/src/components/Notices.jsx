import React from 'react';
import { useTranslation } from 'react-i18next';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';

const Notices = () => {
	const { t } = useTranslation();

	const notices = t('notices.items', { returnObjects: true });

	return (
		<section className="py-12 bg-green-200">
			<h3 className="text-2xl font-bold text-center text-green-900 mb-6">
				{t('notices.heading')}
			</h3>
			<Swiper
				spaceBetween={30}
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 4000 }}
				modules={[Autoplay]}
				className="max-w-3xl mx-auto px-4">
				{notices.map((notice, index) => (
					<SwiperSlide key={index}>
						<div className="bg-white p-6 rounded-xl shadow text-center text-green-800 text-lg font-medium">
							{notice}
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Notices;
