import api from '@/lib/axios';

export const ContactApi = {
  submitContactForm: async (data) => {
    return api.post('contacts', data);
  }
};
