import type { FastifyInstance } from 'fastify';
import { configRoutes } from './config';
import { authRoutes } from './auth';
import { userRoutes } from './user';

export function registerRoutes(server: FastifyInstance) {
  server.register(configRoutes, { prefix: '/api/config' });
  server.register(authRoutes, { prefix: '/api/auth' });
  server.register(userRoutes, { prefix: '/api/user' });
  // NOTE: legacy characterRoutes/leaderboardRoutes (passphrase-based Character
  // identity) are retired — the RPG tournament is keyed to verified Users via
  // /api/rpg. Files remain on disk; tables untouched.
}
