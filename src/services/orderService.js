import {
  db,
  collection,
  addDoc,
  getDocs,
  doc,
  updateDoc,
  query,
  where,
  serverTimestamp
} from '../firebase/config';

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

export const orderService = {
  /**
   * Create and place a new order in Firestore and localStorage
   * @param {Object} orderData 
   */
  async createOrder(orderData) {
    if (!orderData || !orderData.items || orderData.items.length === 0) {
      return { success: false, message: 'Cart is empty. Cannot create order.' };
    }

    const randomCode = Math.floor(10000 + Math.random() * 90000);
    const orderId = `ST-2026-${randomCode}`;
    const createdAt = new Date().toISOString();

    const orderPayload = {
      orderId,
      userId: orderData.userId || 'guest_user',
      customer: orderData.customer || {},
      shippingAddress: orderData.shippingAddress || {},
      billingAddress: orderData.billingAddress || orderData.shippingAddress || {},
      items: orderData.items || [],
      totals: orderData.totals || {},
      shippingRegion: orderData.shippingRegion || 'dhaka',
      shippingMethod: orderData.shippingMethod || 'Standard Delivery',
      paymentMethod: orderData.paymentMethod || 'Cash on Delivery (COD)',
      paymentDetails: orderData.paymentDetails || {},
      paymentStatus: orderData.paymentMethod === 'Cash on Delivery (COD)' ? 'Pending (COD)' : 'Paid',
      status: 'Pending', // Pending | Confirmed | Processing | Packed | Shipped | Out for Delivery | Delivered | Cancelled
      orderStatus: 'Pending',
      createdAt,
      timeline: [
        { status: 'Pending', date: createdAt, note: 'Order placed by customer.' }
      ]
    };

    // Save locally
    const existing = getSavedOrders();
    const updated = [orderPayload, ...existing];
    saveOrdersToLocal(updated);

    // Save to Firestore
    try {
      await addDoc(collection(db, 'orders'), {
        ...orderPayload,
        timestamp: serverTimestamp()
      });
    } catch (err) {
      console.warn('Firestore order save notice (operating in offline fallback mode):', err);
    }

    return {
      success: true,
      orderId,
      order: orderPayload,
      message: `Order #${orderId} created successfully!`
    };
  },

  /**
   * Fetch all orders for current user or session
   */
  async getOrders(userId = null) {
    let localOrders = getSavedOrders();

    try {
      let q;
      if (userId) {
        q = query(collection(db, 'orders'), where('userId', '==', userId));
      } else {
        q = query(collection(db, 'orders'));
      }
      const snapshot = await getDocs(q);
      const remoteOrders = snapshot.docs.map((docSnap) => ({ id: docSnap.id, ...docSnap.data() }));

      if (remoteOrders.length > 0) {
        // Merge with local orders
        const map = new Map();
        [...remoteOrders, ...localOrders].forEach((item) => map.set(item.orderId, item));
        localOrders = Array.from(map.values());
        saveOrdersToLocal(localOrders);
      }
    } catch (err) {
      console.warn('Firestore getOrders notice (using local cache):', err);
    }

    // Sort by latest created
    return localOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  },

  /**
   * Get specific order details by ID
   */
  async getOrderById(orderId) {
    const localOrders = getSavedOrders();
    let found = localOrders.find((o) => o.orderId === orderId || o.id === orderId);

    if (!found) {
      try {
        const q = query(collection(db, 'orders'), where('orderId', '==', orderId));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          found = { id: snapshot.docs[0].id, ...snapshot.docs[0].data() };
        }
      } catch (e) {}
    }

    return found || null;
  },

  /**
   * Cancel an eligible order (Pending or Confirmed status)
   */
  async cancelOrder(orderId) {
    const orders = getSavedOrders();
    const targetIndex = orders.findIndex((o) => o.orderId === orderId);

    if (targetIndex === -1) {
      return { success: false, message: 'Order not found.' };
    }

    const order = orders[targetIndex];
    if (order.status !== 'Pending' && order.status !== 'Confirmed' && order.orderStatus !== 'Pending' && order.orderStatus !== 'Confirmed') {
      return { success: false, message: 'Only Pending or Confirmed orders can be cancelled.' };
    }

    const now = new Date().toISOString();
    order.status = 'Cancelled';
    order.orderStatus = 'Cancelled';
    order.timeline = order.timeline || [];
    order.timeline.push({ status: 'Cancelled', date: now, note: 'Order cancelled by customer.' });

    orders[targetIndex] = order;
    saveOrdersToLocal(orders);

    try {
      if (order.id) {
        const docRef = doc(db, 'orders', order.id);
        await updateDoc(docRef, {
          status: 'Cancelled',
          orderStatus: 'Cancelled'
        });
      }
    } catch (e) {}

    return { success: true, order, message: `Order #${orderId} cancelled successfully.` };
  }
};

export default orderService;
