'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import React from 'react';

export type ModeCardProps = {
  title: string;
  href: string;
  desc: string;
  accent: string;           // hex, ej. #FFD60A
  badge?: string;           // "Beginner • 4–6 min"
  meta?: string;            // texto secundario
  icon?: React.ReactNode;   // mini svg
  disabled?: boolean;
  className?: string;
  ctaLabel?: string;
  onActivate?: (href: string) => void;
};

export default function ModeCard({
  title,
  href,
  desc,
  accent,
  badge,
  meta,
  icon,
  disabled = false,
  ctaLabel = 'Entrar',
  className = '',
}: ModeCardProps) {
  const CardInner = (
    <motion.div
      initial={false}
      whileHover={disabled ? undefined : { scale: 0.98 }}
      whileTap={disabled ? undefined : { scale: 0.97 }}
      className={`group relative rounded-2xl border p-5 bg-white/[0.02]
        border-white/10 shadow-[0_0_0_1px_rgba(255,255,255,0.02)]
        focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF]
        ${className}`}
      style={{
        boxShadow: `0 0 0 1px rgba(255,255,255,0.02), 0 0 24px ${accent}22`,
      }}
      aria-disabled={disabled}
      tabIndex={-1}
    >
      {/* Borde de color (hover intensifica) */}
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl transition-shadow" style={{ boxShadow: `inset 0 0 0 1px ${accent}44` }} />
      <span aria-hidden className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity group-hover:opacity-100" style={{ boxShadow: `0 0 34px ${accent}33` }} />

      <div className="flex items-start gap-3">
        {icon && (
          <div className="mt-0.5 h-9 w-9 shrink-0 rounded-lg border border-white/10 bg-black/40 flex items-center justify-center text-neutral-100">
            {icon}
          </div>
        )}
        <div className="min-w-0">
          <h2 className="font-['IBM_Plex_Mono',monospace] text-xl mb-1" style={{ color: accent }}>
            {title}
          </h2>
          <p className="text-sm text-neutral-300">{desc}</p>
          {(badge || meta) && (
            <div className="mt-3 flex flex-wrap items-center gap-2 text-xs">
              {badge && (
                <span className="rounded-md border border-white/15 bg-black/40 px-2 py-0.5 text-neutral-100" style={{ boxShadow: `0 0 12px ${accent}22` }}>
                  {badge}
                </span>
              )}
              {meta && <span className="text-neutral-400">{meta}</span>}
            </div>
          )}
        </div>
      </div>

      {/* Footer simple: solo CTA visual (sin “Press ENTER” ni “Shortcut”) */}
      <div className="mt-4 flex items-center">
        <span
          role="button"
          aria-hidden
          className={`ml-auto rounded-lg border px-3 py-1.5 text-xs ${
            disabled
              ? 'border-white/15 bg-black/30 text-neutral-400'
              : 'border-white/15 bg-black/40 text-neutral-100 group-hover:bg-black/60'
          }`}
        >
          {ctaLabel}
        </span>
      </div>
    </motion.div>
  );

  if (disabled) return <div role="group" aria-label={title} aria-disabled="true">{CardInner}</div>;

  // Un solo <Link> que envuelve toda la card (sin <a> interno)
  return (
    <Link href={href} aria-label={`Abrir ${title}`} className="block">
      {CardInner}
    </Link>
  );
}
