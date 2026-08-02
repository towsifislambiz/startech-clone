/**
 * Normalizes raw product data into a standardized Product model.
 * @param {Object} raw 
 * @returns {Object} Normalized product
 */
export const normalizeProduct = (raw = {}) => {
  const id = raw.id || raw.sku || `prod_${Math.random().toString(36).substring(2, 9)}`;
  const name = raw.name || 'Unnamed Product';
  const slug = raw.slug || name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  const sku = raw.sku || raw.code || `SKU-${id}`;
  
  const price = typeof raw.price === 'number' ? raw.price : parseFloat(raw.price || 0);
  const oldPrice = typeof raw.oldPrice === 'number' ? raw.oldPrice : (raw.specialPrice ? parseFloat(raw.specialPrice) : price);
  const specialPrice = oldPrice > price ? oldPrice : price;
  
  const discount = oldPrice > price ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;
  const saveAmount = oldPrice > price ? oldPrice - price : 0;
  
  const thumbnail = raw.thumbnail || raw.img || (raw.images && raw.images[0]) || 'https://placehold.co/600x450/081621/ffffff/png?text=StarTech+Product';
  const images = Array.isArray(raw.images) && raw.images.length > 0
    ? raw.images
    : (Array.isArray(raw.gallery) && raw.gallery.length > 0 ? raw.gallery : [thumbnail]);

  const category = raw.category || 'Components';
  const categorySlug = raw.categorySlug || category.toLowerCase().replace(/[^a-z0-9]+/g, '-');
  const subCategory = raw.subCategory || '';
  const subCategorySlug = raw.subCategorySlug || (subCategory ? subCategory.toLowerCase().replace(/[^a-z0-9]+/g, '-') : '');
  
  const brand = raw.brand || 'StarTech';
  const brandSlug = raw.brandSlug || brand.toLowerCase().replace(/[^a-z0-9]+/g, '-');

  const stock = raw.stock || (raw.stockCount === 0 ? 'Out of Stock' : 'In Stock');
  const stockCount = typeof raw.stockCount === 'number' ? raw.stockCount : (stock === 'Out of Stock' ? 0 : 25);
  
  const rating = typeof raw.rating === 'number' ? raw.rating : 4.8;
  const reviewsCount = typeof raw.reviewsCount === 'number' ? raw.reviewsCount : (typeof raw.reviews === 'number' ? raw.reviews : 12);
  const reviewsList = Array.isArray(raw.reviewsList) ? raw.reviewsList : [
    { id: 1, author: 'Tanvir A.', rating: 5, date: '2 days ago', comment: 'Authentic product with official warranty. Extremely fast shipping!', verified: true },
    { id: 2, author: 'Rahim K.', rating: 5, date: '1 week ago', comment: 'Top tier build quality and amazing performance. Value for money.', verified: true },
    { id: 3, author: 'Sadia M.', rating: 4, date: '2 weeks ago', comment: 'Works great! Good packaging from StarTech.', verified: true },
  ];

  const keyFeatures = Array.isArray(raw.keyFeatures) ? raw.keyFeatures : [
    'Official Brand Warranty included',
    'High reliability & maximum performance',
    '100% Genuine product guaranteed by StarTech'
  ];

  const specifications = raw.specifications || raw.specs || {
    'General': {
      'Brand': brand,
      'Model': name.split(' ')[0] || 'Standard',
      'Warranty': raw.warranty || '3 Years Official Warranty'
    }
  };

  const description = raw.description || `The ${name} is engineered to deliver exceptional performance and reliability. Featuring modern technology, premium components, and official manufacturer warranty, it is built to fulfill all high-performance requirements.`;
  const warranty = raw.warranty || '3 Years Official Warranty';

  const variants = Array.isArray(raw.variants) ? raw.variants : [];
  const emiPerMonth = Math.round(price / 12);

  return {
    id,
    name,
    slug,
    sku,
    price,
    oldPrice,
    specialPrice,
    discount,
    saveAmount,
    images,
    thumbnail,
    category,
    categorySlug,
    subCategory,
    subCategorySlug,
    brand,
    brandSlug,
    stock,
    stockCount,
    rating,
    reviewsCount,
    reviewsList,
    keyFeatures,
    specifications,
    description,
    warranty,
    variants,
    emiPerMonth
  };
};
