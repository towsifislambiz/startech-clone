# 🔌 Startech - API Structure

Complete API specification for the Startech backend.

---

## Base Configuration

```
Base URL: https://api.startech.bd/v1/
Protocol: HTTPS
Format: JSON
Authentication: JWT Bearer Token
Rate Limit: 100 requests/minute
```

---

## Authentication

### Register User
```
POST /auth/register

Request:
{
  "email": "user@example.com",
  "password": "securepass123",
  "first_name": "John",
  "last_name": "Doe",
  "phone": "01712345678"
}

Response (201):
{
  "success": true,
  "message": "Registration successful",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "token": "eyJhbGciOiJIUzI1NiIs..."
  }
}

Errors:
- 400: Email already exists
- 422: Validation error
```

### Login
```
POST /auth/login

Request:
{
  "email": "user@example.com",
  "password": "securepass123"
}

Response (200):
{
  "success": true,
  "message": "Login successful",
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "role": "customer",
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  }
}

Errors:
- 401: Invalid credentials
- 404: User not found
```

### Logout
```
POST /auth/logout
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Logged out successfully"
}
```

### Refresh Token
```
POST /auth/refresh
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIs...",
    "expires_in": 86400
  }
}
```

---

## Products

### Get All Products
```
GET /products

Query Parameters:
- page: int (default: 1)
- limit: int (default: 12, max: 100)
- sort: string (newest, price_asc, price_desc, rating, bestseller)
- category_id: int
- brand_id: int
- min_price: decimal
- max_price: decimal
- search: string
- in_stock: boolean

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "sku": "RTX4090-001",
      "name": "NVIDIA RTX 4090",
      "slug": "nvidia-rtx-4090",
      "short_description": "Professional GPU",
      "selling_price": 150000,
      "original_price": 180000,
      "discount_percentage": 16.67,
      "quantity_in_stock": 5,
      "category_id": 3,
      "brand_id": 5,
      "average_rating": 4.8,
      "review_count": 245,
      "featured_image": "https://...",
      "is_featured": true,
      "is_bestseller": true,
      "is_new": false
    },
    ...
  ],
  "pagination": {
    "total": 450,
    "page": 1,
    "limit": 12,
    "pages": 38
  }
}
```

### Get Product Details
```
GET /products/:id

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "sku": "RTX4090-001",
    "name": "NVIDIA RTX 4090",
    "slug": "nvidia-rtx-4090",
    "description": "The world's most powerful GPU...",
    "short_description": "Professional GPU",
    "selling_price": 150000,
    "original_price": 180000,
    "cost_price": 120000,
    "discount_percentage": 16.67,
    "quantity_in_stock": 5,
    "quantity_reserved": 0,
    "low_stock_threshold": 10,
    "category_id": 3,
    "brand_id": 5,
    "seller_id": 10,
    "featured_image": "https://...",
    "images": [
      "https://...",
      "https://..."
    ],
    "specifications": {
      "memory": "24GB GDDR6X",
      "memory_bandwidth": "960 GB/s",
      "cuda_cores": 16384,
      "tdp": "450W"
    },
    "average_rating": 4.8,
    "review_count": 245,
    "seller": {
      "id": 10,
      "name": "TechStore BD",
      "rating": 4.9,
      "verified": true
    },
    "related_products": [...]
  }
}

Errors:
- 404: Product not found
```

### Search Products
```
GET /products/search

Query Parameters:
- q: string (required)
- limit: int (default: 20)
- offset: int (default: 0)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "NVIDIA RTX 4090",
      "featured_image": "https://...",
      "selling_price": 150000
    },
    ...
  ],
  "total": 45
}
```

### Filter Products
```
GET /products/filter

Query Parameters:
- categories: int[] (comma-separated)
- brands: int[] (comma-separated)
- min_price: decimal
- max_price: decimal
- rating: int (1-5)
- in_stock: boolean
- is_featured: boolean
- sort: string
- page: int
- limit: int

Response (200):
{
  "success": true,
  "data": [...],
  "filters_applied": {
    "categories": [3, 4],
    "brands": [5],
    "price_range": [50000, 200000],
    "rating": 4,
    "in_stock": true
  }
}
```

---

## Categories

