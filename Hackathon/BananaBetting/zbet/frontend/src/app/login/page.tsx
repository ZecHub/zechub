'use client';

import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import LoginForm from '@/components/LoginForm';
import { useEffect } from 'react';

export default function LoginPage() {
  const { isAuthenticated } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isAuthenticated) {
      router.push('/');
    }
  }, [isAuthenticated, router]);

  const handleLoginSuccess = () => {
    router.push('/');
  };

  if (isAuthenticated) {
    return null; // or a loading spinner
  }

  return <LoginForm onSuccess={handleLoginSuccess} />;
}
