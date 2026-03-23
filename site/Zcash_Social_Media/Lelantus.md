# Zero to Zero Knowledge: Lelantus Protocol

**Series:** Zero to Zero Knowledge

Today we take a look at **Lelantus**!

Released in 2019, this protocol builds upon Zerocoin. It is used in the **Firo** currency (formerly Zcoin) to enable private on-chain transactions. It resembles Zcash in some ways but is distinctly different in most aspects.

![Lelantus intro](https://pbs.twimg.com/media/Fsk18DgXsAEc0Ob.jpg)

---

## Zcash vs Firo Protocol Foundations

- **Zcash** - Builds upon the **Zerocash** protocol  
- **Firo (Zcoin)** - Builds upon the **Zerocoin** protocol

![Zerocash vs Zerocoin comparison](https://pbs.twimg.com/media/Fsk2Fk7WcAA81ty.png)

---

## Evolution of Firo Privacy Protocols

Similar to Zcash, Firo uses shielded addresses to achieve anonymous payments.

**Timeline:**
- **Zerocoin** - Soundness broken
- **Sigma** - Fixed denomination system
- **Lelantus 1.0** - Lacked correct security proofs

![Protocol evolution](https://pbs.twimg.com/media/Fsk2NdaWAAAKVgH.png)

---

## Limitations of Sigma Protocol

The Σ (Sigma) protocol used in earlier versions of Zcoin/Firo had a major limitation: users could only mint fixed denominations.

This created smaller anonymity sets and opened the door to timing attacks between mint and redeem operations (plus the "tainted change" problem).

![Sigma denominations](https://pbs.twimg.com/media/Fsk2fxfWcAMUBDo.png)

---

## How Lelantus Improves Privacy

**Lelantus** solves the fixed denomination issue by allowing mints from a single larger set.

Key benefits:
- Eliminates fixed denomination anonymity sets
- Reduces timing attacks between burn/redeem
- Removes the tainted change problem

**Limitation**: Set size is currently capped at **65,000 coins**.

![Lelantus advantages](https://pbs.twimg.com/media/Fsk2wK3X0AA6MEe.png)

---

## Coin Commitments

A **coin commitment** is a double-blinded commitment encoding the coin serial number and the coin value.

These function similarly to **Notes** in Zcash.

The coin commitment is published and stored on the ledger when the coin is created (via Mint or Spend transactions).

![Coin commitment diagram](https://pbs.twimg.com/media/Fsk3AWNX0AIHya8.png)

---

## Basecoin < - > Zerocoin Model

Lelantus uses the classic **basecoin < - > zerocoin** model.

**Important feature**: Partial redemptions are now possible while keeping the remainder and amounts hidden.

Like Zcash, transparent transactions must be explicitly selected by the user.

![Lelantus flow](https://pbs.twimg.com/media/Fsk3HrjXgAMgqmX.png)

---

## One-of-Many Proofs

Lelantus utilizes **One-of-Many Proofs** to extract input values necessary for proving balance without revealing the input origins - and without requiring a trusted setup.

These proofs are also used in **Triptych** (mentioned in our CryptoNote thread).

![One-of-Many Proofs](https://pbs.twimg.com/media/Fsk3Z0nWIAAPD4k.jpg)

---

## Network Layer Privacy: Dandelion++

Firo nodes use the same Network Magic as Zcash's Magicbean.

Like Monero, Firo implemented **Dandelion++** to add privacy by obfuscating the IP address of the transaction broadcaster.

**Dandelion++ phases:**
- **Stem phase** - Transaction is relayed to a single random node instead of all peers
- **Fluff phase** - Randomly initiated, then switches to normal gossip mode

This makes it much harder to trace the origin of a transaction through network analysis.

![Dandelion++ explanation](https://pbs.twimg.com/media/Fsk4A8VWcAU84MR.png)

---

## Future: Lelantus-Spark

**Lelantus-Spark** (planned for later 2023) introduces two levels of opt-in visibility using **ZIP-32 style derivation** and diversified addresses.

It will also add support for:
- Multisig
- User Defined Confidential Assets

These features parallel Zcash Shielded Assets.

![Lelantus-Spark announcement](https://pbs.twimg.com/media/Fsk4jXeXsAACQ3h.jpg)

---

**Original Thread by ZecHub (@ZecHub)**  
https://x.com/ZecHub/status/1641902859800150017

---

*This page was compiled from the original Zero to Zero Knowledge thread for the ZecHub wiki.*
