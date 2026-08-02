import React from 'react';
import { PAYMENT_METHODS } from '../../services/paymentService';

const PaymentMethods = ({ selectedMethod = 'cod', paymentDetails = {}, onSelectMethod, onUpdateDetails }) => {
  const currentOption = PAYMENT_METHODS.find((m) => m.id === selectedMethod);

  return (
    <div
      style={{
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '16px'
      }}
    >
      <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
        Select Payment Method
      </h3>

      {/* Payment Options Radio Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '10px' }}>
        {PAYMENT_METHODS.map((method) => {
          const isSelected = selectedMethod === method.id;
          return (
            <div
              key={method.id}
              onClick={() => onSelectMethod(method.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px',
                borderRadius: '10px',
                backgroundColor: isSelected ? 'rgba(213, 30, 11, 0.12)' : '#081621',
                border: isSelected ? '2px solid #D51E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <input
                type="radio"
                name="paymentMethod"
                checked={isSelected}
                onChange={() => onSelectMethod(method.id)}
                style={{ accentColor: '#D51E0B' }}
              />
              <span style={{ fontSize: '20px' }}>{method.icon}</span>
              <div>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff' }}>{method.name}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Selected Payment Instructions & Fields */}
      {currentOption && (
        <div
          style={{
            padding: '16px',
            backgroundColor: '#081621',
            borderRadius: '10px',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <p style={{ fontSize: '13px', color: '#9ca3af', margin: 0 }}>
            {currentOption.description}
          </p>

          {currentOption.number && (
            <div style={{ fontSize: '13px', fontWeight: '800', color: '#D51E0B' }}>
              Merchant Number: {currentOption.number}
            </div>
          )}

          {currentOption.requiresTrxId && (
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginTop: '8px' }}>
              <div>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
                  Sender Mobile Number *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 01712345678"
                  value={paymentDetails.senderNumber || ''}
                  onChange={(e) => onUpdateDetails({ senderNumber: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: '#0c1c28',
                    color: '#ffffff',
                    fontSize: '13px'
                  }}
                />
              </div>

              <div>
                <label style={{ fontSize: '11px', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
                  Transaction ID (TrxID) *
                </label>
                <input
                  type="text"
                  placeholder="e.g. 9J283KA19"
                  value={paymentDetails.transactionId || ''}
                  onChange={(e) => onUpdateDetails({ transactionId: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    borderRadius: '6px',
                    border: '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: '#0c1c28',
                    color: '#ffffff',
                    fontSize: '13px',
                    textTransform: 'uppercase'
                  }}
                />
              </div>
            </div>
          )}

          {selectedMethod === 'sslcommerz' && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              <input
                type="text"
                maxLength={16}
                placeholder="Card Number (16 digits)"
                value={paymentDetails.cardNumber || ''}
                onChange={(e) => onUpdateDetails({ cardNumber: e.target.value })}
                style={{
                  padding: '8px 10px',
                  borderRadius: '6px',
                  border: '1px solid rgba(255,255,255,0.15)',
                  backgroundColor: '#0c1c28',
                  color: '#ffffff',
                  fontSize: '13px'
                }}
              />
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={paymentDetails.cardExpiry || ''}
                  onChange={(e) => onUpdateDetails({ cardExpiry: e.target.value })}
                  style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0c1c28', color: '#ffffff', fontSize: '13px' }}
                />
                <input
                  type="password"
                  maxLength={3}
                  placeholder="CVC"
                  value={paymentDetails.cardCvc || ''}
                  onChange={(e) => onUpdateDetails({ cardCvc: e.target.value })}
                  style={{ padding: '8px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0c1c28', color: '#ffffff', fontSize: '13px' }}
                />
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
