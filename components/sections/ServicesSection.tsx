'use client';

import { motion } from 'framer-motion';
import { Globe, Smartphone, Server, Lightbulb, Wrench } from 'lucide-react';

const services = [
  {
    icon: Globe,
    title: 'Développement Web',
    description:
      'Sites vitrine, plateformes SaaS et applications web ultra-performantes avec Next.js, React et Angular.',
    color: '#002B5C',
  },
  {
    icon: Smartphone,
    title: 'Développement Mobile',
    description:
      'Applications iOS et Android natives ou cross-platform (React Native, Flutter) avec une UX soignée.',
    color: '#E31837',
  },
  {
    icon: Server,
    title: 'Backend & API',
    description:
      'APIs REST/GraphQL robustes et scalables avec Node.js, NestJS, Laravel et PostgreSQL/MySQL.',
    color: '#003d80',
  },
  {
    icon: Lightbulb,
    title: 'Consulting Tech',
    description:
      'Audit technique, choix de stack, architecture système et accompagnement agile pour vos projets.',
    color: '#E31837',
  },
  {
    icon: Wrench,
    title: 'Optimisation & Maintenance',
    description:
      'Performance Lighthouse, SEO technique, mise à jour continue et support proactif de vos produits.',
    color: '#002B5C',
  },
];

const cardVariants = {
  hidden:  { opacity: 0, y: 40 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: 'easeOut' as const },
  }),
};

export default function ServicesSection() {
  return (
    <section id="services" className="py-24 bg-[var(--bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
            Ce que nous faisons
          </span>
          <h2 className="mt-3 text-4xl sm:text-5xl font-black text-[var(--fg)]">
            Nos Services
          </h2>
          <p className="mt-4 text-lg text-[var(--fg-muted)] max-w-2xl mx-auto">
            Des solutions complètes, du design à la mise en production, adaptées
            à chaque besoin et budget.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                custom={i}
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                whileHover={{ y: -6, scale: 1.02 }}
                className="group relative flex flex-col gap-4 p-7 rounded-2xl
                  bg-[var(--bg-card)] border border-[var(--border)]
                  hover:border-[#002B5C] dark:hover:border-[#003d80]
                  transition-all duration-300 cursor-default overflow-hidden"
              >
                {/* Glow on hover */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle at top left, ${service.color}18, transparent 70%)`,
                  }}
                />

                <div
                  className="relative w-12 h-12 rounded-xl flex items-center justify-center"
                  style={{ backgroundColor: `${service.color}18` }}
                >
                  <Icon size={24} style={{ color: service.color }} />
                </div>

                <h3 className="relative text-xl font-bold text-[var(--fg)]">
                  {service.title}
                </h3>
                <p className="relative text-[var(--fg-muted)] leading-relaxed text-sm">
                  {service.description}
                </p>

                <motion.div
                  initial={{ width: 0 }}
                  whileInView={{ width: '2.5rem' }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                  className="h-0.5 rounded-full"
                  style={{ backgroundColor: service.color }}
                />
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
