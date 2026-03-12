import { NextResponse } from 'next/server';
import { Resend } from 'resend';

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

export async function POST(request: Request) {
  try {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'Service email non configuré.' },
        { status: 503 },
      );
    }

    const resend = new Resend(apiKey);
    const body: ContactPayload = await request.json();
    const { name, email, message } = body;

    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Tous les champs sont requis.' },
        { status: 400 },
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Adresse email invalide.' },
        { status: 400 },
      );
    }

    await resend.emails.send({
      // Avant vérification domaine → utilise onboarding@resend.dev (sandbox Resend)
      // Après vérification de 2ksdigital.com sur resend.com → remplace par :
      // from: 'Contact 2ks digital <contact@2ksdigital.com>',
      from: 'Contact 2ks digital <onboarding@resend.dev>',
      to: 'contact@2ksdigital.com',
      replyTo: email,
      subject: `[2ks digital] Nouveau message de ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; background: #f9fafb; border-radius: 12px;">
          <div style="background: #002B5C; color: white; padding: 20px 24px; border-radius: 8px 8px 0 0;">
            <h1 style="margin: 0; font-size: 20px;">Nouveau message – 2ks digital</h1>
          </div>
          <div style="background: white; padding: 24px; border-radius: 0 0 8px 8px; border: 1px solid #e5e7eb;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px; width: 80px;">Nom</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111827;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px;">Email</td>
                <td style="padding: 10px 0; font-weight: 600; color: #111827;">
                  <a href="mailto:${email}" style="color: #E31837;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; color: #6b7280; font-size: 13px; vertical-align: top;">Message</td>
                <td style="padding: 10px 0; color: #374151; line-height: 1.6;">
                  ${message.replace(/\n/g, '<br />')}
                </td>
              </tr>
            </table>
          </div>
          <p style="text-align: center; color: #9ca3af; font-size: 12px; margin-top: 16px;">
            2ks digital · Dakar, Sénégal · contact@2ksdigital.com
          </p>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { error: "Une erreur est survenue. Veuillez réessayer." },
      { status: 500 },
    );
  }
}
