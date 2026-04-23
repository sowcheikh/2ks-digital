'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  CreditCard,
  Plus,
  Eye,
  Pencil,
  Link2,
  Loader2,
  Sparkles,
} from 'lucide-react';
import AccountShell from '@/components/account/AccountShell';
import { createClient } from '@/lib/supabase-client';
import type { BusinessCard } from '@/lib/types';

const FREE_LIMIT = 3;

export default function AccountDashboardPage() {
  const supabase = createClient();
  const [cards, setCards] = useState<BusinessCard[]>([]);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setOrigin(window.location.origin);
    }

    const fetchCards = async () => {
      const { data } = await supabase
        .from('business_cards')
        .select('*')
        .order('created_at', { ascending: false });
      setCards((data as BusinessCard[]) ?? []);
      setLoading(false);
    };
    fetchCards();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const copyLink = async (slug: string) => {
    const url = `${origin}/carte/${slug}`;
    await navigator.clipboard.writeText(url);
  };

  return (
    <AccountShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[var(--fg)]">Mes cartes de visite</h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1">
              {cards.length} / {FREE_LIMIT} carte{cards.length > 1 ? 's' : ''} créée{cards.length > 1 ? 's' : ''}
            </p>
          </div>

          <Link
            href="/account/cards/new"
            className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-bold
              transition-colors ${
                cards.length >= FREE_LIMIT
                  ? 'bg-gray-200 text-gray-400 dark:bg-[#0c1d3a] dark:text-[var(--fg-muted)] cursor-not-allowed pointer-events-none'
                  : 'bg-[#E31837] text-white hover:bg-[#c41530]'
              }`}
          >
            <Plus size={16} />
            Créer une carte
          </Link>
        </div>

        {/* Upgrade banner */}
        {cards.length >= FREE_LIMIT && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-3 p-4 rounded-2xl mb-6
              bg-gradient-to-r from-[#E31837]/10 to-[#002B5C]/10
              border border-[#E31837]/20"
          >
            <Sparkles size={22} className="text-[#E31837] flex-shrink-0" />
            <div className="flex-1">
              <p className="font-semibold text-[var(--fg)] text-sm">
                Vous avez atteint la limite gratuite ({FREE_LIMIT} cartes).
              </p>
              <p className="text-xs text-[var(--fg-muted)] mt-0.5">
                Passez en version premium prochainement pour créer plus de cartes.
              </p>
            </div>
          </motion.div>
        )}

        {/* Cards grid */}
        {loading ? (
          <div className="flex items-center justify-center py-16">
            <Loader2 size={24} className="animate-spin text-[var(--fg-muted)]" />
          </div>
        ) : cards.length === 0 ? (
          <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
            rounded-2xl p-12 text-center">
            <CreditCard size={40} className="mx-auto text-[var(--fg-muted)] mb-4" />
            <h3 className="text-lg font-bold text-[var(--fg)] mb-2">
              Aucune carte pour l&apos;instant
            </h3>
            <p className="text-sm text-[var(--fg-muted)] mb-6 max-w-sm mx-auto">
              Créez votre première carte de visite numérique et partagez-la en un clic.
            </p>
            <Link
              href="/account/cards/new"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold
                bg-[#E31837] text-white hover:bg-[#c41530] transition-colors"
            >
              <Plus size={16} />
              Créer ma première carte
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {cards.map((card, i) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
                  rounded-2xl p-5 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-[#002B5C] flex items-center justify-center
                    text-white text-sm font-bold flex-shrink-0 overflow-hidden">
                    {card.avatar_url ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={card.avatar_url}
                        alt={card.first_name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span>
                        {card.first_name.charAt(0)}{card.last_name.charAt(0)}
                      </span>
                    )}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-bold text-[var(--fg)] truncate">
                      {card.first_name} {card.last_name}
                    </p>
                    {card.title && (
                      <p className="text-xs text-[var(--fg-muted)] truncate">{card.title}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-1 mb-4">
                  <code className="text-[10px] text-[var(--fg-muted)] truncate flex-1">
                    /carte/{card.slug}
                  </code>
                  <button
                    onClick={() => copyLink(card.slug)}
                    className="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-[#0c1d3a]
                      text-[var(--fg-muted)] hover:text-[var(--fg)] transition-colors"
                    aria-label="Copier le lien"
                  >
                    <Link2 size={13} />
                  </button>
                </div>

                <div className="flex gap-2">
                  <Link
                    href={`/account/cards/${card.id}`}
                    className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg
                      text-xs font-semibold bg-[#002B5C] text-white hover:bg-[#003d80]
                      transition-colors"
                  >
                    <Pencil size={12} />
                    Éditer
                  </Link>
                  <Link
                    href={`/carte/${card.slug}`}
                    target="_blank"
                    className="flex items-center justify-center gap-1.5 flex-1 py-2 rounded-lg
                      text-xs font-semibold bg-gray-100 dark:bg-[#0c1d3a] text-[var(--fg)]
                      hover:bg-gray-200 dark:hover:bg-[#1e3a5f] transition-colors"
                  >
                    <Eye size={12} />
                    Aperçu
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </AccountShell>
  );
}
