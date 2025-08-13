import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Order, CartItem } from '../types';
import { orderAPI } from '../services/api';
import socketService from '../services/socket';

interface OrderContextType {
  orders: Order[];
  addOrder: (orderData: any) => Promise<string | null>;
  updateOrderStatus: (orderId: string, status: Order['status'], location?: string, description?: string) => Promise<void>;
  updateOrderTracking: (orderId: string, tracking: Order['trackingInfo'][0]) => void;
  verifyOTP: (orderId: string, otp: string) => Promise<boolean>;
  getUserOrders: (userId?: string) => Promise<Order[]>;
  getOrderById: (orderId: string) => Promise<Order | null>;
  cancelOrder: (orderId: string, reason?: string) => Promise<void>;
  getAllOrders: (params?: any) => Promise<any>;
  isLoading: boolean;
}

const OrderContext = createContext<OrderContextType | undefined>(undefined);

export const OrderProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // Set up real-time listeners
    socketService.onOrderUpdated((data) => {
      console.log('Order updated:', data);
      setOrders(prev => prev.map(order => 
        order.id === data.orderId 
          ? { ...order, status: data.status, trackingInfo: [...order.trackingInfo, data.trackingInfo] }
          : order
      ));
    });

    socketService.onOrderStatusChanged((data) => {
      console.log('Order status changed:', data);
      setOrders(prev => prev.map(order => 
        order.id === data.orderId 
          ? { ...order, status: data.status, trackingInfo: [...order.trackingInfo, data.trackingInfo] }
          : order
      ));
    });

    socketService.onNewOrder((data) => {
      console.log('New order received:', data);
      setOrders(prev => [data, ...prev]);
    });

    return () => {
      socketService.offOrderUpdated();
      socketService.offOrderStatusChanged();
      socketService.offNewOrder();
    };
  }, []);

  const addOrder = async (orderData: any): Promise<string | null> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.createOrder(orderData);
      if (response.success) {
        // The order will be added to state via socket event
        setIsLoading(false);
        return response.order.id;
      }
    } catch (error) {
      console.error('Failed to create order:', error);
    }
    setIsLoading(false);
    return null;
  };

  const updateOrderStatus = async (orderId: string, status: Order['status'], location?: string, description?: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.updateOrderStatus(orderId, status, location, description);
      if (response.success) {
        // The order will be updated in state via socket event
        console.log('Order status updated successfully');
      }
    } catch (error) {
      console.error('Failed to update order status:', error);
    }
    setIsLoading(false);
  };

  const updateOrderTracking = (orderId: string, tracking: Order['trackingInfo'][0]) => {
    setOrders(prev => prev.map(order => 
      order.id === orderId 
        ? { ...order, trackingInfo: [...order.trackingInfo, tracking] }
        : order
    ));
  };

  const verifyOTP = async (orderId: string, otp: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.verifyOTP(orderId, otp);
      if (response.success) {
        // Update local state
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, otpVerified: true, status: 'confirmed' as Order['status'] }
            : order
        ));
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Failed to verify OTP:', error);
    }
    setIsLoading(false);
    return false;
  };

  const getUserOrders = async (userId?: string): Promise<Order[]> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.getUserOrders();
      if (response.success) {
        setOrders(response.orders);
        setIsLoading(false);
        return response.orders;
      }
    } catch (error) {
      console.error('Failed to get user orders:', error);
    }
    setIsLoading(false);
    return [];
  };

  const getOrderById = async (orderId: string): Promise<Order | null> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.getOrderById(orderId);
      if (response.success) {
        setIsLoading(false);
        return response.order;
      }
    } catch (error) {
      console.error('Failed to get order:', error);
    }
    setIsLoading(false);
    return null;
  };

  const cancelOrder = async (orderId: string, reason?: string): Promise<void> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.cancelOrder(orderId, reason);
      if (response.success) {
        setOrders(prev => prev.map(order => 
          order.id === orderId 
            ? { ...order, status: 'cancelled' as Order['status'] }
            : order
        ));
      }
    } catch (error) {
      console.error('Failed to cancel order:', error);
    }
    setIsLoading(false);
  };

  const getAllOrders = async (params?: any): Promise<any> => {
    setIsLoading(true);
    try {
      const response = await orderAPI.getAllOrders(params);
      if (response.success) {
        setOrders(response.orders);
        setIsLoading(false);
        return response;
      }
    } catch (error) {
      console.error('Failed to get all orders:', error);
    }
    setIsLoading(false);
    return null;
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
      cancelOrder,
      getAllOrders,
      isLoading
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