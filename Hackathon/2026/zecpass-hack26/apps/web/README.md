# @zecpass/web — Next.js Application

The main ZecPass web application — frontend dashboard + API routes.

## Setup

```bash
# From monorepo root
pnpm install

# Copy environment variables
cp .env.example .env
# Fill in MONGODB_URI, JWT_SECRET, JWT_PUBLIC_KEY, etc.
```

## Running Locally

```bash
pnpm -F @zecpass/web dev     # http://localhost:3000
```

## Running Tests

```bash
pnpm -F @zecpass/web test        # Run all tests
pnpm -F @zecpass/web test:watch  # Watch mode
```

## API Endpoints

| Method | Path | Auth | Description |
|--------|------|------|-------------|
| POST | `/api/auth/challenge` | Public | Issue login challenge |
| POST | `/api/auth/verify` | Public | Verify memo + issue JWT |
| GET | `/api/auth/session` | Bearer | Validate session |
| POST | `/api/auth/logout` | Bearer | Revoke session |
| POST | `/api/apps/register` | Bearer | Register app |
| GET/DELETE | `/api/apps/[app_id]` | Bearer | App management |
| POST | `/api/badges/issue` | App Auth | Issue badge |
| POST | `/api/badges/verify` | Public | Verify badge |
| GET | `/api/.well-known/jwks.json` | Public | JWKS public key |

## Pages

| Path | Description |
|------|-------------|
| `/` | Landing page |
| `/auth/login` | Challenge flow UI |
| `/dashboard` | User dashboard |
| `/dashboard/badges` | ZK badges |
| `/developer/apps` | Developer portal |
