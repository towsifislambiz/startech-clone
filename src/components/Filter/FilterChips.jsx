import React from 'react';
import { FiX, FiRefreshCw } from 'react-icons/fi';

const FilterChips = ({ chips = [], onRemoveChip, onClearAll }) => {
  if (!chips || chips.length === 0) return null;

  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: '8px',
        margin: '12px 0'
      }}
    >
      <span style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary, #9ca3af)', marginRight: '4px' }}>
        Active Filters:
      </span>

      {chips.map((chip) => (
        <span
          key={chip.id}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '4px 10px',
            borderRadius: '99px',
            backgroundColor: 'rgba(213, 30, 11, 0.12)',
            border: '1px solid rgba(213, 30, 11, 0.3)',
            color: '#D51E0B',
            fontSize: '12px',
            fontWeight: '600'
          }}
        >
          {chip.label}
          <button
            type="button"
            onClick={() => onRemoveChip(chip)}
            title={`Remove ${chip.label}`}
            style={{
              background: 'none',
              border: 'none',
              color: '#D51E0B',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '0',
              marginLeft: '2px'
            }}
          >
            <FiX size={14} />
          </button>
        </span>
      ))}

      <button
        type="button"
        onClick={onClearAll}
        style={{
          background: 'none',
          border: 'none',
          color: '#D51E0B',
          fontSize: '12px',
          fontWeight: '700',
          cursor: 'pointer',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '4px',
          padding: '4px 8px'
        }}
      >
        <FiRefreshCw size={12} /> Clear All
      </button>
    </div>
  );
};

export default React.memo(FilterChips);
