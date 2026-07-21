"use client";

// A lightweight, honestly-labeled local identity -- not real Zcash Login or
// wallet auth (no such integration exists here). It's a cosmetic display
// name, stored only in this browser, used to label the "owner" role when
// creating vaults.

import { useEffect, useState } from "react";

const KEY = "frostvault:identity";

export function useLocalIdentity() {
  const [name, setNameState] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setNameState(window.localStorage.getItem(KEY));
    setHydrated(true);
  }, []);

  function setName(value: string) {
    window.localStorage.setItem(KEY, value);
    setNameState(value);
  }

  return { name, setName, hydrated };
}
