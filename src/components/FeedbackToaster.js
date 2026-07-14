'use client';

import { Toaster, toast } from 'sonner';

export function AppToaster() {
  return <Toaster richColors position="top-right" closeButton />;
}

export const feedbackToast = {
  success: (message) => toast.success(message),
  error: (message) => toast.error(message),
  info: (message) => toast.info(message),
};
