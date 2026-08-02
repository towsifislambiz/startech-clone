import React from 'react';

const Select = ({
  label,
  options = [],
  value,
  onChange,
  name,
  error,
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
      <select
        id={name}
        name={name}
        value={value}
        onChange={onChange}
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
          cursor: 'pointer',
          ...style,
        }}
        className={className}
        {...props}
      >
        {options.map((opt, idx) => (
          <option key={idx} value={typeof opt === 'object' ? opt.value : opt}>
            {typeof opt === 'object' ? opt.label : opt}
          </option>
        ))}
      </select>
      {error && (
        <span style={{ display: 'block', marginTop: '4px', fontSize: '12px', color: 'var(--accent-red)' }}>
          {error}
        </span>
      )}
    </div>
  );
};

export default Select;
