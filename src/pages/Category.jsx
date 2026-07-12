import React, { useState, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  FiChevronRight, FiHeart, FiShoppingCart, FiStar, FiGrid, FiList,
  FiX, FiSliders, FiCheck
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';
import './Category.css';

const img = (label, bg = '081621') =>
  `https://placehold.co/500x400/${bg}/ffffff/png?text=${encodeURIComponent(label)}&font=montserrat`;

const CATEGORY_NAMES = {
  1: 'Desktop', 2: 'Laptop', 3: 'Component', 4: 'Monitor', 5: 'UPS & Power',
  6: 'Phone', 7: 'Tablet', 8: 'Camera', 9: 'Security', 10: 'Networking',
  11: 'Accessories', 12: 'Gadget',
};

const ALL_PRODUCTS = [
  { id: 1, name: 'ASUS ROG Strix RTX 4090 24GB Graphics Card', brand: 'ASUS', img: img('RTX 4090', '0a5c2e'), price: 215000, oldPrice: 245000, rating: 4.8, reviews: 245, stock: true, specs: ['24GB GDDR6X', 'PCIe 4.0', 'Triple Fan'] },
  { id: 2, name: 'Intel Core i9-14900K Processor', brand: 'Intel', img: img('Core i9-14900K', '0f2742'), price: 68500, oldPrice: 74000, rating: 4.9, reviews: 189, stock: true, specs: ['24 Cores / 32 Threads', '6.0GHz Turbo', 'LGA 1700'] },
  { id: 3, name: 'Samsung 990 PRO 2TB NVMe M.2 SSD', brand: 'Samsung', img: img('990 PRO 2TB', '1a4a7a'), price: 24500, oldPrice: 28000, rating: 4.7, reviews: 523, stock: true, specs: ['7450MB/s Read', 'PCIe 4.0', '5 Yr Warranty'] },
  { id: 4, name: 'ASUS TUF Gaming Z790 Motherboard', brand: 'ASUS', img: img('TUF Z790', '111827'), price: 38000, oldPrice: 42000, rating: 4.6, reviews: 156, stock: true, specs: ['DDR5, WiFi 6', 'PCIe 5.0', 'LGA 1700'] },
  { id: 5, name: 'Corsair Vengeance 32GB DDR5 6000MHz', brand: 'Corsair', img: img('Vengeance 32GB', '4a1d96'), price: 14500, oldPrice: 16500, rating: 4.8, reviews: 412, stock: true, specs: ['2x16GB Kit', 'RGB', 'CL36'] },
  { id: 6, name: 'MSI Katana 17 RTX 4070 Gaming Laptop', brand: 'MSI', img: img('Katana 17', '0f2742'), price: 165000, oldPrice: 180000, rating: 4.5, reviews: 98, stock: true, specs: ['i7-13620H', '16GB / 1TB SSD', '17.3" 144Hz'] },
  { id: 7, name: 'Gigabyte RTX 4060 Ti 8GB OC', brand: 'Gigabyte', img: img('RTX 4060 Ti', '0a5c2e'), price: 52000, oldPrice: 56000, rating: 4.6, reviews: 234, stock: true, specs: ['8GB GDDR6', 'PCIe 4.0', 'Dual Fan'] },
  { id: 8, name: 'LG UltraGear 27" 240Hz Gaming Monitor', brand: 'LG', img: img('UltraGear 27', 'be123c'), price: 52000, oldPrice: 58000, rating: 4.7, reviews: 167, stock: false, specs: ['QHD 2560x1440', '1ms, G-Sync', 'IPS Panel'] },
  { id: 9, name: 'AMD Ryzen 7 7800X3D Processor', brand: 'AMD', img: img('Ryzen 7 7800X3D', 'a01406'), price: 45000, oldPrice: 50000, rating: 4.9, reviews: 312, stock: true, specs: ['8 Cores / 16 Threads', '5.0GHz', 'AM5'] },
  { id: 10, name: 'Logitech MX Master 3S Wireless Mouse', brand: 'Logitech', img: img('MX Master 3S', '374151'), price: 11500, oldPrice: 13000, rating: 4.8, reviews: 589, stock: true, specs: ['8K DPI', 'Quiet Click', 'USB-C'] },
  { id: 11, name: 'NZXT H7 Flow RGB Mid Tower Case', brand: 'NZXT', img: img('NZXT H7 Flow', '374151'), price: 13500, oldPrice: 15000, rating: 4.6, reviews: 143, stock: true, specs: ['Tempered Glass', 'ATX Support', '4x RGB Fans'] },
  { id: 12, name: 'Corsair RM1000x 1000W Gold PSU', brand: 'Corsair', img: img('RM1000x', '7c3aed'), price: 18500, oldPrice: 21000, rating: 4.9, reviews: 276, stock: true, specs: ['1000W', '80+ Gold', 'Fully Modular'] },
];

const BRANDS = ['ASUS', 'Intel', 'AMD', 'Samsung', 'Corsair', 'MSI', 'Gigabyte', 'LG', 'Logitech', 'NZXT'];
const PRICE_RANGES = [
  { label: 'Under ৳20,000', min: 0, max: 20000 },
  { label: '৳20,000 - ৳50,000', min: 20000, max: 50000 },
  { label: '৳50,000 - ৳100,000', min: 50000, max: 100000 },
  { label: 'Above ৳100,000', min: 100000, max: Infinity },
];

const Category = () => {
  const { id } = useParams();
  const { addItem } = useCart();
  const { success } = useNotification();

  const categoryName = CATEGORY_NAMES[id] || 'Products';

  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedPrices, setSelectedPrices] = useState([]);
  const [inStockOnly, setInStockOnly] = useState(false);
  const [minRating, setMinRating] = useState(0);
  const [sort, setSort] = useState('popular');
  const [view, setView] = useState('grid');
  const [filtersOpen, setFiltersOpen] = useState(false);

  const toggleBrand = (b) =>
    setSelectedBrands((prev) => prev.includes(b) ? prev.filter((x) => x !== b) : [...prev, b]);

  const togglePrice = (label) =>
    setSelectedPrices((prev) => prev.includes(label) ? prev.filter((x) => x !== label) : [...prev, label]);

  const clearAll = () => {
    setSelectedBrands([]);
    setSelectedPrices([]);
    setInStockOnly(false);
    setMinRating(0);
  };

  const filtered = useMemo(() => {
    let list = [...ALL_PRODUCTS];
    if (selectedBrands.length) list = list.filter((p) => selectedBrands.includes(p.brand));
    if (inStockOnly) list = list.filter((p) => p.stock);
    if (minRating) list = list.filter((p) => p.rating >= minRating);
    if (selectedPrices.length) {
      const ranges = PRICE_RANGES.filter((r) => selectedPrices.includes(r.label));
      list = list.filter((p) => ranges.some((r) => p.price >= r.min && p.price < r.max));
    }
    switch (sort) {
      case 'price_low': list.sort((a, b) => a.price - b.price); break;
      case 'price_high': list.sort((a, b) => b.price - a.price); break;
      case 'rating': list.sort((a, b) => b.rating - a.rating); break;
      case 'newest': list.sort((a, b) => b.id - a.id); break;
      default: list.sort((a, b) => b.reviews - a.reviews);
    }
    return list;
  }, [selectedBrands, selectedPrices, inStockOnly, minRating, sort]);

  const activeFilterCount = selectedBrands.length + selectedPrices.length + (inStockOnly ? 1 : 0) + (minRating ? 1 : 0);

  const handleAdd = (p) => {
    addItem({ id: p.id, name: p.name, selling_price: p.price, featured_image: p.img }, 1);
    success('Added to cart');
  };

  const FilterPanel = (
    <>
      <div className="cat-filter-head">
        <span><FiSliders /> Filters</span>
        {activeFilterCount > 0 && <button onClick={clearAll}>Clear All</button>}
      </div>

      <div className="cat-filter-group">
        <h4>Availability</h4>
        <label className="cat-check">
          <input type="checkbox" checked={inStockOnly} onChange={(e) => setInStockOnly(e.target.checked)} />
          <span className="cat-checkbox"><FiCheck /></span>
          In Stock Only
        </label>
      </div>

      <div className="cat-filter-group">
        <h4>Brand</h4>
        {BRANDS.map((b) => (
          <label key={b} className="cat-check">
            <input type="checkbox" checked={selectedBrands.includes(b)} onChange={() => toggleBrand(b)} />
            <span className="cat-checkbox"><FiCheck /></span>
            {b}
          </label>
        ))}
      </div>

      <div className="cat-filter-group">
        <h4>Price Range</h4>
        {PRICE_RANGES.map((r) => (
          <label key={r.label} className="cat-check">
            <input type="checkbox" checked={selectedPrices.includes(r.label)} onChange={() => togglePrice(r.label)} />
            <span className="cat-checkbox"><FiCheck /></span>
            {r.label}
          </label>
        ))}
      </div>

      <div className="cat-filter-group">
        <h4>Minimum Rating</h4>
        {[4, 3, 2].map((r) => (
          <label key={r} className="cat-check">
            <input type="radio" name="rating" checked={minRating === r} onChange={() => setMinRating(r)} />
            <span className="cat-radio" />
            <span className="cat-rating-stars">
              {[1, 2, 3, 4, 5].map((s) => <FiStar key={s} className={s <= r ? 'fill' : ''} />)}
            </span>
            <span className="cat-rating-up">& up</span>
          </label>
        ))}
        {minRating > 0 && <button className="cat-rating-reset" onClick={() => setMinRating(0)}>Reset rating</button>}
      </div>
    </>
  );

  return (
    <div className="cat">
      {/* Breadcrumb */}
      <div className="cat-breadcrumb">
        <div className="container">
          <Link to="/">Home</Link> <FiChevronRight />
          <span>{categoryName}</span>
        </div>
      </div>

      <div className="container cat-header">
        <h1>{categoryName}</h1>
        <p>{filtered.length} products found</p>
      </div>

      <div className="container cat-layout">
        {/* Desktop sidebar */}
        <aside className="cat-sidebar">{FilterPanel}</aside>

        {/* Main */}
        <div className="cat-main">
          {/* Toolbar */}
          <div className="cat-toolbar">
            <button className="cat-mobile-filter-btn" onClick={() => setFiltersOpen(true)}>
              <FiSliders /> Filters {activeFilterCount > 0 && <span>{activeFilterCount}</span>}
            </button>

            {/* Active chips OR result count */}
            {activeFilterCount > 0 ? (
              <div className="cat-chips">
                {selectedBrands.map((b) => (
                  <span key={b} className="cat-chip">{b} <button onClick={() => toggleBrand(b)}><FiX /></button></span>
                ))}
                {selectedPrices.map((p) => (
                  <span key={p} className="cat-chip">{p} <button onClick={() => togglePrice(p)}><FiX /></button></span>
                ))}
                {inStockOnly && <span className="cat-chip">In Stock <button onClick={() => setInStockOnly(false)}><FiX /></button></span>}
                {minRating > 0 && <span className="cat-chip">{minRating}★ & up <button onClick={() => setMinRating(0)}><FiX /></button></span>}
              </div>
            ) : (
              <span className="cat-toolbar-count">
                Showing <strong>{filtered.length}</strong> of {ALL_PRODUCTS.length} products
              </span>
            )}

            <div className="cat-toolbar-right">
              <span className="cat-sort-label">Sort by</span>
              <select value={sort} onChange={(e) => setSort(e.target.value)} className="cat-sort">
                <option value="popular">Most Popular</option>
                <option value="newest">Newest First</option>
                <option value="price_low">Price: Low to High</option>
                <option value="price_high">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
              <div className="cat-view-toggle">
                <button className={view === 'grid' ? 'active' : ''} onClick={() => setView('grid')}><FiGrid /></button>
                <button className={view === 'list' ? 'active' : ''} onClick={() => setView('list')}><FiList /></button>
              </div>
            </div>
          </div>

          {/* Products */}
          {filtered.length === 0 ? (
            <div className="cat-empty">
              <FiSliders size={48} />
              <h3>No products match your filters</h3>
              <button className="btn btn-primary" onClick={clearAll}>Clear Filters</button>
            </div>
          ) : (
            <div className={`cat-products ${view}`}>
              {filtered.map((p) => {
                const off = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
                return (
                  <div key={p.id} className="cat-card">
                    {off > 0 && <span className="cat-card-disc">-{off}%</span>}
                    {!p.stock && <span className="cat-card-oos">Out of Stock</span>}
                    <div className="cat-card-actions">
                      <button title="Wishlist"><FiHeart /></button>
                      <button title="Compare"><BsArrowLeftRight /></button>
                    </div>
                    <Link to={`/product/${p.id}`} className="cat-card-img">
                      <img src={p.img} alt={p.name} />
                    </Link>
                    <div className="cat-card-body">
                      <span className="cat-card-brand">{p.brand}</span>
                      <Link to={`/product/${p.id}`} className="cat-card-name">{p.name}</Link>
                      <ul className="cat-card-specs">
                        {p.specs.map((s, i) => <li key={i}>{s}</li>)}
                      </ul>
                      <div className="cat-card-rating">
                        {[1, 2, 3, 4, 5].map((s) => <FiStar key={s} className={s <= Math.round(p.rating) ? 'fill' : ''} />)}
                        <span>({p.reviews})</span>
                      </div>
                      <div className="cat-card-price">
                        <span className="cat-price">৳{p.price.toLocaleString('en-IN')}</span>
                        {p.oldPrice > p.price && <span className="cat-old">৳{p.oldPrice.toLocaleString('en-IN')}</span>}
                      </div>
                      <button className="cat-card-cart" disabled={!p.stock} onClick={() => handleAdd(p)}>
                        <FiShoppingCart /> {p.stock ? 'Add to Cart' : 'Unavailable'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Mobile filter drawer */}
      {filtersOpen && (
        <>
          <div className="cat-drawer-overlay" onClick={() => setFiltersOpen(false)} />
          <div className="cat-drawer">
            <div className="cat-drawer-head">
              <span>Filters</span>
              <button onClick={() => setFiltersOpen(false)}><FiX size={22} /></button>
            </div>
            <div className="cat-drawer-body">{FilterPanel}</div>
            <div className="cat-drawer-foot">
              <button className="btn btn-primary" onClick={() => setFiltersOpen(false)}>
                Show {filtered.length} Results
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Category;
