"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useBounty } from "@/lib/bounty-context";
import { AlertTriangle, Wallet, CheckCircle, Info } from "lucide-react";

interface ZAddressCollectionModalProps {
  isOpen: boolean;
  onComplete: (zAddress: string) => void;
}

export function ZAddressCollectionModal({
  isOpen,
  onComplete,
}: ZAddressCollectionModalProps) {
  const [zAddress, setZAddress] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isVerified, setIsVerified] = useState<boolean | undefined>(true);

  const { verifyZaddress } = useBounty();

  // Reset state when modal opens
  useEffect(() => {
    if (isOpen) {
      setZAddress("");
      setError(null);
      setIsSubmitting(false);
    }
  }, [isOpen]);

  // Validate Z-address format
  const validateZAddress = async (
    address: string
  ): Promise<boolean | undefined> => {
    // Basic validation for Zcash shielded addresses
    // Sapling addresses start with "zs1" and are 78 characters long
    // Sprout addresses start with "zc" and are 95 characters long
    // const saplingRegex = /^zs1[a-z0-9]{97}$/i;
    // const sproutRegex = /^zc[a-z0-9]{93}$/i;

    const result = await verifyZaddress(address);
    setIsVerified(result);

    return result;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!zAddress.trim()) {
      setError("Z-address is required to continue");
      return;
    }

    if (!(await validateZAddress(zAddress.trim()))) {
      setError(
        "Please enter a valid Zcash shielded address (starts with 'zs1' or 'zc')"
      );
      return;
    }

    setIsSubmitting(true);
    setError(null);

    try {
      // Call the completion handler
      await onComplete(zAddress.trim());
      // ✅ Reset submitting state after completion
      setIsSubmitting(false);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to save Z-address. Please try again."
      );
      setIsSubmitting(false);
    }
  };

  // Prevent closing the dialog
  const handleOpenChange = () => {
    // Do nothing - this prevents the dialog from being closed
    return;
  };

  // Prevent escape key from closing
  useEffect(() => {
    if (isOpen) {
      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
        }
      };

      document.addEventListener("keydown", handleKeyDown, true);
      return () => document.removeEventListener("keydown", handleKeyDown, true);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange} modal={true}>
      <DialogContent
        className="sm:max-w-md"
        // Prevent clicking outside to close
        onPointerDownOutside={(e) => e.preventDefault()}
        onEscapeKeyDown={(e) => e.preventDefault()}
        // Remove the X close button
        showCloseButton={false}
      >
        <DialogHeader className="text-center">
          <div className="mx-auto w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-full flex items-center justify-center mb-4">
            <Wallet className="w-6 h-6 text-purple-600 dark:text-purple-400" />
          </div>
          <DialogTitle className="text-xl font-bold text-slate-900 dark:text-slate-100">
            Setup Required
          </DialogTitle>
          <DialogDescription className="text-slate-600 dark:text-slate-400">
            Please provide your Zcash shielded address to receive bounty
            payments
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Info Alert */}
          <Alert className="border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-900/20">
            <Info className="h-4 w-4 text-blue-600 dark:text-blue-400" />
            <AlertDescription className="text-blue-800 dark:text-blue-300">
              Your Z-address is required to receive ZEC payments for completed
              bounties. This ensures secure and private transactions.
            </AlertDescription>
          </Alert>

          <div className="space-y-2">
            <Label htmlFor="zaddress" className="text-sm font-medium">
              Zcash Shielded Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="zaddress"
              type="text"
              placeholder="zs1abc... or zcdef..."
              value={zAddress}
              onChange={(e) => {
                setZAddress(e.target.value);
                setIsVerified(true);
                setError(null);
              }}
              className="font-mono text-sm"
              disabled={isSubmitting}
              autoFocus
            />
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Enter your Zcash shielded address (starts with 'zs1' for Sapling
              or 'zc' for Sprout)
            </p>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <div className="space-y-3">
            <Button
              type="submit"
              disabled={isSubmitting || !isVerified}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isSubmitting ? (
                <div className="flex items-center">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2" />
                  Saving...
                </div>
              ) : (
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 mr-2" />
                  Continue to Dashboard
                </div>
              )}
            </Button>

            {/* Help text */}
            <div className="text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Don't have a Z-address? Get one from your Zcash wallet app
              </p>
            </div>
          </div>
        </form>

        {/* Additional help section */}
        <div className="pt-4 border-t border-slate-200 dark:border-slate-700">
          <div className="space-y-2">
            <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
              Need help finding your Z-address?
            </h4>
            <div className="text-xs text-slate-600 dark:text-slate-400 space-y-1">
              <p>• Open your Zcash wallet (Ywallet, Zecwallet, etc.)</p>
              <p>• Look for "Receive" or "Shielded Address"</p>
              <p>• Copy the address that starts with 'zs1' or 'zc'</p>
              <p>• Paste it in the field above</p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
