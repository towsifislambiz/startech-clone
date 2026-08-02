import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiShoppingCart, FiStar, FiZap, FiCheck, FiXCircle, FiEye } from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';
import useWishlist from '../../hooks/useWishlist';
import useCompare from '../../hooks/useCompare';
import QuickViewModal from './QuickViewModal';
import './ProductCard.css';

const ProductCard = ({ product }) => {
  const { addItem } = useCart();
  const { success } = useNotification();
  const { isWishlisted, toggleWishlist } = useWishlist();
  const { isCompared, toggleCompare } = useCompare();

  const [quickViewOpen, setQuickViewOpen] = useState(false);

  if (!product) return null;

  const isOutOfStock = product.stock === 'Out of Stock' || product.stockCount === 0;
  const wishlisted = isWishlisted(product.id);
  const compared = isCompared(product.id);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (isOutOfStock) return;

    addItem({
      id: product.id,
      name: product.name,
      selling_price: product.price,
      featured_image: product.thumbnail || product.images[0]
    }, 1);

    success(`Added "${product.name.substring(0, 24)}..." to cart!`);
  };

  const handleQuickView = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setQuickViewOpen(true);
  };

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleWishlist(product);
  };

  const handleCompareToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleCompare(product);
  };

  return (
    <>
      <div className={`pc-card ${isOutOfStock ? 'pc-card-out' : ''}`}>
        {/* Badges Stack */}
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '4px', zIndex: 5 }}>
          {product.discount > 0 && (
            <span className="pc-badge-discount">-{product.discount}%</span>
          )}

          {product.stock && product.stock !== 'In Stock' && (
            <span className={`pc-badge-stock ${product.stock.toLowerCase().replace(/\s+/g, '-')}`}>
              {product.stock}
            </span>
          )}

          {product.rating >= 4.8 && (
            <span style={{ backgroundColor: '#f59e0b', color: '#000', fontSize: '9px', fontWeight: '900', padding: '2px 6px', borderRadius: '4px' }}>
              TOP RATED
            </span>
          )}
        </div>

        {/* Quick Action Overlay Buttons */}
        <div className="pc-quick-actions">
          <button
            type="button"
            className="pc-action-btn"
            title="Quick View"
            onClick={handleQuickView}
          >
            <FiEye size={16} />
          </button>

          <button
            type="button"
            className={`pc-action-btn ${wishlisted ? 'active-wish' : ''}`}
            title={wishlisted ? 'Remove from Wishlist' : 'Add to Wishlist'}
            onClick={handleWishlistToggle}
            style={{ color: wishlisted ? '#D51E0B' : 'inherit' }}
          >
            <FiHeart size={16} style={{ fill: wishlisted ? '#D51E0B' : 'none' }} />
          </button>

          <button
            type="button"
            className={`pc-action-btn ${compared ? 'active-comp' : ''}`}
            title={compared ? 'Remove from Compare' : 'Compare Product'}
            onClick={handleCompareToggle}
            style={{ color: compared ? '#3b82f6' : 'inherit' }}
          >
            <BsArrowLeftRight size={16} />
          </button>
        </div>

        {/* Product Image Link */}
        <Link to={`/product/${product.id}`} className="pc-image-wrap">
          <img
            src={product.thumbnail || product.images[0]}
            alt={product.name}
            loading="lazy"
            className="pc-image"
          />
        </Link>

        {/* Product Information */}
        <div className="pc-info">
          <div className="pc-brand-row">
            <span className="pc-brand">{product.brand}</span>
            <span className="pc-sku">Code: {product.sku}</span>
          </div>

          <Link to={`/product/${product.id}`} className="pc-title" title={product.name}>
            {product.name}
          </Link>

          {/* Specs summary bullets */}
          {product.keyFeatures && product.keyFeatures.length > 0 && (
            <ul className="pc-features">
              {product.keyFeatures.slice(0, 2).map((feat, idx) => (
                <li key={idx}><FiCheck size={12} /> {feat}</li>
              ))}
            </ul>
          )}

          {/* Rating Stars */}
          <div className="pc-rating">
            <div className="pc-stars">
              {[1, 2, 3, 4, 5].map((star) => (
                <FiStar
                  key={star}
                  size={13}
                  className={star <= Math.round(product.rating || 5) ? 'pc-star-filled' : 'pc-star-empty'}
                />
              ))}
            </div>
            <span className="pc-rating-count">({product.reviewsCount || 0})</span>
          </div>

          {/* Price & EMI */}
          <div className="pc-price-box">
            <div className="pc-price-row">
              <span className="pc-price">৳{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice > product.price && (
                <span className="pc-old-price">৳{product.oldPrice.toLocaleString('en-IN')}</span>
              )}
            </div>

            {product.emiPerMonth > 0 && (
              <div className="pc-emi">
                <FiZap size={11} /> EMI ৳{product.emiPerMonth.toLocaleString('en-IN')}/mo
              </div>
            )}
          </div>

          {/* Add to Cart Button */}
          <button
            type="button"
            className={`pc-cart-btn ${isOutOfStock ? 'pc-cart-disabled' : ''}`}
            disabled={isOutOfStock}
            onClick={handleAddToCart}
          >
            {isOutOfStock ? (
              <>
                <FiXCircle size={16} /> Out of Stock
              </>
            ) : (
              <>
                <FiShoppingCart size={16} /> Add to Cart
              </>
            )}
          </button>
        </div>
      </div>

      {/* Quick View Modal Drawer */}
      <QuickViewModal
        product={product}
        isOpen={quickViewOpen}
        onClose={() => setQuickViewOpen(false)}
      />
    </>
  );
};

export default React.memo(ProductCard);
