import { ReactElement } from 'react';

import { Box } from '@mui/material';

export function BackgroundPattern({
  children,
}: {
  children: ReactElement | ReactElement[];
}) {
  return (
    <Box
      component="span"
      sx={{
        display: 'flex',
        minHeight: '100vh',
        bgcolor: '#fff',
        position: 'absolute',
        backgroundPosition: 'center center',
        overflow: 'hidden',
        m: 'auto 0 0 auto',
        borderTopLeftRadius: 25,
        borderBottomLeftRadius: 25,
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        opacity: 1,
      }}
    >
      {children}
    </Box>
  );
}
