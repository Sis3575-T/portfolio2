import React, { useState, useEffect } from 'react';
import { FaGithub, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp } from 'react-icons/fa';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Contact', href: '#contact' },
];

function Footer() {
  const [showScroll, setShowScroll] = useState(false);
  const year = new Date().getFullYear();

  useEffect(() => {
    const onScroll = () => setShowScroll(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <>
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-top">
            <div className="footer-brand">
              <span className="footer-logo">S</span>
              <div>
                <p className="footer-name">Sisay Temesgen</p>
                <p className="footer-role">Full Stack Developer & AI Enthusiast</p>
              </div>
            </div>
            <nav className="footer-nav">
              {navLinks.map(link => (
                <a key={link.href} href={link.href}>{link.label}</a>
              ))}
            </nav>
          </div>

          <div className="footer-divider" />

          <div className="footer-bottom">
            <div className="footer-social">
              <a href="https://github.com/Sis3575-T" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="GitHub">
                <FaGithub size={18} />
              </a>
              <a href="https://linkedin.com/in/sisay-temesgen" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="LinkedIn">
                <FaLinkedin size={18} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="footer-social-link" aria-label="Twitter">
                <FaTwitter size={18} />
              </a>
              <a href="mailto:sisay3575@gmail.com" className="footer-social-link" aria-label="Email">
                <FaEnvelope size={18} />
              </a>
            </div>
            <p className="footer-copyright">
              &copy; {year} Sisay Temesgen. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {showScroll && (
        <button
          onClick={scrollToTop}
          className="scroll-top-btn"
          aria-label="Scroll to top"
        >
          <FaArrowUp size={18} />
        </button>
      )}
    </>
  );
}

export default Footer;
