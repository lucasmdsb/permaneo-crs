/* eslint-disable @next/next/no-img-element */
'use client';

import {
  Box,
  Grid,
  Typography,
} from '@mui/material';

import { MainCard } from '@/shared/components/MainCard';
import { CourseCard } from '../_components/CourseCard';
import { Course } from '@/schema';
import { useAuth } from '@/hooks/auth';
import { useSessionStorage } from '@/hooks/tools/session-storage.tool';

type FavoritesSession = Course[];

export default function FavoritesPage() {
  const { user } = useAuth();
  const [favorites, setFavorites] = useSessionStorage<FavoritesSession>('@permaneo:favorites');

  return (
    <>
      <Box marginY={2}>
        <img
          src="/assets/_mock/internal.png"
          width="100%"
          height={250}
          style={{
            borderRadius: 10,
            objectFit: 'cover',
          }}
          alt="banner-empresa-recrutamento-e-selecao"
        />
      </Box>
      <MainCard
        title={
          <Grid
            container
            alignItems="flex-start"
            flexDirection="column"
            justifyContent="center"
            spacing={3}
          >
            <Grid item width="100%">
              <Grid
                display="flex"
                flexDirection="row"
                alignItems="space-between"
                justifyContent="space-between"
              >
                <Grid item>
                  <Typography variant="h2" fontSize={24}>
                    Favoritos
                  </Typography>
                  <Typography variant="caption" fontSize={14}>
                    Favoritados por mim
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        }
      >
        <Grid container direction="row" spacing={3}>
          {favorites && favorites.length > 0 ? (
            favorites.map((item) => (
              <Grid key={item.id} item xs={12} md={4}>
                {/* <CourseCard {...item,} /> */}
                <CourseCard course={item} user={user} />
              </Grid>
            ))
          ) : (
            <Grid item xs={12}>
              <Typography variant="h6" align="center">
                Nenhum curso disponível no momento.
              </Typography>
            </Grid>
          )}
        </Grid>
      </MainCard>
    </>
  );
}
