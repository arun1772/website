// import React, { useState } from 'react';
// import { Search, ShoppingCart, Heart, User, Menu, X, Gift, Truck, Shield, Headphones, ChevronDown, Star, Settings } from 'lucide-react';
// import { useAuth } from '../contexts/AuthContext';
// import { useCart } from '../contexts/CartContext';
// import { products } from '../data/products';

// interface HeaderProps {
//   onAuthClick: () => void;
//   onCartClick: () => void;
//   onWishlistClick: () => void;
//   onUserDashboardClick: () => void;
//   onAdminDashboardClick: () => void;
//   onSearchChange: (query: string) => void;
//   onCategorySelect?: (category: string) => void;
// }

// const Header: React.FC<HeaderProps> = ({ 
//   onAuthClick, 
//   onCartClick, 
//   onWishlistClick,
//   onUserDashboardClick,
//   onAdminDashboardClick,
//   onSearchChange,
//   onCategorySelect
// }) => {
//   const { user, logout } = useAuth();
//   const { getTotalItems, wishlist } = useCart();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);
//   const [searchQuery, setSearchQuery] = useState('');

//   const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const query = e.target.value;
//     setSearchQuery(query);
//     onSearchChange(query);
//   };

//   const handleLogout = () => {
//     logout();
//     setIsMenuOpen(false);
//   };

//   return (
//     <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
//       {/* Top Banner */}
//       <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-center py-2">
//         <p className="text-sm font-medium text-gray-800 animate-pulse">
//           🎉 Free Delivery on orders above ₹500 | 30-Day Easy Returns | 24/7 Customer Support
//         </p>
//       </div>
      
//       <div className="container mx-auto px-4 py-3">
//         <div className="flex items-center justify-between">
//           {/* Logo */}
//           <div className="flex items-center space-x-4">
//             <div className="text-2xl font-bold text-white flex items-center space-x-2">
//               <Gift className="h-8 w-8 text-yellow-400" />
//               <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
//                 GiftShop
//               </span>
//             </div>
//           </div>

//           {/* Search Bar */}
//           <div className="hidden md:flex flex-1 max-w-2xl mx-8">
//             <div className="relative w-full">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={handleSearchChange}
//                 placeholder="Search for products, brands and more..."
//                 className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-200"
//               />
//               <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//             </div>
//           </div>

//           {/* Desktop Navigation */}
//           <div className="hidden md:flex items-center space-x-6">
//             {user ? (
//               <div className="flex items-center space-x-4">
//                 <div className="flex items-center space-x-2 text-white">
//                   <img 
//                     src={user.avatar} 
//                     alt={user.name}
//                     className="w-8 h-8 rounded-full border-2 border-white/30"
//                   />
//                   <span className="font-medium">{user.name}</span>
//                   {user.role === 'admin' && (
//                     <span className="px-2 py-1 text-xs bg-yellow-400 text-gray-800 rounded-full font-medium">
//                       Admin
//                     </span>
//                   )}
//                 </div>
                
//                 <button
//                   onClick={user.role === 'admin' ? onAdminDashboardClick : onUserDashboardClick}
//                   className="text-white hover:text-yellow-400 transition-colors"
//                 >
//                   {user.role === 'admin' ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
//                 </button>
                
//                 <button
//                   onClick={handleLogout}
//                   className="text-white hover:text-yellow-400 transition-colors"
//                 >
//                   Logout
//                 </button>
//               </div>
//             ) : (
//               <button
//                 onClick={onAuthClick}
//                 className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
//               >
//                 <User className="h-5 w-5" />
//                 <span>Login</span>
//               </button>
//             )}

//             {user && (
//               <>
//                 <button
//                   onClick={onWishlistClick}
//                   className="relative text-white hover:text-yellow-400 transition-colors"
//                 >
//                   <Heart className="h-6 w-6" />
//                   {wishlist.length > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                       {wishlist.length}
//                     </span>
//                   )}
//                 </button>

