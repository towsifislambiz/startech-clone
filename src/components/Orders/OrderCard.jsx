import React from 'react';
import { Link } from 'react-router-dom';
import { FiEye, FiPrinter, FiRefreshCw, FiXCircle } from 'react-icons/fi';

const STATUS_COLORS = {
  Pending: { bg: 'rgba(234, 179, 8, 0.15)', text: '#eab308' },
  Confirmed: { bg: 'rgba(59, 130, 246, 0.15)', text: '#3b82f6' },
  Processing: { bg: 'rgba(168, 85, 247, 0.15)', text: '#a855f7' },
  Packed: { bg: 'rgba(14, 165, 233, 0.15)', text: '#0ea5e9' },
  Shipped: { bg: 'rgba(249, 115, 22, 0.15)', text: '#f97316' },
  'Out for Delivery': { bg: 'rgba(236, 72, 153, 0.15)', text: '#ec4899' },
  Delivered: { bg: 'rgba(34, 197, 94, 0.15)', text: '#22c55e' },
  Cancelled: { bg: 'rgba(239, 68, 68, 0.15)', text: '#ef4444' }
};

const OrderCard = ({ order, onCancelOrder, onReorder, onOpenInvoice }) => {
  const statusInfo = STATUS_COLORS[order.status || order.orderStatus] || STATUS_COLORS.Pending;
  const isCancellable = order.status === 'Pending' || order.status === 'Confirmed' || order.orderStatus === 'Pending';

  return (
    <div
      style={{
        backgroundColor: '#0c1c28',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        gap: '14px',
        transition: 'all 0.2s ease'
      }}
    >
      {/* Header */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '10px' }}>
        <div>
          <div style={{ fontSize: '15px', fontWeight: '900', color: '#D51E0B' }}>
            #{order.orderId}
          </div>
          <div style={{ fontSize: '12px', color: '#9ca3af' }}>
            Placed on {new Date(order.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          <span
            style={{
              fontSize: '11px',
              fontWeight: '800',
              backgroundColor: statusInfo.bg,
              color: statusInfo.text,
              padding: '4px 10px',
              borderRadius: '6px',
              textTransform: 'uppercase'
            }}
          >
            {order.status || order.orderStatus || 'Pending'}
          </span>
          <span style={{ fontSize: '11px', fontWeight: '700', backgroundColor: 'rgba(255, 255, 255, 0.08)', color: '#ffffff', padding: '4px 8px', borderRadius: '6px' }}>
            {order.items?.length || 1} Item(s)
          </span>
        </div>
      </div>

      {/* Items Preview */}
      <div style={{ display: 'flex', gap: '10px', overflowX: 'auto', padding: '4px 0' }}>
        {order.items?.map((item, idx) => (
          <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '8px', backgroundColor: '#081621', padding: '6px 10px', borderRadius: '8px', minWidth: '160px', flexShrink: 0 }}>
            <img src={item.thumbnail} alt="" style={{ width: '36px', height: '36px', objectFit: 'contain', borderRadius: '4px' }} />
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: '12px', color: '#ffffff', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {item.name}
              </div>
              <div style={{ fontSize: '10px', color: '#9ca3af' }}>
                {item.quantity}x ৳{item.price?.toLocaleString('en-IN')}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer & Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)', gap: '10px' }}>
        <div>
          <span style={{ fontSize: '12px', color: '#9ca3af' }}>Total Amount: </span>
          <strong style={{ fontSize: '16px', color: '#ffffff' }}>
            ৳{(order.totals?.grandTotal || 0).toLocaleString('en-IN')}
          </strong>
        </div>

        <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
          <Link
            to={`/account/orders/${order.orderId}`}
            style={{
              padding: '6px 12px',
              backgroundColor: 'rgba(255, 255, 255, 0.1)',
              color: '#ffffff',
              borderRadius: '6px',
              fontSize: '12px',
              fontWeight: '700',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              gap: '4px'
            }}
          >
            <FiEye /> View Details
          </Link>

          <button
            type="button"
            onClick={() => onOpenInvoice(order)}
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
            onClick={() => onReorder(order.items)}
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
            <FiRefreshCw /> Buy Again
          </button>

          {isCancellable && (
            <button
              type="button"
              onClick={() => onCancelOrder(order.orderId)}
              style={{
                padding: '6px 12px',
                backgroundColor: 'rgba(239, 68, 68, 0.12)',
                color: '#ef4444',
                borderRadius: '6px',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                fontSize: '12px',
                fontWeight: '700',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '4px'
              }}
            >
              <FiXCircle /> Cancel
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default React.memo(OrderCard);
