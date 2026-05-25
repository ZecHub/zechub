"use client";
import { Button } from "@/components/ui/button";
import { useZecWallet } from "@/hooks/useZecWallet";

export default function ConnectWallet() {
  const { addressShort, connect, disconnect, address } = useZecWallet();
  if (!address) {
    return (
      <Button onClick={connect} size="sm" className="bg-primary text-primary-foreground">
        Connect Wallet
      </Button>
    );
  }
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-muted-foreground hidden sm:inline">{addressShort}</span>
      <Button onClick={disconnect} size="sm" variant="outline">Disconnect</Button>
    </div>
  );
}


