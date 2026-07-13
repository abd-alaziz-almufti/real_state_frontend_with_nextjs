import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export function usePayment(id) {
  const [payment, setPayment] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchPayment = useCallback(async () => {
    if (!id) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.fetchTenantPayment(id);
      setPayment(response.data || null);
    } catch (err) {
      setError(err?.message || 'Failed to fetch payment details.');
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchPayment();
  }, [fetchPayment]);

  return { payment, loading, error, refetch: fetchPayment };
}
