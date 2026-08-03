import React, { useState } from 'react';
import { FiUser, FiMail, FiPhone, FiImage, FiCheckCircle } from 'react-icons/fi';

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
        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0' }}>
          Profile Settings
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
          Update your public profile display name, contact phone number, and avatar image
        </p>
      </div>

      {/* Avatar Preview */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', backgroundColor: '#081621', padding: '18px 20px', borderRadius: '16px', border: '1px solid rgba(255, 255, 255, 0.06)' }}>
        {photoURL ? (
          <img
            src={photoURL}
            alt={displayName}
            style={{ width: '64px', height: '64px', borderRadius: '18px', objectFit: 'cover', border: '2px solid #D51E0B' }}
          />
        ) : (
          <div style={{ width: '64px', height: '64px', borderRadius: '18px', backgroundColor: '#D51E0B', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '26px', fontWeight: '900' }}>
            {displayName?.[0]?.toUpperCase() || 'U'}
          </div>
        )}

        <div>
          <h4 style={{ color: '#ffffff', fontSize: '16px', fontWeight: '800', margin: '0 0 4px 0' }}>
            {displayName || 'StarTech User'}
          </h4>
          <p style={{ color: '#94a3b8', fontSize: '12.5px', margin: 0 }}>
            {user?.email}
          </p>
        </div>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
          {/* Full Name */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
              Full Name *
            </label>
            <div style={{ position: 'relative' }}>
              <FiUser style={{ position: 'absolute', left: '14px', top: '15px', color: '#64748b' }} size={17} />
              <input
                type="text"
                required
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Email Address (Read Only) */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
              Email Address (Read Only)
            </label>
            <div style={{ position: 'relative' }}>
              <FiMail style={{ position: 'absolute', left: '14px', top: '15px', color: '#64748b' }} size={17} />
              <input
                type="email"
                disabled
                value={user?.email || ''}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.08)',
                  backgroundColor: 'rgba(255, 255, 255, 0.05)',
                  color: '#94a3b8',
                  fontSize: '14px'
                }}
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
              Phone Number
            </label>
            <div style={{ position: 'relative' }}>
              <FiPhone style={{ position: 'absolute', left: '14px', top: '15px', color: '#64748b' }} size={17} />
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>

          {/* Avatar Picture URL */}
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
              Avatar / Profile Picture URL
            </label>
            <div style={{ position: 'relative' }}>
              <FiImage style={{ position: 'absolute', left: '14px', top: '15px', color: '#64748b' }} size={17} />
              <input
                type="url"
                placeholder="https://example.com/avatar.jpg"
                value={photoURL}
                onChange={(e) => setPhotoURL(e.target.value)}
                style={{
                  width: '100%',
                  padding: '12px 14px 12px 42px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
          <button
            type="submit"
            disabled={loading}
            style={{
              padding: '14px 28px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              fontWeight: '800',
              fontSize: '14.5px',
              borderRadius: '12px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(213, 30, 11, 0.4)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            {loading ? 'Saving Changes...' : <><FiCheckCircle size={18} /> Save Profile Changes</>}
          </button>
        </div>
      </form>
    </div>
  );
};

export default DashboardProfile;
