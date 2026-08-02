export const SHIPPING_RATES = {
  dhaka: { label: 'Inside Dhaka', fee: 60 },
  outside: { label: 'Outside Dhaka', fee: 120 },
  express: { label: 'Express Delivery (Same Day)', fee: 200 }
};

export const FREE_SHIPPING_THRESHOLD = 50000;
export const VAT_RATE = 0.05; // 5% VAT

export const cartService = {
  /**
   * Compute complete price summary for cart items
   */
  calculateTotals(items = [], shippingRegion = 'dhaka', coupon = null) {
    if (!Array.isArray(items) || items.length === 0) {
      return {
        subtotal: 0,
        totalSavings: 0,
        shippingFee: 0,
        vatAmount: 0,
        couponDiscount: 0,
        grandTotal: 0,
        itemCount: 0
      };
    }

    let subtotal = 0;
    let totalSavings = 0;
    let itemCount = 0;

    items.forEach((item) => {
      const price = item.price || item.selling_price || 0;
      const oldPrice = item.oldPrice || price;
      const qty = item.quantity || item.qty || 1;

      subtotal += price * qty;
      totalSavings += Math.max(0, oldPrice - price) * qty;
      itemCount += qty;
    });

    // 1. Calculate Shipping
    let shippingFee = SHIPPING_RATES[shippingRegion]?.fee || 60;
    if (subtotal >= FREE_SHIPPING_THRESHOLD || coupon?.type === 'free_shipping') {
      shippingFee = 0;
    }

    // 2. Calculate Coupon Discount
    let couponDiscount = 0;
    if (coupon && typeof coupon === 'object') {
      if (coupon.type === 'percentage') {
        couponDiscount = Math.round((subtotal * coupon.value) / 100);
      } else if (coupon.type === 'fixed') {
        couponDiscount = Math.min(subtotal, coupon.value);
      }
    }

    // 3. Calculate VAT (5% on net amount after coupon)
    const netAmount = Math.max(0, subtotal - couponDiscount);
    const vatAmount = Math.round(netAmount * VAT_RATE);

    // 4. Calculate Grand Total
    const grandTotal = netAmount + shippingFee + vatAmount;

    return {
      subtotal,
      totalSavings: totalSavings + couponDiscount,
      shippingFee,
      vatAmount,
      couponDiscount,
      grandTotal,
      itemCount
    };
  }
};

export default cartService;
