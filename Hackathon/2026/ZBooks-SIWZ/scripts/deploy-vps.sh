#!/usr/bin/env bash
# Update the lightwallet-rpc wrapper on the VPS to match the fork, then restart.
# The VPS is a deploy target, not a dev box: this discards any local edits on the
# VPS and makes it match origin/main exactly. That is the point, it ends the
# hand-patching. Run on the VPS:
#
#   bash ~/SWZ/scripts/deploy-vps.sh
#
set -euo pipefail

cd "$(dirname "$0")/.."   # repo root

echo "==> fetching origin"
git fetch --all --prune

echo "==> resetting to origin/main (local VPS edits are discarded)"
git reset --hard origin/main

echo "==> syntax-checking the wrapper"
node --check apps/lightwallet-rpc/src/server.mjs

echo "==> restarting the service"
sudo systemctl restart siwz-lightwallet
sleep 1
sudo systemctl --no-pager status siwz-lightwallet | head -6

echo "==> done. health:"
curl -s http://127.0.0.1:18232/health || true
echo
