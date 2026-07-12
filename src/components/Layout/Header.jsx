import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiShoppingCart, FiMenu, FiX, FiSun, FiMoon, FiUser,
  FiLogOut, FiHeart, FiPhone, FiMapPin, FiTruck, FiChevronDown, FiGrid, FiZap
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import { useAuth } from '../../context/AuthContext';
import './Header.css';

const NAV_CATEGORIES = [
  { id: 1, name: 'Desktop' },
  { id: 2, name: 'Laptop' },
  { id: 3, name: 'Component' },
  { id: 4, name: 'Monitor' },
  { id: 5, name: 'UPS' },
  { id: 6, name: 'Phone' },
  { id: 7, name: 'Tablet' },
  { id: 8, name: 'Camera' },
  { id: 9, name: 'Security' },
  { id: 10, name: 'Networking' },
  { id: 11, name: 'Accessories' },
  { id: 12, name: 'Gadget' },
];

const Header = () => {
  const { itemCount } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setSearchQuery('');
    }
  };

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    setMenuOpen(false);
    navigate('/');
  };

  return (
    <header className="hdr">
      {/* ============ TOP BAR ============ */}
      <div className="hdr-top">
        <div className="container hdr-top-inner">
          <div className="hdr-top-left">
            <a href="tel:16793"><FiPhone /> Hotline: <strong>16793</strong></a>
            <span className="hdr-top-divider" />
            <a href="mailto:support@startech.com.bd" className="hdr-top-hide-sm">
              support@startech.com.bd
            </a>
          </div>
          <div className="hdr-top-right">
            <Link to="/dashboard?tab=orders"><FiTruck /> Track Order</Link>
            <Link to="/category/1">Offers</Link>
            <Link to="/checkout">EMI</Link>
            <Link to="/" className="hdr-top-hide-sm"><FiMapPin /> Outlets</Link>
            <Link to="/" className="hdr-top-hide-sm">Become a Seller</Link>
            <button
              className="hdr-theme"
              onClick={toggleTheme}
              title={isDark ? 'Light Mode' : 'Dark Mode'}
            >
              {isDark ? <FiSun /> : <FiMoon />}
            </button>
          </div>
        </div>
      </div>

      {/* ============ MAIN BAR ============ */}
      <div className="hdr-main">
        <div className="container hdr-main-inner">
          {/* Mobile hamburger */}
          <button className="hdr-burger" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <FiX size={24} /> : <FiMenu size={24} />}
          </button>

          {/* Logo */}
          <Link to="/" className="hdr-logo">
            <span className="hdr-logo-mark"><FiZap /></span>
            <span className="hdr-logo-word">
              <span className="hdr-logo-star">Star</span><span className="hdr-logo-tech">Tech</span>
            </span>
          </Link>

          {/* Search */}
          <form className="hdr-search" onSubmit={handleSearch}>
            <FiSearch className="hdr-search-ic" size={18} />
            <input
              type="search"
              placeholder="Search for products, brands and more..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button type="button" className="hdr-search-clear" onClick={() => setSearchQuery('')}>
                <FiX />
              </button>
            )}
            <button type="submit" className="hdr-search-btn">
              <FiSearch size={17} /> <span>Search</span>
            </button>
          </form>

          {/* Actions */}
          <div className="hdr-actions">
            <Link to="/dashboard?tab=wishlist" className="hdr-act hdr-act-hide-sm">
              <FiHeart size={22} />
              <span className="hdr-act-label">Wishlist</span>
            </Link>

            <Link to="/comparison" className="hdr-act hdr-act-hide-sm">
              <BsArrowLeftRight size={22} />
              <span className="hdr-act-label">Compare</span>
            </Link>

            {/* Account */}
            <div className="hdr-account">
              {isAuthenticated ? (
                <button className="hdr-act" onClick={() => setUserMenu(!userMenu)}>
                  <FiUser size={22} />
                  <span className="hdr-act-label">Account <FiChevronDown size={12} /></span>
                </button>
              ) : (
                <Link to="/login" className="hdr-act">
                  <FiUser size={22} />
                  <span className="hdr-act-label">Login / Register</span>
                </Link>
              )}

              {isAuthenticated && userMenu && (
                <div className="hdr-dropdown">
                  <Link to="/dashboard" onClick={() => setUserMenu(false)}>Dashboard</Link>
                  <Link to="/dashboard?tab=orders" onClick={() => setUserMenu(false)}>My Orders</Link>
                  <Link to="/dashboard?tab=wishlist" onClick={() => setUserMenu(false)}>Wishlist</Link>
                  <Link to="/dashboard?tab=profile" onClick={() => setUserMenu(false)}>Profile</Link>
                  <hr />
                  <button onClick={handleLogout}><FiLogOut /> Logout</button>
                </div>
              )}
            </div>

            {/* Cart */}
            <Link to="/cart" className="hdr-cart">
              <div className="hdr-cart-ic">
                <FiShoppingCart size={22} />
                {itemCount > 0 && <span className="hdr-cart-badge">{itemCount}</span>}
              </div>
              <span className="hdr-act-label">Cart</span>
            </Link>
          </div>
        </div>
      </div>

      {/* ============ CATEGORY NAV ============ */}
      <nav className="hdr-nav">
        <div className="container hdr-nav-inner">
          <button className="hdr-nav-all">
            <FiGrid /> All Categories <FiChevronDown size={14} />
          </button>
          <div className="hdr-nav-links">
            {NAV_CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`}>{cat.name}</Link>
            ))}
          </div>
          <Link to="/pc-builder" className="hdr-nav-pcb">⚙️ PC Builder</Link>
        </div>
      </nav>

      {/* ============ MOBILE MENU ============ */}
      {menuOpen && (
        <>
          <div className="hdr-mobile-overlay" onClick={() => setMenuOpen(false)} />
          <nav className="hdr-mobile">
            <div className="hdr-mobile-head">
              <span>Menu</span>
              <button onClick={() => setMenuOpen(false)}><FiX size={22} /></button>
            </div>

            <Link to="/pc-builder" className="hdr-mobile-pcb" onClick={() => setMenuOpen(false)}>
              ⚙️ PC Builder
            </Link>

            <div className="hdr-mobile-section">Categories</div>
            {NAV_CATEGORIES.map((cat) => (
              <Link key={cat.id} to={`/category/${cat.id}`} onClick={() => setMenuOpen(false)}>
                {cat.name}
              </Link>
            ))}

            <div className="hdr-mobile-section">Account</div>
            {isAuthenticated ? (
              <>
                <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                <Link to="/dashboard?tab=orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                <Link to="/dashboard?tab=wishlist" onClick={() => setMenuOpen(false)}>Wishlist</Link>
                <button className="hdr-mobile-logout" onClick={handleLogout}>
                  <FiLogOut /> Logout
                </button>
              </>
            ) : (
              <div className="hdr-mobile-auth">
                <Link to="/login" className="btn btn-outline" onClick={() => setMenuOpen(false)}>Login</Link>
                <Link to="/register" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Sign Up</Link>
              </div>
            )}
          </nav>
        </>
      )}
    </header>
  );
};

export default Header;
