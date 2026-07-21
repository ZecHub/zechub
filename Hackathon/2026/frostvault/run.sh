#!/usr/bin/env bash
# One-command dev launcher: starts the real Rust FROST backend and the
# Next.js frontend together. Judges/reviewers can run `./run.sh` instead of
# juggling two terminals.
set -e
cd "$(dirname "$0")"

if [ ! -d node_modules ]; then
  echo "Installing frontend dependencies..."
  npm install
fi

echo "Building backend (first run may take a minute)..."
(cd backend && cargo build --quiet)

echo "Starting backend on http://localhost:8080 ..."
(cd backend && ./target/debug/frostvault-backend) &
BACKEND_PID=$!

cleanup() {
  echo ""
  echo "Stopping backend..."
  kill "$BACKEND_PID" 2>/dev/null || true
}
trap cleanup EXIT INT TERM

sleep 1
echo "Starting frontend on http://localhost:3000 ..."
npm run dev
