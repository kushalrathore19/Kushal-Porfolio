import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Calendar, MapPin, Briefcase, Users, Award } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    id: 1,
    title: "Senior AI/ML Engineer",
    company: "TechCorp Solutions",
    type: "Full-time",
    location: "Remote",
    period: "Jan 2023 - Present",
    description: "Leading AI initiatives and building production-scale machine learning systems that serve millions of users.",
    achievements: [
      "Built recommendation engine that increased user engagement by 35%",
      "Designed ML pipeline processing 1M+ transactions daily",
      "Led team of 5 engineers on computer vision project",
      "Reduced model inference time by 60% through optimization"
    ],
    technologies: ["Python", "TensorFlow", "AWS", "Docker", "Kubernetes"]
  },
  {
    id: 2,
    title: "Machine Learning Engineer",
    company: "DataFlow Analytics",
    type: "Full-time",
    location: "Bangalore, India",
    period: "Jun 2021 - Dec 2022",
    description: "Developed and deployed ML models for real-time analytics and fraud detection in fintech applications.",
    achievements: [
      "Implemented fraud detection system with 98% accuracy",
      "Built real-time streaming data pipeline using Kafka",
      "Optimized model performance reducing latency by 40%",
      "Mentored 3 junior developers on ML best practices"
    ],
    technologies: ["Python", "Scikit-learn", "Apache Kafka", "PostgreSQL", "Flask"]
  },
  {
    id: 3,
    title: "Data Science Intern",
    company: "InnovateAI Labs",
    type: "Internship",
    location: "Mumbai, India",
    period: "Jan 2021 - May 2021",
    description: "Worked on NLP projects and contributed to research in sentiment analysis and text classification.",
    achievements: [
      "Developed multi-language sentiment analysis model",
      "Achieved 94% accuracy across 15 languages",
      "Published research paper on domain-specific NLP",
      "Presented findings at 2 academic conferences"
    ],
    technologies: ["Python", "BERT", "Transformers", "FastAPI", "Docker"]
  },
  {
    id: 4,
    title: "Freelance Developer",
    company: "Various Clients",
    type: "Freelance",
    location: "Remote",
    period: "2020 - 2021",
    description: "Provided ML consulting and full-stack development services to startups and small businesses.",
    achievements: [
      "Delivered 15+ successful projects",
      "Built end-to-end ML solutions for 8 clients",
      "Generated $150K+ revenue for client businesses",
      "Maintained 5-star rating across all platforms"
    ],
    technologies: ["Python", "React", "Node.js", "MongoDB", "AWS"]
  }
];

const Experience = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const timelineRef = useRef<HTMLDivElement>(null);

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

      // Timeline items animation
      gsap.fromTo(timelineRef.current?.children || [],
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Timeline line animation
      gsap.fromTo(".timeline-line",
        { scaleY: 0 },
        {
          scaleY: 1,
          duration: 1.5,
          ease: "power3.out",
          transformOrigin: "top",
          scrollTrigger: {
            trigger: timelineRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section 
      ref={sectionRef}
      id="experience"
      className="py-20 lg:py-32 bg-muted/20"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-section font-heading font-bold text-center mb-16 gradient-text"
        >
          Experience & Timeline
        </h2>

        {/* Timeline */}
        <div className="relative max-w-4xl mx-auto">
          {/* Timeline Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 timeline-line rounded-full"></div>

          {/* Timeline Items */}
          <div ref={timelineRef} className="space-y-12">
            {experiences.map((exp, index) => (
              <motion.div
                key={exp.id}
                whileHover={{ x: 4 }}
                className="relative flex items-start gap-8"
              >
                {/* Timeline Dot */}
                <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-primary to-accent-bright rounded-2xl flex items-center justify-center relative z-10">
                  <Briefcase className="w-8 h-8 text-white" />
                </div>

                {/* Content Card */}
                <div className="flex-1 glass-card">
                  {/* Header */}
                  <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-heading font-semibold text-foreground mb-1">
                        {exp.title}
                      </h3>
                      <div className="flex items-center gap-2 text-accent-bright font-medium mb-2">
                        <span>{exp.company}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm px-2 py-1 bg-accent/10 rounded-full">
                          {exp.type}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>{exp.period}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin className="w-4 h-4" />
                        <span>{exp.location}</span>
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {exp.description}
                  </p>

                  {/* Achievements */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3 flex items-center gap-2">
                      <Award className="w-4 h-4 text-accent-bright" />
                      Key Achievements
                    </h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, achievementIndex) => (
                        <motion.li
                          key={achievementIndex}
                          initial={{ opacity: 0, x: -10 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          transition={{ delay: achievementIndex * 0.1 }}
                          className="flex items-start gap-3 text-sm text-muted-foreground"
                        >
                          <div className="w-1.5 h-1.5 bg-accent-bright rounded-full mt-2 flex-shrink-0" />
                          {achievement}
                        </motion.li>
                      ))}
                    </ul>
                  </div>

                  {/* Technologies */}
                  <div>
                    <h4 className="text-sm font-medium text-foreground mb-3">
                      Technologies Used
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Summary Stats */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-2xl mx-auto"
        >
          {[
            { label: "Years Experience", value: "4+" },
            { label: "Projects Delivered", value: "30+" },
            { label: "Team Members Led", value: "15+" },
            { label: "Client Satisfaction", value: "98%" }
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
      </div>
    </section>
  );
};

export default Experience;