import React from 'react';
import * as LucideIcons from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

const StatsSection: React.FC = () => {
  const { settings } = useSite();

  return (
    <div className="mb-12 bg-white rounded-2xl shadow-lg p-8">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {settings.stats.map((stat, index) => {
          const IconComponent = LucideIcons[stat.icon as keyof typeof LucideIcons] as React.ComponentType<{ className?: string }>;
          
          return (
            <div
              key={stat.id}
              className="text-center group hover:scale-105 transition-transform duration-300"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r ${stat.color} text-white mb-4 group-hover:shadow-lg transition-shadow duration-300`}>
                {IconComponent && <IconComponent className="h-8 w-8" />}
              </div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
              <div className="text-gray-600 text-sm">{stat.label}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default StatsSection;