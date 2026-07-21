"use client";

import { useState } from "react";
import { toast } from "sonner";
import { QRCodeSVG } from "qrcode.react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { HexBlock } from "@/components/HexBlock";
import { receiveFunds } from "@/lib/api/vaults";
import { fakeReceivingAddress } from "@/lib/zcash";

export function ReceiveModal({
  open,
  onOpenChange,
  vaultId,
  onReceived,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  vaultId: string;
  onReceived: () => void;
}) {
  const [amount, setAmount] = useState("");
  const [from, setFrom] = useState("");
  const [busy, setBusy] = useState(false);
  const address = fakeReceivingAddress(vaultId);

  async function simulateIncoming() {
    const n = parseFloat(amount);
    if (!amount || Number.isNaN(n) || n <= 0) {
      toast.error("Enter a positive amount to simulate");
      return;
    }
    setBusy(true);
    try {
      await receiveFunds(vaultId, amount, from.trim() || "unknown sender");
      toast.success(`Received ${amount} ZEC (simulated incoming payment)`);
      setAmount("");
      setFrom("");
      onReceived();
      onOpenChange(false);
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Failed to record payment");
    } finally {
      setBusy(false);
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Receive shielded ZEC</DialogTitle>
          <DialogDescription>
            This vault&apos;s receiving address (placeholder — real Orchard address derivation
            from the group key is out of scope, see README).
          </DialogDescription>
        </DialogHeader>

        <div className="relative flex justify-center overflow-hidden rounded-md border border-border bg-secondary/40 p-4">
          <QRCodeSVG
            value={address}
            size={160}
            bgColor="#131917"
            fgColor="#eaf2ee"
            level="M"
            marginSize={2}
          />
          <div
            className="pointer-events-none absolute left-4 right-4 h-8 bg-gradient-to-b from-transparent via-signal/40 to-transparent"
            style={{ animation: "qr-scan 2.5s ease-in-out infinite" }}
          />
        </div>
        <HexBlock value={address} />

        <div className="space-y-3 border-t border-border pt-4">
          <p className="text-xs text-muted-foreground">
            No real network to receive from in this demo — simulate an incoming payment landing
            in the ledger instead.
          </p>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="recv-amount">Amount</Label>
              <Input
                id="recv-amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0.0000"
                inputMode="decimal"
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="recv-from">From</Label>
              <Input
                id="recv-from"
                value={from}
                onChange={(e) => setFrom(e.target.value)}
                placeholder="bob.zcash"
              />
            </div>
          </div>
          <Button onClick={simulateIncoming} disabled={busy} className="w-full" variant="secondary">
            {busy ? "Recording…" : "Simulate incoming payment"}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
