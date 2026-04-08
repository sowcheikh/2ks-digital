export interface Contact {
  id: string;
  name: string;
  phone: string;
  tags: string[];
  opt_in: boolean;
  opted_out_at: string | null;
  created_at: string;
}

export interface Campaign {
  id: string;
  name: string;
  channel: 'whatsapp' | 'sms';
  message: string;
  template_name: string | null;
  status: 'draft' | 'scheduled' | 'sending' | 'done' | 'cancelled';
  scheduled_at: string | null;
  sent_count: number;
  delivered_count: number;
  read_count: number;
  failed_count: number;
  created_at: string;
}

export interface CampaignMessage {
  id: string;
  campaign_id: string;
  contact_id: string;
  status: 'queued' | 'sent' | 'delivered' | 'read' | 'failed';
  provider_id: string | null;
  error: string | null;
  sent_at: string | null;
  contact?: Contact;
}
