import { normalizeProduct } from '../models/productModel';

const img = (label, bg = '081621') =>
  `https://placehold.co/600x480/${bg}/ffffff/png?text=${encodeURIComponent(label)}&font=montserrat`;

const RAW_PRODUCTS = [
  {
    id: '1',
    name: 'ASUS ROG Strix GeForce RTX 4090 OC Edition 24GB GDDR6X Graphics Card',
    slug: 'asus-rog-strix-rtx-4090-24gb',
    sku: 'GPU-RTX4090-ROG',
    price: 215000,
    oldPrice: 245000,
    category: 'Component',
    categorySlug: 'component',
    subCategory: 'Graphics Card',
    subCategorySlug: 'graphics-card',
    brand: 'ASUS',
    brandSlug: 'asus',
    stock: 'In Stock',
    stockCount: 18,
    rating: 4.9,
    reviewsCount: 245,
    isFeatured: true,
    isTrending: true,
    isBestSeller: true,
    isLatest: true,
    thumbnail: img('ASUS RTX 4090', '0a5c2e'),
    images: [
      img('ASUS RTX 4090 · Front', '0a5c2e'),
      img('ASUS RTX 4090 · Back', '0f2742'),
      img('ASUS RTX 4090 · Ports', '4a1d96'),
      img('ASUS RTX 4090 · Box', '111827'),
    ],
    keyFeatures: [
      'NVIDIA Ada Lovelace Architecture',
      '24GB GDDR6X 384-bit Memory',
      'Boost Clock: 2640 MHz (OC Mode)',
      '16384 CUDA Cores',
      'DLSS 3 & Full Ray Tracing Support',
      '3.5-slot Design with Triple Axial-tech Fans'
    ],
    warranty: '3 Years Official Brand Warranty',
    variants: [
      { id: 'v1', name: '24GB OC Edition', price: 215000, oldPrice: 245000, stock: 'In Stock', sku: 'GPU-RTX4090-ROG-OC' },
      { id: 'v2', name: '24GB White Edition', price: 222000, oldPrice: 250000, stock: 'Limited Stock', sku: 'GPU-RTX4090-ROG-W' }
    ],
    specifications: {
      'General': { 'Brand': 'ASUS', 'Model': 'ROG Strix RTX 4090 OC', 'Series': 'ROG Strix' },
      'Memory': { 'Memory Size': '24GB', 'Memory Type': 'GDDR6X', 'Bus Width': '384-bit' },
      'Performance': { 'CUDA Cores': '16384', 'Boost Clock': '2640 MHz', 'Base Clock': '2235 MHz' },
      'Connectivity': { 'Interface': 'PCIe 4.0 x16', 'Outputs': '2x HDMI 2.1a, 3x DisplayPort 1.4a' }
    }
  },
  {
    id: '2',
    name: 'Intel Core i9-14900K 14th Gen Processor',
    slug: 'intel-core-i9-14900k-processor',
    sku: 'CPU-INTEL-14900K',
    price: 68500,
    oldPrice: 74000,
    category: 'Component',
    categorySlug: 'component',
    subCategory: 'Processor',
    subCategorySlug: 'processor',
    brand: 'Intel',
    brandSlug: 'intel',
    stock: 'In Stock',
    stockCount: 30,
    rating: 4.8,
    reviewsCount: 189,
    isFeatured: true,
    isLatest: true,
    thumbnail: img('Intel i9-14900K', '0f2742'),
    images: [
      img('Intel i9-14900K · Box', '0f2742'),
      img('Intel i9-14900K · Chip Front', '1a4a7a')
    ],
    keyFeatures: [
      '24 Cores (8 Performance + 16 Efficient)',
      '32 Threads, up to 6.0 GHz Max Turbo Frequency',
      'Intel Smart Cache: 36MB',
      'Socket LGA1700, PCIe 5.0 & DDR5 Support'
    ],
    warranty: '3 Years Warranty',
    specifications: {
      'General': { 'Brand': 'Intel', 'Generation': '14th Gen', 'Socket': 'LGA 1700' },
      'Cores & Clock': { 'P-Cores': '8', 'E-Cores': '16', 'Threads': '32', 'Max Clock': '6.0 GHz' }
    }
  },
  {
    id: '3',
    name: 'Samsung 990 PRO 2TB NVMe M.2 PCIe 4.0 SSD',
    slug: 'samsung-990-pro-2tb-nvme-ssd',
    sku: 'SSD-SAMSUNG-990P-2TB',
    price: 24500,
    oldPrice: 28000,
    category: 'Component',
    categorySlug: 'component',
    subCategory: 'Storage',
    subCategorySlug: 'storage',
    brand: 'Samsung',
    brandSlug: 'samsung',
    stock: 'In Stock',
    stockCount: 45,
    rating: 4.9,
    reviewsCount: 523,
    isBestSeller: true,
    thumbnail: img('Samsung 990 PRO 2TB', '1a4a7a'),
    images: [
      img('Samsung 990 PRO 2TB', '1a4a7a')
    ],
    keyFeatures: [
      'Sequential Read speed up to 7,450 MB/s',
      'Sequential Write speed up to 6,900 MB/s',
      'V-NAND TLC technology & Thermal Guard',
      'Ideal for heavy gaming and 4K editing'
    ],
    warranty: '5 Years Warranty'
  },
  {
    id: '4',
    name: 'MSI Katana 17 B13VGK Core i7 13th Gen RTX 4070 Gaming Laptop',
    slug: 'msi-katana-17-rtx-4070-laptop',
    sku: 'LAP-MSI-KAT17-4070',
    price: 165000,
    oldPrice: 180000,
    category: 'Laptop',
    categorySlug: 'laptop',
    subCategory: 'Gaming Laptop',
    subCategorySlug: 'gaming-laptop',
    brand: 'MSI',
    brandSlug: 'msi',
    stock: 'In Stock',
    stockCount: 8,
    rating: 4.7,
    reviewsCount: 98,
    isFeatured: true,
    isTrending: true,
    thumbnail: img('MSI Katana 17 Laptop', '0f2742'),
    images: [
      img('MSI Katana 17 · Front View', '0f2742'),
      img('MSI Katana 17 · Open Display', '111827'),
      img('MSI Katana 17 · Keyboard RGB', 'D51E0B')
    ],
    keyFeatures: [
      'Intel Core i7-13620H 10-Core Processor',
      'NVIDIA GeForce RTX 4070 8GB GDDR6',
      '17.3" FHD (1920x1080) 144Hz IPS Display',
      '16GB DDR5 RAM & 1TB NVMe M.2 SSD',
      'Cooler Boost 5 Thermal Cooling System'
    ],
    warranty: '2 Years International Warranty',
    variants: [
      { id: 'v1', name: '16GB RAM / 1TB SSD', price: 165000, oldPrice: 180000, stock: 'In Stock', sku: 'LAP-MSI-16GB' },
      { id: 'v2', name: '32GB RAM / 2TB SSD', price: 182000, oldPrice: 198000, stock: 'Limited Stock', sku: 'LAP-MSI-32GB' }
    ]
  },
  {
    id: '5',
    name: 'LG UltraGear 27GR93U-B 27" 4K UHD 144Hz IPS Gaming Monitor',
    slug: 'lg-ultragear-27-4k-144hz-monitor',
    sku: 'MON-LG-27GR93U',
    price: 64500,
    oldPrice: 72000,
    category: 'Monitor',
    categorySlug: 'monitor',
    subCategory: 'Gaming Monitor',
    subCategorySlug: 'gaming-monitor',
    brand: 'LG',
    brandSlug: 'lg',
    stock: 'In Stock',
    stockCount: 14,
    rating: 4.8,
    reviewsCount: 167,
    isFeatured: true,
    isTrending: true,
    thumbnail: img('LG UltraGear 27" 4K', 'be123c'),
    images: [
      img('LG UltraGear 27" Front', 'be123c'),
      img('LG UltraGear 27" Back Hexagon', '111827')
    ],
    keyFeatures: [
      '27" 4K UHD (3840x2160) Nano IPS Panel',
      '144Hz Refresh Rate & 1ms (GtG) Response Time',
      'NVIDIA G-Sync Compatible & AMD FreeSync Premium',
      'VESA DisplayHDR 400 & DCI-P3 95% Color Gamut'
    ],
    warranty: '3 Years Warranty'
  },
  {
    id: '6',
    name: 'AMD Ryzen 7 7800X3D Gaming Processor',
    slug: 'amd-ryzen-7-7800x3d-processor',
    sku: 'CPU-AMD-7800X3D',
    price: 45000,
    oldPrice: 50000,
    category: 'Component',
    categorySlug: 'component',
    subCategory: 'Processor',
    subCategorySlug: 'processor',
    brand: 'AMD',
    brandSlug: 'amd',
    stock: 'In Stock',
    stockCount: 20,
    rating: 4.9,
    reviewsCount: 312,
    isBestSeller: true,
    isTrending: true,
    thumbnail: img('AMD Ryzen 7 7800X3D', 'a01406'),
    images: [
      img('AMD Ryzen 7 7800X3D Box', 'a01406')
    ],
    keyFeatures: [
      '8 Cores & 16 Threads with 3D V-Cache Technology',
      'Max Boost Clock: up to 5.0 GHz',
      'Massive 96MB L3 Cache for Ultimate Gaming',
      'AM5 Platform, PCIe 5.0 & DDR5 Memory Support'
    ],
    warranty: '3 Years Warranty'
  },
  {
    id: '7',
    name: 'Gigabyte GeForce RTX 4070 Ti EAGLE OC 12GB Graphics Card',
    slug: 'gigabyte-rtx-4070-ti-eagle-12gb',
    sku: 'GPU-RTX4070TI-GIG',
    price: 95000,
    oldPrice: 105000,
    category: 'Component',
    categorySlug: 'component',
    subCategory: 'Graphics Card',
    subCategorySlug: 'graphics-card',
    brand: 'Gigabyte',
    brandSlug: 'gigabyte',
    stock: 'In Stock',
    stockCount: 10,
    rating: 4.7,
    reviewsCount: 142,
    isLatest: true,
    thumbnail: img('Gigabyte RTX 4070 Ti', '0a5c2e'),
    images: [
      img('Gigabyte RTX 4070 Ti', '0a5c2e')
    ],
    keyFeatures: [
      'NVIDIA DLSS 3 & Ada Lovelace Architecture',
      '12GB GDDR6X 192-bit Memory',
      'WINDFORCE 3X Cooling System',
      'RGB Fusion 2.0 & Dual BIOS'
    ],
    warranty: '3 Years Warranty'
  },
  {
    id: '8',
    name: 'Logitech MX Master 3S Performance Wireless Mouse',
    slug: 'logitech-mx-master-3s-mouse',
    sku: 'ACC-LOGI-MX3S',
    price: 11500,
    oldPrice: 13000,
    category: 'Accessories',
    categorySlug: 'accessories',
    subCategory: 'Mouse',
    subCategorySlug: 'mouse',
    brand: 'Logitech',
    brandSlug: 'logitech',
    stock: 'In Stock',
    stockCount: 50,
    rating: 4.8,
    reviewsCount: 589,
    isBestSeller: true,
    thumbnail: img('Logitech MX Master 3S', '374151'),
    images: [
      img('Logitech MX Master 3S', '374151')
    ],
    keyFeatures: [
      '8,000 DPI Darkfield Optical Sensor (tracks on glass)',
      'Quiet Clicks technology (90% noise reduction)',
      'MagSpeed Electromagnetic Scrolling (1000 lines/sec)',
      'Ergonomic contour design & multi-device Flow control'
    ],
    warranty: '1 Year Warranty'
  },
  {
    id: '9',
    name: 'Corsair Vengeance RGB 32GB (2x16GB) DDR5 6000MHz CL36 RAM',
    slug: 'corsair-vengeance-rgb-32gb-ddr5',
    sku: 'RAM-CORSAIR-DDR5-32G',
    price: 14500,
    oldPrice: 16500,
    category: 'Component',
    categorySlug: 'component',
    subCategory: 'RAM',
    subCategorySlug: 'ram',
    brand: 'Corsair',
    brandSlug: 'corsair',
    stock: 'In Stock',
    stockCount: 60,
    rating: 4.8,
    reviewsCount: 412,
    isTrending: true,
    thumbnail: img('Corsair Vengeance 32GB', '4a1d96'),
    images: [
      img('Corsair Vengeance 32GB', '4a1d96')
    ],
    keyFeatures: [
      '32GB Kit (2 x 16GB) DDR5 6000MHz Speed',
      'Dynamic Ten-Zone RGB Lighting',
      'Intel XMP 3.0 & AMD EXPO Ready',
      'Solid Aluminum Heatspreader'
    ],
    warranty: 'Lifetime Warranty'
  },
  {
    id: '10',
    name: 'NZXT H7 Flow RGB Tempered Glass Mid-Tower PC Case',
    slug: 'nzxt-h7-flow-rgb-pc-case',
    sku: 'CASE-NZXT-H7FLOW-RGB',
    price: 13500,
    oldPrice: 15000,
    category: 'Desktop',
    categorySlug: 'desktop',
    subCategory: 'Casing',
    subCategorySlug: 'casing',
    brand: 'NZXT',
    brandSlug: 'nzxt',
    stock: 'Limited Stock',
    stockCount: 4,
    rating: 4.6,
    reviewsCount: 143,
    isLatest: true,
    thumbnail: img('NZXT H7 Flow RGB Case', '374151'),
    images: [
      img('NZXT H7 Flow RGB Case', '374151')
    ],
    keyFeatures: [
      'Perforated front panel for maximum ventilation',
      'Includes 3 Pre-Installed 140mm Core RGB Fans',
      'Tempered Glass Side Panel',
      'Intuitive Cable Management Channels'
    ],
    warranty: '2 Years Warranty'
  }
];