### Get All Categories
```
GET /categories

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Computers",
      "slug": "computers",
      "description": "Gaming PCs, Workstations, Office PCs",
      "parent_category_id": null,
      "icon_url": "https://...",
      "banner_image": "https://...",
      "display_order": 1,
      "subcategories": [
        {
          "id": 2,
          "name": "Gaming PCs",
          "slug": "gaming-pcs"
        },
        {
          "id": 3,
          "name": "Workstations",
          "slug": "workstations"
        }
      ]
    },
    ...
  ]
}
```

### Get Category Products
```
GET /categories/:id/products

Query Parameters:
- page: int
- limit: int
- sort: string

Response (200):
{
  "success": true,
  "data": {
    "category": {
      "id": 1,
      "name": "Computers",
      "description": "..."
    },
    "products": [...],
    "pagination": {...}
  }
}
```

---

## Shopping Cart

### Get Cart
```
GET /cart
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "user_id": 1,
    "items": [
      {
        "id": 1,
        "product_id": 123,
        "product_name": "RTX 4090",
        "quantity": 1,
        "unit_price": 150000,
        "total_price": 150000,
        "variant_id": null,
        "variant_details": null,
        "featured_image": "https://..."
      },
      {
        "id": 2,
        "product_id": 456,
        "product_name": "Intel i9-13900K",
        "quantity": 2,
        "unit_price": 85000,
        "total_price": 170000,
        "variant_details": {
          "color": "Black"
        }
      }
    ],
    "subtotal": 320000,
    "discount": 0,
    "tax": 48000,
    "shipping": 250,
    "total": 368250,
    "item_count": 3
  }
}
```

### Add to Cart
```
POST /cart
Authorization: Bearer {token}

Request:
{
  "product_id": 123,
  "quantity": 1,
  "variant_id": null,
  "variant_details": {
    "color": "Black",
    "storage": "512GB"
  }
}

Response (201):
{
  "success": true,
  "message": "Item added to cart",
  "data": {
    "id": 1,
    "product_id": 123,
    "quantity": 1,
    "total_price": 150000
  }
}

Errors:
- 404: Product not found
- 400: Out of stock
- 422: Invalid variant
```

### Update Cart Item
```
PUT /cart/:itemId
Authorization: Bearer {token}

Request:
{
  "quantity": 2
}

Response (200):
{
  "success": true,
  "message": "Cart updated",
  "data": {
    "id": 1,
    "quantity": 2,
    "total_price": 300000
  }
}

Errors:
- 400: Quantity exceeds stock
```

### Remove from Cart
```
DELETE /cart/:itemId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Item removed from cart"
}
```

### Clear Cart
```
DELETE /cart
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Cart cleared"
}
```

---

## Orders

### Create Order
```
POST /orders
Authorization: Bearer {token}

Request:
{
  "shipping_address_id": 1,
  "shipping_method": "express",
  "payment_method": "sslcommerz",
  "coupon_code": "SUMMER20",
  "customer_notes": "Please deliver in morning"
}

Response (201):
{
  "success": true,
  "message": "Order created successfully",
  "data": {
    "id": 1,
    "order_number": "ST-2026-001234",
    "user_id": 1,
    "total_amount": 368250,
    "status": "pending",
    "payment_status": "pending",
    "items": [...],
    "created_at": "2026-06-19T10:30:00Z"
  }
}

Errors:
- 400: Invalid shipping address
- 400: Invalid coupon code
- 422: Cart is empty
```

### Get User Orders
```
GET /orders
Authorization: Bearer {token}

Query Parameters:
- page: int
- limit: int
- status: string (pending, confirmed, shipped, delivered, cancelled)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "order_number": "ST-2026-001234",
      "total_amount": 368250,
      "status": "delivered",
      "payment_status": "completed",
      "item_count": 3,
      "created_at": "2026-06-15T10:30:00Z",
      "delivered_at": "2026-06-19T10:30:00Z"
    },
    ...
  ],
  "pagination": {...}
}
```

