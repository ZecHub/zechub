"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";
import type {
  User,
  Bounty,
  BountyFormData,
  BountyApplication,
  WorkSubmission,
} from "./types";

interface BountyContextType {
  // Auth
  currentUser: User | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => void;
  setCurrentUser: React.Dispatch<React.SetStateAction<User | null>>;

  // Bounties
  bounties: Bounty[];
  bountiesLoading: boolean;
  createBounty: (data: BountyFormData) => Promise<void>;
  updateBounty: (id: string, data: Partial<BountyFormData>) => Promise<void>;
  updateBountyStatus: (id: string, status: Bounty["status"]) => Promise<void>;
  approveBounty: (id: string, approved: boolean) => Promise<void>;
  authorizePayment: (id: string) => Promise<void>;
  paymentIDs: string[] | undefined;
  authorizeDuePayment: () => Promise<void>;
  deleteBounty: (id: string) => Promise<void>;
  zAddressUpdate: (z_address: string) => Promise<boolean | undefined>;
  verifyZaddress: (z_address: string) => Promise<boolean | undefined>;
  fetchBounties: () => Promise<void>;
  fetchTransactionHashes: () => Promise<void>;
  applyToBounty: (bountyId: string, message: string) => Promise<void>;
  editBounty: (id: string, data: Partial<BountyFormData>) => void;

  // Users
  users: User[];
  nonAdminUsers: User[];
  usersLoading: boolean;
  fetchUsers: () => Promise<void>;
  balance: number | undefined;
  fetchBalance: () => Promise<void>;
  address: string | undefined;
  fetchAddresses: () => Promise<void>;

  // Applications
  // applications: BountyApplication[];
  // fetchUserApplications: () => Promise<void>;
  // fetchAllUsersApplications: () => Promise<void>;
  // getUserApplicationForBounty: (bountyId: string) => BountyApplication | null;
  getAllApplicationForBounty: (bountyId: string) => BountyApplication | null;

  // Applications
  applications: BountyApplication[];
  allApplications: BountyApplication[];
  bountyApplications: Record<string, BountyApplication[]>;

  // Fetch methods
  fetchUserApplications: () => Promise<void>;
  fetchAllUsersApplications: () => Promise<void>;
  fetchBountyApplications: (bountyId: string) => Promise<BountyApplication[]>;

  // Get methods
  getUserApplicationForBounty: (bountyId: string) => BountyApplication | null;
  getAllApplicationsForBounty: (bountyId: string) => BountyApplication[]; // Fixed: returns array, not single item

  // Action methods
  acceptApplication: (applicationId: string) => Promise<BountyApplication>;
  rejectApplication: (applicationId: string) => Promise<BountyApplication>;

  // Work submission
  submitWork: (
    bountyId: string,
    submissionData: {
      description: string;
      deliverableUrl?: string;
    }
  ) => Promise<void>;

  // Fetch work submissions for a bounty (creator/admin only)
  fetchWorkSubmissions: (bountyId: string) => Promise<WorkSubmission[]>;

  // Review work submission (creator/admin only)
  reviewWorkSubmission: (
    submissionId: string,
    reviewData: {
      status: "approved" | "rejected" | "needs_revision";
      reviewNotes?: string;
    }
  ) => Promise<void>;

  authorizeBatchPayment: (
    bountyId: string,
    scheduledFor: Date
  ) => Promise<void>;
  processBatchPayments: () => Promise<{
    success: boolean;
    batchId?: string;
    message: string;
  }>;
  getPendingBatchPayments: () => Array<{
    address: string;
    amount: number;
    memo?: string;
  }>;
}

const BountyContext = createContext<BountyContextType | undefined>(undefined);

