import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { FaPlay, FaPause, FaStepForward, FaStepBackward } from "react-icons/fa";

// Dummy Audio Array
const audioResources = [
  {
    id: 1,
    title: "Health Awareness - Nutrition",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
  },
  {
    id: 2,
    title: "Education - Digital Learning",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
  },
  {
    id: 3,
    title: "Agriculture Guidance",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
  },
  {
    id: 4,
    title: "Government Schemes Info",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3"
  },
  {
    id: 5,
    title: "Women Empowerment Story",
    url: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3"
  }
];

const AudioPlayer = () => {
  const [currentTrack, setCurrentTrack] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const audioRef = useRef(new Audio(audioResources[0].url));

  // Update progress
  useEffect(() => {
    const audio = audioRef.current;

    const updateProgress = () => {
      setProgress((audio.currentTime / audio.duration) * 100);
    };

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleNext);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleNext);
    };
  }, [currentTrack]);

  // Handle play/pause
  const handlePlayPause = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
    } else {
      audio.play();
    }
    setIsPlaying(!isPlaying);
  };

  // Handle Next
  const handleNext = () => {
    let nextTrack = (currentTrack + 1) % audioResources.length;
    changeTrack(nextTrack);
  };

  // Handle Previous
  const handlePrev = () => {
    let prevTrack =
      (currentTrack - 1 + audioResources.length) % audioResources.length;
    changeTrack(prevTrack);
  };

  // Change track function
  const changeTrack = (index) => {
    audioRef.current.pause();
    audioRef.current = new Audio(audioResources[index].url);
    setCurrentTrack(index);
    if (isPlaying) {
      audioRef.current.play();
    }
  };

  return (
    <motion.div
      className="w-full max-w-md mx-auto bg-white rounded-2xl shadow-lg p-6 text-center"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      {/* Title */}
      <motion.h2
        className="text-lg font-semibold mb-4"
        key={audioResources[currentTrack].title}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {audioResources[currentTrack].title}
      </motion.h2>

      {/* Progress Bar */}
      <div className="w-full h-2 bg-gray-200 rounded-full mb-4 overflow-hidden">
        <motion.div
          className="h-2 bg-blue-500"
          style={{ width: `${progress}%` }}
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.2 }}
        />
      </div>

      {/* Controls */}
      <div className="flex justify-center items-center gap-6 text-2xl">
        <button
          onClick={handlePrev}
          className="text-gray-600 hover:text-blue-600"
        >
          <FaStepBackward />
        </button>

        <button
          onClick={handlePlayPause}
          className="text-gray-800 hover:text-blue-800 p-3 bg-gray-100 rounded-full"
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>

        <button
          onClick={handleNext}
          className="text-gray-600 hover:text-blue-600"
        >
          <FaStepForward />
        </button>
      </div>
    </motion.div>
  );
};

export default AudioPlayer;
