# @zecpass/sdk-node

Node.js SDK for ZecPass — server-side Zcash authentication verification.

## Install

```bash
pnpm add @zecpass/sdk-node
```

## Setup

```typescript
import { ZecPassClient } from '@zecpass/sdk-node';

const zecpass = new ZecPassClient({
  appId: process.env.ZECPASS_APP_ID!,
  appSecret: process.env.ZECPASS_APP_SECRET!,
  baseUrl: 'https://zecpass.app', // optional
});
```

## Verify Token

```typescript
const session = await zecpass.verifyToken(token);

if (session.valid) {
  console.log('User:', session.zk_proof_hash);
  console.log('Scope:', session.scope);
}
```

## Express Middleware

```typescript
export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'No token' });

  const session = await zecpass.verifyToken(token);
  if (!session.valid) return res.status(401).json({ error: 'Invalid' });

  req.user = { id: session.zk_proof_hash, scope: session.scope };
  next();
};
```

## Issue Badge

```typescript
const badge = await zecpass.issueUserBadge(holderToken, {
  badge_type: 'contributor',
  badge_label: 'Active Contributor',
  proof_data: { contributions: 42 },
});
```

## Verify Badge

```typescript
const result = await zecpass.verifyBadge(badgeId);
console.log(result.valid, result.badge_type);
```

## API Reference

### ZecPassClient

| Method | Description |
|--------|-------------|
| `verifyToken(token)` | Verify a JWT and get session data |
| `issueUserBadge(holderToken, badge)` | Issue a badge to an authenticated user |
| `verifyBadge(badge_id)` | Verify a badge |
| `revokeUserSession(session_id)` | Revoke a session |
