import React, { useState, useEffect } from 'react';
import { Plus } from 'lucide-react';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import { OrderProvider } from './contexts/OrderContext';
import { SiteProvider } from './contexts/SiteContext';
import { useAuth } from './contexts/AuthContext';
import Header from './components/Header';
import HeroBanner from './components/HeroBanner';
import DealsSection from './components/DealsSection';
import FeaturedProducts from './components/FeaturedProducts';
import TestimonialsSection from './components/TestimonialsSection';
import StatsSection from './components/StatsSection';
import CategoryCard from './components/CategoryCard';
import ProductCard from './components/ProductCard';
import AuthModal from './components/AuthModal';
import CartModal from './components/CartModal';
import WishlistModal from './components/WishlistModal';
import AdminPanel from './components/AdminPanel';
import ProductModal from './components/ProductModal';
import CategoryPage from './components/CategoryPage';
import CheckoutModal from './components/CheckoutModal';
import UserDashboard from './components/UserDashboard';
import AdminDashboard from './components/AdminDashboard';
import { products as initialProducts, categories } from './data/products';
import { Product } from './types';

const AppContent: React.FC = () => {
  const [products, setProducts] = useState<Product[]>(initialProducts);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(initialProducts);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCartModal, setShowCartModal] = useState(false);
  const [showWishlistModal, setShowWishlistModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showUserDashboard, setShowUserDashboard] = useState(false);
  const [showAdminDashboard, setShowAdminDashboard] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [showProductModal, setShowProductModal] = useState(false);
  const [currentPage, setCurrentPage] = useState<'home' | 'category'>('home');
  const [selectedCategoryPage, setSelectedCategoryPage] = useState<string | null>(null);

  const { user } = useAuth();

  useEffect(() => {
    let filtered = products;

    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    if (searchQuery) {
      filtered = filtered.filter(product =>
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags?.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase())) ||
        product.features?.some(feature => feature.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    setFilteredProducts(filtered);
  }, [products, selectedCategory, searchQuery]);

  const handleCategoryClick = (categoryName: string) => {
    if (currentPage === 'home') {
      setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    } else {
      setSelectedCategoryPage(categoryName);
      setCurrentPage('category');
    }
  };

  const handleCategoryPageSelect = (categoryName: string) => {
    setSelectedCategoryPage(categoryName);
    setCurrentPage('category');
    setSelectedCategory(null);
    setSearchQuery('');
  };

  const handleBackToHome = () => {
    setCurrentPage('home');
    setSelectedCategoryPage(null);
  };

  const handleAddProduct = (newProduct: Omit<Product, 'id'>) => {
    const product: Product = {
      ...newProduct,
      id: Date.now().toString()
    };
    setProducts(prev => [...prev, product]);
  };

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setShowProductModal(true);
  };

  const handleOrderComplete = (orderId: string) => {
    alert(`Order placed successfully! Order ID: ${orderId}\nAn OTP has been sent to your email for verification.`);
  };

  return (
    <>
      <Header
        onAuthClick={() => setShowAuthModal(true)}
        onCartClick={() => setShowCartModal(true)}
        onWishlistClick={() => setShowWishlistModal(true)}
        onUserDashboardClick={() => setShowUserDashboard(true)}
        onAdminDashboardClick={() => setShowAdminDashboard(true)}
        onSearchChange={setSearchQuery}
        onCategorySelect={handleCategoryPageSelect}
      />

      {currentPage === 'home' ? (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
          <main className="container mx-auto px-4 py-8">
            <HeroBanner />
            <StatsSection />
            <DealsSection />
            <FeaturedProducts onProductClick={handleProductClick} />

            {user?.role === 'admin' && (
              <div className="mb-8 flex justify-center">
                <button
                  onClick={() => setShowAdminPanel(true)}
                  className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 flex items-center space-x-2 shadow-lg hover:shadow-xl"
                >
                  <Plus className="h-5 w-5" />
                  <span>Add New Product</span>
                </button>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Shop by Category</h2>
              <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
                {categories.map(category => (
                  <CategoryCard
                    key={category.id}
                    category={category}
                    onClick={() => handleCategoryClick(category.name)}
                  />
                ))}
              </div>
            </div>

            {(selectedCategory || searchQuery) && (
              <div className="mb-8 flex items-center justify-center space-x-4">
                <span className="text-gray-600">
                  {searchQuery ? `Search results for "${searchQuery}"` : `Category: ${selectedCategory}`}
                </span>
                <button
                  onClick={() => {
                    setSelectedCategory(null);
                    setSearchQuery('');
                  }}
                  className="text-blue-600 hover:text-blue-700 underline"
                >
                  Clear filters
                </button>
              </div>
            )}

            <div className="mb-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
                {selectedCategory ? `${selectedCategory} Products` : 'All Products'}
              </h2>
              
              {filteredProducts.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-gray-500 text-lg">No products found matching your criteria.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredProducts.map(product => (
                    <ProductCard
                      key={product.id}
                      product={product}
                      onClick={() => handleProductClick(product)}
                    />
                  ))}
                </div>
              )}
            </div>
            
            <TestimonialsSection />
          </main>

          <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8">
            <div className="container mx-auto px-4 text-center">
              <p className="text-lg font-semibold mb-2">GiftShop</p>
              <p className="text-gray-400">Your one-stop destination for amazing gifts</p>
              <p className="text-gray-400 mt-2">© 2024 GiftShop. All rights reserved.</p>
            </div>
          </footer>
        </div>
      ) : (
        <CategoryPage
          category={selectedCategoryPage!}
          onBack={handleBackToHome}
          onProductClick={handleProductClick}
        />
      )}

      {/* Modals */}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      <CartModal 
        isOpen={showCartModal} 
        onClose={() => setShowCartModal(false)}
        onCheckout={() => setShowCheckoutModal(true)}
      />
      <WishlistModal isOpen={showWishlistModal} onClose={() => setShowWishlistModal(false)} />
      <CheckoutModal 
        isOpen={showCheckoutModal} 
        onClose={() => setShowCheckoutModal(false)}
        onOrderComplete={handleOrderComplete}
      />
      <AdminPanel 
        isOpen={showAdminPanel} 
        onClose={() => setShowAdminPanel(false)}
        onAddProduct={handleAddProduct}
      />
      <UserDashboard 
        isOpen={showUserDashboard} 
        onClose={() => setShowUserDashboard(false)}
      />
      <AdminDashboard 
        isOpen={showAdminDashboard} 
        onClose={() => setShowAdminDashboard(false)}
        products={products}
        onProductUpdate={setProducts}
      />
      <ProductModal
        product={selectedProduct}
        isOpen={showProductModal}
        onClose={() => setShowProductModal(false)}
      />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <OrderProvider>
          <SiteProvider>
            <AppContent />
          </SiteProvider>
        </OrderProvider>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;