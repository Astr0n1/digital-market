/**
 * Represents a product review.
 */
export interface ProductReview {
  id: string;
  author: string;
  rating: number; // 1-5
  comment: string;
  date: string; // ISO 8601 format
}

/**
 * Represents a product.
 */
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  gallery: string[]; // URLs for additional images
  category: 'Laptops' | 'Smartphones' | 'Audio' | 'Accessories' | 'Cameras' | 'Tablets' | 'Gaming' | 'Monitors';
  brand: string;
  stock: number; // Number of items in stock
  technicalSpecifications: Record<string, string>;
  reviews: ProductReview[];
}


const mockProducts: Product[] = [
  // Existing Products (Updated Images)
  {
    id: 'laptop-001',
    name: 'UltraBook Pro 14',
    description: 'High-performance laptop for professionals and creatives. Sleek design, powerful internals.',
    price: 1499.99,
    imageUrl: 'https://picsum.photos/seed/ultrabookpro14/600/400',
    gallery: [
      'https://picsum.photos/seed/ultrabookpro14a/800/600',
      'https://picsum.photos/seed/ultrabookpro14b/800/600',
      'https://picsum.photos/seed/ultrabookpro14c/800/600',
    ],
    category: 'Laptops',
    brand: 'Innovatech',
    stock: 50,
    technicalSpecifications: {
      'Processor': 'Innovatech Core i7 13th Gen',
      'RAM': '16GB DDR5',
      'Storage': '1TB NVMe SSD',
      'Display': '14-inch Retina QHD+',
      'Graphics': 'Integrated Iris Xe',
      'OS': 'Innovate OS 14',
      'Weight': '1.3 kg',
      'Battery Life': 'Up to 12 hours',
    },
    reviews: [
      { id: 'r1-1', author: 'Alice Green', rating: 5, comment: 'Absolutely stunning machine. Fast, light, and beautiful display.', date: '2024-05-10T10:30:00Z' },
      { id: 'r1-2', author: 'Bob White', rating: 4, comment: 'Very good laptop, but gets a bit warm under heavy load.', date: '2024-05-12T14:00:00Z' },
    ],
  },
  {
    id: 'smartphone-001',
    name: 'Galaxy S25 Ultra',
    description: 'The latest flagship smartphone with an amazing camera system and AI features.',
    price: 1199.00,
    imageUrl: 'https://picsum.photos/seed/galaxys25ultra/600/400',
     gallery: [
      'https://picsum.photos/seed/galaxys25ultra_a/800/600',
      'https://picsum.photos/seed/galaxys25ultra_b/800/600',
    ],
    category: 'Smartphones',
    brand: 'Samsonic',
    stock: 120,
    technicalSpecifications: {
      'Display': '6.8-inch Dynamic AMOLED 2X',
      'Processor': 'Snapdragon 9 Gen 3',
      'RAM': '12GB',
      'Storage': '256GB UFS 4.0',
      'Camera': '200MP Main, 12MP Ultrawide, 10MP Telephoto (3x, 10x)',
      'Battery': '5000 mAh',
      'OS': 'Android 15',
    },
    reviews: [
      { id: 'r2-1', author: 'Charlie Brown', rating: 5, comment: 'Best phone camera I have ever used. Blazing fast too!', date: '2024-05-15T09:00:00Z' },
    ],
  },
  {
    id: 'audio-001',
    name: 'QuietComfort Ultra Headphones',
    description: 'Industry-leading noise cancellation and immersive audio experience.',
    price: 349.00,
    imageUrl: 'https://picsum.photos/seed/quietcomfortultra/600/400',
     gallery: [
      'https://picsum.photos/seed/quietcomfortultra_a/800/600',
    ],
    category: 'Audio',
    brand: 'SoundWave',
    stock: 85,
    technicalSpecifications: {
      'Type': 'Over-ear, Wireless',
      'Noise Cancellation': 'Active Noise Cancelling (ANC)',
      'Connectivity': 'Bluetooth 5.3, Multipoint',
      'Battery Life': 'Up to 24 hours (ANC on)',
      'Weight': '250g',
      'Features': 'Immersive Audio, CustomTune technology',
    },
    reviews: [
      { id: 'r3-1', author: 'Diana Prince', rating: 5, comment: 'The noise cancellation is magic! Perfect for flights.', date: '2024-05-01T11:20:00Z' },
      { id: 'r3-2', author: 'Ethan Hunt', rating: 4, comment: 'Great sound and comfort, but the app could be better.', date: '2024-05-05T18:45:00Z' },
    ],
  },
   {
    id: 'accessory-001',
    name: 'Wireless Ergonomic Mouse',
    description: 'Comfortable and precise wireless mouse designed for long hours of use.',
    price: 79.99,
    imageUrl: 'https://picsum.photos/seed/ergomouse/600/400',
     gallery: [
      'https://picsum.photos/seed/ergomouse_a/800/600',
    ],
    category: 'Accessories',
    brand: 'ClickMaster',
    stock: 200,
    technicalSpecifications: {
      'Connectivity': '2.4GHz Wireless, Bluetooth',
      'DPI': '800-4000 Adjustable',
      'Buttons': '6 programmable buttons',
      'Battery': 'Rechargeable (USB-C)',
      'Compatibility': 'Windows, macOS, Linux',
    },
    reviews: [
      { id: 'r4-1', author: 'Fiona Glenanne', rating: 5, comment: 'Finally, a mouse that doesn\'t hurt my wrist!', date: '2024-04-28T16:15:00Z' },
    ],
  },
   {
    id: 'camera-001',
    name: 'Alpha Mirrorless A7 IV',
    description: 'Full-frame mirrorless camera for hybrid shooters, excelling in both photo and video.',
    price: 2499.00,
    imageUrl: 'https://picsum.photos/seed/alphaa7iv/600/400',
    gallery: [
      'https://picsum.photos/seed/alphaa7iv_a/800/600',
      'https://picsum.photos/seed/alphaa7iv_b/800/600',
      'https://picsum.photos/seed/alphaa7iv_c/800/600',
    ],
    category: 'Cameras',
    brand: 'Sorny',
    stock: 30,
    technicalSpecifications: {
      'Sensor': '33MP Full-Frame Exmor R CMOS',
      'Processor': 'BIONZ XR',
      'ISO': '100-51200 (Expandable to 50-204800)',
      'Video': '4K 60p (Super35), 4K 30p (Full-Frame)',
      'Autofocus': '759-point phase-detection AF',
      'Screen': '3-inch Vari-angle Touchscreen LCD',
    },
    reviews: [
      { id: 'r5-1', author: 'Giselle Yashar', rating: 5, comment: 'Incredible image quality and autofocus performance.', date: '2024-05-20T12:00:00Z' },
      { id: 'r5-2', author: 'Han Lue', rating: 4, comment: 'Great camera, but the menu system takes some getting used to.', date: '2024-05-22T08:30:00Z' },
    ],
  },
  {
    id: 'laptop-002',
    name: 'GamerForce X17',
    description: 'Ultimate gaming laptop with top-tier graphics and high refresh rate display.',
    price: 2199.00,
    imageUrl: 'https://picsum.photos/seed/gamerforcex17/600/400',
    gallery: [
       'https://picsum.photos/seed/gamerforcex17_a/800/600',
       'https://picsum.photos/seed/gamerforcex17_b/800/600',
    ],
    category: 'Laptops',
    brand: 'Republic of Gamers',
    stock: 25,
    technicalSpecifications: {
      'Processor': 'Intel Core i9 14th Gen HX',
      'RAM': '32GB DDR5',
      'Storage': '2TB NVMe SSD Gen4',
      'Display': '17.3-inch QHD 240Hz G-Sync',
      'Graphics': 'NVIDIA GeForce RTX 4080 Laptop GPU',
      'OS': 'Windows 11 Pro',
      'Weight': '2.8 kg',
      'Keyboard': 'Per-key RGB Mechanical',
    },
    reviews: [
       { id: 'r6-1', author: 'Ivy Walker', rating: 5, comment: 'Plays everything on ultra settings smoothly. The screen is gorgeous!', date: '2024-05-18T20:00:00Z' },
    ],
  },
   {
    id: 'smartphone-002',
    name: 'Pixel 9a',
    description: 'Affordable smartphone with Google\'s excellent camera software and clean Android experience.',
    price: 499.00,
    imageUrl: 'https://picsum.photos/seed/pixel9a/600/400',
    gallery: [
      'https://picsum.photos/seed/pixel9a_a/800/600',
    ],
    category: 'Smartphones',
    brand: 'Googol',
    stock: 150,
    technicalSpecifications: {
      'Display': '6.1-inch OLED',
      'Processor': 'Tensor G3',
      'RAM': '8GB',
      'Storage': '128GB',
      'Camera': '64MP Main, 13MP Ultrawide',
      'Battery': '4500 mAh',
      'OS': 'Android 15',
    },
    reviews: [
       { id: 'r7-1', author: 'Jack Reacher', rating: 4, comment: 'Amazing camera for the price. Performance is decent.', date: '2024-05-14T13:10:00Z' },
       { id: 'r7-2', author: 'Kara Zor-El', rating: 5, comment: 'Best budget phone, hands down.', date: '2024-05-16T10:00:00Z' },
    ],
  },
    {
    id: 'audio-002',
    name: 'SoundCore Liberty 4 NC',
    description: 'True wireless earbuds with strong noise cancellation and long battery life.',
    price: 99.99,
    imageUrl: 'https://picsum.photos/seed/liberty4nc/600/400',
     gallery: [
      'https://picsum.photos/seed/liberty4nc_a/800/600',
      'https://picsum.photos/seed/liberty4nc_b/800/600',
    ],
    category: 'Audio',
    brand: 'Anker Soundcore',
    stock: 300,
    technicalSpecifications: {
      'Type': 'In-ear, True Wireless',
      'Noise Cancellation': 'Adaptive ANC 2.0',
      'Connectivity': 'Bluetooth 5.3, LDAC, Multipoint',
      'Battery Life': 'Up to 10 hours (earbuds), 50 hours (with case)',
      'Water Resistance': 'IPX4',
      'Features': 'Wireless Charging, HearID Sound',
    },
    reviews: [
      { id: 'r8-1', author: 'Leo Fitz', rating: 5, comment: 'Incredible value. ANC rivals much more expensive earbuds.', date: '2024-05-08T15:00:00Z' },
      { id: 'r8-2', author: 'Melinda May', rating: 4, comment: 'Fit is good, sound is great. ANC is impressive for the price.', date: '2024-05-11T09:30:00Z' },
    ],
  },
  // New Products
  {
    id: 'tablet-001',
    name: 'Surface Pro 10',
    description: 'Versatile 2-in-1 tablet/laptop with a stunning display and powerful performance.',
    price: 1099.99,
    imageUrl: 'https://picsum.photos/seed/surfacepro10/600/400',
    gallery: [
      'https://picsum.photos/seed/surfacepro10_a/800/600',
      'https://picsum.photos/seed/surfacepro10_b/800/600',
    ],
    category: 'Tablets',
    brand: 'Macrosoft',
    stock: 75,
    technicalSpecifications: {
      'Display': '13-inch PixelSense Flow Display',
      'Processor': 'Intel Core Ultra 7',
      'RAM': '16GB LPDDR5x',
      'Storage': '512GB SSD',
      'OS': 'Windows 11 Home',
      'Features': 'Detachable Keyboard (sold separately), Surface Pen support',
    },
    reviews: [
      { id: 'r9-1', author: 'Nick Fury', rating: 4, comment: 'Great for productivity on the go. Keyboard is a must-have.', date: '2024-05-25T10:00:00Z' },
    ],
  },
  {
    id: 'gaming-001',
    name: 'PlayStation 6',
    description: 'Next-generation gaming console with breathtaking graphics and lightning-fast load times.',
    price: 599.00,
    imageUrl: 'https://picsum.photos/seed/playstation6/600/400',
    gallery: [
      'https://picsum.photos/seed/playstation6_a/800/600',
      'https://picsum.photos/seed/playstation6_b/800/600',
    ],
    category: 'Gaming',
    brand: 'Sorny',
    stock: 40,
    technicalSpecifications: {
      'CPU': 'Custom AMD Zen 4',
      'GPU': 'Custom AMD RDNA 4',
      'RAM': '24GB GDDR7',
      'Storage': '2TB Custom NVMe SSD',
      'Output': 'Up to 8K HDR',
      'Features': 'DualSense Controller, Ray Tracing',
    },
    reviews: [
      { id: 'r10-1', author: 'Oliver Queen', rating: 5, comment: 'Gaming has never looked this good. The controller feedback is insane.', date: '2024-05-28T14:30:00Z' },
    ],
  },
  {
    id: 'monitor-001',
    name: 'UltraWide QHD Monitor 34"',
    description: 'Immersive ultrawide monitor perfect for gaming and multitasking.',
    price: 699.00,
    imageUrl: 'https://picsum.photos/seed/ultrawide34/600/400',
    gallery: [
      'https://picsum.photos/seed/ultrawide34_a/800/600',
    ],
    category: 'Monitors',
    brand: 'LG Electronics',
    stock: 60,
    technicalSpecifications: {
      'Panel Type': 'IPS',
      'Resolution': '3440 x 1440 (WQHD)',
      'Refresh Rate': '144Hz',
      'Response Time': '1ms (GtG)',
      'Aspect Ratio': '21:9',
      'Connectivity': 'HDMI 2.0 x2, DisplayPort 1.4 x1, USB-C',
    },
    reviews: [
      { id: 'r11-1', author: 'Peter Parker', rating: 5, comment: 'Super smooth gameplay and tons of screen real estate for work.', date: '2024-05-19T11:00:00Z' },
    ],
  },
   {
    id: 'accessory-002',
    name: 'Mechanical Keyboard TKL',
    description: 'Tenkeyless mechanical keyboard with customizable switches and RGB lighting.',
    price: 129.99,
    imageUrl: 'https://picsum.photos/seed/keyboardtkl/600/400',
    gallery: [
        'https://picsum.photos/seed/keyboardtkl_a/800/600',
        'https://picsum.photos/seed/keyboardtkl_b/800/600',
    ],
    category: 'Accessories',
    brand: 'Keychron',
    stock: 90,
    technicalSpecifications: {
        'Layout': 'Tenkeyless (87 keys)',
        'Switch Type': 'Gateron Brown (Hot-swappable)',
        'Connectivity': 'Wired (USB-C), Bluetooth 5.1',
        'Backlight': 'RGB',
        'Compatibility': 'Windows, macOS, Linux',
    },
    reviews: [
        { id: 'r12-1', author: 'Quentin Beck', rating: 5, comment: 'Typing feels amazing. Love the customization options.', date: '2024-05-21T17:00:00Z' },
    ],
  },
  {
    id: 'audio-003',
    name: 'Studio Speaker Set',
    description: 'Pair of high-fidelity bookshelf speakers for accurate sound reproduction.',
    price: 450.00,
    imageUrl: 'https://picsum.photos/seed/studiospeakers/600/400',
    gallery: [
      'https://picsum.photos/seed/studiospeakers_a/800/600',
    ],
    category: 'Audio',
    brand: 'Audiophile Acoustics',
    stock: 45,
    technicalSpecifications: {
      'Type': '2-way Bookshelf Speakers',
      'Woofer': '5.25" Kevlar Cone',
      'Tweeter': '1" Silk Dome',
      'Frequency Response': '55Hz - 22kHz',
      'Impedance': '6 Ohms',
      'Power Handling': '100W RMS',
    },
    reviews: [
       { id: 'r13-1', author: 'Rachel Dawes', rating: 5, comment: 'Crystal clear sound. Perfect for my home studio setup.', date: '2024-05-29T09:15:00Z' },
       { id: 'r13-2', author: 'Steve Rogers', rating: 4, comment: 'Excellent detail, requires a good amplifier.', date: '2024-05-30T11:00:00Z' },
    ],
  },
    {
    id: 'camera-002',
    name: 'ActionCam Hero 12',
    description: 'Rugged and waterproof action camera capturing smooth 5K video.',
    price: 399.99,
    imageUrl: 'https://picsum.photos/seed/actioncam12/600/400',
    gallery: [
        'https://picsum.photos/seed/actioncam12_a/800/600',
        'https://picsum.photos/seed/actioncam12_b/800/600',
    ],
    category: 'Cameras',
    brand: 'GoAction',
    stock: 110,
    technicalSpecifications: {
        'Video Resolution': '5.3K60, 4K120, 2.7K240',
        'Photo Resolution': '27MP',
        'Waterproof': '10m (33ft) without housing',
        'Stabilization': 'HyperSmooth 6.0',
        'Screen': 'Front and Rear LCD Screens',
        'Features': 'Horizon Lock, HDR Video',
    },
    reviews: [
       { id: 'r14-1', author: 'Tony Stark', rating: 5, comment: 'Incredible stabilization, even in rough conditions. Very durable.', date: '2024-05-23T16:45:00Z' },
    ],
  },
   {
    id: 'laptop-003',
    name: 'Feather Air M3',
    description: 'Ultra-lightweight and thin laptop with exceptional battery life.',
    price: 1299.00,
    imageUrl: 'https://picsum.photos/seed/featherairm3/600/400',
    gallery: [
        'https://picsum.photos/seed/featherairm3_a/800/600',
        'https://picsum.photos/seed/featherairm3_b/800/600',
    ],
    category: 'Laptops',
    brand: 'Pear Computers',
    stock: 65,
    technicalSpecifications: {
        'Processor': 'Pear M3 Chip',
        'RAM': '8GB Unified Memory',
        'Storage': '256GB SSD',
        'Display': '13.6-inch Liquid Retina',
        'OS': 'pearOS Sonoma',
        'Weight': '1.24 kg',
        'Battery Life': 'Up to 18 hours',
    },
    reviews: [
        { id: 'r15-1', author: 'Ursula K. Le Guin', rating: 5, comment: 'Perfect for travel. The battery just keeps going!', date: '2024-05-27T10:20:00Z' },
        { id: 'r15-2', author: 'Victor Stone', rating: 4, comment: 'Great build quality and performance for everyday tasks. Wish it had more ports.', date: '2024-05-29T18:00:00Z' },
    ],
  },
];

