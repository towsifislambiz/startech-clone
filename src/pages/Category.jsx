import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { FiChevronRight, FiGrid, FiList, FiSliders } from 'react-icons/fi';
import productService from '../services/productService';
import filterService from '../services/filterService';
import useFilter from '../hooks/useFilter';
import ProductCard from '../components/Product/ProductCard';
import ProductSkeleton from '../components/Product/ProductSkeleton';
import FilterSidebar from '../components/Filter/FilterSidebar';
import MobileFilterDrawer from '../components/Filter/MobileFilterDrawer';
import FilterChips from '../components/Filter/FilterChips';
import SortSelect from '../components/Filter/SortSelect';
import './Category.css';

const Category = () => {
  const { categorySlug, subCategorySlug, id } = useParams();
  const activeCategory = categorySlug || id || 'all';

  const [rawProducts, setRawProducts] = useState([]);
  const [brands, setBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState('grid');

  // Load category products dynamically
  useEffect(() => {
    let isMounted = true;
    const fetchCategoryData = async () => {
      setLoading(true);
      try {
        const filterParams = {};
        if (activeCategory && activeCategory !== 'all') {
          filterParams.category = activeCategory;
        }
        if (subCategorySlug) {
          filterParams.subCategory = subCategorySlug;
        }

        const res = await productService.getProducts(filterParams);
        const brandsList = await productService.getBrands();

        if (isMounted) {
          setRawProducts(res.products);
          setBrands(brandsList);

          const titleName = activeCategory === 'all' ? 'All Products' : activeCategory.toUpperCase();
          document.title = `${titleName} Price in BD | StarTech`;
        }
      } catch (err) {
        console.warn('Category fetch notice:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchCategoryData();
    return () => { isMounted = false; };
  }, [activeCategory, subCategorySlug]);

  // Use centralized Filter & Sorting hook
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

  // Extract available specification filter options dynamically from current catalog
  const availableSpecs = useMemo(() => {
    return filterService.extractAvailableSpecs(rawProducts);
  }, [rawProducts]);

  const displayTitle = (activeCategory === 'all' || !activeCategory)
    ? 'All Electronics & Components'
    : String(activeCategory).replace(/-/g, ' ').toUpperCase();

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
          <span>{displayTitle}</span>
          {subCategorySlug && <> <FiChevronRight /> <span>{subCategorySlug.toUpperCase()}</span></>}
        </div>
      </div>

      {/* Header Banner */}
      <div className="container cat-header">
        <h1>{displayTitle}</h1>
        <p>Showing <strong>{totalCount}</strong> matching products in StarTech catalog</p>
      </div>

      <div className="container cat-layout">
        {/* Sticky Desktop Filter Sidebar */}
        <aside className="cat-sidebar">
          <FilterSidebar {...sidebarProps} />
        </aside>

        {/* Main Content Area */}
        <div className="cat-main">
          {/* Top Control Bar */}
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

            <div className="cat-toolbar-right" style={{ gap: '16px' }}>
              <SortSelect value={filterState.sortOption} onChange={setSort} />

              <div className="cat-view-toggle">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')} title="Grid View">
                  <FiGrid />
                </button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')} title="List View">
                  <FiList />
                </button>
              </div>
            </div>
          </div>

          {/* Product Grid / Skeleton / Empty State */}
          {loading ? (
            <div className="cat-products grid">
              <ProductSkeleton count={6} />
            </div>
          ) : filteredProducts.length === 0 ? (
            <div className="cat-empty">
              <FiSliders size={48} />
              <h3>No products match your filter criteria</h3>
              <p style={{ color: 'var(--text-secondary)', marginBottom: '16px' }}>
                Try widening your price range or removing brand/specification filters.
              </p>
              <button className="btn btn-primary" onClick={resetFilters}>
                Clear All Filters
              </button>
            </div>
          ) : (
            <div className={`cat-products ${view}`}>
              {filteredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={filterState.isMobileDrawerOpen}
        totalCount={totalCount}
        onClose={() => setDrawerOpen(false)}
        {...sidebarProps}
      />
    </div>
  );
};

export default Category;
