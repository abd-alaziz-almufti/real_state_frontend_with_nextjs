import { useState, useEffect, useCallback } from 'react';
import { AgenciesApi } from '../api';

export const useAgenciesList = (initialParams = {}) => {
  const [agencies, setAgencies] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [params, setParams] = useState(initialParams);

  const fetchAgencies = useCallback(async (queryParams) => {
    try {
      setLoading(true);
      setError(null);
      const response = await AgenciesApi.getAll(queryParams);
      
      setAgencies(response.data || []);
      setMeta(response.meta || null);
    } catch (err) {
      setError(err.message || 'Failed to fetch agencies');
      setAgencies([]);
      setMeta(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAgencies(params);
  }, [params, fetchAgencies]);

  const changePage = (page) => {
    setParams(prev => ({ ...prev, page }));
  };

  const updateFilters = (newFilters) => {
    setParams(prev => ({ ...prev, ...newFilters, page: 1 }));
  };

  return {
    agencies,
    meta,
    loading,
    error,
    params,
    changePage,
    updateFilters,
    refresh: () => fetchAgencies(params)
  };
};
