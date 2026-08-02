import React from 'react';
import { FiClock, FiCheck, FiBox, FiPackage, FiTruck, FiMapPin, FiCheckCircle, FiXCircle } from 'react-icons/fi';

const STAGES = [
  { id: 'Pending', label: 'Pending', icon: FiClock },
  { id: 'Confirmed', label: 'Confirmed', icon: FiCheck },
  { id: 'Processing', label: 'Processing', icon: FiBox },
  { id: 'Packed', label: 'Packed', icon: FiPackage },
  { id: 'Shipped', label: 'Shipped', icon: FiTruck },
  { id: 'Out for Delivery', label: 'Out for Delivery', icon: FiMapPin },
  { id: 'Delivered', label: 'Delivered', icon: FiCheckCircle }
];

const OrderStatusTracker = ({ currentStatus = 'Pending' }) => {
  if (currentStatus === 'Cancelled') {
    return (
      <div
        style={{
          padding: '16px',
          backgroundColor: 'rgba(239, 68, 68, 0.12)',
          border: '1px solid rgba(239, 68, 68, 0.3)',
          borderRadius: '12px',
          color: '#ef4444',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          fontSize: '14px',
          fontWeight: '700'
        }}
      >
        <FiXCircle size={22} /> This Order Has Been Cancelled.
      </div>
    );
  }

  // Find index of current status
  const currentIdx = STAGES.findIndex((s) => s.id.toLowerCase() === currentStatus.toLowerCase());
  const activeIdx = currentIdx >= 0 ? currentIdx : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        backgroundColor: '#081621',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '20px',
        margin: '16px 0',
        overflowX: 'auto'
      }}
    >
      {STAGES.map((stage, idx) => {
        const Icon = stage.icon;
        const isCompleted = idx < activeIdx;
        const isCurrent = idx === activeIdx;

        return (
          <React.Fragment key={stage.id}>
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '6px',
                minWidth: '80px',
                opacity: isCompleted || isCurrent ? 1 : 0.35
              }}
            >
              <div
                style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  backgroundColor: isCompleted ? '#22c55e' : isCurrent ? '#D51E0B' : 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px',
                  fontWeight: 'bold',
                  boxShadow: isCurrent ? '0 0 15px rgba(213, 30, 11, 0.5)' : 'none'
                }}
              >
                <Icon size={18} />
              </div>
              <span
                style={{
                  fontSize: '11px',
                  fontWeight: isCurrent ? '800' : '600',
                  color: isCurrent ? '#ffffff' : isCompleted ? '#22c55e' : '#9ca3af',
                  textAlign: 'center',
                  whiteSpace: 'nowrap'
                }}
              >
                {stage.label}
              </span>
            </div>

            {idx < STAGES.length - 1 && (
              <div
                style={{
                  flex: 1,
                  height: '2px',
                  backgroundColor: idx < activeIdx ? '#22c55e' : 'rgba(255, 255, 255, 0.1)',
                  margin: '0 4px',
                  minWidth: '15px',
                  marginBottom: '20px'
                }}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default OrderStatusTracker;
