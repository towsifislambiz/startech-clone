import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  currentStep: 1, // 1: Info, 2: Address, 3: Shipping, 4: Payment, 5: Review
  customer: {
    firstName: '',
    lastName: '',
    email: '',
    phone: ''
  },
  shippingAddress: {
    address: '',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1207'
  },
  billingAddress: {
    address: '',
    city: 'Dhaka',
    division: 'Dhaka',
    postalCode: '1207'
  },
  sameAsShipping: true,
  paymentMethod: 'cod',
  paymentDetails: {
    transactionId: '',
    senderNumber: '',
    cardNumber: '',
    cardExpiry: '',
    cardCvc: ''
  },
  isSubmitting: false,
  error: null
};

const checkoutSlice = createSlice({
  name: 'checkout',
  initialState,
  reducers: {
    setStep: (state, action) => {
      state.currentStep = action.payload;
    },
    setCustomerInfo: (state, action) => {
      state.customer = { ...state.customer, ...action.payload };
    },
    setShippingAddress: (state, action) => {
      state.shippingAddress = { ...state.shippingAddress, ...action.payload };
      if (state.sameAsShipping) {
        state.billingAddress = { ...state.shippingAddress, ...action.payload };
      }
    },
    setBillingAddress: (state, action) => {
      state.billingAddress = { ...state.billingAddress, ...action.payload };
    },
    setSameAsShipping: (state, action) => {
      state.sameAsShipping = action.payload;
      if (action.payload) {
        state.billingAddress = { ...state.shippingAddress };
      }
    },
    setPaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
    },
    setPaymentDetails: (state, action) => {
      state.paymentDetails = { ...state.paymentDetails, ...action.payload };
    },
    setSubmitting: (state, action) => {
      state.isSubmitting = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    resetCheckoutState: () => initialState
  }
});

export const {
  setStep,
  setCustomerInfo,
  setShippingAddress,
  setBillingAddress,
  setSameAsShipping,
  setPaymentMethod,
  setPaymentDetails,
  setSubmitting,
  setError,
  resetCheckoutState
} = checkoutSlice.actions;

export default checkoutSlice.reducer;
