# StarTech Clone — Production E-Commerce & PC Builder Platform

A feature-rich, high-performance, full-stack tech e-commerce web application inspired by Bangladesh's leading computer & gadget retailer StarTech.

Built using **React + Vite/CRA + Tailwind CSS + Redux Toolkit + Firebase Firestore & Auth**.

---

## 🌟 Key Features

1. **Authentication & RBAC System (`Phase 1–4`)**
   - User Sign Up, Login, Logout, Firebase Auth integration, and Role-Based Access Control (`Customer`, `Seller`, `Admin`).

2. **Product Catalog System (`Phase 5–8`)**
   - Rich product cards, specs breakdown, stock badges, discount tags, dynamic category & brand filtering, multi-criteria sorting, wishlist persistence, product comparison (up to 4 items), and quick view drawers.

3. **Production Search System (`Phase 6`)**
   - Live debounced search (350ms), keyboard arrow navigation (Up/Down/Enter/Esc), recent search history persistence, and product keyword highlighting.

4. **Shopping Cart & Checkout System (`Phase 9–10`)**
   - Slide-in Mini Cart drawer, full cart manager with region shipping fee calculation (Inside Dhaka vs Outside Dhaka), 5% VAT calculation, promo code engine (`STARTECH10`, `GAMER500`, `FREESHIP`), guest cart persistence, multi-step checkout form, COD & Mobile Banking payment simulation, and printable/PDF HTML invoice modal.

5. **User Dashboard & Order Management (`Phase 11–12`)**
   - User Account management, address book CRUD, order history list (`/account/orders`), detailed order view (`/account/orders/:id`), 7-stage visual order tracker (`Pending` -> `Delivered`), order cancellation rules, and 1-click **"Buy Again"** reorder engine.

6. **Custom PC Builder System (`Phase 13`)**
   - 13 component categories (CPU, Motherboard, RAM, GPU, SSD, HDD, PSU, Cooler, Casing, Monitor, Keyboard, Mouse, Headphone). Real-time CPU socket ↔ Motherboard socket compatibility validator, power consumption draw calculator, FPS benchmark estimator, "Save Build" to account, and 1-click "Add Entire Build to Cart".

7. **Seller Control Panel (`Phase 14`)**
   - Seller-only protected portal (`/seller-dashboard`), Product CRUD (Title, Brand, Category, Price, Stock, Image), inventory stock alerts, seller order status updates, and store revenue analytics.

8. **Super Admin Management Panel (`Phase 15`)**
   - Admin-only protected portal (`/admin-dashboard`), user role governance dropdown (`Customer`, `Seller`, `Admin`), promo coupon builder modal, platform GMV metrics, and global order list monitoring.

9. **Performance, SEO & Accessibility (`Phase 16–17`)**
   - Component memoization (`React.memo`), zero code-splitting navigation delays, dynamic meta tags (`SEO.jsx`), Open Graph, Twitter Cards, JSON-LD Schema data, static `sitemap.xml`, `robots.txt`, screen reader aria labels, and zero ESLint build warnings.

---

## 🛠️ Technology Stack

- **Frontend Core**: React 18, React Router DOM v6
- **State Management**: Redux Toolkit (`@reduxjs/toolkit`, `react-redux`)
- **Styling**: Vanilla CSS tokens & Tailwind CSS
- **Database & Auth**: Firebase Auth, Firebase Firestore (`firebase/app`, `firebase/firestore`, `firebase/auth`)
- **Icons**: React Icons (`fi`, `bs`)
- **Bundler**: React Scripts / Vite / Webpack

---

## 📁 Directory Architecture

```
startech-clone/
├── public/
│   ├── index.html
│   ├── robots.txt
│   └── sitemap.xml
├── src/
│   ├── components/
│   │   ├── Cart/
│   │   ├── Checkout/
│   │   ├── Common/          # Toast, SEO, Skeleton
│   │   ├── Dashboard/
│   │   ├── Filter/          # FilterSidebar, FilterChips, SortSelect
│   │   ├── Header/          # Header, Navbar, MobileNav
│   │   ├── Orders/          # OrderCard, OrderStatusTracker
│   │   ├── PCBuilder/       # PCComponentSelectorModal
│   │   ├── Product/         # ProductCard, ProductGrid, QuickViewModal
│   │   └── Search/          # SearchBar, SearchDropdown
│   ├── context/             # AuthContext, ThemeContext, NotificationContext, CartContext
│   ├── firebase/            # Firebase init & Firestore config
│   ├── hooks/               # useCartSystem, useOrders, useSearch, useWishlist, useCompare
│   ├── layouts/             # CustomerLayout, SellerLayout, AdminLayout
│   ├── models/              # ProductModel schema normalizer
│   ├── pages/               # Home, Category, Product, Cart, Checkout, OrderHistory, OrderDetails, PCBuilder, SellerDashboard, AdminDashboard
│   ├── routes/              # ProtectedRoute, GuestRoute, SellerRoute, AdminRoute
│   ├── services/            # productService, orderService, sellerService, adminService, pcBuilderService, couponService, checkoutService
│   ├── store/               # Redux store configuration & 11 slices
│   └── App.jsx
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js `v16.x` or higher
- npm or yarn

### Installation
```bash
# 1. Clone repository
git clone https://github.com/your-username/startech-clone.git
cd startech-clone

# 2. Install dependencies
npm install

# 3. Start local development server
npm run dev
```

### Production Build
```bash
npm run build
```
Creates an optimized production bundle in the `build/` directory with zero errors and zero warnings.

---

## 🔐 Demo Accounts

| Role | Email | Password |
|---|---|---|
| **Admin** | `admin@startech.com.bd` | `admin123` |
| **Seller** | `seller@startech.com.bd` | `seller123` |
| **Customer** | `user@example.com` | `user123` |

---

## 📄 License
This project is licensed under the MIT License.
