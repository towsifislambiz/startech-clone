/**
 * Product Data Model Factory
 */
export const createProductModel = (data = {}) => ({
  id: data.id || null,
  name: data.name || '',
  slug: data.slug || '',
  brand: data.brand || '',
  categoryId: data.categoryId || null,
  price: data.price || 0,
  oldPrice: data.oldPrice || 0,
  stock: data.stock ?? true,
  rating: data.rating || 0,
  reviewsCount: data.reviewsCount || 0,
  featuredImage: data.featuredImage || data.img || '',
  gallery: data.gallery || [],
  specs: data.specs || {},
  description: data.description || '',
  warranty: data.warranty || '',
  createdAt: data.createdAt || new Date().toISOString(),
});

export default createProductModel;
