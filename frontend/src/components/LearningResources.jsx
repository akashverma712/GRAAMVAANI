import React from 'react';
import { motion } from 'framer-motion';
import { FaFilePdf, FaVideo, FaHeadphones } from 'react-icons/fa';

import Spotifycard from './Spotifycard';

const categorizedResources = {
	video: [
		{
			title: 'Organic Farming Basics',
			url: 'https://youtu.be/GLtHdwGwQ34',
		},
		{
			title: 'Crop Rotation Techniques',
			url: 'https://www.youtube.com/embed/UxszL_l3Q2M',
		},
	],
	audio: [
		{
			title: 'Soil Health Podcast',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
		},
		{
			title: 'Rainwater Harvesting Guide',
			url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
		},
	],
	pdf: [
		{
			title: 'Farmer Training Manual',
			url: 'https://example.com/farmer-training-manual.pdf',
		},
		{
			title: 'Government Scheme Handbook',
			url: 'https://example.com/govt-scheme-handbook.pdf',
		},
		{
			title: 'Organic Fertilizer Guide',
			url: 'https://example.com/organic-fertilizer-guide.pdf',
		},
	],
};

const LearningResources = () => {


	return (
		<motion.section
			initial={{ opacity: 0, y: 30 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			className="max-w-6xl mx-auto px-4 py-6 mt-6 bg-white shadow-lg rounded-xl overflow-hidden border border-green-100 transition-al">
			<h2 className="text-3xl font-bold text-green-700 mb-8 flex items-center gap-2 ">📚 Resources</h2>

			{categorizedResources.video.length > 0 && (
				<div className="mb-10 ">
					<h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
						<FaVideo /> Videos
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{categorizedResources.video.map((video, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.02 }}
								className="bg-white shadow-md rounded-lg p-4 border border-green-200">
								<h4 className="text-lg font-semibold mb-2">{video.title}</h4>
								<iframe
									src={video.url}
									title={video.title}
									className="w-full aspect-video rounded"
									allowFullScreen></iframe>
							</motion.div>
						))}
					</div>
				</div>
			)}

			{categorizedResources.audio.length > 0 && (
				<div className="mb-10">
					<h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
						<FaHeadphones /> Audio
					</h3>

					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{categorizedResources.audio.map((audio, index) => (
							<Spotifycard
								key={index}
								audio={audio}
							/>
						))}
					</div>
				</div>
			)}

			{categorizedResources.pdf.length > 0 && (
				<div>
					<h3 className="text-2xl font-semibold text-green-800 mb-4 flex items-center gap-2">
						<FaFilePdf /> PDF Downloads
					</h3>
					<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
						{categorizedResources.pdf.map((pdf, index) => (
							<motion.div
								key={index}
								whileHover={{ scale: 1.02 }}
								className="bg-white shadow-md rounded-lg p-4 border border-green-200">
								<h4 className="text-lg font-semibold mb-2">{pdf.title}</h4>
								<a
									href={pdf.url}
									target="_blank"
									rel="noopener noreferrer"
									className="text-green-600 underline font-medium">
									Download PDF
								</a>
							</motion.div>
						))}
					</div>
				</div>
			)}
		</motion.section>
	);
};

export default LearningResources;
