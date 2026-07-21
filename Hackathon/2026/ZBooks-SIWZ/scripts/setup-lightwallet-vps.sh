#!/usr/bin/env bash
# Bootstrap a SIWZ lightwallet RPC service on a fresh Ubuntu 22.04+/24.04 VPS.
#
#   curl -sL https://raw.githubusercontent.com/.../setup-lightwallet-vps.sh | bash
#   # or download and:
#   bash setup-lightwallet-vps.sh
#
# Installs node + zingo-cli, generates a wallet + RPC token, configures
# nginx + Let's Encrypt, and starts the wrapper service under systemd.
#
# Requires: a fresh Ubuntu VPS, a domain pointed at it (A record), and
# ports 80 + 443 open. ~2GB RAM is enough.

set -euo pipefail

# ──────────────────────────────────────────────────────────────────────
# Configurable
# ──────────────────────────────────────────────────────────────────────
RPC_DOMAIN="${RPC_DOMAIN:-}"   # e.g. rpc.zbooks.example.com
LETSENCRYPT_EMAIL="${LETSENCRYPT_EMAIL:-}"
SWZ_REPO="${SWZ_REPO:-}"       # your fork's git URL
SIWZ_USER="${SIWZ_USER:-siwz}"
# Pinned zingo-cli ref. Wrapper depends on `messages` returning
# { value_transfers: [...] }; bump only after testing the wrapper against
# the new version. Pass `cargo` to build HEAD instead (unpinned).
ZINGO_GIT_REF="${ZINGO_GIT_REF:-v0.2.0}"
ZINGO_VERSION_TAG="${ZINGO_VERSION_TAG:-latest}"  # github release tag, or `cargo`

# Lightwalletd to sync from. zingo-cli needs raw gRPC (not gRPC-Web).
#
# Public mainnet endpoints (use the first that's healthy; the script will
# only try the one you set in LIGHTWALLETD). Confirmed by Zcash community
# usage and accepted for hackathon submissions per ZecHub guidance.
#
#   1. https://mainnet.lightwalletd.com:9067    — ECC's canonical endpoint
#   2. https://zec.rocks:443                    — community-run, well-maintained
#   3. https://eu.zec.rocks:443                 — EU mirror
#   4. https://na.zec.rocks:443                 — North America mirror
#
# If a public endpoint becomes unreliable, edit LIGHTWALLETD on the VPS
# and `sudo systemctl restart siwz-lightwallet`. The zingo-cli sync state
# is endpoint-agnostic — it'll pick up where it left off against the new
# server. For maximum reliability host your own lightwalletd against a
# self-hosted Zebra/zcashd full node (60-300GB disk, see Zcash docs).
# ECC's mainnet.lightwalletd.com has been unreachable; zec.rocks is the maintained default.
LIGHTWALLETD="${LIGHTWALLETD:-https://zec.rocks:443}"

# ──────────────────────────────────────────────────────────────────────
# Sanity checks
# ──────────────────────────────────────────────────────────────────────
if [[ $EUID -ne 0 ]] && ! sudo -n true 2>/dev/null; then
  echo "✗ Run as root or with passwordless sudo."
  exit 1
fi
if [[ -z "${RPC_DOMAIN}" ]]; then
  echo "Set RPC_DOMAIN to the FQDN this VPS will serve (e.g. rpc.zbooks.example.com)."
  read -r -p "RPC_DOMAIN: " RPC_DOMAIN
fi
if [[ -z "${LETSENCRYPT_EMAIL}" ]]; then
  read -r -p "LETSENCRYPT_EMAIL: " LETSENCRYPT_EMAIL
fi
if [[ -z "${SWZ_REPO}" ]]; then
  read -r -p "SWZ_REPO (git URL, your fork): " SWZ_REPO
fi

SUDO=$([[ $EUID -eq 0 ]] && echo "" || echo "sudo")

# ──────────────────────────────────────────────────────────────────────
# 0. System hygiene
# ──────────────────────────────────────────────────────────────────────
echo "──── system update + base packages ────"
$SUDO apt-get update
$SUDO apt-get install -y curl git build-essential nginx certbot python3-certbot-nginx ufw

# ──────────────────────────────────────────────────────────────────────
# 1. Firewall (don't lock yourself out)
# ──────────────────────────────────────────────────────────────────────
echo "──── firewall ────"
$SUDO ufw allow OpenSSH
$SUDO ufw allow 'Nginx Full'
$SUDO ufw --force enable

