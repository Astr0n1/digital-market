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
  category: 'Laptops' | 'Smartphones' | 'Audio' | 'Accessories' | 'Cameras';
  brand: string;
  stock: number; // Number of items in stock
  technicalSpecifications: Record<string, string>;
  reviews: ProductReview[];
}


const mockProducts: Product[] = [
  {
    id: 'laptop-001',
    name: 'UltraBook Pro 14',
    description: 'High-performance laptop for professionals and creatives. Sleek design, powerful internals.',
    price: 1499.99,
    imageUrl: 'https://picsum.photos/seed/laptop1/600/400',
    gallery: [
      'https://picsum.photos/seed/laptop1a/800/600',
      'https://picsum.photos/seed/laptop1b/800/600',
      'https://picsum.photos/seed/laptop1c/800/600',
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
    imageUrl: 'https://picsum.photos/seed/phone1/600/400',
     gallery: [
      'https://picsum.photos/seed/phone1a/800/600',
      'https://picsum.photos/seed/phone1b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/headphones1/600/400',
     gallery: [
      'https://picsum.photos/seed/headphones1a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/mouse1/600/400',
     gallery: [
      'https://picsum.photos/seed/mouse1a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/camera1/600/400',
    gallery: [
      'https://picsum.photos/seed/camera1a/800/600',
      'https://picsum.photos/seed/camera1b/800/600',
      'https://picsum.photos/seed/camera1c/800/600',
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
    imageUrl: 'https://picsum.photos/seed/laptop2/600/400',
    gallery: [
       'https://picsum.photos/seed/laptop2a/800/600',
       'https://picsum.photos/seed/laptop2b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/phone2/600/400',
    gallery: [
      'https://picsum.photos/seed/phone2a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/earbuds1/600/400',
     gallery: [
      'https://picsum.photos/seed/earbuds1a/800/600',
      'https://picsum.photos/seed/earbuds1b/800/600',
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
  console.log("getProducts returning data:", mockProducts); // Debug log
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
  return product ? { ...product } : undefined; // Return a copy
}

/**
 * Retrieves a list of unique product categories.
 * @returns A promise that resolves to an array of unique category strings.
 */
export async function getCategories(): Promise<string[]> {
  const products = await getProducts();
  const categories = new Set(products.map(p => p.category));
  return Array.from(categories);
}

/**
 * Retrieves a list of unique product brands.
 * @returns A promise that resolves to an array of unique brand strings.
 */
export async function getBrands(): Promise<string[]> {
  const products = await getProducts();
  const brands = new Set(products.map(p => p.brand));
  return Array.from(brands);
}
