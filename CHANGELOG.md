# CHANGELOG - StarTech Clone

## [Phase 2: Architecture] - 2026-08-01

### Added
- **Layout System**: Created `MainLayout`, `AuthLayout`, `DashboardLayout`, `AdminLayout`, and `SellerLayout` with nested `<Outlet />` routing.
- **Routing Architecture**: Centralized router (`src/routes/index.jsx`), route configuration (`appRoutes.js`), and route guards (`ProtectedRoute.jsx`, `PublicRoute.jsx`).
- **Shared UI Component System**: Added `Button`, `Input`, `Select`, `Modal`, `Drawer`, `Badge`, `Card`, `Pagination`, and `EmptyState` in `src/components/Common/`.
- **Feature Module Directories**: Created modular index files under `src/features/` (`auth`, `products`, `cart`, `checkout`, `orders`, `dashboard`, `admin`, `seller`, `pcBuilder`, `wishlist`, `compare`, `reviews`).
- **Global State Slices**: Added Redux slices for `user`, `product`, `category`, `order`, `wishlist`, `compare`, `admin`, and `seller`.
- **Service Layer Expansion**: Added `orderService`, `userService`, `paymentService`, `adminService`, `sellerService`, and `firebaseService`.
- **Data Models**: Created model factories in `src/models/` (`Product`, `Category`, `User`, `Order`, `Cart`, `Review`, `Address`).
- **Constants**: Added `routes.js`, `roles.js`, `storageKeys.js`, and `appConfig.js`.
- **Response & Error Utilities**: Added `src/utils/response.js` and `src/utils/errorHandler.js`.
- **Custom Hooks**: Added `useAuth`, `useProducts`, `useSearch`, `useFilter`.
- **Documentation**: Added `ARCHITECTURE.md` and `docs/ARCHITECTURE.md`.

## [Phase 1: Project Stabilization] - 2026-08-01
- Stabilized project build, error boundaries, full page loader, formatters, and initial Redux Toolkit store.
