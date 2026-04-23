'use client';

import Image from 'next/image';
import QRCode from 'react-qr-code';
import {
  Mail,
  Phone,
  Globe,
  MessageCircle,
  Linkedin,
  Instagram,
  Facebook,
} from 'lucide-react';
import type { BusinessCard } from '@/lib/types';

interface Props {
  card: Partial<BusinessCard> & {
    first_name: string;
    last_name: string;
    slug?: string;
  };
  publicUrl?: string;
  forExport?: boolean;
}

const TikTokIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.2 1.74 2.89 2.89 0 012.31-4.64 2.93 2.93 0 01.88.13V9.4a6.84 6.84 0 00-1-.05A6.33 6.33 0 005.8 20.1a6.34 6.34 0 0010.86-4.43v-7a8.16 8.16 0 004.77 1.52v-3.4a4.85 4.85 0 01-1.84-.1z" />
  </svg>
);

const SnapchatIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.166.008C13.297-.02 14.94.11 16.324.917c.769.449 1.421 1.045 1.941 1.768.754 1.045 1.032 2.236 1.133 3.4.068.915.037 1.832.034 2.75 0 .104-.004.21-.011.313.094.037.193.066.298.074.303.012.549-.115.797-.244.156-.08.317-.16.494-.203.294-.07.594-.04.856.082.334.156.538.416.571.77.03.328-.13.647-.409.842-.152.106-.316.185-.485.257-.297.126-.62.197-.947.211-.335.005-.671-.027-1.006-.056-.108-.01-.216-.013-.324-.006-.112.008-.218.042-.313.09-.13.066-.237.151-.316.278-.109.174-.153.375-.156.576-.007.421.11.838.298 1.215.306.613.74 1.142 1.225 1.618.516.507 1.115.933 1.788 1.23.295.131.602.243.918.326.12.032.242.07.35.138.185.114.262.323.223.535-.041.229-.226.397-.46.439-.17.03-.344.04-.519.052-.154.014-.308.014-.462.031-.183.02-.366.067-.505.198-.073.07-.11.158-.144.246-.078.212-.147.43-.217.643-.059.18-.127.36-.25.511-.166.205-.396.295-.658.297-.314.003-.622-.075-.918-.17-.434-.138-.876-.244-1.337-.244-.21 0-.419.014-.627.04-.413.054-.812.164-1.188.332-.434.195-.834.454-1.28.64-.442.186-.922.262-1.387.18a2.66 2.66 0 01-1.028-.386c-.294-.19-.54-.437-.84-.624-.31-.193-.654-.32-1.01-.377-.35-.06-.703-.058-1.054-.012-.382.052-.75.153-1.117.271-.301.098-.608.192-.93.194-.236.002-.458-.082-.622-.253-.144-.152-.229-.351-.3-.543-.075-.213-.142-.43-.217-.643-.03-.092-.064-.184-.137-.252-.14-.133-.324-.178-.507-.197-.154-.016-.308-.018-.462-.031-.174-.013-.349-.023-.52-.052-.233-.043-.417-.21-.459-.44-.04-.211.038-.42.223-.534.108-.067.23-.106.35-.138.316-.083.623-.194.918-.325.673-.298 1.272-.724 1.788-1.231.485-.476.92-1.005 1.225-1.618.188-.377.305-.794.299-1.215a1.174 1.174 0 00-.157-.576c-.079-.127-.187-.212-.316-.278-.095-.048-.2-.082-.313-.09-.108-.007-.216-.004-.324.006-.335.03-.671.06-1.006.056-.327-.014-.65-.085-.947-.21-.169-.073-.333-.152-.485-.258-.279-.195-.44-.513-.41-.841.034-.354.238-.614.572-.77.262-.123.562-.153.856-.083.177.043.338.123.494.203.248.129.494.256.797.244.105-.008.204-.037.298-.074-.007-.103-.01-.208-.01-.312-.004-.918-.035-1.835.033-2.75.101-1.164.38-2.355 1.133-3.4.52-.723 1.172-1.319 1.941-1.768 1.385-.807 3.028-.937 4.159-.91z"/>
  </svg>
);

