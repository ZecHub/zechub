'use client';

import { useEffect, useLayoutEffect } from 'react';
import { Taskbar } from '@/components/Taskbar/Taskbar';
import { Desktop } from '@/components/Desktop/Desktop';
import { MemoryWarning } from '@/components/MemoryWarning/MemoryWarning';
import { SplashGate } from '@/components/SplashGate/SplashGate';
import { CoffeeCup } from '@/components/CoffeeCup/CoffeeCup';
import { SysopChat } from '@/components/SysopChat/SysopChat';
import { SessionGuard } from '@/components/SessionGuard/SessionGuard';
import { TipsFlyout } from '@/components/TipsFlyout/TipsFlyout';
import { useSettingsStore } from '@/store/settingsStore';
import { useThemeStore, initializeThemes } from '@/store/themeStore';
import { allThemes } from '@/themes';
import { playSoundGlobal } from '@/hooks/useSound';

// Use useLayoutEffect on client, useEffect on server
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

export default function Home() {
  const fontSize = useSettingsStore((state) => state.fontSize);
  const fontSizeVersion = useSettingsStore((state) => state.fontSizeVersion);
  const currentTheme = useThemeStore((state) => state.currentTheme);

  // Initialize themes on mount
  useEffect(() => {
    initializeThemes(allThemes);
  }, []);

  // Universal click sound — every button, link, or role=button anywhere in the
  // app (splash, games, chat, all of it) gets a subtle tap. Components that also
  // play their own sound (open/close) still work; add data-silent to opt out.
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const el = (e.target as HTMLElement)?.closest?.(
        'button, a, [role="button"], input[type="button"], input[type="submit"]'
      ) as HTMLElement | null;
      if (!el || el.hasAttribute('disabled') || el.closest('[data-silent]')) return;
      playSoundGlobal('tap');
    };
    document.addEventListener('click', onClick, true);
    return () => document.removeEventListener('click', onClick, true);
  }, []);

  // Apply font size to document element immediately (before paint)
  useIsomorphicLayoutEffect(() => {
    document.documentElement.setAttribute('data-font-size', fontSize);
  }, [fontSize]);

  // Also apply on hydration and subscribe to changes
  useEffect(() => {
    // Re-apply after hydration in case store rehydrated with different value
    const unsubscribe = useSettingsStore.subscribe((state) => {
      document.documentElement.setAttribute('data-font-size', state.fontSize);
    });
    return unsubscribe;
  }, []);

  // Subscribe to theme changes
  useEffect(() => {
    const unsubscribe = useThemeStore.subscribe((state, prevState) => {
      if (state.currentTheme !== prevState.currentTheme) {
        const theme = state.themes[state.currentTheme];
        if (theme) {
          // Theme will be applied by applyThemeToDOM in the store
        }
      }
    });
    return unsubscribe;
  }, []);

  // Force browser repaint when font size changes by using a microtask
  useEffect(() => {
    // Trigger a repaint by reading a layout property
    void document.body.offsetHeight;
  }, [fontSizeVersion]);

  return (
    <SplashGate>
      <div className="h-screen w-screen overflow-hidden">
        <Taskbar />
        <Desktop />
        <MemoryWarning />
        <CoffeeCup />
        <SysopChat />
        <SessionGuard />
        <TipsFlyout />
      </div>
    </SplashGate>
  );
}
