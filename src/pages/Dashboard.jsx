import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Dashboard = () => {
  const { isAuthenticated, user } = useAuth();

  if (!isAuthenticated) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Dashboard</h1>
        <p style={{ marginBottom: '30px' }}>Please login to view your dashboard</p>
        <Link to="/login" className="btn btn-primary">Login</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ marginBottom: '30px' }}>Welcome, {user?.first_name || 'User'}!</h1>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginBottom: '40px' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>📦</div>
          <h3 style={{ marginBottom: '10px' }}>My Orders</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>3 Orders</p>
          <Link to="/dashboard?tab=orders" className="btn btn-primary" style={{ fontSize: '14px' }}>View Orders</Link>
        </div>

        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>❤️</div>
          <h3 style={{ marginBottom: '10px' }}>Wishlist</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>12 Items</p>
          <Link to="/dashboard?tab=wishlist" className="btn btn-primary" style={{ fontSize: '14px' }}>View Wishlist</Link>
        </div>

        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>⭐</div>
          <h3 style={{ marginBottom: '10px' }}>My Reviews</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>5 Reviews</p>
          <Link to="/dashboard?tab=reviews" className="btn btn-primary" style={{ fontSize: '14px' }}>View Reviews</Link>
        </div>

        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', textAlign: 'center' }}>
          <div style={{ fontSize: '40px', marginBottom: '10px' }}>👤</div>
          <h3 style={{ marginBottom: '10px' }}>Profile</h3>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '15px' }}>{user?.email}</p>
          <Link to="/dashboard?tab=profile" className="btn btn-primary" style={{ fontSize: '14px' }}>Edit Profile</Link>
        </div>
      </div>

      <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px' }}>
        <h2 style={{ marginBottom: '20px' }}>Recent Orders</h2>
        <div style={{ color: 'var(--text-secondary)' }}>
          <p>Loading your recent orders...</p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