//                 <button
//                   onClick={onCartClick}
//                   className="relative text-white hover:text-yellow-400 transition-colors"
//                 >
//                   <ShoppingCart className="h-6 w-6" />
//                   {getTotalItems() > 0 && (
//                     <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//                       {getTotalItems()}
//                     </span>
//                   )}
//                 </button>
//               </>
//             )}
//           </div>

//           {/* Mobile menu button */}
//           <button
//             onClick={() => setIsMenuOpen(!isMenuOpen)}
//             className="md:hidden text-white"
//           >
//             {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
//           </button>
//         </div>

//         {/* Mobile Search */}
//         <div className="md:hidden mt-3">
//           <div className="relative">
//             <input
//               type="text"
//               value={searchQuery}
//               onChange={handleSearchChange}
//               placeholder="Search products..."
//               className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-200"
//             />
//             <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
//           </div>
//         </div>

//         {/* Mobile Navigation */}
//         {isMenuOpen && (
//           <div className="md:hidden mt-4 pb-4 border-t border-white/20">
//             <div className="flex flex-col space-y-4 pt-4">
//               {user ? (
//                 <div className="flex items-center space-x-2 text-white">
//                   <img 
//                     src={user.avatar} 
//                     alt={user.name} 
//                     className="w-8 h-8 rounded-full border-2 border-white/30"
//                   />
//                   <span className="font-medium">{user.name}</span>
//                   {user.role === 'admin' && (
//                     <span className="px-2 py-1 text-xs bg-yellow-400 text-gray-800 rounded-full font-medium">
//                       Admin
//                     </span>
//                   )}
//                 </div>
//               ) : (
//                 <button
//                   onClick={() => {
//                     onAuthClick();
//                     setIsMenuOpen(false);
//                   }}
//                   className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
//                 >
//                   <User className="h-5 w-5" />
//                   <span>Login</span>
//                 </button>
//               )}

//               {user && (
//                 <>
//                   <button
//                     onClick={() => {
//                       user.role === 'admin' ? onAdminDashboardClick() : onUserDashboardClick();
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
//                   >
//                     {user.role === 'admin' ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
//                     <span>Dashboard</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       onWishlistClick();
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
//                   >
//                     <Heart className="h-5 w-5" />
//                     <span>Wishlist ({wishlist.length})</span>
//                   </button>

//                   <button
//                     onClick={() => {
//                       onCartClick();
//                       setIsMenuOpen(false);
//                     }}
//                     className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
//                   >
//                     <ShoppingCart className="h-5 w-5" />
//                     <span>Cart ({getTotalItems()})</span>
//                   </button>
//                 </>
//               )}

//               {user && (
//                 <button
//                   onClick={handleLogout}
//                   className="text-white hover:text-yellow-400 transition-colors w-fit"
//                 >
//                   Logout
//                 </button>
//               )}
//             </div>
//           </div>
//         )}
//       </div>
      
//       {/* Navigation Bar */}
//       <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center justify-between py-2">
//             <div className="flex items-center space-x-6 text-white text-sm">
//               <span>📱 Electronics</span>
//               <span>👕 Fashion</span>
//               <span>🏠 Home & Living</span>
//               <span>📚 Books</span>
//               <span>⚽ Sports</span>
//               <span>💄 Beauty</span>
//             </div>
            
//             <div className="flex items-center space-x-6 text-white text-xs">
//               <div className="flex items-center space-x-1">
//                 <Truck className="h-4 w-4" />
//                 <span>Free Delivery</span>
//               </div>
//               <div className="flex items-center space-x-1">
//                 <Shield className="h-4 w-4" />
//                 <span>Secure Payment</span>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </header>
//   );
// };

// export default Header;\

import React, { useState } from 'react';
import { Search, ShoppingCart, Heart, User, Menu, X, Gift, Truck, Shield, Headphones, ChevronDown, Star, Settings } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../contexts/CartContext';
import { categories, products } from '../data/products';

interface HeaderProps {
  onAuthClick: () => void;
  onCartClick: () => void;
  onWishlistClick: () => void;
  onUserDashboardClick: () => void;
  onAdminDashboardClick: () => void;
  onSearchChange: (query: string) => void;
  onCategorySelect?: (category: string) => void;
}

