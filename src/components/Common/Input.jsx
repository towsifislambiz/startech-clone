import React from 'react';

const Input = ({
  label,
  error,
  type = 'text',
  name,
  value,
  onChange,
  placeholder,
  required = false,
  className = '',
  style = {},
  ...props
}) => {
  return (
    <div style={{ marginBottom: '16px', width: '100%' }}>
      {label && (
        <label
          htmlFor={name}
          style={{
            display: 'block',
            marginBottom: '6px',
            fontSize: '14px',
            fontWeight: 500,
            color: 'var(--text-primary)',
          }}
        >
          {label} {required && <span style={{ color: 'var(--accent-red)' }}>*</span>}
        </label>
      )}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        style={{
          width: '100%',
          padding: '10px 14px',
          borderRadius: '6px',
          border: `1px solid ${error ? 'var(--accent-red)' : 'var(--border-color)'}`,
          backgroundColor: 'var(--bg)',
          color: 'var(--text-primary)',
          outline: 'none',
          fontSize: '14px',
          transition: 'border-color 0.2s',
          ...style,
        }}
        className={className}
        {...props}
      />
      {error && (
        <span style={{ display: 'block', marginTop: '4px', fontSize: '12px', color: 'var(--accent-red)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Input;
