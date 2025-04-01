import { MaterialDesignContent } from 'notistack';

import { styled, alpha } from '@mui/material/styles';

export const StyledNotistack = styled(MaterialDesignContent)(({ theme }) => {
  return {
    '& #notistack-snackbar': {
      ...theme.typography.subtitle2,
      padding: 0,
      flexGrow: 1,
    },
    '&.notistack-MuiContent': {
      padding: theme.spacing(0.5),
      paddingRight: theme.spacing(2),
      color: theme.palette.text.primary,
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.background.paper,
    },
    '&.notistack-MuiContent-default': {
      padding: theme.spacing(2),
      color: theme.palette.common.white,
      backgroundColor: theme.palette.grey[800],
    },
  };
});

type StyledIconProps = {
  color: 'info' | 'success' | 'warning' | 'error';
};

export const StyledIcon = styled('span')<StyledIconProps>(
  ({ color, theme }) => ({
    width: 50,
    height: 50,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: theme.spacing(1.5),
    color: theme.palette[color].main,
    borderRadius: theme.shape.borderRadius,
  }),
);
