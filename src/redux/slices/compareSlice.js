import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [],
};

export const compareSlice = createSlice({
  name: 'compare',
  initialState,
  reducers: {
    addToCompare: (state, action) => {
      if (state.items.length < 4 && !state.items.find((i) => i.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFromCompare: (state, action) => {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
    clearCompare: (state) => {
      state.items = [];
    },
  },
});

export const { addToCompare, removeFromCompare, clearCompare } = compareSlice.actions;

export default compareSlice.reducer;
