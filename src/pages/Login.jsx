import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import { FiLock, FiMail, FiZap, FiShield, FiBriefcase, FiUser, FiEye, FiEyeOff, FiGithub } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  const [formData, setFormData] = useState({ email: 'customer@startech.test', password: 'password' });
  const [selectedRole, setSelectedRole] = useState('Customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const fromLocation = location.state?.from?.pathname;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDemoSelect = (roleType, email) => {
    setSelectedRole(roleType);
    setFormData({ email, password: 'password' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const success = await login(formData.email, formData.password, selectedRole);

      if (success) {
        showSuccess(`Welcome back! Logged in as ${selectedRole}`);
        if (fromLocation) {
          navigate(fromLocation, { replace: true });
        } else if (selectedRole === 'Admin') {
          navigate('/admin-dashboard', { replace: true });
        } else if (selectedRole === 'Seller') {
          navigate('/seller-dashboard', { replace: true });
        } else {
          navigate('/dashboard', { replace: true });
        }
      } else {
        showError('Login failed. Please verify credentials.');
      }
    } catch (err) {
      showError('An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        padding: '60px 20px',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '80vh',
        backgroundColor: 'var(--bg, #081621)',
        backgroundImage: 'radial-gradient(circle at 50% 20%, rgba(213, 30, 11, 0.08) 0%, transparent 60%)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div style={{ width: '100%', maxWidth: '460px' }}>
        <div
          style={{
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
            borderRadius: '20px',
            padding: '40px 32px',
            boxShadow: '0 24px 48px rgba(0, 0, 0, 0.35)',
            position: 'relative',
            overflow: 'hidden'
          }}
        >
          {/* Top Red Gradient Line */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'linear-gradient(90deg, #D51E0B, #ff4b3e)'
            }}
          />

          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '30px' }}>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '56px',
                height: '56px',
                borderRadius: '16px',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                marginBottom: '16px',
                boxShadow: '0 8px 20px rgba(213, 30, 11, 0.35)'
              }}
            >
              <FiZap size={30} />
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', marginBottom: '8px', letterSpacing: '-0.5px' }}>
              Welcome to StarTech
            </h1>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
              Sign in to manage orders, wishlist, and user account
            </p>
          </div>

          {/* Account Role Selector Pills */}
          <div style={{ marginBottom: '24px' }}>
            <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '10px' }}>
              Select Account Perspective:
            </label>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
              <button
                type="button"
                onClick={() => handleDemoSelect('Customer', 'customer@startech.test')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: selectedRole === 'Customer' ? '2px solid #D51E0B' : '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                  backgroundColor: selectedRole === 'Customer' ? 'rgba(213, 30, 11, 0.12)' : 'var(--bg, #081621)',
                  color: selectedRole === 'Customer' ? '#D51E0B' : 'var(--text-secondary, #94a3b8)',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.18s ease'
                }}
              >
                <FiUser size={16} /> Customer
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('Seller', 'seller@startech.test')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: selectedRole === 'Seller' ? '2px solid #3b82f6' : '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                  backgroundColor: selectedRole === 'Seller' ? 'rgba(59, 130, 246, 0.12)' : 'var(--bg, #081621)',
                  color: selectedRole === 'Seller' ? '#3b82f6' : 'var(--text-secondary, #94a3b8)',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.18s ease'
                }}
              >
                <FiBriefcase size={16} /> Seller
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('Admin', 'admin@startech.test')}
                style={{
                  padding: '10px 8px',
                  borderRadius: '10px',
                  border: selectedRole === 'Admin' ? '2px solid #ef4444' : '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                  backgroundColor: selectedRole === 'Admin' ? 'rgba(239, 68, 68, 0.12)' : 'var(--bg, #081621)',
                  color: selectedRole === 'Admin' ? '#ef4444' : 'var(--text-secondary, #94a3b8)',
                  fontWeight: '700',
                  fontSize: '12px',
                  cursor: 'pointer',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  gap: '4px',
                  transition: 'all 0.18s ease'
                }}
              >
                <FiShield size={16} /> Admin
              </button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {/* Email Input */}
            <div style={{ marginBottom: '18px' }}>
              <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)', marginBottom: '6px' }}>
                Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <FiMail style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted, #64748b)' }} size={17} />
                <input
                  type="email"
                  name="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 14px 12px 42px',
                    border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg, #081621)',
                    color: 'var(--text-primary, #ffffff)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
              </div>
            </div>

            {/* Password Input with Visibility Toggle */}
            <div style={{ marginBottom: '22px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                <label style={{ fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)' }}>
                  Password
                </label>
                <Link to="/forgot-password" style={{ color: '#D51E0B', fontSize: '12px', fontWeight: '600', textDecoration: 'none' }}>
                  Forgot Password?
                </Link>
              </div>

              <div style={{ position: 'relative' }}>
                <FiLock style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted, #64748b)' }} size={17} />
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Enter password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 42px 12px 42px',
                    border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
                    borderRadius: '10px',
                    backgroundColor: 'var(--bg, #081621)',
                    color: 'var(--text-primary, #ffffff)',
                    fontSize: '14px',
                    outline: 'none'
                  }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '12px',
                    top: '12px',
                    background: 'none',
                    border: 'none',
                    color: 'var(--text-muted, #64748b)',
                    cursor: 'pointer',
                    padding: '4px'
                  }}
                >
                  {showPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: '14px',
                fontSize: '15px',
                fontWeight: '800',
                borderRadius: '10px',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                border: 'none',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(213, 30, 11, 0.35)',
                transition: 'background-color 0.2s ease, transform 0.15s ease'
              }}
            >
              {loading ? 'Authenticating...' : `Sign In as ${selectedRole}`}
            </button>
          </form>

          {/* Social Authentication */}
          <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))' }}>
            <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '12px', color: 'var(--text-muted, #64748b)', fontWeight: '600' }}>
              OR CONTINUE WITH
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <button
                type="button"
                onClick={() => handleDemoSelect('Customer', 'customer@startech.test')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                  backgroundColor: 'var(--bg, #081621)',
                  color: 'var(--text-primary, #ffffff)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <FcGoogle size={18} /> Google
              </button>

              <button
                type="button"
                onClick={() => handleDemoSelect('Customer', 'customer@startech.test')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                  backgroundColor: 'var(--bg, #081621)',
                  color: 'var(--text-primary, #ffffff)',
                  fontSize: '13px',
                  fontWeight: '600',
                  cursor: 'pointer'
                }}
              >
                <FiGithub size={18} /> GitHub
              </button>
            </div>
          </div>

          <div style={{ marginTop: '24px', textAlign: 'center' }}>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
              Don't have an account?{' '}
              <Link to="/register" style={{ color: '#D51E0B', fontWeight: '700', textDecoration: 'none' }}>
                Create Account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
