'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function Sidebar({ user, onLogout }) {
  const pathname = usePathname();

  const navItems = [
    { id: 'dashboard', href: '/tenant/dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'my-payments', href: '/tenant/payments', label: 'My Payments', icon: 'payments' },
    { id: 'my-leases', href: '/tenant/leases', label: 'My Leases', icon: 'description' },
    { id: 'my-properties', href: '/tenant/properties', label: 'My Properties', icon: 'apartment' },
    // { id: 'maintenance', href: '/tenant/maintenance', label: 'Maintenance', icon: 'build' },
    { id: 'rental-requests', href: '/tenant/rental-requests', label: 'Rental Requests', icon: 'inbox' },
  ];

  return (
    <aside
      className="hidden lg:flex flex-col fixed left-0 top-0 h-full w-64 pt-0 z-40"
      style={{ background: '#0f172a', borderRight: '1px solid rgba(255,255,255,0.06)' }}
    >
      {/* Brand */}
      <div className="px-6 py-6 border-b" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <Link href="/" className="flex items-center gap-3">
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center"
            style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)' }}
          >
            <span className="material-symbols-outlined text-white" style={{ fontSize: '20px' }}>apartment</span>
          </div>
          <span className="font-bold text-white text-base">EstateSync Pro</span>
        </Link>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.id}
              id={`nav-${item.id}`}
              href={item.href}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
              style={{
                background: isActive ? 'rgba(79,70,229,0.15)' : 'transparent',
                color: isActive ? '#818cf8' : '#64748b',
                border: isActive ? '1px solid rgba(79,70,229,0.3)' : '1px solid transparent',
              }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
              {item.label}
            </Link>
          );
        })}
      </nav>

      {/* User Profile */}
      <div className="px-4 pb-6 border-t pt-4" style={{ borderColor: 'rgba(255,255,255,0.06)' }}>
        <div
          className="flex items-center gap-3 px-4 py-3 rounded-xl mb-3"
          style={{ background: 'rgba(255,255,255,0.04)' }}
        >
          <div
            className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold flex-shrink-0"
            style={{ background: 'linear-gradient(135deg, #818cf8, #6366f1)', color: '#fff' }}
          >
            {user?.name?.charAt(0)?.toUpperCase() || 'T'}
          </div>
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white truncate">{user?.name || 'Tenant'}</p>
            <p className="text-xs truncate" style={{ color: '#475569' }}>{user?.email || ''}</p>
          </div>
        </div>
        <button
          id="sidebar-logout"
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium transition-all"
          style={{ color: '#ef4444', background: 'rgba(239,68,68,0.06)' }}
        >
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>logout</span>
          Sign Out
        </button>
      </div>
    </aside>
  );
}
