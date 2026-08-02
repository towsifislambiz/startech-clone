/**
 * Format currency price in Bangladeshi Taka (৳)
 * @param {number} amount
 * @returns {string}
 */
export const formatPrice = (amount) => {
  if (amount === undefined || amount === null || isNaN(amount)) return '৳0';
  return '৳' + Number(amount).toLocaleString('en-IN');
};

/**
 * Format number with comma separation
 * @param {number} num
 * @returns {string}
 */
export const formatNumber = (num) => {
  if (!num && num !== 0) return '0';
  return Number(num).toLocaleString('en-IN');
};

/**
 * Calculate discount percentage
 * @param {number} originalPrice
 * @param {number} currentPrice
 * @returns {number}
 */
export const calculateDiscount = (originalPrice, currentPrice) => {
  if (!originalPrice || !currentPrice || originalPrice <= currentPrice) return 0;
  return Math.round(((originalPrice - currentPrice) / originalPrice) * 100);
};
