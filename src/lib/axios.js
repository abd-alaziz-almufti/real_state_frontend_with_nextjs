import axios from 'axios';

/**
 * Axios instance configured for Laravel Sanctum authentication
 * - Uses HttpOnly cookies for secure token handling
 * - Returns response.data (contains success flag from backend)
 * - Service layer checks success flag and extracts actual data
 * - Handles validation errors (422), unauthorized (401), and network errors
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000/api',
  timeout: 10000,
  withCredentials: true, // Send cookies automatically
  headers: {
    'Content-Type': 'application/json'
  },
});

/**
 * Request Interceptor
 * - Logs requests in development mode
 */
api.interceptors.request.use(
  (config) => {
    if (process.env.NODE_ENV === 'development') {
      console.log(`[Request] ${config.method?.toUpperCase()} ${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * - Returns response.data (backend wrapper with success flag)
 * - Handles errors: 422 validation, 401 unauthorized, network errors
 */
api.interceptors.response.use(
  (response) => {
    // Return response.data which contains { success: true, data: {...} }
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;
      
      // 401 Unauthorized - session expired
      if (status === 401) {
        if (typeof window !== 'undefined') {
          console.warn('Unauthorized. Redirecting to login...');
          window.location.href = '/login';
        }
      }
      
      // 422 Validation Errors
      if (status === 422) {
        const validationError = new Error(data.message || 'Validation failed');
        validationError.errors = data.errors || {};
        return Promise.reject(validationError);
      }
      
      // Other HTTP errors (500, 404, etc)
      const httpError = new Error(data.message || `Error ${status}`);
      return Promise.reject(httpError);
    } else if (error.request) {
      // Network error - request made but no response
      const networkError = new Error('Network error. Please check your connection.');
      return Promise.reject(networkError);
    }
    
    // Request setup error
    return Promise.reject(error);
  }
);

export default api;
