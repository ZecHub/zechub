import type { FastifyInstance } from 'fastify';
import type { ServerConfig } from '@zec-os/shared';

export async function configRoutes(server: FastifyInstance) {
  server.get('/', async () => {
    const config: ServerConfig = {
      gamblingMode: (process.env.GAMBLING_MODE as ServerConfig['gamblingMode']) || 'off',
      characterCreationFeeZatoshis: parseInt(process.env.CHARACTER_CREATION_FEE || '1000000'),
      weeklyEntryFeeZatoshis: parseInt(process.env.WEEKLY_ENTRY_FEE || '1000000'),
    };
    return config;
  });
}
