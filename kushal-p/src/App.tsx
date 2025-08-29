import "react"
import React from "react";
import { useEffect, useRef, useState } from "react";
import Preloader from "./components/Preloader";
import Hero from "./components/Hero";
import About from "./components/About";
import Expertise from "./components/Expertise";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import { initSmoothScroll } from "./lib/scroll";

export default function App() {
  const [loaded, setLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (loaded && containerRef.current) {
      initSmoothScroll(containerRef.current);
    }
  }, [loaded]);

  if (!loaded) return <Preloader onComplete={() => setLoaded(true)} />;

  return (
    <div ref={containerRef} data-scroll-container>
      <Hero />
      <About />
      <Expertise />
      <Projects />
      <Contact />
    </div>
  );
}
