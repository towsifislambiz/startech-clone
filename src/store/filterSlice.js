import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  categories: [],
  brands: [],
  priceRange: { min: 0, max: 300000 },
  availability: [], // ['In Stock', 'Out of Stock', 'Pre-Order', 'Upcoming']
  minRating: 0,
  minDiscount: 0,
  specFilters: {}, // { 'RAM': '32GB', 'Processor': 'Intel Core i9' }
  sortOption: 'popular',
  isMobileDrawerOpen: false
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setCategoriesFilter: (state, action) => {
      state.categories = action.payload;
    },
    toggleCategoryFilter: (state, action) => {
      const cat = action.payload;
      if (state.categories.includes(cat)) {
        state.categories = state.categories.filter((c) => c !== cat);
      } else {
        state.categories.push(cat);
      }
    },
    setBrandsFilter: (state, action) => {
      state.brands = action.payload;
    },
    toggleBrandFilter: (state, action) => {
      const brand = action.payload;
      if (state.brands.includes(brand)) {
        state.brands = state.brands.filter((b) => b !== brand);
      } else {
        state.brands.push(brand);
      }
    },
    setPriceRangeFilter: (state, action) => {
      state.priceRange = { ...state.priceRange, ...action.payload };
    },
    toggleAvailabilityFilter: (state, action) => {
      const status = action.payload;
      if (state.availability.includes(status)) {
        state.availability = state.availability.filter((s) => s !== status);
      } else {
        state.availability.push(status);
      }
    },
    setMinRatingFilter: (state, action) => {
      state.minRating = action.payload;
    },
    setMinDiscountFilter: (state, action) => {
      state.minDiscount = action.payload;
    },
    setSpecFilter: (state, action) => {
      const { key, value } = action.payload;
      if (!value) {
        delete state.specFilters[key];
      } else {
        state.specFilters[key] = value;
      }
    },
    setSortOption: (state, action) => {
      state.sortOption = action.payload;
    },
    setMobileDrawerOpen: (state, action) => {
      state.isMobileDrawerOpen = action.payload;
    },
    resetAllFilters: (state) => {
      state.categories = [];
      state.brands = [];
      state.priceRange = { min: 0, max: 300000 };
      state.availability = [];
      state.minRating = 0;
      state.minDiscount = 0;
      state.specFilters = {};
      state.sortOption = 'popular';
    }
  }
});

export const {
  setCategoriesFilter,
  toggleCategoryFilter,
  setBrandsFilter,
  toggleBrandFilter,
  setPriceRangeFilter,
  toggleAvailabilityFilter,
  setMinRatingFilter,
  setMinDiscountFilter,
  setSpecFilter,
  setSortOption,
  setMobileDrawerOpen,
  resetAllFilters
} = filterSlice.actions;

export default filterSlice.reducer;
