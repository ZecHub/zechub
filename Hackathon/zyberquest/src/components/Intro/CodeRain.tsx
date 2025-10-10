'use client';

import { useEffect, useRef } from 'react';
import { useReducedMotion } from 'framer-motion';
import type { CodeRainProps } from './types';

/**
 * Matrix-like code rain en Canvas:
 * - DPR-aware (clamped a 2 para perf)
 * - density/speed configurables
 * - respeta prefers-reduced-motion
 * - resize con micro-throttle (rAF)
 */
export default function CodeRain({
  density = 0.5,
  speed = 1.0,
  paused = false,
  className = '',
}: CodeRainProps) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const rafRef = useRef<number | null>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    const canvasEl = canvasRef.current;
    if (!canvasEl) return;

    const ctx = canvasEl.getContext('2d', { alpha: true });
    if (!ctx) return;

    let running = true;
    let width = 0;
    let height = 0;
    let dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));

    const glyphs = 'ZCASHアイウエオカキクケコサシスセソ0123456789-=+*<>[]{}|/\\ZCASH';
    const columns: number[] = [];
    const fontSizeBase = 14;
    let colCount = 0;

    const resize = () => {
      const parent = canvasEl.parentElement ?? document.body;
      const clientWidth = parent.clientWidth;
      const clientHeight = parent.clientHeight;

      width = clientWidth;
      height = clientHeight;

      canvasEl.style.width = `${width}px`;
      canvasEl.style.height = `${height}px`;

      canvasEl.width = Math.floor(width * dpr);
      canvasEl.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const fontSize = fontSizeBase;
      ctx.font = `${fontSize}px 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;
      const colWidth = Math.max(10, Math.floor(fontSize * 0.75));
      colCount = Math.floor(width / colWidth);

      columns.length = colCount;
      for (let i = 0; i < colCount; i++) {
        columns[i] = Math.floor(Math.random() * (height / fontSize));
      }
    };

    // ---- resize con micro-throttle (rAF) ----
    let resizeRaf: number | null = null;
    const onResize = () => {
      if (resizeRaf != null) return;
      resizeRaf = requestAnimationFrame(() => {
        dpr = Math.max(1, Math.min(window.devicePixelRatio || 1, 2));
        resize();
        resizeRaf = null;
      });
    };
    resize();
    window.addEventListener('resize', onResize, { passive: true });

    const fadeTrail = 0.08;
    const densityClamp = Math.max(0.1, Math.min(1, density));
    const speedFactor = paused || reduce ? 0 : speed;
    const stepRows = Math.max(0.5, 1.2 * speedFactor);

    const tick = () => {
      if (!running) return;

      ctx.fillStyle = `rgba(0, 0, 0, ${fadeTrail})`;
      ctx.fillRect(0, 0, width, height);

      const fontSize = fontSizeBase;
      ctx.font = `${fontSize}px 'IBM Plex Mono', ui-monospace, SFMono-Regular, Menlo, monospace`;
      ctx.textBaseline = 'top';

      const primary = Math.random() < 0.5 ? '#00E5FF' : '#00FF9C';
      ctx.fillStyle = primary;
      ctx.shadowColor = primary;
      ctx.shadowBlur = reduce ? 0 : 6;

      for (let i = 0; i < colCount; i++) {
        if (Math.random() > densityClamp) continue;

        const x = (i * width) / colCount + 2;
        const y = columns[i] * fontSize;

        const ch = glyphs.charAt((Math.random() * glyphs.length) | 0);
        ctx.fillText(ch, x, y);

        columns[i] += stepRows;

        if (y > height + fontSize * 2) {
          columns[i] = Math.random() * -20;
        }
      }

      if (!reduce) {
        ctx.shadowBlur = 0;
        ctx.fillStyle = 'rgba(255,255,255,0.02)';
        for (let y = 0; y < height; y += 3) {
          ctx.fillRect(0, y, width, 1);
        }
      }

      rafRef.current = requestAnimationFrame(tick);
    };

    if (reduce || paused) {
      ctx.fillStyle = 'rgba(0,0,0,1)';
      ctx.fillRect(0, 0, width, height);
      ctx.fillStyle = '#00FF9C';
      ctx.shadowColor = '#00FF9C';
      ctx.shadowBlur = 4;
      for (let i = 0; i < Math.floor((width * height) / 25000); i++) {
        const x = Math.random() * width;
        const y = Math.random() * height;
        const ch = glyphs.charAt((Math.random() * glyphs.length) | 0);
        ctx.fillText(ch, x, y);
      }
    } else {
      rafRef.current = requestAnimationFrame(tick);
    }

    return () => {
      running = false;
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      if (resizeRaf) cancelAnimationFrame(resizeRaf);
      window.removeEventListener('resize', onResize);
    };
  }, [density, speed, paused, reduce]);

  return (
    <canvas
      ref={canvasRef}
      data-testid="zq-code-rain"
      aria-hidden="true"
      className={`pointer-events-none absolute inset-0 ${className}`}
    />
  );
}
