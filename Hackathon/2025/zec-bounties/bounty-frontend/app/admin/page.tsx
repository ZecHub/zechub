"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { AdminNavbar } from "@/components/layout/admin/admin-navbar";
import { BountyAdminCard } from "@/components/admin/bounty-admin-card";
import { AdminStats } from "@/components/admin/admin-stats";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreateBountyForm } from "@/components/bounty/create-bounty-form";
import { useBounty } from "@/lib/bounty-context";
import type { BountyStatus } from "@/lib/types";
import {
  Shield,
  Search,
  Filter,
  Plus,
  CreditCard,
  WalletCards,
  Loader2,
  CheckCircle,
  RefreshCw,
} from "lucide-react";
import { TopUpModal } from "@/components/admin/topup-modal";
import { PaymentTxIdsTable } from "@/components/transactions/payment-tx-table";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function AdminPage() {
  const { bounties, paymentIDs, fetchTransactionHashes, authorizeDuePayment } =
    useBounty();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BountyStatus | "all">("all");
  const [approvalFilter, setApprovalFilter] = useState<
    "all" | "approved" | "pending"
  >("all");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [showQrModal, setShowQrModal] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isFetchingTxHashes, setIsFetchingTxHashes] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const filteredBounties = useMemo(() => {
    let filtered = bounties;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (bounty) =>
          bounty.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bounty.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          bounty.createdByUser?.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (statusFilter !== "all") {
      filtered = filtered.filter((bounty) => bounty.status === statusFilter);
    }

    // Approval filter
    if (approvalFilter !== "all") {
      filtered = filtered.filter((bounty) =>
        approvalFilter === "approved" ? bounty.isApproved : !bounty.isApproved
      );
    }

    return filtered.sort(
      (a, b) =>
        new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
    );
  }, [bounties, searchTerm, statusFilter, approvalFilter]);

  const handlePaymentAuthorization = async () => {
    setIsUpdating(true);
    setPaymentSuccess(false);
    try {
      await authorizeDuePayment();
      setPaymentSuccess(true);
      // Auto-hide success state after 3 seconds
      setTimeout(() => setPaymentSuccess(false), 3000);
    } catch (error) {
      console.error("Payment authorization failed:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleFetchTransactionHashes = async () => {
    setIsFetchingTxHashes(true);
    try {
      await fetchTransactionHashes();
    } catch (error) {
      console.error("Failed to fetch transaction hashes:", error);
    } finally {
      setIsFetchingTxHashes(false);
    }
  };

  const pendingBounties = bounties.filter((b) => !b.isApproved);
  const completedBounties = bounties.filter(
    (b) => b.status === "DONE" && !b.isPaid
  );

  // Enhanced payment processing button component
  const PaymentProcessingButton = () => {
    if (paymentSuccess) {
      return (
        <Button
          size="sm"
          disabled
          className="w-full h-8 text-xs bg-green-600 hover:bg-green-600"
        >
          <CheckCircle className="w-3 h-3 mr-1 animate-pulse" />
          Payment Authorized!
        </Button>
      );
    }

    if (isUpdating) {
      return (
        <Button
          size="sm"
          disabled
          className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-blue-600"
        >
          <div className="flex items-center">
            <Loader2 className="w-3 h-3 mr-1 animate-spin" />
            <span className="relative">
              Processing
              <span className="absolute -right-4 animate-pulse">...</span>
            </span>
          </div>
        </Button>
      );
    }

    return (
      <Button
        size="sm"
        onClick={handlePaymentAuthorization}
        disabled={completedBounties.length === 0}
        className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-200 transform hover:scale-105"
      >
        <CreditCard className="w-3 h-3 mr-1" />
        Authorize Payment
      </Button>
    );
  };

  if (showCreateForm) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
          <AdminNavbar />
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setShowCreateForm(false)}
                className="mb-4"
              >
                ← Back to Dashboard
              </Button>
            </div>
            <CreateBountyForm
              onSuccess={() => setShowCreateForm(false)}
              onCancel={() => setShowCreateForm(false)}
            />
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  return (
    <ProtectedRoute requireAdmin>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <AdminNavbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Shield className="w-6 h-6 text-blue-600" />
                <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                  Admin Dashboard
                </h1>
              </div>
              <p className="text-slate-600 dark:text-slate-400">
                Manage bounties, approvals, and platform oversight
              </p>
            </div>
            <div className="flex gap-4">
              <Button
                onClick={() => setShowQrModal(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <WalletCards className="w-4 h-4 mr-2" />
                Top Up
              </Button>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Bounty
              </Button>
            </div>
          </div>

          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="pending" className="relative">
                Pending Approval
                {pendingBounties.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {pendingBounties.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="payments" className="relative">
                Payments Due
                {completedBounties.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-purple-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-pulse">
                    {completedBounties.length}
                  </span>
                )}
              </TabsTrigger>
              <TabsTrigger value="all">All Bounties</TabsTrigger>
              <TabsTrigger value="txids">All Transactions</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <AdminStats />

              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Recent Activity
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {bounties
                    .sort(
                      (a, b) =>
                        new Date(b.dateCreated).getTime() -
                        new Date(a.dateCreated).getTime()
                    )
                    .slice(0, 6)
                    .map((bounty) => (
                      <BountyAdminCard key={bounty.id} bounty={bounty} />
                    ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="pending" className="space-y-6">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
                  Bounties Pending Approval ({pendingBounties.length})
                </h2>
                {pendingBounties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {pendingBounties.map((bounty) => (
                      <BountyAdminCard key={bounty.id} bounty={bounty} />
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      All caught up!
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      No bounties pending approval at this time.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="payments" className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Completed Bounties Awaiting Payment (
                    {completedBounties.length})
                  </h2>
                  <div className="flex gap-2">
                    <PaymentProcessingButton />
                  </div>
                </div>

                {/* Processing Status Card */}
                {(isUpdating || paymentSuccess) && (
                  <div
                    className={`mb-6 p-4 rounded-lg border-2 ${
                      paymentSuccess
                        ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
                        : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
                    } transition-all duration-300`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        {isUpdating ? (
                          <Loader2 className="w-5 h-5 animate-spin text-blue-600" />
                        ) : (
                          <CheckCircle className="w-5 h-5 text-green-600 animate-pulse" />
                        )}
                        <div>
                          <h3
                            className={`font-medium ${
                              paymentSuccess
                                ? "text-green-800 dark:text-green-200"
                                : "text-blue-800 dark:text-blue-200"
                            }`}
                          >
                            {isUpdating
                              ? "Processing Payments..."
                              : "Payments Authorized Successfully!"}
                          </h3>
                          <p
                            className={`text-sm ${
                              paymentSuccess
                                ? "text-green-600 dark:text-green-400"
                                : "text-blue-600 dark:text-blue-400"
                            }`}
                          >
                            {isUpdating
                              ? `Authorizing payments for ${completedBounties.length} bounties`
                              : "All pending payments have been processed"}
                          </p>
                        </div>
                      </div>
                      {isUpdating && (
                        <div className="text-blue-600 text-sm font-mono">
                          {completedBounties.length} pending...
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {completedBounties.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {completedBounties.map((bounty) => (
                      <div
                        key={bounty.id}
                        className={`relative ${
                          isUpdating ? "opacity-70 pointer-events-none" : ""
                        } transition-opacity duration-200`}
                      >
                        <BountyAdminCard bounty={bounty} />
                        {isUpdating && (
                          <div className="absolute inset-0 bg-white/50 dark:bg-slate-900/50 flex items-center justify-center rounded-lg">
                            <Loader2 className="w-6 h-6 animate-spin text-purple-600" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      No payments due
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      All completed bounties have been paid.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>

            <TabsContent value="all" className="space-y-6">
              {/* Filters */}
              <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-sm border border-slate-200 dark:border-slate-700">
                <div className="flex items-center gap-4 flex-wrap">
                  <div className="flex-1 min-w-[200px]">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
                      <Input
                        placeholder="Search bounties..."
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        className="pl-10"
                      />
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <Filter className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <Select
                      value={statusFilter}
                      onValueChange={(value) =>
                        setStatusFilter(value as BountyStatus | "all")
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Status" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="TO_DO">To Do</SelectItem>
                        <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                        <SelectItem value="IN_REVIEW">In Review</SelectItem>
                        <SelectItem value="DONE">Done</SelectItem>
                        <SelectItem value="CANCELLED">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>

                    <Select
                      value={approvalFilter}
                      onValueChange={(value) =>
                        setApprovalFilter(
                          value as "all" | "approved" | "pending"
                        )
                      }
                    >
                      <SelectTrigger className="w-[140px]">
                        <SelectValue placeholder="Approval" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="pending">Pending</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>

              {/* Bounties Grid */}
              {filteredBounties.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBounties.map((bounty) => (
                    <BountyAdminCard key={bounty.id} bounty={bounty} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Search className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                  <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                    No bounties found
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    Try adjusting your search or filter criteria.
                  </p>
                </div>
              )}
            </TabsContent>

            <TabsContent value="txids" className="space-y-6">
              <div>
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-100">
                    Transaction History ({paymentIDs?.length || 0})
                  </h2>
                  <Button
                    onClick={handleFetchTransactionHashes}
                    disabled={isFetchingTxHashes}
                    size="sm"
                    variant="outline"
                    className="flex items-center gap-2"
                  >
                    {isFetchingTxHashes ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <RefreshCw className="w-4 h-4" />
                    )}
                    {isFetchingTxHashes ? "Fetching..." : "Refresh"}
                  </Button>
                </div>

                {isFetchingTxHashes && (
                  <div className="mb-4 p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      <Loader2 className="w-4 h-4 animate-spin text-blue-600" />
                      <span className="text-blue-800 dark:text-blue-200 text-sm">
                        Fetching latest transaction hashes...
                      </span>
                    </div>
                  </div>
                )}

                {paymentIDs && paymentIDs.length > 0 ? (
                  <PaymentTxIdsTable paymentIDs={paymentIDs} />
                ) : (
                  <div className="text-center py-12">
                    <Shield className="w-12 h-12 mx-auto text-slate-400 dark:text-slate-600 mb-4" />
                    <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                      No payments processed
                    </h3>
                    <p className="text-slate-600 dark:text-slate-400">
                      No transaction IDs available at this time.
                    </p>
                  </div>
                )}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <TopUpModal isOpen={showQrModal} onClose={() => setShowQrModal(false)} />
    </ProtectedRoute>
  );
}
