"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useBounty } from "@/lib/bounty-context";
import { BatchPaymentProcessor } from "./batch-payment-processor";
import {
  Calendar,
  Clock,
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Users,
  CreditCard,
} from "lucide-react";
import { format, nextSunday, setHours, setMinutes } from "date-fns";

export function BatchPaymentDashboard() {
  const { bounties, getPendingBatchPayments } = useBounty();
  const [pendingBatchPayments, setPendingBatchPayments] = useState<
    Array<{
      address: string;
      amount: number;
      memo?: string;
    }>
  >([]);

  // Calculate next Sunday at 10 PM
  const getNextSunday10PM = () => {
    const nextSun = nextSunday(new Date());
    return setHours(setMinutes(nextSun, 0), 22);
  };

  const nextBatchTime = getNextSunday10PM();

  // Update pending payments when bounties change
  useEffect(() => {
    const payments = getPendingBatchPayments();
    setPendingBatchPayments(payments);
  }, [bounties, getPendingBatchPayments]);

  // Calculate statistics
  const totalBounties = bounties.length;
  const completedBounties = bounties.filter((b) => b.status === "DONE").length;
  const paidBounties = bounties.filter((b) => b.isPaid).length;
  const authorizedBounties = bounties.filter((b) => b.paymentAuthorized).length;
  const batchScheduledBounties = bounties.filter(
    (b) =>
      b.paymentAuthorized &&
      b.paymentScheduled?.type === "sunday_batch" &&
      !b.isPaid
  ).length;

  const totalBatchAmount =
    pendingBatchPayments.reduce((total, payment) => total + payment.amount, 0) /
    100000000; // Convert zatoshis to ZEC

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
            Payment Management
          </h1>
          <p className="text-slate-600 dark:text-slate-400 mt-1">
            Manage immediate and batch payments for completed bounties
          </p>
        </div>

        <BatchPaymentProcessor>
          <Button
            className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            size="lg"
          >
            <Calendar className="w-5 h-5 mr-2" />
            Process Batch Payments
            {pendingBatchPayments.length > 0 && (
              <Badge className="ml-2 bg-white text-purple-600 text-sm px-2">
                {pendingBatchPayments.length}
              </Badge>
            )}
          </Button>
        </BatchPaymentProcessor>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <Users className="w-4 h-4 text-blue-600" />
              Total Bounties
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-slate-900 dark:text-slate-100">
              {totalBounties}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              All bounties in system
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              Completed
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-green-600">
              {completedBounties}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Bounties marked as done
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <CreditCard className="w-4 h-4 text-purple-600" />
              Payment Authorized
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-purple-600">
              {authorizedBounties}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Ready for payment
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base flex items-center gap-2">
              <DollarSign className="w-4 h-4 text-yellow-600" />
              Paid Out
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-yellow-600">
              {paidBounties}
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              Payments completed
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Batch Payment Status */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Next Batch Info */}
        <Card className="border-blue-200 dark:border-blue-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
              <Calendar className="w-5 h-5" />
              Next Batch Payment
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">
                {format(nextBatchTime, "EEEE")}
              </div>
              <div className="text-lg text-slate-600 dark:text-slate-400">
                {format(nextBatchTime, "MMMM do 'at' h:mm a")}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {batchScheduledBounties}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Bounties queued
                </div>
              </div>
              <div>
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {totalBatchAmount.toFixed(4)} ZEC
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400">
                  Total amount
                </div>
              </div>
            </div>

            {batchScheduledBounties > 0 ? (
              <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                <div className="flex items-center gap-2 text-blue-800 dark:text-blue-200">
                  <CheckCircle className="w-4 h-4" />
                  <span className="font-medium">Ready for Processing</span>
                </div>
                <p className="text-sm text-blue-600 dark:text-blue-400 mt-1">
                  {batchScheduledBounties} payment
                  {batchScheduledBounties !== 1 ? "s" : ""} scheduled for next
                  batch
                </p>
              </div>
            ) : (
              <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Clock className="w-4 h-4" />
                  <span className="font-medium">No Pending Batch Payments</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-500 mt-1">
                  No bounties are currently scheduled for batch payment
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Payment Methods */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="w-5 h-5" />
              Payment Methods
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center">
                  <CreditCard className="w-4 h-4 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    Immediate Payment
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    ZEC sent directly to assignee's Z-address instantly
                  </div>
                </div>
              </div>

              <div className="flex gap-3 p-3 border rounded-lg">
                <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </div>
                <div>
                  <div className="font-medium text-slate-900 dark:text-slate-100">
                    Batch Payment
                  </div>
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Scheduled for Sunday 10 PM, all payments sent together
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-4 p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <div className="font-medium text-slate-900 dark:text-slate-100 mb-2">
                Batch Processing Benefits
              </div>
              <ul className="text-sm text-slate-600 dark:text-slate-400 space-y-1">
                <li>• Lower transaction fees</li>
                <li>• Consolidated payment record</li>
                <li>• Predictable payment schedule</li>
                <li>• Reduced blockchain congestion</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Payment Activity</CardTitle>
        </CardHeader>
        <CardContent>
          {bounties
            .filter((b) => b.paymentAuthorized || b.isPaid)
            .sort(
              (a, b) =>
                new Date(b.dateCreated).getTime() -
                new Date(a.dateCreated).getTime()
            )
            .slice(0, 5).length > 0 ? (
            <div className="space-y-3">
              {bounties
                .filter((b) => b.paymentAuthorized || b.isPaid)
                .sort(
                  (a, b) =>
                    new Date(b.dateCreated).getTime() -
                    new Date(a.dateCreated).getTime()
                )
                .slice(0, 5)
                .map((bounty) => (
                  <div
                    key={bounty.id}
                    className="flex items-center justify-between p-3 border rounded-lg"
                  >
                    <div>
                      <div className="font-medium text-slate-900 dark:text-slate-100">
                        {bounty.title}
                      </div>
                      <div className="text-sm text-slate-600 dark:text-slate-400">
                        {bounty.assigneeUser?.name} • {bounty.bountyAmount} ZEC
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      {bounty.isPaid ? (
                        <Badge className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          Paid
                        </Badge>
                      ) : bounty.paymentScheduled?.type === "sunday_batch" ? (
                        <Badge className="bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-200">
                          <Calendar className="w-3 h-3 mr-1" />
                          Batch Scheduled
                        </Badge>
                      ) : (
                        <Badge className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                          <Clock className="w-3 h-3 mr-1" />
                          Authorized
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <AlertTriangle className="w-8 h-8 text-slate-400 mx-auto mb-3" />
              <p className="text-slate-600 dark:text-slate-400">
                No recent payment activity
              </p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
