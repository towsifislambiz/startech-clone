import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: null,
  products: [],
  orders: [],
  loading: false,
};

export const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setSellerStats: (state, action) => {
      state.stats = action.payload;
    },
    setSellerProducts: (state, action) => {
      state.products = action.payload;
    },
  },
});

export const { setSellerStats, setSellerProducts } = sellerSlice.actions;

export default sellerSlice.reducer;
