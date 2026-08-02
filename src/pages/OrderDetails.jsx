import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiPrinter, FiRefreshCw, FiXCircle, FiChevronRight, FiMapPin, FiCreditCard, FiArrowLeft } from 'react-icons/fi';
import useOrders from '../hooks/useOrders';
import OrderStatusTracker from '../components/Orders/OrderStatusTracker';
import InvoiceModal from '../components/Checkout/InvoiceModal';
import './Category.css';

const OrderDetails = () => {
  const { id } = useParams();
  const { currentOrder, loading, error, loadOrderDetails, cancelOrder, reorderItems } = useOrders();
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  useEffect(() => {
    if (id) {
      loadOrderDetails(id);
    }
  }, [id, loadOrderDetails]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center', color: '#9ca3af' }}>
        Loading Order Details...
      </div>
    );
  }

  if (error || !currentOrder) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <h2 style={{ color: '#ffffff', marginBottom: '12px' }}>Order Not Found</h2>
        <p style={{ color: '#9ca3af', marginBottom: '24px' }}>Could not find details for Order #{id}.</p>
        <Link to="/account/orders" className="btn btn-primary">Back to Orders</Link>
      </div>
    );
  }

  const isCancellable = currentOrder.status === 'Pending' || currentOrder.status === 'Confirmed' || currentOrder.orderStatus === 'Pending';

  return (
    <div className="cat" style={{ paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <Link to="/account/orders">Orders</Link> <FiChevronRight />
          <span>Order #{currentOrder.orderId}</span>
        </div>
      </div>

      <div className="container" style={{ maxWidth: '900px' }}>
        {/* Header Action Bar */}
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', gap: '12px' }}>
          <div>
            <Link to="/account/orders" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: '#D51E0B', fontWeight: '700', fontSize: '13px', textDecoration: 'none', marginBottom: '4px' }}>
              <FiArrowLeft /> Back to All Orders
            </Link>
            <h1 style={{ margin: 0, fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>
              Order #{currentOrder.orderId}
            </h1>
            <div style={{ fontSize: '12px', color: '#9ca3af' }}>
              Placed on {new Date(currentOrder.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' })}
            </div>
          </div>

          <div style={{ display: 'flex', gap: '8px' }}>
            <button
              type="button"
              onClick={() => setInvoiceOpen(true)}
              style={{ padding: '8px 16px', backgroundColor: 'rgba(255,255,255,0.1)', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FiPrinter /> Print Invoice
            </button>

            <button
              type="button"
              onClick={() => reorderItems(currentOrder.items)}
              style={{ padding: '8px 16px', backgroundColor: '#D51E0B', color: '#ffffff', borderRadius: '8px', border: 'none', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
            >
              <FiRefreshCw /> Buy Again
            </button>

            {isCancellable && (
              <button
                type="button"
                onClick={() => cancelOrder(currentOrder.orderId)}
                style={{ padding: '8px 16px', backgroundColor: 'rgba(239,68,68,0.12)', color: '#ef4444', borderRadius: '8px', border: '1px solid rgba(239,68,68,0.3)', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
              >
                <FiXCircle /> Cancel Order
              </button>
            )}
          </div>
        </div>

        {/* Status Tracker Bar */}
        <OrderStatusTracker currentStatus={currentOrder.status || currentOrder.orderStatus} />

        {/* Customer & Delivery Information Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px', marginBottom: '24px' }}>
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#D51E0B', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FiMapPin /> Shipping Address
            </div>
            <strong style={{ color: '#ffffff', fontSize: '14px', display: 'block' }}>
              {currentOrder.customer?.firstName} {currentOrder.customer?.lastName}
            </strong>
            <div style={{ fontSize: '13px', color: '#9ca3af', marginTop: '2px' }}>
              {currentOrder.shippingAddress?.address}
            </div>
            <div style={{ fontSize: '13px', color: '#9ca3af' }}>
              {currentOrder.shippingAddress?.city}, {currentOrder.shippingAddress?.division} {currentOrder.shippingAddress?.postalCode}
            </div>
            <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '4px' }}>Phone: {currentOrder.customer?.phone}</div>
          </div>

          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.08)' }}>
            <div style={{ fontSize: '12px', fontWeight: '800', color: '#3b82f6', textTransform: 'uppercase', marginBottom: '6px', display: 'flex', alignItems: 'center', gap: '6px' }}>
              <FiCreditCard /> Payment & Delivery Mode
            </div>
            <div style={{ fontSize: '13px', color: '#ffffff' }}>Method: <strong>{currentOrder.paymentMethod}</strong></div>
            <div style={{ fontSize: '13px', color: '#22c55e', fontWeight: '700', marginTop: '2px' }}>Status: {currentOrder.paymentStatus}</div>
            <div style={{ fontSize: '13px', color: '#ffffff', marginTop: '4px' }}>Mode: <strong>{currentOrder.shippingMethod}</strong></div>
          </div>
        </div>

        {/* Purchased Items List */}
        <div style={{ backgroundColor: '#0c1c28', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '20px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: '0 0 16px 0', borderBottom: '1px solid rgba(255,255,255,0.08)', paddingBottom: '10px' }}>
            Purchased Products ({currentOrder.items?.length})
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {currentOrder.items?.map((item, idx) => (
              <div key={idx} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '12px', backgroundColor: '#081621', borderRadius: '8px' }}>
                <img src={item.thumbnail} alt="" style={{ width: '60px', height: '60px', objectFit: 'contain', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.2)' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Link to={`/product/${item.productId || item.id}`} style={{ color: '#ffffff', fontWeight: '700', fontSize: '14px', textDecoration: 'none', display: 'block' }}>
                    {item.name}
                  </Link>
                  {item.variant && <div style={{ fontSize: '11px', color: '#3b82f6', fontWeight: '600' }}>Variant: {item.variant.name}</div>}
                  <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                    ৳{item.price?.toLocaleString('en-IN')} × {item.quantity}
                  </div>
                </div>
                <div style={{ fontSize: '16px', fontWeight: '900', color: '#ffffff' }}>
                  ৳{(item.price * item.quantity).toLocaleString('en-IN')}
                </div>
              </div>
            ))}
          </div>

          {/* Pricing Totals Breakdown */}
          <div style={{ marginTop: '20px', borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '16px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-end', fontSize: '14px', color: '#ffffff' }}>
            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '30px' }}>
              <span style={{ color: '#9ca3af' }}>Subtotal:</span>
              <span>৳{currentOrder.totals?.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            {currentOrder.totals?.couponDiscount > 0 && (
              <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '30px', color: '#22c55e' }}>
                <span>Coupon Discount:</span>
                <span>-৳{currentOrder.totals?.couponDiscount?.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '30px' }}>
              <span style={{ color: '#9ca3af' }}>Shipping Fee:</span>
              <span>৳{currentOrder.totals?.shippingFee}</span>
            </div>
            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '30px' }}>
              <span style={{ color: '#9ca3af' }}>VAT (5%):</span>
              <span>৳{currentOrder.totals?.vatAmount?.toLocaleString('en-IN')}</span>
            </div>
            <div style={{ display: 'flex', justifySelf: 'flex-end', gap: '30px', fontSize: '20px', fontWeight: '900', color: '#D51E0B', marginTop: '6px' }}>
              <span>Grand Total:</span>
              <span>৳{currentOrder.totals?.grandTotal?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Invoice Modal */}
      <InvoiceModal
        order={currentOrder}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
};

export default OrderDetails;
