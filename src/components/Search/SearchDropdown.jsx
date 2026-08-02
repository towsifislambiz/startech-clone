import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { FiClock, FiX, FiTrendingUp, FiChevronRight, FiSearch, FiFrown } from 'react-icons/fi';
import HighlightText from '../../utils/highlightText';
import './SearchDropdown.css';

const SearchDropdown = ({
  query = '',
  results = [],
  suggestions = [],
  recentSearches = [],
  popularSearches = [],
  activeHoverIndex = -1,
  loading = false,
  onSelectSearch,
  onRemoveRecent,
  onClearRecent,
  onClose
}) => {
  const navigate = useNavigate();
  const activeItemRef = useRef(null);

  useEffect(() => {
    if (activeItemRef.current) {
      activeItemRef.current.scrollIntoView({ block: 'nearest', behavior: 'smooth' });
    }
  }, [activeHoverIndex]);

  const handleProductClick = (prod) => {
    onClose();
    navigate(`/product/${prod.id}`);
  };

  const handleTermClick = (term) => {
    onSelectSearch(term);
  };

  const hasQuery = query.trim().length > 0;

  return (
    <div className="search-dropdown-menu" tabIndex="-1" role="listbox">
      {loading && (
        <div className="search-drop-loading">
          <div className="search-drop-spinner" />
          <span>Searching catalog for "{query}"...</span>
        </div>
      )}

      {/* ================= 1. LIVE INSTANT SEARCH RESULTS ================= */}
      {hasQuery && !loading && (
        <div className="search-drop-section">
          <div className="search-drop-section-title">
            Matching Products ({results.length})
          </div>

          {results.length === 0 ? (
            <div className="search-drop-empty">
              <div style={{ width: '48px', height: '48px', borderRadius: '50%', backgroundColor: 'rgba(213, 30, 11, 0.1)', color: '#D51E0B', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 10px auto' }}>
                <FiFrown size={24} />
              </div>
              <div style={{ fontWeight: '700', color: 'var(--text-primary, #ffffff)', fontSize: '15px', marginBottom: '4px' }}>
                No products found matching "{query}"
              </div>
              <p style={{ fontSize: '13px', color: 'var(--text-secondary, #94a3b8)', margin: 0 }}>
                Try searching for popular brands like Apple, ASUS, Intel, AMD, or category terms like Laptop, Monitor, SSD.
              </p>
            </div>
          ) : (
            <div className="search-results-list">
              {results.slice(0, 8).map((prod, idx) => {
                const isActive = activeHoverIndex === idx;
                const stockStatus = prod.stock || 'In Stock';
                const isOutOfStock = stockStatus === 'Out of Stock';
                const isLimited = stockStatus === 'Limited Stock';
                const isPreOrder = stockStatus === 'Pre-Order';

                return (
                  <div
                    key={prod.id}
                    ref={isActive ? activeItemRef : null}
                    role="option"
                    aria-selected={isActive ? 'true' : 'false'}
                    className={`search-item-card ${isActive ? 'active-hover' : ''}`}
                    onClick={() => handleProductClick(prod)}
                  >
                    {/* 1. Product Image */}
                    <img
                      src={prod.thumbnail || (prod.images && prod.images[0]) || 'https://placehold.co/100x100?text=Product'}
                      alt={prod.name}
                      className="search-item-img"
                    />

                    {/* 2. Product Details (Brand, Category, Name, Price, Stock Badge) */}
                    <div className="search-item-info">
                      <div className="search-item-top">
                        <span className="search-item-brand">
                          <HighlightText text={prod.brand} query={query} />
                        </span>
                        <span className="search-item-cat">
                          • <HighlightText text={prod.category} query={query} />
                        </span>
                      </div>

                      {/* Product Name with Highlighted Matching Letters */}
                      <div className="search-item-title">
                        <HighlightText text={prod.name} query={query} />
                      </div>

                      {/* Price & Stock Status Pill */}
                      <div className="search-item-price-row">
                        <span className="search-item-price">
                          ৳{(prod.selling_price || prod.price).toLocaleString('en-IN')}
                        </span>
                        {prod.oldPrice > (prod.selling_price || prod.price) && (
                          <span className="search-item-old-price">
                            ৳{prod.oldPrice.toLocaleString('en-IN')}
                          </span>
                        )}

                        {/* Stock Status Badge */}
                        <span
                          className="search-stock-badge"
                          style={{
                            fontSize: '10px',
                            fontWeight: '700',
                            padding: '2px 8px',
                            borderRadius: '99px',
                            marginLeft: 'auto',
                            backgroundColor: isOutOfStock ? 'rgba(239, 68, 68, 0.15)' : isLimited ? 'rgba(245, 158, 11, 0.15)' : isPreOrder ? 'rgba(59, 130, 246, 0.15)' : 'rgba(16, 185, 129, 0.15)',
                            color: isOutOfStock ? '#ef4444' : isLimited ? '#f59e0b' : isPreOrder ? '#3b82f6' : '#10b981',
                            border: `1px solid ${isOutOfStock ? 'rgba(239, 68, 68, 0.3)' : isLimited ? 'rgba(245, 158, 11, 0.3)' : isPreOrder ? 'rgba(59, 130, 246, 0.3)' : 'rgba(16, 185, 129, 0.3)'}`
                          }}
                        >
                          {stockStatus}
                        </span>
                      </div>
                    </div>

                    <FiChevronRight className="search-item-arrow" size={18} />
                  </div>
                );
              })}
            </div>
          )}

          {/* Keyword Suggestion Chips */}
          {suggestions.length > 0 && (
            <div className="search-drop-suggestions">
              <div className="search-drop-sub-title">Related Suggestions:</div>
              <div className="search-chips-row">
                {suggestions.map((sug, i) => (
                  <button
                    key={i}
                    type="button"
                    className="search-chip-btn"
                    onClick={() => handleTermClick(sug)}
                  >
                    <FiSearch size={12} /> <HighlightText text={sug} query={query} />
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ================= 2. IDLE STATE: RECENT & POPULAR SEARCHES ================= */}
      {!hasQuery && (
        <div className="search-drop-idle">
          {recentSearches.length > 0 && (
            <div className="search-drop-group">
              <div className="search-group-head">
                <span><FiClock size={14} /> Recent Searches</span>
                <button type="button" className="search-clear-all" onClick={onClearRecent}>
                  Clear All
                </button>
              </div>
              <div className="search-recent-list">
                {recentSearches.map((term, idx) => (
                  <div key={idx} className="search-recent-row">
                    <span onClick={() => handleTermClick(term)} className="search-recent-text">
                      <FiClock size={13} /> {term}
                    </span>
                    <button
                      type="button"
                      className="search-recent-del"
                      onClick={(e) => {
                        e.stopPropagation();
                        onRemoveRecent(term);
                      }}
                      title="Remove"
                    >
                      <FiX size={14} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="search-drop-group" style={{ marginTop: '16px' }}>
            <div className="search-group-head">
              <span><FiTrendingUp size={14} /> Popular Searches</span>
            </div>
            <div className="search-chips-row">
              {popularSearches.map((pop, idx) => (
                <button
                  key={idx}
                  type="button"
                  className="search-chip-btn popular"
                  onClick={() => handleTermClick(pop)}
                >
                  <FiTrendingUp size={12} /> {pop}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* View All Matches Footer */}
      {hasQuery && results.length > 0 && (
        <div className="search-drop-footer" onClick={() => onSelectSearch(query)}>
          <span>See all {results.length} matching results for "<strong>{query}</strong>"</span>
          <FiChevronRight size={16} />
        </div>
      )}
    </div>
  );
};

export default SearchDropdown;
