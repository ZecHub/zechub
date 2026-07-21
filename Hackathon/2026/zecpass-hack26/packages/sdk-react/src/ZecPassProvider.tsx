'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import type { ZecPassConfig, ZecPassSession } from './types';

interface ZecPassContextValue {
  config: ZecPassConfig;
  session: ZecPassSession | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: () => void;
  logout: () => Promise<void>;
  getToken: () => string | null;
}

const ZecPassContext = createContext<ZecPassContextValue | null>(null);

export function useZecPassContext(): ZecPassContextValue {
  const context = useContext(ZecPassContext);
  if (!context) throw new Error('useZecPassContext must be used within a ZecPassProvider');
  return context;
}

interface ZecPassProviderProps extends ZecPassConfig {
  children: React.ReactNode;
}

export function ZecPassProvider({ children, appId, zecpassUrl = 'https://zecpass.app', redirectUri, scope = ['identity'] }: ZecPassProviderProps) {
  const [session, setSession] = useState<ZecPassSession | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const config: ZecPassConfig = { appId, zecpassUrl, redirectUri, scope };

  useEffect(() => {
    const token = typeof window !== 'undefined' ? localStorage.getItem('zecpass_token') : null;
    if (token) {
      fetch(`${zecpassUrl}/api/auth/session`, {
        headers: { Authorization: `Bearer ${token}` },
      })
        .then((r) => r.json())
        .then((data) => { if (data.valid) setSession(data); })
        .catch(() => localStorage.removeItem('zecpass_token'))
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, [zecpassUrl]);

  const login = useCallback(() => {
    const params = new URLSearchParams({
      app_id: appId,
      redirect_uri: redirectUri,
      scope: (scope || ['identity']).join(','),
    });
    window.location.href = `${zecpassUrl}/auth/login?${params}`;
  }, [appId, redirectUri, scope, zecpassUrl]);

  const logout = useCallback(async () => {
    const token = localStorage.getItem('zecpass_token');
    if (token) {
      try {
        await fetch(`${zecpassUrl}/api/auth/logout`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch {}
    }
    localStorage.removeItem('zecpass_token');
    setSession(null);
  }, [zecpassUrl]);

  const getToken = useCallback(() => {
    return typeof window !== 'undefined' ? localStorage.getItem('zecpass_token') : null;
  }, []);

  return (
    <ZecPassContext.Provider value={{ config, session, isAuthenticated: !!session, isLoading, login, logout, getToken }}>
      {children}
    </ZecPassContext.Provider>
  );
}
