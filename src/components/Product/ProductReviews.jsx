import React from 'react';
import { FiStar, FiCheckCircle } from 'react-icons/fi';

const ProductReviews = ({ rating = 4.8, reviewsCount = 12, reviewsList = [] }) => {
  const breakdown = [
    { stars: 5, pct: 85 },
    { stars: 4, pct: 10 },
    { stars: 3, pct: 3 },
    { stars: 2, pct: 1 },
    { stars: 1, pct: 1 },
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '28px' }}>
      {/* Review Summary Card */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '24px',
          backgroundColor: 'var(--bg-secondary, #0c1c28)',
          border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
          borderRadius: '16px',
          padding: '24px',
          alignItems: 'center'
        }}
      >
        {/* Score Column */}
        <div style={{ textAlign: 'center', borderRight: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))', paddingRight: '20px' }}>
          <div style={{ fontSize: '48px', fontWeight: '900', color: '#D51E0B', lineHeight: '1', marginBottom: '8px' }}>
            {rating}
          </div>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '4px', marginBottom: '6px' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar key={s} size={18} style={{ color: s <= Math.round(rating) ? '#f59e0b' : '#4b5563', fill: s <= Math.round(rating) ? '#f59e0b' : 'none' }} />
            ))}
          </div>
          <div style={{ color: 'var(--text-secondary)', fontSize: '13px' }}>
            Based on {reviewsCount} verified reviews
          </div>
        </div>

        {/* Breakdown Bars */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {breakdown.map((item) => (
            <div key={item.stars} style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '12px' }}>
              <span style={{ width: '40px', color: 'var(--text-secondary)', fontWeight: '600' }}>{item.stars} ★</span>
              <div style={{ flex: 1, height: '8px', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '99px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${item.pct}%`, backgroundColor: '#f59e0b', borderRadius: '99px' }} />
              </div>
              <span style={{ width: '32px', textAlign: 'right', color: 'var(--text-secondary)' }}>{item.pct}%</span>
            </div>
          ))}
        </div>
      </div>

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <h4 style={{ fontSize: '18px', fontWeight: '700', color: 'var(--text-primary)' }}>Customer Reviews</h4>
        {reviewsList.map((rev) => (
          <div
            key={rev.id}
            style={{
              backgroundColor: 'var(--bg-secondary, #0c1c28)',
              border: '1px solid var(--border-color, rgba(255, 255, 255, 0.08))',
              borderRadius: '12px',
              padding: '20px',
              display: 'flex',
              flexDirection: 'column',
              gap: '10px'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontWeight: '700', fontSize: '14px', color: 'var(--text-primary)' }}>{rev.author}</span>
                {rev.verified && (
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '11px', color: '#10b981', backgroundColor: 'rgba(16, 185, 129, 0.12)', padding: '2px 8px', borderRadius: '99px', fontWeight: '600' }}>
                    <FiCheckCircle size={12} /> Verified Purchase
                  </span>
                )}
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{rev.date}</span>
            </div>

            <div style={{ display: 'flex', gap: '3px' }}>
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} size={14} style={{ color: s <= rev.rating ? '#f59e0b' : '#4b5563', fill: s <= rev.rating ? '#f59e0b' : 'none' }} />
              ))}
            </div>

            <p style={{ color: 'var(--text-secondary)', fontSize: '14px', lineHeight: '1.6', margin: 0 }}>
              {rev.comment}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductReviews;
