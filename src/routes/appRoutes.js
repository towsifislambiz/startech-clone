import { ROUTES } from '../constants/routes';

export const APP_ROUTES = [
  { path: ROUTES.HOME, name: 'Home', public: true },
  { path: ROUTES.CATEGORY, name: 'Category', public: true },
  { path: ROUTES.PRODUCT_DETAIL, name: 'Product Detail', public: true },
  { path: ROUTES.CART, name: 'Cart', public: true },
  { path: ROUTES.CHECKOUT, name: 'Checkout', public: true },
  { path: ROUTES.PC_BUILDER, name: 'PC Builder', public: true },
  { path: ROUTES.LOGIN, name: 'Login', public: true, authOnly: true },
  { path: ROUTES.REGISTER, name: 'Register', public: true, authOnly: true },
  { path: ROUTES.DASHBOARD, name: 'User Dashboard', protected: true, role: 'user' },
  { path: ROUTES.SELLER_DASHBOARD, name: 'Seller Dashboard', protected: true, role: 'seller' },
  { path: ROUTES.ADMIN_DASHBOARD, name: 'Admin Dashboard', protected: true, role: 'admin' },
];

export default APP_ROUTES;
