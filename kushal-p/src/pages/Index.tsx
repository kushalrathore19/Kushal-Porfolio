import { useState, useEffect } from 'react';
import Preloader from '../components/Preloader';
import Navigation from '../components/Navigation';
import Hero from '../components/sections/Hero';
import About from '../components/sections/About';
import Expertise from '../components/sections/Expertise';
import Projects from '../components/sections/Projects';
import Experience from '../components/sections/Experience';
import Talks from '../components/sections/Talks';
import Contact from '../components/sections/Contact';
import Footer from '../components/sections/Footer';
import { useLocomotiveScroll } from '../hooks/useLocomotiveScroll';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);
  useLocomotiveScroll();

  useEffect(() => {
    // Set dark theme by default
    document.documentElement.classList.add('dark');
  }, []);

  const handlePreloaderComplete = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <Preloader onComplete={handlePreloaderComplete} />;
  }

  return (
    <>
      <Navigation />
      <main data-scroll-container>
        <Hero />
        <About />
        <Expertise />
        <Projects />
        <Experience />
        <Talks />
        <Contact />
        <Footer />
      </main>
    </>
  );
};

export default Index;
