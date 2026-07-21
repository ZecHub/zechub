import { FastifyInstance } from 'fastify';
import crypto from 'crypto';
import { prisma } from '../lib/prisma';
import { getLightdInfo, getLatestBlock, getAddressUtxos } from '../zaino/client';
import { getSenderAddresses, txidBufferToHex } from '../lib/txSender';
import { walletConfigured, backendZaddr, zListReceivedByAddress, zSendMany, decodeMemoHex } from '../wallet/rpc';
import { hashPassword, verifyPassword, MIN_PASSWORD_LENGTH } from '../lib/password';

const ZEC_ADDR_RE = /^(t1|t3|u1|zs1)[a-zA-Z0-9]{30,}/;
function isValidZecAddress(a: string) { return ZEC_ADDR_RE.test(a.trim()); }
function isShieldedAddress(a: string) { return /^(u1|zs1)/.test(a.trim()); }
function generateNonce() { return crypto.randomBytes(16).toString('hex'); }
function generateCode() { return String(crypto.randomInt(100000, 1000000)); }
function uniqueValueZat() { return 10000 + Math.floor(Math.random() * 90000); }
function sessionExpiry() {
  const h = parseInt(process.env.SESSION_EXPIRY_HOURS || '24'); // sessions time out after 24h
  return new Date(Date.now() + h * 3600 * 1000);
}

const CHALLENGE_TTL_MS = 15 * 60 * 1000;
const DUST_REPLY_ZEC = 0.0001;
const MAX_CODE_TRIES = 5;

// ── In-memory rate limiting ──────────────────────────────────────────────────
const ipHits = new Map<string, number[]>();
function rateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = (ipHits.get(ip) ?? []).filter((t) => now - t < 3600_000);
  if (hits.length >= 10) return true;
  hits.push(now);
  ipHits.set(ip, hits);
  return false;
}

async function tooManyOpenChallenges(userId: string): Promise<boolean> {
  const open = await prisma.authChallenge.count({
    where: { userId, verified: false, expiresAt: { gt: new Date() } },
  });
  return open >= 3;
}

// Single-session policy: the newest login supersedes all older live sessions for
// the same user (kills copy-paste-token cheating / concurrent instances).
const ACTIVE_SESSION_MS = 90 * 1000; // "logged in elsewhere" only counts sessions seen this recently

export async function revokeOtherSessions(userId: string, keepToken: string): Promise<number> {
  const now = new Date();
  // Count ONLY other sessions that were genuinely active recently (open tabs
  // heartbeat via getUser / the /session poll). Stale, abandoned, or long-closed
  // tokens are NOT counted — so we don't falsely claim we "logged you out
  // elsewhere" when nothing was actually live.
  const activeCount = await prisma.userSession.count({
    where: {
      userId, token: { not: keepToken }, revokedAt: null,
      expiresAt: { gt: now }, lastSeenAt: { gt: new Date(now.getTime() - ACTIVE_SESSION_MS) },
    },
  });
  // Still revoke ALL other live sessions (security — one active session per user).
  await prisma.userSession.updateMany({
    where: { userId, token: { not: keepToken }, revokedAt: null, expiresAt: { gt: now } },
    data: { revokedAt: now, revokedReason: 'signed_in_elsewhere' },
  });
  return activeCount;
}

async function issueVerifiedSession(userId: string, challengeId: string) {
  const session = await prisma.userSession.create({ data: { userId, via: 'challenge', expiresAt: sessionExpiry() } });
  await prisma.authChallenge.update({
    where: { id: challengeId },
    data: { verified: true, status: 'verified', sessionId: session.token },
  });
  await prisma.user.update({ where: { id: userId }, data: { isVerified: true } });
  const signedOutOthers = await revokeOtherSessions(userId, session.token);
  return { session, signedOutOthers };
}

