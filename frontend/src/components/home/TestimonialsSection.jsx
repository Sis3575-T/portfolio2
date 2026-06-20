import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

const testimonials = [
  {
    name: 'Sarah Kim',
    role: 'CTO, TechCorp Inc.',
    text: 'Sisay delivered a complex enterprise platform with exceptional code quality and architecture. His understanding of full-stack development and attention to detail made him an invaluable asset to the team.',
    rating: 5,
  },
  {
    name: 'Marcus Rivera',
    role: 'Product Lead, StartupXYZ',
    text: 'Outstanding full stack developer with a keen eye for design and user experience. Sisay transformed our entire platform with modern, scalable architecture that exceeded our expectations.',
    rating: 5,
  },
  {
    name: 'Jessica Lin',
    role: 'CEO, WebAgency',
    text: 'Professional, reliable, and technically brilliant. The project success was driven by Sisay\'s expertise in modern JavaScript frameworks and cloud architecture. Highly recommended for any development role.',
    rating: 5,
  },
];

function TestimonialsSection() {
  return (
    <section id="testimonials" className="about">
      <div className="about-container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-tag">Testimonials</span>
          <h2 className="section-title">Client Feedback</h2>
          <div className="section-line" />
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            What clients and colleagues say about working with me.
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
          gap: '1.5rem',
          marginTop: '3rem',
        }}>
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
              className="about-card"
              style={{ padding: '2rem' }}
            >
              <div style={{ color: 'var(--primary-color)', marginBottom: '0.75rem', opacity: 0.3 }}>
                <FaQuoteLeft size={24} />
              </div>
              <div style={{ display: 'flex', gap: '2px', marginBottom: '1rem' }}>
                {Array.from({ length: t.rating }).map((_, i) => (
                  <FaStar key={i} size={14} style={{ color: '#f59e0b' }} />
                ))}
              </div>
              <p style={{
                color: 'var(--text-light)',
                fontSize: '0.9rem',
                lineHeight: 1.75,
                marginBottom: '1.5rem',
                fontStyle: 'italic',
              }}>
                &ldquo;{t.text}&rdquo;
              </p>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.75rem',
                paddingTop: '1rem',
                borderTop: '1px solid var(--glass-border)',
              }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--primary-color), var(--accent-color))',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#fff',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  flexShrink: 0,
                }}>
                  {t.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <div style={{ color: 'var(--text-white)', fontSize: '0.9rem', fontWeight: 600 }}>
                    {t.name}
                  </div>
                  <div style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
                    {t.role}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
