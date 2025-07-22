import React, { useState } from 'react';
import { X, Plus, Edit, Trash2, Save, Image, Star, Calendar, Navigation } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';
import { Banner, Stat, Deal, Testimonial, Category, NavbarItem } from '../types';

interface AdminSiteSettingsProps {
  isOpen: boolean;
  onClose: () => void;
}

const AdminSiteSettings: React.FC<AdminSiteSettingsProps> = ({ isOpen, onClose }) => {
  const { settings, updateBanners, updateStats, updateDeals, updateTestimonials, updateCategories, updateNavbarItems } = useSite();
  const [activeTab, setActiveTab] = useState<'navbar' | 'banners' | 'stats' | 'deals' | 'testimonials' | 'categories'>('navbar');
  const [editingItem, setEditingItem] = useState<any>(null);
  const [isEditing, setIsEditing] = useState(false);

  // Navbar Management
  const [navbarForm, setNavbarForm] = useState<Partial<NavbarItem>>({
    label: '',
    url: '',
    isActive: true,
    order: 0
  });

  // Banner Management
  const [bannerForm, setBannerForm] = useState<Partial<Banner>>({
    title: '',
    subtitle: '',
    image: '',
    color: 'from-blue-600 to-purple-700',
    cta: 'Shop Now'
  });

  // Stats Management
  const [statForm, setStatForm] = useState<Partial<Stat>>({
    icon: 'Users',
    value: '',
    label: '',
    color: 'from-blue-500 to-cyan-500'
  });

  // Deal Management
  const [dealForm, setDealForm] = useState<Partial<Deal>>({
    title: '',
    description: '',
    image: '',
    discount: '',
    endTime: '',
    color: 'from-red-500 to-pink-600'
  });

  // Testimonial Management
  const [testimonialForm, setTestimonialForm] = useState<Partial<Testimonial>>({
    name: '',
    avatar: '',
    rating: 5,
    comment: '',
    product: ''
  });

  // Category Management
  const [categoryForm, setCategoryForm] = useState<Partial<Category>>({
    name: '',
    icon: 'Package',
    color: 'from-blue-500 to-purple-600'
  });

  const handleSaveNavbar = () => {
    if (isEditing && editingItem) {
      const updatedItems = settings.navbarItems.map(item =>
        item.id === editingItem.id ? { ...item, ...navbarForm } : item
      );
      updateNavbarItems(updatedItems);
    } else {
      const newItem: NavbarItem = {
        id: Date.now().toString(),
        ...navbarForm as NavbarItem
      };
      updateNavbarItems([...settings.navbarItems, newItem]);
    }
    resetNavbarForm();
  };

  const handleSaveBanner = () => {
    if (isEditing && editingItem) {
      const updatedBanners = settings.banners.map(banner =>
        banner.id === editingItem.id ? { ...banner, ...bannerForm } : banner
      );
      updateBanners(updatedBanners);
    } else {
      const newBanner: Banner = {
        id: Date.now().toString(),
        ...bannerForm as Banner
      };
      updateBanners([...settings.banners, newBanner]);
    }
    resetBannerForm();
  };

  const handleSaveStat = () => {
    if (isEditing && editingItem) {
      const updatedStats = settings.stats.map(stat =>
        stat.id === editingItem.id ? { ...stat, ...statForm } : stat
      );
      updateStats(updatedStats);
    } else {
      const newStat: Stat = {
        id: Date.now().toString(),
        ...statForm as Stat
      };
      updateStats([...settings.stats, newStat]);
    }
    resetStatForm();
  };

  const handleSaveDeal = () => {
    if (isEditing && editingItem) {
      const updatedDeals = settings.deals.map(deal =>
        deal.id === editingItem.id ? { ...deal, ...dealForm } : deal
      );
      updateDeals(updatedDeals);
    } else {
      const newDeal: Deal = {
        id: Date.now().toString(),
        ...dealForm as Deal
      };
      updateDeals([...settings.deals, newDeal]);
    }
    resetDealForm();
  };

  const handleSaveTestimonial = () => {
    if (isEditing && editingItem) {
      const updatedTestimonials = settings.testimonials.map(testimonial =>
        testimonial.id === editingItem.id ? { ...testimonial, ...testimonialForm } : testimonial
      );
      updateTestimonials(updatedTestimonials);
    } else {
      const newTestimonial: Testimonial = {
        id: Date.now(),
        ...testimonialForm as Testimonial
      };
      updateTestimonials([...settings.testimonials, newTestimonial]);
    }
    resetTestimonialForm();
  };

  const handleSaveCategory = () => {
    if (isEditing && editingItem) {
      const updatedCategories = settings.categories.map(category =>
        category.id === editingItem.id ? { ...category, ...categoryForm } : category
      );
      updateCategories(updatedCategories);
    } else {
      const newCategory: Category = {
        id: Date.now().toString(),
        ...categoryForm as Category
      };
      updateCategories([...settings.categories, newCategory]);
    }
    resetCategoryForm();
  };

  const handleEdit = (item: any, type: string) => {
    setEditingItem(item);
    setIsEditing(true);
    
    switch (type) {
      case 'navbar':
        setNavbarForm(item);
        break;
      case 'banner':
        setBannerForm(item);
        break;
      case 'stat':
        setStatForm(item);
        break;
      case 'deal':
        setDealForm(item);
        break;
      case 'testimonial':
        setTestimonialForm(item);
        break;
      case 'category':
        setCategoryForm(item);
        break;
    }
  };

  const handleDelete = (id: string, type: string) => {
    if (!confirm('Are you sure you want to delete this item?')) return;

    switch (type) {
      case 'navbar':
        updateNavbarItems(settings.navbarItems.filter(item => item.id !== id));
        break;
      case 'banner':
        updateBanners(settings.banners.filter(item => item.id !== id));
        break;
      case 'stat':
        updateStats(settings.stats.filter(item => item.id !== id));
        break;
      case 'deal':
        updateDeals(settings.deals.filter(item => item.id !== id));
        break;
      case 'testimonial':
        updateTestimonials(settings.testimonials.filter(item => item.id !== id));
        break;
      case 'category':
        updateCategories(settings.categories.filter(item => item.id !== id));
        break;
    }
  };

  const resetNavbarForm = () => {
    setNavbarForm({ label: '', url: '', isActive: true, order: 0 });
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetBannerForm = () => {
    setBannerForm({ title: '', subtitle: '', image: '', color: 'from-blue-600 to-purple-700', cta: 'Shop Now' });
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetStatForm = () => {
    setStatForm({ icon: 'Users', value: '', label: '', color: 'from-blue-500 to-cyan-500' });
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetDealForm = () => {
    setDealForm({ title: '', description: '', image: '', discount: '', endTime: '', color: 'from-red-500 to-pink-600' });
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetTestimonialForm = () => {
    setTestimonialForm({ name: '', avatar: '', rating: 5, comment: '', product: '' });
    setIsEditing(false);
    setEditingItem(null);
  };

  const resetCategoryForm = () => {
    setCategoryForm({ name: '', icon: 'Package', color: 'from-blue-500 to-purple-600' });
    setIsEditing(false);
    setEditingItem(null);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-6xl mx-4 max-h-[90vh] overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-blue-600">
          <h2 className="text-2xl font-bold text-white">Site Settings Management</h2>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-200 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Sidebar */}
          <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
            <nav className="space-y-2">
              {[
                { id: 'navbar', label: 'Navigation', icon: Navigation },
                { id: 'banners', label: 'Hero Banners', icon: Image },
                { id: 'stats', label: 'Statistics', icon: Star },
                { id: 'deals', label: 'Today\'s Deals', icon: Calendar },
                { id: 'testimonials', label: 'Testimonials', icon: Star },
                { id: 'categories', label: 'Categories', icon: Star }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === tab.id ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span>{tab.label}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)]">
            <div className="p-6">
              {/* Navbar Management */}
              {activeTab === 'navbar' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Navigation Management</h3>
                  
                  {/* Add/Edit Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {isEditing ? 'Edit Navigation Item' : 'Add New Navigation Item'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Label"
                        value={navbarForm.label}
                        onChange={(e) => setNavbarForm(prev => ({ ...prev, label: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="URL"
                        value={navbarForm.url}
                        onChange={(e) => setNavbarForm(prev => ({ ...prev, url: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="number"
                        placeholder="Order"
                        value={navbarForm.order}
                        onChange={(e) => setNavbarForm(prev => ({ ...prev, order: parseInt(e.target.value) }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <label className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          checked={navbarForm.isActive}
                          onChange={(e) => setNavbarForm(prev => ({ ...prev, isActive: e.target.checked }))}
                          className="rounded"
                        />
                        <span>Active</span>
                      </label>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleSaveNavbar}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isEditing ? 'Update' : 'Add'}</span>
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetNavbarForm}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing Items */}
                  <div className="space-y-4">
                    {settings.navbarItems.map((item) => (
                      <div key={item.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h4 className="font-semibold text-gray-800">{item.label}</h4>
                            <p className="text-gray-600">{item.url}</p>
                            <p className="text-sm text-gray-500">Order: {item.order} | {item.isActive ? 'Active' : 'Inactive'}</p>
                          </div>
                          <div className="flex space-x-2">
                            <button
                              onClick={() => handleEdit(item, 'navbar')}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(item.id, 'navbar')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Banner Management */}
              {activeTab === 'banners' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Hero Banner Management</h3>
                  
                  {/* Add/Edit Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {isEditing ? 'Edit Banner' : 'Add New Banner'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={bannerForm.title}
                        onChange={(e) => setBannerForm(prev => ({ ...prev, title: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Subtitle"
                        value={bannerForm.subtitle}
                        onChange={(e) => setBannerForm(prev => ({ ...prev, subtitle: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={bannerForm.image}
                        onChange={(e) => setBannerForm(prev => ({ ...prev, image: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Button Text"
                        value={bannerForm.cta}
                        onChange={(e) => setBannerForm(prev => ({ ...prev, cta: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={bannerForm.color}
                        onChange={(e) => setBannerForm(prev => ({ ...prev, color: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="from-blue-600 to-purple-700">Blue to Purple</option>
                        <option value="from-pink-500 to-rose-600">Pink to Rose</option>
                        <option value="from-green-500 to-emerald-600">Green to Emerald</option>
                        <option value="from-orange-500 to-red-600">Orange to Red</option>
                      </select>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleSaveBanner}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isEditing ? 'Update' : 'Add'}</span>
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetBannerForm}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing Banners */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {settings.banners.map((banner) => (
                      <div key={banner.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <img src={banner.image} alt={banner.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800">{banner.title}</h4>
                          <p className="text-gray-600 text-sm">{banner.subtitle}</p>
                          <p className="text-blue-600 text-sm">{banner.cta}</p>
                          <div className="flex justify-end space-x-2 mt-3">
                            <button
                              onClick={() => handleEdit(banner, 'banner')}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(banner.id, 'banner')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Stats Management */}
              {activeTab === 'stats' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Statistics Management</h3>
                  
                  {/* Add/Edit Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {isEditing ? 'Edit Statistic' : 'Add New Statistic'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <select
                        value={statForm.icon}
                        onChange={(e) => setStatForm(prev => ({ ...prev, icon: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Users">Users</option>
                        <option value="Package">Package</option>
                        <option value="Star">Star</option>
                        <option value="Truck">Truck</option>
                        <option value="Heart">Heart</option>
                        <option value="Shield">Shield</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Value (e.g., 50K+)"
                        value={statForm.value}
                        onChange={(e) => setStatForm(prev => ({ ...prev, value: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Label"
                        value={statForm.label}
                        onChange={(e) => setStatForm(prev => ({ ...prev, label: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={statForm.color}
                        onChange={(e) => setStatForm(prev => ({ ...prev, color: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="from-blue-500 to-cyan-500">Blue to Cyan</option>
                        <option value="from-green-500 to-emerald-500">Green to Emerald</option>
                        <option value="from-yellow-500 to-orange-500">Yellow to Orange</option>
                        <option value="from-purple-500 to-pink-500">Purple to Pink</option>
                      </select>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleSaveStat}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isEditing ? 'Update' : 'Add'}</span>
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetStatForm}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing Stats */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {settings.stats.map((stat) => (
                      <div key={stat.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${stat.color} text-white mb-2`}>
                            <span className="text-sm">{stat.icon}</span>
                          </div>
                          <div className="text-xl font-bold text-gray-800">{stat.value}</div>
                          <div className="text-gray-600 text-sm">{stat.label}</div>
                          <div className="flex justify-center space-x-2 mt-3">
                            <button
                              onClick={() => handleEdit(stat, 'stat')}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(stat.id, 'stat')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Deals Management */}
              {activeTab === 'deals' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Today's Deals Management</h3>
                  
                  {/* Add/Edit Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {isEditing ? 'Edit Deal' : 'Add New Deal'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Title"
                        value={dealForm.title}
                        onChange={(e) => setDealForm(prev => ({ ...prev, title: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Description"
                        value={dealForm.description}
                        onChange={(e) => setDealForm(prev => ({ ...prev, description: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Image URL"
                        value={dealForm.image}
                        onChange={(e) => setDealForm(prev => ({ ...prev, image: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="text"
                        placeholder="Discount (e.g., 50%)"
                        value={dealForm.discount}
                        onChange={(e) => setDealForm(prev => ({ ...prev, discount: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="datetime-local"
                        placeholder="End Time"
                        value={dealForm.endTime}
                        onChange={(e) => setDealForm(prev => ({ ...prev, endTime: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={dealForm.color}
                        onChange={(e) => setDealForm(prev => ({ ...prev, color: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="from-red-500 to-pink-600">Red to Pink</option>
                        <option value="from-purple-500 to-indigo-600">Purple to Indigo</option>
                        <option value="from-green-500 to-teal-600">Green to Teal</option>
                        <option value="from-orange-500 to-red-600">Orange to Red</option>
                      </select>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleSaveDeal}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isEditing ? 'Update' : 'Add'}</span>
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetDealForm}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing Deals */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settings.deals.map((deal) => (
                      <div key={deal.id} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                        <img src={deal.image} alt={deal.title} className="w-full h-32 object-cover" />
                        <div className="p-4">
                          <h4 className="font-semibold text-gray-800">{deal.title}</h4>
                          <p className="text-gray-600 text-sm">{deal.description}</p>
                          <p className="text-red-600 text-sm font-bold">{deal.discount} OFF</p>
                          <p className="text-gray-500 text-xs">Ends: {new Date(deal.endTime).toLocaleString()}</p>
                          <div className="flex justify-end space-x-2 mt-3">
                            <button
                              onClick={() => handleEdit(deal, 'deal')}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(deal.id, 'deal')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Testimonials Management */}
              {activeTab === 'testimonials' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Testimonials Management</h3>
                  
                  {/* Add/Edit Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {isEditing ? 'Edit Testimonial' : 'Add New Testimonial'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <input
                        type="text"
                        placeholder="Customer Name"
                        value={testimonialForm.name}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <input
                        type="url"
                        placeholder="Avatar URL"
                        value={testimonialForm.avatar}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, avatar: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={testimonialForm.rating}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, rating: parseInt(e.target.value) }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Star</option>
                      </select>
                      <input
                        type="text"
                        placeholder="Product Name"
                        value={testimonialForm.product}
                        onChange={(e) => setTestimonialForm(prev => ({ ...prev, product: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <textarea
                      placeholder="Customer Comment"
                      value={testimonialForm.comment}
                      onChange={(e) => setTestimonialForm(prev => ({ ...prev, comment: e.target.value }))}
                      rows={3}
                      className="w-full mt-4 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleSaveTestimonial}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isEditing ? 'Update' : 'Add'}</span>
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetTestimonialForm}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing Testimonials */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {settings.testimonials.map((testimonial) => (
                      <div key={testimonial.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center mb-3">
                          <img
                            src={testimonial.avatar}
                            alt={testimonial.name}
                            className="w-10 h-10 rounded-full object-cover mr-3"
                          />
                          <div>
                            <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                            <div className="flex items-center">
                              {[...Array(testimonial.rating)].map((_, i) => (
                                <Star key={i} className="h-3 w-3 text-yellow-400 fill-current" />
                              ))}
                            </div>
                          </div>
                        </div>
                        <p className="text-gray-600 text-sm mb-2">{testimonial.comment}</p>
                        <p className="text-blue-600 text-xs">Product: {testimonial.product}</p>
                        <div className="flex justify-end space-x-2 mt-3">
                          <button
                            onClick={() => handleEdit(testimonial, 'testimonial')}
                            className="text-blue-600 hover:text-blue-700"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(testimonial.id.toString(), 'testimonial')}
                            className="text-red-600 hover:text-red-700"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Categories Management */}
              {activeTab === 'categories' && (
                <div>
                  <h3 className="text-xl font-semibold text-gray-800 mb-6">Categories Management</h3>
                  
                  {/* Add/Edit Form */}
                  <div className="bg-gray-50 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">
                      {isEditing ? 'Edit Category' : 'Add New Category'}
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <input
                        type="text"
                        placeholder="Category Name"
                        value={categoryForm.name}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, name: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                      <select
                        value={categoryForm.icon}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, icon: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Package">Package</option>
                        <option value="Smartphone">Smartphone</option>
                        <option value="Shirt">Shirt</option>
                        <option value="Home">Home</option>
                        <option value="Book">Book</option>
                        <option value="Zap">Zap</option>
                        <option value="Sparkles">Sparkles</option>
                        <option value="GameController2">GameController2</option>
                        <option value="Gift">Gift</option>
                      </select>
                      <select
                        value={categoryForm.color}
                        onChange={(e) => setCategoryForm(prev => ({ ...prev, color: e.target.value }))}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="from-blue-500 to-purple-600">Blue to Purple</option>
                        <option value="from-pink-500 to-rose-600">Pink to Rose</option>
                        <option value="from-green-500 to-emerald-600">Green to Emerald</option>
                        <option value="from-orange-500 to-red-600">Orange to Red</option>
                        <option value="from-cyan-500 to-blue-600">Cyan to Blue</option>
                        <option value="from-purple-500 to-pink-600">Purple to Pink</option>
                        <option value="from-indigo-500 to-purple-600">Indigo to Purple</option>
                        <option value="from-yellow-500 to-orange-600">Yellow to Orange</option>
                      </select>
                    </div>
                    <div className="flex space-x-4 mt-4">
                      <button
                        onClick={handleSaveCategory}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Save className="h-4 w-4" />
                        <span>{isEditing ? 'Update' : 'Add'}</span>
                      </button>
                      {isEditing && (
                        <button
                          onClick={resetCategoryForm}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700"
                        >
                          Cancel
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Existing Categories */}
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {settings.categories.map((category) => (
                      <div key={category.id} className="bg-white border border-gray-200 rounded-lg p-4">
                        <div className="text-center">
                          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-r ${category.color} text-white mb-2`}>
                            <span className="text-sm">{category.icon}</span>
                          </div>
                          <h4 className="font-semibold text-gray-800">{category.name}</h4>
                          <div className="flex justify-center space-x-2 mt-3">
                            <button
                              onClick={() => handleEdit(category, 'category')}
                              className="text-blue-600 hover:text-blue-700"
                            >
                              <Edit className="h-4 w-4" />
                            </button>
                            <button
                              onClick={() => handleDelete(category.id, 'category')}
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSiteSettings;