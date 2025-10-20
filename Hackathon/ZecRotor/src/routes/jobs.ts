import { Hono } from 'hono';
import { state, nowEpoch, Job } from '../state';
import { agentAccountId } from "@neardefi/shade-agent-js";
import { MAIN_NEAR_ACOUNT } from '../config';


const app = new Hono();

const makeDepositAddress = (jobId: string) =>
  `demo-deposit-${jobId.slice(0, 8)}-${Math.floor(Math.random() * 1e6)}`;

const uuid = () =>
  (globalThis as any).crypto?.randomUUID
    ? (globalThis as any).crypto.randomUUID()
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    : require('crypto').randomUUID();

function pickJobView(job: Job) {
  const {
    job_id,
    sender_address,
    sending_token,
    destination_address,
    destination_token,
    execute_at_epoch,
    deposit_address,
    status,
    events,
    created_at_epoch,
    updated_at_epoch,
  } = job;
  return {
    job_id,
    sender_address,
    sending_token,
    destination_address,
    destination_token,
    execute_at_epoch,
    deposit_address,
    status,
    events,
    created_at_epoch,
    updated_at_epoch,
  };
}

function validateCreate(body: any) {
  const errors: string[] = [];
  const req = ['senderAddress', 'sourceAsset', 'destinationAddress', 'destinationAsset', 'releaseAt'];
  for (const f of req) if (!(f in body)) errors.push(`Missing field: ${f}`);
  const epoch = Math.floor(new Date(body?.releaseAt).getTime() / 1000);
  if (!Number.isFinite(epoch)) errors.push("releaseAt must be a valid date");
  if (epoch < nowEpoch() - 60) errors.push("releaseAt is in the past (>60s)");
  return errors; 
}

// POST /api/jobs
app.post('/', async (c) => {
  const body = await c.req.json().catch(() => ({}));
  const errors = validateCreate(body);
  if (errors.length) return c.json({ errors }, 400);

  const job_id = uuid();
  const deposit_address = MAIN_NEAR_ACOUNT;
  const ts = nowEpoch();
  
  const job: Job = {
    job_id,
    sender_address: String(body.senderAddress),
    sending_token: String(body.sourceAsset).toUpperCase(),
    destination_address: String(body.destinationAddress),
    destination_token: String(body.destinationAsset).toUpperCase(),
    execute_at_epoch: Number(body.execute_at_epoch),
    deposit_address,
    amount: Number(body.amount),
    status: 'PENDING_DEPOSIT',
    events: [
      { ts_epoch: ts, type: 'JOB_CREATED', payload: {} },
      { ts_epoch: ts, type: 'DEPOSIT_ADDRESS_ISSUED', payload: { deposit_address } },
    ],
    created_at_epoch: ts,
    updated_at_epoch: ts,
  };

  state.jobs.push(job);
  console.log(job);  // debug and remove
  
  return c.json(
    {
      job_id: job.job_id,
      deposit_address: job.deposit_address,
      execute_at_epoch: job.execute_at_epoch,
      amount: job.amount,
      status: job.status,
    },
    201
  );
});

// GET /api/jobs
app.get('/', (c) => {
  const list = state.jobs.slice().sort((a, b) => b.created_at_epoch - a.created_at_epoch).map(pickJobView);
  return c.json({ count: list.length, jobs: list });
});

// GET /api/jobs/:id
app.get('/:id', (c) => {
  const id = c.req.param('id');
  const job = state.jobs.find((j) => j.job_id === id);
  if (!job) return c.json({ error: 'job not found' }, 404);
  return c.json(pickJobView(job));
});

// POST /api/jobs/:id/fake-deposit
app.post('/:id/fake-deposit', async (c) => {
  const id = c.req.param('id');
  const job = state.jobs.find((j) => j.job_id === id);
  if (!job) return c.json({ error: 'job not found' }, 404);

  const body = (await c.req.json().catch(() => ({}))) as {
    from_address?: string;
    amount?: string | number;
    token?: string;
  };

  const ts = nowEpoch();
  job.events.push({
    ts_epoch: ts,
    type: 'DEPOSIT_RECEIVED_FAKE',
    payload: {
      from_address: body.from_address || job.sender_address,
      amount: String(body.amount ?? '0.00'),
      token: (body.token || job.sending_token).toUpperCase(),
    },
  });
  job.updated_at_epoch = ts;

  return c.json({ ok: true, job: pickJobView(job) });
});

export default app;
