import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiChevronRight, FiCheckCircle, FiArrowRight, FiArrowLeft, FiTruck, FiShoppingBag } from 'react-icons/fi';
import useCheckout from '../hooks/useCheckout';
import CheckoutProgress from '../components/Checkout/CheckoutProgress';
import AddressForm from '../components/Checkout/AddressForm';
import PaymentMethods from '../components/Checkout/PaymentMethods';
import CartSummaryCard from '../components/Cart/CartSummaryCard';

const Checkout = () => {
  const {
    currentStep,
    customer,
    shippingAddress,
    billingAddress,
    sameAsShipping,
    paymentMethod,
    paymentDetails,
    isSubmitting,
    items,
    totals,
    shippingRegion,
    nextStep,
    prevStep,
    goToStep,
    updateCustomer,
    updateShipping,
    updateBilling,
    setSameShipping,
    updatePaymentMethod,
    updatePaymentDetails,
    submitOrder
  } = useCheckout();

  useEffect(() => {
    document.title = 'Secure Checkout | StarTech';
  }, []);

  if (items.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div
          style={{
            width: '96px',
            height: '96px',
            borderRadius: '50%',
            backgroundColor: 'rgba(213, 30, 11, 0.1)',
            color: '#D51E0B',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 20px auto',
            boxShadow: '0 0 40px rgba(213, 30, 11, 0.15)'
          }}
        >
          <FiShoppingBag size={48} />
        </div>
        <h2 style={{ color: 'var(--text-primary, #ffffff)', fontSize: '24px', fontWeight: '800', marginBottom: '10px' }}>
          Your Cart is Empty
        </h2>
        <p style={{ color: 'var(--text-secondary, #94a3b8)', marginBottom: '28px', maxWidth: '440px', margin: '0 auto 28px auto' }}>
          You need at least one product in your shopping cart before proceeding to checkout.
        </p>
        <Link
          to="/category/component"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '14px 28px',
            backgroundColor: '#D51E0B',
            color: '#ffffff',
            fontWeight: '800',
            fontSize: '15px',
            borderRadius: '12px',
            textDecoration: 'none',
            boxShadow: '0 8px 24px rgba(213, 30, 11, 0.35)'
          }}
        >
          Explore Tech Products
        </Link>
      </div>
    );
  }

  return (
    <div className="cat" style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb Header */}
      <div className="cat-breadcrumb">
        <div className="container" style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
          <Link to="/" style={{ color: 'var(--text-secondary, #94a3b8)', textDecoration: 'none' }}>Home</Link>
          <FiChevronRight size={14} style={{ color: 'var(--text-muted, #64748b)' }} />
          <Link to="/cart" style={{ color: 'var(--text-secondary, #94a3b8)', textDecoration: 'none' }}>Cart</Link>
          <FiChevronRight size={14} style={{ color: 'var(--text-muted, #64748b)' }} />
          <span style={{ color: '#D51E0B', fontWeight: '600' }}>Secure Checkout</span>
        </div>
      </div>

      <div className="container">
        {/* Step Progress Bar */}
        <CheckoutProgress currentStep={currentStep} onStepClick={goToStep} />

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '32px', alignItems: 'start' }}>
          {/* Main Multi-Step Form */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            {/* Step 1: Customer Information */}
            {currentStep === 1 && (
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary, #0c1c28)',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#D51E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
                    1
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0 }}>
                    Customer Contact Information
                  </h3>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>First Name *</label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Tanvir"
                      value={customer.firstName}
                      onChange={(e) => updateCustomer({ firstName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-color, rgba(255,255,255,0.15))', backgroundColor: 'var(--bg, #081621)', color: 'var(--text-primary, #ffffff)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>Last Name</label>
                    <input
                      type="text"
                      placeholder="e.g. Ahmed"
                      value={customer.lastName}
                      onChange={(e) => updateCustomer({ lastName: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-color, rgba(255,255,255,0.15))', backgroundColor: 'var(--bg, #081621)', color: 'var(--text-primary, #ffffff)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      placeholder="e.g. user@example.com"
                      value={customer.email}
                      onChange={(e) => updateCustomer({ email: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-color, rgba(255,255,255,0.15))', backgroundColor: 'var(--bg, #081621)', color: 'var(--text-primary, #ffffff)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12.5px', fontWeight: '700', color: 'var(--text-secondary, #94a3b8)', display: 'block', marginBottom: '6px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      placeholder="e.g. 01712345678"
                      value={customer.phone}
                      onChange={(e) => updateCustomer({ phone: e.target.value })}
                      style={{ width: '100%', padding: '12px 14px', borderRadius: '10px', border: '1px solid var(--border-color, rgba(255,255,255,0.15))', backgroundColor: 'var(--bg, #081621)', color: 'var(--text-primary, #ffffff)', fontSize: '14px', outline: 'none' }}
                    />
                  </div>
                </div>

                <button
                  type="button"
                  onClick={nextStep}
                  style={{
                    alignSelf: 'flex-end',
                    marginTop: '8px',
                    padding: '12px 24px',
                    backgroundColor: '#D51E0B',
                    color: '#ffffff',
                    fontWeight: '800',
                    fontSize: '14.5px',
                    borderRadius: '10px',
                    border: 'none',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    boxShadow: '0 6px 20px rgba(213, 30, 11, 0.3)'
                  }}
                >
                  Next: Shipping Address <FiArrowRight size={18} />
                </button>
              </div>
            )}

            {/* Step 2: Shipping & Billing Address */}
            {currentStep === 2 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <AddressForm
                  title="Shipping Address"
                  addressData={shippingAddress}
                  onChange={updateShipping}
                  showSameAsShipping={true}
                  sameAsShipping={sameAsShipping}
                  onToggleSame={setSameShipping}
                />

                {!sameAsShipping && (
                  <AddressForm
                    title="Billing Address"
                    addressData={billingAddress}
                    onChange={updateBilling}
                  />
                )}

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary, #ffffff)',
                      border: '1px solid var(--border-color, rgba(255,255,255,0.2))',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FiArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#D51E0B',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '14.5px',
                      borderRadius: '10px',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(213, 30, 11, 0.3)'
                    }}
                  >
                    Next: Delivery Method <FiArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 3: Delivery Method */}
            {currentStep === 3 && (
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary, #0c1c28)',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#D51E0B', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
                    3
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0 }}>
                    Select Delivery Method
                  </h3>
                </div>

                <div style={{ padding: '16px', borderRadius: '12px', backgroundColor: 'var(--bg, #081621)', border: '2px solid #D51E0B', display: 'flex', alignItems: 'center', gap: '14px' }}>
                  <FiTruck size={24} style={{ color: '#D51E0B' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14.5px', fontWeight: '800', color: 'var(--text-primary, #ffffff)' }}>Express Nationwide Home Delivery</div>
                    <div style={{ fontSize: '12.5px', color: 'var(--text-secondary, #94a3b8)', marginTop: '2px' }}>Delivered directly to your door within 2–4 business days with live SMS tracking.</div>
                  </div>
                  <strong style={{ color: 'var(--text-primary, #ffffff)', fontSize: '16px' }}>৳{totals.shippingFee}</strong>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '12px' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary, #ffffff)',
                      border: '1px solid var(--border-color, rgba(255,255,255,0.2))',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FiArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#D51E0B',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '14.5px',
                      borderRadius: '10px',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(213, 30, 11, 0.3)'
                    }}
                  >
                    Next: Payment Options <FiArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Payment Methods */}
            {currentStep === 4 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <PaymentMethods
                  selectedMethod={paymentMethod}
                  paymentDetails={paymentDetails}
                  onSelectMethod={updatePaymentMethod}
                  onUpdateDetails={updatePaymentDetails}
                />

                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary, #ffffff)',
                      border: '1px solid var(--border-color, rgba(255,255,255,0.2))',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FiArrowLeft size={18} /> Back
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    style={{
                      padding: '12px 24px',
                      backgroundColor: '#D51E0B',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '14.5px',
                      borderRadius: '10px',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '8px',
                      cursor: 'pointer',
                      boxShadow: '0 6px 20px rgba(213, 30, 11, 0.3)'
                    }}
                  >
                    Next: Review Order <FiArrowRight size={18} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 5: Order Review & Final Submit */}
            {currentStep === 5 && (
              <div
                style={{
                  backgroundColor: 'var(--bg-secondary, #0c1c28)',
                  border: '1px solid var(--border-color, rgba(255,255,255,0.08))',
                  borderRadius: '16px',
                  padding: '24px',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '20px',
                  boxShadow: '0 10px 24px rgba(0,0,0,0.12)'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#22c55e', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', fontSize: '14px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '800', color: 'var(--text-primary, #ffffff)', margin: 0 }}>
                    5. Final Order Review
                  </h3>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {items.map((item) => (
                    <div key={item.id} style={{ display: 'flex', gap: '14px', alignItems: 'center', padding: '12px', backgroundColor: 'var(--bg, #081621)', borderRadius: '10px', border: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
                      <img src={item.thumbnail || item.images[0]} alt={item.name} style={{ width: '48px', height: '48px', objectFit: 'contain' }} />
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '14px', fontWeight: '700', color: 'var(--text-primary, #ffffff)' }}>{item.name}</div>
                        <div style={{ fontSize: '12px', color: 'var(--text-secondary, #94a3b8)' }}>Quantity: {item.quantity} × ৳{item.price.toLocaleString('en-IN')}</div>
                      </div>
                      <div style={{ fontSize: '15px', fontWeight: '800', color: '#D51E0B' }}>
                        ৳{(item.price * item.quantity).toLocaleString('en-IN')}
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '14px', borderTop: '1px solid var(--border-color, rgba(255,255,255,0.08))' }}>
                  <button
                    type="button"
                    onClick={prevStep}
                    style={{
                      padding: '12px 20px',
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary, #ffffff)',
                      border: '1px solid var(--border-color, rgba(255,255,255,0.2))',
                      fontWeight: '700',
                      fontSize: '14px',
                      borderRadius: '10px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <FiArrowLeft size={18} /> Back
                  </button>

                  <button
                    type="button"
                    onClick={submitOrder}
                    disabled={isSubmitting}
                    style={{
                      padding: '16px 32px',
                      backgroundColor: '#D51E0B',
                      color: '#ffffff',
                      fontWeight: '800',
                      fontSize: '16px',
                      borderRadius: '12px',
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      boxShadow: '0 8px 24px rgba(213, 30, 11, 0.4)'
                    }}
                  >
                    {isSubmitting ? 'Processing Order...' : <><FiCheckCircle size={20} /> Confirm & Place Order</>}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Sticky Order Summary Sidebar */}
          <div style={{ position: 'sticky', top: '90px' }}>
            <CartSummaryCard
              totals={totals}
              shippingRegion={shippingRegion}
              onSelectShipping={() => {}}
              onProceedToCheckout={currentStep === 5 ? submitOrder : nextStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
