import React from 'react';
import Spinner from './Spinner';

const Button = ({
  children,
  variant = 'primary', // primary | secondary | outline | ghost | danger
  size = 'md', // sm | md | lg
  loading = false,
  disabled = false,
  type = 'button',
  className = '',
  ...props
}) => {
  const getVariantClass = () => {
    switch (variant) {
      case 'secondary':
        return 'btn-secondary';
      case 'outline':
        return 'btn-outline';
      case 'ghost':
        return 'btn-ghost';
      case 'danger':
        return 'btn-danger';
      default:
        return 'btn-primary';
    }
  };

  return (
    <button
      type={type}
      disabled={disabled || loading}
      className={`btn ${getVariantClass()} ${size ? `btn-${size}` : ''} ${className}`}
      {...props}
    >
      {loading ? (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
          <Spinner size="small" color="currentColor" /> Loading...
        </span>
      ) : (
        children
      )}
    </button>
  );
};

export default Button;
