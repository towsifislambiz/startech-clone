# 🔄 Startech - Complete UX Flow

## User Journey Maps

### 1. Guest Browsing to Purchase

```
ENTRY POINT: Homepage

┌─────────────────────────────────────┐
│   Homepage (Hero + Categories)      │
│   - Search Bar                      │
│   - Featured Products               │
│   - Best Sellers                    │
│   - New Arrivals                    │
└─────────┬───────────────────────────┘
          │
          ├─→ Search Products
          │   ↓
          │   Search Results Page
          │   ↓
          │   Product Grid + Filters
          │
          ├─→ Browse Category
          │   ↓
          │   Category Page
          │   - Sidebar Filters
          │   - Product Grid
          │   - Sorting Options
          │
          ├─→ Click Product
          │   ↓
          │   Product Details Page
          │   - Images
          │   - Specs
          │   - Reviews
          │   - Price Info
          │   - Add to Cart Button
          │
          └─→ Add to Cart
              ↓
              Shopping Cart
              - Review Items
              - Adjust Quantity
              - Apply Coupons
              - Proceed to Checkout
              ↓
              Checkout Flow
              - Shipping Address
              - Shipping Method
              - Payment Method
              - Order Review
              ↓
              Payment Processing
              (bKash/Nagad/SSLCommerz/COD)
              ↓
              Order Confirmation
              - Order Number
              - Email Confirmation
              - Track Order
              ↓
              Create Account (Optional)
              - Register
              - Login
              - Save for Future
              ↓
              Order Received Email
              ↓
              Track Shipment
```

---

### 2. Registered User Login to Reorder

```
┌─────────────────────────────────┐
│   Login Page                    │
│   - Email/Password              │
│   - Remember Me                 │
│   - Forgot Password             │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Dashboard (Orders Tab)        │
│   - Order History               │
│   - Track Shipment              │
│   - Return/Complaint            │
│   - Reorder Button              │
└─────────┬───────────────────────┘
          ↓
     Click Reorder
          ↓
┌─────────────────────────────────┐
│   Cart with Same Items          │
│   - Items from Previous Order   │
│   - Can Modify Quantity         │
│   - Can Add More Items          │
└─────────┬───────────────────────┘
          ↓
    Proceed to Checkout
          ↓
     Order Confirmation
```

---

### 3. PC Builder Journey

```
┌─────────────────────────────────┐
│   Homepage / Tools Menu         │
│   - Click "PC Builder"          │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   PC Builder - Wizard           │
│                                 │
│   Step 1: Budget/Use Case       │
│   - Gaming                      │
│   - Workstation                 │
│   - Office                      │
│   - Custom Budget               │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 2: CPU Selection         │
│   - Brand Filter (Intel/AMD)    │
│   - Price Range                 │
│   - Performance Level           │
│   - Shows Recommended CPUs      │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 3: GPU Selection         │
│   - Type (Gaming/Professional)  │
│   - VRAM (2GB-24GB)             │
│   - Shows FPS Estimates         │
│   - Shows Compatibility         │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 4: RAM Selection         │
│   - Type (DDR4/DDR5)            │
│   - Capacity (8GB-128GB)        │
│   - Speed (MHz)                 │
│   - Shows Compatibility         │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 5: Storage Selection     │
│   - SSD (NVMe/SATA)             │
│   - HDD (Capacity)              │
│   - Total Storage Display       │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 6: PSU Selection         │
│   - Auto-calculates Wattage     │
│   - Shows Power Consumption     │
│   - Recommended PSU             │
│   - Efficiency (80+ Gold/Plat)  │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 7: Case & Cooling        │
│   - Case Type (ATX/mATX/ITX)    │
│   - Air/Liquid Cooling          │
│   - Shows Compatibility         │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Step 8: Peripherals (Optional)│
│   - Monitor                     │
│   - Keyboard                    │
│   - Mouse                       │
│   - Headset                     │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Build Summary                 │
│   - Total Price: 150,000 TK     │
│   - Power Consumption: 450W     │
│   - Est. FPS (Game Bench)       │
│   - Performance Tier            │
│                                 │
│   Actions:                      │
│   - Save Build                  │
│   - Share Build                 │
│   - Modify Components           │
│   - Add All to Cart             │
└─────────┬───────────────────────┘
          ↓
    Add All to Cart
          ↓
    Proceed to Checkout
          ↓
    Order Confirmation
```

---

### 4. Product Comparison Journey

