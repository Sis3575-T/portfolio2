import React, { useState, useEffect } from 'react';

/* ============================================================
   PORTFOLIO TEMPLATE — Self-contained single-file component
   ============================================================
   Instructions:
   1. Replace the content inside the `config` object below
   2. Replace the profile photo import path
   3. Done — everything else generates automatically
   ============================================================ */

const config = {
  name: 'Your Name',
  initials: 'YN',
  title: 'Full-Stack Developer | CS Student',
  tagline: 'I build modern web applications using React, Node.js, and Express.',
  photo: '', // require('./assets/photo.jpg') or import
  email: 'your@email.com',
  phone: '+123 456 789',
  location: 'Your City, Country',
  social: {
    github: 'https://github.com/yourhandle',
    linkedin: 'https://linkedin.com/in/yourhandle',
  },
  about: {
    paragraphs: [
      'I am a Full-Stack Developer and Computer Science student with a genuine passion for building software that solves real problems.',
      'I chose Computer Science because I wanted to understand the fundamental principles behind the technology we use every day.',
      'What drives me is the ability to take an idea and turn it into a working product. I enjoy the full development cycle.',
      'I approach every project with a problem-solving mindset: understand the requirements, break the problem into manageable pieces, and iterate.',
    ],
    details: [
      { title: 'Focus', text: 'Full-Stack Web Development with modern JavaScript' },
      { title: 'University', text: 'Your University — B.Sc. Computer Science' },
      { title: 'Interest', text: 'Software engineering, system design, and clean architecture' },
      { title: 'Approach', text: 'Break problems down, research solutions, iterate to quality' },
      { title: 'Mindset', text: 'Continuous learning through building real projects' },
      { title: 'Goal', text: 'Create software that makes a meaningful impact' },
    ],
  },
  skills: [
    { title: 'Frontend', skills: ['React', 'HTML', 'CSS', 'Tailwind CSS'] },
    { title: 'Backend', skills: ['Node.js', 'Express'] },
    { title: 'Database', skills: ['MongoDB', 'PostgreSQL'] },
    { title: 'Tools', skills: ['Git', 'Docker', 'VS Code', 'Vite'] },
  ],
  projects: [
    {
      name: 'Project Name',
      type: 'Full Stack Web Application',
      techs: ['React', 'Node.js', 'Express', 'MongoDB'],
      demo: '#',
      github: 'https://github.com/yourhandle',
    },
  ],
  journey: [
    { title: 'Building Full-Stack Applications', desc: 'Developing and deploying complete web applications using React, Node.js, Express, and MongoDB.' },
    { title: 'Platform Modernization', desc: 'Migrated a production portfolio application from Create React App to Vite, achieving faster builds.' },
    { title: 'Computer Science Foundation', desc: 'Pursuing a B.Sc. in Computer Science with coursework in data structures, algorithms, and software engineering.' },
    { title: 'Learning Through Building', desc: 'Mastered React for frontend and Node.js with Express for backend services.' },
    { title: 'Starting the Journey', desc: 'Began with HTML, CSS, and JavaScript fundamentals. Built foundational knowledge in responsive design.' },
  ],
  navLinks: [
    { label: 'Home', href: '#home' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Projects', href: '#projects' },
    { label: 'Journey', href: '#journey' },
    { label: 'Contact', href: '#contact' },
  ],
};

/* ============================================================
   COMPONENTS
   ============================================================ */

function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const ids = config.navLinks.map(l => l.href.slice(1));
      for (let i = ids.length - 1; i >= 0; i--) {
        const el = document.getElementById(ids[i]);
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(ids[i]);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleClick = (e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    const id = href.slice(1);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 h-[72px] transition-all duration-300 ${
        scrolled
          ? 'bg-surface/95 backdrop-blur-xl border-b border-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-container mx-auto px-6 h-full flex items-center justify-between">
        <a
          href="#home"
          onClick={(e) => handleClick(e, '#home')}
          className="font-display text-xl font-bold text-text-primary tracking-tight"
        >
          {config.initials}
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {config.navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`relative px-4 py-2 text-sm font-medium rounded transition-colors duration-200 ${
                activeSection === link.href.slice(1)
                  ? 'text-text-primary'
                  : 'text-text-secondary hover:text-text-primary'
              }`}
            >
              {link.label}
              {activeSection === link.href.slice(1) && (
                <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-5 h-0.5 bg-accent rounded" />
              )}
            </a>
          ))}
        </nav>

        <button
          className="md:hidden text-text-primary text-2xl p-1"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 12h18M3 6h18M3 18h18"/></svg>
          )}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-surface/98 backdrop-blur-xl border-b border-border px-6 py-4">
          {config.navLinks.map(link => (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`block py-3 text-sm font-medium ${
                activeSection === link.href.slice(1)
                  ? 'text-accent'
                  : 'text-text-secondary'
              }`}
            >
              {link.label}
            </a>
          ))}
        </div>
      )}
    </header>
  );
}

