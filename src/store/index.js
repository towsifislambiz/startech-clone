import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import searchReducer from './searchSlice';
import filterReducer from './filterSlice';
import wishlistReducer from './wishlistSlice';
import compareReducer from './compareSlice';
import recentlyViewedReducer from './recentlyViewedSlice';
import cartReducer from './cartSlice';
import checkoutReducer from './checkoutSlice';
import orderReducer from './orderSlice';
import pcBuilderReducer from './pcBuilderSlice';
import sellerReducer from './sellerSlice';
import adminReducer from './adminSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    search: searchReducer,
    filter: filterReducer,
    wishlist: wishlistReducer,
    compare: compareReducer,
    recentlyViewed: recentlyViewedReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
    orders: orderReducer,
    pcBuilder: pcBuilderReducer,
    seller: sellerReducer,
    admin: adminReducer
  },
  devTools: process.env.NODE_ENV !== 'production'
});

export default store;
