import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150) {
      setHidden(true);
    } else {
      setHidden(false);
    }
    
    if (latest > 50) {
      setHasBackground(true);
    } else {
      setHasBackground(false);
    }
  });

  return (
    <motion.nav
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" }
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: "easeInOut" }}
      className={`fixed top-0 left-0 right-0 z-40 transition-colors duration-300 ${
        hasBackground ? 'bg-black/70 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
        {/* Brand */}
        <a href="#" className="flex items-center gap-2 group cursor-pointer" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); }}>
          <span className="text-xl md:text-2xl font-black tracking-widest text-[#DC2626] group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
            SMARTKETING
          </span>
        </a>

        {/* Links */}
        <div className="hidden md:flex gap-10">
          {[
            { name: 'Servicii', id: 'services' },
            { name: 'Galerie', id: 'gallery' },
            { name: 'Contact', id: 'contact' }
          ].map((item, i) => (
            <a 
              key={i} 
              href={`#${item.id}`}
              className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300 hover:text-white relative group"
            >
              {item.name}
              <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[#DC2626] transition-all duration-300 ease-out group-hover:w-full"></span>
            </a>
          ))}
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar;
