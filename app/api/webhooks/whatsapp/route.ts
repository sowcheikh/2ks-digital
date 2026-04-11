import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

// Meta Webhook verification (GET)
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const mode = searchParams.get('hub.mode');
  const token = searchParams.get('hub.verify_token');
  const challenge = searchParams.get('hub.challenge');

  if (mode === 'subscribe' && token === process.env.META_WA_VERIFY_TOKEN) {
    return new Response(challenge, { status: 200 });
  }

  return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
}

// Status updates (POST)
export async function POST(request: Request) {
  const body = await request.json();

  const entries = body?.entry ?? [];
  const db = supabaseAdmin();

  for (const entry of entries) {
    const changes = entry?.changes ?? [];
    for (const change of changes) {
      const statuses = change?.value?.statuses ?? [];

      for (const status of statuses) {
        const waMessageId = status.id;
        const waStatus = status.status; // sent, delivered, read, failed

        const mappedStatus = mapStatus(waStatus);
        if (!mappedStatus) continue;

        const update: Record<string, string> = { status: mappedStatus };
        if (mappedStatus === 'failed') {
          update.error =
            status.errors?.[0]?.title ?? 'WhatsApp delivery failed';
        }

        await db
          .from('campaign_messages')
          .update(update)
          .eq('provider_id', waMessageId);

        // Update campaign counters
        await updateCampaignCounters(db, waMessageId, mappedStatus);
      }
    }
  }

  return NextResponse.json({ success: true });
}

const mapStatus = (waStatus: string): string | null => {
  switch (waStatus) {
    case 'sent': return 'sent';
    case 'delivered': return 'delivered';
    case 'read': return 'read';
    case 'failed': return 'failed';
    default: return null;
  }
};

const updateCampaignCounters = async (
  db: ReturnType<typeof supabaseAdmin>,
  providerId: string,
  status: string,
) => {
  const { data: msg } = await db
    .from('campaign_messages')
    .select('campaign_id')
    .eq('provider_id', providerId)
    .single();

  if (!msg) return;

  const columnMap: Record<string, string> = {
    delivered: 'delivered_count',
    read: 'read_count',
    failed: 'failed_count',
  };

  const column = columnMap[status];
  if (!column) return;

  const { data: campaign } = await db
    .from('campaigns')
    .select(column)
    .eq('id', msg.campaign_id)
    .single<Record<string, number>>();

  if (!campaign) return;

  await db
    .from('campaigns')
    .update({ [column]: (campaign[column] ?? 0) + 1 })
    .eq('id', msg.campaign_id);
};
