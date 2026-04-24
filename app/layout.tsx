import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import ThemeProvider from '@/components/ThemeProvider';
import PublicShell from '@/components/PublicShell';

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] });
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] });

export const metadata: Metadata = {
  metadataBase: new URL('https://2ksdigital.com'),
  title: {
    default: '2ks digital – Agence Web & Mobile à Dakar',
    template: '%s | 2ks digital',
  },
  description:
    '2ks digital est une agence digitale basée à Dakar, Sénégal. Nous créons des expériences web & mobile modernes, performantes et orientées conversion pour clients locaux et internationaux.',
  keywords: [
    'agence digitale Dakar',
    'développement web Sénégal',
    'Next.js',
    'React',
    'Node.js',
    'application mobile',
    '2ks digital',
    'Cheikh Sow',
  ],
  authors: [{ name: 'Cheikh Sow', url: 'https://cheikhsow.netlify.app' }],
  creator: 'Cheikh Sow',
  openGraph: {
    type: 'website',
    locale: 'fr_SN',
    url: 'https://2ksdigital.com',
    siteName: '2ks digital',
    title: '2ks digital – Agence Web & Mobile',
    description:
      '2ks digital crée des expériences digitales modernes pour clients locaux et internationaux.',
    images: [{ url: '/og-image.png', width: 1200, height: 630 }],
  },
  twitter: {
    card: 'summary_large_image',
    title: '2ks digital – Agence Web & Mobile',
    description:
      '2ks digital crée des expériences digitales modernes pour clients locaux et internationaux.',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true },
  },
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: '2ks digital',
  url: 'https://2ksdigital.com',
  logo: 'https://2ksdigital.com/logo.png',
  foundingDate: '2023',
  founder: {
    '@type': 'Person',
    name: 'Cheikh Sow',
    url: 'https://cheikhsow.netlify.app',
  },
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'Dakar',
    addressCountry: 'SN',
  },
  contactPoint: [
    {
      '@type': 'ContactPoint',
      email: 'contact@2ksdigital.com',
      telephone: '+221771384209',
      contactType: 'customer support',
      availableLanguage: ['French', 'English'],
    },
  ],
  sameAs: ['https://cheikhsow.netlify.app'],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const plausibleDomain =
    process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN ?? '2ksdigital.com';
  const plausibleApiHost =
    process.env.NEXT_PUBLIC_PLAUSIBLE_API_HOST ?? 'https://plausible.io';

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* Prevent theme flash */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t==='dark'||(t===null&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.classList.add('dark')}}catch(e){}})()`,
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        {/* Plausible Analytics (privacy-friendly) */}
        <Script
          defer
          data-domain={plausibleDomain}
          src={`${plausibleApiHost}/js/script.js`}
          strategy="afterInteractive"
        />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider>
          <PublicShell>{children}</PublicShell>
        </ThemeProvider>
      </body>
    </html>
  );
}
