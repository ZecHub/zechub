import { Router } from 'express';
import jwt from 'jsonwebtoken';
import Bounty from '../models/Bounty';
import Submission from '../models/Submission';
import User from '../models/User';
import { ZcashService } from '../services/zcash.service';
import { calculatePrivacyScore, getPrivacyBadge } from '../services/privacyScore.service';

const router = Router();

// Get all bounties
router.get('/', async (req, res) => {
  try {
    const bounties = await Bounty.find().populate('creatorId', 'username avatar reputation');
    res.json(bounties);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// GET /api/bounties/submissions - Creator only
// NOTE: Must be defined BEFORE /:id to prevent Express matching 'submissions' as the :id param
router.get('/submissions', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.warn('Submissions fetch aborted: No authorization header found.');
      return res.status(401).json({ error: 'No token provided' });
    }

    const token = authHeader.split(' ')[1];
    if (!token) {
      console.warn('Submissions fetch aborted: Token split empty.');
      return res.status(401).json({ error: 'No token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const caller = await User.findById(decoded.userId);
    if (!caller || caller.role !== 'Creator') {
      console.warn(`Submissions fetch denied: Caller ${caller ? caller.username : 'null'} has role ${caller ? caller.role : 'none'} (Creator required)`);
      return res.status(403).json({ error: 'Access denied: Creator role required' });
    }

    console.log(`Submissions fetch by Creator ${caller.username}. Querying DB...`);

    // Step 1: Fetch all submissions with bountyId populated
    const rawSubmissions = await Submission.find().populate('bountyId');
    console.log(`Retrieved ${rawSubmissions.length} raw submissions from DB`);

    // Step 2: Filter to only this Creator's bounties
    const filtered = rawSubmissions.filter((sub: any) => {
      if (!sub.bountyId || !sub.bountyId.creatorId) return false;
      const targetCreatorId = sub.bountyId.creatorId._id
        ? sub.bountyId.creatorId._id.toString()
        : sub.bountyId.creatorId.toString();
      const isMatch = targetCreatorId === caller._id.toString();
      console.log(`Filter - Sub: ${sub._id}, Bounty: ${(sub.bountyId as any).title}, creatorId: ${targetCreatorId}, callerId: ${caller._id}, match: ${isMatch}`);
      return isMatch;
    });
    console.log(`Creator filter: ${rawSubmissions.length} → ${filtered.length} submissions`);

    // Step 3: Populate contributor info on filtered results only
    const populated = await Promise.all(
      filtered.map(async (sub: any) => {
        const contributor = await User.findById(sub.contributorId).select('username avatar email walletAddress reputation');
        return {
          _id: sub._id,
          bountyId: sub.bountyId,
          contributorId: contributor || sub.contributorId,
          link: sub.link,
          notes: sub.notes,
          status: sub.status,
          createdAt: sub.createdAt,
        };
      })
    );

    res.json(populated);
  } catch (error: any) {
    console.error('Fetch submissions error:', error?.message || error);
    console.error('Stack:', error?.stack);
    res.status(500).json({ error: 'Server error', detail: error?.message });
  }
});

// POST /api/bounties/submissions/:submissionId/approve - Creator only
router.post('/submissions/:submissionId/approve', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;
    const caller = await User.findById(decoded.userId);
    if (!caller || caller.role !== 'Creator') return res.status(403).json({ error: 'Access denied: Creator role required' });

    const submission = await Submission.findById(req.params.submissionId).populate('bountyId');
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    const bounty = submission.bountyId as any;
    const bountyCreatorId = bounty.creatorId?._id ? bounty.creatorId._id.toString() : bounty.creatorId?.toString();
    if (bountyCreatorId !== caller._id.toString()) {
      return res.status(403).json({ error: 'Access denied: You can only approve submissions for your own bounties' });
    }

    submission.status = 'Accepted';
    await submission.save();

    const bountyDoc = await Bounty.findById(bounty._id);
    if (bountyDoc) {
      bountyDoc.status = 'Completed';
      await bountyDoc.save();
    }

    console.log(`Submission ${submission._id} approved by ${caller.username}`);
    res.json({ message: 'Submission approved and bounty marked as Completed', submission });
  } catch (error: any) {
    console.error('Approve submission error:', error?.message || error);
    res.status(500).json({ error: 'Server error', detail: error?.message });
  }
});

// POST /api/bounties/submissions/:submissionId/reject - Creator only
router.post('/submissions/:submissionId/reject', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;
    const caller = await User.findById(decoded.userId);
    if (!caller || caller.role !== 'Creator') return res.status(403).json({ error: 'Access denied: Creator role required' });

    const submission = await Submission.findById(req.params.submissionId).populate('bountyId');
    if (!submission) return res.status(404).json({ error: 'Submission not found' });

    const bounty = submission.bountyId as any;
    const bountyCreatorId = bounty.creatorId?._id ? bounty.creatorId._id.toString() : bounty.creatorId?.toString();
    if (bountyCreatorId !== caller._id.toString()) {
      return res.status(403).json({ error: 'Access denied: You can only reject submissions for your own bounties' });
    }

    submission.status = 'Rejected';
    await submission.save();

    const bountyDoc = await Bounty.findById(bounty._id);
    if (bountyDoc) {
      bountyDoc.status = 'Open';
      bountyDoc.contributorId = undefined as any;
      await bountyDoc.save();
    }

    console.log(`Submission ${submission._id} rejected by ${caller.username}`);
    res.json({ message: 'Submission rejected. Bounty has been reopened.', submission });
  } catch (error: any) {
    console.error('Reject submission error:', error?.message || error);
    res.status(500).json({ error: 'Server error', detail: error?.message });
  }
});

