import React, { useState } from 'react';
import { FiUserCheck, FiSearch, FiLock, FiUnlock, FiMail, FiCheckCircle } from 'react-icons/fi';

const AdminUsers = ({ users = [], onRoleChange, onStatusToggle }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredUsers = users.filter(
    (u) =>
      u.displayName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.role?.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
      {/* Header Bar & Search */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiUserCheck style={{ color: '#D51E0B' }} /> User Role Governance & Security
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Manage platform permissions, grant Seller/Admin privileges, or suspend user access
          </p>
        </div>

        <div style={{ position: 'relative', width: '100%', maxWidth: '300px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '13px', color: '#64748b' }} size={16} />
          <input
            type="text"
            placeholder="Search users by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              padding: '10px 14px 10px 40px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: '#081621',
              color: '#ffffff',
              fontSize: '13.5px',
              outline: 'none'
            }}
          />
        </div>
      </div>

      {/* Users Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
              <th style={{ padding: '14px 10px' }}>User Details</th>
              <th style={{ padding: '14px 10px' }}>Email Address</th>
              <th style={{ padding: '14px 10px' }}>Role Permission</th>
              <th style={{ padding: '14px 10px' }}>Account Status</th>
              <th style={{ padding: '14px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((u) => {
              const isBanned = (u.status || '').toLowerCase() === 'banned';

              return (
                <tr key={u.uid} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div
                        style={{
                          width: '40px',
                          height: '40px',
                          borderRadius: '12px',
                          backgroundColor: u.role === 'Admin' ? '#D51E0B' : u.role === 'Seller' ? '#3b82f6' : 'rgba(255,255,255,0.1)',
                          color: '#ffffff',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: '800',
                          fontSize: '16px'
                        }}
                      >
                        {u.displayName?.[0]?.toUpperCase() || 'U'}
                      </div>
                      <div>
                        <div style={{ fontWeight: '800', color: '#ffffff' }}>{u.displayName || 'StarTech User'}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>UID: {u.uid.slice(0, 10)}...</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '16px 10px', color: '#94a3b8' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <FiMail size={14} style={{ color: '#64748b' }} /> {u.email}
                    </div>
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <select
                      value={u.role || 'Customer'}
                      onChange={(e) => onRoleChange(u.uid, e.target.value)}
                      style={{
                        padding: '8px 12px',
                        borderRadius: '8px',
                        border: '1px solid rgba(255, 255, 255, 0.15)',
                        backgroundColor: '#081621',
                        color: u.role === 'Admin' ? '#D51E0B' : u.role === 'Seller' ? '#3b82f6' : '#ffffff',
                        fontSize: '13px',
                        fontWeight: '800',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="Customer">Customer</option>
                      <option value="Seller">Seller</option>
                      <option value="Admin">Admin</option>
                    </select>
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <span
                      style={{
                        fontSize: '11.5px',
                        fontWeight: '800',
                        backgroundColor: isBanned ? 'rgba(239, 68, 68, 0.15)' : 'rgba(34, 197, 94, 0.15)',
                        color: isBanned ? '#ef4444' : '#22c55e',
                        padding: '4px 10px',
                        borderRadius: '6px',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {isBanned ? <FiLock size={12} /> : <FiCheckCircle size={12} />} {isBanned ? 'Banned' : 'Active'}
                    </span>
                  </td>

                  <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                    <button
                      type="button"
                      onClick={() => onStatusToggle(u.uid, u.status || 'active')}
                      style={{
                        padding: '8px 14px',
                        borderRadius: '8px',
                        backgroundColor: isBanned ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: isBanned ? '#22c55e' : '#ef4444',
                        border: isBanned ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                        fontSize: '12.5px',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px'
                      }}
                    >
                      {isBanned ? <><FiUnlock size={14} /> Unblock</> : <><FiLock size={14} /> Block User</>}
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

export default AdminUsers;
