'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import {
  Mail,
  MessageCircle,
  MapPin,
  ExternalLink,
  ArrowUpRight,
} from 'lucide-react';

const navLinks = [
  { label: 'Accueil',   href: '/' },
  { label: 'Services',  href: '/services' },
  { label: 'À propos',  href: '/about' },
  { label: 'Contact',   href: '/contact' },
];

const services = [
  'Développement Web',
  'Développement Mobile',
  'Backend & API',
  'Consulting Tech',
  'Optimisation & Maintenance',
];

const currentYear = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="bg-[#001a3a] text-white">
      {/* Top section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">

          {/* Brand col */}
          <div className="lg:col-span-1 flex flex-col gap-5">
            <Link href="/" className="inline-flex items-baseline gap-1">
              <span className="text-2xl font-black text-white">2ks</span>
              <span className="text-2xl font-black text-[#E31837]">digital</span>
            </Link>

            <p className="text-sm text-white/60 leading-relaxed">
              Agence digitale basée à Dakar, Sénégal. Nous créons des
              expériences web & mobile modernes pour clients locaux et
              internationaux.
            </p>

            <div className="flex items-center gap-1.5 text-sm text-white/50">
              <MapPin size={13} />
              Dakar, Sénégal
            </div>

            {/* Social / contact quick links */}
            <div className="flex gap-3">
              <motion.a
                href="mailto:contact@2ksdigital.com"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Email"
                className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-white/8 border border-white/12 hover:bg-[#002B5C]
                  transition-colors duration-200"
              >
                <Mail size={15} />
              </motion.a>
              <motion.a
                href="https://wa.me/221771384209"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="WhatsApp"
                className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-white/8 border border-white/12 hover:bg-[#25d366]
                  transition-colors duration-200"
              >
                <MessageCircle size={15} />
              </motion.a>
              <motion.a
                href="https://cheikhsow.netlify.app"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -2 }}
                aria-label="Portfolio"
                className="w-9 h-9 rounded-full flex items-center justify-center
                  bg-white/8 border border-white/12 hover:bg-[#E31837]
                  transition-colors duration-200"
              >
                <ExternalLink size={15} />
              </motion.a>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Navigation
            </h3>
            <ul className="flex flex-col gap-3">
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="group flex items-center gap-1.5 text-sm text-white/65
                      hover:text-white transition-colors duration-200"
                  >
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100
                        group-hover:translate-x-0 transition-all duration-200"
                    />
                    {link.label}
                  </Link>
                </li>
              ))}
              <li>
                <a
                  href="https://cheikhsow.netlify.app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-1.5 text-sm text-white/65
                    hover:text-white transition-colors duration-200"
                >
                  <ArrowUpRight
                    size={13}
                    className="opacity-0 -translate-x-1 group-hover:opacity-100
                      group-hover:translate-x-0 transition-all duration-200"
                  />
                  Portfolio
                  <ExternalLink size={11} className="opacity-50" />
                </a>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Services
            </h3>
            <ul className="flex flex-col gap-3">
              {services.map((s) => (
                <li key={s}>
                  <Link
                    href="/services"
                    className="group flex items-center gap-1.5 text-sm text-white/65
                      hover:text-white transition-colors duration-200"
                  >
                    <ArrowUpRight
                      size={13}
                      className="opacity-0 -translate-x-1 group-hover:opacity-100
                        group-hover:translate-x-0 transition-all duration-200"
                    />
                    {s}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-xs font-bold uppercase tracking-widest text-white/40 mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-4 text-sm">
              <a
                href="mailto:contact@2ksdigital.com"
                className="flex items-start gap-2 text-white/65 hover:text-white
                  transition-colors duration-200 group"
              >
                <Mail size={15} className="mt-0.5 flex-shrink-0 text-[#E31837]" />
                contact@2ksdigital.com
              </a>
              <a
                href="https://wa.me/221771384209"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-2 text-white/65 hover:text-white
                  transition-colors duration-200"
              >
                <MessageCircle size={15} className="mt-0.5 flex-shrink-0 text-[#25d366]" />
                +221 77 138 42 09
              </a>
              <div className="flex items-start gap-2 text-white/65">
                <MapPin size={15} className="mt-0.5 flex-shrink-0 text-white/50" />
                Dakar, Sénégal
              </div>

              <motion.a
                href="/contact"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="mt-2 inline-flex items-center gap-2 px-5 py-2.5 rounded-full
                  text-xs font-semibold bg-[#E31837] hover:bg-[#c41530] text-white
                  transition-colors duration-200 self-start"
              >
                Démarrer un projet
                <ArrowUpRight size={13} />
              </motion.a>
            </div>
          </div>
        </div>
      </div>

      {/* Mentions légales */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4
          flex flex-wrap items-center justify-center gap-x-6 gap-y-1">
          <span className="text-xs text-white/40 font-medium">
            Entreprise individuelle
          </span>
          <span className="hidden sm:block text-white/20">·</span>
          <span className="text-xs text-white/35">
            NINEA&nbsp;
            <span className="text-white/55 font-semibold tracking-wide">009679921</span>
          </span>
          <span className="hidden sm:block text-white/20">·</span>
          <span className="text-xs text-white/35">
            RCCM&nbsp;
            <span className="text-white/55 font-semibold tracking-wide">SN-DKR-2026-A-30203</span>
          </span>
        </div>
      </div>

      {/* Copyright */}
      <div className="border-t border-white/8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5
          flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs text-white/35 text-center sm:text-left">
            © {currentYear} <span className="text-white/55 font-semibold">2ks digital</span>.
            Tous droits réservés.
          </p>
          <p className="text-xs text-white/35">
            Conçu & développé par{' '}
            <a
              href="https://cheikhsow.netlify.app"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/55 hover:text-white font-semibold transition-colors duration-200"
            >
              Cheikh Sow
            </a>
            {' '}· Dakar, Sénégal
          </p>
        </div>
      </div>
    </footer>
  );
}
