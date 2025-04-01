'use client';

import React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider as MuiLocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';

import 'dayjs/locale/pt-br';

type Props = {
  children: React.ReactNode;
};

export const LocalizationProvider: React.FC<Props> = ({ children }) => {
  return (
    <MuiLocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="pt-br">
      {children}
    </MuiLocalizationProvider>
  );
};
