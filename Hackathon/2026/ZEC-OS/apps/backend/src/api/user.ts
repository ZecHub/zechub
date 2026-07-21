import { FastifyInstance, FastifyRequest } from 'fastify';
import { Prisma } from '@prisma/client';
import { prisma } from '../lib/prisma';

export async function getUser(req: FastifyRequest) {
  const auth = req.headers.authorization;
  if (!auth?.startsWith('Bearer ')) return null;
  const token = auth.slice(7);
  const session = await prisma.userSession.findUnique({ where: { token }, include: { user: true } });
  if (!session || session.expiresAt < new Date()) return null;
  if (session.revokedAt) return null; // superseded by a newer login for this user
  // Sessions are only issued after ownership verification, but old/stray
  // sessions for unverified users must not grant access either.
  if (!session.user.isVerified) return null;
  if (session.user.frozen === 'all') return null; // sysop-frozen: no access at all
  // Presence heartbeat — at most one write per user per minute
  if (Date.now() - session.lastSeenAt.getTime() > 60_000) {
    prisma.userSession.update({ where: { token }, data: { lastSeenAt: new Date() } }).catch(() => {});
  }
  return session.user;
}

export async function userRoutes(server: FastifyInstance) {
  server.get('/profile', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    return reply.send({
      address: user.address,
      displayName: user.displayName,
      isVerified: user.isVerified,
      createdAt: user.createdAt,
      hasPassword: Boolean(user.passwordHash),
    });
  });

  server.put<{ Body: { displayName?: string } }>('/profile', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const name = req.body?.displayName?.trim() || null;
    const nameKey = name?.toLowerCase() ?? null;
    if (nameKey) {
      const holder = await prisma.user.findUnique({ where: { nameKey } });
      if (holder && holder.id !== user.id)
        return reply.status(409).send({ error: 'That display name is already taken' });
    }
    try {
      const updated = await prisma.user.update({
        where: { id: user.id },
        data: { displayName: name, nameKey },
      });
      return reply.send({ address: updated.address, displayName: updated.displayName, isVerified: updated.isVerified });
    } catch {
      return reply.status(409).send({ error: 'That display name is already taken' });
    }
  });

  server.get('/settings', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const s = await prisma.userSettings.findUnique({ where: { userId: user.id } });
    return reply.send(s?.data ?? {});
  });

  server.put<{ Body: Record<string, unknown> }>('/settings', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const settingsData = (req.body ?? {}) as unknown as Prisma.InputJsonValue;
    await prisma.userSettings.upsert({
      where: { userId: user.id },
      create: { userId: user.id, data: settingsData },
      update: { data: settingsData },
    });
    return reply.send({ ok: true });
  });

  server.get('/watchlist', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const w = await prisma.userWatchlist.findUnique({ where: { userId: user.id } });
    return reply.send(w?.data ?? { addresses: [] });
  });

  server.put<{ Body: { addresses: unknown[] } }>('/watchlist', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const watchlistData = (req.body ?? { addresses: [] }) as unknown as Prisma.InputJsonValue;
    await prisma.userWatchlist.upsert({
      where: { userId: user.id },
      create: { userId: user.id, data: watchlistData },
      update: { data: watchlistData },
    });
    return reply.send({ ok: true });
  });


  server.get('/state', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const st = await prisma.userState.findUnique({ where: { userId: user.id } });
    return reply.send(st?.data ?? {});
  });

  server.put<{ Body: Record<string, unknown> }>('/state', async (req, reply) => {
    const user = await getUser(req);
    if (!user) return reply.status(401).send({ error: 'Unauthorized' });
    const stateData = (req.body ?? {}) as unknown as Prisma.InputJsonValue;
    await prisma.userState.upsert({
      where: { userId: user.id },
      create: { userId: user.id, data: stateData },
      update: { data: stateData },
    });
    return reply.send({ ok: true });
  });
}
