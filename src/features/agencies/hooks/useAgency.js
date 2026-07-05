import { useState, useEffect } from 'react';
import { AgenciesApi } from '../api';

export const useAgency = (id) => {
  const [agency, setAgency] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!id) return;

    const fetchAgencyData = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await AgenciesApi.getById(id);
        const data = response.data || response;
        setAgency(data);
      } catch (err) {
        setError(err.message || 'Failed to fetch agency details');
      } finally {
        setLoading(false);
      }
    };

    fetchAgencyData();
  }, [id]);

  return { agency, loading, error };
};
