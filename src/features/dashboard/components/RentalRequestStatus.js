const STATUS_STYLES = {
  pending: { background: '#fef9c3', color: '#a16207', label: 'Pending' },
  approved: { background: '#dcfce7', color: '#15803d', label: 'Approved' },
  rejected: { background: '#fee2e2', color: '#dc2626', label: 'Rejected' },
  cancelled: { background: '#f1f5f9', color: '#64748b', label: 'Cancelled' },
  active: { background: '#dbeafe', color: '#2563eb', label: 'Active' },
};

export function RentalRequestStatus({ status }) {
  const normalizedStatus = status?.toLowerCase() || 'pending';
  const style = STATUS_STYLES[normalizedStatus] || STATUS_STYLES.pending;

  return (
    <span
      className="inline-flex rounded-full px-2.5 py-1 text-xs font-semibold"
      style={{ background: style.background, color: style.color }}
    >
      {style.label}
    </span>
  );
}
