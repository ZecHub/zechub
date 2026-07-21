import Fastify from 'fastify';
import cors from '@fastify/cors';
import { registerRoutes } from './api/routes';
import { startPaymentWatcher } from './payment/watcher';

const server = Fastify({ logger: true });

async function main() {
  await server.register(cors, { origin: true });

  registerRoutes(server);

  const port = parseInt(process.env.PORT || '4000');
  await server.listen({ port, host: '0.0.0.0' });

  // Start background services
  startPaymentWatcher();

  if (process.env.GAMBLING_MODE === 'live' || process.env.GAMBLING_MODE === 'test') {
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