export async function authRoutes(server: FastifyInstance) {
  // Explicit logout — delete this session so it doesn't linger as a "live"
  // session and get miscounted as a signed-out-elsewhere on the next login.
  server.post('/logout', async (req, reply) => {
    const authHdr = req.headers.authorization;
    const token = authHdr?.startsWith('Bearer ') ? authHdr.slice(7) : null;
    if (token) await prisma.userSession.deleteMany({ where: { token } });
    return reply.send({ ok: true });
  });

  // Session liveness — the client polls this to learn if it was signed out by a
  // newer login elsewhere (vs merely expired), so it can show the right message.
  server.get('/session', async (req, reply) => {
    const authHdr = req.headers.authorization;
    const token = authHdr?.startsWith('Bearer ') ? authHdr.slice(7) : null;
    if (!token) return reply.send({ valid: false, reason: 'no_token' });
    const session = await prisma.userSession.findUnique({ where: { token } });
    if (!session) return reply.send({ valid: false, reason: 'unknown' });
    if (session.revokedAt) return reply.send({ valid: false, reason: session.revokedReason ?? 'revoked' });
    if (session.expiresAt < new Date()) return reply.send({ valid: false, reason: 'expired' });
    // Heartbeat: keep this (open, polling) tab marked as recently active, so a
    // later login elsewhere correctly recognizes it as a live session.
    if (Date.now() - session.lastSeenAt.getTime() > 30_000) {
      prisma.userSession.update({ where: { token }, data: { lastSeenAt: new Date() } }).catch(() => {});
    }
    return reply.send({ valid: true });
  });

  // NOTE: POST /address (unverified session issuance) was removed deliberately.
  // Identity without proof of ownership is a client-side "local profile" only.

  server.post<{ Body: { address: string; displayName?: string } }>('/challenge', async (req, reply) => {
    const { address, displayName } = req.body ?? {};
    if (!address || !isValidZecAddress(address))
      return reply.status(400).send({ error: 'Invalid Zcash address' });

    if (rateLimited(req.ip))
      return reply.status(429).send({ error: 'Too many verification attempts — try again later' });

    const shielded = isShieldedAddress(address);
    if (shielded && !walletConfigured())
      return reply.status(501).send({ error: 'Shielded verification not configured on this server' });

    const toAddress = shielded ? backendZaddr() : process.env.BACKEND_TADDR;
    if (!toAddress) return reply.status(503).send({ error: 'Payment receiving address not configured' });

    const name = displayName?.trim() || null;
    const nameKey = name?.toLowerCase() ?? null;
    if (nameKey) {
      const holder = await prisma.user.findUnique({ where: { nameKey } });
      if (holder && holder.address !== address.trim())
        return reply.status(409).send({ error: 'That display name is already taken' });
    }

    let user;
    try {
      user = await prisma.user.upsert({
        where: { address: address.trim() },
        create: { address: address.trim(), displayName: name, nameKey },
        update: name ? { displayName: name, nameKey } : {},
      });
    } catch {
      // Unique-constraint race on nameKey
      return reply.status(409).send({ error: 'That display name is already taken' });
    }

    if (await tooManyOpenChallenges(user.id))
      return reply.status(429).send({ error: 'Too many open challenges for this address' });

    const nonce = generateNonce();
    const valueZat = uniqueValueZat();
    const valueZEC = (valueZat / 100_000_000).toFixed(8);
    const expiresAt = new Date(Date.now() + CHALLENGE_TTL_MS);
    const memoText = `zec-os-auth-${nonce}`;
    const zip321 = shielded
      ? `zcash:${toAddress}?amount=${valueZEC}&memo=${Buffer.from(memoText, 'utf8').toString('base64url')}`
      : `zcash:${toAddress}?amount=${valueZEC}&memo=zec-os-auth-${nonce.slice(0, 8)}`;

    await prisma.authChallenge.create({
      data: { nonce, userId: user.id, kind: shielded ? 'shielded' : 'taddr', valueZat, toAddress, zip321, expiresAt },
    });
    return reply.send({
      nonce, valueZat, valueZEC, toAddress, zip321,
      kind: shielded ? 'shielded' : 'taddr',
      memoText: shielded ? memoText : undefined,
      expiresAt: expiresAt.getTime(),
    });
  });

  server.get<{ Params: { nonce: string } }>('/verify/:nonce', async (req, reply) => {
    const challenge = await prisma.authChallenge.findUnique({
      where: { nonce: req.params.nonce },
      include: { user: true },
    });
    if (!challenge) return reply.status(404).send({ error: 'Challenge not found' });
    if (new Date() > challenge.expiresAt) return reply.status(410).send({ error: 'Challenge expired' });

    if (challenge.verified && challenge.sessionId)
      return reply.send({ ok: true, verified: true, sessionId: challenge.sessionId, address: challenge.user.address });

    // ── Shielded flow: watch for the funding memo, then send the code back ──
    if (challenge.kind === 'shielded') {
      if (challenge.status === 'code_sent')
        return reply.send({ ok: true, verified: false, status: 'code_sent' });
      // Code send in flight (quicksend takes tens of seconds) — polls must NOT
      // fall through and mint another code, or the memo already on its way
      // won't match the DB.
      if (challenge.status === 'funded')
        return reply.send({ ok: true, verified: false, status: 'pending' });

      try {
        const notes = await zListReceivedByAddress(backendZaddr(), 1);
        const marker = `zec-os-auth-${challenge.nonce}`;
        const funded = notes.find((n) => decodeMemoHex(n.memo).includes(marker));
        if (funded) {
          const code = generateCode();
          // Atomic claim: of any concurrent polls, exactly one transitions
          // pending → funded and owns sending the code.
          const claimed = await prisma.authChallenge.updateMany({
            where: { id: challenge.id, status: 'pending' },
            data: { status: 'funded', fundedTxid: funded.txid, code },
          });
          if (claimed.count !== 1)
            return reply.send({ ok: true, verified: false, status: 'pending' });
          try {
            await zSendMany(backendZaddr(), [
              { address: challenge.user.address, amount: DUST_REPLY_ZEC, memo: `ZEC-OS verification code: ${code}` },
            ]);
          } catch (sendErr) {
            // No memo went out — release the claim so a later poll retries.
            await prisma.authChallenge.update({ where: { id: challenge.id }, data: { status: 'pending', code: null } });
            throw sendErr;
          }
          await prisma.authChallenge.update({ where: { id: challenge.id }, data: { status: 'code_sent' } });
          return reply.send({ ok: true, verified: false, status: 'code_sent' });
        }
      } catch (e) {
        server.log.warn({ err: e }, 'Wallet RPC check failed');
      }
      return reply.send({ ok: true, verified: false, status: 'pending' });
    }

    // ── Transparent flow: amount match + sender check ────────────────────────
    try {
      const utxos = await getAddressUtxos([challenge.toAddress]);
      const match = utxos.find((u) => u.valueZat === challenge.valueZat);
      if (match) {
        const txidHex = txidBufferToHex(match.txid);
        let senders = await getSenderAddresses(txidHex);
        if (senders === null) {
          // Byte-order fallback: some sources return txids already in display order
          senders = await getSenderAddresses(Buffer.from(match.txid).toString('hex'));
        }
        if (senders === null) {
          server.log.warn({ txid: txidHex }, 'Sender resolution failed — withholding verification');
          return reply.send({ ok: true, verified: false, status: 'pending' });
        }
        if (!senders.has(challenge.user.address)) {
          server.log.warn({ txid: txidHex, claimed: challenge.user.address }, 'Challenge paid from a different address — rejected');
          return reply.status(409).send({
            error: 'Payment received, but not from the address being verified. Send from the claimed address.',
            verified: false,
          });
        }
        await prisma.authChallenge.update({ where: { id: challenge.id }, data: { fundedTxid: txidHex } });
        const { session, signedOutOthers } = await issueVerifiedSession(challenge.userId, challenge.id);
        return reply.send({ ok: true, verified: true, sessionId: session.token, address: challenge.user.address, signedOutOthers });
      }
    } catch (e) {
      server.log.warn({ err: e }, 'Zaino UTXO query failed');
    }
    return reply.send({ ok: true, verified: false, status: 'pending' });
  });

  server.post<{ Body: { nonce: string; code: string } }>('/verify-code', async (req, reply) => {
    const { nonce, code } = req.body ?? {};
    if (!nonce || !code) return reply.status(400).send({ error: 'nonce and code required' });

    const challenge = await prisma.authChallenge.findUnique({ where: { nonce }, include: { user: true } });
    if (!challenge) return reply.status(404).send({ error: 'Challenge not found' });
    if (new Date() > challenge.expiresAt) return reply.status(410).send({ error: 'Challenge expired' });
    if (challenge.kind !== 'shielded' || challenge.status !== 'code_sent')
      return reply.status(409).send({ error: 'Challenge is not awaiting a code' });
    if (challenge.codeTries >= MAX_CODE_TRIES)
      return reply.status(429).send({ error: 'Too many attempts — start a new verification' });

    if (challenge.code !== code.trim()) {
      await prisma.authChallenge.update({ where: { id: challenge.id }, data: { codeTries: { increment: 1 } } });
      const left = MAX_CODE_TRIES - challenge.codeTries - 1;
      return reply.status(401).send({ error: `Incorrect code — ${left} attempt${left === 1 ? '' : 's'} left` });
    }

    const { session, signedOutOthers } = await issueVerifiedSession(challenge.userId, challenge.id);
    return reply.send({ ok: true, verified: true, sessionId: session.token, address: challenge.user.address, signedOutOthers });
  });

  // Live display-name availability. `address` lets a user keep their own name.
  server.get<{ Querystring: { name?: string; address?: string } }>('/name-check', async (req, reply) => {
    const name = (req.query?.name ?? '').trim();
    if (!name) return reply.send({ available: false });
    const holder = await prisma.user.findUnique({ where: { nameKey: name.toLowerCase() } });
    const requester = (req.query?.address ?? '').trim();
    return reply.send({ available: !holder || (requester !== '' && holder.address === requester) });
  });

  // ── Password login: verified accounts skip the dust challenge on new devices ──
  // Identified by verified address OR unique display name.
  server.post<{ Body: { address?: string; name?: string; password: string } }>('/login', async (req, reply) => {
    const { address, name, password } = req.body ?? {};
    if ((!address?.trim() && !name?.trim()) || !password)
      return reply.status(400).send({ error: 'display name (or address) and password required' });
    if (rateLimited(req.ip))
      return reply.status(429).send({ error: 'Too many attempts — try again later' });

    const user = address?.trim()
      ? await prisma.user.findUnique({ where: { address: address.trim() } })
      : await prisma.user.findUnique({ where: { nameKey: name!.trim().toLowerCase() } });
    if (!user || !user.isVerified)
      return reply.status(401).send({ error: 'No verified account found — verify ownership first' });
    if (!user.passwordHash)
      return reply.status(409).send({ error: 'No password set for this account — verify ownership, then set one in Account' });
    if (!verifyPassword(password, user.passwordHash))
      return reply.status(401).send({ error: 'Incorrect password' });
    if (user.frozen === 'all')
      return reply.status(403).send({ error: 'Account frozen by the sysop.' });

    const session = await prisma.userSession.create({ data: { userId: user.id, expiresAt: sessionExpiry() } });
    const signedOutOthers = await revokeOtherSessions(user.id, session.token);
    return reply.send({ ok: true, verified: true, sessionId: session.token, address: user.address, displayName: user.displayName, signedOutOthers });
  });

  // Set or change the password. Requires a live verified session. Changing an
  // existing password requires the current one — unless this session came from
  // a fresh ownership verification, which outranks a password (= forgot-password
  // reset: re-verify with your address, then set a new password).
  server.post<{ Body: { currentPassword?: string; newPassword: string } }>('/password', async (req, reply) => {
    const authHdr = req.headers.authorization;
    const token = authHdr?.startsWith('Bearer ') ? authHdr.slice(7) : null;
    const session = token
      ? await prisma.userSession.findUnique({ where: { token }, include: { user: true } })
      : null;
    if (!session || session.expiresAt < new Date() || !session.user.isVerified)
      return reply.status(401).send({ error: 'Unauthorized' });
    const user = session.user;

    const { currentPassword, newPassword } = req.body ?? {};
    if (!newPassword || newPassword.length < MIN_PASSWORD_LENGTH)
      return reply.status(400).send({ error: `Password must be at least ${MIN_PASSWORD_LENGTH} characters` });
    if (user.passwordHash && session.via !== 'challenge' && !verifyPassword(currentPassword ?? '', user.passwordHash))
      return reply.status(401).send({ error: 'Current password is incorrect' });

    await prisma.user.update({ where: { id: user.id }, data: { passwordHash: hashPassword(newPassword) } });
    return reply.send({ ok: true });
  });

  server.get('/zaino-status', async (_req, reply) => {
    try {
      const [info, block] = await Promise.all([getLightdInfo(), getLatestBlock()]);
      return reply.send({ ok: true, chain: info.chainName, blockHeight: block.height });
    } catch (e: any) {
      return reply.status(503).send({ ok: false, error: e?.message ?? 'Zaino unreachable' });
    }
  });
}
