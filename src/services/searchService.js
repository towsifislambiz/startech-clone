import productService from './productService';

const POPULAR_SEARCHES = [
  'RTX 4090',
  'iPhone 16',
  'Ryzen 7',
  'Gaming Laptop',
  '4K Monitor',
  'Apple Watch',
  'NVMe SSD',
  'Logitech Mouse',
  'Corsair RAM'
];

export const searchService = {
  /**
   * Performs instant tokenized multi-field search across Product Name, Brand, Category, SubCategory, and Model/SKU
   * @param {string} query 
   * @param {Object} options 
   * @returns {Promise<{ products: Array, suggestions: Array, total: number }>}
   */
  async search(query = '', options = {}) {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) {
      return { products: [], suggestions: [], total: 0 };
    }

    const { products: catalog } = await productService.getProducts({});
    const matchedProducts = [];

    const queryTokens = trimmed.split(/\s+/).filter(Boolean);

    catalog.forEach((prod) => {
      let score = 0;
      const name = (prod.name || '').toLowerCase();
      const brand = (prod.brand || '').toLowerCase();
      const category = (prod.category || '').toLowerCase();
      const subCategory = (prod.subCategory || '').toLowerCase();
      const model = (prod.model || prod.sku || '').toLowerCase();

      // Word tokens extracted from fields
      const allText = `${name} ${brand} ${category} ${subCategory} ${model}`;
      const wordTokens = allText.split(/[\s\-_/.,+()]+/);

      // Check matching score across query tokens
      let matchesAllTokens = true;

      for (const token of queryTokens) {
        let tokenScore = 0;

        // Word prefix match (e.g. "A" matches "Apple", "ASUS", "Acer", "AMD")
        const wordPrefixMatch = wordTokens.some((w) => w.startsWith(token));
        if (wordPrefixMatch) {
          tokenScore += 120;
        }

        // Field prefix matches
        if (name.startsWith(token)) tokenScore += 200;
        if (brand.startsWith(token)) tokenScore += 180;
        if (category.startsWith(token)) tokenScore += 140;
        if (model.startsWith(token)) tokenScore += 160;

        // Field substring matches
        if (name.includes(token)) tokenScore += 60;
        if (brand.includes(token)) tokenScore += 50;
        if (category.includes(token)) tokenScore += 40;
        if (subCategory.includes(token)) tokenScore += 45;
        if (model.includes(token)) tokenScore += 50;

        if (tokenScore === 0) {
          matchesAllTokens = false;
          break;
        }

        score += tokenScore;
      }

      if (matchesAllTokens && score > 0) {
        matchedProducts.push({ product: prod, score });
      }
    });

    // Sort by relevance score descending
    matchedProducts.sort((a, b) => b.score - a.score);
    const finalProducts = matchedProducts.map((m) => m.product);

    // Keyword Suggestions
    const suggestionsSet = new Set();
    POPULAR_SEARCHES.forEach((term) => {
      if (term.toLowerCase().includes(trimmed)) {
        suggestionsSet.add(term);
      }
    });

    catalog.forEach((prod) => {
      if (prod.brand && prod.brand.toLowerCase().includes(trimmed)) {
        suggestionsSet.add(prod.brand);
      }
      if (prod.category && prod.category.toLowerCase().includes(trimmed)) {
        suggestionsSet.add(prod.category);
      }
      if (prod.subCategory && prod.subCategory.toLowerCase().includes(trimmed)) {
        suggestionsSet.add(prod.subCategory);
      }
    });

    const suggestions = Array.from(suggestionsSet).slice(0, 6);
    const limit = options.limit || 8;

    return {
      products: finalProducts.slice(0, limit),
      suggestions,
      total: finalProducts.length
    };
  },

  getPopularSearches() {
    return POPULAR_SEARCHES;
  }
};

export default searchService;
