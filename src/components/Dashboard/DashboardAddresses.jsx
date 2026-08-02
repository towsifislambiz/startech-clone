import React, { useState } from 'react';
import { FiPlus, FiTrash2, FiEdit2, FiMapPin } from 'react-icons/fi';
import AddressForm from '../Checkout/AddressForm';

const DashboardAddresses = ({ addresses = [], onSaveAddress, onDeleteAddress, onSetDefaultAddress }) => {
  const [editingAddr, setEditingAddr] = useState(null);
  const [showForm, setShowForm] = useState(false);

  const handleEdit = (addr) => {
    setEditingAddr(addr);
    setShowForm(true);
  };

  const handleCreateNew = () => {
    setEditingAddr({ address: '', city: 'Dhaka', division: 'Dhaka', postalCode: '1207' });
    setShowForm(true);
  };

  const handleFormSave = () => {
    if (editingAddr && editingAddr.address) {
      onSaveAddress(editingAddr);
      setShowForm(false);
      setEditingAddr(null);
    }
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
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
          Address Book ({addresses.length})
        </h3>
        <button
          type="button"
          onClick={handleCreateNew}
          style={{
            padding: '8px 14px',
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '13px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FiPlus /> Add New Address
        </button>
      </div>

      {showForm && (
        <div style={{ padding: '16px', backgroundColor: '#081621', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <AddressForm
            title={editingAddr?.id ? 'Edit Address' : 'Add New Address'}
            addressData={editingAddr}
            onChange={(data) => setEditingAddr((prev) => ({ ...prev, ...data }))}
          />
          <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
            <button type="button" onClick={handleFormSave} className="btn btn-primary">Save Address</button>
          </div>
        </div>
      )}

      {/* Address Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '16px' }}>
        {addresses.map((addr) => (
          <div
            key={addr.id}
            style={{
              padding: '16px',
              borderRadius: '12px',
              backgroundColor: '#081621',
              border: addr.isDefault ? '2px solid #D51E0B' : '1px solid rgba(255,255,255,0.1)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'space-between',
              gap: '12px'
            }}
          >
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                <strong style={{ color: '#ffffff', fontSize: '14px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <FiMapPin style={{ color: '#D51E0B' }} /> {addr.title || 'Address'}
                </strong>
                {addr.isDefault && (
                  <span style={{ fontSize: '10px', backgroundColor: 'rgba(34, 197, 94, 0.2)', color: '#22c55e', padding: '2px 8px', borderRadius: '4px', fontWeight: '800' }}>
                    DEFAULT
                  </span>
                )}
              </div>
              <div style={{ fontSize: '13px', color: '#9ca3af' }}>{addr.address}</div>
              <div style={{ fontSize: '12px', color: '#9ca3af', marginTop: '2px' }}>
                {addr.city}, {addr.division} {addr.postalCode}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '10px', borderTop: '1px solid rgba(255,255,255,0.06)' }}>
              {!addr.isDefault && (
                <button type="button" onClick={() => onSetDefaultAddress(addr.id)} style={{ background: 'none', border: 'none', color: '#22c55e', fontSize: '12px', fontWeight: '700', cursor: 'pointer' }}>
                  Make Default
                </button>
              )}
              <div style={{ display: 'flex', gap: '8px', marginLeft: 'auto' }}>
                <button type="button" onClick={() => handleEdit(addr)} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
                  <FiEdit2 size={14} />
                </button>
                <button type="button" onClick={() => onDeleteAddress(addr.id)} style={{ background: 'none', border: 'none', color: '#ef4444', cursor: 'pointer' }}>
                  <FiTrash2 size={14} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardAddresses;
