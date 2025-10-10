'use client';

import { toast as sonnerToast } from 'sonner';

type ToastInput = {
  title?: string;
  description?: string;
};

export function useToast() {
  function toast({ title, description }: ToastInput) {
    // Mapea a sonner: título como mensaje principal y description como subtexto
    sonnerToast(title ?? 'Notification', {
      description,
    });
  }

  return { toast };
}
