import React, { useState, useEffect } from 'react';
import { FiShield, FiUserCheck, FiPlus, FiTrash2, FiX } from 'react-icons/fi';
import adminService from '../services/adminService';
import checkoutService from '../services/checkoutService';
import { useNotification } from '../context/NotificationContext';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([]);
  const [coupons, setCoupons] = useState([]);
  const [orders, setOrders] = useState([]);
  const [showCouponModal, setShowCouponModal] = useState(false);
  const { showNotification } = useNotification();

  // Coupon form
  const [couponCode, setCouponCode] = useState('');
  const [couponValue, setCouponValue] = useState('');
  const [couponMin, setCouponMin] = useState('0');

  const loadAdminData = () => {
    adminService.getUsers().then((uData) => setUsers(uData));
    setCoupons(adminService.getCoupons());
    setOrders(checkoutService.getOrders());
  };

  useEffect(() => {
    loadAdminData();
    document.title = 'Super Admin Panel | StarTech';
  }, []);

  const handleRoleChange = async (uid, newRole) => {
    await adminService.updateUserRole(uid, newRole);
    setUsers((prev) => prev.map((u) => (u.uid === uid ? { ...u, role: newRole } : u)));
    showNotification(`User role updated to "${newRole}".`, 'success');
  };

  const handleCreateCoupon = (e) => {
    e.preventDefault();
    if (!couponCode.trim() || !couponValue) return;

    const updated = adminService.createCoupon({
      code: couponCode,
      type: 'percentage',
      value: Number(couponValue),
      minSubtotal: Number(couponMin),
      description: `${couponValue}% discount promo`
    });

    setCoupons(updated);
    showNotification(`Coupon "${couponCode.toUpperCase()}" created!`, 'success');
    setCouponCode('');
    setCouponValue('');
    setCouponMin('0');
    setShowCouponModal(false);
  };

  const handleDeleteCoupon = (code) => {
    const updated = adminService.deleteCoupon(code);
    setCoupons(updated);
    showNotification(`Coupon "${code}" deleted.`, 'info');
  };

  const totalGMV = orders.reduce((sum, o) => sum + (o.totals?.grandTotal || 0), 0);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", paddingBottom: '40px' }}>
      {/* Header Banner */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px', gap: '16px' }}>
        <div>
          <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary)', marginBottom: '4px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiShield style={{ color: '#D51E0B' }} /> Super Admin Panel
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
            Platform governance, user permissions, coupon management, and revenue overview.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowCouponModal(true)}
          style={{
            backgroundColor: '#D51E0B',
            color: '#fff',
            padding: '10px 18px',
            borderRadius: '8px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <FiPlus size={18} /> Create Promo Coupon
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '8px', marginBottom: '20px', overflowX: 'auto' }}>
        {['overview', 'users', 'coupons', 'orders'].map((tab) => (
          <button
            key={tab}
            type="button"
            onClick={() => setActiveTab(tab)}
            style={{
              padding: '8px 16px',
              borderRadius: '8px',
              backgroundColor: activeTab === tab ? '#D51E0B' : 'var(--bg-secondary)',
              color: '#ffffff',
              border: 'none',
              fontWeight: '700',
              fontSize: '13px',
              cursor: 'pointer',
              textTransform: 'capitalize'
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Overview Metrics */}
      {activeTab === 'overview' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '28px' }}>
            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>System Revenue (GMV)</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#D51E0B', marginTop: '4px' }}>
                ৳{totalGMV.toLocaleString('en-IN')}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Registered Users</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#3b82f6', marginTop: '4px' }}>
                {users.length}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Active Promo Coupons</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#10b981', marginTop: '4px' }}>
                {coupons.length}
              </div>
            </div>

            <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '20px' }}>
              <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>Total System Orders</div>
              <div style={{ fontSize: '24px', fontWeight: '800', color: '#8b5cf6', marginTop: '4px' }}>
                {orders.length}
              </div>
            </div>
          </div>
        </>
      )}

      {/* Users Role Management Tab */}
      {(activeTab === 'overview' || activeTab === 'users') && (
        <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px', marginBottom: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiUserCheck style={{ color: '#D51E0B' }} /> User Role Governance ({users.length})
          </h3>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-color)', color: 'var(--text-secondary)' }}>
                <th style={{ padding: '12px 8px' }}>Display Name</th>
                <th style={{ padding: '12px 8px' }}>Email</th>
                <th style={{ padding: '12px 8px' }}>Current Role</th>
                <th style={{ padding: '12px 8px' }}>Change Permission</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.uid} style={{ borderBottom: '1px solid var(--border-color)' }}>
                  <td style={{ padding: '14px 8px', fontWeight: '700', color: '#ffffff' }}>{u.displayName || 'User'}</td>
                  <td style={{ padding: '14px 8px', color: '#9ca3af' }}>{u.email}</td>
                  <td style={{ padding: '14px 8px' }}>
                    <span style={{ backgroundColor: u.role === 'Admin' ? 'rgba(213,30,11,0.15)' : u.role === 'Seller' ? 'rgba(59,130,246,0.15)' : 'rgba(255,255,255,0.1)', color: u.role === 'Admin' ? '#D51E0B' : u.role === 'Seller' ? '#3b82f6' : '#ffffff', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '800' }}>
                      {u.role || 'Customer'}
                    </span>
                  </td>
                  <td style={{ padding: '14px 8px' }}>
                    <select
                      value={u.role || 'Customer'}
                      onChange={(e) => handleRoleChange(u.uid, e.target.value)}
                      style={{ padding: '6px 10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#081621', color: '#ffffff', fontSize: '12px', fontWeight: '700' }}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Seller">Seller</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Coupons Tab */}
      {activeTab === 'coupons' && (
        <div style={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-color)', borderRadius: '12px', padding: '24px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '16px' }}>
            System Promo Coupons ({coupons.length})
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            {coupons.map((c) => (
              <div key={c.code} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', backgroundColor: '#081621', borderRadius: '8px' }}>
                <div>
                  <strong style={{ color: '#D51E0B', fontSize: '15px' }}>{c.code}</strong>
                  <div style={{ fontSize: '12px', color: '#9ca3af' }}>{c.description || 'Promotional Coupon'}</div>
                </div>
                <button type="button" onClick={() => handleDeleteCoupon(c.code)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <FiTrash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Create Coupon Modal */}
      {showCouponModal && (
        <>
          <div onClick={() => setShowCouponModal(false)} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 99990 }} />
          <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: '90%', maxWidth: '450px', backgroundColor: '#081621', padding: '24px', borderRadius: '16px', zIndex: 99999, color: '#ffffff' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <h3 style={{ margin: 0 }}>Create Promo Coupon</h3>
              <button type="button" onClick={() => setShowCouponModal(false)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}><FiX size={20} /></button>
            </div>

            <form onSubmit={handleCreateCoupon} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <input type="text" required placeholder="Coupon Code (e.g. FLASH20) *" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff', textTransform: 'uppercase' }} />
              <input type="number" required placeholder="Discount Value (% or ৳) *" value={couponValue} onChange={(e) => setCouponValue(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
              <input type="number" placeholder="Min Subtotal Requirement (৳)" value={couponMin} onChange={(e) => setCouponMin(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: '6px', backgroundColor: '#0c1c28', border: '1px solid rgba(255,255,255,0.15)', color: '#fff' }} />
              <button type="submit" className="btn btn-primary" style={{ marginTop: '8px' }}>Create Coupon</button>
            </form>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminDashboard;
