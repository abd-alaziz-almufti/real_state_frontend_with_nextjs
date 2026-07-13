'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export function MobileNav() {
  const pathname = usePathname();
  
  const navItems = [
    { id: 'dashboard', href: '/tenant/dashboard', icon: 'dashboard', label: 'Home' },
    { id: 'payments', href: '/tenant/payments', icon: 'payments', label: 'Payments' },
    { id: 'properties', href: '/tenant/properties', icon: 'apartment', label: 'Properties' },
    { id: 'documents', href: '/tenant/documents', icon: 'description', label: 'Docs' },
  ];

  return (
    <nav
      className="lg:hidden fixed bottom-0 left-0 right-0 flex items-center justify-around z-40 py-2"
      style={{ background: '#fff', borderTop: '1px solid #f1f5f9', boxShadow: '0 -4px 20px rgba(0,0,0,0.06)' }}
    >
      {navItems.map((item) => {
        const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
        return (
          <Link
            key={item.id}
            id={`mobile-nav-${item.id}`}
            href={item.href}
            className="flex flex-col items-center gap-1 px-3 py-1 rounded-xl transition-all"
            style={{ color: isActive ? '#4f46e5' : '#94a3b8' }}
          >
            <span className="material-symbols-outlined" style={{ fontSize: '22px' }}>{item.icon}</span>
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}
