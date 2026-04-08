import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const IntroVideo = ({ onComplete }) => {
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    // Failsafe in case video doesn't end properly or autoPlay is blocked
    const timer = setTimeout(() => {
      if (isPlaying) {
        setIsPlaying(false);
        if(onComplete) onComplete();
      }
    }, 15000); // 15s failsafe
    
    return () => clearTimeout(timer);
  }, [isPlaying, onComplete]);

  const [isVideoFinished, setIsVideoFinished] = useState(false);

  const handleVideoEnd = () => {
    setIsVideoFinished(true);
    setTimeout(() => {
      setIsPlaying(false);
      if(onComplete) onComplete();
    }, 1500); // 1.5s fade to black duration
  };

  return (
    <AnimatePresence>
      {isPlaying && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black pointer-events-none"
        >
          <motion.video
            animate={{ opacity: isVideoFinished ? 0 : 1 }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="w-full h-full object-cover"
            src="/introvideo.mp4"
            autoPlay
            muted
            playsInline
            onLoadedData={(e) => { e.target.playbackRate = 2.0; }}
            onEnded={handleVideoEnd}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default IntroVideo;
