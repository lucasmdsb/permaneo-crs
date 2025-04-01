import React, { ReactElement } from 'react';

import { useTheme } from '@mui/material/styles';
import { AppBar, Box, Container, useScrollTrigger } from '@mui/material';

import MenuList from './MenuList';

interface ElevationScrollProps {
  children: ReactElement;
  window?: Window | Node;
}

function ElevationScroll({ children, window }: ElevationScrollProps) {
  const theme = useTheme();

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window!,
  });

  theme.shadows[4] = theme.customShadows.z1;

  return React.cloneElement(children, {
    elevation: trigger ? 4 : 0,
  });
}

export const HorizontalBar = () => {
  const theme = useTheme();

  return (
    <ElevationScroll>
      <AppBar
        sx={{
          top: 78,
          bgcolor: 'background.paper',
          width: '100%',
          height: 65,
          justifyContent: 'center',
          borderTop: `1px solid ${theme.palette.grey[200] + 98}`,
          zIndex: 1098,
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <MenuList />
          </Box>
        </Container>
      </AppBar>
    </ElevationScroll>
  );
};
