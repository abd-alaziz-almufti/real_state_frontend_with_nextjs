'use client';

export function Header({ user, onLogout }) {
  return (
    <header
      className="sticky top-0 z-30 flex items-center justify-between px-6 lg:px-8 h-16"
      style={{ background: 'rgba(247,249,251,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid #f1f5f9' }}
    >
      {/* Mobile brand */}
      <div className="lg:hidden flex items-center gap-2">
        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#4f46e5' }}>
          <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>apartment</span>
        </div>
        <span className="font-bold text-base" style={{ color: '#0f172a' }}>EstateSync Pro</span>
      </div>

      {/* Desktop title */}
      <div className="hidden lg:block">
        <p className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#94a3b8' }}>Tenant Portal</p>
        <h1 className="text-lg font-bold" style={{ color: '#0f172a' }}>
          Welcome back, {user?.name?.split(' ')[0] || 'Tenant'} 👋
        </h1>
      </div>

      <div className="flex items-center gap-3">
        <button
          className="relative p-2 rounded-xl transition-all hover:bg-slate-100"
          aria-label="Notifications"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#64748b' }}>notifications</span>
        </button>

        {/* Mobile Logout */}
        <button
          id="mobile-logout"
          onClick={onLogout}
          className="lg:hidden p-2 rounded-xl transition-all hover:bg-red-50"
          aria-label="Logout"
        >
          <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#ef4444' }}>logout</span>
        </button>
      </div>
    </header>
  );
}
