import React from 'react';
import { FiMapPin, FiHome, FiCompass } from 'react-icons/fi';

const DIVISIONS = ['Dhaka', 'Chittagong', 'Rajshahi', 'Khulna', 'Barisal', 'Sylhet', 'Rangpur', 'Mymensingh'];

const AddressForm = ({
  title = 'Shipping Address',
  addressData = {},
  onChange,
  showSameAsShipping = false,
  sameAsShipping = true,
  onToggleSame
}) => {
  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiMapPin size={20} style={{ color: '#D51E0B' }} />
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0 }}>
            {title}
          </h3>
        </div>

        {showSameAsShipping && (
          <label style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-primary, #ffffff)', cursor: 'pointer', fontWeight: '600' }}>
            <input
              type="checkbox"
              checked={sameAsShipping}
              onChange={(e) => onToggleSame(e.target.checked)}
              style={{ accentColor: '#D51E0B', width: '16px', height: '16px', cursor: 'pointer' }}
            />
            Same as Shipping Address
          </label>
        )}
      </div>

      {(!showSameAsShipping || !sameAsShipping) && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          {/* Address Line */}
          <div style={{ gridColumn: '1 / -1' }}>
            <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>
              Street Address / House / Flat / Road *
            </label>
            <div style={{ position: 'relative' }}>
              <FiHome style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted, #64748b)' }} size={17} />
              <input
                type="text"
                required
                placeholder="e.g. House 45, Road 11, Block D, Mirpur"
                value={addressData.address || ''}
                onChange={(e) => onChange({ address: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.15))',
                  backgroundColor: 'var(--bg, #081621)',
                  color: 'var(--text-primary, #ffffff)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Division */}
          <div>
            <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>
              Division *
            </label>
            <select
              value={addressData.division || 'Dhaka'}
              onChange={(e) => onChange({ division: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.15))',
                backgroundColor: 'var(--bg, #081621)',
                color: 'var(--text-primary, #ffffff)',
                fontSize: '14px',
                fontWeight: '600',
                outline: 'none'
              }}
            >
              {DIVISIONS.map((d) => (
                <option key={d} value={d}>{d}</option>
              ))}
            </select>
          </div>

          {/* City / District */}
          <div>
            <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>
              City / District *
            </label>
            <input
              type="text"
              required
              placeholder="e.g. Dhaka"
              value={addressData.city || ''}
              onChange={(e) => onChange({ city: e.target.value })}
              style={{
                width: '100%',
                padding: '12px 14px',
                borderRadius: '10px',
                border: '1px solid var(--border-color, rgba(255,255,255,0.15))',
                backgroundColor: 'var(--bg, #081621)',
                color: 'var(--text-primary, #ffffff)',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          {/* Postal Code */}
          <div>
            <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>
              Postal Code
            </label>
            <div style={{ position: 'relative' }}>
              <FiCompass style={{ position: 'absolute', left: '14px', top: '14px', color: 'var(--text-muted, #64748b)' }} size={17} />
              <input
                type="text"
                placeholder="e.g. 1207"
                value={addressData.postalCode || ''}
                onChange={(e) => onChange({ postalCode: e.target.value })}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.15))',
                  backgroundColor: 'var(--bg, #081621)',
                  color: 'var(--text-primary, #ffffff)',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddressForm;
