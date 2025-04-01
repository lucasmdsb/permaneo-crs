import { Theme } from '@mui/material/styles';
import { outlinedInputClasses } from '@mui/material/OutlinedInput';

export default function componentStyleOverrides(theme: Theme) {
  const bgColor = theme.palette.grey[50];
  const menuSelected = theme.palette.primary.dark;

  return {
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          textTransform: 'none',
          borderRadius: '4px',
        },
      },
    },
    MuiPaper: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        rounded: {
          borderRadius: `8px`,
        },
      },
    },
    MuiCardHeader: {
      styleOverrides: {
        root: {
          color: theme.palette.text.dark,
          padding: '24px',
        },
        title: {
          fontSize: '1.125rem',
        },
      },
    },
    MuiCardContent: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiCardActions: {
      styleOverrides: {
        root: {
          padding: '24px',
        },
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: {
          alignItems: 'center',
        },
        outlined: {
          border: '1px dashed',
        },
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          paddingTop: '10px',
          paddingBottom: '10px',
          '&.Mui-selected': {
            color: menuSelected,
            backgroundColor: theme.palette.grey[100],
            '&:hover': {
              backgroundColor: theme.palette.grey[200],
            },
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
          },
          '&:hover': {
            backgroundColor: theme.palette.grey[200],
            color: menuSelected,
            '& .MuiListItemIcon-root': {
              color: menuSelected,
            },
          },
        },
      },
    },
    MuiListItemIcon: {
      styleOverrides: {
        root: {
          color: theme.palette.text.primary,
          minWidth: '36px',
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        primary: {
          color: theme.palette.text.dark,
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        input: {
          color: theme.palette.text.dark,
          '&::placeholder': {
            color: theme.palette.text.secondary,
            fontSize: '0.875rem',
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          [`&.${outlinedInputClasses.focused}`]: {
            [`& .${outlinedInputClasses.notchedOutline}`]: {
              borderWidth: 0.1,
            },
          },
          background: bgColor,
          borderRadius: `8px`,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: theme.palette.grey[400],
          },
          '&:hover $notchedOutline': {
            borderColor: theme.palette.primary.light,
          },
          '&.MuiInputBase-multiline': {
            padding: 1,
          },
        },
        input: {
          fontWeight: 500,
          background: bgColor,
          padding: '15.5px 14px',
          borderRadius: `8px`,
          '&.MuiInputBase-inputSizeSmall': {
            padding: '10px 14px',
            '&.MuiInputBase-inputAdornedStart': {
              paddingLeft: 0,
            },
          },
        },
        inputAdornedStart: {
          paddingLeft: 4,
        },
        notchedOutline: {
          borderRadius: `8px`,
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          '&.Mui-disabled': {
            color: theme.palette.grey[300],
          },
        },
        mark: {
          backgroundColor: theme.palette.background.paper,
          width: '4px',
        },
        valueLabel: {
          color: theme.palette.primary.light,
        },
      },
    },
    MuiAutocomplete: {
      styleOverrides: {
        root: {
          '& .MuiAutocomplete-tag': {
            background: theme.palette.secondary.light,
            borderRadius: 4,
            color: theme.palette.text.dark,
            '.MuiChip-deleteIcon': {
              color: theme.palette.secondary[200],
            },
          },
        },
        popper: {
          borderRadius: `8px`,
          boxShadow:
            '0px 8px 10px -5px rgb(0 0 0 / 20%), 0px 16px 24px 2px rgb(0 0 0 / 14%), 0px 6px 30px 5px rgb(0 0 0 / 12%)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.divider,
          opacity: 1,
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        select: {
          '&:focus': {
            backgroundColor: 'transparent',
          },
        },
      },
    },
    MuiCheckbox: {
      styleOverrides: {
        root: {},
      },
    },
    MuiAvatar: {
      styleOverrides: {
        root: {
          color: theme.palette.primary.light,
          background: theme.palette.grey[300],
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          '&.MuiChip-deletable .MuiChip-deleteIcon': {
            color: 'inherit',
          },
        },
      },
    },
    MuiTimelineContent: {
      styleOverrides: {
        root: {
          color: theme.palette.text.dark,
          fontSize: '16px',
        },
      },
    },
    MuiTreeItem: {
      styleOverrides: {
        label: {
          marginTop: 14,
          marginBottom: 14,
        },
      },
    },
    MuiTimelineDot: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
        },
      },
    },
    MuiInternalDateTimePickerTabs: {
      styleOverrides: {
        tabs: {
          backgroundColor: theme.palette.primary.light,
          '& .MuiTabs-flexContainer': {
            borderColor: theme.palette.primary[200],
          },
          '& .MuiTab-root': {
            color: theme.palette.grey[900],
          },
          '& .MuiTabs-indicator': {
            backgroundColor: theme.palette.primary.dark,
          },
          '& .Mui-selected': {
            color: theme.palette.primary.dark,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          borderBottom: '1px solid',
          borderColor: theme.palette.grey[200],
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          padding: '12px 0 12px 0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          borderColor: theme.palette.grey[200],
          '&.MuiTableCell-head': {
            fontSize: '0.875rem',
            color: theme.palette.grey[900],
            fontWeight: 500,
          },
        },
      },
    },
    MuiDateTimePickerToolbar: {
      styleOverrides: {
        timeDigitsContainer: {
          alignItems: 'center',
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: theme.palette.background.paper,
          background: theme.palette.text.primary,
        },
      },
    },
    MuiDialogTitle: {
      styleOverrides: {
        root: {
          fontSize: '1.25rem',
        },
      },
    },
    MuiPaginationItem: {
      styleOverrides: {
        root: {
          margin: '3px',
        },
      },
    },
    MuiDataGrid: {
      defaultProps: {
        rowHeight: 54,
      },
      styleOverrides: {
        root: {
          border: 'none',
          '& .MuiFormControl-root>.MuiInputBase-root': {
            backgroundColor: theme.palette.background.default + ' !important',
            borderColor:
              theme.palette.mode === 'dark'
                ? theme.palette.divider + 20 + ' !important'
                : theme.palette.divider + ' !important',
          },
        },
        row: {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        columnHeader: {
          paddingLeft: 24,
          paddingRight: 24,
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
        columnHeaderCheckbox: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        cellCheckbox: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        cell: {
          border: 'none',
          paddingLeft: 24,
          paddingRight: 24,
          '&.MuiDataGrid-cell--withRenderer > div ': {
            ' > .high': {
              backgroundColor: theme.palette.success.light,
            },
            '& > .medium': {
              backgroundColor: theme.palette.warning.light,
            },
            '& > .low': {
              backgroundColor: theme.palette.error.light,
            },
          },
        },
        columnsContainer: {
          borderColor: theme.palette.divider,
        },
        columnSeparator: {
          borderColor: theme.palette.divider,
        },
        withBorderColor: {
          borderColor: theme.palette.divider,
        },
      },
    },
  };
}
