import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTrash2, FiChevronRight, FiX, FiShoppingCart, FiPlus } from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import useCompare from '../hooks/useCompare';
import { useCart } from '../context/CartContext';
import './Category.css';

const Comparison = () => {
  const { compareItems, compareCount, removeFromCompare, clearCompare } = useCompare();
  const { addToCart } = useCart();
  const [highlightDifferences, setHighlightDifferences] = useState(false);

  // Extract all unique specification keys across compare products
  const specKeysSet = new Set();
  compareItems.forEach((prod) => {
    if (prod.specifications && typeof prod.specifications === 'object') {
      Object.values(prod.specifications).forEach((groupFields) => {
        if (groupFields && typeof groupFields === 'object') {
          Object.keys(groupFields).forEach((k) => specKeysSet.add(k));
        }
      });
    }
  });

  const specKeys = Array.from(specKeysSet);

  const getSpecValue = (product, specKey) => {
    if (!product.specifications) return 'N/A';
    let found = 'N/A';
    Object.values(product.specifications).forEach((groupFields) => {
      if (groupFields && groupFields[specKey] !== undefined) {
        found = groupFields[specKey];
      }
    });
    return found;
  };

  const isSpecDifferent = (specKey) => {
    if (compareItems.length <= 1) return false;
    const values = compareItems.map((prod) => getSpecValue(prod, specKey));
    return !values.every((v) => v === values[0]);
  };

  return (
    <div className="cat" style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb Header */}
      <div className="cat-breadcrumb">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
          <Link to="/" style={{ color: 'var(--text-secondary, #94a3b8)', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight size={14} style={{ color: 'var(--text-muted, #64748b)' }} />
          <span style={{ color: '#D51E0B', fontWeight: '600' }}>Product Comparison</span>
        </div>
      </div>

      {/* Header Strip */}
      <div className="container" style={{ marginTop: '24px', marginBottom: '32px' }}>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '16px',
            padding: '24px 30px',
            backgroundColor: 'var(--bg-secondary, #0c1c28)',
            border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
            borderRadius: '16px',
            boxShadow: '0 12px 32px rgba(0,0,0,0.12)'
          }}
        >
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
              <div style={{ width: '36px', height: '36px', borderRadius: '10px', backgroundColor: 'rgba(59, 130, 246, 0.12)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <BsArrowLeftRight size={20} />
              </div>
              <h1 style={{ fontSize: '24px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0 }}>
                Product Comparison <span style={{ fontSize: '16px', color: '#D51E0B', fontWeight: '700' }}>({compareCount}/4 Products)</span>
              </h1>
            </div>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14px', margin: 0 }}>
              Side-by-side technical specification analysis & feature benchmark comparison
            </p>
          </div>

          {compareCount > 0 && (
            <div style={{ display: 'flex', gap: '14px', alignItems: 'center', flexWrap: 'wrap' }}>
              <label
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontSize: '13.5px',
                  fontWeight: '600',
                  color: 'var(--text-primary, #ffffff)',
                  backgroundColor: 'rgba(213, 30, 11, 0.08)',
                  border: '1px solid rgba(213, 30, 11, 0.2)',
                  padding: '8px 14px',
                  borderRadius: '10px',
                  cursor: 'pointer'
                }}
              >
                <input
                  type="checkbox"
                  checked={highlightDifferences}
                  onChange={(e) => setHighlightDifferences(e.target.checked)}
                  style={{ accentColor: '#D51E0B', width: '16px', height: '16px', cursor: 'pointer' }}
                />
                Highlight Differences
              </label>

              <button
                type="button"
                onClick={clearCompare}
                style={{
                  padding: '9px 16px',
                  backgroundColor: 'rgba(239, 68, 68, 0.1)',
                  color: '#ef4444',
                  border: '1px solid rgba(239, 68, 68, 0.25)',
                  borderRadius: '10px',
                  fontWeight: '700',
                  fontSize: '13px',
                  cursor: 'pointer',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '6px',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = '#ef4444';
                  e.currentTarget.style.color = '#ffffff';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(239, 68, 68, 0.1)';
                  e.currentTarget.style.color = '#ef4444';
                }}
              >
                <FiTrash2 size={16} /> Clear All
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="container">
        {compareCount === 0 ? (
          /* Empty Comparison State */
          <div
            style={{
              textAlign: 'center',
              padding: '80px 24px',
              backgroundColor: 'var(--bg-secondary, #0c1c28)',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              borderRadius: '20px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
              maxWidth: '600px',
              margin: '0 auto'
            }}
          >
            <div
              style={{
                width: '96px',
                height: '96px',
                borderRadius: '50%',
                backgroundColor: 'rgba(59, 130, 246, 0.1)',
                color: '#3b82f6',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px auto',
                boxShadow: '0 0 40px rgba(59, 130, 246, 0.15)'
              }}
            >
              <BsArrowLeftRight size={44} />
            </div>
            <h2 style={{ color: 'var(--text-primary, #ffffff)', fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>
              No Products Selected for Comparison
            </h2>
            <p style={{ color: 'var(--text-secondary, #94a3b8)', fontSize: '14.5px', lineHeight: 1.6, marginBottom: '28px' }}>
              Click the compare icon on up to 4 products across our catalog to compare prices, memory, clock speeds, and hardware specifications side-by-side!
            </p>
            <Link
              to="/category/component"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                padding: '14px 28px',
                backgroundColor: '#D51E0B',
                color: '#ffffff',
                fontWeight: '800',
                fontSize: '15px',
                borderRadius: '12px',
                textDecoration: 'none',
                boxShadow: '0 8px 24px rgba(213, 30, 11, 0.3)'
              }}
            >
              <FiPlus size={18} /> Add Products to Compare
            </Link>
          </div>
        ) : (
          /* Side-by-Side Modern Spec Table */
          <div
            style={{
              overflowX: 'auto',
              backgroundColor: 'var(--bg-secondary, #0c1c28)',
              border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 16px 36px rgba(0,0,0,0.18)'
            }}
          >
            <table style={{ width: '100%', borderCollapse: 'separate', borderSpacing: 0, textAlign: 'left', color: 'var(--text-primary, #ffffff)' }}>
              <thead>
                <tr>
                  <th
                    style={{
                      width: '200px',
                      padding: '20px 16px',
                      backgroundColor: 'var(--bg, #081621)',
                      color: 'var(--text-secondary, #94a3b8)',
                      fontSize: '13px',
                      fontWeight: '800',
                      textTransform: 'uppercase',
                      letterSpacing: '0.6px',
                      borderBottom: '2px solid rgba(255,255,255,0.1)',
                      borderTopLeftRadius: '12px',
                      borderBottomLeftRadius: '12px'
                    }}
                  >
                    Specifications
                  </th>
                  {compareItems.map((prod, i) => (
                    <th
                      key={prod.id}
                      style={{
                        minWidth: '240px',
                        padding: '20px 18px',
                        backgroundColor: 'var(--bg, #081621)',
                        borderBottom: '2px solid rgba(255,255,255,0.1)',
                        verticalAlign: 'top',
                        borderTopRightRadius: i === compareItems.length - 1 ? '12px' : 0,
                        borderBottomRightRadius: i === compareItems.length - 1 ? '12px' : 0
                      }}
                    >
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', height: '100%' }}>
                        <button
                          type="button"
                          onClick={() => removeFromCompare(prod.id)}
                          style={{
                            alignSelf: 'flex-end',
                            background: 'rgba(239, 68, 68, 0.1)',
                            border: 'none',
                            color: '#ef4444',
                            borderRadius: '50%',
                            width: '28px',
                            height: '28px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer'
                          }}
                          title="Remove from comparison"
                        >
                          <FiX size={16} />
                        </button>
                        <img
                          src={prod.thumbnail || (prod.images && prod.images[0])}
                          alt={prod.name}
                          style={{ height: '130px', objectFit: 'contain', margin: '0 auto' }}
                        />
                        <span style={{ fontSize: '11px', fontWeight: '800', color: '#D51E0B', textTransform: 'uppercase' }}>
                          {prod.brand}
                        </span>
                        <Link to={`/product/${prod.id}`} style={{ color: 'var(--text-primary, #ffffff)', fontWeight: '700', fontSize: '14.5px', lineHeight: 1.35, textDecoration: 'none' }}>
                          {prod.name}
                        </Link>
                        <div style={{ fontSize: '20px', fontWeight: '900', color: '#D51E0B', marginTop: 'auto' }}>
                          ৳{(prod.selling_price || prod.price).toLocaleString('en-IN')}
                        </div>
                        <button
                          type="button"
                          onClick={() => addToCart(prod, 1)}
                          style={{
                            padding: '10px',
                            backgroundColor: '#D51E0B',
                            color: '#ffffff',
                            fontWeight: '700',
                            fontSize: '13px',
                            borderRadius: '8px',
                            border: 'none',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            gap: '6px',
                            cursor: 'pointer',
                            marginTop: '8px'
                          }}
                        >
                          <FiShoppingCart size={15} /> Add to Cart
                        </button>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {/* Brand Row */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))' }}>
                    Brand
                  </td>
                  {compareItems.map((p) => (
                    <td key={p.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))', fontWeight: '700', color: 'var(--text-primary, #ffffff)' }}>
                      {p.brand}
                    </td>
                  ))}
                </tr>

                {/* Stock Status Row */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))' }}>
                    Availability
                  </td>
                  {compareItems.map((p) => (
                    <td key={p.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))' }}>
                      <span style={{ fontWeight: '700', fontSize: '12px', padding: '3px 10px', borderRadius: '99px', backgroundColor: p.stock === 'In Stock' ? 'rgba(34, 197, 94, 0.15)' : 'rgba(239, 68, 68, 0.15)', color: p.stock === 'In Stock' ? '#22c55e' : '#ef4444' }}>
                        {p.stock || 'In Stock'}
                      </span>
                    </td>
                  ))}
                </tr>

                {/* Rating Row */}
                <tr>
                  <td style={{ padding: '16px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))' }}>
                    Rating
                  </td>
                  {compareItems.map((p) => (
                    <td key={p.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))', fontWeight: '700', color: '#f59e0b' }}>
                      ★ {p.rating || 4.9} ({p.reviewsCount || 120} reviews)
                    </td>
                  ))}
                </tr>

                {/* Dynamic Hardware Specs Rows */}
                {specKeys.map((key) => {
                  const isDiff = isSpecDifferent(key);
                  const isHighlighted = highlightDifferences && isDiff;
                  return (
                    <tr key={key} style={{ backgroundColor: isHighlighted ? 'rgba(213, 30, 11, 0.15)' : 'transparent', transition: 'background-color 0.2s ease' }}>
                      <td style={{ padding: '16px', fontWeight: '700', color: isHighlighted ? '#D51E0B' : 'var(--text-secondary, #94a3b8)', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))' }}>
                        {key}
                      </td>
                      {compareItems.map((p) => (
                        <td key={p.id} style={{ padding: '16px', borderBottom: '1px solid var(--border-color, rgba(255,255,255,0.06))', fontSize: '13.5px', color: 'var(--text-primary, #ffffff)' }}>
                          {getSpecValue(p, key)}
                        </td>
                      ))}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default Comparison;
