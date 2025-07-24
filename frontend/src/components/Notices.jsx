import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/autoplay';
import { Autoplay } from 'swiper/modules';
const Notices = () => {
	return (
		<section className="py-12 bg-green-200">
			<h3 className="text-2xl font-bold text-center text-green-900 mb-6">Important Notices</h3>
			<Swiper
				spaceBetween={30}
				slidesPerView={1}
				loop={true}
				autoplay={{ delay: 4000 }}
				modules={[Autoplay]}
				className="max-w-3xl mx-auto px-4">
				{notices.map((notice, index) => (
					<SwiperSlide key={index}>
						<div className="bg-white p-6 rounded-xl shadow text-center text-green-800 text-lg font-medium">{notice}</div>
					</SwiperSlide>
				))}
			</Swiper>
		</section>
	);
};

export default Notices;
const notices = ['Water supply will be off on Monday for maintenance.', 'Free health checkup camp on Friday in Community Hall.', 'Gram Sabha meeting scheduled for 10th August, 4 PM.', 'Mobile internet disruption in the village on Sunday.', 'New farming subsidy scheme registration open now.'];
