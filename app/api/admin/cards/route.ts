import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { createServerSupabase } from '@/lib/supabase-server';

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? '')
  .split(',')
  .map((e) => e.trim().toLowerCase())
  .filter(Boolean);

export async function GET() {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const email = (user.email ?? '').toLowerCase();
  if (ADMIN_EMAILS.length > 0 && !ADMIN_EMAILS.includes(email)) {
    return NextResponse.json({ error: 'Accès refusé' }, { status: 403 });
  }

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    return NextResponse.json({ error: 'Configuration manquante' }, { status: 500 });
  }

  const admin = createClient(url, key);
  const { data: cards, error } = await admin
    .from('business_cards')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Récupérer les emails des owners
  const userIds = Array.from(new Set((cards ?? []).map((c) => c.user_id)));
  const emailsMap: Record<string, string> = {};

  if (userIds.length > 0) {
    const { data: profiles } = await admin
      .from('profiles')
      .select('id, email')
      .in('id', userIds);
    profiles?.forEach((p: { id: string; email: string | null }) => {
      if (p.email) emailsMap[p.id] = p.email;
    });
  }

  const enriched = (cards ?? []).map((c) => ({
    ...c,
    owner_email: emailsMap[c.user_id] ?? null,
  }));

  return NextResponse.json({ cards: enriched });
}
