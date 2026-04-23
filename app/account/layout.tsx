import AuthProvider from '@/lib/auth-context';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Mon compte | 2ks digital',
  robots: { index: false, follow: false },
};

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AuthProvider>{children}</AuthProvider>;
}
