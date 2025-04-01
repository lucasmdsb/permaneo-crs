import { forwardRef } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';

import { Box, BoxProps } from '@mui/material';

interface Props extends BoxProps {
  icon: IconifyIcon | string;
}

// eslint-disable-next-line react/display-name
export const Iconify = forwardRef<SVGElement, Props>(
  ({ icon, width = 20, sx, ...rest }, ref) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...rest}
    />
  ),
);
