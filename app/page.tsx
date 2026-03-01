import type { Metadata } from 'next';
import HeroSection from '@/components/sections/HeroSection';
import ServicesSection from '@/components/sections/ServicesSection';
import TechSection from '@/components/sections/TechSection';
import CTASection from '@/components/sections/CTASection';

export const metadata: Metadata = {
  title: '2ks digital – Agence Web & Mobile à Dakar',
  description:
    'Nous créons des expériences digitales modernes – web, mobile, backend et consulting tech – pour booster votre business local et international.',
};

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <ServicesSection />
      <TechSection />
      <CTASection />
    </>
  );
}
