import React, { useState } from 'react';
import { FiPlus, FiEdit, FiTrash2, FiSearch, FiBox, FiCheckCircle, FiXCircle, FiFilter } from 'react-icons/fi';

const AdminProducts = ({ products = [], onOpenAddModal, onOpenEditModal, onDeleteProduct, onToggleStock }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || p.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', ...Array.from(new Set(products.map((p) => p.category).filter(Boolean)))];

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
      {/* Header Bar & Actions */}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '16px' }}>
        <div>
          <h3 style={{ fontSize: '20px', fontWeight: '800', color: '#ffffff', margin: '0 0 4px 0', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiBox style={{ color: '#D51E0B' }} /> Tech Product Catalog Management ({products.length})
          </h3>
          <p style={{ color: '#94a3b8', fontSize: '13px', margin: 0 }}>
            Add new products, adjust pricing, manage inventory stock, or remove legacy items
          </p>
        </div>

        <button
          type="button"
          onClick={onOpenAddModal}
          style={{
            padding: '12px 20px',
            borderRadius: '12px',
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            border: 'none',
            fontSize: '14px',
            fontWeight: '800',
            cursor: 'pointer',
            boxShadow: '0 6px 20px rgba(213, 30, 11, 0.35)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          <FiPlus size={18} /> Add New Product
        </button>
      </div>

      {/* Filter & Search Toolbar */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '14px', alignItems: 'center', justifyContent: 'space-between' }}>
        <div style={{ position: 'relative', width: '100%', maxWidth: '340px' }}>
          <FiSearch style={{ position: 'absolute', left: '14px', top: '13px', color: '#64748b' }} size={16} />
          <input
            type="text"
            placeholder="Search products by title, brand..."
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

        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <FiFilter size={16} style={{ color: '#94a3b8' }} />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            style={{
              padding: '10px 14px',
              borderRadius: '10px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: '#081621',
              color: '#ffffff',
              fontSize: '13.5px',
              fontWeight: '700',
              outline: 'none',
              cursor: 'pointer'
            }}
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Products Table */}
      <div style={{ overflowX: 'auto' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '14px' }}>
          <thead>
            <tr style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.1)', color: '#94a3b8' }}>
              <th style={{ padding: '14px 10px' }}>Product</th>
              <th style={{ padding: '14px 10px' }}>Category</th>
              <th style={{ padding: '14px 10px' }}>Price</th>
              <th style={{ padding: '14px 10px' }}>Stock Status</th>
              <th style={{ padding: '14px 10px', textAlign: 'right' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts.map((p) => {
              const inStock = p.in_stock !== false;

              return (
                <tr key={p.id} style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.06)' }}>
                  <td style={{ padding: '16px 10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                      <img
                        src={p.featured_image || p.image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400'}
                        alt={p.name}
                        style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '10px', backgroundColor: 'rgba(0,0,0,0.3)', border: '1px solid rgba(255,255,255,0.06)' }}
                      />
                      <div style={{ maxWidth: '280px' }}>
                        <div style={{ fontWeight: '800', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                          {p.name}
                        </div>
                        <div style={{ fontSize: '12px', color: '#94a3b8' }}>Brand: {p.brand || 'StarTech'}</div>
                      </div>
                    </div>
                  </td>

                  <td style={{ padding: '16px 10px', color: '#94a3b8' }}>
                    <span style={{ backgroundColor: 'rgba(255,255,255,0.08)', padding: '4px 10px', borderRadius: '6px', fontSize: '12px', fontWeight: '700' }}>
                      {p.category || 'Tech'}
                    </span>
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <strong style={{ color: '#D51E0B', fontSize: '15px' }}>
                      ৳{(p.price || 0).toLocaleString('en-IN')}
                    </strong>
                  </td>

                  <td style={{ padding: '16px 10px' }}>
                    <button
                      type="button"
                      onClick={() => onToggleStock(p.id, inStock)}
                      style={{
                        padding: '4px 10px',
                        borderRadius: '6px',
                        backgroundColor: inStock ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)',
                        color: inStock ? '#22c55e' : '#ef4444',
                        border: inStock ? '1px solid rgba(34, 197, 94, 0.3)' : '1px solid rgba(239, 68, 68, 0.3)',
                        fontSize: '12px',
                        fontWeight: '800',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '4px'
                      }}
                    >
                      {inStock ? <><FiCheckCircle size={12} /> In Stock</> : <><FiXCircle size={12} /> Out of Stock</>}
                    </button>
                  </td>

                  <td style={{ padding: '16px 10px', textAlign: 'right' }}>
                    <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
                      <button
                        type="button"
                        onClick={() => onOpenEditModal(p)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(59, 130, 246, 0.15)',
                          color: '#3b82f6',
                          border: '1px solid rgba(59, 130, 246, 0.3)',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FiEdit size={14} /> Edit
                      </button>

                      <button
                        type="button"
                        onClick={() => onDeleteProduct(p.id)}
                        style={{
                          padding: '8px 12px',
                          borderRadius: '8px',
                          backgroundColor: 'rgba(239, 68, 68, 0.15)',
                          color: '#ef4444',
                          border: '1px solid rgba(239, 68, 68, 0.3)',
                          fontSize: '12.5px',
                          fontWeight: '700',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                      >
                        <FiTrash2 size={14} /> Delete
                      </button>
                    </div>
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

export default AdminProducts;
