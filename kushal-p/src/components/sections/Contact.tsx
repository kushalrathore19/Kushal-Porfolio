import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Send, Mail, MessageCircle, User, CheckCircle, AlertCircle } from 'lucide-react';
import { toast } from 'sonner';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

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

      // Form animation
      gsap.fromTo(formRef.current,
        { x: -50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: formRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

      // Info animation
      gsap.fromTo(infoRef.current,
        { x: 50, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: infoRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse"
          }
        }
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate form submission (replace with actual EmailJS or API call)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.success("Message sent successfully! I'll get back to you soon.", {
        icon: <CheckCircle className="w-5 h-5" />,
      });
      
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      toast.error("Failed to send message. Please try again.", {
        icon: <AlertCircle className="w-5 h-5" />,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const directEmail = () => {
    window.location.href = 'mailto:kushal@example.com?subject=Let\'s collaborate&body=Hi Kushal,%0D%0A%0D%0AI would like to discuss a potential collaboration...';
  };

  return (
    <section 
      ref={sectionRef}
      id="contact"
      className="py-20 lg:py-32 bg-muted/20"
      data-scroll-section
    >
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <h2 
          ref={titleRef}
          className="text-section font-heading font-bold text-center mb-8 gradient-text"
        >
          Let's Work Together
        </h2>

        <p className="text-center text-muted-foreground mb-16 max-w-2xl mx-auto">
          Let's build something users love. Whether you have a project in mind, 
          need AI/ML consulting, or just want to chat about technology, I'd love to hear from you.
        </p>

        <div className="grid lg:grid-cols-2 gap-16 max-w-6xl mx-auto">
          {/* Contact Form */}
          <div>
            <form ref={formRef} onSubmit={handleSubmit} className="glass-card space-y-6">
              <div className="mb-8">
                <h3 className="text-2xl font-heading font-semibold mb-2">Send a Message</h3>
                <p className="text-muted-foreground">
                  Fill out the form below and I'll get back to you within 24 hours.
                </p>
              </div>

              {/* Name Input */}
              <div className="space-y-2">
                <label htmlFor="name" className="block text-sm font-medium text-foreground">
                  Name *
                </label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="Your full name"
                  />
                </div>
              </div>

              {/* Email Input */}
              <div className="space-y-2">
                <label htmlFor="email" className="block text-sm font-medium text-foreground">
                  Email *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    required
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200"
                    placeholder="your.email@example.com"
                  />
                </div>
              </div>

              {/* Message Input */}
              <div className="space-y-2">
                <label htmlFor="message" className="block text-sm font-medium text-foreground">
                  Message *
                </label>
                <div className="relative">
                  <MessageCircle className="absolute left-3 top-4 w-5 h-5 text-muted-foreground" />
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    rows={6}
                    className="w-full pl-12 pr-4 py-3 bg-background/50 border border-border rounded-2xl focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all duration-200 resize-none"
                    placeholder="Tell me about your project or just say hello..."
                  />
                </div>
              </div>

              {/* Submit Button */}
              <motion.button
                type="submit"
                disabled={isSubmitting}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className="w-full btn-hero disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5" />
                  </>
                )}
              </motion.button>
            </form>
          </div>

          {/* Contact Info */}
          <div ref={infoRef} className="space-y-8">
            {/* Direct Contact */}
            <div className="glass-card">
              <h3 className="text-2xl font-heading font-semibold mb-6">Get in Touch</h3>
              
              <div className="space-y-6">
                <motion.button
                  whileHover={{ x: 4 }}
                  onClick={directEmail}
                  className="w-full p-4 bg-gradient-to-r from-primary/10 to-accent-bright/10 rounded-2xl border border-primary/20 hover:border-primary/40 transition-all duration-200 text-left group"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-primary to-accent-bright rounded-2xl flex items-center justify-center">
                      <Mail className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground group-hover:text-primary transition-colors">
                        Email Me Directly
                      </div>
                      <div className="text-sm text-muted-foreground">
                        kushal@example.com
                      </div>
                    </div>
                  </div>
                </motion.button>

                {/* Response Time */}
                <div className="p-4 bg-accent/5 rounded-2xl border border-accent/20">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-accent-bright rounded-full animate-pulse" />
                    <div>
                      <div className="font-medium text-foreground">Quick Response</div>
                      <div className="text-sm text-muted-foreground">
                        Usually respond within 24 hours
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* What to Expect */}
            <div className="glass-card">
              <h3 className="text-xl font-heading font-semibold mb-4">What to Expect</h3>
              <div className="space-y-4">
                {[
                  "Detailed project discussion and requirement analysis",
                  "Timeline and milestone planning",
                  "Regular updates and transparent communication",
                  "High-quality deliverables with documentation"
                ].map((item, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-1.5 h-1.5 bg-accent-bright rounded-full mt-2 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Availability */}
            <div className="glass-card">
              <h3 className="text-xl font-heading font-semibold mb-4">Current Availability</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">New Projects</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent-bright text-xs rounded-full font-medium">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Consulting</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent-bright text-xs rounded-full font-medium">
                    Available
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-muted-foreground">Speaking</span>
                  <span className="px-3 py-1 bg-accent/10 text-accent-bright text-xs rounded-full font-medium">
                    Available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;