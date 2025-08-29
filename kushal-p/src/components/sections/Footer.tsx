import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Mail, Heart, ArrowUp } from 'lucide-react';
import { siteConfig } from '../../config/site';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const socialLinks = [
    {
      name: 'GitHub',
      icon: Github,
      url: siteConfig.contact.github,
      color: 'hover:text-foreground'
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      url: siteConfig.contact.linkedin,
      color: 'hover:text-blue-500'
    },
    {
      name: 'Twitter',
      icon: Twitter,
      url: siteConfig.contact.twitter,
      color: 'hover:text-blue-400'
    },
    {
      name: 'Email',
      icon: Mail,
      url: `mailto:${siteConfig.contact.email}`,
      color: 'hover:text-accent-bright'
    }
  ];

  const quickLinks = [
    { label: 'About', href: '#about' },
    { label: 'Projects', href: '#projects' },
    { label: 'Experience', href: '#experience' },
    { label: 'Contact', href: '#contact' }
  ];

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollToSection = (href: string) => {
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <footer className="relative bg-background border-t border-border/20">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-accent-bright/5" />
      
      <div className="relative container mx-auto px-6 py-16">
        <div className="grid lg:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="lg:col-span-2 space-y-6">
            <motion.div
              whileHover={{ scale: 1.05 }}
              className="inline-block"
            >
              <h3 className="text-3xl font-heading font-bold gradient-text">
                {siteConfig.name}
              </h3>
            </motion.div>
            
            <p className="text-muted-foreground max-w-md leading-relaxed">
              {siteConfig.description}
            </p>

            {/* Social Links */}
            <div className="flex items-center gap-4">
              {socialLinks.map((social) => {
                const IconComponent = social.icon;
                return (
                  <motion.a
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.2, y: -2 }}
                    whileTap={{ scale: 0.9 }}
                    className={`p-3 bg-muted/50 rounded-2xl text-muted-foreground transition-all duration-200 ${social.color}`}
                    aria-label={social.name}
                  >
                    <IconComponent className="w-5 h-5" />
                  </motion.a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold text-foreground">
              Quick Links
            </h4>
            <nav className="space-y-3">
              {quickLinks.map((link) => (
                <motion.button
                  key={link.label}
                  whileHover={{ x: 4 }}
                  onClick={() => scrollToSection(link.href)}
                  className="block text-muted-foreground hover:text-foreground transition-colors duration-200"
                >
                  {link.label}
                </motion.button>
              ))}
            </nav>
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <h4 className="text-lg font-heading font-semibold text-foreground">
              Get in Touch
            </h4>
            <div className="space-y-3">
              <motion.a
                whileHover={{ x: 4 }}
                href={`mailto:${siteConfig.contact.email}`}
                className="block text-muted-foreground hover:text-accent-bright transition-colors duration-200"
              >
                {siteConfig.contact.email}
              </motion.a>
              <p className="text-sm text-muted-foreground">
                Available for freelance work and consulting
              </p>
              <div className="flex items-center gap-2 text-sm">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="text-muted-foreground">Currently available</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-16 pt-8 border-t border-border/20 flex flex-col lg:flex-row justify-between items-center gap-6">
          {/* Copyright */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>© {currentYear} {siteConfig.name}. Made with</span>
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ repeat: Infinity, duration: 2 }}
            >
              <Heart className="w-4 h-4 text-red-500 fill-current" />
            </motion.div>
            <span>and lots of coffee ☕</span>
          </div>

          {/* Back to Top */}
          <motion.button
            whileHover={{ y: -2 }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToTop}
            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full hover:bg-primary/20 transition-colors duration-200"
          >
            <span className="text-sm font-medium">Back to Top</span>
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>

        {/* Additional Credits */}
        <div className="mt-8 pt-6 border-t border-border/10 text-center">
          <p className="text-xs text-muted-foreground">
            Built with React, TypeScript, Tailwind CSS, GSAP, Locomotive Scroll, and Spline 3D
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;