const getInitials = (first: string, last: string) =>
  `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();

export default function BusinessCardVisual({
  card,
  publicUrl,
  forExport = false,
}: Props) {
  const socials = card.socials ?? {};
  const fullName = `${card.first_name} ${card.last_name}`.trim();

  return (
    <div
      className="business-card-export relative w-full max-w-[380px] mx-auto rounded-[28px] overflow-hidden
        text-white shadow-2xl"
      style={{
        background:
          'linear-gradient(145deg, #001a3a 0%, #002B5C 45%, #0a3a7a 100%)',
        aspectRatio: forExport ? undefined : 'auto',
      }}
    >
      {/* Decorative glows */}
      <div
        className="absolute -top-16 -right-16 w-48 h-48 rounded-full blur-3xl opacity-30"
        style={{ background: '#E31837' }}
      />
      <div
        className="absolute -bottom-20 -left-12 w-56 h-56 rounded-full blur-3xl opacity-20"
        style={{ background: '#3b82f6' }}
      />

      {/* Content */}
      <div className="relative p-7 flex flex-col gap-5">
        {/* Avatar + Name */}
        <div className="flex items-center gap-4">
          <div className="w-20 h-20 rounded-2xl flex items-center justify-center overflow-hidden
            bg-white/10 backdrop-blur border border-white/15 flex-shrink-0">
            {card.avatar_url ? (
              <Image
                src={card.avatar_url}
                alt={fullName}
                width={80}
                height={80}
                className="w-full h-full object-cover"
                unoptimized
              />
            ) : (
              <span className="text-2xl font-black text-white">
                {getInitials(card.first_name, card.last_name)}
              </span>
            )}
          </div>
          <div className="min-w-0">
            <h2 className="text-xl font-black leading-tight break-words">{fullName}</h2>
            {card.title && (
              <p className="text-xs text-white/70 mt-1 break-words">{card.title}</p>
            )}
          </div>
        </div>

        {/* Contact info */}
        <div className="flex flex-col gap-2.5">
          {card.phone && (
            <a
              href={`tel:${card.phone}`}
              className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white
                transition-colors"
            >
              <Phone size={15} className="text-[#E31837] flex-shrink-0" />
              <span className="truncate">{card.phone}</span>
            </a>
          )}
          {card.email && (
            <a
              href={`mailto:${card.email}`}
              className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white
                transition-colors"
            >
              <Mail size={15} className="text-[#E31837] flex-shrink-0" />
              <span className="truncate">{card.email}</span>
            </a>
          )}
          {card.website_url && (
            <a
              href={card.website_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2.5 text-sm text-white/90 hover:text-white
                transition-colors"
            >
              <Globe size={15} className="text-[#E31837] flex-shrink-0" />
              <span className="truncate">{card.website_url.replace(/^https?:\/\//, '')}</span>
            </a>
          )}
        </div>

        {/* Socials */}
        {Object.values(socials).some(Boolean) && (
          <div className="flex flex-wrap gap-2 pt-2 border-t border-white/10">
            {socials.whatsapp && (
              <SocialButton href={`https://wa.me/${socials.whatsapp.replace(/\D/g, '')}`} label="WhatsApp">
                <MessageCircle size={14} />
              </SocialButton>
            )}
            {socials.linkedin && (
              <SocialButton href={socials.linkedin} label="LinkedIn">
                <Linkedin size={14} />
              </SocialButton>
            )}
            {socials.instagram && (
              <SocialButton href={socials.instagram} label="Instagram">
                <Instagram size={14} />
              </SocialButton>
            )}
            {socials.tiktok && (
              <SocialButton href={socials.tiktok} label="TikTok">
                <TikTokIcon size={14} />
              </SocialButton>
            )}
            {socials.facebook && (
              <SocialButton href={socials.facebook} label="Facebook">
                <Facebook size={14} />
              </SocialButton>
            )}
            {socials.snapchat && (
              <SocialButton href={socials.snapchat} label="Snapchat">
                <SnapchatIcon size={14} />
              </SocialButton>
            )}
          </div>
        )}

        {/* QR + footer */}
        {publicUrl && (
          <div className="flex items-end justify-between gap-3 pt-3 border-t border-white/10">
            <div className="flex flex-col gap-0.5">
              <span className="text-[9px] text-white/40 uppercase tracking-widest font-bold">
                Propulsé par
              </span>
              <span className="inline-flex items-baseline gap-0.5">
                <span className="text-sm font-black text-white">2ks</span>
                <span className="text-sm font-black text-[#E31837]">digital</span>
              </span>
            </div>
            <div className="bg-white p-2 rounded-lg">
              <QRCode value={publicUrl} size={62} bgColor="#ffffff" fgColor="#001a3a" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function SocialButton({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="w-8 h-8 rounded-lg flex items-center justify-center
        bg-white/10 hover:bg-[#E31837] transition-colors duration-200 text-white"
    >
      {children}
    </a>
  );
}
