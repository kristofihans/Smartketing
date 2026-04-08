import React from 'react';
import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative w-full h-screen overflow-hidden bg-black text-white">
      {/* Background Image */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: 'url(/heroimage.jpeg)' }}
      ></div>
      
      {/* Overlays for contrast and Antigravity Crimson feel */}
      <div className="absolute inset-0 z-0 bg-gradient-to-b from-transparent via-black/40 to-black/90"></div>
      <div className="absolute inset-0 z-0 bg-red-600/10 mix-blend-overlay"></div>
      <div className="absolute inset-0 z-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-red-900/40 via-transparent to-transparent opacity-80"></div>

      {/* Hero Content - Removed Title and Description per request but keeping container structure if needed */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center mx-auto px-6 pointer-events-none">
      </div>

      {/* Floating Scroll Indicator */}
      <motion.div
        animate={{ y: [-8, 8, -8] }}
        transition={{ 
          duration: 3, 
          repeat: Infinity, 
          ease: "easeInOut" 
        }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 cursor-pointer"
        onClick={() => window.scrollTo({ top: window.innerHeight, behavior: 'smooth' })}
      >
        <span className="text-xs md:text-sm tracking-[0.3em] font-medium text-gray-400">SCROLL</span>
        <ChevronDown className="w-8 h-8 text-[#DC2626]" />
      </motion.div>
    </section>
  );
};

export default Hero;
