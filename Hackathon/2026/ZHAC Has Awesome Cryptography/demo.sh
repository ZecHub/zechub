#!/usr/bin/env bash
set -e
set -u
set -o pipefail

ZHAC=""
if [ -n "${ZHAC:-}" ]; then
  :
elif [ -x "./target/release/zhac" ]; then
  ZHAC="./target/release/zhac"
elif [ -x "./target/debug/zhac" ]; then
  ZHAC="./target/debug/zhac"
else
  echo "Error: zhac binary not found. Build with: cargo build --release" >&2
  exit 1
fi

WORKDIR="$(mktemp -d)"
cleanup() {
  rm -rf "$WORKDIR"
}
trap cleanup EXIT

echo "============================================================"
echo "  ZHAC - Zcash Privacy Guard - Demo"
echo "============================================================"
echo ""

echo "-> 1. Key Generation"
"$ZHAC" gen-key -o "$WORKDIR/alice.priv" -p "$WORKDIR/alice.pub"
"$ZHAC" gen-key -o "$WORKDIR/bob.priv" -p "$WORKDIR/bob.pub"
echo "   Alice and Bob key-pairs generated."
echo ""

echo "-> 2. Key Fingerprints"
ALICE_FP=$("$ZHAC" fingerprint -k "$WORKDIR/alice.pub")
BOB_FP=$("$ZHAC" fingerprint -k "$WORKDIR/bob.pub")
echo "   Alice: $ALICE_FP"
echo "   Bob:   $BOB_FP"
echo ""

echo "-> 3. Encryption (single recipient)"
printf "Meet me at the Zcash booth at 3pm\n" >"$WORKDIR/secret.txt"
"$ZHAC" encrypt -k "$WORKDIR/alice.pub" -i "$WORKDIR/secret.txt" -o "$WORKDIR/secret.zhac"
CT_SIZE=$(wc -c <"$WORKDIR/secret.zhac")
echo "   Ciphertext size: $CT_SIZE bytes"
echo ""

echo "-> 4. Decryption"
"$ZHAC" decrypt -k "$WORKDIR/alice.priv" -i "$WORKDIR/secret.zhac" -o "$WORKDIR/decrypted.txt"
DECRYPTED=$(cat "$WORKDIR/decrypted.txt")
echo "   Decrypted: $DECRYPTED"
echo ""

echo "-> 5. Multi-Recipient Encryption (Alice + Bob)"
"$ZHAC" encrypt -k "$WORKDIR/alice.pub" -k "$WORKDIR/bob.pub" -i "$WORKDIR/secret.txt" -o "$WORKDIR/multi.zhac"
echo ""
echo "   Alice decrypts:"
"$ZHAC" decrypt -k "$WORKDIR/alice.priv" -i "$WORKDIR/multi.zhac" -o "$WORKDIR/alice_dec.txt"
ALICE_DEC=$(cat "$WORKDIR/alice_dec.txt")
echo "     -> $ALICE_DEC"
echo "   Bob decrypts:"
"$ZHAC" decrypt -k "$WORKDIR/bob.priv" -i "$WORKDIR/multi.zhac" -o "$WORKDIR/bob_dec.txt"
BOB_DEC=$(cat "$WORKDIR/bob_dec.txt")
echo "     -> $BOB_DEC"
echo ""

echo "-> 6. Digital Signature (RedJubjub SpendAuth)"
"$ZHAC" sign -k "$WORKDIR/alice.priv" -i "$WORKDIR/secret.txt" -o "$WORKDIR/secret.sig"
"$ZHAC" verify -k "$WORKDIR/alice.pub" -i "$WORKDIR/secret.txt" -s "$WORKDIR/secret.sig"
echo "   Signature verified."
echo ""

echo "-> 7. Key Info"
"$ZHAC" key-info -k "$WORKDIR/alice.pub"
echo ""

echo "-> 8. Zcash Login - Mock Authentication"
echo "   Using mock chain state (no Zcash node required)..."
AUTH_TOKEN="$WORKDIR/auth_token.json"
echo "   [A] Creating auth challenge..."
"$ZHAC" auth-challenge -k "$WORKDIR/alice.priv" -p "$WORKDIR/alice.pub" --mock -o "$AUTH_TOKEN"
echo "   Challenge created."
echo "   [B] Verifying auth token (signature-only)..."
"$ZHAC" auth-verify -t "$AUTH_TOKEN" -s
echo "   Auth token signature verified!"
echo ""

echo "============================================================"
echo "  All operations completed successfully!"
echo ""
echo "  For mainnet-bound authentication:"
echo "    1. Run: zhac node-select"
echo "    2. Run: zhac auth-challenge -k priv.txt -p pub.txt -o token.json"
echo "    3. Run: zhac auth-verify -t token.json"
echo "============================================================"
