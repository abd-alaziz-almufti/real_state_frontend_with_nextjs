import { useState, useEffect, useCallback } from 'react';
import { dashboardApi } from '../api';

export function useMaintenanceRequests() {
  const [requests, setRequests] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);

  const fetchRequests = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);
    try {
      const response = await dashboardApi.fetchMaintenanceRequests(currentPage);
      
      // Extract data and pagination metadata from the raw Laravel paginator
      const paginator = response?.data || {};
      setRequests(paginator.data || []);
      setMeta({
        current_page: paginator.current_page || 1,
        last_page: paginator.last_page || 1,
        per_page: paginator.per_page || 10,
        total: paginator.total || 0
      });
    } catch (err) {
      setError(err?.message || 'Failed to fetch maintenance requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRequests(page);
  }, [fetchRequests, page]);

  const changePage = (newPage) => {
    if (newPage > 0 && (!meta || newPage <= meta.last_page)) {
      setPage(newPage);
    }
  };

  return { 
    requests, 
    meta, 
    loading, 
    error, 
    page, 
    changePage, 
    refetch: () => fetchRequests(page) 
  };
}
