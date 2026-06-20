import { motion } from 'framer-motion';
import './Projects.css';

const projects = [
  {
    title: 'Ethiopian Tourist Destination',
    link: 'https://tourist-destination-2.onrender.com/',
  },
];

const inView = (delay = 0) => ({
  initial: { opacity: 0, y: 30 },
  whileInView: { opacity: 1, y: 0 },
  transition: { duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] },
  viewport: { once: true },
});

const Projects = () => (
  <section className="projects" id="projects">
    <div className="container">
      <motion.div {...inView()}>
        <p className="section-tag">My Work</p>
        <h2 className="section-title">Featured Projects</h2>

      </motion.div>

      <div className="projects-grid">
        {projects.map((p, i) => (
          <motion.a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            className="project-card"
            {...inView(0.1)}
          >
            <div className="project-card-inner">
              <span className="project-card-icon">🌐</span>
              <span className="project-card-title">{p.title}</span>
              <span className="project-card-cta">Visit Site ↗</span>
            </div>
          </motion.a>
        ))}
      </div>
    </div>
  </section>
);

export default Projects;
