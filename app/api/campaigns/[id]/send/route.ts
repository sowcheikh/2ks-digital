import { NextResponse } from 'next/server';
import { createServerSupabase } from '@/lib/supabase-server';
import { processCampaign } from '@/lib/campaign-sender';

export async function POST(
  _request: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  // Auth check
  const supabase = await createServerSupabase();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Non autorisé' }, { status: 401 });
  }

  // Verify campaign exists and is draft
  const { data: campaign } = await supabase
    .from('campaigns')
    .select('id, status')
    .eq('id', id)
    .single();

  if (!campaign) {
    return NextResponse.json({ error: 'Campagne introuvable' }, { status: 404 });
  }

  if (campaign.status !== 'draft') {
    return NextResponse.json(
      { error: `Campagne déjà en statut "${campaign.status}"` },
      { status: 400 },
    );
  }

  try {
    const result = await processCampaign(id);
    return NextResponse.json({
      success: true,
      sent: result.sent,
      failed: result.failed,
    });
  } catch (e) {
    return NextResponse.json(
      { error: (e as Error).message },
      { status: 500 },
    );
  }
}
