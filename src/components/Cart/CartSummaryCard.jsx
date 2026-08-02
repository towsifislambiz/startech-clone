import React, { useState } from 'react';
import { FiTruck, FiShield, FiArrowRight, FiTag, FiLock, FiRotateCcw } from 'react-icons/fi';
import { SHIPPING_RATES } from '../../services/cartService';

const CartSummaryCard = ({ totals, shippingRegion, onSelectShipping, onProceedToCheckout }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponCode.trim()) {
      setCouponApplied(true);
    }
  };

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '20px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 16px 36px rgba(0, 0, 0, 0.18)'
      }}
    >
      <h3 style={{ fontSize: '20px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0, letterSpacing: '-0.3px' }}>
        Order Summary
      </h3>

      {/* Coupon Section */}
      <form onSubmit={handleApplyCoupon} style={{ display: 'flex', gap: '8px' }}>
        <div style={{ position: 'relative', flex: 1 }}>
          <FiTag style={{ position: 'absolute', left: '12px', top: '12px', color: 'var(--text-muted, #64748b)' }} size={16} />
          <input
            type="text"
            placeholder="Promo or Coupon Code"
            value={couponCode}
            onChange={(e) => setCouponCode(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 10px 10px 36px',
              borderRadius: '10px',
              border: '1px solid var(--border-color, rgba(255,255,255,0.15))',
              backgroundColor: 'var(--bg, #081621)',
              color: 'var(--text-primary, #ffffff)',
              fontSize: '13px',
              outline: 'none'
            }}
          />
        </div>
        <button
          type="submit"
          style={{
            padding: '10px 16px',
            backgroundColor: couponApplied ? '#22c55e' : '#D51E0B',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '13px',
            borderRadius: '10px',
            border: 'none',
            cursor: 'pointer',
            flexShrink: 0
          }}
        >
          {couponApplied ? 'Applied ✓' : 'Apply'}
        </button>
      </form>

      {/* Shipping Region Selector */}
      <div>
        <label style={{ fontSize: '12px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>
          <FiTruck /> Shipping Destination:
        </label>
        <select
          value={shippingRegion}
          onChange={(e) => onSelectShipping && onSelectShipping(e.target.value)}
          style={{
            width: '100%',
            padding: '10px 14px',
            borderRadius: '10px',
            border: '1px solid var(--border-color, rgba(255, 255, 255, 0.15))',
            backgroundColor: 'var(--bg, #081621)',
            color: 'var(--text-primary, #ffffff)',
            fontSize: '13.5px',
            fontWeight: '600',
            outline: 'none'
          }}
        >
          {Object.entries(SHIPPING_RATES).map(([key, info]) => (
            <option key={key} value={key}>
              {info.label} (৳{info.fee})
            </option>
          ))}
        </select>
      </div>

      {/* Price Breakdown */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '14.5px', color: 'var(--text-primary, #ffffff)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary, #94a3b8)' }}>Items Subtotal ({totals.itemCount})</span>
          <span style={{ fontWeight: '700' }}>৳{totals.subtotal.toLocaleString('en-IN')}</span>
        </div>

        {totals.couponDiscount > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#22c55e' }}>
            <span>Coupon Discount</span>
            <span style={{ fontWeight: '700' }}>-৳{totals.couponDiscount.toLocaleString('en-IN')}</span>
          </div>
        )}

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary, #94a3b8)' }}>Estimated Delivery Fee</span>
          <span style={{ fontWeight: '700' }}>
            {totals.shippingFee === 0 ? <strong style={{ color: '#22c55e' }}>FREE</strong> : `৳${totals.shippingFee}`}
          </span>
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <span style={{ color: 'var(--text-secondary, #94a3b8)' }}>Estimated VAT (5%)</span>
          <span style={{ fontWeight: '700' }}>৳{totals.vatAmount.toLocaleString('en-IN')}</span>
        </div>

        {totals.totalSavings > 0 && (
          <div style={{ display: 'flex', justifyContent: 'space-between', padding: '8px 12px', backgroundColor: 'rgba(34, 197, 94, 0.12)', borderRadius: '8px', color: '#22c55e', fontSize: '13px', fontWeight: '700' }}>
            <span>Total Discount Savings</span>
            <span>৳{totals.totalSavings.toLocaleString('en-IN')}</span>
          </div>
        )}
      </div>

      <hr style={{ border: 'none', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.08))', margin: 0 }} />

      {/* Grand Total Row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <div>
          <span style={{ fontSize: '15px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', display: 'block' }}>Grand Total</span>
          <span style={{ fontSize: '11px', color: 'var(--text-muted, #64748b)' }}>Inclusive of all taxes</span>
        </div>
        <span style={{ fontSize: '26px', fontWeight: '900', color: '#D51E0B', letterSpacing: '-0.5px' }}>
          ৳{totals.grandTotal.toLocaleString('en-IN')}
        </span>
      </div>

      {/* CTA Button */}
      <button
        type="button"
        onClick={onProceedToCheckout}
        disabled={totals.itemCount === 0}
        style={{
          width: '100%',
          padding: '16px',
          backgroundColor: '#D51E0B',
          color: '#ffffff',
          fontWeight: '800',
          fontSize: '16px',
          borderRadius: '12px',
          border: 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '10px',
          cursor: totals.itemCount === 0 ? 'not-allowed' : 'pointer',
          opacity: totals.itemCount === 0 ? 0.5 : 1,
          boxShadow: totals.itemCount === 0 ? 'none' : '0 8px 24px rgba(213, 30, 11, 0.35)',
          transition: 'transform 0.15s ease, background-color 0.2s ease'
        }}
      >
        Proceed to Checkout <FiArrowRight size={20} />
      </button>

      {/* Trust Badges */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingTop: '10px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.06))' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary, #94a3b8)' }}>
          <FiShield style={{ color: '#22c55e' }} size={16} /> 100% Genuine Tech Guarantee
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary, #94a3b8)' }}>
          <FiLock style={{ color: '#3b82f6' }} size={16} /> Encrypted 256-bit SSL Payment
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', color: 'var(--text-secondary, #94a3b8)' }}>
          <FiRotateCcw style={{ color: '#f59e0b' }} size={16} /> Easy 7-Day Replacement Policy
        </div>
      </div>
    </div>
  );
};

export default CartSummaryCard;
