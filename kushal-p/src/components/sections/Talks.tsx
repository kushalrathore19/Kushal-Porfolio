import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Calendar, MapPin, Users, Mic, Video, BookOpen } from 'lucide-react';
import talksData from '../../data/talks.json';

gsap.registerPlugin(ScrollTrigger);

const Talks = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

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
            toggleActions: "play none none reverse"
          }
        }
      );

      // Talks grid animation
      gsap.fromTo(gridRef.current?.children || [],
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference':
        return Mic;
      case 'workshop':
        return BookOpen;
      case 'webinar':
        return Video;
      default:
        return Mic;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
      case 'conference':
        return 'from-primary to-primary-glow';
      case 'workshop':
        return 'from-accent-bright to-primary';
      case 'webinar':
        return 'from-accent-bright to-accent-bright';
      default:
        return 'from-primary to-accent-bright';
    }
  };

  return (
    <section 
      ref={sectionRef}
      id="talks"
      className="py-20 lg:py-32"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-section font-heading font-bold text-center mb-8 gradient-text"
        >
          Talks & Speaking
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          I enjoy sharing knowledge and insights with the developer community through 
          conferences, workshops, and online sessions. Here are some of my recent speaking engagements.
        </p>

        {/* Talks Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {talksData.map((talk, index) => {
            const IconComponent = getTypeIcon(talk.type);
            const gradientColor = getTypeColor(talk.type);
            
            return (
              <motion.div
                key={talk.id}
                whileHover={{ y: -8 }}
                className="glass-card group"
              >
                {/* Talk Type Badge */}
                <div className={`w-16 h-16 bg-gradient-to-br ${gradientColor} rounded-2xl flex items-center justify-center mb-6`}>
                  <IconComponent className="w-8 h-8 text-white" />
                </div>

                {/* Talk Content */}
                <div className="space-y-4">
                  {/* Type and Date */}
                  <div className="flex items-center justify-between text-sm">
                    <span className="px-3 py-1 bg-accent/10 text-accent-bright rounded-full font-medium">
                      {talk.type}
                    </span>
                    <div className="flex items-center gap-1 text-muted-foreground">
                      <Calendar className="w-4 h-4" />
                      <span>{talk.date}</span>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-heading font-semibold text-foreground group-hover:text-accent-bright transition-colors">
                    {talk.title}
                  </h3>

                  {/* Event */}
                  <div className="flex items-center gap-2 text-primary font-medium">
                    <span>{talk.event}</span>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground leading-relaxed">
                    {talk.description}
                  </p>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-border/20">
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Users className="w-4 h-4" />
                        <span>{talk.audience}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{talk.location}</span>
                      </div>
                    </div>

                    {/* Link */}
                    {talk.link && talk.link !== '#' && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={talk.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 bg-accent/10 rounded-full text-accent-bright hover:bg-accent/20 transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Speaking Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-2xl mx-auto mb-12"
        >
          {[
            { label: "Total Talks", value: "15+" },
            { label: "Audience Reached", value: "5000+" },
            { label: "Countries", value: "3" },
            { label: "Topics Covered", value: "10+" }
          ].map((stat, index) => (
            <motion.div
              key={stat.label}
              whileHover={{ scale: 1.05 }}
              className="glass-card text-center"
            >
              <div className="text-2xl font-heading font-bold gradient-text mb-2">
                {stat.value}
              </div>
              <div className="text-sm text-muted-foreground">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <div className="glass-card max-w-2xl mx-auto">
            <Mic className="w-12 h-12 text-accent-bright mx-auto mb-4" />
            <h3 className="text-2xl font-heading font-semibold mb-4 gradient-text">
              Invite Me to Speak
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm always excited to share knowledge about AI/ML, data engineering, 
              and building scalable systems. Let's connect if you'd like me to speak 
              at your event or conference.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-hero"
            >
              Book a Speaking Session
              <Mic className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Talks;