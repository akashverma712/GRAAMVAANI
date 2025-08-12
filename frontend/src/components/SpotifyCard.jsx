import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { FaPlay, FaPause } from 'react-icons/fa';
import React from 'react';

const Spotifycard = () => {
	const audioRef = useRef(null);
	const [isPlaying, setIsPlaying] = useState(false);
	const [progress, setProgress] = useState(0);

	// Dummy audio data
	const audio = {
		title: 'Chill Vibes',
		artist: 'LoFi Beats',
		description: 'Relax and enjoy smooth lofi music.',
		url: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
		cover: 'https://thumbs.dreamstime.com/z/small-rural-village-rainwater-harvesting-systems-sustainable-water-supply-concept-environmental-conservation-315939754.jpg'
	};

	// Toggle Play/Pause
	const togglePlay = () => {
		if (isPlaying) {
			audioRef.current.pause();
		} else {
			audioRef.current.play();
		}
		setIsPlaying(!isPlaying);
	};

	// Update progress bar
	const handleTimeUpdate = () => {
		const current = audioRef.current.currentTime;
		const duration = audioRef.current.duration;
		setProgress((current / duration) * 100);
	};

	return (
		<motion.div
			whileHover={{ scale: 1.02 }}
			className="bg-white shadow-lg rounded-xl overflow-hidden border border-green-200 flex flex-col">

			{/* Cover Image */}
			<div className="w-full h-48 bg-green-100 flex items-center justify-center overflow-hidden relative">
				<img
					src={audio.cover}
					alt={audio.title}
					className="w-full h-full object-cover"
				/>
				{/* Play button overlay */}
				<button
					onClick={togglePlay}
					className="absolute bottom-4 right-4 bg-green-600 text-white rounded-full p-3 shadow-lg hover:bg-green-700 transition">
					{isPlaying ? <FaPause /> : <FaPlay />}
				</button>
			</div>

			{/* Details */}
			<div className="p-4 flex-1">
				<h4 className="text-lg font-semibold text-green-800">{audio.title}</h4>
				{audio.artist && <p className="text-sm text-gray-600">{audio.artist}</p>}
				{audio.description && <p className="text-xs text-gray-500 mt-1">{audio.description}</p>}
			</div>

			{/* Progress Bar */}
			<div className="px-4 pb-4">
				<div className="w-full h-1 bg-gray-200 rounded-full overflow-hidden">
					<div
						className="h-1 bg-green-600"
						style={{ width: `${progress}%` }}></div>
				</div>
			</div>

			{/* Hidden Audio Element */}
			<audio
				ref={audioRef}
				src={audio.url}
				onTimeUpdate={handleTimeUpdate}
				onEnded={() => setIsPlaying(false)}
			/>
		</motion.div>
	);
};

export default Spotifycard;
