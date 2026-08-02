import React from 'react';
import { FiShoppingBag, FiHeart, FiDollarSign, FiChevronRight } from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import useWishlist from '../../hooks/useWishlist';
import useCompare from '../../hooks/useCompare';
import RecentlyViewed from '../Product/RecentlyViewed';

const DashboardOverview = ({ user, orders = [], onTabChange }) => {
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();

  const totalSpent = orders.reduce((sum, o) => sum + (o.totals?.grandTotal || 0), 0);
  const recentOrders = orders.slice(0, 5);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Welcome Banner */}
      <div
        style={{
          padding: '24px',
          borderRadius: '16px',
          background: 'linear-gradient(135deg, #0c1c28 0%, #162a3a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}
      >
        <div>
          <h2 style={{ color: '#ffffff', fontSize: '22px', fontWeight: '900', margin: '0 0 6px 0' }}>
            Welcome back, {user?.displayName || 'Tech Enthusiast'}! 👋
          </h2>
          <p style={{ color: '#9ca3af', fontSize: '13px', margin: 0 }}>
            Manage your recent orders, addresses, wishlist items, and account settings.
          </p>
        </div>

        <button
          type="button"
          onClick={() => onTabChange('orders')}
          className="btn btn-primary"
          style={{ padding: '10px 18px', fontSize: '13px' }}
        >
          View All Orders
        </button>
      </div>

      {/* Quick Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        <div
          onClick={() => onTabChange('orders')}
          style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#0c1c28', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#3b82f6', marginBottom: '8px' }}>
            <FiShoppingBag size={22} />
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Orders</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{orders.length}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Total Placed Orders</div>
        </div>

        <div
          onClick={() => onTabChange('wishlist')}
          style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#0c1c28', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#D51E0B', marginBottom: '8px' }}>
            <FiHeart size={22} />
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Saved</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{wishlistCount}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Wishlist Items</div>
        </div>

        <div
          onClick={() => onTabChange('compare')}
          style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#0c1c28', border: '1px solid rgba(255, 255, 255, 0.08)', cursor: 'pointer' }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#10b981', marginBottom: '8px' }}>
            <BsArrowLeftRight size={22} />
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Compare</span>
          </div>
          <div style={{ fontSize: '22px', fontWeight: '900', color: '#ffffff' }}>{compareCount}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Compared Items</div>
        </div>

        <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: '#0c1c28', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f59e0b', marginBottom: '8px' }}>
            <FiDollarSign size={22} />
            <span style={{ fontSize: '11px', color: '#9ca3af' }}>Spent</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: '900', color: '#ffffff' }}>৳{totalSpent.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>Lifetime Purchase</div>
        </div>
      </div>

      {/* Recent Orders Overview */}
      <div
        style={{
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '16px',
          padding: '20px',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '16px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
            Recent Orders History
          </h3>
          <button type="button" onClick={() => onTabChange('orders')} style={{ background: 'none', border: 'none', color: '#D51E0B', fontWeight: '700', fontSize: '13px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}>
            View All <FiChevronRight />
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '30px', color: '#9ca3af', fontSize: '13px' }}>
            No recent orders found. Start exploring tech products!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {recentOrders.map((o) => (
              <div
                key={o.orderId}
                onClick={() => onTabChange('orders')}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderRadius: '8px',
                  backgroundColor: '#081621',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  cursor: 'pointer'
                }}
              >
                <div>
                  <strong style={{ color: '#D51E0B', fontSize: '13px' }}>#{o.orderId}</strong>
                  <div style={{ fontSize: '11px', color: '#9ca3af' }}>
                    {new Date(o.createdAt).toLocaleDateString('en-US')} • {o.items?.length || 1} item(s)
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <strong style={{ color: '#ffffff', fontSize: '14px' }}>
                    ৳{(o.totals?.grandTotal || 0).toLocaleString('en-IN')}
                  </strong>
                  <div style={{ fontSize: '11px', color: '#22c55e', fontWeight: 'bold' }}>
                    {o.orderStatus}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Recently Viewed Products */}
      <RecentlyViewed />
    </div>
  );
};

export default DashboardOverview;
