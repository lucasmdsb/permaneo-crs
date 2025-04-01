/* eslint-disable @next/next/no-img-element */
'use client';

import { Grid } from '@mui/material';
import { BackgroundPattern } from '@/shared/components/BackgroundPattern';

interface LayoutProps {
  children: React.ReactNode;
}

import { styled } from '@mui/material/styles';
import { GuestGuard } from '@/hooks/auth/guard/guest';
import { Suspense } from 'react';

export default function Layout({ children }: LayoutProps) {
  const AuthWrapper = styled('div')(({ theme }) => ({
    backgroundColor: theme.palette.background.paper,
    minHeight: '100vh',
  }));

  return (
    <Suspense>
      <GuestGuard>
        <AuthWrapper>
          <Grid container justifyContent="center" alignItems="center">
            {children}
            <Grid
              item
              md={7}
              lg={7}
              sx={{
                position: 'relative',
                alignSelf: 'stretch',
                display: { xs: 'none', md: 'block' },
              }}
            >
              <BackgroundPattern>
                <img src="/assets/images/auth.png" alt="colaboradores-permaneo" />
              </BackgroundPattern>
            </Grid>
          </Grid>
        </AuthWrapper>
      </GuestGuard>
    </Suspense>
  );
}
