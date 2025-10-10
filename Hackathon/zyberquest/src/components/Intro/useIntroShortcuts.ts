'use client';

import { useEffect } from 'react';
import { useAudio } from './audio';

type Options = {
  onPlay?: () => void;  // Enter
  onSkip?: () => void;  // Esc
};

export default function useIntroShortcuts(opts: Options = {}) {
  const { toggle: toggleMute } = useAudio();

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement)?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea' || (e.target as HTMLElement)?.isContentEditable) {
        return; // no interferir con campos de texto
      }

      if (e.key === 'Enter') {
        opts.onPlay?.();
      } else if (e.key === 'Escape') {
        opts.onSkip?.();
      } else if (e.key.toLowerCase() === 'm') {
        toggleMute();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [opts, toggleMute]);
}
