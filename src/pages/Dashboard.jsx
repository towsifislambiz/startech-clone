import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight } from 'react-icons/fi';
import useDashboard from '../hooks/useDashboard';
import DashboardSidebar from '../components/Dashboard/DashboardSidebar';
import DashboardOverview from '../components/Dashboard/DashboardOverview';
import DashboardOrders from '../components/Dashboard/DashboardOrders';
import DashboardProfile from '../components/Dashboard/DashboardProfile';
import DashboardAddresses from '../components/Dashboard/DashboardAddresses';
import DashboardReviews from '../components/Dashboard/DashboardReviews';
import DashboardSupport from '../components/Dashboard/DashboardSupport';
import Wishlist from './Wishlist';
import Comparison from './Comparison';
import './Category.css';

const Dashboard = () => {
  const {
    activeTab,
    user,
    role,
    orders,
    addresses,
    reviews,
    loading,
    changeTab,
    updateProfileDetails,
    saveUserAddress,
    removeUserAddress,
    setDefaultUserAddress,
    postReview,
    logout
  } = useDashboard();

  useEffect(() => {
    document.title = 'My Account & Dashboard | StarTech';
  }, []);

  return (
    <div className="cat" style={{ paddingBottom: '60px' }}>
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <span>My Account & Dashboard</span>
        </div>
      </div>

      <div className="container" style={{ marginTop: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '30px', alignItems: 'start' }}>
          {/* Left Navigation Sidebar */}
          <div style={{ gridColumn: 'span 1' }}>
            <DashboardSidebar
              activeTab={activeTab}
              onTabChange={changeTab}
              onLogout={logout}
              user={user}
              role={role}
            />
          </div>

          {/* Right Tab Content View */}
          <div style={{ gridColumn: 'span 2' }}>
            {activeTab === 'overview' && (
              <DashboardOverview user={user} orders={orders} onTabChange={changeTab} />
            )}

            {activeTab === 'orders' && (
              <DashboardOrders orders={orders} />
            )}

            {activeTab === 'profile' && (
              <DashboardProfile user={user} onUpdateProfile={updateProfileDetails} loading={loading} />
            )}

            {activeTab === 'addresses' && (
              <DashboardAddresses
                addresses={addresses}
                onSaveAddress={saveUserAddress}
                onDeleteAddress={removeUserAddress}
                onSetDefaultAddress={setDefaultUserAddress}
              />
            )}

            {activeTab === 'wishlist' && (
              <div style={{ backgroundColor: '#0c1c28', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px' }}>
                <Wishlist />
              </div>
            )}

            {activeTab === 'compare' && (
              <div style={{ backgroundColor: '#0c1c28', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', padding: '16px' }}>
                <Comparison />
              </div>
            )}

            {activeTab === 'reviews' && (
              <DashboardReviews reviews={reviews} onPostReview={postReview} />
            )}

            {activeTab === 'support' && (
              <DashboardSupport />
            )}

            {activeTab === 'settings' && (
              <div style={{ padding: '24px', backgroundColor: '#0c1c28', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', color: '#ffffff' }}>
                <h3 style={{ margin: '0 0 16px 0' }}>Account Settings</h3>
                <p style={{ color: '#9ca3af', fontSize: '13px' }}>
                  Manage notifications, security preferences, and active sessions.
                </p>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginTop: '16px' }}>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#D51E0B' }} />
                    Receive order status updates via SMS and Email
                  </label>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '13px' }}>
                    <input type="checkbox" defaultChecked style={{ accentColor: '#D51E0B' }} />
                    Receive promotional tech deal newsletters
                  </label>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
