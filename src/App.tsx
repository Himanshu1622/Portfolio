/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Github, 
  Linkedin, 
  Mail, 
  Code2, 
  TrendingUp, 
  Globe, 
  Cpu, 
  MessageSquare,
  ChevronRight,
  ArrowUpRight,
  Menu,
  X
} from 'lucide-react';

// --- Types ---
interface Project {
  title: string;
  description: string;
  tags: string[];
  link: string;
  image: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  description: string;
}

// --- Data ---
const PROJECTS: Project[] = [
  {
    title: "Specialty in Lead Ads",
    description: "Designing high-conversion lead generation campaigns for B2B and B2C businesses, focusing on lead quality and cost-efficient acquisition.",
    tags: ["Lead Gen", "Meta Ads", "Conversion"],
    link: "#",
    image: "https://picsum.photos/seed/leads/800/600"
  },
  {
    title: "Organic Growth Strategy",
    description: "Developing comprehensive SEO frameworks and content marketing strategies to drive sustainable organic traffic growth.",
    tags: ["SEO", "Semrush", "Content"],
    link: "#",
    image: "https://picsum.photos/seed/seo/800/600"
  },
  {
    title: "Social Media Optimization",
    description: "Implementing data-driven strategies to enhance brand presence and engagement across social platforms through organic content optimization.",
    tags: ["Social Media", "Figma", "Capcut"],
    link: "#",
    image: "https://picsum.photos/seed/social/800/600"
  }
];

const EXPERIENCES: Experience[] = [
  {
    role: "Senior Digital Marketing Executive",
    company: "CASA harmony (Dubai)",
    period: "Nov 2025 - Present",
    description: "Leading digital growth initiatives and performance marketing strategies in the Dubai market."
  },
  {
    role: "Digital Marketing Executive",
    company: "Happy buying (Chandigarh)",
    period: "Oct 2022 - Jan 2026",
    description: "Managed end-to-end digital marketing campaigns, focusing on SEO, SEM, and brand growth."
  },
  {
    role: "Frontend Developer",
    company: "Happy buying (Chandigarh)",
    period: "Nov 2021 - Oct 2022",
    description: "Built and maintained responsive web interfaces, ensuring high performance and seamless user experiences."
  }
];

const SKILLS = {
  frontend: ["React", "TypeScript", "Tailwind CSS", "Next.js"],
  marketing: ["Meta Ads", "Media Buying", "Whatsapp Marketing", "Email Marketing", "Keyword Planner", "SEO"],
  tools: ["Figma", "Git", "Semrush", "Canva", "Capcut"]
};

