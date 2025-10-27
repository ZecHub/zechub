import { useState, ChangeEvent } from "react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { DialogClose } from "../ui/dialog";

interface WithdrawDialogProps {
  wallet_id?: string;
}


export default function WithdrawDialog({ wallet_id }: WithdrawDialogProps) {
  const [address, setAddress] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  // Validate Zcash u-shielded address
  function isValidZcashUAddress(addr: string): boolean {
    if (!addr) return false;

    // Only check if it starts with 'u1'
    return addr.startsWith("u1");
  }

  async function onWithdraw(): Promise<void> {
    // Clear previous errors
    setError("");

    // Validate address
    if (!address.trim()) {
      setError("U-shielded account address is required");
      return;
    }

    if (!isValidZcashUAddress(address.trim())) {
      setError("Invalid U-shielded address.");
      return;
    }

    setIsLoading(true);

    try {
      
      const response = await fetch("/api/withdraw", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({
          to_address: address.trim(),
          wallet_id: wallet_id, // Added wallet_id since it's in props
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess(true);
        setAddress("");
        setAmount("");
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        setError(data.error || "Failed to process withdrawal");
      }
    } catch (e) {
      console.error(e);
      setError("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  }

  // Real-time validation feedback
  function handleAddressChange(value: string): void {
    setAddress(value);
    // Clear error when user starts typing
    if (error && error.includes("U-shielded address")) {
      setError("");
    }
  }


  return (
    <div>
      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded text-sm">
          {error}
        </div>
      )}

      {/* Success message */}
      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          Withdrawal processed successfully!
        </div>
      )}

      <div className="space-y-2">
        <label className="text-sm font-medium">Enter U-shielded Account</label>
        <Input
          placeholder="Enter wallet address e.g u1..."
          value={address}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            handleAddressChange(e.target.value)
          }
          required
          disabled={isLoading}
          className={`w-full px-3 py-2 border rounded-md ${
            address && !isValidZcashUAddress(address)
              ? "border-yellow-500"
              : "border-gray-300"
          } ${isLoading ? "opacity-50" : ""}`}
        />
        {address && !isValidZcashUAddress(address) && (
          <p className="text-xs text-yellow-600">
            Address should start with u1
          </p>
        )}
        {address && isValidZcashUAddress(address) && (
          <p className="text-xs text-green-600">✓ Valid U-shielded address</p>
        )}
      </div>

      <div className="mt-2 gap-2 py-2 flex justify-end">
        <DialogClose asChild>
          <Button variant="outline">Close</Button>
        </DialogClose>
        <Button
          onClick={onWithdraw}
          disabled={
            isLoading || !address.trim() || !isValidZcashUAddress(address)
          }
        >
          {isLoading ? "Processing..." : "Send"}
        </Button>
      </div>
    </div>
  );
}