```
ENTRY POINT: Product Page

┌─────────────────────────────────┐
│   Product Page                  │
│   - Product Details             │
│   - Add to Comparison Link      │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Comparison Page (Empty)       │
│   - Add Product Button          │
│   - Search Products             │
└─────────┬───────────────────────┘
          ↓
    Add Product 1
    Add Product 2
    Add Product 3
    (Up to 5 products)
          ↓
┌─────────────────────────────────┐
│   Comparison Table              │
│                                 │
│   Product 1 │ Product 2 │ Prod 3│
│   ─────────┼──────────┼─────── │
│   Price    │  Price   │ Price  │
│   Rating   │  Rating  │ Rating │
│   CPU      │   CPU    │  CPU   │
│   GPU      │   GPU    │  GPU   │
│   RAM      │   RAM    │  RAM   │
│   Storage  │ Storage  │Storage │
│   Weight   │  Weight  │ Weight │
│   ...      │   ...    │  ...   │
│                                 │
│   Actions:                      │
│   - Highlight Differences       │
│   - Add to Cart (Individual)    │
│   - Remove from Comparison      │
│   - Start Over                  │
└─────────┬───────────────────────┘
          ↓
    Add Item to Cart
          ↓
    Proceed to Checkout
```

---

### 5. Wishlist & Save for Later

```
┌─────────────────────────────────┐
│   Product Page                  │
│   - Heart Icon (Add to Wishlist)│
└─────────┬───────────────────────┘
          ↓
    Click Heart
          ↓
┌─────────────────────────────────┐
│   Confirmation Toast            │
│   "Added to Wishlist ✓"         │
└─────────────────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Later: Dashboard → Wishlist   │
│   - Wishlist Items              │
│   - Price at Save               │
│   - Current Price               │
│   - Price Drop Alert            │
│   - Add to Cart Button          │
│   - Remove from Wishlist        │
│   - Move to Cart                │
└─────────┬───────────────────────┘
          ↓
    Add to Cart
          ↓
    Proceed to Checkout
```

---

### 6. Reviews & Ratings

```
TRIGGER: After Order Delivered

┌─────────────────────────────────┐
│   Email Notification            │
│   "Rate your purchase"          │
│   - Link to Review Page         │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Product Review Form           │
│   - Star Rating (1-5)           │
│   - Review Title                │
│   - Review Comment              │
│   - Upload Photos               │
│   - Verified Purchase Badge     │
│   - Submit Review               │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   Review Submission Confirmation│
│   "Review submitted for moderation"
│   - Show in My Reviews          │
│   - Edit Review Link            │
└─────────────────────────────────┘
          ↓
    Admin Approval
          ↓
┌─────────────────────────────────┐
│   Review Shows on Product Page  │
│   - Your Review Visible         │
│   - Counted in Average Rating   │
│   - Others Can Vote Helpful     │
└─────────────────────────────────┘
```

---

### 7. Checkout Flow (Detailed)

```
┌─────────────────────────────────┐
│   CHECKOUT STEP 1               │
│   Shipping Address              │
│                                 │
│   ☐ Use Default Address         │
│   ☐ Use Previous Address        │
│   ☐ Enter New Address           │
│                                 │
│   Form Fields:                  │
│   - Full Name                   │
│   - Phone Number                │
│   - Street Address              │
│   - City / Division             │
│   - Postal Code                 │
│   - Country (Auto: Bangladesh)  │
│                                 │
│   - Save as Default (Checkbox)  │
│   [Continue →]                  │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   CHECKOUT STEP 2               │
│   Shipping Method               │
│                                 │
│   ○ Standard (3-5 days) - 100   │
│   ○ Express (1-2 days) - 250    │
│   ○ Overnight - 500             │
│                                 │
│   Map + Est. Delivery Date      │
│                                 │
│   [← Back]  [Continue →]        │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   CHECKOUT STEP 3               │
│   Payment Method                │
│                                 │
│   ○ bKash Mobile Banking        │
│   ○ Nagad                       │
│   ○ SSLCommerz (Card/Net Bank)  │
│   ○ Bank Transfer (Manual)      │
│   ○ Cash on Delivery (Selected) │
│                                 │
│   Payment Details:              │
│   - Total Amount: 50,250 TK     │
│   - Security Badge              │
│                                 │
│   [← Back]  [Continue →]        │
└─────────┬───────────────────────┘
          ↓
┌─────────────────────────────────┐
│   CHECKOUT STEP 4               │
│   Order Review                  │
│                                 │
│   Items:                        │
│   ┌─────────────────────────┐   │
│   │ Product 1              │   │
│   │ Qty: 2 × 15,000 = 30k  │   │
│   └─────────────────────────┘   │
│   ┌─────────────────────────┐   │
│   │ Product 2              │   │
│   │ Qty: 1 × 18,000 = 18k  │   │
│   └─────────────────────────┘   │
│                                 │
│   Subtotal:        48,000 TK    │
│   Discount:        -2,000 TK    │
│   Shipping:        +250 TK      │
│   Tax (VAT 15%):   +7,050 TK    │
│   ─────────────────────────     │
│   TOTAL:           53,300 TK    │
│                                 │
│   ☐ I agree to terms & conditions
│                                 │
│   [← Back]  [Place Order]       │
└─────────┬───────────────────────┘
          ↓
    Payment Processing
    (Depends on Method)
          ↓
┌─────────────────────────────────┐
│   ORDER CONFIRMATION            │
│                                 │
│   ✓ Order Placed Successfully   │
│                                 │
│   Order Number: #ST-2026-001234 │
│   Total Amount: 53,300 TK       │
│   Estimated Delivery: June 23   │
│                                 │
│   Next Steps:                   │
│   1. Check email for details    │
│   2. Track order in dashboard   │
│   3. Contact support (?)        │
│                                 │
│   [Continue Shopping] [Go to Dashboard]
└─────────────────────────────────┘
```

