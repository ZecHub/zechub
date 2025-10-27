'use client';

import { Toaster } from 'sonner';

export default function AppToaster() {
  return (
    <Toaster
      position="bottom-center"
      richColors
      closeButton
      expand
    />
  );
}
