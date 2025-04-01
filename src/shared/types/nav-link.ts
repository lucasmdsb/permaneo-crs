import { ReactNode } from 'react';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

import { ChipProps } from '@mui/material';

export type LinkTarget = '_blank' | '_self' | '_parent' | '_top';

export type NavItemType = {
  id?: string;
  icon?: any;
  target?: boolean;
  external?: boolean;
  url?: string | undefined;
  type?: string;
  title?: ReactNode | string;
  color?: 'primary' | 'secondary' | 'default' | undefined;
  caption?: ReactNode | string;
  breadcrumbs?: boolean;
  disabled?: boolean;
  chip?: ChipProps;
  children?: NavItemType[];
  elements?: NavItemType[];
  search?: string;
  roles?: string[];
};
