import { useMemo, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import cartService from '../services/cartService';
import couponService from '../services/couponService';
import {
  addToCart,
  updateQuantity,
  removeFromCart,
  setShippingRegion,
  applyCoupon,
  removeCoupon,
  setDrawerOpen,
  clearCart
} from '../store/cartSlice';
import { useNotification } from '../context/NotificationContext';

export const useCartSystem = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state.cart);
  const { showNotification } = useNotification();

  const totals = useMemo(() => {
    return cartService.calculateTotals(
      cartState.items,
      cartState.shippingRegion,
      cartState.coupon
    );
  }, [cartState.items, cartState.shippingRegion, cartState.coupon]);

  const handleAddItem = useCallback((product, quantity = 1, variant = null) => {
    dispatch(addToCart({ product, quantity, variant }));
    showNotification(`Added "${product.name.substring(0, 24)}..." to Cart!`, 'success');
  }, [dispatch, showNotification]);

  const handleUpdateQty = useCallback((id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  }, [dispatch]);

  const handleRemoveItem = useCallback((id) => {
    dispatch(removeFromCart(id));
    showNotification('Item removed from Cart', 'info');
  }, [dispatch, showNotification]);

  const handleApplyCoupon = useCallback((code) => {
    const res = couponService.validateCoupon(code, totals.subtotal);
    if (res.success) {
      dispatch(applyCoupon(res.coupon));
      showNotification(res.message, 'success');
    } else {
      showNotification(res.message, 'error');
    }
    return res;
  }, [dispatch, totals.subtotal, showNotification]);

  const handleRemoveCoupon = useCallback(() => {
    dispatch(removeCoupon());
    showNotification('Coupon removed', 'info');
  }, [dispatch, showNotification]);

  const handleProceedToCheckout = useCallback(() => {
    dispatch(setDrawerOpen(false));
    navigate('/checkout');
  }, [dispatch, navigate]);

  return {
    items: cartState.items,
    itemCount: totals.itemCount,
    totals,
    shippingRegion: cartState.shippingRegion,
    coupon: cartState.coupon,
    isDrawerOpen: cartState.isDrawerOpen,
    addItem: handleAddItem,
    updateQty: handleUpdateQty,
    removeItem: handleRemoveItem,
    setShippingRegion: (region) => dispatch(setShippingRegion(region)),
    applyCoupon: handleApplyCoupon,
    removeCoupon: handleRemoveCoupon,
    openDrawer: () => dispatch(setDrawerOpen(true)),
    closeDrawer: () => dispatch(setDrawerOpen(false)),
    clearCart: () => dispatch(clearCart()),
    proceedToCheckout: handleProceedToCheckout
  };
};

export default useCartSystem;
