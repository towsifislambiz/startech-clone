import React, { useRef, useEffect } from 'react';
import { FiSearch, FiX, FiArrowLeft } from 'react-icons/fi';
import useSearch from '../../hooks/useSearch';
import SearchDropdown from './SearchDropdown';

const MobileSearchModal = ({ isOpen = false, onClose }) => {
  const inputRef = useRef(null);

  const {
    query,
    results,
    suggestions,
    recentSearches,
    popularSearches,
    activeHoverIndex,
    loading,
    handleQueryChange,
    submitSearch,
    handleKeyDown,
    removeRecent,
    clearAllRecent
  } = useSearch();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitSearch();
    onClose();
  };

  const handleSelectSearch = (term) => {
    handleQueryChange(term);
    submitSearch(term);
    onClose();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: '#081621',
        zIndex: 99999,
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'Inter', sans-serif"
      }}
    >
      {/* Top Header Input Bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          padding: '12px 16px',
          backgroundColor: '#0c1c28',
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
        }}
      >
        <button
          type="button"
          onClick={onClose}
          style={{
            background: 'none',
            border: 'none',
            color: '#ffffff',
            padding: '6px',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <FiArrowLeft size={22} />
        </button>

        <form onSubmit={handleFormSubmit} style={{ flex: 1, display: 'flex', alignItems: 'center', position: 'relative' }}>
          <input
            ref={inputRef}
            type="search"
            placeholder="Search products, brands..."
            value={query}
            onChange={(e) => handleQueryChange(e.target.value)}
            onKeyDown={handleKeyDown}
            style={{
              width: '100%',
              padding: '10px 36px 10px 14px',
              borderRadius: '8px',
              border: '1px solid rgba(255, 255, 255, 0.15)',
              backgroundColor: '#081621',
              color: '#ffffff',
              fontSize: '15px',
              outline: 'none'
            }}
          />

          {query && (
            <button
              type="button"
              onClick={() => handleQueryChange('')}
              style={{
                position: 'absolute',
                right: '10px',
                background: 'none',
                border: 'none',
                color: '#9ca3af',
                cursor: 'pointer'
              }}
            >
              <FiX size={18} />
            </button>
          )}
        </form>

        <button
          type="button"
          onClick={handleFormSubmit}
          style={{
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            border: 'none',
            borderRadius: '8px',
            padding: '10px 14px',
            fontWeight: '700',
            fontSize: '14px',
            cursor: 'pointer'
          }}
        >
          <FiSearch size={18} />
        </button>
      </div>

      {/* Mobile Search Results Body */}
      <div style={{ flex: 1, overflowY: 'auto', position: 'relative' }}>
        <SearchDropdown
          query={query}
          results={results}
          suggestions={suggestions}
          recentSearches={recentSearches}
          popularSearches={popularSearches}
          activeHoverIndex={activeHoverIndex}
          loading={loading}
          onSelectSearch={handleSelectSearch}
          onRemoveRecent={removeRecent}
          onClearRecent={clearAllRecent}
          onClose={onClose}
        />
      </div>
    </div>
  );
};

export default MobileSearchModal;
