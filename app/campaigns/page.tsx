'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import {
  MessageCircle,
  Smartphone,
  Send,
  Users,
  BarChart3,
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
  ChevronDown,
  Loader2,
  Phone,
  Target,
  Clock,
  TrendingUp,
} from 'lucide-react';

/* ────────────────────────────────────────────────────────── */
/*  DATA                                                     */
/* ────────────────────────────────────────────────────────── */

const features = [
  {
    icon: MessageCircle,
    title: 'WhatsApp Business',
    description:
      "Envoi de campagnes via l'API WhatsApp Business officielle : templates approuvés, messages personnalisés, accusés de réception.",
    color: '#25d366',
  },
  {
    icon: Smartphone,
    title: 'Campagnes SMS',
    description:
      "Touchz vos contacts directement par SMS : fiable, rapide, compatible tous téléphones — même sans internet.",
    color: '#E31837',
  },
  {
    icon: Users,
    title: 'Segmentation & ciblage',
    description:
      "Import CSV, tags, groupes : ciblez les bons contacts au bon moment avec le bon message.",
    color: '#002B5C',
  },
  {
    icon: BarChart3,
    title: 'Reporting en temps réel',
    description:
      "Suivez vos campagnes : messages envoyés, livrés, lus, réponses. Dashboard clair et actionnable.",
    color: '#003d80',
  },
  {
    icon: Zap,
    title: 'Envoi rapide & planifié',
    description:
      "Envoi immédiat ou programmé à la date/heure souhaitée. File d'attente intelligente pour respecter les limites.",
    color: '#E31837',
  },
  {
    icon: Shield,
    title: 'Conformité & opt‑in',
    description:
      "Gestion automatique du consentement, désinscription (STOP), et respect des règles Meta/opérateurs.",
    color: '#002B5C',
  },
];

const plans = [
  {
    name: 'Starter',
    description: 'Pour démarrer vos campagnes',
    price: '50 000',
    period: '/mois',
    color: '#002B5C',
    popular: false,
    features: [
      '1 campagne / mois',
      'Jusqu\'à 500 messages',
      'WhatsApp ou SMS',
      '1 segment de contacts',
      'Rapport basique',
      'Support email',
    ],
  },
  {
    name: 'Pro',
    description: 'Pour les entreprises actives',
    price: '150 000',
    period: '/mois',
    color: '#E31837',
    popular: true,
    features: [
      '4 campagnes / mois',
      'Jusqu\'à 2 000 messages',
      'WhatsApp + SMS',
      'Segmentation avancée',
      'A/B testing messages',
      'Reporting détaillé',
      'Support prioritaire',
    ],
  },
  {
    name: 'Premium',
    description: 'Pour les grands volumes',
    price: '300 000',
    period: '/mois',
    color: '#003d80',
    popular: false,
    features: [
      '8+ campagnes / mois',
      'Messages illimités*',
      'WhatsApp + SMS',
      'Multi‑segmentation + tags',
      'A/B testing avancé',
      'Automatisation & relances',
      'Account manager dédié',
      'Reporting temps réel',
    ],
  },
];

const useCases = [
  {
    icon: Target,
    title: 'Promotions & offres',
    description: 'Annoncez vos soldes, promos ou offres spéciales directement sur le téléphone de vos clients.',
  },
  {
    icon: Clock,
    title: 'Rappels & relances',
    description: 'Rappelez un rendez-vous, une réservation ou relancez un panier abandonné automatiquement.',
  },
  {
    icon: TrendingUp,
    title: 'Lancement produit',
    description: 'Créez l\'événement : annoncez un nouveau service, une ouverture ou un lancement à toute votre base.',
  },
  {
    icon: Users,
    title: 'Fidélisation',
    description: 'Remerciez vos clients, envoyez des voeux, des enquêtes de satisfaction ou des offres exclusives.',
  },
];

