import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';
import { generateCardSlug } from '@/lib/slug';

const MAX_CARDS_FREE = 3;

export async function POST(request: Request) {
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  const body = await request.json();

  const firstName = (body.first_name ?? '').trim();
  const lastName = (body.last_name ?? '').trim();

  if (!firstName || !lastName) {
    return NextResponse.json(
      { error: 'Prénom et nom requis.' },
      { status: 400 },
    );
  }

  // Limite (MVP) : 3 cartes par user si pas premium
  const { data: profile } = await supabase
    .from('profiles')
    .select('is_premium')
    .eq('id', user.id)
    .single<{ is_premium: boolean }>();

  const { count } = await supabase
    .from('business_cards')
    .select('id', { count: 'exact', head: true })
    .eq('user_id', user.id);

  if (!profile?.is_premium && (count ?? 0) >= MAX_CARDS_FREE) {
    return NextResponse.json(
      {
        error: `Limite de ${MAX_CARDS_FREE} cartes atteinte. Passez à la version premium pour en créer plus.`,
      },
      { status: 403 },
    );
  }

  // Générer un slug unique
  let slug = generateCardSlug(firstName, lastName);
  for (let i = 0; i < 5; i++) {
    const { data: exists } = await supabase
      .from('business_cards')
      .select('id')
      .eq('slug', slug)
      .maybeSingle();
    if (!exists) break;
    slug = generateCardSlug(firstName, lastName);
  }

  const { data: card, error } = await supabase
    .from('business_cards')
    .insert({
      user_id: user.id,
      slug,
      first_name: firstName,
      last_name: lastName,
      title: body.title?.trim() || null,
      email: body.email?.trim() || null,
      phone: body.phone?.trim() || null,
      website_url: body.website_url?.trim() || null,
      avatar_url: body.avatar_url?.trim() || null,
      socials: body.socials ?? {},
      theme: body.theme ?? 'default',
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ card });
}
