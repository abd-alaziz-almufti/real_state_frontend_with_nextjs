'use client';

import { useState, useEffect, Suspense } from 'react';
import api from '@/lib/axios';
import { useMaintenanceRequests, MaintenanceRequestModal } from '@/features/dashboard';
import Pagination from '@/components/Pagination';

function MaintenanceRequestsContent() {
  const { requests, meta, loading, error, changePage, refetch } = useMaintenanceRequests();
  const [showModal, setShowModal] = useState(false);
  const [leases, setLeases] = useState([]);

  // Fetch active leases to pass to the modal
  useEffect(() => {
    api.get('tenant/dashboard')
      .then((res) => {
        if (res.success) {
          setLeases(res.data?.leases || []);
        }
      })
      .catch((err) => console.error('Failed to load leases for modal:', err));
  }, []);

  const getStatusStyle = (status) => {
    switch (status) {
      case 'new':
        return { bg: '#e0f2fe', color: '#0369a1', label: 'New' };
      case 'pending':
        return { bg: '#fef3c7', color: '#d97706', label: 'Pending' };
      case 'in_progress':
        return { bg: '#f3e8ff', color: '#7e22ce', label: 'In Progress' };
      case 'resolved':
        return { bg: '#dcfce7', color: '#15803d', label: 'Resolved' };
      case 'cancelled':
        return { bg: '#fee2e2', color: '#b91c1c', label: 'Cancelled' };
      default:
        return { bg: '#f1f5f9', color: '#475569', label: status };
    }
  };

  const getPriorityStyle = (priority) => {
    switch (priority) {
      case 'low':
        return { bg: '#f1f5f9', color: '#475569', label: 'Low' };
      case 'medium':
        return { bg: '#e0f2fe', color: '#0369a1', label: 'Medium' };
      case 'high':
        return { bg: '#ffedd5', color: '#c2410c', label: 'High' };
      case 'emergency':
        return { bg: '#ffe4e6', color: '#9f1239', label: 'Emergency' };
      default:
        return { bg: '#f1f5f9', color: '#475569', label: priority };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return '—';
    return new Intl.DateTimeFormat('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    }).format(new Date(dateString));
  };

  return (
    <div className="p-6 lg:p-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>Maintenance Requests</h1>
          <p className="text-sm mt-1" style={{ color: '#64748b' }}>
            Submit new requests and track the progress of ongoing maintenance.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95 shadow-sm"
          style={{ background: '#f59e0b' }}
        >
          <span className="material-symbols-outlined text-lg">build</span>
          New Request
        </button>
      </div>

      {/* Error Alert */}
      {error && (
        <div
          className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
          style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
          <span>{error}</span>
        </div>
      )}

      {/* Main Grid Content */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="h-64 rounded-2xl bg-slate-100 animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-100 shadow-sm">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl" style={{ background: '#fffbeb' }}>
            <span className="material-symbols-outlined text-2xl" style={{ color: '#f59e0b' }}>construction</span>
          </div>
          <p className="font-semibold text-lg" style={{ color: '#0f172a' }}>No maintenance requests yet</p>
          <p className="mt-1 text-sm max-w-sm mx-auto" style={{ color: '#64748b' }}>
            If you have any issue in your unit (plumbing, electricity, AC, etc.), submit a request and our team will resolve it.
          </p>
          <button
            onClick={() => setShowModal(true)}
            className="mt-6 inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold text-white transition-all hover:scale-105 active:scale-95"
            style={{ background: '#f59e0b' }}
          >
            Submit First Request
          </button>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {requests.map((req) => {
              const status = getStatusStyle(req.status);
              const priority = getPriorityStyle(req.priority);
              return (
                <div
                  key={req.id}
                  className="rounded-2xl p-6 flex flex-col justify-between transition-all hover:shadow-md"
                  style={{ background: '#white', border: '1px solid #f1f5f9', backgroundColor: '#ffffff', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
                >
                  <div className="space-y-4">
                    {/* Header: Badges */}
                    <div className="flex items-center justify-between gap-2 flex-wrap">
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: status.bg, color: status.color }}
                      >
                        {status.label}
                      </span>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{ background: priority.bg, color: priority.color }}
                      >
                        {priority.label} Priority
                      </span>
                    </div>

                    {/* Title & Description */}
                    <div>
                      <h3 className="font-bold text-lg" style={{ color: '#0f172a' }}>{req.title}</h3>
                      <p className="text-sm mt-2 leading-relaxed" style={{ color: '#475569' }}>
                        {req.description}
                      </p>
                    </div>

                    {/* Images/Photos Uploaded */}
                    {req.images && req.images.length > 0 && (
                      <div className="space-y-1.5">
                        <span className="text-[11px] font-bold uppercase tracking-wider block" style={{ color: '#94a3b8' }}>Photos</span>
                        <div className="flex flex-wrap gap-2">
                          {req.images.map((img) => (
                            <a
                              key={img.id}
                              href={img.url || (typeof window !== 'undefined' ? `${window.location.origin}/storage/${img.path}` : '#')}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="relative w-12 h-12 rounded-lg overflow-hidden border border-slate-100 hover:opacity-85 transition-all"
                            >
                              <img
                                src={img.url || (process.env.NEXT_PUBLIC_API_URL ? process.env.NEXT_PUBLIC_API_URL.replace('/api/', '') + '/storage/' + img.path : '/storage/' + img.path)}
                                alt="Maintenance attachment"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.target.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24"><path fill="%23ccc" d="M21 19V5c0-1.1-.9-2-2-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2zM8.5 13.5l2.5 3.01L14.5 12l4.5 6H5l3.5-4.5z"/></svg>';
                                }}
                              />
                            </a>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Footer details */}
                  <div className="mt-6 pt-4 border-t space-y-2.5" style={{ borderColor: '#f8fafc' }}>
                    <div className="flex justify-between items-center text-xs" style={{ color: '#64748b' }}>
                      <span>Submitted:</span>
                      <span className="font-medium text-slate-800">{formatDate(req.created_at)}</span>
                    </div>

                    {req.scheduled_at && (
                      <div className="flex justify-between items-center text-xs" style={{ color: '#64748b' }}>
                        <span>Scheduled Visit:</span>
                        <span className="font-semibold text-amber-700">{formatDate(req.scheduled_at)}</span>
                      </div>
                    )}

                    {req.completed_at && (
                      <div className="flex justify-between items-center text-xs" style={{ color: '#64748b' }}>
                        <span>Completed on:</span>
                        <span className="font-semibold text-green-700">{formatDate(req.completed_at)}</span>
                      </div>
                    )}

                    {req.technician && (
                      <div className="flex justify-between items-center text-xs" style={{ color: '#64748b' }}>
                        <span>Assigned Technician:</span>
                        <span className="font-medium text-slate-800 inline-flex items-center gap-1">
                          <span className="material-symbols-outlined text-sm">engineering</span>
                          {req.technician.name}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {meta && meta.last_page > 1 && (
            <div className="flex justify-center mt-6">
              <Pagination meta={meta} onPageChange={changePage} />
            </div>
          )}
        </div>
      )}

      {/* Submit Modal */}
      {showModal && (
        <MaintenanceRequestModal
          leases={leases}
          onClose={() => setShowModal(false)}
          onSubmitted={() => refetch()}
        />
      )}
    </div>
  );
}

export default function MaintenanceRequestsPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-500 animate-pulse">Loading maintenance requests...</div>}>
      <MaintenanceRequestsContent />
    </Suspense>
  );
}
