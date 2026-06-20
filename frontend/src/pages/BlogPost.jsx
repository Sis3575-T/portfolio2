import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { publicApi } from '../utils/api';

function BlogPost() {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const { data } = await publicApi.getBlogBySlug(slug);
        setBlog(data.data);
      } catch (err) {
        console.error('Failed to load blog post');
      } finally {
        setLoading(false);
      }
    };
    fetchBlog();
  }, [slug]);

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh] text-text-secondary">
      Loading...
    </div>
  );
  if (!blog) return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <p className="text-lg text-text-secondary">Post not found</p>
      <Link to="/" className="mt-4 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all">
        Back to Home
      </Link>
    </div>
  );

  return (
    <div className="min-h-screen pt-32 pb-24 px-6 bg-surface">
      <div className="max-w-3xl mx-auto">
        <Helmet>
          <title>{blog.title} — Sisay Temesgen</title>
          <meta name="description" content={blog.excerpt} />
        </Helmet>
        <Link to="/" className="inline-flex items-center gap-1 text-sm text-text-secondary hover:text-text-primary transition-colors mb-8">
          &larr; Back to Home
        </Link>
        <span className="text-xs font-semibold tracking-widest text-accent uppercase">
          {blog.category}
        </span>
        <h1 className="font-display text-3xl sm:text-4xl font-bold text-text-primary mt-3 tracking-tight">
          {blog.title}
        </h1>
        <div className="flex items-center gap-4 text-sm text-text-secondary mt-3">
          <span>{new Date(blog.publishedAt).toLocaleDateString()}</span>
          <span className="w-1 h-1 rounded-full bg-border" />
          <span>{blog.readingTime} min read</span>
        </div>
        <div className="mt-8 text-base text-text-secondary leading-relaxed">
          {blog.content}
        </div>
        {blog.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-8">
            {blog.tags.map(tag => (
              <span key={tag} className="px-2.5 py-1 rounded text-xs font-medium bg-accent/10 text-text-secondary border border-accent/20">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogPost;
