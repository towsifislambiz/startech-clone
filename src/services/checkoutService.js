import { db, collection, addDoc, serverTimestamp } from '../firebase/config';

const getSavedOrders = () => {
  try {
    const data = localStorage.getItem('startech-orders');
    return data ? JSON.parse(data) : [];
  } catch (e) {
    return [];
  }
};

const saveOrdersToLocal = (orders) => {
  try {
    localStorage.setItem('startech-orders', JSON.stringify(orders));
  } catch (e) {}
};

export const checkoutService = {
  /**
   * Process and place a new order
   * @param {Object} orderData 
   * @returns {Promise<{ success: boolean, orderId?: string, order?: Object, message: string }>}
   */
  async placeOrder(orderData) {
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return { success: false, message: 'Your cart is empty. Cannot place an order.' };
    }

    // 1. Generate Unique Order ID (e.g. ST-2026-84920)
    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ST-2026-${randomCode}`;
    const createdAt = new Date().toISOString();

    const orderPayload = {
      orderId,
      customer: orderData.customer || {},
      shippingAddress: orderData.shippingAddress || {},
      billingAddress: orderData.sameAsShipping ? orderData.shippingAddress : (orderData.billingAddress || {}),
      items: orderData.items,
      totals: orderData.totals || {},
      shippingRegion: orderData.shippingRegion || 'dhaka',
      shippingMethod: orderData.shippingMethod || 'Standard Delivery',
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
      paymentDetails: orderData.paymentDetails || {},
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (COD)' : 'Paid / Verified',
      orderStatus: 'Processing',
      createdAt
    };

    // 2. Persist to localStorage for fallback & guest access
    const existingOrders = getSavedOrders();
    const updatedOrders = [orderPayload, ...existingOrders];
    saveOrdersToLocal(updatedOrders);

    // 3. Persist to Firestore database
    try {
      await addDoc(collection(db, 'orders'), {
        ...orderPayload,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore order notice (operating in offline fallback mode):', err);
    }

    return {
      success: true,
      orderId,
      order: orderPayload,
      message: `Order #${orderId} placed successfully!`
    };
  },

  /**
   * Fetch an order by Order ID
   * @param {string} orderId 
   */
  getOrderById(orderId) {
    const orders = getSavedOrders();
    return orders.find((o) => o.orderId === orderId) || null;
  },

  /**
   * Get all placed orders
   */
  getOrders() {
    return getSavedOrders();
  }
};

export default checkoutService;
