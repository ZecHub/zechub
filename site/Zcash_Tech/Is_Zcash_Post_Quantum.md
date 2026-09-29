<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Is_Zcash_Post_Quantum.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Is Zcash Post-Quantum?

## Short answer

No, not yet.

Since the Ironwood upgrade, Zcash is **quantum-recoverable** for funds held in the Ironwood pool. That is a real step, but it is not the same thing as being post-quantum secure. ZIP 2005, the spec behind it, says so directly: the change "does not by itself make the protocol secure against quantum adversaries". It prepares Ironwood funds so they could be moved through a future Recovery Protocol once the current cryptography is switched off.

This page separates what Zcash protects today, what Ironwood changed, what is still exposed, and what is only a proposal. The [status table](#status-table) near the end shows where each piece stands and when that was last checked.

<br/>

## Who is this for

- Anyone who has seen "quantum-recoverable" and read it as "quantum-proof"
- Holders deciding whether to move funds into Ironwood
- Writers and moderators who need a sourced answer to point people at

For background on quantum computing itself, start with [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security).

<br/>

## Why the question is confusing

"Post-quantum" gets used as if it were one property. For Zcash it is at least four separate questions, and they have different answers:

1. **Privacy.** Can a quantum attacker see who paid whom and how much?
2. **Spending.** Can a quantum attacker spend coins that are not theirs?
3. **Inflation.** Can a quantum attacker create ZEC out of nothing?
4. **Recovery.** If the current cryptography has to be switched off, can honest users still get their funds out?

Ironwood only changes the answer to the fourth question, and only for notes in the Ironwood pool.

The threat behind all of this is an attacker who can compute discrete logarithms on the elliptic curves Zcash uses. A large enough quantum computer running Shor's algorithm would be one way to do that. ZIP 2005 points out that finding a **single** discrete logarithm is enough to cause arbitrary inflation or steal funds.

<br/>

## What Zcash protects today

This table describes the protocol as it runs now, against an attacker who can break discrete logarithms. It applies to every shielded pool, Ironwood included, because Ironwood uses the same Orchard circuit, Halo 2 proofs and RedPallas signatures as Orchard.

| Property | Against a quantum attacker today | What Ironwood changed |
|---|---|---|
| Privacy | Holds if the attacker does not know your shielded address. Proofs and rerandomized signatures leak nothing extra. If the attacker does know the address, they can decrypt notes sent to it, including old ones saved from the chain. | Nothing. ZIP 2005: "The situation with respect to Privacy is unchanged for any pool." |
| Spending | Not protected. An attacker could forge proofs or spend signatures and steal from any shielded pool, even for addresses they have never seen. | Nothing yet. The protection only arrives after a future switch to the Recovery Protocol. |
| Inflation | Not protected. An attacker could forge a valid-looking proof and create ZEC inside any shielded pool, possibly without anyone noticing. The only limit is the [turnstile](/zcash-tech/the-turnstile): no pool can pay out more than its recorded balance. | Nothing yet. Ironwood notes now commit to all of their contents in a way a quantum attacker should not be able to fake, which is what a future Recovery Protocol needs in order to keep the supply sound. |
| Recovery | Sprout, Sapling and Orchard notes have no recovery path. Once their protocols are switched off, anything left in them would be inaccessible. | Every Ironwood note is recoverable in principle. No Sapling or Orchard note is. |

Transparent ZEC is a separate case. Its ECDSA signatures can be forged once the public key is known. For a normal transparent address that happens the first time you spend from it, and there is also a short window while a transaction sits unconfirmed in the mempool. ZIP 2005 does not change any of that.

<br/>

## What Ironwood changed

Ironwood is the NU6.3 network upgrade. It activated on Mainnet at block 3,428,143 on 28 July 2026. Its main purpose was supply integrity after the Orchard soundness bug (see the [Ironwood](/zcash-tech/ironwood) page), and quantum recoverability from ZIP 2005 shipped as part of it.

- **A new note format.** Every Ironwood output note uses the quantum-recoverable format (note plaintext lead byte `0x03`). The note's randomness is now derived from all of its fields, so the note is bound to its contents by a hash rather than only by elliptic-curve math.
- **A recovery path for Ironwood notes only.** ZIP 326 is explicit that every Ironwood note is recoverable and no Orchard note is. A wallet setting does not change that.
- **Orchard stopped taking new value.** Coinbase rewards can no longer go to Orchard, and Orchard can no longer send to a different Orchard address, so new shielded value lands in Ironwood.
- **Wallets are told to move everything.** ZIP 2005 says wallets SHOULD move all the funds they control, including transparent, Sprout and Sapling funds, into Ironwood notes as soon as practical, and keep doing so as new funds arrive.

What Ironwood did not change: the cryptography used for spending and proving today, note encryption, and anything about transparent ZEC.

<br/>

## Limitations that remain

**There is an exposure window.** From Ironwood's activation until the old protocols are switched off, a quantum attacker could still steal, inflate or block funds in every shielded pool. ZIP 2005 calls this the "critical exposure period" and warns that an attack during it could still hurt a holder's ability to recover later. That is why it says Zcash must switch off Orchard, Sapling and Sprout **before** quantum attacks become feasible.

**The switch-off has no date.** No ZIP schedules turning off Orchard or Sapling. ZIP 2003, a Draft and an NU7 candidate, would disable Sprout spends by disallowing version 4 transactions. A Sapling withdraw-only discussion started on the forum in April 2026.

**The Recovery Protocol is not finished.** ZIP 2005 only outlines it, and says the details "are subject to change". Nothing about it is deployed.

**Harvest now, decrypt later.** Note ciphertexts for Ironwood, Orchard, Sapling and Sprout are all public on the chain. Someone can save them today and decrypt later, if they also know the receiving address. Every address you publish or hand out is part of that risk. ZIP 2005 says "other protocol changes are under consideration" for future transfers.

**Transparent funds are not covered.** Addresses that have been spent from, or reused, have exposed public keys. Recoverability for some transparent addresses is only an idea so far (ZIP 2007, see below).

**FROST setups have an extra caveat.** With FROST, each participant holds a quantum spending key (`qsk`), and a quantum attacker holding it may be able to steal. ZIP 2005 recommends moving FROST funds to a fully post-quantum protocol with threshold support once one exists.

<br/>

## Proposals and research

None of these are live.

- **Recovery Protocol.** The mechanism that would actually let Ironwood funds be spent after the switch. Outlined in ZIP 2005, not specified.
- **ZIP 2007, recoverability for some transparent addresses.** Only a reserved ZIP number with discussion in [zips#1302](https://github.com/zcash/zips/issues/1302). The idea is that P2PKH and P2SH outputs whose public keys have never been revealed could be recoverable, with weaker guarantees than Ironwood.
- **Post-quantum privacy for known addresses.** Open since 2022 in [zips#1133](https://github.com/zcash/zips/issues/1133), which notes that Zcash is "already intended to be post-quantum private" when addresses are kept secret and asks how to extend that to known addresses, for example with a post-quantum key encapsulation scheme like Kyber (now ML-KEM). In June 2026 [zips#1307](https://github.com/zcash/zips/issues/1307) proposed a ZIP to document the current privacy properties and possible fixes.
- **Project Tachyon.** A proposed scaling upgrade. Its site says it would obtain "full post-quantum privacy" as a side effect, by moving payment delivery off chain and using post-quantum key exchange. Its proof-carrying data library, Ragu, is described as "still under construction". See [Project Tachyon](/zcash-tech/project-tachyon).
- **A fully post-quantum Zcash.** Post-quantum proofs, signatures and commitments together. Tracked in [zips#1134](https://github.com/zcash/zips/issues/1134), open since 2016. There is no spec or timeline.

<br/>

## Status table

Last checked 13 September 2026. A ZIP's header status and its network status are different things: ZIP 2005 still says "Proposed" in its header even though its rules have been enforced on Mainnet since July 2026.

| Item | ZIP status | Network status | Date | Source |
|---|---|---|---|---|
| Ironwood pool with quantum-recoverable notes (NU6.3) | ZIP 2005 Proposed, ZIP 229 and ZIP 258 Draft | **Activated** on Mainnet | 28 Jul 2026, block 3,428,143 | [ZIP 2005](https://zips.z.cash/zip-2005), [ZIP 258](https://zips.z.cash/zip-0258) |
| Orchard closed to new value | ZIP 2006 Reserved, rules in ZIP 258 | **Activated** on Mainnet | 28 Jul 2026 | [ZIP 258](https://zips.z.cash/zip-0258) |
| Wallets moving funds into Ironwood | Guidance in ZIP 2005, ZIP 318 and ZIP 326 (Draft) | Recommended, depends on your wallet | Since 28 Jul 2026 | [ZIP 318](https://zips.z.cash/zip-0318), [ZIP 326](https://zips.z.cash/zip-0326) |
| Recovery Protocol | Outlined inside ZIP 2005 only | **Not implemented** | No date | [ZIP 2005](https://zips.z.cash/zip-2005) |
| Switching off Orchard and Sapling | No ZIP | **Not scheduled** | Sapling discussion from Apr 2026 | [Forum](https://forum.zcashcommunity.com/t/sapling-withdraw-only-discussion-kickoff/55223) |
| Disabling Sprout spends (ZIP 2003) | Draft, NU7 candidate | **Not activated** | No date | [ZIP 2003](https://zips.z.cash/zip-2003) |
| Transparent recoverability (ZIP 2007) | Reserved | **Proposal** | ZIP reserved 5 Jul 2025, discussion opened 17 Jun 2026 | [zips#1302](https://github.com/zcash/zips/issues/1302) |
| Post-quantum privacy for known addresses | Open issues, no ZIP | **Research** | #1133 opened 18 Aug 2022, #1307 opened 23 Jun 2026 | [zips#1133](https://github.com/zcash/zips/issues/1133), [zips#1307](https://github.com/zcash/zips/issues/1307) |
| Project Tachyon | No ZIP | **Proposal**, under development | First published Apr 2025 | [tachyon.z.cash](https://tachyon.z.cash/roadmap/) |
| Fully post-quantum protocol | Open issue, no ZIP | **Future work** | #1134 opened 28 Mar 2016 | [zips#1134](https://github.com/zcash/zips/issues/1134) |

In the Zcash Foundation's NU7 sentiment polling (February 2026), quantum recoverability had 90.5% support from ZCAP and 94.6% from coinholders, and Tachyon had near-universal support. Those were sentiment polls, not decisions about what goes into NU7.

<br/>

## What you can do now

- **Move your funds into Ironwood.** Sapling and Orchard notes will never be recoverable. Moving value between pools shows the amount on-chain, so ZIP 318 has wallets split balances into fixed amounts and send them across over time. Let your wallet do it rather than moving everything in one go.
- **Don't publish shielded addresses you don't need to.** Privacy against a future quantum attacker depends on them not knowing your address. Unified addresses are cheap to generate, so give each payer a fresh one. ZIP 229 recommends address rotation for this reason.
- **Don't reuse transparent addresses.** Once you spend from one, its public key is on the chain for good.
- **Keep your seed phrase safe.** In the Recovery Protocol as outlined, a recovery spend has to prove you know your spending key, and normal wallets derive that key from the seed.
- **Ignore "Zcash is quantum-proof" claims.** It isn't yet, and the people writing the specs say so.

<br/>

## Common misunderstandings

- **"Ironwood is post-quantum."** No. It runs the same Orchard cryptography, and ZIP 2005 says the feature "does not make the Orchard protocol secure against quantum attacks".
- **"Quantum-recoverable means safe from quantum computers today."** No. It means Ironwood funds could be recovered after a future switch, as long as that switch happens in time.
- **"Shielded Zcash is already post-quantum private."** Only when the attacker doesn't know your address. Known addresses are exposed in every pool.
- **"Tachyon already added post-quantum privacy."** Tachyon is a proposal. Nothing from it is live.
- **"Quantum computers break every part of Zcash."** Hash functions are only weakened, not broken, by known quantum attacks. Quantum recoverability relies on exactly that difference.

<br/>

## Related pages

- [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [The Turnstile](/zcash-tech/the-turnstile)
- [Project Tachyon](/zcash-tech/project-tachyon)
- [FROST](/zcash-tech/frost)
- [Shielded Pools](/using-zcash/shielded-pools)

<br/>

## Sources

- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [ZIP 229: Version 6 Transaction Format](https://zips.z.cash/zip-0229)
- [ZIP 258: Deployment of the NU6.3 Network Upgrade](https://zips.z.cash/zip-0258)
- [ZIP 318: Orchard to Ironwood Migration](https://zips.z.cash/zip-0318)
- [ZIP 326: NU6.3 Consequences for Wallets](https://zips.z.cash/zip-0326)
- [ZIP 2003: Disallow version 4 transactions](https://zips.z.cash/zip-2003)
- [ZIP 209: Prohibit Negative Shielded Chain Value Pool Balances](https://zips.z.cash/zip-0209)
- [zips#1302: Quantum recoverability of a subset of the transparent protocol](https://github.com/zcash/zips/issues/1302)
- [zips#1133: Post-quantum privacy for Zcash](https://github.com/zcash/zips/issues/1133)
- [zips#1307: Privacy of Zcash against quantum and discrete-log-breaking adversaries](https://github.com/zcash/zips/issues/1307)
- [zips#1134: Fully post-quantum Zcash](https://github.com/zcash/zips/issues/1134)
- [Project Tachyon roadmap](https://tachyon.z.cash/roadmap/)
- [NU7 Polling Results: What We Heard and Where We Go From Here](https://forum.zcashcommunity.com/t/nu7-polling-results-what-we-heard-and-where-we-go-from-here/54775)
- [Block 3,428,143 on Blockchair](https://blockchair.com/zcash/block/3428143)
- [Forum request: Is Zcash post-quantum?](https://forum.zcashcommunity.com/t/is-zcash-post-quantum-help-wanted-d-proposal/57154)
