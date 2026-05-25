'use client';

import ModeCard, { ModeCardProps } from './ModeCard';
import { motion } from 'framer-motion';

type ModeKey = 'trivias' | 'laberintos' | 'simuladores';

type ModeItem = {
  key: ModeKey;
  title: string;
  desc: string;
  href: string;
  accent: string; // hex
  className?: string;
  badge?: string;
  meta?: string;
};

type ModeGridProps = {
  onActivate?: (href: string) => void;
  cardProps?: Partial<Pick<ModeCardProps, 'className' | 'ctaLabel'>>;
};

const MODES: ModeItem[] = [
  {
    key: 'trivias',
    title: 'Trivias',
    desc: 'Preguntas rápidas para aprender privacidad, ZK y Zcash.',
    href: '/trivias',
    accent: '#00FF9C', // zx-green
    badge: 'Beginner • 4–6 min',
    meta: 'Single-player',
  },
  {
    key: 'laberintos',
    title: 'Laberintos',
    desc: 'Explora mapas y desbloquea rutas con pistas cifradas.',
    href: '/laberintos',
    accent: '#FFD60A', // zx-yellow
    badge: 'Intermediate • 6–10 min',
    meta: 'Keyboard / WASD',
  },
  {
    key: 'simuladores',
    title: 'Simuladores',
    desc: 'Rompe sustitución simple y prueba el puzzle XOR visual.',
    href: '/simuladores',
    accent: '#FF3DBE', // zx-magenta
    badge: 'Advanced • 5–8 min',
    meta: 'Timed challenges',
  },
];

export default function ModeGrid({ onActivate, cardProps }: ModeGridProps) {
  return (
    <motion.div
      initial="hidden"
      animate="show"
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.06 } },
      }}
      className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3"
    >
      {MODES.map((m) => (
        <motion.div key={m.key} variants={{ hidden: { y: 8, opacity: 0 }, show: { y: 0, opacity: 1 } }}>
          <ModeCard
            title={m.title}
            desc={m.desc}
            href={m.href}
            accent={m.accent}
            badge={m.badge}
            meta={m.meta}
            className={cardProps?.className ?? m.className}
            ctaLabel={cardProps?.ctaLabel ?? ''}
            onActivate={onActivate}
          />
        </motion.div>
      ))}
    </motion.div>
  );
}
