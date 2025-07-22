import React, { useState } from 'react';
import { X, Settings, Package, Users, BarChart3, Eye, Edit, Trash2, Plus, Check, Globe, Star } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';
import { useSite } from '../contexts/SiteContext';
import { Product, Order } from '../types';
import AdminSiteSettings from './AdminSiteSettings';

interface AdminDashboardProps {
  isOpen: boolean;
  onClose: () => void;
  products: Product[];
  onProductUpdate: (products: Product[]) => void;
}

const AdminDashboard: React.FC<AdminDashboardProps> = ({ isOpen, onClose, products, onProductUpdate }) => {
  const { user } = useAuth();
  const { orders, updateOrderStatus, verifyOTP, updateOrderTracking } = useOrder();
  const { settings } = useSite();
  const [activeTab, setActiveTab] = useState<'overview' | 'orders' | 'products' | 'settings'>('overview');
  const [otpInput, setOtpInput] = useState<{ [key: string]: string }>({});
  const [showSiteSettings, setShowSiteSettings] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showProductForm, setShowProductForm] = useState(false);
  const [productForm, setProductForm] = useState<Partial<Product>>({
    name: '',
    description: '',
    price: 0,
    originalPrice: 0,
    category: '',
    images: [''],
    features: [''],
    tags: [''],
    rating: 4.5,
    reviews: 0,
    inStock: true,
    isFeatured: false,
    isNew: false
  });

  if (!isOpen || user?.role !== 'admin') return null;

  const handleOTPVerify = (orderId: string) => {
    const otp = otpInput[orderId];
    if (otp && verifyOTP(orderId, otp)) {
      alert('OTP verified successfully!');
      setOtpInput(prev => ({ ...prev, [orderId]: '' }));
    } else {
      alert('Invalid OTP!');
    }
  };

  const handleStatusUpdate = (orderId: string, status: Order['status']) => {
    updateOrderStatus(orderId, status);
    
    // Add tracking info
    const trackingMessages = {
      confirmed: { status: 'Order Confirmed', location: 'Processing Center' },
      shipped: { status: 'Shipped', location: 'In Transit' },
      delivered: { status: 'Delivered', location: 'Customer Location' }
    };
    
    if (trackingMessages[status as keyof typeof trackingMessages]) {
      updateOrderTracking(orderId, {
        ...trackingMessages[status as keyof typeof trackingMessages],
        timestamp: new Date()
      });
    }
  };

  const handleProductDelete = (productId: string) => {
    if (confirm('Are you sure you want to delete this product?')) {
      const updatedProducts = products.filter(p => p.id !== productId);
      onProductUpdate(updatedProducts);
    }
  };

  const handleProductEdit = (product: Product) => {
    setEditingProduct(product);
    setProductForm(product);
    setShowProductForm(true);
  };

  const handleProductSave = () => {
    if (editingProduct) {
      // Update existing product
      const updatedProducts = products.map(p => 
        p.id === editingProduct.id ? { ...productForm as Product } : p
      );
      onProductUpdate(updatedProducts);
    } else {
      // Add new product
      const newProduct: Product = {
        ...productForm as Product,
        id: Date.now().toString()
      };
      onProductUpdate([...products, newProduct]);
    }
    resetProductForm();
  };

  const resetProductForm = () => {
    setProductForm({
      name: '',
      description: '',
      price: 0,
      originalPrice: 0,
      category: '',
      images: [''],
      features: [''],
      tags: [''],
      rating: 4.5,
      reviews: 0,
      inStock: true,
      isFeatured: false,
      isNew: false
    });
    setEditingProduct(null);
    setShowProductForm(false);
  };

  const handleArrayChange = (index: number, value: string, field: 'images' | 'features' | 'tags') => {
    const newArray = [...(productForm[field] as string[])];
    newArray[index] = value;
    setProductForm(prev => ({ ...prev, [field]: newArray }));
  };

  const addArrayField = (field: 'images' | 'features' | 'tags') => {
    setProductForm(prev => ({
      ...prev,
      [field]: [...(prev[field] as string[]), '']
    }));
  };

  const removeArrayField = (index: number, field: 'images' | 'features' | 'tags') => {
    const newArray = (productForm[field] as string[]).filter((_, i) => i !== index);
    setProductForm(prev => ({ ...prev, [field]: newArray }));
  };

  const pendingOrders = orders.filter(order => order.status === 'pending');
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const completedOrders = orders.filter(order => order.status === 'delivered').length;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-7xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-purple-500 to-blue-600">
            <h2 className="text-2xl font-bold text-white">Admin Dashboard</h2>
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
                <button
                  onClick={() => setActiveTab('overview')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'overview' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <BarChart3 className="h-5 w-5" />
                  <span>Overview</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Orders ({pendingOrders.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('products')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'products' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Products ({products.length})</span>
                </button>
                <button
                  onClick={() => setShowSiteSettings(true)}
                  className="w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors text-gray-600 hover:bg-gray-100"
                >
                  <Globe className="h-5 w-5" />
                  <span>Site Settings</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="p-6">
                {activeTab === 'overview' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Dashboard Overview</h3>
                    
                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
                      <div className="bg-blue-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-blue-600 text-sm font-medium">Total Orders</p>
                            <p className="text-2xl font-bold text-blue-800">{orders.length}</p>
                          </div>
                          <Package className="h-8 w-8 text-blue-600" />
                        </div>
                      </div>
                      <div className="bg-green-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-green-600 text-sm font-medium">Total Revenue</p>
                            <p className="text-2xl font-bold text-green-800">₹{totalRevenue.toLocaleString()}</p>
                          </div>
                          <BarChart3 className="h-8 w-8 text-green-600" />
                        </div>
                      </div>
                      <div className="bg-purple-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-purple-600 text-sm font-medium">Completed Orders</p>
                            <p className="text-2xl font-bold text-purple-800">{completedOrders}</p>
                          </div>
                          <Check className="h-8 w-8 text-purple-600" />
                        </div>
                      </div>
                      <div className="bg-orange-50 p-6 rounded-lg">
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="text-orange-600 text-sm font-medium">Products</p>
                            <p className="text-2xl font-bold text-orange-800">{products.length}</p>
                          </div>
                          <Package className="h-8 w-8 text-orange-600" />
                        </div>
                      </div>
                    </div>

                    {/* Recent Orders */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                      <div className="p-4 border-b border-gray-200">
                        <h4 className="font-semibold text-gray-800">Recent Orders</h4>
                      </div>
                      <div className="divide-y divide-gray-200">
                        {orders.slice(0, 5).map(order => (
                          <div key={order.id} className="p-4 flex items-center justify-between">
                            <div>
                              <p className="font-medium text-gray-800">Order #{order.id}</p>
                              <p className="text-sm text-gray-600">
                                {order.shippingAddress.name} - ₹{order.total.toLocaleString()}
                              </p>
                              {order.paymentDetails && (
                                <p className="text-xs text-blue-600">
                                  Paid via {order.paymentDetails.method.toUpperCase()}
                                </p>
                              )}
                            </div>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Order Management</h3>
                    <div className="space-y-4">
                      {orders.map(order => (
                        <div key={order.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                          <div className="flex justify-between items-start mb-4">
                            <div>
                              <h4 className="font-semibold text-gray-800">Order #{order.id}</h4>
                              <p className="text-sm text-gray-600">
                                {order.shippingAddress.name} - {order.shippingAddress.phone}
                              </p>
                              <p className="text-sm text-gray-600">
                                {new Date(order.createdAt).toLocaleString()}
                              </p>
                              {order.paymentDetails && (
                                <p className="text-sm text-blue-600">
                                  Payment: {order.paymentDetails.method.toUpperCase()} 
                                  {order.paymentDetails.transactionId && ` - ${order.paymentDetails.transactionId}`}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <p className="font-semibold text-gray-800">₹{order.total.toLocaleString()}</p>
                              <p className="text-sm text-gray-600">
                                {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                              </p>
                              <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${
                                order.paymentStatus === 'completed' ? 'bg-green-100 text-green-800' :
                                order.paymentStatus === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                                'bg-red-100 text-red-800'
                              }`}>
                                {order.paymentStatus.toUpperCase()}
                              </span>
                            </div>
                          </div>

                          {/* OTP Verification */}
                          {!order.otpVerified && order.status === 'pending' && (
                            <div className="mb-4 p-3 bg-yellow-50 rounded-lg">
                              <p className="text-sm text-yellow-800 mb-2">OTP Verification Required</p>
                              <div className="flex items-center space-x-2">
                                <input
                                  type="text"
                                  placeholder="Enter OTP"
                                  value={otpInput[order.id] || ''}
                                  onChange={(e) => setOtpInput(prev => ({ ...prev, [order.id]: e.target.value }))}
                                  className="px-3 py-2 border border-gray-300 rounded text-sm"
                                />
                                <button
                                  onClick={() => handleOTPVerify(order.id)}
                                  className="bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
                                >
                                  Verify
                                </button>
                              </div>
                              <p className="text-xs text-yellow-700 mt-1">
                                Customer OTP: <span className="font-mono font-bold">{order.otp}</span>
                              </p>
                            </div>
                          )}

                          {/* Order Items */}
                          <div className="mb-4">
                            <h5 className="font-medium text-gray-800 mb-2">Order Items</h5>
                            <div className="space-y-2">
                              {order.items.map(item => (
                                <div key={item.product.id} className="flex items-center space-x-3 text-sm">
                                  <img
                                    src={item.product.images[0]}
                                    alt={item.product.name}
                                    className="w-10 h-10 object-cover rounded"
                                  />
                                  <span>{item.product.name} x {item.quantity}</span>
                                </div>
                              ))}
                            </div>
                          </div>

                          {/* Status Update */}
                          <div className="flex items-center space-x-2">
                            <select
                              value={order.status}
                              onChange={(e) => handleStatusUpdate(order.id, e.target.value as Order['status'])}
                              className="px-3 py-2 border border-gray-300 rounded text-sm"
                            >
                              <option value="pending">Pending</option>
                              <option value="confirmed">Confirmed</option>
                              <option value="shipped">Shipped</option>
                              <option value="delivered">Delivered</option>
                              <option value="cancelled">Cancelled</option>
                            </select>
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              order.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                              order.status === 'confirmed' ? 'bg-blue-100 text-blue-800' :
                              order.status === 'shipped' ? 'bg-purple-100 text-purple-800' :
                              order.status === 'delivered' ? 'bg-green-100 text-green-800' :
                              'bg-red-100 text-red-800'
                            }`}>
                              {order.status.toUpperCase()}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {activeTab === 'products' && (
                  <div>
                    <div className="flex justify-between items-center mb-6">
                      <h3 className="text-xl font-semibold text-gray-800">Product Management</h3>
                      <button
                        onClick={() => setShowProductForm(true)}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center space-x-2"
                      >
                        <Plus className="h-4 w-4" />
                        <span>Add Product</span>
                      </button>
                    </div>

                    {/* Product Form Modal */}
                    {showProductForm && (
                      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                        <div className="bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
                          <div className="flex items-center justify-between p-6 border-b border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-800">
                              {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h3>
                            <button
                              onClick={resetProductForm}
                              className="text-gray-400 hover:text-gray-600"
                            >
                              <X className="h-6 w-6" />
                            </button>
                          </div>
                          
                          <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                                <input
                                  type="text"
                                  value={productForm.name}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, name: e.target.value }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                                <select
                                  value={productForm.category}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, category: e.target.value }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                >
                                  <option value="">Select Category</option>
                                  {settings.categories.map(category => (
                                    <option key={category.id} value={category.name}>
                                      {category.name}
                                    </option>
                                  ))}
                                </select>
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Price (₹)</label>
                                <input
                                  type="number"
                                  value={productForm.price}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, price: parseFloat(e.target.value) }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">Original Price (₹)</label>
                                <input
                                  type="number"
                                  value={productForm.originalPrice}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, originalPrice: parseFloat(e.target.value) }))}
                                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                />
                              </div>
                            </div>
                            
                            <div className="mt-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
                              <textarea
                                value={productForm.description}
                                onChange={(e) => setProductForm(prev => ({ ...prev, description: e.target.value }))}
                                rows={3}
                                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                              />
                            </div>
                            
                            {/* Images */}
                            <div className="mt-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
                              {(productForm.images as string[]).map((image, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                  <input
                                    type="url"
                                    value={image}
                                    onChange={(e) => handleArrayChange(index, e.target.value, 'images')}
                                    placeholder="Image URL"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  {(productForm.images as string[]).length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeArrayField(index, 'images')}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addArrayField('images')}
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center space-x-1"
                              >
                                <Plus className="h-4 w-4" />
                                <span>Add Image</span>
                              </button>
                            </div>
                            
                            {/* Features */}
                            <div className="mt-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Features</label>
                              {(productForm.features as string[]).map((feature, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                  <input
                                    type="text"
                                    value={feature}
                                    onChange={(e) => handleArrayChange(index, e.target.value, 'features')}
                                    placeholder="Feature"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  {(productForm.features as string[]).length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeArrayField(index, 'features')}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addArrayField('features')}
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center space-x-1"
                              >
                                <Plus className="h-4 w-4" />
                                <span>Add Feature</span>
                              </button>
                            </div>
                            
                            {/* Tags */}
                            <div className="mt-6">
                              <label className="block text-sm font-medium text-gray-700 mb-2">Tags</label>
                              {(productForm.tags as string[]).map((tag, index) => (
                                <div key={index} className="flex items-center space-x-2 mb-2">
                                  <input
                                    type="text"
                                    value={tag}
                                    onChange={(e) => handleArrayChange(index, e.target.value, 'tags')}
                                    placeholder="Tag"
                                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                  />
                                  {(productForm.tags as string[]).length > 1 && (
                                    <button
                                      type="button"
                                      onClick={() => removeArrayField(index, 'tags')}
                                      className="text-red-500 hover:text-red-700"
                                    >
                                      <X className="h-4 w-4" />
                                    </button>
                                  )}
                                </div>
                              ))}
                              <button
                                type="button"
                                onClick={() => addArrayField('tags')}
                                className="text-blue-500 hover:text-blue-700 text-sm flex items-center space-x-1"
                              >
                                <Plus className="h-4 w-4" />
                                <span>Add Tag</span>
                              </button>
                            </div>
                            
                            {/* Product Options */}
                            <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={productForm.isFeatured}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, isFeatured: e.target.checked }))}
                                  className="rounded"
                                />
                                <span>Featured Product</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={productForm.isNew}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, isNew: e.target.checked }))}
                                  className="rounded"
                                />
                                <span>New Product</span>
                              </label>
                              <label className="flex items-center space-x-2">
                                <input
                                  type="checkbox"
                                  checked={productForm.inStock}
                                  onChange={(e) => setProductForm(prev => ({ ...prev, inStock: e.target.checked }))}
                                  className="rounded"
                                />
                                <span>In Stock</span>
                              </label>
                            </div>
                          </div>
                          
                          <div className="flex justify-end space-x-4 p-6 border-t">
                            <button
                              onClick={resetProductForm}
                              className="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={handleProductSave}
                              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                              {editingProduct ? 'Update Product' : 'Add Product'}
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                      {products.map(product => (
                        <div key={product.id} className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
                          <img
                            src={product.images[0]}
                            alt={product.name}
                            className="w-full h-48 object-cover"
                          />
                          <div className="p-4">
                            <div className="flex items-start justify-between mb-2">
                              <h4 className="font-semibold text-gray-800 flex-1">{product.name}</h4>
                              <div className="flex items-center space-x-1 ml-2">
                                {product.isFeatured && (
                                  <Star className="h-4 w-4 text-yellow-500 fill-current" />
                                )}
                                {product.isNew && (
                                  <span className="bg-green-500 text-white text-xs px-1 py-0.5 rounded">NEW</span>
                                )}
                              </div>
                            </div>
                            <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.description}</p>
                            <div className="flex items-center justify-between mb-3">
                              <span className="font-bold text-gray-800">₹{product.price.toLocaleString()}</span>
                              <span className="text-sm text-gray-500">{product.category}</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <button
                                onClick={() => handleProductEdit(product)}
                                className="flex-1 bg-blue-600 text-white px-3 py-2 rounded text-sm hover:bg-blue-700 flex items-center justify-center space-x-1"
                              >
                                <Edit className="h-3 w-3" />
                                <span>Edit</span>
                              </button>
                              <button
                                onClick={() => handleProductDelete(product.id)}
                                className="flex-1 bg-red-600 text-white px-3 py-2 rounded text-sm hover:bg-red-700 flex items-center justify-center space-x-1"
                              >
                                <Trash2 className="h-3 w-3" />
                                <span>Delete</span>
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

      <AdminSiteSettings
        isOpen={showSiteSettings}
        onClose={() => setShowSiteSettings(false)}
      />
    </>
  );
};

export default AdminDashboard;
