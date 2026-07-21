/**
 * @module zingolib-service
 * Lightweight Hono server wrapping ZingoLib for memo polling.
 */

import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { getRecentMemos, getBalance, isWalletSynced, getBlockHeight } from './wallet';

const app = new Hono();

// Middleware
app.use('*', cors());

// Auth middleware — validate internal API key
app.use('*', async (c, next) => {
  if (c.req.path === '/health') return next(); // Health is public
  const apiKey = c.req.header('X-API-Key');
  const expectedKey = process.env.ZINGOLIB_API_KEY;
  if (expectedKey && apiKey !== expectedKey) {
    return c.json({ error: 'Unauthorized' }, 401);
  }
  return next();
});

// GET /health — Service health check
app.get('/health', async (c) => {
  const synced = await isWalletSynced();
  const blockHeight = await getBlockHeight();
  return c.json({ status: 'ok', synced, block_height: blockHeight });
});

// GET /memos — Recent shielded memos
app.get('/memos', async (c) => {
  const sinceParam = c.req.query('since');
  const since = sinceParam ? new Date(sinceParam) : undefined;
  const memos = await getRecentMemos(since);
  return c.json({ memos });
});

// GET /balance — Wallet balance
app.get('/balance', async (c) => {
  const balance = await getBalance();
  return c.json(balance);
});

import { serve } from '@hono/node-server';

const port = parseInt(process.env.PORT || '3001', 10);
console.log(`[ZingoLib Service] Starting on port ${port}`);

serve({
  fetch: app.fetch,
  port,
});

export default app;
