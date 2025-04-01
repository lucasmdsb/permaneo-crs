// material-ui
import { useTheme } from '@mui/material/styles';
import MuiChip, { ChipProps as MuiChipProps } from '@mui/material/Chip';

interface ChipProps extends MuiChipProps {
  sx?: {};
  disabled?: boolean;
  label?: string;
  avatar?: React.ReactElement | undefined;
  onDelete?: () => void;
  onClick?: () => void;
}

export const Chip = ({
  color,
  disabled,
  sx = {},
  variant,
  ...others
}: ChipProps) => {
  const theme = useTheme();

  let defaultSX = {
    color: theme.palette.primary.main,
    bgcolor: theme.palette.primary.light,
    padding: 1,
    ':hover': {
      color: theme.palette.primary.light,
      bgcolor: theme.palette.primary.dark,
    },
  };

  let outlineSX = {
    color: theme.palette.primary.main,
    bgcolor: 'transparent',
    border: '1px solid',
    padding: 1,
    borderColor: theme.palette.primary.main,
    ':hover': {
      color: theme.palette.primary.light,
      bgcolor: theme.palette.primary.dark,
    },
  };

  switch (color) {
    case 'secondary':
      if (variant === 'outlined') {
        outlineSX = {
          color: theme.palette.secondary.main,
          bgcolor: 'transparent',
          border: '1px solid',
          padding: 1,
          borderColor: theme.palette.secondary.main,
          ':hover': {
            color: theme.palette.secondary.main,
            bgcolor: theme.palette.secondary.light,
          },
        };
      } else {
        defaultSX = {
          color: theme.palette.secondary.main,
          bgcolor: theme.palette.secondary.light,
          padding: 1,
          ':hover': {
            color: theme.palette.secondary.light,
            bgcolor: theme.palette.secondary.main,
          },
        };
      }
      break;
    case 'success':
      if (variant === 'outlined') {
        outlineSX = {
          color: theme.palette.success.dark,
          bgcolor: 'transparent',
          border: '1px solid',
          padding: 1,
          borderColor: theme.palette.success.dark,
          ':hover': {
            color: theme.palette.success.dark,
            bgcolor: theme.palette.success.light + 60,
          },
        };
      } else {
        defaultSX = {
          color: theme.palette.common.white,
          bgcolor: theme.palette.success.dark,
          padding: 1,
          ':hover': {
            color: theme.palette.common.white,
            bgcolor: theme.palette.success.dark,
          },
        };
      }
      break;
    case 'error':
      if (variant === 'outlined') {
        outlineSX = {
          color: theme.palette.error.main,
          bgcolor: 'transparent',
          border: '1px solid',
          padding: 1,
          borderColor: theme.palette.error.main,
          ':hover': {
            color: theme.palette.error.dark,
            bgcolor: theme.palette.error.light,
          },
        };
      } else {
        defaultSX = {
          color: theme.palette.error.dark,
          bgcolor: theme.palette.error.light + 60,
          padding: 1,
          ':hover': {
            color: theme.palette.error.light,
            bgcolor: theme.palette.error.dark,
          },
        };
      }
      break;
    case 'warning':
      if (variant === 'outlined') {
        outlineSX = {
          color: theme.palette.warning.dark,
          bgcolor: 'transparent',
          border: '1px solid',
          padding: 1,
          borderColor: theme.palette.warning.dark,
          ':hover': {
            color: theme.palette.warning.dark,
            bgcolor: theme.palette.warning.light,
          },
        };
      } else {
        defaultSX = {
          color: theme.palette.warning.dark,
          bgcolor: theme.palette.warning.light,
          padding: 1,
          ':hover': {
            color: theme.palette.warning.light,
            bgcolor: theme.palette.warning.dark,
          },
        };
      }
      break;
    default:
  }

  if (disabled) {
    if (variant === 'outlined') {
      outlineSX = {
        color: theme.palette.grey[500],
        bgcolor: 'transparent',
        border: '1px solid',
        padding: 1,
        borderColor: theme.palette.grey[500],
        ':hover': {
          color: theme.palette.grey[500],
          bgcolor: 'transparent',
        },
      };
    } else {
      defaultSX = {
        color: theme.palette.grey[500],
        bgcolor: theme.palette.grey[50],
        padding: 1,
        ':hover': {
          color: theme.palette.grey[500],
          bgcolor: theme.palette.grey[50],
        },
      };
    }
  }

  let SX = defaultSX;
  if (variant === 'outlined') {
    SX = outlineSX;
  }
  SX = { ...SX, ...sx };
  return <MuiChip {...others} sx={SX} />;
};
