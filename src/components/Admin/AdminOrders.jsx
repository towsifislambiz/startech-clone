import React, { useState } from 'react';
import { FiShoppingBag, FiSearch, FiPrinter, FiEye, FiCheckCircle, FiClock, FiXCircle, FiRefreshCw } from 'react-icons/fi';
import InvoiceModal from '../Checkout/InvoiceModal';

const AdminOrders = ({ orders = [], onUpdateStatus, onOpenOrderModal }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState(null);
  const [invoiceOpen, setInvoiceOpen] = useState(false);

  const filteredOrders = orders.filter((o) => {
    const matchesSearch =
      o.orderId?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.items?.some((i) => i.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || (o.orderStatus || 'Processing').toLowerCase() === statusFilter.toLowerCase();
    return matchesSearch && matchesStatus;
  });

  const getStatusStyle = (statusStr) => {
    const s = (statusStr || 'Processing').toLowerCase();
    if (s === 'delivered') return { color: '#22c55e', bg: 'rgba(34, 197, 94, 0.15)', icon: FiCheckCircle };
    if (s === 'pending') return { color: '#f59e0b', bg: 'rgba(245, 158, 11, 0.15)', icon: FiClock };
    if (s === 'cancelled') return { color: '#ef4444', bg: 'rgba(239, 68, 68, 0.15)', icon: FiXCircle };
    return { color: '#3b82f6', bg: 'rgba(59, 130, 246, 0.15)', icon: FiRefreshCw };
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
      {/* Header Bar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiShoppingBag style={{ color: '#D51E0B' }} /> System Orders & Fulfillment Center ({orders.length})
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Inspect customer purchase orders, update shipment statuses, and generate official invoices
          </p>
        </div>

        {/* Filter Controls */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px', alignItems: 'center' }}>
          <div style={{ position: 'relative', width: '220px' }}>
            <FiSearch style={{ position: 'absolute', left: '12px', top: '12px', color: '#64748b' }} size={15} />
            <input
              type="text"
              placeholder="Search by Order ID..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                width: '100%',
                padding: '9px 12px 9px 36px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            style={{
              padding: '9px 12px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: '#081621',
              color: '#ffffff',
              fontSize: '13px',
              fontWeight: '700',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            <option value="all">All Statuses</option>
            <option value="pending">Pending</option>
            <option value="processing">Processing</option>
            <option value="delivered">Delivered</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      {/* Orders Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
              <th style={{ padding: '14px 10px' }}>Order ID</th>
              <th style={{ padding: '14px 10px' }}>Date</th>
              <th style={{ padding: '14px 10px' }}>Items</th>
              <th style={{ padding: '14px 10px' }}>Total Amount</th>
              <th style={{ padding: '14px 10px' }}>Fulfillment Status</th>
              <th style={{ padding: '14px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((o) => {
              const statusObj = getStatusStyle(o.orderStatus);

              return (
                <tr key={o.orderId} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '16px 10px' }}>
                    <strong style={{ color: '#D51E0B', fontSize: '14px' }}>#{o.orderId}</strong>
                  </td>

                  <td style={{ padding: '16px 10px', color: '#94a3b8', fontSize: '13px' }}>
                    {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                  </td>

                  <td style={{ padding: '16px 10px', color: '#ffffff' }}>
                    <div style={{ fontWeight: '700' }}>{o.items?.length || 1} product(s)</div>
                    <div style={{ fontSize: '12px', color: '#64748b', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '200px' }}>
                      {o.items?.[0]?.name}
                    </div>
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <strong style={{ color: '#ffffff', fontSize: '15px' }}>
                      ৳{(o.totals?.grandTotal || 0).toLocaleString('en-IN')}
                    </strong>
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <select
                      value={o.orderStatus || 'Processing'}
                      onChange={(e) => onUpdateStatus(o.orderId, e.target.value)}
                      style={{
                        padding: '6px 10px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backgroundColor: '#081621',
                        color: statusObj.color,
                        fontSize: '12.5px',
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
                  </td>

                  <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => onOpenOrderModal(o)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(59, 130, 246, 0.15)',
                          color: '#3b82f6',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FiEye size={14} /> Details
                      </button>

                      <button
                        type="button"
                        onClick={() => {
                          setSelectedOrderForInvoice(o);
                          setInvoiceOpen(true);
                        }}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(255, 255, 255, 0.08)',
                          color: '#ffffff',
                          border: '1px solid rgba(255, 255, 255, 0.12)',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FiPrinter size={14} /> Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <InvoiceModal
        order={selectedOrderForInvoice}
        isOpen={invoiceOpen}
        onClose={() => setInvoiceOpen(false)}
      />
    </div>
  );
};

export default AdminOrders;
