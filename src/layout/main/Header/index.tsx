import { useTheme } from '@mui/material/styles';
import { Avatar, Box, useMediaQuery } from '@mui/material';

import { LogoSection } from '../LogoSection';

import { ProfileSection } from './ProfileSection';

import { useDispatch, useSelector } from '@/store';
import { openDrawer } from '@/store/slices/menu';

import { IconMenu2 } from '@tabler/icons-react';

export const Header = () => {
  const theme = useTheme();

  const dispatch = useDispatch();

  const { drawerOpen } = useSelector((state) => state.menu);

  const matchDownMd = useMediaQuery(theme.breakpoints.down('md'));

  return (
    <Box
      display="flex"
      flexDirection="row"
      justifyContent="space-between"
      alignItems="center"
      width="100%"
    >
      <Box
        sx={{
          width: 228,
          paddingY: 1,
          display: 'flex',
          [theme.breakpoints.down('md')]: {
            width: 'auto',
          },
        }}
      >
        <Box
          component="span"
          sx={{ display: { xs: 'none', md: 'block' }, flexGrow: 1 }}
        >
          <LogoSection />
        </Box>
        {matchDownMd && (
          <Avatar
            variant="rounded"
            sx={{
              ...theme.typography.commonAvatar,
              ...theme.typography.mediumAvatar,
              overflow: 'hidden',
              transition: 'all .2s ease-in-out',
              background: theme.palette.grey[100],
              color: theme.palette.primary.dark,
              '&:hover': {
                background: theme.palette.grey[200],
                color: theme.palette.primary.dark,
              },
            }}
            onClick={() => dispatch(openDrawer(!drawerOpen))}
            color="inherit"
          >
            <IconMenu2 stroke={1.5} size="20px" />
          </Avatar>
        )}
      </Box>
      <ProfileSection />
    </Box>
  );
};
