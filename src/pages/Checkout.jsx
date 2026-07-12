import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useNotification } from '../context/NotificationContext';

const Checkout = () => {
  const navigate = useNavigate();
  const { success } = useNotification();
  const { total, clearCart } = useCart();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'sslcommerz'
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Complete order
      success('Order placed successfully!');
      clearCart();
      navigate('/dashboard?tab=orders');
    }
  };

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <h1 style={{ marginBottom: '30px' }}>Checkout</h1>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 300px', gap: '30px' }}>
        <div>
          {/* Progress Steps */}
          <div style={{ display: 'flex', marginBottom: '30px', gap: '10px' }}>
            {[1, 2, 3, 4].map((s) => (
              <div key={s} style={{
                flex: 1,
                padding: '15px',
                backgroundColor: step >= s ? 'var(--accent-red)' : 'var(--bg-secondary)',
                color: step >= s ? 'var(--white)' : 'var(--text-primary)',
                borderRadius: '6px',
                textAlign: 'center',
                fontWeight: 'bold',
                cursor: 'pointer'
              }} onClick={() => setStep(s)}>
                Step {s}
              </div>
            ))}
          </div>

          {/* Step 1: Shipping */}
          {step === 1 && (
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Shipping Address</h3>
              <form>
                <input
                  type="text"
                  name="fullName"
                  placeholder="Full Name"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  style={{ width: '100%', marginBottom: '15px', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="Phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  style={{ width: '100%', marginBottom: '15px', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleInputChange}
                  style={{ width: '100%', marginBottom: '15px', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                />
                <input
                  type="text"
                  name="city"
                  placeholder="City"
                  value={formData.city}
                  onChange={handleInputChange}
                  style={{ width: '100%', marginBottom: '15px', padding: '10px', border: '1px solid var(--border-color)', borderRadius: '6px' }}
                />
              </form>
            </div>
          )}

          {/* Step 2: Shipping Method */}
          {step === 2 && (
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Shipping Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ padding: '15px', backgroundColor: 'var(--bg)', border: '2px solid var(--accent-red)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="shipping" defaultChecked /> Standard (3-5 days) - Free
                </label>
                <label style={{ padding: '15px', backgroundColor: 'var(--bg)', border: '2px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="shipping" /> Express (1-2 days) - 250 TK
                </label>
              </div>
            </div>
          )}

          {/* Step 3: Payment */}
          {step === 3 && (
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Payment Method</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <label style={{ padding: '15px', backgroundColor: 'var(--bg)', border: '2px solid var(--accent-red)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="sslcommerz" checked={formData.paymentMethod === 'sslcommerz'} onChange={handleInputChange} /> SSLCommerz Card Payment
                </label>
                <label style={{ padding: '15px', backgroundColor: 'var(--bg)', border: '2px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="bkash" onChange={handleInputChange} /> bKash
                </label>
                <label style={{ padding: '15px', backgroundColor: 'var(--bg)', border: '2px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="nagad" onChange={handleInputChange} /> Nagad
                </label>
                <label style={{ padding: '15px', backgroundColor: 'var(--bg)', border: '2px solid var(--border-color)', borderRadius: '6px', cursor: 'pointer' }}>
                  <input type="radio" name="payment" value="cod" onChange={handleInputChange} /> Cash on Delivery
                </label>
              </div>
            </div>
          )}

          {/* Step 4: Review */}
          {step === 4 && (
            <div style={{ backgroundColor: 'var(--bg-secondary)', padding: '30px', borderRadius: '8px', marginBottom: '20px' }}>
              <h3 style={{ marginBottom: '20px' }}>Order Review</h3>
              <div style={{ backgroundColor: 'var(--bg)', padding: '15px', borderRadius: '6px', marginBottom: '20px' }}>
                <p><strong>Name:</strong> {formData.fullName}</p>
                <p><strong>Phone:</strong> {formData.phone}</p>
                <p><strong>Address:</strong> {formData.address}, {formData.city}</p>
                <p><strong>Payment:</strong> {formData.paymentMethod.toUpperCase()}</p>
              </div>
            </div>
          )}

          {/* Navigation Buttons */}
          <div style={{ display: 'flex', gap: '15px' }}>
            {step > 1 && (
              <button
                onClick={() => setStep(step - 1)}
                className="btn btn-secondary"
                style={{ padding: '12px 30px' }}
              >
                Back
              </button>
            )}
            <button
              onClick={handleSubmit}
              className="btn btn-primary"
              style={{ padding: '12px 30px', marginLeft: 'auto' }}
            >
              {step === 4 ? 'Place Order' : 'Continue'}
            </button>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div style={{
          backgroundColor: 'var(--bg-secondary)',
          padding: '20px',
          borderRadius: '8px',
          height: 'fit-content',
          position: 'sticky',
          top: '100px'
        }}>
          <h3 style={{ marginBottom: '20px' }}>Order Summary</h3>
          <div style={{ marginBottom: '15px', paddingBottom: '10px', borderBottom: '1px solid var(--border-color)' }}>
            <span>3 Items in Cart</span>
          </div>
          <div style={{ fontSize: '20px', fontWeight: 'bold', color: 'var(--accent-red)' }}>
            {total.toLocaleString()} TK
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