### Get Order Details
```
GET /orders/:orderId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "order_number": "ST-2026-001234",
    "user_id": 1,
    "items": [
      {
        "id": 1,
        "product_id": 123,
        "product_name": "RTX 4090",
        "quantity": 1,
        "unit_price": 150000,
        "total_price": 150000
      }
    ],
    "subtotal": 320000,
    "discount_amount": 10000,
    "tax_amount": 46500,
    "shipping_cost": 250,
    "total_amount": 368250,
    "status": "delivered",
    "payment_status": "completed",
    "payment_method": "sslcommerz",
    "transaction_id": "TXN123456",
    "shipping_address": {
      "recipient_name": "John Doe",
      "street_address": "123 Main St",
      "city": "Dhaka",
      "postal_code": "1200"
    },
    "tracking_number": "BD123456789",
    "created_at": "2026-06-15T10:30:00Z",
    "confirmed_at": "2026-06-15T11:00:00Z",
    "shipped_at": "2026-06-16T10:00:00Z",
    "delivered_at": "2026-06-19T10:30:00Z"
  }
}

Errors:
- 404: Order not found
- 403: Unauthorized (not order owner)
```

### Cancel Order
```
PUT /orders/:orderId/cancel
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Order cancelled successfully",
  "data": {
    "id": 1,
    "status": "cancelled",
    "refund_status": "initiated"
  }
}

Errors:
- 400: Cannot cancel shipped/delivered orders
```

---

## Payments

### Process Payment
```
POST /payments
Authorization: Bearer {token}

Request:
{
  "order_id": 1,
  "payment_method": "bkash",
  "amount": 368250,
  "phone_number": "01712345678", // For mobile payments
  "transaction_ref": "BKash Ref ID" // For manual verification
}

Response (201):
{
  "success": true,
  "message": "Payment initiated",
  "data": {
    "id": 1,
    "order_id": 1,
    "amount": 368250,
    "status": "processing",
    "payment_method": "bkash",
    "created_at": "2026-06-19T10:30:00Z"
  }
}

Errors:
- 404: Order not found
- 400: Invalid payment method
```

### Verify Payment
```
POST /payments/verify
Authorization: Bearer {token}

Request:
{
  "order_id": 1,
  "payment_id": 1,
  "gateway_transaction_id": "BKash123456",
  "gateway_response": {...} // Gateway-specific response
}

Response (200):
{
  "success": true,
  "message": "Payment verified",
  "data": {
    "id": 1,
    "status": "completed",
    "verified_at": "2026-06-19T10:31:00Z"
  }
}

Errors:
- 400: Payment verification failed
```

### Get Payment Status
```
GET /payments/:paymentId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "order_id": 1,
    "amount": 368250,
    "status": "completed",
    "payment_method": "sslcommerz",
    "gateway_transaction_id": "SSLTxn123456",
    "verified_at": "2026-06-19T10:31:00Z",
    "completed_at": "2026-06-19T10:31:00Z"
  }
}
```

---

## Reviews

### Get Product Reviews
```
GET /products/:productId/reviews

Query Parameters:
- page: int
- limit: int
- sort: string (newest, helpful, rating_high, rating_low)
- rating: int (1-5)

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "user_id": 5,
      "user_name": "John Doe",
      "rating": 5,
      "title": "Amazing GPU!",
      "comment": "Best purchase ever...",
      "verified_purchase": true,
      "helpful_count": 45,
      "unhelpful_count": 2,
      "images": ["https://..."],
      "created_at": "2026-06-10T10:30:00Z"
    },
    ...
  ],
  "summary": {
    "average_rating": 4.8,
    "total_reviews": 245,
    "rating_breakdown": {
      "5": 200,
      "4": 35,
      "3": 8,
      "2": 2,
      "1": 0
    }
  }
}
```

### Submit Review
```
POST /reviews
Authorization: Bearer {token}

Request:
{
  "product_id": 123,
  "order_id": 1,
  "rating": 5,
  "title": "Amazing GPU!",
  "comment": "Best purchase ever...",
  "images": ["base64 encoded images..."]
}

Response (201):
{
  "success": true,
  "message": "Review submitted for moderation",
  "data": {
    "id": 1,
    "product_id": 123,
    "rating": 5,
    "status": "pending"
  }
}

Errors:
- 400: Already reviewed this product
- 422: Invalid rating (must be 1-5)
```

### Update Review
```
PUT /reviews/:reviewId
Authorization: Bearer {token}

Request:
{
  "rating": 4,
  "title": "Updated title",
  "comment": "Updated comment"
}

Response (200):
{
  "success": true,
  "message": "Review updated"
}
```

### Delete Review
```
DELETE /reviews/:reviewId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Review deleted"
}
```

---

## Wishlist

