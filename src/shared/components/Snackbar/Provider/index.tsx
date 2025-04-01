'use client';

import { useRef } from 'react';
import {
  SnackbarProvider as NotistackProvider,
  closeSnackbar,
} from 'notistack';
import IconButton from '@mui/material/IconButton';
import { StyledIcon, StyledNotistack } from '../styles';
import {
  IconAlertTriangle,
  IconCheck,
  IconInfoCircle,
  IconX,
} from '@tabler/icons-react';

interface SnackbarProviderProps {
  children: React.ReactNode;
}

const SnackbarProvider = ({ children }: SnackbarProviderProps) => {
  const notistackRef = useRef<any>(null);

  return (
    <NotistackProvider
      ref={notistackRef}
      maxSnack={5}
      preventDuplicate
      autoHideDuration={3000}
      TransitionComponent={undefined}
      variant="success"
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      iconVariant={{
        info: (
          <StyledIcon color="info">
            <IconInfoCircle size={24} />
          </StyledIcon>
        ),
        success: (
          <StyledIcon color="success">
            <IconCheck size={24} />
          </StyledIcon>
        ),
        warning: (
          <StyledIcon color="warning">
            <IconAlertTriangle size={24} />
          </StyledIcon>
        ),
        error: (
          <StyledIcon color="error">
            <IconX size={24} />
          </StyledIcon>
        ),
      }}
      Components={{
        default: StyledNotistack,
        info: StyledNotistack,
        success: StyledNotistack,
        warning: StyledNotistack,
        error: StyledNotistack,
      }}
    >
      {children}
    </NotistackProvider>
  );
};

export default SnackbarProvider;
