import React from 'react';
import { motion } from 'framer-motion';
import { FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaJs, FaPython, FaGitAlt, FaDocker, FaFigma, FaNpm } from 'react-icons/fa';
import { SiTailwindcss, SiMongodb, SiPostgresql, SiExpress, SiTypescript, SiVite, SiPostman } from 'react-icons/si';

const skillGroups = [
  {
    label: 'Frontend',
    skills: [
      { name: 'React', icon: <FaReact />, color: '#61DAFB' },
      { name: 'TypeScript', icon: <SiTypescript />, color: '#3178C6' },
      { name: 'JavaScript', icon: <FaJs />, color: '#F7DF1E' },
      { name: 'HTML5', icon: <FaHtml5 />, color: '#E34F26' },
      { name: 'CSS3', icon: <FaCss3Alt />, color: '#1572B6' },
      { name: 'Tailwind CSS', icon: <SiTailwindcss />, color: '#06B6D4' },
    ],
  },
  {
    label: 'Backend',
    skills: [
      { name: 'Node.js', icon: <FaNodeJs />, color: '#339933' },
      { name: 'Express', icon: <SiExpress />, color: '#FFFFFF' },
      { name: 'Python', icon: <FaPython />, color: '#3776AB' },
    ],
  },
  {
    label: 'Database',
    skills: [
      { name: 'MongoDB', icon: <SiMongodb />, color: '#47A248' },
      { name: 'PostgreSQL', icon: <SiPostgresql />, color: '#4169E1' },
    ],
  },
  {
    label: 'Tools & Technologies',
    skills: [
      { name: 'Git', icon: <FaGitAlt />, color: '#F05032' },
      { name: 'Docker', icon: <FaDocker />, color: '#2496ED' },
      { name: 'Vite', icon: <SiVite />, color: '#646CFF' },
      { name: 'Postman', icon: <SiPostman />, color: '#FF6C37' },
      { name: 'Figma', icon: <FaFigma />, color: '#F24E1E' },
      { name: 'npm', icon: <FaNpm />, color: '#CB3837' },
    ],
  },
];

function SkillsSection() {
  return (
    <section id="skills" className="skills">
      <div className="skills-container">
        <motion.div
          initial={{ opacity: 0, y: 36 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <span className="section-tag">Skills</span>
          <h2 className="section-title">Technical Skills</h2>
          <div className="section-line" />
          <p className="section-subtitle" style={{ margin: '1rem auto 0' }}>
            Technologies and tools I use to build modern, scalable applications.
          </p>
        </motion.div>

        <div className="skill-groups">
          {skillGroups.map((group, groupIdx) => (
            <motion.div
              key={group.label}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.5, delay: groupIdx * 0.1 }}
            >
              <div className="skill-group-label">{group.label}</div>
              <div className="skill-cards">
                {group.skills.map((skill) => (
                  <div key={skill.name} className="skill-card" title={skill.name}>
                    <div className="skill-svg" style={{ color: skill.color }}>
                      {skill.icon}
                    </div>
                    <span className="skill-card-name">{skill.name}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default SkillsSection;
