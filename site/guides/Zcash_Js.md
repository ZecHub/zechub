# Zcash JS Developer Guide

**zcash.js** (`@zcashlabs/zcash.js`) is an experimental TypeScript/JavaScript SDK released by Zcash Labs on 26 October 2026. It lets developers build wallets, light clients, dashboards, and applications that interact with the Zcash network from Node.js and the browser.

> **Status**: Experimental (v0.1.1). Persistent Node wallets currently require Linux + `flock`. Complete live-browser send/receive and historical wallet-database migration are not yet fully qualified. Always check the official documentation before production use.

## What the SDK Provides

- `createPublicClient` — stateless JSON-RPC queries and transaction observation
- `createLightClient` — lightwallet queries and streams (native gRPC on Node, gRPC-Web in the browser)
- `createWalletClient` — local accounts, scanning, proposals, signing, submission, and recorded payment recovery
- Exact `bigint` amounts, network validation, viewing/address tools, and PCZT utilities
- Bundled baseline wallet engine, workers, and local Sapling proving assets (no separate Rust installation required)

## Installation

Use **Node.js 22.23.4** (the version pinned by the package).

```bash
npm install @zcashlabs/zcash.js@0.1.1
```

- Prefer TypeScript with ESM (`"type": "module"` in `package.json`).
- Browser applications work through a modern ESM bundler. The bundler will emit lazy WASM, worker, and proving assets — these must be deployed with your application.

## First Chain Query (No Wallet)

```ts
import { createLightClient } from '@zcashlabs/zcash.js';

const light = await createLightClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
});

const tip = await light.getTip();
console.log(tip.height, tip.hash);
```

- Omitting the `network` option defaults to mainnet (provide a matching endpoint).
- A `createPublicClient` is also available for pure JSON-RPC usage.

## Opening a Wallet

```ts
import { createWalletClient } from '@zcashlabs/zcash.js';

const wallet = await createWalletClient('https://testnet.zec.rocks:443', {
  network: 'testnet',
  storage: { kind: 'node-filesystem', path: './my-wallet' }, // Linux only for durable storage
});

try {
  const accounts = await wallet.accounts.list();
  console.log(accounts);
} finally {
  await wallet.close();
}
```

### Storage Options

| Environment     | Storage option                                      |
|-----------------|-----------------------------------------------------|
| Node (durable)  | `{ kind: 'node-filesystem', path: './my-wallet' }`  |
| Browser         | `{ kind: 'browser-opfs', name: 'my-wallet' }`       |
| Disposable      | `{ kind: 'memory' }`                                |

**Important defaults** (as of v0.1.1):

- Spending and change are Ironwood-only by default
- Fee rule: ZIP-317
- Confirmations: 3 trusted / 3 untrusted
- Always call `wallet.sync()` before proposing a payment

## High-Level Wallet Workflow

1. Create or import a mnemonic account and attach a signer
2. Call `wallet.sync()`
3. Request a receive address (prefer Unified / Ironwood)
4. Create a proposal → review it → call `wallet.send()`
5. Watch for confirmation or use recorded operations for recovery after a restart

The application owns the mnemonic bytes. Clear them from memory when they are no longer needed. Always present a clear approval UI that shows every recipient, amount, fee, pool, and expiry.

See the official [Wallet walkthrough](https://zcashlabs.github.io/zcashjs/api/walkthrough.html) for a complete working example.

## Platform Notes & Current Limitations

| Capability            | Node                              | Browser                          |
|-----------------------|-----------------------------------|----------------------------------|
| Package               | Node 22.23.4 + ESM                | Modern ESM bundler + WebAssembly |
| Light queries         | Native gRPC                       | gRPC-Web + CORS                  |
| Durable storage       | Linux + `flock` only              | OPFS (secure context)            |
| Disposable storage    | memory                            | memory                           |

Additional limitations:

- Persistent Node storage is currently Linux-only
- No managed secret vault, remote proving service, or hardware-signer integration yet
- Storage is **not** advertised as encrypted at rest
- Do not open the same wallet storage from multiple processes or browser tabs concurrently
- Always close the wallet cleanly with `await wallet.close()`

## Next Steps

- Official installation & first request: [Installation](https://zcashlabs.github.io/zcashjs/api/installation.html)
- Opening and configuring a wallet: [Open a wallet](https://zcashlabs.github.io/zcashjs/api/wallet-runtime.html)
- Full workflow: [Wallet walkthrough](https://zcashlabs.github.io/zcashjs/api/walkthrough.html)
- API reference: [API Reference](https://zcashlabs.github.io/zcashjs/api/reference.html)
- Platform limits: [Node and browser setup](https://zcashlabs.github.io/zcashjs/api/platforms.html)


## Official Resources

- Developer book: [https://zcashlabs.github.io/zcashjs/](https://zcashlabs.github.io/zcashjs/)
- GitHub repository: [https://github.com/zcashlabs/zcashjs](https://github.com/zcashlabs/zcashjs)
- npm package: `@zcashlabs/zcash.js`


---

*This guide is based on `@zcashlabs/zcash.js@0.1.1` (October 2026). The SDK is under active development — always prefer the official documentation for the latest API and limitations.*
```
