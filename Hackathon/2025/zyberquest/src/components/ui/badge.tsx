import * as React from "react";
import { cn } from "../../lib/utils";

export function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md border border-zx-green/35 px-2.5 py-1 text-xs font-mono text-zx-green",
        "bg-zx-mid/30 shadow-[0_0_10px_rgba(0,255,156,0.15)]",
        className
      )}
      {...props}
    />
  );
}
