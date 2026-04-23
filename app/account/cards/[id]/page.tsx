'use client';

import { useEffect, useState, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  Download,
  Share2,
  Trash2,
  Loader2,
  Link2,
  Check,
} from 'lucide-react';
import { toPng } from 'html-to-image';
import AccountShell from '@/components/account/AccountShell';
import CardForm, { type CardFormValues } from '@/components/cards/CardForm';
import BusinessCardVisual from '@/components/cards/BusinessCardVisual';
import { createClient } from '@/lib/supabase-client';
import type { BusinessCard } from '@/lib/types';

export default function EditCardPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const supabase = createClient();
  const cardId = params.id;

  const [card, setCard] = useState<BusinessCard | null>(null);
  const [loading, setLoading] = useState(true);
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);

    const fetchCard = async () => {
      const { data } = await supabase
        .from('business_cards')
        .select('*')
        .eq('id', cardId)
        .single();
      setCard(data as BusinessCard | null);
      setLoading(false);
    };
    fetchCard();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cardId]);

  const publicUrl = card ? `${origin}/carte/${card.slug}` : '';

  const handleSubmit = async (values: CardFormValues) => {
    const res = await fetch(`/api/cards/${cardId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) return { error: data.error ?? 'Erreur inconnue.' };
    setCard(data.card as BusinessCard);
    return { error: null };
  };

  const handleDelete = async () => {
    if (!confirm('Supprimer cette carte ? Cette action est irréversible.')) return;
    setDeleting(true);
    const res = await fetch(`/api/cards/${cardId}`, { method: 'DELETE' });
    if (res.ok) {
      router.push('/account');
    } else {
      setDeleting(false);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (!card) return;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `Carte de ${card.first_name} ${card.last_name}`,
          url: publicUrl,
        });
      } catch {
        // cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: '#001a3a',
    });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `carte-${card?.slug ?? 'visite'}.png`;
    a.click();
  };

  if (loading) {
    return (
      <AccountShell>
        <div className="flex items-center justify-center py-24">
          <Loader2 className="animate-spin text-[var(--fg-muted)]" />
        </div>
      </AccountShell>
    );
  }

  if (!card) {
    return (
      <AccountShell>
        <div className="max-w-xl mx-auto text-center py-16">
          <p className="text-[var(--fg-muted)] mb-4">Carte introuvable.</p>
          <Link
            href="/account"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[#E31837] text-white text-sm font-bold"
          >
            Retour à mes cartes
          </Link>
        </div>
      </AccountShell>
    );
  }

  return (
    <AccountShell>
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
          <Link
            href="/account"
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)]
              hover:text-[var(--fg)]"
          >
            <ArrowLeft size={14} />
            Retour à mes cartes
          </Link>

          <button
            onClick={handleDelete}
            disabled={deleting}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-red-500
              hover:text-red-600 transition-colors"
          >
            {deleting ? <Loader2 size={13} className="animate-spin" /> : <Trash2 size={13} />}
            Supprimer
          </button>
        </div>

        <h1 className="text-2xl font-black text-[var(--fg)]">
          {card.first_name} {card.last_name}
        </h1>
        <p className="text-sm text-[var(--fg-muted)] mb-6">
          Éditez votre carte, l&apos;aperçu se met à jour automatiquement.
        </p>

        {/* Share bar */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl p-4 mb-8 flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2 flex-1 min-w-[200px]">
            <Link2 size={14} className="text-[var(--fg-muted)]" />
            <code className="text-xs text-[var(--fg)] truncate">{publicUrl}</code>
          </div>
          <div className="flex gap-2 flex-wrap">
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                bg-gray-100 dark:bg-[#0c1d3a] text-[var(--fg)] hover:bg-gray-200 dark:hover:bg-[#1e3a5f]
                transition-colors"
            >
              {copied ? <Check size={12} /> : <Link2 size={12} />}
              {copied ? 'Copié' : 'Copier'}
            </button>
            <button
              onClick={handleShare}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors"
            >
              <Share2 size={12} />
              Partager
            </button>
            <button
              onClick={handleDownload}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold
                bg-[#E31837] text-white hover:bg-[#c41530] transition-colors"
            >
              <Download size={12} />
              Télécharger
            </button>
          </div>
        </div>

        {/* Hidden export version (full colored bg) */}
        <div className="absolute -left-[9999px] top-0 pointer-events-none" aria-hidden>
          <div ref={cardRef} className="p-6 bg-[#001a3a]">
            <BusinessCardVisual card={card} publicUrl={publicUrl} forExport />
          </div>
        </div>

        <CardForm
          initial={card}
          submitLabel="Enregistrer les modifications"
          onSubmit={handleSubmit}
        />
      </div>
    </AccountShell>
  );
}
