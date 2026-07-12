import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FiTruck, FiCreditCard, FiHeadphones, FiRefreshCw,
  FiHeart, FiBarChart2, FiShoppingCart, FiChevronRight
} from 'react-icons/fi';
import {
  BsPcDisplay, BsLaptop, BsCpu, BsDisplay, BsBatteryCharging,
  BsPhone, BsTablet, BsCamera, BsShieldLock, BsWifi,
  BsHeadphones, BsSmartwatch, BsMotherboard, BsGpuCard,
  BsMemory, BsDeviceHdd, BsKeyboard, BsMouse, BsSpeaker
} from 'react-icons/bs';
import './Home.css';

const Home = () => {
  const [activeTab, setActiveTab] = useState('featured');

  // Left hero category sidebar (StarTech signature)
  const sidebarCategories = [
    { id: 1, name: 'Desktop', icon: BsPcDisplay },
    { id: 2, name: 'Laptop', icon: BsLaptop },
    { id: 3, name: 'Component', icon: BsCpu },
    { id: 4, name: 'Monitor', icon: BsDisplay },
    { id: 5, name: 'UPS & Power', icon: BsBatteryCharging },
    { id: 6, name: 'Phone', icon: BsPhone },
    { id: 7, name: 'Tablet', icon: BsTablet },
    { id: 8, name: 'Camera', icon: BsCamera },
    { id: 9, name: 'Security', icon: BsShieldLock },
    { id: 10, name: 'Networking', icon: BsWifi },
    { id: 11, name: 'Accessories', icon: BsHeadphones },
    { id: 12, name: 'Gadget', icon: BsSmartwatch },
  ];

  // Service feature strip
  const services = [
    { icon: FiTruck, title: 'Fast Delivery', subtitle: 'All over Bangladesh' },
    { icon: FiCreditCard, title: 'Easy Payment', subtitle: 'bKash, Nagad, Card' },
    { icon: FiRefreshCw, title: '7 Days Return', subtitle: 'Easy exchange policy' },
    { icon: FiHeadphones, title: '24/7 Support', subtitle: 'Dedicated helpline' },
  ];

  // Featured category icons row
  const featuredCategories = [
    { id: 1, name: 'Desktop', icon: BsPcDisplay },
    { id: 2, name: 'Laptop', icon: BsLaptop },
    { id: 3, name: 'Processor', icon: BsCpu },
    { id: 4, name: 'Graphics Card', icon: BsGpuCard },
    { id: 5, name: 'Motherboard', icon: BsMotherboard },
    { id: 6, name: 'RAM', icon: BsMemory },
    { id: 7, name: 'Storage', icon: BsDeviceHdd },
    { id: 8, name: 'Monitor', icon: BsDisplay },
    { id: 9, name: 'Keyboard', icon: BsKeyboard },
    { id: 10, name: 'Mouse', icon: BsMouse },
    { id: 11, name: 'Headphone', icon: BsHeadphones },
    { id: 12, name: 'Speaker', icon: BsSpeaker },
  ];

  // Product datasets per tab
  const productSets = {
    featured: [
      { id: 1, name: 'ASUS ROG Strix RTX 4090 24GB Graphics Card', image: '🎮', specs: ['24GB GDDR6X', 'PCIe 4.0', 'Triple Fan'], price: 215000, oldPrice: 245000, status: 'In Stock' },
      { id: 2, name: 'Intel Core i9-14900K Processor', image: '🔲', specs: ['24 Cores, 32 Threads', '6.0GHz Turbo', 'LGA 1700'], price: 68500, oldPrice: 74000, status: 'In Stock' },
      { id: 3, name: 'Samsung 990 PRO 2TB NVMe M.2 SSD', image: '💾', specs: ['7450MB/s Read', 'PCIe 4.0', '5 Yr Warranty'], price: 24500, oldPrice: 28000, status: 'In Stock' },
      { id: 4, name: 'ASUS TUF Gaming Z790 Motherboard', image: '🔌', specs: ['DDR5, WiFi 6', 'PCIe 5.0', 'LGA 1700'], price: 38000, oldPrice: 42000, status: 'In Stock' },
      { id: 5, name: 'Corsair Vengeance 32GB DDR5 6000MHz', image: '💿', specs: ['2x16GB Kit', 'RGB', 'CL36'], price: 14500, oldPrice: 16500, status: 'In Stock' },
      { id: 6, name: 'LG UltraGear 27" 240Hz Gaming Monitor', image: '📺', specs: ['QHD 2560x1440', '1ms, G-Sync', 'IPS Panel'], price: 52000, oldPrice: 58000, status: 'Pre Order' },
    ],
    latest: [
      { id: 7, name: 'MSI Katana 17 RTX 4070 Gaming Laptop', image: '💻', specs: ['i7-13620H', '16GB / 1TB SSD', '17.3" 144Hz'], price: 165000, oldPrice: 180000, status: 'In Stock' },
      { id: 8, name: 'Logitech MX Master 3S Wireless Mouse', image: '🖱️', specs: ['8K DPI', 'Quiet Click', 'USB-C'], price: 11500, oldPrice: 13000, status: 'In Stock' },
      { id: 9, name: 'Keychron K8 Pro Mechanical Keyboard', image: '⌨️', specs: ['Hot-swap', 'RGB Backlit', 'Bluetooth'], price: 9800, oldPrice: 11000, status: 'In Stock' },
      { id: 10, name: 'Apple iPhone 15 Pro Max 256GB', image: '📱', specs: ['A17 Pro Chip', '6.7" ProMotion', 'Titanium'], price: 185000, oldPrice: 195000, status: 'In Stock' },
      { id: 11, name: 'Sony WH-1000XM5 Wireless Headphone', image: '🎧', specs: ['Noise Cancel', '30h Battery', 'Hi-Res'], price: 38500, oldPrice: 42000, status: 'In Stock' },
      { id: 12, name: 'Samsung Galaxy Tab S9 128GB', image: '📲', specs: ['Snapdragon 8 Gen 2', '11" AMOLED', 'S Pen'], price: 95000, oldPrice: 105000, status: 'Pre Order' },
    ],
    bestselling: [
      { id: 13, name: 'AMD Ryzen 7 7800X3D Processor', image: '🔲', specs: ['8 Cores, 16 Threads', '5.0GHz', 'AM5'], price: 45000, oldPrice: 50000, status: 'In Stock' },
      { id: 14, name: 'Gigabyte RTX 4060 Ti 8GB OC', image: '🎮', specs: ['8GB GDDR6', 'PCIe 4.0', 'Dual Fan'], price: 52000, oldPrice: 56000, status: 'In Stock' },
      { id: 15, name: 'Western Digital 2TB Blue HDD', image: '💿', specs: ['7200 RPM', 'SATA III', '256MB Cache'], price: 6500, oldPrice: 7500, status: 'In Stock' },
      { id: 16, name: 'Cooler Master MWE 750W Gold PSU', image: '🔋', specs: ['80+ Gold', 'Fully Modular', '750 Watt'], price: 11000, oldPrice: 12500, status: 'In Stock' },
      { id: 17, name: 'Razer DeathAdder V3 Gaming Mouse', image: '🖱️', specs: ['30K DPI', '90h Battery', 'Lightweight'], price: 8500, oldPrice: 9500, status: 'In Stock' },
      { id: 18, name: 'NZXT H7 Flow RGB Mid Tower Case', image: '🗄️', specs: ['Tempered Glass', 'ATX Support', '4x RGB Fans'], price: 13500, oldPrice: 15000, status: 'In Stock' },
    ],
  };

  // Brand showcase
  const brands = ['ASUS', 'Intel', 'AMD', 'MSI', 'Gigabyte', 'Samsung', 'Corsair', 'Logitech', 'Razer', 'Apple', 'Sony', 'LG'];

  const formatPrice = (n) => '৳' + n.toLocaleString('en-IN');

  return (
    <div className="st-home">
      {/* ============ HERO: sidebar + slider + side banners ============ */}
      <section className="st-hero">
        <div className="container st-hero-grid">
          {/* Left category sidebar */}
          <aside className="st-cat-sidebar">
            <div className="st-cat-sidebar-head">
              <span className="st-cat-head-bars"><span /><span /><span /></span>
              All Categories
            </div>
            <ul>
              {sidebarCategories.map((cat) => {
                const Icon = cat.icon;
                return (
                  <li key={cat.id}>
                    <Link to={`/category/${cat.id}`}>
                      <span className="st-cat-ic"><Icon /></span>
                      <span className="st-cat-name">{cat.name}</span>
                      <FiChevronRight className="st-cat-arrow" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* Center slider */}
          <div className="st-slider">
            <div className="st-slide">
              <div className="st-slide-text">
                <span className="st-slide-eyebrow">GAMING SEASON SALE</span>
                <h2>Build Your Dream<br />Gaming PC</h2>
                <p>Up to 40% off on RTX 40 Series & Latest Processors</p>
                <Link to="/category/1" className="st-slide-btn">Shop Now</Link>
              </div>
              <div className="st-slide-art">🎮</div>
            </div>
          </div>

          {/* Right promo banners */}
          <div className="st-side-banners">
            <Link to="/category/2" className="st-side-banner sb-1">
              <div>
                <span className="sb-tag">LAPTOP OFFER</span>
                <h4>Gaming Laptops</h4>
                <p>From ৳65,000</p>
              </div>
              <span className="sb-art">💻</span>
            </Link>
            <Link to="/category/6" className="st-side-banner sb-2">
              <div>
                <span className="sb-tag">SMARTPHONE</span>
                <h4>Latest Phones</h4>
                <p>EMI Available</p>
              </div>
              <span className="sb-art">📱</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ============ SERVICE STRIP ============ */}
      <section className="st-services">
        <div className="container st-services-grid">
          {services.map((s, i) => {
            const Icon = s.icon;
            return (
              <div key={i} className="st-service">
                <div className="st-service-ic"><Icon size={26} /></div>
                <div>
                  <strong>{s.title}</strong>
                  <span>{s.subtitle}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ============ FEATURED CATEGORY ICONS ============ */}
      <section className="st-section">
        <div className="container">
          <div className="st-section-head">
            <h2>Featured Categories</h2>
            <Link to="/category/1" className="st-view-all">View All <FiChevronRight /></Link>
          </div>
          <div className="st-feat-cat-grid">
            {featuredCategories.map((cat) => {
              const Icon = cat.icon;
              return (
                <Link key={cat.id} to={`/category/${cat.id}`} className="st-feat-cat">
                  <div className="st-feat-cat-ic"><Icon /></div>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PRODUCT TABS ============ */}
      <section className="st-section st-products-section">
        <div className="container">
          <div className="st-tabs">
            <button
              className={activeTab === 'featured' ? 'active' : ''}
              onClick={() => setActiveTab('featured')}
            >Featured</button>
            <button
              className={activeTab === 'latest' ? 'active' : ''}
              onClick={() => setActiveTab('latest')}
            >Latest Products</button>
            <button
              className={activeTab === 'bestselling' ? 'active' : ''}
              onClick={() => setActiveTab('bestselling')}
            >Best Selling</button>
          </div>

          <div className="st-product-grid">
            {productSets[activeTab].map((p) => {
              const off = Math.round(((p.oldPrice - p.price) / p.oldPrice) * 100);
              return (
                <div key={p.id} className="st-product-card">
                  {off > 0 && <span className="st-discount">-{off}%</span>}
                  <div className="st-product-actions">
                    <button title="Add to Wishlist"><FiHeart /></button>
                    <button title="Compare"><FiBarChart2 /></button>
                  </div>
                  <Link to={`/product/${p.id}`} className="st-product-img">{p.image}</Link>
                  <div className="st-product-body">
                    <Link to={`/product/${p.id}`} className="st-product-name">{p.name}</Link>
                    <ul className="st-product-specs">
                      {p.specs.map((spec, i) => <li key={i}>{spec}</li>)}
                    </ul>
                    <div className="st-product-price-row">
                      <span className="st-price">{formatPrice(p.price)}</span>
                      {p.oldPrice > p.price && <span className="st-old-price">{formatPrice(p.oldPrice)}</span>}
                    </div>
                    <span className={`st-stock ${p.status === 'In Stock' ? 'in' : 'pre'}`}>{p.status}</span>
                    <div className="st-product-buttons">
                      <button className="st-buy-now">Buy Now</button>
                      <button className="st-add-cart" title="Add to Cart"><FiShoppingCart /></button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ PROMO STRIP ============ */}
      <section className="st-promo-strip">
        <div className="container st-promo-grid">
          <Link to="/category/3" className="st-promo-card p1">
            <div>
              <span>COMPONENTS</span>
              <h3>PC Components</h3>
              <p>Build with the best parts</p>
            </div>
            <span className="st-promo-art">⚙️</span>
          </Link>
          <Link to="/category/4" className="st-promo-card p2">
            <div>
              <span>DISPLAY</span>
              <h3>Gaming Monitors</h3>
              <p>144Hz & 240Hz available</p>
            </div>
            <span className="st-promo-art">🖥️</span>
          </Link>
          <Link to="/category/11" className="st-promo-card p3">
            <div>
              <span>ACCESSORIES</span>
              <h3>Gear & Peripherals</h3>
              <p>Keyboards, mice & more</p>
            </div>
            <span className="st-promo-art">🎧</span>
          </Link>
        </div>
      </section>

      {/* ============ BRANDS ============ */}
      <section className="st-section st-brands-section">
        <div className="container">
          <div className="st-section-head">
            <h2>Shop by Brand</h2>
          </div>
          <div className="st-brand-grid">
            {brands.map((brand, i) => (
              <Link key={i} to="/category/1" className="st-brand">{brand}</Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
