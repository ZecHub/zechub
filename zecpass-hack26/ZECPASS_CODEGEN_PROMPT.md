# ZecPass — Full Codebase Generation Prompt

> Copy this entire prompt into Claude (Sonnet or Opus) or any capable LLM to scaffold the complete ZecPass codebase.
> Feed it in sections if context limits apply — the sections are ordered by dependency.

---

## CONTEXT

You are an expert full-stack TypeScript engineer building **ZecPass** — a privacy-preserving
Zcash-based authentication SDK and platform for the ZecHub 2026 Hackathon (Track 4: Zcash Login).

ZecPass lets any web app add "Sign in with Zcash" — users prove ownership of a shielded
Zcash address by sending a signed memo to a ZecPass address. The app never learns the user's
Zcash address. A ZK proof hash (app-scoped SHA256 derived value) serves as the stable,
address-free user identifier.

**The architecture is a pnpm monorepo with:**
- `apps/web` — Next.js 15 App Router (frontend + API routes)
- `packages/sdk-react` — `<ZecPassButton />` React component + `useZecPass` hook
- `packages/sdk-node` — `ZecPassClient` Node.js verification library
- `zingolib-service` — Lightweight Hono server wrapping ZingoLib FFI for memo polling

**Stack:** Next.js 15, TypeScript, Tailwind CSS v4, shadcn/ui, MongoDB + Mongoose,
JWT (jose), ZingoLib, Zebrad, node-cron, bcrypt, Vitest

**Core protocol:**
1. Third-party app requests a challenge from ZecPass API
2. ZecPass issues a challenge with a shielded u-address + nonce + expiry
3. User sends a Zcash shielded memo containing `ZECPASS:v1:{challenge_id}:{nonce}:{timestamp}`
4. ZecPass memo watcher detects the memo, verifies all rules, issues a JWT session
5. The JWT contains a `zk_proof_hash = SHA256(challenge_id:tx_id:nonce:app_id)` — never the address

---

## SECTION 1 — MONOREPO SETUP

Generate the following root-level files for a pnpm workspaces monorepo:

### 1.1 `package.json` (root)
```
- name: "zecpass"
- private: true
- workspaces: ["apps/*", "packages/*", "zingolib-service"]
- scripts: dev (all packages), build, test, lint
- engines: node >=20
```

### 1.2 `pnpm-workspace.yaml`
```
packages:
  - 'apps/*'
  - 'packages/*'
  - 'zingolib-service'
```

### 1.3 `tsconfig.base.json` (root)
```
- strict: true
- target: ES2022
- moduleResolution: bundler
- paths for @zecpass/* packages
```

### 1.4 `docker-compose.yml`
Three services: `web` (Next.js on 3000), `zingolib` (Hono on 3001), `zebrad` (zcash node on 8232).
Use volumes for zingolib-data and zebrad-data. Pass env vars from .env file.

### 1.5 `.env.example`
All environment variables with placeholder values and inline comments:
```
MONGODB_URI=
JWT_SECRET=
JWT_PUBLIC_KEY=
JWT_EXPIRES_IN=86400
ZINGOLIB_SERVICE_URL=http://localhost:3001
ZINGOLIB_API_KEY=
ZECPASS_RECEIVE_ADDRESS=
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_ZECPASS_APP_ID=
MEMO_POLL_INTERVAL_MS=15000
BCRYPT_ROUNDS=12
CHALLENGE_TTL_SECONDS=600
SESSION_TTL_SECONDS=86400
```

---

## SECTION 2 — MONGODB MODELS (`apps/web/src/models/`)

Generate full Mongoose models with TypeScript interfaces for all 5 collections.

### 2.1 `Challenge.ts`
Fields: challenge_id (UUID, unique), app_id, scope (string[]), zecpass_address,
nonce (32-byte hex), issued_at, expires_at (TTL index 0), used (boolean, default false),
used_at (Date|null), ip_hash, created_at.
- Add a pre-save hook that sets `created_at = new Date()` if not set.
- Export both the interface `IChallenge` and the model `Challenge`.
- Add a static method `findActiveByAppId(app_id: string)` that returns unused, unexpired challenges.

### 2.2 `Session.ts`
Fields: session_id (UUID, unique), zk_proof_hash (indexed), app_id, scope (string[]),
jwt_jti (unique), issued_at, expires_at (TTL index 0), revoked (boolean, default false),
revoked_at (Date|null), last_used_at, created_at.
- Add instance method `isValid(): boolean` → returns `!revoked && expires_at > new Date()`
- Add static method `revokeByJti(jti: string): Promise<void>`

