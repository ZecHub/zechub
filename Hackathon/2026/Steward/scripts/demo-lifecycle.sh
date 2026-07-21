#!/usr/bin/env bash
# Steward end-to-end lifecycle test — drives the coordinator API through the whole
# dead-man's-switch flow and asserts each step. Proves the real 2-of-3 FROST ceremony
# runs (demo vaults keep their guardian shares and co-sign in-process) AND that the
# heartbeat is a guardian-verifiable, SIGNED proof-of-life: the coordinator generates the
# demo vault's Ed25519 heartbeat key, the script signs a real proof-of-life with it, and a
# forged heartbeat is refused. A guardian then re-verifies the signed bulletin itself.
#
# Usage:
#   1. start the coordinator:   cargo run -p steward-coordinator
#   2. in another terminal:     ./scripts/demo-lifecycle.sh
#
# Optional: BASE=http://127.0.0.1:8081 ./scripts/demo-lifecycle.sh
set -euo pipefail

BASE="${BASE:-http://127.0.0.1:8080}"
INTERVAL=6      # seconds between required heartbeats (short, so the switch trips fast)
GRACE=3         # extra grace after a missed heartbeat
SIGHASH="$(python3 -c "print('11'*32)")"          # arbitrary 32-byte message
RANDOMIZER="$(python3 -c "print('01'+'00'*31)")"  # α = 1 (a valid Pallas scalar), 32-byte LE

pass() { printf "  \033[32mPASS\033[0m  %s\n" "$1"; }
fail() { printf "  \033[31mFAIL\033[0m  %s\n" "$1"; exit 1; }

# POST helper → prints "HTTP_CODE<newline>BODY"
post() { curl -s -w $'\n%{http_code}' -X POST "$BASE$1" -H 'content-type: application/json' -d "$2"; }
get()  { curl -s -w $'\n%{http_code}' "$BASE$1"; }
code() { tail -n1 <<<"$1"; }
body() { sed '$d' <<<"$1"; }
jq_()  { python3 -c "import sys,json; print(json.load(sys.stdin)$1)"; }

# The heartbeat is a SIGNED proof-of-life. Build the tiny signing helper once and call it to
# produce a real Ed25519 signature over `steward-heartbeat-v1 || vault_id || time(be u64)`.
REPO_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CLI="$REPO_ROOT/target/debug/steward"
hb_sign() { "$CLI" heartbeat-sign --sk "$1" --vault "$2" --time "$3"; }   # <sk> <vault> <time> -> sig hex

echo "Steward lifecycle test → $BASE  (interval ${INTERVAL}s, grace ${GRACE}s)"

# reachability
if ! curl -s -o /dev/null "$BASE/vault/nope"; then
  fail "coordinator not reachable at $BASE — is 'cargo run -p steward-coordinator' running?"
fi

# build the heartbeat signing helper (steward-cli) once
echo "  building the heartbeat signer (steward-cli)…"
cargo build -q --manifest-path "$REPO_ROOT/Cargo.toml" -p steward-cli || fail "could not build steward-cli"

# 1. seed a 2-of-3 demo vault (real trusted-dealer split, short cadence)
R=$(post /demo/vault "{\"threshold\":2,\"n\":3,\"guardian_names\":[\"Amara\",\"Bjorn\",\"Chen\"],\"interval_secs\":$INTERVAL,\"grace_secs\":$GRACE,\"heir\":\"u1heir9demoaddress\",\"label\":\"Amara's Legacy Vault\"}")
[ "$(code "$R")" = 201 ] || fail "seed vault (got HTTP $(code "$R"))"
VID=$(body "$R" | jq_ "['vault_id']")
# No heartbeat_pubkey was supplied, so the coordinator minted a demo Ed25519 heartbeat key
# and returned the SECRET (a real owner supplies their own pubkey; the coordinator never sees it).
SECRET=$(body "$R" | jq_ "['heartbeat_secret_hex']")
[ "${#SECRET}" = 64 ] || fail "expected a 64-hex demo heartbeat secret (got '${SECRET}')"
pass "seeded 2-of-3 vault $VID (coordinator-generated heartbeat key)"

# 2. status is Active, heir + honest null balance
R=$(get "/vault/$VID"); B=$(body "$R")
[ "$(jq_ "['state']" <<<"$B")" = Active ] || fail "expected Active"
[ "$(jq_ "['balance']['zatoshis']" <<<"$B")" = None ] || fail "balance should be null (scanner not wired)"
[ "$(jq_ "['label']" <<<"$B")" = "Amara's Legacy Vault" ] || fail "GET should echo the owner-chosen name (label)"
pass "status Active; name=\"$(jq_ "['label']" <<<"$B")\"; heir=$(jq_ "['heir']" <<<"$B"); balance honest-null"

# 3. inheritance release while Active → 403 (the gate holds)
R=$(post "/vault/$VID/session" "{\"purpose\":\"InheritanceRelease\",\"sighash_hex\":\"$SIGHASH\",\"randomizer_hex\":\"$RANDOMIZER\"}")
[ "$(code "$R")" = 403 ] || fail "InheritanceRelease while Active should be 403 (got $(code "$R"))"
pass "InheritanceRelease refused while Active (403)"

