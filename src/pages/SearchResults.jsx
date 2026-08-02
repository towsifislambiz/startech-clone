import React, { useState, useEffect, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { FiSearch, FiSliders, FiChevronRight, FiZap } from 'react-icons/fi';
import searchService from '../services/searchService';
import productService from '../services/productService';
import filterService from '../services/filterService';
import useFilter from '../hooks/useFilter';
import ProductCard from '../components/Product/ProductCard';
import ProductSkeleton from '../components/Product/ProductSkeleton';
import ProductSection from '../components/Product/ProductSection';
import FilterSidebar from '../components/Filter/FilterSidebar';
import MobileFilterDrawer from '../components/Filter/MobileFilterDrawer';
import FilterChips from '../components/Filter/FilterChips';
import SortSelect from '../components/Filter/SortSelect';
import '../pages/Category.css';

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || '';

  const [rawProducts, setRawProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);

  // Execute search when query changes
  useEffect(() => {
    let isMounted = true;
    const fetchSearchResults = async () => {
      setLoading(true);
      try {
        const res = await searchService.search(query);
        const brandsList = await productService.getBrands();

        if (isMounted) {
          setRawProducts(res.products);
          setBrands(brandsList);
          document.title = query ? `Search results for "${query}" | StarTech` : 'Search Products | StarTech';
        }
      } catch (err) {
        console.warn('Search page fetch error:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchSearchResults();
    return () => { isMounted = false; };
  }, [query]);

  // Connect to centralized Filter & Sorting hook
  const {
    filterState,
    filteredProducts,
    totalCount,
    activeChips,
    removeChip,
    resetFilters,
    toggleBrand,
    toggleCategory,
    setPriceRange,
    toggleAvailability,
    setMinRating,
    setMinDiscount,
    setSpec,
    setSort,
    setDrawerOpen
  } = useFilter(rawProducts);

  const availableSpecs = useMemo(() => {
    return filterService.extractAvailableSpecs(rawProducts);
  }, [rawProducts]);

  const sidebarProps = {
    brands,
    availableSpecs,
    filterState,
    onToggleCategory: toggleCategory,
    onToggleBrand: toggleBrand,
    onPriceChange: setPriceRange,
    onToggleAvailability: toggleAvailability,
    onMinRatingChange: setMinRating,
    onMinDiscountChange: setMinDiscount,
    onSetSpec: setSpec,
    onResetAll: resetFilters
  };

  return (
    <div className="cat">
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <span>Search Results</span>
          {query && <> <FiChevronRight /> <span>"{query}"</span></>}
        </div>
      </div>

      <div className="container cat-header">
        <h1>
          {query ? <>Search Results for <span style={{ color: '#D51E0B' }}>"{query}"</span></> : 'Search Products'}
        </h1>
        <p>Showing <strong>{totalCount}</strong> matching products</p>
      </div>

      <div className="container cat-layout">
        {/* Filter Sidebar */}
        <aside className="cat-sidebar">
          <FilterSidebar {...sidebarProps} />
        </aside>

        {/* Main Content Area */}
        <div className="cat-main">
          {/* Control Bar */}
          <div className="cat-toolbar">
            <button className="cat-mobile-filter-btn" onClick={() => setDrawerOpen(true)}>
              <FiSliders /> Filters {activeChips.length > 0 && <span>{activeChips.length}</span>}
            </button>

            <div style={{ flex: 1 }}>
              <FilterChips
                chips={activeChips}
                onRemoveChip={removeChip}
                onClearAll={resetFilters}
              />
            </div>

            <div className="cat-toolbar-right">
              <SortSelect value={filterState.sortOption} onChange={setSort} />
            </div>
          </div>

          {/* Product Grid / Skeleton / Empty State */}
          {loading ? (
            <div className="cat-products grid">
              <ProductSkeleton count={6} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="cat-empty" style={{ padding: '60px 20px' }}>
              <div style={{ width: '80px', height: '80px', borderRadius: '50%', backgroundColor: 'rgba(213, 30, 11, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto', color: '#D51E0B' }}>
                <FiSearch size={40} />
              </div>
              <h3>No products found for "{query}"</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '24px', maxWidth: '400px', margin: '0 auto 24px auto' }}>
                We couldn't find any products matching your search query or filter selection. Try widening your price range or search with different keywords.
              </p>
              <button className="btn btn-primary" onClick={resetFilters} style={{ marginBottom: '40px' }}>
                Reset All Filters
              </button>

              {/* Recommendations */}
              <div style={{ textAlign: 'left', borderTop: '1px solid var(--border-color)', paddingTop: '32px' }}>
                <h4 style={{ color: 'var(--text-primary)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <FiZap style={{ color: '#D51E0B' }} /> Recommended Popular Products
                </h4>
                <ProductSection title="" type="trending" limit={3} viewAllLink={null} />
              </div>
            </div>
          ) : (
            <div className="cat-products grid">
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Drawer */}
      <MobileFilterDrawer
        isOpen={filterState.isMobileDrawerOpen}
        totalCount={totalCount}
        onClose={() => setDrawerOpen(false)}
        {...sidebarProps}
      />
    </div>
  );
};

export default SearchResults;
