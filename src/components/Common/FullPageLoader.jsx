import React from 'react';
import Spinner from './Spinner';

const FullPageLoader = ({ text = 'Loading StarTech...' }) => {
  return (
    <div
      style={{
        minHeight: '70vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '16px',
        width: '100%',
      }}
    >
      <Spinner size="large" />
      <span style={{ color: 'var(--text-secondary)', fontSize: '15px', fontWeight: 500 }}>
        {text}
      </span>
    </div>
  );
};

export default FullPageLoader;
