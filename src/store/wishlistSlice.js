import { createSlice } from '@reduxjs/toolkit';

const loadWishlist = () => {
  try {
    const data = localStorage.getItem('startech-wishlist');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveWishlist = (items) => {
  try {
    localStorage.setItem('startech-wishlist', JSON.stringify(items));
  } catch (e) {}
};

const wishlistSlice = createSlice({
  name: 'wishlist',
  initialState: {
    items: loadWishlist()
  },
  reducers: {
    addToWishlist: (state, action) => {
      const product = action.payload;
      if (!state.items.some((item) => item.id === product.id)) {
        state.items.push(product);
        saveWishlist(state.items);
      }
    },
    removeFromWishlist: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((item) => item.id !== id);
      saveWishlist(state.items);
    },
    toggleWishlist: (state, action) => {
      const product = action.payload;
      const index = state.items.findIndex((item) => item.id === product.id);
      if (index >= 0) {
        state.items.splice(index, 1);
      } else {
        state.items.push(product);
      }
      saveWishlist(state.items);
    },
    clearWishlist: (state) => {
      state.items = [];
      saveWishlist([]);
    }
  }
});

export const { addToWishlist, removeFromWishlist, toggleWishlist, clearWishlist } = wishlistSlice.actions;
export default wishlistSlice.reducer;
