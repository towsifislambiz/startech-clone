import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container" style={{ padding: '60px 0', textAlign: 'center', minHeight: '70vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ fontSize: '80px', marginBottom: '20px' }}>🔍</div>
      <h1 style={{ fontSize: '48px', marginBottom: '20px' }}>404</h1>
      <h2 style={{ marginBottom: '20px' }}>Page Not Found</h2>
      <p style={{ color: 'var(--text-secondary)', marginBottom: '30px', fontSize: '18px' }}>
        The page you're looking for doesn't exist or has been moved.
      </p>
      <Link to="/" className="btn btn-primary" style={{ padding: '12px 30px', fontSize: '16px' }}>
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;
