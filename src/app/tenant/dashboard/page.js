'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';

// ── Sub-components ─────────────────────────────────────────────────────────────

function Sidebar({ activeNav, setActiveNav, user, onLogout }) {
  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'payments', label: 'Payments', icon: 'payments' },
    { id: 'properties', label: 'Properties', icon: 'apartment' },
    { id: 'maintenance', label: 'Maintenance', icon: 'build' },
    { id: 'documents', label: 'Documents', icon: 'description' },
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
        {navItems.map((item) => (
          <button
            key={item.id}
            id={`nav-${item.id}`}
            onClick={() => setActiveNav(item.id)}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all text-left"
            style={{
              background: activeNav === item.id ? 'rgba(79,70,229,0.15)' : 'transparent',
              color: activeNav === item.id ? '#818cf8' : '#64748b',
              border: activeNav === item.id ? '1px solid rgba(79,70,229,0.3)' : '1px solid transparent',
            }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{item.icon}</span>
            {item.label}
          </button>
        ))}
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

function StatCard({ icon, label, value, sub, color = '#4f46e5', trend }) {
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

function NextPaymentCard({ payment, loading }) {
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

function QuickActions() {
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

function PaymentsTable({ payments }) {
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
            {['Property / Unit', 'Due Date', 'Amount', 'Status'].map((h) => (
              <th key={h} className="text-left py-3 px-4 text-xs font-semibold uppercase tracking-wide" style={{ color: '#94a3b8' }}>
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
                <td className="py-4 px-4 font-medium" style={{ color: '#0f172a' }}>{p.unit_name}</td>
                <td className="py-4 px-4" style={{ color: '#64748b' }}>
                  {p.due_date ? new Date(p.due_date).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : '—'}
                </td>
                <td className="py-4 px-4 font-bold" style={{ color: '#0f172a' }}>
                  ${p.amount?.toLocaleString()}
                </td>
                <td className="py-4 px-4">
                  <span className="px-2.5 py-1 rounded-full text-xs font-semibold" style={{ background: s.bg, color: s.color }}>
                    {s.label}
                  </span>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

function RentalRequestsList({ requests }) {
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

// ── Main Dashboard Page ────────────────────────────────────────────────────────

export default function TenantDashboardPage() {
  const { user, isAuthenticated, loading: authLoading, logout } = useAuth();
  const router = useRouter();
  const [activeNav, setActiveNav] = useState('dashboard');
  const [dashboardData, setDashboardData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState('');

  // Auth guard
  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

  // Fetch dashboard data
  useEffect(() => {
    if (!isAuthenticated) return;

    const fetchDashboard = async () => {
      try {
        setDataLoading(true);
        const response = await api.get('tenant/dashboard');
        if (response.success) {
          setDashboardData(response.data);
        } else {
          setDataError(response.message || 'Failed to load dashboard data.');
        }
      } catch (e) {
        console.error('Dashboard fetch error:', e);
        setDataError('Could not connect to the server. Please try again.');
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated]);

  // Loading state
  if (authLoading || (!isAuthenticated && !authLoading)) {
    return (
      <div className="min-h-screen flex items-center justify-center" style={{ background: '#f7f9fb' }}>
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} />
          <p style={{ color: '#64748b' }}>Loading your portal…</p>
        </div>
      </div>
    );
  }

  const leases = dashboardData?.leases || [];
  const payments = dashboardData?.payments || [];
  const rentalRequests = dashboardData?.rental_requests || [];
  const nextPayment = dashboardData?.next_payment_due;
  const activeLeases = leases.filter((l) => l.status === 'active').length;
  const pendingPayments = payments.filter((p) => p.status === 'pending').length;

  return (
    <div className="min-h-screen flex" style={{ background: '#f7f9fb', paddingTop: 0 }}>
      {/* Sidebar */}
      <Sidebar activeNav={activeNav} setActiveNav={setActiveNav} user={user} onLogout={logout} />

      {/* Main Content */}
      <main className="flex-1 lg:ml-64 min-h-screen">
        {/* Top Header */}
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
              {pendingPayments > 0 && (
                <span
                  className="absolute top-1 right-1 w-4 h-4 rounded-full text-xs flex items-center justify-center font-bold"
                  style={{ background: '#ef4444', color: '#fff', fontSize: '10px' }}
                >
                  {pendingPayments}
                </span>
              )}
            </button>

            {/* Mobile Logout */}
            <button
              id="mobile-logout"
              onClick={logout}
              className="lg:hidden p-2 rounded-xl transition-all hover:bg-red-50"
              aria-label="Logout"
            >
              <span className="material-symbols-outlined" style={{ fontSize: '22px', color: '#ef4444' }}>logout</span>
            </button>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-8 space-y-6">
          {/* Error Banner */}
          {dataError && (
            <div
              className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
              style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
              {dataError}
            </div>
          )}

          {/* Welcome headline (mobile) */}
          <div className="lg:hidden">
            <h1 className="text-2xl font-bold" style={{ color: '#0f172a' }}>
              Welcome back, {user?.name?.split(' ')[0] || 'Tenant'} 👋
            </h1>
            <p className="text-sm mt-1" style={{ color: '#64748b' }}>Here's your portal overview</p>
          </div>

          {/* Next Payment + Quick Stats */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Next Payment — takes 1 full column on mobile, spans 2 on LG */}
            <div className="lg:col-span-2">
              <NextPaymentCard payment={nextPayment} loading={dataLoading} />
            </div>

            {/* Stat */}
            <StatCard
              icon="home"
              label="Active Leases"
              value={dataLoading ? '—' : activeLeases}
              sub="Current rental agreements"
              color="#4f46e5"
            />
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard icon="payments" label="Pending Payments" value={dataLoading ? '—' : pendingPayments} color="#f59e0b" />
            <StatCard icon="receipt_long" label="Total Payments" value={dataLoading ? '—' : payments.length} color="#0891b2" />
            <StatCard icon="inbox" label="Rental Requests" value={dataLoading ? '—' : rentalRequests.length} color="#059669" />
            <StatCard
              icon="verified"
              label="Account Status"
              value={dashboardData?.tenant?.status ? dashboardData.tenant.status.charAt(0).toUpperCase() + dashboardData.tenant.status.slice(1) : 'Active'}
              color="#16a34a"
            />
          </div>

          {/* Quick Actions */}
          <section>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0f172a' }}>Quick Actions</h2>
            <QuickActions />
          </section>

          {/* Payments + Rental Requests */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Payments Table */}
            <section
              className="rounded-2xl overflow-hidden"
              style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
                <h2 className="font-bold" style={{ color: '#0f172a' }}>Payment History</h2>
                <button className="text-xs font-semibold hover:underline" style={{ color: '#4f46e5' }}>View all</button>
              </div>
              <div className="px-2">
                {dataLoading ? (
                  <div className="p-6 space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-12 rounded-xl bg-slate-100 animate-pulse" />)}
                  </div>
                ) : (
                  <PaymentsTable payments={payments.slice(0, 5)} />
                )}
              </div>
            </section>

            {/* Rental Requests */}
            <section
              className="rounded-2xl"
              style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <div className="flex items-center justify-between px-6 py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
                <h2 className="font-bold" style={{ color: '#0f172a' }}>Rental Requests</h2>
                <button className="text-xs font-semibold hover:underline" style={{ color: '#4f46e5' }}>View all</button>
              </div>
              <div className="p-4">
                {dataLoading ? (
                  <div className="space-y-3">
                    {[1, 2, 3].map((i) => <div key={i} className="h-16 rounded-xl bg-slate-100 animate-pulse" />)}
                  </div>
                ) : (
                  <RentalRequestsList requests={rentalRequests.slice(0, 5)} />
                )}
              </div>
            </section>
          </div>

          {/* Active Leases */}
          {leases.length > 0 && (
            <section
              className="rounded-2xl"
              style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}
            >
              <div className="px-6 py-4" style={{ borderBottom: '1px solid #f8fafc' }}>
                <h2 className="font-bold" style={{ color: '#0f172a' }}>My Properties</h2>
              </div>
              <div className="p-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {leases.map((lease) => (
                  <div
                    key={lease.id}
                    className="rounded-xl p-4 flex flex-col gap-3"
                    style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#eef2ff' }}>
                        <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4f46e5' }}>apartment</span>
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate" style={{ color: '#0f172a' }}>{lease.property_name}</p>
                        <p className="text-xs" style={{ color: '#94a3b8' }}>Unit {lease.unit_number}</p>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-lg font-bold" style={{ color: '#0f172a' }}>${lease.rent_amount?.toLocaleString()}</p>
                        <p className="text-xs" style={{ color: '#94a3b8' }}>per month</p>
                      </div>
                      <span
                        className="text-xs font-semibold px-2.5 py-1 rounded-full"
                        style={{
                          background: lease.status === 'active' ? '#dcfce7' : '#f1f5f9',
                          color: lease.status === 'active' ? '#16a34a' : '#64748b',
                        }}
                      >
                        {lease.status?.charAt(0).toUpperCase() + lease.status?.slice(1)}
                      </span>
                    </div>
                    <div className="text-xs" style={{ color: '#94a3b8' }}>
                      {lease.start_date} → {lease.end_date || 'Ongoing'}
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}
        </div>
      </main>

      {/* Mobile Bottom Navigation */}
      <nav
        className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around z-40 py-2"
        style={{ background: '#fff', borderTop: '1px solid #f1f5f9', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
      >
        {[
          { id: 'dashboard', icon: 'dashboard', label: 'Home' },
          { id: 'payments', icon: 'payments', label: 'Payments' },
          { id: 'properties', icon: 'apartment', label: 'Properties' },
          { id: 'documents', icon: 'description', label: 'Docs' },
        ].map((item) => (
          <button
            key={item.id}
            id={`mobile-nav-${item.id}`}
            onClick={() => setActiveNav(item.id)}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
            style={{ color: activeNav === item.id ? '#4f46e5' : '#94a3b8' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
}
