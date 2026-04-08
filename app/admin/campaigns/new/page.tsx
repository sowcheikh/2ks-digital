'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowLeft,
  MessageCircle,
  Smartphone,
  Users,
  Send,
  Loader2,
  CheckCircle2,
  AlertCircle,
} from 'lucide-react';
import Link from 'next/link';
import AdminShell from '@/components/admin/AdminShell';
import { createClient } from '@/lib/supabase-client';
import type { Contact } from '@/lib/types';

export default function NewCampaignPage() {
  const router = useRouter();
  const supabase = createClient();

  const [name, setName] = useState('');
  const [channel, setChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [message, setMessage] = useState('');
  const [templateName, setTemplateName] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const [contacts, setContacts] = useState<Contact[]>([]);
  const [availableTags, setAvailableTags] = useState<string[]>([]);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  useEffect(() => {
    const fetchContacts = async () => {
      const { data } = await supabase
        .from('contacts')
        .select('*')
        .eq('opt_in', true)
        .is('opted_out_at', null);
      const list = data ?? [];
      setContacts(list);

      const allTags = new Set<string>();
      list.forEach((c) => (c.tags ?? []).forEach((t: string) => allTags.add(t)));
      setAvailableTags([...allTags].sort());
    };
    fetchContacts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const filteredContacts =
    selectedTags.length === 0
      ? contacts
      : contacts.filter((c) => (c.tags ?? []).some((t) => selectedTags.includes(t)));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !message.trim() || filteredContacts.length === 0) return;
    setSaving(true);

    const { data: campaign, error } = await supabase
      .from('campaigns')
      .insert({
        name: name.trim(),
        channel,
        message: message.trim(),
        template_name: templateName.trim() || null,
        status: 'draft',
        sent_count: 0,
        delivered_count: 0,
        read_count: 0,
        failed_count: 0,
      })
      .select()
      .single();

    if (error || !campaign) {
      setToast({ type: 'error', message: error?.message ?? 'Erreur lors de la création.' });
      setSaving(false);
      return;
    }

    const messages = filteredContacts.map((c) => ({
      campaign_id: campaign.id,
      contact_id: c.id,
      status: 'queued',
    }));

    const { error: msgError } = await supabase.from('campaign_messages').insert(messages);
    if (msgError) {
      setToast({ type: 'error', message: msgError.message });
      setSaving(false);
      return;
    }

    router.push(`/admin/campaigns/${campaign.id}`);
  };

  const toggleTag = (tag: string) => {
    setSelectedTags((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag],
    );
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent transition-all duration-200';

  return (
    <AdminShell>
      <div className="max-w-3xl mx-auto">
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

        <div className="flex items-center gap-3 mb-8">
          <Link
            href="/admin/campaigns"
            className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-[#0c1d3a] transition-colors"
          >
            <ArrowLeft size={18} className="text-[var(--fg-muted)]" />
          </Link>
          <div>
            <h1 className="text-2xl font-black text-[var(--fg)]">Nouvelle campagne</h1>
            <p className="text-sm text-[var(--fg-muted)] mt-0.5">
              Créez un brouillon puis envoyez quand vous êtes prêt.
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          {/* Name */}
          <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
            rounded-2xl p-6">
            <h2 className="font-bold text-[var(--fg)] mb-4">Informations</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className="text-xs font-semibold text-[var(--fg-muted)] mb-1.5 block">
                  Nom de la campagne *
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Promo Mars 2026"
                  required
                  className={inputClass}
                />
              </div>

              {/* Channel selector */}
              <div>
                <label className="text-xs font-semibold text-[var(--fg-muted)] mb-2 block">
                  Canal *
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setChannel('whatsapp')}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-semibold
                      transition-all duration-200 ${
                        channel === 'whatsapp'
                          ? 'border-[#25d366] bg-[#25d366]/10 text-[#25d366]'
                          : 'border-gray-200 dark:border-[#1e3a5f] text-[var(--fg-muted)] hover:bg-gray-50 dark:hover:bg-[#0c1d3a]'
                      }`}
                  >
                    <MessageCircle size={18} />
                    WhatsApp
                  </button>
                  <button
                    type="button"
                    onClick={() => setChannel('sms')}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl border text-sm font-semibold
                      transition-all duration-200 ${
                        channel === 'sms'
                          ? 'border-[#E31837] bg-[#E31837]/10 text-[#E31837]'
                          : 'border-gray-200 dark:border-[#1e3a5f] text-[var(--fg-muted)] hover:bg-gray-50 dark:hover:bg-[#0c1d3a]'
                      }`}
                  >
                    <Smartphone size={18} />
                    SMS
                  </button>
                </div>
              </div>

              {channel === 'whatsapp' && (
                <div>
                  <label className="text-xs font-semibold text-[var(--fg-muted)] mb-1.5 block">
                    Nom du template (optionnel)
                  </label>
                  <input
                    type="text"
                    value={templateName}
                    onChange={(e) => setTemplateName(e.target.value)}
                    placeholder="promo_mars_2026"
                    className={inputClass}
                  />
                  <p className="text-[10px] text-[var(--fg-muted)] mt-1">
                    Template approuvé dans Meta Business Manager.
                  </p>
                </div>
              )}

              <div>
                <label className="text-xs font-semibold text-[var(--fg-muted)] mb-1.5 block">
                  Message *
                </label>
                <textarea
                  rows={5}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Bonjour {{name}}, découvrez notre offre…"
                  required
                  className={`${inputClass} resize-none`}
                />
                <p className="text-[10px] text-[var(--fg-muted)] mt-1">
                  Variables disponibles : {'{{name}}'}, {'{{phone}}'}
                </p>
              </div>
            </div>
          </div>

          {/* Audience */}
          <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
            rounded-2xl p-6">
            <h2 className="font-bold text-[var(--fg)] mb-4">Audience</h2>

            {availableTags.length > 0 && (
              <div className="mb-4">
                <label className="text-xs font-semibold text-[var(--fg-muted)] mb-2 block">
                  Filtrer par tags
                </label>
                <div className="flex flex-wrap gap-2">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => toggleTag(tag)}
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold transition-all duration-200
                        border ${
                          selectedTags.includes(tag)
                            ? 'bg-[#002B5C] text-white border-[#002B5C]'
                            : 'bg-transparent text-[var(--fg-muted)] border-gray-200 dark:border-[#1e3a5f] hover:border-[#002B5C]'
                        }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-[#002B5C]/5 dark:bg-[#002B5C]/20">
              <Users size={16} className="text-[#002B5C] dark:text-blue-400" />
              <span className="text-sm font-semibold text-[var(--fg)]">
                {filteredContacts.length} contact{filteredContacts.length !== 1 ? 's' : ''} ciblé{filteredContacts.length !== 1 ? 's' : ''}
              </span>
              {selectedTags.length > 0 && (
                <button
                  type="button"
                  onClick={() => setSelectedTags([])}
                  className="ml-auto text-xs text-[#E31837] hover:underline"
                >
                  Réinitialiser
                </button>
              )}
            </div>
          </div>

          {/* Submit */}
          <div className="flex justify-end gap-3">
            <Link
              href="/admin/campaigns"
              className="px-5 py-3 rounded-xl text-sm font-semibold text-[var(--fg-muted)]
                border border-gray-200 dark:border-[#1e3a5f] hover:bg-gray-50
                dark:hover:bg-[#0c1d3a] transition-colors"
            >
              Annuler
            </Link>
            <button
              type="submit"
              disabled={saving || !name.trim() || !message.trim() || filteredContacts.length === 0}
              className="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-bold
                bg-[#002B5C] text-white hover:bg-[#003d80] disabled:opacity-50
                disabled:cursor-not-allowed transition-colors"
            >
              {saving ? (
                <Loader2 size={16} className="animate-spin" />
              ) : (
                <Send size={16} />
              )}
              Créer la campagne
            </button>
          </div>
        </form>
      </div>
    </AdminShell>
  );
}
