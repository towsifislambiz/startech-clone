import React from 'react';
import {
  FiDollarSign, FiShoppingBag, FiUsers, FiBox, FiTrendingUp,
  FiClock, FiCheckCircle, FiAlertCircle, FiPercent
} from 'react-icons/fi';
import AdminChart from './AdminChart';

const AdminOverview = ({ metrics, onTabChange }) => {
  const {
    totalGMV = 0,
    totalOrders = 0,
    pendingOrders = 0,
    deliveredOrders = 0,
    totalUsers = 0,
    totalProducts = 0,
    outOfStockCount = 0,
    activeCoupons = 0
  } = metrics;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: "'Inter', sans-serif" }}>
      {/* 4 Primary Key Performance Indicator Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        {/* Total GMV Revenue Card */}
        <div
          style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'rgba(213, 30, 11, 0.15)', color: '#D51E0B' }}>
              <FiDollarSign size={24} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#22c55e', backgroundColor: 'rgba(34, 197, 94, 0.15)', padding: '4px 10px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '4px' }}>
              <FiTrendingUp size={12} /> +18.4%
            </span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff' }}>
              ৳{totalGMV.toLocaleString('en-IN')}
            </div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Total System Revenue (GMV)</div>
          </div>
        </div>

        {/* Total Orders */}
        <div
          onClick={() => onTabChange('orders')}
          style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'rgba(59, 130, 246, 0.15)', color: '#3b82f6' }}>
              <FiShoppingBag size={24} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Orders</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff' }}>{totalOrders}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Total System Orders</div>
          </div>
        </div>

        {/* Registered Users */}
        <div
          onClick={() => onTabChange('users')}
          style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'rgba(16, 185, 129, 0.15)', color: '#10b981' }}>
              <FiUsers size={24} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Users</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff' }}>{totalUsers}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Registered Accounts</div>
          </div>
        </div>

        {/* Product Catalog */}
        <div
          onClick={() => onTabChange('products')}
          style={{
            padding: '24px',
            borderRadius: '20px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.12)',
            boxShadow: '0 12px 30px rgba(0, 0, 0, 0.35)',
            cursor: 'pointer'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
            <div style={{ padding: '12px', borderRadius: '14px', backgroundColor: 'rgba(139, 92, 246, 0.15)', color: '#8b5cf6' }}>
              <FiBox size={24} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '800', color: '#94a3b8', textTransform: 'uppercase' }}>Catalog</span>
          </div>
          <div>
            <div style={{ fontSize: '28px', fontWeight: '900', color: '#ffffff' }}>{totalProducts}</div>
            <div style={{ fontSize: '13px', color: '#94a3b8', marginTop: '2px' }}>Active Tech Products</div>
          </div>
        </div>
      </div>

      {/* Visual Analytics Charts Section */}
      <AdminChart totalGMV={totalGMV} totalOrders={totalOrders} />

      {/* Secondary Performance Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '18px' }}>
        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)', color: '#f59e0b' }}>
            <FiClock size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{pendingOrders}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Pending Fulfillment</div>
          </div>
        </div>

        <div style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '14px' }}>
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.15)', color: '#22c55e' }}>
            <FiCheckCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{deliveredOrders}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Delivered Orders</div>
          </div>
        </div>

        <div
          onClick={() => onTabChange('inventory')}
          style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(239, 68, 68, 0.15)', color: '#ef4444' }}>
            <FiAlertCircle size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{outOfStockCount}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Out of Stock Alerts</div>
          </div>
        </div>

        <div
          onClick={() => onTabChange('coupons')}
          style={{ padding: '20px', borderRadius: '16px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', gap: '14px', cursor: 'pointer' }}
        >
          <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(213, 30, 11, 0.15)', color: '#D51E0B' }}>
            <FiPercent size={22} />
          </div>
          <div>
            <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{activeCoupons}</div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8' }}>Active Promo Coupons</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminOverview;
