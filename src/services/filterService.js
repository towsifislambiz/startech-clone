export const SORT_OPTIONS = [
  { value: 'popular', label: 'Most Popular' },
  { value: 'featured', label: 'Featured Items' },
  { value: 'newest', label: 'New Arrivals' },
  { value: 'bestseller', label: 'Best Selling' },
  { value: 'price_low', label: 'Price: Low → High' },
  { value: 'price_high', label: 'Price: High → Low' },
  { value: 'rating', label: 'Highest Rated' },
  { value: 'reviews', label: 'Most Reviewed' },
  { value: 'discount', label: 'Highest Discount' },
  { value: 'name_asc', label: 'Name: A → Z' },
  { value: 'name_desc', label: 'Name: Z → A' },
];

export const filterService = {
  /**
   * Filter and sort an array of normalized product items
   * @param {Array} products 
   * @param {Object} filters 
   * @param {string} sort 
   * @returns {Array} Filtered and sorted products
   */
  applyFiltersAndSort(products = [], filters = {}, sort = 'popular') {
    if (!Array.isArray(products)) return [];

    let list = [...products];

    // 1. Categories Filter (Multi-category support)
    if (Array.isArray(filters.categories) && filters.categories.length > 0) {
      const lowerCats = filters.categories.map((c) => c.toLowerCase());
      list = list.filter((p) =>
        lowerCats.includes(p.categorySlug) ||
        lowerCats.includes(p.category.toLowerCase()) ||
        (p.subCategory && lowerCats.includes(p.subCategorySlug))
      );
    }

    // 2. Brands Filter (Multi-brand support)
    if (Array.isArray(filters.brands) && filters.brands.length > 0) {
      const lowerBrands = filters.brands.map((b) => b.toLowerCase());
      list = list.filter((p) =>
        lowerBrands.includes(p.brandSlug) ||
        lowerBrands.includes(p.brand.toLowerCase())
      );
    }

    // 3. Price Range Filter
    if (typeof filters.minPrice === 'number' && !isNaN(filters.minPrice)) {
      list = list.filter((p) => p.price >= filters.minPrice);
    }
    if (typeof filters.maxPrice === 'number' && !isNaN(filters.maxPrice)) {
      list = list.filter((p) => p.price <= filters.maxPrice);
    }

    // 4. Availability Filter
    if (Array.isArray(filters.availability) && filters.availability.length > 0) {
      list = list.filter((p) => filters.availability.includes(p.stock));
    } else if (filters.inStockOnly) {
      list = list.filter((p) => p.stock === 'In Stock');
    }

    // 5. Minimum Rating Filter
    if (typeof filters.minRating === 'number' && filters.minRating > 0) {
      list = list.filter((p) => p.rating >= filters.minRating);
    }

    // 6. Minimum Discount Filter
    if (typeof filters.minDiscount === 'number' && filters.minDiscount > 0) {
      list = list.filter((p) => p.discount >= filters.minDiscount);
    }

    // 7. Specifications Filters (Dynamic specs matching)
    if (filters.specFilters && typeof filters.specFilters === 'object') {
      Object.entries(filters.specFilters).forEach(([specKey, specVal]) => {
        if (specVal) {
          const lowerKey = specKey.toLowerCase();
          const lowerVal = String(specVal).toLowerCase();

          list = list.filter((p) => {
            // Check specs groups object
            let foundMatch = false;
            if (p.specifications && typeof p.specifications === 'object') {
              Object.values(p.specifications).forEach((groupFields) => {
                if (groupFields && typeof groupFields === 'object') {
                  Object.entries(groupFields).forEach(([k, v]) => {
                    if (k.toLowerCase() === lowerKey && String(v).toLowerCase().includes(lowerVal)) {
                      foundMatch = true;
                    }
                  });
                }
              });
            }

            // Also check key features list
            if (!foundMatch && Array.isArray(p.keyFeatures)) {
              foundMatch = p.keyFeatures.some((f) => f.toLowerCase().includes(lowerVal));
            }

            return foundMatch;
          });
        }
      });
    }

    // 8. Sorting System (12 options)
    switch (sort) {
      case 'price_low':
        list.sort((a, b) => a.price - b.price);
        break;
      case 'price_high':
        list.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        list.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'discount':
        list.sort((a, b) => (b.discount || 0) - (a.discount || 0));
        break;
      case 'name_asc':
        list.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'name_desc':
        list.sort((a, b) => b.name.localeCompare(a.name));
        break;
      case 'newest':
        list.sort((a, b) => String(b.id).localeCompare(String(a.id)));
        break;
      case 'bestseller':
        list.sort((a, b) => (b.reviewsCount || 0) - (a.reviewsCount || 0));
        break;
      case 'featured':
      case 'popular':
      default:
        list.sort((a, b) => (b.rating || 0) * (b.reviewsCount || 0) - (a.rating || 0) * (a.reviewsCount || 0));
        break;
    }

    return list;
  },

  /**
   * Extract dynamic specification filter options available from a given product list
   */
  extractAvailableSpecs(products = []) {
    const specMap = {
      'Processor': new Set(),
      'RAM': new Set(),
      'Storage': new Set(),
      'Graphics Card': new Set(),
      'Warranty': new Set()
    };

    products.forEach((p) => {
      if (p.specifications && typeof p.specifications === 'object') {
        Object.values(p.specifications).forEach((groupFields) => {
          if (groupFields && typeof groupFields === 'object') {
            Object.entries(groupFields).forEach(([k, v]) => {
              if (specMap[k] && v) {
                specMap[k].add(String(v));
              }
            });
          }
        });
      }
    });

    const result = {};
    Object.entries(specMap).forEach(([k, set]) => {
      if (set.size > 0) {
        result[k] = Array.from(set);
      }
    });

    return result;
  }
};

export default filterService;
