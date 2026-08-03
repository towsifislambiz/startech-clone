import React, { useState } from 'react';
import { FiPrinter, FiShoppingBag, FiRefreshCw, FiCheckCircle, FiClock, FiXCircle } from 'react-icons/fi';
import InvoiceModal from '../Checkout/InvoiceModal';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const DashboardOrders = ({ orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const { addItem } = useCart();
  const { showSuccess } = useNotification();

  const handleOpenInvoice = (order) => {
    setSelectedOrder(order);
    setInvoiceOpen(true);
  };

  const handleReorder = (order) => {
    if (order.items && order.items.length > 0) {
      order.items.forEach((item) => {
        addItem(
          {
            id: item.productId || item.id,
            name: item.name,
            price: item.price,
            featured_image: item.thumbnail
          },
          item.quantity
        );
      });
      showSuccess(`Reordered ${order.items.length} items to your Cart!`);
    }
  };

  const getStatusBadge = (statusStr) => {
    const s = (statusStr || 'Processing').toLowerCase();
    if (s === 'delivered') {
      return { bg: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', border: 'rgba(34, 197, 94, 0.3)', icon: FiCheckCircle, text: 'Delivered' };
    }
    if (s === 'pending') {
      return { bg: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b', border: 'rgba(245, 158, 11, 0.3)', icon: FiClock, text: 'Pending' };
    }
    if (s === 'cancelled') {
      return { bg: 'rgba(239, 68, 68, 0.15)', color: '#ef4444', border: 'rgba(239, 68, 68, 0.3)', icon: FiXCircle, text: 'Cancelled' };
    }
    return { bg: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6', border: 'rgba(59, 130, 246, 0.3)', icon: FiRefreshCw, text: 'Processing' };
  };

  return (
    <div
      style={{
        backgroundColor: '#0c1c28',
        border: '1px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '20px',
        padding: '28px',
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
        boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
            My Orders History
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Track active shipments, view invoices, or reorder previous tech purchases
          </p>
        </div>
        <span style={{ fontSize: '12px', fontWeight: '800', backgroundColor: '#D51E0B', color: '#ffffff', padding: '4px 12px', borderRadius: '12px' }}>
          {orders.length} Total
        </span>
      </div>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#94a3b8' }}>
          <FiShoppingBag size={54} style={{ opacity: 0.3, marginBottom: '16px', color: '#D51E0B' }} />
          <h4 style={{ color: '#ffffff', fontSize: '18px', fontWeight: '800', margin: '0 0 6px 0' }}>No Orders Found</h4>
          <p style={{ fontSize: '13.5px', margin: 0 }}>You haven't placed any orders yet. Explore StarTech tech catalog to make your first purchase!</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {orders.map((order) => {
            const badge = getStatusBadge(order.orderStatus);
            const StatusIcon = badge.icon;

            return (
              <div
                key={order.orderId}
                style={{
                  backgroundColor: '#081621',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  borderRadius: '16px',
                  padding: '20px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '16px',
                  boxShadow: '0 10px 24px rgba(0, 0, 0, 0.2)'
                }}
              >
                {/* Order Header Bar */}
                <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '14px', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '15px', fontWeight: '900', color: '#D51E0B', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      #{order.orderId}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '2px' }}>
                      Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                    </div>
                  </div>

                  <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                    <span
                      style={{
                        fontSize: '12px',
                        fontWeight: '800',
                        backgroundColor: badge.bg,
                        color: badge.color,
                        border: `1px solid ${badge.border}`,
                        padding: '5px 12px',
                        borderRadius: '8px',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <StatusIcon size={14} /> {badge.text}
                    </span>

                    <button
                      type="button"
                      onClick={() => handleOpenInvoice(order)}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: 'rgba(255, 255, 255, 0.08)',
                        color: '#ffffff',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.12)',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FiPrinter size={15} /> Invoice
                    </button>

                    <button
                      type="button"
                      onClick={() => handleReorder(order)}
                      style={{
                        padding: '8px 14px',
                        backgroundColor: '#D51E0B',
                        color: '#ffffff',
                        borderRadius: '8px',
                        border: 'none',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 4px 14px rgba(213, 30, 11, 0.35)'
                      }}
                    >
                      <FiRefreshCw size={15} /> Reorder
                    </button>
                  </div>
                </div>

                {/* Items Summary List */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {order.items?.map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px', fontSize: '13.5px' }}>
                      <img src={item.thumbnail} alt="" style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }} />
                      <div style={{ flex: 1, minWidth: 0, color: '#ffffff', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {item.name}
                      </div>
                      <div style={{ color: '#94a3b8', fontWeight: '700' }}>
                        {item.quantity} × ৳{item.price.toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Order Footer */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '12px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '13.5px' }}>
                  <div style={{ color: '#94a3b8' }}>
                    Payment Method: <span style={{ color: '#22c55e', fontWeight: '700' }}>{order.paymentMethod || 'Cash on Delivery'}</span>
                  </div>
                  <div>
                    Grand Total: <strong style={{ color: '#ffffff', fontSize: '17px', marginLeft: '6px' }}>৳{(order.totals?.grandTotal || 0).toLocaleString('en-IN')}</strong>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Invoice Modal Trigger */}
      <InvoiceModal
        order={selectedOrder}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
};

export default DashboardOrders;
