# Gleyo — Full Setup Guide

This covers everything needed to run Gleyo with full ZEC functionality on real Zcash mainnet: environment variables, the Zebra full node, and the Nozy Wallet API server. For just getting the app itself running locally, see the Setup section in [README.md](./README.md).

---

### Requirements

- Python 3.10+
- Git
- Rust (for building Nozy API server)
- A running Zebra node (Ubuntu VPS, 400GB+ SSD recommended)

---

### 1. Clone the repo

```bash
git clone https://github.com/gilmorre/gleyo-Zechub-
cd gleyo-Zechub-
```

### 2. Virtual environment

```bash
# Windows
python -m venv venv
venv\Scripts\activate

# Mac/Linux
python3 -m venv venv
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

### 4. Environment variables

Create a `.env` file in the root:

```env
# ── App ──────────────────────────────────────────────
SECRET_KEY=your_secret_key

# ── ZEC Wallet ───────────────────────────────────────
WALLET=u1...                          # Gleyo's platform shielded address (receives deposits)
ZCASHD_FROM_ADDRESS=u1...             # Address Nozy sends withdrawals from
NOZY_API_URL=http://127.0.0.1:3000    # Nozy API server URL
EVM_WALLET=0x...                     # Off-ramp address — receives USDT/USDC deposits (BSC/Polygon/Base), converted and credited as ZEC in Gleyo's ledger
DEFUSE_JWT_TOKEN=your_defuse_jwt_token # Auth token for NEAR Intents (Defuse Protocol) — required for USDT/USDC → ZEC auto-conversion on funding
NOZY_API_KEY=                        # Required — must match the X-API-Key configured on the Nozy server.
NOZY_WALLET_PASSWORD=your_password

# ── Database ─────────────────────────────────────────
# DATABASE_URL=postgresql://...       # Production uses Postgres (AWS RDS). Defaults to SQLite if unset, for local dev.

# ── Email ────────────────────────────────────────────
MAIL_USER=your_email@gmail.com
MAIL_PASS=your_app_password
RESEND_API_KEY=your_resend_key
EMAIL_FROM=Gleyo <noreply@gleyo.app>
SMTP_PORT=587
SMTP_USERNAME=your_email@gmail.com
SMTP_PASSWORD=your_app_password
ADMIN_EMAIL=your_admin_email

# ── GitHub OAuth ─────────────────────────────────────
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GITHUB_REDIRECT_URI=https://yourdomain.com/github/callback

# ── Google OAuth ─────────────────────────────────────
# NOTE: always use the GOOGLE_ prefix here, never a bare CLIENT_ID/CLIENT_SECRET —
# a generic name will collide with Discord's client_id/secret env vars below
# and cause silent cross-provider auth failures.
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REDIRECT_URI=https://yourdomain.com/google/callback

# ── Twitter OAuth ────────────────────────────────────
TWITTER_CLIENT_ID=your_twitter_client_id
TWITTER_CLIENT_SECRET=your_twitter_client_secret
TWITTER_REDIRECT_URI=https://yourdomain.com/twitter-callback
TWITTER_BEARER_TOKEN=your_bearer_token
COMM_TWITTER_CLIENT_ID=your_community_twitter_client_id
COMM_TWITTER_CLIENT_SECRET=your_community_twitter_client_secret
COMM_TWITTER_REDIRECT_URI=https://yourdomain.com/community-twitter-callback

# ── Discord ──────────────────────────────────────────
# Two separate Discord OAuth flows exist: user login/linking (DISCORD_*)
# and the bot invite flow (BOT_DISCORD_*). Keep these prefixes distinct —
# do not fall back to a bare CLIENT_ID/CLIENT_SECRET for either.
DISCORD_BOT_TOKEN=your_discord_bot_token
DISCORD_CLIENT_ID=your_discord_client_id
DISCORD_CLIENT_SECRET=your_discord_client_secret
DISCORD_REDIRECT_URI=https://yourdomain.com/discord/callback
BOT_DISCORD_CLIENT_ID=your_bot_client_id
BOT_DISCORD_CLIENT_SECRET=your_bot_client_secret
BOT_DISCORD_REDIRECT_URI=https://yourdomain.com/bot/callback

