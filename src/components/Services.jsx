import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Camera, TrendingUp, Code } from 'lucide-react';

const servicesData = [
  {
    title: "Promotional Videos & Photos",
    icon: <Camera className="w-10 h-10 mb-6 text-[#DC2626]" />,
    description: "High-end visual content that captures the essence of your brand, engineered to stop the scroll and drive engagement."
  },
  {
    title: "Meta Ads",
    icon: <TrendingUp className="w-10 h-10 mb-6 text-[#DC2626]" />,
    description: "Data-driven advertising campaigns that leverage algorithms to position your brand in front of the right eyes."
  },
  {
    title: "Web Development/Design",
    icon: <Code className="w-10 h-10 mb-6 text-[#DC2626]" />,
    description: "Immersive, weightless web experiences prioritizing performance, aesthetic excellence, and user conversion."
  }
];

const Particles = () => {
  const particlesArray = useMemo(() => Array.from({ length: 25 }), []);
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particlesArray.map((_, i) => {
        const size = Math.random() * 6 + 2; 
        const left = Math.random() * 100;
        const top = Math.random() * 100;
        const duration = Math.random() * 20 + 20; 
        const delay = Math.random() * -20; // negative delay so they spawn already somewhat progressed
        
        return (
          <motion.div
            key={i}
            className="absolute rounded-full bg-red-600/40 blur-[2px]"
            style={{
              width: size,
              height: size,
              left: `${left}%`,
              top: `${top}%`,
            }}
            animate={{
              y: [0, -150, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [0.1, 0.5, 0.1]
            }}
            transition={{
              duration: duration,
              repeat: Infinity,
              delay: delay,
              ease: "linear"
            }}
          />
        );
      })}
    </div>
  );
};

const Services = () => {
  return (
    <section id="services" className="relative w-full py-32 bg-black text-white px-6">
      <Particles />
      
      <div className="relative z-10 max-w-7xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            WEIGHTLESS <span className="text-[#DC2626] font-light italic text-5xl md:text-7xl">MODULES</span>
          </h2>
          <p className="text-gray-400 text-lg md:text-xl font-light tracking-[0.2em] uppercase">
            Services designed to elevate
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {servicesData.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              whileHover={{
                y: -15, // Drift upward
                boxShadow: "0px 25px 50px -12px rgba(220, 38, 38, 0.35)", // Expanded shadow
              }}
              className="glass-panel p-10 flex flex-col items-center text-center rounded-2xl transition-all duration-500 border border-white/5 hover:border-red-500/50 relative overflow-hidden group"
            >
              {/* Subtle hover background gradient spotlight */}
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-red-600/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
              
              <div className="relative z-10 flex flex-col items-center">
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  {service.icon}
                </motion.div>
                <h3 className="text-2xl font-bold mb-4 tracking-wide">{service.title}</h3>
                <p className="text-gray-400 leading-relaxed font-light text-sm md:text-base">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
