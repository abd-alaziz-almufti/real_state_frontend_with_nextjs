export function NextPaymentCard({ payment, loading }) {
  if (loading) {
    return (
      <div className="rounded-2xl p-6 animate-pulse" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
        <div className="h-4 w-32 bg-white/20 rounded mb-4" />
        <div className="h-10 w-48 bg-white/20 rounded mb-2" />
        <div className="h-3 w-40 bg-white/10 rounded" />
      </div>
    );
  }

  if (!payment) {
    return (
      <div
        className="rounded-2xl p-6 flex items-center gap-4"
        style={{ background: 'linear-gradient(135deg, #f0fdf4, #dcfce7)', border: '1px solid #bbf7d0' }}
      >
        <div className="w-12 h-12 rounded-full flex items-center justify-center" style={{ background: '#16a34a' }}>
          <span className="material-symbols-outlined text-white" style={{ fontSize: '24px' }}>check_circle</span>
        </div>
        <div>
          <p className="font-bold text-lg" style={{ color: '#15803d' }}>All Paid Up!</p>
          <p className="text-sm" style={{ color: '#4ade80' }}>No pending payments</p>
        </div>
      </div>
    );
  }

  const dueDate = new Date(payment.due_date);
  const today = new Date();
  const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));
  const isOverdue = daysUntilDue < 0;
  const isUrgent = daysUntilDue <= 5 && daysUntilDue >= 0;

  return (
    <div
      className="rounded-2xl p-6 relative overflow-hidden"
      style={{ background: 'linear-gradient(135deg, #1e1b4b 0%, #312e81 60%, #4338ca 100%)' }}
    >
      {/* Decorative */}
      <div className="absolute -top-10 -right-10 w-40 h-40 rounded-full opacity-10" style={{ background: 'radial-gradient(circle, #818cf8, transparent)' }} />

      <div className="relative z-10">
        <div className="flex items-center justify-between mb-4">
          <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#a5b4fc' }}>
            {isOverdue ? '⚠ Payment Overdue' : 'Next Payment Due'}
          </span>
          {(isOverdue || isUrgent) && (
            <span
              className="text-xs font-bold px-2 py-1 rounded-full animate-pulse"
              style={{ background: isOverdue ? '#ef4444' : '#f59e0b', color: '#fff' }}
            >
              {isOverdue ? 'OVERDUE' : `${daysUntilDue}d left`}
            </span>
          )}
        </div>

        <p className="text-4xl font-bold text-white mb-1">
          ${payment.amount?.toLocaleString()}
        </p>
        <p className="text-sm mb-4" style={{ color: '#a5b4fc' }}>{payment.unit_name}</p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined" style={{ fontSize: '16px', color: '#a5b4fc' }}>calendar_today</span>
            <span className="text-sm" style={{ color: '#cbd5e1' }}>
              {dueDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
            </span>
          </div>
          <button
            id="pay-now-btn"
            className="px-4 py-2 rounded-xl text-sm font-bold transition-all hover:opacity-90 active:scale-95"
            style={{ background: '#fff', color: '#4f46e5' }}
          >
            Pay Now
          </button>
        </div>
      </div>
    </div>
  );
}
