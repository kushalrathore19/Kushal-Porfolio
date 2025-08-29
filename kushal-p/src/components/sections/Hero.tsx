import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, Download, Play } from 'lucide-react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Spline from '@splinetool/react-spline';
import { siteConfig } from '../../config/site';

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const heroRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const splineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation on load
      const tl = gsap.timeline({ delay: 1.5 });
      
      tl.from(headlineRef.current, {
        y: 100,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out"
      })
      .from(sublineRef.current, {
        y: 50,
        opacity: 0,
        duration: 0.8,
        ease: "power3.out"
      }, "-=0.6")
      .from(ctaRef.current?.children || [], {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.2,
        ease: "power3.out"
      }, "-=0.4");

      // Parallax scroll effects
      gsap.to(splineRef.current, {
        yPercent: -50,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

      gsap.to(headlineRef.current, {
        yPercent: -20,
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true
        }
      });

    }, heroRef);

    return () => ctx.revert();
  }, []);

  const handleCTAClick = (action: string) => {
    if (action === 'projects') {
      document.querySelector('#projects')?.scrollIntoView({ behavior: 'smooth' });
    } else if (action === 'resume') {
      // Download resume logic
      window.open('/resume.pdf', '_blank');
    }
  };

  return (
    <section 
      ref={heroRef}
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      data-scroll-section
    >
      {/* 3D Background */}
      <div 
        ref={splineRef}
        className="absolute inset-0 w-full h-full"
        data-scroll
        data-scroll-speed="-2"
      >
        <div className="relative w-full h-full">
          {/* Spline 3D Scene */}
          <div className="absolute inset-0 opacity-60">
            <Spline
              scene="https://prod.spline.design/6Eo1lKNGBH6lgjj2/scene.splinecode"
              onLoad={() => console.log('Spline scene loaded')}
              onError={() => console.log('Spline scene failed to load')}
              style={{ width: '100%', height: '100%' }}
            />
          </div>
          
          {/* Fallback gradient for mobile/reduced motion */}
          <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent-bright/20 md:opacity-0" />
        </div>
      </div>

      {/* Floating Badges */}
      {siteConfig.floatingBadges.map((badge, index) => (
        <motion.div
          key={badge.text}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ 
            opacity: 1, 
            scale: 1,
            y: [0, -10, 0]
          }}
          transition={{
            opacity: { delay: 2 + badge.delay * 0.3, duration: 0.8 },
            scale: { delay: 2 + badge.delay * 0.3, duration: 0.8 },
            y: { 
              repeat: Infinity, 
              duration: 4 + badge.delay, 
              ease: "easeInOut",
              delay: badge.delay 
            }
          }}
          className={`floating-badge absolute hidden lg:block ${
            index === 0 ? 'top-32 left-20' :
            index === 1 ? 'top-40 right-32' :
            index === 2 ? 'bottom-40 left-32' :
            'bottom-32 right-20'
          }`}
        >
          {badge.text}
        </motion.div>
      ))}

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div className="text-center lg:text-left">
          {/* Headline */}
          <h1 
            ref={headlineRef}
            className="text-hero font-heading font-bold mb-6 leading-tight"
          >
            <span className="gradient-text">
              {siteConfig.hero.headline}
            </span>
          </h1>

          {/* Subheadline */}
          <p 
            ref={sublineRef}
            className="text-large text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
          >
            {siteConfig.hero.subheadline}
          </p>

          {/* CTA Buttons */}
          <div ref={ctaRef} className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
            <motion.button
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTAClick('projects')}
              className="btn-hero group"
            >
              <span>{siteConfig.hero.cta1}</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>

            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => handleCTAClick('resume')}
              className="btn-hero-outline group"
            >
              <Download className="w-5 h-5 transition-transform group-hover:scale-110" />
              <span>{siteConfig.hero.cta2}</span>
            </motion.button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12 pt-8 border-t border-border/20">
            {siteConfig.stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2.5 + index * 0.1 }}
                className="text-center lg:text-left"
              >
                <div className="text-2xl font-heading font-bold gradient-text">
                  {stat.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right side for larger screens - 3D scene takes full background */}
        <div className="hidden lg:block" />
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
          className="w-6 h-10 border-2 border-foreground/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="w-1 h-3 bg-foreground/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;