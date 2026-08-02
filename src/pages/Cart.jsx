import React from 'react';
import { Link } from 'react-router-dom';
import { FiShoppingCart, FiTrash2, FiChevronRight, FiShoppingBag, FiArrowLeft } from 'react-icons/fi';
import useCartSystem from '../hooks/useCartSystem';
import CouponBox from '../components/Cart/CouponBox';
import CartSummaryCard from '../components/Cart/CartSummaryCard';
import ProductSection from '../components/Product/ProductSection';
import './Category.css';

const Cart = () => {
  const {
    items,
    itemCount,
    totals,
    shippingRegion,
    coupon,
    updateQty,
    removeItem,
    setShippingRegion,
    applyCoupon,
    removeCoupon,
    clearCart,
    proceedToCheckout
  } = useCartSystem();

  return (
    <div className="cat" style={{ paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <span>Shopping Cart</span>
        </div>
      </div>

      {/* Header */}
      <div className="container cat-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1>Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})</h1>
          <p>Review items, apply promo coupons, and choose delivery region</p>
        </div>

        {items.length > 0 && (
          <button
            type="button"
            onClick={clearCart}
            style={{
              padding: '8px 14px',
              backgroundColor: 'rgba(239, 68, 68, 0.1)',
              color: '#ef4444',
              border: '1px solid rgba(239, 68, 68, 0.3)',
              borderRadius: '8px',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FiTrash2 /> Clear Entire Cart
          </button>
        )}
      </div>

      <div className="container">
        {items.length === 0 ? (
          <div>
            <div
              style={{
                textAlign: 'center',
                padding: '70px 20px',
                backgroundColor: 'var(--bg-secondary, #0c1c28)',
                border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                borderRadius: '16px',
                marginBottom: '40px'
              }}
            >
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(213, 30, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#D51E0B' }}>
                <FiShoppingCart size={40} />
              </div>
              <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '800', marginBottom: '8px' }}>
                Your Shopping Cart is Empty
              </h2>
              <p style={{ color: '#9ca3af', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
                Looks like you haven't added any tech gear yet. Explore featured processors, laptops, graphics cards, and accessories below!
              </p>
              <Link to="/category/component" className="btn btn-primary" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <FiShoppingBag /> Continue Shopping
              </Link>
            </div>

            {/* Recommendations for empty cart */}
            <div style={{ textAlign: 'left' }}>
              <ProductSection title="Recommended Tech Gear" type="featured" limit={4} viewAllLink="/category/component" />
            </div>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '30px', alignItems: 'start' }}>
            {/* Left Column: Items Table & Coupon Box */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {items.map((item) => (
                  <div
                    key={item.id}
                    style={{
                      display: 'flex',
                      flexWrap: 'wrap',
                      gap: '16px',
                      padding: '16px',
                      borderRadius: '12px',
                      backgroundColor: 'var(--bg-secondary, #0c1c28)',
                      border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                      alignItems: 'center'
                    }}
                  >
                    {/* Thumbnail */}
                    <img
                      src={item.thumbnail}
                      alt={item.name}
                      style={{ width: '80px', height: '80px', objectFit: 'contain', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.2)', flexShrink: 0 }}
                    />

                    {/* Details */}
                    <div style={{ flex: 1, minWidth: '180px' }}>
                      <div style={{ fontSize: '11px', fontWeight: '800', color: '#D51E0B', textTransform: 'uppercase' }}>
                        {item.brand}
                      </div>
                      <Link to={`/product/${item.productId || item.id}`} style={{ color: '#ffffff', fontWeight: '700', fontSize: '15px', lineHeight: 1.3, textDecoration: 'none', display: 'block', marginTop: '2px' }}>
                        {item.name}
                      </Link>
                      {item.variant && (
                        <div style={{ fontSize: '12px', color: '#3b82f6', fontWeight: '600', marginTop: '2px' }}>
                          Selected Option: {item.variant.name}
                        </div>
                      )}
                      <div style={{ fontSize: '12px', color: item.stock === 'In Stock' ? '#22c55e' : '#ef4444', fontWeight: '600', marginTop: '4px' }}>
                        {item.stock}
                      </div>
                    </div>

                    {/* Unit Price & Line Total */}
                    <div style={{ textAlign: 'right', minWidth: '110px' }}>
                      <div style={{ fontSize: '18px', fontWeight: '900', color: '#ffffff' }}>
                        ৳{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                      <div style={{ fontSize: '12px', color: '#9ca3af' }}>
                        ৳{item.price.toLocaleString('en-IN')} / item
                      </div>
                    </div>

                    {/* Quantity Controls & Remove */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', width: '100%', justifyContent: 'space-between', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
                      <div style={{ display: 'flex', alignItems: 'center', border: '1px solid rgba(255,255,255,0.15)', borderRadius: '6px', overflow: 'hidden' }}>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.quantity - 1)}
                          style={{ padding: '6px 12px', background: 'none', border: 'none', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
                        >-</button>
                        <span style={{ padding: '6px 12px', fontSize: '14px', fontWeight: 'bold', color: '#ffffff' }}>{item.quantity}</span>
                        <button
                          type="button"
                          onClick={() => updateQty(item.id, item.quantity + 1)}
                          style={{ padding: '6px 12px', background: 'none', border: 'none', color: '#ffffff', fontWeight: 'bold', cursor: 'pointer' }}
                        >+</button>
                      </div>

                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        style={{ background: 'none', border: 'none', color: '#ef4444', fontSize: '13px', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      >
                        <FiTrash2 size={14} /> Remove Item
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <CouponBox
                appliedCoupon={coupon}
                onApplyCoupon={applyCoupon}
                onRemoveCoupon={removeCoupon}
              />

              <Link to="/category/component" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D51E0B', fontWeight: '700', fontSize: '14px', textDecoration: 'none', marginTop: '8px' }}>
                <FiArrowLeft /> Continue Shopping & Adding Gear
              </Link>
            </div>

            {/* Right Column: Order Summary Card */}
            <div style={{ position: 'sticky', top: '80px' }}>
              <CartSummaryCard
                totals={totals}
                shippingRegion={shippingRegion}
                onSelectShipping={setShippingRegion}
                onProceedToCheckout={proceedToCheckout}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Cart;
