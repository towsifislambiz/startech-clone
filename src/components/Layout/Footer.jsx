import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiInstagram, FiTwitter, FiYoutube } from 'react-icons/fi';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="container">
          <div className="footer-grid">
            {/* About */}
            <div className="footer-col">
              <h4>About Startech</h4>
              <p>
                Premium electronics marketplace in Bangladesh. Quality products, best prices, fast delivery.
              </p>
              <div className="social-links">
                <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                  <FiFacebook />
                </a>
                <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                  <FiInstagram />
                </a>
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                  <FiTwitter />
                </a>
                <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                  <FiYoutube />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div className="footer-col">
              <h4>Quick Links</h4>
              <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/category/1">Shop</Link></li>
                <li><Link to="/">Best Sellers</Link></li>
                <li><Link to="/">New Arrivals</Link></li>
                <li><Link to="/">PC Builder</Link></li>
              </ul>
            </div>

            {/* Customer Service */}
            <div className="footer-col">
              <h4>Customer Service</h4>
              <ul>
                <li><a href="/">Contact Us</a></li>
                <li><a href="/">Shipping Info</a></li>
                <li><a href="/">Returns</a></li>
                <li><a href="/">FAQ</a></li>
                <li><a href="/">Track Order</a></li>
              </ul>
            </div>

            {/* Company */}
            <div className="footer-col">
              <h4>Company</h4>
              <ul>
                <li><a href="/">About Us</a></li>
                <li><a href="/">Careers</a></li>
                <li><a href="/">Blog</a></li>
                <li><a href="/">Press</a></li>
                <li><a href="/">Partners</a></li>
              </ul>
            </div>

            {/* Legal */}
            <div className="footer-col">
              <h4>Legal</h4>
              <ul>
                <li><a href="/">Privacy Policy</a></li>
                <li><a href="/">Terms & Conditions</a></li>
                <li><a href="/">Cookie Policy</a></li>
                <li><a href="/">Disclaimer</a></li>
                <li><a href="/">Security</a></li>
              </ul>
            </div>
          </div>

          {/* Bottom */}
          <div className="footer-bottom">
            <div className="footer-bottom-left">
              <p>&copy; 2026 Startech. All rights reserved.</p>
            </div>
            <div className="footer-bottom-right">
              <p>Secure Shopping | Fast Shipping | 24/7 Support</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
