import { db, collection, getDocs, doc, updateDoc, setDoc, deleteDoc, serverTimestamp } from '../firebase/config';
import couponService from './couponService';
import productService from './productService';
import checkoutService from './checkoutService';

const getStoredCoupons = () => {
  try {
    const saved = localStorage.getItem('startech-admin-coupons');
    return saved ? JSON.parse(saved) : couponService.getAvailableCoupons();
  } catch (e) {
    return couponService.getAvailableCoupons();
  }
};

const saveStoredCoupons = (coupons) => {
  try {
    localStorage.setItem('startech-admin-coupons', JSON.stringify(coupons));
  } catch (e) {}
};

const getStoredSettings = () => {
  try {
    const saved = localStorage.getItem('startech-admin-settings');
    return saved
      ? JSON.parse(saved)
      : {
          bannerText: '⚡ Mega Tech Sale: Up to 30% OFF on Laptops & Custom PC Components!',
          defaultShippingFee: 60,
          maintenanceMode: false
        };
  } catch (e) {
    return {
      bannerText: '⚡ Mega Tech Sale: Up to 30% OFF on Laptops & Custom PC Components!',
      defaultShippingFee: 60,
      maintenanceMode: false
    };
  }
};

const saveStoredSettings = (settings) => {
  try {
    localStorage.setItem('startech-admin-settings', JSON.stringify(settings));
  } catch (e) {}
};

export const adminService = {
  // ============= USER GOVERNANCE =============
  async getUsers() {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs.map((d) => ({ uid: d.id, ...d.data() }));
      if (users.length > 0) return users;
    } catch (e) {}

    return [
      { uid: 'usr_admin', displayName: 'System Admin', email: 'admin@startech.com.bd', role: 'Admin', status: 'active', emailVerified: true },
      { uid: 'usr_seller', displayName: 'StarTech Seller', email: 'seller@startech.com.bd', role: 'Seller', status: 'active', emailVerified: true },
      { uid: 'usr_cust', displayName: 'Tanvir Ahmed', email: 'user@example.com', role: 'Customer', status: 'active', emailVerified: true }
    ];
  },

  async updateUserRole(uid, newRole) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { role: newRole });
    } catch (e) {}
    return { uid, role: newRole };
  },

  async toggleUserStatus(uid, currentStatus) {
    const newStatus = currentStatus === 'active' ? 'banned' : 'active';
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { status: newStatus });
    } catch (e) {}
    return { uid, status: newStatus };
  },

  // ============= PRODUCT MANAGEMENT =============
  async getProducts() {
    return productService.getAllProducts();
  },

  async addProduct(productData) {
    const newProd = {
      id: productData.id || `prod_${Date.now()}`,
      name: productData.name,
      category: productData.category || 'Laptop',
      brand: productData.brand || 'StarTech',
      price: Number(productData.price || 0),
      regular_price: Number(productData.regular_price || productData.price || 0),
      in_stock: productData.in_stock !== false,
      stockQuantity: Number(productData.stockQuantity || 10),
      featured_image: productData.featured_image || 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400',
      description: productData.description || 'High performance tech device.',
      specifications: productData.specifications || {}
    };

    try {
      await setDoc(doc(db, 'products', newProd.id), {
        ...newProd,
        createdAt: serverTimestamp()
      });
    } catch (e) {}

    return newProd;
  },

  async updateProduct(id, productData) {
    try {
      await updateDoc(doc(db, 'products', id), productData);
    } catch (e) {}
    return { id, ...productData };
  },

  async deleteProduct(id) {
    try {
      await deleteDoc(doc(db, 'products', id));
    } catch (e) {}
    return id;
  },

  async toggleProductStock(id, currentInStock) {
    const nextStock = !currentInStock;
    try {
      await updateDoc(doc(db, 'products', id), { in_stock: nextStock });
    } catch (e) {}
    return nextStock;
  },

  // ============= ORDER MANAGEMENT =============
  async getOrders() {
    return checkoutService.getOrders();
  },

  async updateOrderStatus(orderId, newStatus) {
    try {
      await updateDoc(doc(db, 'orders', orderId), { orderStatus: newStatus });
    } catch (e) {}

    const orders = checkoutService.getOrders();
    const updated = orders.map((o) => (o.orderId === orderId ? { ...o, orderStatus: newStatus } : o));
    try {
      localStorage.setItem('startech-user-orders', JSON.stringify(updated));
    } catch (e) {}
    return updated;
  },

  // ============= COUPON MANAGEMENT =============
  getCoupons() {
    return getStoredCoupons();
  },

  createCoupon(couponData) {
    const coupons = getStoredCoupons();
    const newCoupon = {
      code: couponData.code.toUpperCase(),
      type: couponData.type || 'percentage',
      value: Number(couponData.value || 10),
      minSubtotal: Number(couponData.minSubtotal || 0),
      description: couponData.description || 'Promotional coupon'
    };

    const updated = [newCoupon, ...coupons];
    saveStoredCoupons(updated);
    return updated;
  },

  deleteCoupon(code) {
    const coupons = getStoredCoupons();
    const updated = coupons.filter((c) => c.code !== code);
    saveStoredCoupons(updated);
    return updated;
  },

  // ============= PLATFORM SETTINGS =============
  getSettings() {
    return getStoredSettings();
  },

  updateSettings(newSettings) {
    const updated = { ...getStoredSettings(), ...newSettings };
    saveStoredSettings(updated);
    return updated;
  }
};

export default adminService;
