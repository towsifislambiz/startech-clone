import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';

// Providers
import { ThemeProvider } from './context/ThemeContext';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { NotificationProvider } from './context/NotificationContext';

// Route Protection Guards
import ProtectedRoute from './routes/ProtectedRoute';
import GuestRoute from './routes/GuestRoute';
import AdminRoute from './routes/AdminRoute';
import SellerRoute from './routes/SellerRoute';

// Layouts
import CustomerLayout from './layouts/CustomerLayout';
import SellerLayout from './layouts/SellerLayout';
import AdminLayout from './layouts/AdminLayout';

// Pages
import Home from './pages/Home';
import Category from './pages/Category';
import Product from './pages/Product';
import Brand from './pages/Brand';
import BrandList from './pages/BrandList';
import SearchResults from './pages/SearchResults';
import Wishlist from './pages/Wishlist';
import Comparison from './pages/Comparison';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderConfirmation from './pages/OrderConfirmation';
import OrderHistory from './pages/OrderHistory';
import OrderDetails from './pages/OrderDetails';
import PCBuilder from './pages/PCBuilder';
import Dashboard from './pages/Dashboard';
import SellerDashboard from './pages/SellerDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Unauthorized from './pages/Unauthorized';
import NotFound from './pages/NotFound';

// Common Components
import Toast from './components/Common/Toast';

/*
 * Provider Dependency Chain (verified):
 *
 * 1. Provider (Redux)        — standalone, wraps everything
 * 2. ThemeProvider            — standalone (useState/useEffect/localStorage only)
 * 3. Router (BrowserRouter)   — standalone, provides useNavigate/useLocation/useParams
 * 4. NotificationProvider     — standalone (useState/useCallback only)
 * 5. AuthProvider             — needs: Redux (useDispatch/useSelector)
 * 6. CartProvider             — needs: Redux, Router (useNavigate), NotificationProvider (useNotification)
 *
 * CartProvider MUST be below Router AND NotificationProvider.
 * NotificationProvider has zero external dependencies so it can go anywhere above CartProvider.
 */
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider>
        <Router>
          <NotificationProvider>
            <AuthProvider>
              <CartProvider>
                <Routes>
                  {/* ================= GUEST ROUTES ================= */}
                  <Route element={<GuestRoute />}>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                  </Route>

                  {/* ================= CUSTOMER LAYOUT ROUTES ================= */}
                  <Route element={<CustomerLayout />}>
                    <Route path="/" element={<Home />} />
                    <Route path="/search" element={<SearchResults />} />
                    <Route path="/category/:id" element={<Category />} />
                    <Route path="/category/:categorySlug" element={<Category />} />
                    <Route path="/category/:categorySlug/:subCategorySlug" element={<Category />} />
                    <Route path="/brand/:brandSlug" element={<Brand />} />
                    <Route path="/brands" element={<BrandList />} />
                    <Route path="/product/:id" element={<Product />} />
                    <Route path="/wishlist" element={<Wishlist />} />
                    <Route path="/comparison" element={<Comparison />} />
                    <Route path="/order-confirmation/:orderId" element={<OrderConfirmation />} />
                    <Route path="/pc-builder" element={<PCBuilder />} />
                    <Route path="/cart" element={<Cart />} />
                    <Route path="/checkout" element={<Checkout />} />

                    {/* Customer Protected Routes */}
                    <Route element={<ProtectedRoute />}>
                      <Route path="/dashboard" element={<Dashboard />} />
                      <Route path="/orders" element={<Dashboard />} />
                      <Route path="/account/orders" element={<OrderHistory />} />
                      <Route path="/account/orders/:id" element={<OrderDetails />} />
                      <Route path="/profile" element={<Dashboard />} />
                    </Route>
                  </Route>

                  {/* ================= SELLER LAYOUT ROUTES ================= */}
                  <Route element={<SellerRoute />}>
                    <Route element={<SellerLayout />}>
                      <Route path="/seller-dashboard" element={<SellerDashboard />} />
                      <Route path="/seller/products" element={<SellerDashboard />} />
                      <Route path="/seller/orders" element={<SellerDashboard />} />
                      <Route path="/seller/analytics" element={<SellerDashboard />} />
                    </Route>
                  </Route>

                  {/* ================= ADMIN LAYOUT ROUTES ================= */}
                  <Route element={<AdminRoute />}>
                    <Route element={<AdminLayout />}>
                      <Route path="/admin-dashboard" element={<AdminDashboard />} />
                      <Route path="/admin/users" element={<AdminDashboard />} />
                      <Route path="/admin/products" element={<AdminDashboard />} />
                      <Route path="/admin/orders" element={<AdminDashboard />} />
                      <Route path="/admin/categories" element={<AdminDashboard />} />
                      <Route path="/admin/brands" element={<AdminDashboard />} />
                      <Route path="/admin/settings" element={<AdminDashboard />} />
                      <Route path="/admin/analytics" element={<AdminDashboard />} />
                    </Route>
                  </Route>

                  {/* ================= FALLBACK & ERROR ROUTES ================= */}
                  <Route path="/unauthorized" element={<Unauthorized />} />
                  <Route path="/403" element={<Unauthorized />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <Toast />
              </CartProvider>
            </AuthProvider>
          </NotificationProvider>
        </Router>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
