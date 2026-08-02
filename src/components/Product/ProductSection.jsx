import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiZap } from 'react-icons/fi';
import productService from '../../services/productService';
import ProductCard from './ProductCard';
import ProductSkeleton from './ProductSkeleton';

const ProductSection = ({ title = 'Featured Products', type = 'featured', limit = 4, viewAllLink = '/category/1' }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadSectionData = async () => {
      setLoading(true);
      try {
        let list = [];
        if (type === 'featured') list = await productService.getFeaturedProducts();
        else if (type === 'latest') list = await productService.getLatestProducts();
        else if (type === 'trending') list = await productService.getTrendingProducts();
        else if (type === 'bestsellers') list = await productService.getBestSellingProducts();
        else if (type === 'toprated') list = await productService.getTopRatedProducts();
        else list = await productService.getFeaturedProducts();

        if (isMounted) setProducts(list.slice(0, limit));
      } catch (err) {
        console.warn('ProductSection fetch notice:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    loadSectionData();
    return () => { isMounted = false; };
  }, [type, limit]);

  return (
    <section style={{ marginBottom: '40px' }}>
      {/* Section Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <FiZap style={{ color: '#D51E0B' }} /> {title}
        </h2>

        {viewAllLink && (
          <Link
            to={viewAllLink}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              color: '#D51E0B',
              fontSize: '14px',
              fontWeight: '700',
              textDecoration: 'none'
            }}
          >
            View All <FiChevronRight />
          </Link>
        )}
      </div>

      {/* Grid Content */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {loading ? (
          <ProductSkeleton count={limit} />
        ) : (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        )}
      </div>
    </section>
  );
};

export default ProductSection;
