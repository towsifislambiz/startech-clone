import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  FiSearch, FiShoppingCart, FiMenu, FiX, FiSun, FiMoon, FiUser,
  FiLogOut, FiHeart, FiPhone, FiMapPin, FiTruck, FiChevronDown, FiGrid, FiZap,
  FiShield, FiBriefcase, FiBox, FiShoppingBag, FiUsers, FiBarChart2
} from 'react-icons/fi';
import { BsArrowLeftRight } from 'react-icons/bs';
import { useCart } from '../../context/CartContext';
import { useTheme } from '../../context/ThemeContext';
import useAuthState from '../../hooks/useAuthState';
import useWishlist from '../../hooks/useWishlist';
import useCompare from '../../hooks/useCompare';
import SearchBar from '../Search/SearchBar';
import MobileSearchModal from '../Search/MobileSearchModal';
import MiniCartDrawer from '../Cart/MiniCartDrawer';
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
  const { itemCount, openDrawer } = useCart();
  const { isDark, toggleTheme } = useTheme();
  const { user, isAuthenticated, role, logout } = useAuthState();
  const { wishlistCount } = useWishlist();
  const { compareCount } = useCompare();
  const navigate = useNavigate();

  const [menuOpen, setMenuOpen] = useState(false);
  const [userMenu, setUserMenu] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

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
            {isAuthenticated && role === 'Customer' && (
              <Link to="/dashboard?tab=orders"><FiTruck /> Track Order</Link>
            )}
            <Link to="/category/component">Offers</Link>
            <Link to="/checkout">EMI</Link>
            <Link to="/" className="hdr-top-hide-sm"><FiMapPin /> Outlets</Link>

            {/* Role quick link in Top Bar */}
            {isAuthenticated && role === 'Admin' && (
              <Link to="/admin-dashboard" style={{ color: '#D51E0B', fontWeight: 'bold' }}>
                <FiShield /> Admin Panel
              </Link>
            )}
            {isAuthenticated && role === 'Seller' && (
              <Link to="/seller-dashboard" style={{ color: '#3b82f6', fontWeight: 'bold' }}>
                <FiBriefcase /> Seller Panel
              </Link>
            )}
            {!isAuthenticated && (
              <Link to="/login" className="hdr-top-hide-sm">Become a Seller</Link>
            )}

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

          {/* Global Search Bar with Live Autocomplete */}
          <SearchBar className="hdr-search-desktop" />

          {/* Mobile Search Trigger Icon */}
          <button
            className="hdr-mobile-search-btn"
            onClick={() => setMobileSearchOpen(true)}
            title="Open Search"
          >
            <FiSearch size={22} />
          </button>

          {/* Actions */}
          <div className="hdr-actions">
            {/* Customer Wishlist & Compare links with Live Counter Badges */}
            {(!isAuthenticated || role === 'Customer') && (
              <>
                <Link to="/wishlist" className="hdr-act hdr-act-hide-sm" style={{ position: 'relative' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <FiHeart size={22} />
                    {wishlistCount > 0 && (
                      <span className="hdr-cart-badge">{wishlistCount}</span>
                    )}
                  </div>
                  <span className="hdr-act-label">Wishlist</span>
                </Link>

                <Link to="/comparison" className="hdr-act hdr-act-hide-sm" style={{ position: 'relative' }}>
                  <div style={{ position: 'relative', display: 'inline-block' }}>
                    <BsArrowLeftRight size={22} />
                    {compareCount > 0 && (
                      <span className="hdr-cart-badge" style={{ backgroundColor: '#3b82f6' }}>{compareCount}</span>
                    )}
                  </div>
                  <span className="hdr-act-label">Compare</span>
                </Link>
              </>
            )}

            {/* Account Dropdown */}
            <div className="hdr-account" style={{ position: 'relative' }}>
              {isAuthenticated ? (
                <button
                  className="hdr-act"
                  onClick={() => setUserMenu(!userMenu)}
                  style={{ background: 'none', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', backgroundColor: role === 'Admin' ? '#D51E0B' : role === 'Seller' ? '#3b82f6' : '#4b5563', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px', fontWeight: 'bold' }}>
                    {role === 'Admin' ? 'A' : role === 'Seller' ? 'S' : (user?.displayName?.[0] || 'C')}
                  </div>
                  <span className="hdr-act-label" style={{ display: 'flex', alignItems: 'center', gap: '2px' }}>
                    {role} <FiChevronDown size={12} />
                  </span>
                </button>
              ) : (
                <Link to="/login" className="hdr-act">
                  <FiUser size={22} />
                  <span className="hdr-act-label">Login / Register</span>
                </Link>
              )}

              {/* Dynamic User Dropdown Menu based on Role */}
              {isAuthenticated && userMenu && (
                <div
                  className="hdr-dropdown"
                  style={{
                    position: 'absolute',
                    top: '100%',
                    right: 0,
                    backgroundColor: 'var(--bg-secondary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: '8px',
                    boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
                    padding: '8px 0',
                    minWidth: '200px',
                    zIndex: 1000
                  }}
                >
                  <div style={{ padding: '8px 16px', borderBottom: '1px solid var(--border-color)', marginBottom: '4px' }}>
                    <div style={{ fontWeight: '700', fontSize: '13px', color: 'var(--text-primary)' }}>
                      {user?.displayName || user?.email}
                    </div>
                    <div style={{ fontSize: '11px', color: role === 'Admin' ? '#D51E0B' : role === 'Seller' ? '#3b82f6' : 'var(--text-secondary)', fontWeight: '600', textTransform: 'capitalize' }}>
                      Role: {role}
                    </div>
                  </div>

                  {/* Customer Options */}
                  {role === 'Customer' && (
                    <>
                      <Link to="/dashboard" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiUser /> Dashboard
                      </Link>
                      <Link to="/dashboard?tab=orders" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiShoppingBag /> My Orders
                      </Link>
                      <Link to="/wishlist" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiHeart /> Wishlist ({wishlistCount})
                      </Link>
                      <Link to="/dashboard?tab=profile" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiUser /> Profile Settings
                      </Link>
                    </>
                  )}

                  {/* Seller Options */}
                  {role === 'Seller' && (
                    <>
                      <Link to="/seller-dashboard" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiBriefcase /> Seller Dashboard
                      </Link>
                      <Link to="/seller/products" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiBox /> Products
                      </Link>
                      <Link to="/seller/orders" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiShoppingBag /> Orders
                      </Link>
                      <Link to="/seller/analytics" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiBarChart2 /> Analytics
                      </Link>
                    </>
                  )}

                  {/* Admin Options */}
                  {role === 'Admin' && (
                    <>
                      <Link to="/admin-dashboard" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: '#D51E0B', fontWeight: 'bold', textDecoration: 'none' }}>
                        <FiShield /> Admin Dashboard
                      </Link>
                      <Link to="/admin/users" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiUsers /> Users
                      </Link>
                      <Link to="/admin/products" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiBox /> Products
                      </Link>
                      <Link to="/admin/orders" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiShoppingBag /> Orders
                      </Link>
                      <Link to="/admin/analytics" onClick={() => setUserMenu(false)} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', color: 'var(--text-primary)', textDecoration: 'none' }}>
                        <FiBarChart2 /> Analytics
                      </Link>
                    </>
                  )}

                  <hr style={{ border: 'none', borderTop: '1px solid var(--border-color)', margin: '4px 0' }} />

                  <button
                    onClick={handleLogout}
                    style={{
                      width: '100%',
                      padding: '8px 16px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      color: '#ef4444',
                      background: 'none',
                      border: 'none',
                      fontWeight: '600',
                      cursor: 'pointer',
                      textAlign: 'left'
                    }}
                  >
                    <FiLogOut /> Logout
                  </button>
                </div>
              )}
            </div>

            {/* Cart Trigger */}
            <button type="button" onClick={openDrawer} className="hdr-cart" style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
              <div className="hdr-cart-ic">
                <FiShoppingCart size={22} />
                {itemCount > 0 && <span className="hdr-cart-badge">{itemCount}</span>}
              </div>
              <span className="hdr-act-label">Cart</span>
            </button>
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

      {/* Mobile Search Modal Drawer */}
      <MobileSearchModal
        isOpen={mobileSearchOpen}
        onClose={() => setMobileSearchOpen(false)}
      />

      {/* Mini Cart Drawer */}
      <MiniCartDrawer />

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

            <div className="hdr-mobile-section">Account Navigation</div>
            {isAuthenticated ? (
              <>
                {role === 'Customer' && (
                  <>
                    <Link to="/dashboard" onClick={() => setMenuOpen(false)}>Dashboard</Link>
                    <Link to="/dashboard?tab=orders" onClick={() => setMenuOpen(false)}>My Orders</Link>
                    <Link to="/wishlist" onClick={() => setMenuOpen(false)}>Wishlist ({wishlistCount})</Link>
                  </>
                )}
                {role === 'Seller' && (
                  <>
                    <Link to="/seller-dashboard" onClick={() => setMenuOpen(false)}>Seller Dashboard</Link>
                    <Link to="/seller/products" onClick={() => setMenuOpen(false)}>Products</Link>
                    <Link to="/seller/orders" onClick={() => setMenuOpen(false)}>Orders</Link>
                  </>
                )}
                {role === 'Admin' && (
                  <>
                    <Link to="/admin-dashboard" onClick={() => setMenuOpen(false)}>Admin Dashboard</Link>
                    <Link to="/admin/users" onClick={() => setMenuOpen(false)}>Users</Link>
                    <Link to="/admin/products" onClick={() => setMenuOpen(false)}>Products</Link>
                  </>
                )}
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
