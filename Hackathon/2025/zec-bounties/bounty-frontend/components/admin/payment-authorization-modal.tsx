// payment-authorization-modal.tsx
"use client";

import type React from "react";
import { useState } from "react";
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
import { Alert, AlertDescription } from "@/components/ui/alert";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import type { Bounty } from "@/lib/types";
import { useBounty } from "@/lib/bounty-context";
import {
  DollarSign,
  CreditCard,
  AlertTriangle,
  CheckCircle,
  Clock,
  Calendar,
} from "lucide-react";
import { format, nextSunday, setHours, setMinutes } from "date-fns";

interface PaymentAuthorizationModalProps {
  bounty: Bounty;
  children: React.ReactNode;
}

export function PaymentAuthorizationModal({
  bounty,
  children,
}: PaymentAuthorizationModalProps) {
  const { authorizePayment, authorizeBatchPayment } = useBounty();
  const [isOpen, setIsOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentType, setPaymentType] = useState<"instant" | "sunday_batch">(
    "instant"
  );

  // Calculate next Sunday at 10 PM
  const getNextSunday10PM = () => {
    const nextSun = nextSunday(new Date());
    return setHours(setMinutes(nextSun, 0), 22); // 10 PM
  };

  const nextBatchTime = getNextSunday10PM();

  const handleAuthorizePayment = async () => {
    setIsProcessing(true);
    try {
      if (paymentType === "instant") {
        await authorizePayment(bounty.id);
      } else {
        await authorizeBatchPayment(bounty.id, nextBatchTime);
      }
      setIsOpen(false);
    } catch (error) {
      console.error("Payment authorization failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <CreditCard className="w-5 h-5" />
            Authorize Payment
          </DialogTitle>
          <DialogDescription>
            Choose how to authorize ZEC payment for completed bounty
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">{bounty.title}</CardTitle>
              <div className="flex items-center gap-2">
                <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                  {bounty.status}
                </Badge>
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="pt-0 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Payment Amount:
                </span>
                <div className="flex items-center font-bold text-lg">
                  <DollarSign className="w-4 h-4 mr-1" />
                  {bounty.bountyAmount} ZEC
                </div>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Assignee:
                </span>
                <span className="text-sm font-medium">
                  {bounty.assigneeUser?.name || "Unassigned"}
                </span>
              </div>

              {bounty.assigneeUser?.z_address && (
                <div className="flex items-center justify-between">
                  <span className="text-sm text-slate-600 dark:text-slate-400">
                    Z Address:
                  </span>
                  <span className="text-sm font-mono text-slate-500 truncate max-w-[150px]">
                    {bounty.assigneeUser.z_address}
                  </span>
                </div>
              )}

              <div className="flex items-center justify-between">
                <span className="text-sm text-slate-600 dark:text-slate-400">
                  Completed:
                </span>
                <span className="text-sm font-medium">
                  {format(new Date(), "MMM dd, yyyy")}
                </span>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <Label className="text-base font-medium">Payment Schedule</Label>
            <RadioGroup
              value={paymentType}
              onValueChange={(value: "instant" | "sunday_batch") =>
                setPaymentType(value)
              }
              className="space-y-3"
            >
              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                <RadioGroupItem value="instant" id="instant" />
                <Label htmlFor="instant" className="flex-1 cursor-pointer">
                  <div className="font-medium">Pay Instantly</div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Authorize immediate payment to assignee's Z address
                  </div>
                </Label>
                <CreditCard className="w-5 h-5 text-blue-600" />
              </div>

              <div className="flex items-center space-x-2 rounded-lg border p-4 hover:bg-slate-50 dark:hover:bg-slate-800">
                <RadioGroupItem value="sunday_batch" id="sunday_batch" />
                <Label htmlFor="sunday_batch" className="flex-1 cursor-pointer">
                  <div className="font-medium">
                    Batch Payment (Sunday 10 PM)
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Include in next batch payment on{" "}
                    {format(nextBatchTime, "EEEE 'at' h:mm a")}
                  </div>
                </Label>
                <Calendar className="w-5 h-5 text-purple-600" />
              </div>
            </RadioGroup>
          </div>

          {paymentType === "sunday_batch" && (
            <Alert className="bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800">
              <Clock className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-800 dark:text-blue-300">
                This payment will be processed along with other completed
                bounties on {format(nextBatchTime, "EEEE, MMMM do 'at' h:mm a")}
                . The assignee will receive payment shortly after.
              </AlertDescription>
            </Alert>
          )}

          {!bounty.assigneeUser?.z_address && (
            <Alert variant="destructive">
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Assignee does not have a Z address configured. Please ensure the
                assignee has a valid Z address before authorizing payment.
              </AlertDescription>
            </Alert>
          )}

          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              This action will authorize the payment of {bounty.bountyAmount}{" "}
              ZEC to the assignee.
              {paymentType === "sunday_batch" &&
                " Payment will be processed in the next batch."}
            </AlertDescription>
          </Alert>

          <div className="flex gap-3">
            <Button
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="flex-1"
              disabled={isProcessing}
            >
              Cancel
            </Button>
            <Button
              onClick={handleAuthorizePayment}
              disabled={isProcessing || !bounty.assigneeUser?.z_address}
              className="flex-1 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isProcessing
                ? "Processing..."
                : `Authorize ${
                    paymentType === "instant" ? "Now" : "for Batch"
                  }`}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
