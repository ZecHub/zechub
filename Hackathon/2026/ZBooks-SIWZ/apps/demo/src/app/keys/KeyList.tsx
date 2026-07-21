"use client";

import { AnimatePresence } from "framer-motion";
import type { Ufvk } from "@/lib/types";
import { KeyRow } from "./KeyRow";

// Client wrapper for the AnimatePresence enter/exit on add/remove.
export function KeyList({ keys, canEdit }: { keys: Ufvk[]; canEdit: boolean }) {
  return (
    <ul className="flex flex-col gap-2">
      <AnimatePresence initial={false}>
        {keys.map((k) => (
          <KeyRow key={k.id} k={k} canEdit={canEdit} />
        ))}
      </AnimatePresence>
    </ul>
  );
}
