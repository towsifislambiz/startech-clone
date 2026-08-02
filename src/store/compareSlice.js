import { createSlice } from '@reduxjs/toolkit';

const loadCompare = () => {
  try {
    const data = localStorage.getItem('startech-compare');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveCompare = (items) => {
  try {
    localStorage.setItem('startech-compare', JSON.stringify(items));
  } catch (e) {}
};

const compareSlice = createSlice({
  name: 'compare',
  initialState: {
    items: loadCompare(),
    maxLimit: 4
  },
  reducers: {
    addToCompare: (state, action) => {
      const product = action.payload;
      if (state.items.some((item) => item.id === product.id)) return;
      if (state.items.length >= state.maxLimit) {
        state.items.shift(); // Remove oldest item if limit reached
      }
      state.items.push(product);
      saveCompare(state.items);
    },
    removeFromCompare: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveCompare(state.items);
    },
    toggleCompare: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        if (state.items.length >= state.maxLimit) {
          state.items.shift();
        }
        state.items.push(product);
      }
      saveCompare(state.items);
    },
    clearCompare: (state) => {
      state.items = [];
      saveCompare([]);
    }
  }
});

export const { addToCompare, removeFromCompare, toggleCompare, clearCompare } = compareSlice.actions;
export default compareSlice.reducer;
