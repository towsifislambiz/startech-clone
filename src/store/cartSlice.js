import { createSlice } from '@reduxjs/toolkit';

const loadCartItems = () => {
  try {
    const stored = localStorage.getItem('startech-cart');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
};

const saveCartItems = (items) => {
  try {
    localStorage.setItem('startech-cart', JSON.stringify(items));
  } catch (e) {}
};

const initialState = {
  items: loadCartItems(),
  shippingRegion: 'dhaka',
  coupon: null,
  isDrawerOpen: false
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action) => {
      const { product, quantity = 1, variant = null } = action.payload;
      if (!product) return;

      const itemId = variant ? `${product.id}_${variant.id}` : `${product.id}`;
      const existingIndex = state.items.findIndex((item) => item.id === itemId);

      if (existingIndex >= 0) {
        state.items[existingIndex].quantity += quantity;
      } else {
        state.items.push({
          id: itemId,
          productId: product.id,
          name: product.name,
          brand: product.brand,
          category: product.category,
          price: variant?.price || product.price || product.selling_price || 0,
          oldPrice: variant?.oldPrice || product.oldPrice || product.price || 0,
          thumbnail: product.thumbnail || (product.images && product.images[0]) || product.featured_image || '',
          stock: variant?.stock || product.stock || 'In Stock',
          variant: variant ? { id: variant.id, name: variant.name } : null,
          quantity: quantity
        });
      }

      saveCartItems(state.items);
      state.isDrawerOpen = true; // Automatically open mini cart drawer
    },

    updateQuantity: (state, action) => {
      const { id, quantity } = action.payload;
      const item = state.items.find((i) => i.id === id);
      if (item) {
        item.quantity = Math.max(1, quantity);
        saveCartItems(state.items);
      }
    },

    removeFromCart: (state, action) => {
      const id = action.payload;
      state.items = state.items.filter((i) => i.id !== id);
      saveCartItems(state.items);
    },

    setShippingRegion: (state, action) => {
      state.shippingRegion = action.payload;
    },

    applyCoupon: (state, action) => {
      state.coupon = action.payload;
    },

    removeCoupon: (state) => {
      state.coupon = null;
    },

    setDrawerOpen: (state, action) => {
      state.isDrawerOpen = action.payload;
    },

    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      saveCartItems([]);
    },

    mergeGuestCart: (state, action) => {
      const guestItems = action.payload || [];
      guestItems.forEach((gItem) => {
        const existing = state.items.find((i) => i.id === gItem.id);
        if (existing) {
          existing.quantity += gItem.quantity;
        } else {
          state.items.push(gItem);
        }
      });
      saveCartItems(state.items);
    }
  }
});

export const {
  addToCart,
  updateQuantity,
  removeFromCart,
  setShippingRegion,
  applyCoupon,
  removeCoupon,
  setDrawerOpen,
  clearCart,
  mergeGuestCart
} = cartSlice.actions;

export default cartSlice.reducer;
