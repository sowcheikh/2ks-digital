'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { Home, Search, MessageCircle, Compass } from 'lucide-react';

const quickLinks = [
  { href: '/', label: 'Accueil', icon: Home },
  { href: '/services', label: 'Services', icon: Search },
  { href: '/contact', label: 'Contact', icon: MessageCircle },
  { href: '/cartes', label: 'Cartes de visite', icon: Compass },
];

export default function NotFoundView() {
  return (
    <div className="min-h-[calc(100dvh-4rem)] flex flex-col items-center justify-center gradient-hero px-4 py-16 sm:py-24 relative overflow-hidden">
      {/* Background accents */}
      <div
        className="absolute top-1/4 -left-32 w-96 h-96 rounded-full blur-3xl opacity-20 pointer-events-none"
        style={{ background: '#E31837' }}
      />
      <div
        className="absolute bottom-1/4 -right-32 w-80 h-80 rounded-full blur-3xl opacity-15 pointer-events-none"
        style={{ background: '#3b82f6' }}
      />
      <div
        className="absolute inset-0 opacity-[0.07] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, white 1px, transparent 0)',
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative z-10 max-w-lg w-full text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.45, ease: 'easeOut' as const }}
          className="mb-8"
        >
          <p className="text-xs font-bold uppercase tracking-[0.35em] text-white/50 mb-4">
            Erreur 404
          </p>
          <h1 className="text-7xl sm:text-8xl font-black leading-none tracking-tight">
            <span className="text-white">4</span>
            <span className="text-[#E31837]">0</span>
            <span className="text-white">4</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/85 font-semibold">
            Cette page n&apos;existe pas
          </p>
          <p className="mt-3 text-sm text-white/60 max-w-md mx-auto leading-relaxed">
            L&apos;adresse a peut-être changé, ou le lien est incorrect. Pas de panique :
            on vous ramène sur de bons rails.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.12, ease: 'easeOut' as const }}
          className="flex flex-col sm:flex-row items-stretch justify-center gap-3 mb-10"
        >
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full
              bg-[#E31837] text-white text-sm font-bold hover:bg-[#c41530] transition-colors
              shadow-lg shadow-[#E31837]/25"
          >
            <Home size={18} />
            Retour à l&apos;accueil
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-full
              bg-white/10 border border-white/20 text-white text-sm font-bold
              hover:bg-white/15 transition-colors"
          >
            <MessageCircle size={18} />
            Nous écrire
          </Link>
        </motion.div>

        <motion.nav
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, delay: 0.22, ease: 'easeOut' as const }}
          aria-label="Liens utiles"
          className="grid grid-cols-2 gap-2 sm:gap-3"
        >
          {quickLinks.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.href}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.28 + i * 0.05 }}
              >
                <Link
                  href={item.href}
                  className="flex items-center gap-2.5 px-4 py-3 rounded-xl
                    bg-white/5 border border-white/10 text-white/90 text-sm font-medium
                    hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={16} className="text-[#E31837] flex-shrink-0" />
                  {item.label}
                </Link>
              </motion.div>
            );
          })}
        </motion.nav>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.55 }}
          className="mt-10 text-xs text-white/35"
        >
          <span className="inline-flex items-baseline gap-1">
            <span className="font-black text-white/50">2ks</span>
            <span className="font-black text-[#E31837]/80">digital</span>
          </span>
          {' · '}
          Agence web & mobile — Dakar
        </motion.p>
      </div>
    </div>
  );
}
