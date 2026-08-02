# StarTech Application Architecture

This document describes the scalable architecture implemented in **Phase 2**.

## 1. Directory Structure Overview

```
src/
├── assets/          # Static media, icons, and branding images
├── components/      # Global reusable components
│   ├── Common/      # Primitive & shared UI components (Button, Input, Select, Modal, Drawer, etc.)
│   └── Layout/      # Header, Footer, Toast components
├── constants/       # Centralized app configuration, routes, roles, and storage keys
├── context/         # React context providers (Auth, Cart, Notification, Theme)
├── features/        # Business feature modules (auth, products, cart, checkout, orders, admin, seller)
├── hooks/           # Reusable custom hooks (useAuth, useProducts, useSearch, useFilter, etc.)
├── layouts/         # Layout system templates (MainLayout, AuthLayout, DashboardLayout, AdminLayout, SellerLayout)
├── models/          # Data structure model factories (Product, Category, User, Order, Cart)
├── pages/           # Page view components
├── redux/           # Redux Toolkit store and feature state slices
├── routes/          # Centralized router, layout mapping, and route guards (ProtectedRoute, PublicRoute)
├── services/        # Service layer for API, payments, admin, seller, and Firebase
├── styles/          # Theme, dark mode, and responsive CSS files
└── utils/           # Helper utilities, formatters, response wrappers, error handlers
```

## 2. Layout & Routing System

Routing is managed centrally in `src/routes/index.jsx` using React Router nested routes with `<Outlet />`:

- **MainLayout**: Header + Public Page Content (`/`, `/category/:id`, `/product/:id`, `/cart`, `/checkout`, `/pc-builder`) + Footer.
- **AuthLayout**: Centered branding card container for `/login` and `/register`.
- **DashboardLayout**: Account sidebar navigation + `<Outlet />` for `/dashboard`.
- **AdminLayout**: Admin panel sidebar navigation + `<Outlet />` for `/admin` & `/admin/dashboard`.
- **SellerLayout**: Merchant portal sidebar navigation + `<Outlet />` for `/seller` & `/seller/dashboard`.

## 3. Global State & Service Architecture

- **Redux Toolkit**: Configured at `src/redux/store.js` with feature slices for `cart`, `auth`, `theme`, `products`, `categories`, `user`, `orders`, `wishlist`, `compare`, `admin`, and `seller`.
- **Service Layer**: All external interactions pass through services in `src/services/` (`api.js` Axios wrapper, `productService.js`, `authService.js`, `orderService.js`, `userService.js`, `paymentService.js`, `adminService.js`, `sellerService.js`, `firebaseService.js`).
- **Standard Responses**: API methods utilize standard response schemas (`createSuccessResponse` / `createErrorResponse` in `src/utils/response.js`).
