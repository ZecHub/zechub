# Deploying Turnstile

Two pieces: a **long-running scanner** (Rust, Docker) and the **web app** (Next.js, Vercel).

The scanner cannot be serverless. A deep scan walks hundreds of thousands of blocks and holds a
sync in memory; that is the whole reason it is a separate service.

## Scanner → Fly.io

```bash
cd scanner
fly launch --no-deploy          # once
fly deploy

fly secrets set \
  TURNSTILE_UNIFIED_ADDRESS=u1... \
  TURNSTILE_UFVK=uview1... \
  TURNSTILE_BIRTHDAY=3411399
```

`fly.toml` is already configured. Verify:

```bash
curl https://turnstile-scanner.fly.dev/health
curl https://turnstile-scanner.fly.dev/status
```

The image is 175MB and builds in ~10 minutes (zingolib is large). View-only scanning needs no
Sapling proving parameters, so none are shipped.

### Run exactly one machine

`auto_stop_machines = false`, `min_machines_running = 1`. This is not a cost preference — **scan
jobs are held in memory**. With two machines behind the load balancer, a client could start a job
on one and poll for it on the other, which would return "no such scan job". Scaling out requires
moving job state to shared storage first.

### The indexer must be Ironwood-ready before 28 July

`LIGHTWALLETD_URL` defaults to `https://zec.rocks:443`, which today serves the chain through
**lightwalletd** — and upstream lightwalletd has **not shipped Ironwood support**. Its latest
release predates the upgrade and the only NU6.3 work is an unmerged draft PR. `zec.rocks` runs
Ironwood on testnet only.

Turnstile reads the chain through this endpoint, so **Turnstile's own scanning is downstream of
this risk**. Before activation, point it at an indexer that has shipped Ironwood support —
**Zaino 0.6.0** is the one verified mainnet-ready path today:

```bash
fly secrets set LIGHTWALLETD_URL=https://<an-ironwood-ready-indexer>:443
```

No code change is needed; the endpoint is configuration. But a tool that tells people the pool has
closed is worthless if it cannot read the chain on the day it closes.

The indexer is not the whole story. zingolib's current pin of `zcash_protocol` (0.9.0) predates
NU6.3; the newest release of that crate ships the Ironwood consensus rules
(`Nu6_3 => 3_428_143`), and zingolib is integrating them
([zingolib#2420](https://github.com/zingolabs/zingolib/issues/2420)). Rebuild the scanner against
zingolib once that lands. Until then, pre-activation scanning is verified and post-activation
scanning is honestly unknown — Turnstile lists **itself** on the readiness board for this reason.

### Keep the scanner's port private

The scanner binds `0.0.0.0:8080` and has no auth. The per-IP rate limit and the
spending-key refusal live in the Next proxy (`/api/scan`), so anything that can reach port 8080
directly bypasses them. In-process it caps concurrent scans at 4 and mints unguessable job IDs, but
that is a backstop, not access control. On Fly, expose the service only through the `[http_service]`
front end and do not publish 8080 to the public internet from any other host; the browser should
always reach the scanner via the Vercel proxy, never directly.

### The alert watcher

Set `TURNSTILE_UFVK` and the watcher starts polling mainnet for `TURNSTILE:SUB:` memos. Leave it
unset and the watcher disables itself, logs a warning, and the rest of the service runs normally.

The watcher takes a **viewing key, not a spending key** — it only needs to read memos. The server
therefore cannot spend the dust it is sent. Keep only dust at that address.

## Web app → Vercel

```bash
cd frontend
vercel --prod
```

Set in the Vercel dashboard:

| Variable | Value |
|---|---|
| `SCANNER_URL` | `https://turnstile-scanner.fly.dev` |
| `TURNSTILE_UNIFIED_ADDRESS` | the alerts address, `u1...` |

**`SCANNER_URL` must not carry a `NEXT_PUBLIC_` prefix.** That would ship the scanner's address
into the browser bundle and let a client call it directly, bypassing `/api/scan` — which is what
enforces the per-IP rate limit and the spending-key refusal.

### Known limitation: rate limiting is per-instance

`/api/scan` rate-limits per IP in memory. On Vercel each serverless instance has its own memory, so
the effective limit is *n* × 5 scans per window across *n* warm instances. It raises the cost of
abuse; it does not hard-cap it. A shared store (Upstash, Vercel KV) would close this. It is
documented rather than hidden because the scan endpoint is the expensive one.

## Verifying a deployment

The claim this project lives or dies on is that viewing keys never touch the logs. Check it:

```bash
fly logs -a turnstile-scanner | grep uview
```

Scan a wallet through the live site, then run that. It returns nothing. The logs carry the
birthday height and the verdict, and nothing else.
