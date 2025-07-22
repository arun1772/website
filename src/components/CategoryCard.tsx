import React from 'react';
import * as LucideIcons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
  onClick: () => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({ category, onClick }) => {
  const IconComponent = LucideIcons[category.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;

  // Category specific icons mapping
  const getCategoryEmoji = (categoryName: string) => {
    switch (categoryName) {
      case 'Electronics': return '📱';
      case 'Fashion': return '👕';
      case 'Home & Living': return '🏠';
      case 'Books': return '📚';
      case 'Sports': return '⚽';
      case 'Beauty': return '💄';
      case 'Toys & Games': return '🎮';
      case 'Gift Cards': return '🎁';
      default: return '🛍️';
    }
  };

  return (
    <div 
      onClick={onClick}
      className="group cursor-pointer transform transition-all duration-300 hover:scale-105"
    >
      <div className={`relative overflow-hidden rounded-2xl bg-gradient-to-br ${category.color} p-6 h-32 flex flex-col items-center justify-center text-white shadow-lg hover:shadow-xl transition-all duration-300`}>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
        
        <div className="relative z-10 flex flex-col items-center space-y-2">
          <div className="text-2xl mb-1">{getCategoryEmoji(category.name)}</div>
          <h3 className="text-sm font-semibold text-center group-hover:text-yellow-200 transition-colors duration-300">
            {category.name}
          </h3>
        </div>
        
        <div className="absolute -bottom-2 -right-2 w-16 h-16 bg-white/10 rounded-full blur-xl group-hover:bg-white/20 transition-all duration-300" />
      </div>
    </div>
  );
};

export default CategoryCard;