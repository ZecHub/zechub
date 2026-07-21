#!/usr/bin/env bash
set -euo pipefail

exec "$(dirname "$0")/../target/debug/paypunk" tui

