import React, { useState, useEffect } from 'react';
import { FiX, FiCheckCircle } from 'react-icons/fi';

const AdminProductModal = ({ isOpen, onClose, onSave, productToEdit }) => {
  const [formData, setFormData] = useState({
    name: '',
    category: 'Laptop',
    brand: 'StarTech',
    price: '',
    regular_price: '',
    stockQuantity: '10',
    in_stock: true,
    featured_image: '',
    description: ''
  });

  useEffect(() => {
    if (productToEdit) {
      setFormData({
        name: productToEdit.name || '',
        category: productToEdit.category || 'Laptop',
        brand: productToEdit.brand || 'StarTech',
        price: productToEdit.price || '',
        regular_price: productToEdit.regular_price || productToEdit.price || '',
        stockQuantity: productToEdit.stockQuantity || '10',
        in_stock: productToEdit.in_stock !== false,
        featured_image: productToEdit.featured_image || productToEdit.image || '',
        description: productToEdit.description || ''
      });
    } else {
      setFormData({
        name: '',
        category: 'Laptop',
        brand: 'StarTech',
        price: '',
        regular_price: '',
        stockQuantity: '10',
        in_stock: true,
        featured_image: '',
        description: ''
      });
    }
  }, [productToEdit, isOpen]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <>
      <div onClick={onClose} style={{ position: 'fixed', inset: 0, backgroundColor: 'rgba(0,0,0,0.8)', zIndex: 99990, backdropFilter: 'blur(6px)' }} />
      <div
        style={{
          position: 'fixed',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '90%',
          maxWidth: '560px',
          backgroundColor: '#0c1c28',
          border: '1px solid rgba(255, 255, 255, 0.15)',
          padding: '30px',
          borderRadius: '20px',
          zIndex: 99999,
          color: '#ffffff',
          boxShadow: '0 24px 48px rgba(0, 0, 0, 0.5)',
          fontFamily: "'Inter', sans-serif"
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px', borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '12px' }}>
          <h3 style={{ margin: 0, fontSize: '20px', fontWeight: '800' }}>
            {productToEdit ? 'Edit Product Item' : 'Add New Tech Product'}
          </h3>
          <button type="button" onClick={onClose} style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }}>
            <FiX size={22} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '70vh', overflowY: 'auto', paddingRight: '4px' }}>
          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              Product Title *
            </label>
            <input
              type="text"
              name="name"
              required
              placeholder="e.g. Asus ROG Strix Gaming Laptop"
              value={formData.name}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '14px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                Category
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 12px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '13.5px',
                  fontWeight: '700',
                  outline: 'none'
                }}
              >
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Component">Component</option>
                <option value="Monitor">Monitor</option>
                <option value="UPS">UPS</option>
                <option value="Tablet">Tablet</option>
                <option value="Accessories">Accessories</option>
              </select>
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                Brand
              </label>
              <input
                type="text"
                name="brand"
                placeholder="e.g. Asus, Apple, HP"
                value={formData.brand}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
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

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                Offer Price (৳) *
              </label>
              <input
                type="number"
                name="price"
                required
                placeholder="e.g. 125000"
                value={formData.price}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
                  borderRadius: '10px',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  backgroundColor: '#081621',
                  color: '#ffffff',
                  fontSize: '14px',
                  outline: 'none'
                }}
              />
            </div>

            <div>
              <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
                Regular Price (৳)
              </label>
              <input
                type="number"
                name="regular_price"
                placeholder="e.g. 135000"
                value={formData.regular_price}
                onChange={handleChange}
                style={{
                  width: '100%',
                  padding: '10px 14px',
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

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              Image URL
            </label>
            <input
              type="url"
              name="featured_image"
              placeholder="https://images.unsplash.com/photo-..."
              value={formData.featured_image}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13.5px',
                outline: 'none'
              }}
            />
          </div>

          <div>
            <label style={{ fontSize: '13px', fontWeight: '700', color: '#ffffff', display: 'block', marginBottom: '6px' }}>
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              placeholder="Enter product description and specifications..."
              value={formData.description}
              onChange={handleChange}
              style={{
                width: '100%',
                padding: '10px 14px',
                borderRadius: '10px',
                border: '1px solid rgba(255, 255, 255, 0.15)',
                backgroundColor: '#081621',
                color: '#ffffff',
                fontSize: '13.5px',
                outline: 'none'
              }}
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '4px' }}>
            <input
              type="checkbox"
              id="in_stock_chk"
              name="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
              style={{ width: '18px', height: '18px', accentColor: '#D51E0B' }}
            />
            <label htmlFor="in_stock_chk" style={{ fontSize: '13.5px', fontWeight: '700', color: '#ffffff', cursor: 'pointer' }}>
              Product Available in Stock
            </label>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '12px' }}>
            <button
              type="button"
              onClick={onClose}
              style={{
                padding: '10px 18px',
                borderRadius: '10px',
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                color: '#ffffff',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: '700',
                cursor: 'pointer'
              }}
            >
              Cancel
            </button>

            <button
              type="submit"
              style={{
                padding: '10px 22px',
                borderRadius: '10px',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                border: 'none',
                fontSize: '13.5px',
                fontWeight: '800',
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(213, 30, 11, 0.35)',
                display: 'flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <FiCheckCircle size={16} /> {productToEdit ? 'Save Changes' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default AdminProductModal;
