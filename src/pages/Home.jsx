import React from 'react';
import { Link } from 'react-router-dom';
import {
  FiTruck, FiCreditCard, FiHeadphones, FiRefreshCw,
  FiChevronRight
} from 'react-icons/fi';
import {
  BsPcDisplay, BsLaptop, BsCpu, BsDisplay, BsBatteryCharging,
  BsPhone, BsTablet, BsCamera, BsShieldLock, BsWifi,
  BsHeadphones, BsSmartwatch, BsMotherboard, BsGpuCard,
  BsMemory, BsDeviceHdd, BsKeyboard, BsMouse, BsSpeaker
} from 'react-icons/bs';
import ProductSection from '../components/Product/ProductSection';
import SEO from '../components/Common/SEO';
import './Home.css';

const Home = () => {
  // Left hero category sidebar (StarTech signature)
  const sidebarCategories = [
    { id: 'desktop', name: 'Desktop', icon: BsPcDisplay },
    { id: 'laptop', name: 'Laptop', icon: BsLaptop },
    { id: 'component', name: 'Component', icon: BsCpu },
    { id: 'monitor', name: 'Monitor', icon: BsDisplay },
    { id: 'ups', name: 'UPS & Power', icon: BsBatteryCharging },
    { id: 'phone', name: 'Phone', icon: BsPhone },
    { id: 'tablet', name: 'Tablet', icon: BsTablet },
    { id: 'camera', name: 'Camera', icon: BsCamera },
    { id: 'security', name: 'Security', icon: BsShieldLock },
    { id: 'networking', name: 'Networking', icon: BsWifi },
    { id: 'accessories', name: 'Accessories', icon: BsHeadphones },
    { id: 'gadget', name: 'Gadget', icon: BsSmartwatch },
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
    { slug: 'desktop', name: 'Desktop', icon: BsPcDisplay },
    { slug: 'laptop', name: 'Laptop', icon: BsLaptop },
    { slug: 'component', name: 'Processor', icon: BsCpu },
    { slug: 'component', name: 'Graphics Card', icon: BsGpuCard },
    { slug: 'component', name: 'Motherboard', icon: BsMotherboard },
    { slug: 'component', name: 'RAM', icon: BsMemory },
    { slug: 'component', name: 'Storage', icon: BsDeviceHdd },
    { slug: 'monitor', name: 'Monitor', icon: BsDisplay },
    { slug: 'accessories', name: 'Keyboard', icon: BsKeyboard },
    { slug: 'accessories', name: 'Mouse', icon: BsMouse },
    { slug: 'accessories', name: 'Headphone', icon: BsHeadphones },
    { slug: 'accessories', name: 'Speaker', icon: BsSpeaker },
  ];

  // Brand showcase
  const brands = [
    { name: 'ASUS', slug: 'asus' },
    { name: 'Intel', slug: 'intel' },
    { name: 'AMD', slug: 'amd' },
    { name: 'MSI', slug: 'msi' },
    { name: 'Gigabyte', slug: 'gigabyte' },
    { name: 'Samsung', slug: 'samsung' },
    { name: 'Corsair', slug: 'corsair' },
    { name: 'Logitech', slug: 'logitech' },
    { name: 'NZXT', slug: 'nzxt' },
    { name: 'LG', slug: 'lg' }
  ];

  return (
    <div className="st-home">
      <SEO
        title="StarTech Clone — Leading Computer, Laptop & Tech Store in Bangladesh"
        description="Buy latest Gaming Laptops, Desktop PCs, Processors, Graphics Cards, Monitors, SSDs, and Accessories at best prices in Bangladesh with fast nationwide delivery."
        keywords="startech, computer shop bd, laptop price in bangladesh, ryzen processor, rtx graphics card, gaming pc"
      />
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
                <Link to="/category/component" className="st-slide-btn">Shop Now</Link>
              </div>
              <div className="st-slide-art">🎮</div>
            </div>
          </div>

          {/* Right promo banners */}
          <div className="st-side-banners">
            <Link to="/category/laptop" className="st-side-banner sb-1">
              <div>
                <span className="sb-tag">LAPTOP OFFER</span>
                <h4>Gaming Laptops</h4>
                <p>From ৳65,000</p>
              </div>
              <span className="sb-art">💻</span>
            </Link>
            <Link to="/category/phone" className="st-side-banner sb-2">
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
            <Link to="/category/component" className="st-view-all">View All <FiChevronRight /></Link>
          </div>
          <div className="st-feat-cat-grid">
            {featuredCategories.map((cat, idx) => {
              const Icon = cat.icon;
              return (
                <Link key={idx} to={`/category/${cat.slug}`} className="st-feat-cat">
                  <div className="st-feat-cat-ic"><Icon /></div>
                  <span>{cat.name}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ============ DYNAMIC PRODUCT SECTIONS ============ */}
      <div className="container">
        <ProductSection
          title="Featured Products"
          type="featured"
          limit={4}
          viewAllLink="/category/component"
        />

        <ProductSection
          title="Latest Arrivals"
          type="latest"
          limit={4}
          viewAllLink="/category/laptop"
        />

        <ProductSection
          title="Best Selling Tech Gear"
          type="bestsellers"
          limit={4}
          viewAllLink="/category/component"
        />
      </div>

      {/* ============ PROMO STRIP ============ */}
      <section className="st-promo-strip">
        <div className="container st-promo-grid">
          <Link to="/category/component" className="st-promo-card p1">
            <div>
              <span>COMPONENTS</span>
              <h3>PC Components</h3>
              <p>Build with the best parts</p>
            </div>
            <span className="st-promo-art">⚙️</span>
          </Link>
          <Link to="/category/monitor" className="st-promo-card p2">
            <div>
              <span>DISPLAY</span>
              <h3>Gaming Monitors</h3>
              <p>144Hz & 240Hz available</p>
            </div>
            <span className="st-promo-art">🖥️</span>
          </Link>
          <Link to="/category/accessories" className="st-promo-card p3">
            <div>
              <span>ACCESSORIES</span>
              <h3>Gear & Peripherals</h3>
              <p>Keyboards, mice & more</p>
            </div>
            <span className="st-promo-art">🎧</span>
          </Link>
        </div>
      </section>

      {/* ============ BRANDS SHOWCASE ============ */}
      <section className="st-section st-brands-section">
        <div className="container">
          <div className="st-section-head">
            <h2>Shop by Brand</h2>
            <Link to="/brands" className="st-view-all">View All Brands <FiChevronRight /></Link>
          </div>
          <div className="st-brand-grid">
            {brands.map((b) => (
              <Link key={b.slug} to={`/brand/${b.slug}`} className="st-brand">{b.name}</Link>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
};

export default Home;
