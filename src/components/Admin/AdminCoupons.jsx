import React, { useState } from 'react';
import { FiPercent, FiPlus, FiTrash2, FiTag } from 'react-icons/fi';

const AdminCoupons = ({ coupons = [], onCreateCoupon, onDeleteCoupon }) => {
  const [couponCode, setCouponCode] = useState('');
  const [couponType, setCouponType] = useState('percentage');
  const [couponValue, setCouponValue] = useState('');
  const [couponMin, setCouponMin] = useState('0');
  const [description, setDescription] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!couponCode.trim() || !couponValue) return;

    onCreateCoupon({
      code: couponCode.trim(),
      type: couponType,
      value: Number(couponValue),
      minSubtotal: Number(couponMin || 0),
      description: description.trim() || `${couponValue}${couponType === 'percentage' ? '%' : '৳'} discount promo`
    });

    setCouponCode('');
    setCouponValue('');
    setCouponMin('0');
    setDescription('');
  };

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px', fontFamily: "'Inter', sans-serif" }}>
      {/* Create Coupon Form Card */}
      <div
        style={{
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiPlus style={{ color: '#D51E0B' }} /> Create New Promo Coupon
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Generate promotional codes for checkout discounts
          </p>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              Coupon Code *
            </label>
            <div style={{ position: 'relative' }}>
              <FiTag style={{ position: 'absolute', left: '14px', top: '14px', color: '#64748b' }} size={16} />
              <input
                type="text"
                required
                placeholder="e.g. FLASH20"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px 10px 40px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '14px',
                  fontWeight: '700',
                  textTransform: 'uppercase',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                Discount Type
              </label>
              <select
                value={couponType}
                onChange={(e) => setCouponType(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  outline: 'none'
                }}
              >
                <option value="percentage">Percentage (%)</option>
                <option value="flat">Flat Amount (৳)</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                Discount Value *
              </label>
              <input
                type="number"
                required
                placeholder="e.g. 15"
                value={couponValue}
                onChange={(e) => setCouponValue(e.target.value)}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              Minimum Subtotal Requirement (৳)
            </label>
            <input
              type="number"
              placeholder="0 (No minimum)"
              value={couponMin}
              onChange={(e) => setCouponMin(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              Description
            </label>
            <input
              type="text"
              placeholder="e.g. Special Eid Tech Festival Discount"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13.5px',
                outline: 'none'
              }}
            />
          </div>

          <button
            type="submit"
            style={{
              padding: '12px',
              borderRadius: '10px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              border: 'none',
              fontSize: '14.5px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(213, 30, 11, 0.35)',
              marginTop: '4px'
            }}
          >
            Create Promo Coupon
          </button>
        </form>
      </div>

      {/* Active Coupons List */}
      <div
        style={{
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '20px',
          padding: '28px',
          display: 'flex',
          flexDirection: 'column',
          gap: '20px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)'
        }}
      >
        <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiPercent style={{ color: '#D51E0B' }} /> Active System Coupons ({coupons.length})
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Active promotional codes available for customer checkout validation
          </p>
        </div>

        {coupons.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#94a3b8', fontSize: '13.5px' }}>
            No active coupons found. Create your first promo code using the form!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {coupons.map((c) => (
              <div
                key={c.code}
                style={{
                  padding: '16px',
                  borderRadius: '12px',
                  backgroundColor: '#081621',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center'
                }}
              >
                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <strong style={{ color: '#D51E0B', fontSize: '16px', letterSpacing: '0.5px' }}>{c.code}</strong>
                    <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '2px 8px', borderRadius: '4px' }}>
                      {c.type === 'percentage' ? `${c.value}% OFF` : `৳${c.value} OFF`}
                    </span>
                  </div>
                  <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '4px' }}>
                    {c.description} {c.minSubtotal > 0 ? `• Min Order: ৳${c.minSubtotal}` : ''}
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => onDeleteCoupon(c.code)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: 'rgba(239, 68, 68, 0.15)',
                    color: '#ef4444',
                    border: '1px solid rgba(239, 68, 68, 0.3)',
                    cursor: 'pointer'
                  }}
                  title="Delete Coupon"
                >
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminCoupons;
