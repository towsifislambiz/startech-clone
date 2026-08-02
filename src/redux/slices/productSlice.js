import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
  selectedProduct: null,
  loading: false,
  error: null,
  filters: {
    brands: [],
    priceRanges: [],
    inStockOnly: false,
    minRating: 0,
    searchQuery: '',
    sort: 'popular',
  },
};

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.items = action.payload;
    },
    setSelectedProduct: (state, action) => {
      state.selectedProduct = action.payload;
    },
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    setProductLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { setProducts, setSelectedProduct, setFilters, resetFilters, setProductLoading } =
  productSlice.actions;

export default productSlice.reducer;
