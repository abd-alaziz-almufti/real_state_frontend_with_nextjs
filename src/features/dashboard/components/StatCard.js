export function StatCard({ icon, label, value, sub, color = '#4f46e5', trend }) {
  return (
    <div
      className="rounded-2xl p-5 flex flex-col gap-3"
      style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.05)' }}
    >
      <div className="flex items-start justify-between">
        <div
          className="w-11 h-11 rounded-xl flex items-center justify-center"
          style={{ background: `${color}18` }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color }}>{icon}</span>
        </div>
        {trend && (
          <span
            className="text-xs font-semibold px-2 py-1 rounded-full"
            style={{ background: trend > 0 ? '#dcfce7' : '#fef2f2', color: trend > 0 ? '#16a34a' : '#dc2626' }}
          >
            {trend > 0 ? '+' : ''}{trend}%
          </span>
        )}
      </div>
      <div>
        <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>{value}</p>
        <p className="text-sm font-medium mt-0.5" style={{ color: '#64748b' }}>{label}</p>
        {sub && <p className="text-xs mt-1" style={{ color: '#94a3b8' }}>{sub}</p>}
      </div>
    </div>
  );
}