---

### 8. User Dashboard Navigation

```
┌─────────────────────────────────┐
│   Dashboard Home                │
│                                 │
│   Welcome, John!                │
│                                 │
│   Quick Stats:                  │
│   - Recent Orders: 3            │
│   - Wishlist Items: 12          │
│   - My Reviews: 5               │
│                                 │
│   Sidebar Navigation:           │
│   📦 Orders (Current)           │
│   ❤️  Wishlist (12)             │
│   ⭐ Reviews (5)                │
│   🛠️  Saved Builds (2)          │
│   🔄 Comparisons (1)            │
│   👤 Profile                    │
│   🔐 Security                   │
│   ⚙️  Settings                  │
│   📧 Notifications              │
│                                 │
│   [Log Out]                     │
└─────────────────────────────────┘

   ↓ Click Each Tab

┌─────────────────────────────────┐
│   Orders Tab                    │
│   ┌─────────────────────────┐   │
│   │ #ST-2026-001234        │   │
│   │ June 15, 2026          │   │
│   │ Amount: 53,300 TK      │   │
│   │ Status: Delivered ✓    │   │
│   │ [View] [Reorder]       │   │
│   └─────────────────────────┘   │
│   ┌─────────────────────────┐   │
│   │ #ST-2026-001233        │   │
│   │ June 8, 2026           │   │
│   │ Amount: 25,000 TK      │   │
│   │ Status: In Transit     │   │
│   │ [View] [Track]         │   │
│   └─────────────────────────┘   │
│                                 │
│   [View All Orders]             │
└─────────────────────────────────┘

   ↓ Click Wishlist

┌─────────────────────────────────┐
│   Wishlist Tab                  │
│   ┌─────────────────────────┐   │
│   │ RTX 4090 GPU           │   │
│   │ Was: 150,000 TK        │   │
│   │ Now: 140,000 TK ↓      │   │
│   │ Saved: June 10, 2026   │   │
│   │ [Add to Cart] [Remove] │   │
│   └─────────────────────────┘   │
│   ┌─────────────────────────┐   │
│   │ Intel i9-13900K        │   │
│   │ Price: 85,000 TK       │   │
│   │ Saved: June 5, 2026    │   │
│   │ [Add to Cart] [Remove] │   │
│   └─────────────────────────┘   │
└─────────────────────────────────┘
```

---

### 9. Search & Filter Experience

