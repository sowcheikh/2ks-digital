'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  LayoutDashboard,
  Users,
  Megaphone,
  CreditCard,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

const sidebarLinks = [
  { label: 'Dashboard',  href: '/admin',           icon: LayoutDashboard },
  { label: 'Contacts',   href: '/admin/contacts',  icon: Users },
  { label: 'Campagnes',  href: '/admin/campaigns', icon: Megaphone },
  { label: 'Cartes',     href: '/admin/cards',     icon: CreditCard },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { user, signOut } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleSignOut = async () => {
    await signOut();
    router.push('/admin/login');
  };

  const isActive = (href: string) =>
    href === '/admin' ? pathname === '/admin' : pathname.startsWith(href);

  return (
    <div className="min-h-screen bg-[#f1f5f9] dark:bg-[#020d1f] flex">
      {/* ── Sidebar desktop ──────────────────────────────── */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0
        bg-[#002B5C] text-white z-40">
        {/* Logo */}
        <div className="h-16 flex items-center px-6 border-b border-white/10">
          <Link href="/admin" className="flex items-baseline gap-1">
            <span className="text-xl font-black">2ks</span>
            <span className="text-xl font-black text-[#E31837]">digital</span>
          </Link>
          <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-white/40
            bg-white/10 px-2 py-0.5 rounded-full">Admin</span>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const active = isActive(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                  transition-all duration-200 group ${
                    active
                      ? 'bg-white/15 text-white'
                      : 'text-white/60 hover:text-white hover:bg-white/8'
                  }`}
              >
                <Icon size={18} className={active ? 'text-[#E31837]' : 'text-white/40 group-hover:text-white/70'} />
                {link.label}
                {active && <ChevronRight size={14} className="ml-auto text-white/40" />}
              </Link>
            );
          })}
        </nav>

        {/* User + logout */}
        <div className="p-4 border-t border-white/10">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-full bg-[#E31837] flex items-center justify-center
              text-xs font-bold text-white">
              {user?.email?.charAt(0).toUpperCase() ?? 'A'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-white truncate">
                {user?.email ?? 'Admin'}
              </p>
              <p className="text-[10px] text-white/40">Administrateur</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium
              text-white/50 hover:text-white hover:bg-white/8 transition-colors duration-200"
          >
            <LogOut size={14} />
            Déconnexion
          </button>
        </div>
      </aside>

      {/* ── Mobile sidebar ───────────────────────────────── */}
      <AnimatePresence>
        {sidebarOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.5 }}
              exit={{ opacity: 0 }}
              onClick={() => setSidebarOpen(false)}
              className="fixed inset-0 bg-black z-40 lg:hidden"
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-64 bg-[#002B5C] text-white z-50 lg:hidden
                flex flex-col"
            >
              <div className="h-16 flex items-center justify-between px-6 border-b border-white/10">
                <div className="flex items-baseline gap-1">
                  <span className="text-xl font-black">2ks</span>
                  <span className="text-xl font-black text-[#E31837]">digital</span>
                </div>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="p-1 rounded-lg hover:bg-white/10"
                >
                  <X size={18} />
                </button>
              </div>
              <nav className="flex-1 py-4 px-3 flex flex-col gap-1">
                {sidebarLinks.map((link) => {
                  const Icon = link.icon;
                  const active = isActive(link.href);
                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setSidebarOpen(false)}
                      className={`flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm font-medium
                        transition-all duration-200 ${
                          active
                            ? 'bg-white/15 text-white'
                            : 'text-white/60 hover:text-white hover:bg-white/8'
                        }`}
                    >
                      <Icon size={18} className={active ? 'text-[#E31837]' : 'text-white/40'} />
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
              <div className="p-4 border-t border-white/10">
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 w-full px-3 py-2 rounded-lg text-xs font-medium
                    text-white/50 hover:text-white hover:bg-white/8 transition-colors duration-200"
                >
                  <LogOut size={14} />
                  Déconnexion
                </button>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      {/* ── Main content ─────────────────────────────────── */}
      <div className="flex-1 lg:ml-64 flex flex-col min-h-screen">
        {/* Top bar */}
        <header className="h-16 bg-white dark:bg-[#071428] border-b border-gray-200 dark:border-[#1e3a5f]
          flex items-center px-4 sm:px-6 sticky top-0 z-30">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 -ml-2 rounded-lg text-gray-500 hover:bg-gray-100
              dark:text-gray-400 dark:hover:bg-[#0c1d3a]"
            aria-label="Open sidebar"
          >
            <Menu size={20} />
          </button>

          <div className="flex items-center gap-2 ml-auto">
            <Link
              href="/"
              target="_blank"
              className="text-xs text-gray-400 hover:text-gray-600 dark:hover:text-gray-300
                transition-colors"
            >
              Voir le site →
            </Link>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
