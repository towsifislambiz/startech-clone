import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import AuthLoadingOverlay from '../components/Auth/AuthLoadingOverlay';
import { FiZap, FiUser, FiMail, FiLock, FiEye, FiEyeOff, FiCheckCircle } from 'react-icons/fi';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const navigate = useNavigate();
  const { register, loginWithGoogle } = useAuth();
  const { error: showError, success: showSuccess } = useNotification();

  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    password: '',
    password_confirm: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [showRegisterOverlay, setShowRegisterOverlay] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    console.log('[REGISTER_SUBMIT] 1. handleSubmit called');
    if (e) {
      e.preventDefault();
      e.stopPropagation();
    }

    if (formData.password !== formData.password_confirm) {
      showError('Passwords do not match.');
      return false;
    }

    if (formData.password.length < 6) {
      showError('Your password is too weak. Please choose at least 6 characters.');
      return false;
    }

    setLoading(true);

    try {
      console.log('[REGISTER_SUBMIT] 2. Calling register()...');
      const res = await register(formData, 'Customer');
      console.log('[REGISTER_SUBMIT] 3. register() returned:', res);

      setLoading(false);

      if (res && res.success) {
        showSuccess('Account created successfully. Please verify your email.');
        setShowRegisterOverlay(true);
      } else {
        showError(res.error || 'Registration failed. Please check your information.');
      }
    } catch (err) {
      setLoading(false);
      console.error('[REGISTER_SUBMIT_ERROR]:', err);
      showError(err.message || 'An error occurred during registration.');
    }
    return false;
  };

  const handleGoogleSignUp = async () => {
    setGoogleLoading(true);
    try {
      console.log('[REGISTER_GOOGLE] Invoking Google Authentication popup...');
      const res = await loginWithGoogle('Customer');
      if (res && res.success) {
        showSuccess(`Welcome to StarTech, ${res.user.displayName || 'Customer'}!`);
        setShowRegisterOverlay(true);
        setTimeout(() => {
          navigate('/profile', { replace: true });
        }, 3000);
      } else if (res && res.error) {
        showError(res.error);
      }
    } catch (err) {
      showError(err.message || 'Google sign-up failed.');
    } finally {
      setGoogleLoading(false);
    }
  };

  const handleOverlayComplete = () => {
    console.log('[REGISTER_FORM] 3-second overlay complete -> Executing navigate(/login, { replace: true })');
    navigate('/login', { replace: true });
  };

  return (
    <>
      {/* 3-Second Premium Registration Loading Overlay */}
      {showRegisterOverlay && (
        <AuthLoadingOverlay
          title="Account Created Successfully!"
          subtitle="Please verify your email before logging in. Redirecting..."
          durationMs={3000}
          onComplete={handleOverlayComplete}
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
        <div style={{ width: '100%', maxWidth: '480px' }}>
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

            {/* Header Logo */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
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
                Create Your Account
              </h1>
              <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
                Join StarTech to unlock exclusive tech deals, order tracking, and custom PC builds
              </p>
            </div>

            <form onSubmit={handleSubmit}>
              {/* Full Name */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)', marginBottom: '6px' }}>
                  Full Name *
                </label>
                <div style={{ position: 'relative' }}>
                  <FiUser style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted, #64748b)' }} size={17} />
                  <input
                    type="text"
                    name="full_name"
                    placeholder="Enter your full name"
                    value={formData.full_name}
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

              {/* Email Address */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)', marginBottom: '6px' }}>
                  Email Address *
                </label>
                <div style={{ position: 'relative' }}>
                  <FiMail style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted, #64748b)' }} size={17} />
                  <input
                    type="email"
                    name="email"
                    placeholder="name@example.com"
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

              {/* Password */}
              <div style={{ marginBottom: '16px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)', marginBottom: '6px' }}>
                  Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <FiLock style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted, #64748b)' }} size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Create strong password"
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

              {/* Confirm Password */}
              <div style={{ marginBottom: '22px' }}>
                <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary, #ffffff)', marginBottom: '6px' }}>
                  Confirm Password *
                </label>
                <div style={{ position: 'relative' }}>
                  <FiLock style={{ position: 'absolute', left: '14px', top: '15px', color: 'var(--text-muted, #64748b)' }} size={17} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password_confirm"
                    placeholder="Confirm password"
                    value={formData.password_confirm}
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

              {/* Register Submit Button */}
              <button
                type="submit"
                disabled={loading || googleLoading}
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
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px'
                }}
              >
                {loading ? 'Creating Account...' : <><FiCheckCircle size={18} /> Create Account</>}
              </button>
            </form>

            {/* Social Sign Up Options */}
            <div style={{ marginTop: '24px', paddingTop: '20px', borderTop: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))' }}>
              <div style={{ textAlign: 'center', marginBottom: '14px', fontSize: '12px', color: 'var(--text-muted, #64748b)', fontWeight: '600' }}>
                OR SIGN UP WITH
              </div>

              <button
                type="button"
                onClick={handleGoogleSignUp}
                disabled={loading || googleLoading}
                style={{
                  width: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '11px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, rgba(255, 255, 255, 0.12))',
                  backgroundColor: 'var(--bg, #081621)',
                  color: 'var(--text-primary, #ffffff)',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  opacity: (loading || googleLoading) ? 0.7 : 1
                }}
              >
                <FcGoogle size={20} /> {googleLoading ? 'Connecting to Google...' : 'Sign up with Google'}
              </button>
            </div>

            <div style={{ marginTop: '24px', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
                Already have an account?{' '}
                <Link to="/login" style={{ color: '#D51E0B', fontWeight: '700', textDecoration: 'none' }}>
                  Sign In
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
