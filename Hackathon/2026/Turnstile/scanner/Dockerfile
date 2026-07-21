FROM rust:1-slim-bookworm AS builder

RUN apt-get update && apt-get install -y --no-install-recommends \
    pkg-config libssl-dev protobuf-compiler git ca-certificates curl \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /build
COPY Cargo.toml Cargo.lock ./
COPY core core
COPY scanner scanner
COPY cli cli

RUN mkdir -p /root/.local/share/ZcashParams
RUN cargo build --release -p turnstile-scanner

FROM debian:bookworm-slim

RUN apt-get update && apt-get install -y --no-install-recommends \
    ca-certificates libssl3 \
    && rm -rf /var/lib/apt/lists/* \
    && useradd --system --create-home --uid 10001 turnstile

COPY --from=builder /build/target/release/turnstile-scanner /usr/local/bin/turnstile-scanner
COPY --from=builder --chown=turnstile:turnstile \
    /root/.local/share/ZcashParams /home/turnstile/.local/share/ZcashParams

USER turnstile
ENV PORT=8080
EXPOSE 8080

CMD ["turnstile-scanner"]
