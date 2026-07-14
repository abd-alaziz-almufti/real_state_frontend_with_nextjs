import api from '@/lib/axios';

const RENTAL_REQUESTS_ENDPOINT = 'tenant/rental-requests';

export const rentalRequestsApi = {
  fetchAll: (page = 1) => api.get(`${RENTAL_REQUESTS_ENDPOINT}?page=${page}`),

  fetchById: (id) => api.get(`${RENTAL_REQUESTS_ENDPOINT}/${id}`),

  delete: (id) => api.delete(`${RENTAL_REQUESTS_ENDPOINT}/${id}`),
};