export function BountyProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [bounties, setBounties] = useState<Bounty[]>([]);
  const [bountiesLoading, setBountiesLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [nonAdminUsers, setNonAdminUsers] = useState<User[]>([]);
  const [usersLoading, setUsersLoading] = useState(false);
  const [applications, setApplications] = useState<BountyApplication[]>([]);
  const [allApplications, setAllApplications] = useState<BountyApplication[]>(
    []
  );
  const [bountyApplications, setBountyApplications] = useState<
    Record<string, BountyApplication[]>
  >({});
  const [balance, setBalance] = useState<number | undefined>(undefined);
  const [address, setAddress] = useState<string | undefined>(undefined);
  const [paymentIDs, setPaymentIDs] = useState<string[] | undefined>(undefined);

  const authorizeBatchPayment = async (
    bountyId: string,
    scheduledFor: Date
  ) => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/${bountyId}/authorize-payment`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            paymentAuthorized: true,
            paymentScheduled: {
              type: "sunday_batch",
              scheduledFor: scheduledFor.toISOString(),
            },
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to authorize batch payment");

      const updated = await res.json();
      setBounties((prev) =>
        prev.map((bounty) => (bounty.id === bountyId ? updated : bounty))
      );

      // For instant payments, process immediately
      if (updated.paymentScheduled?.type === "instant") {
        await processInstantPayment(bountyId);
      }
    } catch (error) {
      console.error("Failed to authorize batch payment:", error);
      throw error;
    }
  };

  // Process instant payment separately
  const processInstantPayment = async (bountyId: string) => {
    const bounty = bounties.find((b) => b.id === bountyId);
    if (!bounty || !bounty.assigneeUser?.z_address) return;

    try {
      await fetch(
        "http://localhost:5000/api/bounties/process-instant-payment",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            address: bounty.assigneeUser.z_address,
            amount: Math.floor(bounty.bountyAmount * 100000000), // Convert to zatoshis
            memo: `Bounty: ${bounty.title} (ID: ${bounty.id})`,
            bountyId: bountyId,
          }),
        }
      );
    } catch (error) {
      console.error("Failed to process instant payment:", error);
    }
  };

  // Update the existing authorizePayment function
  const authorizeDuePayment = async () => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/transactions/authorize-payment`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          // body: JSON.stringify({
          //   paymentAuthorized: true,
          //   paymentScheduled: {
          //     type: "instant",
          //   },
          // }),
        }
      );

      if (!res.ok) throw new Error("Failed to authorize payment");

      const data = await res.json();
    } catch (error) {
      console.error("Failed to authorize payment:", error);
    }
  };

  const fetchTransactionHashes = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/transactions/", {
        headers: getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        setPaymentIDs(data);
        console.log(data);
      }
      throw new Error("Failed to fetch transaction hashes");
    } catch (error) {
      console.error("Failed to fetch transaction hashes:", error);
    }
  };

  // Update the existing authorizePayment function
  const authorizePayment = async (id: string) => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/${id}/authorize-payment`,
        {
          method: "PUT",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            paymentAuthorized: true,
            paymentScheduled: {
              type: "instant",
            },
          }),
        }
      );

      if (!res.ok) throw new Error("Failed to authorize payment");

      const updated = await res.json();
      setBounties((prev) =>
        prev.map((bounty) => (bounty.id === id ? updated : bounty))
      );

      // Process instant payment
      await processInstantPayment(id);
    } catch (error) {
      console.error("Failed to authorize payment:", error);
      throw error;
    }
  };

  // Function to get all pending batch payments for the backend
  const getPendingBatchPayments = (): Array<{
    address: string;
    amount: number;
    memo?: string;
  }> => {
    const pendingBatchBounties = bounties.filter(
      (bounty) =>
        bounty.paymentAuthorized &&
        bounty.paymentScheduled?.type === "sunday_batch" &&
        bounty.assigneeUser?.z_address && // Use z_address from your User type
        bounty.status === "DONE" &&
        bounty.isApproved &&
        !bounty.isPaid
    );

    return pendingBatchBounties.map((bounty) => ({
      address: bounty.assigneeUser!.z_address!,
      amount: Math.floor(bounty.bountyAmount * 100000000), // Convert ZEC to zatoshis
      memo: `Bounty: ${bounty.title} (ID: ${bounty.id})`,
    }));
  };

  // Function to process batch payments
  const processBatchPayments = async (): Promise<{
    success: boolean;
    batchId?: string;
    message: string;
  }> => {
    if (!currentUser || currentUser.role !== "ADMIN") {
      return { success: false, message: "Unauthorized" };
    }

    try {
      const batchPayments = getPendingBatchPayments();

      if (batchPayments.length === 0) {
        return {
          success: true,
          message: "No pending batch payments to process",
        };
      }

      const res = await fetch(
        "http://localhost:5000/api/bounties/process-batch-payments",
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify({
            payments: batchPayments,
            batchTimestamp: new Date().toISOString(),
          }),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to process batch payments");
      }

      const result = await res.json();

      // Mark bounties as paid if batch was successful
      if (result.success) {
        const batchBountyIds = bounties
          .filter(
            (bounty) =>
              bounty.paymentAuthorized &&
              bounty.paymentScheduled?.type === "sunday_batch" &&
              !bounty.isPaid
          )
          .map((bounty) => bounty.id);

        // Update bounties to mark them as paid
        for (const bountyId of batchBountyIds) {
          await fetch(
            `http://localhost:5000/api/bounties/${bountyId}/mark-paid`,
            {
              method: "PUT",
              headers: getAuthHeaders(),
              body: JSON.stringify({
                isPaid: true,
                paymentBatchId: result.batchId,
                paidAt: new Date().toISOString(),
              }),
            }
          );
        }

        // Refresh bounties
        await fetchBounties();
      }

      return result;
    } catch (error) {
      console.error("Failed to process batch payments:", error);
      return {
        success: false,
        message:
          error instanceof Error ? error.message : "Unknown error occurred",
      };
    }
  };

  // Helper function to get auth headers
  const getAuthHeaders = () => {
    const token = localStorage.getItem("authToken");
    return {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
    };
  };

  // Fetch all users from backend (excluding admins for assignment)
  const fetchUsers = async () => {
    setUsersLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bounties/users", {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const data = await res.json();
      // Filter out admin users for assignment purposes
      const nonAdminUsersData = data.filter(
        (user: User) => user.role !== "ADMIN"
      );
      setUsers(data);
      setNonAdminUsers(nonAdminUsersData);
    } catch (error) {
      console.error("Failed to fetch users:", error);
    } finally {
      setUsersLoading(false);
    }
  };
  // Fetch applications for a specific bounty (admin/creator only)
  const fetchBountyApplications = async (bountyId: string) => {
    if (!currentUser) return [];

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/${bountyId}/applications`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch bounty applications");

      const data = await res.json();

      // Store applications for this specific bounty
      setBountyApplications((prev) => ({
        ...prev,
        [bountyId]: data,
      }));

      return data;
    } catch (error) {
      console.error("Failed to fetch bounty applications:", error);
      return [];
    }
  };

  // Fetch current user's applications only
  const fetchUserApplications = async () => {
    if (!currentUser) return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/bounties/my-applications",
        {
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch applications");

      const data = await res.json();
      setApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  // Fetch all applications (admin only)
  const fetchAllUsersApplications = async () => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/bounties/all-applications",
        {
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) throw new Error("Failed to fetch applications");

      const data = await res.json();
      setAllApplications(data);
    } catch (error) {
      console.error("Failed to fetch applications:", error);
    }
  };

  // Get current user's application for a specific bounty
  const getUserApplicationForBounty = (
    bountyId: string
  ): BountyApplication | null => {
    return applications.find((app) => app.bountyId === bountyId) || null;
  };

  // Get ALL applications for a specific bounty (returns array, not single item)
  const getAllApplicationsForBounty = (
    bountyId: string
  ): BountyApplication[] => {
    // First check if we have applications cached for this bounty
    if (bountyApplications[bountyId]) {
      return bountyApplications[bountyId];
    }

    // Fallback: filter from all applications if available
    if (allApplications.length > 0) {
      return allApplications.filter((app) => app.bountyId === bountyId);
    }

    // If no applications found, try to fetch them
    fetchBountyApplications(bountyId);
    return [];
  };

  // Accept an application (admin/creator only)
  const acceptApplication = async (applicationId: string) => {
    if (!currentUser) throw new Error("User not authenticated");

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/applications/${applicationId}`,
        {
          method: "PUT",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "accepted" }),
        }
      );

      if (!res.ok) throw new Error("Failed to accept application");

      const updatedApplication = await res.json();

      // Update local state
      const bountyId = updatedApplication.bountyId;

      // Refresh bounty applications for this bounty
      await fetchBountyApplications(bountyId);

      // Refresh bounties to update assignment
      await fetchBounties();

      return updatedApplication;
    } catch (error) {
      console.error("Failed to accept application:", error);
      throw error;
    }
  };

  // Reject an application (admin/creator only)
  const rejectApplication = async (applicationId: string) => {
    if (!currentUser) throw new Error("User not authenticated");

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/applications/${applicationId}`,
        {
          method: "PUT",
          headers: {
            ...getAuthHeaders(),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ status: "rejected" }),
        }
      );

      if (!res.ok) throw new Error("Failed to reject application");

      const updatedApplication = await res.json();

      // Update local state
      const bountyId = updatedApplication.bountyId;

      // Refresh bounty applications for this bounty
      await fetchBountyApplications(bountyId);

      return updatedApplication;
    } catch (error) {
      console.error("Failed to reject application:", error);
      throw error;
    }
  };

  // Submit work for a bounty (assignee only)
  const submitWork = async (
    bountyId: string,
    submissionData: {
      description: string;
      deliverableUrl?: string;
    }
  ) => {
    if (!currentUser) throw new Error("User not authenticated");

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/${bountyId}/submit`,
        {
          method: "POST",
          headers: getAuthHeaders(),
          body: JSON.stringify(submissionData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to submit work");
      }

      // Refresh bounties to get updated data
      await fetchBounties();
    } catch (error) {
      console.error("Failed to submit work:", error);
      throw error;
    }
  };

  const fetchWorkSubmissions = async (bountyId: string) => {
    if (!currentUser) throw new Error("User not authenticated");

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/${bountyId}/submissions`,
        {
          headers: getAuthHeaders(),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to fetch work submissions");
      }

      return await res.json();
    } catch (error) {
      console.error("Failed to fetch work submissions:", error);
      throw error;
    }
  };

  // Add this function after the existing functions in your BountyProvider
  const fetchBalance = async () => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/transactions/balance",
        {
          headers: getAuthHeaders(),
        }
      );

      if (res.ok) {
        const data = await res.json();

        setBalance(data.spendable_sapling_balance);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  // Add this function after the existing functions in your BountyProvider
  const fetchAddresses = async () => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        "http://localhost:5000/api/transactions/addresses",
        {
          headers: getAuthHeaders(),
        }
      );

      if (res.ok) {
        const data = await res.json();

        setAddress(data.sapling);
      }
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  // Review work submission (creator/admin only)
  const reviewWorkSubmission = async (
    submissionId: string,
    reviewData: {
      status: "approved" | "rejected" | "needs_revision";
      reviewNotes?: string;
    }
  ) => {
    if (!currentUser) throw new Error("User not authenticated");

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/submissions/${submissionId}/review`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify(reviewData),
        }
      );

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to review submission");
      }

      // Refresh bounties to get updated data
      await fetchBounties();

      return await res.json();
    } catch (error) {
      console.error("Failed to review submission:", error);
      throw error;
    }
  };

  // Fetch current user's applications only
  // const fetchUserApplications = async () => {
  //   if (!currentUser) return;

  //   try {
  //     const res = await fetch(
  //       "http://localhost:5000/api/bounties/my-applications",
  //       {
  //         headers: getAuthHeaders(),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to fetch applications");

  //     const data = await res.json();
  //     setApplications(data);
  //   } catch (error) {
  //     console.error("Failed to fetch applications:", error);
  //   }
  // };

  // // Fetch current user's applications only
  // const fetchAllUsersApplications = async () => {
  //   if (!currentUser) return;

  //   try {
  //     const res = await fetch(
  //       "http://localhost:5000/api/bounties/all-applications",
  //       {
  //         headers: getAuthHeaders(),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to fetch applications");

  //     const data = await res.json();
  //     setAllApplications(data);
  //   } catch (error) {
  //     console.error("Failed to fetch applications:", error);
  //   }
  // };

  // // Get current user's application for a specific bounty
  // const getUserApplicationForBounty = (
  //   bountyId: string
  // ): BountyApplication | null => {
  //   return applications.find((app) => app.bountyId === bountyId) || null;
  // };

  // Get all user's application for a specific bounty
  const getAllApplicationForBounty = (
    bountyId: string
  ): BountyApplication | null => {
    return allApplications.find((app) => app.bountyId === bountyId) || null;
  };

  // Initialize auth and fetch data
  useEffect(() => {
    const initializeAuth = async () => {
      const savedToken = localStorage.getItem("authToken");

      if (savedToken) {
        try {
          const res = await fetch("http://localhost:5000/auth/me", {
            headers: { Authorization: `Bearer ${savedToken}` },
          });

          if (!res.ok) throw new Error("Token invalid");

          const data = await res.json();
          setCurrentUser(data.user);
          localStorage.setItem("currentUser", JSON.stringify(data.user));

          // Fetch bounties, users, and applications after successful auth
          await Promise.all([fetchBounties(), fetchUsers()]);
        } catch (error) {
          console.error("Token validation failed:", error);
          localStorage.removeItem("authToken");
          localStorage.removeItem("currentUser");
          setCurrentUser(null);
        }
      }

      setIsLoading(false);
    };

    initializeAuth();
  }, []);

  // Fetch user applications when currentUser changes
  useEffect(() => {
    if (currentUser) {
      fetchUserApplications();
      fetchAllUsersApplications();
    } else {
      setApplications([]);
      setAllApplications([]);
    }
  }, [currentUser]);

  // Add this useEffect after your existing useEffects
  useEffect(() => {
    if (currentUser?.role === "ADMIN") {
      fetchBalance();

      // Optional: Refresh balance every 30 seconds
      const interval = setInterval(fetchBalance, 30000);
      return () => clearInterval(interval);
    } else {
      setBalance(undefined); // Clear balance for non-admin users
    }
  }, [currentUser]);

  // Add this useEffect after your existing useEffects
  useEffect(() => {
    if (currentUser?.role === "ADMIN") {
      fetchAddresses();

      // Optional: Refresh balance every 30 seconds
      // const interval = setInterval(fetchAddresses, 30000);
      // return () => clearInterval(interval);
    } else {
      setAddress(undefined); // Clear balance for non-admin users
    }
  }, [currentUser]);

  // Add this useEffect after your existing useEffects
  useEffect(() => {
    if (currentUser?.role === "ADMIN") {
      fetchTransactionHashes();

      // Optional: Refresh balance every 30 seconds
      // const interval = setInterval(fetchAddresses, 30000);
      // return () => clearInterval(interval);
    } else {
      setPaymentIDs(undefined); // Clear balance for non-admin users
    }
  }, [currentUser]);

  // In bounty-context.tsx, replace the existing useEffect for SSE
  // useEffect(() => {
  //   let evtSource: EventSource | null = null;

  //   const connectSSE = () => {
  //     evtSource = new EventSource("http://localhost:5000/events");

  //     evtSource.onopen = () => {
  //       console.log("SSE connection opened");
  //     };

  //     evtSource.onmessage = (event) => {
  //       try {
  //         const data = JSON.parse(event.data);
  //         console.log("Event received:", data);

  //         switch (data.type) {
  //           case "bounty_created":
  //             setBounties((prev) => [...prev, data.bounty]);
  //             break;

  //           case "bounty_updated":
  //             setBounties((prev) =>
  //               prev.map((bounty) =>
  //                 bounty.id === data.bounty.id ? data.bounty : bounty
  //               )
  //             );
  //             break;

  //           case "bounty_status_changed":
  //             setBounties((prev) =>
  //               prev.map((bounty) =>
  //                 bounty.id === data.bounty.id ? data.bounty : bounty
  //               )
  //             );
  //             break;

  //           case "bounty_approved":
  //             setBounties((prev) =>
  //               prev.map((bounty) =>
  //                 bounty.id === data.bounty.id ? data.bounty : bounty
  //               )
  //             );
  //             break;

  //           case "payment_authorized":
  //             setBounties((prev) =>
  //               prev.map((bounty) =>
  //                 bounty.id === data.bounty.id ? data.bounty : bounty
  //               )
  //             );
  //             break;

  //           case "payment_processed":
  //             // Refresh transaction hashes and bounties
  //             fetchTransactionHashes();
  //             fetchBounties();
  //             break;

  //           case "balance_updated":
  //             setBalance(data.payload.balance);
  //             break;

  //           case "work_submitted":
  //             // Refresh bounties to show new submission
  //             fetchBounties();
  //             break;

  //           case "submission_reviewed":
  //             // Refresh bounties to show updated status
  //             fetchBounties();
  //             break;

  //           default:
  //             console.log("Unknown event type:", data.type);
  //         }
  //       } catch (error) {
  //         console.error("Failed to parse SSE data:", error);
  //       }
  //     };

  //     evtSource.onerror = (error) => {
  //       console.error("SSE error:", error);
  //       evtSource?.close();

  //       // Attempt to reconnect after 5 seconds
  //       setTimeout(() => {
  //         console.log("Attempting to reconnect SSE...");
  //         connectSSE();
  //       }, 5000);
  //     };
  //   };

  //   // Only connect if user is authenticated
  //   if (currentUser) {
  //     connectSSE();
  //   }

  //   return () => {
  //     if (evtSource) {
  //       evtSource.close();
  //     }
  //   };
  // }, [currentUser]);
  // Reconnect when user changes

  // Fetch all bounties from backend
  const fetchBounties = async () => {
    setBountiesLoading(true);
    try {
      const res = await fetch("http://localhost:5000/api/bounties", {
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to fetch bounties");

      const data = await res.json();
      console.log(data);
      setBounties(data);
    } catch (error) {
      console.error("Failed to fetch bounties:", error);
    } finally {
      setBountiesLoading(false);
    }
  };

  // Create a new bounty
  const createBounty = async (data: BountyFormData) => {
    if (!currentUser) return;
    console.log(data.bountyAmount);

    try {
      const res = await fetch("http://localhost:5000/api/bounties", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          title: data.title,
          description: data.description,
          bountyAmount: data.bountyAmount,
          timeToComplete: data.timeToComplete,
          assignee: data.assignee === "none" ? null : data.assignee,
          createdBy: currentUser.id,
        }),
      });

      if (!res.ok) throw new Error("Failed to create bounty");

      const created = await res.json();
      setBounties((prev) => [...prev, created]);
    } catch (error) {
      console.error("Failed to create bounty:", error);
      throw error;
    }
  };

  // Update an existing bounty
  const updateBounty = async (id: string, data: Partial<BountyFormData>) => {
    if (!currentUser) return;

    try {
      const res = await fetch(`http://localhost:5000/api/bounties/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          ...(data.title && { title: data.title }),
          ...(data.description && { description: data.description }),
          ...(data.bountyAmount && { bountyAmount: data.bountyAmount }),
          ...(data.timeToComplete && { timeToComplete: data.timeToComplete }),
          ...(data.assignee !== undefined && {
            assignee: data.assignee === "none" ? null : data.assignee,
          }),
        }),
      });

      if (!res.ok) throw new Error("Failed to update bounty");

      const updated = await res.json();
      setBounties((prev) =>
        prev.map((bounty) => (bounty.id === id ? updated : bounty))
      );
    } catch (error) {
      console.error("Failed to update bounty:", error);
      throw error;
    }
  };

  // Update bounty status
  const updateBountyStatus = async (id: string, status: Bounty["status"]) => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(
        `http://localhost:5000/api/bounties/${id}/status`,
        {
          method: "PATCH",
          headers: getAuthHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      console.log(res);

      if (!res.ok) throw new Error("Failed to update bounty status");

      const updated = await res.json();
      setBounties((prev) =>
        prev.map((bounty) => (bounty.id === id ? updated : bounty))
      );
    } catch (error) {
      console.error("Failed to update bounty status:", error);
      throw error;
    }
  };

  // Approve/reject a bounty
  const approveBounty = async (id: string, approved: boolean) => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(`http://localhost:5000/api/bounties/${id}`, {
        method: "PUT",
        headers: getAuthHeaders(),
        body: JSON.stringify({ isApproved: approved }),
      });

      if (!res.ok) throw new Error("Failed to approve bounty");

      const updated = await res.json();
      setBounties((prev) =>
        prev.map((bounty) => (bounty.id === id ? updated : bounty))
      );
    } catch (error) {
      console.error("Failed to approve bounty:", error);
      throw error;
    }
  };

  // Authorize payment for a bounty
  // const authorizePayment = async (id: string) => {
  //   if (!currentUser || currentUser.role !== "ADMIN") return;

  //   try {
  //     const res = await fetch(
  //       `http://localhost:5000/api/bounties/${id}/authorize-payment`,
  //       {
  //         method: "PUT",
  //         headers: getAuthHeaders(),
  //         body: JSON.stringify({ paymentAuthorized: true }),
  //       }
  //     );

  //     if (!res.ok) throw new Error("Failed to authorize payment");

  //     const updated = await res.json();
  //     setBounties((prev) =>
  //       prev.map((bounty) => (bounty.id === id ? updated : bounty))
  //     );
  //   } catch (error) {
  //     console.error("Failed to authorize payment:", error);
  //     throw error;
  //   }
  // };

  // Delete a bounty
  const deleteBounty = async (id: string) => {
    if (!currentUser || currentUser.role !== "ADMIN") return;

    try {
      const res = await fetch(`http://localhost:5000/api/bounties/${id}`, {
        method: "DELETE",
        headers: getAuthHeaders(),
      });

      if (!res.ok) throw new Error("Failed to delete bounty");

      setBounties((prev) => prev.filter((bounty) => bounty.id !== id));
    } catch (error) {
      console.error("Failed to delete bounty:", error);
      throw error;
    }
  };

  // Login function with bounty and user fetching
  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        return false;
      }

      const data = await res.json();

      localStorage.setItem("authToken", data.token);
      localStorage.setItem("currentUser", JSON.stringify(data.user));
      console.log(data.user);

      setCurrentUser(data.user);

      // Fetch bounties and users after successful login
      await Promise.all([fetchBounties(), fetchUsers()]);

      return true;
    } catch (err) {
      console.error("Login failed:", err);
      return false;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("currentUser");
    setCurrentUser(null);
    setBounties([]);
    setUsers([]);
    setApplications([]);
    setAllApplications([]);
  };

  // Apply to bounty - updated for Prisma backend
  const applyToBounty = async (bountyId: string, message: string) => {
    if (!currentUser) return;

    try {
      const res = await fetch("http://localhost:5000/api/bounties/apply", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          bountyId,
          applicantId: currentUser.id,
          message,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to apply");
      }

      const newApplication = await res.json();
      setApplications((prev) => [...prev, newApplication]);
      setAllApplications((prev) => [...prev, newApplication]);

      // Refresh bounties to get updated data
      await fetchBounties();
    } catch (error) {
      console.error("Failed to apply to bounty:", error);
      throw error;
    }
  };

  // Legacy function for backward compatibility
  const editBounty = (id: string, data: Partial<BountyFormData>) => {
    updateBounty(id, data);
  };

  // Legacy function for backward compatibility
  const verifyZaddress = async (z_address: string) => {
    if (!currentUser) return;

    try {
      const res = await fetch("http://localhost:5000/auth/verify-zaddress", {
        method: "POST",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          z_address: z_address,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to verify zaddress");
      }

      const data = await res.json();

      const result: boolean = data.isVerified;

      return result;
    } catch (error) {
      console.error("Failed to verify zaddress:", error);
      return false;
    }
  };

  // Legacy function for backward compatibility
  const zAddressUpdate = async (z_address: string) => {
    if (!currentUser) return;

    try {
      const res = await fetch("http://localhost:5000/auth/update-zaddress", {
        method: "PATCH",
        headers: getAuthHeaders(),
        body: JSON.stringify({
          z_address: z_address,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.error || "Failed to add zaddress");
      }

      return true;
    } catch (error) {
      console.error("Failed to add zaddress:", error);
      return false;
    }
  };

  // Populate user data in bounties - only show user's own applications
  const populatedBounties = bounties.map((bounty) => ({
    ...bounty,
    createdByUser: users.find((u) => u.id === bounty.createdBy),
    assigneeUser: bounty.assignee
      ? nonAdminUsers.find((u) => u.id === bounty.assignee)
      : undefined,
    // Only include current user's applications for privacy
    userApplication: applications.find((app) => app.bountyId === bounty.id),
  }));

  return (
    <BountyContext.Provider
      value={{
        currentUser,
        isLoading,
        login,
        logout,
        setCurrentUser,
        bounties: populatedBounties,
        bountiesLoading,
        createBounty,
        updateBounty,
        updateBountyStatus,
        approveBounty,
        authorizePayment,
        paymentIDs,
        fetchTransactionHashes,
        authorizeDuePayment,
        deleteBounty,
        fetchBounties,
        applyToBounty,
        editBounty,
        users,
        nonAdminUsers,
        usersLoading,
        fetchUsers,
        applications,
        fetchUserApplications,
        fetchAllUsersApplications,
        // getUserApplicationForBounty,
        getAllApplicationForBounty,
        fetchBountyApplications,
        getUserApplicationForBounty,
        getAllApplicationsForBounty, // Fixed name and returns array
        acceptApplication,
        rejectApplication,
        allApplications,
        bountyApplications,
        submitWork,
        fetchWorkSubmissions,
        reviewWorkSubmission,
        authorizeBatchPayment,
        processBatchPayments,
        getPendingBatchPayments,
        zAddressUpdate,
        verifyZaddress,
        balance,
        fetchBalance,
        address,
        fetchAddresses,
      }}
    >
      {children}
    </BountyContext.Provider>
  );
}

export function useBounty() {
  const context = useContext(BountyContext);
  if (context === undefined) {
    throw new Error("useBounty must be used within a BountyProvider");
  }
  return context;
}
