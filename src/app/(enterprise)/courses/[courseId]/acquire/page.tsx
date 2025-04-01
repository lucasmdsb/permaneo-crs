/* eslint-disable @next/next/no-img-element */
'use client';

import React, {useState } from 'react';
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
  Alert,
  Box,
} from '@mui/material';
import { MainCard } from '@/shared/components/MainCard';
import {
  IconBrandWhatsapp,
  IconClipboardText,
  IconCopy,
  IconCurrencyDollar,
} from '@tabler/icons-react';
import Link from 'next/link';

import { useSnackbar } from 'notistack';
import { useBoolean } from '@/hooks/tools/boolean.tool';
import { ShowToAcquireDialog } from './_components/ShowToAcquireDialog';
import { Course } from '@/schema';
import { coursesMock } from '@/_mock/courses';
import { useParams } from 'next/navigation';
import { useSessionStorage } from '@/hooks/tools/session-storage.tool';

type FavoritesSession = Course[];

export default function CourseAcquirePage() {
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
        console.error(error);
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
            <MainCard title="Informações" content={false}>
              <Grid item xs={12}>
                <Box
                  sx={{
                    padding: 3,
                    borderWidth: 1,
                    borderColor: theme.palette.grey[300],
                    borderRadius: 3,
                  }}
                >
                  <Stack flexDirection="row" justifyContent="space-between">
                    <Stack flexDirection="row" alignItems="center" gap={1}>
                    <Alert
                        severity="error"
                        sx={{
                          backgroundColor: 'white',
                          color: 'black',
                          p: 2,
                        }}
                      >
                        Oferta por tempo limitado!
                      </Alert>
                    </Stack>
                    <Stack direction="row" spacing={2} alignItems="center">
                        <>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            showUserDialog.onTrue();
                          }}
                          sx={{ px: 5 }}
                        >
                            Comprar
                        </Button>
                          </>
                      <Button variant="outlined" startIcon={
                            <IconBrandWhatsapp color="green" size={16} />
                          }
                          LinkComponent={Link}
                          href={`https://wa.me/85987043993`}>
                        Entre em contato
                      </Button>
                      <Button variant="outlined"
                        onClick={() => {
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
                  <Stack paddingTop={2} spacing={1}>
                    <Typography variant="body1" fontSize={15}>
                      Sobre o curso
                    </Typography>
                    <Typography>{course?.description}</Typography>
                  </Stack>
                  <Divider sx={{ paddingTop: 2 }} />
                  <Grid pt={2} alignItems="center" container spacing={2}>
                    <Grid item xs={6}>
                      <Stack flexDirection="row" gap={1} alignItems="center">
                        <IconClipboardText size={18} />
                        <Typography>Quantidade de aulas</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                    {course?.leassons}
                    </Grid>
                    <Grid item xs={6}>
                      <Stack flexDirection="row" gap={1} alignItems="center">
                        <IconCurrencyDollar size={18} />
                        <Typography>Preço</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={6}>
                      {course?.price}
                    </Grid>
                  </Grid>
                  <Divider sx={{ paddingTop: 2 }} />
                    <Typography variant="subtitle1" pt={4}>
                      Perguntas complementares:
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

      {showUserDialog.value && (
        <ShowToAcquireDialog
          onClose={showUserDialog.onFalse}
          open
        />
      )}
    </>
  );
}
