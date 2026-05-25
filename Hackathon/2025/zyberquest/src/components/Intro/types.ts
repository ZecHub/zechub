// Contratos compartidos de la Intro (sin lógica todavía)

export type AccentColor = 'green' | 'cyan' | 'magenta' | 'white';

export interface LogoProps {
  text?: string;           // default: "ZyberQuest"
  glow?: boolean;          // activa/desactiva halo
  accent?: AccentColor;    // color principal del glow
  className?: string;
}

export interface CodeRainProps {
  density?: number;        // 0.0 — 1.0 (default: 0.5)
  speed?: number;          // 0.5 — 2.0 (default: 1.0)
  className?: string;
  paused?: boolean;        // para prefers-reduced-motion
}

export interface TypewriterProps {
  lines: string[];         // texto por etapas
  charSpeedMs?: number;    // velocidad por carácter
  lineDelayMs?: number;    // delay entre líneas
  ariaLive?: 'off' | 'polite' | 'assertive';
  onDone?: () => void;     // callback al finalizar
  className?: string;
}

export interface PlayButtonProps {
  label?: string;          // default: "PLAY"
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface ControlsHintProps {
  showEnter?: boolean;     // Enter = Play
  showMute?: boolean;      // M = Mute/Unmute
  showEsc?: boolean;       // Esc = Skip
  className?: string;
}
