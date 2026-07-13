'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/axios';
import { useAuth } from '@/context/AuthContext';
import { StatCard, NextPaymentCard, QuickActions, PaymentsTable, RentalRequestsList } from '@/features/dashboard';

export default function TenantDashboardPage() {
  const { isAuthenticated } = useAuth();
  const [dashboardData, setDashboardData] = useState(null);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState('');

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
        if (e?.isNetworkError) {
          setDataError('Could not connect to the server. Please try again.');
        } else {
          setDataError(e?.message || 'Failed to load dashboard data.');
        }
      } finally {
        setDataLoading(false);
      }
    };

    fetchDashboard();
  }, [isAuthenticated]);

  const leases = dashboardData?.leases || [];
  const payments = dashboardData?.payments || [];
  const rentalRequests = dashboardData?.rental_requests || [];
  const nextPayment = dashboardData?.next_payment_due;
  const activeLeases = leases.filter((l) => l.status === 'active').length;
  const pendingPayments = payments.filter((p) => p.status === 'pending').length;

  return (
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

      {/* Next Payment + Quick Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Next Payment */}
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
  );
}
