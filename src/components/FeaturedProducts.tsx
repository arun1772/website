import React from 'react';
import { Crown, ArrowRight } from 'lucide-react';
import { products } from '../data/products';
import ProductCard from './ProductCard';

interface FeaturedProductsProps {
  onProductClick: (product: any) => void;
}

const FeaturedProducts: React.FC<FeaturedProductsProps> = ({ onProductClick }) => {
  const featuredProducts = products.filter(product => product.isFeatured);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
          <Crown className="h-8 w-8 text-yellow-500" />
          <span>Featured Products</span>
        </h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
          <span>View All</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {featuredProducts.map(product => (
          <div key={product.id} className="relative">
            <ProductCard product={product} onClick={() => onProductClick(product)} />
            <div className="absolute top-2 right-2 bg-yellow-500 text-white p-1 rounded-full">
              <Crown className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;