/**
 * Asynchronously retrieves a list of products.
 * Simulates an API call.
 * @returns A promise that resolves to an array of Product objects.
 */
export async function getProducts(): Promise<Product[]> {
  console.log("getProducts called"); // Debug log
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  // In a real app, you would fetch from an API endpoint:
  // const response = await fetch('/api/products');
  // const data = await response.json();
  // return data;
  console.log("getProducts returning data:", mockProducts.length); // Debug log
  return [...mockProducts]; // Return a copy to prevent mutation
}

/**
 * Asynchronously retrieves a single product by ID.
 * Simulates an API call.
 * @param id The ID of the product to retrieve.
 * @returns A promise that resolves to a Product object or undefined if not found.
 */
export async function getProduct(id: string): Promise<Product | undefined> {
   // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 50));
  // In a real app, you would fetch from an API endpoint:
  // const response = await fetch(`/api/products/${id}`);
  // if (!response.ok) return undefined;
  // const data = await response.json();
  // return data;
  const product = mockProducts.find(product => product.id === id);
   console.log(`getProduct(${id}) returning:`, product ? product.name : 'undefined'); // Debug log
  return product ? { ...product } : undefined; // Return a copy
}

/**
 * Retrieves a list of unique product categories.
 * @returns A promise that resolves to an array of unique category strings.
 */
export async function getCategories(): Promise<string[]> {
   console.log("getCategories called"); // Debug log
  // No need to fetch all products again if we have them
  const categories = new Set(mockProducts.map(p => p.category));
  const categoryArray = Array.from(categories);
   console.log("getCategories returning:", categoryArray); // Debug log
  return categoryArray;
}

/**
 * Retrieves a list of unique product brands.
 * @returns A promise that resolves to an array of unique brand strings.
 */
export async function getBrands(): Promise<string[]> {
   console.log("getBrands called"); // Debug log
  // No need to fetch all products again if we have them
  const brands = new Set(mockProducts.map(p => p.brand));
   const brandArray = Array.from(brands);
    console.log("getBrands returning:", brandArray); // Debug log
  return brandArray;
}
