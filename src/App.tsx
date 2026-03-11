import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import FeaturedProjects from './components/FeaturedProjects';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import Footer from './components/Footer';
import BackToTop from './components/BackToTop';
import ScrollProgress from './components/ScrollProgress';

function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-background text-slate-200 min-h-screen font-sans relative overflow-x-hidden">
      {/* Animated gradient background blobs */}
      <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="blob absolute w-[600px] h-[600px] bg-primary top-[-200px] left-[-200px]" />
        <div className="blob animation-delay-2000 absolute w-[500px] h-[500px] bg-secondary top-[300px] right-[-150px]" style={{ animationDelay: '2s' }} />
        <div className="blob absolute w-[400px] h-[400px] bg-accent bottom-[100px] left-[30%]" style={{ animationDelay: '4s', animationName: 'blob', animationDuration: '10s' }} />
        {/* Grid overlay */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(99,102,241,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(99,102,241,0.5) 1px, transparent 1px)`,
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <ScrollProgress />
      <Navbar scrollY={scrollY} />
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <FeaturedProjects />
        <Achievements />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
}

export default App;
