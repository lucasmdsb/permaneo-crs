'use client';

import { AuthGuard } from '@/hooks/auth/guard/auth';
import { MainLayout } from '@/layout/main';

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <AuthGuard>
      <MainLayout>{children}</MainLayout>
    </AuthGuard>
  );
}