// GET /api/bounties/:bountyId/my-submission - Freelancer only: check own submission status
// NOTE: Must be before /:id to avoid param collision
router.get('/:bountyId/my-submission', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });
    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;
    const submission = await Submission.findOne({
      bountyId: req.params.bountyId,
      contributorId: decoded.userId
    }).sort({ createdAt: -1 }); // Most recent submission

    if (!submission) return res.json(null);
    res.json(submission);
  } catch (error: any) {
    console.error('my-submission fetch error:', error?.message);
    res.status(500).json({ error: 'Server error' });
  }
});

// Get bounty by ID
router.get('/:id', async (req, res) => {
  try {
    const bounty = await Bounty.findById(req.params.id).populate('creatorId', 'username avatar reputation');
    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });
    res.json(bounty);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Create bounty
router.post('/', async (req, res) => {
  try {
    // In production, use auth middleware to get creatorId
    const { creatorId, title, description, reward, deadline, category, tags, skillsRequired } = req.body;

    const bounty = new Bounty({
      creatorId,
      title,
      description,
      reward,
      deadline,
      category,
      tags,
      skillsRequired,
    });

    await bounty.save();
    res.status(201).json(bounty);
  } catch (error) {
    console.error('Bounty creation error:', error);
    res.status(500).json({ error: 'Server error', details: error });
  }
});

// Fund bounty
router.post('/:id/fund', async (req, res) => {
  try {
    const { txHash, privacyLevel } = req.body;
    const bounty = await Bounty.findById(req.params.id);

    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });

    // Verify deposit using ZcashService
    const isValid = await ZcashService.verifyDeposit(txHash);
    if (!isValid) return res.status(400).json({ error: 'Invalid deposit transaction' });

    bounty.status = 'Open';
    bounty.fundingTxHash = txHash;
    bounty.privacyStatus.funding = privacyLevel || 'Transparent';

    // Recalculate privacy score
    bounty.privacyScore = calculatePrivacyScore(bounty.privacyStatus.funding, bounty.privacyStatus.payout);

    await bounty.save();
    res.json(bounty);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Select winner and execute shielded payout
router.post('/:id/payout', async (req, res) => {
  try {
    const { contributorAddress, amount, memo } = req.body;
    const bounty = await Bounty.findById(req.params.id);

    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });

    // Execute shielded transaction
    const txid = await ZcashService.sendShielded(contributorAddress, amount, memo);

    bounty.status = 'Completed';
    bounty.payoutTxHash = txid;
    bounty.privacyStatus.payout = 'Shielded'; // Assuming we strictly use shielded for payouts

    // Recalculate privacy score
    bounty.privacyScore = calculatePrivacyScore(bounty.privacyStatus.funding, bounty.privacyStatus.payout);

    await bounty.save();
    res.json({ message: 'Payout successful', txid, bounty });
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Submit work for a bounty
router.post('/:id/submit', async (req, res) => {
  try {
    const { contributorId, link, notes } = req.body;
    const bounty = await Bounty.findById(req.params.id);

    if (!bounty) return res.status(404).json({ error: 'Bounty not found' });

    // Create and save the Submission document
    const submission = new Submission({
      bountyId: bounty._id,
      contributorId,
      link,
      notes,
      status: 'Submitted'
    });
    await submission.save();

    // Update bounty status and assign contributor
    bounty.status = 'In Review';
    bounty.contributorId = contributorId;
    await bounty.save();

    res.json({ message: 'Submission successful', bounty, submission });
  } catch (error) {
    console.error('Submission error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

export default router;
