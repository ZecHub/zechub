"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useBounty } from "@/lib/bounty-context";
import {
  TrendingUp,
  Clock,
  CheckCircle,
  DollarSign,
  Users,
  AlertTriangle,
} from "lucide-react";

export function AdminStats() {
  const { bounties, users } = useBounty();

  const stats = {
    totalBounties: bounties.length,
    pendingApproval: bounties.filter((b) => !b.isApproved).length,
    inProgress: bounties.filter((b) => b.status === "IN_PROGRESS").length,
    completed: bounties.filter((b) => b.status === "DONE").length,
    totalUsers: users.length,
    totalValue: bounties.reduce((sum, b) => sum + b.bountyAmount, 0),
    overdue: bounties.filter(
      (b) =>
        new Date() > b.timeToComplete &&
        b.status !== "DONE" &&
        b.status !== "CANCELLED"
    ).length,
    paymentsPending: bounties.filter(
      (b) => b.status === "DONE" && !b.paymentAuthorized
    ).length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Bounties
          </CardTitle>
          <TrendingUp className="h-4 w-4 text-slate-600 dark:text-slate-400" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
            {stats.totalBounties}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Across all users
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Pending Approval
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-orange-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-orange-600">
            {stats.pendingApproval}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Require admin review
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            In Progress
          </CardTitle>
          <Clock className="h-4 w-4 text-blue-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-blue-600">
            {stats.inProgress}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Active bounties
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Completed
          </CardTitle>
          <CheckCircle className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.completed}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Successfully finished
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Users
          </CardTitle>
          <Users className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {stats.totalUsers}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Platform members
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Total Value
          </CardTitle>
          <DollarSign className="h-4 w-4 text-green-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-green-600">
            {stats.totalValue.toFixed(2)} ZEC
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            All bounties combined
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Overdue
          </CardTitle>
          <AlertTriangle className="h-4 w-4 text-red-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-red-600">{stats.overdue}</div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Past deadline
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium text-slate-600 dark:text-slate-400">
            Payments Due
          </CardTitle>
          <DollarSign className="h-4 w-4 text-purple-600" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold text-purple-600">
            {stats.paymentsPending}
          </div>
          <p className="text-xs text-slate-600 dark:text-slate-400">
            Completed bounties
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
