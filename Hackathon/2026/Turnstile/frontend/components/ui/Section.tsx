import type { ReactNode } from "react";

import { cn } from "@/lib/cn";

interface SectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
}

export function Section({ id, children, className }: SectionProps) {
  return (
    <section id={id} className={cn("relative z-10 mt-28 w-full", className)}>
      {children}
    </section>
  );
}

export function Eyebrow({ index, label }: { index: string; label: string }) {
  return (
    <span className="mb-6 flex cursor-default items-center gap-3 font-mono text-[11px] uppercase tracking-[0.2em] text-faint">
      <span className="text-accent">{index}</span>
      <span className="h-px w-6 bg-border-strong" />
      {label}
    </span>
  );
}

interface SectionHeadingProps {
  title: ReactNode;
  body?: string;
  className?: string;
}

export function SectionHeading({ title, body, className }: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", className)}>
      <h2 className="mb-4 text-3xl font-medium tracking-tighter text-foreground md:text-5xl">
        {title}
      </h2>
      {body ? <p className="text-base leading-relaxed text-muted">{body}</p> : null}
    </div>
  );
}

export function Accented({ children }: { children: ReactNode }) {
  return (
    <span className="bg-gradient-to-b from-faint to-border-strong bg-clip-text text-transparent">
      {children}
    </span>
  );
}
