/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useState } from 'react';
import {
  Grid,
  Typography,
  useTheme,
  IconButton,
  Button,
  Stack,
  CardMedia,
  Divider,
  Tooltip,
  Box,
} from '@mui/material';
import { MainCard } from '@/shared/components/MainCard';
import {
  IconCopy,
} from '@tabler/icons-react';

import { useSnackbar } from 'notistack';
import { useBoolean } from '@/hooks/tools/boolean.tool';
import { Course } from '@/schema';
import { coursesMock } from '@/_mock/courses';
import { useParams } from 'next/navigation';
import { useSessionStorage } from '@/hooks/tools/session-storage.tool';

type FavoritesSession = Course[];

export default function CourseShowPage() {
  const { enqueueSnackbar } = useSnackbar();
  const showUserDialog = useBoolean(false);
  const params = useParams<{ courseId: string }>();
  const [course, setCourse] = useState<Course | undefined>(coursesMock.find((item: Course) => item.id === Number(params.courseId)));
  const [favorites, setFavorites] = useSessionStorage<FavoritesSession>('@permaneo:favorites');

  const theme = useTheme();

  const handleCopyLink = async () => {
    const shortURL = `${window.location.origin}/p/`;

    navigator.clipboard
      .writeText(shortURL)
      .then(() => {
        enqueueSnackbar('Link copiado para a área de transferência', {
          variant: 'success',
        });
      })
      .catch((error) => {
        enqueueSnackbar('Falha ao copiar o link!', { variant: 'error' });
      });
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={12}>
              <MainCard
                contentSX={{
                  p: 2,
                  [theme.breakpoints.down('lg')]: {
                    textAlign: 'center',
                  },
                }}
              >
                <CardMedia
                  component="img"
                  image="/assets/_mock/banner.png"
                  sx={{
                    borderRadius: 2,
                    overflow: 'hidden',
                    mb: 3,
                    maxHeight: 200,
                  }}
                />

                <Grid container spacing={3} alignItems="center">
                  <Grid item xs={12} md={6}>
                    <Stack spacing={1} px={3} justifyContent="center">
                      <Stack direction="row" spacing={1} alignItems="center">
                        <Typography variant="h2">
                          {course?.title}
                        </Typography>
                        <Tooltip title="Copiar o link do curso">
                          <IconButton onClick={handleCopyLink}>
                            <IconCopy size={18} />
                          </IconButton>
                        </Tooltip>
                      </Stack>
                      <Typography variant="body2" color="text.secondary">
                        Lorem ipsum dolor sit amet. Nam porro quidem quo consequatur.
                      </Typography>
                    </Stack>
                  </Grid>
                </Grid>
              </MainCard>
            </Grid>
          </Grid>
        </Grid>
          <Grid item xs={12} md={12}>
            <MainCard content={false}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    padding: 3,
                    borderWidth: 1,
                    borderColor: theme.palette.grey[300],
                    borderRadius: 3,
                  }}
                >
                  <Grid item xs={12}>
                    <iframe
                      src='https://www.youtube.com/embed/E7wJTI-1dvQ'
                        frameborder='0'
                        allow='autoplay; encrypted-media'
                        allowfullscreen
                        title='Curso'
                        width='100%'
                        height='700'
                      />
                  </Grid>
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack direction="row" spacing={2} alignItems="center" mt={2}>
                        <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            showUserDialog.onTrue();
                          }}
                          sx={{ px: 5 }}
                        >
                            Play
                          </Button>
                          </>
                      <Button variant="outlined">
                        Reiniciar o curso
                      </Button>
                      <Stack direction="row" spacing={2} alignItems="right" mt={2}>
                        <Button variant="outlined" onClick={() => {
                            if (favorites?.some(fav => fav.id === course?.id)) {
                              const newState = favorites.filter(item => item.id !== course?.id);
                              setFavorites(newState);
                            } else {
                              setFavorites([...favorites, course!]);
                            }
                        }}>
                          {favorites?.some(fav => fav.id === course?.id) ? 'Desfavoritar' : 'Favoritar'}
                        </Button>
                      </Stack>
                    </Stack>
                  </Stack>
                  <Stack paddingTop={2} spacing={1}>
                    <Typography variant="body1" fontSize={15}>
                      Sobre o curso
                    </Typography>
                    <Typography>{course?.description}</Typography>
                  </Stack>
                  <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant="subtitle1" pt={4}>
                      Dúvidas comuns:
                    </Typography>
                    <Stack paddingTop={2} spacing={1} key={1}>
                      <Typography variant="body2">Lorem ipsum dolor sit amet. Nam porro quidem quo consequatur numquam?</Typography>
                      <Typography>Aut ipsum cupiditate a obcaecati voluptatum.</Typography>
                    </Stack>
                    <Stack paddingTop={2} spacing={1} key={1}>
                      <Typography variant="body2">Lorem ipsum dolor sit amet. Nam porro quidem quo consequatur numquam?</Typography>
                      <Typography>Aut ipsum cupiditate a obcaecati voluptatum.</Typography>
                    </Stack>
                    <Stack paddingTop={2} spacing={1} key={1}>
                      <Typography variant="body2">Lorem ipsum dolor sit amet. Nam porro quidem quo consequatur numquam?</Typography>
                      <Typography>Aut ipsum cupiditate a obcaecati voluptatum.</Typography>
                    </Stack>
                </Box>
              </Grid>
             </MainCard>
          </Grid>
      </Grid>
    </>
  );
}
