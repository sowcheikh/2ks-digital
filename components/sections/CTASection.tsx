'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, MessageCircle, ExternalLink } from 'lucide-react';

export default function CTASection() {
  return (
    <section className="py-28 bg-[var(--bg)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative rounded-3xl overflow-hidden"
        >
          {/* Background */}
          <div className="absolute inset-0 gradient-primary" />
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                'radial-gradient(circle at 20% 50%, #E31837 0%, transparent 60%), radial-gradient(circle at 80% 50%, #003d80 0%, transparent 60%)',
            }}
          />

          <div className="relative z-10 py-16 px-8 text-white">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 }}
              className="text-sm font-semibold uppercase tracking-widest text-[#E31837] mb-4"
            >
              Démarrons ensemble
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.25 }}
              className="text-4xl sm:text-5xl font-black leading-tight mb-5"
            >
              Vous avez un projet ?<br />
              <span className="text-gradient">Discutons-en !</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.35 }}
              className="text-lg text-white/75 max-w-xl mx-auto mb-10"
            >
              De la conception à la mise en ligne, nous transformons vos idées en
              produits digitaux percutants.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.45 }}
              className="flex flex-wrap justify-center gap-4"
            >
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}>
                <Link
                  href="/contact"
                  className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold
                    bg-white text-[#002B5C] hover:bg-gray-100 transition-colors duration-200
                    shadow-lg"
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
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold
                  bg-[#25d366] hover:bg-[#1fb855] text-white transition-colors duration-200
                  shadow-lg shadow-green-900/30"
              >
                <MessageCircle size={18} />
                WhatsApp
              </motion.a>

              <motion.a
                href="https://cheikhsow.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-8 py-4 rounded-full font-semibold
                  bg-white/10 backdrop-blur border border-white/25 hover:bg-white/20
                  text-white transition-colors duration-200"
              >
                Portfolio
                <ExternalLink size={16} />
              </motion.a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
