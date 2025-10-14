"use client";

import Link from "next/link";

export default function BackButton() {
  return (
    <Link
      href="/intro"
      aria-label="Volver a la intro"
      className="inline-flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-neutral-200 hover:text-white focus-visible:outline-none focus-visible:ring-2"
      style={{ minHeight: 44 }}
      title="Esc también regresa"
    >
      <span aria-hidden>←</span>
      <span>Return</span>
    </Link>
  );
}

