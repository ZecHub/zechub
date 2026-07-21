import { Router } from 'express';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import { hashPassword, comparePassword } from '../utils/crypto';

const router = Router();

import { exec } from 'child_process';

const generateSaplingAddress = (): Promise<string> => {
  return new Promise((resolve) => {
    if (process.env.USE_MOCK_ZCASH === 'true') {
      const randomHex = Array.from({ length: 24 }, () =>
        Math.floor(Math.random() * 16).toString(16)
      ).join('');
      resolve(`zs1mockaddresssapling2026${randomHex}`);
      return;
    }

    exec('zingo-cli address sapling', (error, stdout) => {
      if (error || !stdout) {
        const randomHex = Array.from({ length: 24 }, () =>
          Math.floor(Math.random() * 16).toString(16)
        ).join('');
        resolve(`zs1zingofallbacksapling2026${randomHex}`);
        return;
      }
      resolve(stdout.trim());
    });
  });
};

// Sign Up Route
router.post('/signup', async (req, res) => {
  try {
    const { username, email, password, role } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: 'Username, email, and password are required' });
    }

    const existingUser = await User.findOne({ $or: [{ email }, { username }] });
    if (existingUser) {
      return res.status(400).json({ error: 'Email or username already exists' });
    }

    const targetRole = role === 'Creator' ? 'Creator' : 'Freelancer';

    const user = new User({
      username,
      email,
      password: hashPassword(password),
      role: targetRole
    });

    await user.save();

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026',
      { expiresIn: '7d' }
    );

    res.status(201).json({ token, user, needsWallet: true });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: 'Email and password are required' });
    }

    const user = await User.findOne({ email });
    if (!user || !user.password || !comparePassword(password, user.password)) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Auto-migrate legacy "User" role → "Freelancer" on first login
    if ((user.role as string) === 'User') {
      user.role = 'Freelancer';
      await user.save();
      console.log(`Migrated user ${user.email} role from "User" → "Freelancer"`);
    }

    // Treat "User" as "Freelancer" for role validation (backward compat)
    const effectiveRole = (user.role as string) === 'User' ? 'Freelancer' : user.role;
    if (role && effectiveRole !== 'Admin' && effectiveRole !== role) {
      return res.status(400).json({ error: `Account is registered as a ${effectiveRole}, but you selected ${role}.` });
    }

    const token = jwt.sign(
      { userId: user._id, email: user.email, role: user.role },
      process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026',
      { expiresIn: '7d' }
    );

    res.json({ token, user, needsWallet: !user.walletAddress });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Fetch all users (Admin only)
router.get('/users', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const caller = await User.findById(decoded.userId);
    if (!caller || caller.role !== 'Admin') {
      return res.status(403).json({ error: 'Access denied: Admin role required' });
    }

    const users = await User.find({}, '-password');
    res.json(users);
  } catch (error) {
    console.error('Fetch users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

router.get('/me', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    res.json({ user });
  } catch (error) {
    res.status(401).json({ error: 'Invalid token' });
  }
});

router.post('/link-wallet', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const { walletAddress } = req.body;
    if (!walletAddress) {
      return res.status(400).json({ error: 'Wallet address is required' });
    }

    // Check if wallet address is already linked to another account
    const existing = await User.findOne({ walletAddress });
    if (existing && existing._id.toString() !== decoded.userId) {
      return res.status(400).json({ error: 'Wallet address is already linked to another user' });
    }

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    user.walletAddress = walletAddress;
    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error('Link wallet error:', error);
    res.status(401).json({ error: 'Invalid token or server error' });
  }
});

// Balance endpoint removed — now served exclusively via /api/zcash/balance/:address
// which uses the gRPC lightwalletd client (or mock mode)

router.put('/profile', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;

    const { username, bio, avatar } = req.body;

    const user = await User.findById(decoded.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    if (username) user.username = username;
    if (bio !== undefined) user.bio = bio;
    if (avatar !== undefined) user.avatar = avatar;

    await user.save();

    res.json({ success: true, user });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(401).json({ error: 'Invalid token or server error' });
  }
});

export default router;
