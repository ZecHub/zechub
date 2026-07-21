import {
  Alert02Icon,
  CheckmarkCircle02Icon,
  Clock01Icon,
  Icon,
  ViewOffIcon,
} from "@/components/icons/Icon";
import type { ReadinessEntry, ReadinessStatus } from "@/lib/types";

const STATUS = {
  ready: {
    label: "Ready",
    icon: CheckmarkCircle02Icon,
    chip: "border-ready/30 bg-ready/10 text-ready",
  },
  "in-progress": {
    label: "In progress",
    icon: Clock01Icon,
    chip: "border-partial/30 bg-partial/10 text-partial",
  },
  "at-risk": {
    label: "At risk",
    icon: Alert02Icon,
    chip: "border-exposed/30 bg-exposed/10 text-exposed",
  },
  unknown: {
    label: "No statement",
    icon: ViewOffIcon,
    chip: "border-border-strong bg-white/[0.04] text-faint",
  },
} satisfies Record<ReadinessStatus, { label: string; icon: unknown; chip: string }>;

export function ReadinessBoard({ entries }: { entries: ReadinessEntry[] }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border">
      {entries.map((entry) => {
        const status = STATUS[entry.status];

        return (
          <article
            key={entry.name}
            className="flex flex-col gap-4 border-b border-border bg-surface p-6 last:border-b-0 md:flex-row md:items-center md:justify-between"
          >
            <div className="min-w-0">
              <div className="mb-1 flex items-center gap-3">
                <h3 className="cursor-default text-base font-medium tracking-tight text-foreground">
                  {entry.name}
                </h3>
                <span className="cursor-default font-mono text-[10px] uppercase tracking-widest text-faint">
                  {entry.kind}
                </span>
              </div>
              <p className="max-w-xl text-sm leading-relaxed text-muted">{entry.note}</p>
            </div>

            <div className="flex shrink-0 items-center gap-4">
              {entry.source ? (
                <a
                  href={entry.source}
                  target="_blank"
                  rel="noreferrer"
                  className="cursor-pointer font-mono text-[10px] uppercase tracking-widest text-faint underline-offset-4 transition-colors duration-200 hover:text-accent hover:underline"
                >
                  Source
                </a>
              ) : (
                <span className="cursor-default font-mono text-[10px] uppercase tracking-widest text-border-strong">
                  No source
                </span>
              )}

              <span
                className={`inline-flex w-36 cursor-default items-center justify-center gap-2 rounded-full border px-3 py-1.5 font-mono text-[10px] uppercase tracking-widest ${status.chip}`}
              >
                <Icon icon={status.icon as never} size={13} />
                {status.label}
              </span>
            </div>
          </article>
        );
      })}
    </div>
  );
}