### 2.3 `App.ts`
Fields: app_id (UUID, unique), app_secret_hash (bcrypt), name, description, website_url,
redirect_uris (string[]), scopes_allowed (string[]), owner_zk_hash (indexed), active (boolean, default true),
created_at, updated_at.
- Add instance method `verifySecret(raw: string): Promise<boolean>` using bcrypt.compare
- Add pre-save hook to update `updated_at`

### 2.4 `Badge.ts`
Fields: badge_id (UUID, unique), badge_type (string, indexed), badge_label, issuer_app_id,
holder_zk_hash (indexed), proof_data (Mixed), issued_at, expires_at (Date|null),
revoked (boolean, default false), revoked_at (Date|null), created_at.

### 2.5 `AuditLog.ts`
Fields: event_type (enum: challenge_issued|auth_success|auth_failed|session_revoked|badge_issued|badge_revoked|app_registered),
app_id (String|null), session_id (String|null), zk_proof_hash (String|null),
metadata (Mixed), ip_hash, timestamp (TTL index: 90 days).
- Add static method `log(entry: Partial<IAuditLog>): Promise<void>` — convenience method

---

## SECTION 3 — CORE LIBRARY (`apps/web/src/lib/`)

### 3.1 `mongodb.ts`
Singleton MongoDB connection using Mongoose. Cache the connection in `global.__mongoose`
to avoid reconnection in Next.js dev mode. Export `connectDB(): Promise<void>`.

### 3.2 `jwt.ts`
Using the `jose` library (not jsonwebtoken — jose is Edge-compatible).
- `signToken(payload: JwtPayload, expiresIn?: number): Promise<string>`
  - Payload includes: session_id, app_id, scope, zk_proof_hash, jti (UUID)
  - Signs with RS256 using JWT_SECRET env var
- `verifyToken(token: string): Promise<JwtPayload>`
  - Verifies signature, checks expiry
  - Throws descriptive errors: TokenExpiredError, TokenInvalidError
- `decodeToken(token: string): JwtPayload | null` — no verification, just decode

### 3.3 `challenge.ts`
- `generateChallenge(app_id: string, scope: string[], ip: string): Promise<IChallenge>`
  - Generates UUID challenge_id, 32-byte hex nonce, sets expiry to now + CHALLENGE_TTL_SECONDS
  - Saves to DB, logs to audit
  - Returns the challenge doc
- `buildMemoPayload(challenge: IChallenge): string`
  - Returns `ZECPASS:v1:{challenge_id}:{nonce}:{expires_at_unix}`
- `parseMemoPayload(memo: string): { challenge_id: string, nonce: string, timestamp: number } | null`
  - Validates format with regex, returns null on invalid

### 3.4 `verification.ts`
- `verifyMemo(challenge_id: string, memo: string, tx_id: string): Promise<VerificationResult>`
  - Full verification pipeline:
    1. Parse memo with `parseMemoPayload`
    2. Load challenge from DB — throw if not found
    3. Check challenge not expired
    4. Check challenge not already used (atomic update: findOneAndUpdate with `used: false` filter)
    5. Verify nonce matches
    6. Verify timestamp within ±60 seconds of server time
    7. Mark challenge as used, set used_at
    8. Return { valid: true, challenge, tx_id }
  - Returns `{ valid: false, error: string }` for any failure
  - All string comparisons use `timingSafeEqual` from crypto

### 3.5 `zk.ts`
- `deriveZkProofHash(challenge_id: string, tx_id: string, nonce: string, app_id: string): string`
  - Returns `SHA256(challenge_id:tx_id:nonce:app_id)` as hex string
- `hashIp(ip: string): string`
  - Returns `SHA256(ip + SALT)` — for audit log privacy

### 3.6 `zingolib.ts`
HTTP client for the zingolib-service.
- `ZingolibClient` class with constructor taking `{ baseUrl, apiKey }`
- `getRecentMemos(since?: Date): Promise<ZecMemo[]>`
  - GET `/memos?since={iso}`
  - Returns array of `{ tx_id, memo_text, received_at }`
- `getBalance(): Promise<{ shielded: number, transparent: number }>`
- `healthCheck(): Promise<boolean>`
- Handles fetch errors with retries (3 attempts, exponential backoff)

---

## SECTION 4 — SERVICES (`apps/web/src/services/`)

