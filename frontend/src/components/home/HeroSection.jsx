import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { FiArrowRight, FiMail, FiDownload, FiChevronDown } from 'react-icons/fi';
import { FaGithub, FaLinkedin, FaTwitter } from 'react-icons/fa';
import { motion } from 'framer-motion';
import profilePhoto from '../../assets/profile-photo.jpg';
import CommandBar from '../CommandBar';

const roles = ['Full Stack Developer', 'Computer Science Student', 'AI Enthusiast', 'Problem Solver'];

function HeroSection() {
  const [roleIndex, setRoleIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    let timeout;

    if (!isDeleting && charIndex < currentRole.length) {
      timeout = setTimeout(() => setCharIndex(prev => prev + 1), 100);
    } else if (!isDeleting && charIndex === currentRole.length) {
      timeout = setTimeout(() => setIsDeleting(true), 2000);
    } else if (isDeleting && charIndex > 0) {
      timeout = setTimeout(() => setCharIndex(prev => prev - 1), 50);
    } else if (isDeleting && charIndex === 0) {
      setIsDeleting(false);
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, roleIndex]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section id="home" className="hero">
      <Helmet>
        <title>Sisay Temesgen | Full Stack Developer</title>
        <meta name="description" content="Sisay Temesgen - Full Stack Developer & Computer Science student at Bahir Dar University. Building modern web applications." />
      </Helmet>

      <div className="hero-blob hero-blob-1" />
      <div className="hero-blob hero-blob-2" />

      <div className="hero-inner hero-layout">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="hero-photo-wrapper"
        >
          <div className="photo-ring-outer" />
          <div className="photo-ring-inner" />
          <div className="hero-photo-frame">
            <img src={profilePhoto} alt="Sisay Temesgen" className="hero-photo-img" />
          </div>
        </motion.div>

        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-greeting"
          >
            <span style={{ display: 'inline-block', width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-color)' }} />
            Welcome to my portfolio
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hero-text"
          >
            <h1 className="hero-name">
              Hi, I'm{' '}
              <span className="hero-name-accent">Sisay Temesgen</span>
            </h1>
            <p className="hero-subtitle">
              <span className="typing-text">{roles[roleIndex].substring(0, charIndex)}</span>
              <span className="typing-cursor">|</span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="hero-intro"
          >
            I build modern, responsive, and performant web applications using cutting-edge technologies.
            Currently pursuing a B.Sc. in Computer Science at Bahir Dar University while crafting
            full-stack solutions and exploring software engineering best practices.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="hero-buttons"
          >
            <button onClick={() => scrollToSection('projects')} className="btn btn-secondary">
              View Projects <FiArrowRight />
            </button>
            <button onClick={() => scrollToSection('contact')} className="btn btn-primary">
              Contact Me <FiMail />
            </button>
            <a
              href="/cv-s.pdf"
              download
              className="btn btn-primary"
              style={{ background: 'transparent', border: '1.5px solid var(--accent-color)', color: 'var(--accent-color)' }}
              onMouseEnter={(e) => {
                e.target.style.background = 'rgba(34, 211, 238, 0.1)';
                e.target.style.transform = 'translateY(-3px)';
                e.target.style.boxShadow = '0 8px 25px var(--glow-accent)';
              }}
              onMouseLeave={(e) => {
                e.target.style.background = 'transparent';
                e.target.style.transform = 'translateY(0)';
                e.target.style.boxShadow = 'none';
              }}
            >
              Download CV <FiDownload />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="hero-social"
          >
            <a href="https://github.com/Sis3575-T" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="GitHub">
              <FaGithub size={18} />
            </a>
            <a href="https://linkedin.com/in/sisay-temesgen" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="LinkedIn">
              <FaLinkedin size={18} />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hero-social-link" aria-label="Twitter">
              <FaTwitter size={18} />
            </a>
            <a href="mailto:sisay3575@gmail.com" className="hero-social-link" aria-label="Email">
              <FiMail size={18} />
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.55 }}
            className="hero-command-area"
          >
            <CommandBar />
          </motion.div>
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="scroll-indicator"
        onClick={() => scrollToSection('about')}
      >
        <FiChevronDown size={20} />
      </motion.div>
    </section>
  );
}

export default HeroSection;
