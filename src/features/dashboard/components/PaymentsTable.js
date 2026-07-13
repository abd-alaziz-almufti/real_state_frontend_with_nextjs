import Link from 'next/link';

export function PaymentsTable({ payments }) {
  const statusStyle = {
    paid: { bg: '#dcfce7', color: '#16a34a', label: 'Paid' },
    pending: { bg: '#fef9c3', color: '#ca8a04', label: 'Pending' },
    overdue: { bg: '#fee2e2', color: '#dc2626', label: 'Overdue' },
    partial: { bg: '#e0f2fe', color: '#0284c7', label: 'Partial' },
  };

  if (!payments || payments.length === 0) {
    return (
      <div className="text-center py-12">
        <span className="material-symbols-outlined text-5xl mb-3" style={{ color: '#cbd5e1' }}>receipt_long</span>
        <p className="font-medium" style={{ color: '#94a3b8' }}>No payment records yet</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
            {['Unit', 'Property', 'Due Date', 'Total Amount', 'Paid Amount', 'Status', ''].map((h, i) => (
              <th key={h || i} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {payments.map((p) => {
            const s = statusStyle[p.status] || statusStyle.pending;
            return (
              <tr key={p.id} style={{ borderBottom: '1px solid #f8fafc' }} className="hover:bg-slate-50 transition-colors">
                <td className="py-4 px-4 font-medium" style={{ color: '#0f172a' }}>
                  {p.unit_name || (p.lease?.unit ? `Unit ${p.lease.unit.unit_number}` : 'Unknown')}
                </td>
                <td className="py-4 px-4" style={{ color: '#64748b' }}>
                  {p.lease?.unit?.property_name || 'Unknown'}
                </td>
                <td className="py-4 px-4" style={{ color: '#64748b' }}>
                  {p.due_date ? new Date(p.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </td>
                <td className="py-4 px-4 font-bold" style={{ color: '#0f172a' }}>
                  ${p.amount?.toLocaleString()}
                </td>
                <td className="py-4 px-4 font-bold" style={{ color: '#0f172a' }}>
                  ${p.paid_amount?.toLocaleString() || '0'}
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.color }}>
                    {s.label}
                  </span>
                </td>
                <td className="py-4 px-4 text-right">
                  <Link
                    href={`/tenant/payments/${p.id}`}
                    className="inline-flex items-center justify-center w-8 h-8 rounded-lg transition-colors hover:bg-slate-100"
                    title="View Details"
                  >
                    <span className="material-symbols-outlined text-sm" style={{ color: '#64748b' }}>visibility</span>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
