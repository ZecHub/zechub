#!/usr/bin/env bash
set -euo pipefail
echo "[lwd] waiting for zcashd RPC…"
until nc -z zcashd 18232; do sleep 1; done
sleep 3
echo "[lwd] starting lightwalletd on 0.0.0.0:9067 (no TLS)…"
exec lightwalletd \
  --zcash-conf-path=/etc/lightwalletd/zcash.conf \
  --data-dir=/data \
  --log-file=/dev/stdout \
  --grpc-bind-addr=0.0.0.0:9067 \
  --rpcuser=zcashrpc \
  --rpcpassword=notsecure \
  --rpchost=zcashd \
  --rpcport=18232 \
  --no-tls-very-insecure
