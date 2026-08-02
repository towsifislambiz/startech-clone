import { createSlice } from '@reduxjs/toolkit';

const loadRecentlyViewed = () => {
  try {
    const data = localStorage.getItem('startech-recently-viewed');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveRecentlyViewed = (items) => {
  try {
    localStorage.setItem('startech-recently-viewed', JSON.stringify(items));
  } catch (e) {}
};

const recentlyViewedSlice = createSlice({
  name: 'recentlyViewed',
  initialState: {
    items: loadRecentlyViewed()
  },
  reducers: {
    addRecentlyViewed: (state, action) => {
      const product = action.payload;
      if (!product || !product.id) return;
      const filtered = state.items.filter((item) => item.id !== product.id);
      const updated = [product, ...filtered].slice(0, 10);
      state.items = updated;
      saveRecentlyViewed(updated);
    },
    clearRecentlyViewed: (state) => {
      state.items = [];
      saveRecentlyViewed([]);
    }
  }
});

export const { addRecentlyViewed, clearRecentlyViewed } = recentlyViewedSlice.actions;
export default recentlyViewedSlice.reducer;
