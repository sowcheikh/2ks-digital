'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } },
};

const itemVariants = {
  hidden:  { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' as const } },
};

export default function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden
      gradient-hero pt-16">
      {/* Animated background blobs */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
          transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-20"
          style={{ background: 'radial-gradient(circle, #E31837, transparent)' }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 20, 0] }}
          transition={{ duration: 15, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute -bottom-20 -right-20 w-80 h-80 rounded-full opacity-15"
          style={{ background: 'radial-gradient(circle, #003d80, transparent)' }}
        />
        <motion.div
          animate={{ scale: [1, 1.15, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px]
            rounded-full opacity-10"
          style={{ background: 'radial-gradient(circle, #002B5C, transparent)' }}
        />
      </div>

      {/* Grid lines overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)',
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20
        text-center text-white">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium
              bg-white/10 backdrop-blur border border-white/20 text-white/90">
              <span className="w-2 h-2 rounded-full bg-[#E31837] animate-pulse" />
              Agence digitale • Dakar, Sénégal
            </span>
          </motion.div>

          {/* Main heading */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl sm:text-6xl lg:text-7xl font-black leading-tight
              tracking-tight max-w-4xl"
          >
            Nous créons des{' '}
            <span className="relative">
              <span className="text-gradient">expériences digitales</span>
            </span>
            <br />
            modernes.
          </motion.h1>

          {/* Sub-heading */}
          <motion.p
            variants={itemVariants}
            className="text-xl sm:text-2xl text-white/75 max-w-2xl leading-relaxed"
          >
            Solutions web & mobile qui convertissent et accélèrent votre
            business — pour clients locaux et internationaux.
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center justify-center gap-4 pt-2"
          >
            <motion.a
              href="https://cheikhsow.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base
                bg-[#E31837] hover:bg-[#c41530] text-white shadow-lg shadow-red-900/40
                transition-colors duration-200"
            >
              Voir Portfolio
              <ExternalLink size={16} />
            </motion.a>

            <motion.div whileHover={{ scale: 1.04, y: -2 }} whileTap={{ scale: 0.97 }}>
              <Link
                href="/contact"
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base
                  bg-white/10 backdrop-blur border border-white/25 hover:bg-white/20
                  text-white transition-colors duration-200"
              >
                Nous contacter
                <ArrowRight size={16} />
              </Link>
            </motion.div>

            <motion.a
              href="https://wa.me/221771384209"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.97 }}
              className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold text-base
                bg-[#25d366] hover:bg-[#1fb855] text-white shadow-lg shadow-green-900/30
                transition-colors duration-200"
            >
              <MessageCircle size={18} />
              WhatsApp
            </motion.a>
          </motion.div>

          {/* Stats row */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-10 pt-10 border-t border-white/10 mt-4 w-full max-w-xl"
          >
            {[
              { value: '50+', label: 'Projets livrés' },
              { value: '100%', label: 'Clients satisfaits' },
              { value: '5 ans', label: "D'expérience" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <p className="text-3xl font-black text-white">{stat.value}</p>
                <p className="text-sm text-white/60 mt-0.5">{stat.label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* Scroll cue */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="flex flex-col items-center gap-1 text-white/40 text-xs"
          >
            <div className="w-0.5 h-8 bg-gradient-to-b from-white/40 to-transparent rounded-full" />
            Scroll
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
