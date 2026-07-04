import api from '@/lib/axios';

export const PlansApi = {
    getAll: async() => {
        return api.get('plans');
    }
};