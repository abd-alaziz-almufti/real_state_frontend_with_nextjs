'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/axios';
import { useSearchParams } from 'next/navigation';

const ROLES = [
  { value: 'tenant', label: 'Renter', icon: 'person', desc: 'Looking for a place to rent' },
  { value: 'agency', label: 'Agency', icon: 'business', desc: 'Running a real estate agency' },
];

export default function RegisterPage() {
  const { register, login, loading: authLoading } = useAuth();
  const searchParams = useSearchParams();
  const [selectedRole, setSelectedRole] = useState('tenant');

  useEffect(() => {
    const roleParam = searchParams.get('role');
    if (roleParam === 'agency' || roleParam === 'tenant') {
      setSelectedRole(roleParam);
    }
  }, [searchParams]);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    admin_name: '',
    email: '',
    agency_email: '',
    phone: '',
    address: '',
    password: '',
    confirmPassword: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');

    if (selectedRole === 'tenant') {
      if (!formData.name || !formData.email || !formData.password) {
        setError('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        setIsSubmitting(false);
        return;
      }
      if (formData.password.length < 6) {
        setError('Password must be at least 6 characters.');
        setIsSubmitting(false);
        return;
      }
      const result = await register(formData.name, formData.email, formData.password, formData.phone);
      if (!result.success) {
        setError(result.message || 'Registration failed. Please try again.');
      }
    } else {
      // Agency Flow
      if (!formData.name || !formData.admin_name || !formData.email || !formData.password) {
        setError('Please fill in all required fields.');
        setIsSubmitting(false);
        return;
      }
      if (formData.password !== formData.confirmPassword) {
        setError('Passwords do not match.');
        setIsSubmitting(false);
        return;
      }
      if (formData.password.length < 8) {
        setError('Admin password must be at least 8 characters.');
        setIsSubmitting(false);
        return;
      }

      const payload = new FormData();
      payload.append('name', formData.name);//Agency name
      if (formData.admin_name) payload.append('admin_name', formData.admin_name);//Admin name
      payload.append('email', formData.email);//Admin email
      if (formData.agency_email) payload.append('agency_email', formData.agency_email);//Agency email
      if (formData.phone) payload.append('phone', formData.phone);
      if (formData.address) payload.append('address', formData.address);
      payload.append('password', formData.password);
      payload.append('password_confirmation', formData.confirmPassword);
      payload.append('with_trial', '0'); // don't create trial subscription here

      try {
        const response = await api.post('/agencies', payload, {
          headers: {
            'Content-Type': 'multipart/form-data',
            'Accept': 'application/json',
          },
        });

        // Auto login with the newly created admin credentials
        const loginResult = await login(formData.email, formData.password);
        if (!loginResult?.success) {
          setError(loginResult?.message || 'Account created, but auto-login failed. Please sign in manually.');
        }
      } catch (err) {
        if (err.response?.data?.errors) {
          const firstError = Object.values(err.response.data.errors)[0][0];
          setError(firstError);
        } else {
          setError(err.message || 'Failed to register agency. Please try again.');
        }
      }
    }
    setIsSubmitting(false);
  };

  const inputStyle = {
    background: '#fff',
    border: '1px solid #e2e8f0',
    color: '#0f172a',
    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
  };
  const focusStyle = { borderColor: '#4f46e5', boxShadow: '0 0 0 3px rgba(79,70,229,0.1)' };
  const blurStyle = { borderColor: '#e2e8f0', boxShadow: '0 1px 2px rgba(0,0,0,0.05)' };

  return (
    <div className="min-h-screen flex" style={{ paddingTop: 0, marginTop: 0 }}>
      {/* ── Left Panel: Form ─────────────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16" style={{ background: '#f7f9fb' }}>
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#4f46e5' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>apartment</span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#0f172a' }}>EstateSync Pro</span>
          </div>

          <div className="mb-6">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>Create account</h2>
            <p style={{ color: '#64748b' }}>Join thousands of users managing their real estate journey</p>
          </div>

          {/* Role Selector */}
          <div className="grid grid-cols-3 gap-2 mb-6">
            {ROLES.map((role) => (
              <button
                key={role.value}
                type="button"
                id={`role-${role.value}`}
                onClick={() => setSelectedRole(role.value)}
                className="flex flex-col items-center gap-1 py-3 px-2 rounded-xl text-center transition-all"
                style={{
                  background: selectedRole === role.value ? '#4f46e5' : '#fff',
                  border: selectedRole === role.value ? '2px solid #4f46e5' : '2px solid #e2e8f0',
                  color: selectedRole === role.value ? '#fff' : '#475569',
                  boxShadow: selectedRole === role.value ? '0 4px 14px rgba(79,70,229,0.3)' : '0 1px 3px rgba(0,0,0,0.06)',
                }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{role.icon}</span>
                <span className="text-xs font-semibold leading-tight">{role.label}</span>
              </button>
            ))}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div
                className="flex items-center gap-3 p-4 rounded-xl text-sm font-medium"
                style={{ background: '#fef2f2', border: '1px solid #fecaca', color: '#dc2626' }}
              >
                <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>error</span>
                {error}
              </div>
            )}

            {selectedRole === 'agency' && (
              <div className="p-4 rounded-xl text-sm" style={{ background: '#f0fdfa', color: '#0f766e', border: '1px solid #ccfbf1' }}>
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined mt-0.5" style={{ fontSize: '18px' }}>info</span>
                  <div>
                    <p className="font-semibold mb-0.5">Basic Company Setup</p>
                    <p>Enter your primary company and admin info below. You can complete your full profile (logo, branches, settings) later from your dashboard.</p>
                  </div>
                </div>
              </div>
            )}

            {/* Full Name / Agency Name */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>
                {selectedRole === 'agency' ? 'Agency Name *' : 'Full Name *'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>badge</span>
                <input
                  id="register-name"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder={selectedRole === 'agency' ? "e.g. Skyline Realty Group" : "John Smith"}
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
            </div>

            {/* Agency Email (Agency Only) */}
            {selectedRole === 'agency' && (
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Agency Email Address *</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>store</span>
                  <input
                    id="register-agency-email"
                    type="email"
                    name="agency_email"
                    value={formData.agency_email}
                    onChange={handleChange}
                    placeholder="contact@agency.com"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                  />
                </div>
              </div>
            )}

            {/* Admin Full Name (Agency Only) */}
            {selectedRole === 'agency' && (
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Admin Full Name *</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>person</span>
                  <input
                    id="register-admin-name"
                    type="text"
                    name="admin_name"
                    value={formData.admin_name}
                    onChange={handleChange}
                    placeholder="Jane Doe"
                    required
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                  />
                </div>
              </div>
            )}

            {/* Admin Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>
                {selectedRole === 'agency' ? 'Admin Login Email *' : 'Email Address *'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>mail</span>
                <input
                  id="register-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
            </div>

            {/* Admin Phone */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>
                {selectedRole === 'agency' ? 'Admin Phone Number *' : 'Phone Number'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>phone</span>
                <input
                  id="register-phone"
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="+1 (555) 000-0000"
                  required={selectedRole === 'agency'}
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
            </div>

            {/* Address (Agency Only) */}
            {selectedRole === 'agency' && (
              <div>
                <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Office Address</label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>location_on</span>
                  <input
                    id="register-address"
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="Street, City, State"
                    className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                    style={inputStyle}
                    onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                    onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                  />
                </div>
              </div>
            )}

            {/* Password */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>
                {selectedRole === 'agency' ? 'Admin Password *' : 'Password *'}
              </label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>lock</span>
                <input
                  id="register-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder={selectedRole === 'agency' ? "Min. 8 characters" : "Min. 6 characters"}
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2" style={{ color: '#94a3b8' }}>
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>{showPassword ? 'visibility_off' : 'visibility'}</span>
                </button>
              </div>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>Confirm Password *</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2" style={{ fontSize: '20px', color: '#94a3b8' }}>lock_reset</span>
                <input
                  id="register-confirm-password"
                  type={showPassword ? 'text' : 'password'}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Repeat your password"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={inputStyle}
                  onFocus={(e) => Object.assign(e.target.style, focusStyle)}
                  onBlur={(e) => Object.assign(e.target.style, blurStyle)}
                />
              </div>
            </div>

            {/* Submit */}
            <button
              id="register-submit"
              type="submit"
              disabled={authLoading || isSubmitting}
              className="w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: (authLoading || isSubmitting) ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                color: '#fff',
                boxShadow: (authLoading || isSubmitting) ? 'none' : '0 4px 20px rgba(79,70,229,0.35)',
              }}
            >
              {(authLoading || isSubmitting) ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Creating Account…
                </>
              ) : (
                <>
                  Create Account
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: '#64748b' }}>
            Already have an account?{' '}
            <Link href="/login" className="font-semibold hover:underline" style={{ color: '#4f46e5' }}>
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right Panel: Visual ───────────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4338ca 100%)',
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-16 left-12 w-64 h-64 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-24 right-8 w-48 h-48 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(30px)' }}
        />

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '22px' }}>apartment</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">EstateSync Pro</span>
          </Link>
        </div>

        {/* Center visual */}
        <div className="space-y-6">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase"
            style={{ background: 'rgba(255,255,255,0.1)', color: '#a5b4fc', backdropFilter: 'blur(8px)', border: '1px solid rgba(165,180,252,0.2)' }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
            Trusted by Industry Leaders
          </div>

          <h2 className="text-4xl font-bold text-white leading-tight">
            Start Your<br />
            <span style={{ color: '#818cf8' }}>Journey Today</span>
          </h2>
          <p className="text-lg leading-relaxed" style={{ color: '#a5b4fc' }}>
            Join over 12,000 tenants, managers, and agencies who trust EstateSync Pro to simplify real estate management.
          </p>

          {/* Feature list */}
          <div className="space-y-3">
            {[
              'Instant access to 2,400+ premium properties',
              'Real-time payment tracking & reminders',
              'Direct communication with property managers',
              'Digital lease management & e-signatures',
            ].map((feature) => (
              <div key={feature} className="flex items-center gap-3">
                <div
                  className="w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0"
                  style={{ background: 'rgba(129,140,248,0.2)', border: '1px solid rgba(129,140,248,0.3)' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '14px', color: '#818cf8' }}>check</span>
                </div>
                <span className="text-sm" style={{ color: '#cbd5e1' }}>{feature}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Trusted logos strip */}
        <div
          className="rounded-2xl p-5"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
        >
          <p className="text-xs font-semibold tracking-widest uppercase mb-4" style={{ color: '#64748b' }}>Trusted by</p>
          <div className="flex items-center gap-6">
            {['Horizon Capital', 'Azure Realty', 'Summit Group', 'Nova Estates'].map((name) => (
              <span key={name} className="text-xs font-semibold" style={{ color: '#a5b4fc' }}>{name}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
