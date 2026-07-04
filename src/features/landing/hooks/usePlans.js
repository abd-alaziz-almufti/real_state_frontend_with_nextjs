import { useState, useEffect } from 'react';
import { PlansApi } from '../api';

export const usePlans = () => {
    const [plans, setPlans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPlansData = async() => {
            try {
                setLoading(true);
                setError(null);
                const response = await PlansApi.getAll();
                setPlans(response.data || response);
            } catch (err) {
                setError(err.message || 'Failed to fetch plans');
            } finally {
                setLoading(false);
            }
        };

        fetchPlansData();
    }, []);

    return { plans, loading, error };
};