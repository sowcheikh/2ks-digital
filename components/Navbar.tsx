'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { Sun, Moon, Menu, X, ExternalLink } from 'lucide-react';
import { useTheme } from './ThemeProvider';

const navLinks = [
  { label: 'Accueil',    href: '/',          external: false },
  { label: 'Services',   href: '/services',  external: false },
  { label: 'Campagnes',  href: '/campaigns', external: false },
  { label: 'Cartes',     href: '/cartes',    external: false },
  { label: 'À propos',   href: '/about',     external: false },
  { label: 'Contact',    href: '/contact',   external: false },
  {
    label: 'Portfolio',
    href: 'https://cheikhsow.netlify.app',
    external: true,
  },
];

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    /* set on mount in case page is already scrolled */
    setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  /* True when we're floating over a dark hero (not yet scrolled) */
  const isTransparent = !scrolled;

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-white/90 dark:bg-[#020d1f]/90 backdrop-blur-lg shadow-lg border-b border-[var(--border)]'
          : 'bg-transparent'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">

        {/* ── Logo ──────────────────────────────────────────────────────── */}
        <Link href="/" className="flex items-center gap-2 group">
          <motion.div whileHover={{ scale: 1.05 }} className="flex items-center gap-2">
            {/* "2ks" : blanc sur fond foncé, bleu marine quand scrollé en light */}
            <span
              className={`text-2xl font-black tracking-tight transition-colors duration-300 ${
                isTransparent
                  ? 'text-white'
                  : 'text-[#002B5C] dark:text-white'
              }`}
            >
              2ks
            </span>
            <span className="text-2xl font-black tracking-tight text-[#E31837]">
              digital
            </span>
          </motion.div>
        </Link>

        {/* ── Desktop links ─────────────────────────────────────────────── */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = !link.external && pathname === link.href;
            return link.external ? (
              <motion.a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                className={`flex items-center gap-1 px-4 py-2 rounded-full text-sm font-medium
                  transition-colors duration-200 ${
                    isTransparent
                      ? 'bg-white/15 border border-white/30 text-white hover:bg-white/25'
                      : 'bg-[#002B5C] text-white hover:bg-[#E31837]'
                  }`}
              >
                {link.label}
                <ExternalLink size={12} />
              </motion.a>
            ) : (
              <motion.div key={link.href} whileHover={{ scale: 1.05 }}>
                <Link
                  href={link.href}
                  className={`relative px-4 py-2 rounded-full text-sm font-medium
                    transition-colors duration-200 ${
                      isActive
                        ? 'text-[#E31837]'
                        : isTransparent
                          ? 'text-white/85 hover:text-white'
                          : 'text-[var(--fg)] hover:text-[#002B5C] dark:hover:text-white'
                    }`}
                >
                  {link.label}
                  {isActive && (
                    <motion.span
                      layoutId="nav-indicator"
                      className="absolute bottom-0 left-4 right-4 h-0.5 bg-[#E31837] rounded-full"
                    />
                  )}
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* ── Dark mode toggle + hamburger ──────────────────────────────── */}
        <div className="flex items-center gap-2">
          <motion.button
            whileHover={{ scale: 1.1, rotate: 15 }}
            whileTap={{ scale: 0.9 }}
            onClick={toggleTheme}
            aria-label="Toggle dark/light mode"
            className={`p-2 rounded-full border transition-colors duration-200 ${
              isTransparent
                ? 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--fg)] hover:bg-[var(--bg-subtle)]'
            }`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </motion.button>

          {/* Mobile hamburger */}
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle mobile menu"
            className={`md:hidden p-2 rounded-full border transition-colors duration-200 ${
              isTransparent
                ? 'bg-white/10 border-white/25 text-white hover:bg-white/20'
                : 'bg-[var(--bg-card)] border-[var(--border)] text-[var(--fg)]'
            }`}
          >
            {isOpen ? <X size={18} /> : <Menu size={18} />}
          </motion.button>
        </div>
      </nav>

      {/* ── Mobile menu ─────────────────────────────────────────────────── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden overflow-hidden bg-white/95 dark:bg-[#020d1f]/95
              backdrop-blur-lg border-b border-[var(--border)]"
          >
            <div className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-1">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                >
                  {link.external ? (
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between px-4 py-3 rounded-xl font-medium
                        bg-[#002B5C] text-white text-sm"
                    >
                      {link.label}
                      <ExternalLink size={14} />
                    </a>
                  ) : (
                    <Link
                      href={link.href}
                      className={`block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200
                        ${
                          pathname === link.href
                            ? 'bg-[#002B5C] text-white'
                            : 'text-[var(--fg)] hover:bg-[var(--bg-subtle)]'
                        }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
