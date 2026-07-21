import crypto from 'crypto';

export function hashPassword(password: string): string {
  return crypto.createHash('sha256').update(password).digest('hex');
}

export function comparePassword(password: string, hashed: string): boolean {
  return hashPassword(password) === hashed;
}
