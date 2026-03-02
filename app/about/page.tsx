'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import {
  Award,
  Zap,
  Users,
  Globe,
  Code2,
  ShieldCheck,
  ArrowRight,
  MapPin,
  Mail,
} from 'lucide-react';

const technologies = [
  'Next.js', 'React', 'Angular', 'TypeScript',
  'Node.js', 'NestJS', 'PostgreSQL', 'MySQL',
  'MongoDB', 'Laravel', 'Flutter', 'React Native',
  'Tailwind CSS', 'GraphQL', 'Docker', 'AWS',
  'Vercel', 'Prisma', 'Redis',
];

const whyUs = [
  {
    icon: Zap,
    title: 'Performance maximale',
    description:
      'Chaque projet est optimisé Lighthouse dès la conception — temps de chargement minimal, Core Web Vitals au vert.',
    color: '#E31837',
  },
  {
    icon: Code2,
    title: 'Code de qualité',
    description:
      'Architecture propre, TypeScript strict, tests unitaires et revue de code systématique pour un produit maintenable.',
    color: '#002B5C',
  },
  {
    icon: Globe,
    title: 'Vision internationale',
    description:
      'Pensés pour le marché mondial : multilingue, accessibilité WCAG, design responsive et standards internationaux.',
    color: '#003d80',
  },
  {
    icon: Users,
    title: 'Collaboration transparente',
    description:
      'Communication directe avec le fondateur, livrables ponctuels et implication totale dans votre succès.',
    color: '#E31837',
  },
  {
    icon: ShieldCheck,
    title: 'Sécurité intégrée',
    description:
      'Authentification robuste, protection des données, HTTPS et bonnes pratiques OWASP appliquées par défaut.',
    color: '#002B5C',
  },
  {
    icon: Award,
    title: 'Accompagnement long terme',
    description:
      "Nous ne livrons pas et disparaissons. Support continu, mises à jour, et évolution de votre produit avec vous.",
    color: '#003d80',
  },
];

const staggerContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.12 } },
};

