import React, { useState, useEffect } from 'react';
import { Clock, Flame, ArrowRight } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

const DealsSection: React.FC = () => {
  const { settings } = useSite();
  const [timeLeft, setTimeLeft] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft: { [key: string]: string } = {};
      
      settings.deals.forEach(deal => {
        const endTime = new Date(deal.endTime).getTime();
        const now = new Date().getTime();
        const difference = endTime - now;
        
        if (difference > 0) {
          const hours = Math.floor(difference / (1000 * 60 * 60));
          const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
          const seconds = Math.floor((difference % (1000 * 60)) / 1000);
          
          newTimeLeft[deal.id] = `${hours}h ${minutes}m ${seconds}s`;
        } else {
          newTimeLeft[deal.id] = 'Expired';
        }
      });
      
      setTimeLeft(newTimeLeft);
    }, 1000);

    return () => clearInterval(timer);
  }, [settings.deals]);

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-3xl font-bold text-gray-800 flex items-center space-x-2">
          <Flame className="h-8 w-8 text-red-500" />
          <span>Today's Deals</span>
        </h2>
        <button className="text-blue-600 hover:text-blue-700 font-medium flex items-center space-x-1">
          <span>View All Deals</span>
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {settings.deals.map((deal) => (
          <div
            key={deal.id}
            className="group relative overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
          >
            <div className="relative h-48">
              <img
                src={deal.image}
                alt={deal.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className={`absolute inset-0 bg-gradient-to-r ${deal.color} opacity-80`} />
              
              <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold animate-pulse">
                {deal.discount} OFF
              </div>
              
              <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center p-6">
                <h3 className="text-2xl font-bold mb-2">{deal.title}</h3>
                <p className="text-lg opacity-90 mb-4">{deal.description}</p>
                
                <div className="flex items-center space-x-2 bg-white/20 backdrop-blur-sm rounded-lg px-3 py-2">
                  <Clock className="h-4 w-4" />
                  <span className="text-sm font-medium">
                    {timeLeft[deal.id] || 'Loading...'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DealsSection;