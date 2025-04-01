import { memo, useEffect } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, List, Typography, useMediaQuery } from '@mui/material';

import { NavItem } from './NavItem';
import { NavGroup } from './NavGroup';

import menuItems from '@/menu-items';

import { useSelector } from '@/store';

import { NavItemType } from '@/shared/types/nav-link';
import { useAuth } from '@/hooks/auth';

const MenuList = () => {
  const theme = useTheme();
  const { user } = useAuth();

  console.log({ user });

  const { drawerOpen } = useSelector((state) => state.menu);

  // const handlerMenuItem = () => {
  //   const isFound = menuItems.items.some((element) => {
  //     if (element.id === 'widget') {
  //       return true;
  //     }
  //     return false;
  //   });
  // };

  // useEffect(() => {
  //   handlerMenuItem();
  // }, []);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const lastItem = !matchDownMd ? 7 : null;

  let lastItemIndex = menuItems.items.length - 1;
  let remItems: NavItemType[] = [];
  let lastItemId: string;

  if (lastItem && lastItem < menuItems.items.length) {
    lastItemId = menuItems.items[lastItem - 1].id!;
    lastItemIndex = lastItem - 1;
    remItems = menuItems.items
      .slice(lastItem - 1, menuItems.items.length)
      .map((item) => ({
        title: item.title,
        elements: item.children,
        icon: item.icon,
        ...(item.url && {
          url: item.url,
        }),
      }));
  }

  const filteredMenuItems = menuItems.items.filter((item) =>
    item.roles,
  );

  const navItems = filteredMenuItems
    ?.slice(0, lastItemIndex + 1)
    .map((item) => {
      switch (item.type) {
        case 'group':
          if (item.url && item.id !== lastItemId) {
            return (
              <List key={item.id}>
                <NavItem item={item} level={1} isParents />
              </List>
            );
          }
          return (
            <NavGroup
              key={item.id}
              item={item}
              lastItem={lastItem!}
              remItems={remItems}
              lastItemId={lastItemId}
            />
          );
        default:
          return (
            <Typography key={item.id} variant="h6" color="error" align="center">
              Menu Items Error
            </Typography>
          );
      }
    });

  return matchDownMd ? (
    <Box {...(drawerOpen && { sx: { mt: 1.5 } })}>{navItems}</Box>
  ) : (
    <>{navItems}</>
  );
};

export default memo(MenuList);
