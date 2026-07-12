# 💾 Startech - Database Schema

Complete MySQL/MariaDB schema for the Startech eCommerce platform.

---

## 1. Users Table

```sql
CREATE TABLE users (
  id INT PRIMARY KEY AUTO_INCREMENT,
  email VARCHAR(255) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  phone VARCHAR(20),
  date_of_birth DATE,
  gender ENUM('male', 'female', 'other'),
  
  -- Address
  street_address VARCHAR(255),
  city VARCHAR(100),
  division VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Bangladesh',
  
  -- Account Info
  role ENUM('customer', 'seller', 'admin') DEFAULT 'customer',
  verification_status ENUM('unverified', 'verified', 'suspended') DEFAULT 'unverified',
  is_email_verified BOOLEAN DEFAULT FALSE,
  is_phone_verified BOOLEAN DEFAULT FALSE,
  
  -- Profile
  avatar_url VARCHAR(255),
  bio TEXT,
  newsletter_subscribed BOOLEAN DEFAULT TRUE,
  
  -- Metadata
  last_login DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  
  INDEX (email),
  INDEX (role),
  INDEX (created_at)
);
```

---

## 2. Products Table

```sql
CREATE TABLE products (
  id INT PRIMARY KEY AUTO_INCREMENT,
  sku VARCHAR(100) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  short_description VARCHAR(500),
  
  -- Pricing
  base_price DECIMAL(10, 2) NOT NULL,
  selling_price DECIMAL(10, 2) NOT NULL,
  original_price DECIMAL(10, 2),
  cost_price DECIMAL(10, 2),
  discount_percentage DECIMAL(5, 2),
  
  -- Stock
  quantity_in_stock INT NOT NULL DEFAULT 0,
  quantity_reserved INT DEFAULT 0,
  low_stock_threshold INT DEFAULT 10,
  
  -- Classification
  category_id INT NOT NULL,
  subcategory_id INT,
  brand_id INT,
  
  -- Seller
  seller_id INT NOT NULL,
  
  -- Media
  featured_image VARCHAR(255),
  images JSON, -- Array of image URLs
  
  -- Specifications
  specifications JSON, -- Dynamic specs by category
  
  -- Status & Visibility
  is_active BOOLEAN DEFAULT TRUE,
  is_featured BOOLEAN DEFAULT FALSE,
  is_bestseller BOOLEAN DEFAULT FALSE,
  is_new BOOLEAN DEFAULT FALSE,
  
  -- Ratings & Reviews
  average_rating DECIMAL(3, 2) DEFAULT 0,
  review_count INT DEFAULT 0,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(255),
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  deleted_at DATETIME,
  
  FOREIGN KEY (category_id) REFERENCES categories(id),
  FOREIGN KEY (seller_id) REFERENCES users(id),
  FOREIGN KEY (brand_id) REFERENCES brands(id),
  
  INDEX (category_id),
  INDEX (seller_id),
  INDEX (brand_id),
  INDEX (is_active),
  INDEX (created_at)
);
```

---

## 3. Categories Table

```sql
CREATE TABLE categories (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  parent_category_id INT,
  
  -- Display
  icon_url VARCHAR(255),
  banner_image VARCHAR(255),
  display_order INT DEFAULT 0,
  
  -- SEO
  meta_title VARCHAR(255),
  meta_description VARCHAR(500),
  meta_keywords VARCHAR(255),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (parent_category_id) REFERENCES categories(id),
  
  INDEX (parent_category_id),
  INDEX (is_active),
  INDEX (display_order)
);
```

---

## 4. Brands Table

```sql
CREATE TABLE brands (
  id INT PRIMARY KEY AUTO_INCREMENT,
  name VARCHAR(255) NOT NULL UNIQUE,
  slug VARCHAR(255) UNIQUE,
  description TEXT,
  logo_url VARCHAR(255),
  website_url VARCHAR(255),
  
  -- Status
  is_active BOOLEAN DEFAULT TRUE,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX (is_active)
);
```

---

## 5. Orders Table

```sql
CREATE TABLE orders (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_number VARCHAR(50) UNIQUE NOT NULL,
  user_id INT NOT NULL,
  
  -- Totals
  subtotal DECIMAL(12, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  discount_code VARCHAR(50),
  tax_amount DECIMAL(10, 2) DEFAULT 0,
  shipping_cost DECIMAL(10, 2) DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL,
  
  -- Shipping
  shipping_address_id INT,
  shipping_method ENUM('standard', 'express', 'overnight') DEFAULT 'standard',
  tracking_number VARCHAR(100),
  
  -- Order Status
  status ENUM(
    'pending',
    'confirmed',
    'processing',
    'shipped',
    'in_transit',
    'delivered',
    'cancelled',
    'returned',
    'failed'
  ) DEFAULT 'pending',
  
  -- Payment
  payment_status ENUM('pending', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  
  -- Customer Notes
  customer_notes TEXT,
  admin_notes TEXT,
  
  -- Dates
  order_date DATETIME DEFAULT CURRENT_TIMESTAMP,
  confirmed_date DATETIME,
  shipped_date DATETIME,
  delivered_date DATETIME,
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (shipping_address_id) REFERENCES addresses(id),
  
  INDEX (user_id),
  INDEX (status),
  INDEX (payment_status),
  INDEX (order_date),
  INDEX (order_number)
);
```

