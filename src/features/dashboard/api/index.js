import api from '@/lib/axios';

export const dashboardApi = {
  fetchTenantPayments: async (page = 1) => {
    try {
      const response = await api.get(`/tenant/payments?page=${page}`);
      return response;
    } catch (error) {
      console.error('Error fetching tenant payments:', error);
      throw error;
    }
  },
  fetchTenantPayment: async (id) => {
    try {
      const response = await api.get(`/tenant/payments/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching tenant payment ${id}:`, error);
      throw error;
    }
  }
};
