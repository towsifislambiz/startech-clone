import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import sellerService from '../services/sellerService';

export const fetchSellerProducts = createAsyncThunk('seller/fetchProducts', async (sellerId, { rejectWithValue }) => {
  try {
    const data = await sellerService.getProducts(sellerId);
    return data;
  } catch (err) {
    return rejectWithValue(err.message);
  }
});

const initialState = {
  products: [],
  orders: [],
  loading: false,
  error: null
};

const sellerSlice = createSlice({
  name: 'seller',
  initialState,
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchSellerProducts.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchSellerProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.products = action.payload;
      })
      .addCase(fetchSellerProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  }
});

export const { setProducts } = sellerSlice.actions;

export default sellerSlice.reducer;
