'use client';

import { useRef, useState } from 'react';
import { useSound } from '@/hooks/useSound';

export const GRID_SIZE = 90;
const DRAG_THRESHOLD = 5; // Pixels moved before considered a drag

interface DesktopIconProps {
  label: string;
  icon: string;
  onOpen: () => void;
  position: { x: number; y: number };
  onPositionChange: (pos: { x: number; y: number }) => void;
}

export function DesktopIcon({ label, icon, onOpen, position, onPositionChange }: DesktopIconProps) {
  const { playClick } = useSound();
  const [isDragging, setIsDragging] = useState(false);
  const iconRef = useRef<HTMLDivElement>(null);
  const hasDraggedRef = useRef(false);
  const startPosRef = useRef({ x: 0, y: 0 });

  const snapToGrid = (x: number, y: number) => ({
    x: Math.round(x / GRID_SIZE) * GRID_SIZE,
    y: Math.round(y / GRID_SIZE) * GRID_SIZE,
  });

  const handleDoubleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!hasDraggedRef.current) {
      playClick();
      onOpen();
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    const rect = iconRef.current?.getBoundingClientRect();
    if (!rect) return;

    // Store initial click position and offset
    const offsetX = e.clientX - rect.left;
    const offsetY = e.clientY - rect.top;
    startPosRef.current = { x: e.clientX, y: e.clientY };
    hasDraggedRef.current = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      // Check if we've moved beyond the threshold
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

        // Constrain to parent bounds
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

    const handleMouseUp = (upEvent: MouseEvent) => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);

      // Only update position if we actually dragged
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

        // Constrain and snap
        const maxX = parentRect.width - 80;
        const maxY = parentRect.height - 80;
        const constrainedX = Math.max(0, Math.min(finalX, maxX));
        const constrainedY = Math.max(0, Math.min(finalY, maxY));

        const snapped = snapToGrid(constrainedX, constrainedY);
        onPositionChange(snapped);
      }

      setIsDragging(false);
      // Reset drag flag after a short delay to prevent double-click from firing
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
        {icon}
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
