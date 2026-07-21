#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")/../support/ethereum"
exec docker compose up "$@"
