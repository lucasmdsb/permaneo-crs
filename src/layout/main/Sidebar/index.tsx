/* eslint-disable react-hooks/exhaustive-deps */
import { memo, useMemo } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Drawer, useMediaQuery } from '@mui/material';

import PerfectScrollbar from 'react-perfect-scrollbar';

import MenuList from '../MenuList';
import { LogoSection } from '../LogoSection';

import { useDispatch, useSelector } from '@/store';
import { openDrawer } from '@/store/slices/menu';

const Sidebar = () => {
  const theme = useTheme();
  const matchUpMd = useMediaQuery(theme.breakpoints.up('md'));
  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  const dispatch = useDispatch();
  const { drawerOpen } = useSelector((state) => state.menu);

  const logo = useMemo(
    () => (
      <Box sx={{ display: 'flex', p: 2 }}>
        <LogoSection />
      </Box>
    ),
    [],
  );

  const drawerContent = (
    <>
      <MenuList />
    </>
  );

  const drawerSX = {
    paddingLeft: drawerOpen ? '16px' : 0,
    paddingRight: drawerOpen ? '16px' : 0,
    marginTop: drawerOpen ? 0 : '20px',
  };

  const drawer = useMemo(
    () => (
      <>
        {matchDownMd ? (
          <Box sx={drawerSX}>{drawerContent}</Box>
        ) : (
          <PerfectScrollbar
            component="div"
            style={{
              height: !matchUpMd ? 'calc(100vh - 56px)' : 'calc(100vh - 88px)',
              ...drawerSX,
            }}
          >
            {drawerContent}
          </PerfectScrollbar>
        )}
      </>
    ),
    [matchUpMd, drawerOpen],
  );

  return (
    <Box
      component="nav"
      sx={{ flexShrink: { md: 0 } }}
      aria-label="mailbox folders"
    >
      <Drawer
        variant={matchUpMd ? 'persistent' : 'temporary'}
        anchor="left"
        open={drawerOpen}
        onClose={() => dispatch(openDrawer(!drawerOpen))}
        sx={{
          '& .MuiDrawer-paper': {
            mt: matchDownMd ? 0 : 11,
            zIndex: 1099,
            width: 260,
            background: theme.palette.background.default,
            color: theme.palette.text.primary,
            borderRight: 'none',
          },
        }}
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        {matchDownMd && logo}
        {drawer}
      </Drawer>
      )
    </Box>
  );
};

export default memo(Sidebar);
