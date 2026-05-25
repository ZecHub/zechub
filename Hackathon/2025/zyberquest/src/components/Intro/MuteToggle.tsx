'use client';

import { useAudio } from './audio';

export default function MuteToggle({ className = '' }: { className?: string }) {
  const { muted, toggle } = useAudio();
  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={muted ? 'Activar sonido' : 'Silenciar sonido'}
      className={`rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-xs text-neutral-200 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${className}`}
    >
      <span className="font-['IBM_Plex_Mono',monospace]">
        {muted ? '🔇 MUTE' : '🔊 SOUND ON'}
      </span>
    </button>
  );
}
