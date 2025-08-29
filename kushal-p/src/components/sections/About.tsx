import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { GraduationCap, Code, Users, Award } from 'lucide-react';
import { siteConfig } from '../../config/site';

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const educationRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Title animation
      gsap.fromTo(titleRef.current, 
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: titleRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Content animation
      gsap.fromTo(contentRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Stats animation
      gsap.fromTo(statsRef.current?.children || [],
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 0.6,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: statsRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Education cards animation
      gsap.fromTo(educationRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: educationRef.current,
            start: "top 80%",
            end: "bottom 20%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statsIcons = [Code, Users, Award, GraduationCap];

  return (
    <section 
      ref={sectionRef}
      id="about"
      className="py-20 lg:py-32"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-section font-heading font-bold text-center mb-16 gradient-text"
        >
          About Kushal
        </h2>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Content */}
          <div ref={contentRef} className="space-y-8">
            {/* Summary */}
            <div className="glass-card">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-accent-bright">
                Who I Am
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {siteConfig.about.summary}
              </p>
              <p className="text-muted-foreground leading-relaxed">
                {siteConfig.about.description}
              </p>
            </div>

            {/* Skills Summary */}
            <div className="glass-card">
              <h3 className="text-2xl font-heading font-semibold mb-4 text-primary">
                What I Do
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                {siteConfig.about.skills}
              </p>
            </div>

            {/* Quick Stats */}
            <div ref={statsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              {siteConfig.stats.map((stat, index) => {
                const IconComponent = statsIcons[index];
                return (
                  <motion.div
                    key={stat.label}
                    whileHover={{ scale: 1.05 }}
                    className="glass-card text-center"
                  >
                    <IconComponent className="w-8 h-8 text-accent-bright mx-auto mb-2" />
                    <div className="text-2xl font-heading font-bold gradient-text">
                      {stat.value}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Education & Achievements */}
          <div className="space-y-8">
            {/* Education */}
            <div>
              <h3 className="text-2xl font-heading font-semibold mb-6 text-center lg:text-left">
                Education
              </h3>
              <div ref={educationRef} className="space-y-4">
                {siteConfig.education.map((edu, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ x: 4 }}
                    className="glass-card"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-bright flex items-center justify-center flex-shrink-0">
                        <GraduationCap className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="font-heading font-semibold text-foreground mb-1">
                          {edu.degree}
                        </h4>
                        <p className="text-muted-foreground mb-2">
                          {edu.institution}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-accent-bright font-medium">
                            {edu.period}
                          </span>
                          <span className="text-muted-foreground">•</span>
                          <span className="text-muted-foreground">
                            {edu.status}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Personal Touch */}
            <div className="glass-card">
              <h3 className="text-xl font-heading font-semibold mb-4 text-accent-bright">
                Beyond Code
              </h3>
              <p className="text-muted-foreground leading-relaxed">
                When I'm not building AI systems, you'll find me sharing knowledge through 
                public speaking, contributing to open source projects, or exploring the latest 
                developments in machine learning and data science. I believe in learning in 
                public and helping others grow in their tech journey.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;