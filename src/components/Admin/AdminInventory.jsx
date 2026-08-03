import React from 'react';
import { FiLayers, FiAlertTriangle, FiCheckCircle, FiXCircle, FiRefreshCw } from 'react-icons/fi';

const AdminInventory = ({ products = [], onToggleStock }) => {
  const lowStockProducts = products.filter((p) => p.in_stock !== false && (p.stockQuantity || 10) < 5);
  const outOfStockProducts = products.filter((p) => p.in_stock === false);

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
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '16px' }}>
        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiLayers style={{ color: '#D51E0B' }} /> Inventory & Stock Monitoring
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
          Real-time product stock level tracking and low-inventory restock alerts
        </p>
      </div>

      {/* Inventory Alerts Overview */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <FiXCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>{outOfStockProducts.length}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Out of Stock Products</div>
          </div>
        </div>

        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(245, 158, 11, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <FiAlertTriangle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>{lowStockProducts.length}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Low Stock Warnings</div>
          </div>
        </div>

        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(34, 197, 94, 0.2)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
            <FiCheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>{products.length - outOfStockProducts.length}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Healthy Stock Items</div>
          </div>
        </div>
      </div>

      {/* Stock List Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
              <th style={{ padding: '14px 10px' }}>Product Title</th>
              <th style={{ padding: '14px 10px' }}>Category</th>
              <th style={{ padding: '14px 10px' }}>Stock Quantity</th>
              <th style={{ padding: '14px 10px' }}>Current Availability</th>
              <th style={{ padding: '14px 10px', textAlign: 'right' }}>Quick Toggle</th>
            </tr>
          </thead>
          <tbody>
            {products.map((p) => {
              const inStock = p.in_stock !== false;
              const qty = p.stockQuantity || 10;
              const isLow = inStock && qty < 5;

              return (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '16px 10px', fontWeight: '700', color: '#ffffff' }}>
                    {p.name}
                  </td>

                  <td style={{ padding: '16px 10px', color: '#94a3b8' }}>
                    {p.category || 'Tech'}
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <span style={{ fontWeight: '800', color: isLow ? '#f59e0b' : '#ffffff' }}>
                      {qty} units
                    </span>
                    {isLow && (
                      <span style={{ fontSize: '11px', color: '#f59e0b', marginLeft: '6px', fontWeight: '800' }}>
                        (Low Stock)
                      </span>
                    )}
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: '800',
                        backgroundColor: inStock ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: inStock ? '#22c55e' : '#ef4444',
                        padding: '4px 10px',
                        borderRadius: '6px'
                      }}
                    >
                      {inStock ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>

                  <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => onToggleStock(p.id, inStock)}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        backgroundColor: inStock ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        color: inStock ? '#ef4444' : '#22c55e',
                        border: inStock ? '1px solid rgba(239, 68, 68, 0.3)' : '1px solid rgba(34, 197, 94, 0.3)',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      <FiRefreshCw size={14} /> {inStock ? 'Mark Out of Stock' : 'Mark In Stock'}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminInventory;
