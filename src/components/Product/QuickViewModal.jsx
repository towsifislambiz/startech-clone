import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiX, FiShoppingCart, FiHeart, FiStar, FiZap, FiExternalLink } from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import useWishlist from '../../hooks/useWishlist';
import useCompare from '../../hooks/useCompare';

const QuickViewModal = ({ product, isOpen = false, onClose }) => {
  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [qty, setQty] = useState(1);
  const { addToCart } = useCart();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();
  const navigate = useNavigate();

  if (!isOpen || !product) return null;

  const images = product.images && product.images.length > 0
    ? product.images
    : [product.thumbnail || ''];

  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  const handleAddToCart = () => {
    addToCart(product, qty);
  };

  const handleBuyNow = () => {
    addToCart(product, qty);
    onClose();
    navigate('/checkout');
  };

  return (
    <>
      {/* Backdrop Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(6px)',
          zIndex: 99990,
          animation: 'fadeIn 0.2s ease'
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '850px',
          maxHeight: '90vh',
          backgroundColor: '#081621',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          borderRadius: '16px',
          boxShadow: '0 25px 50px rgba(0, 0, 0, 0.6)',
          zIndex: 99999,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
          animation: 'scaleUp 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '16px',
            right: '16px',
            background: 'rgba(255, 255, 255, 0.1)',
            border: 'none',
            color: '#ffffff',
            borderRadius: '50%',
            width: '36px',
            height: '36px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            zIndex: 10
          }}
        >
          <FiX size={20} />
        </button>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', padding: '24px', gap: '24px' }}>
          {/* Left Column: Image Gallery */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            <div
              style={{
                width: '100%',
                height: '320px',
                backgroundColor: 'rgba(0, 0, 0, 0.25)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '16px'
              }}
            >
              <img
                src={images[activeImgIndex]}
                alt={product.name}
                style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
              />
            </div>

            {images.length > 1 && (
              <div style={{ display: 'flex', gap: '8px', overflowX: 'auto', paddingBottom: '4px' }}>
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setActiveImgIndex(idx)}
                    style={{
                      width: '60px',
                      height: '60px',
                      borderRadius: '8px',
                      border: activeImgIndex === idx ? '2px solid #D51E0B' : '1px solid rgba(255, 255, 255, 0.1)',
                      backgroundColor: 'rgba(0, 0, 0, 0.2)',
                      padding: '4px',
                      cursor: 'pointer',
                      flexShrink: 0
                    }}
                  >
                    <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Information & Actions */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <div style={{ display: 'flex', gap: '8px', fontSize: '11px', fontWeight: '800', textTransform: 'uppercase', marginBottom: '6px' }}>
                <span style={{ color: '#D51E0B' }}>{product.brand}</span>
                <span style={{ color: '#9ca3af' }}>•</span>
                <span style={{ color: '#9ca3af' }}>{product.category}</span>
              </div>
              <h2 style={{ fontSize: '18px', fontWeight: '700', color: '#ffffff', lineHeight: 1.3, margin: '0 0 10px 0' }}>
                {product.name}
              </h2>

              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#f59e0b', fontSize: '13px', fontWeight: '700' }}>
                  <FiStar style={{ fill: '#f59e0b' }} /> {product.rating || 5.0} ({product.reviewsCount || 12} reviews)
                </div>
                <span
                  style={{
                    padding: '2px 8px',
                    borderRadius: '4px',
                    fontSize: '11px',
                    fontWeight: '800',
                    backgroundColor: product.stock === 'In Stock' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                    color: product.stock === 'In Stock' ? '#22c55e' : '#ef4444'
                  }}
                >
                  {product.stock}
                </span>
              </div>
            </div>

            {/* Price Section */}
            <div style={{ padding: '12px 16px', backgroundColor: '#0c1c28', borderRadius: '10px', display: 'flex', alignItems: 'baseline', gap: '12px' }}>
              <span style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>
                ৳{product.price.toLocaleString('en-IN')}
              </span>
              {product.oldPrice > product.price && (
                <span style={{ fontSize: '15px', color: '#9ca3af', textDecoration: 'line-through' }}>
                  ৳{product.oldPrice.toLocaleString('en-IN')}
                </span>
              )}
              {product.discount > 0 && (
                <span style={{ backgroundColor: '#D51E0B', color: '#ffffff', fontSize: '11px', fontWeight: '800', padding: '2px 6px', borderRadius: '4px' }}>
                  Save ৳{(product.oldPrice - product.price).toLocaleString('en-IN')} ({product.discount}%)
                </span>
              )}
            </div>

            {/* Key Features */}
            {product.keyFeatures && product.keyFeatures.length > 0 && (
              <div>
                <h4 style={{ fontSize: '13px', fontWeight: '700', color: '#9ca3af', margin: '0 0 6px 0' }}>Key Features:</h4>
                <ul style={{ paddingLeft: '16px', margin: 0, fontSize: '13px', color: '#ffffff', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                  {product.keyFeatures.slice(0, 4).map((feat, i) => (
                    <li key={i}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}

            {/* Quantity & Action Buttons */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: 'auto' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '8px', overflow: 'hidden' }}>
                  <button
                    type="button"
                    onClick={() => setQty(Math.max(1, qty - 1))}
                    style={{ padding: '8px 12px', background: 'none', border: 'none', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
                  >-</button>
                  <span style={{ padding: '8px 12px', fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{qty}</span>
                  <button
                    type="button"
                    onClick={() => setQty(qty + 1)}
                    style={{ padding: '8px 12px', background: 'none', border: 'none', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
                  >+</button>
                </div>

                <button
                  type="button"
                  onClick={handleAddToCart}
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
                    gap: '8px',
                    cursor: 'pointer'
                  }}
                >
                  <FiShoppingCart /> Add to Cart
                </button>

                <button
                  type="button"
                  onClick={handleBuyNow}
                  style={{
                    padding: '12px 18px',
                    backgroundColor: '#3b82f6',
                    color: '#ffffff',
                    fontWeight: '700',
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

              {/* Wishlist, Compare & Full Details Row */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px' }}>
                <div style={{ display: 'flex', gap: '12px' }}>
                  <button
                    type="button"
                    onClick={() => toggleWishlist(product)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: wishlisted ? '#D51E0B' : '#9ca3af',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <FiHeart style={{ fill: wishlisted ? '#D51E0B' : 'none' }} /> Wishlist
                  </button>

                  <button
                    type="button"
                    onClick={() => toggleCompare(product)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: compared ? '#3b82f6' : '#9ca3af',
                      fontSize: '13px',
                      fontWeight: '600',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    <BsArrowLeftRight /> Compare
                  </button>
                </div>

                <Link
                  to={`/product/${product.id}`}
                  onClick={onClose}
                  style={{
                    fontSize: '13px',
                    fontWeight: '700',
                    color: '#D51E0B',
                    textDecoration: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px'
                  }}
                >
                  View Full Details <FiExternalLink size={14} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes scaleUp {
          from { opacity: 0; transform: translate(-50%, -48%) scale(0.95); }
          to { opacity: 1; transform: translate(-50%, -50%) scale(1); }
        }
      `}</style>
    </>
  );
};

export default QuickViewModal;
