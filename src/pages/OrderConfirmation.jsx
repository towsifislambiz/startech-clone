import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiCheckCircle, FiPrinter, FiShoppingBag, FiTruck, FiChevronRight } from 'react-icons/fi';
import checkoutService from '../services/checkoutService';
import InvoiceModal from '../components/Checkout/InvoiceModal';
import ProductSection from '../components/Product/ProductSection';
import './Category.css';

const OrderConfirmation = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    const loaded = checkoutService.getOrderById(orderId);
    if (loaded) {
      setOrder(loaded);
      document.title = `Order #${orderId} Confirmed | StarTech`;
    }
  }, [orderId]);

  if (!order) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '12px' }}>Order Confirmation</h2>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Loading order details for #{orderId}...</p>
        <Link to="/" className="btn btn-primary">Return to Home</Link>
      </div>
    );
  }

  return (
    <div className="cat" style={{ paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <span>Order Confirmation</span>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '850px' }}>
        {/* Success Banner Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid rgba(34, 197, 94, 0.3)',
            borderRadius: '16px',
            padding: '32px',
            textAlign: 'center',
            marginBottom: '30px'
          }}
        >
          <div
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              backgroundColor: 'rgba(34, 197, 94, 0.15)',
              color: '#22c55e',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 16px auto'
            }}
          >
            <FiCheckCircle size={44} />
          </div>

          <h1 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '900', marginBottom: '6px' }}>
            Thank You! Your Order is Confirmed
          </h1>
          <p style={{ color: '#9ca3af', fontSize: '14px', marginBottom: '16px' }}>
            Order ID: <strong style={{ color: '#D51E0B' }}>#{order.orderId}</strong>
          </p>
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', padding: '6px 16px', borderRadius: '99px', backgroundColor: 'rgba(34, 197, 94, 0.12)', color: '#22c55e', fontSize: '13px', fontWeight: '700' }}>
            <FiTruck /> Estimated Delivery: 2–4 Business Days
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginTop: '24px' }}>
            <button
              type="button"
              onClick={() => setInvoiceOpen(true)}
              style={{
                padding: '10px 20px',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '13px',
                borderRadius: '8px',
                border: 'none',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FiPrinter /> Print / Save Invoice
            </button>

            <Link
              to="/category/component"
              style={{
                padding: '10px 20px',
                backgroundColor: 'rgba(255,255,255,0.1)',
                color: '#ffffff',
                fontWeight: '700',
                fontSize: '13px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FiShoppingBag /> Continue Shopping
            </Link>
          </div>
        </div>

        {/* Order Details Breakdown Card */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            borderRadius: '16px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '20px'
          }}
        >
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
            Order Details Breakdown
          </h3>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', fontSize: '13px', color: '#ffffff' }}>
            <div>
              <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Customer Info</div>
              <strong style={{ display: 'block', marginTop: '4px' }}>{order.customer.firstName} {order.customer.lastName}</strong>
              <div>{order.customer.email}</div>
              <div>{order.customer.phone}</div>
            </div>

            <div>
              <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Shipping Address</div>
              <div style={{ marginTop: '4px' }}>{order.shippingAddress.address}</div>
              <div>{order.shippingAddress.city}, {order.shippingAddress.division} {order.shippingAddress.postalCode}</div>
            </div>

            <div>
              <div style={{ color: '#9ca3af', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase' }}>Payment Method</div>
              <strong style={{ display: 'block', marginTop: '4px' }}>{order.paymentMethod}</strong>
              <div style={{ color: '#22c55e', fontWeight: '700' }}>{order.paymentStatus}</div>
            </div>
          </div>

          {/* Ordered Items List */}
          <div style={{ marginTop: '8px' }}>
            <div style={{ fontSize: '13px', fontWeight: '700', color: '#9ca3af', marginBottom: '8px' }}>Purchased Items</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.items.map((item) => (
                <div key={item.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', padding: '10px', backgroundColor: '#081621', borderRadius: '8px' }}>
                  <img src={item.thumbnail} alt="" style={{ width: '44px', height: '44px', objectFit: 'contain' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>{item.name}</div>
                    <div style={{ fontSize: '11px', color: '#9ca3af' }}>Qty: {item.quantity} × ৳{item.price.toLocaleString('en-IN')}</div>
                  </div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff' }}>
                    ৳{(item.price * item.quantity).toLocaleString('en-IN')}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pricing Totals Box */}
          <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'flex-end', fontSize: '13px', color: '#ffffff' }}>
            <div>Subtotal: <strong>৳{order.totals.subtotal?.toLocaleString('en-IN')}</strong></div>
            {order.totals.couponDiscount > 0 && <div style={{ color: '#22c55e' }}>Coupon Discount: -৳{order.totals.couponDiscount?.toLocaleString('en-IN')}</div>}
            <div>Shipping Fee: <strong>৳{order.totals.shippingFee}</strong></div>
            <div>VAT (5%): <strong>৳{order.totals.vatAmount?.toLocaleString('en-IN')}</strong></div>
            <div style={{ fontSize: '18px', fontWeight: '900', color: '#D51E0B', marginTop: '4px' }}>
              Grand Total: ৳{order.totals.grandTotal?.toLocaleString('en-IN')}
            </div>
          </div>
        </div>

        {/* Dynamic Recommendations */}
        <div style={{ marginTop: '40px', textAlign: 'left' }}>
          <ProductSection title="You Might Also Like" type="trending" limit={4} viewAllLink="/category/component" />
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={order}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
};

export default OrderConfirmation;
