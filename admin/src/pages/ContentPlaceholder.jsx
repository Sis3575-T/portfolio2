import React from 'react';
import { Helmet } from 'react-helmet-async';

function ContentPlaceholder({ title }) {
  const icons = {
    'Hero Management': 'fa-regular fa-user',
    'About Management': 'fa-regular fa-address-card',
    'Experience Management': 'fa-regular fa-briefcase',
    'Education Management': 'fa-regular fa-graduation-cap',
    'Services Management': 'fa-regular fa-gear',
  };

  return (
    <div className="placeholder-page">
      <i className={icons[title] || 'fa-regular fa-file'}></i>
      <h3>{title}</h3>
      <p>Content management interface will be displayed here.</p>
    </div>
  );
}

export default ContentPlaceholder;
