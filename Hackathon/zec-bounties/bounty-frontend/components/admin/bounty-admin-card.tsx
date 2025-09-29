"use client";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import type { Bounty, BountyStatus, WorkSubmission } from "@/lib/types";
import { useBounty } from "@/lib/bounty-context";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
  Shield,
  CreditCard,
  Edit,
  Users,
  Eye,
  Settings,
  MessageSquare,
  Upload,
  ExternalLink,
  FileText,
} from "lucide-react";
import { format } from "date-fns";
import { formatStatus } from "@/lib/utils";
import { PaymentAuthorizationModal } from "./payment-authorization-modal";
import { useState, useEffect } from "react";
import { BatchPaymentDashboard } from "./batch-payment-dashboard";

interface UnifiedAdminBountyCardProps {
  bounty: Bounty;
  variant?: "compact" | "detailed";
}

const statusColors = {
  TO_DO: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  IN_REVIEW:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  DONE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function BountyAdminCard({
  bounty,
  variant = "compact",
}: UnifiedAdminBountyCardProps) {
  const {
    updateBountyStatus,
    approveBounty,
    authorizePayment,
    editBounty,
    users,
    getAllApplicationsForBounty,
    acceptApplication,
    rejectApplication,
    fetchBountyApplications,
    fetchWorkSubmissions,
    reviewWorkSubmission,
  } = useBounty();

  const [isUpdating, setIsUpdating] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);
  const [isManagingApplications, setIsManagingApplications] = useState(false);
  const [isManagingSubmissions, setIsManagingSubmissions] = useState(false);
  const [workSubmissions, setWorkSubmissions] = useState<WorkSubmission[]>([]);
  const [submissionsLoading, setSubmissionsLoading] = useState(false);

  const [editForm, setEditForm] = useState({
    title: bounty.title,
    description: bounty.description,
    bountyAmount: bounty.bountyAmount,
    timeToComplete: format(bounty.timeToComplete, "yyyy-MM-dd"),
    assignee: bounty.assignee || "none",
  });

  const isOverdue =
    new Date() > bounty.timeToComplete &&
    bounty.status !== "DONE" &&
    bounty.status !== "CANCELLED";

  const applications = getAllApplicationsForBounty(bounty.id);

  // Fetch applications when details dialog opens
  useEffect(() => {
    if (isDetailsDialogOpen || isManagingApplications) {
      fetchBountyApplications(bounty.id);
    }
  }, [
    isDetailsDialogOpen,
    isManagingApplications,
    bounty.id,
    fetchBountyApplications,
  ]);

  // Fetch work submissions when managing submissions
  useEffect(() => {
    if (isManagingSubmissions || isDetailsDialogOpen) {
      loadWorkSubmissions();
    }
  }, [isManagingSubmissions, isDetailsDialogOpen, bounty.id]);

  const loadWorkSubmissions = async () => {
    setSubmissionsLoading(true);
    try {
      const submissions = await fetchWorkSubmissions(bounty.id);
      setWorkSubmissions(submissions);
    } catch (error) {
      console.error("Failed to load work submissions:", error);
      setWorkSubmissions([]);
    } finally {
      setSubmissionsLoading(false);
    }
  };

  const handleStatusChange = async (newStatus: BountyStatus) => {
    setIsUpdating(true);
    try {
      updateBountyStatus(bounty.id, newStatus);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleApprovalChange = async (approved: boolean) => {
    setIsUpdating(true);
    try {
      approveBounty(bounty.id, approved);
    } finally {
      setIsUpdating(false);
    }
  };

  const handlePaymentAuthorization = async () => {
    setIsUpdating(true);
    try {
      authorizePayment(bounty.id);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleEditBounty = () => {
    editBounty(bounty.id, {
      title: editForm.title,
      description: editForm.description,
      bountyAmount: editForm.bountyAmount,
      timeToComplete: new Date(editForm.timeToComplete),
      assignee: editForm.assignee === "none" ? undefined : editForm.assignee,
    });
    setIsEditDialogOpen(false);
  };

  const handleApplicationAction = async (
    applicationId: string,
    action: "accept" | "reject"
  ) => {
    setIsUpdating(true);
    try {
      if (action === "accept") {
        await acceptApplication(applicationId);
      } else {
        await rejectApplication(applicationId);
      }
    } finally {
      setIsUpdating(false);
    }
  };

  const handleSubmissionReview = async (
    submissionId: string,
    action: "approved" | "rejected" | "needs_revision",
    reviewNotes?: string
  ) => {
    setIsUpdating(true);
    try {
      await reviewWorkSubmission(submissionId, {
        status: action,
        reviewNotes: reviewNotes,
      });
      // Reload submissions to get updated data
      await loadWorkSubmissions();
    } catch (error) {
      console.error("Failed to review submission:", error);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons or other interactive elements
    if ((e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return;
    }
    setIsDetailsDialogOpen(true);
  };

  // Count pending submissions
  const pendingSubmissions = workSubmissions.filter(
    (submission) => submission.status === "pending"
  ).length;

  const hasWorkSubmissions = workSubmissions.length > 0;

  const CompactCard = () => (
    <Card
      className="hover:shadow-lg transition-all duration-200 border-slate-200 dark:border-slate-700 cursor-pointer hover:border-blue-300 dark:hover:border-blue-600"
      onClick={handleCardClick}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {bounty.title}
            </CardTitle>
            <div className="flex items-center gap-1 flex-wrap">
              <Badge className={statusColors[bounty.status]}>
                {formatStatus(bounty.status)}
              </Badge>
              {bounty.isApproved ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
              {bounty.paymentAuthorized && (
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800"
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  Payment Auth
                </Badge>
              )}
              {applications && applications.length > 0 && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {applications.length} Applied
                </Badge>
              )}
              {hasWorkSubmissions && (
                <Badge
                  variant="outline"
                  className="text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  {pendingSubmissions > 0
                    ? `${pendingSubmissions} Pending`
                    : "Submitted"}
                </Badge>
              )}
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-lg font-bold text-slate-900 dark:text-slate-100">
              <DollarSign className="w-4 h-4 mr-1" />
              {bounty.bountyAmount} ZEC
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {bounty.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>By: {bounty.createdByUser?.name || "Unknown"}</span>
          </div>
          {bounty.assigneeUser && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2 text-green-600" />
              <span className="text-green-600 dark:text-green-400">
                Assigned: {bounty.assigneeUser.name}
              </span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Created: {format(bounty.dateCreated, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Due: {format(bounty.timeToComplete, "MMM dd, yyyy")}</span>
          </div>
        </div>

        <div className="flex items-center justify-center py-2">
          <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
            <Eye className="w-4 h-4 mr-1" />
            Click to manage
          </div>
        </div>
      </CardContent>
    </Card>
  );

  const DetailedCard = () => (
    <Card className="border-slate-200 dark:border-slate-700">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <CardTitle className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
              {bounty.title}
            </CardTitle>
            <div className="flex items-center gap-2 flex-wrap">
              <Badge className={statusColors[bounty.status]}>
                {formatStatus(bounty.status)}
              </Badge>
              {bounty.isApproved ? (
                <Badge
                  variant="outline"
                  className="text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approved
                </Badge>
              ) : (
                <Badge
                  variant="outline"
                  className="text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Pending
                </Badge>
              )}
              {bounty.paymentAuthorized && (
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800"
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  Payment Auth
                </Badge>
              )}
              {applications && applications.length > 0 && (
                <Badge
                  variant="outline"
                  className="text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800"
                >
                  <Users className="w-3 h-3 mr-1" />
                  {applications.length} Applied
                </Badge>
              )}
              {hasWorkSubmissions && (
                <Badge
                  variant="outline"
                  className="text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                >
                  <Upload className="w-3 h-3 mr-1" />
                  {pendingSubmissions > 0
                    ? `${pendingSubmissions} Pending`
                    : "Submitted"}
                </Badge>
              )}
              {isOverdue && (
                <Badge variant="destructive" className="text-xs">
                  Overdue
                </Badge>
              )}
            </div>
          </div>
          <div className="text-right">
            <div className="flex items-center text-lg font-bold text-slate-900 dark:text-slate-100">
              <DollarSign className="w-4 h-4 mr-1" />
              {bounty.bountyAmount} ZEC
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <p className="text-slate-600 dark:text-slate-400 text-sm mb-4 line-clamp-2">
          {bounty.description}
        </p>

        <div className="grid grid-cols-2 gap-4 text-sm text-slate-600 dark:text-slate-400 mb-4">
          <div className="flex items-center">
            <User className="w-4 h-4 mr-2" />
            <span>By: {bounty.createdByUser?.name || "Unknown"}</span>
          </div>
          {bounty.assigneeUser && (
            <div className="flex items-center">
              <User className="w-4 h-4 mr-2" />
              <span>Assigned: {bounty.assigneeUser.name}</span>
            </div>
          )}
          <div className="flex items-center">
            <Calendar className="w-4 h-4 mr-2" />
            <span>Created: {format(bounty.dateCreated, "MMM dd, yyyy")}</span>
          </div>
          <div className="flex items-center">
            <Clock className="w-4 h-4 mr-2" />
            <span>Due: {format(bounty.timeToComplete, "MMM dd, yyyy")}</span>
          </div>
        </div>

        {/* Work Submissions Preview */}
        {hasWorkSubmissions && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Work Submissions ({workSubmissions.length})
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsManagingSubmissions(true)}
              >
                <Upload className="w-3 h-3 mr-1" />
                Review
              </Button>
            </div>
            <div className="space-y-2">
              {workSubmissions.slice(0, 2).map((submission) => (
                <div
                  key={submission.id}
                  className="text-xs text-slate-600 dark:text-slate-400 p-2 bg-white dark:bg-slate-700 rounded"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {submission.submitterUser?.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        submission.status === "approved"
                          ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                          : submission.status === "rejected"
                          ? "text-red-600 border-red-200 dark:text-red-400 dark:border-red-800"
                          : submission.status === "needs_revision"
                          ? "text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800"
                          : "text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                      }
                    >
                      {submission.status}
                    </Badge>
                  </div>
                  <p className="mt-1 text-slate-500 dark:text-slate-500 line-clamp-1">
                    {submission.description}
                  </p>
                </div>
              ))}
              {workSubmissions.length > 2 && (
                <div className="text-xs text-slate-500 dark:text-slate-500 text-center">
                  +{workSubmissions.length - 2} more submissions
                </div>
              )}
            </div>
          </div>
        )}

        {applications && applications.length > 0 && (
          <div className="mb-4 p-3 bg-slate-50 dark:bg-slate-800 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-sm font-medium text-slate-900 dark:text-slate-100">
                Applications ({applications.length})
              </h4>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setIsManagingApplications(true)}
              >
                <MessageSquare className="w-3 h-3 mr-1" />
                Manage
              </Button>
            </div>
            <div className="space-y-2">
              {applications.slice(0, 3).map((app) => (
                <div
                  key={app.id}
                  className="text-xs text-slate-600 dark:text-slate-400 p-2 bg-white dark:bg-slate-700 rounded"
                >
                  <div className="flex justify-between items-center">
                    <span className="font-medium">
                      {app.applicantUser?.name}
                    </span>
                    <Badge
                      variant="outline"
                      className={
                        app.status === "accepted"
                          ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                          : app.status === "rejected"
                          ? "text-red-600 border-red-200 dark:text-red-400 dark:border-red-800"
                          : "text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                      }
                    >
                      {app.status || "pending"}
                    </Badge>
                  </div>
                  <p className="mt-1 text-slate-500 dark:text-slate-500 line-clamp-1">
                    {app.message}
                  </p>
                </div>
              ))}
              {applications.length > 3 && (
                <div className="text-xs text-slate-500 dark:text-slate-500 text-center">
                  +{applications.length - 3} more applications
                </div>
              )}
            </div>
          </div>
        )}

        {/* Admin Controls */}
        <div className="border-t border-slate-200 dark:border-slate-700 pt-4 space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
              <Shield className="w-4 h-4" />
              <span className="font-medium">Admin Controls</span>
            </div>
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm">
                  <Edit className="w-3 h-3 mr-1" />
                  Edit
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-md">
                <DialogHeader>
                  <DialogTitle>Edit Bounty</DialogTitle>
                </DialogHeader>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="edit-title">Title</Label>
                    <Input
                      id="edit-title"
                      value={editForm.title}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          title: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-description">Description</Label>
                    <Textarea
                      id="edit-description"
                      value={editForm.description}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          description: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-amount">Bounty Amount (ZEC)</Label>
                    <Input
                      id="edit-amount"
                      type="number"
                      step="0.01"
                      value={editForm.bountyAmount}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          bountyAmount: Number.parseFloat(e.target.value),
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-due">Due Date</Label>
                    <Input
                      id="edit-due"
                      type="date"
                      value={editForm.timeToComplete}
                      onChange={(e) =>
                        setEditForm((prev) => ({
                          ...prev,
                          timeToComplete: e.target.value,
                        }))
                      }
                    />
                  </div>
                  <div>
                    <Label htmlFor="edit-assignee">Assignee</Label>
                    <Select
                      value={editForm.assignee}
                      onValueChange={(value) =>
                        setEditForm((prev) => ({ ...prev, assignee: value }))
                      }
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="none">No Assignee</SelectItem>
                        {users
                          .filter((u) => u.role === "CLIENT")
                          .map((user) => (
                            <SelectItem key={user.id} value={user.id}>
                              {user.name}
                            </SelectItem>
                          ))}
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => setIsEditDialogOpen(false)}
                    >
                      Cancel
                    </Button>
                    <Button onClick={handleEditBounty}>Save Changes</Button>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Status
              </label>
              <Select
                value={formatStatus(bounty.status)}
                onValueChange={handleStatusChange}
                disabled={isUpdating}
              >
                <SelectTrigger className="h-8 text-sm">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="TO_DO">To Do</SelectItem>
                  <SelectItem value="IN_PROGRESS">In Progress</SelectItem>
                  <SelectItem value="IN_REVIEW">In Review</SelectItem>
                  <SelectItem value="DONE">Done</SelectItem>
                  <SelectItem value="CANCELLED">Cancelled</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Approval
              </label>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  variant={bounty.isApproved ? "default" : "outline"}
                  onClick={() => handleApprovalChange(true)}
                  disabled={isUpdating || bounty.isApproved}
                  className="flex-1 h-8 text-xs"
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  Approve
                </Button>
                <Button
                  size="sm"
                  variant={!bounty.isApproved ? "destructive" : "outline"}
                  onClick={() => handleApprovalChange(false)}
                  disabled={isUpdating || !bounty.isApproved}
                  className="flex-1 h-8 text-xs"
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  Reject
                </Button>
              </div>
            </div>
          </div>

          {/* {bounty.status === "DONE" && bounty.isApproved && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Payment Authorization
              </label>
              {bounty.paymentAuthorized ? (
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                    Payment Authorized ({bounty.bountyAmount} ZEC)
                  </span>
                </div>
              ) : (
                <Button
                  size="sm"
                  onClick={handlePaymentAuthorization}
                  disabled={isUpdating}
                  className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                >
                  <CreditCard className="w-3 h-3 mr-1" />
                  Authorize Payment ({bounty.bountyAmount} ZEC)
                </Button>
              )}
            </div>
          )} */}
          {/* {bounty.status === "DONE" && bounty.isApproved && !bounty.isPaid && (
            <div className="space-y-2 pt-2 border-t border-slate-200 dark:border-slate-700">
              <label className="text-xs font-medium text-slate-600 dark:text-slate-400">
                Payment Authorization
              </label>
              {bounty.paymentAuthorized ? (
                <div className="flex items-center gap-2 p-2 bg-green-50 dark:bg-green-900/20 rounded-lg">
                  <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                  <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                    {bounty.paymentScheduled?.type === "instant"
                      ? `Payment Authorized (${bounty.bountyAmount} ZEC)`
                      : `Scheduled for Batch Payment (${bounty.bountyAmount} ZEC)`}
                  </span>
                </div>
              ) : (
                <PaymentAuthorizationModal bounty={bounty}>
                  <Button
                    size="sm"
                    disabled={isUpdating || !bounty.assigneeUser?.z_address}
                    className="w-full h-8 text-xs bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                  >
                    <CreditCard className="w-3 h-3 mr-1" />
                    Authorize Payment ({bounty.bountyAmount} ZEC)
                  </Button>
                </PaymentAuthorizationModal>
              )}
            </div>
          )} */}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <>
      {variant === "compact" ? <CompactCard /> : <DetailedCard />}

      {/* Work Submissions Management Dialog */}
      <Dialog
        open={isManagingSubmissions}
        onOpenChange={setIsManagingSubmissions}
      >
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Upload className="w-5 h-5" />
              Review Work Submissions for: {bounty.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {submissionsLoading ? (
              <div className="flex justify-center py-8">
                <Clock className="w-6 h-6 animate-spin" />
              </div>
            ) : workSubmissions && workSubmissions.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Total Submissions: {workSubmissions.length}
                  </div>
                  <Badge variant="outline">
                    Bounty: {bounty.bountyAmount} ZEC
                  </Badge>
                </div>

                <div className="space-y-6">
                  {workSubmissions.map((submission) => (
                    <div
                      key={submission.id}
                      className="p-6 border border-slate-200 dark:border-slate-700 rounded-lg space-y-4"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="font-semibold text-slate-900 dark:text-slate-100 text-lg">
                              {submission.submitterUser?.name || "Unknown User"}
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                submission.status === "approved"
                                  ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                                  : submission.status === "rejected"
                                  ? "text-red-600 border-red-200 dark:text-red-400 dark:border-red-800"
                                  : submission.status === "needs_revision"
                                  ? "text-orange-600 border-orange-200 dark:text-orange-400 dark:border-orange-800"
                                  : "text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                              }
                            >
                              {submission.status}
                            </Badge>
                          </div>

                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-4">
                            Submitted on:{" "}
                            {format(
                              new Date(submission.submittedAt),
                              "PPP 'at' p"
                            )}
                          </div>

                          <div className="space-y-4">
                            <div>
                              <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">
                                Work Description:
                              </label>
                              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                                <p className="text-slate-900 dark:text-slate-100 whitespace-pre-wrap">
                                  {submission.description}
                                </p>
                              </div>
                            </div>

                            {submission.deliverableUrl && (
                              <div>
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">
                                  Deliverable Link:
                                </label>
                                <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg border">
                                  <a
                                    href={submission.deliverableUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-200 flex items-center gap-2 break-all"
                                  >
                                    <ExternalLink className="w-4 h-4 flex-shrink-0" />
                                    {submission.deliverableUrl}
                                  </a>
                                </div>
                              </div>
                            )}

                            {submission.reviewNotes && (
                              <div>
                                <label className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2 block">
                                  Review Notes:
                                </label>
                                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                                  <p className="text-slate-900 dark:text-slate-100">
                                    {submission.reviewNotes}
                                  </p>
                                  <div className="text-xs text-slate-500 dark:text-slate-400 mt-2">
                                    Reviewed by:{" "}
                                    {submission.reviewerUser?.name || "Admin"}{" "}
                                    on{" "}
                                    {submission.reviewedAt
                                      ? format(
                                          new Date(submission.reviewedAt),
                                          "PPP 'at' p"
                                        )
                                      : "Unknown"}
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      {submission.status === "pending" && (
                        <div className="border-t border-slate-200 dark:border-slate-700 pt-4">
                          <div className="space-y-4">
                            <div>
                              <Label htmlFor={`review-notes-${submission.id}`}>
                                Review Notes (optional)
                              </Label>
                              <Textarea
                                id={`review-notes-${submission.id}`}
                                placeholder="Add feedback for the submitter..."
                                className="mt-2"
                                rows={3}
                              />
                            </div>

                            <div className="flex gap-3">
                              <Button
                                onClick={() => {
                                  const textarea = document.getElementById(
                                    `review-notes-${submission.id}`
                                  ) as HTMLTextAreaElement;
                                  handleSubmissionReview(
                                    submission.id,
                                    "approved",
                                    textarea?.value
                                  );
                                }}
                                disabled={isUpdating}
                                className="flex-1 bg-green-600 hover:bg-green-700 text-white"
                              >
                                <CheckCircle className="w-4 h-4 mr-2" />
                                Approve & Mark as Done
                              </Button>

                              <Button
                                variant="outline"
                                onClick={() => {
                                  const textarea = document.getElementById(
                                    `review-notes-${submission.id}`
                                  ) as HTMLTextAreaElement;
                                  handleSubmissionReview(
                                    submission.id,
                                    "needs_revision",
                                    textarea?.value
                                  );
                                }}
                                disabled={isUpdating}
                                className="flex-1 border-orange-500 text-orange-600 hover:bg-orange-50"
                              >
                                <FileText className="w-4 h-4 mr-2" />
                                Request Revision
                              </Button>

                              <Button
                                variant="destructive"
                                onClick={() => {
                                  const textarea = document.getElementById(
                                    `review-notes-${submission.id}`
                                  ) as HTMLTextAreaElement;
                                  handleSubmissionReview(
                                    submission.id,
                                    "rejected",
                                    textarea?.value
                                  );
                                }}
                                disabled={isUpdating}
                                className="flex-1"
                              >
                                <XCircle className="w-4 h-4 mr-2" />
                                Reject
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}

                      {submission.status === "approved" && (
                        <div className="border-t border-green-200 dark:border-green-800 pt-4">
                          <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                            <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                            <div>
                              <div className="font-semibold text-green-800 dark:text-green-200">
                                Submission Approved
                              </div>
                              <div className="text-sm text-green-600 dark:text-green-400">
                                Work has been approved and bounty status changed
                                to "Done"
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {submission.status === "rejected" && (
                        <div className="border-t border-red-200 dark:border-red-800 pt-4">
                          <div className="flex items-center gap-3 p-4 bg-red-50 dark:bg-red-900/20 rounded-lg">
                            <XCircle className="w-6 h-6 text-red-600 dark:text-red-400" />
                            <div>
                              <div className="font-semibold text-red-800 dark:text-red-200">
                                Submission Rejected
                              </div>
                              <div className="text-sm text-red-600 dark:text-red-400">
                                Bounty status changed back to "In Progress" for
                                resubmission
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      {submission.status === "needs_revision" && (
                        <div className="border-t border-orange-200 dark:border-orange-800 pt-4">
                          <div className="flex items-center gap-3 p-4 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                            <FileText className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                            <div>
                              <div className="font-semibold text-orange-800 dark:text-orange-200">
                                Revision Requested
                              </div>
                              <div className="text-sm text-orange-600 dark:text-orange-400">
                                Bounty status changed back to "In Progress" for
                                revision
                              </div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Upload className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No Work Submissions Yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  This bounty hasn't received any work submissions yet.
                </p>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsManagingSubmissions(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Detailed Management Dialog - Update to include submissions */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Settings className="w-5 h-5" />
              Admin Management: {bounty.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status Overview */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {bounty.bountyAmount}
                </div>
                <div className="text-sm text-slate-500">ZEC Amount</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {applications?.length || 0}
                </div>
                <div className="text-sm text-slate-500">Applications</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div className="text-2xl font-bold text-slate-900 dark:text-slate-100">
                  {workSubmissions.length}
                </div>
                <div className="text-sm text-slate-500">Submissions</div>
              </div>
              <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                <div
                  className={`text-2xl font-bold ${
                    bounty.isApproved ? "text-green-600" : "text-orange-600"
                  }`}
                >
                  {bounty.isApproved ? "Yes" : "No"}
                </div>
                <div className="text-sm text-slate-500">Approved</div>
              </div>
            </div>

            {/* Bounty Details */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Bounty Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Created By
                  </label>
                  <div className="text-slate-900 dark:text-slate-100">
                    {bounty.createdByUser?.name || "Unknown"}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Created On
                  </label>
                  <div className="text-slate-900 dark:text-slate-100">
                    {format(bounty.dateCreated, "PPP")}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Due Date
                  </label>
                  <div
                    className={`text-slate-900 dark:text-slate-100 ${
                      isOverdue ? "text-red-600" : ""
                    }`}
                  >
                    {format(bounty.timeToComplete, "PPP")}
                    {isOverdue && (
                      <span className="ml-2 text-red-600">(Overdue)</span>
                    )}
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                    Assigned To
                  </label>
                  <div className="text-slate-900 dark:text-slate-100">
                    {bounty.assigneeUser?.name || "Unassigned"}
                  </div>
                </div>
              </div>
              <div>
                <label className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Description
                </label>
                <p className="text-slate-900 dark:text-slate-100 mt-1 p-3 bg-slate-50 dark:bg-slate-800 rounded">
                  {bounty.description}
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Quick Actions</h3>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                <Dialog
                  open={isEditDialogOpen}
                  onOpenChange={setIsEditDialogOpen}
                >
                  <DialogTrigger asChild>
                    <Button variant="outline" className="h-12">
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Bounty
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-md">
                    <DialogHeader>
                      <DialogTitle>Edit Bounty</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="edit-title">Title</Label>
                        <Input
                          id="edit-title"
                          value={editForm.title}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              title: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-description">Description</Label>
                        <Textarea
                          id="edit-description"
                          value={editForm.description}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              description: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-amount">Bounty Amount (ZEC)</Label>
                        <Input
                          id="edit-amount"
                          type="number"
                          step="0.01"
                          value={editForm.bountyAmount}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              bountyAmount: Number.parseFloat(e.target.value),
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-due">Due Date</Label>
                        <Input
                          id="edit-due"
                          type="date"
                          value={editForm.timeToComplete}
                          onChange={(e) =>
                            setEditForm((prev) => ({
                              ...prev,
                              timeToComplete: e.target.value,
                            }))
                          }
                        />
                      </div>
                      <div>
                        <Label htmlFor="edit-assignee">Assignee</Label>
                        <Select
                          value={editForm.assignee}
                          onValueChange={(value) =>
                            setEditForm((prev) => ({
                              ...prev,
                              assignee: value,
                            }))
                          }
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="none">No Assignee</SelectItem>
                            {users
                              .filter((u) => u.role === "CLIENT")
                              .map((user) => (
                                <SelectItem key={user.id} value={user.id}>
                                  {user.name}
                                </SelectItem>
                              ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div className="flex justify-end gap-2">
                        <Button
                          variant="outline"
                          onClick={() => setIsEditDialogOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button onClick={handleEditBounty}>Save Changes</Button>
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>

                <Button
                  variant="outline"
                  className="h-12"
                  onClick={() => setIsManagingApplications(true)}
                  disabled={!applications || applications.length === 0}
                >
                  <Users className="w-4 h-4 mr-2" />
                  Applications ({applications?.length || 0})
                </Button>

                <Button
                  variant="outline"
                  className="h-12"
                  onClick={() => setIsManagingSubmissions(true)}
                  disabled={!hasWorkSubmissions}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Submissions ({workSubmissions.length})
                  {pendingSubmissions > 0 && (
                    <Badge className="ml-1 bg-yellow-500 text-white text-xs px-1">
                      {pendingSubmissions}
                    </Badge>
                  )}
                </Button>

                <Button
                  variant={bounty.isApproved ? "default" : "outline"}
                  className="h-12"
                  onClick={() => handleApprovalChange(!bounty.isApproved)}
                  disabled={isUpdating}
                >
                  {bounty.isApproved ? (
                    <>
                      <XCircle className="w-4 h-4 mr-2" />
                      Reject
                    </>
                  ) : (
                    <>
                      <CheckCircle className="w-4 h-4 mr-2" />
                      Approve
                    </>
                  )}
                </Button>

                {bounty.status === "DONE" &&
                  bounty.isApproved &&
                  !bounty.paymentAuthorized && (
                    <Button
                      className="h-12 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      onClick={handlePaymentAuthorization}
                      disabled={isUpdating}
                    >
                      <CreditCard className="w-4 h-4 mr-2" />
                      Authorize Payment
                    </Button>
                  )}
              </div>
            </div>

            {/* Status Management */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Status Management</h3>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {["TO_DO", "IN_PROGRESS", "IN_REVIEW", "DONE", "CANCELLED"].map(
                  (status) => (
                    <Button
                      key={formatStatus(status)}
                      variant={bounty.status === status ? "default" : "outline"}
                      size="sm"
                      onClick={() => handleStatusChange(status as BountyStatus)}
                      disabled={isUpdating}
                      className="h-10"
                    >
                      {formatStatus(status)}
                    </Button>
                  )
                )}
              </div>
            </div>

            {/* Payment Status */}
            {bounty.status === "DONE" && bounty.isApproved && (
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Payment Status</h3>
                {bounty.paymentAuthorized ? (
                  <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                    <CheckCircle className="w-6 h-6 text-green-600 dark:text-green-400" />
                    <div>
                      <div className="font-semibold text-green-800 dark:text-green-200">
                        Payment Authorized
                      </div>
                      <div className="text-sm text-green-600 dark:text-green-400">
                        {bounty.bountyAmount} ZEC payment has been authorized
                        for release
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 p-4 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                    <Clock className="w-6 h-6 text-yellow-600 dark:text-yellow-400" />
                    <div className="flex-1">
                      <div className="font-semibold text-yellow-800 dark:text-yellow-200">
                        Payment Pending Authorization
                      </div>
                      <div className="text-sm text-yellow-600 dark:text-yellow-400">
                        {bounty.bountyAmount} ZEC ready for payment
                        authorization
                      </div>
                    </div>
                    <PaymentAuthorizationModal bounty={bounty}>
                      <Button
                        // onClick={handlePaymentAuthorization}
                        disabled={isUpdating}
                        className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                      >
                        <CreditCard className="w-4 h-4 mr-2" />
                        Authorize Payment
                      </Button>
                    </PaymentAuthorizationModal>
                  </div>
                )}
              </div>
            )}

            {/* Close Button */}
            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsDetailsDialogOpen(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Applications Management Dialog - keeping existing functionality */}
      <Dialog
        open={isManagingApplications}
        onOpenChange={setIsManagingApplications}
      >
        <DialogContent className="sm:max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold flex items-center gap-2">
              <Users className="w-5 h-5" />
              Manage Applications for: {bounty.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {applications && applications.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="text-sm text-slate-600 dark:text-slate-400">
                    Total Applications: {applications.length}
                  </div>
                  <Badge variant="outline">
                    Bounty: {bounty.bountyAmount} ZEC
                  </Badge>
                </div>

                <div className="space-y-4">
                  {applications.map((application) => (
                    <div
                      key={application.id}
                      className="p-4 border border-slate-200 dark:border-slate-700 rounded-lg space-y-3"
                    >
                      <div className="flex items-start justify-between">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <div className="font-semibold text-slate-900 dark:text-slate-100">
                              {application.applicantUser?.name ||
                                "Unknown User"}
                            </div>
                            <Badge
                              variant="outline"
                              className={
                                application.status === "accepted"
                                  ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                                  : application.status === "rejected"
                                  ? "text-red-600 border-red-200 dark:text-red-400 dark:border-red-800"
                                  : "text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                              }
                            >
                              {application.status || "pending"}
                            </Badge>
                          </div>
                          <div className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                            Applied on:{" "}
                            {format(
                              new Date(application.appliedAt),
                              "PPP 'at' p"
                            )}
                          </div>
                          <div className="p-3 bg-slate-50 dark:bg-slate-800 rounded border">
                            <div className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                              Message:
                            </div>
                            <p className="text-slate-900 dark:text-slate-100">
                              {application.message}
                            </p>
                          </div>
                        </div>
                      </div>

                      {application.status === "pending" && (
                        <div className="flex gap-2 pt-3 border-t border-slate-200 dark:border-slate-700">
                          <Button
                            size="sm"
                            variant="default"
                            onClick={() =>
                              handleApplicationAction(application.id, "accept")
                            }
                            disabled={isUpdating}
                            className="flex-1"
                          >
                            <CheckCircle className="w-3 h-3 mr-1" />
                            Accept Application
                          </Button>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() =>
                              handleApplicationAction(application.id, "reject")
                            }
                            disabled={isUpdating}
                            className="flex-1"
                          >
                            <XCircle className="w-3 h-3 mr-1" />
                            Reject Application
                          </Button>
                        </div>
                      )}

                      {application.status === "accepted" && (
                        <div className="flex items-center gap-2 pt-3 border-t border-green-200 dark:border-green-800">
                          <CheckCircle className="w-4 h-4 text-green-600 dark:text-green-400" />
                          <span className="text-sm text-green-700 dark:text-green-300 font-medium">
                            Application Accepted - Applicant has been assigned
                            to this bounty
                          </span>
                        </div>
                      )}

                      {application.status === "rejected" && (
                        <div className="flex items-center gap-2 pt-3 border-t border-red-200 dark:border-red-800">
                          <XCircle className="w-4 h-4 text-red-600 dark:text-red-400" />
                          <span className="text-sm text-red-700 dark:text-red-300 font-medium">
                            Application Rejected
                          </span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Users className="w-12 h-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100 mb-2">
                  No Applications Yet
                </h3>
                <p className="text-slate-600 dark:text-slate-400">
                  This bounty hasn't received any applications yet.
                </p>
              </div>
            )}

            <div className="flex justify-end pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setIsManagingApplications(false)}
              >
                Close
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
