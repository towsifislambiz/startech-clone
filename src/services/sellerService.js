import { db, collection, addDoc, serverTimestamp } from '../firebase/config';
import productService from './productService';

const getStoredProducts = async () => {
  try {
    const saved = localStorage.getItem('startech-seller-products');
    if (saved) return JSON.parse(saved);
    const catalog = await productService.getProducts();
    return catalog.products || [];
  } catch (e) {
    const catalog = await productService.getProducts();
    return catalog.products || [];
  }
};

const saveStoredProducts = (products) => {
  try {
    localStorage.setItem('startech-seller-products', JSON.stringify(products));
  } catch (e) {}
};

export const sellerService = {
  /**
   * Get products for current seller
   */
  async getProducts(sellerId) {
    return await getStoredProducts();
  },

  /**
   * Add a new product listing
   */
  async addProduct(productData) {
    const products = await getStoredProducts();
    const newProd = {
      id: `prod_${Date.now()}`,
      created_at: new Date().toISOString(),
      quantity_in_stock: Number(productData.quantity_in_stock || 10),
      selling_price: Number(productData.selling_price || productData.price || 0),
      price: Number(productData.selling_price || productData.price || 0),
      is_featured: false,
      rating: 5,
      reviews_count: 0,
      ...productData
    };

    const updated = [newProd, ...products];
    saveStoredProducts(updated);

    try {
      await addDoc(collection(db, 'products'), {
        ...newProd,
        timestamp: serverTimestamp()
      });
    } catch (e) {}

    return newProd;
  },

  /**
   * Update existing product listing
   */
  async updateProduct(id, productData) {
    const products = await getStoredProducts();
    const updated = products.map((p) => (p.id === id ? { ...p, ...productData } : p));
    saveStoredProducts(updated);
    return updated;
  },

  /**
   * Delete product listing
   */
  async deleteProduct(id) {
    const products = await getStoredProducts();
    const updated = products.filter((p) => p.id !== id);
    saveStoredProducts(updated);
    return updated;
  }
};

export default sellerService;
