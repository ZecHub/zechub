# Gleyo — Full Setup Guide

This covers everything needed to run Gleyo with full ZEC functionality on real Zcash mainnet: environment variables, Supabase, the Zebra full node, and the Nozy Wallet API server. For just getting the app itself running locally, see the Setup section in [README.md](./README.md).

---

## Requirements

- **Python 3.12.x** (recommended and tested — e.g. 3.12.11)
  - ⚠️ **Python 3.14 is not currently supported.** `pythonnet==3.0.5` (a dependency) does not support 3.14 yet. If your system ships with Python 3.14 by default, see [Linux: installing Python 3.12 with pyenv](#linux-installing-python-312-with-pyenv) below.
- Git
- Rust (for building the Nozy API server)
- A running Zebra node (Ubuntu VPS, 400GB+ SSD recommended) — **only required for real mainnet ZEC transactions**, not for local development. See [Nozy & Local Development](#nozy--local-development).

---

### 1. Clone the repo

```bash
git clone https://github.com/gilmorre/gleyo-Zechub-
cd gleyo-Zechub-
```

### 2. Virtual environment

```bash
python -m venv venv
```

Activate it:

**Windows**
```bash
venv\Scripts\activate
```

**Linux/macOS**
```bash
source venv/bin/activate
```

### 3. Install dependencies

```bash
pip install -r requirements.txt
```

> If this step fails with errors related to `pythonnet`, double check you're running Python 3.12.x and not 3.14 (see above).

#### Linux/macOS: fixing `requirements.txt` before installing

`requirements.txt` is currently authored on Windows, which causes two problems on Linux/macOS:

1. **Line endings** — the file uses Windows-style (CRLF) line endings, which some Linux `pip` setups don't handle well. Convert it to Unix line endings first:
   ```bash
   sudo apt install -y dos2unix   # if not already installed
   dos2unix requirements.txt
   ```
2. **Windows-only packages** — the file includes a few packages that only build on Windows and will fail to install (or simply aren't needed) on Linux/macOS: `pythonnet`, `clr_loader`, `pypiwin32`, `pywin32`, and `audioop-lts`. Check whether they're present:
   ```bash
   grep -E 'pythonnet|clr_loader|pypiwin32|pywin32|audioop-lts' requirements.txt
   ```
   If they show up, open the file (e.g. `nano requirements.txt`), delete those lines, save, and re-run `pip install -r requirements.txt`.

This is a known issue and will be fixed upstream in `requirements.txt` itself — until then, Linux/macOS users need to edit the file directly as above.

---

## Linux: installing Python 3.12 with pyenv

Skip this section if `python3 --version` already reports **3.12.x**.

Many recent Linux distros (including newer Ubuntu releases) ship with Python 3.13 or 3.14 by default, which is too new for this project. `pyenv` lets you install and use Python 3.12 alongside your system Python without touching it.

**1. Install build dependencies**

```bash
sudo apt update
sudo apt install -y build-essential libssl-dev zlib1g-dev libbz2-dev \
  libreadline-dev libsqlite3-dev curl git libncursesw5-dev xz-utils \
  tk-dev libxml2-dev libxmlsec1-dev libffi-dev liblzma-dev
```

**2. Install pyenv**

```bash
curl https://pyenv.run | bash
```

Add pyenv to your shell (append to `~/.bashrc` or `~/.zshrc`, then restart your shell or `source` the file):

```bash
export PYENV_ROOT="$HOME/.pyenv"
export PATH="$PYENV_ROOT/bin:$PATH"
eval "$(pyenv init -)"
```

**3. Install Python 3.12.11**

```bash
pyenv install 3.12.11
```

**4. Create a fresh virtual environment using it**

From the `gleyo-Zechub-` project directory:

```bash
pyenv local 3.12.11
~/.pyenv/versions/3.12.11/bin/python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
```

`python --version` inside the activated venv should now report `3.12.11`.

---

## Supabase (mandatory for Gleyo to run)

Gleyo uses Supabase for storage and, depending on configuration, other backend services. This setup is required even if you only want to run Gleyo locally.

1. Create a free project at [supabase.com](https://supabase.com).
2. In your Supabase project settings, copy the project's `SUPABASE_URL` and a server-side `SUPABASE_KEY` (e.g. the service role/secret key) into your `.env` file (see [Environment variables](#environment-variables) below). Keep `SUPABASE_KEY` out of any client-facing code — it's used server-side only.
3. In the Supabase dashboard, go to **Storage** and create a new bucket named **exactly**:
   ```
   uploads
   ```
   This is the single most commonly missed step during local setup — the app boots fine without it, but uploads will silently fail until it exists.
4. Restart the app so the new `.env` values are picked up. `app.py` already calls `load_dotenv()` on startup, so you don't need to change any code — just stop the running server (`Ctrl+C`) and run `python app.py` again after editing `.env`.

**Without the `uploads` bucket, the app will still boot, but:**
- Avatar uploads will fail
- Community logo uploads will fail (e.g. `Community logo upload failed: Invalid URL '.../storage/v1/object/uploads/communities/...'`)
- Any other image upload will fail

If you still see upload errors after creating the bucket and restarting, double-check `SUPABASE_URL` and `SUPABASE_KEY` were copied correctly and that the app was actually restarted (edits to `.env` are not picked up on a running process).

---

## Environment variables

Copy the example file and fill in your own credentials — never commit real secrets to the repo:

```bash
cp .env.example .env
```

Then edit `.env` with your own values. See the full annotated reference below.

**Mandatory just to boot the app:**

| Variable | Purpose |
|---|---|
| `SECRET_KEY` | Flask/app session secret |
| `SUPABASE_URL` | Your Supabase project URL |
| `SUPABASE_KEY` | Your Supabase server-side key |

Everything else below is **optional** and only needed if you want the corresponding feature (ZEC payments, OAuth logins, email, bots, etc.).

```env
# ── App ──────────────────────────────────────────────
SECRET_KEY=your_secret_key

# ── ZEC Wallet ───────────────────────────────────────
WALLET=u1...                          # Gleyo's platform shielded address (receives deposits)
ZCASHD_FROM_ADDRESS=u1...             # Address Nozy sends withdrawals from
NOZY_API_URL=http://127.0.0.1:3000    # Nozy API server URL
EVM_WALLET=0x...                     # Off-ramp address — receives USDT/USDC deposits (BSC/Polygon/Base), converted and credited as ZEC in Gleyo's ledger
DEFUSE_JWT_TOKEN=your_defuse_jwt_token # Auth token for NEAR Intents (Defuse Protocol) — required for USDT/USDC → ZEC auto-conversion on funding
NOZY_API_KEY=                        # Required — must match the X-API-Key configured on the Nozy server. Generate with: openssl rand -hex 32
NOZY_WALLET_PASSWORD=your_password
# LIGHTWALLETD_GRPC=your_host:port    # Optional — point Nozy at a custom Lightwalletd endpoint (e.g. over Tailscale) instead of localhost. Useful when running Nozy in Docker/VMs.

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

# ── Supabase (Mandatory for Gleyo to run) ──────────────────────
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_KEY=your_supabase_key       # Server-side key (e.g. service role/secret key) — keep this out of any client-facing code, it's used server-side only for storage operations
```

> ⚠️ **Never use a bare `CLIENT_ID` / `CLIENT_SECRET`.** Every OAuth provider (Google, Discord, Discord bot, GitHub, Twitter, TikTok, YouTube) must use its own prefixed variable name. A generic name gets read by whichever provider's code happens to call `os.getenv("CLIENT_ID")` first, silently sending the wrong credentials to the wrong provider — this has caused real outages (Discord requests failing with a Google client ID, and vice versa).

### 4. Run the app

```bash
python app.py
```

App runs at **http://127.0.0.1:8000**

---

## Nozy & Local Development

You do **not** need a local Zebra node or Nozy setup to develop Gleyo. The following all work locally out of the box, using just Supabase and your `.env`:

- Community features
- Chat
- Quests
- Analytics
- Uploads

The **production mainnet ZEC payment flow is intentionally protected behind our server firewall**. This means you won't be able to perform real ZEC transactions from your local machine unless you configure your own Nozy/Zebra infrastructure, as described below.

### Generating a Nozy API key

`NOZY_API_KEY` must match the `X-API-Key` configured on your Nozy server. Generate a secure value with:

```bash
openssl rand -hex 32
```

### Custom Lightwalletd endpoint (LIGHTWALLETD_GRPC)

If you're running Nozy inside Docker or a VM, you can point it at a Lightwalletd instance elsewhere on your network (for example, over Tailscale) instead of `localhost` by setting:

```env
LIGHTWALLETD_GRPC=your_host:port
```

---

## Zebra Node Setup

Only needed if you want to run real mainnet ZEC transactions locally (see [Nozy & Local Development](#nozy--local-development) above). Gleyo uses a self-hosted Zebra full node for Zcash mainnet access. Nozy Wallet connects to Zebra directly — no lightwalletd required for this path.

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

> **Build/runtime crashes:** if `cargo run` crashes or the API server panics on startup, try pinning `axum` to `0.7` in `Nozy-wallet/api-server/Cargo.toml` and updating:
> ```bash
> cargo update -p axum
> cargo run --release
> ```

---

## Verifying your setup

Before submitting a PR, please test your changes by following this guide on a **completely fresh Linux VM** (not your existing dev machine). This is the best way to catch:

- Missing system dependencies that happen to already be installed on your machine
- Undocumented prerequisites
- Steps that only work because of leftover local state

If you hit a step that isn't covered here, please update this guide as part of your PR.