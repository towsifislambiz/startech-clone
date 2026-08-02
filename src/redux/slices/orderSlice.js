import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentOrder: null,
  history: [],
  loading: false,
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    setCurrentOrder: (state, action) => {
      state.currentOrder = action.payload;
    },
    setOrderHistory: (state, action) => {
      state.history = action.payload;
    },
  },
});

export const { setCurrentOrder, setOrderHistory } = orderSlice.actions;

export default orderSlice.reducer;
