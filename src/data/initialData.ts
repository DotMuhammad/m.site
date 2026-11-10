import { Product, Coupon, StoreSettings, Order, NotificationItem } from '../types';

export const HERO_IMAGE = '/src/assets/images/hero_rose_atelier_collection_1794291819360.jpg';

export const INITIAL_PRODUCTS: Product[] = [
  {
    id: 'prod-001',
    name: 'Rose Éclat Eau de Parfum',
    slug: 'rose-eclat-eau-de-parfum',
    subtitle: 'Damask Rose, Pink Peppercorn & White Amber Flacon',
    price: 185,
    originalPrice: 220,
    category: 'Fragrance',
    subcategory: 'Haute Parfumerie',
    description: 'An intoxicating celebration of May roses harvested at dawn in Grasse, blended with sparkling pink peppercorn, luminous Bulgarian rose essence, and a sensual base of golden benzoin and cashmere amber.',
    details: [
      'Handcrafted flacon with 18k rose gold plated stopper',
      'Concentration: Eau de Parfum (22% pure perfume oils)',
      'Top Notes: Pink Peppercorn, Lychee, Morning Rose Dew',
      'Heart Notes: Grasse Centifolia Rose, Moroccan Rose Absolute, White Peony',
      'Base Notes: Cashmere Woods, Golden Benzoin, Sensual Amber',
      'Cruelty-free & phthalate-free luxury formulation'
    ],
    ingredients: 'Alcohol Denat., Parfum (Fragrance), Aqua (Water), Rosa Damascena Flower Oil, Linalool, Citronellol, Geraniol, Limonene, Benzyl Benzoate, Eugenol.',
    rating: 4.9,
    reviewsCount: 148,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    stock: 24,
    images: [
      '/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg',
      '/src/assets/images/hero_rose_atelier_collection_1794291819360.jpg'
    ],
    sizes: ['50ml / 1.7 fl oz', '100ml / 3.4 fl oz'],
    colors: [
      { name: 'Rose Gold Flacon', hex: '#d49b9b' },
      { name: 'Crystal Noir Flacon', hex: '#2b2124' }
    ],
    tags: ['Best Seller', 'Signature Scent', 'Grasse Rose', 'Vegan']
  },
  {
    id: 'prod-002',
    name: 'Rose Quartz Radiance Elixir',
    slug: 'rose-quartz-radiance-elixir',
    subtitle: 'Cellular Renewal Face Oil with Bulgarian Rose & Bakuchiol',
    price: 135,
    originalPrice: 160,
    category: 'Skincare',
    subcategory: 'Serums & Elixirs',
    description: 'A transformative botanical facial serum enriched with cold-pressed rosehip seed oil, youth-boosting bakuchiol, and micro-powdered genuine rose quartz crystal to stimulate collagen, soothe inflammation, and bestow an ethereal, lit-from-within glow.',
    details: [
      'Clinically tested for 72-hour moisture lock and barrier repair',
      'Infused with 100% pure organic Bulgarian Rosa Damascena',
      'Fast-absorbing velvet finish with zero greasy residue',
      'Dropper delivers micro-metered daily dosage',
      'Dermatologist tested for sensitive skin'
    ],
    ingredients: 'Rosa Canina (Rosehip) Seed Oil, Squalane, Simmondsia Chinensis (Jojoba) Oil, Bakuchiol, Rosa Damascena Flower Extract, Rose Quartz Extract, Tocopherol (Vitamin E), Pelargonium Graveolens Flower Oil.',
    rating: 4.95,
    reviewsCount: 212,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    stock: 38,
    images: [
      '/src/assets/images/product_skincare_rose_elixir_1794291820049.jpg'
    ],
    sizes: ['30ml / 1.0 fl oz', '50ml / 1.7 fl oz'],
    tags: ['Clean Beauty', 'Dermatologist Tested', 'Organic']
  },
  {
    id: 'prod-003',
    name: 'Morganite Imperial Cocktail Ring',
    slug: 'morganite-imperial-cocktail-ring',
    subtitle: '3.5 Carat Emerald-Cut Morganite in 18K Rose Gold & Pavé Diamonds',
    price: 1250,
    originalPrice: 1450,
    category: 'Fine Jewelry',
    subcategory: 'Haute Joaillerie',
    description: 'An architectural heirloom ring crafted by master jewelers in our Paris workshop. Features a hand-selected 3.5 carat natural peach-pink morganite stone flanked by a halo of 48 brilliant conflict-free pavé diamonds in solid 18-karat rose gold.',
    details: [
      'Gemstone: 3.5 Carat Natural Morganite (AAA Grade, Emerald Cut)',
      'Accent Stones: 0.45 Carat Micro-Pavé Diamonds (G Color, VS1 Clarity)',
      'Metal: 18-Karat Hallmarked Rose Gold (Au750)',
      'Accompanied by a Certificate of Gemological Authenticity',
      'Presented in a velvet-lined rosewood keepsake box'
    ],
    materials: '18K Solid Rose Gold, Natural Morganite, Conflict-Free Diamonds',
    rating: 5.0,
    reviewsCount: 32,
    isFeatured: true,
    isBestSeller: false,
    isNewArrival: true,
    stock: 7,
    images: [
      '/src/assets/images/product_jewelry_rose_gold_ring_1794291821824.jpg'
    ],
    sizes: ['US 5', 'US 6', 'US 7', 'US 8', 'US 9'],
    colors: [
      { name: '18K Rose Gold', hex: '#e8a598' },
      { name: '18K White Gold', hex: '#d9d9d9' }
    ],
    tags: ['Heirloom', 'Fine Jewelry', '18K Gold', 'Certified']
  },
  {
    id: 'prod-004',
    name: 'Blush Mulberry Silk Kimono Robe',
    slug: 'blush-mulberry-silk-kimono-robe',
    subtitle: '100% 22-Momme Grade 6A Silk with Calais Lace Trim',
    price: 295,
    originalPrice: 340,
    category: 'Silk Couture',
    subcategory: 'Atelier Loungewear',
    description: 'The epitome of quiet indulgence. Tailored from the finest 22-momme Grade 6A organic mulberry silk in romantic blush pink, embellished with scalloped French Calais lace along the kimono sleeves and lower hem. Drapes fluidly over the silhouette with a matching sash belt.',
    details: [
      'Fabric: 100% Pure Mulberry Silk (22 Momme, Grade 6A)',
      'Lace: Genuine French Calais-Caudry Chantilly lace',
      'Interior ties for secure closure and tailored drape',
      'French seam construction for ultimate skin comfort',
      'Hypoallergenic, breathable, and temperature-regulating'
    ],
    materials: '100% Organic Mulberry Silk, Calais Lace',
    rating: 4.88,
    reviewsCount: 89,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: false,
    stock: 19,
    images: [
      '/src/assets/images/product_silk_robe_blush_1794291821031.jpg'
    ],
    sizes: ['XS / S', 'M / L', 'XL'],
    colors: [
      { name: 'Blush Rose', hex: '#f0c4cb' },
      { name: 'Champagne Ivory', hex: '#f4ede2' },
      { name: 'Noir Velours', hex: '#261b1e' }
    ],
    tags: ['Pure Silk', 'Calais Lace', 'Luxury Loungewear']
  },
  {
    id: 'prod-005',
    name: 'The Royal Rose Vault (Gift Coffret)',
    slug: 'the-royal-rose-vault-gift-coffret',
    subtitle: 'Limited Holiday Edition: Perfume, Radiance Elixir & Silk Mask',
    price: 360,
    originalPrice: 420,
    category: 'Gift Sets',
    subcategory: 'Curated Coffrets',
    description: 'The ultimate bespoke expression of luxury. Includes a 50ml Rose Éclat Eau de Parfum, a 30ml Rose Quartz Radiance Elixir, and an artisan blush pure silk eye mask, encased in a hand-embossed lacquered keepsake chest.',
    details: [
      'Includes full-size Rose Éclat Eau de Parfum (50ml)',
      'Includes full-size Rose Quartz Radiance Elixir (30ml)',
      'Includes 100% Mulberry Silk Contoured Eye Sleep Mask',
      'Lacquered pink presentation chest with satin ribbon and wax seal',
      'Complimentary personalized calligraphy gift message'
    ],
    rating: 4.98,
    reviewsCount: 76,
    isFeatured: true,
    isBestSeller: true,
    isNewArrival: true,
    stock: 15,
    images: [
      '/src/assets/images/hero_rose_atelier_collection_1794291819360.jpg',
      '/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg'
    ],
    sizes: ['Bespoke Edition'],
    tags: ['Gift Edition', 'Collector Item', 'Hand-Numbered']
  },
  {
    id: 'prod-006',
    name: 'Velours de Rose Nocturne Serum',
    slug: 'velours-de-rose-nocturne-serum',
    subtitle: 'Overnight Triple Peptide & Rose Stem Cell Restorative Cream',
    price: 155,
    originalPrice: 180,
    category: 'Skincare',
    subcategory: 'Night Treatments',
    description: 'An ultra-rich overnight restorative cream formulated with Alpine Rose stem cells, dual-molecular hyaluronic acid, and copper peptides to deeply nourish, repair environmental damage, and restore youthful elasticity as you sleep.',
    details: [
      'Formulated with 500,000 active Alpine Rose stem cells per jar',
      'Enriched with botanical squalane and niacinamide 3%',
      'Velvety whipped texture that melts into the skin',
      'Includes solid rose quartz sculpting application spatula'
    ],
    rating: 4.87,
    reviewsCount: 94,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: true,
    stock: 22,
    images: [
      '/src/assets/images/product_skincare_rose_elixir_1794291820049.jpg'
    ],
    sizes: ['50ml / 1.7 fl oz'],
    tags: ['Night Care', 'Peptides', 'Anti-Aging']
  },
  {
    id: 'prod-007',
    name: 'Morganite Petal Pavé Drop Earrings',
    slug: 'morganite-petal-pave-drop-earrings',
    subtitle: 'Dangling Rose Morganite Droplets with Marquise Diamonds in 18k Rose Gold',
    price: 890,
    originalPrice: 1050,
    category: 'Fine Jewelry',
    subcategory: 'Haute Joaillerie',
    description: 'Delicate yet commanding earrings inspired by morning rose petals trembling with dew. Featuring pear-cut natural morganites cascading from diamond-studded links in polished 18k rose gold.',
    details: [
      'Total Gem Weight: 2.8 Carats Natural Morganite',
      '0.32 Carat brilliant round and marquise diamonds',
      'Secure lever-back clasp in solid 18k rose gold',
      'Handmade in limited batches of 15 pairs'
    ],
    rating: 4.92,
    reviewsCount: 18,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    stock: 5,
    images: [
      '/src/assets/images/product_jewelry_rose_gold_ring_1794291821824.jpg'
    ],
    sizes: ['One Size'],
    tags: ['Fine Jewelry', 'Handcrafted', 'Heirloom']
  },
  {
    id: 'prod-008',
    name: 'Rosewater & Lychee Silk Camisole',
    slug: 'rosewater-lychee-silk-camisole',
    subtitle: 'Bias-Cut Pure Silk Camisole with Adjustable Micro-Straps',
    price: 145,
    originalPrice: 175,
    category: 'Silk Couture',
    subcategory: 'Atelier Loungewear',
    description: 'Gracefully bias-cut to glide over natural contours. Designed with a soft scoop neckline, delicate French seams, and adjustable micro-spaghetti straps for effortless layering or luxurious lounging.',
    details: [
      '100% Mulberry Silk Satin (19 Momme)',
      'Subtle lustrous sheen that breathes effortlessly',
      'Dry clean or gentle hand wash with pH-neutral detergent'
    ],
    rating: 4.8,
    reviewsCount: 54,
    isFeatured: false,
    isBestSeller: false,
    isNewArrival: false,
    stock: 26,
    images: [
      '/src/assets/images/product_silk_robe_blush_1794291821031.jpg'
    ],
    sizes: ['XS', 'S', 'M', 'L'],
    colors: [
      { name: 'Rosewater', hex: '#f2c8d2' },
      { name: 'Ivory Pearl', hex: '#fdfbf7' }
    ],
    tags: ['Bias Cut', '100% Silk', 'Parisian']
  }
];

