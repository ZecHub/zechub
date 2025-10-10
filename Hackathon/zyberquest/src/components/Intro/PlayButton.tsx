'use client';

import { motion } from 'framer-motion';
import { PlayButtonProps } from './types';

export default function PlayButton({
  label = 'PLAY',
  disabled = false,
  onClick,
  className = '',
}: PlayButtonProps) {
  return (
    <motion.button
      type="button"
      data-testid="zq-play"
      aria-label={label}
      aria-disabled={disabled}
      disabled={disabled}
      onClick={disabled ? undefined : onClick}
      initial={false}
      whileHover={disabled ? undefined : { scale: 1.03 }}
      whileTap={disabled ? undefined : { scale: 0.98 }}
      animate={disabled ? {} : { boxShadow: ['0 0 0 rgba(0,0,0,0)', '0 0 18px rgba(0,229,255,0.35)', '0 0 0 rgba(0,0,0,0)'] }}
      transition={disabled ? undefined : { duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
      className={`inline-flex items-center justify-center rounded-xl border border-[#00FF9C]/50 px-7 py-3 font-['IBM_Plex_Mono',monospace] text-lg text-white bg-black/40 hover:bg-black/60 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00E5FF] ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
    >
      {label}
    </motion.button>
  );
}
