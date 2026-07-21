import type { IconSvgElement } from "@hugeicons/react";

import { Icon, Key01Icon, Search01Icon, SecurityCheckIcon } from "@/components/icons/Icon";
import { Accented, Eyebrow, Section, SectionHeading } from "@/components/ui/Section";

interface Step {
  index: string;
  icon: IconSvgElement;
  title: string;
  body: string;
}

const STEPS: Step[] = [
  {
    index: "01",
    icon: Key01Icon,
    title: "Paste a viewing key",
    body: "A unified full viewing key can see, but it can never spend. Turnstile has no code path that accepts a seed phrase or a spending key.",
  },
  {
    index: "02",
    icon: Search01Icon,
    title: "Turnstile scans mainnet",
    body: "Your key is held in memory, used to read pool balances via zingolib, and discarded. Nothing is logged, stored, or persisted.",
  },
  {
    index: "03",
    icon: SecurityCheckIcon,
    title: "Get a verdict and a plan",
    body: "A pool-by-pool breakdown, a plain verdict, and the exact migration steps for the wallet you actually use.",
  },
];

export function HowItWorks() {
  return (
    <Section id="how-it-works">
      <Eyebrow index="03" label="How it works" />

      <SectionHeading
        className="mb-10"
        title={
          <>
            Sixty seconds, <Accented>zero spending keys</Accented>
          </>
        }
        body="Turnstile is a read-only tool by construction, not by promise."
      />

      <div className="grid grid-cols-1 gap-px overflow-hidden rounded-[2rem] border border-border bg-border md:grid-cols-3">
        {STEPS.map((step) => (
          <article
            key={step.index}
            className="group flex cursor-default flex-col gap-6 bg-surface p-8 transition-colors duration-200 hover:bg-elevated"
          >
            <div className="flex items-center justify-between">
              <span className="flex h-11 w-11 items-center justify-center rounded-full border border-border bg-gradient-to-b from-white/10 to-transparent text-faint transition-colors duration-200 group-hover:text-accent">
                <Icon icon={step.icon} size={20} />
              </span>
              <span className="font-mono text-xs tracking-widest text-border-strong">
                {step.index}
              </span>
            </div>

            <div>
              <h3 className="mb-2 text-lg font-medium tracking-tight text-foreground">
                {step.title}
              </h3>
              <p className="text-sm leading-relaxed text-muted">{step.body}</p>
            </div>
          </article>
        ))}
      </div>
    </Section>
  );
}
