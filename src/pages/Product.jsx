import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiHeart, FiShoppingCart, FiTruck, FiShield, FiRefreshCw, FiCheck,
  FiMinus, FiPlus, FiChevronRight, FiStar, FiZap
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import './Product.css';

const img = (label, bg = '081621') =>
  `https://placehold.co/700x550/${bg}/ffffff/png?text=${encodeURIComponent(label)}&font=montserrat`;

const Product = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { success } = useNotification();

  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const [tab, setTab] = useState('specs');

  // Mock product
  const product = {
    id,
    name: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X Graphics Card',
    brand: 'ASUS',
    rating: 4.8,
    reviews: 245,
    price: 215000,
    oldPrice: 245000,
    stock: 'In Stock',
    code: 'GPU-RTX4090-ROG',
    gallery: [
      img('RTX 4090 · Front', '0a5c2e'),
      img('RTX 4090 · Back', '0f2742'),
      img('RTX 4090 · Ports', '4a1d96'),
      img('RTX 4090 · Box', '111827'),
    ],
    keyFeatures: [
      'NVIDIA Ada Lovelace architecture',
      '24GB GDDR6X 384-bit memory',
      'Boost Clock 2640 MHz (OC Mode)',
      '16384 CUDA Cores',
      'Triple Axial-tech fans + 3.5 slot design',
      'DLSS 3 & Ray Tracing support',
    ],
    specs: {
      'General': {
        'Brand': 'ASUS',
        'Model': 'ROG Strix RTX 4090 OC',
        'Chipset': 'NVIDIA GeForce RTX 4090',
        'Series': 'ROG Strix',
      },
      'Memory': {
        'Memory Size': '24GB',
        'Memory Type': 'GDDR6X',
        'Memory Interface': '384-bit',
        'Memory Bandwidth': '1008 GB/s',
      },
      'Clock & Cores': {
        'CUDA Cores': '16384',
        'Boost Clock': '2640 MHz (OC)',
        'Base Clock': '2235 MHz',
      },
      'Connectivity': {
        'Interface': 'PCIe 4.0 x16',
        'Display Outputs': '2x HDMI 2.1, 3x DisplayPort 1.4a',
        'Power Connector': '1x 16-pin',
        'Recommended PSU': '1000W',
      },
    },
    warranty: '3 Years Official Warranty',
  };

  const off = Math.round(((product.oldPrice - product.price) / product.oldPrice) * 100);
  const emiPerMonth = Math.round(product.price / 12);

  const handleAddToCart = () => {
    addItem({ id: product.id, name: product.name, selling_price: product.price, featured_image: product.gallery[0] }, qty);
    success(`${qty} × added to cart`);
  };

  const related = [
    { id: 101, name: 'Gigabyte RTX 4070 Ti 12GB', price: 95000, img: img('RTX 4070 Ti', '0a5c2e') },
    { id: 102, name: 'MSI RTX 4060 Ti 8GB Gaming X', price: 52000, img: img('RTX 4060 Ti', '0a5c2e') },
    { id: 103, name: 'AMD Radeon RX 7800 XT 16GB', price: 68000, img: img('RX 7800 XT', 'a01406') },
    { id: 104, name: 'Corsair RM1000x 1000W PSU', price: 18500, img: img('RM1000x', '7c3aed') },
  ];

  return (
    <div className="pd">
      {/* Breadcrumb */}
      <div className="pd-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <Link to="/category/3">Graphics Card</Link> <FiChevronRight />
          <span>{product.brand} RTX 4090</span>
        </div>
      </div>

      <div className="container pd-main">
        {/* ===== Gallery ===== */}
        <div className="pd-gallery">
          <div className="pd-main-img">
            {off > 0 && <span className="pd-badge">-{off}%</span>}
            <img src={product.gallery[activeImg]} alt={product.name} />
          </div>
          <div className="pd-thumbs">
            {product.gallery.map((src, i) => (
              <button
                key={i}
                className={`pd-thumb ${i === activeImg ? 'active' : ''}`}
                onClick={() => setActiveImg(i)}
              >
                <img src={src} alt={`view ${i + 1}`} />
              </button>
            ))}
          </div>
        </div>

        {/* ===== Info ===== */}
        <div className="pd-info">
          <span className="pd-brand">{product.brand}</span>
          <h1 className="pd-title">{product.name}</h1>

          <div className="pd-meta">
            <div className="pd-stars">
              {[1, 2, 3, 4, 5].map((s) => (
                <FiStar key={s} className={s <= Math.round(product.rating) ? 'fill' : ''} />
              ))}
              <span>{product.rating} ({product.reviews} reviews)</span>
            </div>
            <span className="pd-meta-divider" />
            <span className="pd-code">Code: {product.code}</span>
          </div>

          <div className="pd-price-box">
            <div className="pd-price-row">
              <span className="pd-price">৳{product.price.toLocaleString('en-IN')}</span>
              {product.oldPrice > product.price && (
                <span className="pd-old">৳{product.oldPrice.toLocaleString('en-IN')}</span>
              )}
              {off > 0 && <span className="pd-save">Save ৳{(product.oldPrice - product.price).toLocaleString('en-IN')}</span>}
            </div>
            <div className="pd-emi"><FiZap /> EMI from <strong>৳{emiPerMonth.toLocaleString('en-IN')}/mo</strong> for 12 months</div>
          </div>

          <div className="pd-stock"><FiCheck /> {product.stock}</div>

          {/* Key features */}
          <div className="pd-features">
            <h4>Key Features</h4>
            <ul>
              {product.keyFeatures.map((f, i) => (
                <li key={i}><FiCheck /> {f}</li>
              ))}
            </ul>
          </div>

          {/* Quantity + buttons */}
          <div className="pd-buy">
            <div className="pd-qty">
              <button onClick={() => setQty(Math.max(1, qty - 1))}><FiMinus /></button>
              <span>{qty}</span>
              <button onClick={() => setQty(qty + 1)}><FiPlus /></button>
            </div>
            <button className="pd-add-cart" onClick={handleAddToCart}>
              <FiShoppingCart /> Add to Cart
            </button>
            <Link to="/checkout" className="pd-buy-now" onClick={handleAddToCart}>
              Buy Now
            </Link>
          </div>

          <div className="pd-actions-row">
            <button className="pd-icon-btn"><FiHeart /> Add to Wishlist</button>
            <button className="pd-icon-btn"><BsArrowLeftRight /> Compare</button>
          </div>

          {/* Trust badges */}
          <div className="pd-trust">
            <div><FiTruck /> <span>Fast Delivery<br /><small>All over Bangladesh</small></span></div>
            <div><FiShield /> <span>{product.warranty}</span></div>
            <div><FiRefreshCw /> <span>7 Days<br /><small>Easy Return</small></span></div>
          </div>
        </div>
      </div>

      {/* ===== Tabs ===== */}
      <div className="container pd-tabs-wrap">
        <div className="pd-tabs">
          <button className={tab === 'specs' ? 'active' : ''} onClick={() => setTab('specs')}>Specifications</button>
          <button className={tab === 'desc' ? 'active' : ''} onClick={() => setTab('desc')}>Description</button>
          <button className={tab === 'reviews' ? 'active' : ''} onClick={() => setTab('reviews')}>Reviews ({product.reviews})</button>
        </div>

        <div className="pd-tab-body">
          {tab === 'specs' && (
            <div className="pd-specs">
              {Object.entries(product.specs).map(([group, rows]) => (
                <div key={group} className="pd-spec-group">
                  <h4>{group}</h4>
                  <table>
                    <tbody>
                      {Object.entries(rows).map(([k, v]) => (
                        <tr key={k}>
                          <td className="pd-spec-key">{k}</td>
                          <td className="pd-spec-val">{v}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ))}
            </div>
          )}

          {tab === 'desc' && (
            <div className="pd-desc">
              <p>The <strong>{product.name}</strong> delivers uncompromising performance for 4K gaming, content creation, and AI workloads. Built on NVIDIA's Ada Lovelace architecture, it offers a massive leap in efficiency and raw power.</p>
              <p>With 24GB of ultra-fast GDDR6X memory and 16384 CUDA cores, this card handles the most demanding titles at maximum settings while staying cool and quiet thanks to the ROG Strix triple-fan cooling system.</p>
              <p>DLSS 3 with Frame Generation multiplies performance, and full ray tracing support brings cinematic lighting to your favorite games.</p>
            </div>
          )}

          {tab === 'reviews' && (
            <div className="pd-reviews">
              <div className="pd-review-summary">
                <div className="pd-review-score">
                  <strong>{product.rating}</strong>
                  <div className="pd-stars">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <FiStar key={s} className={s <= Math.round(product.rating) ? 'fill' : ''} />
                    ))}
                  </div>
                  <span>{product.reviews} reviews</span>
                </div>
              </div>
              {[
                { name: 'Karim A.', rating: 5, text: 'Absolute beast of a card. Runs everything at 4K max settings. Cooling is excellent.' },
                { name: 'Fatima K.', rating: 5, text: 'Genuine product, fast delivery from Startech. Highly recommended seller.' },
                { name: 'Rashid H.', rating: 4, text: 'Amazing performance but it is huge — make sure your case fits it!' },
              ].map((r, i) => (
                <div key={i} className="pd-review">
                  <div className="pd-review-head">
                    <strong>{r.name}</strong>
                    <div className="pd-stars sm">
                      {[1, 2, 3, 4, 5].map((s) => (
                        <FiStar key={s} className={s <= r.rating ? 'fill' : ''} />
                      ))}
                    </div>
                  </div>
                  <p>{r.text}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ===== Related ===== */}
      <div className="container pd-related">
        <h2 className="pd-related-title">Related Products</h2>
        <div className="pd-related-grid">
          {related.map((r) => (
            <Link key={r.id} to={`/product/${r.id}`} className="pd-rel-card">
              <div className="pd-rel-img"><img src={r.img} alt={r.name} /></div>
              <div className="pd-rel-body">
                <span className="pd-rel-name">{r.name}</span>
                <span className="pd-rel-price">৳{r.price.toLocaleString('en-IN')}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Product;
