'use client';

import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

import { Provider } from 'react-redux';
import { ThemeCustomization } from '@/themes';
import { store } from '@/store';
import { AuthProvider } from './auth';
import { SnackbarProvider } from '@/shared/components/Snackbar';
import { LocalizationProvider } from './localization.hook';

interface AppContainerProps {
  children: React.ReactNode;
}

export function AppContainer({ children }: AppContainerProps) {
  return (
    <AuthProvider>
      <LocalizationProvider>
        <SnackbarProvider>
          <Provider store={store}>
            <ThemeCustomization>{children}</ThemeCustomization>
          </Provider>
        </SnackbarProvider>
      </LocalizationProvider>
    </AuthProvider>
  );
}
