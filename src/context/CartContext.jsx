import React, { createContext, useContext } from 'react';
import useCartSystem from '../hooks/useCartSystem';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const cartSystem = useCartSystem();

  const value = {
    items: cartSystem.items,
    addItem: (product, quantity = 1, variant = null) => cartSystem.addItem(product, quantity, variant),
    addToCart: (product, quantity = 1, variant = null) => cartSystem.addItem(product, quantity, variant),
    removeItem: (id) => cartSystem.removeItem(id),
    updateQuantity: (id, quantity) => cartSystem.updateQty(id, quantity),
    clearCart: () => cartSystem.clearCart(),
    applyCoupon: (code) => cartSystem.applyCoupon(code),
    removeCoupon: () => cartSystem.removeCoupon(),
    openDrawer: () => cartSystem.openDrawer(),
    closeDrawer: () => cartSystem.closeDrawer(),
    coupon: cartSystem.coupon,
    subtotal: cartSystem.totals.subtotal,
    tax: cartSystem.totals.vatAmount,
    shipping: cartSystem.totals.shippingFee,
    total: cartSystem.totals.grandTotal,
    itemCount: cartSystem.itemCount,
    totals: cartSystem.totals
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
