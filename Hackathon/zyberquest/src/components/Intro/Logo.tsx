'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { LogoProps } from './types';

export default function Logo({
  text = 'ZYBERQUEST',
  glow = true,
  accent = 'green',
  className = '',
}: LogoProps) {
  const reduce = useReducedMotion();

  // Forzamos el esquema pedido: verde + sombra amarilla
  const green = '#00FF9C';
  const yellow = '#FFD60A';

  const glowFilter =
    glow && !reduce
      ? `drop-shadow(0 0 22px ${green}66) drop-shadow(0 0 48px ${yellow}44)`
      : 'none';

  // Simulamos un stroke + leve aberración cromática con text-shadow
  const layeredTextShadow = glow && !reduce
    ? `
      0 0 6px ${green}66,
      0 0 14px ${yellow}44,
      1px 0 0 rgba(255, 214, 10, 0.25),
      -1px 0 0 rgba(0, 229, 255, 0.15)
    `
    : undefined;

  return (
    <motion.h1
      data-testid="zq-logo"
      className={`font-['IBM_Plex_Mono',monospace] tracking-[0.1em] text-5xl md:text-7xl ${className}`}
      style={{ color: green, filter: glowFilter as any, textShadow: layeredTextShadow }}
      aria-label={text}
      initial={{ opacity: 0, y: 8, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
    >
      {text}
    </motion.h1>
  );
}
