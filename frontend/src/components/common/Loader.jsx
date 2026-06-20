import React from 'react';
import { Helmet } from 'react-helmet-async';

function Loader() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', padding: '60px 0' }}>
      <div style={{
        width: 32, height: 32, border: '3px solid var(--gray-200)',
        borderTopColor: 'var(--blue)', borderRadius: '50%',
        animation: 'spin 0.8s linear infinite'
      }} />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export { Helmet, Loader };
