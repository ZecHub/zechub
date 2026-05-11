# Zimppy.xyz

[Zimppy.xyz](https://zimppy.xyz/) is a Zcash payment method for the Machine Payments Protocol (MPP). It is designed for software agents, scripts, and API clients that need to pay for online services through HTTP payment flows.

Zimppy uses Zcash so machine payments can be made with shielded transactions instead of public payment rails. This is useful when a payment itself may reveal sensitive metadata, such as which API was called, how often it was called, or how much an automated agent spent.

## What Zimppy does

Zimppy connects three ideas:

* **HTTP 402 payments**: a server can respond with `402 Payment Required` and a signed payment challenge.
* **Zcash payments**: the client pays the requested amount using a Zcash payment method.
* **Automatic retry**: after payment, the client retries the original request with payment proof.

The result is a machine-payment flow where an agent can discover a paid endpoint, pay it, and continue without a human manually copying payment details.

## Why Zcash matters for machine payments

Public-chain payments can leak usage patterns. If every API call is paid from a visible address, observers may learn which services an agent uses, how often it pays, and how spending changes over time.

Zimppy focuses on Zcash because shielded payments can encrypt payment details such as sender, receiver, amount, and memo data. A server can verify a received shielded payment with an incoming viewing key without exposing the spending key.

Zimppy can also support transparent payment flows, but the privacy benefit is strongest when the payment is shielded.

## How the payment flow works

1. **Agent requests a paid resource**

   The agent sends a normal HTTP request to an API.

2. **Server returns a payment challenge**

   The server responds with `402 Payment Required`, including the payment amount, currency, recipient details, and challenge data.

3. **Agent pays with Zcash**

   The agent sends the ZEC payment. For shielded flows, the memo can bind the payment to the challenge so it cannot be replayed for another request.

4. **Agent retries the request**

   The agent retries the original request with payment proof in the authorization header.

5. **Server verifies and responds**

   The server verifies the payment and returns the paid resource with a receipt.

```text
Agent  ->  GET /api/resource
Server ->  402 Payment Required + challenge
Agent  ->  Send ZEC payment
Agent  ->  GET /api/resource + payment proof
Server ->  200 OK + receipt
```

## Sessions and streaming

For high-frequency API calls, paying on-chain for every request is slow and inefficient. Zimppy supports session-style flows where an agent deposits once, receives a bearer token, and then makes repeated instant requests against the prepaid balance.

This pattern is useful for:

* LLM inference calls
* pay-per-token streaming
* data APIs with many small requests
* agent workflows that need repeated tool calls

```text
Agent  ->  Open session with ZEC deposit
Agent  ->  Request data with bearer token
Agent  ->  Stream or repeat requests
Agent  ->  Close session and refund unused balance
```

## Use cases

### AI agents

An autonomous agent can pay for tools, data, or inference without a human in the loop. Shielded payments help avoid linking the agent's full service-usage pattern to a public payment address.

### Private research workflows

A legal, medical, or financial research assistant may need to query paid databases. Shielded payment flows can reduce the amount of payment metadata exposed while still letting the provider verify payment.

### Paid API services

API providers can use MPP-style challenges to charge for individual requests, sessions, or streaming responses. Zimppy gives those services a Zcash payment method.

### Multi-agent systems

Different agents can use separate wallet identities or accounts so usage and balances can be managed independently.

## Quick start: wallet and shielded payments

The public Zimppy docs show the CLI package as:

```bash
npm install zimppy
npx zimppy
```

Use this basic setup path before integrating an API:

1. **Install the CLI**

   ```bash
   npm install zimppy
   ```

2. **Create or select a wallet identity**

   ```bash
   npx zimppy wallet create
   npx zimppy wallet use work
   ```

   Store any seed phrase or wallet backup securely. Treat an automated agent wallet as a hot wallet unless you have stronger key isolation.

3. **Check the wallet address and network**

   ```bash
   npx zimppy wallet whoami
   ```

   Confirm the displayed address, balance, and network before sending funds.

4. **Fund the wallet**

   Send testnet ZEC first when possible. For real payments, send only the amount needed for the agent workflow you are testing.

5. **Send a shielded payment**

   ```bash
   npx zimppy wallet send <address> <amount-in-zat>
   ```

6. **Call a paid MPP endpoint**

   ```bash
   npx zimppy request <url>
   ```

   The request command handles the `402 -> pay -> retry` flow for compatible endpoints.

Other useful wallet commands:

```bash
npx zimppy wallet whoami
npx zimppy wallet balance --all
npx zimppy wallet send <address> <amount-in-zat>
npx zimppy wallet shield
npx zimppy wallet use <name>
npx zimppy request <url>
```

Before using Zimppy with real funds:

* start on testnet if available
* keep seed phrases and wallet files private
* confirm the recipient and amount before funding a wallet
* understand whether a flow is shielded or transparent
* treat automated agents as hot-wallet software unless you have stronger key isolation

## Step-by-step TypeScript integration

Zimppy's public examples show a TypeScript server using `mppx` and `zimppy-ts` to add a Zcash payment method to an HTTP endpoint.

1. **Install the packages**

   ```bash
   npm install zimppy zimppy-ts mppx
   ```

2. **Configure the server payment method**

   Load the server wallet and register the Zcash payment method with MPP.

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
})
```

3. **Wrap the paid endpoint**

   The charge wrapper returns a challenge when payment is needed and a receipt wrapper after payment is verified.

```typescript
const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) {
  return result.challenge
}

