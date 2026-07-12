import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const { items, total, subtotal, tax, removeItem, updateQuantity, clearCart } = useCart();

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '60px 0', textAlign: 'center' }}>
        <h1 style={{ marginBottom: '20px' }}>Shopping Cart</h1>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '30px' }}>Your cart is empty</p>
        <Link to="/" className="btn btn-primary">Continue Shopping</Link>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ marginBottom: '30px' }}>Shopping Cart</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        <div>
          {items.map((item) => (
            <div key={item.id} style={{
              display: 'flex',
              gap: '20px',
              padding: '20px',
              backgroundColor: 'var(--bg-secondary)',
              borderRadius: '8px',
              marginBottom: '20px'
            }}>
              <div style={{
                width: '100px',
                height: '100px',
                backgroundColor: 'var(--border-color)',
                borderRadius: '6px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '30px'
              }}>
                📦
              </div>
              <div style={{ flex: 1 }}>
                <h4 style={{ marginBottom: '10px' }}>{item.name}</h4>
                <p style={{ color: 'var(--accent-red)', fontSize: '18px', marginBottom: '10px' }}>
                  {item.price.toLocaleString()} TK
                </p>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="btn btn-sm"
                    style={{ padding: '5px 10px' }}
                  >
                    −
                  </button>
                  <span>{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="btn btn-sm"
                    style={{ padding: '5px 10px' }}
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeItem(item.id)}
                    className="btn btn-sm"
                    style={{ marginLeft: 'auto', color: 'var(--danger)' }}
                  >
                    Remove
                  </button>
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontWeight: 'bold' }}>
                  {(item.price * item.quantity).toLocaleString()} TK
                </p>
              </div>
            </div>
          ))}
        </div>

        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '20px',
          borderRadius: '8px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
          <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <span>Subtotal:</span>
            <span>{subtotal.toLocaleString()} TK</span>
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>
            <span>Tax (15%):</span>
            <span>{tax.toLocaleString()} TK</span>
          </div>
          <div style={{ marginBottom: '15px', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px', fontSize: '18px', fontWeight: 'bold' }}>
            <span>Total:</span>
            <span style={{ color: 'var(--accent-red)' }}>{total.toLocaleString()} TK</span>
          </div>
          <Link to="/checkout" className="btn btn-primary" style={{ width: '100%', textAlign: 'center', marginBottom: '10px', display: 'block', padding: '12px' }}>
            Checkout
          </Link>
          <button onClick={clearCart} className="btn btn-ghost" style={{ width: '100%', textAlign: 'center', padding: '12px' }}>
            Clear Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
