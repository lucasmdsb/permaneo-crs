/* eslint-disable @next/next/no-img-element */
'use client';

import { cloneElement, useState, ReactElement, useCallback } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  AppBar as MuiAppBar,
  Box,
  Button,
  Container,
  Drawer,
  IconButton,
  Link,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
  Toolbar,
  Typography,
  useScrollTrigger,
} from '@mui/material';

import { IconBook, IconClipboardData, IconHome2 } from '@tabler/icons-react';
import MenuIcon from '@mui/icons-material/Menu';
import { useParams, useRouter } from 'next/navigation';

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();
  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  });

  return cloneElement(children, {
    elevation: trigger ? 1 : 0,
    style: {
      backgroundColor:
        theme.palette.mode === 'dark' && trigger
          ? theme.palette.dark[800]
          : theme.palette.background.default,
      color: theme.palette.text.dark,
    },
  });
}

export function AppBar({ avatar, colorPrimary, ...others }: any) {
  const [drawerToggle, setDrawerToggle] = useState<boolean>(false);
  const params = useParams();

  const drawerToggler = (open: boolean) => (event: any) => {
    if (
      event.type! === 'keydown' &&
      (event.key! === 'Tab' || event.key! === 'Shift')
    ) {
      return;
    }
    setDrawerToggle(open);
  };

  const getHrefLink = useCallback(() => {
    if (params.opportunityId) {
      return `/${params.enterprise}/`;
    }
    return '';
  }, []);

  return (
    <ElevationScroll {...others}>
      <MuiAppBar>
        <Container>
          <Toolbar sx={{ py: 2.5, px: `0 !important` }}>
            <Typography component="div" sx={{ flexGrow: 1, textAlign: 'left' }}>
              <img
                src={avatar ?? '/assets/images/logo.png'}
                width="auto"
                alt="logo-enterprise"
                height="50"
              />
            </Typography>
            <Stack
              direction="row"
              sx={{ display: { xs: 'none', sm: 'block' } }}
              spacing={{ xs: 1.5, md: 2.5 }}
            >
              <Button
                color="inherit"
                component={Link}
                href={`${getHrefLink()}#home`}
              >
                Home
              </Button>
              <Button
                color="inherit"
                component={Link}
                href={`${getHrefLink()}#about`}
              >
                Sobre
              </Button>
              <Button
                color="inherit"
                component={Link}
                href={`${getHrefLink()}#opportunity`}
              >
                Vagas
              </Button>
              <Button
                component={Link}
                href="/sign-in"
                style={{
                  backgroundColor: colorPrimary,
                }}
                disableElevation
                variant="contained"
                color="secondary"
              >
                Acessar
              </Button>
            </Stack>
            <Box sx={{ display: { xs: 'block', sm: 'none' } }}>
              <IconButton
                color="inherit"
                onClick={drawerToggler(true)}
                size="large"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="top"
                open={drawerToggle}
                onClose={drawerToggler(false)}
              >
                {drawerToggle && (
                  <Box
                    sx={{ width: 'auto' }}
                    role="presentation"
                    onClick={drawerToggler(false)}
                    onKeyDown={drawerToggler(false)}
                  >
                    <List>
                      <Link style={{ textDecoration: 'none' }} href="#home">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconHome2 />
                          </ListItemIcon>
                          <ListItemText primary="Home" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="#about">
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconClipboardData />
                          </ListItemIcon>
                          <ListItemText primary="Sobre" />
                        </ListItemButton>
                      </Link>
                      <Link
                        style={{ textDecoration: 'none' }}
                        href="#opportunity"
                      >
                        <ListItemButton component="a">
                          <ListItemIcon>
                            <IconBook />
                          </ListItemIcon>
                          <ListItemText primary="Vagas" />
                        </ListItemButton>
                      </Link>
                      <Link style={{ textDecoration: 'none' }} href="/sign-in">
                        <ListItemButton component="a">
                          <ListItemText primary="Acessar" />
                        </ListItemButton>
                      </Link>
                    </List>
                  </Box>
                )}
              </Drawer>
            </Box>
          </Toolbar>
        </Container>
      </MuiAppBar>
    </ElevationScroll>
  );
}
