import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Keyboard, Mousewheel } from 'swiper/modules';
import { motion } from 'framer-motion';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const galleryItems = [
  { id: 1, videoSrc: "./video1.mp4" },
  { id: 2, videoSrc: "./video2.mp4" },
  { id: 3, videoSrc: "./video3.mp4" },
  { id: 4, videoSrc: "./video4.mp4" },
];

const GalleryItem = ({ src, isActive }) => {
  const [playing, setPlaying] = useState(false);
  const videoRef = useRef(null);

  const togglePlay = () => {
    if (!videoRef.current) return;
    if (playing) {
      videoRef.current.pause();
    } else {
      videoRef.current.play();
    }
    setPlaying(!playing);
  };

  return (
    <motion.div
      layout
      transition={{ type: "spring", stiffness: 300, damping: 20 }}
      className={`relative w-full h-[60vh] md:h-[70vh] rounded-2xl overflow-hidden cursor-pointer ${
        playing ? 'glow-border-red border border-[#DC2626]' : 'border border-white/10'
      }`}
      onClick={togglePlay}
      animate={{
        scale: playing ? 1.05 : 1,
        // The red shadow pulse is added primarily via CSS classes when active, but framer motion handles the scale.
      }}
    >
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover z-10 relative"
        loop
        muted // keep muted for web standard compliance without user explicit volume intent
        playsInline
      />
      
      {/* Play button overlay */}
      {!playing && (
        <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 hover:bg-black/20 transition-colors">
          <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20 text-white shadow-xl">
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8 ml-1">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </div>
      )}

      {/* Pulse overlay layer triggered when playing */}
      {playing && (
        <div className="absolute inset-0 z-0 pointer-events-none border border-[#DC2626] rounded-2xl animate-[ping_2s_cubic-bezier(0,0,0.2,1)_infinite] opacity-50"></div>
      )}
    </motion.div>
  );
};

const Gallery = () => {
  return (
    <section id="gallery" className="relative w-full py-32 bg-black text-white px-0 md:px-0 scroll-mt-20 overflow-hidden">
      <div className="relative z-10 max-w-7xl mx-auto mb-16 px-6">
        <motion.div 
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
            CLIENȚII <span className="text-[#DC2626] font-light italic text-5xl md:text-7xl">NOȘTRI</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light tracking-[0.2em] uppercase">
            Proof of Altitude
          </p>
        </motion.div>
      </div>

      <div className="w-full" style={{ perspective: '1200px' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={'auto'}
          mousewheel={{ forceToAxis: true }}
          keyboard={true}
          coverflowEffect={{
            rotate: 15,
            stretch: 0,
            depth: 300,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Keyboard, Mousewheel]}
          className="w-full py-10!"
        >
          {galleryItems.map((item) => (
            <SwiperSlide key={item.id} style={{ width: 'auto' }} className="w-[80vw] sm:w-[320px] md:w-[380px] px-2">
              {({ isActive }) => (
                <GalleryItem src={item.videoSrc} isActive={isActive} />
              )}
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default Gallery;