const fadeUp = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: 'easeOut' as const } },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section className="pt-32 pb-20 gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-3xl"
          >
            <motion.span
              variants={fadeUp}
              className="text-sm font-semibold uppercase tracking-widest text-[#E31837]"
            >
              Notre histoire
            </motion.span>
            <motion.h1
              variants={fadeUp}
              className="mt-4 text-5xl sm:text-6xl font-black leading-tight"
            >
              À propos de{' '}
              <span className="text-gradient">2ks digital</span>
            </motion.h1>
            <motion.p
              variants={fadeUp}
              className="mt-6 text-xl text-white/75 leading-relaxed"
            >
              Agence digitale fondée à Dakar, Sénégal — avec une ambition
              mondiale. Nous concevons des produits numériques qui performent,
              convertissent et durent.
            </motion.p>
            <motion.div
              variants={fadeUp}
              className="flex items-center gap-2 mt-6 text-white/60 text-sm"
            >
              <MapPin size={15} />
              <span>Dakar, Sénégal</span>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Agency mission */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
            >
              <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
                Notre mission
              </span>
              <h2 className="mt-3 text-4xl font-black text-[var(--fg)] leading-tight">
                Construire le digital africain
                <br /> de demain
              </h2>
              <div className="mt-6 space-y-4 text-[var(--fg-muted)] leading-relaxed">
                <p>
                  <strong className="text-[var(--fg)]">2ks digital</strong> est
                  une agence de développement fondée avec la conviction que
                  l&apos;Afrique mérite des produits numériques au standard
                  international.
                </p>
                <p>
                  Basés à Dakar, nous travaillons pour des clients au Sénégal et
                  à l&apos;international — en apportant rigueur technique,
                  créativité et engagement sans faille sur chaque projet.
                </p>
                <p>
                  Notre approche : comprendre vos objectifs business, puis
                  livrer une solution digitale qui y répond précisément —
                  performante, scalable et maintenue dans la durée.
                </p>
              </div>
            </motion.div>

            {/* Founder card */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="relative"
            >
              <div className="relative p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)]
                overflow-hidden">
                {/* Decoration */}
                <div className="absolute top-0 right-0 w-32 h-32 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle, #E31837, transparent)', transform: 'translate(30%, -30%)' }}
                />
                <div className="absolute bottom-0 left-0 w-24 h-24 rounded-full opacity-10"
                  style={{ background: 'radial-gradient(circle, #002B5C, transparent)', transform: 'translate(-30%, 30%)' }}
                />

                {/* Avatar */}
                <div className="relative w-20 h-20 rounded-2xl flex items-center justify-center
                  text-3xl font-black text-white mb-5"
                  style={{ background: 'linear-gradient(135deg, #002B5C, #E31837)' }}
                >
                  CS
                </div>

                <h3 className="text-2xl font-black text-[var(--fg)]">Cheikh Sow</h3>
                <p className="text-[#E31837] font-semibold text-sm mt-1">Fondateur & Lead Developer</p>

                <div className="mt-5 space-y-3 text-[var(--fg-muted)] text-sm leading-relaxed">
                  <p>
                    Développeur full-stack passionné avec plus de 5 ans
                    d&apos;expérience dans la conception de solutions web et
                    mobile scalables.
                  </p>
                  <p>
                    Maîtrise complète de l&apos;écosystème JavaScript moderne —
                    du front-end React/Angular jusqu&apos;au backend NestJS/Node,
                    en passant par les bases de données et le cloud.
                  </p>
                </div>

                <div className="mt-6 flex gap-3">
                  <a
                    href="https://cheikhsow.netlify.app"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                      bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors duration-200"
                  >
                    <Globe size={13} />
                    Portfolio
                  </a>
                  <a
                    href="mailto:contact@2ksdigital.com"
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold
                      bg-[var(--bg-subtle)] text-[var(--fg)] hover:bg-[var(--border)]
                      border border-[var(--border)] transition-colors duration-200"
                  >
                    <Mail size={13} />
                    Email
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-20 bg-[var(--bg-subtle)]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Notre stack
            </span>
            <h2 className="mt-3 text-4xl font-black text-[var(--fg)]">
              Technologies maîtrisées
            </h2>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="flex flex-wrap justify-center gap-3"
          >
            {technologies.map((tech) => (
              <motion.span
                key={tech}
                variants={fadeUp}
                whileHover={{ scale: 1.07, y: -3 }}
                className="px-4 py-2 rounded-full text-sm font-semibold
                  bg-[var(--bg-card)] border border-[var(--border)]
                  text-[var(--fg)] hover:border-[#002B5C] hover:text-[#002B5C]
                  dark:hover:border-[#E31837] dark:hover:text-[#E31837]
                  transition-all duration-200 cursor-default"
              >
                {tech}
              </motion.span>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Why us */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-14"
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Nos avantages
            </span>
            <h2 className="mt-3 text-4xl sm:text-5xl font-black text-[var(--fg)]">
              Pourquoi choisir 2ks digital ?
            </h2>
            <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
              Nous ne faisons pas que coder — nous nous investissons dans la
              réussite de votre produit digital.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyUs.map((item, i) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ y: -5 }}
                  className="p-7 rounded-2xl bg-[var(--bg-card)] border border-[var(--border)]
                    hover:border-[#002B5C]/50 transition-all duration-300 group"
                >
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center mb-4"
                    style={{ backgroundColor: `${item.color}18` }}
                  >
                    <Icon size={22} style={{ color: item.color }} />
                  </div>
                  <h3 className="text-lg font-bold text-[var(--fg)] mb-2">{item.title}</h3>
                  <p className="text-sm text-[var(--fg-muted)] leading-relaxed">
                    {item.description}
                  </p>
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
              Travaillons ensemble
            </h2>
            <p className="text-[var(--fg-muted)]">
              Parlons de votre projet et voyons comment nous pouvons vous aider.
            </p>
            <motion.div whileHover={{ scale: 1.05 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-10 py-4 rounded-full font-semibold
                  bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors duration-200
                  shadow-lg"
              >
                Démarrer un projet
                <ArrowRight size={16} />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