### Get Wishlist
```
GET /wishlist
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "product_id": 123,
      "product_name": "RTX 4090",
      "featured_image": "https://...",
      "price_at_save": 150000,
      "current_price": 145000,
      "price_drop": 5000,
      "in_stock": true,
      "added_at": "2026-06-10T10:30:00Z"
    },
    ...
  ]
}
```

### Add to Wishlist
```
POST /wishlist
Authorization: Bearer {token}

Request:
{
  "product_id": 123
}

Response (201):
{
  "success": true,
  "message": "Added to wishlist"
}

Errors:
- 404: Product not found
```

### Remove from Wishlist
```
DELETE /wishlist/:productId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Removed from wishlist"
}
```

---

## User Profile

### Get Profile
```
GET /users/profile
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": {
    "id": 1,
    "email": "user@example.com",
    "first_name": "John",
    "last_name": "Doe",
    "phone": "01712345678",
    "date_of_birth": "1990-01-15",
    "gender": "male",
    "avatar_url": "https://...",
    "bio": "Tech enthusiast",
    "newsletter_subscribed": true,
    "created_at": "2026-01-01T10:30:00Z"
  }
}
```

### Update Profile
```
PUT /users/profile
Authorization: Bearer {token}

Request:
{
  "first_name": "Jane",
  "last_name": "Smith",
  "phone": "01798765432",
  "date_of_birth": "1990-01-15",
  "gender": "female",
  "bio": "Updated bio"
}

Response (200):
{
  "success": true,
  "message": "Profile updated",
  "data": {...}
}

Errors:
- 422: Validation error
```

### Change Password
```
PUT /users/password
Authorization: Bearer {token}

Request:
{
  "current_password": "oldpass123",
  "new_password": "newpass123",
  "confirm_password": "newpass123"
}

Response (200):
{
  "success": true,
  "message": "Password changed successfully"
}

Errors:
- 401: Current password is incorrect
- 422: Passwords don't match
```

---

## Addresses

### Get Addresses
```
GET /addresses
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "data": [
    {
      "id": 1,
      "type": "shipping",
      "label": "Home",
      "street_address": "123 Main St",
      "city": "Dhaka",
      "division": "Dhaka",
      "postal_code": "1200",
      "recipient_name": "John Doe",
      "recipient_phone": "01712345678",
      "is_default": true,
      "is_active": true
    },
    ...
  ]
}
```

### Add Address
```
POST /addresses
Authorization: Bearer {token}

Request:
{
  "type": "shipping",
  "label": "Office",
  "street_address": "456 Business Ave",
  "city": "Dhaka",
  "division": "Dhaka",
  "postal_code": "1210",
  "recipient_name": "John Doe",
  "recipient_phone": "01712345678",
  "is_default": false
}

Response (201):
{
  "success": true,
  "message": "Address added",
  "data": {...}
}
```

### Update Address
```
PUT /addresses/:addressId
Authorization: Bearer {token}

Request:
{
  "label": "New Office",
  "street_address": "789 Business Ave"
}

Response (200):
{
  "success": true,
  "message": "Address updated"
}
```

### Delete Address
```
DELETE /addresses/:addressId
Authorization: Bearer {token}

Response (200):
{
  "success": true,
  "message": "Address deleted"
}
```

---

## Error Handling

### Error Response Format
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Validation failed",
    "details": {
      "email": "Email is required",
      "password": "Password must be at least 8 characters"
    }
  }
}
```

### Common Error Codes
- `400`: Bad Request
- `401`: Unauthorized (Missing/Invalid token)
- `403`: Forbidden (No permission)
- `404`: Not Found
- `409`: Conflict (Duplicate record)
- `422`: Validation Error
- `429`: Too Many Requests
- `500`: Internal Server Error
- `503`: Service Unavailable

---

## Rate Limiting

- **Limit**: 100 requests per minute per IP
- **Headers**:
  ```
  X-RateLimit-Limit: 100
  X-RateLimit-Remaining: 45
  X-RateLimit-Reset: 1624079400
  ```
- **Exceeded**: Returns 429 status

---

## Response Format

### Success Response
```json
{
  "success": true,
  "message": "Optional message",
  "data": {...}
}
```

### List Response with Pagination
```json
{
  "success": true,
  "data": [...],
  "pagination": {
    "total": 450,
    "page": 1,
    "limit": 12,
    "pages": 38
  }
}
```

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-19
