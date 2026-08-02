import React from 'react';
import { SORT_OPTIONS } from '../../services/filterService';

const SortSelect = ({ value = 'popular', onChange }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
      <label style={{ fontSize: '13px', fontWeight: '600', color: 'var(--text-secondary, #9ca3af)', whiteSpace: 'nowrap' }}>
        Sort by:
      </label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        style={{
          padding: '8px 12px',
          borderRadius: '8px',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
          backgroundColor: 'var(--bg-secondary, #0c1c28)',
          color: 'var(--text-primary, #ffffff)',
          fontSize: '13px',
          fontWeight: '600',
          cursor: 'pointer',
          outline: 'none'
        }}
      >
        {SORT_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default React.memo(SortSelect);
