import React from 'react';
import { Link } from 'react-router-dom';
import { FiX, FiShoppingCart, FiTrash2, FiPlus, FiMinus, FiArrowRight } from 'react-icons/fi';
import useCartSystem from '../../hooks/useCartSystem';

const MiniCartDrawer = () => {
  const { items, itemCount, totals, isDrawerOpen, closeDrawer, updateQty, removeItem, proceedToCheckout } = useCartSystem();

  if (!isDrawerOpen) return null;

  return (
    <>
      {/* Overlay Backdrop */}
      <div
        onClick={closeDrawer}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 99990,
          animation: 'fadeIn 0.2s ease'
        }}
      />

      {/* Slide-in Drawer Card */}
      <div
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '90%',
          maxWidth: '420px',
          backgroundColor: '#081621',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 35px rgba(0,0,0,0.6)',
          animation: 'slideInRight 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Drawer Header */}
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
            <FiShoppingCart style={{ color: '#D51E0B' }} /> Your Shopping Cart ({itemCount})
          </div>
          <button
            type="button"
            onClick={closeDrawer}
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

        {/* Drawer Body - Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {items.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
              <FiShoppingCart size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
              <h4 style={{ color: '#ffffff', marginBottom: '4px' }}>Your cart is empty</h4>
              <p style={{ fontSize: '13px' }}>Explore products and add items to your cart.</p>
            </div>
          ) : (
            items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '12px',
                  padding: '12px',
                  borderRadius: '10px',
                  backgroundColor: '#0c1c28',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  alignItems: 'center'
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.2)', flexShrink: 0 }}
                />

                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  {item.variant && (
                    <div style={{ fontSize: '11px', color: '#D51E0B', fontWeight: '600' }}>
                      Variant: {item.variant.name}
                    </div>
                  )}
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#ffffff', marginTop: '4px' }}>
                    ৳{(item.price * item.quantity).toLocaleString('en-IN')}
                    <span style={{ fontSize: '11px', color: '#9ca3af', fontWeight: 'normal', marginLeft: '6px' }}>
                      (৳{item.price.toLocaleString('en-IN')} each)
                    </span>
                  </div>
                </div>

                {/* Quantity Controls & Remove */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
                  <button
                    type="button"
                    onClick={() => removeItem(item.id)}
                    style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '2px' }}
                    title="Remove item"
                  >
                    <FiTrash2 size={14} />
                  </button>

                  <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', overflow: 'hidden' }}>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.quantity - 1)}
                      style={{ padding: '2px 6px', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                    ><FiMinus size={11} /></button>
                    <span style={{ padding: '2px 8px', fontSize: '12px', fontWeight: 'bold', color: '#ffffff' }}>{item.quantity}</span>
                    <button
                      type="button"
                      onClick={() => updateQty(item.id, item.quantity + 1)}
                      style={{ padding: '2px 6px', background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}
                    ><FiPlus size={11} /></button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Drawer Footer Summary */}
        {items.length > 0 && (
          <div
            style={{
              padding: '16px 20px',
              backgroundColor: '#0c1c28',
              borderTop: '1px solid rgba(255, 255, 255, 0.1)',
              display: 'flex',
              flexDirection: 'column',
              gap: '12px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '14px', color: '#ffffff' }}>
              <span>Subtotal:</span>
              <strong style={{ fontSize: '18px', color: '#D51E0B' }}>
                ৳{totals.subtotal.toLocaleString('en-IN')}
              </strong>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <Link
                to="/cart"
                onClick={closeDrawer}
                style={{
                  padding: '10px',
                  backgroundColor: 'rgba(255, 255, 255, 0.1)',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '13px',
                  borderRadius: '8px',
                  textAlign: 'center',
                  textDecoration: 'none'
                }}
              >
                View Full Cart
              </Link>

              <button
                type="button"
                onClick={proceedToCheckout}
                style={{
                  padding: '10px',
                  backgroundColor: '#D51E0B',
                  color: '#ffffff',
                  fontWeight: '700',
                  fontSize: '13px',
                  borderRadius: '8px',
                  border: 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '6px',
                  cursor: 'pointer'
                }}
              >
                Checkout <FiArrowRight />
              </button>
            </div>
          </div>
        )}
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

export default MiniCartDrawer;
