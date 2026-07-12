# 🧩 Startech - Component Architecture

Complete component hierarchy and structure for the React frontend.

---

## Component Organization

```
src/
├── components/
│   ├── Layout/
│   │   ├── Header.jsx           # Main navigation bar
│   │   ├── Footer.jsx           # Footer with links
│   │   ├── Sidebar.jsx          # Mobile sidebar menu
│   │   └── MainLayout.jsx       # Wrapper component
│   │
│   ├── Navigation/
│   │   ├── Navbar.jsx           # Header bar
│   │   ├── SearchBar.jsx        # Search input
│   │   ├── CategoryNav.jsx      # Category dropdown
│   │   └── UserMenu.jsx         # User dropdown (Login/Dashboard)
│   │
│   ├── Cards/
│   │   ├── ProductCard.jsx      # Product listing card
│   │   ├── CategoryCard.jsx     # Category tile
│   │   ├── OrderCard.jsx        # Order summary card
│   │   └── ReviewCard.jsx       # Review display card
│   │
│   ├── Forms/
│   │   ├── LoginForm.jsx        # User login
│   │   ├── RegisterForm.jsx     # User registration
│   │   ├── CheckoutForm.jsx     # Checkout form
│   │   ├── AddressForm.jsx      # Address input
│   │   ├── ReviewForm.jsx       # Review submission
│   │   └── SearchForm.jsx       # Advanced search
│   │
│   ├── Filters/
│   │   ├── PriceFilter.jsx      # Price range slider
│   │   ├── BrandFilter.jsx      # Brand checkboxes
│   │   ├── RatingFilter.jsx     # Star rating filter
│   │   ├── StockFilter.jsx      # In stock checkbox
│   │   └── FilterPanel.jsx      # Combined filters
│   │
│   ├── Common/
│   │   ├── Button.jsx           # Reusable button
│   │   ├── Modal.jsx            # Popup modal
│   │   ├── Toast.jsx            # Notification toast
│   │   ├── Spinner.jsx          # Loading indicator
│   │   ├── Pagination.jsx       # Page navigation
│   │   ├── Stars.jsx            # Star rating display
│   │   ├── EmptyState.jsx       # Empty state message
│   │   ├── Breadcrumb.jsx       # Breadcrumb navigation
│   │   └── Badge.jsx            # Status/tag badge
│   │
│   ├── Featured/
│   │   ├── HeroBanner.jsx       # Hero section
│   │   ├── Carousel.jsx         # Image carousel
│   │   ├── FeaturedProducts.jsx # Featured section
│   │   └── PromoSection.jsx     # Promotion banner
│   │
│   └── Cart/
│       ├── CartItem.jsx         # Cart item row
│       ├── CartSummary.jsx      # Cart total summary
│       └── CartEmpty.jsx        # Empty cart message
│
├── pages/
│   ├── Home.jsx                 # Homepage
│   ├── Category.jsx             # Category listing
│   ├── Product.jsx              # Product detail
│   ├── Cart.jsx                 # Shopping cart
│   ├── Checkout.jsx             # Checkout flow
│   ├── PCBuilder.jsx            # PC Builder tool
│   ├── Comparison.jsx           # Product comparison
│   ├── Dashboard.jsx            # User dashboard
│   │   ├── Orders.jsx           # Order history
│   │   ├── Wishlist.jsx         # Saved items
│   │   ├── Reviews.jsx          # My reviews
│   │   ├── Profile.jsx          # User profile
│   │   └── Settings.jsx         # Account settings
│   ├── SellerDashboard.jsx      # Seller dashboard
│   ├── AdminDashboard.jsx       # Admin dashboard
│   ├── Login.jsx                # Login page
│   ├── Register.jsx             # Registration page
│   ├── NotFound.jsx             # 404 page
│   └── Search.jsx               # Search results
│
├── api/
│   └── endpoints.js             # API configuration
│
├── styles/
│   ├── theme.css                # Global styles
│   ├── darkmode.css             # Dark mode styles
│   ├── responsive.css           # Media queries
│   └── animations.css           # Keyframe animations
│
├── utils/
│   ├── formatters.js            # Price, date formatters
│   ├── storage.js               # Local storage helpers
│   ├── validators.js            # Form validation
│   ├── api-client.js            # Axios instance
│   └── constants.js             # App constants
│
├── context/
│   ├── CartContext.jsx          # Cart state management
│   ├── AuthContext.jsx          # Authentication state
│   ├── ThemeContext.jsx         # Dark/Light mode
│   └── NotificationContext.jsx  # Toast notifications
│
├── hooks/
│   ├── useCart.js               # Cart operations
│   ├── useAuth.js               # Authentication
│   ├── useTheme.js              # Theme management
│   ├── useFetch.js              # API requests
│   └── useLocalStorage.js       # Local storage
│
└── App.jsx                      # Main app component
```

