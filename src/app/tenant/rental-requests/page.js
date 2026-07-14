'use client';

import { RentalRequestsTable, useRentalRequests } from '@/features/dashboard';
import Pagination from '@/components/Pagination';
import { feedbackToast } from '@/components/FeedbackToaster';

function RentalRequestsLoadingState() {
  return (
    <div className="space-y-3 p-6">
      {[1, 2, 3, 4, 5].map((item) => <div key={item} className="h-14 animate-pulse rounded-xl bg-slate-100" />)}
    </div>
  );
}

export default function TenantRentalRequestsPage() {
  const { rentalRequests, meta, loading, error, changePage, deletingId, deleteRentalRequest } = useRentalRequests();

  const handleDelete = async (id) => {
    try {
      await deleteRentalRequest(id);
      feedbackToast.success('Rental request deleted successfully.');
      return true;
    } catch {
      feedbackToast.error('Unable to delete the rental request. Please try again.');
      return false;
    }
  };

  return (
    <div className="space-y-6 p-6 lg:p-8">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold" style={{ color: '#4f46e5' }}>Tenant portal</p>
          <h1 className="mt-1 text-2xl font-bold" style={{ color: '#0f172a' }}>Rental Requests</h1>
          <p className="mt-1 text-sm" style={{ color: '#64748b' }}>Track every property request and its current approval status.</p>
        </div>
        {meta?.total !== undefined && <p className="text-sm font-medium" style={{ color: '#64748b' }}>{meta.total} total requests</p>}
      </div>

      {error && (
        <div className="flex items-center gap-3 rounded-xl p-4 text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
          <span className="material-symbols-outlined">error</span>
          {error}
        </div>
      )}

      <section className="overflow-hidden rounded-2xl" style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
        <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
          <h2 className="font-bold" style={{ color: '#0f172a' }}>Request register</h2>
          {!loading && <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>Updated from your account</span>}
        </div>

        {loading ? (
          <RentalRequestsLoadingState />
        ) : (
          <RentalRequestsTable
            requests={rentalRequests}
            onDelete={handleDelete}
            deletingId={deletingId}
          />
        )}

        {!loading && meta?.last_page > 1 && (
          <div className="p-4" style={{ borderTop: '1px solid #f8fafc' }}>
            <Pagination meta={meta} onPageChange={changePage} />
          </div>
        )}
      </section>
    </div>
  );
}
