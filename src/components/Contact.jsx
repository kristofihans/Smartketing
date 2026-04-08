import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, MessageCircle } from 'lucide-react';

const FloatingInput = ({ label, type = "text", isTextArea = false, ...props }) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasValue, setHasValue] = useState(false);

  const handleBlur = (e) => {
    setIsFocused(false);
    setHasValue(e.target.value.length > 0);
  };

  const handleChange = (e) => {
    setHasValue(e.target.value.length > 0);
  };

  const inputClasses = "w-full bg-transparent border-b border-white/30 py-3 text-white focus:outline-none focus:border-transparent transition-colors duration-300 resize-none";
  const labelClasses = `absolute left-0 transition-all duration-300 pointer-events-none ${
    isFocused || hasValue 
      ? '-top-6 text-xs md:text-sm text-[#DC2626] font-medium tracking-widest uppercase' 
      : 'top-3 text-base text-gray-500 font-light'
  }`;

  return (
    <div className="relative mb-10 w-full group">
      {isTextArea ? (
        <textarea
          rows={4}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
      ) : (
        <input
          type={type}
          className={inputClasses}
          onFocus={() => setIsFocused(true)}
          onBlur={handleBlur}
          onChange={handleChange}
          {...props}
        />
      )}
      
      <label className={labelClasses}>
        {label}
      </label>
      
      {/* Glowing Bottom Border Effect */}
      <div className={`absolute bottom-0 left-0 h-[2px] bg-[#DC2626] transition-all duration-500 ease-out ${
        isFocused ? 'w-full shadow-[0_0_15px_rgba(220,38,38,0.8)]' : 'w-0'
      }`}></div>
    </div>
  );
};

const Contact = () => {
  return (
    <>
      <section id="contact" className="relative w-full py-32 bg-black text-white px-6">
        <div className="relative z-10 max-w-4xl mx-auto">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-4">
              MAGNETIC <span className="text-[#DC2626] font-light italic text-5xl md:text-7xl">PULL</span>
            </h2>
            <p className="text-gray-400 text-lg md:text-xl font-light tracking-[0.2em] uppercase">
              Initiate Transmission
            </p>
          </motion.div>

          <form className="glass-panel p-8 md:p-14 rounded-3xl" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12">
              <FloatingInput label="Name" />
              <FloatingInput label="Email" type="email" />
            </div>
            <FloatingInput label="Your Message" isTextArea={true} />
            
            <motion.button
              whileHover={{ scale: 1.02, backgroundColor: "#B91C1C" }}
              whileTap={{ scale: 0.98 }}
              className="mt-8 relative overflow-hidden group w-full md:w-auto bg-[#DC2626] text-white py-4 px-12 rounded-full font-bold tracking-[0.2em] uppercase text-sm flex items-center justify-center gap-3 transition-colors"
            >
              <span className="relative z-10">Send Target</span>
              <Send className="w-4 h-4 relative z-10" />
              
              {/* Button sweep effect */}
              <div className="absolute inset-0 h-full w-0 bg-white/20 group-hover:w-full transition-all duration-500 ease-out z-0"></div>
            </motion.button>
          </form>
        </div>
      </section>

      {/* Fixed WhatsApp Button */}
      <motion.a
        href="https://wa.me/something"
        target="_blank"
        rel="noreferrer"
        className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] rounded-full text-white shadow-[0_0_20px_rgba(37,211,102,0.4)]"
        animate={{
          y: [-5, 5, -5],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        whileHover={{ scale: 1.1 }}
      >
        {/* Ripple Effect */}
        <div className="absolute inset-0 rounded-full border-2 border-[#25D366] animate-ping opacity-70"></div>
        
        {/* The Icon */}
        <MessageCircle className="w-8 h-8 relative z-10" />
      </motion.a>
    </>
  );
};

export default Contact;