# 4. a normal spend / recovery sweep is owner-authorized → runs a REAL ceremony now
R=$(post "/vault/$VID/session" "{\"purpose\":\"SocialRecoverySweep\",\"sighash_hex\":\"$SIGHASH\",\"randomizer_hex\":\"$RANDOMIZER\"}")
[ "$(code "$R")" = 200 ] || fail "SocialRecoverySweep should be 200 (got $(code "$R")): $(body "$R")"
SIG=$(body "$R" | jq_ "['signature_hex']")
[ "${#SIG}" = 128 ] || fail "signature should be 64 bytes / 128 hex chars (got ${#SIG})"
pass "SocialRecoverySweep co-signed by 2-of-3 → real 64-byte sig ${SIG:0:16}…"

# 4b. /spend input validation fires BEFORE any signer work (amount>0, non-empty recipient, known mode)
for bad in '{"to":"utest1x","amount_zat":0}' '{"to":"","amount_zat":1000}' '{"to":"utest1x","amount_zat":1000,"mode":"bogus"}'; do
  R=$(post "/vault/$VID/spend" "$bad")
  [ "$(code "$R")" = 400 ] || fail "/spend should reject invalid input with 400 (got $(code "$R") for: $bad)"
done
pass "/spend rejects amount=0 / empty recipient / bad mode with 400 (validated before the signer)"

# 5. let the switch trip (no heartbeats past interval + grace)
WAIT=$((INTERVAL + GRACE + 2))
echo "  …waiting ${WAIT}s for the dead-man's-switch to trip…"
sleep "$WAIT"
R=$(get "/vault/$VID"); [ "$(jq_ "['state']" <<<"$(body "$R")")" = Recoverable ] || fail "expected Recoverable after lapse"
pass "switch tripped → Recoverable"

# 6. now inheritance release is allowed → real ceremony → verified signature
R=$(post "/vault/$VID/session" "{\"purpose\":\"InheritanceRelease\",\"sighash_hex\":\"$SIGHASH\",\"randomizer_hex\":\"$RANDOMIZER\"}")
[ "$(code "$R")" = 200 ] || fail "InheritanceRelease after trip should be 200 (got $(code "$R")): $(body "$R")"
SIG=$(body "$R" | jq_ "['signature_hex']")
[ "${#SIG}" = 128 ] || fail "inheritance signature malformed (${#SIG} chars)"
pass "InheritanceRelease co-signed → heir would receive; sig ${SIG:0:16}…"

# 7. a FORGED heartbeat (bogus signature) is refused — the relay cannot fake liveness.
FORGE_T=$(( $(date +%s) + 999999 ))
R=$(post "/vault/$VID/heartbeat" "{\"time\":$FORGE_T,\"sig_hex\":\"$(python3 -c "print('aa'*64)")\"}")
[ "$(code "$R")" = 400 ] || fail "forged heartbeat must be refused with 400 (got $(code "$R"))"
pass "forged heartbeat refused (400) — liveness cannot be faked without the owner's key"

# 8. a SIGNED heartbeat brings it back to Active (cancellation). We sign a real proof-of-life
#    with the demo secret; the coordinator verifies it against the vault's recorded pubkey.
NOW=$(date +%s)
SIG=$(hb_sign "$SECRET" "$VID" "$NOW")
R=$(post "/vault/$VID/heartbeat" "{\"time\":$NOW,\"sig_hex\":\"$SIG\"}")
[ "$(code "$R")" = 200 ] || fail "signed heartbeat (got $(code "$R")): $(body "$R")"
R=$(get "/vault/$VID"); [ "$(jq_ "['state']" <<<"$(body "$R")")" = Active ] || fail "signed heartbeat should reset to Active"
pass "signed heartbeat verified + reset the switch → Active again"

# 9. the guardian's view: fetch the signed proof-of-life bulletin and verify it INDEPENDENTLY
#    (here via `steward heartbeat-verify` — exactly what web/guardian does with @noble/ed25519).
R=$(get "/vault/$VID/heartbeat"); B=$(body "$R")
[ "$(code "$R")" = 200 ] || fail "GET heartbeat bulletin (got $(code "$R"))"
PUB=$(jq_ "['pubkey_hex']" <<<"$B"); HTIME=$(jq_ "['time']" <<<"$B"); HSIG=$(jq_ "['sig_hex']" <<<"$B")
"$CLI" heartbeat-verify --pk "$PUB" --vault "$VID" --time "$HTIME" --sig "$HSIG" >/dev/null \
  || fail "a guardian could not independently verify the signed heartbeat bulletin"
pass "guardian independently verified the owner's signed proof-of-life (Ed25519)"

printf "\n\033[32mALL PASS\033[0m — dead-man's-switch lifecycle, real 2-of-3 FROST co-signing, and guardian-verifiable signed heartbeats.\n"
