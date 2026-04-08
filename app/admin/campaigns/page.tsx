'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Megaphone,
  Plus,
  MessageCircle,
  Smartphone,
  ArrowRight,
  Send,
  CheckCircle2,
  Eye,
} from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { createClient } from '@/lib/supabase-client';
import type { Campaign } from '@/lib/types';

export default function AdminCampaignsPage() {
  const supabase = createClient();
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      const { data } = await supabase
        .from('campaigns')
        .select('*')
        .order('created_at', { ascending: false });
      setCampaigns(data ?? []);
      setLoading(false);
    };
    fetch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const channelBadge = (ch: string) =>
    ch === 'whatsapp' ? (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
        bg-[#25d366]/15 text-[#25d366]">
        <MessageCircle size={10} /> WhatsApp
      </span>
    ) : (
      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold
        bg-[#E31837]/15 text-[#E31837]">
        <Smartphone size={10} /> SMS
      </span>
    );

  const statusBadge = (s: string) => {
    const map: Record<string, { bg: string; text: string; label: string }> = {
      draft:     { bg: 'bg-gray-100 dark:bg-gray-800', text: 'text-gray-600 dark:text-gray-400', label: 'Brouillon' },
      scheduled: { bg: 'bg-yellow-50 dark:bg-yellow-900/20', text: 'text-yellow-700 dark:text-yellow-400', label: 'Planifiée' },
      sending:   { bg: 'bg-blue-50 dark:bg-blue-900/20', text: 'text-blue-700 dark:text-blue-400', label: 'En cours' },
      done:      { bg: 'bg-green-50 dark:bg-green-900/20', text: 'text-green-700 dark:text-green-400', label: 'Terminée' },
      cancelled: { bg: 'bg-red-50 dark:bg-red-900/20', text: 'text-red-700 dark:text-red-400', label: 'Annulée' },
    };
    const cfg = map[s] ?? map.draft;
    return (
      <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${cfg.bg} ${cfg.text}`}>
        {cfg.label}
      </span>
    );
  };

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-black text-[var(--fg)]">Campagnes</h1>
            <p className="text-sm text-[var(--fg-muted)] mt-1">
              Gérez vos campagnes WhatsApp et SMS.
            </p>
          </div>
          <Link
            href="/admin/campaigns/new"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold
              bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors"
          >
            <Plus size={16} />
            Nouvelle campagne
          </Link>
        </div>

        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl overflow-hidden">
          {loading ? (
            <div className="p-8 text-center text-sm text-[var(--fg-muted)]">Chargement…</div>
          ) : campaigns.length === 0 ? (
            <div className="p-12 text-center">
              <Megaphone size={40} className="mx-auto text-[var(--fg-muted)] mb-4" />
              <p className="text-[var(--fg-muted)] mb-4">Aucune campagne pour l&apos;instant.</p>
              <Link
                href="/admin/campaigns/new"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold
                  bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors"
              >
                Créer votre première campagne
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-[#1e3a5f]">
              {campaigns.map((c, i) => (
                <motion.div
                  key={c.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <Link
                    href={`/admin/campaigns/${c.id}`}
                    className="flex items-center justify-between px-6 py-4 hover:bg-gray-50
                      dark:hover:bg-[#0c1d3a] transition-colors group"
                  >
                    <div className="flex items-center gap-4 min-w-0 flex-1">
                      <div className="w-10 h-10 rounded-xl bg-[#002B5C]/10 flex items-center justify-center flex-shrink-0">
                        <Megaphone size={18} className="text-[#002B5C] dark:text-[#E31837]" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-bold text-[var(--fg)] truncate">{c.name}</p>
                        <div className="flex items-center gap-2 mt-1">
                          {channelBadge(c.channel)}
                          <span className="text-[10px] text-[var(--fg-muted)]">
                            {new Date(c.created_at).toLocaleDateString('fr-FR')}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-4">
                      <div className="hidden sm:flex items-center gap-3 text-xs text-[var(--fg-muted)]">
                        <span className="flex items-center gap-1">
                          <Send size={11} /> {c.sent_count ?? 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <CheckCircle2 size={11} className="text-green-500" /> {c.delivered_count ?? 0}
                        </span>
                        <span className="flex items-center gap-1">
                          <Eye size={11} className="text-blue-500" /> {c.read_count ?? 0}
                        </span>
                      </div>
                      {statusBadge(c.status)}
                      <ArrowRight size={14} className="text-[var(--fg-muted)] opacity-0
                        group-hover:opacity-100 transition-opacity" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
