import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

export interface CeremonyStage {
  key: string;
  label: string;
}

export function CeremonyRail({
  stages,
  currentPhase,
  failed = false,
}: {
  stages: CeremonyStage[];
  currentPhase: string;
  failed?: boolean;
}) {
  const currentIndex = stages.findIndex((s) => s.key === currentPhase);
  const isDone = currentPhase === "complete";

  return (
    <div className="flex items-center">
      {stages.map((stage, i) => {
        const done = isDone || i < currentIndex;
        const active = !isDone && i === currentIndex;
        return (
          <div key={stage.key} className="flex flex-1 items-center last:flex-none">
            <div className="flex flex-col items-center gap-2">
              <div
                className={cn(
                  "flex h-7 w-7 items-center justify-center rounded-full border-2 text-xs font-medium",
                  failed && active
                    ? "border-destructive text-destructive"
                    : done
                      ? "border-signal bg-signal text-signal-foreground"
                      : active
                        ? "border-pending text-pending animate-pulse"
                        : "border-border text-muted-foreground",
                )}
              >
                {failed && active ? <X className="h-3.5 w-3.5" /> : done ? <Check className="h-3.5 w-3.5" /> : i + 1}
              </div>
              <span
                className={cn(
                  "font-mono text-[10px] uppercase tracking-wide",
                  done ? "text-signal" : active ? "text-pending" : "text-muted-foreground",
                )}
              >
                {stage.label}
              </span>
            </div>
            {i < stages.length - 1 && (
              <div className={cn("mx-2 h-px flex-1", done ? "bg-signal" : "bg-border")} />
            )}
          </div>
        );
      })}
    </div>
  );
}
