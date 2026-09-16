/**
 * UA decoder tests against real Zcash test vectors.
 * Source: https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs
 */

import { decodeUnifiedAddress, bytesToHex, ReceiverType } from './ua-decoder';

function bytesToHexLower(bytes: Uint8Array): string {
  return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

let passed = 0;
let failed = 0;

function test(name: string, fn: () => void) {
  try {
    fn();
    console.log(`  PASS: ${name}`);
    passed++;
  } catch (e: any) {
    console.log(`  FAIL: ${name} — ${e.message}`);
    failed++;
  }
}

function assert(condition: boolean, msg: string) {
  if (!condition) throw new Error(msg);
}

console.log('UA Decoder Test Vectors:\n');

// Test vector 1: P2PKH + Sapling (no Orchard)
test('vector 1: u1l8xu... — P2PKH + Sapling', () => {
  const addr = 'u1l8xunezsvhq8fgzfl7404m450nwnd76zshscn6nfys7vyz2ywyh4cc5daaq0c7q2su5lqfh23sp7fkf3kt27ve5948mzpfdvckzaect2jtte308mkwlycj2u0eac077wu70vqcetkxf';
  const decoded = decodeUnifiedAddress(addr);

  assert(decoded.network === 'mainnet', `Expected mainnet, got ${decoded.network}`);
  assert(decoded.receivers.length === 2, `Expected 2 receivers, got ${decoded.receivers.length}`);

  // P2PKH receiver
  const p2pkh = decoded.receivers.find(r => r.type === ReceiverType.TransparentP2PKH);
  assert(p2pkh !== undefined, 'Expected P2PKH receiver');
  assert(bytesToHexLower(p2pkh!.rawBytes) === '7bb83570b8fae146e03c5331a020b1e0892f631d',
    `P2PKH mismatch: ${bytesToHexLower(p2pkh!.rawBytes)}`);

  // Sapling receiver
  const sapling = decoded.receivers.find(r => r.type === ReceiverType.Sapling);
  assert(sapling !== undefined, 'Expected Sapling receiver');
  assert(bytesToHexLower(sapling!.rawBytes) === 'd8ef8293d26de832e7193f296ba1922d90f122c6135bc231eebd91efdb03b1a8606771cd4fd6480574d43e',
    `Sapling mismatch: ${bytesToHexLower(sapling!.rawBytes)}`);
});

// Test vector 2: P2PKH + Sapling (different div index)
test('vector 2: u1fl5m... — P2PKH + Sapling (div=3)', () => {
  const addr = 'u1fl5mprj0t9p4jg92hjjy8q5myvwc60c9wv0xachauqpn3c3k4xwzlaueafq27dcg7tzzzaz5jl8tyj93wgs983y0jq0qfhzu6n4r8rakpv5f4gg2lrw4z6pyqqcrcqx04d38yunc6je';
  const decoded = decodeUnifiedAddress(addr);

  assert(decoded.network === 'mainnet', `Expected mainnet, got ${decoded.network}`);
  assert(decoded.receivers.length === 2, `Expected 2 receivers, got ${decoded.receivers.length}`);

  const p2pkh = decoded.receivers.find(r => r.type === ReceiverType.TransparentP2PKH);
  assert(p2pkh !== undefined, 'Expected P2PKH receiver');
  assert(bytesToHexLower(p2pkh!.rawBytes) === 'a7244a362f49f29644a955cf0039b88a61657861',
    `P2PKH mismatch: ${bytesToHexLower(p2pkh!.rawBytes)}`);

  const sapling = decoded.receivers.find(r => r.type === ReceiverType.Sapling);
  assert(sapling !== undefined, 'Expected Sapling receiver');
  assert(bytesToHexLower(sapling!.rawBytes) === '435b0bbc95b5b7d52531a3944f2b85603ee22aaf850963bc156eb561edf2cbe7cf0e770e393ae5d7049026',
    `Sapling mismatch: ${bytesToHexLower(sapling!.rawBytes)}`);
});

// Test vector 4: P2PKH + Sapling + Orchard (three receivers)
test('vector 4: u1pg2a... — P2PKH + Sapling + Orchard', () => {
  const addr = 'u1pg2aaph7jp8rpf6yhsza25722sg5fcn3vaca6ze27hqjw7jvvhhuxkpcg0ge9xh6drsgdkda8qjq5chpehkcpxf87rnjryjqwymdheptpvnljqqrjqzjwkc2ma6hcq666kgwfytxwac8eyex6ndgr6ezte66706e3vaqrd25dzvzkc69kw0jgywtd0cmq52q5lkw6uh7hyvzjse8ksx';
  const decoded = decodeUnifiedAddress(addr);

  assert(decoded.network === 'mainnet', `Expected mainnet`);
  assert(decoded.receivers.length === 3, `Expected 3 receivers, got ${decoded.receivers.length}`);

  const p2pkh = decoded.receivers.find(r => r.type === ReceiverType.TransparentP2PKH);
  assert(p2pkh !== undefined, 'Expected P2PKH');
  assert(bytesToHexLower(p2pkh!.rawBytes) === 'cad268758c5e71493066446b98e71df9d1d6a5ca',
    `P2PKH mismatch: ${bytesToHexLower(p2pkh!.rawBytes)}`);

  const sapling = decoded.receivers.find(r => r.type === ReceiverType.Sapling);
  assert(sapling !== undefined, 'Expected Sapling');
  assert(bytesToHexLower(sapling!.rawBytes) === '9f6e0bf90a18fc0b9b83ae9f23ad4358648638482b5def8975635b66fd8a708335f9235a3186ec0f033f84',
    `Sapling mismatch: ${bytesToHexLower(sapling!.rawBytes)}`);

  const orchard = decoded.receivers.find(r => r.type === ReceiverType.Orchard);
  assert(orchard !== undefined, 'Expected Orchard');
  assert(bytesToHexLower(orchard!.rawBytes) === 'cecbe5e689a453a3fe10ccf7617e6c1fb382819d7fc9200a1f42092ac84a30378f8c1fb90dff71a6d5042d',
    `Orchard mismatch: ${bytesToHexLower(orchard!.rawBytes)}`);
});

// Test vector 5: P2PKH + Sapling + Orchard (account 1, div 7)
test('vector 5: u19mzu... — P2PKH + Sapling + Orchard (account 1)', () => {
  const addr = 'u19mzuf4l37ny393m59v4mxx4t3uyxkh7qpqjdfvlfk9f504cv9w4fpl7cql0kqvssz8jay8mgl8lnrtvg6yzh9pranjj963acc3h2z2qt7007du0lsmdf862dyy40c3wmt0kq35k5z836tfljgzsqtdsccchayfjpygqzkx24l77ga3ngfgskqddyepz8we7ny4ggmt7q48cgvgu57mz';
  const decoded = decodeUnifiedAddress(addr);

  assert(decoded.network === 'mainnet', `Expected mainnet`);
  assert(decoded.receivers.length === 3, `Expected 3 receivers, got ${decoded.receivers.length}`);

  const p2pkh = decoded.receivers.find(r => r.type === ReceiverType.TransparentP2PKH);
  assert(p2pkh !== undefined, 'Expected P2PKH');
  assert(bytesToHexLower(p2pkh!.rawBytes) === '8d653347a0fd3cd0842a790a5eaf89d8e3854659',
    `P2PKH mismatch: ${bytesToHexLower(p2pkh!.rawBytes)}`);

  const sapling = decoded.receivers.find(r => r.type === ReceiverType.Sapling);
  assert(sapling !== undefined, 'Expected Sapling');
  assert(bytesToHexLower(sapling!.rawBytes) === 'e1adf156a07d56bcac91bdb2f7bb3ea7c44569dcfee54273c09e8065807b6823faa94a77219554d0f6e017',
    `Sapling mismatch: ${bytesToHexLower(sapling!.rawBytes)}`);

  const orchard = decoded.receivers.find(r => r.type === ReceiverType.Orchard);
  assert(orchard !== undefined, 'Expected Orchard');
  assert(bytesToHexLower(orchard!.rawBytes) === '24f8a60cbd97e012618d56054ad39241411a28fdd50ee35efa91152f60d5fa21172e5d458ddbcb6b709896',
    `Orchard mismatch: ${bytesToHexLower(orchard!.rawBytes)}`);
});

// Error handling tests
test('rejects invalid HRP', () => {
  let threw = false;
  try { decodeUnifiedAddress('x1invalid'); } catch { threw = true; }
  assert(threw, 'Should throw for invalid HRP');
});

test('rejects truncated address', () => {
  let threw = false;
  try { decodeUnifiedAddress('u1l8xunezsvhq8fgzfl'); } catch { threw = true; }
  assert(threw, 'Should throw for truncated address');
});

console.log(`\n${passed} passed, ${failed} failed`);
if (failed > 0) process.exit(1);
