import { Hono } from 'hono';
import { serve } from '@hono/node-server';
import { cors } from 'hono/cors';
import dotenv from 'dotenv';

if (process.env.NODE_ENV !== 'production') {
  dotenv.config({ path: '.env.development.local' });
}

// Routes
import ethAccount from './routes/ethAccount';
import agentAccount from './routes/agentAccount';
import transaction from './routes/transaction';
import jobs from './routes/jobs';

// Scheduler
import { startScheduler } from './scheduler';

const app = new Hono();
app.use(cors());

// Health
app.get('/', (c) => c.json({ message: 'App is running' }));

// Mount routes
app.route('/api/eth-account', ethAccount);
app.route('/api/agent-account', agentAccount);
app.route('/api/transaction', transaction);
app.route('/api/jobs', jobs);

// Start server
const port = Number(process.env.PORT || '3000');
console.log(`App is running on port ${port}`);
startScheduler(); // <<< start the minute-accurate worker

serve({ fetch: app.fetch, port });
