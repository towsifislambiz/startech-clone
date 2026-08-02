import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { clearRecentlyViewed } from '../../store/recentlyViewedSlice';
import ProductCard from './ProductCard';
import { FiClock, FiTrash2 } from 'react-icons/fi';

const RecentlyViewed = ({ excludeId = null }) => {
  const dispatch = useDispatch();
  const recentItems = useSelector((state) => state.recentlyViewed.items);

  const displayList = excludeId
    ? recentItems.filter((item) => item.id !== excludeId)
    : recentItems;

  if (!displayList || displayList.length === 0) return null;

  return (
    <section style={{ marginTop: '40px', marginBottom: '20px' }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '16px'
        }}
      >
        <h3
          style={{
            fontSize: '20px',
            fontWeight: '800',
            color: 'var(--text-primary, #ffffff)',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            margin: 0
          }}
        >
          <FiClock style={{ color: '#D51E0B' }} /> Recently Viewed Products
        </h3>

        <button
          type="button"
          onClick={() => dispatch(clearRecentlyViewed())}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--text-secondary, #9ca3af)',
            fontSize: '12px',
            fontWeight: '600',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}
        >
          <FiTrash2 size={13} /> Clear History
        </button>
      </div>

      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))',
          gap: '16px'
        }}
      >
        {displayList.slice(0, 4).map((prod) => (
          <ProductCard key={prod.id} product={prod} />
        ))}
      </div>
    </section>
  );
};

export default RecentlyViewed;
