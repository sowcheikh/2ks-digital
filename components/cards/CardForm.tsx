'use client';

import { useState } from 'react';
import {
  User,
  Mail,
  Phone,
  Globe,
  Image as ImageIcon,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
  Loader2,
  Check,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import type { BusinessCard, CardSocials } from '@/lib/types';
import BusinessCardVisual from './BusinessCardVisual';

export interface CardFormValues {
  first_name: string;
  last_name: string;
  title: string;
  email: string;
  phone: string;
  website_url: string;
  avatar_url: string;
  socials: CardSocials;
}

interface Props {
  initial?: Partial<BusinessCard>;
  submitLabel: string;
  onSubmit: (values: CardFormValues) => Promise<{ error: string | null }>;
}

export default function CardForm({ initial, submitLabel, onSubmit }: Props) {
  const [values, setValues] = useState<CardFormValues>({
    first_name: initial?.first_name ?? '',
    last_name: initial?.last_name ?? '',
    title: initial?.title ?? '',
    email: initial?.email ?? '',
    phone: initial?.phone ?? '',
    website_url: initial?.website_url ?? '',
    avatar_url: initial?.avatar_url ?? '',
    socials: initial?.socials ?? {},
  });
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; msg: string } | null>(null);

  const setField = <K extends keyof CardFormValues>(key: K, v: CardFormValues[K]) =>
    setValues((prev) => ({ ...prev, [key]: v }));

  const setSocial = (key: keyof CardSocials, v: string) =>
    setValues((prev) => ({ ...prev, socials: { ...prev.socials, [key]: v } }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback(null);

    const { error } = await onSubmit(values);
    if (error) {
      setFeedback({ type: 'error', msg: error });
    } else {
      setFeedback({ type: 'success', msg: 'Carte enregistrée.' });
    }
    setSubmitting(false);
  };

  const inputClass =
    'w-full pl-10 pr-4 py-2.5 rounded-xl text-sm bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f] text-[var(--fg)] placeholder-[var(--fg-muted)] focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all';

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* FORM */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-6">
        {feedback && (
          <div
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium ${
              feedback.type === 'success'
                ? 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-400'
                : 'bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-400'
            }`}
          >
            {feedback.type === 'success' ? <Check size={16} /> : <AlertCircle size={16} />}
            {feedback.msg}
          </div>
        )}

        {/* Identity */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-[var(--fg)] uppercase tracking-widest">
            Identité
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <IconInput
              icon={<User size={16} />}
              type="text"
              placeholder="Prénom *"
              value={values.first_name}
              onChange={(v) => setField('first_name', v)}
              required
              className={inputClass}
            />
            <IconInput
              icon={<User size={16} />}
              type="text"
              placeholder="Nom *"
              value={values.last_name}
              onChange={(v) => setField('last_name', v)}
              required
              className={inputClass}
            />
          </div>

          <IconInput
            icon={<Briefcase size={16} />}
            type="text"
            placeholder="Titre / métier (ex : Développeur Web)"
            value={values.title}
            onChange={(v) => setField('title', v)}
            className={inputClass}
          />

          <IconInput
            icon={<ImageIcon size={16} />}
            type="url"
            placeholder="URL du logo / photo de profil"
            value={values.avatar_url}
            onChange={(v) => setField('avatar_url', v)}
            className={inputClass}
          />
          <p className="text-[11px] text-[var(--fg-muted)] -mt-2">
            Copiez l&apos;URL d&apos;une image en ligne (carré recommandé, PNG/JPG).
          </p>
        </div>

        {/* Contact */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-[var(--fg)] uppercase tracking-widest">
            Contact
          </h2>

          <IconInput
            icon={<Mail size={16} />}
            type="email"
            placeholder="Email"
            value={values.email}
            onChange={(v) => setField('email', v)}
            className={inputClass}
          />

          <IconInput
            icon={<Phone size={16} />}
            type="tel"
            placeholder="Téléphone (ex : +221 77 123 45 67)"
            value={values.phone}
            onChange={(v) => setField('phone', v)}
            className={inputClass}
          />

          <IconInput
            icon={<Globe size={16} />}
            type="url"
            placeholder="Site web (optionnel)"
            value={values.website_url}
            onChange={(v) => setField('website_url', v)}
            className={inputClass}
          />
        </div>

        {/* Socials */}
        <div className="bg-white dark:bg-[#071428] border border-gray-200 dark:border-[#1e3a5f]
          rounded-2xl p-5 flex flex-col gap-4">
          <h2 className="text-sm font-bold text-[var(--fg)] uppercase tracking-widest">
            Réseaux sociaux
          </h2>

          <IconInput
            icon={<MessageCircle size={16} />}
            type="tel"
            placeholder="WhatsApp (ex : +221771234567)"
            value={values.socials.whatsapp ?? ''}
            onChange={(v) => setSocial('whatsapp', v)}
            className={inputClass}
          />
          <IconInput
            icon={<Linkedin size={16} />}
            type="url"
            placeholder="URL LinkedIn"
            value={values.socials.linkedin ?? ''}
            onChange={(v) => setSocial('linkedin', v)}
            className={inputClass}
          />
          <IconInput
            icon={<Instagram size={16} />}
            type="url"
            placeholder="URL Instagram"
            value={values.socials.instagram ?? ''}
            onChange={(v) => setSocial('instagram', v)}
            className={inputClass}
          />
          <IconInput
            icon={<span className="text-xs font-black">TT</span>}
            type="url"
            placeholder="URL TikTok"
            value={values.socials.tiktok ?? ''}
            onChange={(v) => setSocial('tiktok', v)}
            className={inputClass}
          />
          <IconInput
            icon={<Facebook size={16} />}
            type="url"
            placeholder="URL Facebook"
            value={values.socials.facebook ?? ''}
            onChange={(v) => setSocial('facebook', v)}
            className={inputClass}
          />
          <IconInput
            icon={<span className="text-xs font-black">SC</span>}
            type="url"
            placeholder="URL Snapchat"
            value={values.socials.snapchat ?? ''}
            onChange={(v) => setSocial('snapchat', v)}
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
            font-bold text-white bg-[#E31837] hover:bg-[#c41530]
            disabled:opacity-60 transition-colors"
        >
          {submitting ? <Loader2 size={16} className="animate-spin" /> : <Check size={16} />}
          {submitLabel}
        </button>
      </form>

      {/* PREVIEW */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-4 text-center">
          Aperçu en direct
        </p>
        <BusinessCardVisual
          card={{
            first_name: values.first_name || 'Prénom',
            last_name: values.last_name || 'Nom',
            title: values.title || null,
            email: values.email || null,
            phone: values.phone || null,
            website_url: values.website_url || null,
            avatar_url: values.avatar_url || null,
            socials: values.socials,
          }}
        />
      </div>
    </div>
  );
}

function IconInput({
  icon,
  className,
  onChange,
  ...rest
}: {
  icon: React.ReactNode;
  className?: string;
  onChange: (v: string) => void;
} & Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'>) {
  return (
    <div className="relative">
      <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--fg-muted)]">
        {icon}
      </span>
      <input
        {...rest}
        className={className}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
