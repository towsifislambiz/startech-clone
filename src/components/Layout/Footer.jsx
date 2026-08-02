import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube, FiShield, FiTruck, FiCreditCard, FiHeadphones, FiSend } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      {/* Trust Badge Bar */}
      <div style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', padding: '24px 0', backgroundColor: 'rgba(255, 255, 255, 0.02)' }}>
        <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(213,30,11,0.12)', color: '#D51E0B', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiTruck size={22} /></div>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>Fast Delivery</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Nationwide Shipping BD</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(16,185,129,0.12)', color: '#10b981', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiShield size={22} /></div>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>100% Genuine</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Official Brand Warranty</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(59,130,246,0.12)', color: '#3b82f6', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCreditCard size={22} /></div>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>Secure Payment</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>bKash, Nagad & Cards</div>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
            <div style={{ width: '44px', height: '44px', borderRadius: '12px', backgroundColor: 'rgba(245,158,11,0.12)', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiHeadphones size={22} /></div>
            <div>
              <div style={{ fontWeight: '700', color: '#fff', fontSize: '14px' }}>24/7 Support</div>
              <div style={{ fontSize: '12px', color: '#94a3b8' }}>Dedicated Helpline 16793</div>
            </div>
          </div>
        </div>
      </div>

      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* Brand Column */}
            <div className="footer-col">
              <h4 style={{ color: '#fff', fontSize: '20px', fontWeight: '800' }}>
                Star<span style={{ color: '#D51E0B' }}>Tech</span>
              </h4>
              <p>
                Premier destination for computer hardware, laptops, gaming gear, and tech accessories in Bangladesh. Exceptional quality, competitive prices, and nationwide delivery.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer"><FiFacebook /></a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer"><FiInstagram /></a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer"><FiTwitter /></a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer"><FiYoutube /></a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category/component">Shop Components</Link></li>
                <li><Link to="/category/laptop">Gaming Laptops</Link></li>
                <li><Link to="/pc-builder">PC Builder</Link></li>
                <li><Link to="/brands">Brands Directory</Link></li>
              </ul>
            </div>

            {/* Customer Support */}
            <div className="footer-col">
              <h4>Customer Support</h4>
              <ul>
                <li><Link to="/dashboard?tab=support">Contact Us</Link></li>
                <li><Link to="/dashboard?tab=orders">Track Order</Link></li>
                <li><Link to="/dashboard?tab=support">Shipping Policy</Link></li>
                <li><Link to="/dashboard?tab=support">Return & Warranty</Link></li>
                <li><Link to="/dashboard?tab=support">FAQ</Link></li>
              </ul>
            </div>

            {/* Account & Deals */}
            <div className="footer-col">
              <h4>User Account</h4>
              <ul>
                <li><Link to="/login">Customer Login</Link></li>
                <li><Link to="/register">Create Account</Link></li>
                <li><Link to="/dashboard">My Dashboard</Link></li>
                <li><Link to="/wishlist">My Wishlist</Link></li>
                <li><Link to="/cart">View Cart</Link></li>
              </ul>
            </div>

            {/* Newsletter */}
            <div className="footer-col">
              <h4>Subscribe Deals</h4>
              <p style={{ fontSize: '13px' }}>Get instant alerts on hot tech deals and flash discounts.</p>
              <form onSubmit={(e) => e.preventDefault()} style={{ display: 'flex', gap: '8px' }}>
                <input type="email" placeholder="Your email..." style={{ padding: '8px 12px', fontSize: '13px', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.15)', backgroundColor: 'rgba(255,255,255,0.05)', color: '#fff', width: '100%' }} />
                <button type="submit" style={{ backgroundColor: '#D51E0B', color: '#fff', border: 'none', borderRadius: '8px', padding: '0 14px', cursor: 'pointer' }}>
                  <FiSend />
                </button>
              </form>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>&copy; {new Date().getFullYear()} StarTech Bangladesh. All rights reserved.</p>
            </div>
            <div className="footer-bottom-right">
              <p>Secure SSL Encryption | Fast Nationwide Shipping</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
