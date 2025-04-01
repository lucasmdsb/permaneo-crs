'use client';

import { useTheme } from '@mui/material/styles';
import {
  Button,
  Card,
  Grid,
  Typography,
  Chip,
  Divider,
  Stack,
  Box,
} from '@mui/material';
import {
  IconBrandSnowflake,
  IconIndentIncrease
} from '@tabler/icons-react';
import Link from 'next/link';
import { Course, User } from '@/schema';

export function CourseCard(data: {course: Course, user: User}) {
  const theme = useTheme();
  const {course, user} = data
  return (
    <Card
      sx={{
        p: 2,
        py: 3,
        background: theme.palette.grey[50],
        border: `1px solid${theme.palette.grey[200]}`,
        '&:hover': {
          borderColor: theme.palette.grey[300],
        },
        position: 'relative',
      }}
    >
      <Grid
        container
        spacing={2}
        flexDirection="column"
        justifyContent="space-between"
        sx={{
          minHeight: 300,
        }}
      >
        <Grid
          item
          flexDirection="row"
          display="flex"
          alignItems="center"
          justifyContent="space-between"
        >
        </Grid>
        {user?.courses?.some(el => el.courseId === course.id) && (
            <Grid
            item
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <Chip
              sx={{ padding: 1 }}
              size="small"
              color="secondary"
              label="Comprado"
              variant="filled"
            />
          </Grid>
        )}

        <Grid item>
          <Typography variant="h4" fontSize={20}>
            {course.title}
          </Typography>
            <Stack mt={1}>
              <Typography variant="caption" color="text.primary">
              Lorem ipsum dolor sit amet.
              </Typography>
            </Stack>
        </Grid>

        <Grid item>
          <Typography variant="body1" color={theme.palette.primary.main}>
            Tipo
          </Typography>
          <Typography variant="body1">
            Amet
          </Typography>
        </Grid>

        <Grid item>
          <Divider />
        </Grid>
        <Grid
          item
          flexDirection="row"
          display="flex"
          justifyContent="space-between"
        >
          <Grid
            flexDirection="row"
            display="flex"
            alignItems="center"
            justifyContent="space-between"
          >
            <IconIndentIncrease size={18} />
            <Typography variant="body2" ml={1}>
              {course.leassons} aulas
            </Typography>
          </Grid>
          {course.title && (
            <Grid
              flexDirection="row"
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <IconBrandSnowflake size={18} />
              <Typography variant="body2" ml={1}>
              {course?.status === 1
                  ? 'Não iniciado'
                  : course?.status === 2
                  ? 'Iniciado'
                  : 'Terminado'}
              </Typography>
            </Grid>
          )}
        </Grid>

        <Grid item>
          <Button
            variant="outlined"
            color="primary"
            fullWidth
            LinkComponent={Link}
            href={user?.courses?.some(el => el.courseId === course.id) ? `/courses/${course.id}` : `/courses/${course.id}/acquire`}
          >
            Acessar curso
          </Button>
        </Grid>
      </Grid>
    </Card>
  );
}
