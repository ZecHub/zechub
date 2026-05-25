"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useBounty } from "@/lib/bounty-context";
import {
  Calendar,
  Clock,
  DollarSign,
  Play,
  AlertTriangle,
  CheckCircle,
  Users,
  RefreshCw,
} from "lucide-react";
import { format, nextSunday, setHours, setMinutes } from "date-fns";

interface BatchPaymentProcessorProps {
  children?: React.ReactNode;
}

export function BatchPaymentProcessor({
  children,
}: BatchPaymentProcessorProps) {
  const { getPendingBatchPayments, processBatchPayments, fetchBounties } =
    useBounty();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pendingPayments, setPendingPayments] = useState<
    Array<{
      address: string;
      amount: number;
      memo?: string;
    }>
  >([]);
  const [lastProcessResult, setLastProcessResult] = useState<{
    success: boolean;
    batchId?: string;
    message: string;
  } | null>(null);

  // Calculate next Sunday at 10 PM
  const getNextSunday10PM = () => {
    const nextSun = nextSunday(new Date());
    return setHours(setMinutes(nextSun, 0), 22);
  };

  const nextBatchTime = getNextSunday10PM();

  const loadPendingPayments = () => {
    const payments = getPendingBatchPayments();
    setPendingPayments(payments);
  };

  useEffect(() => {
    if (isOpen) {
      loadPendingPayments();
    }
  }, [isOpen]);

  const handleProcessBatch = async () => {
    if (pendingPayments.length === 0) {
      setLastProcessResult({
        success: false,
        message: "No pending payments to process",
      });
      return;
    }

    setIsProcessing(true);
    try {
      const result = await processBatchPayments();
      setLastProcessResult(result);

      if (result.success) {
        // Refresh data after successful processing
        await fetchBounties();
        loadPendingPayments();
      }
    } catch (error) {
      setLastProcessResult({
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Failed to process batch payments",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const getTotalAmount = () => {
    return (
      pendingPayments.reduce((total, payment) => total + payment.amount, 0) /
      100000000
    ); // Convert zatoshis to ZEC
  };

  const DefaultTrigger = () => (
    <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
      <Calendar className="w-4 h-4 mr-2" />
      Process Batch Payments
      {pendingPayments.length > 0 && (
        <Badge className="ml-2 bg-white text-purple-600 text-xs px-2">
          {pendingPayments.length}
        </Badge>
      )}
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children || <DefaultTrigger />}</DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold flex items-center gap-2">
            <Calendar className="w-5 h-5" />
            Batch Payment Processor
          </DialogTitle>
          <DialogDescription>
            Process all pending batch payments scheduled for Sunday at 10 PM
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Batch Summary */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Pending Payments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {pendingPayments.length}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Bounties ready for payment
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  Total Amount
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {getTotalAmount().toFixed(8)} ZEC
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  Total batch value
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-base flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  Next Batch
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-base font-bold text-slate-900 dark:text-slate-100">
                  {format(nextBatchTime, "MMM dd")}
                </div>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {format(nextBatchTime, "EEEE 'at' h:mm a")}
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Last Process Result */}
          {lastProcessResult && (
            <Alert
              className={
                lastProcessResult.success
                  ? "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-900/20"
                  : "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-900/20"
              }
            >
              {lastProcessResult.success ? (
                <CheckCircle className="h-4 w-4 text-green-600" />
              ) : (
                <AlertTriangle className="h-4 w-4 text-red-600" />
              )}
              <AlertDescription
                className={
                  lastProcessResult.success
                    ? "text-green-800 dark:text-green-300"
                    : "text-red-800 dark:text-red-300"
                }
              >
                {lastProcessResult.message}
                {lastProcessResult.batchId && (
                  <div className="mt-1 font-mono text-xs">
                    Batch ID: {lastProcessResult.batchId}
                  </div>
                )}
              </AlertDescription>
            </Alert>
          )}

          {/* Refresh Button */}
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-semibold">Pending Payments</h3>
            <Button
              variant="outline"
              size="sm"
              onClick={loadPendingPayments}
              className="flex items-center gap-2"
            >
              <RefreshCw className="w-4 h-4" />
              Refresh
            </Button>
          </div>

          {/* Pending Payments Table */}
          {pendingPayments.length > 0 ? (
            <div className="space-y-4">
              <div className="border rounded-lg overflow-hidden">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Bounty</TableHead>
                      <TableHead>Recipient Address</TableHead>
                      <TableHead>Amount (ZEC)</TableHead>
                      <TableHead>Amount (Zatoshis)</TableHead>
                      <TableHead>Memo</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {pendingPayments.map((payment, index) => (
                      <TableRow key={index}>
                        <TableCell>
                          <div className="max-w-xs">
                            <div className="font-medium truncate">
                              {payment.memo
                                ?.replace("Bounty: ", "")
                                .split(" (ID:")[0] || "Unknown Bounty"}
                            </div>
                            {payment.memo && payment.memo.includes("(ID:") && (
                              <div className="text-xs text-slate-500 font-mono">
                                {payment.memo.match(/\(ID: (.+)\)$/)?.[1] || ""}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="font-mono text-xs max-w-xs truncate"
                            title={payment.address}
                          >
                            {payment.address}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center font-medium">
                            {(payment.amount / 100000000).toFixed(8)}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="font-mono text-xs text-slate-500">
                            {payment.amount.toLocaleString()}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div
                            className="text-sm max-w-xs truncate"
                            title={payment.memo}
                          >
                            {payment.memo || "No memo"}
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>

              {/* JSON Output Preview */}
              <div className="space-y-2">
                <h4 className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Backend Payload (JSON format for Zcash transaction)
                </h4>
                <div className="p-4 bg-slate-100 dark:bg-slate-800 rounded-lg border">
                  <pre className="text-xs font-mono overflow-x-auto whitespace-pre-wrap">
                    {JSON.stringify(pendingPayments, null, 2)}
                  </pre>
                </div>
              </div>

              {/* Process Button */}
              <div className="flex justify-between items-center pt-4 border-t">
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  This will send the above JSON payload to your backend for
                  Zcash processing
                </div>
                <Button
                  onClick={handleProcessBatch}
                  disabled={isProcessing || pendingPayments.length === 0}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 mr-2 animate-spin" />
                      Processing...
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 mr-2" />
                      Process {pendingPayments.length} Payment
                      {pendingPayments.length !== 1 ? "s" : ""}
                    </>
                  )}
                </Button>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <Calendar className="w-12 h-12 text-slate-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                No Pending Batch Payments
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                There are currently no bounties scheduled for batch payment.
              </p>
            </div>
          )}

          {/* How it Works */}
          <Card className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
            <CardHeader>
              <CardTitle className="text-base text-blue-800 dark:text-blue-200">
                How Batch Processing Works
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-blue-700 dark:text-blue-300">
              <p>
                1. <strong>Collection:</strong> All bounties with "sunday_batch"
                payment type are collected
              </p>
              <p>
                2. <strong>Formatting:</strong> Payment data is converted to the
                JSON format shown above
              </p>
              <p>
                3. <strong>Processing:</strong> The payload is sent to your
                backend at <code>/api/bounties/process-batch-payments</code>
              </p>
              <p>
                4. <strong>Zcash Integration:</strong> Your backend uses this
                data to create a batch Zcash transaction
              </p>
              <p>
                5. <strong>Completion:</strong> Bounties are marked as paid
                after successful processing
              </p>
            </CardContent>
          </Card>

          {/* Close Button */}
          <div className="flex justify-end pt-4 border-t">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
