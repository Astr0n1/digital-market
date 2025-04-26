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
    imageUrl: 'https://picsum.photos/seed/laptop_ultrabook_pro_14_main/600/400',
    gallery: [
      'https://picsum.photos/seed/laptop_ultrabook_pro_14_a/800/600',
      'https://picsum.photos/seed/laptop_ultrabook_pro_14_b/800/600',
      'https://picsum.photos/seed/laptop_ultrabook_pro_14_c/800/600',
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
    imageUrl: 'https://picsum.photos/seed/phone_galaxy_s25_ultra_main/600/400',
     gallery: [
      'https://picsum.photos/seed/phone_galaxy_s25_ultra_a/800/600',
      'https://picsum.photos/seed/phone_galaxy_s25_ultra_b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/headphones_quietcomfort_ultra_main/600/400',
     gallery: [
      'https://picsum.photos/seed/headphones_quietcomfort_ultra_a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/mouse_ergo_wireless_main/600/400',
     gallery: [
      'https://picsum.photos/seed/mouse_ergo_wireless_a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/camera_alpha_a7iv_main/600/400',
    gallery: [
      'https://picsum.photos/seed/camera_alpha_a7iv_a/800/600',
      'https://picsum.photos/seed/camera_alpha_a7iv_b/800/600',
      'https://picsum.photos/seed/camera_alpha_a7iv_c/800/600',
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
    imageUrl: 'https://picsum.photos/seed/laptop_gamerforce_x17_main/600/400',
    gallery: [
       'https://picsum.photos/seed/laptop_gamerforce_x17_a/800/600',
       'https://picsum.photos/seed/laptop_gamerforce_x17_b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/phone_pixel_9a_main/600/400',
    gallery: [
      'https://picsum.photos/seed/phone_pixel_9a_a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/earbuds_liberty_4nc_main/600/400',
     gallery: [
      'https://picsum.photos/seed/earbuds_liberty_4nc_a/800/600',
      'https://picsum.photos/seed/earbuds_liberty_4nc_b/800/600',
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
  {
    id: 'tablet-001',
    name: 'Surface Pro 10',
    description: 'Versatile 2-in-1 tablet/laptop with a stunning display and powerful performance.',
    price: 1099.99,
    imageUrl: 'https://picsum.photos/seed/tablet_surface_pro_10_main/600/400',
    gallery: [
      'https://picsum.photos/seed/tablet_surface_pro_10_a/800/600',
      'https://picsum.photos/seed/tablet_surface_pro_10_b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/console_playstation_6_main/600/400',
    gallery: [
      'https://picsum.photos/seed/console_playstation_6_a/800/600',
      'https://picsum.photos/seed/console_playstation_6_b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/monitor_ultrawide_34_main/600/400',
    gallery: [
      'https://picsum.photos/seed/monitor_ultrawide_34_a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/keyboard_tkl_mechanical_main/600/400',
    gallery: [
        'https://picsum.photos/seed/keyboard_tkl_mechanical_a/800/600',
        'https://picsum.photos/seed/keyboard_tkl_mechanical_b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/speakers_studio_set_main/600/400',
    gallery: [
      'https://picsum.photos/seed/speakers_studio_set_a/800/600',
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
    imageUrl: 'https://picsum.photos/seed/camera_actioncam_hero12_main/600/400',
    gallery: [
        'https://picsum.photos/seed/camera_actioncam_hero12_a/800/600',
        'https://picsum.photos/seed/camera_actioncam_hero12_b/800/600',
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
    imageUrl: 'https://picsum.photos/seed/laptop_feather_air_m3_main/600/400',
    gallery: [
        'https://picsum.photos/seed/laptop_feather_air_m3_a/800/600',
        'https://picsum.photos/seed/laptop_feather_air_m3_b/800/600',
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
  // --- Start of 50 New Products ---
  {
    id: 'smartphone-003',
    name: 'OneMinus 12 Pro',
    description: 'Flagship killer smartphone with a focus on performance and fast charging.',
    price: 899.00,
    imageUrl: 'https://picsum.photos/seed/phone_oneminus_12_pro_main/600/400',
    gallery: [
      'https://picsum.photos/seed/phone_oneminus_12_pro_a/800/600',
      'https://picsum.photos/seed/phone_oneminus_12_pro_b/800/600',
    ],
    category: 'Smartphones',
    brand: 'OneMinus',
    stock: 95,
    technicalSpecifications: {
      'Display': '6.7-inch Fluid AMOLED 120Hz',
      'Processor': 'Snapdragon 8 Gen 3',
      'RAM': '16GB',
      'Storage': '512GB UFS 4.0',
      'Camera': '50MP Main (Sony IMX890), 48MP Ultrawide, 32MP Telephoto',
      'Battery': '5000 mAh',
      'Charging': '100W SuperVOOC Wired',
      'OS': 'OxygenOS 14 (Android 15)',
    },
    reviews: [
      { id: 'r16-1', author: 'Wanda Maximoff', rating: 5, comment: 'Super smooth and fast. Charging is unbelievably quick.', date: '2024-06-01T11:00:00Z' },
    ],
  },
  {
    id: 'accessory-003',
    name: 'Portable SSD 2TB',
    description: 'Fast and rugged portable solid-state drive for backups and file transfers.',
    price: 149.99,
    imageUrl: 'https://picsum.photos/seed/ssd_portable_2tb_main/600/400',
    gallery: [
      'https://picsum.photos/seed/ssd_portable_2tb_a/800/600',
    ],
    category: 'Accessories',
    brand: 'Samsonic',
    stock: 180,
    technicalSpecifications: {
      'Capacity': '2TB',
      'Interface': 'USB 3.2 Gen 2 (Type-C)',
      'Read Speed': 'Up to 1050 MB/s',
      'Write Speed': 'Up to 1000 MB/s',
      'Durability': 'IP55 Water/Dust Resistant, Drop Resistant (2m)',
    },
    reviews: [
      { id: 'r17-1', author: 'Xavier Charles', rating: 5, comment: 'Small, light, and incredibly fast. Perfect for video editing.', date: '2024-06-02T09:30:00Z' },
    ],
  },
  {
    id: 'monitor-002',
    name: 'ProArt Display 27" 4K',
    description: 'Professional monitor calibrated for color accuracy, ideal for creative work.',
    price: 549.00,
    imageUrl: 'https://picsum.photos/seed/monitor_proart_27_4k_main/600/400',
    gallery: [
      'https://picsum.photos/seed/monitor_proart_27_4k_a/800/600',
    ],
    category: 'Monitors',
    brand: 'ASUS',
    stock: 55,
    technicalSpecifications: {
      'Panel Type': 'IPS',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Color Gamut': '100% sRGB, 100% Rec.709',
      'Color Accuracy': 'Delta E < 2',
      'Brightness': '350 cd/m²',
      'Connectivity': 'DisplayPort 1.2, HDMI 2.0 x2, USB-C (DP Alt Mode, 65W PD)',
    },
    reviews: [
      { id: 'r18-1', author: 'Yelena Belova', rating: 5, comment: 'Colors are spot-on right out of the box. Great for photo editing.', date: '2024-06-03T14:00:00Z' },
    ],
  },
  {
    id: 'tablet-002',
    name: 'Pad Pro 11-inch (M4)',
    description: 'The ultimate tablet experience with the powerful M4 chip and stunning display.',
    price: 999.00,
    imageUrl: 'https://picsum.photos/seed/tablet_pad_pro_11_m4_main/600/400',
    gallery: [
      'https://picsum.photos/seed/tablet_pad_pro_11_m4_a/800/600',
      'https://picsum.photos/seed/tablet_pad_pro_11_m4_b/800/600',
    ],
    category: 'Tablets',
    brand: 'Pear Computers',
    stock: 80,
    technicalSpecifications: {
      'Display': '11-inch Ultra Retina XDR with ProMotion',
      'Processor': 'Pear M4 Chip',
      'RAM': '8GB',
      'Storage': '256GB',
      'OS': 'PadOS 18',
      'Features': 'Apple Pencil Pro support, Magic Keyboard support',
    },
    reviews: [
      { id: 'r19-1', author: 'Zoe Saldana', rating: 5, comment: 'Insanely powerful and the display is incredible.', date: '2024-06-04T10:15:00Z' },
    ],
  },
  {
    id: 'audio-004',
    name: 'AirPods Max',
    description: 'Premium over-ear headphones with high-fidelity audio and adaptive EQ.',
    price: 549.00,
    imageUrl: 'https://picsum.photos/seed/headphones_airpods_max_main/600/400',
    gallery: [
      'https://picsum.photos/seed/headphones_airpods_max_a/800/600',
    ],
    category: 'Audio',
    brand: 'Pear Computers',
    stock: 70,
    technicalSpecifications: {
      'Type': 'Over-ear, Wireless',
      'Noise Cancellation': 'Active Noise Cancelling (ANC)',
      'Connectivity': 'Bluetooth 5.0',
      'Features': 'Spatial Audio, Transparency Mode, Adaptive EQ',
      'Battery Life': 'Up to 20 hours (ANC on)',
    },
    reviews: [
      { id: 'r20-1', author: 'Adam Warlock', rating: 4, comment: 'Amazing sound quality and build, but very expensive and heavy.', date: '2024-06-05T16:00:00Z' },
    ],
  },
    {
    id: 'gaming-002',
    name: 'Xperience Series Z Console',
    description: 'Powerful gaming console with Quick Resume and a vast game library.',
    price: 499.00,
    imageUrl: 'https://picsum.photos/seed/console_xperience_z_main/600/400',
    gallery: [
      'https://picsum.photos/seed/console_xperience_z_a/800/600',
      'https://picsum.photos/seed/console_xperience_z_b/800/600',
    ],
    category: 'Gaming',
    brand: 'Macrosoft',
    stock: 60,
    technicalSpecifications: {
      'CPU': 'Custom AMD Zen 2 8-Core',
      'GPU': 'Custom RDNA 2 (12 TFLOPS)',
      'RAM': '16GB GDDR6',
      'Storage': '1TB Custom NVMe SSD',
      'Output': 'Up to 8K HDR, 4K @ 120Hz',
      'Features': 'Quick Resume, Velocity Architecture, Game Pass',
    },
    reviews: [
      { id: 'r21-1', author: 'Bruce Banner', rating: 4, comment: 'Game Pass is a game changer. Console is powerful and quiet.', date: '2024-06-06T12:00:00Z' },
    ],
  },
  {
    id: 'laptop-004',
    name: 'ThinBook Flex 13',
    description: 'Convertible 2-in-1 laptop with a touch screen and pen support.',
    price: 899.99,
    imageUrl: 'https://picsum.photos/seed/laptop_thinbook_flex_13_main/600/400',
    gallery: [
      'https://picsum.photos/seed/laptop_thinbook_flex_13_a/800/600',
    ],
    category: 'Laptops',
    brand: 'Lenovo',
    stock: 70,
    technicalSpecifications: {
      'Processor': 'Intel Core i5 12th Gen',
      'RAM': '8GB DDR4',
      'Storage': '512GB NVMe SSD',
      'Display': '13.3-inch FHD Touchscreen',
      'OS': 'Windows 11 Home',
      'Weight': '1.35 kg',
      'Features': '360-degree hinge, Active Pen included',
    },
    reviews: [
      { id: 'r22-1', author: 'Clark Kent', rating: 4, comment: 'Versatile and portable. Good for students.', date: '2024-06-07T15:30:00Z' },
    ],
  },
  {
    id: 'camera-003',
    name: 'InstantPhoto Mini 12',
    description: 'Fun instant camera that prints credit-card sized photos.',
    price: 79.95,
    imageUrl: 'https://picsum.photos/seed/camera_instant_mini_12_main/600/400',
    gallery: [
      'https://picsum.photos/seed/camera_instant_mini_12_a/800/600',
      'https://picsum.photos/seed/camera_instant_mini_12_b/800/600',
    ],
    category: 'Cameras',
    brand: 'FujiFilm',
    stock: 150,
    technicalSpecifications: {
      'Film': 'FujiFilm Instant Mini Film',
      'Picture Size': '62mm x 46mm',
      'Lens': 'f=60mm, 1:12.7',
      'Focusing': '0.3m and beyond (use selfie mode for 0.3m to 0.5m)',
      'Shutter Speed': 'Programmed electronic shutter 1/2 to 1/250 sec.',
      'Flash': 'Constant firing flash (automatic light adjustment)',
    },
    reviews: [
      { id: 'r23-1', author: 'Diana Lance', rating: 5, comment: 'Super cute and easy to use. Great for parties!', date: '2024-06-08T10:00:00Z' },
    ],
  },
  {
    id: 'accessory-004',
    name: 'USB-C Docking Station 10-in-1',
    description: 'Expand your laptop\'s connectivity with multiple ports.',
    price: 59.99,
    imageUrl: 'https://picsum.photos/seed/dock_usbc_10in1_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'Anker',
    stock: 250,
    technicalSpecifications: {
      'Ports': '4K HDMI, 100W PD USB-C, USB-C Data, USB-A 3.0 x2, USB-A 2.0, Ethernet, SD/microSD card reader, 3.5mm Audio',
      'Compatibility': 'MacBook, Dell XPS, HP Spectre, etc.',
      'Material': 'Aluminum Alloy',
    },
    reviews: [
      { id: 'r24-1', author: 'Eric Lehnsherr', rating: 4, comment: 'Works well, gets slightly warm but provides all the ports I need.', date: '2024-06-09T13:45:00Z' },
    ],
  },
  {
    id: 'audio-005',
    name: 'SoundLink Flex Bluetooth Speaker',
    description: 'Portable, rugged, and waterproof Bluetooth speaker with impressive sound.',
    price: 149.00,
    imageUrl: 'https://picsum.photos/seed/speaker_soundlink_flex_main/600/400',
    gallery: [
      'https://picsum.photos/seed/speaker_soundlink_flex_a/800/600',
    ],
    category: 'Audio',
    brand: 'SoundWave',
    stock: 120,
    technicalSpecifications: {
      'Type': 'Portable Bluetooth Speaker',
      'Connectivity': 'Bluetooth 4.2',
      'Battery Life': 'Up to 12 hours',
      'Water Resistance': 'IP67 (Waterproof and Dustproof)',
      'Features': 'PositionIQ technology, Built-in microphone',
    },
    reviews: [
      { id: 'r25-1', author: 'Frank Castle', rating: 5, comment: 'Sounds way bigger than it looks. Takes a beating too.', date: '2024-06-10T08:00:00Z' },
    ],
  },
    {
    id: 'smartphone-004',
    name: 'iPear 16 Pro',
    description: 'The latest iPear with ProMotion display, advanced camera, and A18 Bionic chip.',
    price: 1099.00,
    imageUrl: 'https://picsum.photos/seed/phone_ipear_16_pro_main/600/400',
    gallery: [
        'https://picsum.photos/seed/phone_ipear_16_pro_a/800/600',
        'https://picsum.photos/seed/phone_ipear_16_pro_b/800/600',
    ],
    category: 'Smartphones',
    brand: 'Pear Computers',
    stock: 100,
    technicalSpecifications: {
        'Display': '6.1-inch Super Retina XDR with ProMotion',
        'Processor': 'A18 Bionic Chip',
        'RAM': '8GB',
        'Storage': '256GB',
        'Camera': '48MP Main, 12MP Ultrawide, 12MP Telephoto (3x)',
        'Battery': 'Up to 23 hours video playback',
        'OS': 'pearOS 18',
    },
    reviews: [
        { id: 'r26-1', author: 'Gamora Zen', rating: 5, comment: 'Fluid display and fantastic camera system. Ecosystem is seamless.', date: '2024-06-11T14:00:00Z' },
    ],
  },
  {
    id: 'monitor-003',
    name: 'Odyssey Neo G9 49"',
    description: 'Super ultrawide gaming monitor with Quantum Mini-LED technology.',
    price: 1999.99,
    imageUrl: 'https://picsum.photos/seed/monitor_odyssey_neo_g9_main/600/400',
    gallery: [
        'https://picsum.photos/seed/monitor_odyssey_neo_g9_a/800/600',
        'https://picsum.photos/seed/monitor_odyssey_neo_g9_b/800/600',
    ],
    category: 'Monitors',
    brand: 'Samsonic',
    stock: 35,
    technicalSpecifications: {
        'Panel Type': 'VA (Quantum Mini-LED)',
        'Resolution': '5120 x 1440 (Dual QHD)',
        'Refresh Rate': '240Hz',
        'Response Time': '1ms (GtG)',
        'Aspect Ratio': '32:9',
        'Curvature': '1000R',
        'Features': 'HDR2000, G-Sync Compatible, FreeSync Premium Pro',
    },
    reviews: [
        { id: 'r27-1', author: 'Hank Pym', rating: 5, comment: 'Absolutely immersive gaming experience. The HDR is stunning.', date: '2024-06-12T10:30:00Z' },
    ],
  },
  {
    id: 'laptop-005',
    name: 'ChromoBook Plus',
    description: 'Simple, fast, and secure laptop running ChromeOS, perfect for web browsing and cloud apps.',
    price: 349.00,
    imageUrl: 'https://picsum.photos/seed/laptop_chromobook_plus_main/600/400',
    gallery: [],
    category: 'Laptops',
    brand: 'Acer',
    stock: 130,
    technicalSpecifications: {
        'Processor': 'Intel Celeron N4500',
        'RAM': '4GB LPDDR4x',
        'Storage': '64GB eMMC',
        'Display': '14-inch HD Anti-Glare',
        'OS': 'ChromeOS',
        'Weight': '1.45 kg',
        'Battery Life': 'Up to 10 hours',
    },
    reviews: [
        { id: 'r28-1', author: 'Iris West', rating: 4, comment: 'Great for basic tasks and very affordable. Boots up instantly.', date: '2024-06-13T09:00:00Z' },
    ],
  },
  {
    id: 'accessory-005',
    name: 'Webcam Pro 4K',
    description: 'High-resolution webcam for professional video conferencing and streaming.',
    price: 199.00,
    imageUrl: 'https://picsum.photos/seed/webcam_pro_4k_main/600/400',
    gallery: [
        'https://picsum.photos/seed/webcam_pro_4k_a/800/600',
    ],
    category: 'Accessories',
    brand: 'Logitech',
    stock: 90,
    technicalSpecifications: {
        'Resolution': '4K Ultra HD (30fps), 1080p (60fps)',
        'Field of View': 'Adjustable (65°, 78°, 90°)',
        'Focus': 'Autofocus',
        'Features': 'HDR, RightLight 3, Windows Hello compatible',
        'Microphones': 'Dual omni-directional mics',
    },
    reviews: [
        { id: 'r29-1', author: 'Jean Grey', rating: 5, comment: 'Sharp video quality and great performance in low light.', date: '2024-06-14T11:45:00Z' },
    ],
  },
  {
    id: 'camera-004',
    name: 'EOS R7 Mirrorless Body',
    description: 'High-speed APS-C mirrorless camera, excellent for wildlife and sports photography.',
    price: 1499.00,
    imageUrl: 'https://picsum.photos/seed/camera_eos_r7_main/600/400',
    gallery: [
        'https://picsum.photos/seed/camera_eos_r7_a/800/600',
        'https://picsum.photos/seed/camera_eos_r7_b/800/600',
    ],
    category: 'Cameras',
    brand: 'Canon',
    stock: 40,
    technicalSpecifications: {
        'Sensor': '32.5MP APS-C CMOS',
        'Processor': 'DIGIC X',
        'ISO': '100-32000 (Expandable to 51200)',
        'Shooting Speed': 'Up to 15 fps (Mechanical), 30 fps (Electronic)',
        'Autofocus': 'Dual Pixel CMOS AF II',
        'Video': '4K 60p (oversampled)',
    },
    reviews: [
        { id: 'r30-1', author: 'Kurt Wagner', rating: 5, comment: 'Incredibly fast autofocus and burst shooting. Perfect for capturing action.', date: '2024-06-15T16:20:00Z' },
    ],
  },
  {
    id: 'audio-006',
    name: 'WH-1000XM6 Headphones',
    description: 'The next generation of industry-leading noise-canceling headphones from Sorny.',
    price: 399.99,
    imageUrl: 'https://picsum.photos/seed/headphones_wh1000xm6_main/600/400',
    gallery: [
        'https://picsum.photos/seed/headphones_wh1000xm6_a/800/600',
        'https://picsum.photos/seed/headphones_wh1000xm6_b/800/600',
    ],
    category: 'Audio',
    brand: 'Sorny',
    stock: 100,
    technicalSpecifications: {
        'Type': 'Over-ear, Wireless',
        'Noise Cancellation': 'Improved Active Noise Cancelling',
        'Connectivity': 'Bluetooth 5.4, LDAC, Multipoint',
        'Battery Life': 'Up to 30 hours (ANC on)',
        'Features': 'Speak-to-Chat, Adaptive Sound Control, Hi-Res Audio',
    },
    reviews: [
        { id: 'r31-1', author: 'Loki Laufeyson', rating: 5, comment: 'Sorny does it again. The ANC is even better than the XM5s.', date: '2024-06-16T10:00:00Z' },
    ],
  },
  {
    id: 'gaming-003',
    name: 'Switch Pro Controller',
    description: 'Official wireless controller for the Switch console with HD rumble and NFC.',
    price: 69.99,
    imageUrl: 'https://picsum.photos/seed/controller_switch_pro_main/600/400',
    gallery: [],
    category: 'Gaming',
    brand: 'Nintendo',
    stock: 200,
    technicalSpecifications: {
        'Connectivity': 'Bluetooth, USB-C',
        'Features': 'Motion Controls, HD Rumble, Amiibo NFC reader',
        'Battery Life': 'Up to 40 hours',
        'Compatibility': 'Nintendo Switch, PC (limited)',
    },
    reviews: [
        { id: 'r32-1', author: 'Matt Murdock', rating: 5, comment: 'Comfortable and reliable. Much better than the Joy-Cons for long sessions.', date: '2024-06-17T12:15:00Z' },
    ],
  },
  {
    id: 'tablet-003',
    name: 'Galaxy Tab S10',
    description: 'Premium Android tablet with a beautiful AMOLED display and S Pen support.',
    price: 799.00,
    imageUrl: 'https://picsum.photos/seed/tablet_galaxy_tab_s10_main/600/400',
    gallery: [
        'https://picsum.photos/seed/tablet_galaxy_tab_s10_a/800/600',
    ],
    category: 'Tablets',
    brand: 'Samsonic',
    stock: 90,
    technicalSpecifications: {
        'Display': '11-inch Dynamic AMOLED 2X',
        'Processor': 'Snapdragon 8 Gen 3 for Galaxy',
        'RAM': '8GB',
        'Storage': '128GB (Expandable via microSD)',
        'OS': 'Android 15 with One UI 7',
        'Features': 'S Pen included, Quad speakers tuned by AKG',
    },
    reviews: [
        { id: 'r33-1', author: 'Natasha Romanoff', rating: 4, comment: 'Gorgeous screen and the S Pen is great for notes. Android tablet apps still lag behind iPadOS.', date: '2024-06-18T14:00:00Z' },
    ],
  },
  {
    id: 'smartphone-005',
    name: 'ZenFone 11 Flip',
    description: 'Compact flagship phone with a unique flipping camera module.',
    price: 799.00,
    imageUrl: 'https://picsum.photos/seed/phone_zenfone_11_flip_main/600/400',
    gallery: [
        'https://picsum.photos/seed/phone_zenfone_11_flip_a/800/600',
        'https://picsum.photos/seed/phone_zenfone_11_flip_b/800/600',
    ],
    category: 'Smartphones',
    brand: 'ASUS',
    stock: 60,
    technicalSpecifications: {
        'Display': '6.0-inch AMOLED 120Hz',
        'Processor': 'Snapdragon 8+ Gen 2',
        'RAM': '8GB',
        'Storage': '256GB',
        'Camera': 'Flipping Module: 50MP Main, 12MP Ultrawide',
        'Battery': '4300 mAh',
        'OS': 'Android 14',
    },
    reviews: [
        { id: 'r34-1', author: 'Ororo Munroe', rating: 4, comment: 'Love the compact size and the flipping camera is fun and useful.', date: '2024-06-19T09:45:00Z' },
    ],
  },
  {
    id: 'accessory-006',
    name: 'Smart LED Light Strip (5m)',
    description: 'App-controlled LED strip to add ambient lighting to any room.',
    price: 29.99,
    imageUrl: 'https://picsum.photos/seed/light_strip_led_5m_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'Govee',
    stock: 300,
    technicalSpecifications: {
        'Length': '5 meters (16.4 ft)',
        'Color': 'RGBIC (Individually addressable LEDs)',
        'Control': 'App (Wi-Fi), Voice Assistant (Alexa, Google Assistant)',
        'Features': 'Music Sync, Scene Modes, Dimmable',
    },
    reviews: [
        { id: 'r35-1', author: 'Pepper Potts', rating: 5, comment: 'Easy setup and the app offers tons of customization. Looks great behind my TV.', date: '2024-06-20T17:00:00Z' },
    ],
  },
    {
    id: 'monitor-004',
    name: 'Curved Gaming Monitor 27" QHD',
    description: 'Fast refresh rate curved monitor for immersive gaming.',
    price: 349.99,
    imageUrl: 'https://picsum.photos/seed/monitor_curved_gaming_27_main/600/400',
    gallery: [
        'https://picsum.photos/seed/monitor_curved_gaming_27_a/800/600',
    ],
    category: 'Monitors',
    brand: 'MSI',
    stock: 75,
    technicalSpecifications: {
        'Panel Type': 'VA',
        'Resolution': '2560 x 1440 (QHD)',
        'Refresh Rate': '165Hz',
        'Response Time': '1ms (MPRT)',
        'Curvature': '1500R',
        'Features': 'FreeSync Premium, Anti-Flicker, Less Blue Light',
    },
    reviews: [
        { id: 'r36-1', author: 'Quicksilver Maximoff', rating: 4, comment: 'Good value for a 165Hz QHD monitor. Colors are decent for a VA panel.', date: '2024-06-21T11:00:00Z' },
    ],
  },
  {
    id: 'laptop-006',
    name: 'XPS 15 Ultrabook',
    description: 'Premium Windows laptop with a stunning InfinityEdge display and excellent build quality.',
    price: 1899.00,
    imageUrl: 'https://picsum.photos/seed/laptop_xps_15_main/600/400',
    gallery: [
        'https://picsum.photos/seed/laptop_xps_15_a/800/600',
        'https://picsum.photos/seed/laptop_xps_15_b/800/600',
    ],
    category: 'Laptops',
    brand: 'Dell',
    stock: 45,
    technicalSpecifications: {
        'Processor': 'Intel Core Ultra 7 155H',
        'RAM': '16GB LPDDR5x',
        'Storage': '1TB NVMe SSD',
        'Display': '15.6-inch 3.5K OLED Touch',
        'Graphics': 'NVIDIA GeForce RTX 4050 Laptop GPU',
        'OS': 'Windows 11 Pro',
        'Weight': '1.86 kg',
    },
    reviews: [
        { id: 'r37-1', author: 'Reed Richards', rating: 5, comment: 'The display is absolutely breathtaking. Performance is solid.', date: '2024-06-22T13:20:00Z' },
    ],
  },
  {
    id: 'audio-007',
    name: 'JBL Flip 7 Portable Speaker',
    description: 'Compact and powerful portable speaker with improved sound and connectivity.',
    price: 129.95,
    imageUrl: 'https://picsum.photos/seed/speaker_jbl_flip_7_main/600/400',
    gallery: [
        'https://picsum.photos/seed/speaker_jbl_flip_7_a/800/600',
    ],
    category: 'Audio',
    brand: 'JBL',
    stock: 150,
    technicalSpecifications: {
        'Type': 'Portable Bluetooth Speaker',
        'Connectivity': 'Bluetooth 5.3 Auracast',
        'Battery Life': 'Up to 12 hours',
        'Water Resistance': 'IP67',
        'Features': 'PartyBoost compatible',
    },
    reviews: [
        { id: 'r38-1', author: 'Scott Lang', rating: 4, comment: 'Great sound for its size, perfect for taking anywhere.', date: '2024-06-23T10:00:00Z' },
    ],
  },
  {
    id: 'accessory-007',
    name: '4-Port USB 3.0 Hub',
    description: 'Simple and compact hub to add more USB-A ports to your computer.',
    price: 12.99,
    imageUrl: 'https://picsum.photos/seed/hub_usb3_4port_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'TP-Link',
    stock: 400,
    technicalSpecifications: {
        'Ports': '4 x USB 3.0 Type-A',
        'Interface': 'USB 3.0 Type-A',
        'Data Transfer Speed': 'Up to 5Gbps',
        'Material': 'ABS Plastic',
    },
    reviews: [
        { id: 'r39-1', author: 'Susan Storm', rating: 5, comment: 'Does exactly what it needs to do. Inexpensive and reliable.', date: '2024-06-24T15:00:00Z' },
    ],
  },
  {
    id: 'camera-005',
    name: 'Lumix S5 II Full Frame',
    description: 'Hybrid full-frame camera with excellent video features and phase-detection AF.',
    price: 1997.99,
    imageUrl: 'https://picsum.photos/seed/camera_lumix_s5ii_main/600/400',
    gallery: [
        'https://picsum.photos/seed/camera_lumix_s5ii_a/800/600',
        'https://picsum.photos/seed/camera_lumix_s5ii_b/800/600',
    ],
    category: 'Cameras',
    brand: 'Panasonic',
    stock: 30,
    technicalSpecifications: {
        'Sensor': '24.2MP Full-Frame CMOS',
        'Processor': 'Venus Engine',
        'Autofocus': 'Phase Hybrid AF',
        'Video': '6K 30p, 4K 60p (Internal)',
        'Stabilization': '5-axis Dual I.S. 2 (up to 6.5 stops)',
        'Screen': '3-inch Free-angle Touch LCD',
    },
    reviews: [
        { id: 'r40-1', author: "T'Challa Udaku", rating: 5, comment: 'Finally, PDAF on a Lumix! Video features are top-notch.', date: '2024-06-25T09:10:00Z' },
    ],
  },
   {
    id: 'gaming-004',
    name: 'Elite Wireless Controller Series 3',
    description: 'Premium customizable controller for serious gamers.',
    price: 179.99,
    imageUrl: 'https://picsum.photos/seed/controller_elite_3_main/600/400',
    gallery: [
        'https://picsum.photos/seed/controller_elite_3_a/800/600',
    ],
    category: 'Gaming',
    brand: 'Macrosoft',
    stock: 80,
    technicalSpecifications: {
        'Connectivity': 'Bluetooth, USB-C, Xbox Wireless',
        'Features': 'Interchangeable components, Adjustable-tension thumbsticks, Hair trigger locks, Rubberized grip',
        'Battery Life': 'Up to 40 hours (rechargeable)',
        'Compatibility': 'Xbox Series X|S, Xbox One, Windows PC',
    },
    reviews: [
        { id: 'r41-1', author: 'Thor Odinson', rating: 5, comment: 'Feels great in hand, tons of customization options.', date: '2024-06-26T16:00:00Z' },
    ],
  },
  {
    id: 'tablet-004',
    name: 'Fire Max 11 Tablet',
    description: 'Affordable large-screen tablet for entertainment and light productivity.',
    price: 229.99,
    imageUrl: 'https://picsum.photos/seed/tablet_fire_max_11_main/600/400',
    gallery: [],
    category: 'Tablets',
    brand: 'Amazon',
    stock: 110,
    technicalSpecifications: {
        'Display': '11-inch 2K (2000 x 1200)',
        'Processor': 'MediaTek MT8188J Octa-core',
        'RAM': '4GB',
        'Storage': '64GB (Expandable via microSD)',
        'OS': 'Fire OS 8',
        'Features': 'Stylus support (sold separately), Fingerprint sensor',
    },
    reviews: [
        { id: 'r42-1', author: 'Ulysses Klaue', rating: 4, comment: 'Great screen for the price. Good for streaming video.', date: '2024-06-27T10:30:00Z' },
    ],
  },
  {
    id: 'smartphone-006',
    name: 'Moto Edge+ (2024)',
    description: 'Motorola flagship with a focus on display quality and clean software.',
    price: 799.99,
    imageUrl: 'https://picsum.photos/seed/phone_moto_edgeplus_2024_main/600/400',
    gallery: [
        'https://picsum.photos/seed/phone_moto_edgeplus_2024_a/800/600',
    ],
    category: 'Smartphones',
    brand: 'Motorola',
    stock: 70,
    technicalSpecifications: {
        'Display': '6.7-inch pOLED Endless Edge 165Hz',
        'Processor': 'Snapdragon 8 Gen 3',
        'RAM': '12GB',
        'Storage': '256GB',
        'Camera': '50MP Main, 50MP Ultrawide/Macro, 12MP Telephoto (2x)',
        'Battery': '4600 mAh',
        'OS': 'Android 14 (Near-stock)',
    },
    reviews: [
        { id: 'r43-1', author: 'Valkyrie Brunnhilde', rating: 4, comment: 'Beautiful display and smooth performance. Camera is good but not class-leading.', date: '2024-06-28T14:15:00Z' },
    ],
  },
  {
    id: 'accessory-008',
    name: 'Laptop Stand Adjustable',
    description: 'Ergonomic aluminum laptop stand to improve posture and airflow.',
    price: 25.99,
    imageUrl: 'https://picsum.photos/seed/stand_laptop_adjustable_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'Nulaxy',
    stock: 350,
    technicalSpecifications: {
        'Material': 'Aluminum Alloy',
        'Compatibility': 'Laptops 10-17 inches',
        'Features': 'Adjustable height and angle, Foldable, Anti-slip silicone pads',
    },
    reviews: [
        { id: 'r44-1', author: 'Wasp Janet', rating: 5, comment: 'Sturdy and helps keep my laptop cool. Much more comfortable to type.', date: '2024-06-29T09:00:00Z' },
    ],
  },
  {
    id: 'monitor-005',
    name: 'BenQ MOBIUZ EX2710Q',
    description: '27-inch QHD IPS gaming monitor with HDRi and built-in speakers.',
    price: 399.99,
    imageUrl: 'https://picsum.photos/seed/monitor_benq_mobiuz_ex2710q_main/600/400',
    gallery: [
        'https://picsum.photos/seed/monitor_benq_mobiuz_ex2710q_a/800/600',
    ],
    category: 'Monitors',
    brand: 'BenQ',
    stock: 65,
    technicalSpecifications: {
        'Panel Type': 'IPS',
        'Resolution': '2560 x 1440 (QHD)',
        'Refresh Rate': '165Hz',
        'Response Time': '1ms (MPRT)',
        'Features': 'HDRi, FreeSync Premium, treVolo Speakers (2.1 channel)',
    },
    reviews: [
        { id: 'r45-1', author: 'Yondu Udonta', rating: 4, comment: 'Good image quality and the speakers are surprisingly decent for a monitor.', date: '2024-06-30T11:30:00Z' },
    ],
  },
   {
    id: 'laptop-007',
    name: 'ThinkPad Carbon X1 Gen 12',
    description: 'Premium business ultrabook known for its durability and keyboard.',
    price: 1649.00,
    imageUrl: 'https://picsum.photos/seed/laptop_thinkpad_x1_carbon_g12_main/600/400',
    gallery: [
      'https://picsum.photos/seed/laptop_thinkpad_x1_carbon_g12_a/800/600',
    ],
    category: 'Laptops',
    brand: 'Lenovo',
    stock: 55,
    technicalSpecifications: {
      'Processor': 'Intel Core Ultra 7 155U',
      'RAM': '16GB LPDDR5x',
      'Storage': '512GB NVMe SSD',
      'Display': '14-inch WUXGA IPS Anti-Glare',
      'OS': 'Windows 11 Pro',
      'Weight': '1.12 kg',
      'Features': 'Legendary Keyboard, TrackPoint, MIL-STD 810H certified',
    },
    reviews: [
      { id: 'r46-1', author: 'Agent Coulson', rating: 5, comment: 'Best keyboard on any laptop, period. Lightweight and tough.', date: '2024-07-01T10:00:00Z' },
    ],
  },
  {
    id: 'audio-008',
    name: 'Beats Studio Buds +',
    description: 'True wireless earbuds with active noise cancellation and spatial audio support.',
    price: 169.95,
    imageUrl: 'https://picsum.photos/seed/earbuds_beats_studio_plus_main/600/400',
    gallery: [
      'https://picsum.photos/seed/earbuds_beats_studio_plus_a/800/600',
      'https://picsum.photos/seed/earbuds_beats_studio_plus_b/800/600',
    ],
    category: 'Audio',
    brand: 'Beats by Pear',
    stock: 130,
    technicalSpecifications: {
      'Type': 'In-ear, True Wireless',
      'Noise Cancellation': 'Active Noise Cancelling (ANC)',
      'Connectivity': 'Bluetooth 5.3',
      'Battery Life': 'Up to 9 hours (earbuds), 36 hours (with case)',
      'Water Resistance': 'IPX4',
      'Features': 'Spatial Audio, Transparency Mode, Fast Fuel charging',
    },
    reviews: [
      { id: 'r47-1', author: 'Baron Zemo', rating: 4, comment: 'Good sound and ANC, comfortable fit. Seamless pairing with iPear.', date: '2024-07-02T14:30:00Z' },
    ],
  },
  {
    id: 'camera-006',
    name: 'ZV-E10 Mirrorless Vlog Camera',
    description: 'APS-C mirrorless camera designed specifically for vlogging and content creation.',
    price: 798.00, // Often bundled with kit lens
    imageUrl: 'https://picsum.photos/seed/camera_zv_e10_main/600/400',
    gallery: [
      'https://picsum.photos/seed/camera_zv_e10_a/800/600',
    ],
    category: 'Cameras',
    brand: 'Sorny',
    stock: 70,
    technicalSpecifications: {
      'Sensor': '24.2MP APS-C Exmor CMOS',
      'Lens Mount': 'Sorny E-mount',
      'Screen': 'Vari-angle LCD Touchscreen',
      'Video': '4K 30p',
      'Features': 'Product Showcase Setting, Background Defocus, Directional 3-Capsule Mic',
    },
    reviews: [
      { id: 'r48-1', author: 'Captain Carter', rating: 5, comment: 'Makes vlogging so much easier. Autofocus is great for face tracking.', date: '2024-07-03T11:00:00Z' },
    ],
  },
  {
    id: 'accessory-009',
    name: 'Gaming Mouse Pad XXL',
    description: 'Extended mouse pad providing ample space for mouse and keyboard.',
    price: 19.99,
    imageUrl: 'https://picsum.photos/seed/mousepad_xxl_gaming_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'SteelSeries',
    stock: 280,
    technicalSpecifications: {
      'Dimensions': '900mm x 400mm x 4mm',
      'Surface': 'Micro-woven cloth',
      'Base': 'Non-slip rubber',
      'Edge': 'Stitched',
    },
    reviews: [
      { id: 'r49-1', author: 'Doctor Strange', rating: 4, comment: 'Smooth surface, plenty of room. Simple and effective.', date: '2024-07-04T09:20:00Z' },
    ],
  },
  {
    id: 'gaming-005',
    name: 'Steam Deck OLED',
    description: 'Portable PC gaming device with an upgraded OLED screen.',
    price: 549.00,
    imageUrl: 'https://picsum.photos/seed/handheld_steam_deck_oled_main/600/400',
    gallery: [
      'https://picsum.photos/seed/handheld_steam_deck_oled_a/800/600',
    ],
    category: 'Gaming',
    brand: 'Valve',
    stock: 50,
    technicalSpecifications: {
      'Display': '7.4-inch HDR OLED 90Hz',
      'APU': 'Custom AMD APU (Zen 2 + RDNA 2)',
      'RAM': '16GB LPDDR5',
      'Storage': '512GB NVMe SSD',
      'OS': 'SteamOS 3 (Arch Linux based)',
      'Features': 'Trackpads, Gyro, Wi-Fi 6E',
    },
    reviews: [
      { id: 'r50-1', author: 'Elektra Natchios', rating: 5, comment: 'The OLED screen is a huge improvement. Great way to play PC games on the go.', date: '2024-07-05T15:00:00Z' },
    ],
  },
   {
    id: 'tablet-005',
    name: 'Remarkable 2 Paper Tablet',
    description: 'Digital notebook that feels like paper, designed for note-taking and reading.',
    price: 299.00,
    imageUrl: 'https://picsum.photos/seed/tablet_remarkable_2_main/600/400',
    gallery: [
      'https://picsum.photos/seed/tablet_remarkable_2_a/800/600',
    ],
    category: 'Tablets',
    brand: 'reMarkable',
    stock: 60,
    technicalSpecifications: {
      'Display': '10.3” monochrome digital paper display (e-ink)',
      'Resolution': '1872 x 1404 (226 DPI)',
      'Input': 'Marker Plus (Stylus, sold separately)',
      'Storage': '8GB internal',
      'OS': 'Codex (Linux-based)',
    },
    reviews: [
      { id: 'r51-1', author: 'Falcon Wilson', rating: 4, comment: 'Amazing writing experience, truly feels like paper. Limited functionality beyond notes/PDFs.', date: '2024-07-06T12:45:00Z' },
    ],
  },
  {
    id: 'smartphone-007',
    name: 'Nothing Phone (3)',
    description: 'Unique transparent design smartphone with Glyph interface.',
    price: 699.00,
    imageUrl: 'https://picsum.photos/seed/phone_nothing_3_main/600/400',
    gallery: [
      'https://picsum.photos/seed/phone_nothing_3_a/800/600',
      'https://picsum.photos/seed/phone_nothing_3_b/800/600',
    ],
    category: 'Smartphones',
    brand: 'Nothing',
    stock: 85,
    technicalSpecifications: {
      'Display': '6.7-inch OLED 120Hz',
      'Processor': 'Snapdragon 8s Gen 3',
      'RAM': '12GB',
      'Storage': '256GB',
      'Camera': '50MP Main, 50MP Ultrawide',
      'Features': 'Glyph Interface, Nothing OS 2.5',
    },
    reviews: [
      { id: 'r52-1', author: 'Groot Tree', rating: 4, comment: 'I am Groot! (Translation: Cool design, software is clean.)', date: '2024-07-07T10:00:00Z' },
    ],
  },
  {
    id: 'accessory-010',
    name: 'Wireless Charging Stand 3-in-1',
    description: 'Charge your phone, earbuds, and smartwatch simultaneously.',
    price: 45.99,
    imageUrl: 'https://picsum.photos/seed/charger_3in1_wireless_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'Belkin',
    stock: 190,
    technicalSpecifications: {
      'Phone Output': 'Up to 15W Qi',
      'Earbuds Output': '5W Qi',
      'Watch Output': '5W (proprietary for Pear Watch)',
      'Input': 'USB-C (Adapter included)',
    },
    reviews: [
      { id: 'r53-1', author: 'Hope van Dyne', rating: 5, comment: 'Convenient and declutters my nightstand.', date: '2024-07-08T13:00:00Z' },
    ],
  },
  {
    id: 'monitor-006',
    name: 'LG C4 42" OLED evo TV/Monitor',
    description: 'Versatile OLED display perfect as a small TV or large desktop monitor.',
    price: 1199.99,
    imageUrl: 'https://picsum.photos/seed/monitor_lg_c4_42_oled_main/600/400',
    gallery: [
      'https://picsum.photos/seed/monitor_lg_c4_42_oled_a/800/600',
    ],
    category: 'Monitors',
    brand: 'LG Electronics',
    stock: 40,
    technicalSpecifications: {
      'Panel Type': 'OLED evo',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Refresh Rate': '120Hz',
      'Features': 'G-Sync Compatible, FreeSync Premium, webOS Smart TV',
      'Connectivity': 'HDMI 2.1 x4, USB x3, Ethernet, Wi-Fi',
    },
    reviews: [
      { id: 'r54-1', author: 'Iron Fist', rating: 5, comment: 'Incredible picture quality for gaming and movies. Perfect blacks.', date: '2024-07-09T16:30:00Z' },
    ],
  },
  {
    id: 'laptop-008',
    name: 'Surface Laptop Go 3',
    description: 'Lightweight and affordable Surface laptop for everyday tasks.',
    price: 799.99,
    imageUrl: 'https://picsum.photos/seed/laptop_surface_go_3_main/600/400',
    gallery: [
      'https://picsum.photos/seed/laptop_surface_go_3_a/800/600',
    ],
    category: 'Laptops',
    brand: 'Macrosoft',
    stock: 90,
    technicalSpecifications: {
      'Processor': 'Intel Core i5 12th Gen',
      'RAM': '8GB LPDDR5',
      'Storage': '256GB SSD',
      'Display': '12.4-inch PixelSense Touchscreen',
      'OS': 'Windows 11 Home',
      'Weight': '1.13 kg',
    },
    reviews: [
      { id: 'r55-1', author: 'Jessica Jones', rating: 4, comment: 'Very portable and well-built for the price. Good for students or basic use.', date: '2024-07-10T11:15:00Z' },
    ],
  },
   {
    id: 'audio-009',
    name: 'Sennheiser HD 660S2 Headphones',
    description: 'Open-back audiophile headphones renowned for their natural sound.',
    price: 599.95,
    imageUrl: 'https://picsum.photos/seed/headphones_sennheiser_hd660s2_main/600/400',
    gallery: [],
    category: 'Audio',
    brand: 'Sennheiser',
    stock: 30,
    technicalSpecifications: {
      'Type': 'Over-ear, Open-back',
      'Impedance': '300 Ohms',
      'Frequency Response': '8 Hz - 41,500 Hz',
      'Connectivity': 'Wired (6.3mm and 4.4mm Pentaconn cables included)',
    },
    reviews: [
      { id: 'r56-1', author: 'Killmonger Erik', rating: 5, comment: 'Incredible detail and soundstage. Requires a dedicated headphone amp.', date: '2024-07-11T14:00:00Z' },
    ],
  },
  {
    id: 'camera-007',
    name: 'Nikon Zf Full-Frame Retro',
    description: 'Full-frame mirrorless camera with a classic design and modern features.',
    price: 1996.95, // Body only
    imageUrl: 'https://picsum.photos/seed/camera_nikon_zf_main/600/400',
    gallery: [
      'https://picsum.photos/seed/camera_nikon_zf_a/800/600',
      'https://picsum.photos/seed/camera_nikon_zf_b/800/600',
    ],
    category: 'Cameras',
    brand: 'Nikon',
    stock: 25,
    technicalSpecifications: {
      'Sensor': '24.5MP Full-Frame BSI CMOS',
      'Processor': 'EXPEED 7',
      'ISO': '100-64000 (Expandable)',
      'Video': '4K 60p (DX crop), 4K 30p (Full-Frame)',
      'Features': 'Retro dials, Vari-angle screen, Subject detection AF',
    },
    reviews: [
      { id: 'r57-1', author: 'Luke Cage', rating: 5, comment: 'Love the retro look and feel. Image quality is superb.', date: '2024-07-12T10:30:00Z' },
    ],
  },
  {
    id: 'accessory-011',
    name: 'Power Bank 20000mAh PD',
    description: 'High-capacity power bank with Power Delivery for fast charging laptops and phones.',
    price: 49.99,
    imageUrl: 'https://picsum.photos/seed/powerbank_20k_pd_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'Anker',
    stock: 220,
    technicalSpecifications: {
      'Capacity': '20000 mAh',
      'Output Ports': '1x USB-C PD (45W), 2x USB-A (18W total)',
      'Input Port': 'USB-C PD (30W)',
      'Features': 'Trickle-Charging mode for low-power devices',
    },
    reviews: [
      { id: 'r58-1', author: 'Mantis Alien', rating: 4, comment: 'Charges my laptop and phone quickly. A bit heavy but expected for the capacity.', date: '2024-07-13T15:45:00Z' },
    ],
  },
  {
    id: 'gaming-006',
    name: 'Nintendo Switch - OLED Model',
    description: 'Versatile hybrid console with a vibrant OLED screen.',
    price: 349.99,
    imageUrl: 'https://picsum.photos/seed/console_switch_oled_main/600/400',
    gallery: [
      'https://picsum.photos/seed/console_switch_oled_a/800/600',
    ],
    category: 'Gaming',
    brand: 'Nintendo',
    stock: 100,
    technicalSpecifications: {
      'Display': '7.0-inch OLED Touchscreen',
      'Storage': '64GB internal (Expandable via microSD)',
      'Modes': 'TV mode, Tabletop mode, Handheld mode',
      'Features': 'Detachable Joy-Con controllers, Wide adjustable stand',
    },
    reviews: [
      { id: 'r59-1', author: 'Nebula Cyborg', rating: 5, comment: 'The OLED screen makes a big difference. Great library of games.', date: '2024-07-14T11:00:00Z' },
    ],
  },
  {
    id: 'tablet-006',
    name: 'Lenovo Tab P12',
    description: 'Large-screen Android tablet focused on entertainment and productivity.',
    price: 349.99,
    imageUrl: 'https://picsum.photos/seed/tablet_lenovo_p12_main/600/400',
    gallery: [],
    category: 'Tablets',
    brand: 'Lenovo',
    stock: 75,
    technicalSpecifications: {
      'Display': '12.7-inch 3K LCD',
      'Processor': 'MediaTek Dimensity 7050',
      'RAM': '8GB',
      'Storage': '128GB (Expandable)',
      'OS': 'Android 13',
      'Features': 'Quad JBL speakers, Stylus support',
    },
    reviews: [
      { id: 'r60-1', author: 'Okoye General', rating: 4, comment: 'Excellent large display for media consumption. Good value.', date: '2024-07-15T09:00:00Z' },
    ],
  },
    {
    id: 'smartphone-008',
    name: 'Fairphone 5',
    description: 'Sustainable and repairable smartphone built to last.',
    price: 699.00,
    imageUrl: 'https://picsum.photos/seed/phone_fairphone_5_main/600/400',
    gallery: [
      'https://picsum.photos/seed/phone_fairphone_5_a/800/600',
    ],
    category: 'Smartphones',
    brand: 'Fairphone',
    stock: 40,
    technicalSpecifications: {
      'Display': '6.46-inch OLED 90Hz',
      'Processor': 'Qualcomm QCM6490 (Industrial)',
      'RAM': '8GB',
      'Storage': '256GB (Expandable)',
      'Camera': '50MP Main, 50MP Ultrawide',
      'Features': 'User-replaceable modules, 5-year warranty, 8 years software support',
    },
    reviews: [
      { id: 'r61-1', author: 'Professor Hulk', rating: 5, comment: 'Love the repairability and long software support. Good enough performance.', date: '2024-07-16T13:30:00Z' },
    ],
  },
  {
    id: 'monitor-007',
    name: 'Dell UltraSharp 27 USB-C Hub Monitor - U2723QE',
    description: 'Productivity monitor with 4K resolution, IPS Black technology, and extensive connectivity.',
    price: 619.99,
    imageUrl: 'https://picsum.photos/seed/monitor_dell_u2723qe_main/600/400',
    gallery: [
      'https://picsum.photos/seed/monitor_dell_u2723qe_a/800/600',
    ],
    category: 'Monitors',
    brand: 'Dell',
    stock: 80,
    technicalSpecifications: {
      'Panel Type': 'IPS Black',
      'Resolution': '3840 x 2160 (4K UHD)',
      'Contrast Ratio': '2000:1',
      'Color Gamut': '100% sRGB, 98% DCI-P3',
      'Connectivity': 'USB-C (90W PD, DP Alt Mode), HDMI, DisplayPort, USB Hub, RJ45 Ethernet',
    },
    reviews: [
      { id: 'r62-1', author: 'Rocket Raccoon', rating: 5, comment: 'Fantastic contrast for an IPS. The built-in hub is super convenient.', date: '2024-07-17T10:00:00Z' },
    ],
  },
  {
    id: 'laptop-009',
    name: 'HP Spectre x360 14',
    description: 'Premium convertible laptop with a sleek design and OLED display option.',
    price: 1449.99,
    imageUrl: 'https://picsum.photos/seed/laptop_hp_spectre_x360_14_main/600/400',
    gallery: [
      'https://picsum.photos/seed/laptop_hp_spectre_x360_14_a/800/600',
    ],
    category: 'Laptops',
    brand: 'HP',
    stock: 50,
    technicalSpecifications: {
      'Processor': 'Intel Core Ultra 7 155H',
      'RAM': '16GB LPDDR5x',
      'Storage': '1TB NVMe SSD',
      'Display': '14-inch 2.8K OLED Touchscreen',
      'OS': 'Windows 11 Home',
      'Features': '360-degree hinge, Included Stylus, Bang & Olufsen Audio',
    },
    reviews: [
      { id: 'r63-1', author: 'Shuri Princess', rating: 4, comment: 'Stunning design and display. Keyboard is a bit shallow.', date: '2024-07-18T15:00:00Z' },
    ],
  },
  {
    id: 'accessory-012',
    name: 'Ergo Mesh Office Chair',
    description: 'Ergonomic office chair with breathable mesh back and adjustable lumbar support.',
    price: 299.00,
    imageUrl: 'https://picsum.photos/seed/chair_ergo_mesh_office_main/600/400',
    gallery: [],
    category: 'Accessories',
    brand: 'Autonomous',
    stock: 100,
    technicalSpecifications: {
      'Material': 'Mesh Back, Fabric Seat, Nylon Frame',
      'Adjustability': 'Lumbar Support, Armrests (Height/Width), Seat Depth, Tilt Lock',
      'Weight Capacity': '300 lbs',
    },
    reviews: [
      { id: 'r64-1', author: 'Star-Lord Quill', rating: 5, comment: 'Super comfortable for long work sessions. Great adjustability.', date: '2024-07-19T11:45:00Z' },
    ],
  },
  {
    id: 'audio-010',
    name: 'Sonos Era 100 Smart Speaker',
    description: 'Compact smart speaker with room-filling stereo sound and voice control.',
    price: 249.00,
    imageUrl: 'https://picsum.photos/seed/speaker_sonos_era100_main/600/400',
    gallery: [
      'https://picsum.photos/seed/speaker_sonos_era100_a/800/600',
    ],
    category: 'Audio',
    brand: 'Sonos',
    stock: 90,
    technicalSpecifications: {
      'Type': 'Smart Speaker',
      'Connectivity': 'Wi-Fi, Bluetooth 5.0, AirPlay 2, Line-in (via adapter)',
      'Voice Assistants': 'Sonos Voice Control, Amazon Alexa',
      'Features': 'Trueplay tuning, Stereo pairing capable',
    },
    reviews: [
      { id: 'r65-1', author: 'Thanos Titan', rating: 4, comment: 'Excellent sound for its size. App setup is easy. Wish it had Google Assistant.', date: '2024-07-20T10:00:00Z' },
    ],
  },
  {
    id: 'camera-008',
    name: 'Insta360 X4 360 Camera',
    description: 'Capture immersive 8K 360 video with incredible stabilization.',
    price: 499.99,
    imageUrl: 'https://picsum.photos/seed/camera_insta360_x4_main/600/400',
    gallery: [
      'https://picsum.photos/seed/camera_insta360_x4_a/800/600',
    ],
    category: 'Cameras',
    brand: 'Insta360',
    stock: 65,
    technicalSpecifications: {
      'Video Resolution (360)': '8K30, 5.7K60',
      'Photo Resolution (360)': '72MP',
      'Stabilization': 'FlowState Stabilization',
      'Waterproof': '10m (33ft)',
      'Features': 'Invisible Selfie Stick, AI Editing, Gesture Control',
    },
    reviews: [
      { id: 'r66-1', author: 'Vision Android', rating: 5, comment: 'Amazing 360 capabilities and the software makes editing easy.', date: '2024-07-21T14:20:00Z' },
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
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 20));
  const categories = Array.from(new Set(mockProducts.map(p => p.category))).sort();
   console.log("getCategories returning:", categories); // Debug log
  return categories;
}

/**
 * Retrieves a list of unique product brands.
 * @returns A promise that resolves to an array of unique brand strings.
 */
export async function getBrands(): Promise<string[]> {
   console.log("getBrands called"); // Debug log
   // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 20));
  const brands = Array.from(new Set(mockProducts.map(p => p.brand))).sort();
    console.log("getBrands returning:", brands); // Debug log
  return brands;
}
