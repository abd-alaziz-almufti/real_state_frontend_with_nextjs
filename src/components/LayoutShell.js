'use client';

import { usePathname } from 'next/navigation';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

// Routes where Navbar and Footer are hidden (full-screen layouts)
const HIDDEN_CHROME_ROUTES = ['/login', '/register', '/tenant'];

export default function LayoutShell({ children }) {
  const pathname = usePathname();
  const hideChrome = HIDDEN_CHROME_ROUTES.some((r) => pathname.startsWith(r));

  return (
    <>
      {!hideChrome && <Navbar />}
      <main className={!hideChrome ? 'pt-20' : ''}>
        {children}
      </main>
      {!hideChrome && <Footer />}
    </>
  );
}
