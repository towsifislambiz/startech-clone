import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiShoppingCart, FiZap } from 'react-icons/fi';
import { useCart } from '../../context/CartContext';

const StickyPurchaseBar = ({ product }) => {
  const [visible, setVisible] = useState(false);
  const { addToCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky bar when scrolled past 400px
      if (window.scrollY > 400) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!visible || !product) return null;

  const handleAddToCart = () => {
    addToCart(product, 1);
  };

  const handleBuyNow = () => {
    addToCart(product, 1);
    navigate('/checkout');
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        backgroundColor: 'rgba(8, 22, 33, 0.95)',
        backdropFilter: 'blur(12px)',
        borderTop: '1px solid rgba(255, 255, 255, 0.12)',
        boxShadow: '0 -10px 25px rgba(0, 0, 0, 0.4)',
        zIndex: 9990,
        padding: '10px 16px',
        animation: 'slideUpSticky 0.25s cubic-bezier(0.16, 1, 0.3, 1)'
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '16px'
        }}
      >
        {/* Left Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', minWidth: 0 }}>
          <img
            src={product.thumbnail || (product.images && product.images[0])}
            alt={product.name}
            style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.2)', flexShrink: 0 }}
          />
          <div style={{ minWidth: 0 }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              {product.name}
            </div>
            <div style={{ fontSize: '14px', fontWeight: '900', color: '#ffffff' }}>
              ৳{product.price.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Right Actions */}
        <div style={{ display: 'flex', gap: '10px', flexShrink: 0 }}>
          <button
            type="button"
            onClick={handleAddToCart}
            style={{
              padding: '10px 16px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <FiShoppingCart /> Add to Cart
          </button>

          <button
            type="button"
            onClick={handleBuyNow}
            style={{
              padding: '10px 16px',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              fontWeight: '700',
              fontSize: '13px',
              borderRadius: '8px',
              border: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              cursor: 'pointer'
            }}
          >
            <FiZap /> Buy Now
          </button>
        </div>
      </div>

      <style>{`
        @keyframes slideUpSticky {
          from { transform: translateY(100%); }
          to { transform: translateY(0); }
        }
      `}</style>
    </div>
  );
};

export default StickyPurchaseBar;
