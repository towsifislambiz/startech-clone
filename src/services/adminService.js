import { db, collection, getDocs, doc, updateDoc } from '../firebase/config';
import couponService from './couponService';

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

export const adminService = {
  /**
   * Fetch all registered users
   */
  async getUsers() {
    try {
      const snapshot = await getDocs(collection(db, 'users'));
      const users = snapshot.docs.map((d) => ({ uid: d.id, ...d.data() }));
      if (users.length > 0) return users;
    } catch (e) {}

    // Mock initial user list
    return [
      { uid: 'usr_admin', displayName: 'System Admin', email: 'admin@startech.com.bd', role: 'Admin', status: 'Active' },
      { uid: 'usr_seller', displayName: 'StarTech Seller', email: 'seller@startech.com.bd', role: 'Seller', status: 'Active' },
      { uid: 'usr_cust', displayName: 'Tanvir Ahmed', email: 'user@example.com', role: 'Customer', status: 'Active' }
    ];
  },

  /**
   * Update user role
   */
  async updateUserRole(uid, newRole) {
    try {
      const userRef = doc(db, 'users', uid);
      await updateDoc(userRef, { role: newRole });
    } catch (e) {}
    return { uid, role: newRole };
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
  }
};

export default adminService;
