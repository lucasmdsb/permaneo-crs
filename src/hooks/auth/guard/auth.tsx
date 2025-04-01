import { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../index';
import { CircularProgress, Stack } from '@mui/material';

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const [guard, setGuard] = useState(false);
  const { user } = useAuth();

  const start = useCallback(() => {
    if (!user) {
      const searchParams = new URLSearchParams({
        returnTo: window.location.pathname,
      });

      const loginPath = '/sign-in';

      const href = `${loginPath}?${searchParams.toString()}`;

      return router.replace(href);
    }

    setGuard(true);
  }, [user, router]);

  useEffect(() => {
    start();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (!guard) {
    return (
      <Stack alignItems="center" justifyContent="center" minHeight="80vh">
        <CircularProgress />
      </Stack>
    );
  }

  return <>{children}</>;
}
