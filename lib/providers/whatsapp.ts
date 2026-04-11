const GRAPH_API = 'https://graph.facebook.com/v21.0';

interface SendTemplateParams {
  to: string;
  templateName: string;
  languageCode?: string;
  bodyParameters?: string[];
}

interface SendTextParams {
  to: string;
  text: string;
}

interface WhatsAppResponse {
  messaging_product: string;
  contacts: { input: string; wa_id: string }[];
  messages: { id: string }[];
}

const headers = () => ({
  Authorization: `Bearer ${process.env.META_WA_TOKEN}`,
  'Content-Type': 'application/json',
});

const phoneNumberId = () => process.env.META_WA_PHONE_ID!;

export const sendWhatsAppTemplate = async ({
  to,
  templateName,
  languageCode = 'fr',
  bodyParameters = [],
}: SendTemplateParams): Promise<{ messageId: string | null; error: string | null }> => {
  try {
    const components =
      bodyParameters.length > 0
        ? [
            {
              type: 'body',
              parameters: bodyParameters.map((p) => ({ type: 'text', text: p })),
            },
          ]
        : [];

    const res = await fetch(`${GRAPH_API}/${phoneNumberId()}/messages`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'template',
        template: {
          name: templateName,
          language: { code: languageCode },
          ...(components.length > 0 && { components }),
        },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        messageId: null,
        error: err?.error?.message ?? `HTTP ${res.status}`,
      };
    }

    const data: WhatsAppResponse = await res.json();
    return { messageId: data.messages?.[0]?.id ?? null, error: null };
  } catch (e) {
    return { messageId: null, error: (e as Error).message };
  }
};

export const sendWhatsAppText = async ({
  to,
  text,
}: SendTextParams): Promise<{ messageId: string | null; error: string | null }> => {
  try {
    const res = await fetch(`${GRAPH_API}/${phoneNumberId()}/messages`, {
      method: 'POST',
      headers: headers(),
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to,
        type: 'text',
        text: { preview_url: false, body: text },
      }),
    });

    if (!res.ok) {
      const err = await res.json();
      return {
        messageId: null,
        error: err?.error?.message ?? `HTTP ${res.status}`,
      };
    }

    const data: WhatsAppResponse = await res.json();
    return { messageId: data.messages?.[0]?.id ?? null, error: null };
  } catch (e) {
    return { messageId: null, error: (e as Error).message };
  }
};
