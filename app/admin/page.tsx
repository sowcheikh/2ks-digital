'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Users,
  CreditCard,
  Megaphone,
  Send,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  MessageCircle,
  Smartphone,
} from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { createClient } from '@/lib/supabase-client';

interface Stats {
  totalContacts: number;
  totalCampaigns: number;
  totalCards: number;
  totalSent: number;
  totalDelivered: number;
  totalFailed: number;
}

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stats>({
    totalContacts: 0,
    totalCampaigns: 0,
    totalCards: 0,
    totalSent: 0,
    totalDelivered: 0,
    totalFailed: 0,
  });
  const [recentCampaigns, setRecentCampaigns] = useState<
    { id: string; name: string; channel: string; status: string; created_at: string }[]
  >([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      const supabase = createClient();

      const [contactsRes, campaignsCountRes, cardsRes, recentCampaignsRes, campaignMetricsRes] = await Promise.all([
        supabase.from('contacts').select('id', { count: 'exact', head: true }),
        supabase.from('campaigns').select('id', { count: 'exact', head: true }),
        supabase.from('business_cards').select('id', { count: 'exact', head: true }),
        supabase
          .from('campaigns')
          .select('id,name,channel,status,created_at')
          .order('created_at', { ascending: false })
          .limit(5),
        supabase.from('campaigns').select('sent_count,delivered_count,failed_count'),
      ]);

      const recentCampaignsData = recentCampaignsRes.data ?? [];
      const campaignMetrics = campaignMetricsRes.data ?? [];
      const totalSent = campaignMetrics.reduce((sum, c) => sum + (c.sent_count ?? 0), 0);
      const totalDelivered = campaignMetrics.reduce((sum, c) => sum + (c.delivered_count ?? 0), 0);
      const totalFailed = campaignMetrics.reduce((sum, c) => sum + (c.failed_count ?? 0), 0);

      setStats({
        totalContacts: contactsRes.count ?? 0,
        totalCampaigns: campaignsCountRes.count ?? 0,
        totalCards: cardsRes.count ?? 0,
        totalSent,
        totalDelivered,
        totalFailed,
      });
      setRecentCampaigns(recentCampaignsData);
      setLoading(false);
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Contacts', value: stats.totalContacts, icon: Users, color: '#002B5C', href: '/admin/contacts' },
    { label: 'Campagnes', value: stats.totalCampaigns, icon: Megaphone, color: '#E31837', href: '/admin/campaigns' },
    { label: 'Cartes', value: stats.totalCards, icon: CreditCard, color: '#7c3aed', href: '/admin/cards' },
    { label: 'Messages envoyés', value: stats.totalSent, icon: Send, color: '#25d366' },
    { label: 'Livrés', value: stats.totalDelivered, icon: CheckCircle2, color: '#0ea5e9' },
    { label: 'Échoués', value: stats.totalFailed, icon: AlertCircle, color: '#ef4444' },
  ];

  const channelIcon = (ch: string) =>
    ch === 'whatsapp' ? <MessageCircle size={14} className="text-[#25d366]" /> : <Smartphone size={14} className="text-[#E31837]" />;

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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-black text-[var(--fg)]">Dashboard</h1>
          <p className="text-sm text-[var(--fg-muted)] mt-1">
            Vue d&apos;ensemble de vos campagnes et contacts.
          </p>
        </div>

        {/* Stat cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-10">
          {statCards.map((card, i) => {
            const Icon = card.icon;
            const inner = (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="flex flex-col gap-3 p-5 rounded-2xl bg-white dark:bg-[#071428]
                  border border-gray-200 dark:border-[#1e3a5f] hover:shadow-md
                  transition-shadow duration-200"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${card.color}15` }}
                >
                  <Icon size={20} style={{ color: card.color }} />
                </div>
                <div>
                  <p className="text-2xl font-black text-[var(--fg)]">
                    {loading ? '—' : card.value}
                  </p>
                  <p className="text-xs text-[var(--fg-muted)] mt-0.5">{card.label}</p>
                </div>
              </motion.div>
            );

            if ('href' in card && card.href) {
              return <Link key={card.label} href={card.href}>{inner}</Link>;
            }
            return <div key={card.label}>{inner}</div>;
          })}
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10">
          <Link
            href="/admin/campaigns/new"
            className="flex items-center gap-4 p-5 rounded-2xl bg-[#002B5C] text-white
              hover:bg-[#003d80] transition-colors duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-white/10 flex items-center justify-center">
              <Megaphone size={22} />
            </div>
            <div className="flex-1">
              <p className="font-bold">Nouvelle campagne</p>
              <p className="text-xs text-white/60">WhatsApp ou SMS</p>
            </div>
            <ArrowRight size={18} className="text-white/40 group-hover:translate-x-1 transition-transform" />
          </Link>

          <Link
            href="/admin/contacts"
            className="flex items-center gap-4 p-5 rounded-2xl bg-white dark:bg-[#071428]
              border border-gray-200 dark:border-[#1e3a5f] hover:shadow-md
              transition-shadow duration-200 group"
          >
            <div className="w-12 h-12 rounded-xl bg-[#002B5C]/10 flex items-center justify-center">
              <Users size={22} className="text-[#002B5C]" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-[var(--fg)]">Gérer les contacts</p>
              <p className="text-xs text-[var(--fg-muted)]">Import CSV, tags, opt-in</p>
            </div>
            <ArrowRight size={18} className="text-[var(--fg-muted)] group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

        {/* Recent campaigns */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl overflow-hidden">
          <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200
            dark:border-[#1e3a5f]">
            <h2 className="font-bold text-[var(--fg)]">Campagnes récentes</h2>
            <Link
              href="/admin/campaigns"
              className="text-xs font-semibold text-[#E31837] hover:underline"
            >
              Voir tout →
            </Link>
          </div>

          {loading ? (
            <div className="p-8 text-center text-sm text-[var(--fg-muted)]">Chargement…</div>
          ) : recentCampaigns.length === 0 ? (
            <div className="p-8 text-center">
              <p className="text-sm text-[var(--fg-muted)] mb-3">Aucune campagne pour l&apos;instant.</p>
              <Link
                href="/admin/campaigns/new"
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold
                  bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors"
              >
                Créer votre première campagne
                <ArrowRight size={14} />
              </Link>
            </div>
          ) : (
            <div className="divide-y divide-gray-100 dark:divide-[#1e3a5f]">
              {recentCampaigns.map((c) => (
                <Link
                  key={c.id}
                  href={`/admin/campaigns/${c.id}`}
                  className="flex items-center justify-between px-6 py-3.5 hover:bg-gray-50
                    dark:hover:bg-[#0c1d3a] transition-colors group"
                >
                  <div className="flex items-center gap-3 min-w-0">
                    {channelIcon(c.channel)}
                    <span className="text-sm font-semibold text-[var(--fg)] truncate">
                      {c.name}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    {statusBadge(c.status)}
                    <ArrowRight size={14} className="text-[var(--fg-muted)] opacity-0
                      group-hover:opacity-100 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
