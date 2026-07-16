import api from '@/lib/axios';

export * from './rentalRequests.api';

export const dashboardApi = {
  fetchTenantPayments: async (page = 1) => {
    try {
      const response = await api.get(`tenant/payments?page=${page}`);
      return response;
    } catch (error) {
      console.error('Error fetching tenant payments:', error);
      throw error;
    }
  },
  fetchTenantPayment: async (id) => {
    try {
      const response = await api.get(`tenant/payments/${id}`);
      return response;
    } catch (error) {
      console.error(`Error fetching tenant payment ${id}:`, error);
      throw error;
    }
  },
  createPaymentSession: async (paymentId) => {
    try {
      const response = await api.post('checkout/payment-session', { payment_id: paymentId });
      return response;
    } catch (error) {
      console.error('Error creating payment session:', error);
      throw error;
    }
  },
  verifyPaymentSession: async (sessionId) => {
    try {
      const response = await api.post('checkout/verify-payment-session', { session_id: sessionId });
      return response;
    } catch (error) {
      console.error('Error verifying payment session:', error);
      throw error;
    }
  },
  submitMaintenanceRequest: async (payload) => {
    try {
      const formData = new FormData();
      formData.append('unit_id', payload.unit_id);
      formData.append('title', payload.title);
      formData.append('description', payload.description);
      formData.append('priority', payload.priority);

      if (payload.images && payload.images.length > 0) {
        payload.images.forEach((file) => {
          formData.append('images[]', file);
        });
      }
      const response = await api.post('tenant/maintenance-requests', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response;
    } catch (error) {
      console.error('Error submitting maintenance request:', error);
      throw error;
    }
  },
  fetchMaintenanceRequests: async (page = 1) => {
    try {
      const response = await api.get(`tenant/maintenance-requests?page=${page}`);
      return response;
    } catch (error) {
      console.error('Error fetching maintenance requests:', error);
      throw error;
    }
  }
};
