import React, { useState } from 'react';
import { FiSliders, FiAlertOctagon, FiTruck, FiMessageSquare, FiCheckCircle } from 'react-icons/fi';

const AdminSettings = ({ settings = {}, onSaveSettings }) => {
  const [bannerText, setBannerText] = useState(settings.bannerText || '⚡ Mega Tech Sale: Up to 30% OFF on Laptops & Custom PC Components!');
  const [defaultShippingFee, setDefaultShippingFee] = useState(settings.defaultShippingFee || 60);
  const [maintenanceMode, setMaintenanceMode] = useState(settings.maintenanceMode || false);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveSettings({
      bannerText,
      defaultShippingFee: Number(defaultShippingFee),
      maintenanceMode
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
        <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiSliders style={{ color: '#D51E0B' }} /> Platform Global Settings & Announcement Governance
        </h3>
        <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
          Manage site-wide promotional banners, default shipping rates, and system maintenance switches
        </p>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {/* Banner Text */}
        <div>
          <label style={{ fontSize: '13.5px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
            Announcement Banner Text
          </label>
          <div style={{ position: 'relative' }}>
            <FiMessageSquare style={{ position: 'absolute', left: '14px', top: '15px', color: '#64748b' }} size={17} />
            <input
              type="text"
              required
              value={bannerText}
              onChange={(e) => setBannerText(e.target.value)}
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

        {/* Shipping Fee */}
        <div>
          <label style={{ fontSize: '13.5px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '8px' }}>
            Default Shipping Fee (৳)
          </label>
          <div style={{ position: 'relative' }}>
            <FiTruck style={{ position: 'absolute', left: '14px', top: '15px', color: '#64748b' }} size={17} />
            <input
              type="number"
              required
              value={defaultShippingFee}
              onChange={(e) => setDefaultShippingFee(e.target.value)}
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

        {/* Maintenance Mode Toggle */}
        <div style={{ padding: '16px 20px', borderRadius: '12px', backgroundColor: '#081621', border: '1px solid rgba(255, 255, 255, 0.08)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div>
            <div style={{ fontSize: '14px', fontWeight: '800', color: '#ffffff', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FiAlertOctagon style={{ color: maintenanceMode ? '#ef4444' : '#64748b' }} /> Platform Maintenance Mode
            </div>
            <div style={{ fontSize: '12.5px', color: '#94a3b8', marginTop: '2px' }}>
              Temporarily pause checkout sessions and display maintenance alert banner to customers
            </div>
          </div>

          <label style={{ position: 'relative', display: 'inline-block', width: '50px', height: '26px' }}>
            <input
              type="checkbox"
              checked={maintenanceMode}
              onChange={(e) => setMaintenanceMode(e.target.checked)}
              style={{ opacity: 0, width: 0, height: 0 }}
            />
            <span
              style={{
                position: 'absolute',
                cursor: 'pointer',
                inset: 0,
                backgroundColor: maintenanceMode ? '#D51E0B' : 'rgba(255,255,255,0.2)',
                borderRadius: '26px',
                transition: '0.3s'
              }}
            >
              <span
                style={{
                  position: 'absolute',
                  content: '""',
                  height: '20px',
                  width: '20px',
                  left: maintenanceMode ? '26px' : '3px',
                  bottom: '3px',
                  backgroundColor: 'white',
                  borderRadius: '50%',
                  transition: '0.3s'
                }}
              />
            </span>
          </label>
        </div>

        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
          <button
            type="submit"
            style={{
              padding: '14px 28px',
              borderRadius: '12px',
              backgroundColor: '#D51E0B',
              color: '#ffffff',
              border: 'none',
              fontSize: '14.5px',
              fontWeight: '800',
              cursor: 'pointer',
              boxShadow: '0 6px 20px rgba(213, 30, 11, 0.35)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <FiCheckCircle size={18} /> Save Global Settings
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminSettings;
