"use client";
import { useState } from "react";
import { truncateMiddle } from "@/lib/utils";

export function useZecWallet() {
  const [address, setAddress] = useState<string | null>(null);
  const [balance, setBalance] = useState<number>(0);

  function connect() {
    // Placeholder connect flow
    setAddress("zs1exampleaddressxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
    setBalance(12.34);
  }
  function disconnect() {
    setAddress(null);
    setBalance(0);
  }

  return {
    address,
    addressShort: address ? truncateMiddle(address, 6) : null,
    balance,
    connect,
    disconnect,
  };
}


