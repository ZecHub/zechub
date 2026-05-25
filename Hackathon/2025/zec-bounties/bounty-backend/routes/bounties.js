const express = require("express");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();
const router = express.Router();
const { authenticate, isAdmin } = require("../middleware/auth");
const { broadcast } = require("../helpers/broadcast");

// Create bounty
router.post("/", authenticate, async (req, res) => {
  try {
    const { title, description, bountyAmount, timeToComplete, assignee } =
      req.body;

    // If no assignee selected, set null
    const assigneeId = assignee === "none" ? null : assignee;

    const bounty = await prisma.bounty.create({
      data: {
        title,
        description,
        bountyAmount: parseFloat(bountyAmount),
        timeToComplete: new Date(timeToComplete),
        createdBy: req.user.id, // must have user from auth middleware
        assignee: assigneeId,
      },
    });

    // ✅ Broadcast the new bounty
    broadcast({ type: "bounty_created", bounty });

    res.status(201).json(bounty);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create bounty" });
  }
});

// List all bounties
router.get("/", authenticate, async (req, res) => {
  const bounties = await prisma.bounty.findMany();
  res.json(bounties);
});

// Edit bounty (Admin)
router.put("/:id", authenticate, isAdmin, async (req, res) => {
  try {
    const updated = await prisma.bounty.update({
      where: { id: req.params.id },
      data: {
        ...(req.body.title && { title: req.body.title }),
        ...(req.body.description && { description: req.body.description }),
        ...(req.body.bountyAmount && { bountyAmount: req.body.bountyAmount }),
        ...(req.body.timeToComplete && {
          timeToComplete: req.body.timeToComplete,
        }),
        ...(req.body.assignee !== undefined && { assignee: req.body.assignee }),
        ...(req.body.approved !== undefined && { approved: req.body.approved }),
      },
    });

    // ✅ Broadcast bounty update
    broadcast({ type: "bounty_updated", bounty: updated });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update bounty" });
  }
});

// Update a bounty (Admin only for sensitive fields like payment)
router.put(
  "/:id/authorize-payment",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const bountyId = req.params.id;

      // Pick only fields we allow updating
      const { paymentAuthorized } = req.body;

      const updated = await prisma.bounty.update({
        where: { id: bountyId },
        data: {
          ...(paymentAuthorized !== undefined && {
            paymentAuthorized,
            paymentAuthorizedAt: paymentAuthorized ? new Date() : null,
          }),
        },
      });

      // ✅ Broadcast payment authorization change
      broadcast({ type: "payment_authorized", bounty: updated });

      res.json(updated);
    } catch (error) {
      console.error("Error updating bounty:", error);
      res.status(500).json({ error: "Failed to update bounty" });
    }
  }
);

// Approve bounty (Admin)
router.patch("/:id/approve", authenticate, isAdmin, async (req, res) => {
  const updated = await prisma.bounty.update({
    where: { id: Number(req.params.id) },
    data: { approved: true },
  });

  // ✅ Broadcast approval
  broadcast({ type: "bounty_approved", bounty: updated });
  res.json(updated);
});

// Change status (Admin)
router.patch("/:id/status", authenticate, isAdmin, async (req, res) => {
  try {
    const { status } = req.body;
    const bountyId = req.params.id;

    let isApproved;

    if (status === "CANCELLED") {
      isApproved = false;
    } else if (status !== "TO_DO") {
      isApproved = true;
    }

    const updated = await prisma.bounty.update({
      where: { id: bountyId }, // remove Number() if your schema uses String IDs
      data: {
        status,
        ...(isApproved !== undefined && { isApproved: isApproved }), // only set if defined
      },
    });

    // ✅ Broadcast status change
    broadcast({ type: "bounty_status_changed", bounty: updated });

    res.json(updated);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update bounty status" });
  }
});

// Add this to your bounties API routes (e.g., routes/bounties.js)

