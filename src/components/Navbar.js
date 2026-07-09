'use client';

import Link from "next/link";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/AuthContext";

export default function Navbar() {
  const pathname = usePathname();
  const { user, isAuthenticated, logout, loading } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);


  const getLinkClass = (path) => {
    const isActive = pathname === path;
    return isActive
      ? "text-primary dark:text-inverse-primary border-b-2 border-primary dark:border-inverse-primary font-semibold pb-1"
      : "text-on-surface-variant dark:text-surface-variant hover:text-primary dark:hover:text-inverse-primary transition-colors pb-1";
  };

  return (
    <header className="fixed top-0 left-0 right-0 min-w-full z-50 flex justify-between items-center px-margin-desktop h-20 max-w-container-max mx-auto bg-surface/80 dark:bg-inverse-surface/80 backdrop-blur-xl border-b border-outline-variant/30 dark:border-outline/20 shadow-sm dark:shadow-none">
      <div className="text-headline-md font-headline-md font-bold tracking-tight text-primary dark:text-inverse-primary">
        <Link href="/">EstateSync Pro</Link>
      </div>

      <nav className="hidden md:flex items-center gap-8">
        <Link className={getLinkClass('/')} href="/">Marketplace</Link>
        <a className={getLinkClass('/map-explorer')} href="#">Map Explorer</a>
        <Link className={getLinkClass('/agencies')} href="/agencies">Agencies</Link>
        <Link className={getLinkClass('/contact')} href="/contact">Contact</Link>
        <Link className={getLinkClass('/about')} href="/about">About</Link>
        {isAuthenticated && (
          <Link className={getLinkClass('/tenant/dashboard')} href="/tenant/dashboard">
            My Portal
          </Link>
        )}
      </nav>

      <div className="flex items-center gap-3">
        <button
          className="material-symbols-outlined text-on-surface-variant dark:text-surface-variant p-2 hover:bg-surface-container-high/50 rounded-lg transition-all"
          aria-label="Notifications"
        >
          notifications
        </button>

        {loading ? (
          // Skeleton while auth initializes
          <div className="w-24 h-9 rounded-xl bg-surface-container animate-pulse" />
        ) : isAuthenticated ? (
          <div className="flex items-center gap-2">
            {/* Avatar + name */}
            <Link
              href="/tenant/dashboard"
              id="navbar-dashboard-link"
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-xl transition-all hover:bg-surface-container"
            >
              <div
                className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                style={{ background: 'linear-gradient(135deg, #4f46e5, #6366f1)', color: '#fff' }}
              >
                {user?.name?.charAt(0)?.toUpperCase() || 'T'}
              </div>
              <span className="text-sm font-semibold text-on-surface">{user?.name?.split(' ')[0]}</span>
            </Link>
            <button
              id="navbar-logout-btn"
              onClick={logout}
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-sm font-semibold transition-all hover:opacity-80"
              style={{ background: '#fef2f2', color: '#dc2626' }}
            >
              <span className="material-symbols-outlined" style={{ fontSize: '18px' }}>logout</span>
              <span className="hidden md:inline">Sign Out</span>
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Link
              id="navbar-login-link"
              href="/login"
              className="px-4 py-2 rounded-xl text-sm font-semibold text-on-surface-variant hover:bg-surface-container transition-all"
            >
              Sign In
            </Link>
            <Link
              id="navbar-register-link"
              href="/register"
              className="bg-primary text-on-primary px-5 py-2 rounded-xl font-button text-button hover:opacity-90 active:scale-95 transition-all"
            >
              Get Started
            </Link>
          </div>
        )}
      </div>
    </header>
  );
}