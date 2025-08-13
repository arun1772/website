import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';
import { authAPI } from '../services/api';
import socketService from '../services/socket';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  register: (name: string, email: string, password: string) => Promise<boolean>;
  updateProfile: (updates: Partial<User>) => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('token');
      const savedUser = localStorage.getItem('currentUser');
      
      if (token && savedUser) {
        try {
          // Verify token with server
          const response = await authAPI.getMe();
          if (response.success) {
            const userData = response.user;
            setUser({
              id: userData.id,
              name: userData.name,
              email: userData.email,
              role: userData.role,
              avatar: userData.avatar,
              phone: userData.phone,
              address: userData.address
            });
            
            // Connect to socket and join user room
            socketService.connect();
            socketService.joinUserRoom(userData.id);
            
            if (userData.role === 'admin') {
              socketService.joinAdminRoom();
            }
          }
        } catch (error) {
          console.error('Auth verification failed:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('currentUser');
        }
      }
      setIsLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.login(email, password);
      if (response.success) {
        const userData = response.user;
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
          phone: userData.phone,
          address: userData.address
        });
        
        // Connect to socket and join user room
        socketService.connect();
        socketService.joinUserRoom(userData.id);
        
        if (userData.role === 'admin') {
          socketService.joinAdminRoom();
        }
        
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
    setIsLoading(false);
    return false;
  };

  const register = async (name: string, email: string, password: string): Promise<boolean> => {
    setIsLoading(true);
    try {
      const response = await authAPI.register(name, email, password);
      if (response.success) {
        const userData = response.user;
        setUser({
          id: userData.id,
          name: userData.name,
          email: userData.email,
          role: userData.role,
          avatar: userData.avatar,
          phone: userData.phone,
          address: userData.address
        });
        
        // Connect to socket and join user room
        socketService.connect();
        socketService.joinUserRoom(userData.id);
        
        setIsLoading(false);
        return true;
      }
    } catch (error) {
      console.error('Registration failed:', error);
    }
    setIsLoading(false);
    return false;
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      try {
        const response = await authAPI.updateProfile(updates);
        if (response.success) {
          const userData = response.user;
          setUser({
            id: userData.id,
            name: userData.name,
            email: userData.email,
            role: userData.role,
            avatar: userData.avatar,
            phone: userData.phone,
            address: userData.address
          });
        }
      } catch (error) {
        console.error('Profile update failed:', error);
      }
    }
  };

  const logout = async () => {
    try {
      await authAPI.logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
    setUser(null);
    socketService.disconnect();
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, register, updateProfile, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};