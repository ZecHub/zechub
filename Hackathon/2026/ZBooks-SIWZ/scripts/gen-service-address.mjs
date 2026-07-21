// Generate a fresh Zcash t-addr keypair for use as the SIWZ memo-challenge service address.
// Run with: node scripts/gen-service-address.mjs [--network mainnet|testnet]
// Writes WIF + address to ./.service-address.local.txt (gitignored). Keep that file secret.
import { writeFileSync, existsSync } from "node:fs";
import { randomBytes } from "node:crypto";
import { secp256k1 } from "@noble/curves/secp256k1";
import { hash160, base58checkEncode } from "@siwz/core";

const NETWORK_VERSION = {
  mainnet: { p2pkh: [0x1c, 0xb8], wif: 0x80 },
  testnet: { p2pkh: [0x1d, 0x25], wif: 0xef },
};

const args = process.argv.slice(2);
const networkArg = args[args.indexOf("--network") + 1];
const network = networkArg === "testnet" ? "testnet" : "mainnet";
const ver = NETWORK_VERSION[network];

const priv = randomBytes(32);
const pub = secp256k1.getPublicKey(priv, /* compressed */ true);

const addrPayload = new Uint8Array(22);
addrPayload[0] = ver.p2pkh[0];
addrPayload[1] = ver.p2pkh[1];
addrPayload.set(hash160(pub), 2);
const address = base58checkEncode(addrPayload);

const wifPayload = new Uint8Array(34);
wifPayload[0] = ver.wif;
wifPayload.set(priv, 1);
wifPayload[33] = 0x01;
const wif = base58checkEncode(wifPayload);

const outPath = "./.service-address.local.txt";
if (existsSync(outPath)) {
  console.error(`✗ ${outPath} already exists. Move or delete it first; refusing to overwrite a key file.`);
  process.exit(1);
}

const contents =
  `# SIWZ service address — GENERATED ${new Date().toISOString()}\n` +
  `# Network: ${network}\n` +
  `# KEEP THIS FILE SECRET. Anyone with the WIF can spend funds at this address.\n` +
  `#\n` +
  `Address: ${address}\n` +
  `WIF:     ${wif}\n` +
  `PrivHex: ${Buffer.from(priv).toString("hex")}\n`;
writeFileSync(outPath, contents, { mode: 0o600 });

console.log(`✓ Generated ${network} service address`);
console.log(`  Address: ${address}`);
console.log(`  WIF saved to: ${outPath}  (mode 600, gitignored)`);
console.log(``);
console.log(`Next steps:`);
console.log(`  1. Add to apps/demo/.env.local:`);
console.log(`       SIWZ_SERVICE_ADDRESS=${address}`);
console.log(`  2. Set SIWZ_DEMO=0  (or remove the line) so real txs are checked.`);
console.log(`  3. Restart the dev server.`);
console.log(``);
console.log(`To later recover funds from this address with zcash-cli:`);
console.log(`  zcash-cli importprivkey "${wif}" "siwz-service" true`);
