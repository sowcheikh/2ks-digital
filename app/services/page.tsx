'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Globe,
  Smartphone,
  Server,
  Lightbulb,
  Wrench,
  CheckCircle2,
  ArrowRight,
  MessageCircle,
} from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Développement Web',
    tagline: 'Des interfaces qui convertissent',
    description:
      "Conception et développement de sites vitrine, e-commerce, SaaS et plateformes complexes. Nous utilisons Next.js et React pour des expériences ultra-rapides et optimisées SEO.",
    features: [
      'Landing pages & sites corporate',
      'Applications SaaS full-stack',
      'E-commerce performants',
      'SEO technique & Core Web Vitals',
      'Progressive Web Apps (PWA)',
    ],
    color: '#002B5C',
    gradient: 'from-[#002B5C]/10 to-transparent',
  },
  {
    icon: Smartphone,
    title: 'Développement Mobile',
    tagline: 'iOS & Android avec une UX premium',
    description:
      "Applications mobiles natives ou cross-platform avec React Native. De la conception UX/UI à la publication sur les stores App Store et Google Play.",
    features: [
      'React Native cross-platform',
      'Design UX/UI natif',
      'Publication App Store & Google Play',
      'Notifications push & offline',
      'Intégration API & paiements',
    ],
    color: '#E31837',
    gradient: 'from-[#E31837]/10 to-transparent',
  },
  {
    icon: Server,
    title: 'Backend & API',
    tagline: 'Architectures robustes et scalables',
    description:
      "Développement d'APIs REST et GraphQL avec Node.js et NestJS. Bases de données relationnelles (PostgreSQL) et NoSQL. Architecture microservices et serverless.",
    features: [
      'APIs REST & GraphQL',
      'Node.js / NestJS / Express',
      'PostgreSQL / MongoDB',
      'Authentication JWT & OAuth',
      'Déploiement cloud (Vercel, AWS)',
    ],
    color: '#003d80',
    gradient: 'from-[#003d80]/10 to-transparent',
  },
  {
    icon: Lightbulb,
    title: 'Consulting Tech',
    tagline: 'Votre stratégie digitale, optimisée',
    description:
      "Audit de votre stack existant, recommandations d'architecture, choix technologiques et accompagnement agile. Nous devenons votre CTO externalisé.",
    features: [
      'Audit technique approfondi',
      'Choix de stack & architecture',
      'Code review & best practices',
      'Accompagnement équipes',
      'Roadmap produit',
    ],
    color: '#E31837',
    gradient: 'from-[#E31837]/10 to-transparent',
  },
  {
    icon: Wrench,
    title: 'Optimisation & Maintenance',
    tagline: 'Performances maximales, disponibilité garantie',
    description:
      "Amélioration des performances Lighthouse, optimisation SEO technique, mises à jour de sécurité et support continu. Votre produit reste toujours au top.",
    features: [
      'Audit Lighthouse & Core Web Vitals',
      'Optimisation images & bundles',
      'Mises à jour sécurité',
      'Monitoring & alertes',
      'Support réactif',
    ],
    color: '#002B5C',
    gradient: 'from-[#002B5C]/10 to-transparent',
  },
];

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Page header */}
      <section className="pt-32 pb-16 gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Nos expertises
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-black leading-tight">
              Services &{' '}
              <span className="text-gradient">Solutions</span>
            </h1>
            <p className="mt-5 text-xl text-white/70 max-w-2xl mx-auto">
              Des solutions digitales complètes pour transformer votre vision
              en produit performant — du concept à la mise en ligne.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Services list */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-10">
            {services.map((service, i) => {
              const Icon = service.icon;
              const isEven = i % 2 === 1;
              return (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1, duration: 0.6, ease: 'easeOut' }}
                  className={`flex flex-col ${isEven ? 'lg:flex-row-reverse' : 'lg:flex-row'}
                    gap-8 p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)]
                    hover:border-[#002B5C]/40 transition-all duration-300 group overflow-hidden relative`}
                >
                  {/* Glow */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${service.gradient} opacity-0
                      group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`}
                  />

                  {/* Icon block */}
                  <div className="relative flex-shrink-0 flex flex-col items-start gap-4 lg:w-56">
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.05 }}
                      className="w-16 h-16 rounded-2xl flex items-center justify-center"
                      style={{ backgroundColor: `${service.color}20` }}
                    >
                      <Icon size={30} style={{ color: service.color }} />
                    </motion.div>
                    <span
                      className="text-xs font-bold uppercase tracking-widest px-3 py-1
                        rounded-full"
                      style={{
                        backgroundColor: `${service.color}18`,
                        color: service.color,
                      }}
                    >
                      {service.tagline}
                    </span>
                  </div>

                  {/* Content */}
                  <div className="relative flex-1 flex flex-col gap-5">
                    <div>
                      <h2 className="text-2xl sm:text-3xl font-black text-[var(--fg)]">
                        {service.title}
                      </h2>
                      <p className="mt-3 text-[var(--fg-muted)] leading-relaxed">
                        {service.description}
                      </p>
                    </div>

                    <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {service.features.map((feat) => (
                        <li key={feat} className="flex items-center gap-2 text-sm text-[var(--fg)]">
                          <CheckCircle2
                            size={16}
                            style={{ color: service.color }}
                            className="flex-shrink-0"
                          />
                          {feat}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="max-w-2xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex flex-col items-center gap-6"
          >
            <h2 className="text-3xl sm:text-4xl font-black text-[var(--fg)]">
              Prêt à lancer votre projet ?
            </h2>
            <p className="text-[var(--fg-muted)]">
              Contactez-nous pour un devis gratuit et personnalisé.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <motion.div whileHover={{ scale: 1.05 }}>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold
                    bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors duration-200"
                >
                  Demander un devis
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
