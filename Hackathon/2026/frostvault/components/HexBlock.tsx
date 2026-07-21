import { CopyButton } from "@/components/CopyButton";
import { cn } from "@/lib/utils";

function truncate(hex: string, lead = 10, tail = 8) {
  if (hex.length <= lead + tail + 3) return hex;
  return `${hex.slice(0, lead)}…${hex.slice(-tail)}`;
}

export function HexBlock({ value, className }: { value: string; className?: string }) {
  return (
    <div className={cn("data-well flex items-center justify-between gap-2", className)}>
      <span className="truncate">{truncate(value)}</span>
      <CopyButton value={value} />
    </div>
  );
}
