"use client";

import { ThresholdDial } from "@/components/ThresholdDial";
import { cn } from "@/lib/utils";

const PRESETS = [
  { threshold: 2, total: 3, blurb: "Any 2 of 3 participants can sign or recover." },
  { threshold: 3, total: 5, blurb: "Any 3 of 5 participants can sign or recover." },
] as const;

export function ThresholdSelector({
  value,
  onChange,
}: {
  value: { threshold: number; total: number };
  onChange: (preset: { threshold: number; total: number }) => void;
}) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
      {PRESETS.map((preset) => {
        const active = value.threshold === preset.threshold && value.total === preset.total;
        return (
          <button
            key={preset.total}
            type="button"
            onClick={() => onChange(preset)}
            className={cn(
              "flex items-center gap-4 rounded-md border p-4 text-left transition-colors",
              active ? "border-signal bg-signal/5" : "border-border hover:border-muted-foreground/50",
            )}
          >
            <ThresholdDial total={preset.total} filled={preset.threshold} size={48} />
            <div>
              <p className="font-heading text-sm font-medium">
                {preset.threshold}-of-{preset.total}
              </p>
              <p className="text-xs text-muted-foreground">{preset.blurb}</p>
            </div>
          </button>
        );
      })}
    </div>
  );
}
