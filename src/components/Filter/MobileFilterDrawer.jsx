import React from 'react';
import { FiX, FiSliders, FiCheck } from 'react-icons/fi';
import FilterSidebar from './FilterSidebar';

const MobileFilterDrawer = ({
  isOpen = false,
  totalCount = 0,
  onClose,
  ...sidebarProps
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 99990,
          animation: 'fadeIn 0.2s ease'
        }}
      />

      {/* Slide-in Drawer */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '85%',
          maxWidth: '360px',
          backgroundColor: '#081621',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.5)',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#0c1c28',
            borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}
        >
          <div style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiSliders style={{ color: '#D51E0B' }} /> Filter Options
          </div>
          <button
            type="button"
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              color: '#ffffff',
              cursor: 'pointer',
              padding: '4px'
            }}
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Scrollable Filter Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
          <FilterSidebar {...sidebarProps} />
        </div>

        {/* Apply Action Footer */}
        <div
          style={{
            padding: '16px 20px',
            backgroundColor: '#0c1c28',
            borderTop: '1px solid rgba(255, 255, 255, 0.1)',
            display: 'flex',
            gap: '12px'
          }}
        >
          <button
            type="button"
            className="btn btn-primary"
            onClick={onClose}
            style={{
              flex: 1,
              padding: '12px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '700',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <FiCheck size={16} /> Show {totalCount} Products
          </button>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes slideInRight {
          from { transform: translateX(100%); }
          to { transform: translateX(0); }
        }
      `}</style>
    </>
  );
};

export default MobileFilterDrawer;
