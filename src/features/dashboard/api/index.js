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
  }
};
