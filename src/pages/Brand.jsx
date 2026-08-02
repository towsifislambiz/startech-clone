import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronRight, FiGrid, FiSliders } from 'react-icons/fi';
import productService from '../services/productService';
import ProductCard from '../components/Product/ProductCard';
import ProductSkeleton from '../components/Product/ProductSkeleton';

const Brand = () => {
  const { brandSlug } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const brandName = brandSlug ? brandSlug.toUpperCase() : 'BRAND';

  useEffect(() => {
    let isMounted = true;
    const fetchBrandProducts = async () => {
      setLoading(true);
      try {
        const list = await productService.getProductsByBrand(brandSlug);
        if (isMounted) {
          setProducts(list);
          document.title = `${brandName} Products & Price in BD | StarTech`;
        }
      } catch (err) {
        console.warn('Error fetching brand products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchBrandProducts();
    return () => { isMounted = false; };
  }, [brandSlug, brandName]);

  return (
    <div style={{ padding: '24px 0 60px 0', minHeight: '75vh', backgroundColor: 'var(--bg)', fontFamily: "'Inter', sans-serif" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: 'var(--bg-secondary)', borderBottom: '1px solid var(--border-color)', padding: '12px 0', marginBottom: '28px' }}>
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '13px', color: 'var(--text-secondary)' }}>
          <Link to="/" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Home</Link> <FiChevronRight />
          <Link to="/brands" style={{ color: 'var(--text-secondary)', textDecoration: 'none' }}>Brands</Link> <FiChevronRight />
          <span style={{ color: 'var(--text-primary)', fontWeight: '600' }}>{brandName}</span>
        </div>
      </div>

      <div className="container">
        {/* Brand Header Banner */}
        <div
          style={{
            backgroundColor: 'var(--bg-secondary)',
            border: '1px solid var(--border-color)',
            borderRadius: '16px',
            padding: '32px',
            marginBottom: '32px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '20px',
            boxShadow: '0 10px 25px rgba(0,0,0,0.1)'
          }}
        >
          <div>
            <span style={{ color: '#D51E0B', fontSize: '12px', fontWeight: '800', textTransform: 'uppercase', letterSpacing: '1px' }}>
              Official Partner Store
            </span>
            <h1 style={{ fontSize: '32px', fontWeight: '900', color: 'var(--text-primary)', margin: '4px 0 8px 0' }}>
              {brandName} Products
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', margin: 0 }}>
              Browse genuine {brandName} laptops, graphics cards, motherboards, components, and accessories with official warranty in Bangladesh.
            </p>
          </div>

          <div
            style={{
              padding: '16px 24px',
              backgroundColor: '#081621',
              borderRadius: '12px',
              border: '1px solid rgba(255,255,255,0.1)',
              fontWeight: '800',
              fontSize: '20px',
              color: '#ffffff',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0
            }}
          >
            {brandName}
          </div>
        </div>

        {/* Product Grid Header Bar */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
          <h3 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <FiGrid style={{ color: '#D51E0B' }} /> Available {brandName} Products ({products.length})
          </h3>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            <ProductSkeleton count={4} />
          </div>
        ) : products.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', backgroundColor: 'var(--bg-secondary)', borderRadius: '16px', border: '1px solid var(--border-color)' }}>
            <FiSliders size={48} style={{ color: '#D51E0B', marginBottom: '16px' }} />
            <h3>No products found for {brandName}</h3>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '20px' }}>Check back soon for new inventory stock.</p>
            <Link to="/brands" className="btn btn-primary" style={{ textDecoration: 'none' }}>View All Brands</Link>
          </div>
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
            {products.map((prod) => (
              <ProductCard key={prod.id} product={prod} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Brand;
