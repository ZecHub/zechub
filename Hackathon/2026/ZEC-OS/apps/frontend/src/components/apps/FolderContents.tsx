'use client';

import { useWindowStore } from '@/store/windowStore';
import { useIsAdmin } from '@/store/authStore';
import { useSettingsStore, getIcon } from '@/store/settingsStore';
import { useTickerStore } from '@/store/tickerStore';
import { useSound } from '@/hooks/useSound';
import { calculateWindowPosition } from '@/utils/windowPlacement';
import { APP_REGISTRY, AppConfig } from '@/components/Desktop/Desktop';

interface FolderContentsProps {
  category: 'stats' | 'charts' | 'tools' | 'games' | 'privacy' | 'widgets';
}

export function FolderContents({ category }: FolderContentsProps) {
  const { windows, openWindow } = useWindowStore();
  const { retroIcons } = useSettingsStore();
  const isAdmin = useIsAdmin();
  const { playOpen } = useSound();

  const apps = APP_REGISTRY.filter(app => app.category === category && (!app.adminOnly || isAdmin)).sort((a, b) => a.title.localeCompare(b.title));

  const handleOpenApp = (app: AppConfig) => {
    playOpen();

    // Block Ticker is a floating strip, not a window — just show it
    if (app.type === 'block-ticker') {
      useTickerStore.getState().show();
      return;
    }

    const screenWidth = typeof window !== 'undefined' ? window.innerWidth : 1200;
    const screenHeight = typeof window !== 'undefined' ? window.innerHeight : 800;

    const position = calculateWindowPosition(
      windows,
      app.defaultSize,
      screenWidth,
      screenHeight
    );

    openWindow({
      id: app.id,
      type: app.type,
      title: app.title,
      position,
      size: app.defaultSize,
      minSize: app.minSize,
    });
  };

  return (
    <div className="h-full overflow-auto p-3 bg-[var(--bg-window)]">
      <div className="grid grid-cols-3 gap-2">
        {apps.map((app) => (
          <button
            key={app.id}
            onDoubleClick={() => handleOpenApp(app)}
            className="
              flex flex-col items-center justify-center
              p-3
              hover:bg-[var(--accent-gold)]/20
              active:bg-[var(--accent-gold)]/40
              rounded
              transition-colors
              cursor-pointer
            "
          >
            <div
              className="w-10 h-10 mb-2 flex items-center justify-center"
              style={{ fontSize: '32px' }}
            >
              {getIcon(app.icon, retroIcons)}
            </div>
            <span
              className="text-[var(--text-primary)] text-center leading-tight"
              style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--font-size-icon)' }}
            >
              {app.title}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

// Individual folder components for the registry
export function StatsFolderContents() {
  return <FolderContents category="stats" />;
}

export function ChartsFolderContents() {
  return <FolderContents category="charts" />;
}

export function ToolsFolderContents() {
  return <FolderContents category="tools" />;
}

export function GamesFolderContents() {
  return <FolderContents category="games" />;
}

export function PrivacyFolderContents() {
  return <FolderContents category="privacy" />;
}

export function WidgetsFolderContents() {
  return <FolderContents category="widgets" />;
}

export default FolderContents;
