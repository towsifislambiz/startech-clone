import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';

const Login = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const { error: showError } = useNotification();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password);
      if (success) {
        navigate('/dashboard');
      } else {
        showError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      showError('An error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 0', display: 'flex', justifyContent: 'center', minHeight: '70vh', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '8px' }}>
          <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Login</h1>

          <form onSubmit={handleSubmit}>
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg)' }}
            />

            <input
              type="password"
              name="password"
              placeholder="Password"
              value={formData.password}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg)' }}
            />

            <label style={{ display: 'flex', alignItems: 'center', marginBottom: '20px', cursor: 'pointer' }}>
              <input type="checkbox" style={{ marginRight: '8px' }} />
              Remember me
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            >
              {loading ? 'Logging in...' : 'Login'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '10px' }}>
              Don't have an account? <Link to="/register" style={{ color: 'var(--accent-red)' }}>Sign up</Link>
            </p>
            <Link to="/" style={{ color: 'var(--text-secondary)', fontSize: '14px' }}>Forgot password?</Link>
          </div>

          {/* Demo Credentials */}
          <div style={{ marginTop: '30px', padding: '15px', backgroundColor: 'rgba(213, 30, 11, 0.1)', borderRadius: '6px', fontSize: '12px' }}>
            <p style={{ marginBottom: '8px', fontWeight: 'bold' }}>Demo Credentials:</p>
            <p>Email: demo@startech.test</p>
            <p>Password: password</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