const Header: React.FC<HeaderProps> = ({ 
  onAuthClick, 
  onCartClick, 
  onWishlistClick,
  onUserDashboardClick,
  onAdminDashboardClick,
  onSearchChange,
  onCategorySelect
}) => {
  const { user, logout } = useAuth();
  const { getTotalItems, wishlist } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showCategoriesDropdown, setShowCategoriesDropdown] = useState(false);
  const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
    onSearchChange(query);
  };

  const handleLogout = () => {
    logout();
    setIsMenuOpen(false);
  };

  const handleCategoryClick = (categoryName: string) => {
    if (onCategorySelect) {
      onCategorySelect(categoryName);
    }
    setShowCategoriesDropdown(false);
  };

  const getCategoryProducts = (categoryName: string) => {
    return products.filter(product => product.category === categoryName).slice(0, 4);
  };

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 shadow-lg">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-center py-2">
        <p className="text-sm font-medium text-gray-800 animate-pulse">
          🎉 Free Delivery on orders above ₹500 | 30-Day Easy Returns | 24/7 Customer Support
        </p>
      </div>
      
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-4">
            <div className="text-2xl font-bold text-white flex items-center space-x-2">
              <Gift className="h-8 w-8 text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-400 bg-clip-text text-transparent">
                GiftShop
              </span>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl mx-8">
            <div className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                placeholder="Search for products, brands and more..."
                className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-200"
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {user ? (
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 text-white">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <span className="font-medium">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="px-2 py-1 text-xs bg-yellow-400 text-gray-800 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
                
                <button
                  onClick={user.role === 'admin' ? onAdminDashboardClick : onUserDashboardClick}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  {user.role === 'admin' ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
                </button>
                
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-yellow-400 transition-colors"
                >
                  Logout
                </button>
              </div>
            ) : (
              <button
                onClick={onAuthClick}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors"
              >
                <User className="h-5 w-5" />
                <span>Login</span>
              </button>
            )}

            <button
              onClick={onWishlistClick}
              className="relative text-white hover:text-yellow-400 transition-colors"
            >
              <Heart className="h-6 w-6" />
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlist.length}
                </span>
              )}
            </button>

            <button
              onClick={onCartClick}
              className="relative text-white hover:text-yellow-400 transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden text-white"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-3">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              placeholder="Search products..."
              className="w-full px-4 py-2 pl-10 pr-4 rounded-lg bg-white/90 backdrop-blur-sm text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:bg-white transition-all duration-200"
            />
            <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-white/20">
            <div className="flex flex-col space-y-4 pt-4">
              {/* Mobile Categories */}
              <div className="border-b border-white/20 pb-4">
                <p className="text-white font-medium mb-3">Categories & Products</p>
                <div className="space-y-3">
                  {categories.map((category) => (
                    <div
                      key={category.id}
                      className="space-y-2"
                    >
                      <button
                        onClick={() => {
                          handleCategoryClick(category.name);
                          setIsMenuOpen(false);
                        }}
                        className="text-left text-white font-medium hover:text-yellow-400 transition-colors text-sm w-full"
                      >
                        {category.name}
                      </button>
                      <div className="pl-4 space-y-1">
                        {getCategoryProducts(category.name).slice(0, 2).map((product) => (
                          <div
                            key={product.id}
                            className="flex items-center space-x-2 text-white/70 text-xs"
                          >
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className="w-6 h-6 object-cover rounded"
                            />
                            <span className="truncate">{product.name}</span>
                            <span className="text-yellow-400">₹{product.price.toLocaleString()}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {user ? (
                <div className="flex items-center space-x-2 text-white">
                  <img 
                    src={user.avatar} 
                    alt={user.name}
                    className="w-8 h-8 rounded-full border-2 border-white/30"
                  />
                  <span className="font-medium">{user.name}</span>
                  {user.role === 'admin' && (
                    <span className="px-2 py-1 text-xs bg-yellow-400 text-gray-800 rounded-full font-medium">
                      Admin
                    </span>
                  )}
                </div>
              ) : (
                <button
                  onClick={() => {
                    onAuthClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
                >
                  <User className="h-5 w-5" />
                  <span>Login</span>
                </button>
              )}

              {user && (
                <button
                  onClick={() => {
                    user.role === 'admin' ? onAdminDashboardClick() : onUserDashboardClick();
                    setIsMenuOpen(false);
                  }}
                  className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
                >
                  {user.role === 'admin' ? <Settings className="h-5 w-5" /> : <User className="h-5 w-5" />}
                  <span>Dashboard</span>
                </button>
              )}

              <button
                onClick={() => {
                  onWishlistClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
              >
                <Heart className="h-5 w-5" />
                <span>Wishlist ({wishlist.length})</span>
              </button>

              <button
                onClick={() => {
                  onCartClick();
                  setIsMenuOpen(false);
                }}
                className="flex items-center space-x-2 text-white hover:text-yellow-400 transition-colors w-fit"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Cart ({getTotalItems()})</span>
              </button>

              {user && (
                <button
                  onClick={handleLogout}
                  className="text-white hover:text-yellow-400 transition-colors w-fit"
                >
                  Logout
                </button>
              )}
            </div>
          </div>
        )}
      </div>
      
      {/* Navigation Bar */}
      <div className="bg-white/10 backdrop-blur-sm border-t border-white/20">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 relative">
            {/* Direct Category Links */}
            <div className="flex items-center space-x-6">
              {categories.map((category) => (
                <div
                  key={category.id}
                  className="relative group"
                  onMouseEnter={() => setHoveredCategory(category.name)}
                  onMouseLeave={() => setHoveredCategory(null)}
                >
                  <button
                    onClick={() => handleCategoryClick(category.name)}
                    className="text-white hover:text-yellow-400 transition-colors text-sm font-medium flex items-center space-x-1"
                  >
                    <span>{category.name}</span>
                    <ChevronDown className="h-3 w-3" />
                  </button>
                  
                  {/* Products Dropdown */}
                  {hoveredCategory === category.name && (
                    <div className="absolute top-full left-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 z-50 overflow-hidden">
                      <div className="p-4">
                        <h3 className="font-semibold text-gray-800 mb-3 flex items-center space-x-2">
                          <span>{category.name} Products</span>
                        </h3>
                        <div className="space-y-3">
                          {getCategoryProducts(category.name).map((product) => (
                            <div
                              key={product.id}
                              className="flex items-center space-x-3 p-2 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                              onClick={() => {
                                setHoveredCategory(null);
                              }}
                            >
                              <img
                                src={product.images[0]}
                                alt={product.name}
                                className="w-12 h-12 object-cover rounded-lg"
                              />
                              <div className="flex-1 min-w-0">
                                <h4 className="text-sm font-medium text-gray-800 truncate">
                                  {product.name}
                                </h4>
                                <div className="flex items-center space-x-2">
                                  <span className="text-sm font-bold text-blue-600">
                                    ₹{product.price.toLocaleString()}
                                  </span>
                                  {product.originalPrice && (
                                    <span className="text-xs text-gray-500 line-through">
                                      ₹{product.originalPrice.toLocaleString()}
                                    </span>
                                  )}
                                </div>
                                <div className="flex items-center space-x-1">
                                  <Star className="h-3 w-3 text-yellow-400 fill-current" />
                                  <span className="text-xs text-gray-600">{product.rating}</span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                        <button
                          onClick={() => {
                            handleCategoryClick(category.name);
                            setHoveredCategory(null);
                          }}
                          className="w-full mt-3 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white text-sm font-medium py-2 px-4 rounded-lg transition-all duration-300"
                        >
                          View All {category.name} Products
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
            
            <div className="flex items-center space-x-6 text-white text-xs">
              <div className="flex items-center space-x-1">
                <Truck className="h-4 w-4" />
                <span>Free Delivery</span>
              </div>
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>Secure Payment</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;