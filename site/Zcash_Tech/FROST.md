<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) is a threshold signature and distributed key generation protocol: several signers each hold a share of a common private key, and a threshold number of them must cooperate to produce one signature.
* Because the result is a single Schnorr signature, a transaction made this way looks like an ordinary transaction on the network.
* It requires minimal rounds of communication, can run in parallel, and can identify and exclude a misbehaving participant.
* For Zcash, this means FROST enables multiple, geographically separated parties to control the spend authority of shielded ZEC — useful for custody, escrow, non-custodial services, and Zcash Shielded Assets (ZSA).
* It was created by Chelsea Komlo (University of Waterloo, Zcash Foundation) and Ian Goldberg (University of Waterloo).

## Core Explanation

### What is a Schnorr signature?

A Schnorr digital signature is a set of algorithms: (KeyGen, Sign, Verify).

Schnorr signatures have several advantages. One key advantage is that when multiple keys are used to sign the same message, the resulting signatures can be combined into a single signature. This can significantly reduce the size of multisig payments and other multisig-related transactions.

### What is FROST?

**Flexible Round-Optimised Schnorr Threshold Signatures** -
*Created by Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST is a threshold signature and distributed key generation protocol that requires minimal communication rounds and can be run in parallel. FROST protocol is a threshold version of the Schnorr signature scheme.

Unlike signatures in a single-party setting, threshold signatures require cooperation among a threshold number of signers, each holding a share of a common private key.

