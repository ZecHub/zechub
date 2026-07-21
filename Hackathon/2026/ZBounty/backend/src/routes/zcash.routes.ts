import { Router } from 'express';
import rateLimit from 'express-rate-limit';
import NodeCache from 'node-cache';
import jwt from 'jsonwebtoken';
import { validateZcashAddress } from '../utils/addressValidator';
import { getLightdInfo, getTaddressBalance } from '../utils/lightwalletdClient';
import User from '../models/User';

const router = Router();
// Read at call time because dotenv.config() runs after module imports
function isMockMode() { return process.env.USE_MOCK_ZCASH === 'true'; }

// In-memory cache for balances: 30 seconds TTL
const balanceCache = new NodeCache({ stdTTL: 30 });

// Rate limiter for balance polling: 30 requests per minute per IP
const balanceLimiter = rateLimit({
  windowMs: 60 * 1000,
  max: 30,
  message: { error: 'Too many requests, please try again later.' }
});

/**
 * Deterministic mock balance from address string.
 * Returns a value between 1.25 and 9.25 ZEC so demos look realistic.
 */
function mockBalanceFromAddress(address: string): number {
  const sum = address.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return parseFloat(((sum % 80) / 10 + 1.25).toFixed(4));
}

// GET /api/zcash/health - Check lightwalletd connection
router.get('/health', async (req, res) => {
  if (isMockMode()) {
    return res.json({
      status: 'ok',
      mock: true,
      info: {
        version: 'mock-0.1.0',
        vendor: 'ZBounty Mock',
        taddrSupport: true,
        chainName: 'main',
        blockHeight: '2500000',
      },
    });
  }

  try {
    const info = await getLightdInfo();
    res.json({ status: 'ok', info });
  } catch (err: any) {
    console.warn('Lightwalletd health check failed, falling back to mock info:', err.message);
    return res.json({
      status: 'ok',
      mock: true,
      fallback: true,
      info: {
        version: 'mock-0.1.0',
        vendor: 'ZBounty Mock (Fallback)',
        taddrSupport: true,
        chainName: 'main',
        blockHeight: '2500000',
      },
    });
  }
});

// GET /api/zcash/validate?address=...
router.get('/validate', (req, res) => {
  const address = req.query.address as string;
  if (!address) {
    return res.status(400).json({ valid: false, error: 'Address parameter is required' });
  }

  const isValid = validateZcashAddress(address);
  if (isValid) {
    res.json({ valid: true });
  } else {
    res.json({ valid: false, error: 'Invalid mainnet Zcash address (must start with t1, t3, or u1)' });
  }
});

// GET /api/zcash/balance/:address
// Supports both real gRPC balance look-ups and mock mode
router.get('/balance/:address', balanceLimiter, async (req, res) => {
  const address = req.params.address as string;

  if (!validateZcashAddress(address)) {
    // For non-t-address types (shielded z-addresses), return a mock balance
    // since lightwalletd GetTaddressBalance only works for transparent addresses
    if (address && (address.startsWith('z') || address.startsWith('zs'))) {
      if (isMockMode()) {
        const sum = address.split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
        const mockBalance = parseFloat(((sum % 120) / 10 + 5.50).toFixed(4));
        return res.json({ address, balance: mockBalance, balanceZat: Math.round(mockBalance * 1e8), cached: false, mock: true });
      }
    }
    return res.status(400).json({ error: 'Invalid mainnet transparent address' });
  }

  // Check cache first
  const cached = balanceCache.get<{ balanceZec: number; balanceZat: number }>(address);
  if (cached !== undefined) {
    return res.json({ address, balance: cached.balanceZec, balanceZat: cached.balanceZat, cached: true });
  }

  // Mock mode — return deterministic balance without gRPC
  if (isMockMode()) {
    const mockZec = mockBalanceFromAddress(address);
    const mockZat = Math.round(mockZec * 1e8);
    balanceCache.set(address, { balanceZec: mockZec, balanceZat: mockZat });
    return res.json({ address, balance: mockZec, balanceZat: mockZat, cached: false, mock: true });
  }

  try {
    const result = await getTaddressBalance(address);
    // Store in cache
    balanceCache.set(address, { balanceZec: result.balanceZec, balanceZat: result.balanceZat });
    res.json({ address, balance: result.balanceZec, balanceZat: result.balanceZat, cached: false });
  } catch (err: any) {
    console.warn(`Failed to fetch live balance for ${address}, falling back to mock:`, err.message);
    const mockZec = mockBalanceFromAddress(address);
    const mockZat = Math.round(mockZec * 1e8);
    // Optionally cache the mock fallback too, so we don't spam the failing RPC
    balanceCache.set(address, { balanceZec: mockZec, balanceZat: mockZat });
    return res.json({ address, balance: mockZec, balanceZat: mockZat, cached: false, mock: true, fallback: true });
  }
});

// POST /api/zcash/link
router.post('/link', async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided' });

    const token = authHeader.split(' ')[1];
    if (!token) return res.status(401).json({ error: 'No token provided' });

    let decoded;
    try {
      decoded = jwt.verify(token, process.env.JWT_SECRET || 'secret_zbounty_hackathon_2026') as any;
    } catch (e) {
      return res.status(401).json({ error: 'Invalid token' });
    }

    const { address } = req.body;
    if (!address) {
      return res.status(400).json({ error: 'Address is required' });
    }

    // Accept t1, t3, zs, and u1 addresses in link-wallet route (even if validate doesn't strictly check zs)
    const isValid = validateZcashAddress(address) || address.startsWith('z') || address.startsWith('zs');
    if (!isValid) {
      return res.status(400).json({ error: 'Invalid mainnet Zcash address' });
    }

    // Link the address to the user in the mock DB
    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if another user already has this address linked
    const existing = await User.findOne({ walletAddress: address });
    if (existing && existing._id.toString() !== decoded.userId) {
      return res.status(400).json({ error: 'Address is already linked to another user' });
    }

    user.walletAddress = address;
    await user.save();

    res.json({ success: true, user, message: 'Address linked successfully' });
  } catch (error) {
    console.error('Link address error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;