// Normalize catalog dynamically
const CATALOG = RAW_PRODUCTS.map(normalizeProduct);

export const productService = {
  /**
   * Dynamically query products from catalog
   */
  async getProducts(params = {}) {
    let list = [...CATALOG];

    if (params.category) {
      const catTarget = params.category.toLowerCase();
      list = list.filter((p) => p.categorySlug === catTarget || p.category.toLowerCase() === catTarget);
    }

    if (params.subCategory) {
      const subTarget = params.subCategory.toLowerCase();
      list = list.filter((p) => p.subCategorySlug === subTarget || p.subCategory.toLowerCase() === subTarget);
    }

    if (params.brand) {
      const brandTarget = params.brand.toLowerCase();
      list = list.filter((p) => p.brandSlug === brandTarget || p.brand.toLowerCase() === brandTarget);
    }

    if (Array.isArray(params.brands) && params.brands.length > 0) {
      const brandLower = params.brands.map((b) => b.toLowerCase());
      list = list.filter((p) => brandLower.includes(p.brand.toLowerCase()) || brandLower.includes(p.brandSlug));
    }

    if (params.inStockOnly) {
      list = list.filter((p) => p.stock === 'In Stock');
    }

    if (params.minRating) {
      list = list.filter((p) => p.rating >= params.minRating);
    }

    if (typeof params.minPrice === 'number') {
      list = list.filter((p) => p.price >= params.minPrice);
    }
    if (typeof params.maxPrice === 'number') {
      list = list.filter((p) => p.price <= params.maxPrice);
    }

    if (params.query) {
      const q = params.query.toLowerCase().trim();
      list = list.filter((p) =>
        p.name.toLowerCase().includes(q) ||
        p.brand.toLowerCase().includes(q) ||
        p.category.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q)
      );
    }

    if (params.sort) {
      switch (params.sort) {
        case 'price_low': list.sort((a, b) => a.price - b.price); break;
        case 'price_high': list.sort((a, b) => b.price - a.price); break;
        case 'rating': list.sort((a, b) => b.rating - a.rating); break;
        case 'newest': list.sort((a, b) => b.id - a.id); break;
        case 'discount': list.sort((a, b) => b.discount - a.discount); break;
        default: list.sort((a, b) => b.reviewsCount - a.reviewsCount);
      }
    }

    return {
      products: list,
      total: list.length
    };
  },

  async getProduct(idOrSlug) {
    if (!idOrSlug) return null;
    const target = String(idOrSlug).toLowerCase();
    const found = CATALOG.find((p) => String(p.id).toLowerCase() === target || p.slug.toLowerCase() === target);
    return found || CATALOG[0];
  },

  async getProductsByCategory(categorySlug) {
    const res = await this.getProducts({ category: categorySlug });
    return res.products;
  },

  async getProductsByBrand(brandSlug) {
    const res = await this.getProducts({ brand: brandSlug });
    return res.products;
  },

  async getFeaturedProducts() {
    return CATALOG.filter((p) => p.discount > 0 || p.price > 50000 || p.isFeatured).slice(0, 8);
  },

  async getLatestProducts() {
    return CATALOG.slice(0, 8);
  },

  async getTrendingProducts() {
    return CATALOG.filter((p) => p.rating >= 4.7).slice(0, 8);
  },

  async getBestSellingProducts() {
    return CATALOG.filter((p) => p.reviewsCount > 150).slice(0, 8);
  },

  async getTopRatedProducts() {
    return CATALOG.filter((p) => p.rating >= 4.8).slice(0, 8);
  },

  async getRelatedProducts(currentId, category, brand, price) {
    const cid = String(currentId);
    let related = CATALOG.filter((p) => String(p.id) !== cid);

    if (category) {
      const sameCat = related.filter((p) => p.category.toLowerCase() === String(category).toLowerCase());
      if (sameCat.length >= 4) return sameCat.slice(0, 4);
    }

    if (brand) {
      const sameBrand = related.filter((p) => p.brand.toLowerCase() === String(brand).toLowerCase());
      if (sameBrand.length >= 4) return sameBrand.slice(0, 4);
    }

    return related.slice(0, 4);
  },

  async getBrands() {
    const brandMap = {};
    CATALOG.forEach((p) => {
      if (!brandMap[p.brand]) {
        brandMap[p.brand] = {
          name: p.brand,
          slug: p.brandSlug,
          count: 0,
          logo: `https://placehold.co/160x80/081621/ffffff/png?text=${encodeURIComponent(p.brand)}&font=montserrat`
        };
      }
      brandMap[p.brand].count += 1;
    });
    return Object.values(brandMap);
  },

  async getCategories() {
    const catMap = {};
    CATALOG.forEach((p) => {
      if (!catMap[p.category]) {
        catMap[p.category] = {
          name: p.category,
          slug: p.categorySlug,
          count: 0,
          subCategories: []
        };
      }
      catMap[p.category].count += 1;
      if (p.subCategory && !catMap[p.category].subCategories.includes(p.subCategory)) {
        catMap[p.category].subCategories.push(p.subCategory);
      }
    });
    return Object.values(catMap);
  }
};

export default productService;
