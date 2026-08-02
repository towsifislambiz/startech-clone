import React from 'react';
import { FiUser, FiMapPin, FiTruck, FiCreditCard, FiCheckCircle } from 'react-icons/fi';

const STEPS = [
  { id: 1, label: 'Customer Info', icon: FiUser },
  { id: 2, label: 'Shipping Address', icon: FiMapPin },
  { id: 3, label: 'Delivery Method', icon: FiTruck },
  { id: 4, label: 'Payment Options', icon: FiCreditCard },
  { id: 5, label: 'Review & Confirm', icon: FiCheckCircle }
];

const CheckoutProgress = ({ currentStep = 1, onStepClick }) => {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: 'var(--bg-secondary, #0c1c28)',
        border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
        borderRadius: '16px',
        padding: '18px 28px',
        margin: '20px 0 32px 0',
        overflowX: 'auto',
        boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
      }}
    >
      {STEPS.map((step, idx) => {
        const Icon = step.icon;
        const isActive = step.id === currentStep;
        const isCompleted = step.id < currentStep;

        return (
          <React.Fragment key={step.id}>
            <div
              onClick={() => isCompleted && onStepClick && onStepClick(step.id)}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                cursor: isCompleted ? 'pointer' : 'default',
                opacity: isCompleted || isActive ? 1 : 0.45,
                transition: 'all 0.2s ease'
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#22c55e' : isActive ? '#D51E0B' : 'rgba(255, 255, 255, 0.08)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '15px',
                  fontWeight: '800',
                  boxShadow: isActive ? '0 0 16px rgba(213, 30, 11, 0.4)' : isCompleted ? '0 0 14px rgba(34, 197, 94, 0.3)' : 'none'
                }}
              >
                <Icon size={17} />
              </div>
              <span
                style={{
                  fontSize: '13.5px',
                  fontWeight: isActive ? '800' : '600',
                  color: isActive ? 'var(--text-primary, #ffffff)' : isCompleted ? '#22c55e' : 'var(--text-secondary, #94a3b8)',
                  whiteSpace: 'nowrap'
                }}
              >
                {step.label}
              </span>
            </div>

            {idx < STEPS.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: isCompleted ? '#22c55e' : 'rgba(255, 255, 255, 0.08)',
                  margin: '0 16px',
                  minWidth: '24px',
                  borderRadius: '2px',
                  transition: 'background-color 0.3s ease'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default CheckoutProgress;
