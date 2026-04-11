import { createClient } from '@supabase/supabase-js';
import { sendWhatsAppTemplate, sendWhatsAppText } from './providers/whatsapp';
import { sendSMS } from './providers/twilio-sms';

const supabaseAdmin = () =>
  createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  );

interface Contact {
  id: string;
  name: string;
  phone: string;
}

interface CampaignRow {
  id: string;
  name: string;
  channel: 'whatsapp' | 'sms';
  message: string;
  template_name: string | null;
}

interface MessageRow {
  id: string;
  contact_id: string;
  contact: Contact;
}

const interpolateMessage = (template: string, contact: Contact): string =>
  template
    .replace(/\{\{name\}\}/g, contact.name)
    .replace(/\{\{phone\}\}/g, contact.phone);

export const processCampaign = async (campaignId: string) => {
  const db = supabaseAdmin();

  const { data: campaign } = await db
    .from('campaigns')
    .select('*')
    .eq('id', campaignId)
    .single<CampaignRow>();

  if (!campaign) throw new Error('Campaign not found');

  await db
    .from('campaigns')
    .update({ status: 'sending' })
    .eq('id', campaignId);

  const { data: messages } = await db
    .from('campaign_messages')
    .select('id, contact_id, contact:contacts(id, name, phone)')
    .eq('campaign_id', campaignId)
    .eq('status', 'queued')
    .returns<MessageRow[]>();

  if (!messages || messages.length === 0) {
    await db.from('campaigns').update({ status: 'done' }).eq('id', campaignId);
    return { sent: 0, failed: 0 };
  }

  let sentCount = 0;
  let failedCount = 0;
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://2ksdigital.com';

  for (const msg of messages) {
    const contact = msg.contact;
    if (!contact?.phone) {
      await db
        .from('campaign_messages')
        .update({ status: 'failed', error: 'No phone number' })
        .eq('id', msg.id);
      failedCount++;
      continue;
    }

    const body = interpolateMessage(campaign.message, contact);
    let result: { messageId: string | null; error: string | null };

    if (campaign.channel === 'whatsapp') {
      if (campaign.template_name) {
        result = await sendWhatsAppTemplate({
          to: contact.phone,
          templateName: campaign.template_name,
          bodyParameters: [contact.name],
        });
      } else {
        result = await sendWhatsAppText({ to: contact.phone, text: body });
      }
    } else {
      result = await sendSMS({
        to: contact.phone,
        body,
        statusCallback: `${baseUrl}/api/webhooks/twilio`,
      });
    }

    if (result.error) {
      await db
        .from('campaign_messages')
        .update({ status: 'failed', error: result.error })
        .eq('id', msg.id);
      failedCount++;
    } else {
      await db
        .from('campaign_messages')
        .update({
          status: 'sent',
          provider_id: result.messageId,
          sent_at: new Date().toISOString(),
        })
        .eq('id', msg.id);
      sentCount++;
    }

    // Small delay to respect rate limits
    await new Promise((r) => setTimeout(r, 100));
  }

  await db
    .from('campaigns')
    .update({
      status: 'done',
      sent_count: sentCount,
      failed_count: failedCount,
    })
    .eq('id', campaignId);

  return { sent: sentCount, failed: failedCount };
};
