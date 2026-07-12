import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {
  const navigate = useNavigate();
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    password_confirm: '',
    phone: ''
  });
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await register(formData);
      if (success) {
        navigate('/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 0', display: 'flex', justifyContent: 'center', minHeight: '70vh', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '400px' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '8px' }}>
          <h1 style={{ marginBottom: '30px', textAlign: 'center' }}>Create Account</h1>

          <form onSubmit={handleSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '15px' }}>
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg)' }}
              />
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                style={{ padding: '12px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg)' }}
              />
            </div>

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
              type="tel"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
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

            <input
              type="password"
              name="password_confirm"
              placeholder="Confirm Password"
              value={formData.password_confirm}
              onChange={handleInputChange}
              required
              style={{ width: '100%', padding: '12px', marginBottom: '15px', border: '1px solid var(--border-color)', borderRadius: '6px', backgroundColor: 'var(--bg)' }}
            />

            <label style={{ display: 'flex', alignItems: 'flex-start', marginBottom: '20px', cursor: 'pointer', fontSize: '13px' }}>
              <input type="checkbox" required style={{ marginRight: '8px', marginTop: '2px' }} />
              I agree to the Terms & Conditions and Privacy Policy
            </label>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary"
              style={{ width: '100%', padding: '12px', fontSize: '16px' }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </button>
          </form>

          <div style={{ marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary)' }}>
              Already have an account? <Link to="/login" style={{ color: 'var(--accent-red)' }}>Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
