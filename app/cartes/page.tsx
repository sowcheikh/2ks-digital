'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  QrCode,
  Share2,
  Download,
  Palette,
  Zap,
  Smartphone,
  ArrowRight,
  Sparkles,
} from 'lucide-react';
import BusinessCardVisual from '@/components/cards/BusinessCardVisual';
import { track } from '@/lib/plausible';

const features = [
  {
    icon: Zap,
    title: 'Création en 2 minutes',
    desc: 'Remplissez le formulaire, votre carte est prête instantanément.',
  },
  {
    icon: QrCode,
    title: 'QR Code intégré',
    desc: 'Chaque carte contient un QR code qui pointe vers votre URL.',
  },
  {
    icon: Share2,
    title: 'Partage universel',
    desc: 'WhatsApp, LinkedIn, email, SMS… un seul lien partout.',
  },
  {
    icon: Download,
    title: 'Téléchargeable',
    desc: 'Enregistrez votre carte au format image pour l&apos;envoyer.',
  },
  {
    icon: Palette,
    title: 'Design premium',
    desc: 'Un rendu moderne et élégant qui vous démarque.',
  },
  {
    icon: Smartphone,
    title: 'Mobile first',
    desc: 'Optimisée pour smartphone, parfaite pour le networking.',
  },
];

const steps = [
  { n: '01', title: 'Créez un compte', desc: 'Email + mot de passe, 30 secondes.' },
  { n: '02', title: 'Remplissez le formulaire', desc: 'Nom, contact, réseaux sociaux, logo.' },
  { n: '03', title: 'Partagez votre carte', desc: 'Copiez le lien ou téléchargez l&apos;image.' },
];

const demoCard = {
  first_name: 'Cheikh',
  last_name: 'Sow',
  title: 'Fondateur 2ks digital',
  email: 'contact@2ksdigital.com',
  phone: '+221 77 000 00 00',
  website_url: 'https://2ksdigital.com',
  avatar_url: null,
  socials: {
    linkedin: 'https://linkedin.com/in/cheikhsow',
    whatsapp: '221770000000',
    instagram: 'https://instagram.com/2ksdigital',
  },
};

export default function CartesLandingPage() {
  return (
    <>
      {/* Hero */}
      <section className="relative gradient-hero pt-32 pb-20 overflow-hidden">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full
              bg-white/10 border border-white/20 text-xs font-bold text-white mb-6">
              <Sparkles size={12} className="text-[#E31837]" />
              NOUVEAU
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              Votre carte de visite
              <br />
              <span className="text-[#E31837]">100 % numérique.</span>
            </h1>
            <p className="text-lg text-white/70 mb-8 max-w-lg">
              Créez votre carte de visite en ligne en 2 minutes, partagez-la
              par QR code ou lien, et téléchargez-la en image. Gratuit jusqu&apos;à 3 cartes.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link
                href="/account/signup"
                onClick={() => track('ClickSignup', { from: '/cartes' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
                  bg-[#E31837] hover:bg-[#c41530] text-white font-bold text-sm transition-colors"
              >
                Créer ma carte gratuite
                <ArrowRight size={16} />
              </Link>
              <Link
                href="/account/login"
                onClick={() => track('ClickLogin', { from: '/cartes' })}
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full
                  bg-white/10 hover:bg-white/20 border border-white/20 text-white font-bold text-sm transition-colors"
              >
                J&apos;ai déjà un compte
              </Link>
            </div>

            <div className="flex items-center gap-6 mt-8 text-xs text-white/60">
              <div>✓ 3 cartes gratuites</div>
              <div>✓ Sans carte bancaire</div>
              <div>✓ Partage illimité</div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="absolute inset-0 bg-[#E31837] blur-3xl opacity-20 rounded-full" />
            <div className="relative">
              <BusinessCardVisual card={demoCard} publicUrl="https://2ksdigital.com/carte/demo" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E31837] mb-2">
              Pourquoi choisir cette carte
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">
              Simple, rapide, efficace.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {features.map((f, i) => {
              const Icon = f.icon;
              return (
                <motion.div
                  key={f.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="p-6 rounded-2xl bg-white dark:bg-[#071428] border border-gray-200
                    dark:border-[#1e3a5f] hover:border-[#E31837]/30 transition-colors"
                >
                  <div className="w-11 h-11 rounded-xl bg-[#E31837]/10 flex items-center justify-center mb-4">
                    <Icon size={20} className="text-[#E31837]" />
                  </div>
                  <h3 className="font-bold text-[var(--fg)] mb-1.5">{f.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)]">{f.desc}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="py-20 bg-gray-50 dark:bg-[#071428]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-xs font-bold uppercase tracking-widest text-[#E31837] mb-2">
              3 étapes simples
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">
              Comment ça marche ?
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <motion.div
                key={s.n}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="p-6 rounded-2xl bg-white dark:bg-[#0c1d3a] border border-gray-200
                  dark:border-[#1e3a5f]"
              >
                <div className="text-4xl font-black text-[#E31837]/30 mb-3">{s.n}</div>
                <h3 className="font-bold text-[var(--fg)] mb-1.5">{s.title}</h3>
                <p className="text-sm text-[var(--fg-muted)]">{s.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-[var(--bg)]">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="p-10 rounded-3xl gradient-hero text-white"
          >
            <h2 className="text-3xl sm:text-4xl font-black mb-4">
              Prêt à créer votre carte ?
            </h2>
            <p className="text-white/70 mb-8">
              Gratuit jusqu&apos;à 3 cartes. Aucune carte bancaire requise.
            </p>
            <Link
              href="/account/signup"
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full
                bg-[#E31837] hover:bg-[#c41530] text-white font-bold text-sm transition-colors"
            >
              Je crée ma carte maintenant
              <ArrowRight size={16} />
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
}
