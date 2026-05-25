'use client';

import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';
import { TypewriterProps } from './types';

/**
 * Typewriter + panel:
 * - ÍNDICES (li/ci) → robusto
 * - Panel semitransparente con borde verde y blur sutil
 * - role="status"/aria-live="polite"
 */
export default function Typewriter({
  lines,
  charSpeedMs = 18,
  lineDelayMs = 350,
  ariaLive = 'polite',
  onDone,
  className = '',
}: TypewriterProps) {
  const reduce = useReducedMotion();

  const [rendered, setRendered] = useState<string[]>(() => lines.map(() => ''));
  const [li, setLi] = useState(0);
  const [ci, setCi] = useState(0);

  useEffect(() => {
    setRendered(lines.map(() => ''));
    setLi(0);
    setCi(0);
  }, [lines]);

  useEffect(() => {
    if (reduce) {
      setRendered([...lines]);
      setLi(lines.length);
      setCi(0);
      onDone?.();
      return;
    }
    if (li >= lines.length) {
      onDone?.();
      return;
    }
    const target = lines[li];

    if (ci < target.length) {
      const id = window.setTimeout(() => {
        setRendered(prev => {
          const copy = [...prev];
          copy[li] = target.slice(0, ci + 1);
          return copy;
        });
        setCi(ci + 1);
      }, Math.max(5, charSpeedMs));
      return () => window.clearTimeout(id);
    } else {
      const id = window.setTimeout(() => {
        setLi(li + 1);
        setCi(0);
      }, Math.max(150, lineDelayMs));
      return () => window.clearTimeout(id);
    }
  }, [li, ci, lines, charSpeedMs, lineDelayMs, reduce, onDone]);

  const activeLine = Math.min(li, lines.length - 1);
  const showCursor = !reduce && li < lines.length;

  return (
    <div className={`mx-auto max-w-[72ch] ${className}`}>
      <div
        className="relative rounded-xl border border-[#00FF9C]/25 bg-black/60 backdrop-blur-sm px-4 py-3 text-left shadow-[0_0_24px_rgba(0,255,156,0.08)]"
      >
        {/* cabecera tipo “terminal lights” */}
        <div className="mb-2 flex gap-2">
          <span className="h-2 w-2 rounded-full bg-[#00FF9C]/80" />
          <span className="h-2 w-2 rounded-full bg-[#FFD60A]/80" />
          <span className="h-2 w-2 rounded-full bg-[#00E5FF]/80" />
        </div>

        <div
          data-testid="zq-typewriter"
          className="text-sm md:text-base text-neutral-100 font-['Inter',sans-serif]"
          role="status"
          aria-live={ariaLive}
          aria-atomic="true"
        >
          {rendered.map((text, i) => (
            <p key={i} className="mb-1">
              <span>{text}</span>
              {showCursor && i === activeLine && (
                <span
                  aria-hidden="true"
                  className="inline-block w-[0.6ch] h-[1.1em] align-[0.1em] bg-neutral-200/85 ml-[2px] animate-[cursorBlink_1s_steps(1)_infinite]"
                />
              )}
            </p>
          ))}
        </div>

        {/* scanlines sutiles */}
        <div aria-hidden className="pointer-events-none absolute inset-0 opacity-[0.06]">
          <div className="h-full w-full"
            style={{
              backgroundImage:
                'repeating-linear-gradient(to bottom, rgba(255,255,255,0.8) 0px, rgba(255,255,255,0.8) 1px, transparent 2px, transparent 3px)',
            }}
          />
        </div>
      </div>

      <style jsx>{`
        @keyframes cursorBlink { 0%, 49% { opacity: 1; } 50%, 100% { opacity: 0; } }
      `}</style>
    </div>
  );
}
