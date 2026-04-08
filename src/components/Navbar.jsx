import React, { useState } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';

const Navbar = () => {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);
  const [hasBackground, setHasBackground] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Servicii', id: 'services' },
    { name: 'Galerie', id: 'gallery' },
    { name: 'Contact', id: 'contact' }
  ];

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious();
    if (latest > previous && latest > 150 && !isMobileMenuOpen) {
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

  const handleScrollTo = (id) => {
    setIsMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <>
      <motion.nav
        variants={{
          visible: { y: 0 },
          hidden: { y: "-100%" }
        }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.35, ease: "easeInOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          hasBackground || isMobileMenuOpen ? 'bg-black/90 backdrop-blur-xl border-b border-white/5' : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 h-20 md:h-24 flex items-center justify-between">
          {/* Brand */}
          <a href="#" className="flex items-center gap-2 group cursor-pointer relative z-50" onClick={(e) => { e.preventDefault(); window.scrollTo({top: 0, behavior: 'smooth'}); setIsMobileMenuOpen(false); }}>
            <span className="text-xl md:text-2xl font-black tracking-widest text-[#DC2626] group-hover:text-white transition-colors drop-shadow-[0_0_10px_rgba(220,38,38,0.5)]">
              SMARTKETING
            </span>
          </a>

          {/* Desktop Links */}
          <div className="hidden md:flex gap-10">
            {navLinks.map((item, i) => (
              <a 
                key={i} 
                href={`#${item.id}`}
                onClick={(e) => { e.preventDefault(); handleScrollTo(item.id); }}
                className="text-xs font-bold tracking-[0.2em] uppercase text-gray-300 hover:text-white relative group"
              >
                {item.name}
                <span className="absolute -bottom-3 left-0 w-0 h-[2px] bg-[#DC2626] transition-all duration-300 ease-out group-hover:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile Hamburger Toggle */}
          <button 
            className="md:hidden relative z-50 p-2 text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
          </button>
        </div>
      </motion.nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 bg-black/95 backdrop-blur-3xl flex flex-col items-center justify-center pt-20"
          >
            <div className="flex flex-col gap-10 text-center">
              {navLinks.map((item, i) => (
                <motion.a 
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  href={`#${item.id}`}
                  onClick={(e) => { e.preventDefault(); handleScrollTo(item.id); }}
                  className="text-3xl font-black tracking-widest uppercase text-white hover:text-[#DC2626] transition-colors"
                >
                  {item.name}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
