# Multi-stage build: Rust to compile zingo-cli once, slim Node for the wrapper.
# Stage 1 (zingo build) takes ~10 minutes the first time. Subsequent builds
# reuse the cached layer; runtime image is small (~150 MB) and Node-only.

FROM rust:1.78-slim-bookworm AS zingo-builder

RUN apt-get update && apt-get install -y --no-install-recommends \
        git pkg-config libssl-dev protobuf-compiler ca-certificates \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
RUN git clone --depth 1 https://github.com/zingolabs/zingolib.git
WORKDIR /build/zingolib
RUN cargo build --release --bin zingo-cli

# ----------------------------------------------------------------------------

FROM node:22-slim

RUN apt-get update && apt-get install -y --no-install-recommends ca-certificates curl \
    && rm -rf /var/lib/apt/lists/* \
    && useradd -m -u 1000 siwz

# Drop the compiled zingo-cli into PATH.
COPY --from=zingo-builder /build/zingolib/target/release/zingo-cli /usr/local/bin/zingo-cli
RUN chmod +x /usr/local/bin/zingo-cli

WORKDIR /app
COPY --chown=siwz:siwz package.json ./
COPY --chown=siwz:siwz src ./src

# Persistent wallet store. Mount a named volume here so the synced wallets
# survive container restarts.
RUN mkdir -p /home/siwz/.zingo /home/siwz/.zingo-ufvks \
    && chown -R siwz:siwz /home/siwz

USER siwz

ENV PORT=18232 \
    ZINGO_CLI_PATH=/usr/local/bin/zingo-cli \
    ZINGO_WALLET_DIR=/home/siwz/.zingo \
    ZINGO_UFVK_WALLETS_DIR=/home/siwz/.zingo-ufvks \
    LIGHTWALLETD=https://zec.rocks:443,https://na.zec.rocks:443,https://eu.zec.rocks:443 \
    BACKGROUND_SYNC=1 \
    BACKGROUND_SYNC_INTERVAL_MS=120000

# LIGHTWALLET_RPC_TOKEN is REQUIRED at runtime. The server fails fast without it.
# Generate one with:
#   node -e "console.log(require('crypto').randomBytes(32).toString('base64url'))"
# Then `docker run -e LIGHTWALLET_RPC_TOKEN=$TOKEN ...`.

EXPOSE 18232

HEALTHCHECK --interval=30s --timeout=10s --start-period=20s --retries=3 \
    CMD curl -fsS "http://localhost:${PORT:-18232}/health" || exit 1

CMD ["node", "src/server.mjs"]
