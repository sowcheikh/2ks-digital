'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  ArrowLeft,
  MessageCircle,
  Smartphone,
  Send,
  CheckCircle2,
  Eye,
  AlertCircle,
  Clock,
  Loader2,
  Trash2,
  Play,
  XCircle,
  Users,
} from 'lucide-react';
import AdminShell from '@/components/admin/AdminShell';
import { createClient } from '@/lib/supabase-client';
import type { Campaign, CampaignMessage } from '@/lib/types';

export default function CampaignDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [messages, setMessages] = useState<CampaignMessage[]>([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const fetchData = async () => {
    const [campaignRes, messagesRes] = await Promise.all([
      supabase.from('campaigns').select('*').eq('id', id).single(),
      supabase
        .from('campaign_messages')
        .select('*, contact:contacts(*)')
        .eq('campaign_id', id)
        .order('sent_at', { ascending: false }),
    ]);

    setCampaign(campaignRes.data);
    setMessages(messagesRes.data ?? []);
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const showToast = (type: 'success' | 'error', message: string) => {
    setToast({ type, message });
    setTimeout(() => setToast(null), 4000);
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer cette campagne et tous ses messages ?')) return;
    await supabase.from('campaign_messages').delete().eq('campaign_id', id);
    const { error } = await supabase.from('campaigns').delete().eq('id', id);
    if (error) {
      showToast('error', error.message);
      return;
    }
    router.push('/admin/campaigns');
  };

  const handleStatusChange = async (status: 'sending' | 'cancelled') => {
    const { error } = await supabase.from('campaigns').update({ status }).eq('id', id);
    if (error) {
      showToast('error', error.message);
      return;
    }
    showToast('success', status === 'sending' ? 'Campagne lancée !' : 'Campagne annulée.');
    fetchData();
  };

  const msgStatusIcon = (s: string) => {
    switch (s) {
      case 'queued': return <Clock size={14} className="text-gray-400" />;
      case 'sent': return <Send size={14} className="text-blue-500" />;
      case 'delivered': return <CheckCircle2 size={14} className="text-green-500" />;
      case 'read': return <Eye size={14} className="text-blue-500" />;
      case 'failed': return <AlertCircle size={14} className="text-red-500" />;
      default: return <Clock size={14} className="text-gray-400" />;
    }
  };

  const msgStatusLabel = (s: string) => {
    const map: Record<string, string> = {
      queued: 'En attente',
      sent: 'Envoyé',
      delivered: 'Livré',
      read: 'Lu',
      failed: 'Échoué',
    };
    return map[s] ?? s;
  };

  if (loading) {
    return (
      <AdminShell>
        <div className="flex items-center justify-center h-64">
          <Loader2 size={24} className="animate-spin text-[var(--fg-muted)]" />
        </div>
      </AdminShell>
    );
  }

  if (!campaign) {
    return (
      <AdminShell>
        <div className="text-center py-16">
          <p className="text-[var(--fg-muted)] mb-4">Campagne introuvable.</p>
          <Link href="/admin/campaigns" className="text-sm text-[#E31837] hover:underline">
            ← Retour aux campagnes
          </Link>
        </div>
      </AdminShell>
    );
  }

  const statusColor: Record<string, string> = {
    draft: 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400',
    scheduled: 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-400',
    sending: 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-400',
    done: 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400',
    cancelled: 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400',
  };

  const statusLabels: Record<string, string> = {
    draft: 'Brouillon',
    scheduled: 'Planifiée',
    sending: 'En cours',
    done: 'Terminée',
    cancelled: 'Annulée',
  };

  const stats = [
    { label: 'Envoyés', value: campaign.sent_count, icon: Send, color: '#002B5C' },
    { label: 'Livrés', value: campaign.delivered_count, icon: CheckCircle2, color: '#22c55e' },
    { label: 'Lus', value: campaign.read_count, icon: Eye, color: '#0ea5e9' },
    { label: 'Échoués', value: campaign.failed_count, icon: AlertCircle, color: '#ef4444' },
  ];

  return (
    <AdminShell>
      <div className="max-w-5xl mx-auto">
        {/* Toast */}
        <AnimatePresence>
          {toast && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className={`fixed top-20 right-6 z-50 flex items-center gap-2 px-5 py-3 rounded-xl
                text-sm font-medium shadow-xl ${
                  toast.type === 'success' ? 'bg-green-600 text-white' : 'bg-red-600 text-white'
                }`}
            >
              {toast.type === 'success' ? <CheckCircle2 size={16} /> : <AlertCircle size={16} />}
              {toast.message}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Header */}
        <div className="flex items-start gap-3 mb-8">
          <Link
            href="/admin/campaigns"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#0c1d3a] transition-colors mt-1"
          >
            <ArrowLeft size={18} className="text-[var(--fg-muted)]" />
          </Link>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-2xl font-black text-[var(--fg)] truncate">{campaign.name}</h1>
              <span className={`px-3 py-1 rounded-full text-xs font-bold ${statusColor[campaign.status]}`}>
                {statusLabels[campaign.status]}
              </span>
              {campaign.channel === 'whatsapp' ? (
                <span className="inline-flex items-center gap-1 text-xs text-[#25d366] font-semibold">
                  <MessageCircle size={13} /> WhatsApp
                </span>
              ) : (
                <span className="inline-flex items-center gap-1 text-xs text-[#E31837] font-semibold">
                  <Smartphone size={13} /> SMS
                </span>
              )}
            </div>
            <p className="text-xs text-[var(--fg-muted)] mt-1">
              Créée le {new Date(campaign.created_at).toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' })}
            </p>
          </div>

          {/* Actions */}
          <div className="flex gap-2 flex-shrink-0">
            {campaign.status === 'draft' && (
              <button
                onClick={() => handleStatusChange('sending')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                  bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors"
              >
                <Play size={14} /> Lancer
              </button>
            )}
            {campaign.status === 'sending' && (
              <button
                onClick={() => handleStatusChange('cancelled')}
                className="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-semibold
                  bg-red-600 text-white hover:bg-red-700 transition-colors"
              >
                <XCircle size={14} /> Annuler
              </button>
            )}
            <button
              onClick={handleDelete}
              className="p-2 rounded-xl text-gray-400 hover:text-red-500 hover:bg-red-50
                dark:hover:bg-red-900/20 transition-colors"
              aria-label="Supprimer"
            >
              <Trash2 size={16} />
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                className="p-5 rounded-2xl bg-white dark:bg-[#071428] border border-gray-200
                  dark:border-[#1e3a5f]"
              >
                <div className="flex items-center gap-2 mb-2">
                  <Icon size={16} style={{ color: s.color }} />
                  <span className="text-xs font-semibold text-[var(--fg-muted)]">{s.label}</span>
                </div>
                <p className="text-2xl font-black text-[var(--fg)]">{s.value}</p>
              </motion.div>
            );
          })}
        </div>

        {/* Message preview */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl p-6 mb-8">
          <h2 className="font-bold text-[var(--fg)] mb-3">Message</h2>
          <div className="p-4 rounded-xl bg-[var(--bg)] border border-[var(--border)] text-sm
            text-[var(--fg)] whitespace-pre-wrap leading-relaxed">
            {campaign.message}
          </div>
          {campaign.template_name && (
            <p className="text-xs text-[var(--fg-muted)] mt-2">
              Template : <code className="font-mono text-xs">{campaign.template_name}</code>
            </p>
          )}
        </div>

        {/* Messages table */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200 dark:border-[#1e3a5f] flex items-center gap-2">
            <Users size={16} className="text-[var(--fg-muted)]" />
            <h2 className="font-bold text-[var(--fg)]">Destinataires</h2>
            <span className="text-xs text-[var(--fg-muted)] ml-1">
              ({messages.length})
            </span>
          </div>

          {messages.length === 0 ? (
            <div className="p-8 text-center text-sm text-[var(--fg-muted)]">
              Aucun destinataire.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-[#1e3a5f]">
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                      Contact
                    </th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                      Téléphone
                    </th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                      Statut
                    </th>
                    <th className="px-6 py-3 text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] hidden sm:table-cell">
                      Envoyé à
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 dark:divide-[#1e3a5f]">
                  {messages.map((m) => (
                    <tr key={m.id} className="hover:bg-gray-50 dark:hover:bg-[#0c1d3a] transition-colors">
                      <td className="px-6 py-3 text-sm font-semibold text-[var(--fg)]">
                        {m.contact?.name ?? '—'}
                      </td>
                      <td className="px-6 py-3 text-sm text-[var(--fg-muted)]">
                        {m.contact?.phone ?? '—'}
                      </td>
                      <td className="px-6 py-3">
                        <div className="flex items-center gap-1.5">
                          {msgStatusIcon(m.status)}
                          <span className="text-xs font-semibold text-[var(--fg)]">
                            {msgStatusLabel(m.status)}
                          </span>
                        </div>
                        {m.error && (
                          <p className="text-[10px] text-red-500 mt-0.5 truncate max-w-[200px]">
                            {m.error}
                          </p>
                        )}
                      </td>
                      <td className="px-6 py-3 text-xs text-[var(--fg-muted)] hidden sm:table-cell">
                        {m.sent_at
                          ? new Date(m.sent_at).toLocaleString('fr-FR', { hour: '2-digit', minute: '2-digit', day: '2-digit', month: '2-digit' })
                          : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminShell>
  );
}
