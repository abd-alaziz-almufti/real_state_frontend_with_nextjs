import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export function usePayments() {
  const [payments, setPayments] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchPayments = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.fetchTenantPayments(currentPage);
      // Ensure we extract data properly based on standard Laravel pagination structure
      setPayments(response.data || []);
      setMeta(response.meta || null);
    } catch (err) {
      setError(err?.message || 'Failed to fetch payments.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPayments(page);
  }, [fetchPayments, page]);

  const changePage = (newPage) => {
    if (newPage > 0 && (!meta || newPage <= meta.last_page)) {
      setPage(newPage);
    }
  };

  return { payments, meta, loading, error, page, changePage, refetch: () => fetchPayments(page) };
}