[What are Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequently, generating signatures in a threshold setting incurs overhead due to network rounds among signers, making it costly when secret shares are stored on network-limited devices or when coordination occurs over unreliable networks.

Network overhead during signing operations is reduced by employing a novel technique that protects against forgery attacks and is applicable to other schemes as well.

FROST improves threshold signature protocols by allowing an unlimited number of signature operations to be performed safely in parallel (concurrency).

It can be used as either a 2-round protocol, where signers send and receive 2 messages in total, or as an optimised single-round signing protocol with a preprocessing stage.

FROST achieves its efficiency improvements in part by allowing the protocol to abort in the presence of a misbehaving participant, who is then identified and excluded from future operations.

Proofs of security demonstrating that FROST is secure against chosen-message attacks, assuming the discrete logarithm problem is hard, and the adversary controls fewer participants than the threshold, are provided [here](https://eprint.iacr.org/2020/852.pdf#page=16).

### How does FROST work?

The FROST protocol contains two important components:

First, n participants run a distributed key generation (DKG) protocol to generate a common verification key. At the end, each participant obtains a private secret key share and a public verification key share.

Afterwards, any t-out-of-n participants can run a threshold signing protocol to collaboratively generate a valid Schnorr signature.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visual / Analogy

Think of FROST like a safe-deposit box that opens only when several authorised keyholders turn their keys together — but not every keyholder is required; just a set number (for example, any 3 of 5). Once the box is open, an outside observer cannot tell which keyholders showed up, or even that more than one was involved. In the same way, a group can jointly authorise a Zcash transaction while the network sees only one ordinary-looking signature.

## Deep Dive

**Distributed key generation (DKG)**

The goal of this phase is to generate long-lived secret key shares and a joint verification key. This phase is run by n participants.

FROST builds its own key generation phase on Pedersen's DKG (GJKR03), which uses both Shamir's secret sharing and Feldman's verifiable secret sharing schemes as subroutines. In addition, each participant must demonstrate knowledge of their own secret by sending a zero-knowledge proof to the other participants, which is itself a Schnorr signature. This additional step protects against rogue-key attacks when t ≥ n/2.

At the end of the DKG protocol, a joint verification key vk is generated. Each participant Pᵢ holds a value (i, skᵢ ) that is their long-lived secret share and a verification key share vkᵢ = skᵢ *G. Participant Pᵢ's verification key share vkᵢ is used by other participants to verify the correctness of Pᵢ's signature shares during the signing phase, while the verification key vk is used by external parties to verify signatures issued by the group.

**Threshold Signing**

This phase builds upon known techniques that employ additive secret sharing and share conversion to non-interactively generate the nonce for each signature. It also leverages binding techniques to avoid known forgery attacks without limiting concurrency.

In the preprocessing stage, each participant prepares a fixed number of pairs of Elliptic Curve (EC) points for later use. This stage runs once across multiple threshold signing phases.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signing Round 1: Each participant Pᵢ begins by generating a single private nonce pair (dᵢ, eᵢ) and corresponding pair of EC points (Dᵢ, Eᵢ), then broadcasts this pair of points to all other participants. Each participant stores these pairs of EC points for later use. Signing rounds 2 and 3 are the actual operations in which t-out-of-n participants cooperate to create a valid Schnorr signature.

Signing Round 2: Participants work together to create a valid Schnorr signature. The core technique behind this round is t-out-of-t additive secret sharing.

This step prevents forgery attacks because attackers cannot combine signature shares across distinct signing operations or permute the set of signers or published points for each signer.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Having computed the challenge c, each participant can compute the response zᵢ using the single-use nonces and the long-term secret shares, which are t-out-of-n (degree t-1) Shamir secret shares of the group's long-lived key. At the end of signing round 2, each participant broadcasts zᵢ to other participants.

[Read the full paper](https://eprint.iacr.org/2020/852.pdf)

### FROST use in the wider ecosystem

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

To improve the efficiency of Coinbase's threshold-signing systems, they developed a version of FROST. This Coinbase implementation makes slight changes from the original FROST draft.

They opted not to use the signature aggregator role. Instead, each participant is a signature aggregator. This design is more secure: all participants in the protocol verify others' computations, thereby achieving a higher level of security and reducing risk. The one-time preprocessing stage was also removed to speed up the implementation, with a third signing round used instead.

---

**[ROAST](https://eprint.iacr.org/2022/550.pdf) by Blockstream**

An application-specific improvement on FROST is proposed for use on [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) for Bitcoin.

“ROAST is a simple wrapper around threshold signature schemes like FROST. It guarantees that a quorum of honest signers, e.g., the Liquid functionaries, can always obtain a valid signature even in the presence of disruptive signers when network connections have arbitrarily high latency.”

---

**FROST in IETF**

The Internet Engineering Task Force, founded in 1986, is the premier standards development organisation for the Internet. The IETF develops voluntary standards that are often adopted by Internet users, network operators, and equipment vendors, helping shape the Internet's trajectory.

FROST version 11 (two-round variant) has been [submitted to IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). This is an important step toward the complete evaluation of FROST as a new threshold signature scheme standard for use across the internet, in hardware devices, and for other services in the years to come.


## Practical Implications

Absolutely yes. The introduction of FROST to Zcash will allow multiple parties, separated geographically, to control the spend authority of shielded ZEC. Transactions broadcast using this signature scheme will be indistinguishable from other transactions on the network, maintaining strong resistance to payment tracking and limiting the amount of blockchain data available for analysis.

In practice, this enables a wide range of new applications to be built on the network, ranging from escrow providers to other non-custodial services.

FROST will also become an essential component in the secure issuance and management of Zcash Shielded Assets (ZSA), enabling safer management of spend authority within development orgs & ZEC custodians such as exchanges, while also providing this capability to Zcash users.

## Common Mistakes

**Confusing FROST with traditional on-chain multisig**. Traditional multisig can reveal multiple signers or multiple signatures on-chain. FROST produces a single aggregated Schnorr signature, so a transaction is indistinguishable from a single-signature transaction.

**Assuming fewer than the threshold can sign**. Only a threshold number (t-out-of-n) of participants acting together can produce a valid signature; any smaller group cannot.

**Assuming FROST hides everything off-chain**. FROST protects the on-chain signature, but coordination between signers still occurs off-chain and requires its own privacy and security controls.


## Related Pages

- [Halo](/zcash-tech/halo) — the trustless, recursive proof system used in Zcash's Orchard pool.
- [Viewing Keys](/zcash-tech/viewing-keys) — selective disclosure for shielded transactions.
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — where FROST helps manage spend/issuance authority.
- [Zcash Wallet Syncing](/zcash-tech/zcash-wallet-syncing) — another core piece of Zcash privacy infrastructure.


## Further Learning

[Coinbase Article - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explainer & Example](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Short Video on Schnorr Digital Signatures](https://youtu.be/r9hJiDrtukI?t=19)

___
___
