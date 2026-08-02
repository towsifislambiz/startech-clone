import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  profile: null,
  orders: [],
  addresses: [],
  loading: false,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUserProfile: (state, action) => {
      state.profile = action.payload;
    },
    setUserOrders: (state, action) => {
      state.orders = action.payload;
    },
  },
});

export const { setUserProfile, setUserOrders } = userSlice.actions;

export default userSlice.reducer;
