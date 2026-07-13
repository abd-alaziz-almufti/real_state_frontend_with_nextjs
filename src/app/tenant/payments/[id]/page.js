'use client';

import { usePayment } from '@/features/dashboard';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function TenantSinglePaymentPage() {
  const params = useParams();
  const id = params?.id;
  const { payment, loading, error } = usePayment(id);

  if (loading) {
    return (
      <div className="p-6 lg:p-8 flex items-center justify-center min-h-[60vh]">
        <div className="flex flex-col items-center gap-4">
          <div className="w-12 h-12 border-3 border-indigo-600 border-t-transparent rounded-full animate-spin" style={{ borderWidth: '3px' }} />
          <p style={{ color: '#64748b' }}>Loading payment details…</p>
        </div>
      </div>
    );
  }

  if (error || !payment) {
    return (
      <div className="p-6 lg:p-8 space-y-6">
        <Link href="/tenant/payments" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors">
          <span className="material-symbols-outlined text-sm">arrow_back</span>
          Back to Payments
        </Link>
        <div className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium" style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}>
          <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
          {error || 'Payment not found.'}
        </div>
      </div>
    );
  }

  const statusStyle = {
    paid: { bg: '#dcfce7', color: '#16a34a', icon: 'check_circle', label: 'Paid in Full' },
    pending: { bg: '#fef9c3', color: '#ca8a04', icon: 'schedule', label: 'Pending Payment' },
    overdue: { bg: '#fee2e2', color: '#dc2626', icon: 'warning', label: 'Overdue' },
    partial: { bg: '#e0f2fe', color: '#0284c7', icon: 'timelapse', label: 'Partially Paid' },
  };

  const s = statusStyle[payment.status] || statusStyle.pending;
  const dueDate = payment.due_date ? new Date(payment.due_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'N/A';
  const paymentDate = payment.payment_date ? new Date(payment.payment_date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }) : 'Not paid yet';

  return (
    <div className="p-6 lg:p-8 max-w-4xl mx-auto space-y-6">
      {/* Header & Back Link */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Link href="/tenant/payments" className="inline-flex items-center gap-2 text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors mb-2">
            <span className="material-symbols-outlined text-sm">arrow_back</span>
            Back to Payments
          </Link>
          <h1 className="text-2xl font-bold flex items-center gap-3" style={{ color: '#0f172a' }}>
            Payment #{payment.id}
            <span className="px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider flex items-center gap-1.5" style={{ background: s.bg, color: s.color }}>
              <span className="material-symbols-outlined" style={{ fontSize: '14px' }}>{s.icon}</span>
              {s.label}
            </span>
          </h1>
        </div>
        
        {payment.status !== 'paid' && (
          <button className="px-6 py-2.5 rounded-xl text-sm font-bold text-white shadow-sm transition-all hover:opacity-90 active:scale-95 flex items-center gap-2" style={{ background: '#4f46e5' }}>
            <span className="material-symbols-outlined text-sm">credit_card</span>
            Pay Now
          </button>
        )}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Left Column: Core Financials */}
        <div className="md:col-span-2 space-y-6">
          <section className="rounded-2xl p-6 flex flex-col gap-6" style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="text-lg font-bold" style={{ color: '#0f172a' }}>Financial Details</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <p className="text-sm font-medium mb-1" style={{ color: '#64748b' }}>Total Amount Due</p>
                <p className="text-2xl font-bold" style={{ color: '#0f172a' }}>${payment.amount?.toLocaleString()}</p>
              </div>
              <div className="p-4 rounded-xl" style={{ background: '#f8fafc', border: '1px solid #f1f5f9' }}>
                <p className="text-sm font-medium mb-1" style={{ color: '#64748b' }}>Amount Paid</p>
                <p className="text-2xl font-bold" style={{ color: '#16a34a' }}>${payment.paid_amount?.toLocaleString()}</p>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl" style={{ background: payment.remaining_amount > 0 ? '#fffbeb' : '#f0fdf4', border: `1px solid ${payment.remaining_amount > 0 ? '#fde68a' : '#bbf7d0'}` }}>
              <div>
                <p className="text-sm font-bold" style={{ color: payment.remaining_amount > 0 ? '#d97706' : '#15803d' }}>Remaining Balance</p>
                <p className="text-xs mt-0.5" style={{ color: payment.remaining_amount > 0 ? '#b45309' : '#16a34a' }}>
                  {payment.remaining_amount > 0 ? 'Action required to clear balance' : 'No balance due'}
                </p>
              </div>
              <p className="text-3xl font-black" style={{ color: payment.remaining_amount > 0 ? '#d97706' : '#15803d' }}>
                ${payment.remaining_amount?.toLocaleString()}
              </p>
            </div>
          </section>

          <section className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <h2 className="text-lg font-bold mb-4" style={{ color: '#0f172a' }}>Payment Information</h2>
            <div className="divide-y" style={{ borderColor: '#f1f5f9' }}>
              <div className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#64748b' }}>Due Date</span>
                <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{dueDate}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#64748b' }}>Payment Date</span>
                <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{paymentDate}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#64748b' }}>Payment Method</span>
                <span className="text-sm font-bold capitalize" style={{ color: '#0f172a' }}>{payment.payment_method ? payment.payment_method.replace('_', ' ') : '—'}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#64748b' }}>Reference Number</span>
                <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{payment.reference_number || '—'}</span>
              </div>
              <div className="py-3 flex justify-between items-center">
                <span className="text-sm font-medium" style={{ color: '#64748b' }}>Check Number</span>
                <span className="text-sm font-bold" style={{ color: '#0f172a' }}>{payment.check_number || '—'}</span>
              </div>
              {payment.notes && (
                <div className="py-3">
                  <span className="text-sm font-medium block mb-1" style={{ color: '#64748b' }}>Notes</span>
                  <p className="text-sm p-3 rounded-lg" style={{ background: '#f8fafc', color: '#334155' }}>{payment.notes}</p>
                </div>
              )}
            </div>
          </section>
        </div>

        {/* Right Column: Lease/Property Info */}
        <div className="space-y-6">
          <section className="rounded-2xl p-6" style={{ background: '#fff', border: '1px solid #f1f5f9', boxShadow: '0 1px 4px rgba(0,0,0,0.04)' }}>
            <div className="flex items-center gap-3 mb-4 pb-4 border-b" style={{ borderColor: '#f1f5f9' }}>
              <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: '#eef2ff' }}>
                <span className="material-symbols-outlined" style={{ fontSize: '20px', color: '#4f46e5' }}>apartment</span>
              </div>
              <div>
                <h2 className="font-bold leading-tight" style={{ color: '#0f172a' }}>Property Info</h2>
                <p className="text-xs" style={{ color: '#64748b' }}>Related to this payment</p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Property</p>
                <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{payment.lease?.unit?.property_name || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Unit Number</p>
                <p className="text-sm font-bold" style={{ color: '#0f172a' }}>{payment.lease?.unit?.unit_number || 'N/A'}</p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider mb-1" style={{ color: '#94a3b8' }}>Payment Type</p>
                <p className="text-sm font-bold capitalize" style={{ color: '#0f172a' }}>{payment.type}</p>
              </div>
            </div>
          </section>
          
          <section className="rounded-2xl p-6 text-center" style={{ background: 'linear-gradient(135deg, #1e1b4b, #312e81)' }}>
            <span className="material-symbols-outlined text-white mb-2" style={{ fontSize: '32px', opacity: 0.8 }}>support_agent</span>
            <h3 className="text-white font-bold mb-1">Need help?</h3>
            <p className="text-xs text-indigo-200 mb-4">If you have questions about this specific payment, contact your property manager.</p>
            <button className="w-full px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-xl text-sm font-bold transition-colors">
              Contact Support
            </button>
          </section>
        </div>

      </div>
    </div>
  );
}
