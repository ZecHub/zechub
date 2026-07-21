'use client';

import { Suspense, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';

function CallbackContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const token = searchParams.get('token');
    if (token) {
      document.cookie = `zecpass_token=${token}; path=/; max-age=86400; SameSite=Lax`;
      router.push('/dashboard');
    } else {
      router.push('/auth/login');
    }
  }, [searchParams, router]);

  return (
    <div className="text-center">
      <div className="w-8 h-8 border-2 border-zec-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
      <p className="text-text-secondary">Completing authentication...</p>
    </div>
  );
}

export default function CallbackPage() {
  return (
    <div className="min-h-screen bg-bg-primary flex items-center justify-center">
      <Suspense fallback={
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-zec-gold border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-text-secondary">Loading...</p>
        </div>
      }>
        <CallbackContent />
      </Suspense>
    </div>
  );
}
