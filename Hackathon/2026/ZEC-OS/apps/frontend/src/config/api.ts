function requireEnv(name: string): string {
  const value = process.env[name];
  if (!value) throw new Error(`${name} is not configured`);
  return value;
}

export function getBaseUrl() {
  return requireEnv('BACKEND_URL');
}

export function getFastifyUrl() {
  return process.env.FASTIFY_URL || 'http://localhost:4000';
}

export function getApiHeaders(): HeadersInit {
  const key = process.env.API_SECRET_KEY || '';
  const headers: HeadersInit = {};
  if (key) headers['X-API-Key'] = key;
  return headers;
}

// Kept for any callers that reference API_CONFIG.baseUrl directly
export const API_CONFIG = {
  get baseUrl() { return getBaseUrl(); },
  get secretKey() { return process.env.API_SECRET_KEY || ''; },
};
