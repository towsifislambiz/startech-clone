import React, { useRef, useEffect } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';
import useSearch from '../../hooks/useSearch';
import SearchDropdown from './SearchDropdown';

const SearchBar = ({ className = '' }) => {
  const containerRef = useRef(null);
  const inputRef = useRef(null);

  const {
    query,
    results,
    suggestions,
    recentSearches,
    popularSearches,
    activeHoverIndex,
    loading,
    isDropdownOpen,
    handleQueryChange,
    submitSearch,
    handleKeyDown,
    openDropdown,
    closeDropdown,
    removeRecent,
    clearAllRecent
  } = useSearch();

  // Click outside listener to close autocomplete dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        closeDropdown();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeDropdown]);

  const handleFormSubmit = (e) => {
    e.preventDefault();
    submitSearch();
  };

  const handleClear = () => {
    handleQueryChange('');
    if (inputRef.current) inputRef.current.focus();
  };

  const handleSelectSearch = (term) => {
    handleQueryChange(term);
    submitSearch(term);
  };

  return (
    <div
      ref={containerRef}
      className={`hdr-search-container ${className}`}
      style={{ position: 'relative', overflow: 'visible', zIndex: 1000 }}
    >
      <form onSubmit={handleFormSubmit} className="hdr-search-box">
        <FiSearch className="hdr-search-ic" size={19} />

        <input
          ref={inputRef}
          type="search"
          className="hdr-search-input"
          role="combobox"
          aria-expanded={isDropdownOpen ? 'true' : 'false'}
          aria-controls="search-dropdown-list"
          aria-autocomplete="list"
          aria-label="Search for products, brands, models"
          placeholder="Search for products, brands, models..."
          value={query}
          onFocus={openDropdown}
          onChange={(e) => handleQueryChange(e.target.value)}
          onKeyDown={handleKeyDown}
          autoComplete="off"
        />

        {query && (
          <button type="button" className="hdr-search-clear" onClick={handleClear} title="Clear search">
            <FiX size={16} />
          </button>
        )}

        <button type="submit" className="hdr-search-btn">
          <FiSearch size={16} /> <span>Search</span>
        </button>
      </form>

      {/* Autocomplete Search Dropdown - Positioned Absolutely with overflow visible */}
      {isDropdownOpen && (
        <div id="search-dropdown-list">
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
            onClose={closeDropdown}
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(SearchBar);
