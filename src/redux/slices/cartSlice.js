import { createSlice } from '@reduxjs/toolkit';

const loadCartFromStorage = () => {
  try {
    const saved = localStorage.getItem('startech-cart');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
};

const initialState = {
  items: loadCartFromStorage(),
  coupon: null,
  discountAmount: 0,
};

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addItem: (state, action) => {
      const { product, quantity = 1 } = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        state.items.push({
          id: product.id,
          name: product.name,
          price: product.selling_price || product.price,
          image: product.featured_image || product.image || product.img,
          quantity,
          stock: product.quantity_in_stock || product.stock,
        });
      }
      localStorage.setItem('startech-cart', JSON.stringify(state.items));
    },
    removeItem: (state, action) => {
      const productId = action.payload;
      state.items = state.items.filter((item) => item.id !== productId);
      localStorage.setItem('startech-cart', JSON.stringify(state.items));
    },
    updateQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      if (quantity <= 0) {
        state.items = state.items.filter((item) => item.id !== productId);
      } else {
        const item = state.items.find((i) => i.id === productId);
        if (item) item.quantity = quantity;
      }
      localStorage.setItem('startech-cart', JSON.stringify(state.items));
    },
    clearCart: (state) => {
      state.items = [];
      state.coupon = null;
      state.discountAmount = 0;
      localStorage.removeItem('startech-cart');
    },
    applyCoupon: (state, action) => {
      const { code, discount } = action.payload;
      state.coupon = code;
      state.discountAmount = discount;
    },
    removeCoupon: (state) => {
      state.coupon = null;
      state.discountAmount = 0;
    },
  },
});

export const {
  addItem,
  removeItem,
  updateQuantity,
  clearCart,
  applyCoupon,
  removeCoupon,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.items;
export const selectCartCount = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.quantity, 0);
export const selectCartSubtotal = (state) =>
  state.cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

export default cartSlice.reducer;
