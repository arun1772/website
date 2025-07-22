import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { SiteSettings, Banner, Stat, Deal, Testimonial, Category, NavbarItem } from '../types';

interface SiteContextType {
  settings: SiteSettings;
  updateBanners: (banners: Banner[]) => void;
  updateStats: (stats: Stat[]) => void;
  updateDeals: (deals: Deal[]) => void;
  updateTestimonials: (testimonials: Testimonial[]) => void;
  updateCategories: (categories: Category[]) => void;
  updateNavbarItems: (navbarItems: NavbarItem[]) => void;
}

const SiteContext = createContext<SiteContextType | undefined>(undefined);

const defaultSettings: SiteSettings = {
  banners: [
    {
      id: '1',
      title: 'Mega Electronics Sale',
      subtitle: 'Up to 70% off on latest gadgets',
      image: 'https://images.pexels.com/photos/356056/pexels-photo-356056.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
      color: 'from-blue-600 to-purple-700',
      cta: 'Shop Now'
    },
    {
      id: '2',
      title: 'Fashion Week Special',
      subtitle: 'Trendy styles at unbeatable prices',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
      color: 'from-pink-500 to-rose-600',
      cta: 'Explore Fashion'
    },
    {
      id: '3',
      title: 'Home & Living',
      subtitle: 'Transform your space with our collection',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1200&h=600&dpr=1',
      color: 'from-green-500 to-emerald-600',
      cta: 'Discover More'
    }
  ],
  stats: [
    {
      id: '1',
      icon: 'Users',
      value: '50K+',
      label: 'Happy Customers',
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: '2',
      icon: 'Package',
      value: '10K+',
      label: 'Products Sold',
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: '3',
      icon: 'Star',
      value: '4.8',
      label: 'Average Rating',
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: '4',
      icon: 'Truck',
      value: '99%',
      label: 'On-Time Delivery',
      color: 'from-purple-500 to-pink-500'
    }
  ],
  deals: [
    {
      id: 'deal1',
      title: 'Flash Sale',
      description: 'Up to 70% off on Electronics',
      image: 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
      discount: '70%',
      endTime: '2024-12-31T23:59:59',
      color: 'from-red-500 to-pink-600'
    },
    {
      id: 'deal2',
      title: 'Fashion Week',
      description: 'Trendy clothes at best prices',
      image: 'https://images.pexels.com/photos/1926769/pexels-photo-1926769.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
      discount: '50%',
      endTime: '2024-12-31T23:59:59',
      color: 'from-purple-500 to-indigo-600'
    },
    {
      id: 'deal3',
      title: 'Home Decor',
      description: 'Transform your space',
      image: 'https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=1',
      discount: '40%',
      endTime: '2024-12-31T23:59:59',
      color: 'from-green-500 to-teal-600'
    }
  ],
  testimonials: [
    {
      id: 1,
      name: 'Sarah Johnson',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      rating: 5,
      comment: 'Amazing shopping experience! Fast delivery and great quality products.',
      product: 'Wireless Bluetooth Headphones'
    },
    {
      id: 2,
      name: 'Mike Chen',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      rating: 5,
      comment: 'The smartwatch exceeded my expectations. Highly recommended!',
      product: 'Smartwatch Pro Series'
    },
    {
      id: 3,
      name: 'Emily Davis',
      avatar: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=1',
      rating: 5,
      comment: 'Love the skincare set! My skin has never looked better.',
      product: 'Luxury Skincare Set'
    }
  ],
  categories: [
    { id: '1', name: 'Electronics', icon: 'Smartphone', color: 'from-blue-500 to-purple-600' },
    { id: '2', name: 'Fashion', icon: 'Shirt', color: 'from-pink-500 to-rose-600' },
    { id: '3', name: 'Home & Living', icon: 'Home', color: 'from-green-500 to-emerald-600' },
    { id: '4', name: 'Books', icon: 'Book', color: 'from-orange-500 to-red-600' },
    { id: '5', name: 'Sports', icon: 'Zap', color: 'from-cyan-500 to-blue-600' },
    { id: '6', name: 'Beauty', icon: 'Sparkles', color: 'from-purple-500 to-pink-600' },
    { id: '7', name: 'Toys & Games', icon: 'GameController2', color: 'from-indigo-500 to-purple-600' },
    { id: '8', name: 'Gift Cards', icon: 'Gift', color: 'from-yellow-500 to-orange-600' }
  ],
  navbarItems: [
    { id: '1', label: 'Home', url: '/', isActive: true, order: 1 },
    { id: '2', label: 'Products', url: '/products', isActive: true, order: 2 },
    { id: '3', label: 'Categories', url: '/categories', isActive: true, order: 3 },
    { id: '4', label: 'Deals', url: '/deals', isActive: true, order: 4 },
    { id: '5', label: 'About', url: '/about', isActive: true, order: 5 },
    { id: '6', label: 'Contact', url: '/contact', isActive: true, order: 6 }
  ]
};

export const SiteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<SiteSettings>(defaultSettings);

  useEffect(() => {
    const savedSettings = localStorage.getItem('siteSettings');
    if (savedSettings) {
      setSettings(JSON.parse(savedSettings));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('siteSettings', JSON.stringify(settings));
  }, [settings]);

  const updateBanners = (banners: Banner[]) => {
    setSettings(prev => ({ ...prev, banners }));
  };

  const updateStats = (stats: Stat[]) => {
    setSettings(prev => ({ ...prev, stats }));
  };

  const updateDeals = (deals: Deal[]) => {
    setSettings(prev => ({ ...prev, deals }));
  };

  const updateTestimonials = (testimonials: Testimonial[]) => {
    setSettings(prev => ({ ...prev, testimonials }));
  };

  const updateCategories = (categories: Category[]) => {
    setSettings(prev => ({ ...prev, categories }));
  };

  const updateNavbarItems = (navbarItems: NavbarItem[]) => {
    setSettings(prev => ({ ...prev, navbarItems }));
  };

  return (
    <SiteContext.Provider value={{
      settings,
      updateBanners,
      updateStats,
      updateDeals,
      updateTestimonials,
      updateCategories,
      updateNavbarItems
    }}>
      {children}
    </SiteContext.Provider>
  );
};

export const useSite = () => {
  const context = useContext(SiteContext);
  if (!context) {
    throw new Error('useSite must be used within a SiteProvider');
  }
  return context;
};