# ──────────────────────────────────────────────────────────────────────
# 2. Node 20+
# ──────────────────────────────────────────────────────────────────────
if ! command -v node >/dev/null || [[ "$(node -v | cut -d. -f1 | tr -d 'v')" -lt 20 ]]; then
  echo "──── installing Node 20 ────"
  curl -fsSL https://deb.nodesource.com/setup_20.x | $SUDO -E bash -
  $SUDO apt-get install -y nodejs
fi

# ──────────────────────────────────────────────────────────────────────
# 3. Dedicated user
# ──────────────────────────────────────────────────────────────────────
if ! id "$SIWZ_USER" &>/dev/null; then
  echo "──── creating user $SIWZ_USER ────"
  $SUDO useradd -m -s /bin/bash "$SIWZ_USER"
fi

# ──────────────────────────────────────────────────────────────────────
# 4. zingo-cli
# ──────────────────────────────────────────────────────────────────────
echo "──── zingo-cli ────"
if ! $SUDO -u "$SIWZ_USER" -- bash -c "command -v ~/.cargo/bin/zingo-cli || command -v zingo-cli"; then
  if [[ "$ZINGO_VERSION_TAG" == "cargo" ]]; then
    # Build from source. Needs 1.5GB RAM; consider swap if your VPS is tight.
    echo "Installing Rust + building zingo-cli @ $ZINGO_GIT_REF from source…"
    $SUDO -u "$SIWZ_USER" -H bash -c "
      curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh -s -- -y
      source ~/.cargo/env
      cargo install --git https://github.com/zingolabs/zingolib --tag '$ZINGO_GIT_REF' zingo-cli
    "
  else
    # Try a precompiled binary first. Adjust to whichever asset name zingolabs ships.
    echo "Looking for a precompiled release tagged $ZINGO_VERSION_TAG…"
    URL=$(curl -s "https://api.github.com/repos/zingolabs/zingolib/releases/$ZINGO_VERSION_TAG" \
      | grep browser_download_url \
      | grep -i linux \
      | grep -iv darwin \
      | head -1 \
      | cut -d'"' -f4 || true)
    if [[ -n "$URL" ]]; then
      $SUDO -u "$SIWZ_USER" -H bash -c "mkdir -p ~/bin && curl -L '$URL' -o ~/bin/zingo-cli && chmod +x ~/bin/zingo-cli"
    else
      echo "✗ No precompiled binary found; falling back to cargo build."
      echo "  Re-run with ZINGO_VERSION_TAG=cargo, or install Rust manually."
      exit 1
    fi
  fi
fi

# ──────────────────────────────────────────────────────────────────────
# 5. Initialise the wallet (creates ~/.zingo, prints the new z-addr)
# ──────────────────────────────────────────────────────────────────────
echo "──── lite wallet init ────"
echo "→ You'll be dropped into the zingo-cli REPL. Run:"
echo "    new"
echo "  ⚠️  WRITE DOWN THE SEED that prints. Without it the wallet is unrecoverable."
echo "    addresses     (copy the UA or sapling address)"
echo "    quit"
echo
$SUDO -u "$SIWZ_USER" -H bash -c "~/bin/zingo-cli --server '$LIGHTWALLETD' --data-dir ~/.zingo" || true

# ──────────────────────────────────────────────────────────────────────
# 6. Clone SWZ, deploy the wrapper
# ──────────────────────────────────────────────────────────────────────
echo "──── cloning SWZ and starting the wrapper ────"
$SUDO -u "$SIWZ_USER" -H bash -c "
  cd ~ && [[ -d SWZ ]] || git clone '$SWZ_REPO' SWZ
  cd ~/SWZ && git pull --ff-only || true
"

RPC_TOKEN=$(node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))")

echo "──── systemd unit ────"
$SUDO tee /etc/systemd/system/siwz-lightwallet.service >/dev/null <<EOF
[Unit]
Description=SIWZ lightwallet RPC wrapper
After=network-online.target
Wants=network-online.target

