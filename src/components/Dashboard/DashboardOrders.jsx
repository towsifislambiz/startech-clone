import React, { useState } from 'react';
import { FiPrinter, FiShoppingBag, FiRefreshCw } from 'react-icons/fi';
import InvoiceModal from '../Checkout/InvoiceModal';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const DashboardOrders = ({ orders = [] }) => {
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);
  const { addItem } = useCart();
  const { showNotification } = useNotification();

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
      showNotification(`Reordered ${order.items.length} items to your Cart!`, 'success');
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0c1c28',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        My Orders History ({orders.length})
      </h3>

      {orders.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '60px 20px', color: '#9ca3af' }}>
          <FiShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '12px' }} />
          <h4 style={{ color: '#ffffff', margin: '0 0 4px 0' }}>No Orders Found</h4>
          <p style={{ fontSize: '13px' }}>You haven't placed any orders yet.</p>
        </div>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {orders.map((order) => (
            <div
              key={order.orderId}
              style={{
                backgroundColor: '#081621',
                border: '1px solid rgba(255, 255, 255, 0.08)',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                flexDirection: 'column',
                gap: '12px'
              }}
            >
              {/* Order Header Bar */}
              <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255, 255, 255, 0.06)', paddingBottom: '10px' }}>
                <div>
                  <div style={{ fontSize: '14px', fontWeight: '900', color: '#D51E0B' }}>
                    #{order.orderId}
                  </div>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                    Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                  <span style={{ fontSize: '11px', fontWeight: '800', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e', padding: '4px 10px', borderRadius: '6px' }}>
                    {order.orderStatus || 'Processing'}
                  </span>

                  <button
                    type="button"
                    onClick={() => handleOpenInvoice(order)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: 'rgba(255, 255, 255, 0.1)',
                      color: '#ffffff',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FiPrinter /> Invoice
                  </button>

                  <button
                    type="button"
                    onClick={() => handleReorder(order)}
                    style={{
                      padding: '6px 12px',
                      backgroundColor: '#D51E0B',
                      color: '#ffffff',
                      borderRadius: '6px',
                      border: 'none',
                      fontSize: '12px',
                      fontWeight: '700',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    <FiRefreshCw /> Reorder
                  </button>
                </div>
              </div>

              {/* Items Summary Grid */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {order.items?.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', fontSize: '13px' }}>
                    <img src={item.thumbnail} alt="" style={{ width: '40px', height: '40px', objectFit: 'contain', borderRadius: '4px', backgroundColor: 'rgba(0,0,0,0.2)' }} />
                    <div style={{ flex: 1, minWidth: 0, color: '#ffffff', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ color: '#9ca3af' }}>
                      {item.quantity} × ৳{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Footer Totals */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '8px', borderTop: '1px solid rgba(255, 255, 255, 0.06)', fontSize: '13px' }}>
                <div style={{ color: '#9ca3af' }}>
                  Payment: <span style={{ color: '#22c55e', fontWeight: '700' }}>{order.paymentMethod}</span>
                </div>
                <div>
                  Grand Total: <strong style={{ color: '#ffffff', fontSize: '16px' }}>৳{(order.totals?.grandTotal || 0).toLocaleString('en-IN')}</strong>
                </div>
              </div>
            </div>
          ))}
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
