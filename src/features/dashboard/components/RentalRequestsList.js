export function RentalRequestsList({ requests }) {
  const statusStyle = {
    pending: { bg: '#fef9c3', color: '#ca8a04' },
    approved: { bg: '#dcfce7', color: '#16a34a' },
    rejected: { bg: '#fee2e2', color: '#dc2626' },
    active: { bg: '#dbeafe', color: '#2563eb' },
  };

  if (!requests || requests.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-5xl mb-3" style={{ color: '#cbd5e1' }}>inbox</span>
        <p className="font-medium" style={{ color: '#94a3b8' }}>No rental requests yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {requests.map((r) => {
        const s = statusStyle[r.status] || statusStyle.pending;
        return (
          <div
            key={r.id}
            className="flex items-center gap-4 p-4 rounded-xl transition-all hover:shadow-sm"
            style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}
          >
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#eef2ff' }}>
              <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4f46e5' }}>home_work</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-semibold text-sm truncate" style={{ color: '#0f172a' }}>{r.title}</p>
              <p className="text-xs truncate" style={{ color: '#94a3b8' }}>{r.unit_name}</p>
            </div>
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold flex-shrink-0" style={{ background: s.bg, color: s.color }}>
              {r.status?.charAt(0).toUpperCase() + r.status?.slice(1)}
            </span>
          </div>
        );
      })}
    </div>
  );
}