function HeroSection() {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center px-6 pt-24 pb-16 bg-surface relative overflow-hidden">
      <div className="absolute top-1/3 -right-48 w-[500px] h-[500px] rounded-full bg-accent/5 pointer-events-none" />
      <div className="max-w-container w-full grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-16 lg:gap-24 items-center relative z-10">
        <div className="flex flex-col gap-6 text-center lg:text-left">
          <div>
            <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight">
              {config.name.toUpperCase()}
            </h1>
          </div>
          <div>
            <span className="text-lg text-accent">{config.title}</span>
          </div>
          <p className="text-base text-text-secondary leading-relaxed max-w-lg mx-auto lg:mx-0">
            {config.tagline}
          </p>
          <div className="flex flex-wrap gap-3 justify-center lg:justify-start">
            <a
              href="#projects"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5"
            >
              View Projects
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-text-primary text-sm font-medium hover:border-border-hover transition-all hover:-translate-y-0.5"
            >
              Contact Me
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z"/></svg>
            </a>
          </div>
        </div>
        {config.photo && (
          <div className="flex justify-center lg:justify-end">
            <div className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 rounded-full border-2 border-border overflow-hidden shadow-xl transition-all duration-300 hover:border-accent">
              <img src={config.photo} alt={config.name} className="w-full h-full object-cover" />
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">About</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 tracking-tight">About Me</h2>
        </div>
        <div className="max-w-4xl mx-auto">
          <div className="bg-surface-card border border-border rounded-xl p-8 sm:p-10">
            <div className="space-y-5 text-text-secondary leading-relaxed text-[15px]">
              {config.about.paragraphs.map((p, i) => <p key={i}>{p}</p>)}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-8">
            {config.about.details.map(card => (
              <div key={card.title} className="bg-surface-card border border-border rounded-lg p-5 hover:border-border-hover transition-colors">
                <h4 className="text-xs font-semibold tracking-wider text-accent uppercase mb-1">{card.title}</h4>
                <p className="text-sm text-text-secondary">{card.text}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function SkillsSection() {
  return (
    <section id="skills" className="py-24 px-6 bg-surface">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Skills</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 tracking-tight">Technical Skills</h2>
          <p className="text-text-secondary text-sm mt-3 max-w-lg mx-auto">Technologies and tools I use across the development stack.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {config.skills.map((cat, idx) => (
            <div key={cat.title} className="bg-surface-card border border-border rounded-xl p-6 hover:border-border-hover transition-colors">
              <h3 className="font-display text-base font-semibold text-text-primary mb-4 pb-3 border-b border-border">{cat.title}</h3>
              <ul className="space-y-2">
                {cat.skills.map(skill => (
                  <li key={skill} className="flex items-center gap-2.5 text-sm text-text-secondary">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent/60 flex-shrink-0" />
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ProjectsSection() {
  return (
    <section id="projects" className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Projects</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 tracking-tight">Featured Projects</h2>
          <p className="text-text-secondary text-sm mt-3 max-w-lg mx-auto">Applications built with modern technologies and development practices.</p>
        </div>
        <div className="max-w-2xl mx-auto space-y-4">
          {config.projects.map(project => (
            <div key={project.name} className="bg-surface-card border border-border rounded-xl overflow-hidden">
              <div className="p-6 sm:p-8">
                <h3 className="font-display text-xl font-bold text-text-primary mb-1">{project.name}</h3>
                <p className="text-xs text-accent font-medium mb-4">{project.type}</p>
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.techs.map(tech => (
                    <span key={tech} className="px-2.5 py-1 rounded text-xs font-medium bg-accent/10 text-text-secondary border border-accent/20">{tech}</span>
                  ))}
                </div>
              </div>
              <div className="px-6 sm:px-8 py-4 border-t border-border flex items-center gap-3">
                <a href={project.demo} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3"/></svg>
                  Live Demo
                </a>
                <a href={project.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 px-4 py-2 rounded-lg border border-border text-text-primary text-sm font-medium hover:border-border-hover transition-all">
                  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
                  GitHub
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function JourneySection() {
  return (
    <section id="journey" className="py-24 px-6 bg-surface">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Journey</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 tracking-tight">My Journey</h2>
          <p className="text-text-secondary text-sm mt-3 max-w-lg mx-auto">A narrative of growth — from learning fundamentals to building full-stack applications.</p>
        </div>
        <div className="max-w-3xl mx-auto space-y-4">
          {config.journey.map((item, idx) => (
            <div key={idx} className="relative pl-8 before:absolute before:left-[11px] before:top-3 before:w-0.5 before:h-[calc(100%+8px)] before:bg-border last:before:hidden">
              <div className="absolute left-[5px] top-1.5 w-3.5 h-3.5 rounded-full bg-accent border-2 border-surface" />
              <div className="bg-surface-card border border-border rounded-lg p-5 hover:border-border-hover transition-colors">
                <h3 className="font-display text-base font-semibold text-text-primary mb-1">{item.title}</h3>
                <p className="text-sm text-text-secondary leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function ContactSection() {
  const [form, setForm] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Contact form:', form);
    setForm({ name: '', email: '', message: '' });
  };

  return (
    <section id="contact" className="py-24 px-6 bg-surface-secondary">
      <div className="max-w-container mx-auto">
        <div className="text-center mb-16">
          <span className="text-xs font-semibold tracking-widest text-accent uppercase">Contact</span>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 tracking-tight">Get In Touch</h2>
          <p className="text-text-secondary text-sm mt-3 max-w-lg mx-auto">
            Open to internships, freelance work, and development roles. Reach out to discuss how I can contribute to your next project.
          </p>
        </div>
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
          <div className="bg-surface-card border border-border rounded-xl p-8">
            <h3 className="font-display text-lg font-semibold text-text-primary mb-1">Send a Message</h3>
            <p className="text-sm text-text-secondary mb-6">I will respond as soon as possible.</p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">Name</label>
                <input type="text" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                  placeholder="Your name"
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">Email</label>
                <input type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                  placeholder="your@email.com"
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors" />
              </div>
              <div>
                <label className="block text-xs font-medium text-text-secondary uppercase tracking-wider mb-1.5">Message</label>
                <textarea required value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="Tell me about your project or opportunity..." rows={4}
                  className="w-full px-4 py-2.5 rounded-lg bg-surface border border-border text-text-primary text-sm placeholder:text-text-muted focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/30 transition-colors resize-vertical" />
              </div>
              <button type="submit"
                className="inline-flex items-center gap-2 px-6 py-2.5 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5">
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-surface-card border border-border rounded-xl p-8">
            <h3 className="font-display text-lg font-semibold text-text-primary mb-1">Contact Info</h3>
            <p className="text-sm text-text-secondary mb-6">Reach out through any of these channels.</p>
            <div className="space-y-3">
              {[
                { icon: 'M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z', label: config.email },
                { icon: 'M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z', label: config.phone },
                { icon: 'M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0zM12 7a3 3 0 100 6 3 3 0 000-6z', label: config.location },
              ].map((item, i) => (
                <div key={i} className="flex items-center gap-3 px-4 py-3 rounded-lg bg-surface border border-border">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d={item.icon}/></svg>
                  </div>
                  <span className="text-sm text-text-secondary">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-6">
              <a href={config.social.github} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors" aria-label="GitHub">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z"/></svg>
              </a>
              <a href={config.social.linkedin} target="_blank" rel="noreferrer" className="w-10 h-10 rounded-lg bg-surface border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors" aria-label="LinkedIn">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-surface border-t border-border py-12">
      <div className="max-w-container mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <h4 className="font-display text-lg font-bold text-text-primary mb-1">{config.name}</h4>
            <p className="text-sm text-text-secondary">{config.title}</p>
          </div>
          <div className="flex items-center gap-4">
            {[
              { href: config.social.github, label: 'GitHub', path: 'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0024 12c0-6.63-5.37-12-12-12z' },
              { href: config.social.linkedin, label: 'LinkedIn', path: 'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z' },
            ].map(s => (
              <a key={s.label} href={s.href} target="_blank" rel="noreferrer"
                className="w-10 h-10 rounded-lg bg-surface-card border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
                aria-label={s.label}>
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d={s.path}/></svg>
              </a>
            ))}
            <a href={`mailto:${config.email}`}
              className="w-10 h-10 rounded-lg bg-surface-card border border-border flex items-center justify-center text-text-secondary hover:text-accent hover:border-accent transition-colors"
              aria-label="Email">
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2zM22 6l-10 7L2 6"/></svg>
            </a>
          </div>
        </div>
        <div className="mt-8 pt-6 border-t border-border text-center">
          <p className="text-xs text-text-muted">&copy; {new Date().getFullYear()} {config.name}. Built with React &amp; Tailwind CSS.</p>
        </div>
      </div>
    </footer>
  );
}

/* ============================================================
   APP — Composes all sections
   ============================================================ */

export default function PortfolioTemplate() {
  return (
    <div className="min-h-screen flex flex-col bg-surface text-text-primary font-body">
      <Header />
      <main className="flex-1">
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <JourneySection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
}
