# ZecPass — Architecture Documentation

> Privacy-Preserving Sign-In & Identity Layer for Zcash
> ZecHub 2026 Hackathon — Track 4: Zcash Login

---

## Table of Contents

1. [Project Overview](#1-project-overview)
2. [System Architecture](#2-system-architecture)
3. [Authentication Protocol](#3-authentication-protocol)
4. [Tech Stack](#4-tech-stack)
5. [Project Structure](#5-project-structure)
6. [Database Schema (MongoDB)](#6-database-schema-mongodb)
7. [API Reference](#7-api-reference)
8. [SDK Reference](#8-sdk-reference)
9. [Security Model](#9-security-model)
10. [Environment Variables](#10-environment-variables)
11. [Deployment](#11-deployment)

---

## 1. Project Overview

ZecPass is a plug-and-play authentication SDK and platform that lets any web app add
**"Sign in with Zcash"** — where users prove ownership of a shielded Zcash address by
sending a signed memo, without ever exposing their address to the app or any third party.

### Core Design Principles

- **Zero address exposure** — the authenticating app never learns the user's Zcash address
- **Replay-proof** — every challenge is single-use, time-bound, and cryptographically tied to the requester
- **No custodian** — ZecPass never holds funds or private keys
- **Plug-and-play** — a third-party app integrates in under 10 minutes via the SDK
- **Revocable** — users control which apps hold active sessions and can revoke at any time

---

## 2. System Architecture

```
┌─────────────────────────────────────────────────────────────────────┐
│                        CLIENT BROWSER                               │
│                                                                     │
│   ┌──────────────────┐         ┌──────────────────────────────┐    │
│   │  Third-Party App │         │     ZecPass Dashboard        │    │
│   │  (Next.js / any) │         │  (Next.js — zecpass.app)     │    │
│   │                  │         │                              │    │
│   │  <ZecPassButton/>│         │  • Connected apps            │    │
│   │  (React SDK)     │         │  • Active sessions           │    │
│   │                  │         │  • ZK Identity badges        │    │
│   └────────┬─────────┘         │  • Revoke access             │    │
│            │ OAuth-style        └──────────────┬───────────────┘    │
│            │ redirect                          │                    │
└────────────┼──────────────────────────────────┼────────────────────┘
             │                                  │
             ▼                                  ▼
┌─────────────────────────────────────────────────────────────────────┐
│                     ZECPASS SERVER (Next.js API Routes)             │
│                                                                     │
│  ┌─────────────┐  ┌──────────────┐  ┌───────────────────────────┐ │
│  │  /api/auth  │  │  /api/apps   │  │  /api/badges              │ │
│  │             │  │              │  │                           │ │
│  │ • challenge │  │ • register   │  │ • issue                   │ │
│  │ • verify    │  │ • list       │  │ • verify                  │ │
│  │ • session   │  │ • revoke     │  │ • revoke                  │ │
│  │ • logout    │  └──────────────┘  └───────────────────────────┘ │
│  └──────┬──────┘                                                    │
│         │                                                           │
│  ┌──────▼──────────────────────────────────────────────────────┐   │
│  │              Core Services Layer                            │   │
│  │                                                             │   │
│  │  ChallengeService  │  VerificationService  │  SessionService│   │
│  │  BadgeService      │  AppRegistryService   │  AuditService  │   │
│  └──────┬─────────────────────────┬───────────────────────────┘   │
│         │                         │                                 │
└─────────┼─────────────────────────┼─────────────────────────────────┘
          │                         │
          ▼                         ▼
┌──────────────────┐    ┌───────────────────────────────────────────┐
│   MongoDB Atlas  │    │         Zcash Network Layer               │
│                  │    │                                           │
│  • challenges    │    │  ┌──────────────┐  ┌──────────────────┐  │
│  • sessions      │    │  │  ZingoLib    │  │  Zebrad / Zaino  │  │
│  • apps          │    │  │  (memo read) │  │  (node RPC)      │  │
│  • badges        │    │  └──────┬───────┘  └────────┬─────────┘  │
│  • audit_logs    │    │         │                   │             │
└──────────────────┘    │         └─────────┬─────────┘             │
                        │                   │                        │
                        │     Zcash Mainnet │                        │
                        └───────────────────┘                        │
                                                                     │
                        ┌───────────────────────────────────────────┐
                        │           USER'S ZCASH WALLET             │
                        │                                           │
                        │  • Reads challenge from ZecPass memo      │
                        │  • Sends challenge-signed memo back       │
                        │  • Zingo / Ywallet / YWallet / ZingoLib  │
                        └───────────────────────────────────────────┘
```

---

## 3. Authentication Protocol

### 3.1 High-Level Flow

```
Third-Party App          ZecPass Server           User Wallet        Zcash Network
      │                        │                       │                    │
      │── 1. Request challenge ─►                      │                    │
      │   { app_id, scope }    │                       │                    │
      │                        │                       │                    │
      │◄─ 2. Challenge issued ──│                       │                    │
      │   { challenge_id,      │                       │                    │
      │     zecpass_address,   │                       │                    │
      │     expires_at }       │                       │                    │
      │                        │                       │                    │
      │── 3. Redirect user ────────────────────────────►                    │
      │   (to ZecPass UI)      │                       │                    │
      │                        │                       │                    │
      │                        │◄─ 4. User sends memo ─────────────────────►
      │                        │   (challenge_id as   │                    │
      │                        │    shielded memo)     │                    │
      │                        │                       │                    │
      │                        │── 5. Poll / webhook ─►                    │
      │                        │   (detect memo on    │                    │
      │                        │    ZecPass address)   │                    │
      │                        │                       │                    │
      │                        │── 6. Verify memo ─────────────────────────►
      │                        │   (challenge match,  │                    │
      │                        │    timing, replay)    │                    │
      │                        │                       │                    │
      │◄─ 7. Issue session JWT ─│                       │                    │
      │   { access_token,      │                       │                    │
      │     session_id,        │                       │                    │
      │     zk_proof_hash }    │                       │                    │
      │                        │                       │                    │
      │── 8. App uses token ──►│                       │                    │
      │   (verify session)     │                       │                    │
```

### 3.2 Challenge Structure

```typescript
interface Challenge {
  challenge_id: string;       // UUID v4 — single use
  app_id: string;             // registered third-party app
  scope: string[];            // e.g. ["identity", "badges:read"]
  zecpass_address: string;    // shielded u-address user sends memo to
  nonce: string;              // 32-byte random hex
  issued_at: number;          // Unix timestamp
  expires_at: number;         // issued_at + 600 (10 minutes)
  used: boolean;              // consumed on first valid use
}
```

### 3.3 Memo Format

The user sends a Zcash shielded memo to `zecpass_address` containing:

```
ZECPASS:v1:{challenge_id}:{nonce}:{timestamp}
```

Example:
```
ZECPASS:v1:a3f8c2d1-4b9e-4f1a-8c3d-2e5f7a9b0c1d:7f3a9c2b4d1e8f5a:1748389200
```

### 3.4 Verification Rules

ZecPass verifies all of the following before issuing a session:

| Rule | Check |
|------|-------|
| **Format** | Memo matches `ZECPASS:v1:{uuid}:{32hex}:{timestamp}` exactly |
| **Challenge exists** | `challenge_id` found in DB and belongs to `app_id` |
| **Not expired** | `timestamp` within challenge `expires_at` window |
| **Not replayed** | `challenge.used === false` → set to `true` atomically |
| **Nonce match** | Memo nonce matches stored challenge nonce |
| **Timing** | Server timestamp within ±60s of memo timestamp |
| **Memo origin** | Memo arrived at the correct `zecpass_address` |

### 3.5 ZK Proof Hash (Privacy Layer)

After verification, ZecPass does NOT store the user's Zcash address. Instead it stores:

```
zk_proof_hash = SHA256(challenge_id + sender_tx_id + nonce + app_id)
```

This hash is:
- **Deterministic per session** — same user re-authenticating to same app produces a consistent identifier
- **App-isolated** — the same user's hash is different per app (app_id is in the input)
- **Address-free** — the Zcash address is never stored in any DB collection

---

## 4. Tech Stack

| Layer | Technology | Reason |
|-------|-----------|--------|
| Frontend & API | **Next.js 15** (App Router) | Unified frontend + API routes, server components |
| Language | **TypeScript** | Type safety across SDK + server |
| Styling | **Tailwind CSS v4** + shadcn/ui | Fast, accessible UI |
| Database | **MongoDB Atlas** | Flexible document schema for proof/badge/session data |
| ODM | **Mongoose** | Schema validation + middleware hooks |
| Authentication | **JWT** (jose library) | Stateless session tokens |
| Zcash Integration | **ZingoLib** (via FFI or REST wrapper) | Memo reading + shielded tx detection |
| Zcash Node | **Zebrad + Zaino** | Mainnet connectivity |
| SDK (React) | **React + Rollup** | Drop-in `<ZecPassButton />` component |
| SDK (Node.js) | **Node.js library** | Server-side token verification |
| Job Queue | **node-cron** | Periodic memo polling from Zcash node |
| Environment | **dotenv** | Config management |
| Testing | **Vitest + Playwright** | Unit + E2E tests |

---

## 5. Project Structure

```
zecpass/
│
├── apps/
│   └── web/                          # Main Next.js application
│       ├── src/
│       │   ├── app/                  # Next.js App Router
│       │   │   ├── layout.tsx
│       │   │   ├── page.tsx          # Landing page
│       │   │   ├── dashboard/        # User privacy dashboard
│       │   │   │   ├── page.tsx      # Connected apps + sessions
│       │   │   │   ├── badges/       # ZK identity badges
│       │   │   │   └── settings/     # Account settings
│       │   │   ├── auth/
│       │   │   │   ├── login/        # ZecPass login UI (challenge flow)
│       │   │   │   └── callback/     # Post-auth redirect handler
│       │   │   ├── developer/        # Developer portal
│       │   │   │   ├── apps/         # Register + manage apps
│       │   │   │   └── docs/         # Inline SDK documentation
│       │   │   └── api/              # Next.js API routes
│       │   │       ├── auth/
│       │   │       │   ├── challenge/route.ts   # POST: issue challenge
│       │   │       │   ├── verify/route.ts      # POST: verify memo + issue JWT
│       │   │       │   ├── session/route.ts     # GET: validate session token
│       │   │       │   └── logout/route.ts      # POST: revoke session
│       │   │       ├── apps/
│       │   │       │   ├── register/route.ts    # POST: register third-party app
│       │   │       │   ├── [app_id]/route.ts    # GET/DELETE: app management
│       │   │       │   └── list/route.ts        # GET: user's connected apps
│       │   │       ├── badges/
│       │   │       │   ├── issue/route.ts       # POST: issue ZK badge
│       │   │       │   ├── verify/route.ts      # POST: verify badge claim
│       │   │       │   └── revoke/route.ts      # POST: revoke badge
│       │   │       └── webhook/
│       │   │           └── memo/route.ts        # POST: internal memo event
│       │   │
│       │   ├── components/
│       │   │   ├── ui/               # shadcn/ui base components
│       │   │   ├── ZecPassButton.tsx # Preview of the SDK component
│       │   │   ├── SessionCard.tsx   # Active session display
│       │   │   ├── BadgeCard.tsx     # ZK badge display
│       │   │   ├── AppCard.tsx       # Connected app card
│       │   │   └── ChallengeQR.tsx   # QR code for mobile wallet
│       │   │
│       │   ├── lib/
│       │   │   ├── mongodb.ts        # MongoDB connection singleton
│       │   │   ├── jwt.ts            # JWT sign/verify utilities
│       │   │   ├── challenge.ts      # Challenge generation logic
│       │   │   ├── verification.ts   # Memo verification engine
│       │   │   ├── zk.ts             # ZK proof hash generation
│       │   │   └── zingolib.ts       # ZingoLib RPC wrapper
│       │   │
│       │   ├── models/               # Mongoose models
│       │   │   ├── Challenge.ts
│       │   │   ├── Session.ts
│       │   │   ├── App.ts
│       │   │   ├── Badge.ts
│       │   │   └── AuditLog.ts
│       │   │
│       │   ├── services/
│       │   │   ├── ChallengeService.ts
│       │   │   ├── VerificationService.ts
│       │   │   ├── SessionService.ts
│       │   │   ├── BadgeService.ts
│       │   │   ├── AppRegistryService.ts
│       │   │   └── MemoPollingService.ts  # Polls Zcash node for new memos
│       │   │
│       │   ├── jobs/
│       │   │   └── memo-watcher.ts   # Cron job: poll ZingoLib for memos
│       │   │
│       │   └── types/
│       │       ├── auth.ts
│       │       ├── badge.ts
│       │       └── zecpass.ts
│       │
│       ├── public/
│       ├── .env.local
│       ├── next.config.ts
│       ├── tailwind.config.ts
│       └── tsconfig.json
│
├── packages/
│   ├── sdk-react/                    # <ZecPassButton /> React component
│   │   ├── src/
│   │   │   ├── ZecPassButton.tsx
│   │   │   ├── ZecPassProvider.tsx
│   │   │   ├── useZecPass.ts         # React hook
│   │   │   └── index.ts
│   │   ├── package.json
│   │   └── tsconfig.json
│   │
│   └── sdk-node/                     # Node.js verification library
│       ├── src/
│       │   ├── verify.ts             # verifyZecPassToken()
│       │   ├── client.ts             # ZecPassClient class
│       │   └── index.ts
│       ├── package.json
│       └── tsconfig.json
│
├── zingolib-service/                 # Lightweight ZingoLib REST wrapper
│   ├── src/
│   │   ├── index.ts                  # Hono server
│   │   ├── wallet.ts                 # ZingoLib FFI bindings
│   │   └── routes/
│   │       ├── memos.ts              # GET /memos (recent shielded memos)
│   │       └── health.ts
│   ├── package.json
│   └── Dockerfile
│
├── docker-compose.yml                # Full stack: Next.js + ZingoLib + Zebrad
├── ARCHITECTURE.md                   # This file
├── README.md
└── package.json                      # Monorepo root (pnpm workspaces)
```

---

## 6. Database Schema (MongoDB)

### 6.1 `challenges` Collection

```typescript
{
  _id: ObjectId,
  challenge_id: string,       // UUID v4, indexed unique
  app_id: string,             // ref → apps.app_id
  scope: string[],            // ["identity", "badges:read"]
  zecpass_address: string,    // shielded u-address for this challenge
  nonce: string,              // 32-byte random hex
  issued_at: Date,
  expires_at: Date,           // TTL index → auto-delete after expiry
  used: boolean,              // false → true on first valid verification
  used_at: Date | null,
  ip_hash: string,            // hashed requester IP (privacy-safe audit)
  created_at: Date
}
```
**Indexes:** `challenge_id` (unique), `expires_at` (TTL)

---

### 6.2 `sessions` Collection

```typescript
{
  _id: ObjectId,
  session_id: string,         // UUID v4, indexed unique
  zk_proof_hash: string,      // SHA256(challenge_id+tx_id+nonce+app_id)
  app_id: string,             // which app this session belongs to
  scope: string[],
  jwt_jti: string,            // JWT ID — used for revocation
  issued_at: Date,
  expires_at: Date,           // TTL index
  revoked: boolean,
  revoked_at: Date | null,
  last_used_at: Date,
  created_at: Date
}
```
**Indexes:** `session_id` (unique), `zk_proof_hash`, `jwt_jti` (unique), `expires_at` (TTL)

---

### 6.3 `apps` Collection

```typescript
{
  _id: ObjectId,
  app_id: string,             // UUID v4, indexed unique
  app_secret_hash: string,    // bcrypt hash of app secret
  name: string,
  description: string,
  website_url: string,
  redirect_uris: string[],    // allowed post-auth redirect URIs
  scopes_allowed: string[],   // scopes this app may request
  owner_zk_hash: string,      // ZK hash of the registering user
  active: boolean,
  created_at: Date,
  updated_at: Date
}
```
**Indexes:** `app_id` (unique), `owner_zk_hash`

---

### 6.4 `badges` Collection

```typescript
{
  _id: ObjectId,
  badge_id: string,           // UUID v4
  badge_type: string,         // "zechub_contributor" | "node_operator" | custom
  badge_label: string,        // Human-readable display name
  issuer_app_id: string,      // which app issued the badge
  holder_zk_hash: string,     // ZK hash of the holder (app-scoped)
  proof_data: object,         // arbitrary verifiable claims (no address)
  issued_at: Date,
  expires_at: Date | null,
  revoked: boolean,
  revoked_at: Date | null,
  created_at: Date
}
```
**Indexes:** `badge_id` (unique), `holder_zk_hash`, `badge_type`

---

### 6.5 `audit_logs` Collection

```typescript
{
  _id: ObjectId,
  event_type: string,         // "challenge_issued" | "auth_success" | "auth_failed" | "session_revoked"
  app_id: string | null,
  session_id: string | null,
  zk_proof_hash: string | null,
  metadata: object,           // event-specific details (no addresses)
  ip_hash: string,            // hashed IP
  timestamp: Date
}
```
**Indexes:** `timestamp` (TTL — 90 days), `event_type`, `app_id`

---

## 7. API Reference

### Authentication Endpoints

#### `POST /api/auth/challenge`
Issue a new login challenge.

**Request:**
```json
{
  "app_id": "string",
  "scope": ["identity", "badges:read"],
  "redirect_uri": "https://myapp.com/auth/callback"
}
```
**Response:**
```json
{
  "challenge_id": "uuid",
  "zecpass_address": "u1...",
  "memo_payload": "ZECPASS:v1:{challenge_id}:{nonce}:{expires_at}",
  "expires_at": 1748389200,
  "qr_code_url": "/api/auth/challenge/{challenge_id}/qr"
}
```

---

#### `POST /api/auth/verify`
Verify a challenge memo and issue session JWT.
Called internally by the memo watcher — also pollable by client.

**Request:**
```json
{
  "challenge_id": "uuid",
  "tx_id": "zcash_tx_id"
}
```
**Response:**
```json
{
  "access_token": "jwt...",
  "token_type": "Bearer",
  "expires_in": 86400,
  "session_id": "uuid",
  "scope": ["identity"],
  "zk_proof_hash": "sha256hex"
}
```

---

#### `GET /api/auth/session`
Validate an active session token (for third-party app use).

**Headers:** `Authorization: Bearer {token}`

**Response:**
```json
{
  "valid": true,
  "session_id": "uuid",
  "app_id": "uuid",
  "scope": ["identity"],
  "zk_proof_hash": "sha256hex",
  "expires_at": 1748389200
}
```

---

#### `POST /api/auth/logout`
Revoke an active session.

**Headers:** `Authorization: Bearer {token}`

**Response:** `{ "revoked": true }`

---

### App Registration Endpoints

#### `POST /api/apps/register`
Register a third-party application.

**Request:**
```json
{
  "name": "MyDApp",
  "description": "A Zcash-powered app",
  "website_url": "https://mydapp.xyz",
  "redirect_uris": ["https://mydapp.xyz/auth/callback"],
  "scopes_allowed": ["identity", "badges:read"]
}
```
**Response:**
```json
{
  "app_id": "uuid",
  "app_secret": "raw_secret_shown_once",
  "name": "MyDApp"
}
```

---

### Badge Endpoints

#### `POST /api/badges/issue`
Issue a ZK identity badge to an authenticated user.

#### `POST /api/badges/verify`
Verify a badge claim by badge_id.

#### `POST /api/badges/revoke`
Revoke a badge (issuer or holder only).

---

## 8. SDK Reference

### React SDK (`@zecpass/sdk-react`)

```tsx
// Install
// pnpm add @zecpass/sdk-react

import { ZecPassProvider, ZecPassButton, useZecPass } from '@zecpass/sdk-react'

// 1. Wrap your app
export default function App() {
  return (
    <ZecPassProvider
      appId="your-app-id"
      redirectUri="https://yourapp.com/auth/callback"
      scope={['identity']}
    >
      <YourApp />
    </ZecPassProvider>
  )
}

// 2. Drop in the button
export function LoginPage() {
  return (
    <ZecPassButton
      onSuccess={(session) => console.log(session.zk_proof_hash)}
      onError={(err) => console.error(err)}
    />
  )
}

// 3. Use the hook
export function Profile() {
  const { session, logout, isAuthenticated } = useZecPass()

  if (!isAuthenticated) return <p>Not logged in</p>
  return (
    <div>
      <p>Session: {session.session_id}</p>
      <button onClick={logout}>Sign out</button>
    </div>
  )
}
```

---

### Node.js SDK (`@zecpass/sdk-node`)

```typescript
// Install
// pnpm add @zecpass/sdk-node

import { ZecPassClient } from '@zecpass/sdk-node'

const zecpass = new ZecPassClient({
  appId: process.env.ZECPASS_APP_ID,
  appSecret: process.env.ZECPASS_APP_SECRET,
  baseUrl: 'https://zecpass.app'
})

// Verify a token in your backend middleware
app.get('/protected', async (req, res) => {
  const token = req.headers.authorization?.split(' ')[1]

  const session = await zecpass.verifyToken(token)

  if (!session.valid) {
    return res.status(401).json({ error: 'Unauthorized' })
  }

  // session.zk_proof_hash is a stable, address-free user identifier
  const userId = session.zk_proof_hash

  res.json({ userId, scope: session.scope })
})
```

---

## 9. Security Model

### Threat Model

| Threat | Mitigation |
|--------|-----------|
| **Replay attack** | `challenge.used` is set atomically on first verification; subsequent uses rejected |
| **Expired challenge use** | `expires_at` enforced server-side; MongoDB TTL auto-deletes stale challenges |
| **Man-in-the-middle** | All traffic over TLS; memo payload is verifiable without interception risk |
| **Address linkability** | Address never stored; `zk_proof_hash` is app-scoped so cross-app tracking is impossible |
| **App secret leak** | Secrets stored as bcrypt hashes; raw secret shown once at registration |
| **JWT forgery** | Signed with RS256 (asymmetric); public key published at `/.well-known/jwks.json` |
| **Session hijack** | Sessions bound to `jti`; revocation list checked on every `/api/auth/session` call |
| **Timing attacks** | Constant-time string comparison for all crypto checks |
| **Log surveillance** | Audit logs store only `zk_proof_hash` and hashed IPs — never wallet addresses |

### What ZecPass Stores vs. What It Never Stores

| Stored | Never Stored |
|--------|-------------|
| `zk_proof_hash` (derived, app-scoped) | User's Zcash address |
| `challenge_id` (deleted after use) | Private keys |
| `session_id` | Memo content after verification |
| `tx_id` (in memory during verify only) | Cross-app identity link |
| Hashed app secrets | Raw app secrets |
| Hashed IPs in audit logs | Raw IP addresses |

---

## 10. Environment Variables

```bash
# apps/web/.env.local

# MongoDB
MONGODB_URI=mongodb+srv://user:pass@cluster.mongodb.net/zecpass

# JWT
JWT_SECRET=your-rs256-private-key-pem
JWT_PUBLIC_KEY=your-rs256-public-key-pem
JWT_EXPIRES_IN=86400

# ZingoLib service
ZINGOLIB_SERVICE_URL=http://localhost:3001
ZINGOLIB_API_KEY=your-internal-api-key

# ZecPass shielded address (receives challenge memos)
ZECPASS_RECEIVE_ADDRESS=u1...yourshieldedaddress...

# App
NEXT_PUBLIC_APP_URL=https://zecpass.app
NEXT_PUBLIC_ZECPASS_APP_ID=zecpass-platform

# Memo polling
MEMO_POLL_INTERVAL_MS=15000

# Security
BCRYPT_ROUNDS=12
CHALLENGE_TTL_SECONDS=600
SESSION_TTL_SECONDS=86400
```

---

## 11. Deployment

### Docker Compose (Full Stack)

```yaml
version: '3.8'
services:

  web:
    build: ./apps/web
    ports:
      - "3000:3000"
    environment:
      - MONGODB_URI=${MONGODB_URI}
      - ZINGOLIB_SERVICE_URL=http://zingolib:3001
    depends_on:
      - zingolib

  zingolib:
    build: ./zingolib-service
    ports:
      - "3001:3001"
    volumes:
      - zingolib-data:/data/zingolib
    environment:
      - ZINGOLIB_API_KEY=${ZINGOLIB_API_KEY}
      - ZCASH_NETWORK=mainnet

  zebrad:
    image: electriccoinco/zebrad:latest
    ports:
      - "8232:8232"
    volumes:
      - zebrad-data:/data/zebrad
    command: ["start", "--network=mainnet"]

volumes:
  zingolib-data:
  zebrad-data:
```

### Production Deployment (Recommended for Hackathon)

```
Web App     → Vercel (Next.js native)
Database    → MongoDB Atlas (free M0 tier)
ZingoLib    → Railway or Fly.io (Docker container)
Zebrad      → VPS (DigitalOcean $6/mo droplet)
```

---

## Appendix: ZK Proof Hash Derivation

```typescript
import { createHash } from 'crypto'

/**
 * Derives a deterministic, address-free user identifier.
 * Same user re-authenticating to the same app always gets the same hash.
 * Different apps → different hash (app_id in the input isolates users per app).
 */
export function deriveZkProofHash(
  challenge_id: string,
  tx_id: string,
  nonce: string,
  app_id: string
): string {
  return createHash('sha256')
    .update(`${challenge_id}:${tx_id}:${nonce}:${app_id}`)
    .digest('hex')
}
```

---

*ZecPass — Built for ZecHub 2026 Hackathon. Open-source. Privacy-first.*
