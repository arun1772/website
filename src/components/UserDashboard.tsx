import React, { useState } from 'react';
import { X, Package, User, MapPin, Phone, Mail, CreditCard, Calendar, Eye, Trash2 } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useOrder } from '../contexts/OrderContext';
import { useCart } from '../contexts/CartContext';
import OrderTrackingModal from './OrderTrackingModal';
import { Order } from '../types';

interface UserDashboardProps {
  isOpen: boolean;
  onClose: () => void;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ isOpen, onClose }) => {
  const { user, updateProfile } = useAuth();
  const { getUserOrders, cancelOrder } = useOrder();
  const { cart, wishlist } = useCart();
  const [activeTab, setActiveTab] = useState<'profile' | 'orders' | 'wishlist' | 'cart'>('profile');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [showOrderTracking, setShowOrderTracking] = useState(false);
  const [profileForm, setProfileForm] = useState({
    name: user?.name || '',
    phone: user?.phone || '',
    address: user?.address || ''
  });

  const userOrders = user ? getUserOrders(user.id) : [];

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile(profileForm);
    alert('Profile updated successfully!');
  };

  const handleOrderCancel = (orderId: string) => {
    if (confirm('Are you sure you want to cancel this order?')) {
      cancelOrder(orderId);
      alert('Order cancelled successfully!');
    }
  };

  const handleOrderView = (order: Order) => {
    setSelectedOrder(order);
    setShowOrderTracking(true);
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-100';
      case 'confirmed':
        return 'text-blue-600 bg-blue-100';
      case 'shipped':
        return 'text-purple-600 bg-purple-100';
      case 'delivered':
        return 'text-green-600 bg-green-100';
      case 'cancelled':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  if (!isOpen || !user) return null;

  return (
    <>
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
        <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
          <div className="flex items-center justify-between p-6 border-b border-gray-200">
            <h2 className="text-2xl font-bold text-gray-800">My Dashboard</h2>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="flex h-full">
            {/* Sidebar */}
            <div className="w-64 bg-gray-50 p-4 border-r border-gray-200">
              <nav className="space-y-2">
                <button
                  onClick={() => setActiveTab('profile')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'profile' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <User className="h-5 w-5" />
                  <span>Profile</span>
                </button>
                <button
                  onClick={() => setActiveTab('orders')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'orders' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Orders ({userOrders.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('wishlist')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'wishlist' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Wishlist ({wishlist.length})</span>
                </button>
                <button
                  onClick={() => setActiveTab('cart')}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors ${
                    activeTab === 'cart' ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <Package className="h-5 w-5" />
                  <span>Cart ({cart.length})</span>
                </button>
              </nav>
            </div>

            {/* Main Content */}
            <div className="flex-1 overflow-y-auto max-h-[calc(90vh-100px)]">
              <div className="p-6">
                {activeTab === 'profile' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Profile Information</h3>
                    <form onSubmit={handleProfileUpdate} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="relative">
                          <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Full Name"
                            value={profileForm.name}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, name: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                          <input
                            type="tel"
                            placeholder="Phone Number"
                            value={profileForm.phone}
                            onChange={(e) => setProfileForm(prev => ({ ...prev, phone: e.target.value }))}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                      <div className="relative">
                        <Mail className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={user.email}
                          disabled
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg bg-gray-50 cursor-not-allowed"
                        />
                      </div>
                      <div className="relative">
                        <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                        <input
                          type="text"
                          placeholder="Address"
                          value={profileForm.address}
                          onChange={(e) => setProfileForm(prev => ({ ...prev, address: e.target.value }))}
                          className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <button
                        type="submit"
                        className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-6 rounded-lg transition-colors"
                      >
                        Update Profile
                      </button>
                    </form>
                  </div>
                )}

                {activeTab === 'orders' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">My Orders</h3>
                    {userOrders.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">No orders yet</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {userOrders.map(order => (
                          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex justify-between items-start mb-3">
                              <div>
                                <p className="font-semibold text-gray-800">Order #{order.id}</p>
                                <p className="text-sm text-gray-600">
                                  {new Date(order.createdAt).toLocaleDateString()}
                                </p>
                              </div>
                              <div className="flex items-center space-x-2">
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(order.status)}`}>
                                  {order.status.toUpperCase()}
                                </span>
                              </div>
                            </div>
                            <div className="mb-3">
                              <p className="text-sm text-gray-600">
                                {order.items.length} item(s) - ₹{order.total.toLocaleString()}
                              </p>
                              <p className="text-sm text-gray-600">
                                Payment: {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                              </p>
                            </div>
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handleOrderView(order)}
                                className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 text-sm"
                              >
                                <Eye className="h-4 w-4" />
                                <span>View Details</span>
                              </button>
                              {order.status === 'pending' && (
                                <button
                                  onClick={() => handleOrderCancel(order.id)}
                                  className="flex items-center space-x-1 text-red-600 hover:text-red-700 text-sm"
                                >
                                  <Trash2 className="h-4 w-4" />
                                  <span>Cancel</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'wishlist' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">My Wishlist</h3>
                    {wishlist.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Your wishlist is empty</p>
                      </div>
                    ) : (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {wishlist.map(item => (
                          <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                                <p className="text-sm text-gray-600">₹{item.product.price.toLocaleString()}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}

                {activeTab === 'cart' && (
                  <div>
                    <h3 className="text-xl font-semibold text-gray-800 mb-6">Shopping Cart</h3>
                    {cart.length === 0 ? (
                      <div className="text-center py-12">
                        <Package className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                        <p className="text-gray-500">Your cart is empty</p>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {cart.map(item => (
                          <div key={item.product.id} className="border border-gray-200 rounded-lg p-4">
                            <div className="flex items-center space-x-4">
                              <img
                                src={item.product.images[0]}
                                alt={item.product.name}
                                className="w-16 h-16 object-cover rounded"
                              />
                              <div className="flex-1">
                                <h4 className="font-medium text-gray-800">{item.product.name}</h4>
                                <p className="text-sm text-gray-600">
                                  ₹{item.product.price.toLocaleString()} x {item.quantity}
                                </p>
                              </div>
                              <div className="text-right">
                                <p className="font-medium text-gray-800">
                                  ₹{(item.product.price * item.quantity).toLocaleString()}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <OrderTrackingModal
        isOpen={showOrderTracking}
        onClose={() => setShowOrderTracking(false)}
        order={selectedOrder}
      />
    </>
  );
};

export default UserDashboard;