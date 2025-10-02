"use client";
import { useState } from "react";

export function useCopyToClipboard() {
  const [copied, setCopied] = useState(false);
  async function copy(value: string) {
    await navigator.clipboard.writeText(value);
    setCopied(true);
    setTimeout(() => setCopied(false), 1000);
  }
  return { copied, copy };
}


