import React from 'react';
import { FaFileDownload, FaEye } from 'react-icons/fa';
import ScrollReveal from './ScrollReveal';

function ResumeSection() {
  return (
    <section id="resume" className="section section-primary">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">Resume</span>
            <h2 className="section-title">Curriculum Vitae</h2>
            <p className="section-subtitle">
              Download my complete CV or view it online.
            </p>
          </div>
        </ScrollReveal>
        <ScrollReveal className="fade-in-up delay-1">
          <div className="resume-card">
            <div className="resume-icon">
              <FaFileDownload />
            </div>
            <h3>Download My Resume</h3>
            <p>
              Detailed curriculum vitae including research publications, work experience,
              education, skills, and professional achievements.
            </p>
            <div className="resume-btns">
              <a href="/cv-s.pdf" download className="btn btn-primary btn-lg">
                <FaFileDownload /> Download Resume
              </a>
              <a href="/cv-s.pdf" target="_blank" rel="noreferrer" className="btn btn-outline btn-lg">
                <FaEye /> View Resume
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}

export default ResumeSection;
