require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const connectDB = require('./config/db');

const User = require('./models/User');
const Skill = require('./models/Skill');
const Project = require('./models/Project');
const Experience = require('./models/Experience');
const Education = require('./models/Education');
const Service = require('./models/Service');
const Testimonial = require('./models/Testimonial');
const Blog = require('./models/Blog');
const SEO = require('./models/SEO');
const Setting = require('./models/Setting');

const seed = async () => {
  try {
    await connectDB();
    console.log('Seeding database...');

    await Promise.all([
      User.deleteMany({}),
      Skill.deleteMany({}),
      Project.deleteMany({}),
      Experience.deleteMany({}),
      Education.deleteMany({}),
      Service.deleteMany({}),
      Testimonial.deleteMany({}),
      Blog.deleteMany({}),
      SEO.deleteMany({}),
      Setting.deleteMany({}),
    ]);

    const admin = await User.create({
      name: 'Admin',
      email: process.env.ADMIN_EMAIL || 'admin@portfolio.com',
      password: process.env.ADMIN_PASSWORD || 'Admin@123456',
      role: 'admin',
    });
    console.log('Admin created:', admin.email);

    const skills = await Skill.insertMany([
      { name: 'React', category: 'Frontend', icon: 'FaReact', proficiency: 95, order: 1 },
      { name: 'Next.js', category: 'Frontend', icon: 'SiNextdotjs', proficiency: 90, order: 2 },
      { name: 'TypeScript', category: 'Frontend', icon: 'SiTypescript', proficiency: 92, order: 3 },
      { name: 'Tailwind CSS', category: 'Frontend', icon: 'SiTailwindcss', proficiency: 90, order: 4 },
      { name: 'Node.js', category: 'Backend', icon: 'FaNodejs', proficiency: 93, order: 1 },
      { name: 'Express', category: 'Backend', icon: 'SiExpress', proficiency: 91, order: 2 },
      { name: 'Python', category: 'Backend', icon: 'FaPython', proficiency: 80, order: 3 },
      { name: 'GraphQL', category: 'Backend', icon: 'SiGraphql', proficiency: 78, order: 4 },
      { name: 'MongoDB', category: 'Database', icon: 'SiMongodb', proficiency: 88, order: 1 },
      { name: 'PostgreSQL', category: 'Database', icon: 'SiPostgresql', proficiency: 85, order: 2 },
      { name: 'Redis', category: 'Database', icon: 'SiRedis', proficiency: 75, order: 3 },
      { name: 'AWS', category: 'Cloud', icon: 'FaAws', proficiency: 85, order: 1 },
      { name: 'Docker', category: 'DevOps', icon: 'FaDocker', proficiency: 82, order: 1 },
      { name: 'Kubernetes', category: 'DevOps', icon: 'SiKubernetes', proficiency: 72, order: 2 },
      { name: 'GitHub Actions', category: 'DevOps', icon: 'SiGithubactions', proficiency: 80, order: 3 },
    ]);
    console.log(`${skills.length} skills created`);

    const projects = await Project.insertMany([
      {
        title: 'ShopFlow',
        description: 'Enterprise e-commerce platform with real-time inventory management, payment processing via Stripe, and an admin dashboard for managing products, orders, and customers. Built with microservices architecture.',
        technologies: ['React', 'Node.js', 'MongoDB', 'Stripe', 'Docker', 'AWS'],
        githubUrl: 'https://github.com/alexchen/shopflow',
        liveUrl: 'https://shopflow-demo.vercel.app',
        featured: true,
        order: 1,
        category: 'Full Stack',
      },
      {
        title: 'DataPulse',
        description: 'Real-time analytics dashboard with interactive D3.js visualizations, custom report builder, and data export capabilities. Handles millions of events per day.',
        technologies: ['React', 'TypeScript', 'D3.js', 'Node.js', 'PostgreSQL', 'Redis'],
        githubUrl: 'https://github.com/alexchen/datapulse',
        liveUrl: 'https://datapulse-demo.vercel.app',
        featured: true,
        order: 2,
        category: 'Frontend',
      },
      {
        title: 'CloudDeploy',
        description: 'One-click deployment platform with container orchestration via Kubernetes, CI/CD pipeline integration, and real-time deployment logs.',
        technologies: ['Docker', 'Kubernetes', 'AWS', 'GitHub Actions', 'Node.js', 'React'],
        githubUrl: 'https://github.com/alexchen/clouddeploy',
        liveUrl: 'https://clouddeploy-demo.vercel.app',
        featured: true,
        order: 3,
        category: 'DevOps',
      },
      {
        title: 'TaskPro',
        description: 'Project management platform with sprint planning, time tracking, team collaboration, and Kanban boards. Supports real-time updates via WebSockets.',
        technologies: ['React', 'Express', 'PostgreSQL', 'Socket.io', 'TypeScript', 'Tailwind'],
        githubUrl: 'https://github.com/alexchen/taskpro',
        liveUrl: 'https://taskpro-demo.vercel.app',
        featured: false,
        order: 4,
        category: 'Full Stack',
      },
      {
        title: 'HealthTrack',
        description: 'Mobile-first health tracking application with workout plans, nutrition logging, and progress visualization. Cross-platform React Native app.',
        technologies: ['React Native', 'Firebase', 'Node.js', 'MongoDB', 'Expo'],
        githubUrl: 'https://github.com/alexchen/healthtrack',
        liveUrl: '',
        featured: false,
        order: 5,
        category: 'Mobile',
      },
    ]);
    console.log(`${projects.length} projects created`);

    const experiences = await Experience.insertMany([
      {
        company: 'TechCorp Inc.',
        position: 'Senior Full Stack Developer',
        startDate: new Date('2022-01-01'),
        current: true,
        description: 'Leading the development of enterprise SaaS platform serving 50k+ users.',
        responsibilities: [
          'Architected microservices backend serving 50k+ daily active users',
          'Led migration from monolith to microservices, reducing deployment time by 80%',
          'Mentored team of 5 junior developers through code reviews and pair programming',
          'Implemented CI/CD pipeline reducing release cycle from 2 weeks to 2 days',
        ],
        achievements: [
          'Reduced infrastructure costs by 40% through AWS optimization',
          'Improved page load time by 60% with performance optimization',
        ],
        location: 'San Francisco, CA',
        order: 1,
      },
      {
        company: 'StartupXYZ',
        position: 'Full Stack Developer',
        startDate: new Date('2019-03-01'),
        endDate: new Date('2021-12-31'),
        description: 'Built core product features for B2B analytics platform from MVP to Series A.',
        responsibilities: [
          'Developed real-time analytics dashboard used by 200+ enterprise clients',
          'Built RESTful and GraphQL APIs serving 1M+ requests daily',
          'Designed database schema and optimized queries for sub-50ms response times',
        ],
        achievements: [
          'Scaled platform from 0 to 200+ enterprise clients',
          'Patent pending for real-time data aggregation algorithm',
        ],
        location: 'Austin, TX',
        order: 2,
      },
      {
        company: 'WebAgency',
        position: 'Frontend Developer',
        startDate: new Date('2017-06-01'),
        endDate: new Date('2019-02-28'),
        description: 'Built responsive web applications for diverse clients across industries.',
        responsibilities: [
          'Developed 15+ client websites using React, Angular, and Vue.js',
          'Created reusable component library used across all agency projects',
          'Implemented responsive designs with 99+ Lighthouse performance scores',
        ],
        achievements: [
          'Won Agency Developer of the Year 2018',
          'Component library adopted by entire 20-person engineering team',
        ],
        location: 'New York, NY',
        order: 3,
      },
    ]);
    console.log(`${experiences.length} experiences created`);

    const education = await Education.insertMany([
      {
        institution: 'Stanford University',
        degree: 'Master of Science',
        field: 'Computer Science',
        startDate: new Date('2016-09-01'),
        endDate: new Date('2018-06-01'),
        gpa: '3.92',
        achievements: ['Dean\'s List', 'Published research on distributed systems'],
      },
      {
        institution: 'UC Berkeley',
        degree: 'Bachelor of Science',
        field: 'Software Engineering',
        startDate: new Date('2012-09-01'),
        endDate: new Date('2016-06-01'),
        gpa: '3.85',
        achievements: ['Summa Cum Laude', 'ACM Programming Contest Finalist'],
      },
    ]);
    console.log(`${education.length} education records created`);

    const services = await Service.insertMany([
      { title: 'Web Development', description: 'Responsive, performant web applications built with React, Next.js, and modern frontend frameworks. Focused on accessibility and user experience.', icon: 'FaGlobe', features: ['Single Page Applications', 'Progressive Web Apps', 'Responsive Design', 'Performance Optimization'], order: 1 },
      { title: 'Backend Development', description: 'Scalable server-side architecture with Node.js, Express, and Python. RESTful and GraphQL APIs built for performance and reliability.', icon: 'FaServer', features: ['RESTful APIs', 'GraphQL APIs', 'Microservices', 'Authentication & Authorization'], order: 2 },
      { title: 'Full Stack Development', description: 'End-to-end application development from database design to deployment. Complete ownership of the technical delivery.', icon: 'FaLayerGroup', features: ['End-to-End Development', 'Database Design', 'Cloud Deployment', 'CI/CD Pipeline Setup'], order: 3 },
      { title: 'API Development', description: 'Robust, well-documented APIs with comprehensive testing, rate limiting, and monitoring. Built for scale and security.', icon: 'FaPlug', features: ['RESTful Design', 'GraphQL Implementation', 'API Documentation', 'API Testing'], order: 4 },
      { title: 'Database Design', description: 'Optimized database schemas for MongoDB, PostgreSQL, and Redis. Focus on data integrity, query performance, and scalability.', icon: 'FaDatabase', features: ['Schema Design', 'Query Optimization', 'Data Migration', 'Backup & Recovery'], order: 5 },
    ]);
    console.log(`${services.length} services created`);

    const testimonials = await Testimonial.insertMany([
      { name: 'Sarah Kim', role: 'CTO', company: 'TechCorp Inc.', content: 'Alex delivered a complex enterprise platform ahead of schedule. The code quality and architecture were exceptional. He is the kind of engineer every team needs.', rating: 5, featured: true, order: 1 },
      { name: 'Marcus Rivera', role: 'Product Lead', company: 'StartupXYZ', content: 'Outstanding full stack developer with a keen eye for design and user experience. Alex transformed our entire platform with modern architecture that scaled effortlessly.', rating: 5, featured: true, order: 2 },
      { name: 'Jessica Lin', role: 'CEO', company: 'WebAgency', content: 'Professional, reliable, and technically brilliant. Our project success was driven by Alex expertise in cloud architecture and modern JavaScript frameworks.', rating: 5, featured: true, order: 3 },
      { name: 'David Park', role: 'Engineering Manager', company: 'FinTech Solutions', content: 'Alex is a rare find — equally strong in frontend and backend. He architected our entire payment platform and it has been running flawlessly for over a year.', rating: 5, featured: false, order: 4 },
    ]);
    console.log(`${testimonials.length} testimonials created`);

    const blogs = await Blog.insertMany([
      {
        title: 'Building Scalable Microservices with Node.js and Docker',
        slug: 'building-scalable-microservices',
        excerpt: 'Learn how to design, build, and deploy scalable microservices using Node.js, Docker, and Kubernetes. This guide covers architecture patterns, testing strategies, and production deployment.',
        content: 'Microservices architecture has become the standard for building complex web applications... [full article content]',
        category: 'Architecture',
        tags: ['Node.js', 'Docker', 'Kubernetes', 'Microservices'],
        readingTime: 8,
        featured: true,
      },
      {
        title: 'React 19: What\'s New and How to Upgrade Your Projects',
        slug: 'react-19-whats-new',
        excerpt: 'React 19 introduces exciting new features including server components, improved hooks, and better performance. Here is everything you need to know to upgrade.',
        content: 'React 19 is here and it brings significant improvements to how we build web applications... [full article content]',
        category: 'Frontend',
        tags: ['React', 'JavaScript', 'Frontend', 'Web Development'],
        readingTime: 6,
        featured: true,
      },
      {
        title: 'Docker Best Practices for Production Deployments',
        slug: 'docker-best-practices-production',
        excerpt: 'Essential Docker best practices for production environments. From multi-stage builds to security scanning, ensure your containers are production-ready.',
        content: 'Running Docker in production requires careful consideration of security, performance, and reliability... [full article content]',
        category: 'DevOps',
        tags: ['Docker', 'DevOps', 'Production', 'Containers'],
        readingTime: 10,
        featured: true,
      },
      {
        title: 'TypeScript Design Patterns Every Developer Should Know',
        slug: 'typescript-design-patterns',
        excerpt: 'Master essential design patterns in TypeScript. From singleton to observer, learn how to write cleaner, more maintainable code.',
        content: 'Design patterns are proven solutions to common software design problems... [full article content]',
        category: 'TypeScript',
        tags: ['TypeScript', 'Design Patterns', 'JavaScript', 'Software Engineering'],
        readingTime: 12,
        featured: false,
      },
    ]);
    console.log(`${blogs.length} blogs created`);

    const seo = await SEO.insertMany([
      { page: 'home', metaTitle: 'Alex Chen — Full Stack Developer', metaDescription: 'Senior full stack developer specializing in React, Node.js, and cloud architecture. 8+ years of experience building enterprise web applications.', metaKeywords: ['full stack developer', 'react developer', 'node.js', 'web development'], canonicalUrl: 'https://alexchen.dev' },
      { page: 'projects', metaTitle: 'Projects — Alex Chen', metaDescription: 'Explore my portfolio of enterprise web applications, from e-commerce platforms to real-time analytics dashboards.', metaKeywords: ['portfolio', 'web projects', 'react projects', 'full stack projects'] },
      { page: 'blog', metaTitle: 'Blog — Alex Chen', metaDescription: 'Articles about web development, architecture, TypeScript, React, and DevOps best practices.', metaKeywords: ['web development blog', 'react blog', 'typescript tutorial', 'devops'] },
    ]);
    console.log(`${seo.length} SEO records created`);

    const settings = await Setting.insertMany([
      { key: 'site_name', value: 'Alex Chen', description: 'Site name' },
      { key: 'site_description', value: 'Full Stack Developer Portfolio', description: 'Site tagline/description' },
      { key: 'contact_email', value: 'hello@alexchen.dev', description: 'Contact form recipient email' },
      { key: 'social_github', value: 'https://github.com/alexchen', description: 'GitHub profile URL' },
      { key: 'social_linkedin', value: 'https://linkedin.com/in/alexchen', description: 'LinkedIn profile URL' },
      { key: 'social_twitter', value: 'https://twitter.com/alexchen', description: 'Twitter/X profile URL' },
    ]);
    console.log(`${settings.length} settings created`);

    console.log('\n✓ Database seeded successfully!');
    console.log(`  Admin: ${process.env.ADMIN_EMAIL || 'admin@portfolio.com'} / ${process.env.ADMIN_PASSWORD || 'Admin@123456'}`);
    process.exit(0);
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seed();
