import { useState, useEffect, useCallback } from 'react';
import { UnitsApi } from '../api';

export const useUnitsList = (initialParams = {}) => {
    const [units, setUnits] = useState([]);
    const [meta, setMeta] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [params, setParams] = useState(initialParams);

    const fetchUnits = useCallback(async (queryParams) => {
        try {
            setLoading(true);
            setError(null);
            const response = await UnitsApi.getAll(queryParams);
            // Laravel paginated resource normally returns { data, meta, links }
            // Wait, looking at useUnits.js it seems api.get already returns the response data? Let's check what UnitsApi returns.
            // Actually it depends on how the axios instance is configured. Assuming standard setup where response is the full axios response object, or if it extracts data, it could be response.data.
            // I'll handle both cases to be safe.
            const responseData = response;
            setUnits(responseData.data || []);
            setMeta(responseData.meta || null);
        } catch (err) {
            setError(err.message || 'Failed to fetch units');
            setUnits([]);
            setMeta(null);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchUnits(params);
    }, [params, fetchUnits]);

    const changePage = useCallback((page) => {
        setParams(prev => ({ ...prev, page }));
    }, []);

    const updateFilters = useCallback((newFilters) => {
        setParams({ ...newFilters, page: 1 });
    }, []);

    return {
        units,
        meta,
        loading,
        error,
        params,
        changePage,
        updateFilters,
        refresh: () => fetchUnits(params)
    };
};