const faqs = [
  {
    q: 'Dois-je avoir un compte WhatsApp Business ?',
    a: "Non, nous gérons tout pour vous. Nous utilisons l'API officielle WhatsApp Business Cloud (Meta). Vous n'avez besoin que d'un numéro de téléphone et nous nous chargeons de la configuration.",
  },
  {
    q: 'Les messages arrivent-ils vraiment aux destinataires ?',
    a: "Oui. Nous utilisons des fournisseurs certifiés (API Meta pour WhatsApp, opérateurs locaux pour SMS). Vous avez un rapport de livraison en temps réel pour chaque message.",
  },
  {
    q: 'Que se passe-t-il si un contact veut se désinscrire ?',
    a: "Le système gère automatiquement les réponses \"STOP\". Le contact est retiré de la liste d'envoi et ne recevra plus de messages. C'est obligatoire et nous le faisons par défaut.",
  },
  {
    q: 'Puis-je importer mes contacts existants ?',
    a: "Oui, via un simple fichier CSV (nom, téléphone, tags). Nous vous aidons à structurer votre liste si besoin.",
  },
  {
    q: 'Le coût des messages est-il inclus dans le prix ?',
    a: "Les forfaits incluent un volume de messages. Au-delà, un coût unitaire s'applique (variable selon le canal et le pays). Nous sommes transparents sur les coûts.",
  },
];

/* ────────────────────────────────────────────────────────── */
/*  SIMULATION STATE                                         */
/* ────────────────────────────────────────────────────────── */

interface SimMessage {
  id: number;
  name: string;
  phone: string;
  status: 'pending' | 'sending' | 'delivered' | 'read';
}

const demoContacts: SimMessage[] = [
  { id: 1, name: 'Awa Diallo', phone: '+221 77 XXX XX 01', status: 'pending' },
  { id: 2, name: 'Moussa Ndiaye', phone: '+221 78 XXX XX 02', status: 'pending' },
  { id: 3, name: 'Fatou Sall', phone: '+221 76 XXX XX 03', status: 'pending' },
  { id: 4, name: 'Ibrahima Fall', phone: '+221 77 XXX XX 04', status: 'pending' },
  { id: 5, name: 'Mariama Ba', phone: '+221 70 XXX XX 05', status: 'pending' },
];

/* ────────────────────────────────────────────────────────── */
/*  COMPONENTS                                               */
/* ────────────────────────────────────────────────────────── */

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[var(--border)] rounded-2xl overflow-hidden">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-4
          text-left text-[var(--fg)] font-semibold text-sm hover:bg-[var(--bg-subtle)]
          transition-colors duration-200"
        aria-expanded={open}
      >
        <span>{q}</span>
        <motion.div animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.2 }}>
          <ChevronDown size={18} className="flex-shrink-0 text-[var(--fg-muted)]" />
        </motion.div>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <p className="px-6 pb-5 text-sm text-[var(--fg-muted)] leading-relaxed border-t border-[var(--border)] pt-4">
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

/* ────────────────────────────────────────────────────────── */
/*  PAGE                                                     */
/* ────────────────────────────────────────────────────────── */