// --- Components ---

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 50);
      
      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false);
      } else {
        setVisible(true);
      }
      setLastScrollY(currentScrollY);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const navLinks = [
    { name: 'About', href: '#about' },
    { name: 'Skills', href: '#skills' },
    { name: 'Projects', href: '#projects' },
    { name: 'Experience', href: '#experience' },
    { name: 'Contact', href: '#contact' },
  ];

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'bg-white/80 backdrop-blur-md border-b border-black/5 py-4' : 'bg-transparent py-6'} ${visible ? 'translate-y-0 opacity-100' : '-translate-y-full opacity-0'}`}>
      <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          className="text-xl font-bold tracking-tighter"
        >
          HIMANSHU<span className="text-emerald-600">.</span>
        </motion.div>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.name}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              className="text-sm font-medium text-black/60 hover:text-black transition-colors"
            >
              {link.name}
            </motion.a>
          ))}
          <motion.a
            href="#contact"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="px-5 py-2 bg-black text-white text-sm font-medium rounded-full hover:bg-black/80 transition-all text-center"
          >
            Hire Me
          </motion.a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-b border-black/5 overflow-hidden"
          >
            <div className="flex flex-col p-6 gap-4">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-lg font-medium text-black/60 hover:text-black transition-colors"
                >
                  {link.name}
                </a>
              ))}
              <a
                href="#contact"
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-3 bg-black text-white text-center font-bold rounded-2xl hover:bg-black/80 transition-all"
              >
                Hire Me
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

const SectionHeading = ({ title, subtitle, number }: { title: string; subtitle?: string; number: string }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: false, amount: 0.5 }}
    className="mb-16 relative"
  >
    <span className="text-[120px] font-serif font-black text-black/5 absolute -top-20 -left-4 select-none">
      {number}
    </span>
    <div className="relative z-10">
      <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">{title}</h2>
      {subtitle && <p className="text-black/50 max-w-xl">{subtitle}</p>}
    </div>
  </motion.div>
);

export default function App() {
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    const formData = new FormData(e.target as HTMLFormElement);
    const data = {
      name: formData.get('name'),
      email: formData.get('email'),
      subject: formData.get('subject'),
      message: formData.get('message'),
    };

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setFormStatus('success');
        setTimeout(() => setFormStatus('idle'), 5000);
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.error('Contact Error:', error);
      alert('Failed to send message. Please try again or email me directly.');
      setFormStatus('idle');
    }
  };

  return (
    <div className="min-h-screen bg-[#FBFBFB] text-black font-sans selection:bg-emerald-100 selection:text-emerald-900">
      <Navbar />

      {/* Hero Section */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 px-6 overflow-hidden">
        {/* Texture Background */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")` }}></div>
        
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 0.8 }}
            >
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 text-xs font-bold uppercase tracking-wider mb-6">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
                Available for new projects
              </div>
              <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
                DIGITAL <br />
                <span className="text-emerald-600">MARKETING.</span>
              </h1>
              <p className="text-xl text-black/60 max-w-md mb-10 leading-relaxed">
                Himanshu — A results-driven Digital Marketing expert with a strong foundation in Frontend Development. I build high-converting digital ecosystems.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="px-8 py-4 bg-black text-white rounded-full font-bold flex items-center gap-2 hover:scale-105 transition-transform">
                  View Projects <ArrowUpRight size={20} />
                </button>
                <div className="flex items-center gap-4 px-4">
                  <a href="#" className="p-2 hover:text-emerald-600 transition-colors"><Github size={24} /></a>
                  <a href="#" className="p-2 hover:text-emerald-600 transition-colors"><Linkedin size={24} /></a>
                  <a href="#" className="p-2 hover:text-emerald-600 transition-colors"><Mail size={24} /></a>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: false, amount: 0.1 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="relative hidden md:block"
            >
              <div className="aspect-square rounded-3xl bg-black/5 overflow-hidden relative">
                <img 
                  src="https://picsum.photos/seed/himanshu/800/800" 
                  alt="Himanshu" 
                  className="w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
              {/* Floating badges */}
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-2xl shadow-xl border border-black/5 max-w-[200px]">
                <div className="flex items-center gap-3 mb-2">
                  <div className="p-2 bg-emerald-100 rounded-lg text-emerald-600"><TrendingUp size={20} /></div>
                  <span className="font-bold text-sm">Growth Expert</span>
                </div>
                <p className="text-xs text-black/50">Optimizing digital presence through technical excellence.</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 px-6 bg-white scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading 
            number="01" 
            title="The Intersection of Code & Growth" 
            subtitle="I don't just build websites; I build digital experiences that drive measurable results."
          />
          <div className="grid md:grid-cols-3 gap-12">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="space-y-4"
            >
              <div className="p-4 bg-emerald-600 text-white w-fit rounded-2xl mb-6"><Globe size={32} /></div>
              <h3 className="text-xl font-bold">Digital Marketing</h3>
              <p className="text-black/60 leading-relaxed">
                Specializing in high-conversion Lead Ads and data-driven growth strategies. Proven track record in SEO, SEM, and performance marketing across Chandigarh and Dubai markets.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.1 }}
              className="space-y-4"
            >
              <div className="p-4 bg-black text-white w-fit rounded-2xl mb-6"><Code2 size={32} /></div>
              <h3 className="text-xl font-bold">Frontend Engineering</h3>
              <p className="text-black/60 leading-relaxed">
                Building pixel-perfect, responsive, and accessible user interfaces using React and modern CSS frameworks. Focused on creating seamless digital experiences that engage and convert users.
              </p>
            </motion.div>
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              transition={{ delay: 0.2 }}
              className="space-y-4"
            >
              <div className="p-4 bg-zinc-100 text-black w-fit rounded-2xl mb-6"><Cpu size={32} /></div>
              <h3 className="text-xl font-bold">Technical Strategy</h3>
              <p className="text-black/60 leading-relaxed">
                Consulting on modern tech stacks and marketing automation to streamline business operations. Expertly scaling digital products through technical excellence and strategic growth planning.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <SectionHeading number="02" title="Technical Arsenal" />
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-6">Digital Marketing</h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.marketing.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-zinc-50 border border-black/5 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-6">Frontend</h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.frontend.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-zinc-50 border border-black/5 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>
            <div className="p-8 bg-white rounded-3xl border border-black/5 shadow-sm">
              <h4 className="text-xs font-black uppercase tracking-widest text-emerald-600 mb-6">Tools & Cloud</h4>
              <div className="flex flex-wrap gap-2">
                {SKILLS.tools.map(skill => (
                  <span key={skill} className="px-3 py-1 bg-zinc-50 border border-black/5 rounded-full text-sm font-medium">{skill}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 px-6 bg-black text-white scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex justify-between items-end mb-16">
            <div>
              <span className="text-emerald-500 font-mono text-sm mb-4 block tracking-widest uppercase">Selected Works</span>
              <h2 className="text-5xl font-bold tracking-tight">Featured Projects</h2>
            </div>
            <button className="hidden md:flex items-center gap-2 text-emerald-500 font-bold hover:gap-4 transition-all">
              View All <ChevronRight size={20} />
            </button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PROJECTS.map((project, i) => (
              <motion.div 
                key={project.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{ delay: i * 0.1 }}
                className="group cursor-pointer"
              >
                <div className="aspect-[4/3] rounded-2xl overflow-hidden mb-6 relative">
                  <img 
                    src={project.image} 
                    alt={project.title} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="p-4 bg-white text-black rounded-full"><ArrowUpRight /></div>
                  </div>
                </div>
                <div className="flex gap-2 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[10px] font-bold uppercase tracking-widest text-emerald-500">{tag}</span>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                <p className="text-white/50 text-sm leading-relaxed">{project.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 px-6 scroll-mt-24">
        <div className="max-w-3xl mx-auto">
          <SectionHeading number="03" title="Professional Journey" />
          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <motion.div 
                key={`${exp.company}-${exp.role}-${i}`}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, amount: 0.3 }}
                transition={{ delay: i * 0.1 }}
                className="relative pl-8 border-l border-black/10"
              >
                <div className="absolute top-0 left-[-5px] w-[10px] h-[10px] rounded-full bg-emerald-600"></div>
                <span className="text-sm font-mono text-black/40 mb-2 block">{exp.period}</span>
                <h3 className="text-2xl font-bold mb-1">{exp.role}</h3>
                <h4 className="text-emerald-600 font-bold mb-4">{exp.company}</h4>
                <p className="text-black/60 leading-relaxed">{exp.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 px-6 bg-emerald-600 text-white scroll-mt-24">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: false, amount: 0.3 }}
            >
              <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">
                LET'S BUILD <br /> SOMETHING GREAT.
              </h2>
              <p className="text-xl text-emerald-100 max-w-xl mb-12">
                Whether you're looking for a digital marketing strategist to scale your growth or a frontend partner to build your vision, I'm here to help.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-700 rounded-xl"><Mail size={24} /></div>
                  <div>
                    <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Email Me</p>
                    <p className="text-xl font-bold">himanshu.vrma16@gmail.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-emerald-700 rounded-xl"><MessageSquare size={24} /></div>
                  <div>
                    <p className="text-emerald-200 text-sm font-bold uppercase tracking-widest">Chat</p>
                    <p className="text-xl font-bold">Available for calls</p>
                  </div>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, amount: 0.3 }}
              className="bg-white p-8 md:p-12 rounded-[32px] shadow-2xl text-black"
            >
              {formStatus === 'success' ? (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12"
                >
                  <div className="w-20 h-20 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <ChevronRight size={40} className="rotate-[-90deg]" />
                  </div>
                  <h3 className="text-3xl font-bold mb-2">Message Sent!</h3>
                  <p className="text-black/50">Thank you for reaching out. I'll get back to you shortly.</p>
                </motion.div>
              ) : (
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/40">Full Name</label>
                      <input 
                        required
                        name="name"
                        type="text" 
                        placeholder="John Doe"
                        className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-xs font-black uppercase tracking-widest text-black/40">Email Address</label>
                      <input 
                        required
                        name="email"
                        type="email" 
                        placeholder="john@example.com"
                        className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40">Subject</label>
                    <input 
                      required
                      name="subject"
                      type="text" 
                      placeholder="Project Inquiry"
                      className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-xs font-black uppercase tracking-widest text-black/40">Message</label>
                    <textarea 
                      required
                      name="message"
                      rows={4}
                      placeholder="Tell me about your project..."
                      className="w-full px-6 py-4 bg-zinc-50 border border-black/5 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-600 transition-all resize-none"
                    ></textarea>
                  </div>
                  <button 
                    disabled={formStatus === 'submitting'}
                    className="w-full py-5 bg-black text-white rounded-2xl font-black text-lg hover:bg-black/80 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {formStatus === 'submitting' ? 'Sending...' : 'Send Message'} <ArrowUpRight />
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 border-t border-black/5">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-xl font-bold tracking-tighter">
            HIMANSHU<span className="text-emerald-600">.</span>
          </div>
          <p className="text-sm text-black/40">
            © {new Date().getFullYear()} Himanshu. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">Twitter</a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">LinkedIn</a>
            <a href="#" className="text-sm font-medium hover:text-emerald-600 transition-colors">GitHub</a>
          </div>
        </div>
      </footer>
    </div>
  );
}
