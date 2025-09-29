"use client";

import { ProtectedRoute } from "@/components/auth/protected-route";
import { Navbar } from "@/components/layout/navbar";
import { BountyCard } from "@/components/bounty/bounty-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useBounty } from "@/lib/bounty-context";
import type { BountyStatus } from "@/lib/types";
import { Plus, Search, Filter } from "lucide-react";
import { useState, useMemo } from "react";
import Link from "next/link";

export default function BountiesPage() {
  const { bounties, currentUser } = useBounty();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<BountyStatus | "all">("all");
  const [approvalFilter, setApprovalFilter] = useState<
    "all" | "approved" | "pending"
  >("all");

  const filteredBounties = useMemo(() => {
    let filtered = bounties;

    // Role-based filtering
    // if (currentUser?.role !== "ADMIN") {
    //   filtered = filtered.filter(
    //     (b) =>
    //       b.createdBy === currentUser?.id ||
    //       b.assignee === currentUser?.id ||
    //       b.isApproved // Show approved bounties to all users
    //   );
    // }

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
  }, [bounties, searchTerm, statusFilter, approvalFilter, currentUser]);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100">
                All Bounties
              </h1>
              <p className="text-slate-600 dark:text-slate-400 mt-1">
                Browse and manage bounties across the platform
              </p>
            </div>
            <Button
              asChild
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
            >
              <Link href="/dashboard">
                <Plus className="w-4 h-4 mr-2" />
                Create Bounty
              </Link>
            </Button>
          </div>

          {/* Filters */}
          <div className="bg-white dark:bg-slate-800 rounded-lg p-6 mb-8 shadow-sm border border-slate-200 dark:border-slate-700">
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

                {currentUser?.role === "ADMIN" && (
                  <Select
                    value={approvalFilter}
                    onValueChange={(value) =>
                      setApprovalFilter(value as "all" | "approved" | "pending")
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
                )}
              </div>
            </div>
          </div>

          {/* Bounties Grid */}
          {filteredBounties.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredBounties.map((bounty) => (
                <BountyCard key={bounty.id} bounty={bounty} />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-slate-400 dark:text-slate-600 mb-4">
                <Search className="w-12 h-12 mx-auto" />
              </div>
              <h3 className="text-lg font-medium text-slate-900 dark:text-slate-100 mb-2">
                No bounties found
              </h3>
              <p className="text-slate-600 dark:text-slate-400">
                Try adjusting your search or filter criteria.
              </p>
            </div>
          )}
        </div>
      </div>
    </ProtectedRoute>
  );
}
