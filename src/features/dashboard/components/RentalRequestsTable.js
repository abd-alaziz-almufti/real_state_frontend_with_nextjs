'use client';

import { useState } from 'react';
import ConfirmationDialog from '@/components/ConfirmationDialog';
import { RentalRequestStatus } from './RentalRequestStatus';

function formatDate(date) {
  if (!date) return '—';

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(date));
}

function getRequestTitle(request) {
  return request.title || request.unit?.name || request.unit_name || request.property?.name || 'Rental request';
}

function getPropertyName(request) {
  return request.property?.name || request.property_name || request.unit?.property_name || '—';
}

function getUnitName(request) {
  return request.unit?.unit_number || request.unit_name || '—';
}

export function RentalRequestsTable({ requests, onDelete, deletingId }) {
  const [requestToDelete, setRequestToDelete] = useState(null);

  const handleDelete = async () => {
    if (!requestToDelete || !onDelete) return;

    const wasDeleted = await onDelete(requestToDelete.id);
    if (wasDeleted) {
      setRequestToDelete(null);
    }
  };

  if (!requests?.length) {
    return (
      <div className="px-6 py-16 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl" style={{ background: '#eef2ff' }}>
          <span className="material-symbols-outlined" style={{ color: '#4f46e5' }}>inbox</span>
        </div>
        <p className="font-semibold" style={{ color: '#334155' }}>No rental requests yet</p>
        <p className="mt-1 text-sm" style={{ color: '#94a3b8' }}>Requests you submit for a property will appear here.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full min-w-[800px] text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            {['Request', 'Property', 'Unit', 'Submitted', 'Move-in date', 'Status', ''].map((heading, index) => (
              <th key={heading || index} className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>
                {heading}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id} className="transition-colors hover:bg-slate-50" style={{ borderBottom: '1px solid #f8fafc' }}>
              <td className="px-5 py-4 font-semibold" style={{ color: '#0f172a' }}>{getRequestTitle(request)}</td>
              <td className="px-5 py-4" style={{ color: '#64748b' }}>{getPropertyName(request)}</td>
              <td className="px-5 py-4" style={{ color: '#64748b' }}>{getUnitName(request)}</td>
              <td className="px-5 py-4" style={{ color: '#64748b' }}>{formatDate(request.created_at || request.submitted_at)}</td>
              <td className="px-5 py-4" style={{ color: '#64748b' }}>{formatDate(request.desired_move_in)}</td>
              <td className="px-5 py-4"><RentalRequestStatus status={request.status} /></td>
              <td className="px-5 py-4 text-right">
                {onDelete && (
                  <button
                    type="button"
                    onClick={() => setRequestToDelete(request)}
                    disabled={deletingId === request.id}
                    className="inline-flex h-8 w-8 items-center justify-center rounded-lg transition-colors hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50"
                    style={{ color: '#dc2626' }}
                    title="Delete request"
                    aria-label={`Delete ${getRequestTitle(request)}`}
                  >
                    {deletingId === request.id ? (
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-red-600 border-t-transparent" />
                    ) : (
                      <span className="material-symbols-outlined text-lg">delete</span>
                    )}
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <ConfirmationDialog
        open={Boolean(requestToDelete)}
        title="Delete rental request?"
        description={`This will permanently delete "${requestToDelete ? getRequestTitle(requestToDelete) : ''}". This action cannot be undone.`}
        confirmLabel="Delete request"
        isLoading={deletingId === requestToDelete?.id}
        onConfirm={handleDelete}
        onCancel={() => setRequestToDelete(null)}
      />
    </div>
  );
}
