'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Home, User } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AccountShell({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const { user, signOut } = useAuth();

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="h-16 bg-white dark:bg-[#071428] border-b border-gray-200 dark:border-[#1e3a5f]
        flex items-center px-4 sm:px-6 sticky top-0 z-30">
        <Link href="/" className="flex items-baseline gap-1">
          <span className="text-xl font-black text-[var(--fg)]">2ks</span>
          <span className="text-xl font-black text-[#E31837]">digital</span>
        </Link>

        <span className="ml-2 text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]
          bg-gray-100 dark:bg-[#0c1d3a] px-2 py-0.5 rounded-full">Mon compte</span>

        <div className="flex items-center gap-2 ml-auto">
          <Link
            href="/"
            className="hidden sm:flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)]
              hover:text-[var(--fg)] transition-colors px-3 py-2 rounded-lg hover:bg-gray-100
              dark:hover:bg-[#0c1d3a]"
          >
            <Home size={14} />
            Site
          </Link>

          {user && (
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg
              bg-gray-100 dark:bg-[#0c1d3a] text-xs">
              <div className="w-6 h-6 rounded-full bg-[#002B5C] flex items-center justify-center
                text-[10px] font-bold text-white">
                {user.email?.charAt(0).toUpperCase()}
              </div>
              <span className="font-semibold text-[var(--fg)] truncate max-w-[160px]">
                {user.email}
              </span>
            </div>
          )}

          <button
            onClick={handleSignOut}
            className="flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)]
              hover:text-red-500 transition-colors px-3 py-2 rounded-lg hover:bg-red-50
              dark:hover:bg-red-900/20"
          >
            <LogOut size={14} />
            <span className="hidden sm:inline">Déconnexion</span>
          </button>
        </div>
      </header>

      <main className="p-4 sm:p-6 lg:p-8">{children}</main>
    </div>
  );
}