router.post("/:id/submit", authenticate, async (req, res) => {
  try {
    const { id: bountyId } = req.params;
    const { description, deliverableUrl } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!description || !description.trim()) {
      return res.status(400).json({
        error: "Work description is required",
      });
    }

    // Find the bounty
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
      include: {
        createdByUser: true,
        assigneeUser: true,
        workSubmissions: {
          include: {
            submitterUser: true,
          },
        },
      },
    });

    if (!bounty) {
      return res.status(404).json({ error: "Bounty not found" });
    }

    // Check if user is assigned to this bounty
    if (bounty.assignee !== userId) {
      return res.status(403).json({
        error: "You are not assigned to this bounty",
      });
    }

    // Check if bounty is approved and ready for work
    if (!bounty.isApproved) {
      return res.status(400).json({
        error: "Bounty must be approved before submitting work",
      });
    }

    // Check if bounty status allows submission
    if (!["TO_DO", "IN_PROGRESS"].includes(bounty.status)) {
      return res.status(400).json({
        error: "Work cannot be submitted for bounties in this status",
      });
    }

    // Check if there's already a pending or approved submission
    const existingSubmission = bounty.workSubmissions?.find((submission) =>
      ["pending", "approved"].includes(submission.status)
    );

    if (existingSubmission) {
      return res.status(400).json({
        error:
          "There is already a pending or approved submission for this bounty",
      });
    }

    // Create work submission
    const workSubmission = await prisma.workSubmission.create({
      data: {
        bountyId,
        submittedBy: userId,
        description: description.trim(),
        deliverableUrl: deliverableUrl?.trim() || null,
        status: "pending",
      },
      include: {
        submitterUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
    });

    // ✅ Broadcast new work submission
    broadcast({ type: "work_submitted", workSubmission });

    // Update bounty status to IN_REVIEW
    const updatedBounty = await prisma.bounty.update({
      where: { id: bountyId },
      data: {
        status: "IN_REVIEW",
      },
      include: {
        createdByUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          },
        },
        assigneeUser: {
          select: {
            id: true,
            name: true,
            email: true,
            role: true,
            avatar: true,
          },
        },
        workSubmissions: {
          include: {
            submitterUser: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
    });

    // ✅ Broadcast updated bounty
    broadcast({ type: "bounty_updated", bounty: updatedBounty });

    res.json({
      message: "Work submitted successfully",
      workSubmission,
      bounty: updatedBounty,
    });
  } catch (error) {
    console.error("Error submitting work:", error);
    res.status(500).json({
      error: "Failed to submit work",
      details: error.message,
    });
  }
});

// Get work submissions for a bounty (creator/admin only)
router.get("/:id/submissions", authenticate, async (req, res) => {
  try {
    const { id: bountyId } = req.params;
    const userId = req.user.id;
    const userRole = req.user.role;

    // Find the bounty
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
      select: {
        id: true,
        createdBy: true,
        title: true,
      },
    });

    if (!bounty) {
      return res.status(404).json({ error: "Bounty not found" });
    }

    // Check permissions (only creator or admin can view submissions)
    if (bounty.createdBy !== userId && userRole !== "ADMIN") {
      return res.status(403).json({
        error: "You do not have permission to view submissions for this bounty",
      });
    }

    // Get submissions
    const submissions = await prisma.workSubmission.findMany({
      where: { bountyId },
      include: {
        submitterUser: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
          },
        },
      },
      orderBy: {
        submittedAt: "desc",
      },
    });

    // Parse attachments JSON for each submission
    const submissionsWithParsedAttachments = submissions.map((submission) => ({
      ...submission,
      attachments: submission.attachments
        ? JSON.parse(submission.attachments)
        : [],
    }));

    res.json(submissionsWithParsedAttachments);
  } catch (error) {
    console.error("Error fetching submissions:", error);
    res.status(500).json({
      error: "Failed to fetch submissions",
    });
  }
});

