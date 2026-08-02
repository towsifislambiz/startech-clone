import React from 'react';
import { FiCheck } from 'react-icons/fi';

const ProductVariantSelector = ({ variants = [], activeVariant = null, onSelectVariant }) => {
  if (!variants || variants.length === 0) return null;

  return (
    <div style={{ marginBottom: '20px' }}>
      <label style={{ display: 'block', fontSize: '13px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '8px' }}>
        Select Option / Variant:
      </label>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
        {variants.map((v) => {
          const isSelected = activeVariant?.id === v.id || activeVariant?.sku === v.sku;

          return (
            <button
              key={v.id || v.sku}
              type="button"
              onClick={() => onSelectVariant(v)}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: isSelected ? '2px solid #D51E0B' : '1px solid var(--border-color, rgba(255,255,255,0.15))',
                backgroundColor: isSelected ? 'rgba(213, 30, 11, 0.1)' : 'var(--bg-secondary, #0c1c28)',
                color: isSelected ? '#D51E0B' : 'var(--text-primary)',
                fontSize: '13px',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px',
                transition: 'all 0.2s ease'
              }}
            >
              {isSelected && <FiCheck size={14} />}
              <span>{v.name}</span>
              {v.price && (
                <span style={{ fontSize: '11px', opacity: 0.8, marginLeft: '4px' }}>
                  (৳{v.price.toLocaleString('en-IN')})
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default ProductVariantSelector;
