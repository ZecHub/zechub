import { useState } from "react";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QRCodeCanvas } from "qrcode.react";
import { useBounty } from "@/lib/bounty-context";
import {
  Wallet,
  QrCode,
  Copy,
  CheckCircle,
  RefreshCw,
  CreditCard,
  AlertTriangle,
  Info,
} from "lucide-react";

interface TopUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function TopUpModal({ isOpen, onClose }: TopUpModalProps) {
  const { balance, fetchBalance, address, fetchAddresses } = useBounty();
  const [manualAmount, setManualAmount] = useState("");
  const [isUpdating, setIsUpdating] = useState(false);
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Demo wallet address - replace with your actual Zcash address
  const walletAddress = address ? address : "Loading...";

  const handleCopyAddress = async () => {
    try {
      await navigator.clipboard.writeText(walletAddress);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy address:", err);
    }
  };

  const handleManualUpdate = async () => {
    if (!manualAmount || isNaN(parseFloat(manualAmount))) {
      setError("Please enter a valid amount");
      return;
    }

    setIsUpdating(true);
    setError(null);
    setSuccess(null);

    try {
      // Simulate API call to update balance
      // Replace with your actual API endpoint
      const response = await fetch("/api/admin/update-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: parseFloat(manualAmount),
          type: "manual_topup",
        }),
      });

      if (response.ok) {
        setSuccess(`Balance updated with ${manualAmount} ZEC`);
        setManualAmount("");
        await fetchBalance(); // Refresh balance
      } else {
        throw new Error("Failed to update balance");
      }
    } catch (err) {
      setError("Failed to update balance. Please try again.");
    } finally {
      setIsUpdating(false);
    }
  };

  const handleRefreshBalance = async () => {
    setIsUpdating(true);
    try {
      await fetchBalance();
      await fetchAddresses();
      setSuccess("Balance refreshed successfully");
    } catch (err) {
      setError("Failed to refresh balance");
    } finally {
      setIsUpdating(false);
    }
  };

  const resetMessages = () => {
    setError(null);
    setSuccess(null);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          {/* <div className="mx-auto w-12 h-12 bg-gradient-to-br from-green-100 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/20 rounded-full flex items-center justify-center mb-4">
              <Wallet className="w-6 h-6 text-green-600 dark:text-green-400" />
            </div> */}
          <DialogTitle className="text-xl font-bold text-center">
            Top Up Wallet
          </DialogTitle>
          <DialogDescription className="text-center">
            Add ZEC to your platform wallet for bounty payments
          </DialogDescription>
        </DialogHeader>

        {/* Current Balance Display */}
        <div className="bg-slate-50 dark:bg-slate-800 rounded-lg p-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Wallet className="w-5 h-5 text-slate-600 dark:text-slate-400" />
              <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                Current Balance
              </span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-lg font-bold text-green-600 dark:text-green-400">
                {balance !== undefined
                  ? `${(balance / 1e8).toFixed(4)} ZEC`
                  : "Loading..."}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleRefreshBalance}
                disabled={isUpdating}
                className="h-6 w-6 p-0"
              >
                <RefreshCw
                  className={`w-3 h-3 ${isUpdating ? "animate-spin" : ""}`}
                />
              </Button>
            </div>
          </div>
        </div>

        {/* Status Messages */}
        {error && (
          <Alert variant="destructive" className="mb-4">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {/* {success && (
          <Alert className="mb-4 border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20">
            <CheckCircle className="h-4 w-4 text-green-600 dark:text-green-400" />
            <AlertDescription className="text-green-800 dark:text-green-300">
              {success}
            </AlertDescription>
          </Alert>
        )} */}

        <Tabs
          defaultValue="qr"
          className="space-y-0"
          onValueChange={resetMessages}
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="qr" className="flex items-center gap-2">
              <QrCode className="w-4 h-4" />
              Send ZEC
            </TabsTrigger>
            <TabsTrigger value="manual" className="flex items-center gap-2">
              <CreditCard className="w-4 h-4" />
              Manual Update
            </TabsTrigger>
          </TabsList>

          <TabsContent value="qr" className="space-y-4">
            <Card className="py-0 gap-0">
              <CardHeader className="text-center py-4">
                <CardTitle className="text-lg">
                  Send ZEC to Platform Wallet
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {/* QR Code Placeholder */}
                <div className="flex justify-center p-2">
                  <div className="w-48 h-48 bg-slate-100 dark:bg-slate-800 rounded-lg flex items-center justify-center border-2 border-dashed border-slate-300 dark:border-slate-600">
                    <div className="text-center">
                      <QRCodeCanvas
                        value={walletAddress}
                        size={200}
                        marginSize={2}
                      />
                    </div>
                  </div>
                </div>

                {/* Wallet Address */}
                <div className="space-y-2 pb-4">
                  <Label className="text-sm font-medium">
                    Platform Wallet Address
                  </Label>
                  <div className="flex items-center space-x-2">
                    <Input
                      value={walletAddress}
                      readOnly
                      className="font-mono text-xs"
                    />
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={handleCopyAddress}
                      className="px-3"
                    >
                      {copied ? (
                        <CheckCircle className="w-4 h-4 text-green-600" />
                      ) : (
                        <Copy className="w-4 h-4" />
                      )}
                    </Button>
                  </div>
                  {copied && (
                    <p className="text-xs text-green-600 dark:text-green-400">
                      Address copied to clipboard!
                    </p>
                  )}
                </div>

                {/* Instructions */}
                {/* <Alert>
                  <Info className="h-4 w-4" />
                  <AlertDescription className="text-sm">
                    <strong>Instructions:</strong>
                    <ul className="mt-2 space-y-1 list-disc list-inside">
                      <li>Send ZEC to the address above</li>
                      <li>Allow 1-3 confirmations for processing</li>
                      <li>Balance will update automatically</li>
                      <li>Use the refresh button to check status</li>
                    </ul>
                  </AlertDescription>
                </Alert> */}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="manual" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <CreditCard className="w-5 h-5" />
                  Manual Balance Update
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Alert className="border-amber-200 bg-amber-50 dark:border-amber-800 dark:bg-amber-900/20">
                  <AlertTriangle className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                  <AlertDescription className="text-amber-800 dark:text-amber-300">
                    <strong>Admin Only:</strong> Use this to manually update the
                    balance after confirming external payments or for testing
                    purposes.
                  </AlertDescription>
                </Alert>

                <div className="space-y-2">
                  <Label htmlFor="manual-amount">Amount to Add (ZEC)</Label>
                  <Input
                    id="manual-amount"
                    type="number"
                    step="0.0001"
                    placeholder="0.0000"
                    value={manualAmount}
                    onChange={(e) => setManualAmount(e.target.value)}
                  />
                </div>

                <Button
                  onClick={handleManualUpdate}
                  disabled={isUpdating || !manualAmount}
                  className="w-full"
                >
                  {isUpdating ? (
                    <div className="flex items-center">
                      <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                      Updating...
                    </div>
                  ) : (
                    <div className="flex items-center">
                      <CreditCard className="w-4 h-4 mr-2" />
                      Update Balance
                    </div>
                  )}
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* <div className="flex justify-end pt-4">
          <Button variant="outline" onClick={onClose}>
            Close
          </Button>
        </div> */}
      </DialogContent>
    </Dialog>
  );
}
