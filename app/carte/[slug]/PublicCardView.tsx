'use client';

import { useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Download, Share2, Link2, Check, UserPlus } from 'lucide-react';
import { toPng } from 'html-to-image';
import BusinessCardVisual from '@/components/cards/BusinessCardVisual';
import type { BusinessCard } from '@/lib/types';

export default function PublicCardView({ card }: { card: BusinessCard }) {
  const [origin, setOrigin] = useState('');
  const [copied, setCopied] = useState(false);
  const [vcardUrl, setVcardUrl] = useState('');
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window !== 'undefined') setOrigin(window.location.origin);
  }, []);

  const publicUrl = `${origin}/carte/${card.slug}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(publicUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${card.first_name} ${card.last_name}`,
          url: publicUrl,
        });
      } catch {
        // cancelled
      }
    } else {
      handleCopy();
    }
  };

  const handleDownload = async () => {
    if (!cardRef.current) return;
    const dataUrl = await toPng(cardRef.current, {
      pixelRatio: 3,
      cacheBust: true,
      backgroundColor: '#001a3a',
    });
    const a = document.createElement('a');
    a.href = dataUrl;
    a.download = `carte-${card.slug}.png`;
    a.click();
  };

  useEffect(() => {
    const vcard = [
      'BEGIN:VCARD',
      'VERSION:3.0',
      `FN:${card.first_name} ${card.last_name}`,
      `N:${card.last_name};${card.first_name};;;`,
      card.title ? `TITLE:${card.title}` : '',
      card.phone ? `TEL;TYPE=CELL:${card.phone}` : '',
      card.email ? `EMAIL:${card.email}` : '',
      card.website_url ? `URL:${card.website_url}` : '',
      'END:VCARD',
    ]
      .filter(Boolean)
      .join('\n');

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    setVcardUrl(url);

    return () => URL.revokeObjectURL(url);
  }, [card]);

  return (
    <div className="min-h-screen gradient-hero flex flex-col">
      <main className="flex-1 flex items-center justify-center px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="w-full max-w-md flex flex-col items-center gap-6"
        >
          <div ref={cardRef} className="w-full flex justify-center">
            <BusinessCardVisual card={card} publicUrl={publicUrl} />
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-3 w-full max-w-[380px]">
            <a
              href={vcardUrl || '#'}
              download={`${card.first_name}-${card.last_name}.vcf`}
              aria-disabled={!vcardUrl}
              onClick={(e) => {
                if (!vcardUrl) e.preventDefault();
              }}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl
                bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px] font-semibold
                aria-disabled:opacity-50 aria-disabled:pointer-events-none"
            >
              <UserPlus size={16} />
              Ajouter
            </a>
            <button
              onClick={handleShare}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl
                bg-white/10 hover:bg-white/20 text-white transition-colors text-[11px] font-semibold"
            >
              <Share2 size={16} />
              Partager
            </button>
            <button
              onClick={handleDownload}
              className="flex flex-col items-center justify-center gap-1 py-3 rounded-xl
                bg-[#E31837] hover:bg-[#c41530] text-white transition-colors text-[11px] font-semibold"
            >
              <Download size={16} />
              Image
            </button>
          </div>

          {/* Copy link */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-2 text-xs text-white/60 hover:text-white transition-colors"
          >
            {copied ? <Check size={13} /> : <Link2 size={13} />}
            {copied ? 'Lien copié' : 'Copier le lien'}
          </button>
        </motion.div>
      </main>

      <footer className="py-6 text-center text-xs text-white/40">
        <Link href="/cartes" className="hover:text-white">
          Créer ma carte avec 2ks digital →
        </Link>
      </footer>
    </div>
  );
}
