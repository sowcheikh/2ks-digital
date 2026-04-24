import type { Metadata } from 'next';
import NotFoundView from '@/components/NotFoundView';

export const metadata: Metadata = {
  title: 'Page introuvable',
  description:
    "La page demandée n'existe pas ou a été déplacée. Retournez à l'accueil 2ks digital ou contactez-nous.",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  return <NotFoundView />;
}
