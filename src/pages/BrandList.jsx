import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiTag, FiChevronRight, FiBox } from 'react-icons/fi';
import productService from '../services/productService';

const BrandList = () => {
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchBrandDirectory = async () => {
      setLoading(true);
      try {
        const list = await productService.getBrands();
        if (isMounted) {
          setBrands(list);
          document.title = 'All Authorized Brands | StarTech';
        }
      } catch (err) {
        console.warn('Error fetching brand list:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBrandDirectory();
    return () => { isMounted = false; };
  }, []);

  return (
    <div style={{ padding: '24px 0 60px 0', minHeight: '75vh', backgroundColor: 'var(--bg)', fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 0', marginBottom: '28px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> <FiChevronRight />
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>All Brands</span>
        </div>
      </div>

      <div className="container">
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: '900', color: 'var(--text-primary)', marginBottom: '8px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <FiTag style={{ color: '#D51E0B' }} /> Official Brand Directory
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '15px' }}>
            Browse products by top global technology brands available at StarTech Bangladesh.
          </p>
        </div>

        {/* Brands Grid */}
        {loading ? (
          <div style={{ color: 'var(--text-secondary)' }}>Loading brands directory...</div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
            {brands.map((brand) => (
              <Link
                key={brand.slug}
                to={`/brand/${brand.slug}`}
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: '12px',
                  padding: '24px 16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  textDecoration: 'none',
                  transition: 'transform 0.2s ease, border-color 0.2s ease',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <div
                  style={{
                    width: '100%',
                    height: '60px',
                    backgroundColor: '#081621',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '18px',
                    fontWeight: '900',
                    color: '#ffffff',
                    marginBottom: '14px',
                    letterSpacing: '1px'
                  }}
                >
                  {brand.name}
                </div>

                <div style={{ fontSize: '15px', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '4px' }}>
                  {brand.name}
                </div>

                <div style={{ fontSize: '12px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <FiBox size={12} /> {brand.count} Products
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default BrandList;
