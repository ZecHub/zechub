import { describe, it, expect } from 'vitest';
import { deriveZkProofHash, hashIp, safeCompare } from '@/lib/zk';

describe('deriveZkProofHash', () => {
  const args = {
    challenge_id: 'a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d',
    tx_id: 'tx123456',
    nonce: 'nonce123',
    app_id: 'app-001',
  };

  it('returns a 64-character hex string', () => {
    const hash = deriveZkProofHash(args.challenge_id, args.tx_id, args.nonce, args.app_id);
    expect(hash).toHaveLength(64);
    expect(/^[0-9a-f]{64}$/.test(hash)).toBe(true);
  });

  it('produces same hash for same inputs (deterministic)', () => {
    const h1 = deriveZkProofHash(args.challenge_id, args.tx_id, args.nonce, args.app_id);
    const h2 = deriveZkProofHash(args.challenge_id, args.tx_id, args.nonce, args.app_id);
    expect(h1).toBe(h2);
  });

  it('produces different hash for different app_id (app isolation)', () => {
    const h1 = deriveZkProofHash(args.challenge_id, args.tx_id, args.nonce, 'app-001');
    const h2 = deriveZkProofHash(args.challenge_id, args.tx_id, args.nonce, 'app-002');
    expect(h1).not.toBe(h2);
  });

  it('produces different hash for different tx_id', () => {
    const h1 = deriveZkProofHash(args.challenge_id, 'tx-aaa', args.nonce, args.app_id);
    const h2 = deriveZkProofHash(args.challenge_id, 'tx-bbb', args.nonce, args.app_id);
    expect(h1).not.toBe(h2);
  });
});

describe('hashIp', () => {
  it('returns a 64-character hex string', () => {
    const hash = hashIp('192.168.1.1');
    expect(hash).toHaveLength(64);
    expect(/^[0-9a-f]{64}$/.test(hash)).toBe(true);
  });

  it('produces same hash for same IP (deterministic)', () => {
    expect(hashIp('10.0.0.1')).toBe(hashIp('10.0.0.1'));
  });

  it('produces different hash for different IPs', () => {
    expect(hashIp('10.0.0.1')).not.toBe(hashIp('10.0.0.2'));
  });
});

describe('safeCompare', () => {
  it('returns true for equal strings', () => {
    expect(safeCompare('hello', 'hello')).toBe(true);
  });

  it('returns false for different strings', () => {
    expect(safeCompare('hello', 'world')).toBe(false);
  });

  it('returns false for different length strings', () => {
    expect(safeCompare('short', 'longer string')).toBe(false);
  });
});