// Review work submission (creator/admin only)
router.patch(
  "/submissions/:submissionId/review",
  authenticate,
  async (req, res) => {
    try {
      const { submissionId } = req.params;
      const { status, reviewNotes } = req.body;
      const userId = req.user.id;
      const userRole = req.user.role;

      // Validate status
      if (!["approved", "rejected", "needs_revision"].includes(status)) {
        return res.status(400).json({
          error: "Invalid review status",
        });
      }

      // Find the submission
      const submission = await prisma.workSubmission.findUnique({
        where: { id: submissionId },
        include: {
          bounty: {
            select: {
              id: true,
              createdBy: true,
              title: true,
              status: true,
            },
          },
          submitterUser: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      if (!submission) {
        return res.status(404).json({ error: "Submission not found" });
      }

      // Check permissions
      if (submission.bounty.createdBy !== userId && userRole !== "ADMIN") {
        return res.status(403).json({
          error: "You do not have permission to review this submission",
        });
      }

      // Update submission
      const updatedSubmission = await prisma.workSubmission.update({
        where: { id: submissionId },
        data: {
          status,
          reviewNotes: reviewNotes?.trim() || null,
          reviewedBy: userId,
          reviewedAt: new Date(),
        },
        include: {
          submitterUser: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
          reviewerUser: {
            select: {
              id: true,
              name: true,
              email: true,
              avatar: true,
            },
          },
        },
      });

      // ✅ Broadcast submission review
      broadcast({ type: "submission_reviewed", submission: updatedSubmission });

      // Update bounty status based on review
      let newBountyStatus = submission.bounty.status;
      if (status === "approved") {
        newBountyStatus = "DONE";
      } else if (status === "rejected" || status === "needs_revision") {
        newBountyStatus = "IN_PROGRESS";
      }

      const updatedBounty = await prisma.bounty.update({
        where: { id: submission.bounty.id },
        data: {
          status: newBountyStatus,
        },
        include: {
          createdByUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
            },
          },
          assigneeUser: {
            select: {
              id: true,
              name: true,
              email: true,
              role: true,
              avatar: true,
            },
          },
        },
      });

      // ✅ Broadcast updated bounty status
      broadcast({ type: "bounty_updated", bounty: updatedBounty });

      res.json({
        message: "Submission reviewed successfully",
        submission: updatedSubmission,
        bounty: updatedBounty,
      });
    } catch (error) {
      console.error("Error reviewing submission:", error);
      res.status(500).json({
        error: "Failed to review submission",
      });
    }
  }
);

// Fetch all users except admin
router.get("/users", authenticate, async (req, res) => {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        z_address: true,
      },
    });

    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Additional endpoints to add to your Prisma-based backend

