/**
 * API definitions for the Agencies feature.
 * Consumes the central axios instance — connected to the Laravel backend.
 */

import api from '@/lib/axios';

export const AgenciesApi = {
  /**
   * Fetch a paginated list of agencies (companies) with optional filters.
   */
  getAll: async (params = {}) => {
    const response = await api.get('agencies', { params });
    return response;
  },

  /**
   * Fetch a single agency (company) by its ID including its unit inventory.
   */
  getById: async (id) => {
    const response = await api.get(`agencies/${id}`);
    return response;
  },
};
