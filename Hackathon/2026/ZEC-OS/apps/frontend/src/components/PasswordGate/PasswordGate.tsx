'use client';

import { useState, useEffect, ReactNode } from 'react';

interface PasswordGateProps {
  children: ReactNode;
}

const SESSION_KEY = 'zec-os-auth';

export function PasswordGate({ children }: PasswordGateProps) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [isProtected, setIsProtected] = useState<boolean | null>(null);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Check if site is protected and if user is already authenticated
  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Check if password protection is enabled
        const res = await fetch('/api/auth');
        const data = await res.json();

        if (!data.protected) {
          // No password required
          setIsProtected(false);
          setIsAuthenticated(true);
          return;
        }

        setIsProtected(true);

        // Check sessionStorage for existing auth
        const sessionAuth = sessionStorage.getItem(SESSION_KEY);
        if (sessionAuth === 'true') {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch {
        // If check fails, assume not protected (allow access)
        setIsProtected(false);
        setIsAuthenticated(true);
      }
    };

    checkAuth();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await res.json();

      if (data.success) {
        sessionStorage.setItem(SESSION_KEY, 'true');
        setIsAuthenticated(true);
      } else {
        setError('Invalid password');
        setPassword('');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Still checking auth status
  if (isAuthenticated === null || isProtected === null) {
    return (
      <div
        className="fixed inset-0 flex items-center justify-center"
        style={{ background: '#0a0a1a' }}
      >
        <div className="text-center">
          <div
            className="text-[#00ff88] animate-pulse"
            style={{ fontFamily: 'VT323, monospace', fontSize: '24px' }}
          >
            Initializing...
          </div>
        </div>
      </div>
    );
  }

  // Authenticated or not protected - render app
  if (isAuthenticated) {
    return <>{children}</>;
  }

  // Show password gate
  return (
    <div
      className="fixed inset-0 flex items-center justify-center"
      style={{ background: '#0a0a1a' }}
    >
      <div
        className="p-6 text-center"
        style={{
          background: '#1a1a2e',
          border: '2px solid #3a4a3a',
          boxShadow: 'inset 1px 1px 0 #4a5a4a, inset -1px -1px 0 #2a3a2a',
          maxWidth: '360px',
          width: '90%',
        }}
      >
        <img
          src="/zec-logo.svg"
          alt="ZEC-OS"
          className="w-16 h-16 mx-auto mb-4"
          style={{ imageRendering: 'pixelated' }}
        />

        <h1
          className="mb-2"
          style={{
            fontFamily: '"Press Start 2P", monospace',
            fontSize: '16px',
            color: '#f4b728',
          }}
        >
          ZEC-OS
        </h1>

        <p
          className="mb-6"
          style={{
            fontFamily: 'VT323, monospace',
            fontSize: '18px',
            color: '#00ff88',
          }}
        >
          Enter password to continue
        </p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            autoFocus
            className="w-full px-3 py-2 mb-3 text-center"
            style={{
              background: '#0a0a1a',
              border: '2px solid #3a4a3a',
              color: '#00ff88',
              fontFamily: 'VT323, monospace',
              fontSize: '18px',
              outline: 'none',
            }}
            disabled={isLoading}
          />

          {error && (
            <p
              className="mb-3"
              style={{
                fontFamily: 'VT323, monospace',
                fontSize: '16px',
                color: '#ff6600',
              }}
            >
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={isLoading || !password}
            className="w-full px-4 py-2"
            style={{
              background: isLoading ? '#2a3a2a' : '#3a4a3a',
              border: '2px solid #4a5a4a',
              color: isLoading ? '#666' : '#f4b728',
              fontFamily: 'VT323, monospace',
              fontSize: '18px',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              boxShadow: 'inset 1px 1px 0 #5a6a5a, inset -1px -1px 0 #2a3a2a',
            }}
          >
            {isLoading ? 'Verifying...' : 'Enter'}
          </button>
        </form>
      </div>
    </div>
  );
}

export default PasswordGate;
