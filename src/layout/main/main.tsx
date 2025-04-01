/* eslint-disable react-hooks/exhaustive-deps */
'use client';

import { styled, Theme } from '@mui/material/styles';

interface MainStyleProps {
  theme: Theme;
  open: boolean;
}

export const Main = styled('main', {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }: MainStyleProps) => ({
  ...theme.typography.mainContent,
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  ...(!open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.shorter + 200,
    }),
    [theme.breakpoints.up('md')]: {
      marginLeft: '20px',
      width: `calc(100% - 260px)`,
      marginTop: 135,
    },
  }),
  ...(open && {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.shorter + 200,
    }),
    marginLeft: '20px',
    marginTop: 135,
    width: `calc(100% - 260px)`,
    [theme.breakpoints.up('md')]: {
      marginTop: 135,
    },
  }),
  [theme.breakpoints.down('md')]: {
    marginLeft: '20px',
    padding: '16px',
    marginTop: 88,
    ...(!open && {
      width: `calc(100% - 260px)`,
    }),
  },
  [theme.breakpoints.down('sm')]: {
    marginLeft: '10px',
    marginRight: '10px',
    padding: '16px',
    marginTop: 88,
    ...(!open && {
      width: `calc(100% - 260px)`,
    }),
  },
}));
