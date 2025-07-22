export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  avatar?: string;
  phone?: string;
  address?: string;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  images: string[];
  category: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  features: string[];
  tags: string[];
  isNew?: boolean;
  isFeatured?: boolean;
  isUpcoming?: boolean;
  launchDate?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface WishlistItem {
  product: Product;
}

export interface Category {
  id: string;
  name: string;
  icon: string;
  color: string;
}

export interface Deal {
  id: string;
  title: string;
  description: string;
  image: string;
  discount: string;
  endTime: string;
  color: string;
}

export interface Testimonial {
  id: number;
  name: string;
  avatar: string;
  rating: number;
  comment: string;
  product: string;
}

export interface Banner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  color: string;
  cta: string;
}

export interface Stat {
  id: string;
  icon: string;
  value: string;
  label: string;
  color: string;
}

export interface NavbarItem {
  id: string;
  label: string;
  url: string;
  isActive: boolean;
  order: number;
}

export interface Order {
  id: string;
  userId: string;
  items: CartItem[];
  total: number;
  status: 'pending' | 'confirmed' | 'shipped' | 'delivered' | 'cancelled';
  shippingAddress: {
    name: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    pincode: string;
  };
  paymentMethod: 'online' | 'cod';
  paymentStatus: 'pending' | 'completed' | 'failed';
  paymentDetails?: {
    method: 'gpay' | 'phonepe' | 'paytm' | 'upi' | 'card';
    transactionId?: string;
  };
  otp?: string;
  otpVerified: boolean;
  createdAt: Date;
  trackingInfo: {
    status: string;
    location: string;
    timestamp: Date;
  }[];
}

export interface SiteSettings {
  banners: Banner[];
  stats: Stat[];
  deals: Deal[];
  testimonials: Testimonial[];
  categories: Category[];
  navbarItems: NavbarItem[];
}

export interface PaymentOption {
  id: string;
  name: string;
  icon: string;
  color: string;
  type: 'gpay' | 'phonepe' | 'paytm' | 'upi' | 'card';
}