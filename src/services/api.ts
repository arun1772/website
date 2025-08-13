import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('currentUser');
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

// Auth APIs
export const authAPI = {
  login: async (email: string, password: string) => {
    const response = await api.post('/auth/login', { email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  register: async (name: string, email: string, password: string) => {
    const response = await api.post('/auth/register', { name, email, password });
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },

  logout: async () => {
    await api.post('/auth/logout');
    localStorage.removeItem('token');
    localStorage.removeItem('currentUser');
  },

  getMe: async () => {
    const response = await api.get('/auth/me');
    return response.data;
  },

  updateProfile: async (data: any) => {
    const response = await api.put('/auth/profile', data);
    if (response.data.user) {
      localStorage.setItem('currentUser', JSON.stringify(response.data.user));
    }
    return response.data;
  },
};

// Product APIs
export const productAPI = {
  getProducts: async (params?: any) => {
    const response = await api.get('/products', { params });
    return response.data;
  },

  getProductById: async (id: string) => {
    const response = await api.get(`/products/${id}`);
    return response.data;
  },

  searchProducts: async (query: string, params?: any) => {
    const response = await api.get('/products/search', { 
      params: { q: query, ...params } 
    });
    return response.data;
  },

  getCategories: async () => {
    const response = await api.get('/products/categories');
    return response.data;
  },

  // Admin APIs
  createProduct: async (data: any) => {
    const response = await api.post('/products', data);
    return response.data;
  },

  updateProduct: async (id: string, data: any) => {
    const response = await api.put(`/products/${id}`, data);
    return response.data;
  },

  deleteProduct: async (id: string) => {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  },

  updateStock: async (id: string, stock: number) => {
    const response = await api.patch(`/products/${id}/stock`, { stock });
    return response.data;
  },
};

// Order APIs
export const orderAPI = {
  createOrder: async (data: any) => {
    const response = await api.post('/orders', data);
    return response.data;
  },

  verifyOTP: async (orderId: string, otp: string) => {
    const response = await api.post('/orders/verify-otp', { orderId, otp });
    return response.data;
  },

  getUserOrders: async (params?: any) => {
    const response = await api.get('/orders/my-orders', { params });
    return response.data;
  },

  getOrderById: async (id: string) => {
    const response = await api.get(`/orders/${id}`);
    return response.data;
  },

  cancelOrder: async (id: string, reason?: string) => {
    const response = await api.patch(`/orders/${id}/cancel`, { reason });
    return response.data;
  },

  // Admin APIs
  getAllOrders: async (params?: any) => {
    const response = await api.get('/orders', { params });
    return response.data;
  },

  updateOrderStatus: async (id: string, status: string, location?: string, description?: string) => {
    const response = await api.patch(`/orders/${id}/status`, { 
      status, 
      location, 
      description 
    });
    return response.data;
  },
};

export default api;