import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Brain, 
  Database, 
  Code, 
  Globe, 
  Cpu, 
  LineChart,
  Mic,
  GitBranch,
  Server,
  Palette,
  Zap,
  Users
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    category: "Machine Learning & AI",
    icon: Brain,
    skills: [
      { name: "Python", level: 95, description: "Core programming language for ML/AI" },
      { name: "NumPy", level: 90, description: "Numerical computing and array operations" },
      { name: "Pandas", level: 92, description: "Data manipulation and analysis" },
      { name: "TensorFlow", level: 85, description: "Deep learning framework" },
      { name: "PyTorch", level: 80, description: "Research-focused ML framework" },
      { name: "Scikit-learn", level: 88, description: "Traditional ML algorithms" }
    ]
  },
  {
    category: "Backend & APIs",
    icon: Server,
    skills: [
      { name: "REST APIs", level: 92, description: "RESTful web services design" },
      { name: "FastAPI", level: 88, description: "Modern Python web framework" },
      { name: "Flask", level: 85, description: "Lightweight web framework" },
      { name: "SQL", level: 90, description: "Database querying and optimization" },
      { name: "PostgreSQL", level: 85, description: "Advanced relational database" },
      { name: "Redis", level: 80, description: "In-memory data structure store" }
    ]
  },
  {
    category: "Data Engineering",
    icon: Database,
    skills: [
      { name: "Apache Kafka", level: 78, description: "Distributed streaming platform" },
      { name: "Docker", level: 85, description: "Containerization technology" },
      { name: "AWS", level: 82, description: "Cloud computing services" },
      { name: "Data Pipelines", level: 88, description: "ETL/ELT process design" },
      { name: "Airflow", level: 75, description: "Workflow orchestration" }
    ]
  },
  {
    category: "Frontend & UX",
    icon: Palette,
    skills: [
      { name: "React", level: 85, description: "Frontend JavaScript library" },
      { name: "TypeScript", level: 82, description: "Type-safe JavaScript" },
      { name: "Next.js", level: 80, description: "Full-stack React framework" },
      { name: "Tailwind CSS", level: 90, description: "Utility-first CSS framework" },
      { name: "UI/UX Design", level: 75, description: "User interface design principles" }
    ]
  },
  {
    category: "Communication",
    icon: Mic,
    skills: [
      { name: "Public Speaking", level: 88, description: "Technical presentations" },
      { name: "Technical Writing", level: 85, description: "Documentation and articles" },
      { name: "Team Leadership", level: 80, description: "Project and team management" },
      { name: "Mentoring", level: 85, description: "Guiding junior developers" }
    ]
  }
];

const Expertise = () => {
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

      // Skills grid animation
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

  return (
    <section 
      ref={sectionRef}
      id="expertise"
      className="py-20 lg:py-32 bg-muted/20"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-section font-heading font-bold text-center mb-16 gradient-text"
        >
          Expertise & Skills
        </h2>

        {/* Skills Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {skills.map((category, categoryIndex) => {
            const IconComponent = category.icon;
            return (
              <motion.div
                key={category.category}
                whileHover={{ y: -8 }}
                className="skill-card"
              >
                {/* Category Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary to-accent-bright flex items-center justify-center">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-heading font-semibold text-foreground">
                    {category.category}
                  </h3>
                </div>

                {/* Skills List */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ delay: skillIndex * 0.1 }}
                      className="group"
                    >
                      {/* Skill Header */}
                      <div className="flex items-center justify-between mb-2">
                        <span className="font-medium text-foreground group-hover:text-accent-bright transition-colors">
                          {skill.name}
                        </span>
                        <span className="text-sm text-muted-foreground font-mono">
                          {skill.level}%
                        </span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 bg-border rounded-full overflow-hidden mb-2">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          transition={{ duration: 1, delay: skillIndex * 0.1 }}
                          className="h-full bg-gradient-to-r from-primary to-accent-bright rounded-full"
                        />
                      </div>

                      {/* Description */}
                      <p className="text-xs text-muted-foreground">
                        {skill.description}
                      </p>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <div className="glass-card max-w-2xl mx-auto">
            <h3 className="text-2xl font-heading font-semibold mb-4 gradient-text">
              Ready to Collaborate?
            </h3>
            <p className="text-muted-foreground mb-6">
              I'm always excited to work on challenging projects that push the boundaries 
              of what's possible with AI and data. Let's build something amazing together.
            </p>
            <motion.button
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-hero"
            >
              Let's Connect
              <Users className="w-5 h-5" />
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Expertise;