---

## Core Components

### 1. Layout Components

#### MainLayout.jsx
```jsx
// Wraps all pages
// Includes: Header, Sidebar, Footer
// Handles theme toggle
// Props: children
```

#### Header.jsx
```jsx
// Top navigation bar
// Shows: Logo, Search, Cart, User Menu
// Dark/Light toggle
// Mobile hamburger menu
```

#### Footer.jsx
```jsx
// Bottom footer
// Links: Categories, About, Support, Legal
// Newsletter signup
// Social links
```

---

### 2. Navigation Components

#### Navbar.jsx
```jsx
// Logo | Search | Categories | User Menu
// Sticky on scroll
// Mobile-responsive hamburger
// Props: onSearch, onNavigate
```

#### SearchBar.jsx
```jsx
// Search input with autocomplete
// Props: onSearch, placeholder
// Shows suggestions as typing
```

#### CategoryNav.jsx
```jsx
// Dropdown with categories
// Hierarchical display
// Props: categories
// Emits: onSelect
```

---

### 3. Card Components

#### ProductCard.jsx
```jsx
// Product display with image, name, price
// Rating stars and review count
// Stock indicator
// Add to cart, wishlist buttons
// Props: product, onAddCart, onWishlist
```

#### CategoryCard.jsx
```jsx
// Category tile with icon
// Click to navigate
// Props: category, onSelect
```

#### OrderCard.jsx
```jsx
// Order summary (Orders dashboard)
// Order number, date, total, status
// Action buttons
// Props: order, onTrack, onReturn
```

---

### 4. Form Components

#### LoginForm.jsx
```jsx
// Email and password fields
// Remember me checkbox
// Login button
// Forgot password link
// Props: onSubmit, loading, error
```

#### CheckoutForm.jsx
```jsx
// Multi-step form (4 steps)
// Address, Shipping, Payment, Review
// Props: onSubmit, cartData
```

#### AddressForm.jsx
```jsx
// Address input fields
// City/Division dropdowns (Bangladesh)
// Default address checkbox
// Props: onSubmit, initialData, mode
```

---

### 5. Filter Components

#### PriceFilter.jsx
```jsx
// Range slider (min-max price)
// Input fields or slider handle
// Props: min, max, onChange
```

#### BrandFilter.jsx
```jsx
// Checkbox list of brands
// Count of items per brand
// Props: brands, selected, onChange
```

#### FilterPanel.jsx
```jsx
// Combined all filters
// Clear all button
// Props: onFilterChange
```

---

### 6. Common Components

#### Button.jsx
```jsx
// Reusable button component
// Variants: primary, secondary, danger
// Sizes: sm, md, lg
// States: normal, loading, disabled
// Props: variant, size, loading, onClick, children
```

#### Modal.jsx
```jsx
// Popup dialog
// Header, body, footer sections
// Close button
// Props: isOpen, onClose, title, children
```

#### Toast.jsx
```jsx
// Notification message
// Types: success, error, warning, info
// Auto-dismiss after 3s
// Props: type, message, duration
```

#### Pagination.jsx
```jsx
// Page navigation
// Previous/Next buttons
// Page numbers
// Props: current, total, onChange
```

---

## State Management (Context API)

### CartContext
```jsx
// State:
- items: []
- total: 0
- itemCount: 0

// Methods:
- addItem(product, quantity)
- removeItem(itemId)
- updateQuantity(itemId, quantity)
- clearCart()
- applyCoupon(code)
```

### AuthContext
```jsx
// State:
- user: null | object
- isAuthenticated: false
- loading: false
- token: null

// Methods:
- login(email, password)
- register(data)
- logout()
- updateProfile(data)
```

### ThemeContext
```jsx
// State:
- isDark: false

// Methods:
- toggleTheme()
- setTheme(dark: boolean)
```

