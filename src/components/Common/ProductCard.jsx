import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { FiHeart, FiBarChart2, FiShoppingCart, FiStar } from 'react-icons/fi';
import { formatPrice, calculateDiscount } from '../../utils/formatters';
import { useCart } from '../../context/CartContext';
import { useNotification } from '../../context/NotificationContext';

const ProductCard = memo(({ product }) => {
  const { addItem } = useCart();
  const { success } = useNotification();

  const discount = calculateDiscount(product.oldPrice, product.price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(
      {
        id: product.id,
        name: product.name,
        selling_price: product.price,
        featured_image: product.image || product.img,
      },
      1
    );
    success('Added to cart');
  };

  return (
    <div className="st-product-card">
      {discount > 0 && <span className="st-discount">-{discount}%</span>}
      <div className="st-product-actions">
        <button title="Add to Wishlist" type="button">
          <FiHeart />
        </button>
        <button title="Compare" type="button">
          <FiBarChart2 />
        </button>
      </div>

      <Link to={`/product/${product.id}`} className="st-product-img">
        {typeof product.image === 'string' && (product.image.startsWith('http') || product.image.startsWith('/')) ? (
          <img src={product.image} alt={product.name} loading="lazy" />
        ) : (
          <span>{product.image || product.img || '🎮'}</span>
        )}
      </Link>

      <div className="st-product-body">
        <Link to={`/product/${product.id}`} className="st-product-name">
          {product.name}
        </Link>

        {product.specs && (
          <ul className="st-product-specs">
            {product.specs.map((spec, i) => (
              <li key={i}>{spec}</li>
            ))}
          </ul>
        )}

        {product.rating && (
          <div className="st-product-rating" style={{ display: 'flex', gap: '2px', color: '#ffb400', fontSize: '12px', margin: '4px 0' }}>
            {[1, 2, 3, 4, 5].map((s) => (
              <FiStar key={s} className={s <= Math.round(product.rating) ? 'fill' : ''} style={{ fill: s <= Math.round(product.rating) ? '#ffb400' : 'none' }} />
            ))}
            {product.reviews && <span style={{ color: 'var(--text-secondary)', marginLeft: '4px' }}>({product.reviews})</span>}
          </div>
        )}

        <div className="st-product-price-row">
          <span className="st-price">{formatPrice(product.price)}</span>
          {product.oldPrice > product.price && (
            <span className="st-old-price">{formatPrice(product.oldPrice)}</span>
          )}
        </div>

        <span className={`st-stock ${product.status === 'In Stock' || product.stock !== false ? 'in' : 'pre'}`}>
          {product.status || (product.stock ? 'In Stock' : 'Out of Stock')}
        </span>

        <div className="st-product-buttons">
          <Link to={`/product/${product.id}`} className="st-buy-now">
            Buy Now
          </Link>
          <button
            type="button"
            className="st-add-cart"
            title="Add to Cart"
            onClick={handleAddToCart}
          >
            <FiShoppingCart />
          </button>
        </div>
      </div>
    </div>
  );
});

ProductCard.displayName = 'ProductCard';

export default ProductCard;
