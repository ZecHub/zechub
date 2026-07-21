'use client';

import { useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';
import { useSettingsStore, getIcon } from '@/store/settingsStore';

export const GRID_SIZE = 90;
const DRAG_THRESHOLD = 5;

export interface FolderApp {
  id: string;
  title: string;
  icon: string;
  onOpen: () => void;
}

interface DesktopFolderProps {
  label: string;
  icon?: string;
  onOpen: () => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
}

export function DesktopFolder({ label, icon, onOpen, position, onPositionChange }: DesktopFolderProps) {
  const { playOpen } = useSound();
  const { retroIcons } = useSettingsStore();
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const folderIcon = icon || (retroIcons ? '[D]' : '📁');

  const snapToGrid = (x: number, y: number) => ({
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  });

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasDraggedRef.current) {
      playOpen();
      onOpen();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = iconRef.current?.getBoundingClientRect();
    if (!rect) return;

    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      const deltaX = Math.abs(moveEvent.clientX - startPosRef.current.x);
      const deltaY = Math.abs(moveEvent.clientY - startPosRef.current.y);

      if (deltaX > DRAG_THRESHOLD || deltaY > DRAG_THRESHOLD) {
        hasDraggedRef.current = true;
        setIsDragging(true);

        const parent = iconRef.current?.parentElement;
        if (!parent) return;
        const parentRect = parent.getBoundingClientRect();

        const newX = moveEvent.clientX - parentRect.left - offsetX;
        const newY = moveEvent.clientY - parentRect.top - offsetY;

        const maxX = parentRect.width - 80;
        const maxY = parentRect.height - 80;
        const constrainedX = Math.max(0, Math.min(newX, maxX));
        const constrainedY = Math.max(0, Math.min(newY, maxY));

        if (iconRef.current) {
          iconRef.current.style.left = `${constrainedX}px`;
          iconRef.current.style.top = `${constrainedY}px`;
        }
      }
    };

    const handleMouseUp = () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      if (hasDraggedRef.current) {
        const parent = iconRef.current?.parentElement;
        if (!parent) {
          setIsDragging(false);
          return;
        }
        const parentRect = parent.getBoundingClientRect();
        const rect = iconRef.current?.getBoundingClientRect();
        if (!rect) {
          setIsDragging(false);
          return;
        }

        const finalX = rect.left - parentRect.left;
        const finalY = rect.top - parentRect.top;

        const maxX = parentRect.width - 80;
        const maxY = parentRect.height - 80;
        const constrainedX = Math.max(0, Math.min(finalX, maxX));
        const constrainedY = Math.max(0, Math.min(finalY, maxY));

        const snapped = snapToGrid(constrainedX, constrainedY);
        onPositionChange(snapped);
      }

      setIsDragging(false);
      setTimeout(() => {
        hasDraggedRef.current = false;
      }, 100);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div
      ref={iconRef}
      onMouseDown={handleMouseDown}
      onDoubleClick={handleDoubleClick}
      className={`
        absolute
        flex flex-col items-center justify-center
        w-20 h-20
        p-1
        text-center
        hover:bg-[var(--accent-gold)]/20
        focus:bg-[var(--accent-gold)]/30
        active:bg-[var(--accent-gold)]/40
        focus:outline-none
        rounded
        transition-colors
        touch-manipulation
        cursor-pointer
        select-none
        ${isDragging ? 'cursor-grabbing z-50 opacity-80' : ''}
      `}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
    >
      <div
        className="
          w-8 h-8 mb-1
          flex items-center justify-center
          pointer-events-none
        "
        style={{ imageRendering: 'pixelated', fontSize: '24px' }}
      >
        {folderIcon}
      </div>
      <span
        className="
          text-[var(--text-green)]
          leading-tight
          break-words
          text-center
          pointer-events-none
          desktop-icon-label
        "
        style={{ fontFamily: 'var(--font-primary)', fontSize: 'var(--font-size-icon)' }}
      >
        {label}
      </span>
    </div>
  );
}
