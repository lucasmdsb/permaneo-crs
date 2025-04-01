import { useMemo, ReactNode } from 'react';

import { CssBaseline, StyledEngineProvider } from '@mui/material';
import {
  createTheme,
  ThemeOptions,
  ThemeProvider,
  Theme,
  TypographyVariantsOptions,
} from '@mui/material/styles';

import { NextAppDirEmotionCacheProvider } from './emotionCache';
import { Palette } from './palette';
import { Typography } from './typography';

import componentStyleOverrides from './compStyleOverride';
import { customShadows } from './shadows';

import colors from './scss/_theme-permaneo.module.scss';

interface CustomShadowProps {
  z1: string;
  z8: string;
  z12: string;
  z16: string;
  z20: string;
  z24: string;
  primary: string;
  secondary: string;
  orange: string;
  success: string;
  warning: string;
  error: string;
}

interface Props {
  children: ReactNode;
}

export function ThemeCustomization({ children }: Props) {
  const theme: Theme = useMemo<Theme>(() => Palette(), []);

  const themeTypography = useMemo<TypographyVariantsOptions>(
    () => Typography(theme),
    [theme],
  );

  const themeCustomShadows = useMemo<CustomShadowProps>(
    () => customShadows(theme),
    [theme],
  );

  const color = colors;

  const themeOption = useMemo(() => {
    return {
      colors: color,
      heading: color.grey900,
      paper: color.paper,
      backgroundDefault: color.paper,
      background: color.primaryLight,
      darkTextPrimary: color.grey700,
      darkTextSecondary: color.grey500,
      textDark: color.grey900,
      menuSelected: color.secondaryDark,
      menuSelectedBack: color.secondaryLight,
      divider: color.grey200,
    };
  }, [color]);

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      ...themeOption,
      direction: 'ltr',
      palette: theme.palette,
      mixins: {
        toolbar: {
          minHeight: '48px',
          padding: '16px',
          '@media (min-width: 600px)': {
            minHeight: '48px',
          },
        },
      },
      typography: themeTypography,
      customShadows: themeCustomShadows,
    }),
    [theme, themeCustomShadows, themeTypography, themeOption],
  );

  const themes: Theme = createTheme(themeOptions);
  themes.components = useMemo(() => componentStyleOverrides(themes), [themes]);

  return (
    <StyledEngineProvider injectFirst>
      <NextAppDirEmotionCacheProvider options={{ key: 'mui' }}>
        <ThemeProvider theme={themes}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </NextAppDirEmotionCacheProvider>
    </StyledEngineProvider>
  );
}
