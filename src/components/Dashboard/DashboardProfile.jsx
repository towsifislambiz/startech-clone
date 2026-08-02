import React, { useState } from 'react';

const DashboardProfile = ({ user, onUpdateProfile, loading }) => {
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [phone, setPhone] = useState(user?.phone || '01712345678');
  const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProfile({
      displayName,
      phone,
      photoURL
    });
  };

  return (
    <div
      style={{
        backgroundColor: '#0c1c28',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0, borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        Profile Settings
      </h3>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px' }}>
          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              Full Name *
            </label>
            <input
              type="text"
              required
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              Email Address (Read Only)
            </label>
            <input
              type="email"
              disabled
              value={user?.email || ''}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.08)',
                backgroundColor: 'rgba(255,255,255,0.05)',
                color: '#9ca3af',
                fontSize: '13px'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              Phone Number
            </label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', fontWeight: '600', color: '#9ca3af', display: 'block', marginBottom: '4px' }}>
              Avatar / Profile Picture URL
            </label>
            <input
              type="url"
              placeholder="https://example.com/avatar.jpg"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
              style={{
                width: '100%',
                padding: '10px 12px',
                borderRadius: '8px',
                border: '1px solid rgba(255,255,255,0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '12px 24px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '14px',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            {loading ? 'Saving...' : 'Save Profile Changes'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
