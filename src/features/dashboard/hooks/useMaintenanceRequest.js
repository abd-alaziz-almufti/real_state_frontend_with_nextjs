import { useState } from 'react';
import { dashboardApi } from '../api';

export function useMaintenanceRequest() {
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    const submit = async (payload) => {
        setSubmitting(true);
        setError(null);
        setSuccess(false);
        try {
            const response = await dashboardApi.submitMaintenanceRequest(payload);
            if (response?.success) {
                setSuccess(true);
                return { success: true, data: response.data };
            }
            setError(response?.message || 'Failed to submit request.');
            return { success: false };
        } catch (err) {
            setError(err?.errors ? Object.values(err.errors).flat().join(' ') : (err?.message || 'Failed to submit request.'));
            return { success: false };
        } finally {
            setSubmitting(false);
        }
    };

    const reset = () => {
        setError(null);
        setSuccess(false);
    };

    return { submit, submitting, error, success, reset };
}