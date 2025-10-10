'use client';

import { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';

type AudioCtx = {
  muted: boolean;
  toggle: () => void;
  setMuted: (v: boolean) => void;
  startAudio: () => Promise<void>; // intenta reproducir bgm tras interacción
};

const Ctx = createContext<AudioCtx | null>(null);
const STORAGE_KEY = 'zq-muted';
const BGM_SRC = '/audio/intro-bgm.mp3'; // coloca tu pista aquí (public/audio/intro-bgm.mp3)

export function AudioProvider({ children }: { children: React.ReactNode }) {
  const [muted, setMuted] = useState<boolean>(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const triedRef = useRef(false);

  // hydrate from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw !== null) setMuted(raw === '1');
    } catch {}
  }, []);

  // Crear el <audio> oculto
  useEffect(() => {
    const el = document.createElement('audio');
    el.src = BGM_SRC;
    el.loop = true;
    el.preload = 'auto';
    el.volume = 0.45; // volumen moderado
    el.style.display = 'none';
    document.body.appendChild(el);
    audioRef.current = el;
    return () => {
      el.pause();
      el.remove();
      audioRef.current = null;
    };
  }, []);

  // aplicar mute
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, muted ? '1' : '0');
    } catch {}
    const el = audioRef.current;
    if (el) {
      el.muted = muted;
      if (!muted && !el.paused) {
        // nada
      }
    }
  }, [muted]);

  const startAudio = async () => {
    const el = audioRef.current;
    if (!el) return;
    if (triedRef.current) return; // intenta una vez
    triedRef.current = true;
    try {
      if (!muted) await el.play();
    } catch {
      // Si falla (p.ej. sin asset), ignoramos
    }
  };

  const value = useMemo<AudioCtx>(
    () => ({
      muted,
      toggle: () => setMuted((m) => !m),
      setMuted,
      startAudio,
    }),
    [muted]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAudio() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error('useAudio must be used within <AudioProvider>');
  return ctx;
}
