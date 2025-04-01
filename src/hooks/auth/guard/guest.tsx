import { useCallback, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../index';

interface GuestGuardProps {
  children: React.ReactNode;
}

export function GuestGuard({ children }: GuestGuardProps) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { user, isLoading } = useAuth();

  const start = useCallback(() => {
    if (!user) {
      return;
    }

    let redirectTo = '/courses';

    const returnTo = searchParams.get('returnTo') || redirectTo;

    router.replace(returnTo);
  }, [user, router, searchParams]);

  useEffect(() => {
    start();
  }, [start]);

  return <>{children}</>;
}
