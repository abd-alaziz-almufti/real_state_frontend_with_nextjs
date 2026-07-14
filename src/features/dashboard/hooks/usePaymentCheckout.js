import { useState, useCallback } from 'react';
import { dashboardApi } from '../api';

export function usePaymentCheckout() {
  const [isProcessing, setIsProcessing] = useState(false);
  const [checkoutError, setCheckoutError] = useState(null);

  const handlePay = useCallback(async (paymentId) => {
    setIsProcessing(paymentId); // Track which payment ID is processing
    setCheckoutError(null);
    try {
      const response = await dashboardApi.createPaymentSession(paymentId);
      if (response?.success && response?.url) {
        window.location.href = response.url;
      } else {
        setCheckoutError(response?.message || 'Failed to start checkout process.');
      }
    } catch (err) {
      setCheckoutError(err?.response?.data?.message || err?.message || 'Error occurred during checkout.');
    } finally {
      setIsProcessing(null);
    }
  }, []);

  return { handlePay, isProcessing, checkoutError, setCheckoutError };
}