[Service]
Type=simple
User=$SIWZ_USER
WorkingDirectory=/home/$SIWZ_USER/SWZ/apps/lightwallet-rpc
Environment=PORT=18232
Environment=LIGHTWALLET_RPC_TOKEN=$RPC_TOKEN
Environment=ZINGO_CLI_PATH=/home/$SIWZ_USER/bin/zingo-cli
Environment=ZINGO_WALLET_DIR=/home/$SIWZ_USER/.zingo
ExecStart=/usr/bin/node src/server.mjs
Restart=on-failure
RestartSec=5
MemoryMax=1200M
MemoryHigh=900M

[Install]
WantedBy=multi-user.target
EOF
$SUDO systemctl daemon-reload
$SUDO systemctl enable --now siwz-lightwallet
sleep 1
$SUDO systemctl status --no-pager siwz-lightwallet | head -20

# ──────────────────────────────────────────────────────────────────────
# 7. nginx + Let's Encrypt
#
# Strategy: write a minimal HTTP-only vhost, get the cert via
# `certbot certonly` (no nginx plugin), then write the final HTTPS vhost
# ourselves. This guarantees our proxy_*_timeout settings survive cert
# renewals — `certbot --nginx` rewrites server blocks and would strip them.
# ──────────────────────────────────────────────────────────────────────
echo "──── rate-limit zone ────"
$SUDO tee /etc/nginx/conf.d/siwz-ratelimit.conf >/dev/null <<EOF
limit_req_zone \$binary_remote_addr zone=siwzlw:10m rate=2r/s;
EOF

echo "──── nginx HTTP vhost (ACME bootstrap) ────"
$SUDO tee /etc/nginx/sites-available/siwz-lightwallet >/dev/null <<EOF
server {
    listen 80;
    server_name $RPC_DOMAIN;
    location /.well-known/acme-challenge/ { root /var/www/html; }
    location / { return 444; }
}
EOF
$SUDO ln -sf /etc/nginx/sites-available/siwz-lightwallet /etc/nginx/sites-enabled/
$SUDO rm -f /etc/nginx/sites-enabled/default
$SUDO mkdir -p /var/www/html
$SUDO nginx -t && $SUDO systemctl reload nginx

echo "──── certbot certonly (no nginx-plugin rewrite) ────"
$SUDO certbot certonly --webroot --webroot-path=/var/www/html \
  --non-interactive --agree-tos -m "$LETSENCRYPT_EMAIL" -d "$RPC_DOMAIN"

echo "──── nginx HTTPS vhost (with the long-sync timeouts baked in) ────"
$SUDO tee /etc/nginx/sites-available/siwz-lightwallet >/dev/null <<EOF
server {
    listen 80;
    server_name $RPC_DOMAIN;
    return 301 https://\$host\$request_uri;
}

server {
    listen 443 ssl http2;
    server_name $RPC_DOMAIN;

    ssl_certificate     /etc/letsencrypt/live/$RPC_DOMAIN/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/$RPC_DOMAIN/privkey.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_prefer_server_ciphers off;

    location / {
        proxy_pass http://127.0.0.1:18232;
        proxy_set_header Host \$host;
        proxy_set_header X-Real-IP \$remote_addr;
        proxy_set_header X-Forwarded-For \$proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto \$scheme;

        # First UFVK sync can take a few minutes — default 60s would 504.
        proxy_connect_timeout 10s;
        proxy_read_timeout 600s;
        proxy_send_timeout 600s;

        client_max_body_size 8k;
        limit_req zone=siwzlw burst=20 nodelay;
    }
}
EOF
$SUDO nginx -t && $SUDO systemctl reload nginx

# ──────────────────────────────────────────────────────────────────────
# 8. Final report
# ──────────────────────────────────────────────────────────────────────
echo
echo "============================================================"
echo "✓ SIWZ lightwallet RPC is up at: https://$RPC_DOMAIN"
echo
echo "Add these to apps/demo/.env.local on whatever runs ZBooks:"
echo
echo "  SIWZ_SERVICE_ADDRESS=<paste your zs… or u1… from earlier>"
echo "  LIGHTWALLET_RPC_URL=https://$RPC_DOMAIN"
echo "  LIGHTWALLET_RPC_TOKEN=$RPC_TOKEN"
echo "  SIWZ_DEMO=0"
echo
echo "Then restart ZBooks. The shielded explorer will pick up the URL+TOKEN"
echo "automatically (see apps/demo/src/lib/explorer.ts → getShieldedExplorer)."
echo
echo "Test from your laptop:"
echo "  curl -s https://$RPC_DOMAIN/health"
echo "============================================================"
