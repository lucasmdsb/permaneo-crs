/* eslint-disable react-hooks/exhaustive-deps */
'use client';
import { useMemo, FC, ReactNode } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Container,
  AppBar,
  Box,
  CssBaseline,
  Toolbar,
  useMediaQuery,
} from '@mui/material';

import { Header } from './Header';
import Sidebar from './Sidebar';
import { HorizontalBar } from './HorizontalBar';

import { useSelector } from '@/store';
import { Main } from './main';

interface MainLayoutProps {
  children: ReactNode;
  container?: boolean;
}

export const MainLayout: FC<MainLayoutProps> = ({
  children,
  container = true,
}) => {
  const theme = useTheme();
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));
  const { drawerOpen } = useSelector((state) => state.menu);

  const condition = !matchDownMd;

  const header = useMemo(
    () => (
      <Toolbar sx={{ p: condition ? '10px' : '16px' }}>
        <Header />
      </Toolbar>
    ),
    [matchDownMd],
  );

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar
        enableColorOnDark
        position="fixed"
        color="inherit"
        elevation={0}
        sx={{ bgcolor: theme.palette.background.default }}
      >
        {header}
      </AppBar>

      {!matchDownMd && <HorizontalBar />}

      <Sidebar />

      <Main theme={theme} open={drawerOpen}>
        {container ? <Container maxWidth="lg">{children}</Container> : children}
      </Main>
    </Box>
  );
};