### NotificationContext
```jsx
// State:
- notifications: []

// Methods:
- addNotification(type, message)
- removeNotification(id)
- success(message)
- error(message)
- warning(message)
```

---

## Custom Hooks

### useCart()
```jsx
// Returns: { cart, addItem, removeItem, updateQuantity, clearCart }
// Syncs with CartContext and LocalStorage
```

### useAuth()
```jsx
// Returns: { user, isAuthenticated, login, logout, register }
// Manages authentication state
// Stores token in localStorage/sessionStorage
```

### useTheme()
```jsx
// Returns: { isDark, toggleTheme }
// Manages dark/light mode
// Syncs with localStorage
```

### useFetch(url, options)
```jsx
// Returns: { data, loading, error, refetch }
// Handles API requests
// Error handling and loading state
```

---

## Routing Structure

```jsx
<BrowserRouter>
  <Routes>
    <Route path="/" element={<Home />} />
    <Route path="/category/:id" element={<Category />} />
    <Route path="/product/:id" element={<Product />} />
    <Route path="/cart" element={<Cart />} />
    <Route path="/checkout" element={<Checkout />} />
    <Route path="/pc-builder" element={<PCBuilder />} />
    <Route path="/comparison" element={<Comparison />} />
    <Route path="/search" element={<Search />} />
    
    <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>}>
      <Route path="orders" element={<Orders />} />
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="reviews" element={<Reviews />} />
      <Route path="profile" element={<Profile />} />
    </Route>
    
    <Route path="/seller-dashboard" element={<ProtectedRoute><SellerDashboard /></ProtectedRoute>} />
    <Route path="/admin-dashboard" element={<AdminRoute><AdminDashboard /></AdminRoute>} />
    
    <Route path="/login" element={<Login />} />
    <Route path="/register" element={<Register />} />
    <Route path="*" element={<NotFound />} />
  </Routes>
</BrowserRouter>
```

---

## Component Props Pattern

### ProductCard Props
```jsx
{
  product: {
    id: number,
    name: string,
    price: number,
    original_price: number,
    image: string,
    rating: number,
    reviews: number,
    in_stock: boolean
  },
  onAddCart: (product) => void,
  onWishlist: (productId) => void
}
```

### ProductCard Events
```jsx
- onClick()        // View product details
- onAddCart()      // Add to cart
- onWishlist()     // Add/Remove wishlist
- onCompare()      // Add to comparison
```

---

## Styling Conventions

### Class Naming (BEM)
```jsx
<div className="product-card">
  <div className="product-card__image">
    <img src={...} />
  </div>
  <div className="product-card__content">
    <h3 className="product-card__title">{name}</h3>
    <p className="product-card__price">{price}</p>
  </div>
  <div className="product-card__actions">
    <button className="product-card__button--primary">Add to Cart</button>
    <button className="product-card__button--secondary">Wishlist</button>
  </div>
</div>
```

### CSS Variables
```css
:root {
  --primary-dark: #081621;
  --accent-red: #D51E0B;
  --white: #ffffff;
  --gray-100: #f3f4f6;
  --gray-600: #4b5563;
  
  --spacing-unit: 8px;
  --border-radius: 4px;
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.05);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.1);
  --shadow-lg: 0 10px 15px rgba(0, 0, 0, 0.1);
}
```

---

## Performance Optimization

### Code Splitting
```jsx
// Lazy load routes
const Home = lazy(() => import('./pages/Home'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

// Suspense fallback
<Suspense fallback={<Spinner />}>
  <Outlet />
</Suspense>
```

### Memoization
```jsx
// Prevent unnecessary re-renders
const ProductCard = memo(({ product }) => {
  return (...)
}, (prevProps, nextProps) => {
  return prevProps.product.id === nextProps.product.id;
});
```

### Image Optimization
```jsx
// Lazy load images
<img loading="lazy" src={...} />

// Use WebP with fallback
<picture>
  <source srcSet="..." type="image/webp" />
  <img src="..." />
</picture>
```

---

## Error Boundary

```jsx
class ErrorBoundary extends Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error(error);
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorPage />;
    }
    return this.props.children;
  }
}
```

---

## Testing Structure

```
__tests__/
├── components/
│   ├── ProductCard.test.jsx
│   └── Button.test.jsx
├── pages/
│   ├── Home.test.jsx
│   └── Product.test.jsx
└── utils/
    ├── formatters.test.js
    └── validators.test.js
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-19
