/* eslint-disable @next/next/no-img-element */
'use client';

import React, { useEffect, useState } from 'react';

import {
  Box,
  FormControl,
  Grid,
  InputAdornment,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

import { MainCard } from '@/shared/components/MainCard';
import { CourseCard } from './_components/CourseCard';
import { coursesMock } from '@/_mock/courses';
import { Course } from '@/schema';
import { useAuth } from '@/hooks/auth';

export default function CoursesPage() {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);

  const loadData = async () => {
    setCourses(coursesMock);
  };

  useEffect(() => {
    loadData();
  }, []);

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
                    Cursos
                  </Typography>
                  <Typography variant="caption" fontSize={14}>
                    Todos os cursos
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
            <Grid item>
              <FormControl
                sx={{
                  minWidth: { sm: '100%', md: 350 },
                  mr: { sm: 0, md: 1 },
                  mb: { sm: 1, md: 0 },
                }}
              >
                <TextField
                  placeholder="Buscar vagas"
                  fullWidth
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchIcon fontSize="small" />
                      </InputAdornment>
                    ),
                  }}
                />
              </FormControl>
              <FormControl
                sx={{
                  minWidth: { sm: '100%', md: 200 },
                  mr: { sm: 0, md: 1 },
                  mb: { sm: 1, md: 0 },
                }}
              >
                <InputLabel>Tipo</InputLabel>
                <Select
                  placeholder="Tipo da vaga"
                >
                  {[
                    { name: 'Amet', value: 'amet' },
                  ].map((item) => (
                    <MenuItem key={item.name} value={item.value}>
                      {item.name}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
          </Grid>
        }
      >
        <Grid container direction="row" spacing={3}>
          {courses && courses.length > 0 ? (
            courses.map((item) => (
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
