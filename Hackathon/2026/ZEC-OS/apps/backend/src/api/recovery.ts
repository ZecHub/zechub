// Account recovery via a one-time passcode (OTP).
//
// Threat model fixed here (vs. the insecure pattern this replaces):
//   - Code generation uses a CSPRNG, not Math.random()               (lib/otp)
//   - Only a salted one-way hash is persisted, never the raw code    (lib/otp)
//   - Verification is constant-time                                  (lib/otp)
//   - A hard per-code attempt cap + short TTL bound online brute force
//   - The code is NOT returned in any HTTP response — it is delivered
//     out-of-band as a shielded memo to the account's OWN address
//   - No wallet seed / recovery phrase is ever read or returned; success only
//     mints a short-lived recovery session that authorizes a password reset
//   - Responses do not reveal whether an account exists (no user enumeration)
//   - Codes are stored in the database, not process memory, so they survive
//     restarts and are consistent across instances
import { FastifyInstance } from 'fastify';
import { prisma } from '../lib/prisma';
import { walletConfigured, backendZaddr, zSendMany } from '../wallet/rpc';
import { revokeOtherSessions } from './auth';
import { generateOtp, hashOtp, verifyOtp, otpExpiry, MAX_OTP_ATTEMPTS } from '../lib/otp';

// A recovery session is deliberately short-lived: just long enough to set a new
// password via POST /api/auth/password (which honors via === 'challenge').
const RECOVERY_SESSION_MS = 15 * 60 * 1000;
const DUST_REPLY_ZEC = 0.0001;

// Generic reply for the start step — identical whether or not the account
// exists, so the endpoint cannot be used to enumerate accounts.
const START_OK = {
  ok: true,
  message: 'If an account matches, a recovery code was sent to its address.',
};

function isShieldedAddress(a: string) { return /^(u1|zs1)/.test(a.trim()); }

// ── Per-IP rate limiting (shared window for both recovery steps) ─────────────
const ipHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (hits.length >= 10) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

async function findUser(address?: string, name?: string) {
  if (address?.trim()) return prisma.user.findUnique({ where: { address: address.trim() } });
  if (name?.trim()) return prisma.user.findUnique({ where: { nameKey: name.trim().toLowerCase() } });
  return null;
}

export async function recoveryRoutes(server: FastifyInstance) {
  // Step 1 — request a recovery code. Always answers 200 with the same body.
  server.post<{ Body: { address?: string; name?: string } }>('/start', async (req, reply) => {
    const { address, name } = req.body ?? {};
    if (!address?.trim() && !name?.trim())
      return reply.status(400).send({ error: 'address or display name required' });
    if (rateLimited(req.ip))
      return reply.status(429).send({ error: 'Too many recovery attempts — try again later' });

    const user = await findUser(address, name);
    // Only deliver when there is a verified account reachable over the private
    // shielded memo channel. Every other case still returns START_OK so the
    // caller learns nothing about which accounts exist.
    if (user && user.isVerified && walletConfigured() && isShieldedAddress(user.address)) {
      // Single active code per account: burn any still-live codes first.
      await prisma.recoveryOtp.updateMany({
        where: { userId: user.id, consumedAt: null },
        data: { consumedAt: new Date() },
      });
      const code = generateOtp();
      const otp = await prisma.recoveryOtp.create({
        data: { userId: user.id, codeHash: hashOtp(code), expiresAt: otpExpiry() },
      });
      try {
        await zSendMany(backendZaddr(), [
          { address: user.address, amount: DUST_REPLY_ZEC, memo: `ZEC-OS recovery code: ${code}` },
        ]);
      } catch (e) {
        // Delivery failed — burn the code so a retry issues a fresh one.
        await prisma.recoveryOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
        server.log.warn({ err: e }, 'recovery code delivery failed');
      }
    }
    return reply.send(START_OK);
  });

  // Step 2 — redeem the code. On success, mints a short-lived recovery session.
  server.post<{ Body: { address?: string; name?: string; code?: string } }>('/verify-otp', async (req, reply) => {
    const { address, name, code } = req.body ?? {};
    if ((!address?.trim() && !name?.trim()) || !code?.trim())
      return reply.status(400).send({ error: 'address (or display name) and code required' });
    if (rateLimited(req.ip))
      return reply.status(429).send({ error: 'Too many recovery attempts — try again later' });

    const invalid = { error: 'Invalid or expired recovery code' };
    const user = await findUser(address, name);
    if (!user) return reply.status(401).send(invalid);

    const otp = await prisma.recoveryOtp.findFirst({
      where: { userId: user.id, consumedAt: null, expiresAt: { gt: new Date() } },
      orderBy: { createdAt: 'desc' },
    });
    if (!otp) return reply.status(401).send(invalid);

    if (otp.attempts >= MAX_OTP_ATTEMPTS) {
      await prisma.recoveryOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
      return reply.status(429).send({ error: 'Too many attempts — request a new recovery code' });
    }

    if (!verifyOtp(code.trim(), otp.codeHash)) {
      const updated = await prisma.recoveryOtp.update({
        where: { id: otp.id },
        data: { attempts: { increment: 1 } },
      });
      if (updated.attempts >= MAX_OTP_ATTEMPTS)
        await prisma.recoveryOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
      return reply.status(401).send(invalid);
    }

    // Success: consume the code and open a short recovery window. via:'challenge'
    // lets POST /api/auth/password set a new password without the old one.
    await prisma.recoveryOtp.update({ where: { id: otp.id }, data: { consumedAt: new Date() } });
    const session = await prisma.userSession.create({
      data: { userId: user.id, via: 'challenge', expiresAt: new Date(Date.now() + RECOVERY_SESSION_MS) },
    });
    const signedOutOthers = await revokeOtherSessions(user.id, session.token);
    return reply.send({
      ok: true,
      recovery: true,
      sessionId: session.token,
      address: user.address,
      expiresAt: session.expiresAt.getTime(),
      signedOutOthers,
    });
  });
}
