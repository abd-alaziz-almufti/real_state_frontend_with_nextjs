'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function LoginPage() {
  const { login, loading } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields.');
      return;
    }
    const result = await login(formData.email, formData.password);
    if (!result.success) {
      setError(result.message || 'Invalid email or password.');
    }
  };

  return (
    <div className="min-h-screen flex" style={{ paddingTop: 0, marginTop: 0 }}>
      {/* ── Left Panel: Luxury Visual ─────────────────────────────────── */}
      <div
        className="hidden lg:flex lg:w-1/2 relative flex-col justify-between p-12"
        style={{
          background: 'linear-gradient(135deg, #0f172a 0%, #1e1b4b 40%, #312e81 70%, #4338ca 100%)',
        }}
      >
        {/* Decorative orbs */}
        <div
          className="absolute top-20 right-20 w-72 h-72 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #818cf8 0%, transparent 70%)', filter: 'blur(40px)' }}
        />
        <div
          className="absolute bottom-32 left-10 w-56 h-56 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #6366f1 0%, transparent 70%)', filter: 'blur(30px)' }}
        />

        {/* Brand */}
        <div>
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center" style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(12px)' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '22px' }}>apartment</span>
            </div>
            <span className="text-white font-bold text-xl tracking-tight">EstateSync Pro</span>
          </Link>
        </div>

        {/* Center quote */}
        <div className="space-y-8">
          <div>
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold tracking-widest uppercase mb-6"
              style={{ background: 'rgba(255,255,255,0.1)', color: '#a5b4fc', backdropFilter: 'blur(8px)', border: '1px solid rgba(165,180,252,0.2)' }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              Premium Real Estate Platform
            </div>

            <h1 className="text-4xl font-bold text-white leading-tight mb-4">
              Your Gateway to<br />
              <span style={{ color: '#818cf8' }}>Premium Living</span>
            </h1>
            <p className="text-lg leading-relaxed" style={{ color: '#a5b4fc' }}>
              Manage your properties, track payments, and connect with top agencies — all from one intelligent platform.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { value: '2,400+', label: 'Properties' },
              { value: '98%', label: 'Satisfaction' },
              { value: '150+', label: 'Agencies' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl p-4 text-center"
                style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.1)', backdropFilter: 'blur(10px)' }}
              >
                <div className="text-2xl font-bold text-white">{stat.value}</div>
                <div className="text-xs mt-1" style={{ color: '#a5b4fc' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <div
          className="rounded-2xl p-6"
          style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.12)', backdropFilter: 'blur(10px)' }}
        >
          <p className="text-white text-sm leading-relaxed italic mb-4">
            "EstateSync Pro transformed how we manage our portfolio. The tenant portal alone saved us countless hours every month."
          </p>
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold" style={{ background: 'linear-gradient(135deg, #818cf8, #6366f1)', color: 'white' }}>
              JS
            </div>
            <div>
              <div className="text-white text-sm font-semibold">Julian Sterling</div>
              <div className="text-xs" style={{ color: '#a5b4fc' }}>CEO, Horizon Capital</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Right Panel: Login Form ───────────────────────────────────── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16" style={{ background: '#f7f9fb' }}>
        <div className="w-full max-w-md">
          {/* Mobile brand */}
          <div className="flex lg:hidden items-center justify-center gap-2 mb-8">
            <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ background: '#4f46e5' }}>
              <span className="material-symbols-outlined text-white" style={{ fontSize: '18px' }}>apartment</span>
            </div>
            <span className="font-bold text-lg" style={{ color: '#0f172a' }}>EstateSync Pro</span>
          </div>

          <div className="mb-8">
            <h2 className="text-3xl font-bold mb-2" style={{ color: '#0f172a' }}>Welcome back</h2>
            <p style={{ color: '#64748b' }}>Sign in to access your tenant portal</p>
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {[
              { icon: 'G', label: 'Google', bg: '#fff', border: '#e2e8f0', color: '#374151' },
              { icon: 'in', label: 'LinkedIn', bg: '#0077b5', border: '#0077b5', color: '#fff' },
            ].map((btn) => (
              <button
                key={btn.label}
                type="button"
                className="flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all hover:opacity-90 active:scale-95"
                style={{ background: btn.bg, border: `1px solid ${btn.border}`, color: btn.color, boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
              >
                <span className="font-bold text-base">{btn.icon}</span>
                {btn.label}
              </button>
            ))}
          </div>

          {/* Divider */}
          <div className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
            <span className="text-xs font-medium" style={{ color: '#94a3b8' }}>or continue with email</span>
            <div className="flex-1 h-px" style={{ background: '#e2e8f0' }} />
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

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-1.5" style={{ color: '#374151' }}>
                Email Address
              </label>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ fontSize: '20px', color: '#94a3b8' }}
                >
                  mail
                </span>
                <input
                  id="login-email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  required
                  className="w-full pl-12 pr-4 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    color: '#0f172a',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#4f46e5'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; }}
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="text-sm font-semibold" style={{ color: '#374151' }}>Password</label>
                <Link href="#" className="text-xs font-medium hover:underline" style={{ color: '#4f46e5' }}>Forgot password?</Link>
              </div>
              <div className="relative">
                <span
                  className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2"
                  style={{ fontSize: '20px', color: '#94a3b8' }}
                >
                  lock
                </span>
                <input
                  id="login-password"
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter your password"
                  required
                  className="w-full pl-12 pr-12 py-3.5 rounded-xl text-sm outline-none transition-all"
                  style={{
                    background: '#fff',
                    border: '1px solid #e2e8f0',
                    color: '#0f172a',
                    boxShadow: '0 1px 2px rgba(0,0,0,0.05)',
                  }}
                  onFocus={(e) => { e.target.style.borderColor = '#4f46e5'; e.target.style.boxShadow = '0 0 0 3px rgba(79,70,229,0.1)'; }}
                  onBlur={(e) => { e.target.style.borderColor = '#e2e8f0'; e.target.style.boxShadow = '0 1px 2px rgba(0,0,0,0.05)'; }}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2"
                  style={{ color: '#94a3b8' }}
                >
                  <span className="material-symbols-outlined" style={{ fontSize: '20px' }}>
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            {/* Submit */}
            <button
              id="login-submit"
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-xl text-sm font-bold tracking-wide transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              style={{
                background: loading ? '#94a3b8' : 'linear-gradient(135deg, #4f46e5 0%, #6366f1 100%)',
                color: '#fff',
                boxShadow: loading ? 'none' : '0 4px 20px rgba(79,70,229,0.35)',
              }}
            >
              {loading ? (
                <>
                  <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Signing In…
                </>
              ) : (
                <>
                  Sign In
                  <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>arrow_forward</span>
                </>
              )}
            </button>
          </form>

          <p className="text-center mt-6 text-sm" style={{ color: '#64748b' }}>
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-semibold hover:underline" style={{ color: '#4f46e5' }}>
              Create account
            </Link>
          </p>

          {/* Footer note */}
          <p className="text-center mt-8 text-xs" style={{ color: '#cbd5e1' }}>
            By signing in, you agree to our{' '}
            <Link href="#" className="underline">Terms of Service</Link> and{' '}
            <Link href="#" className="underline">Privacy Policy</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
