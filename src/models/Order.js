/**
 * Order Data Model Factory
 */
export const createOrderModel = (data = {}) => ({
  id: data.id || null,
  userId: data.userId || null,
  items: data.items || [],
  subtotal: data.subtotal || 0,
  tax: data.tax || 0,
  shippingFee: data.shippingFee || 0,
  total: data.total || 0,
  status: data.status || 'pending', // pending | processing | shipped | delivered | cancelled
  paymentMethod: data.paymentMethod || 'sslcommerz',
  paymentStatus: data.paymentStatus || 'unpaid',
  shippingAddress: data.shippingAddress || {},
  createdAt: data.createdAt || new Date().toISOString(),
});

export default createOrderModel;
