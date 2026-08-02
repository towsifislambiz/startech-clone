import React, { useState, useEffect } from 'react';

const PriceSlider = ({ min = 0, max = 300000, currentMin = 0, currentMax = 300000, onChange }) => {
  const [localMin, setLocalMin] = useState(currentMin);
  const [localMax, setLocalMax] = useState(currentMax);

  useEffect(() => {
    setLocalMin(currentMin);
    setLocalMax(currentMax);
  }, [currentMin, currentMax]);

  const handleApply = () => {
    onChange({ min: Number(localMin), max: Number(localMax) });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Min & Max Inputs Row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
        <div>
          <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-secondary, #9ca3af)', display: 'block', marginBottom: '4px' }}>
            Min (৳)
          </label>
          <input
            type="number"
            min={min}
            max={localMax}
            value={localMin}
            onChange={(e) => setLocalMin(Number(e.target.value))}
            onBlur={handleApply}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
              backgroundColor: 'var(--bg, #081621)',
              color: 'var(--text-primary, #ffffff)',
              fontSize: '13px',
              fontWeight: '600'
            }}
          />
        </div>

        <div>
          <label style={{ fontSize: '11px', fontWeight: '600', color: 'var(--text-secondary, #9ca3af)', display: 'block', marginBottom: '4px' }}>
            Max (৳)
          </label>
          <input
            type="number"
            min={localMin}
            max={max}
            value={localMax}
            onChange={(e) => setLocalMax(Number(e.target.value))}
            onBlur={handleApply}
            style={{
              width: '100%',
              padding: '6px 8px',
              borderRadius: '6px',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
              backgroundColor: 'var(--bg, #081621)',
              color: 'var(--text-primary, #ffffff)',
              fontSize: '13px',
              fontWeight: '600'
            }}
          />
        </div>
      </div>

      {/* Dual Range Track */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
        <input
          type="range"
          min={min}
          max={max}
          step={5000}
          value={localMax}
          onChange={(e) => setLocalMax(Number(e.target.value))}
          onMouseUp={handleApply}
          onTouchEnd={handleApply}
          style={{ width: '100%', accentColor: '#D51E0B', cursor: 'pointer' }}
        />
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', color: 'var(--text-secondary, #9ca3af)' }}>
          <span>৳{min.toLocaleString('en-IN')}</span>
          <span>৳{max.toLocaleString('en-IN')}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSlider;
