import React from 'react';
import { FiX, FiShoppingBag, FiMapPin } from 'react-icons/fi';

const AdminOrderModal = ({ isOpen, onClose, order, onUpdateStatus }) => {
  if (!isOpen || !order) return null;

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 99990, backdropFilter: 'blur(6px)' }} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '620px',
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '30px',
          borderRadius: '20px',
          zIndex: 99999,
          color: '#ffffff',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '14px' }}>
          <div>
            <h3 style={{ margin: '0 0 2px 0', fontSize: '20px', fontWeight: '800', color: '#D51E0B' }}>
              Order Inspection #{order.orderId}
            </h3>
            <span style={{ fontSize: '12px', color: '#94a3b8' }}>
              Placed on {new Date(order.createdAt).toLocaleString()}
            </span>
          </div>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            <FiX size={22} />
          </button>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', maxHeight: '70vh', overflowY: 'auto' }}>
          {/* Customer & Shipping Summary */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiMapPin style={{ color: '#D51E0B' }} /> Shipping Details
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8' }}>
              <div><strong style={{ color: '#fff' }}>Recipient:</strong> {order.shippingAddress?.fullName || 'Customer'}</div>
              <div><strong style={{ color: '#fff' }}>Phone:</strong> {order.shippingAddress?.phone || '+880 1712-345678'}</div>
              <div><strong style={{ color: '#fff' }}>Address:</strong> {order.shippingAddress?.address}, {order.shippingAddress?.city}</div>
            </div>
          </div>

          {/* Purchased Items List */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiShoppingBag style={{ color: '#3b82f6' }} /> Order Items ({order.items?.length || 0})
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {order.items?.map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 14px', borderRadius: '10px', backgroundColor: '#081621' }}>
                  <img src={item.thumbnail} alt="" style={{ width: '42px', height: '42px', objectFit: 'contain', borderRadius: '6px' }} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                      {item.name}
                    </div>
                    <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                      Quantity: {item.quantity} × ৳{item.price.toLocaleString('en-IN')}
                    </div>
                  </div>
                  <strong style={{ color: '#ffffff', fontSize: '14px' }}>
                    ৳{(item.quantity * item.price).toLocaleString('en-IN')}
                  </strong>
                </div>
              ))}
            </div>
          </div>

          {/* Fulfillment Status Switcher */}
          <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.06)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <div style={{ fontSize: '13.5px', fontWeight: '800', color: '#ffffff' }}>
              Update Order Status:
            </div>
            <select
              value={order.orderStatus || 'Processing'}
              onChange={(e) => {
                onUpdateStatus(order.orderId, e.target.value);
                onClose();
              }}
              style={{
                padding: '8px 14px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#0c1c28',
                color: '#ffffff',
                fontSize: '13px',
                fontWeight: '800',
                outline: 'none',
                cursor: 'pointer'
              }}
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Delivered">Delivered</option>
              <option value="Cancelled">Cancelled</option>
            </select>
          </div>
        </div>
      </div>
    </>
  );
};

export default AdminOrderModal;
