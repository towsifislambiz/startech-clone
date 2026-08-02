import React, { useEffect } from 'react';
import { FiX } from 'react-icons/fi';

const Drawer = ({ isOpen, onClose, title, children, position = 'right' }) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const isLeft = position === 'left';

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.65)',
        zIndex: 1200,
      }}
      onClick={onClose}
    >
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          [isLeft ? 'left' : 'right']: 0,
          width: '100%',
          maxWidth: '360px',
          backgroundColor: 'var(--bg-secondary)',
          borderLeft: !isLeft ? '1px solid var(--border-color)' : 'none',
          borderRight: isLeft ? '1px solid var(--border-color)' : 'none',
          display: 'flex',
          flexDirection: 'column',
          zIndex: 1201,
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.5)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <div
          style={{
            padding: '16px 20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderBottom: '1px solid var(--border-color)',
          }}
        >
          <span style={{ fontWeight: 600, fontSize: '18px' }}>{title}</span>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--text-primary)',
              cursor: 'pointer',
            }}
          >
            <FiX size={22} />
          </button>
        </div>
        <div style={{ padding: '20px', flex: 1, overflowY: 'auto' }}>{children}</div>
      </div>
    </div>
  );
};

export default Drawer;
