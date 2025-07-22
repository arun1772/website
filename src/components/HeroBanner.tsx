import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

const HeroBanner: React.FC = () => {
  const { settings } = useSite();
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % settings.banners.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [settings.banners.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % settings.banners.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + settings.banners.length) % settings.banners.length);
  };

  return (
    <div className="relative h-96 md:h-[500px] overflow-hidden rounded-2xl mx-4 mb-8">
      {settings.banners.map((banner, index) => (
        <div
          key={banner.id}
          className={`absolute inset-0 transition-transform duration-700 ease-in-out ${
            index === currentSlide ? 'translate-x-0' : 
            index < currentSlide ? '-translate-x-full' : 'translate-x-full'
          }`}
        >
          <div className="relative h-full">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
            />
            <div className={`absolute inset-0 bg-gradient-to-r ${banner.color} opacity-80`} />
            
            <div className="absolute inset-0 flex items-center justify-center text-center text-white">
              <div className="max-w-2xl px-4">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                  {banner.title}
                </h1>
                <p className="text-xl md:text-2xl mb-8 opacity-90">
                  {banner.subtitle}
                </p>
                <button className="bg-white text-gray-800 font-bold py-4 px-8 rounded-full hover:bg-yellow-400 transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 mx-auto">
                  <span>{banner.cta}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/20 backdrop-blur-sm rounded-full p-3 text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {settings.banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroBanner;