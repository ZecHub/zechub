ARG RUST_VERSION=1.90
ARG LIGHTWALLETD_VERSION=0.4.18
ARG ZCASH_VERSION=6.12.1
ARG ZAINO_IMAGE_TAG=0.3.0-rc.1
ARG NEXTEST_VERSION=0.9.128

FROM docker.io/zodlinc/zcash:v${ZCASH_VERSION} AS zcashd-downloader
FROM docker.io/zingodevops/zaino:${ZAINO_IMAGE_TAG} AS zainod-downloader

FROM debian:trixie-slim AS builder

ARG LIGHTWALLETD_VERSION

WORKDIR /usr/src

# Install dependencies and update ca certificates
RUN apt update \
    && apt install -y --no-install-recommends --no-install-suggests \
    build-essential \
    pkg-config \
    libc6-dev \
    m4 \
    autoconf \
    libtool \
    ncurses-dev \
    unzip \
    git \
    python3 \
    python3-zmq \
    zlib1g-dev \
    curl \
    bsdmainutils \
    automake \
    golang \
    ca-certificates \
    && update-ca-certificates

# Build lightwalletd
RUN git clone https://github.com/zcash/lightwalletd \
    && cd lightwalletd \
    && git checkout "v${LIGHTWALLETD_VERSION}" \
    && make

FROM debian:trixie-slim AS runner

ARG RUST_VERSION
ARG LIGHTWALLETD_VERSION
ARG ZCASH_VERSION
ARG ZAINO_IMAGE_TAG
ARG NEXTEST_VERSION

LABEL org.zingolib.test-artifacts.versions.rust="${RUST_VERSION}"
LABEL org.zingolib.test-artifacts.versions.lightwalletd="${LIGHTWALLETD_VERSION}"
LABEL org.zingolib.test-artifacts.versions.zcashd="${ZCASH_VERSION}"
LABEL org.zingolib.test-artifacts.versions.zaino="${ZAINO_IMAGE_TAG}"
LABEL org.zingolib.test-artifacts.versions.nextest="${NEXTEST_VERSION}"

# Copy regtest binaries and zcash params from builder
COPY --from=builder /usr/src/lightwalletd/lightwalletd /usr/bin/
COPY --from=zcashd-downloader /usr/local/bin/zcashd /usr/bin/
COPY --from=zcashd-downloader /usr/local/bin/zcash-cli /usr/bin/
COPY --from=zainod-downloader /usr/local/bin/zainod /usr/bin/

# Install dependencies and update ca certificates
RUN apt update \
    && apt install -y --no-install-recommends --no-install-suggests \
    python3 \
    git \
    gcc \
    curl \
    pkg-config \
    libssl-dev \
    libsqlite3-dev \
    build-essential \
    protobuf-compiler \
    libclang-dev \
    ca-certificates \
    && update-ca-certificates

# Install pinned Rust tooling and test helpers
ENV HOME=/root
ENV CARGO_HOME=$HOME/.cargo
ENV RUSTUP_HOME=$HOME/.rustup
ENV PATH=$PATH:$CARGO_HOME/bin
RUN curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs \
    | sh -s -- -y --default-toolchain "${RUST_VERSION}" --profile minimal \
    && rustup component add clippy rustfmt
RUN cargo install cargo-nextest --version "${NEXTEST_VERSION}" --locked

# Apt clean up
RUN apt autoremove -y \
    && apt clean \
    && rm -rf /var/lib/apt/lists/*
