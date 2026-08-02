import React, { useState } from 'react';
import { FiPlus, FiMessageSquare } from 'react-icons/fi';

const DashboardReviews = ({ reviews = [], onPostReview }) => {
  const [showForm, setShowForm] = useState(false);
  const [productName, setProductName] = useState('');
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (productName.trim() && comment.trim()) {
      onPostReview({
        productName,
        rating,
        comment
      });
      setProductName('');
      setComment('');
      setRating(5);
      setShowForm(false);
    }
  };

  return (
    <div
      style={{
        backgroundColor: '#0c1c28',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '16px',
        padding: '24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '20px'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '12px' }}>
        <h3 style={{ fontSize: '18px', fontWeight: '800', color: '#ffffff', margin: 0 }}>
          My Reviews & Ratings ({reviews.length})
        </h3>
        <button
          type="button"
          onClick={() => setShowForm(!showForm)}
          style={{
            padding: '8px 14px',
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            fontWeight: '700',
            fontSize: '13px',
            borderRadius: '8px',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '6px'
          }}
        >
          <FiPlus /> Write a Review
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} style={{ padding: '16px', backgroundColor: '#081621', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column', gap: '12px' }}>
          <div>
            <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Product Name *</label>
            <input
              type="text"
              required
              placeholder="e.g. Intel Core i5 13400F Processor"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0c1c28', color: '#ffffff', fontSize: '13px' }}
            />
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Rating *</label>
            <select
              value={rating}
              onChange={(e) => setRating(Number(e.target.value))}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0c1c28', color: '#ffffff', fontSize: '13px' }}
            >
              <option value={5}>⭐⭐⭐⭐⭐ (5 / 5 Excellent)</option>
              <option value={4}>⭐⭐⭐⭐ (4 / 5 Good)</option>
              <option value={3}>⭐⭐⭐ (3 / 5 Average)</option>
              <option value={2}>⭐⭐ (2 / 5 Below Average)</option>
              <option value={1}>⭐ (1 / 5 Poor)</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '12px', color: '#9ca3af', fontWeight: '600', display: 'block', marginBottom: '4px' }}>Your Feedback & Review *</label>
            <textarea
              required
              rows={3}
              placeholder="Write your honest product feedback..."
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: '#0c1c28', color: '#ffffff', fontSize: '13px' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
            <button type="button" onClick={() => setShowForm(false)} className="btn btn-outline">Cancel</button>
            <button type="submit" className="btn btn-primary">Submit Review</button>
          </div>
        </form>
      )}

      {/* Reviews List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
        {reviews.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 20px', color: '#9ca3af' }}>
            <FiMessageSquare size={40} style={{ opacity: 0.3, marginBottom: '8px' }} />
            <p style={{ margin: 0, fontSize: '13px' }}>You haven't written any product reviews yet.</p>
          </div>
        ) : (
          reviews.map((rev) => (
            <div key={rev.id} style={{ padding: '16px', borderRadius: '10px', backgroundColor: '#081621', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                <strong style={{ color: '#ffffff', fontSize: '14px' }}>{rev.productName}</strong>
                <div style={{ color: '#f59e0b', fontSize: '13px', display: 'flex', alignItems: 'center', gap: '2px' }}>
                  {'★'.repeat(rev.rating)}
                </div>
              </div>
              <p style={{ fontSize: '13px', color: '#9ca3af', margin: '4px 0 8px 0' }}>{rev.comment}</p>
              <div style={{ fontSize: '11px', color: '#6b7280' }}>
                Submitted on {new Date(rev.createdAt).toLocaleDateString()} • <span style={{ color: '#22c55e' }}>{rev.status}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default DashboardReviews;
