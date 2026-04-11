import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

// Twilio status callback (POST)
export async function POST(request: Request) {
  const formData = await request.formData();
  const messageSid = formData.get('MessageSid') as string;
  const messageStatus = formData.get('MessageStatus') as string;
  const errorCode = formData.get('ErrorCode') as string | null;

  if (!messageSid || !messageStatus) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  const mappedStatus = mapTwilioStatus(messageStatus);
  if (!mappedStatus) {
    return new Response('<Response></Response>', {
      status: 200,
      headers: { 'Content-Type': 'text/xml' },
    });
  }

  const db = supabaseAdmin();

  const update: Record<string, string> = { status: mappedStatus };
  if (mappedStatus === 'failed') {
    update.error = errorCode
      ? `Twilio error ${errorCode}`
      : 'SMS delivery failed';
  }

  await db
    .from('campaign_messages')
    .update(update)
    .eq('provider_id', messageSid);

  // Update campaign counters
  const { data: msg } = await db
    .from('campaign_messages')
    .select('campaign_id')
    .eq('provider_id', messageSid)
    .single();

  if (msg) {
    const columnMap: Record<string, string> = {
      delivered: 'delivered_count',
      failed: 'failed_count',
    };
    const column = columnMap[mappedStatus];
    if (column) {
      const { data: campaign } = await db
        .from('campaigns')
        .select(column)
        .eq('id', msg.campaign_id)
        .single<Record<string, number>>();

      if (campaign) {
        await db
          .from('campaigns')
          .update({ [column]: (campaign[column] ?? 0) + 1 })
          .eq('id', msg.campaign_id);
      }
    }
  }

  return new Response('<Response></Response>', {
    status: 200,
    headers: { 'Content-Type': 'text/xml' },
  });
}

const mapTwilioStatus = (s: string): string | null => {
  switch (s) {
    case 'sent':
    case 'queued':
      return 'sent';
    case 'delivered':
      return 'delivered';
    case 'failed':
    case 'undelivered':
      return 'failed';
    default:
      return null;
  }
};
