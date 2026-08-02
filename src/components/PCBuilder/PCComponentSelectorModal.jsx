import React, { useState, useEffect } from 'react';
import { FiX, FiSearch } from 'react-icons/fi';
import productService from '../../services/productService';

const PCComponentSelectorModal = ({ category, isOpen = false, onClose, onSelectProduct }) => {
  const [search, setSearch] = useState('');
  const [catalog, setCatalog] = useState([]);

  useEffect(() => {
    productService.getProducts().then((res) => setCatalog(res.products || []));
  }, []);

  if (!isOpen || !category) return null;

  // Filter product catalog by category / search query
  const availableProducts = catalog.filter((p) => {
    const catMatch =
      p.category?.toLowerCase().includes(category.key.toLowerCase()) ||
      p.subCategory?.toLowerCase().includes(category.key.toLowerCase()) ||
      p.name?.toLowerCase().includes(category.key.toLowerCase());

    const searchMatch = !search.trim() || p.name?.toLowerCase().includes(search.toLowerCase());
    return catMatch && searchMatch;
  });

  const displayList = availableProducts.length > 0 ? availableProducts : catalog.slice(0, 8);

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(4px)',
          zIndex: 99990
        }}
      />

      {/* Modal Card */}
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '700px',
          maxHeight: '85vh',
          backgroundColor: '#081621',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          zIndex: 99999,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '0 25px 50px rgba(0,0,0,0.6)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        {/* Header */}
        <div style={{ padding: '16px 20px', backgroundColor: '#0c1c28', borderBottom: '1px solid rgba(255, 255, 255, 0.1)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ margin: 0, color: '#ffffff', fontSize: '16px', fontWeight: '800', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>{category.icon}</span> Select {category.label}
          </h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            <FiX size={22} />
          </button>
        </div>

        {/* Search Input */}
        <div style={{ padding: '12px 20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)' }}>
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder={`Search ${category.label}...`}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                width: '100%',
                padding: '8px 12px 8px 36px',
                borderRadius: '8px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#0c1c28',
                color: '#ffffff',
                fontSize: '13px',
                outline: 'none'
              }}
            />
            <FiSearch style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#9ca3af' }} />
          </div>
        </div>

        {/* Products List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {displayList.map((product) => (
            <div
              key={product.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '14px',
                padding: '12px',
                borderRadius: '10px',
                backgroundColor: '#0c1c28',
                border: '1px solid rgba(255, 255, 255, 0.08)'
              }}
            >
              <img
                src={product.thumbnail || (product.images && product.images[0]) || ''}
                alt=""
                style={{ width: '50px', height: '50px', objectFit: 'contain', borderRadius: '6px', backgroundColor: 'rgba(0,0,0,0.2)' }}
              />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                  {product.name}
                </div>
                <div style={{ fontSize: '11px', color: '#9ca3af', marginTop: '2px' }}>
                  Brand: <strong>{product.brand}</strong> • <span style={{ color: '#22c55e' }}>{product.stock}</span>
                </div>
              </div>

              <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                <strong style={{ fontSize: '15px', color: '#D51E0B' }}>
                  ৳{product.price.toLocaleString('en-IN')}
                </strong>
                <button
                  type="button"
                  onClick={() => onSelectProduct(category.key, product)}
                  style={{
                    padding: '6px 14px',
                    backgroundColor: '#D51E0B',
                    color: '#ffffff',
                    fontWeight: '700',
                    fontSize: '12px',
                    borderRadius: '6px',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  Add
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default PCComponentSelectorModal;
