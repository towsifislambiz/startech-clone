/**
 * Review Model Factory
 */
export const createReviewModel = (data = {}) => ({
  id: data.id || null,
  productId: data.productId || null,
  userName: data.userName || 'Anonymous',
  rating: data.rating || 5,
  comment: data.comment || '',
  createdAt: data.createdAt || new Date().toISOString(),
});

export default createReviewModel;