---

## 6. Order Items Table

```sql
CREATE TABLE order_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  product_id INT NOT NULL,
  seller_id INT NOT NULL,
  
  quantity INT NOT NULL DEFAULT 1,
  unit_price DECIMAL(10, 2) NOT NULL,
  discount_amount DECIMAL(10, 2) DEFAULT 0,
  total_price DECIMAL(12, 2) NOT NULL,
  
  -- Variant Info (if applicable)
  variant_id INT,
  variant_details JSON, -- Stores color, size, etc.
  
  -- Status
  item_status ENUM('pending', 'confirmed', 'shipped', 'delivered', 'cancelled') DEFAULT 'pending',
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (order_id) REFERENCES orders(id) ON DELETE CASCADE,
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (seller_id) REFERENCES users(id),
  
  INDEX (order_id),
  INDEX (product_id)
);
```

---

## 7. Payments Table

```sql
CREATE TABLE payments (
  id INT PRIMARY KEY AUTO_INCREMENT,
  order_id INT NOT NULL,
  amount DECIMAL(12, 2) NOT NULL,
  
  payment_method ENUM(
    'bkash',
    'nagad',
    'sslcommerz',
    'bank_transfer',
    'cod'
  ) NOT NULL,
  
  status ENUM('pending', 'processing', 'completed', 'failed', 'refunded') DEFAULT 'pending',
  
  -- Payment Gateway Details
  gateway_transaction_id VARCHAR(255),
  gateway_response JSON,
  
  -- Verification
  verified_at DATETIME,
  verified_by INT,
  
  -- Timestamps
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  completed_at DATETIME,
  
  FOREIGN KEY (order_id) REFERENCES orders(id),
  
  INDEX (order_id),
  INDEX (status),
  INDEX (created_at)
);
```

---

## 8. Addresses Table

```sql
CREATE TABLE addresses (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  
  type ENUM('billing', 'shipping', 'both') DEFAULT 'shipping',
  label VARCHAR(50), -- Home, Office, etc.
  
  street_address VARCHAR(255) NOT NULL,
  city VARCHAR(100) NOT NULL,
  division VARCHAR(100),
  postal_code VARCHAR(20),
  country VARCHAR(100) DEFAULT 'Bangladesh',
  
  recipient_name VARCHAR(255) NOT NULL,
  recipient_phone VARCHAR(20),
  
  is_default BOOLEAN DEFAULT FALSE,
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  
  INDEX (user_id),
  INDEX (is_default)
);
```

---

## 9. Reviews Table

```sql
CREATE TABLE reviews (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  user_id INT NOT NULL,
  order_id INT,
  
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  title VARCHAR(255),
  comment TEXT,
  
  verified_purchase BOOLEAN DEFAULT FALSE,
  helpful_count INT DEFAULT 0,
  unhelpful_count INT DEFAULT 0,
  
  images JSON, -- Array of review image URLs
  
  status ENUM('pending', 'approved', 'rejected') DEFAULT 'pending',
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (order_id) REFERENCES orders(id),
  
  INDEX (product_id),
  INDEX (user_id),
  INDEX (status),
  INDEX (created_at)
);
```

---

## 10. Wishlist Table

```sql
CREATE TABLE wishlists (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  product_id INT NOT NULL,
  
  price_at_save DECIMAL(10, 2),
  notes TEXT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  UNIQUE KEY unique_user_product (user_id, product_id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (product_id) REFERENCES products(id),
  
  INDEX (user_id),
  INDEX (created_at)
);
```

---

## 11. Cart Items Table

```sql
CREATE TABLE cart_items (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  session_id VARCHAR(255),
  product_id INT NOT NULL,
  
  quantity INT NOT NULL DEFAULT 1,
  variant_id INT,
  
  added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id),
  
  INDEX (user_id),
  INDEX (session_id)
);
```

---

## 12. PC Builds Table

```sql
CREATE TABLE pc_builds (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  
  -- Components
  cpu_id INT,
  gpu_id INT,
  ram_id INT,
  storage_id INT,
  psu_id INT,
  case_id INT,
  cooler_id INT,
  monitor_id INT,
  keyboard_id INT,
  mouse_id INT,
  headset_id INT,
  
  -- Calculated Values
  total_cost DECIMAL(12, 2),
  power_consumption INT, -- Watts
  est_fps_1080p INT,
  est_fps_1440p INT,
  est_fps_4k INT,
  use_case VARCHAR(100), -- Gaming, Workstation, Office, etc.
  
  is_public BOOLEAN DEFAULT FALSE,
  is_shared BOOLEAN DEFAULT FALSE,
  share_token VARCHAR(100) UNIQUE,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  
  INDEX (user_id),
  INDEX (use_case)
);
```

---

## 13. Comparisons Table

