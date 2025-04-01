'use client';

import React, { Ref } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  CardProps,
  CardHeaderProps,
  CardContentProps,
} from '@mui/material';

const headerSX = {
  '& .MuiCardHeader-action': { mr: 0 },
};

export interface MainCardProps {
  border?: boolean;
  boxShadow?: boolean;
  children: React.ReactNode | string;
  style?: React.CSSProperties;
  content?: boolean;
  className?: string;
  contentClass?: string;
  contentSX?: CardContentProps['sx'];
  sx?: CardProps['sx'];
  secondary?: CardHeaderProps['action'];
  shadow?: string;
  elevation?: number;
  title?: React.ReactNode | string;
}

// eslint-disable-next-line react/display-name
export const MainCard = React.forwardRef(
  (
    {
      border = false,
      boxShadow,
      children,
      content = true,
      contentClass = '',
      contentSX = {},
      secondary,
      shadow,
      sx = {},
      title,
      ...others
    }: MainCardProps,
    ref: Ref<HTMLDivElement>,
  ) => {
    const theme = useTheme();

    return (
      <Card
        ref={ref}
        {...others}
        sx={{
          border: border ? '1px solid' : 'none',
          borderColor: theme.palette.grey[300] + 98,
          ':hover': {
            boxShadow: boxShadow
              ? shadow || '0 2px 14px 0 rgb(32 40 45 / 8%)'
              : 'inherit',
          },
          ...sx,
        }}
      >
        {title && <CardHeader sx={headerSX} title={title} action={secondary} />}

        {title && <Divider />}

        {content && (
          <CardContent sx={contentSX} className={contentClass}>
            {children}
          </CardContent>
        )}
        {!content && children}
      </Card>
    );
  },
);
