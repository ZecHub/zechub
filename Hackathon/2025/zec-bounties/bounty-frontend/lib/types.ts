export type UserRole = "ADMIN" | "CLIENT";

export type BountyStatus =
  | "TO_DO"
  | "IN_PROGRESS"
  | "IN_REVIEW"
  | "DONE"
  | "CANCELLED";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  createdAt: Date;
  z_address?: string; // Orchard Wallet
  avatar?: string; // GitHub avatar URL
  githubId?: string; // GitHub username/ID
}

export interface BountyApplication {
  id: string;
  bountyId: string;
  applicantId: string;
  message: string;
  status: string;
  appliedAt: Date;
  applicantUser?: User; // Populated user data
}

export interface Bounty {
  id: string;
  title: string;
  description: string;
  createdBy: string; // User ID
  assignee?: string; // User ID
  bountyAmount: number; // ZEC amount
  dateCreated: Date;
  timeToComplete: Date;
  status: BountyStatus;
  isApproved: boolean;
  isPaid: boolean;
  paymentAuthorized: boolean;
  paymentScheduled?: PaymentSchedule; // Add this
  paymentBatchId?: string; // Add this
  paidAt?: Date; // Add this
  paymentTxId?: string; // Add this
  createdByUser?: User; // Populated user data
  assigneeUser?: User; // Populated user data
  applications?: BountyApplication[]; // Added applications array to track who applied
}

export interface BountyFormData {
  title: string;
  description: string;
  assignee?: string;
  bountyAmount: number;
  timeToComplete: Date;
}

export interface PaymentSchedule {
  type: "instant" | "sunday_batch";
  scheduledFor?: Date;
}

// New interface for work submissions
export interface WorkSubmission {
  id: string;
  bountyId: string;
  submittedBy: string; // User ID
  description: string;
  deliverableUrl?: string; // The main deliverable link
  submittedAt: Date;
  reviewedAt?: Date;
  reviewedBy?: string; // User ID
  reviewNotes?: string;
  status: "pending" | "approved" | "rejected" | "needs_revision";
  submitterUser?: User; // Populated user data
  reviewerUser?: User; // Populated user data
}
