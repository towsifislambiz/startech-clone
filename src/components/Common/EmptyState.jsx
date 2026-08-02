import React from 'react';
import { Link } from 'react-router-dom';

const EmptyState = ({
  icon = '📦',
  title = 'No items found',
  description = 'There are no items to display at this moment.',
  actionText,
  actionLink,
  onAction,
}) => {
  return (
    <div
      style={{
        padding: '60px 20px',
        textAlign: 'center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
      }}
    >
      <div style={{ fontSize: '64px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontSize: '24px', marginBottom: '8px', color: 'var(--text-primary)' }}>{title}</h3>
      <p style={{ color: 'var(--text-secondary)', maxWidth: '420px', marginBottom: '24px', fontSize: '15px' }}>
        {description}
      </p>

      {actionText && actionLink && (
        <Link to={actionLink} className="btn btn-primary">
          {actionText}
        </Link>
      )}

      {actionText && onAction && (
        <button type="button" onClick={onAction} className="btn btn-primary">
          {actionText}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