### 4.1 `ChallengeService.ts`
```typescript
class ChallengeService {
  async issue(app_id: string, scope: string[], redirect_uri: string, ip: string)
    // Validates app_id exists and is active
    // Validates redirect_uri against app's allowed redirect_uris
    // Validates requested scopes are within app's scopes_allowed
    // Calls generateChallenge()
    // Returns { challenge, memo_payload, qr_data }

  async getStatus(challenge_id: string)
    // Returns current challenge state for polling
    // { status: 'pending' | 'used' | 'expired', used: boolean }
}
```

### 4.2 `VerificationService.ts`
```typescript
class VerificationService {
  async processVerification(challenge_id: string, memo: string, tx_id: string)
    // Calls verifyMemo()
    // On success: derives zk_proof_hash, creates Session, signs JWT
    // Logs auth_success or auth_failed to audit
    // Returns { access_token, session_id, zk_proof_hash, expires_in }

  async validateSession(token: string)
    // Verifies JWT, loads session from DB
    // Checks session not revoked
    // Updates last_used_at
    // Returns session data (no address, no private data)
}
```

### 4.3 `SessionService.ts`
```typescript
class SessionService {
  async revoke(session_id: string, zk_proof_hash: string)
    // Revokes session — only owner (matching zk_proof_hash) or app can revoke
  
  async listForUser(zk_proof_hash: string)
    // Returns all active sessions for this user (across apps)
    // Safe to return — no addresses in session docs

  async revokeAll(zk_proof_hash: string)
    // Revokes all sessions for this user
}
```

### 4.4 `AppRegistryService.ts`
```typescript
class AppRegistryService {
  async register(data: RegisterAppInput, owner_zk_hash: string)
    // Generates app_id (UUID) and app_secret (32-byte hex)
    // Stores bcrypt hash of app_secret
    // Returns { app_id, app_secret } — secret shown ONCE

  async getApp(app_id: string)
  async listByOwner(owner_zk_hash: string)
  async deactivate(app_id: string, owner_zk_hash: string)
  async verifyAppSecret(app_id: string, secret: string): Promise<boolean>
}
```

### 4.5 `BadgeService.ts`
```typescript
class BadgeService {
  async issue(issuer_app_id: string, holder_zk_hash: string, badge_type: string, proof_data: object)
  async verify(badge_id: string): Promise<{ valid: boolean, badge?: IBadge }>
  async revoke(badge_id: string, revoker_zk_hash: string)
  async listForHolder(holder_zk_hash: string, app_id: string)
}
```

### 4.6 `MemoPollingService.ts`
```typescript
class MemoPollingService {
  private lastPolled: Date
  private zingolib: ZingolibClient

  async pollAndProcess(): Promise<void>
    // Fetches memos since lastPolled
    // For each memo: checks if it matches ZECPASS:v1: prefix
    // Extracts challenge_id, looks up pending challenge
    // Calls VerificationService.processVerification()
    // Emits internal webhook event on success: POST /api/webhook/memo
    // Updates lastPolled

  start(): void  // starts cron job at MEMO_POLL_INTERVAL_MS
  stop(): void
}
```

---

## SECTION 5 — API ROUTES (`apps/web/src/app/api/`)

Generate full Next.js 15 App Router route handlers for all endpoints.
Each handler must: connect DB, validate request body with Zod, call the appropriate service,
handle errors with proper HTTP codes, and return typed JSON responses.

### 5.1 `auth/challenge/route.ts` — POST
- Validate: `{ app_id: string, scope: string[], redirect_uri: string }`
- Extract IP from request headers (x-forwarded-for, fallback to '0.0.0.0')
- Call ChallengeService.issue()
- Return: `{ challenge_id, zecpass_address, memo_payload, expires_at, qr_code_url }`

### 5.2 `auth/verify/route.ts` — POST
- Validate: `{ challenge_id: string, tx_id: string, memo: string }`
- Call VerificationService.processVerification()
- Return: `{ access_token, token_type: 'Bearer', expires_in, session_id, scope, zk_proof_hash }`

### 5.3 `auth/session/route.ts` — GET
- Extract Bearer token from Authorization header
- Call VerificationService.validateSession()
- Return: `{ valid, session_id, app_id, scope, zk_proof_hash, expires_at }`

### 5.4 `auth/logout/route.ts` — POST
- Extract Bearer token, decode to get session_id + zk_proof_hash
- Call SessionService.revoke()
- Return: `{ revoked: true }`

