import { useCallback, useState } from 'react';

type UseSessionStorage<T> = [T, (value: T) => void, () => void];

export function useSessionStorage<T>(
  key: string,
  initialValue?: T,
): UseSessionStorage<T> {
  const [state, setState] = useState<T>(() => {
    try {
      const storedValue = sessionStorage.getItem(key);
      return storedValue ? JSON.parse(storedValue) : initialValue;
    } catch (error) {
      return initialValue;
    }
  });

  const setValue = useCallback(
    (value: T) => {
      try {
        setState(value);
        sessionStorage.setItem(key, JSON.stringify(value));
      } catch (error) {
        console.log(error);
      }
    },
    [key],
  );

  const removeValue = useCallback(() => {
    sessionStorage.removeItem(key);
  }, [key]);

  return [state, setValue, removeValue];
}
