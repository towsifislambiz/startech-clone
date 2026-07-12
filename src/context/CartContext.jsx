import React, { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [items, setItems] = useState(() => {
    const saved = localStorage.getItem('startech-cart');
    return saved ? JSON.parse(saved) : [];
  });

  const [coupon, setCoupon] = useState(null);
  const [discountAmount, setDiscountAmount] = useState(0);

  // Persist cart to localStorage
  useEffect(() => {
    localStorage.setItem('startech-cart', JSON.stringify(items));
  }, [items]);

  const addItem = (product, quantity = 1) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);

      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }

      return [
        ...prevItems,
        {
          id: product.id,
          name: product.name,
          price: product.selling_price || product.price,
          image: product.featured_image || product.image,
          quantity,
          stock: product.quantity_in_stock,
        },
      ];
    });
  };

  const removeItem = (productId) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== productId));
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity <= 0) {
      removeItem(productId);
      return;
    }

    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
    setCoupon(null);
    setDiscountAmount(0);
  };

  const applyCoupon = (code, discount) => {
    setCoupon(code);
    setDiscountAmount(discount);
  };

  const removeCoupon = () => {
    setCoupon(null);
    setDiscountAmount(0);
  };

  // Calculate totals
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15; // 15% VAT
  const shipping = items.length > 0 ? 250 : 0; // 250 TK shipping
  const total = subtotal + tax + shipping - discountAmount;

  const value = {
    items,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    applyCoupon,
    removeCoupon,
    coupon,
    discountAmount,
    subtotal,
    tax,
    shipping,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
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
