import axios from 'axios';

/**
 * Axios instance configured for Laravel Sanctum authentication
 * - Injects Bearer token from localStorage on each request
 * - Returns response.data (contains success flag from backend)
 * - Handles validation errors (422) and network errors gracefully
 * - Does NOT auto-redirect on 401 — handled at the component/context level
 */
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://127.0.0.1:8000/api/',
  timeout: 10000,
  withCredentials: false,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

/**
 * Request Interceptor
 * Injects Bearer token from localStorage on every request (client-side only)
 */
api.interceptors.request.use(
  (config) => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    if (process.env.NODE_ENV === 'development') {
      console.log(`[API Request] ${config.method?.toUpperCase()} ${config.baseURL}${config.url}`);
    }
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * - Returns response.data which contains { success, data, message }
 * - Throws descriptive errors for non-2xx responses
 * - Does NOT auto-redirect on 401 — AuthContext handles that
 */
api.interceptors.response.use(
  (response) => {
    // Unwrap the data envelope from Laravel responses
    return response.data;
  },
  (error) => {
    if (error.response) {
      const { status, data } = error.response;

      // 422 Validation Errors — attach field errors for form handling
      if (status === 422) {
        const validationError = new Error(data.message || 'Validation failed');
        validationError.errors = data.errors || {};
        validationError.status = 422;
        return Promise.reject(validationError);
      }

      // 401 Unauthorized — reject with a typed error; caller decides what to do
      if (status === 401) {
        const authError = new Error(data.message || 'Unauthorized');
        authError.status = 401;
        return Promise.reject(authError);
      }

      // Other HTTP errors (500, 404, 403, etc.)
      const httpError = new Error(data?.message || `Request failed with status ${status}`);
      httpError.status = status;
      return Promise.reject(httpError);

    } else if (error.request) {
      // Request was made but no response received (network/CORS/server down)
      const networkError = new Error('Network error. Please check your connection.');
      networkError.isNetworkError = true;
      return Promise.reject(networkError);
    }

    // Request setup error
    return Promise.reject(error);
  }
);

export default api;