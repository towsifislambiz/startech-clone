import React, { useEffect, useState } from 'react';
import productService from '../../services/productService';
import ProductCard from './ProductCard';

const RelatedProducts = ({ currentId, category, brand, price }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    const fetchRelated = async () => {
      setLoading(true);
      try {
        const list = await productService.getRelatedProducts(currentId, category, brand, price);
        if (isMounted) setProducts(list);
      } catch (err) {
        console.warn('Error fetching related products:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchRelated();
    return () => { isMounted = false; };
  }, [currentId, category, brand, price]);

  if (loading || !products || products.length === 0) return null;

  return (
    <div style={{ marginTop: '48px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2 style={{ fontSize: '22px', fontWeight: '800', color: 'var(--text-primary)' }}>
          Related Products
        </h2>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: '20px' }}>
        {products.map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </div>
  );
};

export default RelatedProducts;
