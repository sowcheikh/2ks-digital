import { notFound } from 'next/navigation';
import { createClient } from '@supabase/supabase-js';
import type { Metadata } from 'next';
import type { BusinessCard } from '@/lib/types';
import PublicCardView from './PublicCardView';

export const dynamic = 'force-dynamic';

export const metadata: Metadata = {
  robots: { index: false, follow: false },
};

const getCard = async (slug: string): Promise<BusinessCard | null> => {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!url || !key) {
    console.error(
      '[carte/[slug]] SUPABASE_SERVICE_ROLE_KEY manquant dans .env. ' +
        'Récupère-le sur Supabase Dashboard → Settings → API Keys → Secret keys.',
    );
    return null;
  }

  const admin = createClient(url, key, {
    auth: { persistSession: false },
  });

  const { data, error } = await admin
    .from('business_cards')
    .select(
      'id, user_id, slug, first_name, last_name, title, email, phone, website_url, avatar_url, socials, theme, created_at, updated_at',
    )
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error('[carte/[slug]] Supabase error:', error.message);
    return null;
  }

  return (data as BusinessCard) ?? null;
};

export default async function PublicCardPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const card = await getCard(slug);

  if (!card) notFound();

  return <PublicCardView card={card} />;
}
