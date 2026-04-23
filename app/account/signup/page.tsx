'use client';

import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, UserPlus, AlertCircle, CheckCircle2 } from 'lucide-react';
import { createClient } from '@/lib/supabase-client';

export default function AccountSignupPage() {
  const router = useRouter();
  const supabase = createClient();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [info, setInfo] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setInfo('');

    if (password.length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.');
      return;
    }

    setLoading(true);

    const { data, error: signupError } = await supabase.auth.signUp({
      email,
      password,
    });

    if (signupError) {
      setError(signupError.message);
      setLoading(false);
      return;
    }

    // Si email confirmation désactivée dans Supabase → session directe
    if (data.session) {
      router.push('/account');
      return;
    }

    // Sinon afficher message
    setInfo(
      'Vérifiez votre boîte mail pour confirmer votre adresse, puis connectez-vous.',
    );
    setLoading(false);
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm bg-[#071428] border border-[#1e3a5f] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all duration-200';

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4 py-12">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-black text-white">2ks</span>
            <span className="text-3xl font-black text-[#E31837]">digital</span>
          </Link>
          <p className="text-white/60 text-sm">Créer mon compte</p>
        </div>

        <div className="bg-[#0c1d3a] border border-[#1e3a5f] rounded-2xl p-8">
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5
                bg-red-900/20 border border-red-800 text-red-400 text-sm"
            >
              <AlertCircle size={16} className="flex-shrink-0" />
              {error}
            </motion.div>
          )}

          {info && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center gap-2 px-4 py-3 rounded-xl mb-5
                bg-green-900/20 border border-green-800 text-green-400 text-sm"
            >
              <CheckCircle2 size={16} className="flex-shrink-0" />
              {info}
            </motion.div>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div>
              <label htmlFor="email" className="text-xs font-semibold text-gray-400 mb-1.5 block">
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="vous@exemple.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-gray-400 mb-1.5 block">
                Mot de passe (min 6 caractères)
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                minLength={6}
                className={inputClass}
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={!loading ? { scale: 1.02 } : {}}
              whileTap={!loading ? { scale: 0.98 } : {}}
              className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl
                font-semibold text-white bg-[#E31837] hover:bg-[#c41530]
                disabled:opacity-60 disabled:cursor-not-allowed transition-colors duration-200 mt-2"
            >
              {loading ? (
                <>
                  <Loader2 size={18} className="animate-spin" />
                  Création…
                </>
              ) : (
                <>
                  <UserPlus size={16} />
                  Créer mon compte
                </>
              )}
            </motion.button>
          </form>

          <p className="text-center text-xs text-white/50 mt-6">
            Déjà un compte ?{' '}
            <Link href="/account/login" className="text-[#E31837] font-semibold hover:underline">
              Se connecter
            </Link>
          </p>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          <Link href="/" className="hover:text-white/60">← Retour au site</Link>
        </p>
      </motion.div>
    </div>
  );
}
