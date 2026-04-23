'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CreditCard,
  Search,
  ExternalLink,
  Loader2,
  User as UserIcon,
} from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import type { BusinessCard } from '@/lib/types';

interface AdminCard extends BusinessCard {
  owner_email: string | null;
}

export default function AdminCardsPage() {
  const [cards, setCards] = useState<AdminCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchCards = async () => {
      const res = await fetch('/api/admin/cards');
      const data = await res.json();
      if (res.ok) setCards(data.cards ?? []);
      setLoading(false);
    };
    fetchCards();
  }, []);

  const filtered = cards.filter((c) => {
    const q = search.toLowerCase();
    if (!q) return true;
    return (
      c.first_name.toLowerCase().includes(q) ||
      c.last_name.toLowerCase().includes(q) ||
      (c.email ?? '').toLowerCase().includes(q) ||
      (c.owner_email ?? '').toLowerCase().includes(q) ||
      c.slug.toLowerCase().includes(q)
    );
  });

  return (
    <AdminShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl font-black text-[var(--fg)]">Toutes les cartes</h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1">
              {cards.length} carte{cards.length > 1 ? 's' : ''} créée{cards.length > 1 ? 's' : ''} par les utilisateurs
            </p>
          </div>

          <div className="relative">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]" />
            <input
              type="search"
              placeholder="Rechercher…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#071428]
                border border-gray-200 dark:border-[#1e3a5f] text-[var(--fg)]
                focus:outline-none focus:ring-2 focus:ring-[#E31837] w-64"
            />
          </div>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 className="animate-spin text-[var(--fg-muted)]" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
            rounded-2xl p-12 text-center">
            <CreditCard size={36} className="mx-auto text-[var(--fg-muted)] mb-3" />
            <p className="text-sm text-[var(--fg-muted)]">Aucune carte.</p>
          </div>
        ) : (
          <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
            rounded-2xl overflow-hidden">
            <table className="w-full text-sm">
              <thead className="bg-gray-50 dark:bg-[#0c1d3a]">
                <tr className="text-left text-[10px] font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                  <th className="px-4 py-3">Personne</th>
                  <th className="px-4 py-3 hidden md:table-cell">Propriétaire</th>
                  <th className="px-4 py-3 hidden lg:table-cell">Slug</th>
                  <th className="px-4 py-3 hidden sm:table-cell">Créée le</th>
                  <th className="px-4 py-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((c) => (
                  <tr
                    key={c.id}
                    className="border-t border-gray-100 dark:border-[#1e3a5f]
                      hover:bg-gray-50 dark:hover:bg-[#0c1d3a] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-lg bg-[#002B5C] flex items-center justify-center
                          text-white text-xs font-bold overflow-hidden flex-shrink-0">
                          {c.avatar_url ? (
                            // eslint-disable-next-line @next/next/no-img-element
                            <img src={c.avatar_url} alt="" className="w-full h-full object-cover" />
                          ) : (
                            <span>{c.first_name.charAt(0)}{c.last_name.charAt(0)}</span>
                          )}
                        </div>
                        <div className="min-w-0">
                          <p className="font-semibold text-[var(--fg)] truncate">
                            {c.first_name} {c.last_name}
                          </p>
                          {c.title && (
                            <p className="text-[11px] text-[var(--fg-muted)] truncate">{c.title}</p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden md:table-cell">
                      <div className="flex items-center gap-1.5 text-xs text-[var(--fg-muted)]">
                        <UserIcon size={11} />
                        <span className="truncate max-w-[180px]">{c.owner_email ?? '—'}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <code className="text-[10px] text-[var(--fg-muted)]">{c.slug}</code>
                    </td>
                    <td className="px-4 py-3 hidden sm:table-cell text-xs text-[var(--fg-muted)]">
                      {new Date(c.created_at).toLocaleDateString('fr-FR')}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <Link
                        href={`/carte/${c.slug}`}
                        target="_blank"
                        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-semibold
                          bg-gray-100 dark:bg-[#0c1d3a] text-[var(--fg)]
                          hover:bg-gray-200 dark:hover:bg-[#1e3a5f] transition-colors"
                      >
                        <ExternalLink size={11} />
                        Voir
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </AdminShell>
  );
}
