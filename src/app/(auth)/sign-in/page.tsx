'use client';

import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import { Divider, Grid, Stack, Typography } from '@mui/material';

import { Logo } from '@/shared/components/Logo';

import { SignInForm } from './form';
import { AuthBox } from '../_components/AuthBox';

export default function SignIn() {
  const theme = useTheme();

  return (
    <Grid
      container
      md={5}
      xs={12}
      alignItems="center"
      justifyContent="center"
      sx={{ minHeight: '100vh' }}
    >
      <AuthBox>
        <Grid container spacing={3}>
          <Grid item>
            <Stack spacing={3}>
              <Logo />
              <Typography color={theme.palette.secondary.main} variant="h2">
                Bem vindo ao sistem de cursos Permaneo
              </Typography>
              <Typography variant="caption" fontSize="15px">
                FAÇA O LOGIN DIGITANDO UM EMAIL QUALQUER E UMA SENHA VÁLIDA QUALQUER
              </Typography>
            </Stack>
          </Grid>
          <Grid item xs={12}>
            <SignInForm />
          </Grid>
          <Grid item xs={12}>
            <Divider />
          </Grid>
          <Grid item xs={12} textAlign="center">
            <Typography
              component={Link}
              href="#"
              variant="subtitle1"
              sx={{ textDecoration: 'none' }}
            >
              Não possui uma conta? Registre-se
            </Typography>
          </Grid>
        </Grid>
      </AuthBox>
    </Grid>
  );
}