// Get current user's applications only
router.get("/my-applications", authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const applications = await prisma.bountyApplication.findMany({
      where: { applicantId: userId },
      include: {
        bounty: {
          select: {
            id: true,
            title: true,
            bountyAmount: true,
            status: true,
            timeToComplete: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get all user's applications
router.get("/all-applications", authenticate, isAdmin, async (req, res) => {
  try {
    const applications = await prisma.bountyApplication.findMany({
      include: {
        bounty: {
          select: {
            id: true,
            title: true,
            bountyAmount: true,
            status: true,
            timeToComplete: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Get applications for a specific bounty (admin/bounty creator only)
router.get("/:bountyId/applications", authenticate, async (req, res) => {
  try {
    const { bountyId } = req.params;
    const userId = req.user.id;

    // Check if bounty exists and user has permission
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
    });

    if (!bounty) {
      return res.status(404).json({ error: "Bounty not found" });
    }

    // Only admin or bounty creator can see all applications
    if (req.user.role !== "ADMIN" && bounty.createdBy !== userId) {
      return res.status(403).json({ error: "Access denied" });
    }

    const applications = await prisma.bountyApplication.findMany({
      where: { bountyId },
      include: {
        applicantUser: {
          select: {
            id: true,
            name: true,
            email: true,
          },
        },
      },
      orderBy: { appliedAt: "desc" },
    });

    res.json(applications);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

// Update application status (admin/bounty creator only)
router.put(
  "/applications/:applicationId",
  authenticate,
  isAdmin,
  async (req, res) => {
    try {
      const { applicationId } = req.params;
      const { status } = req.body; // 'accepted', 'rejected', 'pending'
      const userId = req.user.id;

      // Find application with bounty data
      const application = await prisma.bountyApplication.findUnique({
        where: { id: applicationId },
        include: {
          bounty: true,
        },
      });

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      // Use Prisma transaction for atomic operations
      const result = await prisma.$transaction(async (tx) => {
        // Update the application
        const updatedApplication = await tx.bountyApplication.update({
          where: { id: applicationId },
          data: {
            status,
            reviewedAt: new Date(),
            reviewedBy: userId,
          },
          include: {
            applicantUser: {
              select: { id: true, name: true, email: true },
            },
          },
        });

        // If accepted, assign bounty and reject other applications
        if (status === "accepted") {
          // Assign the bounty
          await tx.bounty.update({
            where: { id: application.bountyId },
            data: {
              assignee: application.applicantId,
              status: "In Progress",
            },
          });

          // Reject all other applications for this bounty
          await tx.bountyApplication.updateMany({
            where: {
              bountyId: application.bountyId,
              id: { not: applicationId },
            },
            data: {
              status: "rejected",
              reviewedAt: new Date(),
              reviewedBy: userId,
            },
          });
        }

        return updatedApplication;
      });

      res.json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Withdraw application (applicant only, if still pending)
router.delete(
  "/applications/:applicationId",
  authenticate,
  async (req, res) => {
    try {
      const { applicationId } = req.params;
      const userId = req.user.id;

      const application = await prisma.bountyApplication.findUnique({
        where: { id: applicationId },
      });

      if (!application) {
        return res.status(404).json({ error: "Application not found" });
      }

      // Only the applicant can withdraw
      if (application.applicantId !== userId) {
        return res.status(403).json({ error: "Access denied" });
      }

      // Can only withdraw pending applications
      if (application.status !== "pending") {
        return res
          .status(400)
          .json({ error: "Cannot withdraw a reviewed application" });
      }

      await prisma.bountyApplication.delete({
        where: { id: applicationId },
      });

      res.json({ message: "Application withdrawn successfully" });
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: err.message });
    }
  }
);

// Update your existing apply endpoint to prevent duplicate applications
router.post("/apply", authenticate, async (req, res) => {
  try {
    const { bountyId, applicantId, message } = req.body;

    // 1. Check bounty exists
    const bounty = await prisma.bounty.findUnique({
      where: { id: bountyId },
    });
    if (!bounty) {
      return res.status(404).json({ error: "Bounty not found" });
    }

    // 2. Prevent applications if already assigned
    if (bounty.assignee) {
      return res.status(400).json({ error: "Bounty already assigned" });
    }

    // 3. Prevent self-application
    if (bounty.createdBy === applicantId) {
      return res.status(400).json({ error: "Cannot apply to your own bounty" });
    }

    // 4. Check for existing application (using the compound unique constraint)
    const existingApplication = await prisma.bountyApplication.findUnique({
      where: {
        bountyId_applicantId: {
          bountyId,
          applicantId,
        },
      },
    });

    if (existingApplication) {
      return res
        .status(400)
        .json({ error: "You have already applied to this bounty" });
    }

    // 5. Create new application
    const application = await prisma.bountyApplication.create({
      data: {
        bountyId,
        applicantId,
        message: message.trim(),
      },
      include: {
        bounty: {
          select: {
            id: true,
            title: true,
            bountyAmount: true,
          },
        },
        applicantUser: {
          select: { id: true, name: true, email: true },
        },
      },
    });

    res.status(201).json(application);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
