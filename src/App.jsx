import React, { useState, useEffect } from 'react';
import IntroVideo from './components/IntroVideo';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Gallery from './components/Gallery';
import Contact from './components/Contact';

function App() {
  const [showMainContent, setShowMainContent] = useState(false);

  // Fallback to show main content if video fails to load or play
  useEffect(() => {
    const backupTimer = setTimeout(() => {
      setShowMainContent(true);
    }, 15000);
    return () => clearTimeout(backupTimer);
  }, []);

  return (
    <div className="bg-black min-h-screen text-white antialiased">
      {/* Intro Video Layer - stays on top until finished */}
      {!showMainContent && (
        <IntroVideo onComplete={() => setShowMainContent(true)} />
      )}

      {/* Main Website Content */}
      <div className={`${showMainContent ? 'opacity-100' : 'opacity-0 h-screen overflow-hidden pointer-events-none'} transition-opacity duration-1000 ease-in-out`}>
        <Navbar />
        <Hero />
        <Services />
        <Gallery />
        <Contact />
      </div>
    </div>
  );
}

export default App;
