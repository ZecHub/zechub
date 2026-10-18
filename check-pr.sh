#!/usr/bin/env bash
# Local stand-in for the zechub translation CI gates.
# Run from the zechub repo root. Checks against upstream, not your fork.
#
#   ./check-pr.sh                 # fetch upstream, run all gates
#   ./check-pr.sh --no-fetch      # skip fetch
#   ./check-pr.sh --base REF      # compare against REF instead of upstream/main
set -u

base="upstream/main"
do_fetch=1

while [ $# -gt 0 ]; do
  case "$1" in
    --no-fetch) do_fetch=0 ;;
    --base) shift; base="${1:-}" ;;
    -h|--help)
      sed -n '2,8p' "$0"
      exit 0
      ;;
    *) echo "unknown arg: $1" >&2; exit 2 ;;
  esac
  shift
done

if ! git rev-parse --show-toplevel >/dev/null 2>&1; then
  echo "error: not inside a git repo" >&2
  exit 2
fi
cd "$(git rev-parse --show-toplevel)"

if ! git remote get-url upstream >/dev/null 2>&1; then
  echo "error: no 'upstream' remote. Add it:" >&2
  echo "  git remote add upstream https://github.com/ZecHub/zechub.git" >&2
  exit 2
fi

if [ "$do_fetch" -eq 1 ]; then
  echo "==> fetching upstream"
  git fetch upstream --quiet
fi

if ! git rev-parse --verify "$base" >/dev/null 2>&1; then
  echo "error: base ref '$base' does not exist" >&2
  exit 2
fi

fail=0
run() {
  local name="$1"; shift
  echo
  echo "==> $name"
  if "$@"; then
    echo "    ok"
  else
    echo "    FAILED"
    fail=1
  fi
}

run "brand spelling" node scripts/check-brand-spelling.mjs --base "$base"
run "protected terms" node scripts/check-protected-terms.mjs --base "$base"
run "manifest invariants" node translation/check-invariants.mjs --base "$base"
run "menu titles" node translation/gen-menu-titles.mjs --check

echo
if [ "$fail" -eq 0 ]; then
  echo "all gates passed against $base"
  exit 0
fi
echo "one or more gates failed against $base"
echo "brand spelling: fix the English page, then re-run"
echo "protected terms: only 'introduced' lines fail; append the missing term verbatim to that translation"
echo "invariants / menu titles: usually a rename — update curated-pages.txt, sync-state.json, and run node translation/gen-menu-titles.mjs"
exit 1
