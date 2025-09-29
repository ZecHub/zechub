import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Copy, ExternalLink, Shield, CheckCircle, Loader2 } from "lucide-react";
import { useState } from "react";

// Define the PaymentID interface to match your data structure
interface PaymentID {
  id?: string;
  txHash?: string | { txHash: string };
  amount?: number;
  bountyId?: string;
  status?: string;
  createdAt?: string;
  [key: string]: any; // Allow for additional properties
}

interface PaymentTxIdsTableProps {
  paymentIDs: PaymentID[] | string[]; // Can handle both types
  isLoading?: boolean;
}

export function PaymentTxIdsTable({
  paymentIDs,
  isLoading = false,
}: PaymentTxIdsTableProps) {
  const [copiedTxId, setCopiedTxId] = useState<string | null>(null);

  const handleCopyTxId = async (txId: string) => {
    try {
      await navigator.clipboard.writeText(txId);
      setCopiedTxId(txId);
      setTimeout(() => setCopiedTxId(null), 2000);
    } catch (err) {
      console.error("Failed to copy transaction ID:", err);
    }
  };

  const handleViewOnExplorer = (txId: string) => {
    // Update this URL based on your blockchain network
    const explorerUrl = `https://blockchair.com/zcash/transaction/${txId}`;
    window.open(explorerUrl, "_blank", "noopener,noreferrer");
  };

  const truncateTxId = (txId: string, startChars = 8, endChars = 8) => {
    if (txId.length <= startChars + endChars + 3) return txId;
    return `${txId.slice(0, startChars)}...${txId.slice(-endChars)}`;
  };

  // Extract transaction hash from different data structures
  const extractTxHash = (item: PaymentID | string): string => {
    if (typeof item === "string") {
      return item;
    }

    if (typeof item === "object" && item !== null) {
      // Try different possible property names
      if (item.txHash) {
        if (typeof item.txHash === "string") {
          return item.txHash;
        }
        if (typeof item.txHash === "object" && item.txHash.txHash) {
          return item.txHash.txHash;
        }
      }
      if (item.transactionHash) return item.transactionHash;
      if (item.hash) return item.hash;
      if (item.id) return item.id;
    }

    return "N/A";
  };

  // Get additional metadata from PaymentID objects
  const getPaymentMetadata = (item: PaymentID | string, index: number) => {
    if (typeof item === "string") {
      return {
        txHash: item,
        amount: null,
        status: "completed",
        createdAt: null,
        id: `tx-${index}`,
      };
    }

    return {
      txHash: extractTxHash(item),
      amount: item.amount || null,
      status: item.status || "completed",
      createdAt: item.createdAt || null,
      id: item.id || `tx-${index}`,
    };
  };

  const formatDate = (dateString?: string | null) => {
    if (!dateString) return "N/A";
    try {
      return new Date(dateString).toLocaleString();
    } catch {
      return dateString;
    }
  };

  const formatAmount = (amount?: number | null) => {
    if (!amount) return null;
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(amount);
  };

  // Loading state
  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Payment Transaction IDs
          </h3>
          <div className="flex items-center gap-2">
            <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Loading...
            </span>
          </div>
        </div>

        <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800">
          <div className="p-8 text-center">
            <Loader2 className="w-8 h-8 mx-auto animate-spin text-blue-600 mb-4" />
            <p className="text-slate-600 dark:text-slate-400">
              Loading transaction data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // Empty state
  if (!paymentIDs || paymentIDs.length === 0) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
            Payment Transaction IDs
          </h3>
          <Badge variant="secondary" className="text-xs">
            0 transactions
          </Badge>
        </div>

        <div className="text-center py-12 border border-slate-200 dark:border-slate-700 rounded-lg bg-white dark:bg-slate-800">
          <Shield className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
            No payments processed
          </h3>
          <p className="text-slate-600 dark:text-slate-400">
            No transaction IDs available at this time.
          </p>
        </div>
      </div>
    );
  }

  // Determine if we have rich data (objects) or simple data (strings)
  const hasRichData =
    paymentIDs.length > 0 && typeof paymentIDs[0] === "object";

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">
          Payment Transaction IDs
        </h3>
        <Badge variant="secondary" className="text-xs animate-pulse">
          {paymentIDs.length} transaction{paymentIDs.length !== 1 ? "s" : ""}
        </Badge>
      </div>

      <div className="border border-slate-200 dark:border-slate-700 rounded-lg overflow-hidden bg-white dark:bg-slate-800 shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-slate-50 dark:bg-slate-700">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-16">
                  #
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Transaction ID
                </th>
                {hasRichData && (
                  <>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Amount
                    </th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      Date
                    </th>
                  </>
                )}
                <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">
                  Status
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider w-32">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200 dark:divide-slate-700">
              {paymentIDs.map((item, index) => {
                const metadata = getPaymentMetadata(item, index);
                const txHash = metadata.txHash;

                return (
                  <tr
                    key={metadata.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-4 whitespace-nowrap text-sm font-medium text-slate-500 dark:text-slate-400">
                      {index + 1}
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <code className="bg-slate-100 dark:bg-slate-600 px-2 py-1 rounded text-sm font-mono text-slate-900 dark:text-slate-100 max-w-xl">
                          <span className="hidden sm:inline">{txHash}</span>
                          <span className="sm:hidden">
                            {truncateTxId(txHash)}
                          </span>
                        </code>
                      </div>
                    </td>
                    {hasRichData && (
                      <>
                        <td className="px-4 py-4 whitespace-nowrap">
                          {metadata.amount ? (
                            <Badge
                              variant="secondary"
                              className="font-mono text-xs"
                            >
                              {formatAmount(metadata.amount)}
                            </Badge>
                          ) : (
                            <span className="text-slate-400 text-sm">N/A</span>
                          )}
                        </td>
                        <td className="px-4 py-4 whitespace-nowrap text-sm text-slate-600 dark:text-slate-400">
                          {formatDate(metadata.createdAt)}
                        </td>
                      </>
                    )}
                    <td className="px-4 py-4 whitespace-nowrap">
                      <Badge
                        className={`${
                          metadata.status === "completed"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-300"
                        } animate-pulse`}
                      >
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {metadata.status.charAt(0).toUpperCase() +
                          metadata.status.slice(1)}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 whitespace-nowrap text-right">
                      <div className="flex justify-end space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleCopyTxId(txHash)}
                          className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150"
                          title="Copy transaction ID"
                          disabled={txHash === "N/A"}
                        >
                          {copiedTxId === txHash ? (
                            <CheckCircle className="w-3 h-3 text-green-600 animate-pulse" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleViewOnExplorer(txHash)}
                          className="h-8 w-8 p-0 hover:bg-slate-100 dark:hover:bg-slate-600 transition-colors duration-150"
                          title="View on blockchain explorer"
                          disabled={txHash === "N/A"}
                        >
                          <ExternalLink className="w-3 h-3" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {paymentIDs.length > 0 && (
        <div className="text-sm text-slate-600 dark:text-slate-400 text-center bg-slate-50 dark:bg-slate-800 p-3 rounded-lg border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-center gap-2 flex-wrap">
            <span>Click</span>
            <Copy className="w-3 h-3" />
            <span>to copy transaction ID or</span>
            <ExternalLink className="w-3 h-3" />
            <span>to view on blockchain explorer</span>
          </div>
        </div>
      )}
    </div>
  );
}