```sql
CREATE TABLE comparisons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT,
  
  product_ids JSON, -- Array of product IDs
  comparison_data JSON, -- Cached comparison data
  
  is_saved BOOLEAN DEFAULT FALSE,
  is_public BOOLEAN DEFAULT FALSE,
  share_token VARCHAR(100) UNIQUE,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  
  INDEX (user_id),
  INDEX (created_at)
);
```

---

## 14. Coupons Table

```sql
CREATE TABLE coupons (
  id INT PRIMARY KEY AUTO_INCREMENT,
  code VARCHAR(50) UNIQUE NOT NULL,
  description TEXT,
  
  discount_type ENUM('percentage', 'fixed_amount') DEFAULT 'percentage',
  discount_value DECIMAL(10, 2) NOT NULL,
  
  minimum_purchase DECIMAL(10, 2) DEFAULT 0,
  maximum_discount DECIMAL(10, 2),
  
  usage_limit INT,
  usage_per_customer INT DEFAULT 1,
  current_usage INT DEFAULT 0,
  
  valid_from DATETIME NOT NULL,
  valid_until DATETIME NOT NULL,
  
  applicable_categories JSON, -- Null = all
  applicable_brands JSON, -- Null = all
  
  is_active BOOLEAN DEFAULT TRUE,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  
  INDEX (code),
  INDEX (is_active)
);
```

---

## 15. Inventory History Table

```sql
CREATE TABLE inventory_history (
  id INT PRIMARY KEY AUTO_INCREMENT,
  product_id INT NOT NULL,
  
  quantity_change INT NOT NULL,
  transaction_type ENUM(
    'purchase',
    'return',
    'stock_adjustment',
    'damaged',
    'lost'
  ) NOT NULL,
  
  reason TEXT,
  created_by INT,
  
  old_quantity INT,
  new_quantity INT,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (product_id) REFERENCES products(id),
  FOREIGN KEY (created_by) REFERENCES users(id),
  
  INDEX (product_id),
  INDEX (created_at)
);
```

---

## 16. Notifications Table

```sql
CREATE TABLE notifications (
  id INT PRIMARY KEY AUTO_INCREMENT,
  user_id INT NOT NULL,
  
  type ENUM(
    'order_status',
    'price_drop',
    'back_in_stock',
    'review_response',
    'new_offer',
    'shipment_update'
  ) NOT NULL,
  
  title VARCHAR(255) NOT NULL,
  message TEXT NOT NULL,
  
  related_id INT, -- Product ID, Order ID, etc.
  related_type VARCHAR(50), -- 'product', 'order', etc.
  
  is_read BOOLEAN DEFAULT FALSE,
  read_at DATETIME,
  
  created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
  
  FOREIGN KEY (user_id) REFERENCES users(id),
  
  INDEX (user_id),
  INDEX (is_read),
  INDEX (created_at)
);
```

---

## Indexing Strategy

### Primary Indexes
- All primary keys
- Foreign keys
- Unique constraints

### Performance Indexes
- `users.email` - Login queries
- `products.category_id` - Category browsing
- `products.is_active` - Product visibility
- `orders.user_id` - User orders
- `orders.status` - Order tracking
- `reviews.product_id` - Product reviews
- `wishlists.user_id` - User wishlist
- `cart_items.user_id` - Shopping cart

---

## Relationship Diagram

```
users ──┬──→ products (seller)
        ├──→ orders
        ├──→ addresses
        ├──→ reviews
        ├──→ wishlists
        ├──→ cart_items
        └──→ pc_builds

products ──┬──→ categories
           ├──→ brands
           ├──→ reviews
           ├──→ wishlists
           ├──→ order_items
           └──→ inventory_history

orders ──┬──→ order_items
         ├──→ payments
         └──→ addresses

pc_builds ──→ products (components)

comparisons ──→ products
```

---

## JSON Field Specifications

### Products - specifications
```json
{
  "cpu": "Intel i9-13900K",
  "cpu_cores": 24,
  "cpu_threads": 32,
  "gpu": "RTX 4090",
  "gpu_memory": "24GB",
  "ram_type": "DDR5",
  "ram_capacity": 32,
  "storage_type": "NVMe SSD",
  "storage_capacity": 1000,
  "weight": 2.5,
  "dimensions": "20x10x15 cm"
}
```

### Order Items - variant_details
```json
{
  "color": "Black",
  "storage": "512GB",
  "ram": "16GB",
  "warranty": "2 Years"
}
```

### PC Builds - product_ids
```json
[
  { "product_id": 123, "category": "cpu" },
  { "product_id": 456, "category": "gpu" },
  { "product_id": 789, "category": "ram" }
]
```

---

## Migration Strategy

### Phase 1: Core Tables
- users, products, categories, brands

### Phase 2: Sales Tables
- orders, order_items, payments, addresses

### Phase 3: Features Tables
- reviews, wishlists, cart_items

### Phase 4: Advanced Tables
- pc_builds, comparisons, coupons

### Phase 5: Operational Tables
- inventory_history, notifications

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-19
