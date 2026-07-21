import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface AuthState {
  walletAddress: string | null;
  displayName:   string | null;
  sessionToken:  string | null; // only set after ownership verification
  isGuest:       boolean;
  isVerified:    boolean;    // proved ownership (payment/memo challenge)
  isAuthenticated: boolean; // guest or local profile still counts

  // Verified account: server session + sync
  setAuth: (params: {
    walletAddress: string;
    displayName?:  string | null;
    sessionToken:  string;
    isVerified?:   boolean;
  }) => void;
  setGuest:  () => void;
  logout:    () => void;
}

// Admin gate for manual-refresh controls and the sysop console. Gated on the
// verified handle "orb" — display names are DB-unique (case-insensitive), so
// exactly one verified account can ever hold it.
const ADMIN_HANDLE = 'orb';
export const useIsAdmin = () =>
  useAuthStore(s => Boolean(s.isVerified && s.sessionToken && s.displayName?.toLowerCase() === ADMIN_HANDLE));

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      walletAddress:   null,
      displayName:     null,
      sessionToken:    null,
      isGuest:         false,
      isVerified:      false,
      isAuthenticated: false,

      setAuth: ({ walletAddress, displayName = null, sessionToken, isVerified = false }) =>
        set({
          walletAddress,
          displayName,
          sessionToken,
          isVerified,
          isGuest:         false,
          isAuthenticated: true,
        }),

      setGuest: () =>
        set({
          walletAddress:   null,
          displayName:     'Guest',
          sessionToken:    null,
          isGuest:         true,
          isVerified:      false,
          isAuthenticated: true,
        }),

      logout: () => {
        // Revoke the session server-side so it doesn't linger as "live" and get
        // miscounted as another active session on the next login (which would
        // falsely trigger the "signed you out elsewhere" notice).
        const t = get().sessionToken;
        if (t) {
          try { sessionStorage.removeItem('zec-signedout-others'); } catch { /* ignore */ }
          fetch('/api/auth/logout', { method: 'POST', headers: { Authorization: `Bearer ${t}` } }).catch(() => {});
        }
        set({
          walletAddress:   null,
          displayName:     null,
          sessionToken:    null,
          isGuest:         false,
          isVerified:      false,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: 'zec-os-auth',
      // sessionToken IS persisted: it only exists for verified accounts and the
      // server bounds it (SESSION_EXPIRY_HOURS). Without it, verified users
      // would lose sync on every reload.
      partialize: (state) => ({
        walletAddress:   state.walletAddress,
        displayName:     state.displayName,
        sessionToken:    state.sessionToken,
        isGuest:         state.isGuest,
        isVerified:      state.isVerified,
        isAuthenticated: state.isAuthenticated,
      }),
    },
  ),
);
