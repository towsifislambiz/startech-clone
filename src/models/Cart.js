/**
 * Cart & CartItem Model Factory
 */
export const createCartItemModel = (data = {}) => ({
  id: data.id || null,
  name: data.name || '',
  price: data.price || 0,
  image: data.image || '',
  quantity: data.quantity || 1,
  stock: data.stock ?? true,
});

export const createCartModel = (items = [], coupon = null, discountAmount = 0) => {
  const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const tax = subtotal * 0.15;
  const shipping = items.length > 0 ? 250 : 0;
  const total = subtotal + tax + shipping - discountAmount;

  return {
    items: items.map(createCartItemModel),
    coupon,
    discountAmount,
    subtotal,
    tax,
    shipping,
    total,
    itemCount: items.reduce((sum, item) => sum + item.quantity, 0),
  };
};

export default createCartModel;
