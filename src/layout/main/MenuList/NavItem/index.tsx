import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  ButtonBase,
  Chip,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  useMediaQuery,
} from '@mui/material';

import { useDispatch, useSelector } from '@/store';
import { activeID, activeItem, openDrawer } from '@/store/slices/menu';

import { LinkTarget, NavItemType } from '@/shared/types/nav-link';
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';

interface NavItemProps {
  item: NavItemType;
  level: number;
  parentId?: string;
  isParents?: boolean;
}

export const NavItem = ({
  item,
  level,
  parentId,
  isParents = false,
}: NavItemProps) => {
  const theme = useTheme();
  const matchesSM = useMediaQuery(theme.breakpoints.down('lg'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const pathname = usePathname();

  const { selectedItem, drawerOpen } = useSelector((state) => state.menu);
  const isSelected = selectedItem.findIndex((id) => id === item.id) > -1;

  const Icon = item?.icon!;
  const itemIcon = item?.icon ? (
    <Icon
      stroke={1.5}
      size={drawerOpen ? '20px' : '24px'}
      style={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        ...(isParents && { fontSize: 20, stroke: '1.5' }),
      }}
    />
  ) : (
    <FiberManualRecordIcon
      sx={{
        color: isSelected
          ? theme.palette.secondary.main
          : theme.palette.text.primary,
        width: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
        height: selectedItem.findIndex((id) => id === item?.id) > -1 ? 8 : 6,
      }}
      fontSize={level > 0 ? 'inherit' : 'medium'}
    />
  );

  let itemTarget: LinkTarget = '_self';
  if (item.target) {
    itemTarget = '_blank';
  }

  const itemHandler = (id: string) => {
    dispatch(activeItem([id]));
    if (matchesSM) dispatch(openDrawer(false));
    dispatch(activeID(parentId));
  };

  // active menu item on page load
  useEffect(() => {
    const currentIndex = document.location.pathname
      .toString()
      .split('/')
      .findIndex((id) => id === item.id);
    if (currentIndex > -1) {
      dispatch(activeItem([item.id]));
    }
    // eslint-disable-next-line
  }, [pathname]);

  const textColor = 'text.primary';
  const iconSelectedColor = drawerOpen ? 'text.primary' : 'secondary.main';

  return (
    <>
      {matchDownMd ? (
        <ListItemButton
          component={Link}
          href={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          disableRipple={!drawerOpen}
          sx={{
            zIndex: 1201,
            borderRadius: `8px`,
            mb: 0.5,
            pl: drawerOpen ? `${level * 24}px` : 1.25,
            ...(drawerOpen &&
              level === 1 && {
                '&:hover': {
                  background: theme.palette.grey[200],
                },
                '&.Mui-selected': {
                  background: theme.palette.grey[100],
                  color: iconSelectedColor,
                  '&:hover': {
                    color: iconSelectedColor,
                    background: theme.palette.grey[200],
                  },
                },
              }),
            ...((!drawerOpen || level !== 1) && {
              py: level === 1 ? 0 : 1,
              '&:hover': {
                bgcolor: 'transparent',
              },
              '&.Mui-selected': {
                '&:hover': {
                  bgcolor: 'transparent',
                },
                bgcolor: 'transparent',
              },
            }),
          }}
          selected={isSelected}
          onClick={() => itemHandler(item.id!)}
        >
          <ButtonBase
            sx={{ borderRadius: `8px` }}
            disableRipple={drawerOpen}
            aria-label="theme-icon"
          >
            <ListItemIcon
              sx={{
                minWidth: level === 1 ? 36 : 18,
                color: isSelected ? iconSelectedColor : textColor,
                ...(!drawerOpen &&
                  level === 1 && {
                    borderRadius: `8px`,
                    width: 46,
                    height: 46,
                    alignItems: 'center',
                    justifyContent: 'center',
                    '&:hover': {
                      bgcolor: theme.palette.grey[200],
                    },
                    ...(isSelected && {
                      bgcolor: theme.palette.grey[100],
                      '&:hover': {
                        bgcolor: theme.palette.grey[200],
                      },
                    }),
                  }),
              }}
            >
              {itemIcon}
            </ListItemIcon>
          </ButtonBase>

          {(drawerOpen || (!drawerOpen && level !== 1)) && (
            <ListItemText
              primary={
                <Typography
                  variant={isSelected ? 'h5' : 'body1'}
                  color="inherit"
                >
                  {item.title}
                </Typography>
              }
              secondary={
                item.caption && (
                  <Typography
                    variant="caption"
                    sx={{ ...theme.typography.subMenuCaption }}
                    display="block"
                    gutterBottom
                  >
                    {item.caption}
                  </Typography>
                )
              }
            />
          )}

          {drawerOpen && item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      ) : (
        <ListItemButton
          component={Link}
          href={item.url!}
          target={itemTarget}
          disabled={item.disabled}
          {...(isParents && {
            onClick: () => {
              dispatch(activeID(item.id!));
            },
          })}
          sx={{
            borderRadius: isParents ? `8px` : 0,
            mb: isParents ? 0 : 0.5,
            alignItems: 'flex-start',
            backgroundColor: 'transparent',
            '&:hover': {
              backgroundColor: theme.palette.grey[100],
            },
            py: 1,
            pl: 2,
            mr: isParents ? 1 : 0,
          }}
          selected={isSelected}
          onClick={() => itemHandler(item.id!)}
        >
          {item?.icon && (
            <ListItemIcon
              sx={{
                my: 'auto',
                minWidth: !item?.icon ? 18 : 36,
              }}
            >
              {itemIcon}
            </ListItemIcon>
          )}

          <ListItemText
            primary={
              <Typography variant={isSelected ? 'h5' : 'body1'} color="inherit">
                {item.title}
              </Typography>
            }
            secondary={
              item.caption && (
                <Typography
                  variant="caption"
                  sx={{ ...theme.typography.subMenuCaption }}
                  display="block"
                  gutterBottom
                >
                  {item.caption}
                </Typography>
              )
            }
          />

          {item.chip && (
            <Chip
              color={item.chip.color}
              variant={item.chip.variant}
              size={item.chip.size}
              label={item.chip.label}
              avatar={item.chip.avatar && <Avatar>{item.chip.avatar}</Avatar>}
            />
          )}
        </ListItemButton>
      )}
    </>
  );
};
