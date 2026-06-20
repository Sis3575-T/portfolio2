import React from 'react';

const blogs = [
  {
    title: 'Building Scalable Microservices with Node.js and Docker',
    excerpt: 'Learn how to design, build, and deploy scalable microservices using Node.js, Docker, and Kubernetes. Covers architecture patterns and production deployment.',
    category: 'Architecture',
    date: 'March 15, 2026',
    readTime: '8 min read',
  },
  {
    title: 'React 19: What\'s New and How to Upgrade Your Projects',
    excerpt: 'React 19 introduces server components, improved hooks, and better performance. Everything you need to know to upgrade your projects.',
    category: 'Frontend',
    date: 'February 28, 2026',
    readTime: '6 min read',
  },
  {
    title: 'Docker Best Practices for Production Deployments',
    excerpt: 'Essential Docker best practices for production environments. From multi-stage builds to security scanning.',
    category: 'DevOps',
    date: 'January 20, 2026',
    readTime: '10 min read',
  },
];

function BlogSection() {
  return (
    <section id="blog" className="section section-alt">
      <div className="container">
        <div className="section-label">Blog</div>
        <h2 className="section-title">Latest Articles</h2>
        <p className="section-subtitle">Thoughts on software engineering, architecture, and best practices.</p>
        <div className="blog-grid" style={{ marginTop: 32 }}>
          {blogs.map((post, idx) => (
            <div key={idx} className="blog-card">
              <div className="blog-cover">
                <i className="fa-regular fa-file-lines"></i>
              </div>
              <div className="blog-body">
                <span className="blog-category">{post.category}</span>
                <h3 className="blog-title">{post.title}</h3>
                <p className="blog-excerpt">{post.excerpt}</p>
                <div className="blog-meta">
                  <span><i className="fa-regular fa-calendar"></i> {post.date}</span>
                  <span><i className="fa-regular fa-clock"></i> {post.readTime}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default BlogSection;
