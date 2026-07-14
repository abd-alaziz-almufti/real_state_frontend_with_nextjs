'use client';

import { Suspense } from 'react';
import { usePayments, PaymentsTable, usePaymentCheckout } from '@/features/dashboard';
import Pagination from '@/components/Pagination';

function TenantPaymentsContent() {
  const { payments, meta, loading, error, changePage, refetch } = usePayments();
  const { handlePay, isProcessing, checkoutError, setCheckoutError } = usePaymentCheckout();

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>My Payments</h1>
        <p className="text-sm mt-1" style={{ color: '#64748b' }}>View your payment history and upcoming dues.</p>
      </div>

      {/* Error State */}
      {(error || checkoutError) && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
          style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
          <span>
            {error || checkoutError}
            {checkoutError && (
              <button 
                className="ml-2 underline text-red-700 hover:text-red-800" 
                onClick={() => setCheckoutError(null)}
              >
                Dismiss
              </button>
            )}
          </span>
        </div>
      )}


      {/* Main Content Card */}
      <section
        className="rounded-2xl overflow-hidden flex flex-col"
        style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
      >
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
          <h2 className="font-bold" style={{ color: '#0f172a' }}>All Payments</h2>
        </div>
        
        <div className="flex-1">
          {loading ? (
            <div className="p-6 space-y-3">
              {[1, 2, 3, 4, 5].map((i) => <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />)}
            </div>
          ) : (
            <>
              <PaymentsTable 
                payments={payments} 
                onPay={handlePay} 
                isProcessing={isProcessing} 
              />
              
              {/* Pagination */}
              {meta && meta.last_page > 1 && (
                <div className="p-4" style={{ borderTop: '1px solid #f8fafc' }}>
                  <Pagination meta={meta} onPageChange={changePage} />
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}

export default function TenantPaymentsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading dashboard...</div>}>
      <TenantPaymentsContent />
    </Suspense>
  );
}
