import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, CartItem } from '../types';

interface OrderContextType {
  orders: Order[];
  addOrder: (order: Omit<Order, 'id' | 'createdAt'>) => string;
  updateOrderStatus: (orderId: string, status: Order['status']) => void;
  updateOrderTracking: (orderId: string, tracking: Order['trackingInfo'][0]) => void;
  verifyOTP: (orderId: string, otp: string) => boolean;
  getUserOrders: (userId: string) => Order[];
  getOrderById: (orderId: string) => Order | undefined;
  cancelOrder: (orderId: string) => void;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const savedOrders = localStorage.getItem('orders');
    if (savedOrders) {
      setOrders(JSON.parse(savedOrders));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('orders', JSON.stringify(orders));
  }, [orders]);

  const addOrder = (orderData: Omit<Order, 'id' | 'createdAt'>): string => {
    const orderId = Date.now().toString();
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    
    const newOrder: Order = {
      ...orderData,
      id: orderId,
      otp,
      createdAt: new Date(),
      trackingInfo: [{
        status: 'Order Placed',
        location: 'Order Processing Center',
        timestamp: new Date()
      }]
    };

    setOrders(prev => [...prev, newOrder]);
    
    // Send OTP to user email (simulated)
    console.log(`OTP sent to ${orderData.shippingAddress.name}: ${otp}`);
    
    return orderId;
  };

  const updateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status } : order
    ));
  };

  const updateOrderTracking = (orderId: string, tracking: Order['trackingInfo'][0]) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, trackingInfo: [...order.trackingInfo, tracking] }
        : order
    ));
  };

  const verifyOTP = (orderId: string, otp: string): boolean => {
    const order = orders.find(o => o.id === orderId);
    if (order && order.otp === otp) {
      setOrders(prev => prev.map(o => 
        o.id === orderId ? { ...o, otpVerified: true, status: 'confirmed' } : o
      ));
      return true;
    }
    return false;
  };

  const getUserOrders = (userId: string): Order[] => {
    return orders.filter(order => order.userId === userId);
  };

  const getOrderById = (orderId: string): Order | undefined => {
    return orders.find(order => order.id === orderId);
  };

  const cancelOrder = (orderId: string) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId ? { ...order, status: 'cancelled' } : order
    ));
  };

  return (
    <OrderContext.Provider value={{
      orders,
      addOrder,
      updateOrderStatus,
      updateOrderTracking,
      verifyOTP,
      getUserOrders,
      getOrderById,
      cancelOrder
    }}>
      {children}
    </OrderContext.Provider>
  );
};

export const useOrder = () => {
  const context = useContext(OrderContext);
  if (!context) {
    throw new Error('useOrder must be used within an OrderProvider');
  }
  return context;
};