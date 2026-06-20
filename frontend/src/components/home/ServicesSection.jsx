import React from 'react';
import { motion } from 'framer-motion';
import { FiMonitor, FiServer, FiLayers, FiSmartphone, FiLink, FiDatabase } from 'react-icons/fi';

const services = [
  {
    icon: <FiMonitor size={28} />,
    title: 'Frontend Development',
    description: 'Responsive, performant web applications built with React and modern frontend frameworks. Focused on accessibility, user experience, and clean component architecture.',
  },
  {
    icon: <FiServer size={28} />,
    title: 'Backend Development',
    description: 'Scalable server-side architecture with Node.js and Express. RESTful APIs built for performance, security, and reliability with proper error handling.',
  },
  {
    icon: <FiLayers size={28} />,
    title: 'Full Stack Development',
    description: 'End-to-end application development from database design to deployment. Complete ownership of technical delivery with modern development practices.',
  },
  {
    icon: <FiSmartphone size={28} />,
    title: 'Responsive Web Design',
    description: 'Mobile-first designs that work seamlessly across all devices and screen sizes. Clean layouts with consistent spacing and visual hierarchy.',
  },
  {
    icon: <FiLink size={28} />,
    title: 'API Development',
    description: 'Robust, well-documented RESTful APIs with comprehensive testing, rate limiting, and security best practices. Built for scale and maintainability.',
  },
  {
    icon: <FiDatabase size={28} />,
    title: 'Database Design',
    description: 'Optimized database schemas for MongoDB and PostgreSQL. Focus on data integrity, query performance, and scalable data architecture.',
  },
];

function ServicesSection() {
  return (
    <section id="services" className="skills">
      <div className="skills-container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-tag">Services</span>
          <h2 className="section-title">What I Offer</h2>
          <div className="section-line" />
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            Professional services tailored to build modern, scalable digital solutions.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {services.map((service, idx) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.08 }}
              className="about-card"
              style={{ padding: '2rem' }}
            >
              <div className="card-icon-wrap" style={{ marginBottom: '1.25rem' }}>
                {service.icon}
              </div>
              <h4 className="card-title" style={{ fontSize: '1.1rem', marginBottom: '0.75rem' }}>
                {service.title}
              </h4>
              <p className="card-content" style={{ fontSize: '0.9rem', lineHeight: 1.7 }}>
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