export default function CampaignsPage() {
  const [simMessages, setSimMessages] = useState<SimMessage[]>(demoContacts);
  const [simRunning, setSimRunning] = useState(false);
  const [simDone, setSimDone] = useState(false);
  const [simChannel, setSimChannel] = useState<'whatsapp' | 'sms'>('whatsapp');
  const [simText, setSimText] = useState(
    'Bonjour {prénom}, ici 2KS Digital ! Profitez de -30% sur votre site web cette semaine. Répondez OUI pour en savoir plus.',
  );

  const resetSim = () => {
    setSimMessages(demoContacts.map((c) => ({ ...c, status: 'pending' })));
    setSimDone(false);
    setSimRunning(false);
  };

  const runSimulation = async () => {
    if (simRunning) return;
    resetSim();
    setSimRunning(true);

    const statuses: SimMessage['status'][] = ['sending', 'delivered', 'read'];

    for (let i = 0; i < demoContacts.length; i++) {
      for (const status of statuses) {
        await new Promise((r) => setTimeout(r, 350 + Math.random() * 250));
        setSimMessages((prev) =>
          prev.map((m) => (m.id === demoContacts[i].id ? { ...m, status } : m)),
        );
      }
    }

    setSimRunning(false);
    setSimDone(true);
  };

  const statusLabel = (s: SimMessage['status']) => {
    switch (s) {
      case 'pending':   return { text: 'En attente',  color: 'text-[var(--fg-muted)]', bg: 'bg-gray-100 dark:bg-gray-800' };
      case 'sending':   return { text: 'Envoi…',      color: 'text-yellow-600',         bg: 'bg-yellow-50 dark:bg-yellow-900/20' };
      case 'delivered': return { text: 'Livré',        color: 'text-blue-600',           bg: 'bg-blue-50 dark:bg-blue-900/20' };
      case 'read':      return { text: 'Lu ✓✓',       color: 'text-green-600',          bg: 'bg-green-50 dark:bg-green-900/20' };
    }
  };

  const delivered = simMessages.filter((m) => m.status === 'delivered' || m.status === 'read').length;
  const read = simMessages.filter((m) => m.status === 'read').length;

  return (
    <div className="min-h-screen bg-[var(--bg)]">

      {/* ── HERO ────────────────────────────────────────────── */}
      <section className="pt-32 pb-20 gradient-hero text-white relative overflow-hidden">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{ x: [0, 20, 0], y: [0, -15, 0] }}
            transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -top-20 -right-20 w-72 h-72 rounded-full opacity-15"
            style={{ background: 'radial-gradient(circle, #25d366, transparent)' }}
          />
          <motion.div
            animate={{ x: [0, -15, 0], y: [0, 15, 0] }}
            transition={{ duration: 13, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute -bottom-16 -left-16 w-64 h-64 rounded-full opacity-10"
            style={{ background: 'radial-gradient(circle, #E31837, transparent)' }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              bg-white/10 backdrop-blur border border-white/20 text-white/90 mb-6">
              <MessageCircle size={14} className="text-[#25d366]" />
              Nouveau service
            </span>
            <h1 className="text-5xl sm:text-6xl font-black leading-tight">
              Campagnes{' '}
              <span className="text-[#25d366]">WhatsApp</span>
              {' '}& <span className="text-gradient">SMS</span>
            </h1>
            <p className="mt-6 text-xl text-white/75 leading-relaxed max-w-2xl">
              Touchez vos clients directement sur leur téléphone.
              Envoyez des campagnes marketing ciblées via WhatsApp et SMS —
              on gère tout pour vous, de la configuration à l&apos;envoi.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#pricing"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base
                    bg-[#25d366] hover:bg-[#1fb855] text-white shadow-lg shadow-green-900/30
                    transition-colors duration-200"
                >
                  <MessageCircle size={18} />
                  Voir les offres
                </a>
              </motion.div>
              <motion.div whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}>
                <a
                  href="#simulation"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base
                    bg-white/10 backdrop-blur border border-white/25 hover:bg-white/20
                    text-white transition-colors duration-200"
                >
                  Tester la simulation
                  <ArrowRight size={16} />
                </a>
              </motion.div>
            </div>

            <div className="flex flex-wrap gap-8 mt-12 pt-8 border-t border-white/10">
              {[
                { value: '98%', label: 'Taux de livraison' },
                { value: '45%', label: 'Taux de lecture moyen' },
                { value: '<5 min', label: "Temps d'envoi" },
              ].map((stat) => (
                <div key={stat.label} className="text-center">
                  <p className="text-2xl font-black text-white">{stat.value}</p>
                  <p className="text-xs text-white/50 mt-0.5">{stat.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── FEATURES ────────────────────────────────────────── */}
      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Fonctionnalités
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-[var(--fg)]">
              Tout ce qu&apos;il faut pour convertir
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
              Une solution complète pour envoyer des campagnes WhatsApp et SMS professionnelles,
              mesurer les résultats et fidéliser vos clients.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feat, i) => {
              const Icon = feat.icon;
              return (
                <motion.div
                  key={feat.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08, duration: 0.5 }}
                  whileHover={{ y: -5, scale: 1.02 }}
                  className="group relative flex flex-col gap-4 p-7 rounded-2xl
                    bg-[var(--bg-card)] border border-[var(--border)]
                    hover:border-[#002B5C] dark:hover:border-[#003d80]
                    transition-all duration-300 overflow-hidden"
                >
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    style={{ background: `radial-gradient(circle at top left, ${feat.color}12, transparent 70%)` }}
                  />
                  <div
                    className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                    style={{ backgroundColor: `${feat.color}18` }}
                  >
                    <Icon size={24} style={{ color: feat.color }} />
                  </div>
                  <h3 className="relative text-xl font-bold text-[var(--fg)]">{feat.title}</h3>
                  <p className="relative text-[var(--fg-muted)] leading-relaxed text-sm">{feat.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── USE CASES ───────────────────────────────────────── */}
      <section className="py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Cas d&apos;usage
            </span>
            <h2 className="mt-3 text-4xl font-black text-[var(--fg)]">
              À quoi ça sert concrètement ?
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {useCases.map((uc, i) => {
              const Icon = uc.icon;
              return (
                <motion.div
                  key={uc.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }}
                  className="flex flex-col items-center gap-3 p-6 rounded-2xl
                    bg-[var(--bg-card)] border border-[var(--border)] text-center"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#002B5C]/10 flex items-center justify-center">
                    <Icon size={22} className="text-[#002B5C] dark:text-[#E31837]" />
                  </div>
                  <h3 className="font-bold text-[var(--fg)]">{uc.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">{uc.description}</p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── SIMULATION ──────────────────────────────────────── */}
      <section id="simulation" className="py-24 scroll-mt-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#25d366]">
              Démo live
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-[var(--fg)]">
              Simulez une campagne
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-xl mx-auto">
              Testez en temps réel comment fonctionne l&apos;envoi d&apos;une campagne.
              Aucune donnée réelle n&apos;est envoyée.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="rounded-3xl bg-[var(--bg-card)] border border-[var(--border)] overflow-hidden"
          >
            {/* Sim header */}
            <div className="p-6 sm:p-8 border-b border-[var(--border)]">
              <div className="flex flex-col sm:flex-row gap-6">
                {/* Channel selector */}
                <div className="flex-1">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-2 block">
                    Canal
                  </label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSimChannel('whatsapp')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                        transition-all duration-200 border ${
                          simChannel === 'whatsapp'
                            ? 'bg-[#25d366] text-white border-[#25d366]'
                            : 'bg-transparent text-[var(--fg-muted)] border-[var(--border)] hover:border-[#25d366]'
                        }`}
                    >
                      <MessageCircle size={16} />
                      WhatsApp
                    </button>
                    <button
                      onClick={() => setSimChannel('sms')}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold
                        transition-all duration-200 border ${
                          simChannel === 'sms'
                            ? 'bg-[#E31837] text-white border-[#E31837]'
                            : 'bg-transparent text-[var(--fg-muted)] border-[var(--border)] hover:border-[#E31837]'
                        }`}
                    >
                      <Phone size={16} />
                      SMS
                    </button>
                  </div>
                </div>

                {/* Message */}
                <div className="flex-[2]">
                  <label className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-2 block">
                    Message
                  </label>
                  <textarea
                    value={simText}
                    onChange={(e) => setSimText(e.target.value)}
                    rows={3}
                    className="w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg)] border border-[var(--border)]
                      text-[var(--fg)] placeholder-[var(--fg-muted)] resize-none
                      focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent
                      transition-all duration-200"
                  />
                  <p className="text-xs text-[var(--fg-muted)] mt-1">
                    Utilisez <code className="px-1 py-0.5 rounded bg-[var(--bg-subtle)] text-[#E31837]">{'{prénom}'}</code> pour personnaliser.
                  </p>
                </div>
              </div>

              {/* Launch button */}
              <div className="mt-6 flex items-center gap-4">
                <motion.button
                  onClick={runSimulation}
                  disabled={simRunning}
                  whileHover={!simRunning ? { scale: 1.03 } : {}}
                  whileTap={!simRunning ? { scale: 0.97 } : {}}
                  className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold text-white
                    transition-colors duration-200 ${
                      simChannel === 'whatsapp'
                        ? 'bg-[#25d366] hover:bg-[#1fb855]'
                        : 'bg-[#E31837] hover:bg-[#c41530]'
                    } disabled:opacity-60 disabled:cursor-not-allowed`}
                >
                  {simRunning ? (
                    <>
                      <Loader2 size={18} className="animate-spin" />
                      Envoi en cours…
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Lancer la campagne ({demoContacts.length} contacts)
                    </>
                  )}
                </motion.button>

                {simDone && (
                  <button
                    onClick={resetSim}
                    className="text-sm text-[var(--fg-muted)] hover:text-[var(--fg)] underline
                      transition-colors duration-200"
                  >
                    Réinitialiser
                  </button>
                )}
              </div>
            </div>

            {/* Sim contacts list */}
            <div className="divide-y divide-[var(--border)]">
              {simMessages.map((msg, i) => {
                const s = statusLabel(msg.status);
                return (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.05 }}
                    className="flex items-center justify-between px-6 sm:px-8 py-4"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="w-9 h-9 rounded-full bg-[#002B5C] flex items-center justify-center
                        text-white text-xs font-bold flex-shrink-0">
                        {msg.name.split(' ').map((n) => n[0]).join('')}
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-semibold text-[var(--fg)] truncate">{msg.name}</p>
                        <p className="text-xs text-[var(--fg-muted)]">{msg.phone}</p>
                      </div>
                    </div>
                    <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.color} ${s.bg}
                      whitespace-nowrap transition-all duration-300`}>
                      {s.text}
                    </span>
                  </motion.div>
                );
              })}
            </div>

            {/* Sim stats */}
            <AnimatePresence>
              {simDone && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  className="border-t border-[var(--border)] bg-[var(--bg-subtle)] px-6 sm:px-8 py-5"
                >
                  <p className="text-xs font-bold uppercase tracking-widest text-[var(--fg-muted)] mb-3">
                    Résultat de la campagne
                  </p>
                  <div className="flex flex-wrap gap-6">
                    <div>
                      <p className="text-2xl font-black text-[var(--fg)]">{demoContacts.length}</p>
                      <p className="text-xs text-[var(--fg-muted)]">Envoyés</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-blue-600">{delivered}</p>
                      <p className="text-xs text-[var(--fg-muted)]">Livrés</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-green-600">{read}</p>
                      <p className="text-xs text-[var(--fg-muted)]">Lus</p>
                    </div>
                    <div>
                      <p className="text-2xl font-black text-green-600">
                        {Math.round((read / demoContacts.length) * 100)}%
                      </p>
                      <p className="text-xs text-[var(--fg-muted)]">Taux de lecture</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────── */}
      <section id="pricing" className="py-24 bg-[var(--bg-subtle)] scroll-mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Tarifs
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-[var(--fg)]">
              Offres Campagnes
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
              Des forfaits adaptés à votre volume et vos objectifs.
              Tous les prix sont en FCFA HT.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ y: -6 }}
                className={`relative flex flex-col rounded-3xl p-8
                  bg-[var(--bg-card)] border-2 transition-all duration-300 ${
                    plan.popular
                      ? 'border-[#E31837] shadow-xl shadow-red-900/10'
                      : 'border-[var(--border)] hover:border-[#002B5C]'
                  }`}
              >
                {plan.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-4 py-1 rounded-full text-xs font-bold
                      bg-[#E31837] text-white uppercase tracking-wide">
                      Populaire
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3 className="text-xl font-black text-[var(--fg)]">{plan.name}</h3>
                  <p className="text-sm text-[var(--fg-muted)] mt-1">{plan.description}</p>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black" style={{ color: plan.color }}>
                    {plan.price}
                  </span>
                  <span className="text-sm text-[var(--fg-muted)] ml-1">
                    FCFA{plan.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-[var(--fg)]">
                      <CheckCircle2 size={16} style={{ color: plan.color }} className="flex-shrink-0 mt-0.5" />
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                  <Link
                    href="/contact"
                    className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                      font-semibold text-sm transition-colors duration-200 ${
                        plan.popular
                          ? 'bg-[#E31837] text-white hover:bg-[#c41530]'
                          : 'bg-[#002B5C] text-white hover:bg-[#003d80]'
                      }`}
                  >
                    Choisir {plan.name}
                    <ArrowRight size={14} />
                  </Link>
                </motion.div>
              </motion.div>
            ))}
          </div>

          <p className="text-center text-xs text-[var(--fg-muted)] mt-8">
            * Les messages illimités sont soumis à un fair-use.
            Coût opérateur (WhatsApp/SMS) facturé séparément selon volume.
          </p>
        </div>
      </section>

      {/* ── FAQ ──────────────────────────────────────────────── */}
      <section className="py-20">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              FAQ
            </span>
            <h2 className="mt-3 text-4xl font-black text-[var(--fg)]">
              Questions fréquentes
            </h2>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-3"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>

      {/* ── CTA ──────────────────────────────────────────────── */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">
              Prêt à lancer votre première campagne ?
            </h2>
            <p className="text-[var(--fg-muted)]">
              Contactez-nous pour discuter de vos besoins et choisir l&apos;offre adaptée.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold
                    bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors duration-200"
                >
                  Nous contacter
                  <ArrowRight size={16} />
                </Link>
              </motion.div>
              <motion.a
                href="https://wa.me/221771384209"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold
                  bg-[#25d366] text-white hover:bg-[#1fb855] transition-colors duration-200"
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
