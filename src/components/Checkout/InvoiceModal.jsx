import React from 'react';
import { FiPrinter, FiX, FiZap } from 'react-icons/fi';

const InvoiceModal = ({ order, isOpen = false, onClose }) => {
  if (!isOpen || !order) return null;

  const handlePrint = () => {
    window.print();
  };

  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  return (
    <>
      {/* Backdrop */}
      <div
        className="no-print"
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(4px)',
          zIndex: 99990
        }}
      />

      {/* Printable Invoice Container */}
      <div
        id="printable-invoice"
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '750px',
          maxHeight: '90vh',
          backgroundColor: '#ffffff',
          color: '#1f2937',
          borderRadius: '12px',
          boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
          zIndex: 99999,
          overflowY: 'auto',
          padding: '36px',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Controls Header (Hidden during print) */}
        <div className="no-print" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '24px', borderBottom: '1px solid #e5e7eb', paddingBottom: '12px' }}>
          <button
            type="button"
            onClick={handlePrint}
            style={{
              padding: '8px 16px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '700',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}
          >
            <FiPrinter /> Print / Save PDF Invoice
          </button>

          <button
            type="button"
            onClick={onClose}
            style={{ background: 'none', border: 'none', color: '#6b7280', cursor: 'pointer' }}
          >
            <FiX size={22} />
          </button>
        </div>

        {/* Invoice Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '2px solid #ef4444', paddingBottom: '20px', marginBottom: '24px' }}>
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '24px', fontWeight: '900', color: '#081621' }}>
              <span style={{ color: '#D51E0B' }}><FiZap /></span> StarTech Ltd.
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280', marginTop: '4px' }}>
              Head Office: 6th Floor, Multiplan Center, Elephant Road, Dhaka-1205<br />
              Hotline: 16793 | Email: support@startech.com.bd
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h2 style={{ margin: 0, fontSize: '20px', color: '#D51E0B', textTransform: 'uppercase' }}>INVOICE</h2>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#111827', marginTop: '4px' }}>
              #{order.orderId}
            </div>
            <div style={{ fontSize: '12px', color: '#6b7280' }}>Date: {formattedDate}</div>
          </div>
        </div>

        {/* Customer & Address Details */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '24px', fontSize: '13px' }}>
          <div>
            <h4 style={{ margin: '0 0 6px 0', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase' }}>Billed / Shipped To:</h4>
            <strong style={{ fontSize: '15px', color: '#111827' }}>
              {order.customer.firstName} {order.customer.lastName}
            </strong>
            <div>Phone: {order.customer.phone}</div>
            <div>Email: {order.customer.email}</div>
            <div style={{ marginTop: '4px' }}>
              {order.shippingAddress.address}, {order.shippingAddress.city}, {order.shippingAddress.division} {order.shippingAddress.postalCode}
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <h4 style={{ margin: '0 0 6px 0', color: '#6b7280', fontSize: '11px', textTransform: 'uppercase' }}>Order & Payment Info:</h4>
            <div>Payment Method: <strong>{order.paymentMethod}</strong></div>
            <div>Payment Status: <span style={{ color: '#16a34a', fontWeight: 'bold' }}>{order.paymentStatus}</span></div>
            <div>Delivery Mode: <strong>{order.shippingMethod}</strong></div>
          </div>
        </div>

        {/* Items Table */}
        <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '24px', fontSize: '13px' }}>
          <thead>
            <tr style={{ backgroundColor: '#f3f4f6', borderBottom: '2px solid #e5e7eb' }}>
              <th style={{ padding: '10px', textAlign: 'left' }}>Item Description</th>
              <th style={{ padding: '10px', textAlign: 'center' }}>Qty</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Unit Price</th>
              <th style={{ padding: '10px', textAlign: 'right' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {order.items.map((item, idx) => (
              <tr key={idx} style={{ borderBottom: '1px solid #e5e7eb' }}>
                <td style={{ padding: '10px' }}>
                  <div style={{ fontWeight: '600' }}>{item.name}</div>
                  {item.variant && <small style={{ color: '#6b7280' }}>Variant: {item.variant.name}</small>}
                </td>
                <td style={{ padding: '10px', textAlign: 'center' }}>{item.quantity}</td>
                <td style={{ padding: '10px', textAlign: 'right' }}>৳{item.price.toLocaleString('en-IN')}</td>
                <td style={{ padding: '10px', textAlign: 'right', fontWeight: 'bold' }}>৳{(item.price * item.quantity).toLocaleString('en-IN')}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {/* Pricing Summary */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '24px' }}>
          <div style={{ width: '260px', fontSize: '13px', display: 'flex', flexDirection: 'column', gap: '6px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Subtotal:</span>
              <span>৳{order.totals.subtotal?.toLocaleString('en-IN')}</span>
            </div>
            {order.totals.couponDiscount > 0 && (
              <div style={{ display: 'flex', justifyContent: 'space-between', color: '#16a34a' }}>
                <span>Coupon Discount:</span>
                <span>-৳{order.totals.couponDiscount?.toLocaleString('en-IN')}</span>
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>Shipping Fee:</span>
              <span>৳{order.totals.shippingFee}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ color: '#6b7280' }}>VAT (5%):</span>
              <span>৳{order.totals.vatAmount?.toLocaleString('en-IN')}</span>
            </div>
            <hr style={{ border: 'none', borderTop: '1px solid #e5e7eb', margin: '4px 0' }} />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '16px', fontWeight: '900', color: '#D51E0B' }}>
              <span>Grand Total:</span>
              <span>৳{order.totals.grandTotal?.toLocaleString('en-IN')}</span>
            </div>
          </div>
        </div>

        {/* Footer Note */}
        <div style={{ textAlign: 'center', borderTop: '1px dashed #e5e7eb', paddingTop: '16px', fontSize: '11px', color: '#6b7280' }}>
          Thank you for shopping with StarTech! For any query, please call 16793 or visit www.startech.com.bd.
        </div>
      </div>

      <style>{`
        @media print {
          body * { visibility: hidden; }
          .no-print { display: none !important; }
          #printable-invoice, #printable-invoice * { visibility: visible; }
          #printable-invoice { position: absolute; left: 0; top: 0; transform: none; width: 100%; max-width: 100%; box-shadow: none; padding: 0; }
        }
      `}</style>
    </>
  );
};

export default InvoiceModal;
