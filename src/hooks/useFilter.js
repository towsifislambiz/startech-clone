import { useMemo, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useSearchParams } from 'react-router-dom';
import filterService from '../services/filterService';
import {
  setBrandsFilter,
  toggleBrandFilter,
  setCategoriesFilter,
  toggleCategoryFilter,
  setPriceRangeFilter,
  toggleAvailabilityFilter,
  setMinRatingFilter,
  setMinDiscountFilter,
  setSpecFilter,
  setSortOption,
  setMobileDrawerOpen,
  resetAllFilters
} from '../store/filterSlice';

export const useFilter = (initialProducts = []) => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();
  const filterState = useSelector((state) => state.filter);

  // 1. Sync URL query params to Redux filter state on initial mount or URL change
  useEffect(() => {
    const brandParam = searchParams.get('brand');
    const catParam = searchParams.get('category');
    const priceParam = searchParams.get('price');
    const ratingParam = searchParams.get('rating');
    const discountParam = searchParams.get('discount');
    const sortParam = searchParams.get('sort');

    if (brandParam) {
      dispatch(setBrandsFilter(brandParam.split(',')));
    }
    if (catParam) {
      dispatch(setCategoriesFilter(catParam.split(',')));
    }
    if (priceParam && priceParam.includes('-')) {
      const [minStr, maxStr] = priceParam.split('-');
      dispatch(setPriceRangeFilter({
        min: parseInt(minStr, 10) || 0,
        max: parseInt(maxStr, 10) || 300000
      }));
    }
    if (ratingParam) {
      dispatch(setMinRatingFilter(parseInt(ratingParam, 10) || 0));
    }
    if (discountParam) {
      dispatch(setMinDiscountFilter(parseInt(discountParam, 10) || 0));
    }
    if (sortParam) {
      dispatch(setSortOption(sortParam));
    }
  }, [searchParams, dispatch]);

  // 2. Sync Redux filter state to URL query params when filters change
  const syncFilterStateToUrl = useCallback(() => {
    const params = new URLSearchParams(searchParams);

    if (filterState.brands.length > 0) params.set('brand', filterState.brands.join(','));
    else params.delete('brand');

    if (filterState.categories.length > 0) params.set('category', filterState.categories.join(','));
    else params.delete('category');

    if (filterState.priceRange.min > 0 || filterState.priceRange.max < 300000) {
      params.set('price', `${filterState.priceRange.min}-${filterState.priceRange.max}`);
    } else {
      params.delete('price');
    }

    if (filterState.minRating > 0) params.set('rating', String(filterState.minRating));
    else params.delete('rating');

    if (filterState.minDiscount > 0) params.set('discount', String(filterState.minDiscount));
    else params.delete('discount');

    if (filterState.sortOption && filterState.sortOption !== 'popular') params.set('sort', filterState.sortOption);
    else params.delete('sort');

    setSearchParams(params, { replace: true });
  }, [filterState, searchParams, setSearchParams]);

  // 3. Compute filtered and sorted products list using useMemo
  const filteredProducts = useMemo(() => {
    const filters = {
      categories: filterState.categories,
      brands: filterState.brands,
      minPrice: filterState.priceRange.min,
      maxPrice: filterState.priceRange.max,
      availability: filterState.availability,
      minRating: filterState.minRating,
      minDiscount: filterState.minDiscount,
      specFilters: filterState.specFilters
    };

    return filterService.applyFiltersAndSort(initialProducts, filters, filterState.sortOption);
  }, [initialProducts, filterState]);

  // 4. Generate active filter chips array
  const activeChips = useMemo(() => {
    const chips = [];

    filterState.categories.forEach((cat) => {
      chips.type = 'category';
      chips.push({ id: `cat_${cat}`, type: 'category', label: `Category: ${cat}`, value: cat });
    });

    filterState.brands.forEach((brand) => {
      chips.push({ id: `brand_${brand}`, type: 'brand', label: `Brand: ${brand}`, value: brand });
    });

    if (filterState.priceRange.min > 0 || filterState.priceRange.max < 300000) {
      chips.push({
        id: 'price_range',
        type: 'price',
        label: `৳${filterState.priceRange.min.toLocaleString('en-IN')} - ৳${filterState.priceRange.max.toLocaleString('en-IN')}`,
        value: 'price'
      });
    }

    filterState.availability.forEach((st) => {
      chips.push({ id: `stock_${st}`, type: 'availability', label: st, value: st });
    });

    if (filterState.minRating > 0) {
      chips.push({ id: 'rating', type: 'rating', label: `${filterState.minRating}★ & Up`, value: 'rating' });
    }

    if (filterState.minDiscount > 0) {
      chips.push({ id: 'discount', type: 'discount', label: `${filterState.minDiscount}%+ Off`, value: 'discount' });
    }

    Object.entries(filterState.specFilters).forEach(([k, v]) => {
      chips.push({ id: `spec_${k}`, type: 'spec', label: `${k}: ${v}`, key: k, value: v });
    });

    return chips;
  }, [filterState]);

  // Handle chip removal
  const removeChip = useCallback((chip) => {
    if (chip.type === 'category') dispatch(toggleCategoryFilter(chip.value));
    else if (chip.type === 'brand') dispatch(toggleBrandFilter(chip.value));
    else if (chip.type === 'price') dispatch(setPriceRangeFilter({ min: 0, max: 300000 }));
    else if (chip.type === 'availability') dispatch(toggleAvailabilityFilter(chip.value));
    else if (chip.type === 'rating') dispatch(setMinRatingFilter(0));
    else if (chip.type === 'discount') dispatch(setMinDiscountFilter(0));
    else if (chip.type === 'spec') dispatch(setSpecFilter({ key: chip.key, value: null }));

    setTimeout(() => syncFilterStateToUrl(), 50);
  }, [dispatch, syncFilterStateToUrl]);

  const resetFilters = useCallback(() => {
    dispatch(resetAllFilters());
    setSearchParams({}, { replace: true });
  }, [dispatch, setSearchParams]);

  return {
    filterState,
    filteredProducts,
    totalCount: filteredProducts.length,
    activeChips,
    removeChip,
    resetFilters,
    toggleBrand: (brand) => {
      dispatch(toggleBrandFilter(brand));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    toggleCategory: (cat) => {
      dispatch(toggleCategoryFilter(cat));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    setPriceRange: (range) => {
      dispatch(setPriceRangeFilter(range));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    toggleAvailability: (status) => {
      dispatch(toggleAvailabilityFilter(status));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    setMinRating: (r) => {
      dispatch(setMinRatingFilter(r));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    setMinDiscount: (d) => {
      dispatch(setMinDiscountFilter(d));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    setSpec: (key, value) => {
      dispatch(setSpecFilter({ key, value }));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    setSort: (opt) => {
      dispatch(setSortOption(opt));
      setTimeout(() => syncFilterStateToUrl(), 50);
    },
    setDrawerOpen: (open) => dispatch(setMobileDrawerOpen(open))
  };
};

export default useFilter;
