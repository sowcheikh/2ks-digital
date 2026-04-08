import AuthProvider from '@/lib/auth-context';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Admin | 2ks digital',
};

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  );
}
