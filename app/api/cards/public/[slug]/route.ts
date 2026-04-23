import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const SERVICE_ROLE = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> },
) {
  const { slug } = await params;

  if (!SUPABASE_URL || !SERVICE_ROLE) {
    return NextResponse.json(
      { error: 'Configuration manquante' },
      { status: 500 },
    );
  }

  const admin = createClient(SUPABASE_URL, SERVICE_ROLE);

  const { data, error } = await admin
    .from('business_cards')
    .select(
      'id, slug, first_name, last_name, title, email, phone, website_url, avatar_url, socials, theme',
    )
    .eq('slug', slug)
    .single();

  if (error || !data) {
    return NextResponse.json({ error: 'Carte introuvable' }, { status: 404 });
  }

  return NextResponse.json({ card: data });
}
