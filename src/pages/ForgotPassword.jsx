import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useNotification } from '../context/NotificationContext';
import ButtonLoader from '../components/Common/ButtonLoader';
import Input from '../components/Common/Input';
import { useDocumentTitle } from '../hooks/useDocumentTitle';

const ForgotPassword = () => {
  const { forgotPassword } = useAuth();
  const { success: showSuccess, error: showError } = useNotification();
  useDocumentTitle('Forgot Password');

  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email.trim()) {
      showError('Please enter your email address');
      return;
    }

    setLoading(true);
    try {
      await forgotPassword(email);
      setSent(true);
      showSuccess('Password reset link sent to your email!');
    } catch (err) {
      showError(err.message || 'Failed to send reset email');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container" style={{ padding: '60px 0', display: 'flex', justifyContent: 'center', minHeight: '70vh', alignItems: 'center' }}>
      <div style={{ width: '100%', maxWidth: '420px' }}>
        <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '40px', borderRadius: '8px', border: '1px solid var(--border-color)' }}>
          <h1 style={{ marginBottom: '16px', textAlign: 'center', fontSize: '24px' }}>Reset Password</h1>
          <p style={{ color: 'var(--text-secondary)', textAlign: 'center', fontSize: '14px', marginBottom: '24px' }}>
            Enter your email address and we'll send you a link to reset your password.
          </p>

          {sent ? (
            <div style={{ textAlign: 'center', padding: '20px 0' }}>
              <div style={{ fontSize: '48px', marginBottom: '12px' }}>📧</div>
              <h3 style={{ marginBottom: '8px', fontSize: '18px' }}>Check Your Email</h3>
              <p style={{ color: 'var(--text-secondary)', fontSize: '14px', marginBottom: '24px' }}>
                We sent a password reset link to <strong>{email}</strong>.
              </p>
              <Link to="/login" className="btn btn-primary" style={{ display: 'inline-block', width: '100%', textDecoration: 'none', padding: '12px' }}>
                Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit}>
              <Input
                label="Email Address"
                type="email"
                name="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />

              <ButtonLoader
                type="submit"
                loading={loading}
                className="btn btn-primary"
                style={{ width: '100%', padding: '12px', fontSize: '16px', marginTop: '10px' }}
              >
                Send Reset Link
              </ButtonLoader>

              <div style={{ marginTop: '20px', textAlign: 'center', fontSize: '14px' }}>
                <Link to="/login" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>
                  ← Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
