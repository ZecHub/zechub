'use client';

import { useRef, useState, useEffect } from 'react';
import { Rnd } from 'react-rnd';
import { useWindowStore } from '@/store/windowStore';
import { useThemeStore } from '@/store/themeStore';
import { useSound } from '@/hooks/useSound';

interface WindowProps {
  id: string;
  children: React.ReactNode;
}

export function Window({ id, children }: WindowProps) {
  const {
    windows,
    activeWindowId,
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    restoreWindow,
    updatePosition,
    updateSize,
    updateWindow,
  } = useWindowStore();

  const getTheme = useThemeStore((state) => state.getTheme);
  const theme = getTheme();
  const { playClick, playClose, playMinimize } = useSound();
  const windowState = windows.find(w => w.id === id);
  const rndRef = useRef<Rnd>(null);

  // Flash message when window is raised from already-open state
  const [flashVisible, setFlashVisible] = useState(false);
  const [flashText, setFlashText] = useState('');
  useEffect(() => {
    if (windowState?.flashMessage) {
      setFlashText(windowState.flashMessage);
      setFlashVisible(true);
      const t = setTimeout(() => {
        setFlashVisible(false);
        updateWindow(id, { flashMessage: undefined });
      }, 2600);
      return () => clearTimeout(t);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [windowState?.flashMessage]);

  // Theme-aware values
  const taskbarHeight = theme?.taskbar?.height || 54;
  const taskbarPosition = theme?.taskbar?.position || 'top';

  if (!windowState || windowState.minimized) {
    return null;
  }

  const isActive = activeWindowId === id;
  const { position, size, zIndex, title, maximized, minSize } = windowState;

  const handleMouseDown = () => {
    if (!isActive) {
      focusWindow(id);
    }
  };

  const handleClose = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClose();
    closeWindow(id);
  };

  const handleMinimize = (e: React.MouseEvent) => {
    e.stopPropagation();
    playMinimize();
    minimizeWindow(id);
  };

  const handleMaximize = (e: React.MouseEvent) => {
    e.stopPropagation();
    playClick();
    if (maximized) {
      restoreWindow(id);
    } else {
      maximizeWindow(id);
    }
  };

  // Maximized window fills screen, accounting for taskbar position
  const displayPosition = maximized
    ? { x: 0, y: taskbarPosition === 'top' ? taskbarHeight : 0 }
    : position;
  const displaySize = maximized
    ? { width: window.innerWidth, height: window.innerHeight - taskbarHeight }
    : size;

  return (
    <Rnd
      ref={rndRef}
      position={displayPosition}
      size={displaySize}
      minWidth={minSize?.width || 150}
      minHeight={minSize?.height || 100}
      disableDragging={maximized}
      enableResizing={!maximized}
      onDragStop={(e, d) => {
        updatePosition(id, { x: d.x, y: d.y });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        updateSize(id, {
          width: parseInt(ref.style.width),
          height: parseInt(ref.style.height),
        });
        updatePosition(id, position);
      }}
      onMouseDown={handleMouseDown}
      style={{ zIndex }}
      dragHandleClassName="window-drag-handle"
      bounds="parent"
    >
      <div
        className={`
          h-full flex flex-col
          bg-[var(--bg-window)]
          window-border
          ${isActive ? 'window-active' : ''}
          relative
        `}
      >
        {/* Title Bar */}
        <div
          className={`
            window-drag-handle titlebar
            flex items-center justify-between
            px-2 py-1
            cursor-move select-none
            ${!isActive ? 'inactive' : ''}
          `}
          style={{ height: 'var(--titlebar-height)' }}
        >
          <span
            className="truncate text-[var(--accent-gold)]"
            style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--font-size-title)' }}
          >
            {title}
          </span>

          <div className="flex gap-1">
            {/* Minimize */}
            <button
              onClick={handleMinimize}
              className="btn-window w-5 h-5 flex items-center justify-center"
              style={{ fontSize: 'var(--font-size-button)' }}
              title="Minimize"
            >
              _
            </button>
            {/* Maximize */}
            <button
              onClick={handleMaximize}
              className="btn-window w-5 h-5 flex items-center justify-center"
              style={{ fontSize: 'var(--font-size-button)' }}
              title={maximized ? 'Restore' : 'Maximize'}
            >
              {maximized ? '◱' : '□'}
            </button>
            {/* Close */}
            <button
              onClick={handleClose}
              className="btn-window w-5 h-5 flex items-center justify-center text-[var(--accent-orange)]"
              style={{ fontSize: 'var(--font-size-button)' }}
              title="Close"
            >
              ×
            </button>
          </div>
        </div>

        {/* Flash message — shown when window is already open and gets re-raised */}
        {flashText && (
          <div
            className="absolute top-9 left-2 z-[9999] pointer-events-none font-mono text-[10px] px-2.5 py-1 border border-[var(--accent-gold)]/60 bg-[var(--bg-window)] text-[var(--accent-gold)]"
            style={{ opacity: flashVisible ? 1 : 0, transition: 'opacity 0.6s ease' }}
          >
            {flashText}
          </div>
        )}

        {/* Content */}
        <div className="flex-1 overflow-auto p-4 window-content">
          {children}
        </div>
      </div>
    </Rnd>
  );
}
