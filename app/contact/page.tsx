'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  MessageCircle,
  Mail,
  CheckCircle2,
  AlertCircle,
  Loader2,
  MapPin,
  Phone,
  ChevronDown,
} from 'lucide-react';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface FormData {
  name: string;
  email: string;
  message: string;
}

const faqs = [
  {
    q: 'Quels types de projets prenez-vous en charge ?',
    a: "Nous développons des sites web, applications mobiles, APIs, plateformes SaaS et accompagnons en consulting tech — pour startups, PME et grandes entreprises.",
  },
  {
    q: 'Quels sont vos délais de livraison ?',
    a: "Un site vitrine : 2-3 semaines. Une application complète : 4-12 semaines selon la complexité. Nous établissons toujours un planning détaillé en début de projet.",
  },
  {
    q: 'Travaillez-vous avec des clients internationaux ?',
    a: "Oui ! Nous collaborons avec des clients en France, Europe, Amérique du Nord et Afrique. Communication en français et anglais.",
  },
  {
    q: 'Proposez-vous un support après la livraison ?',
    a: "Absolument. Nous proposons des formules de maintenance mensuelle avec monitoring, mises à jour et support prioritaire.",
  },
];

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

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({ name: '', email: '', message: '' });
  const [status, setStatus] = useState<FormStatus>('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    setErrorMsg('');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        setErrorMsg(data.error ?? 'Une erreur est survenue.');
        setStatus('error');
        return;
      }

      setStatus('success');
      setForm({ name: '', email: '', message: '' });
    } catch {
      setErrorMsg('Impossible de se connecter au serveur. Réessayez.');
      setStatus('error');
    }
  };

  const inputBase =
    'w-full px-4 py-3 rounded-xl text-sm bg-[var(--bg-card)] border border-[var(--border)] \
text-[var(--fg)] placeholder-[var(--fg-muted)] \
focus:outline-none focus:ring-2 focus:ring-[#002B5C] focus:border-transparent \
transition-all duration-200';

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Hero */}
      <section className="pt-32 pb-16 gradient-hero text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-sm font-semibold uppercase tracking-widest text-[#E31837]">
              Parlons de votre projet
            </span>
            <h1 className="mt-4 text-5xl sm:text-6xl font-black leading-tight">
              Contactez{' '}
              <span className="text-gradient">2ks digital</span>
            </h1>
            <p className="mt-5 text-xl text-white/70 max-w-xl mx-auto">
              Une question, un projet, un devis ? Nous répondons sous 24h.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
            {/* Left – Contact info */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-2 flex flex-col gap-6"
            >
              <div>
                <h2 className="text-2xl font-black text-[var(--fg)]">
                  Nos coordonnées
                </h2>
                <p className="mt-3 text-[var(--fg-muted)] text-sm leading-relaxed">
                  Que vous préfériez un email, un appel WhatsApp ou un formulaire,
                  nous sommes disponibles et réactifs.
                </p>
              </div>

              <div className="flex flex-col gap-4">
                {/* Email */}
                <a
                  href="mailto:contact@2ksdigital.com"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)]
                    border border-[var(--border)] hover:border-[#002B5C]
                    transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#002B5C]/10 flex items-center justify-center
                    group-hover:bg-[#002B5C] transition-colors duration-200">
                    <Mail size={18} className="text-[#002B5C] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--fg-muted)]">Email</p>
                    <p className="text-sm font-semibold text-[var(--fg)]">
                      contact@2ksdigital.com
                    </p>
                  </div>
                </a>

                {/* WhatsApp */}
                <a
                  href="https://wa.me/221771384209"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)]
                    border border-[var(--border)] hover:border-[#25d366]
                    transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#25d366]/10 flex items-center justify-center
                    group-hover:bg-[#25d366] transition-colors duration-200">
                    <MessageCircle size={18} className="text-[#25d366] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--fg-muted)]">WhatsApp</p>
                    <p className="text-sm font-semibold text-[var(--fg)]">+221 77 138 42 09</p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)]
                  border border-[var(--border)]">
                  <div className="w-10 h-10 rounded-xl bg-[#E31837]/10 flex items-center justify-center">
                    <MapPin size={18} className="text-[#E31837]" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--fg-muted)]">Localisation</p>
                    <p className="text-sm font-semibold text-[var(--fg)]">Dakar, Sénégal</p>
                  </div>
                </div>

                {/* Phone */}
                <a
                  href="tel:+221771384209"
                  className="flex items-center gap-4 p-4 rounded-2xl bg-[var(--bg-card)]
                    border border-[var(--border)] hover:border-[#002B5C]
                    transition-colors duration-200 group"
                >
                  <div className="w-10 h-10 rounded-xl bg-[#002B5C]/10 flex items-center justify-center
                    group-hover:bg-[#002B5C] transition-colors duration-200">
                    <Phone size={18} className="text-[#002B5C] group-hover:text-white transition-colors" />
                  </div>
                  <div>
                    <p className="text-xs text-[var(--fg-muted)]">Téléphone</p>
                    <p className="text-sm font-semibold text-[var(--fg)]">+221 77 138 42 09</p>
                  </div>
                </a>
              </div>
            </motion.div>

            {/* Right – Form */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="lg:col-span-3"
            >
              <div className="p-8 rounded-3xl bg-[var(--bg-card)] border border-[var(--border)]">
                <h2 className="text-2xl font-black text-[var(--fg)] mb-6">
                  Envoyez-nous un message
                </h2>

                <AnimatePresence mode="wait">
                  {status === 'success' ? (
                    <motion.div
                      key="success"
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex flex-col items-center gap-4 py-12 text-center"
                    >
                      <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30
                        flex items-center justify-center">
                        <CheckCircle2 size={32} className="text-green-500" />
                      </div>
                      <h3 className="text-xl font-bold text-[var(--fg)]">
                        Message envoyé !
                      </h3>
                      <p className="text-[var(--fg-muted)] text-sm max-w-xs">
                        Merci pour votre message. Nous vous répondrons dans les
                        24 heures.
                      </p>
                      <button
                        onClick={() => setStatus('idle')}
                        className="mt-2 px-6 py-2 rounded-full text-sm font-semibold
                          bg-[#002B5C] text-white hover:bg-[#003d80] transition-colors duration-200"
                      >
                        Envoyer un autre message
                      </button>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      onSubmit={handleSubmit}
                      className="flex flex-col gap-5"
                      noValidate
                    >
                      {/* Error alert */}
                      <AnimatePresence>
                        {status === 'error' && (
                          <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            className="flex items-center gap-3 px-4 py-3 rounded-xl
                              bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800
                              text-red-700 dark:text-red-400 text-sm"
                          >
                            <AlertCircle size={16} className="flex-shrink-0" />
                            {errorMsg}
                          </motion.div>
                        )}
                      </AnimatePresence>

                      {/* Name */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="name"
                          className="text-sm font-semibold text-[var(--fg)]"
                        >
                          Nom complet <span className="text-[#E31837]">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="Votre nom"
                          required
                          className={inputBase}
                        />
                      </div>

                      {/* Email */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="email"
                          className="text-sm font-semibold text-[var(--fg)]"
                        >
                          Email <span className="text-[#E31837]">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          placeholder="votre@email.com"
                          required
                          className={inputBase}
                        />
                      </div>

                      {/* Message */}
                      <div className="flex flex-col gap-1.5">
                        <label
                          htmlFor="message"
                          className="text-sm font-semibold text-[var(--fg)]"
                        >
                          Message <span className="text-[#E31837]">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Décrivez votre projet ou votre besoin..."
                          required
                          className={`${inputBase} resize-none`}
                        />
                      </div>

                      {/* Submit */}
                      <motion.button
                        type="submit"
                        disabled={status === 'loading'}
                        whileHover={status !== 'loading' ? { scale: 1.02 } : {}}
                        whileTap={status !== 'loading' ? { scale: 0.98 } : {}}
                        className="flex items-center justify-center gap-2 w-full py-4 rounded-xl
                          font-semibold text-white bg-[#002B5C] hover:bg-[#003d80]
                          disabled:opacity-70 disabled:cursor-not-allowed
                          transition-colors duration-200"
                      >
                        {status === 'loading' ? (
                          <>
                            <Loader2 size={18} className="animate-spin" />
                            Envoi en cours…
                          </>
                        ) : (
                          <>
                            Envoyer le message
                            <Send size={16} />
                          </>
                        )}
                      </motion.button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-[var(--bg-subtle)]">
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
            transition={{ delay: 0.15 }}
            className="flex flex-col gap-3"
          >
            {faqs.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </motion.div>
        </div>
      </section>
    </div>
  );
}