### 5.5 `apps/register/route.ts` — POST
- Requires authenticated session (middleware check)
- Validate: `{ name, description, website_url, redirect_uris, scopes_allowed }`
- Call AppRegistryService.register()
- Return: `{ app_id, app_secret, name }` — include warning that secret shown once

### 5.6 `apps/[app_id]/route.ts` — GET + DELETE
- GET: return app details (no secret hash)
- DELETE: deactivate app (owner only, verified via session zk_proof_hash)

### 5.7 `badges/issue/route.ts` — POST
- Requires app authentication (app_id + app_secret in headers)
- Validate: `{ holder_session_token, badge_type, badge_label, proof_data }`
- Resolve holder's zk_proof_hash from their session token (app-scoped)
- Call BadgeService.issue()

### 5.8 `badges/verify/route.ts` — POST
- Public endpoint (no auth required)
- Validate: `{ badge_id: string }`
- Call BadgeService.verify()
- Return badge validity + metadata (no holder address)

### 5.9 `webhook/memo/route.ts` — POST (internal only)
- Validate internal API key from header
- Receives memo verification events from MemoPollingService
- Stores result, updates challenge status
- Used for real-time UI polling

---

## SECTION 6 — MIDDLEWARE

### 6.1 `apps/web/src/middleware.ts`
Next.js middleware for:
- Protected routes: `/dashboard/*`, `/api/apps/*`, `/api/badges/issue`
- For protected API routes: extract + verify JWT, attach session to request headers
- For protected pages: redirect to `/auth/login` if no valid session cookie
- Skip middleware for: `/api/auth/*`, `/api/badges/verify`, static files

### 6.2 `apps/web/src/lib/auth-middleware.ts`
Reusable helper:
- `withAuth(handler)` — HOC for API routes requiring user session
- `withAppAuth(handler)` — HOC for API routes requiring app_id + app_secret
- Both return 401 with descriptive error if auth fails

---

## SECTION 7 — FRONTEND PAGES (`apps/web/src/app/`)

