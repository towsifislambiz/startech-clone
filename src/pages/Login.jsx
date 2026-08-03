import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import AuthLoadingOverlay from '../components/Auth/AuthLoadingOverlay';
import { FiLock, FiMail, FiZap, FiShield, FiBriefcase, FiUser, FiEye, FiEyeOff, FiGithub, FiSend, FiAlertCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { login, loginWithGoogle, resendVerificationEmail } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  const [formData, setFormData] = useState({ email: '', password: '' });
  const [selectedRole, setSelectedRole] = useState('Customer');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showLoginOverlay, setShowLoginOverlay] = useState(false);
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);
  const [sendingEmail, setSendingEmail] = useState(false);

  const fromLocation = location.state?.from?.pathname;

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (!formData.email || !formData.password) {
      showError('Please enter both email and password.');
      return false;
    }

    setLoading(true);
    setUnverifiedEmail(null);

    try {
      const res = await login(formData.email, formData.password, selectedRole);

      if (res && res.requiresVerification) {
        // Email NOT verified -> Show error toast and resend button
        showError('Please verify your email before logging in.');
        setUnverifiedEmail(formData.email);
      } else if (res && res.success) {
        // Email IS verified -> Show toast and trigger 5-second premium loading screen
        showSuccess('Login successful. Welcome back!');
        setShowLoginOverlay(true);
      } else {
        showError(res?.error || 'Login failed. Please check credentials.');
      }
    } catch (err) {
      showError(err.message || 'An error occurred during authentication.');
    } finally {
      setLoading(false);
    }
    return false;
  };

  const handleResendEmail = async () => {
    if (!unverifiedEmail) return;
    setSendingEmail(true);
    try {
      const res = await resendVerificationEmail(null, unverifiedEmail);
      if (res && res.success) {
        showSuccess('Verification email has been sent. Please check your inbox.');
      } else {
        showError(res?.error || 'Could not send verification email. Please try again later.');
      }
    } catch (e) {
      showError('Failed to send verification email.');
    } finally {
      setSendingEmail(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    try {
      const res = await loginWithGoogle(selectedRole);
      if (res && res.success) {
        showSuccess(`Welcome back, ${res.user.displayName || 'User'}!`);
        setShowLoginOverlay(true);
      } else if (res && res.error) {
        showError(res.error);
      }
    } catch (err) {
      showError(err.message || 'Google sign-in failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleLoginOverlayComplete = () => {
    setShowLoginOverlay(false);
    if (fromLocation) {
      navigate(fromLocation, { replace: true });
    } else if (selectedRole === 'Admin') {
      navigate('/admin-dashboard', { replace: true });
    } else if (selectedRole === 'Seller') {
      navigate('/seller-dashboard', { replace: true });
    } else {
      navigate('/profile', { replace: true });
    }
  };

  return (
    <>
      {/* 5-Second Premium Login Loading Overlay */}
      {showLoginOverlay && (
        <AuthLoadingOverlay
          title="Login Successful. Welcome Back!"
          subtitle="Authenticating profile, verifying session tokens, and loading your dashboard..."
          durationMs={5000}
          onComplete={handleLoginOverlayComplete}
        />
      )}

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
            {/* Top Red Gradient Bar */}
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
            <div style={{ textAlign: 'center', marginBottom: '26px' }}>
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

            {/* Unverified Email Resend Banner */}
            {unverifiedEmail && (
              <div
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: 'rgba(213, 30, 11, 0.12)',
                  border: '1px solid rgba(213, 30, 11, 0.3)',
                  marginBottom: '22px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '10px'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#ff4b3e', fontSize: '13.5px', fontWeight: '700' }}>
                  <FiAlertCircle size={18} /> Email Verification Required
                </div>
                <div style={{ fontSize: '12.5px', color: 'var(--text-secondary, #94a3b8)', lineHeight: 1.4 }}>
                  Your account requires email verification before logging in. Check your inbox for the link sent to <strong>{unverifiedEmail}</strong>.
                </div>
                <button
                  type="button"
                  onClick={handleResendEmail}
                  disabled={sendingEmail}
                  style={{
                    padding: '8px 14px',
                    borderRadius: '8px',
                    backgroundColor: '#D51E0B',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '12.5px',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '6px',
                    alignSelf: 'flex-start'
                  }}
                >
                  <FiSend size={14} /> {sendingEmail ? 'Sending...' : 'Resend Verification Email'}
                </button>
              </div>
            )}

            {/* Account Role Selector Pills */}
            <div style={{ marginBottom: '24px' }}>
              <label style={{ fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '0.6px', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '10px' }}>
                Select Account Perspective:
              </label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px' }}>
                <button
                  type="button"
                  onClick={() => setSelectedRole('Customer')}
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
                    gap: '4px'
                  }}
                >
                  <FiUser size={16} /> Customer
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('Seller')}
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
                    gap: '4px'
                  }}
                >
                  <FiBriefcase size={16} /> Seller
                </button>

                <button
                  type="button"
                  onClick={() => setSelectedRole('Admin')}
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
                    gap: '4px'
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
                  onClick={handleGoogleSignIn}
                  disabled={loading || googleLoading}
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
                    cursor: 'pointer',
                    opacity: (loading || googleLoading) ? 0.7 : 1
                  }}
                >
                  <FcGoogle size={18} /> {googleLoading ? 'Connecting...' : 'Google'}
                </button>

                <button
                  type="button"
                  onClick={() => {}}
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
    </>
  );
};

export default Login;
