import { useZecPassContext } from './ZecPassProvider';
import type { ZecPassSession } from './types';

/**
 * React hook for ZecPass authentication.
 * Must be used within a ZecPassProvider.
 */
export function useZecPass(): {
  session: ZecPassSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  getToken: () => string | null;
} {
  const { session, isAuthenticated, isLoading, login, logout, getToken } = useZecPassContext();
  return { session, isAuthenticated, isLoading, login, logout, getToken };
}
