const AVAILABLE_COUPONS = [
  {
    code: 'STARTECH10',
    type: 'percentage',
    value: 10,
    minSubtotal: 5000,
    description: '10% discount on orders over ৳5,000'
  },
  {
    code: 'GAMER500',
    type: 'fixed',
    value: 500,
    minSubtotal: 10000,
    description: '৳500 flat discount on orders over ৳10,000'
  },
  {
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    minSubtotal: 0,
    description: 'Free shipping on any order'
  }
];

export const couponService = {
  /**
   * Validates a coupon code against current subtotal
   * @param {string} code 
   * @param {number} subtotal 
   * @returns {{ success: boolean, coupon?: Object, message: string }}
   */
  validateCoupon(code = '', subtotal = 0) {
    if (!code || !code.trim()) {
      return { success: false, message: 'Please enter a coupon code.' };
    }

    const upperCode = code.trim().toUpperCase();
    const found = AVAILABLE_COUPONS.find((c) => c.code === upperCode);

    if (!found) {
      return { success: false, message: `Invalid coupon code "${upperCode}". Try STARTECH10, GAMER500, or FREESHIP.` };
    }

    if (subtotal < found.minSubtotal) {
      return {
        success: false,
        message: `Coupon "${upperCode}" requires a minimum order of ৳${found.minSubtotal.toLocaleString('en-IN')}.`
      };
    }

    return {
      success: true,
      coupon: found,
      message: `Coupon "${upperCode}" applied successfully! (${found.description})`
    };
  },

  getAvailableCoupons() {
    return AVAILABLE_COUPONS;
  }
};

export default couponService;
