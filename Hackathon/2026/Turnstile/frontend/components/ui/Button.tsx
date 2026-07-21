import Link from "next/link";
import type { ComponentProps, CSSProperties, ReactNode } from "react";

import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary";

const base =
  "group inline-flex cursor-pointer items-center justify-between gap-3 rounded-full px-6 py-3 text-sm font-medium tracking-tight transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:translate-y-0";

const variants: Record<Variant, string> = {
  primary: "text-canvas",
  secondary:
    "bg-gradient-to-b from-white/[0.12] via-white/[0.05] to-white/[0.12] text-muted hover:text-foreground",
};

const styles: Record<Variant, CSSProperties> = {
  primary: {
    background: "radial-gradient(circle at 10% 0%, #a7f3d0 0%, #10b981 100%)",
    boxShadow:
      "0 15px 25px -10px rgba(16, 185, 129, 0.55), inset 0 4px 8px rgba(209, 250, 229, 0.85), inset 0 -4px 8px rgba(5, 150, 105, 0.9)",
  },
  secondary: {
    boxShadow:
      "0 18px 35px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.12)",
  },
};

interface ButtonProps extends ComponentProps<"button"> {
  variant?: Variant;
  children: ReactNode;
}

export function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  return (
    <button
      className={cn(base, variants[variant], className)}
      style={styles[variant]}
      {...props}
    >
      {children}
    </button>
  );
}

interface ButtonLinkProps extends ComponentProps<typeof Link> {
  variant?: Variant;
  children: ReactNode;
}

export function ButtonLink({
  variant = "primary",
  className,
  children,
  ...props
}: ButtonLinkProps) {
  return (
    <Link className={cn(base, variants[variant], className)} style={styles[variant]} {...props}>
      {children}
    </Link>
  );
}

export function ButtonGlyph({ children }: { children: ReactNode }) {
  return (
    <span className="flex items-center justify-center rounded-full bg-black/15 px-3 py-1">
      {children}
    </span>
  );
}
