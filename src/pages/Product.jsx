import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {
  FiHeart, FiShoppingCart, FiTruck, FiShield, FiRefreshCw, FiCheck,
  FiMinus, FiPlus, FiChevronRight, FiStar, FiZap, FiMapPin, FiCreditCard
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import useWishlist from '../hooks/useWishlist';
import useCompare from '../hooks/useCompare';
import { addRecentlyViewed } from '../store/recentlyViewedSlice';
import productService from '../services/productService';

import ProductGallery from '../components/Product/ProductGallery';
import ProductVariantSelector from '../components/Product/ProductVariantSelector';
import ProductSpecsTable from '../components/Product/ProductSpecsTable';
import ProductReviews from '../components/Product/ProductReviews';
import RelatedProducts from '../components/Product/RelatedProducts';
import FrequentlyBoughtTogether from '../components/Product/FrequentlyBoughtTogether';
import RecentlyViewed from '../components/Product/RecentlyViewed';
import ProductShare from '../components/Product/ProductShare';
import StickyPurchaseBar from '../components/Product/StickyPurchaseBar';
import ProductSkeleton from '../components/Product/ProductSkeleton';
import './Product.css';

const Product = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { addItem } = useCart();
  const { success } = useNotification();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeVariant, setActiveVariant] = useState(null);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('specs');

  // Load product details & track recently viewed
  useEffect(() => {
    let isMounted = true;
    const fetchProductDetails = async () => {
      setLoading(true);
      try {
        const data = await productService.getProduct(id);
        if (isMounted) {
          setProduct(data);
          setActiveVariant(data.variants && data.variants.length > 0 ? data.variants[0] : null);

          // Track in Recently Viewed history
          dispatch(addRecentlyViewed(data));

          // Dynamic SEO meta updates
          document.title = `${data.name} Price in BD | StarTech`;
        }
      } catch (err) {
        console.warn('Error loading product details:', err);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchProductDetails();
    return () => { isMounted = false; };
  }, [id, dispatch]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '40px 0' }}>
        <ProductSkeleton count={1} />
      </div>
    );
  }

  if (!product) return null;

  const currentPrice = activeVariant?.price || product.price;
  const currentOldPrice = activeVariant?.oldPrice || product.oldPrice;
  const currentSku = activeVariant?.sku || product.sku;
  const currentStock = activeVariant?.stock || product.stock;
  const isOutOfStock = currentStock === 'Out of Stock' || product.stockCount === 0;

  const currentDiscount = currentOldPrice > currentPrice ? Math.round(((currentOldPrice - currentPrice) / currentOldPrice) * 100) : 0;
  const currentSaveAmount = currentOldPrice > currentPrice ? currentOldPrice - currentPrice : 0;
  const currentEmi = Math.round(currentPrice / 12);

  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  // Delivery date estimation (3 days from today)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);
  const formattedDeliveryDate = deliveryDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });

  const handleAddToCart = () => {
    if (isOutOfStock) return;
    addItem({
      id: `${product.id}${activeVariant ? `_${activeVariant.id}` : ''}`,
      name: `${product.name}${activeVariant ? ` (${activeVariant.name})` : ''}`,
      selling_price: currentPrice,
      featured_image: product.thumbnail || product.images[0]
    }, qty);

    success(`Added ${qty} × "${product.name.substring(0, 28)}..." to cart!`);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    navigate('/checkout');
  };

  return (
    <div className="pd">
      {/* Structured JSON-LD Schema for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org/",
          "@type": "Product",
          "name": product.name,
          "image": product.images,
          "description": product.description,
          "sku": currentSku,
          "brand": { "@type": "Brand", "name": product.brand },
          "offers": {
            "@type": "Offer",
            "priceCurrency": "BDT",
            "price": currentPrice,
            "availability": isOutOfStock ? "https://schema.org/OutOfStock" : "https://schema.org/InStock"
          }
        })}
      </script>

      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <Link to={`/category/${product.categorySlug}`}>{product.category}</Link> <FiChevronRight />
          <Link to={`/brand/${product.brandSlug}`}>{product.brand}</Link> <FiChevronRight />
          <span>{product.name}</span>
        </div>
      </div>

      {/* Main Grid */}
      <div className="container pd-main">
        {/* ===== Gallery Column ===== */}
        <div className="pd-gallery-col">
          <ProductGallery
            images={product.images}
            name={product.name}
            discount={currentDiscount}
          />

          {/* Social Share Bar */}
          <ProductShare product={product} />
        </div>

        {/* ===== Product Details Info Column ===== */}
        <div className="pd-info">
          <div className="pd-header-top">
            <Link to={`/brand/${product.brandSlug}`} className="pd-brand">{product.brand}</Link>
          </div>

          <h1 className="pd-title">{product.name}</h1>

          {/* Rating & SKU Meta Bar */}
          <div className="pd-meta">
            <div className="pd-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} className={s <= Math.round(product.rating) ? 'fill' : ''} />
              ))}
              <span>{product.rating} ({product.reviewsCount} reviews)</span>
            </div>
            <span className="pd-meta-divider" />
            <span className="pd-code">SKU: {currentSku}</span>
          </div>

          {/* Pricing Box */}
          <div className="pd-price-box">
            <div className="pd-price-row">
              <span className="pd-price">৳{currentPrice.toLocaleString('en-IN')}</span>
              {currentOldPrice > currentPrice && (
                <span className="pd-old">৳{currentOldPrice.toLocaleString('en-IN')}</span>
              )}
              {currentDiscount > 0 && (
                <span className="pd-save">Save ৳{currentSaveAmount.toLocaleString('en-IN')} (-{currentDiscount}%)</span>
              )}
            </div>

            <div className="pd-emi">
              <FiZap /> EMI from <strong>৳{currentEmi.toLocaleString('en-IN')}/mo</strong> for 12 months (36 mo available)
            </div>
          </div>

          {/* Stock & Delivery Information Box */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', margin: '12px 0' }}>
            <div className={`pd-stock ${isOutOfStock ? 'pd-stock-out' : 'pd-stock-in'}`}>
              {isOutOfStock ? (
                <>❌ {currentStock}</>
              ) : (
                <><FiCheck /> {currentStock} ({product.stockCount} items left in stock)</>
              )}
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '8px', fontSize: '12px', color: 'var(--text-secondary)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '6px' }}>
                <FiTruck style={{ color: '#3b82f6' }} /> Delivery by <strong>{formattedDeliveryDate}</strong>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '6px' }}>
                <FiCreditCard style={{ color: '#22c55e' }} /> Cash on Delivery Available
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', backgroundColor: 'var(--bg-secondary)', padding: '8px 10px', borderRadius: '6px' }}>
                <FiMapPin style={{ color: '#D51E0B' }} /> Free Express Store Pickup
              </div>
            </div>
          </div>

          {/* Variants Selector */}
          {product.variants && product.variants.length > 0 && (
            <ProductVariantSelector
              variants={product.variants}
              activeVariant={activeVariant}
              onSelectVariant={(v) => setActiveVariant(v)}
            />
          )}

          {/* Key Features */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <div className="pd-features">
              <h4>Key Features</h4>
              <ul>
                {product.keyFeatures.map((f, i) => (
                  <li key={i}><FiCheck /> {f}</li>
                ))}
              </ul>
            </div>
          )}

          {/* Quantity & Buy Buttons */}
          <div className="pd-buy">
            <div className="pd-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))} disabled={isOutOfStock}><FiMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)} disabled={isOutOfStock}><FiPlus /></button>
            </div>

            <button
              className={`pd-add-cart ${isOutOfStock ? 'disabled' : ''}`}
              disabled={isOutOfStock}
              onClick={handleAddToCart}
            >
              <FiShoppingCart /> {isOutOfStock ? 'Unavailable' : 'Add to Cart'}
            </button>

            <button
              className={`pd-buy-now ${isOutOfStock ? 'disabled' : ''}`}
              disabled={isOutOfStock}
              onClick={handleBuyNow}
            >
              Buy Now
            </button>
          </div>

          {/* Wishlist & Compare Buttons */}
          <div className="pd-actions-row">
            <button
              type="button"
              className={`pd-icon-btn ${wishlisted ? 'active' : ''}`}
              onClick={() => toggleWishlist(product)}
              style={{ color: wishlisted ? '#D51E0B' : 'inherit' }}
            >
              <FiHeart style={{ fill: wishlisted ? '#D51E0B' : 'none' }} />
              {wishlisted ? 'In Wishlist' : 'Add to Wishlist'}
            </button>

            <button
              type="button"
              className={`pd-icon-btn ${compared ? 'active' : ''}`}
              onClick={() => toggleCompare(product)}
              style={{ color: compared ? '#3b82f6' : 'inherit' }}
            >
              <BsArrowLeftRight />
              {compared ? 'In Comparison' : 'Compare'}
            </button>
          </div>

          {/* Trust Guarantees */}
          <div className="pd-trust">
            <div><FiTruck /> <span>Fast Delivery<br /><small>All over Bangladesh</small></span></div>
            <div><FiShield /> <span>{product.warranty}</span></div>
            <div><FiRefreshCw /> <span>7 Days Replacement<br /><small>Easy Return Policy</small></span></div>
          </div>
        </div>
      </div>

      {/* ===== Frequently Bought Together Accessory Bundle ===== */}
      <div className="container">
        <FrequentlyBoughtTogether currentProduct={product} />
      </div>

      {/* ===== Tabs Section ===== */}
      <div className="container pd-tabs-wrap">
        <div className="pd-tabs">
          <button className={tab === 'specs' ? 'active' : ''} onClick={() => setTab('specs')}>Specifications</button>
          <button className={tab === 'desc' ? 'active' : ''} onClick={() => setTab('desc')}>Description</button>
          <button className={tab === 'reviews' ? 'active' : ''} onClick={() => setTab('reviews')}>Reviews ({product.reviewsCount})</button>
        </div>

        <div className="pd-tab-body">
          {tab === 'specs' && (
            <ProductSpecsTable specifications={product.specifications} />
          )}

          {tab === 'desc' && (
            <div className="pd-desc">
              <p>{product.description}</p>
              <h4 style={{ marginTop: '20px', color: 'var(--text-primary)' }}>Why Buy {product.name} from StarTech?</h4>
              <p>StarTech is the leading electronics and IT retail chain in Bangladesh. When you purchase from StarTech, you are guaranteed 100% genuine products with official brand warranty, expert technical support, and fast delivery nationwide.</p>
            </div>
          )}

          {tab === 'reviews' && (
            <ProductReviews
              rating={product.rating}
              reviewsCount={product.reviewsCount}
              reviewsList={product.reviewsList}
            />
          )}
        </div>
      </div>

      {/* ===== Related Products ===== */}
      <div className="container">
        <RelatedProducts
          currentId={product.id}
          category={product.category}
          brand={product.brand}
          price={product.price}
        />
      </div>

      {/* ===== Recently Viewed History ===== */}
      <div className="container">
        <RecentlyViewed excludeId={product.id} />
      </div>

      {/* Sticky Bottom Purchase Bar */}
      <StickyPurchaseBar product={product} />
    </div>
  );
};

export default Product;
