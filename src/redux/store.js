import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './slices/cartSlice';
import authReducer from './slices/authSlice';
import themeReducer from './slices/themeSlice';
import productReducer from './slices/productSlice';
import categoryReducer from './slices/categorySlice';
import userReducer from './slices/userSlice';
import orderReducer from './slices/orderSlice';
import wishlistReducer from './slices/wishlistSlice';
import compareReducer from './slices/compareSlice';
import adminReducer from './slices/adminSlice';
import sellerReducer from './slices/sellerSlice';

export const store = configureStore({
  reducer: {
    cart: cartReducer,
    auth: authReducer,
    theme: themeReducer,
    products: productReducer,
    categories: categoryReducer,
    user: userReducer,
    orders: orderReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    admin: adminReducer,
    seller: sellerReducer,
  },
});

export default store;
