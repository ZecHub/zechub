"use client";

import Link from "next/link";
import { forwardRef, useState, ComponentProps } from "react";

type Props = Omit<ComponentProps<typeof Link>, "href" | "children"> & {
  className?: string;
};

const InsertCoinButton = forwardRef<HTMLAnchorElement, Props>(function InsertCoinButton(
  { className = "", ...rest },
  ref
) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href="/tournament/pay"
      ref={ref}
      {...rest}
      onMouseEnter={(e) => { setHovered(true); rest.onMouseEnter?.(e); }}
      onMouseLeave={(e) => { setHovered(false); rest.onMouseLeave?.(e); }}
      aria-label="Insert coin and continue to payment"
      className={`group relative inline-flex items-center justify-center gap-3 rounded-2xl border px-10 py-5
                  text-xl font-semibold tracking-[0.08em] transition-all
                  border-fuchsia-400/80 bg-fuchsia-600/10 text-fuchsia-50
                  hover:border-yellow-300 hover:bg-yellow-400/10 hover:text-yellow-50
                  focus:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300
                  focus-visible:ring-offset-2 focus-visible:ring-offset-black ${className}`}
    >
      <span className="drop-shadow-[0_0_10px_rgba(250,204,21,0.45)]">INSERT COIN</span>
      <span
        aria-hidden
        className="pointer-events-none absolute inset-x-6 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-fuchsia-400 via-yellow-300 to-fuchsia-400 transition-transform duration-300 group-hover:scale-x-100"
      />
      
      <span aria-hidden className="absolute -inset-2" />
    </Link>
  );
});

export default InsertCoinButton;

