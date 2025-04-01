'use client';

import {
  useEffect,
  useCallback,
  useMemo,
  createContext,
  useContext,
} from 'react';
import { User } from '@/schema';
import { userMock } from '@/_mock/user';
import { useBoolean } from '../tools/boolean.tool';
import { useSessionStorage } from '../tools/session-storage.tool';
import { CircularProgress, Stack } from '@mui/material';
import { deleteCookie, setCookie } from '@/shared/lib/cookie';

export type AuthContextData = {
  user: User;
  isLoading: boolean;
  setUser(user: User): void;
  login(email: string, password: string): Promise<void>;
  logout(): void;
};

interface AuthConsumerProps {
  children: React.ReactNode;
}

interface AuthProviderProps {
  children: React.ReactNode;
}

type UserSession = User;

export const AuthContext = createContext({} as AuthContextData);

export function AuthProvider({ children }: AuthProviderProps) {
  const [data, setData] = useSessionStorage<UserSession>('@permaneo:user');
  const loading = useBoolean(true);

  useEffect(() => {
    async function start() {
      loading.onFalse();
    }

    start();
  }, [loading]);

  const login = useCallback(
    async (email: string, password: string) => {
      const user = userMock;
      setCookie('@permaneo:user', user.id);

      setData(user as any);

      loading.onFalse();
    },
    [loading, setData],
  );

  const logout = useCallback(async () => {
    deleteCookie('@permaneo:user');
    setData(null as any);

    loading.onFalse();
  }, [loading, setData]);

  const memoizedValue = useMemo(
    () => ({
      user: data,
      setUser: setData,
      isLoading: loading.value,
      login,
      logout,
    }),
    [login, logout, data, loading.value, setData],
  );

  return (
    <AuthContext.Provider value={memoizedValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function AuthConsumer({ children }: AuthConsumerProps) {
  return (
    <AuthContext.Consumer>
      {(auth) =>
        auth.isLoading ? (
          <Stack alignItems="center" justifyContent="center" minHeight="80vh">
            <CircularProgress />
          </Stack>
        ) : (
          children
        )
      }
    </AuthContext.Consumer>
  );
}

export function useAuth(): AuthContextData {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }

  return context;
}
