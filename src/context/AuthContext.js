'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import api from '@/lib/axios';
import { useRouter } from 'next/navigation';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true); // true until we verify the session
  const router = useRouter();

  const clearAuth = useCallback(() => {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
    }
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  // On mount: restore session from localStorage and verify with backend
  useEffect(() => {
    const initializeAuth = async () => {
      if (typeof window === 'undefined') {
        setLoading(false);
        return;
      }

      const storedToken = localStorage.getItem('token');
      const storedUser = localStorage.getItem('user');

      if (!storedToken || !storedUser) {
        setLoading(false);
        return;
      }

      // Optimistically restore the session from localStorage
      try {
        setUser(JSON.parse(storedUser));
        setIsAuthenticated(true);
      } catch {
        clearAuth();
        setLoading(false);
        return;
      }

      // Verify the token is still valid with the backend
      try {
        const response = await api.get('auth/me');
        if (response?.success && response?.data) {
          setUser(response.data);
          localStorage.setItem('user', JSON.stringify(response.data));
        } else {
          // Backend said session is invalid
          clearAuth();
        }
      } catch (e) {
        // 401 = token expired/invalid → clear session
        if (e?.status === 401) {
          clearAuth();
        }
        // For network errors, keep the optimistic session alive
        // (user might be offline, don't log them out)
        console.warn('[Auth] Could not verify session with backend:', e?.message);
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, [clearAuth]);

  const login = async (email, password) => {
    try {
      const response = await api.post('auth/login', { email, password });

      if (response?.success && response?.data) {
        const { token: userToken, user: userData } = response.data;

        // Redirect to returnUrl if set (e.g. after being redirected from checkout)
        const returnUrl = typeof window !== 'undefined' ? localStorage.getItem('auth_return_url') : null;

        if (userData?.role?.toLowerCase() !== 'tenant' && !returnUrl) {
          const adminPanelUrl = userData?.agency?.dashboard_url || process.env.NEXT_PUBLIC_ADMIN_PANEL_URL || 'http://127.0.0.1:8000/admin';
          return {
            success: false,
            message: 'This portal is for tenants only. Please use the company dashboard.',
            wrongPortal: true,
            adminPanelUrl: adminPanelUrl
          };
        }

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', userToken);
          localStorage.setItem('user', JSON.stringify(userData));
        }

        setUser(userData);
        setIsAuthenticated(true);

        if (returnUrl) {
          localStorage.removeItem('auth_return_url');
          router.push(returnUrl);
        } else {
          router.push('/tenant/dashboard');
        }
        return { success: true };
      }

      return { success: false, message: response?.message || 'Login failed' };
    } catch (e) {
      return { success: false, message: e?.message || 'An error occurred during login' };
    }
  };

  const register = async (name, email, password, phone = '') => {
    try {
      const response = await api.post('auth/register', { name, email, password, phone });

      if (response?.success && response?.data) {
        const { token: userToken, user: userData } = response.data;

        if (typeof window !== 'undefined') {
          localStorage.setItem('token', userToken);
          localStorage.setItem('user', JSON.stringify(userData));
        }

        setUser(userData);
        setIsAuthenticated(true);

        // After registration, if a checkout URL was saved, the user must create
        // their company first. Send them to /register/agency with the checkout
        // URL as its returnUrl so after company creation they land on checkout.
        const checkoutReturnUrl = typeof window !== 'undefined' ? localStorage.getItem('auth_return_url') : null;
        if (checkoutReturnUrl) {
          localStorage.removeItem('auth_return_url');
          router.push(`/register/agency?returnUrl=${encodeURIComponent(checkoutReturnUrl)}`);
        } else {
          router.push('/tenant/dashboard');
        }
        return { success: true };
      }

      return { success: false, message: response?.message || 'Registration failed' };
    } catch (e) {
      return { success: false, message: e?.message || 'An error occurred during registration' };
    }
  };

  const logout = async () => {
    try {
      await api.post('auth/logout');
    } catch (e) {
      console.warn('[Auth] Logout backend call failed:', e?.message);
    } finally {
      clearAuth();
      router.push('/login');
    }
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, loading, login, register, logout }}>
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
