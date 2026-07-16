'use client';


const ORDINAL = ['', '1st', '2nd', '3rd', '4th', '5th', '6th', '7th',
  '8th', '9th', '10th', '11th', '12th', '13th', '14th', '15th',
  '16th', '17th', '18th', '19th', '20th', '21st', '22nd', '23rd',
  '24th', '25th', '26th', '27th', '28th', '29th', '30th', '31st'];

function fmt(dateStr) {
  if (!dateStr) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(dateStr));
}

function fmtMoney(n) {
  if (n == null) return '—';
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 2 }).format(n);
}

function frequencyLabel(freq) {
  const map = { monthly: 'Monthly', quarterly: 'Quarterly', semi_annually: 'Semi-Annually', yearly: 'Yearly' };
  return map[freq] || (freq || '—');
}

function getStatusConfig(lease) {
  const status = lease?.status;
  const expired = lease?.is_expired;
  if (status === 'active' && !expired) return { label: 'Active', bg: '#dcfce7', color: '#15803d', dot: '#22c55e' };
  if (status === 'terminated')        return { label: 'Terminated', bg: '#fee2e2', color: '#b91c1c', dot: '#ef4444' };
  if (status === 'expired' || expired)return { label: 'Expired', bg: '#fef3c7', color: '#b45309', dot: '#f59e0b' };
  if (status === 'renewed')           return { label: 'Renewed', bg: '#ede9fe', color: '#7c3aed', dot: '#8b5cf6' };
  if (status === 'draft')             return { label: 'Draft', bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' };
  return { label: status || 'Unknown', bg: '#f1f5f9', color: '#475569', dot: '#94a3b8' };
}

export function LeaseDetailModal({ lease, loading, error, onClose }) {
  if (!lease && !loading && !error) return null;

  if (loading) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(15,23,42,0.55)' }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md rounded-2xl shadow-2xl flex flex-col items-center justify-center"
          style={{ background: '#ffffff', height: 260, border: '1px solid #f1f5f9' }}
          onClick={(e) => e.stopPropagation()}
        >
          <div
            className="w-12 h-12 rounded-full border-4 border-indigo-200 border-t-indigo-600"
            style={{ animation: 'spin 0.8s linear infinite' }}
          />
          <p className="mt-4 text-sm font-medium" style={{ color: '#64748b' }}>Loading lease details…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        style={{ background: 'rgba(15,23,42,0.55)' }}
        onClick={onClose}
      >
        <div
          className="relative w-full max-w-md rounded-2xl shadow-2xl flex flex-col items-center justify-center gap-4 p-8"
          style={{ background: '#ffffff', border: '1px solid #f1f5f9' }}
          onClick={(e) => e.stopPropagation()}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '40px', color: '#dc2626' }}>error</span>
          <p className="text-sm font-semibold text-center" style={{ color: '#0f172a' }}>Could not load lease details</p>
          <p className="text-xs text-center" style={{ color: '#64748b' }}>{error}</p>
          <button
            onClick={onClose}
            className="mt-2 px-5 py-2 rounded-xl text-sm font-semibold transition-opacity hover:opacity-80"
            style={{ background: '#4f46e5', color: '#fff' }}
          >
            Close
          </button>
        </div>
      </div>
    );
  }

  const statusCfg = getStatusConfig(lease);
  const isEnded   = lease.status === 'terminated' || lease.status === 'expired' || lease.is_expired;
  const progressPct = lease.rent_amount > 0
    ? Math.min(100, Math.round((lease.total_paid / lease.rent_amount) * 100))
    : 0;

  const paymentDayLabel = lease.payment_day
    ? (ORDINAL[lease.payment_day] || `${lease.payment_day}th`) + ' of month'
    : '—';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(15,23,42,0.55)' }}
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md rounded-2xl shadow-2xl"
        style={{ background: '#ffffff', border: '1px solid #f1f5f9', maxHeight: '90vh', overflowY: 'auto' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* ── Header ── */}
        <div className="px-6 pt-6 pb-4 flex items-start justify-between gap-4">
          <div>
            <h3 className="text-lg font-bold leading-tight" style={{ color: '#0f172a' }}>
              {lease.unit?.property_name || '—'}
            </h3>
            <p className="text-sm mt-0.5" style={{ color: '#64748b' }}>Unit {lease.unit?.unit_number || '—'}</p>
            <p className="text-xs mt-1.5" style={{ color: '#94a3b8' }}>
              {fmt(lease.start_date)} → {fmt(lease.end_date)}
              {!isEnded && lease.days_remaining != null && (
                <span className="ml-1 font-semibold" style={{ color: '#4f46e5' }}>
                  · {lease.days_remaining} days remaining
                </span>
              )}
            </p>
          </div>

          <div className="flex items-center gap-2 flex-shrink-0 mt-0.5">
            {/* Status badge */}
            <span
              className="inline-flex items-center gap-1.5 text-xs font-bold px-2.5 py-1 rounded-full"
              style={{ background: statusCfg.bg, color: statusCfg.color }}
            >
              <span className="w-1.5 h-1.5 rounded-full" style={{ background: statusCfg.dot }} />
              {statusCfg.label}
            </span>
            {/* Close */}
            <button onClick={onClose} className="text-slate-400 hover:text-slate-600 transition-colors">
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>close</span>
            </button>
          </div>
        </div>

        {/* ── Termination info (terminated / expired only) ── */}
        {isEnded && (lease.termination_date || lease.termination_reason) && (
          <div className="mx-6 mb-4 px-4 py-3 rounded-xl" style={{ background: '#fef2f2', border: '1px solid #fecaca' }}>
            {lease.termination_date && (
              <p className="text-xs" style={{ color: '#dc2626' }}>
                <span className="font-semibold">Terminated on:</span> {fmt(lease.termination_date)}
              </p>
            )}
            {lease.termination_reason && (
              <p className="text-xs mt-1" style={{ color: '#dc2626' }}>
                <span className="font-semibold">Reason:</span> {lease.termination_reason}
              </p>
            )}
          </div>
        )}

        <div className="px-6 pb-6 space-y-5">
          {/* ── Rent & Deposit grid ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>Rent amount</p>
              <p className="text-xl font-bold" style={{ color: '#0f172a' }}>{fmtMoney(lease.rent_amount)}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>Deposit</p>
              <p className="text-xl font-bold" style={{ color: '#0f172a' }}>{fmtMoney(lease.deposit_amount)}</p>
            </div>
          </div>

          {/* ── Payment frequency & Day grid ── */}
          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>Payment frequency</p>
              <p className="text-base font-bold" style={{ color: '#0f172a' }}>{frequencyLabel(lease.payment_frequency)}</p>
            </div>
            <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
              <p className="text-xs mb-1" style={{ color: '#94a3b8' }}>Due day</p>
              <p className="text-base font-bold" style={{ color: '#0f172a' }}>{paymentDayLabel}</p>
            </div>
          </div>

          {/* ── Paid-to-date progress ── */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <span className="text-xs font-semibold" style={{ color: '#334155' }}>Paid to date</span>
              <span className="text-xs font-bold" style={{ color: '#0f172a' }}>
                {fmtMoney(lease.total_paid)} of {fmtMoney(lease.rent_amount)}
              </span>
            </div>
            <div className="h-2 rounded-full overflow-hidden" style={{ background: '#e2e8f0' }}>
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{ width: `${progressPct}%`, background: 'linear-gradient(90deg, #4f46e5, #818cf8)' }}
              />
            </div>

            {/* Outstanding / Fully paid */}
            {(lease.outstanding_balance ?? 0) > 0 ? (
              <p className="text-xs font-semibold mt-2" style={{ color: '#dc2626' }}>
                {fmtMoney(lease.outstanding_balance)} outstanding
              </p>
            ) : (
              <p className="text-xs font-semibold mt-2 inline-flex items-center gap-1" style={{ color: '#15803d' }}>
                <span className="material-symbols-outlined text-sm">check_circle</span>
                Fully paid
              </p>
            )}
          </div>

          {/* ── Special terms ── */}
          {(lease.special_terms || lease.notes) && (
            <div className="pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
              <p className="text-xs font-semibold mb-1.5" style={{ color: '#94a3b8' }}>Special terms</p>
              <p className="text-sm leading-relaxed" style={{ color: '#334155' }}>
                {lease.special_terms || lease.notes}
              </p>
            </div>
          )}

          {/* ── Documents ── */}
          <div className="pt-4" style={{ borderTop: '1px solid #f1f5f9' }}>
            <p className="text-xs font-semibold mb-2" style={{ color: '#94a3b8' }}>Documents</p>
            {(!lease.documents || lease.documents.length === 0) ? (
              <p className="text-sm" style={{ color: '#94a3b8' }}>No documents uploaded yet.</p>
            ) : (
              <ul className="space-y-2">
                {lease.documents.map((doc) => (
                  <li key={doc.id} className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined flex-shrink-0" style={{ fontSize: '18px', color: '#4f46e5' }}>description</span>
                      <span className="text-sm font-medium truncate" style={{ color: '#0f172a' }}>
                        {doc.title || doc.file_name || 'Document'}
                      </span>
                    </div>
                    {doc.file_url && (
                      <a
                        href={doc.file_url}
                        download
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-shrink-0 transition-colors hover:opacity-70"
                        title="Download"
                        style={{ color: '#4f46e5' }}
                      >
                        <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>download</span>
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
