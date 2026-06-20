import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] px-6">
      <Helmet>
        <title>404 — Page Not Found</title>
      </Helmet>
      <h1 className="font-display text-7xl font-bold text-text-primary tracking-tight">404</h1>
      <p className="text-lg text-text-secondary mt-2">Page not found</p>
      <Link to="/" className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-accent text-white text-sm font-medium hover:bg-accent-hover transition-all hover:-translate-y-0.5">
        Back to Home
      </Link>
    </div>
  );
}

export default NotFound;
