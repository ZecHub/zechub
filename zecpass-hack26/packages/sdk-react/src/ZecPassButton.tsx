'use client';

import React from 'react';
import { useZecPass } from './useZecPass';
import type { ZecPassSession } from './types';

interface ZecPassButtonProps {
  onSuccess?: (session: ZecPassSession) => void;
  onError?: (error: Error) => void;
  label?: string;
  variant?: 'default' | 'outline' | 'minimal';
  showBadges?: boolean;
}

const ZcashLogo = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3v3H9l6 4.5L9 17h3v3c3.87 0 7-3.13 7-7 0-3.53-2.61-6.43-6-6.92V5z" fill="currentColor"/>
  </svg>
);

export function ZecPassButton({ onSuccess, onError, label = 'Sign in with Zcash', variant = 'default' }: ZecPassButtonProps) {
  const { session, isAuthenticated, isLoading, login, logout } = useZecPass();

  const baseStyles = 'inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all duration-200 cursor-pointer text-sm px-5 py-2.5';
  const variants = {
    default: 'bg-[#F4B728] text-black hover:bg-[#F7C948] shadow-md hover:shadow-lg',
    outline: 'border-2 border-[#F4B728] text-[#F4B728] hover:bg-[#F4B728]/10',
    minimal: 'text-[#F4B728] hover:underline',
  };

  if (isLoading) {
    return <button className={`${baseStyles} ${variants[variant]} opacity-70`} disabled>Loading...</button>;
  }

  if (isAuthenticated && session) {
    return (
      <div className="inline-flex items-center gap-2">
        <span className="text-sm font-mono opacity-70">{session.zk_proof_hash.slice(0, 8)}…</span>
        <button className={`${baseStyles} ${variants.outline} text-xs px-3 py-1.5`} onClick={logout}>Sign out</button>
      </div>
    );
  }

  return (
    <button className={`${baseStyles} ${variants[variant]}`} onClick={login}>
      <ZcashLogo />
      {label}
    </button>
  );
}
