import { useEffect, useRef, useState } from 'react';

import { useTheme } from '@mui/material/styles';
import {
  Avatar,
  Box,
  Chip,
  ClickAwayListener,
  Divider,
  Grid,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Paper,
  Popper,
  Typography,
} from '@mui/material';

import { MainCard } from '@/shared/components/MainCard';
import { Transitions } from '@/shared/components/Transitions';

import {
  IconLogout,
  IconSettings,
  IconUser,
} from '@tabler/icons-react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/auth';

export const ProfileSection = () => {
  const theme = useTheme();
  const router = useRouter();
  const { logout, user } = useAuth();
  const [open, setOpen] = useState(false);

  const anchorRef = useRef<any>(null);

  const handleLogout = async () => {
    try {
      await logout();
      handleToggle();
      router.replace('/');
    } catch (error) {
      console.error(error);
    }
  };

  const handleClose = (
    event: React.MouseEvent<HTMLDivElement> | MouseEvent | TouchEvent,
  ) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }

    setOpen(false);
  };

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const prevOpen = useRef(open);
  useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Box>
      <Chip
        sx={{
          height: '48px',
          alignItems: 'center',
          borderRadius: '27px',
          transition: 'all .2s ease-in-out',
          color: theme.palette.grey[100],
          borderColor: theme.palette.grey[100],
          backgroundColor: theme.palette.grey[100],
          '&[aria-controls="menu-list-grow"], &:hover': {
            background: `${theme.palette.grey[200]}!important`,
          },
          '& .MuiChip-label': {
            lineHeight: 0,
          },
        }}
        icon={
          <Avatar
            sx={{
              ...theme.typography.mediumAvatar,
              margin: '8px 0 8px 8px !important',
              cursor: 'pointer',
              bgcolor: theme.palette.grey[300],
            }}
            ref={anchorRef}
            aria-controls={open ? 'menu-list-grow' : undefined}
            aria-haspopup="true"
            color="white"
            alt="user images"
          >
            {user?.name?.at(0)}
          </Avatar>
        }
        label={
          <IconSettings
            stroke={1.5}
            size="24px"
            color={theme.palette.primary.main}
          />
        }
        variant="outlined"
        ref={anchorRef}
        aria-controls={open ? 'menu-list-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
        color="primary"
      />
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        modifiers={[
          {
            name: 'offset',
            options: {
              offset: [0, 14],
            },
          },
        ]}
      >
        {({ TransitionProps }) => (
          <ClickAwayListener onClickAway={handleClose}>
            <Transitions in={open} {...TransitionProps}>
              <Paper>
                {open && (
                  <MainCard
                    sx={{ p: 2, minWidth: 300 }}
                    border={false}
                    elevation={16}
                    content={false}
                    boxShadow
                    shadow={theme.shadows[10]}
                  >
                    <Grid container flexDirection="column">
                      <Grid item>
                        <Avatar
                          sx={{
                            ...theme.typography.mediumAvatar,
                            cursor: 'pointer',
                            mb: 2,
                            bgcolor: theme.palette.grey[300],
                          }}
                          color="white"
                          alt={user?.name}
                        >
                          M
                        </Avatar>
                        <Typography variant="h4" fontSize={16}>
                          {user?.name}
                        </Typography>
                        <Typography variant="h5" fontSize={14} marginTop={0.5}>
                          {user?.email}
                        </Typography>
                      </Grid>
                      <Grid item mt={2}>
                        <Divider />
                      </Grid>
                      <Grid item>
                        <List>
                          <ListItemButton>
                            <ListItemIcon>
                              <IconUser stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Link
                                  href="#"
                                  style={{ textDecoration: 'none' }}
                                >
                                  <Typography variant="body2">
                                    Perfil
                                  </Typography>
                                </Link>
                              }
                            />
                          </ListItemButton>
                          <ListItemButton onClick={handleLogout}>
                            <ListItemIcon>
                              <IconLogout stroke={1.5} size="20px" />
                            </ListItemIcon>
                            <ListItemText
                              primary={
                                <Typography variant="body2">Sair</Typography>
                              }
                            />
                          </ListItemButton>
                        </List>
                      </Grid>
                    </Grid>
                  </MainCard>
                )}
              </Paper>
            </Transitions>
          </ClickAwayListener>
        )}
      </Popper>
    </Box>
  );
};
