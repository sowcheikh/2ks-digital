'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { Loader2, LogIn, AlertCircle } from 'lucide-react';
import { useAuth } from '@/lib/auth-context';

export default function AdminLoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const { error: authError } = await signIn(email, password);
    if (authError) {
      setError(authError);
      setLoading(false);
      return;
    }

    router.push('/admin');
  };

  const inputClass =
    'w-full px-4 py-3 rounded-xl text-sm bg-[#071428] border border-[#1e3a5f] text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-[#E31837] focus:border-transparent transition-all duration-200';

  return (
    <div className="min-h-screen flex items-center justify-center gradient-hero px-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-sm"
      >
        <div className="text-center mb-8">
          <div className="inline-flex items-baseline gap-1 mb-4">
            <span className="text-3xl font-black text-white">2ks</span>
            <span className="text-3xl font-black text-[#E31837]">digital</span>
          </div>
          <p className="text-white/60 text-sm">Espace administration</p>
        </div>

        <div className="bg-[#0c1d3a] border border-[#1e3a5f] rounded-2xl p-8">
          <h1 className="text-xl font-bold text-white mb-6">Connexion</h1>

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
                placeholder="admin@2ksdigital.com"
                required
                className={inputClass}
              />
            </div>

            <div>
              <label htmlFor="password" className="text-xs font-semibold text-gray-400 mb-1.5 block">
                Mot de passe
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
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
                  Connexion…
                </>
              ) : (
                <>
                  <LogIn size={16} />
                  Se connecter
                </>
              )}
            </motion.button>
          </form>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          2ks digital · Admin Dashboard
        </p>
      </motion.div>
    </div>
  );
}
