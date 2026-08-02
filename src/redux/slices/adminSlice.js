import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  stats: null,
  users: [],
  orders: [],
  loading: false,
};

export const adminSlice = createSlice({
  name: 'admin',
  initialState,
  reducers: {
    setAdminStats: (state, action) => {
      state.stats = action.payload;
    },
    setAdminUsers: (state, action) => {
      state.users = action.payload;
    },
    setAdminOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setAdminStats, setAdminUsers, setAdminOrders } = adminSlice.actions;

export default adminSlice.reducer;
