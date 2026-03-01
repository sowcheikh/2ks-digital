'use client';

import { motion } from 'framer-motion';
import { MessageCircle } from 'lucide-react';

const WA_LINK = 'https://wa.me/221771384209';

export default function WhatsAppButton() {
  return (
    /* fixed wrapper — jamais de `relative` ici */
    <div className="fixed bottom-6 right-6 z-50">
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Contacter sur WhatsApp"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200 }}
        whileHover={{ scale: 1.12 }}
        whileTap={{ scale: 0.92 }}
        /* `relative` est ici sur l'élément intérieur pour le pseudo-element pulse */
        className="relative flex items-center justify-center
          w-14 h-14 rounded-full shadow-2xl pulse-ring"
        style={{ background: '#25d366' }}
      >
        <MessageCircle size={26} color="#fff" fill="#fff" />

        {/* Tooltip */}
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          whileHover={{ opacity: 1, x: 0 }}
          className="absolute right-16 bg-white dark:bg-[#071428] text-[#002B5C] dark:text-white
            text-xs font-semibold px-3 py-1.5 rounded-lg shadow-lg whitespace-nowrap
            border border-[var(--border)] pointer-events-none"
        >
          Discutons sur WhatsApp
        </motion.span>
      </motion.a>
    </div>
  );
}
