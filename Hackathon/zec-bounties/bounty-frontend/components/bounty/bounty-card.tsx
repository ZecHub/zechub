"use client";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Bounty } from "@/lib/types";
import {
  Calendar,
  Clock,
  DollarSign,
  User,
  CheckCircle,
  XCircle,
  Users,
  Eye,
  Upload,
  Send,
} from "lucide-react";
import { format } from "date-fns";
import { useBounty } from "@/lib/bounty-context";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { formatStatus } from "@/lib/utils";

interface BountyCardProps {
  bounty: Bounty;
  onViewDetails?: (bounty: Bounty) => void;
  showActions?: boolean;
}

const statusColors = {
  TO_DO: "bg-slate-100 text-slate-800 dark:bg-slate-800 dark:text-slate-200",
  IN_PROGRESS: "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200",
  IN_REVIEW:
    "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200",
  DONE: "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200",
  CANCELLED: "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200",
};

export function BountyCard({
  bounty,
  onViewDetails,
  showActions = true,
}: BountyCardProps) {
  const {
    currentUser,
    applyToBounty,
    getUserApplicationForBounty,
    getAllApplicationForBounty,
    submitWork,
  } = useBounty();

  const [applicationMessage, setApplicationMessage] = useState("");
  const [isDetailsDialogOpen, setIsDetailsDialogOpen] = useState(false);

  // Work submission states
  const [isSubmissionDialogOpen, setIsSubmissionDialogOpen] = useState(false);
  const [submissionDescription, setSubmissionDescription] = useState("");
  const [deliverableUrl, setDeliverableUrl] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const isOverdue =
    new Date() > bounty.timeToComplete &&
    bounty.status !== "DONE" &&
    bounty.status !== "CANCELLED";

  // Get current user's application for this bounty
  const userApplication = currentUser
    ? getUserApplicationForBounty(bounty.id)
    : null;

  // Get current user's application for this bounty
  const currentUserRole = currentUser ? currentUser.role : null;
  const allApplications = currentUserRole
    ? getAllApplicationForBounty(bounty.id)
    : null;

  // Check if current user is assigned to this bounty
  const isAssignedToCurrentUser =
    currentUser && bounty.assignee === currentUser.id;

  // Check if user can submit work (assigned and bounty is in progress)
  const canSubmitWork =
    isAssignedToCurrentUser &&
    (bounty.status === "TO_DO" || bounty.status === "IN_PROGRESS");

  console.log(currentUser, bounty);

  // Updated logic using the context method
  const canApply =
    currentUser &&
    !bounty.assignee && // Not assigned to anyone
    bounty.createdBy !== currentUser.id && // Not created by current user
    !userApplication; // Haven't applied yet (using context method)

  // User has already applied
  const hasApplied = !!userApplication;

  const handleApply = async () => {
    if (!applicationMessage.trim()) return;

    try {
      await applyToBounty(bounty.id, applicationMessage);
      setApplicationMessage("");
      setIsDetailsDialogOpen(false);
    } catch (error) {
      console.error("Failed to apply:", error);
      // You might want to show an error message to the user here
    }
  };

  const handleSubmitWork = async () => {
    if (!submissionDescription.trim()) return;

    setIsSubmitting(true);
    try {
      await submitWork(bounty.id, {
        description: submissionDescription,
        deliverableUrl: deliverableUrl || undefined,
      });

      // Reset form and close dialogs
      setSubmissionDescription("");
      setDeliverableUrl("");
      setIsSubmissionDialogOpen(false);
      setIsDetailsDialogOpen(false);
    } catch (error) {
      console.error("Failed to submit work:", error);
      // You might want to show an error message to the user here
    } finally {
      setIsSubmitting(false);
    }
  };

  // Handle card click to open details dialog
  const handleCardClick = (e: React.MouseEvent) => {
    // Don't trigger if clicking on buttons or other interactive elements
    if ((e.target as HTMLElement).closest('button, a, [role="button"]')) {
      return;
    }

    setIsDetailsDialogOpen(true);
  };

  return (
    <>
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
                {isOverdue && (
                  <Badge variant="destructive" className="text-xs">
                    Overdue
                  </Badge>
                )}
                {!bounty.isPaid && (
                  <Badge
                    variant="outline"
                    className="text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                  >
                    <DollarSign className="w-3 h-3 mr-1" />
                    Unpaid
                  </Badge>
                )}
                {canApply && (
                  <Badge
                    variant="outline"
                    className="text-blue-600 border-blue-200 dark:text-blue-400 dark:border-blue-800"
                  >
                    Available
                  </Badge>
                )}
                {isAssignedToCurrentUser && (
                  <Badge
                    variant="outline"
                    className="text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800"
                  >
                    Assigned to You
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
            {bounty.assigneeUser ? (
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2 text-green-600" />
                <span className="text-green-600 dark:text-green-400">
                  Assigned: {bounty.assigneeUser.name}
                </span>
              </div>
            ) : canApply ? (
              <div className="flex items-center text-blue-600 dark:text-blue-400">
                <Users className="w-4 h-4 mr-2" />
                <span>Click to view & apply</span>
              </div>
            ) : hasApplied ? (
              <div className="flex items-center text-yellow-600 dark:text-yellow-400">
                <Clock className="w-4 h-4 mr-2" />
                <span>Application {userApplication?.status || "pending"}</span>
              </div>
            ) : (
              <div className="flex items-center">
                <Users className="w-4 h-4 mr-2" />
                <span>Unassigned</span>
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

          {showActions && (
            <div className="flex items-center justify-between py-2">
              {canSubmitWork ? (
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsSubmissionDialogOpen(true);
                  }}
                  className="bg-green-600 hover:bg-green-700 text-white"
                >
                  <Upload className="w-4 h-4 mr-1" />
                  Submit Work
                </Button>
              ) : (
                <div></div>
              )}
              <div className="flex items-center text-sm text-slate-500 dark:text-slate-400">
                <Eye className="w-4 h-4 mr-1" />
                Click to view details
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Work Submission Dialog */}
      <Dialog
        open={isSubmissionDialogOpen}
        onOpenChange={setIsSubmissionDialogOpen}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle>Submit Your Work</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-1">
                {bounty.title}
              </h4>
              <p className="text-sm text-blue-600 dark:text-blue-400">
                Amount: {bounty.bountyAmount} ZEC
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="submission-description">
                Work Description <span className="text-red-500">*</span>
              </Label>
              <Textarea
                id="submission-description"
                placeholder="Describe the work you've completed, what you delivered, and any important notes..."
                value={submissionDescription}
                onChange={(e) => setSubmissionDescription(e.target.value)}
                className="min-h-[120px]"
                rows={5}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="deliverable-url">
                Deliverable URL <span className="text-red-500">*</span>
              </Label>
              <Input
                id="deliverable-url"
                type="url"
                placeholder="https://github.com/username/repo or https://drive.google.com/..."
                value={deliverableUrl}
                onChange={(e) => setDeliverableUrl(e.target.value)}
              />
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Link to your completed work (GitHub repo, Google Drive, deployed
                app, etc.)
              </p>
            </div>

            <div className="flex justify-end gap-2 pt-4">
              <Button
                variant="outline"
                onClick={() => {
                  setIsSubmissionDialogOpen(false);
                  setSubmissionDescription("");
                  setDeliverableUrl("");
                }}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                onClick={handleSubmitWork}
                disabled={
                  !submissionDescription.trim() ||
                  !deliverableUrl.trim() ||
                  isSubmitting
                }
                className="bg-green-600 hover:bg-green-700 text-white"
              >
                {isSubmitting ? (
                  <>
                    <Clock className="w-4 h-4 mr-1 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-1" />
                    Submit Work
                  </>
                )}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Details Dialog - Updated with submission section */}
      <Dialog open={isDetailsDialogOpen} onOpenChange={setIsDetailsDialogOpen}>
        <DialogContent className="sm:max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-xl font-bold">
              {bounty.title}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Status Badges */}
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
              {isOverdue && <Badge variant="destructive">Overdue</Badge>}
              {!bounty.isPaid && (
                <Badge
                  variant="outline"
                  className="text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                >
                  <DollarSign className="w-3 h-3 mr-1" />
                  Unpaid
                </Badge>
              )}
              {isAssignedToCurrentUser && (
                <Badge
                  variant="outline"
                  className="text-purple-600 border-purple-200 dark:text-purple-400 dark:border-purple-800"
                >
                  Assigned to You
                </Badge>
              )}
            </div>

            {/* Bounty Amount */}
            <div className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
              <span className="text-lg font-semibold">Bounty Amount:</span>
              <div className="flex items-center text-2xl font-bold text-green-600 dark:text-green-400">
                <DollarSign className="w-6 h-6 mr-1" />
                {bounty.bountyAmount} ZEC
              </div>
            </div>

            {/* Description */}
            <div>
              <h3 className="text-lg font-semibold mb-2">Description</h3>
              <p className="text-slate-600 dark:text-slate-400 whitespace-pre-wrap">
                {bounty.description}
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div className="flex items-center">
                <User className="w-4 h-4 mr-2" />
                <span>
                  Created by: {bounty.createdByUser?.name || "Unknown"}
                </span>
              </div>

              {bounty.assigneeUser ? (
                <div className="flex items-center">
                  <User className="w-4 h-4 mr-2 text-green-600" />
                  <span className="text-green-600 dark:text-green-400">
                    Assigned to: {bounty.assigneeUser.name}
                  </span>
                </div>
              ) : (
                <div className="flex items-center">
                  <Users className="w-4 h-4 mr-2" />
                  <span>Status: Unassigned</span>
                </div>
              )}

              <div className="flex items-center">
                <Calendar className="w-4 h-4 mr-2" />
                <span>Created: {format(bounty.dateCreated, "PPP")}</span>
              </div>

              <div className="flex items-center">
                <Clock className="w-4 h-4 mr-2" />
                <span>Due: {format(bounty.timeToComplete, "PPP")}</span>
              </div>
            </div>

            {/* Work Submission Section for Assigned User */}
            {canSubmitWork && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">Submit Your Work</h3>
                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                  <p className="text-green-700 dark:text-green-300 text-sm mb-4">
                    You are assigned to this bounty. Ready to submit your
                    completed work?
                  </p>
                  <Button
                    onClick={() => setIsSubmissionDialogOpen(true)}
                    className="bg-green-600 hover:bg-green-700 text-white"
                  >
                    <Upload className="w-4 h-4 mr-1" />
                    Submit Work
                  </Button>
                </div>
              </div>
            )}

            {/* Show different status messages for assigned user */}
            {isAssignedToCurrentUser && !canSubmitWork && (
              <div className="border-t pt-6">
                <div className="p-4 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                  <div className="flex items-center mb-2">
                    <Clock className="w-5 h-5 mr-2 text-yellow-600 dark:text-yellow-400" />
                    <span className="font-semibold text-yellow-800 dark:text-yellow-200">
                      Assignment Status
                    </span>
                  </div>
                  {bounty.status === "IN_REVIEW" && (
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      Your work submission is currently under review.
                    </p>
                  )}
                  {bounty.status === "DONE" && (
                    <p className="text-green-700 dark:text-green-300 text-sm">
                      Work completed and approved! Congratulations!
                    </p>
                  )}
                  {!bounty.isApproved && (
                    <p className="text-yellow-700 dark:text-yellow-300 text-sm">
                      This bounty is still awaiting approval before work can be
                      submitted.
                    </p>
                  )}
                </div>
              </div>
            )}

            {/* Application Section for non-assigned users */}
            {canApply && (
              <div className="border-t pt-6">
                <h3 className="text-lg font-semibold mb-4">
                  Apply for this Bounty
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="message">Application Message</Label>
                    <Textarea
                      id="message"
                      placeholder="Tell us why you're the right person for this bounty..."
                      value={applicationMessage}
                      onChange={(e) => setApplicationMessage(e.target.value)}
                      className="min-h-[120px]"
                      rows={5}
                    />
                  </div>
                  <div className="flex justify-end gap-2">
                    <Button
                      variant="outline"
                      onClick={() => {
                        setIsDetailsDialogOpen(false);
                        setApplicationMessage("");
                      }}
                    >
                      Close
                    </Button>
                    <Button
                      onClick={handleApply}
                      disabled={!applicationMessage.trim()}
                    >
                      Submit Application
                    </Button>
                  </div>
                </div>
              </div>
            )}

            {/* Existing application status sections... */}
            {hasApplied && (
              <div className="border-t pt-6">
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center">
                      <CheckCircle className="w-5 h-5 mr-2 text-blue-600 dark:text-blue-400" />
                      <span className="font-semibold text-blue-800 dark:text-blue-200">
                        Your Application
                      </span>
                    </div>
                    <Badge
                      variant="outline"
                      className={
                        userApplication?.status === "accepted"
                          ? "text-green-600 border-green-200 dark:text-green-400 dark:border-green-800"
                          : userApplication?.status === "rejected"
                          ? "text-red-600 border-red-200 dark:text-red-400 dark:border-red-800"
                          : "text-yellow-600 border-yellow-200 dark:text-yellow-400 dark:border-yellow-800"
                      }
                    >
                      {userApplication?.status || "pending"}
                    </Badge>
                  </div>

                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-blue-700 dark:text-blue-300 mb-2">
                        <strong>Your message:</strong>
                      </p>
                      <p className="text-blue-600 dark:text-blue-400 text-sm bg-white dark:bg-blue-950/30 p-3 rounded border">
                        {userApplication?.message}
                      </p>
                    </div>

                    <div className="text-xs text-blue-600 dark:text-blue-400">
                      Applied on:{" "}
                      {userApplication?.appliedAt
                        ? format(
                            new Date(userApplication.appliedAt),
                            "PPP 'at' p"
                          )
                        : "Unknown"}
                    </div>

                    {userApplication?.status === "pending" && (
                      <p className="text-blue-700 dark:text-blue-300 text-sm">
                        Your application is being reviewed by the bounty
                        creator.
                      </p>
                    )}

                    {userApplication?.status === "accepted" && (
                      <p className="text-green-700 dark:text-green-300 text-sm">
                        Congratulations! Your application has been accepted.
                      </p>
                    )}

                    {userApplication?.status === "rejected" && (
                      <p className="text-red-700 dark:text-red-300 text-sm">
                        Your application was not selected for this bounty.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Rest of existing code for admin applications etc... */}

            {!canApply &&
              !hasApplied &&
              !bounty.assigneeUser &&
              !isAssignedToCurrentUser && (
                <div className="border-t pt-6">
                  <div className="p-4 bg-slate-50 dark:bg-slate-800 rounded-lg">
                    <p className="text-slate-600 dark:text-slate-400">
                      {!currentUser
                        ? "Please log in to apply for this bounty."
                        : bounty.createdBy === currentUser.id
                        ? "You cannot apply to your own bounty."
                        : "This bounty is not available for applications."}
                    </p>
                  </div>
                </div>
              )}

            {/* Close button */}
            {!canApply && !hasApplied && !canSubmitWork && (
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={() => setIsDetailsDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