```
┌─────────────────────────────────┐
│   Homepage / Category           │
│   ┌──────────────────────────┐  │
│   │ [Search...] [🔍]        │  │
│   └──────────────────────────┘  │
└─────────┬───────────────────────┘
          ↓
    Type Search Query
    "RTX 4090"
          ↓
┌─────────────────────────────────┐
│   Search Results Page           │
│   Filters Sidebar               │
│   ├─ Brand                      │
│   │  ☑ NVIDIA (45)             │
│   │  ☐ AMD (12)                │
│   │  ☐ Intel (5)               │
│   │                             │
│   ├─ Price Range               │
│   │  [Min: 0] - [Max: 500k]    │
│   │  Slider ────●──────        │
│   │                             │
│   ├─ Stock Status              │
│   │  ☑ In Stock (35)           │
│   │  ☐ Pre-Order (8)           │
│   │  ☐ Out of Stock (2)        │
│   │                             │
│   ├─ Memory                     │
│   │  ☐ 8GB                     │
│   │  ☐ 12GB                    │
│   │  ☑ 16GB (20)               │
│   │  ☑ 24GB (15)               │
│   │                             │
│   └─ Seller                     │
│      ☑ Official Store (30)     │
│      ☑ Authorized (20)         │
│      ☐ Third Party (5)         │
│                                 │
│   [Clear All Filters]           │
│                                 │
│   Results: 50 Products          │
│   ↓ Sort By [Newest ▼]         │
│                                 │
│   [Product Grid - 12 items/page]
│                                 │
│   [← Prev] [1] [2] [3] [Next →]
└─────────────────────────────────┘
```

---

## State Management Flow

```
User Actions
    ↓
Component Handler
    ↓
Context Update (Context API)
    ↓
Component Re-render
    ↓
UI Update

Example:
Add to Cart
    ↓
CartContext.addItem(product)
    ↓
Update localStorage
    ↓
Update cart badge count
    ↓
Show toast "Added to Cart"
```

---

## Payment Flow

### bKash / Nagad
```
Select Payment Method
    ↓
Show Merchant Number
    ↓
Customer Opens Wallet App
    ↓
Enters Amount & OTP
    ↓
Payment Success/Failure Callback
    ↓
Verify on Backend
    ↓
Order Confirmation
```

### SSLCommerz
```
Select Payment Method
    ↓
Redirect to SSLCommerz Gateway
    ↓
Customer Selects Payment Option
  (Card / Net Banking / Mobile)
    ↓
Enter Payment Details
    ↓
OTP Verification
    ↓
Return to Website
    ↓
Verify Payment
    ↓
Order Confirmation
```

### Cash on Delivery
```
Select COD
    ↓
Order Created (Pending Payment)
    ↓
Shipment Arranged
    ↓
Customer Receives
    ↓
Customer Pays
    ↓
Order Completed
```

---

## Mobile Navigation Flow

```
┌──────────────────────────────┐
│  Mobile Hamburger Menu       │
│  ☰                           │
└──────────────────────────────┘
          ↓ Click ☰
┌──────────────────────────────┐
│  Slide-out Navigation        │
│  ├─ Home                     │
│  ├─ Categories               │
│  │  ├─ Computers             │
│  │  ├─ Laptops               │
│  │  ├─ Components            │
│  │  ├─ Peripherals           │
│  │  ├─ Smartphones           │
│  │  └─ Gadgets               │
│  ├─ Tools                    │
│  │  ├─ PC Builder            │
│  │  ├─ Compatibility         │
│  │  ├─ Power Calculator      │
│  │  └─ Comparison            │
│  ├─ Deals                    │
│  ├─ My Account               │
│  │  ├─ Login/Register        │
│  │  ├─ Orders                │
│  │  ├─ Wishlist              │
│  │  └─ Settings              │
│  ├─ Help & Support           │
│  ├─ Dark Mode Toggle         │
│  └─ Log Out                  │
└──────────────────────────────┘
```

---

## Error & Success States

### Success States
- Order Placed Successfully
- Item Added to Cart
- Item Added to Wishlist
- Review Submitted
- Profile Updated
- Payment Successful

### Error States
- Product Out of Stock
- Invalid Coupon Code
- Payment Failed
- Login Failed
- Network Error
- Server Error (500)
- Not Found (404)

### Loading States
- Fetching Products
- Processing Payment
- Submitting Review
- Uploading Image
- Saving Build

Each state has:
- Loading indicator/spinner
- Error message with retry option
- Success message with action buttons

---

## Accessibility Flows

### Keyboard Navigation
- Tab through all interactive elements
- Enter to activate buttons/links
- Escape to close modals
- Arrow keys for sliders/carousels

### Screen Reader
- Proper heading hierarchy
- Alt text for images
- ARIA labels for buttons
- Form labels associated with inputs
- Error messages announced

### Color Contrast
- Text: 4.5:1 ratio (WCAG AA)
- Large text: 3:1 ratio
- Non-text: 3:1 ratio

---

**Document Version**: 1.0  
**Last Updated**: 2026-06-19
