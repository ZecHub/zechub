# Portal

This is Portal, a new way to sign in, get paid, and pay someone else using nothing but a Zcash wallet. Built for the ZecHub Hackathon 3.0 Login track.

Source repository: [github.com/IamHarrie-Labs/portal](https://github.com/IamHarrie-Labs/portal)

You send a private, shielded transaction with a one time code in the memo. Portal sees it arrive on the Zcash mainnet and signs you in. No email, no password, and nobody, including the site you're signing into, learns who you are.

The same flow lets you unlock paid content or send and receive money with a simple link. Everything here runs on real Zcash mainnet. There's no testnet mode and nothing is simulated.

Live site: [tryportal.xyz](https://tryportal.xyz)
Demo video: [youtu.be/-fWFFc_u6j4](https://youtu.be/-fWFFc_u6j4?si=bzDL61TwNeV8caqo)
Follow along: [x.com/trypayportal](https://x.com/trypayportal)

## What it does

**Login.** A button for any website. Your wallet sends a zero value shielded transaction with a one time code in the memo. Portal detects it within seconds and hands your site a session token. Think Sign in with Google, but there's no Google, and nobody's watching where you log in.

**Gates.** Paywalls and memberships where the login payment is the price of entry. One transaction both proves who you are and pays for what you're unlocking.

**Paylinks.** A shareable payment link. Set an amount and a label, share the URL, and anyone can pay you straight from their wallet. Links never expire.

**The Shielded Wall.** Add a few words after the code in your login memo and they show up as a public post, sent through a real, encrypted mainnet transaction, with no way to trace who wrote it.

**Creator dashboard.** Sign in with your wallet, no signup form, and get your own receiving address, your own Gates and Paylinks, and webhooks for your payments, all on one Portal instance.

## How to add Portal to your own site

You don't need to run anything to try this. Include the SDK and point it at a running Portal server, either the live instance at `tryportal.xyz` or your own if you're self-hosting.

**1. Include the SDK**

```html
<script src="https://tryportal.xyz/sdk/portal.js"></script>
```

**2. Log a visitor in**

```js
const session = await Portal.login({ server: 'https://tryportal.xyz' });
// session.token  -> a signed JWT, treat it like any other session token
// session.txid   -> the real mainnet transaction that proved it
// session.code   -> the one time code that got matched
```

That's the whole login. The SDK handles the QR code, the mobile deep link, the polling while it waits for your wallet's transaction to land, and every error state. If someone closes the modal, the promise rejects with `cancelled`.

**3. Gate something behind a payment**

Same call, just pass a `purpose`:

```js
await Portal.login({ server: 'https://tryportal.xyz', purpose: 'gate:vip' });
// only resolves once a payment meeting that gate's price is seen on mainnet
```

If you sign in to the dashboard first, you can create your own priced gates under your own account instead of using the shared demo gate, each with its own key, price, and label, and choose whether it unlocks instantly or waits for a mined confirmation.

**4. Take a payment with a link**

```js
await Portal.pay({ server: 'https://tryportal.xyz', slug: 'your-paylink-slug' });
```

Create the paylink itself from your dashboard, or directly against the API:

```js
POST /creators/me/paylinks
{ "amount": "0.05", "label": "Coffee tip" }
```

**5. Get notified server side**

If you'd rather not poll, register a webhook URL on your creator account and Portal will send a signed POST the moment a payment is detected, and again once it's confirmed. Every delivery carries an `x-portal-signature` header, an HMAC-SHA256 of the body signed with your own webhook secret, so you can verify it came from Portal before trusting it.

**6. Run your own instance instead of using the shared one**

Portal is two processes and no database. Build `zingo-cli` from [zingolib](https://github.com/zingolabs/zingolib), create a wallet, back up the seed phrase with `recovery_info`, then:

```
cd server && npm install
PORTAL_ADDRESS=u1yourshieldedaddress npm start
```

Point your own SDK include and `server` option at your own instance from there. Every environment variable, the full HTTP API, and a deeper walkthrough live in the docs at [tryportal.xyz/docs](https://tryportal.xyz/docs).

## How a login actually works

1. Your site asks Portal for a challenge. Portal generates a one time code and wraps it into a standard Zcash payment request, a QR code for desktop, a tap to open link for mobile.
2. The visitor scans or taps with any shielded Zcash wallet, Zashi, Ywallet, or Zingo, and sends the transaction. No typing, no new account.
3. Portal, a Zcash light client watching mainnet through a public lightwalletd, sees the memo arrive, usually while it's still sitting in the mempool, and matches it to the code.
4. Your site gets a signed session token. Afterward, anyone can look the transaction up on a public block explorer and find nothing. No sender, no receiver, no amount, no memo. That's the whole point.

## Architecture

```
+----------+   1. GET /auth/challenge    +--------------+
| Website  | --------------------------> |    Portal    |
| (any app | <-------------------------- |    server    |
| with SDK)|   challenge + zcash: URI QR |              |
+----------+                             |  zingo-cli   |
     ^                                   |  sidecar     |
     | 4. session JWT                    |  (light      |
     |                                   |   client)    |
+----------+   2. zero value shielded    +------+-------+
|  User's  |      memo with the code            | 3. detects memo
|  wallet  | ---------- Zcash mainnet ----------+    via lightwalletd
+----------+           (zec.rocks)               (mempool, 0-conf)
```

- **server/** is the Node.js server: challenge issuance, memo watching, JWT sessions, creator accounts, gates, paylinks, and webhooks. No database, everything persists as JSON on disk.
- **sdk/** is a single dependency free JavaScript file. A script tag plus `Portal.login()` opens the QR modal and resolves with a session.
- **demo/** is the website itself: landing page, live dashboard, pay pages, and documentation.
- **docs/** holds the project spec and playbook.

## The trust model, honestly

Portal is built on real cryptography, and the parts that aren't trustless yet are written down here instead of hidden.

**Custody.** Creator receiving addresses are diversified addresses derived from the Portal instance's own wallet seed. They're unlinkable on chain, but the operator's keys can spend them, so today a creator is trusting the operator to forward their funds, the same way an early hot wallet payment processor works. The planned fix is Unified Full Viewing Keys: a creator hands Portal a viewing key for their own wallet, Portal can then see payments arrive but can never spend them, and money lands straight in the creator's wallet with no custody at all.

**Identity.** Shielded Zcash has no sender field, so a creator's identity is just the reply address they put in their login memo. Portal checks that a real transaction carried that claim, not that the sender actually owns the address. The fix is a reply handshake: Portal sends an encrypted memo with a secret back to the claimed address, and only the real owner can read it and echo it back, since a shielded memo can only be decrypted by whoever it was sent to.

**Availability.** One wallet process watches the chain for the whole instance. It's crash hardened and serialized, but a production deployment would run more than one.

These were the right tradeoffs for a first version, they made a complete, working product possible on real mainnet. Knowing exactly where the rough edges are is how they get fixed next.

## What's next

- The reply handshake, so a claimed address becomes a proven one
- Viewing key based creator accounts, removing custody entirely
- Paying from any chain and settling in ZEC through NEAR Intents
- An automated test suite over the memo parser, the challenge lifecycle, and webhook signing

## License

MIT
