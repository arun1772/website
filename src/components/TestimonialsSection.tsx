import React from 'react';
import { Star, Quote } from 'lucide-react';
import { useSite } from '../contexts/SiteContext';

const TestimonialsSection: React.FC = () => {
  const { settings } = useSite();

  return (
    <div className="mb-12 bg-gradient-to-r from-blue-50 to-purple-50 rounded-2xl p-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">What Our Customers Say</h2>
        <p className="text-gray-600">Real reviews from real customers</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {settings.testimonials.map((testimonial) => (
          <div
            key={testimonial.id}
            className="bg-white rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
          >
            <div className="flex items-center mb-4">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-12 h-12 rounded-full object-cover mr-4"
              />
              <div>
                <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                <div className="flex items-center">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400 fill-current" />
                  ))}
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Quote className="h-8 w-8 text-blue-200 absolute -top-2 -left-2" />
              <p className="text-gray-600 italic pl-6">{testimonial.comment}</p>
            </div>
            
            <div className="mt-4 pt-4 border-t border-gray-100">
              <p className="text-sm text-blue-600 font-medium">Purchased: {testimonial.product}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TestimonialsSection;