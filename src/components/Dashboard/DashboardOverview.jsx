import React from 'react';
import {
  FiShoppingBag, FiHeart, FiDollarSign, FiChevronRight,
  FiClock, FiCheckCircle, FiUser, FiMapPin, FiPhone, FiMail,
  FiActivity, FiShoppingCart
} from 'react-icons/fi';
import useWishlist from '../../hooks/useWishlist';
import { useCart } from '../../context/CartContext';
import RecentlyViewed from '../Product/RecentlyViewed';

const DashboardOverview = ({ user, orders = [], onTabChange }) => {
  const { wishlistItems, wishlistCount } = useWishlist();
  const { addItem } = useCart();

  const totalSpent = orders.reduce((sum, o) => sum + (o.totals?.grandTotal || 0), 0);
  const pendingOrders = orders.filter((o) => (o.orderStatus || 'Processing').toLowerCase() === 'pending' || (o.orderStatus || '').toLowerCase() === 'processing').length;
  const completedOrders = orders.filter((o) => (o.orderStatus || '').toLowerCase() === 'delivered').length;
  const recentOrders = orders.slice(0, 5);
  const previewWishlist = wishlistItems.slice(0, 3);

  // Profile completion calculations
  const profileCompletionPct = (() => {
    let score = 40; // Base user created
    if (user?.displayName) score += 20;
    if (user?.email) score += 10;
    if (user?.phone) score += 15;
    if (user?.address) score += 15;
    return Math.min(score, 100);
  })();

  const activities = [
    { id: 1, text: 'Account authenticated successfully', time: 'Just now', icon: FiUser, color: '#3b82f6' },
    { id: 2, text: `Active order session #${orders[0]?.orderId || 'ST-10082'} synced`, time: '2 hours ago', icon: FiShoppingBag, color: '#22c55e' },
    { id: 3, text: `${wishlistCount} tech products saved in Wishlist`, time: '1 day ago', icon: FiHeart, color: '#D51E0B' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px', fontFamily: "'Inter', sans-serif" }}>
      {/* Top Welcome Banner Card */}
      <div
        style={{
          padding: '28px 32px',
          borderRadius: '20px',
          background: 'linear-gradient(135deg, #0c1c28 0%, #162a3a 100%)',
          border: '1px solid rgba(255, 255, 255, 0.12)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.35)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '20px'
        }}
      >
        <div style={{ maxWidth: '540px' }}>
          <h2 style={{ color: '#ffffff', fontSize: '24px', fontWeight: '900', margin: '0 0 8px 0', letterSpacing: '-0.5px' }}>
            Welcome back, {user?.displayName || 'Tech Enthusiast'}! 👋
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '14px', margin: '0 0 16px 0', lineHeight: 1.5 }}>
            Manage your recent orders, addresses, wishlist items, and account security settings from your personal dashboard.
          </p>

          {/* Profile Completion Bar */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: '700', color: '#94a3b8', marginBottom: '6px' }}>
              <span>Profile Completion</span>
              <span style={{ color: '#22c55e' }}>{profileCompletionPct}% Complete</span>
            </div>
            <div style={{ width: '100%', height: '7px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px', overflow: 'hidden' }}>
              <div
                style={{
                  width: `${profileCompletionPct}%`,
                  height: '100%',
                  background: 'linear-gradient(90deg, #D51E0B, #22c55e)',
                  borderRadius: '10px',
                  transition: 'width 0.4s ease'
                }}
              />
            </div>
          </div>
        </div>

        <button
          type="button"
          onClick={() => onTabChange('orders')}
          style={{
            padding: '12px 24px',
            fontSize: '14px',
            fontWeight: '800',
            borderRadius: '12px',
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            border: 'none',
            cursor: 'pointer',
            boxShadow: '0 8px 24px rgba(213, 30, 11, 0.4)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          View Orders <FiChevronRight size={16} />
        </button>
      </div>

      {/* 5 Statistics Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
        {/* Total Orders */}
        <div
          onClick={() => onTabChange('orders')}
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#3b82f6', marginBottom: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(59, 130, 246, 0.15)' }}>
              <FiShoppingBag size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Orders</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff' }}>{orders.length}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Total Placed Orders</div>
        </div>

        {/* Pending Orders */}
        <div
          onClick={() => onTabChange('orders')}
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#f59e0b', marginBottom: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(245, 158, 11, 0.15)' }}>
              <FiClock size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Pending</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff' }}>{pendingOrders}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>In Progress / Pending</div>
        </div>

        {/* Completed Orders */}
        <div
          onClick={() => onTabChange('orders')}
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#22c55e', marginBottom: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(34, 197, 94, 0.15)' }}>
              <FiCheckCircle size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Delivered</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff' }}>{completedOrders}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Delivered Orders</div>
        </div>

        {/* Wishlist Items */}
        <div
          onClick={() => onTabChange('wishlist')}
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            transition: 'all 0.25s ease'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#D51E0B', marginBottom: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(213, 30, 11, 0.15)' }}>
              <FiHeart size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Saved</span>
          </div>
          <div style={{ fontSize: '26px', fontWeight: '900', color: '#ffffff' }}>{wishlistCount}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Wishlist Products</div>
        </div>

        {/* Total Spending */}
        <div
          style={{
            padding: '20px',
            borderRadius: '16px',
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: '#8b5cf6', marginBottom: '10px' }}>
            <div style={{ padding: '10px', borderRadius: '12px', backgroundColor: 'rgba(139, 92, 246, 0.15)' }}>
              <FiDollarSign size={22} />
            </div>
            <span style={{ fontSize: '11px', fontWeight: '700', color: '#94a3b8', textTransform: 'uppercase' }}>Spending</span>
          </div>
          <div style={{ fontSize: '24px', fontWeight: '900', color: '#ffffff' }}>৳{totalSpent.toLocaleString('en-IN')}</div>
          <div style={{ fontSize: '12px', color: '#94a3b8', marginTop: '4px' }}>Lifetime Purchases</div>
        </div>
      </div>

      {/* Main Two-Column Layout: Profile Info Card & Recent Activity */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
        {/* Profile Information Summary Card */}
        <div
          style={{
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiUser style={{ color: '#D51E0B' }} /> Personal Profile
            </h3>
            <button
              type="button"
              onClick={() => onTabChange('profile')}
              style={{ background: 'none', border: 'none', color: '#D51E0B', fontWeight: '700', fontSize: '13px', cursor: 'pointer' }}
            >
              Edit Profile
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', fontSize: '13.5px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
              <FiUser size={16} style={{ color: '#64748b' }} />
              <span style={{ color: '#ffffff', fontWeight: '700' }}>{user?.displayName || 'Not Set'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
              <FiMail size={16} style={{ color: '#64748b' }} />
              <span>{user?.email || 'Not Set'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
              <FiPhone size={16} style={{ color: '#64748b' }} />
              <span>{user?.phone || '+880 1712-345678'}</span>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#94a3b8' }}>
              <FiMapPin size={16} style={{ color: '#64748b' }} />
              <span>{user?.address || 'Dhaka, Bangladesh'}</span>
            </div>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div
          style={{
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiActivity style={{ color: '#3b82f6' }} /> Recent Activity
          </h3>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
            {activities.map((act) => {
              const Icon = act.icon;
              return (
                <div key={act.id} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: `${act.color}20`, color: act.color, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <Icon size={18} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontSize: '13px', fontWeight: '600', color: '#ffffff' }}>{act.text}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{act.time}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Recent Orders Overview Table / Cards */}
      <div
        style={{
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '20px',
          padding: '24px',
          display: 'flex',
          flexDirection: 'column',
          gap: '18px'
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
            Recent Orders History
          </h3>
          <button
            type="button"
            onClick={() => onTabChange('orders')}
            style={{ background: 'none', border: 'none', color: '#D51E0B', fontWeight: '700', fontSize: '13.5px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
          >
            View All Orders <FiChevronRight size={16} />
          </button>
        </div>

        {recentOrders.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '36px 20px', color: '#94a3b8', fontSize: '13.5px' }}>
            No recent orders found. Explore top tech products to place your first order!
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {recentOrders.map((o) => {
              const status = (o.orderStatus || 'Processing').toLowerCase();
              let badgeBg = 'rgba(59, 130, 246, 0.15)';
              let badgeColor = '#3b82f6';

              if (status === 'delivered') {
                badgeBg = 'rgba(34, 197, 94, 0.15)';
                badgeColor = '#22c55e';
              } else if (status === 'pending') {
                badgeBg = 'rgba(245, 158, 11, 0.15)';
                badgeColor = '#f59e0b';
              } else if (status === 'cancelled') {
                badgeBg = 'rgba(239, 68, 68, 0.15)';
                badgeColor = '#ef4444';
              }

              return (
                <div
                  key={o.orderId}
                  onClick={() => onTabChange('orders')}
                  style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '14px 18px',
                    borderRadius: '12px',
                    backgroundColor: '#081621',
                    border: '1px solid rgba(255, 255, 255, 0.06)',
                    cursor: 'pointer',
                    gap: '12px'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                    {o.items?.[0]?.thumbnail ? (
                      <img src={o.items[0].thumbnail} alt="" style={{ width: '44px', height: '44px', objectFit: 'contain', borderRadius: '8px', backgroundColor: 'rgba(0,0,0,0.3)' }} />
                    ) : (
                      <div style={{ width: '44px', height: '44px', borderRadius: '8px', backgroundColor: 'rgba(213, 30, 11, 0.15)', color: '#D51E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiShoppingBag size={20} />
                      </div>
                    )}
                    <div>
                      <strong style={{ color: '#D51E0B', fontSize: '13.5px' }}>#{o.orderId}</strong>
                      <div style={{ fontSize: '12px', color: '#94a3b8' }}>
                        {new Date(o.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })} • {o.items?.length || 1} item(s)
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    <span style={{ fontSize: '11.5px', fontWeight: '800', backgroundColor: badgeBg, color: badgeColor, padding: '4px 10px', borderRadius: '6px', textTransform: 'capitalize' }}>
                      {o.orderStatus || 'Processing'}
                    </span>
                    <strong style={{ color: '#ffffff', fontSize: '15px' }}>
                      ৳{(o.totals?.grandTotal || 0).toLocaleString('en-IN')}
                    </strong>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Wishlist Preview Section */}
      {previewWishlist.length > 0 && (
        <div
          style={{
            backgroundColor: '#0c1c28',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            borderRadius: '20px',
            padding: '24px',
            display: 'flex',
            flexDirection: 'column',
            gap: '16px'
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <h3 style={{ fontSize: '17px', fontWeight: '800', color: '#ffffff', margin: 0, display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiHeart style={{ color: '#D51E0B' }} /> Wishlist Quick Preview
            </h3>
            <button
              type="button"
              onClick={() => onTabChange('wishlist')}
              style={{ background: 'none', border: 'none', color: '#D51E0B', fontWeight: '700', fontSize: '13.5px', cursor: 'pointer' }}
            >
              View Full Wishlist ({wishlistCount})
            </button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
            {previewWishlist.map((item) => (
              <div
                key={item.id}
                style={{
                  backgroundColor: '#081621',
                  border: '1px solid rgba(255, 255, 255, 0.06)',
                  borderRadius: '12px',
                  padding: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px'
                }}
              >
                <img src={item.featured_image || item.image} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '8px' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                    {item.name}
                  </div>
                  <div style={{ fontSize: '13px', fontWeight: '800', color: '#D51E0B', marginTop: '2px' }}>
                    ৳{(item.price || 0).toLocaleString('en-IN')}
                  </div>
                </div>
                <button
                  type="button"
                  onClick={() => addItem(item, 1)}
                  style={{
                    padding: '8px',
                    borderRadius: '8px',
                    backgroundColor: '#D51E0B',
                    color: '#ffffff',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  title="Add to Cart"
                >
                  <FiShoppingCart size={15} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recently Viewed Products */}
      <RecentlyViewed />
    </div>
  );
};

export default DashboardOverview;
