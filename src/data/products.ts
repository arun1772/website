import { Product, Category } from '../types';

export const categories: Category[] = [
  { id: '1', name: 'Electronics', icon: 'Smartphone', color: 'from-blue-500 to-purple-600' },
  { id: '2', name: 'Fashion', icon: 'Shirt', color: 'from-pink-500 to-rose-600' },
  { id: '3', name: 'Home & Living', icon: 'Home', color: 'from-green-500 to-emerald-600' },
  { id: '4', name: 'Books', icon: 'Book', color: 'from-orange-500 to-red-600' },
  { id: '5', name: 'Sports', icon: 'Zap', color: 'from-cyan-500 to-blue-600' },
  { id: '6', name: 'Beauty', icon: 'Sparkles', color: 'from-purple-500 to-pink-600' },
  { id: '7', name: 'Toys & Games', icon: 'GameController2', color: 'from-indigo-500 to-purple-600' },
  { id: '8', name: 'Gift Cards', icon: 'Gift', color: 'from-yellow-500 to-orange-600' }
];

export const products: Product[] = [
  {
    id: '1',
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium quality wireless headphones with noise cancellation and 30-hour battery life.',
    price: 2999,
    originalPrice: 4999,
    images: [
      'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/1649771/pexels-photo-1649771.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Electronics',
    rating: 4.5,
    reviews: 1234,
    inStock: true,
    features: ['Noise Cancellation', '30-hour Battery', 'Quick Charge', 'Bluetooth 5.0'],
    tags: ['wireless', 'bluetooth', 'audio', 'headphones'],
    isNew: true,
    isFeatured: true
  },
  {
    id: '2',
    name: 'Smartwatch Pro Series',
    description: 'Advanced fitness tracking smartwatch with heart rate monitoring and GPS.',
    price: 8999,
    originalPrice: 12999,
    images: [
      'https://images.pexels.com/photos/393047/pexels-photo-393047.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/437037/pexels-photo-437037.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Electronics',
    rating: 4.7,
    reviews: 856,
    inStock: true,
    features: ['GPS Tracking', 'Heart Rate Monitor', 'Water Resistant', '7-day Battery'],
    tags: ['smartwatch', 'fitness', 'health', 'gps'],
    isNew: false,
    isFeatured: true
  },
  {
    id: '3',
    name: 'Premium Cotton T-Shirt',
    description: 'Soft and comfortable 100% cotton t-shirt available in multiple colors.',
    price: 799,
    originalPrice: 1299,
    images: [
      'https://images.pexels.com/photos/1598505/pexels-photo-1598505.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/1598507/pexels-photo-1598507.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Fashion',
    rating: 4.3,
    reviews: 432,
    inStock: true,
    features: ['100% Cotton', 'Machine Washable', 'Multiple Colors', 'Comfortable Fit'],
    tags: ['t-shirt', 'cotton', 'casual', 'comfortable'],
    isNew: false,
    isFeatured: false
  },
  {
    id: '4',
    name: 'Decorative Table Lamp',
    description: 'Modern LED table lamp with adjustable brightness and USB charging port.',
    price: 1599,
    originalPrice: 2299,
    images: [
      'https://images.pexels.com/photos/1112598/pexels-photo-1112598.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/1112604/pexels-photo-1112604.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Home & Living',
    rating: 4.6,
    reviews: 298,
    inStock: true,
    features: ['LED Light', 'Adjustable Brightness', 'USB Charging', 'Modern Design'],
    tags: ['lamp', 'led', 'home', 'decoration'],
    isNew: true,
    isFeatured: false
  },
  {
    id: '5',
    name: 'Bestselling Novel Collection',
    description: 'A collection of 5 bestselling novels from award-winning authors.',
    price: 1299,
    originalPrice: 2499,
    images: [
      'https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/1029142/pexels-photo-1029142.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Books',
    rating: 4.8,
    reviews: 1567,
    inStock: true,
    features: ['5 Books', 'Award Winners', 'Hardcover', 'Gift Edition'],
    tags: ['books', 'novels', 'reading', 'collection'],
    isNew: false,
    isFeatured: true
  },
  {
    id: '6',
    name: 'Yoga Mat Premium',
    description: 'Non-slip yoga mat with extra thickness for comfort and stability.',
    price: 999,
    originalPrice: 1799,
    images: [
      'https://images.pexels.com/photos/3822906/pexels-photo-3822906.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/3822907/pexels-photo-3822907.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Sports',
    rating: 4.4,
    reviews: 789,
    inStock: true,
    features: ['Non-slip Surface', 'Extra Thick', 'Easy to Clean', 'Carrying Strap'],
    tags: ['yoga', 'fitness', 'mat', 'exercise'],
    isNew: false,
    isFeatured: false
  },
  {
    id: '7',
    name: 'Luxury Skincare Set',
    description: 'Complete skincare routine with cleanser, toner, serum, and moisturizer.',
    price: 2799,
    originalPrice: 4599,
    images: [
      'https://images.pexels.com/photos/4465124/pexels-photo-4465124.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/4465831/pexels-photo-4465831.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Beauty',
    rating: 4.7,
    reviews: 645,
    inStock: true,
    features: ['4-step Routine', 'Natural Ingredients', 'All Skin Types', 'Dermatologist Tested'],
    tags: ['skincare', 'beauty', 'natural', 'routine'],
    isNew: true,
    isFeatured: true
  },
  {
    id: '8',
    name: 'Board Game Deluxe Edition',
    description: 'Strategic board game for 2-4 players with premium components.',
    price: 1899,
    originalPrice: 2999,
    images: [
      'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/278887/pexels-photo-278887.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Toys & Games',
    rating: 4.9,
    reviews: 234,
    inStock: true,
    features: ['2-4 Players', 'Premium Components', 'Strategy Game', 'Ages 10+'],
    tags: ['board game', 'strategy', 'family', 'premium'],
    isNew: false,
    isFeatured: false
  },
  {
    id: '9', 
    name: 'Wireless Gaming Mouse',
    description: 'High-precision wireless gaming mouse with RGB lighting and programmable buttons.',
    price: 2499,
    originalPrice: 3999,
    images: [
      'https://images.pexels.com/photos/2115256/pexels-photo-2115256.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Electronics',
    rating: 4.8,
    reviews: 567,
    inStock: true,
    features: ['Wireless Connectivity', 'RGB Lighting', 'Programmable Buttons', 'High DPI'],
    tags: ['gaming', 'mouse', 'rgb', 'wireless'],
    isNew: false,
    isFeatured: true,
    isUpcoming: false
  },
  {
    id: '10',
    name: 'Designer Handbag',
    description: 'Elegant leather handbag perfect for both casual and formal occasions.',
    price: 3999,
    originalPrice: 6999,
    images: [
      'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1',
      'https://images.pexels.com/photos/1152078/pexels-photo-1152078.jpeg?auto=compress&cs=tinysrgb&w=500&h=500&dpr=1'
    ],
    category: 'Fashion',
    rating: 4.7,
    reviews: 345,
    inStock: true,
    features: ['Genuine Leather', 'Multiple Compartments', 'Adjustable Strap', 'Premium Quality'],
    tags: ['handbag', 'leather', 'fashion', 'designer'],
    isNew: false,
    isFeatured: true,
    isUpcoming: false
  }
];