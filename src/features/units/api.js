/**
 * API definitions for this specific feature.
 * Consumes the central axios instance for endpoints relating to this specific domain mapping.
 */


import api from '@/lib/axios';

export const UnitsApi = {
  getAll: async (params = {}) => {
    return api.get('units', { params });
  },
  getFeatured: async () => {
    return api.get('featured-units');
  },
  getById: async (id) => {
    return api.get(`units/${id}`);
  },
  rate: async (id, data) => {
    return api.post(`units/${id}/rate`, data);
  }
};
