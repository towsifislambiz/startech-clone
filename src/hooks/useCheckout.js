import { useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import checkoutService from '../services/checkoutService';
import paymentService from '../services/paymentService';
import useCartSystem from './useCartSystem';
import { useNotification } from '../context/NotificationContext';
import {
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
} from '../store/checkoutSlice';

export const useCheckout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const checkoutState = useSelector((state) => state.checkout);
  const user = useSelector((state) => state.auth.user);
  const { items, totals, shippingRegion, clearCart } = useCartSystem();
  const { showNotification } = useNotification();

  const nextStep = useCallback(() => {
    dispatch(setStep(Math.min(5, checkoutState.currentStep + 1)));
  }, [dispatch, checkoutState.currentStep]);

  const prevStep = useCallback(() => {
    dispatch(setStep(Math.max(1, checkoutState.currentStep - 1)));
  }, [dispatch, checkoutState.currentStep]);

  const submitOrder = useCallback(async () => {
    if (items.length === 0) {
      showNotification('Your cart is empty. Add items before placing an order.', 'error');
      return null;
    }

    // Validate Payment
    const paymentVal = paymentService.validatePayment(
      checkoutState.paymentMethod,
      checkoutState.paymentDetails
    );
    if (!paymentVal.valid) {
      showNotification(paymentVal.message, 'error');
      dispatch(setStep(4)); // Jump to payment step
      return null;
    }

    dispatch(setSubmitting(true));

    const orderData = {
      customer: {
        firstName: checkoutState.customer.firstName || user?.displayName || 'Customer',
        lastName: checkoutState.customer.lastName || '',
        email: checkoutState.customer.email || user?.email || 'customer@example.com',
        phone: checkoutState.customer.phone || '01700000000'
      },
      shippingAddress: checkoutState.shippingAddress,
      billingAddress: checkoutState.sameAsShipping ? checkoutState.shippingAddress : checkoutState.billingAddress,
      sameAsShipping: checkoutState.sameAsShipping,
      items,
      totals,
      shippingRegion,
      paymentMethod: checkoutState.paymentMethod === 'cod'
        ? 'Cash on Delivery (COD)'
        : checkoutState.paymentMethod === 'bkash'
        ? 'bKash Mobile Banking'
        : checkoutState.paymentMethod === 'nagad'
        ? 'Nagad Mobile Banking'
        : 'SSLCommerz Card Payment',
      paymentDetails: checkoutState.paymentDetails
    };

    try {
      const res = await checkoutService.placeOrder(orderData);
      if (res.success) {
        showNotification(`Order #${res.orderId} placed successfully!`, 'success');
        clearCart();
        dispatch(resetCheckoutState());
        navigate(`/order-confirmation/${res.orderId}`);
        return res.order;
      } else {
        showNotification(res.message, 'error');
        dispatch(setError(res.message));
      }
    } catch (err) {
      showNotification('Order processing failed. Please try again.', 'error');
    } finally {
      dispatch(setSubmitting(false));
    }
  }, [dispatch, navigate, items, totals, shippingRegion, checkoutState, user, clearCart, showNotification]);

  return {
    ...checkoutState,
    items,
    totals,
    shippingRegion,
    nextStep,
    prevStep,
    goToStep: (s) => dispatch(setStep(s)),
    updateCustomer: (data) => dispatch(setCustomerInfo(data)),
    updateShipping: (data) => dispatch(setShippingAddress(data)),
    updateBilling: (data) => dispatch(setBillingAddress(data)),
    setSameShipping: (same) => dispatch(setSameAsShipping(same)),
    updatePaymentMethod: (method) => dispatch(setPaymentMethod(method)),
    updatePaymentDetails: (details) => dispatch(setPaymentDetails(details)),
    submitOrder
  };
};

export default useCheckout;
