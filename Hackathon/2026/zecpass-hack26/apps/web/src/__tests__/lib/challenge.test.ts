import { describe, it, expect } from 'vitest';
import { buildMemoPayload, parseMemoPayload } from '@/lib/challenge';

describe('buildMemoPayload', () => {
  it('produces correct ZECPASS:v1 format', () => {
    const challenge = {
      challenge_id: 'a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d',
      nonce: '7f3a9c2b4d1e8f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a',
      expires_at: new Date(1748389200000),
    };

    const memo = buildMemoPayload(challenge as any);
    expect(memo).toBe(`ZECPASS:v1:${challenge.challenge_id}:${challenge.nonce}:1748389200`);
    expect(memo.startsWith('ZECPASS:v1:')).toBe(true);
  });
});

describe('parseMemoPayload', () => {
  const validMemo = 'ZECPASS:v1:a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d:7f3a9c2b4d1e8f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a:1748389200';

  it('parses a valid memo correctly', () => {
    const result = parseMemoPayload(validMemo);
    expect(result).not.toBeNull();
    expect(result!.challenge_id).toBe('a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d');
    expect(result!.nonce).toBe('7f3a9c2b4d1e8f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a');
    expect(result!.timestamp).toBe(1748389200);
  });

  it('rejects empty string', () => {
    expect(parseMemoPayload('')).toBeNull();
  });

  it('rejects non-ZecPass memo', () => {
    expect(parseMemoPayload('Thanks for the pizza! 🍕')).toBeNull();
  });

  it('rejects wrong version', () => {
    expect(parseMemoPayload('ZECPASS:v2:a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d:abc:123')).toBeNull();
  });

  it('rejects malformed UUID', () => {
    expect(parseMemoPayload('ZECPASS:v1:not-a-uuid:7f3a9c2b4d1e8f5a6b7c8d9e0f1a2b3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a:1748389200')).toBeNull();
  });

  it('rejects short nonce', () => {
    expect(parseMemoPayload('ZECPASS:v1:a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d:abc123:1748389200')).toBeNull();
  });

  it('handles whitespace trimming', () => {
    const result = parseMemoPayload(`  ${validMemo}  `);
    expect(result).not.toBeNull();
  });
});
