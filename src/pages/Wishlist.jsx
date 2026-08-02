import React from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiTrash2, FiChevronRight, FiShoppingBag, FiStar } from 'react-icons/fi';
import useWishlist from '../hooks/useWishlist';
import './Category.css';

const Wishlist = () => {
  const { wishlistItems, wishlistCount, removeFromWishlist, clearWishlist, moveToCart } = useWishlist();

  return (
    <div className="cat" style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb Header */}
      <div className="cat-breadcrumb">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
          <Link to="/" style={{ color: 'var(--text-secondary, #94a3b8)', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight size={14} style={{ color: 'var(--text-muted, #64748b)' }} />
          <span style={{ color: '#D51E0B', fontWeight: '600' }}>My Wishlist</span>
        </div>
      </div>

      {/* Header Strip */}
      <div className="container" style={{ marginTop: '24px', marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '24px 30px',
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(213, 30, 11, 0.12)', color: '#D51E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiHeart size={20} />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0 }}>
                My Wishlist <span style={{ fontSize: '16px', color: '#D51E0B', fontWeight: '700' }}>({wishlistCount} Saved Items)</span>
              </h1>
            </div>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
              Your saved tech products, favorite gear, and dream hardware specifications
            </p>
          </div>

          {wishlistCount > 0 && (
            <button
              type="button"
              onClick={clearWishlist}
              style={{
                padding: '10px 18px',
                backgroundColor: 'rgba(239, 68, 68, 0.1)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.25)',
                borderRadius: '10px',
                fontWeight: '700',
                fontSize: '13px',
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                transition: 'all 0.2s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#ef4444';
                e.currentTarget.style.color = '#ffffff';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                e.currentTarget.style.color = '#ef4444';
              }}
            >
              <FiTrash2 size={16} /> Clear Wishlist
            </button>
          )}
        </div>
      </div>

      <div className="container">
        {wishlistCount === 0 ? (
          /* Empty State Illustration View */
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'var(--bg-secondary, #0c1c28)',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: 'rgba(213, 30, 11, 0.1)',
                color: '#D51E0B',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 0 40px rgba(213, 30, 11, 0.15)'
              }}
            >
              <FiHeart size={48} />
            </div>
            <h2 style={{ color: 'var(--text-primary, #ffffff)', fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>
              Your Wishlist is Empty
            </h2>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '28px' }}>
              You haven't saved any tech products yet. Browse our high-performance laptops, PC components, and accessories, then click the heart icon to save items here!
            </p>
            <Link
              to="/category/component"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                padding: '14px 28px',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '15px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(213, 30, 11, 0.3)',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease'
              }}
            >
              <FiShoppingBag size={18} /> Explore Tech Products
            </Link>
          </div>
        ) : (
          /* Grid of Wishlist Product Cards */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {wishlistItems.map((prod) => {
              const stockStatus = prod.stock || 'In Stock';
              const isOutOfStock = stockStatus === 'Out of Stock';

              return (
                <div
                  key={prod.id}
                  style={{
                    backgroundColor: 'var(--bg-secondary, #0c1c28)',
                    border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                    borderRadius: '16px',
                    padding: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    boxShadow: '0 10px 24px rgba(0,0,0,0.12)',
                    transition: 'transform 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-4px)';
                    e.currentTarget.style.borderColor = 'rgba(213, 30, 11, 0.3)';
                    e.currentTarget.style.boxShadow = '0 16px 36px rgba(0,0,0,0.2)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.borderColor = 'var(--border-color, rgba(255,255,255,0.08))';
                    e.currentTarget.style.boxShadow = '0 10px 24px rgba(0,0,0,0.12)';
                  }}
                >
                  {/* Remove Button */}
                  <button
                    type="button"
                    onClick={() => removeFromWishlist(prod.id)}
                    title="Remove from Wishlist"
                    style={{
                      position: 'absolute',
                      top: '14px',
                      right: '14px',
                      background: 'rgba(239, 68, 68, 0.1)',
                      border: '1px solid rgba(239, 68, 68, 0.2)',
                      color: '#ef4444',
                      borderRadius: '50%',
                      width: '34px',
                      height: '34px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      zIndex: 2,
                      transition: 'all 0.18s ease'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = '#ef4444';
                      e.currentTarget.style.color = '#ffffff';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                      e.currentTarget.style.color = '#ef4444';
                    }}
                  >
                    <FiTrash2 size={15} />
                  </button>

                  {/* Product Image */}
                  <Link to={`/product/${prod.id}`} style={{ display: 'block', textAlign: 'center', padding: '12px 0 20px 0' }}>
                    <img
                      src={prod.thumbnail || (prod.images && prod.images[0])}
                      alt={prod.name}
                      style={{ height: '160px', width: '100%', objectFit: 'contain', transition: 'transform 0.3s ease' }}
                    />
                  </Link>

                  {/* Brand & Rating Badge */}
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '11px', fontWeight: '800', color: '#D51E0B', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                      {prod.brand}
                    </span>
                    <span style={{ fontSize: '11px', fontWeight: '700', color: '#f59e0b', display: 'flex', alignItems: 'center', gap: '3px' }}>
                      <FiStar size={12} fill="#f59e0b" /> {prod.rating || 4.8}
                    </span>
                  </div>

                  {/* Product Name */}
                  <Link
                    to={`/product/${prod.id}`}
                    style={{
                      color: 'var(--text-primary, #ffffff)',
                      fontWeight: '700',
                      fontSize: '14.5px',
                      lineHeight: 1.4,
                      textDecoration: 'none',
                      marginBottom: '16px',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {prod.name}
                  </Link>

                  {/* Price & Stock Row */}
                  <div style={{ marginTop: 'auto', paddingTop: '14px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.06))', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: '16px' }}>
                    <div>
                      <span style={{ fontSize: '20px', fontWeight: '900', color: 'var(--text-primary, #ffffff)' }}>
                        ৳{(prod.selling_price || prod.price).toLocaleString('en-IN')}
                      </span>
                      {prod.oldPrice > (prod.selling_price || prod.price) && (
                        <span style={{ fontSize: '12px', color: 'var(--text-muted, #94a3b8)', textDecoration: 'line-through', marginLeft: '6px' }}>
                          ৳{prod.oldPrice.toLocaleString('en-IN')}
                        </span>
                      )}
                    </div>

                    <span
                      style={{
                        fontSize: '11px',
                        fontWeight: '700',
                        padding: '3px 8px',
                        borderRadius: '99px',
                        backgroundColor: isOutOfStock ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        color: isOutOfStock ? '#ef4444' : '#22c55e',
                        border: `1px solid ${isOutOfStock ? 'rgba(239, 68, 68, 0.3)' : 'rgba(34, 197, 94, 0.3)'}`
                      }}
                    >
                      {stockStatus}
                    </span>
                  </div>

                  {/* Move to Cart Action Button */}
                  <button
                    type="button"
                    onClick={() => moveToCart(prod)}
                    disabled={isOutOfStock}
                    style={{
                      padding: '12px',
                      backgroundColor: isOutOfStock ? 'rgba(255,255,255,0.08)' : '#D51E0B',
                      color: isOutOfStock ? 'var(--text-muted, #94a3b8)' : '#ffffff',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '10px',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: '8px',
                      cursor: isOutOfStock ? 'not-allowed' : 'pointer',
                      transition: 'background-color 0.2s ease, transform 0.15s ease',
                      boxShadow: isOutOfStock ? 'none' : '0 4px 14px rgba(213, 30, 11, 0.25)'
                    }}
                  >
                    <FiShoppingCart size={16} /> {isOutOfStock ? 'Out of Stock' : 'Move to Cart'}
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Wishlist;
