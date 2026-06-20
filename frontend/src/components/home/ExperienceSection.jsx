import React from 'react';
import { motion } from 'framer-motion';
import { FiBookOpen, FiCode, FiAward, FiTarget, FiDownload, FiEye } from 'react-icons/fi';

const timeline = [
  {
    period: '2024 - Present',
    role: 'Building Full-Stack Applications',
    company: 'Portfolio & Client Projects',
    points: [
      'Developing complete web applications using MERN stack with responsive design and clean architecture',
      'Building a CMS platform with admin dashboard, authentication, and media management',
      'Integrating RESTful APIs, database operations, and cloud-based file storage',
    ],
    icon: <FiCode size={18} />,
  },
  {
    period: '2023 - Present',
    role: 'Computer Science Foundation',
    company: 'Bahir Dar University',
    points: [
      'Pursuing B.Sc. in Computer Science with focus on software engineering principles',
      'Coursework in data structures, algorithms, database systems, and web technologies',
      'Building practical projects that bridge academic theory with real-world application',
    ],
    icon: <FiBookOpen size={18} />,
  },
  {
    period: '2023',
    role: 'Learning Through Building',
    company: 'Self-Directed Development',
    points: [
      'Mastered React for frontend development and Node.js with Express for backend services',
      'Built projects integrating authentication flows, API design, and database operations',
      'Explored modern tooling including Tailwind CSS, Vite, and Docker for development workflows',
    ],
    icon: <FiTarget size={18} />,
  },
  {
    period: '2022',
    role: 'Starting the Journey',
    company: 'Web Development Fundamentals',
    points: [
      'Began with HTML, CSS, and JavaScript fundamentals through online resources',
      'Built foundational knowledge in responsive design, programming logic, and version control with Git',
      'Completed initial projects that established core web development skills',
    ],
    icon: <FiAward size={18} />,
  },
];

function ExperienceSection() {
  return (
    <section id="experience" className="resume">
      <div className="resume-container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-tag">Experience</span>
          <h2 className="section-title">My Journey</h2>
          <div className="section-line" />
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            A narrative of growth — from learning fundamentals to building full-stack applications.
          </p>
        </motion.div>

        <div className="resume-grid">
          <div className="w-full" style={{ maxWidth: '600px' }}>
            <div className="timeline">
              {timeline.map((item, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-80px' }}
                  transition={{ duration: 0.5, delay: idx * 0.1 }}
                  className="timeline-item"
                >
                  <div className="timeline-dot" />
                  <div className="timeline-content">
                    <h3 className="timeline-role">{item.role}</h3>
                    <div className="timeline-company">{item.company}</div>
                    <ul className="timeline-points">
                      {item.points.map((point, i) => (
                        <li key={i}>{point}</li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="resume-cta"
          style={{ gap: '1rem' }}
        >
          <a href="/cv-s.pdf" target="_blank" rel="noreferrer" className="btn-download">
            <FiEye size={16} /> View Resume
          </a>
          <a href="/cv-s.pdf" download className="btn-download">
            <FiDownload size={16} /> Download Resume
          </a>
        </motion.div>
      </div>
    </section>
  );
}

export default ExperienceSection;