### 7.1 Landing Page (`page.tsx`)
Clean, dark-themed landing with:
- Hero: "Sign in with Zcash. Your identity, your privacy."
- Three feature cards: No Address Exposure, Drop-in SDK, ZK Identity Badges
- "Start Building" CTA → /developer/apps
- "Sign In" CTA → /auth/login
Use Tailwind CSS. Match a privacy/crypto aesthetic: dark background (#0a0a0a), gold/amber accents for Zcash branding (#F4B728).

### 7.2 Login Page (`auth/login/page.tsx`)
The challenge flow UI:
- Step 1: Shows the challenge QR code and memo payload
- Step 2: "Waiting for your memo..." — animated pulse with countdown timer
- Step 3: Polls `/api/webhook/memo` or `/api/auth/session` every 5s
- On success: stores JWT in httpOnly cookie, redirects to callback URL
- Manual fallback: text field to paste tx_id if polling doesn't catch it
Use a stepper UI component.

### 7.3 Dashboard (`dashboard/page.tsx`)
After login, shows:
- Connected apps list (AppCard components) with "Revoke" button per app
- Active sessions (SessionCard components)
- ZK Proof Hash display (with copy button + explanation tooltip)
- Link to /dashboard/badges

### 7.4 Badges Page (`dashboard/badges/page.tsx`)
- Grid of BadgeCard components showing earned badges
- Each card: badge type, issuing app, issued date, expiry, status
- "Verify badge" button that calls /api/badges/verify

### 7.5 Developer Portal (`developer/apps/page.tsx`)
- Register new app form (name, description, website_url, redirect_uris, scopes)
- Lists existing apps with app_id display
- "Show integration code" toggle — displays copy-paste SDK snippet tailored to their app_id

---

## SECTION 8 — REACT SDK (`packages/sdk-react/src/`)

### 8.1 `ZecPassProvider.tsx`
React context provider:
```typescript
interface ZecPassConfig {
  appId: string
  zecpassUrl?: string  // default: 'https://zecpass.app'
  redirectUri: string
  scope?: string[]     // default: ['identity']
}
```
Stores session in state, reads from localStorage (access_token), exposes context.

### 8.2 `useZecPass.ts`
Hook returning:
```typescript
{
  session: ZecPassSession | null
  isAuthenticated: boolean
  isLoading: boolean
  login: () => void        // redirects to ZecPass login with challenge
  logout: () => Promise<void>
  getToken: () => string | null
}
```

### 8.3 `ZecPassButton.tsx`
```typescript
interface ZecPassButtonProps {
  onSuccess?: (session: ZecPassSession) => void
  onError?: (error: Error) => void
  label?: string            // default: "Sign in with Zcash"
  variant?: 'default' | 'outline' | 'minimal'
  showBadges?: boolean      // show user's badge count after login
}
```
Renders a styled button with Zcash Z logo SVG. On click: calls `login()` from context.
After auth: shows user's zk_proof_hash abbreviated (first 8 chars) + logout option.

### 8.4 `package.json` for sdk-react
```json
{
  "name": "@zecpass/sdk-react",
  "version": "0.1.0",
  "main": "./dist/index.js",
  "types": "./dist/index.d.ts",
  "peerDependencies": { "react": ">=18", "react-dom": ">=18" }
}
```

---

## SECTION 9 — NODE.JS SDK (`packages/sdk-node/src/`)

### 9.1 `client.ts`
```typescript
class ZecPassClient {
  constructor(config: { appId: string; appSecret: string; baseUrl?: string })

  async verifyToken(token: string): Promise<SessionVerification>
    // Calls GET /api/auth/session on ZecPass server
    // Returns { valid, session_id, app_id, scope, zk_proof_hash, expires_at }

  async issueUserBadge(holderToken: string, badge: BadgeInput): Promise<Badge>
    // Calls POST /api/badges/issue

  async verifyBadge(badge_id: string): Promise<BadgeVerification>
    // Calls POST /api/badges/verify

  async revokeUserSession(session_id: string): Promise<void>
}
```

### 9.2 Express middleware example (in README):
```typescript
import { ZecPassClient } from '@zecpass/sdk-node'

const zecpass = new ZecPassClient({
  appId: process.env.ZECPASS_APP_ID!,
  appSecret: process.env.ZECPASS_APP_SECRET!,
})

export const requireAuth = async (req, res, next) => {
  const token = req.headers.authorization?.split(' ')[1]
  if (!token) return res.status(401).json({ error: 'No token' })

  const session = await zecpass.verifyToken(token)
  if (!session.valid) return res.status(401).json({ error: 'Invalid token' })

  req.user = { id: session.zk_proof_hash, scope: session.scope }
  next()
}
```

---

## SECTION 10 — ZINGOLIB SERVICE (`zingolib-service/src/`)

### 10.1 `index.ts`
Hono server on port 3001 with routes:
- `GET /health` → `{ status: 'ok', synced: boolean, block_height: number }`
- `GET /memos` → query param `since` (ISO date) → returns recent shielded memos to ZECPASS_RECEIVE_ADDRESS
- `GET /balance` → shielded + transparent balance

### 10.2 `wallet.ts`
Mock/stub implementation (since full ZingoLib FFI setup is complex):
```typescript
// Stub that reads from a local JSON file (zingolib-mock-data.json)
// for hackathon demo. Includes a comment explaining how to replace
// with real ZingoLib FFI bindings via the zingolib npm package
// or a child_process spawning a Rust binary.

interface ZecMemo {
  tx_id: string
  memo_text: string
  received_at: string  // ISO date
  amount_zat: number
}

async function getRecentMemos(since?: Date): Promise<ZecMemo[]>
async function getBalance(): Promise<{ shielded: number, transparent: number }>
```

Include a `zingolib-mock-data.json` with 3 sample memos:
- One valid ZECPASS memo format
- One non-ZecPass memo (should be ignored)
- One expired challenge memo (should fail verification)

### 10.3 `Dockerfile`
Node 20 alpine image, copies source, runs `pnpm install` + `pnpm build`, exposes 3001.

---

## SECTION 11 — MEMO WATCHER JOB (`apps/web/src/jobs/memo-watcher.ts`)

```typescript
// Cron job that runs every MEMO_POLL_INTERVAL_MS milliseconds
// Uses MemoPollingService to:
// 1. Fetch new memos from zingolib-service
// 2. Filter for ZECPASS:v1: prefix
// 3. Extract challenge_id from each matching memo
// 4. Look up the challenge in DB
// 5. Call VerificationService.processVerification()
// 6. Emit a Server-Sent Event or store result for client polling

// Export start() and stop() functions
// Call start() in apps/web/src/app/layout.tsx server component (once, guarded by singleton)
```

---

## SECTION 12 — TESTS (`apps/web/src/`)

### 12.1 Unit tests (Vitest)

`__tests__/lib/challenge.test.ts`:
- `buildMemoPayload` produces correct format
- `parseMemoPayload` rejects malformed memos
- `generateChallenge` sets correct TTL

`__tests__/lib/verification.test.ts`:
- Valid memo passes all checks
- Expired memo is rejected
- Replayed challenge_id is rejected
- Mismatched nonce is rejected
- Timestamp outside ±60s window is rejected

`__tests__/lib/zk.test.ts`:
- Same inputs produce same hash
- Different app_id produces different hash (app isolation)
- Output is always 64-char hex

### 12.2 Integration test (Vitest + mongodb-memory-server)

`__tests__/integration/auth-flow.test.ts`:
- Full happy path: issue challenge → simulate memo → verify → get session
- Expired challenge flow: verify after TTL → rejected
- Replay attack: verify same challenge twice → second rejected

---

## SECTION 13 — DOCUMENTATION FILES

### 13.1 `README.md` (root)
Include:
- Project description + hackathon track
- Quick start (pnpm install, docker-compose up, open localhost:3000)
- Links to Architecture.md and SDK docs
- Screenshot placeholder descriptions
- License: MIT

### 13.2 `apps/web/README.md`
- Environment setup
- Running locally vs Docker
- How to run tests

### 13.3 `packages/sdk-react/README.md`
- Install instructions
- ZecPassProvider setup
- ZecPassButton usage
- useZecPass hook reference
- Full example with Next.js

### 13.4 `packages/sdk-node/README.md`
- Install instructions
- ZecPassClient setup
- verifyToken usage
- Express middleware example
- Badge issuing example

---

## GENERATION INSTRUCTIONS

When generating the codebase:

1. **Generate files in dependency order**: types → models → lib → services → API routes → pages → SDK
2. **Every file must be complete** — no `// TODO` stubs except in zingolib/wallet.ts (intentional mock)
3. **TypeScript strict mode** — no `any` types except where unavoidable (Mongoose Mixed fields)
4. **Error handling** — every async function has try/catch with typed errors
5. **Zod validation** — every API route validates its request body with a Zod schema defined at the top of the file
6. **Consistent naming** — camelCase for variables/functions, PascalCase for classes/interfaces/types
7. **No hardcoded values** — all config from environment variables via a central `config.ts`
8. **MongoDB connections** — always use the singleton `connectDB()` before any model operation
9. **Timing safety** — use `crypto.timingSafeEqual` for all challenge/nonce comparisons
10. **Comments** — add JSDoc comments on all exported functions explaining parameters and return values
11. **SDK packages** — generate `dist/` via rollup config; include `rollup.config.ts` for each package
12. **Tailwind** — use CSS variables for theming; primary color: `#F4B728` (Zcash gold); background: `#0a0a0a`
13. **shadcn/ui** — use Card, Button, Badge, Dialog, Tooltip, Progress components where appropriate
14. **The zingolib wallet.ts** — implement as a well-documented stub with real interface; add clear comment explaining how to swap in real ZingoLib bindings

---

## OPTIONAL EXTENSIONS (generate after core is complete)

### Extension A — QR Code Challenge
In `auth/login/page.tsx`, generate a QR code from the memo_payload using the `qrcode` npm package.
The QR code, when scanned by a Zcash mobile wallet (Ywallet, Zingo), should pre-fill the memo
and recipient address. Format: `zcash:{address}?memo={base64(memo_payload)}`

### Extension B — Server-Sent Events for real-time verification
Add `api/auth/challenge/[challenge_id]/status/route.ts` as an SSE endpoint.
When the memo watcher successfully verifies a memo for this challenge_id, push an event:
`data: { "status": "verified", "redirect_url": "{callback_url}?token={access_token}" }`
In `auth/login/page.tsx`, subscribe to this SSE instead of polling.

### Extension C — JWKS endpoint
Add `api/.well-known/jwks.json/route.ts` that returns the RS256 public key in JWK format.
This allows third-party apps to verify ZecPass JWTs locally without calling the validation API.

### Extension D — Demo third-party app
Create `apps/demo/` — a minimal Next.js app that integrates `@zecpass/sdk-react`:
- Simple page with `<ZecPassButton />`
- After login: shows the user's zk_proof_hash and any badges
- Has a protected `/dashboard` route using `@zecpass/sdk-node` middleware
- Useful for hackathon demo video

---

*End of ZecPass Codebase Generation Prompt*
*ZecHub 2026 Hackathon — Track 4: Zcash Login*
