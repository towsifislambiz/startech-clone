import React from 'react';
import Spinner from './Spinner';

const ButtonLoader = ({ children, loading, disabled, ...props }) => {
  return (
    <button disabled={loading || disabled} {...props}>
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

export default ButtonLoader;
