"use client";

import * as Tooltip from "@radix-ui/react-tooltip";

type ExplanationTooltipProps = {
  text: string;              // 1–3 líneas
  learnMoreHref?: string;    // opcional (placeholder)
};

export default function ExplanationTooltip({ text, learnMoreHref }: ExplanationTooltipProps) {
  return (
    <Tooltip.Provider delayDuration={120}>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <button
            type="button"
            className="text-xs rounded-full px-2 py-1 border border-white/20 hover:bg-white/10 focus:outline-none focus:ring"
            aria-label="Why? See explanation."
          >
            Why?
          </button>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          <Tooltip.Content
            side="top"
            align="center"
            className="max-w-xs rounded-md border border-white/12 bg-black/90 p-3 text-xs leading-snug text-white shadow backdrop-blur-md"
          >
            <p className="mb-2">{text}</p>
            {learnMoreHref && (
              <a
                href={learnMoreHref}
                target="_blank"
                rel="noreferrer"
                className="underline underline-offset-2 opacity-90 hover:opacity-100"
              >
                Learn more ↗
              </a>
            )}
            <Tooltip.Arrow className="fill-black" />
          </Tooltip.Content>
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
}
