'use client';

import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';
import AccountShell from '@/components/account/AccountShell';
import CardForm, { type CardFormValues } from '@/components/cards/CardForm';

export default function NewCardPage() {
  const router = useRouter();

  const handleSubmit = async (values: CardFormValues) => {
    const res = await fetch('/api/cards', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(values),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error ?? 'Erreur inconnue.' };
    }
    router.push(`/account/cards/${data.card.id}`);
    return { error: null };
  };

  return (
    <AccountShell>
      <div className="max-w-6xl mx-auto">
        <Link
          href="/account"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-[var(--fg-muted)]
            hover:text-[var(--fg)] mb-4"
        >
          <ArrowLeft size={14} />
          Retour à mes cartes
        </Link>
        <h1 className="text-2xl font-black text-[var(--fg)] mb-2">Créer une carte</h1>
        <p className="text-sm text-[var(--fg-muted)] mb-8">
          Remplissez les champs, l&apos;aperçu se met à jour en direct.
        </p>

        <CardForm submitLabel="Créer ma carte" onSubmit={handleSubmit} />
      </div>
    </AccountShell>
  );
}
