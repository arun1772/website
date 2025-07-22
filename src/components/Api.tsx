// api.ts
import axios, { AxiosInstance, AxiosRequestConfig } from 'axios';

// Define common types
interface Product {
  _id?: string;
  name: string;
  description: string;
  price: number;
  // Add other product fields as needed
}

interface User {
  _id?: string;
  email: string;
  password?: string;
  name?: string;
  token?: string;
  // Add more user fields if required
}

interface Order {
  _id?: string;
  user: string;
  products: Product[];
  status?: string;
  // Add more order fields if required
}

const API: AxiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
});

API.interceptors.request.use((req: AxiosRequestConfig:any) => {
  const user = localStorage.getItem('user');
  if (user && req.headers) {
    const token = JSON.parse(user).token;
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// Products
export const fetchProducts = () => API.get<Product[]>('/products');
export const fetchProduct = (id: string) => API.get<Product>(`/products/${id}`);
export const createProduct = (product: Product) => API.post<Product>('/products', product);
export const updateProduct = (id: string, product: Product) => API.put<Product>(`/products/${id}`, product);
export const deleteProduct = (id: string) => API.delete(`/products/${id}`);

// Users
export const signIn = (formData: Partial<User>) => API.post<User>('/users/signin', formData);
export const signUp = (formData: Partial<User>) => API.post<User>('/users/signup', formData);
export const updateProfile = (id: string, updates: Partial<User>) => API.put<User>(`/users/${id}`, updates);

// Orders
export const createOrder = (order: Order) => API.post<Order>('/orders', order);
export const getOrders = (userId: string) => API.get<Order[]>(`/orders/user/${userId}`);
export const getOrder = (id: string) => API.get<Order>(`/orders/${id}`);
export const updateOrderStatus = (id: string, status: string) => 
  API.put<Order>(`/orders/${id}/status`, { status });