return result.withReceipt(Response.json({ data }))
```

4. **Configure the client wallet**

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({
  methods: [zcash({ wallet: 'default' })],
})
```

5. **Call the paid endpoint**

   The client handles the `402 -> pay -> retry` loop.

```typescript
const response = await mppx.fetch('<paid-api-url>')
```

6. **Verify receipts and errors**

   In production, log payment receipts carefully, set clear prices, and handle insufficient funds, expired challenges, and failed payment verification.

## Step-by-step Rust integration

Zimppy also exposes Rust integration patterns for servers and clients.

1. **Add dependencies**

   Check the current Zimppy repository for the latest versions, then add the Rust crates used by your service.

```toml
[dependencies]
zimppy-rs = "0.5"
# Add the MPP crate/version used by the current Zimppy repository.
```

2. **Create the Zcash charge method**

   A server needs Zcash RPC access, a recipient address, and an Orchard incoming viewing key for shielded payment verification.

```rust
use mpp::server::Mpp;
use zimppy_rs::ZcashChargeMethod;

let mpp = Mpp::create(ZcashChargeMethod::new(
    &rpc,
    &address,
    &orchard_ivk,
))?;
```

3. **Attach MPP state to the web app**

   Public examples use Axum-style state and extractors.

```rust
use std::sync::Arc;
use axum::{routing::get, Router};
use mpp::server::axum::*;

let state: Arc<dyn ChargeChallenger> = Arc::new(mpp);

let app = Router::new()
    .route("/api/resource", get(handler))
    .with_state(state);
```

4. **Protect a handler with a payment extractor**

```rust
struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str {
        "42000"
    }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

5. **Configure the Rust client**

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc_endpoint);

let response = client
    .get("<paid-api-url>")
    .send_with_payment(&provider)
    .await?;
```

6. **Test before mainnet**

   Test challenge creation, payment verification, replay protection, receipt handling, and session refund behavior before connecting an agent to real funds.

## Reference snippets

The compact examples below mirror the public Zimppy docs.

### TypeScript server

```typescript
import { Mppx } from 'mppx/server'
import { zcash } from 'zimppy-ts/server'

const mppx = Mppx.create({
  methods: [await zcash({ wallet: 'server' })],
})

const result = await mppx.charge({
  amount: '42000',
  currency: 'zec',
})(request)

if (result.status === 402) {
  return result.challenge
}

return result.withReceipt(Response.json({ data }))
```

### TypeScript client

```typescript
import { Mppx } from 'mppx/client'
import { zcash } from 'zimppy-ts/client'

const mppx = Mppx.create({
  methods: [zcash({ wallet: 'default' })],
})

const response = await mppx.fetch('<paid-api-url>')
```

### Rust server

```rust
use mpp::server::axum::*;
use zimppy_rs::ZcashChargeMethod;

struct Price;

impl ChargeConfig for Price {
    fn amount() -> &'static str {
        "42000"
    }
}

async fn handler(charge: MppCharge<Price>) -> WithReceipt<Json<Value>> {
    WithReceipt {
        receipt: charge.receipt,
        body: Json(data),
    }
}
```

### Rust client

```rust
use mpp::client::Fetch;
use zimppy_rs::ZcashPaymentProvider;

let provider = ZcashPaymentProvider::new(wallet_config, &rpc_endpoint);

let response = client
    .get("<paid-api-url>")
    .send_with_payment(&provider)
    .await?;
```

Check the current Zimppy docs and package versions before copying snippets into production code.

## Key features

* **Agent-native wallets**: use CLI and SDK workflows intended for automated agents rather than only browser-based human wallets.
* **Multi-agent support**: separate wallet identities or accounts can isolate balances and usage for different agents or environments.
* **Fully shielded Zcash transactions**: use Zcash shielded payments to reduce payment metadata leakage.
* **HTTP 402 support**: respond to payment challenges and retry requests automatically.
* **Session payments**: deposit once and make repeated low-latency requests.
* **Streaming support**: support pay-as-you-go streaming patterns.
* **CLI wallet**: manage wallet identity and make paid requests from the command line.
* **TypeScript and Rust examples**: integrate with web services and agent tooling.

## Privacy and safety notes

Zimppy can reduce payment metadata leakage, but it does not make every part of an application private. API servers may still log IP addresses, account identifiers, request bodies, timing, and bearer-token usage. Agents should combine shielded payments with normal operational privacy practices.

For production deployments, review:

* wallet key storage
* testnet coverage
* replay protection
* challenge expiration
* server logging policy
* rate limits and abuse handling
* refund behavior for sessions

## Contributing

Zimppy is maintained by BetterClever. Developers can start from the public site and linked GitHub resources:

* [Zimppy.xyz](https://zimppy.xyz/)
* [Zimppy GitHub repository](https://github.com/betterclever/zimppy)
* [Zimppy on docs.rs](https://docs.rs/zimppy)
* [Machine Payments Protocol overview](https://mpp.dev/)

Useful contribution areas include documentation, examples, SDK ergonomics, wallet safety, test coverage, and integrations with agent frameworks.
