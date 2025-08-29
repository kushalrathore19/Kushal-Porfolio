import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ExternalLink, Github, ArrowRight, Filter } from 'lucide-react';
import projectsData from '../../data/projects.json';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const filterRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  
  const [filter, setFilter] = useState('all');
  const [filteredProjects, setFilteredProjects] = useState(projectsData);

  // Get unique tags for filtering
  const allTags = Array.from(new Set(projectsData.flatMap(project => project.tags)));
  const filterOptions = ['all', ...allTags];

  useEffect(() => {
    if (filter === 'all') {
      setFilteredProjects(projectsData);
    } else {
      setFilteredProjects(projectsData.filter(project => 
        project.tags.includes(filter)
      ));
    }
  }, [filter]);

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

      // Filter animation
      gsap.fromTo(filterRef.current,
        { y: 30, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: filterRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Projects grid animation
      gsap.fromTo(gridRef.current?.children || [],
        { y: 50, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: gridRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, [filteredProjects]);

  return (
    <section 
      ref={sectionRef}
      id="projects"
      className="py-20 lg:py-32"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-section font-heading font-bold text-center mb-8 gradient-text"
        >
          Featured Projects
        </h2>

        <p className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto">
          A collection of projects that showcase my expertise in AI/ML, data engineering, 
          and full-stack development. Each project solves real-world problems with measurable impact.
        </p>

        {/* Filter Buttons */}
        <div ref={filterRef} className="flex flex-wrap justify-center gap-3 mb-12">
          {filterOptions.map((option) => (
            <motion.button
              key={option}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setFilter(option)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === option
                  ? 'bg-gradient-to-r from-primary to-accent-bright text-white shadow-glow'
                  : 'glass-subtle text-muted-foreground hover:text-foreground'
              }`}
            >
              {option === 'all' ? 'All Projects' : option}
            </motion.button>
          ))}
        </div>

        {/* Projects Grid */}
        <div ref={gridRef} className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <motion.div
              key={project.id}
              layout
              whileHover={{ y: -8 }}
              className={`project-card ${project.featured ? 'md:col-span-2 lg:col-span-2' : ''}`}
            >
              {/* Project Image */}
              <div className="relative aspect-video bg-gradient-to-br from-primary/20 to-accent-bright/20 rounded-2xl mb-6 overflow-hidden group">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent-bright/10" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-6xl opacity-20">💻</div>
                </div>
                
                {/* Overlay on hover */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="flex gap-4">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                      >
                        <ExternalLink className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.1 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/20 rounded-full backdrop-blur-sm"
                      >
                        <Github className="w-5 h-5 text-white" />
                      </motion.a>
                    )}
                  </div>
                </div>
              </div>

              {/* Project Content */}
              <div className="p-6">
                {/* Featured Badge */}
                {project.featured && (
                  <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-primary to-accent-bright text-white text-xs font-medium rounded-full mb-4">
                    <div className="w-2 h-2 bg-white rounded-full" />
                    Featured Project
                  </div>
                )}

                {/* Title */}
                <h3 className="text-xl font-heading font-semibold mb-3 text-foreground group-hover:text-accent-bright transition-colors">
                  {project.title}
                </h3>

                {/* Description */}
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>

                {/* Problem, Approach, Impact for featured projects */}
                {project.featured && (
                  <div className="space-y-3 mb-6">
                    <div>
                      <span className="text-sm font-medium text-accent-bright">Problem:</span>
                      <p className="text-sm text-muted-foreground mt-1">{project.problem}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-primary">Approach:</span>
                      <p className="text-sm text-muted-foreground mt-1">{project.approach}</p>
                    </div>
                    <div>
                      <span className="text-sm font-medium text-accent-bright">Impact:</span>
                      <p className="text-sm text-muted-foreground mt-1">{project.impact}</p>
                    </div>
                  </div>
                )}

                {/* Tech Stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.slice(0, 4).map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full"
                    >
                      {tech}
                    </span>
                  ))}
                  {project.stack.length > 4 && (
                    <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-xs rounded-full">
                      +{project.stack.length - 4} more
                    </span>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between">
                  <div className="flex gap-3">
                    {project.liveUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-bright hover:text-accent-bright/80 transition-colors text-sm font-medium"
                      >
                        Live Demo
                      </motion.a>
                    )}
                    {project.githubUrl && (
                      <motion.a
                        whileHover={{ scale: 1.05 }}
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-muted-foreground hover:text-foreground transition-colors text-sm font-medium"
                      >
                        View Code
                      </motion.a>
                    )}
                  </div>

                  {project.caseStudyUrl && (
                    <motion.a
                      whileHover={{ x: 4 }}
                      href={project.caseStudyUrl}
                      className="inline-flex items-center gap-2 text-primary hover:text-primary/80 transition-colors text-sm font-medium"
                    >
                      Case Study
                      <ArrowRight className="w-4 h-4" />
                    </motion.a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View All Projects CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mt-16"
        >
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.98 }}
            className="btn-hero-outline"
          >
            View All Projects
            <ArrowRight className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;