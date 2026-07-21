# `@siwz/lightwallet-rpc`

Tiny HTTPS wrapper around `zingo-cli`. Runs on a small VPS so that ZBooks (or any SIWZ-using app, deployed anywhere: Vercel, Cloudflare, your laptop) can ask "show me incoming memos to this z-addr" without running a full Zcash node.

**Single dependency: zingo-cli on the same machine.**
**Single file: [`src/server.mjs`](src/server.mjs).**
**No npm install. No build step. Boots in 2 seconds.**

## Quickstart with Docker (recommended)

Docker is the fastest way to get this running on any host (Linux VPS, Mac, Cloud Run job). The image bundles a freshly-compiled `zingo-cli`, so the only thing you need on the host is Docker itself.

```bash
# 1. Generate a strong bearer token. Save the output securely.
TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")

# 2. Build the image (first build is ~10 min for the zingo-cli Rust compile;
#    later builds reuse the cached layer).
docker build -t siwz-lightwallet-rpc .

# 3. Run it.
docker run -d \
  --name siwz-lightwallet-rpc \
  --restart unless-stopped \
  -p 18232:18232 \
  -e LIGHTWALLET_RPC_TOKEN="$TOKEN" \
  -v siwz-zingo:/home/siwz/.zingo-ufvks \
  siwz-lightwallet-rpc

# 4. Confirm.
curl http://localhost:18232/health
```

Or with docker-compose:

```bash
echo "LIGHTWALLET_RPC_TOKEN=$TOKEN" > .env
docker compose up -d
docker compose logs -f
```

In your SIWZ-using app's `.env`, point at the wrapper:

```env
LIGHTWALLET_RPC_URL=http://your-host:18232
LIGHTWALLET_RPC_TOKEN=<same token from step 1>
SIWZ_SERVICE_ADDRESS=<your zs.../u1... shielded address>
```

For internet-facing deployments, terminate TLS in front of this with nginx or another reverse proxy. The wrapper is HTTP-only by design; TLS is the proxy's job.

## What it exposes

```
GET  /health
POST /memos                  Authorization: Bearer <LIGHTWALLET_RPC_TOKEN>
                             body: { "address": "zs1…", "limit": 50 }
                             → { "memos": [{ txid, memo, amountZatoshi, blockHeight }] }
```

That's it. Two endpoints. The `/memos` endpoint shells out to `zingo-cli`, parses its JSON output, returns the decrypted memos for incoming notes at the requested z-addr.

## Deploy without Docker (metal VPS)

The legacy install path. Use this only if you want full control of the host
(systemd unit, nginx, certbot all by hand). For most cases, the Docker route
above is simpler.

See [`docs/siwz/shielded-deployment.md`](../../docs/siwz/shielded-deployment.md) for the full 15-minute walkthrough. Short version:

```bash
# On a $3/mo VPS (RackNerd 2GB, Hetzner CX22, etc.):
sudo apt update && sudo apt install -y nodejs git nginx certbot python3-certbot-nginx

# 1. Get zingo-cli (precompiled or `cargo install`). Init a lite wallet.
zingo-cli --server https://zec.rocks:443
# inside: `new`, save the seed, `addresses`, copy the z-addr or UA, `quit`.

# 2. Clone SWZ, run the wrapper.
git clone <your repo> ~/SWZ && cd ~/SWZ/apps/lightwallet-rpc
export LIGHTWALLET_RPC_TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")
echo "Save this token: $LIGHTWALLET_RPC_TOKEN"
node src/server.mjs   # binds 127.0.0.1:18232

# 3. nginx + certbot for TLS at https://rpc.example.com → 127.0.0.1:18232.
# 4. In ZBooks's Vercel env:
#      ZCASH_RPC_URL=https://rpc.example.com/memos     ← (note: not a JSON-RPC, see Note 1)
#      LIGHTWALLET_RPC_TOKEN=<same token>
```

> **Note 1:** ZBooks's `ZcashRpcExplorer` speaks Bitcoin-style JSON-RPC (POST `{jsonrpc,method,params,id}`). This wrapper speaks plain JSON. ZBooks uses a separate `LightwalletExplorer` class that posts directly to `/memos`. See `apps/demo/src/lib/explorer.ts`.

## Security

- **Bind to localhost only.** The server listens on `127.0.0.1:18232`. nginx terminates TLS and proxies. Don't expose the Node port to the public internet.
- **Bearer token must be ≥32 chars.** The server refuses to start otherwise.
- **Constant-time token comparison** so timing attacks can't probe the token.
- **TLS via certbot is mandatory** in production. The token is the only thing standing between an attacker and your wallet's memo stream. If it goes over plain HTTP, it's recoverable from any network hop.
- **Rate limiting** is the proxy's job (nginx `limit_req`). The wrapper does not implement its own; it's a single-tenant service for your apps.

## What it deliberately doesn't do

- **No sending.** The wrapper is read-only: `list`/`sync`, never `send`/`shield`. There's no path through this API to spend funds.
- **No multi-tenant.** Single bearer token. One VPS per project. If you want multi-tenant, run multiple wallets on multiple ports.
- **No DB.** Stateless except for `zingo-cli`'s own sync state, which lives in `~/.zingo`.

## When to use this vs. `ZcashRpcExplorer`

| You have | Use |
|---|---|
| zcashd or zallet running, want full RPC surface | `ZcashRpcExplorer` (HTTP RPC or zcash-cli) |
| Only want decrypted memos for one z-addr | This (`lightwallet-rpc`) |
| Need to deploy to a $3/mo VPS without 60GB sync | This (`lightwallet-rpc`) |
| Already have lightwalletd-as-a-service somewhere | Either; just point `ZcashRpcExplorer` at it |
