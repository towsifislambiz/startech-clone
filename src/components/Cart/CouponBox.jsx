import React, { useState } from 'react';
import { FiTag, FiCheck, FiX } from 'react-icons/fi';
import couponService from '../../services/couponService';

const CouponBox = ({ appliedCoupon, onApplyCoupon, onRemoveCoupon }) => {
  const [code, setCode] = useState('');
  const availableCoupons = couponService.getAvailableCoupons();

  const handleApply = (e) => {
    e.preventDefault();
    if (code.trim()) {
      onApplyCoupon(code);
      setCode('');
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '12px',
        padding: '16px',
        display: 'flex',
        flexDirection: 'column',
        gap: '12px'
      }}
    >
      <div style={{ fontSize: '14px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', display: 'flex', alignItems: 'center', gap: '6px' }}>
        <FiTag style={{ color: '#D51E0B' }} /> Have a Promo Code?
      </div>

      {appliedCoupon ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '10px 14px',
            borderRadius: '8px',
            backgroundColor: 'rgba(34, 197, 94, 0.12)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            color: '#22c55e',
            fontSize: '13px',
            fontWeight: '700'
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <FiCheck size={16} /> Coupon <strong>"{appliedCoupon.code}"</strong> Applied
          </div>
          <button
            type="button"
            onClick={onRemoveCoupon}
            style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
            title="Remove Coupon"
          >
            <FiX size={16} />
          </button>
        </div>
      ) : (
        <form onSubmit={handleApply} style={{ display: 'flex', gap: '8px' }}>
          <input
            type="text"
            placeholder="Enter promo code (e.g. STARTECH10)"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            style={{
              flex: 1,
              padding: '10px 12px',
              borderRadius: '8px',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
              backgroundColor: 'var(--bg, #081621)',
              color: 'var(--text-primary, #ffffff)',
              fontSize: '13px',
              textTransform: 'uppercase',
              outline: 'none'
            }}
          />
          <button
            type="submit"
            style={{
              padding: '10px 16px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            Apply
          </button>
        </form>
      )}

      {/* Available Coupon Suggestions */}
      {!appliedCoupon && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '4px' }}>
          <span style={{ fontSize: '11px', color: 'var(--text-secondary, #9ca3af)', fontWeight: '600' }}>
            Available Promos:
          </span>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
            {availableCoupons.map((c) => (
              <button
                key={c.code}
                type="button"
                onClick={() => onApplyCoupon(c.code)}
                style={{
                  background: 'none',
                  border: '1px dashed #D51E0B',
                  color: '#D51E0B',
                  fontSize: '11px',
                  fontWeight: '700',
                  padding: '3px 8px',
                  borderRadius: '4px',
                  cursor: 'pointer'
                }}
              >
                {c.code} ({c.description})
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default CouponBox;
