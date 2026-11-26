# Oblivious HTTP (OHTTP) in Zcash Wallets

Oblivious HTTP (OHTTP) is an IETF standard ([RFC 9458](https://www.rfc-editor.org/rfc/rfc9458.html)) for sending a request through a relay so that no single party sees both who you are and what you asked. ZODL uses it to hide your IP address from the servers your wallet syncs from. On Android it is the default connection since ZODL 3.20.0 (November 2026).

## TL;DR

* A light wallet server can't read your shielded transactions, but it sees your IP address and when you are active (see [Lightwallet Nodes](/zcash-tech/lightwallet-nodes)). OHTTP removes the IP address from that picture.
* Your wallet encrypts each request to the **gateway** and sends it through a **relay**. The relay sees your IP but can't read the request. The gateway reads the request but only sees the relay's address.
* Your privacy depends on the relay and gateway operators not combining their records. ZODL's design has the relay run by an independent operator.
* In ZODL for Android, **Private** (OHTTP) is the default connection mode. **Public** and **Manual** are the alternatives, and Tor is still available.
* It covers the wallet's own server requests, exchange rates, swaps and Flexa's API calls. It does not cover custom servers, Flexa's web pages and images, or links you open.

## Why a light wallet needs it

A light wallet asks a server for compact blocks, tree states and fee information, and hands it finished transactions to broadcast. Your keys stay on your device and the server can't read shielded amounts or memos. What it is well placed to learn is your IP address and the timing of your activity. The [Zcash wallet app threat model](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html) lists the IP address as the identifier that "could lead them to the user's real identity".

Until now the main way to remove it was Tor. OHTTP is a second way, built into the wallet's own connection.

## How it works

ZODL's OHTTP setup has three hops:

```
Wallet  →  Relay (independent operator)  →  OHTTP gateway (ZODL)  →  lightwalletd → Zebra
```

1. The wallet fetches the gateway's public key configuration and checks its signature (an Ed25519-signed envelope, pinned in the app). It fetches it through the relay, with a DNS-over-HTTPS lookup as the fallback.
2. It encodes the request as Binary HTTP ([RFC 9292](https://www.rfc-editor.org/rfc/rfc9292.html)) and seals it with HPKE ([RFC 9180](https://www.rfc-editor.org/rfc/rfc9180.html)) to the gateway's key.
3. The relay forwards the sealed request unchanged and drops headers that could identify the client.
4. The gateway opens the request, checks it against a fixed list of allowed destinations, and passes it to lightwalletd or to an allowlisted API (exchange rates, swaps, Flexa). The answer is sealed again and streamed back the same way, so only the wallet can read it.

What each party sees, from ZODL's architecture document:

| Party | Sees | Does not see |
|:--|:--|:--|
| Relay | Your IP address, timing, sizes of the sealed requests and responses | What you asked for, or which server answers |
| Gateway | Request and response content, timing, sizes, the relay's address | Your IP address |
| lightwalletd or the third-party API | The request the gateway forwards, the gateway's address | Your IP address, the relay |

Requests are padded to fixed size classes (4 KiB steps; sending a transaction uses 16 or 32 KiB) and responses are padded too, so the relay learns less from sizes. The gateway logs no client address, and it logs the relay's request IDs only in a form that can't be matched to the relay's logs after a restart.

The gateway, the client library and a test relay are open source in [zodl-inc/zodl-ohttp](https://github.com/zodl-inc/zodl-ohttp) (Rust, AGPL-3.0).

## Using it in ZODL

ZODL for Android 3.20.0 changed the server screen (Settings cog, then **Advanced Settings**, then the server option) to three connection modes:

| Mode | What it does |
|:--|:--|
| **Private** | ZODL's servers over OHTTP. The default for new wallets and for wallets that were on Automatic server selection |
| **Public** | The fastest public server, switched automatically. Public servers can see your IP address unless you turn on Tor or use a VPN |
| **Manual** | A server you choose, including a custom one. A custom server you had set before the update stays as it was |

If the private relay can't be reached, ZODL doesn't fall back on its own. It shows a sheet that lets you keep waiting or switch to public servers, with a Tor toggle to hide your IP on them. Swaps and currency prices stay paused until the private connection is back. If you switched from that sheet, the wallet returns to Private by itself once the relay works again. A Public or Manual choice made on purpose is never changed automatically.

Wallets on Public or Manual see a Home message offering the private connection, with a "Not now" option that hides it for good.

ZODL's iOS app had not shipped the private connection as of its 3.17.1 release (October 2026), although ZODL's iOS wallet SDK already contains an OHTTP client. Check the app's release notes for when it arrives.

## OHTTP or Tor?

Both hide your IP address from the wallet server. They make different trade-offs:

| | OHTTP (ZODL Private) | Tor |
|:--|:--|:--|
| Hops between you and the server | One relay plus the gateway | A circuit of three volunteer-run Tor relays |
| Who must not collude | The relay operator and ZODL as the gateway operator | The entry and exit relays of your circuit |
| Speed | One extra hop in the path | Slower: onion routing adds latency, so syncing takes longer |
| Which servers | ZODL's servers only | Any server, including your own or a custom one |
| What the server operator still learns | Your requests (through the gateway), not your IP | Your requests, not your IP |

Neither one hides what you ask for from whoever answers the request. That is the problem [private information retrieval](/zcash-tech/private-information-retrieval) research works on. If you don't want to trust ZODL's gateway with your requests, use Manual mode with Tor, or [run your own server](/zcash-tech/lightwallet-nodes).

## Common Mistakes

**Thinking OHTTP hides everything.** It hides your IP address from the servers. ZODL's gateway still sees which compact blocks and transactions your wallet asks for, and the relay still sees that your IP address talks to it, when, and how much.

**Assuming it covers custom servers.** A custom server in Manual mode is reached directly unless you turn on Tor. The server screen marks it "Custom · not private".

**Assuming it covers everything in the app.** Flexa's web pages and images, and links you open, load directly. ZODL asks before opening Flexa's pages on the private connection, and doesn't download Flexa's images there.

**Assuming the relay and gateway can't be linked.** OHTTP's guarantee holds only while the two operators don't combine their records. ZODL's architecture document says plainly that timing and size correlation by colluding operators is not something OHTTP addresses.

## Related Pages

* [Lightwallet Nodes](/zcash-tech/lightwallet-nodes): what a light wallet server does and what it can see, and how to change servers
* [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment): the beginner-level view of network privacy
* [Private information retrieval](/zcash-tech/private-information-retrieval): research on hiding which data a wallet asks for
* [ZODL](/zcash-organizations/zodl): the organization behind the wallet

## Where can I learn more?

* [RFC 9458: Oblivious HTTP](https://www.rfc-editor.org/rfc/rfc9458.html)
* [zodl-ohttp repository](https://github.com/zodl-inc/zodl-ohttp) and its [architecture document](https://github.com/zodl-inc/zodl-ohttp/blob/main/docs/architecture.md)
* [ZODL for Android changelog](https://github.com/zodl-inc/zodl-android/blob/main/CHANGELOG.md) (3.20.0)

**Last updated:** November 2026