# ── Telegram ─────────────────────────────────────────
TELEGRAM_BOT_TOKEN=your_telegram_bot_token

# ── TikTok ───────────────────────────────────────────
TIKTOK_CLIENT_KEY=your_tiktok_client_key
TIKTOK_CLIENT_SECRET=your_tiktok_client_secret
TIKTOK_REDIRECT_URI=https://yourdomain.com/tiktok/callback

# ── YouTube ──────────────────────────────────────────
YOUTUBE_API_KEY=your_youtube_api_key
YOUTUBE_CLIENT_ID=your_youtube_client_id
YOUTUBE_CLIENT_SECRET=your_youtube_client_secret

# ── Payments (optional) ──────────────────────────────
STRIPE_SECRET_KEY=your_stripe_secret_key

# ── Third-party data (optional) ──────────────────────
RAPIDAPI_KEY=your_rapidapi_key

# ── Push Notifications ───────────────────────────────
VAPID_PUBLIC_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key

# ── Redis ────────────────────────────────────────────
# Used for session storage (and recommended for rate limiting).
# If unset or unreachable, Gleyo automatically falls back to
# filesystem-based sessions — the app will still run, but sessions
# won't persist across multiple app instances/workers, and are more
# prone to file-locking issues under concurrent load. Redis is strongly
# recommended for anything beyond local single-process dev.
REDIS_URL=redis://your_redis_url

# ── Supabase (optional storage) ──────────────────────
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key       # Server-side key (e.g. service role/secret key) — keep this out of any client-facing code, it's used server-side only for storage operations
```

> ⚠️ **Never use a bare `CLIENT_ID` / `CLIENT_SECRET`.** Every OAuth provider (Google, Discord, Discord bot, GitHub, Twitter, TikTok, YouTube) must use its own prefixed variable name. A generic name gets read by whichever provider's code happens to call `os.getenv("CLIENT_ID")` first, silently sending the wrong credentials to the wrong provider — this has caused real outages (Discord requests failing with a Google client ID, and vice versa).

### 5. Run the app

```bash
python app.py
```

App runs at **http://127.0.0.1:8000**

---

## Zebra Node Setup

Gleyo uses a self-hosted Zebra full node for Zcash mainnet access. Nozy Wallet connects to Zebra directly — no lightwalletd required.

### Install Rust

```bash
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
source $HOME/.cargo/env
```

### Install and run Zebra

```bash
git clone https://github.com/ZcashFoundation/zebra
cd zebra
cargo install --locked --bin zebrad zebrad
zebrad start
```

> Zebra must sync to Orchard activation height (~1.8M blocks) before Nozy can operate. Full sync to mainnet tip (~3.4M+ blocks) is required for live withdrawals and deposit verification.

> Keep Zebra on the latest stable tagged release (not a release-candidate/`-rc` build). Zebra's built-in "end of support" check will force-stop the node once a build falls too far behind — check `git describe --tags` against the newest tag under [Releases](https://github.com/ZcashFoundation/zebra/tags) periodically.

---

## Nozy API Server Setup

The [Nozy Wallet](https://github.com/LEONINE-DAO/Nozy-wallet) API server by LEONINE DAO is a Rust REST API that wraps the Nozy wallet backend and exposes it via HTTP on port 3000. Gleyo uses it to sync with Zebra, check balances, and send shielded transactions.

```bash
# Install protobuf compiler (required for zeaking/build.rs)
sudo apt install protobuf-compiler

# Clone and build
git clone https://github.com/LEONINE-DAO/Nozy-wallet.git
cd Nozy-wallet/api-server
cargo build --release
cargo run
```

API server runs at **http://0.0.0.0:3000**

See the [Nozy API docs](https://github.com/LEONINE-DAO/Nozy-wallet/blob/main/api-server/README.md) for full endpoint reference.