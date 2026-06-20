import React from 'react';
import ScrollReveal from './ScrollReveal';

const education = [
  {
    institution: 'Addis Ababa University',
    degree: 'Master of Science in Computer Science',
    field: 'Specialization: Machine Learning & AI',
    period: '2020 — 2022',
    gpa: 'GPA: 3.89 / 4.0',
    achievements: [
      'Thesis on deep learning for remote sensing image analysis',
      'Published 2 papers in international conferences',
      'Dean\'s List with distinction',
    ],
  },
  {
    institution: 'Addis Ababa University',
    degree: 'Bachelor of Science in Software Engineering',
    field: 'Minor in Mathematics',
    period: '2015 — 2019',
    gpa: 'GPA: 3.85 / 4.0',
    achievements: [
      'Summa Cum Laude graduate',
      'Best Capstone Project Award',
      'ACM ICPC East Africa Regional Finalist',
      'Undergraduate research grant recipient',
    ],
  },
];

function EducationSection() {
  return (
    <section id="education" className="section section-primary">
      <div className="container">
        <ScrollReveal>
          <div className="section-header">
            <span className="section-label">Education</span>
            <h2 className="section-title">Academic Background</h2>
            <p className="section-subtitle">
              Formal education and research training in computer science and engineering.
            </p>
          </div>
        </ScrollReveal>
        <div className="edu-grid">
          {education.map((edu, idx) => (
            <ScrollReveal key={idx} className={`fade-in-up delay-${idx + 1}`}>
              <div className="edu-card">
                <h4>{edu.institution}</h4>
                <p className="edu-degree">{edu.degree}</p>
                <p className="edu-field">{edu.field}</p>
                <p className="edu-date">{edu.period}</p>
                <span className="edu-gpa">{edu.gpa}</span>
                <ul className="edu-list">
                  {edu.achievements.map((a, i) => <li key={i}>{a}</li>)}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

export default EducationSection;
