# lightwalletd built from source and pinned. If you'd rather pull a published
# image, replace this build with `image: electriccoinco/lightwalletd:<tag>` in
# docker-compose.yml (check Docker Hub for a current tag).
FROM golang:1.24-bookworm AS builder
ARG LWD_VERSION=v0.4.19
RUN apt-get update && apt-get install -y --no-install-recommends git && \
    git clone --depth 1 --branch "$LWD_VERSION" \
      https://github.com/zcash/lightwalletd.git /src
WORKDIR /src
RUN go build -o /lightwalletd .

FROM debian:bookworm-slim
RUN apt-get update && apt-get install -y --no-install-recommends \
      ca-certificates netcat-openbsd && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
COPY --from=builder /lightwalletd /usr/local/bin/lightwalletd
COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh && mkdir -p /data /etc/lightwalletd
EXPOSE 9067
ENTRYPOINT ["/entrypoint.sh"]
