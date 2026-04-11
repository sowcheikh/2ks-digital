import twilio from 'twilio';

const getClient = () =>
  twilio(process.env.TWILIO_ACCOUNT_SID!, process.env.TWILIO_AUTH_TOKEN!);

interface SendSMSParams {
  to: string;
  body: string;
  statusCallback?: string;
}

export const sendSMS = async ({
  to,
  body,
  statusCallback,
}: SendSMSParams): Promise<{ messageId: string | null; error: string | null }> => {
  try {
    const client = getClient();
    const message = await client.messages.create({
      to,
      from: process.env.TWILIO_PHONE_NUMBER!,
      body,
      ...(statusCallback && { statusCallback }),
    });

    return { messageId: message.sid, error: null };
  } catch (e) {
    return { messageId: null, error: (e as Error).message };
  }
};
