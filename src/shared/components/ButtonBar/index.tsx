'use client';

import React from 'react';

import { Grid, useTheme } from '@mui/material';

import { LoadingButton } from '@mui/lab';
import { useRouter } from 'next/navigation';

interface ButtonBarInterface {
  loading?: boolean;
  useNextButton?: boolean;
  onBack?: VoidFunction;
}
export function ButtonBar(data: ButtonBarInterface) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Grid
      container
      sx={{
        backgroundColor: 'white',
        borderTop: `1px solid ${theme.palette.grey[200]}`,
        borderRadius: 1,
        padding: 3,
      }}
    >
      <Grid
        container
        alignItems="center"
        direction="row"
        justifyContent="space-between"
        sx={{
          gap: 2,
          justifyContent: {
            xs: 'center',
            sm: 'space-between',
          },
        }}
      >
        <Grid item spacing={3}>
          <LoadingButton
            color="primary"
            variant="text"
            onClick={data.onBack || router.back}
          >
            Voltar
          </LoadingButton>
          {data.useNextButton ? (
            <LoadingButton
              color="primary"
              sx={{
                paddingX: 10,
              }}
              type="submit"
              loading={data.loading}
              variant="contained"
            >
              Avançar
            </LoadingButton>
          ) : (
            <LoadingButton
              color="primary"
              sx={{
                paddingX: 10,
              }}
              loading={data.loading}
              type="submit"
              variant="contained"
            >
              Salvar
            </LoadingButton>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}
