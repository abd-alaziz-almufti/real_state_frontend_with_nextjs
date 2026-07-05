'use client';

import Link from "next/link";
import React from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const pathname = usePathname();

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
        <a className={getLinkClass('/tenant-portal')} href="#">Tenant Portal</a>
        <a className={getLinkClass('/agencies')} href="#">Agencies</a>
        <Link className={getLinkClass('/contact')} href="/contact">Contact</Link>
        <Link className={getLinkClass('/about')} href="/about">About</Link>

      </nav>
      <div className="flex items-center gap-4">
        {/* <button 
          onClick={() => setDarkMode(!darkMode)}
          className="material-symbols-outlined text-on-surface-variant dark:text-surface-variant p-2 hover:bg-surface-container-high/50 rounded-lg transition-all"
          aria-label="Toggle Theme"
        >
          {darkMode ? 'light_mode' : 'dark_mode'}
        </button> */}
        <button className="material-symbols-outlined text-on-surface-variant dark:text-surface-variant p-2 hover:bg-surface-container-high/50 rounded-lg transition-all">notifications</button>
        <button className="material-symbols-outlined text-on-surface-variant dark:text-surface-variant p-2 hover:bg-surface-container-high/50 rounded-lg transition-all">apps</button>
        <button className="bg-primary text-on-primary px-6 py-2 rounded-xl font-button text-button hover:opacity-90 active:scale-95 transition-all">List Property</button>
      </div>
    </header>
  );
}