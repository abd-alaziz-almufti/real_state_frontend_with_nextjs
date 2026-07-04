import { useState, useEffect } from 'react';
import { UnitsApi } from '../api';

export const useUnit = (id) => {
    const [unit, setUnit] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (!id) return;

        const fetchUnitData = async () => {
            try {
                setLoading(true);
                setError(null);
                const response = await UnitsApi.getById(id);
                // Based on user response example: { data: { ... } }
                const data = response.data || response;
                console.log(data);
                setUnit(data);
            } catch (err) {
                setError(err.message || 'Failed to fetch unit details');
            } finally {
                setLoading(false);
            }
        };

        fetchUnitData();
    }, [id]);

    return { unit, loading, error };
};