export const INITIAL_COUPONS: Coupon[] = [
  {
    code: 'ROSE20',
    discountType: 'percentage',
    value: 20,
    minSpend: 120,
    maxDiscount: 150,
    description: '20% off your atelier order on spends over $120',
    isActive: true
  },
  {
    code: 'WELCOME10',
    discountType: 'percentage',
    value: 10,
    minSpend: 0,
    description: '10% welcome privilege for your first luxury purchase',
    isActive: true
  },
  {
    code: 'PINKLUXE50',
    discountType: 'fixed',
    value: 50,
    minSpend: 250,
    description: '$50 instant reduction on couture orders over $250',
    isActive: true
  }
];

export const INITIAL_SETTINGS: StoreSettings = {
  storeName: 'Étoile & Rose Atelier',
  tagline: 'Haute Parfumerie, Fine Jewelry & Silk Couture',
  whatsappNumber: '03478543812',
  currencySymbol: '$',
  freeShippingThreshold: 150,
  shippingFee: 15,
  supportEmail: 'concierge@etoile-rose.com',
  address: '14 Rue du Faubourg Saint-Honoré, 75008 Paris, France'
};

export const INITIAL_ORDERS: Order[] = [
  {
    id: 'ORD-78241',
    invoiceNumber: 'INV-2026-0089',
    createdAt: new Date(Date.now() - 3600000 * 18).toISOString(),
    customer: {
      fullName: 'Aria Montgomery',
      email: 'aria.m@example.com',
      phone: '03478543812',
      address: '742 Evergreen Terrace, Suite 4B',
      city: 'New York',
      state: 'NY',
      postalCode: '10021',
      country: 'United States',
      notes: 'Please hand-deliver to concierge if unavailable.'
    },
    items: [
      {
        productId: 'prod-001',
        productTitle: 'Rose Éclat Eau de Parfum (100ml)',
        price: 185,
        quantity: 1,
        selectedSize: '100ml / 3.4 fl oz',
        selectedColor: 'Rose Gold Flacon',
        image: '/src/assets/images/product_perfume_rose_crystal_1794291819176.jpg'
      },
      {
        productId: 'prod-002',
        productTitle: 'Rose Quartz Radiance Elixir',
        price: 135,
        quantity: 1,
        selectedSize: '30ml / 1.0 fl oz',
        image: '/src/assets/images/product_skincare_rose_elixir_1794291820049.jpg'
      }
    ],
    subtotal: 320,
    discountAmount: 64,
    couponCodeApplied: 'ROSE20',
    shippingFee: 0,
    total: 256,
    paymentMethod: 'whatsapp',
    paymentStatus: 'paid',
    status: 'dispatched',
    trackingNumber: 'ETR-99482104-FR',
    carrier: 'DHL Express Prestige',
    estimatedDelivery: 'November 12, 2026',
    whatsappSent: true,
    timeline: [
      {
        status: 'pending',
        label: 'Order Placed & WhatsApp Bill Generated',
        description: 'Customer selected direct WhatsApp checkout. Invoice generated automatically.',
        timestamp: new Date(Date.now() - 3600000 * 18).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'confirmed',
        label: 'Concierge Verification & Payment Confirmed',
        description: 'Customer verified order details via WhatsApp at 03478543812.',
        timestamp: new Date(Date.now() - 3600000 * 15).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'packaging',
        label: 'Bespoke Atelier Packaging',
        description: 'Items delicately wrapped in silk tissue, scented with rose essence, and wax sealed.',
        timestamp: new Date(Date.now() - 3600000 * 8).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isCompleted: true,
        isCurrent: false
      },
      {
        status: 'dispatched',
        label: 'Dispatched via DHL Express Prestige',
        description: 'Parcel left the Paris central sorting vault. Tracking active.',
        timestamp: new Date(Date.now() - 3600000 * 2).toLocaleDateString('en-US', { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' }),
        isCompleted: true,
        isCurrent: true
      },
      {
        status: 'delivered',
        label: 'Final Delivery to Customer',
        description: 'Scheduled with white-glove signature verification.',
        timestamp: 'Estimated Nov 12',
        isCompleted: false,
        isCurrent: false
      }
    ]
  }
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'Order Dispatched #ORD-78241',
    message: 'Your bespoke parcel has left the Paris atelier and is on its way via DHL Express Prestige.',
    type: 'shipping',
    timestamp: '2 hours ago',
    read: false,
    orderId: 'ORD-78241'
  },
  {
    id: 'notif-2',
    title: 'WhatsApp Concierge Ready',
    message: 'Order and bill assistance is available 24/7 on WhatsApp at 03478543812.',
    type: 'system',
    timestamp: '1 day ago',
    read: false
  },
  {
    id: 'notif-3',
    title: 'Privilege Code Unlocked',
    message: 'Use voucher ROSE20 during checkout to enjoy 20% off all haute fragrances and skincare.',
    type: 'promo',
    timestamp: '2 days ago',
    read: true
  }
];
