import { useCallback, useEffect, useState } from 'react';
import { rentalRequestsApi } from '../api';

export function useRentalRequests() {
  const [rentalRequests, setRentalRequests] = useState([]);
  const [meta, setMeta] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [deletingId, setDeletingId] = useState(null);

  const fetchRentalRequests = useCallback(async (currentPage) => {
    setLoading(true);
    setError(null);

    try {
      const response = await rentalRequestsApi.fetchAll(currentPage);
      setRentalRequests(response.data || []);
      setMeta(response.meta || null);
    } catch (err) {
      setError(err?.message || 'Failed to fetch rental requests.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const request = Promise.resolve().then(() => fetchRentalRequests(page));
    void request;
  }, [fetchRentalRequests, page]);

  const changePage = (newPage) => {
    if (newPage > 0 && (!meta || newPage <= meta.last_page)) {
      setPage(newPage);
    }
  };

  const deleteRentalRequest = async (id) => {
    setDeletingId(id);
    setError(null);

    try {
      await rentalRequestsApi.delete(id);

      const shouldShowPreviousPage = rentalRequests.length === 1 && page > 1;
      const nextPage = shouldShowPreviousPage ? page - 1 : page;

      if (shouldShowPreviousPage) {
        setPage(nextPage);
      } else {
        await fetchRentalRequests(nextPage);
      }
    } catch (err) {
      setError(err?.message || 'Failed to delete rental request.');
      throw err;
    } finally {
      setDeletingId(null);
    }
  };

  return {
    rentalRequests,
    meta,
    loading,
    error,
    page,
    changePage,
    deletingId,
    deleteRentalRequest,
    refetch: () => fetchRentalRequests(page),
  };
}
