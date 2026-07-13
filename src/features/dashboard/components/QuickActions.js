export function QuickActions() {
  const actions = [
    { icon: 'build', label: 'Submit Maintenance', color: '#f59e0b', bg: '#fffbeb' },
    { icon: 'description', label: 'View Lease', color: '#4f46e5', bg: '#eef2ff' },
    { icon: 'chat', label: 'Message Manager', color: '#059669', bg: '#ecfdf5' },
    { icon: 'receipt_long', label: 'Payment History', color: '#0891b2', bg: '#ecfeff' },
  ];

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {actions.map((action) => (
        <button
          key={action.label}
          id={`action-${action.label.toLowerCase().replace(/\s+/g, '-')}`}
          className="flex flex-col items-center gap-3 p-4 rounded-2xl text-center transition-all hover:scale-105 active:scale-95"
          style={{ background: action.bg, border: `1px solid ${action.color}22` }}
        >
          <div
            className="w-12 h-12 rounded-xl flex items-center justify-center"
            style={{ background: `${action.color}22` }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px', color: action.color }}>{action.icon}</span>
          </div>
          <span className="text-xs font-semibold leading-tight" style={{ color: '#0f172a' }}>{action.label}</span>
        </button>
      ))}
    </div>
  );
}
