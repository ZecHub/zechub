<a href="https://github.com/zechub/zechub/edit/main/site/Start_Here/Quantum_Computers_and_Zcash.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Quantum Computers and Zcash, Explained Simply

## TL;DR

- A large quantum computer could one day solve the math that protects most crypto wallets today, Zcash included.
- No such computer exists yet. The work to prepare for one has already started.
- Since the Ironwood upgrade in July 2026, new shielded notes are **quantum-recoverable**. They have a planned way out if the old math ever breaks. That is a different thing from being quantum-proof.
- Privacy against a future quantum attacker depends on one habit: keep your shielded addresses to yourself.
- A fully post-quantum Zcash is an open research goal. No ZIP sets a date for it.

---

## Think of it as a lock

Every crypto wallet is protected by a math lock, and your private key is the only thing that opens it. An ordinary computer would need longer than the age of the universe to guess that key.

A quantum computer works differently. For a few special math problems, including the ones behind these locks, a big enough quantum computer could find the answer fast. The method is called Shor's algorithm.

The picture shows the idea in four steps: how the threat could appear, what an attacker could do, how Zcash answers, and why it matters.

![Infographic in four panels: a quantum computer could solve the math that protects transactions; an attacker could track payments, link addresses and analyze activity; Zcash keeps shielded transactions private with zk-SNARKs and adds quantum-recoverable Ironwood notes; benefits are privacy by choice, post-quantum upgrades, financial freedom and reliable security](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/quantum-threat-to-private-payments.png)

---

## What could break

A quantum attacker would go after three things.

**Spending.** The signature that proves a payment is yours could be forged. The attacker could then move coins that belong to someone else.

**Fake money.** Inside a shielded pool, a forged proof could create ZEC from nothing. Zcash has a safety check for this called [the turnstile](/zcash-tech/the-turnstile): no pool can ever pay out more than the balance it holds.

**Privacy.** Encrypted payments stay on the blockchain forever. Someone could save them today and decrypt them years later. This only works if they know the shielded address the money went to.

One more detail matters here. Hash functions, another kind of math Zcash uses, are only weakened by known quantum methods. They do not break. That gap is what makes quantum recovery possible.

![Infographic of quantum attack risks and possible problems for Zcash: breaking key cryptography, de-anonymization if an attacker knows an address, forgery and double spending, loss of privacy, reduced trust, upgrade pressure and network disruption, with a Zcash coin on a quantum platform in the center](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Start_Here/assets/quantum-risks-and-possible-problems.png)

---

## What Zcash has done so far

**Ironwood, July 2026.** The NU6.3 upgrade activated on Mainnet on 28 July 2026 at block 3,428,143. It added a new shielded pool. Every note in it is tied to its contents by a hash, so an honest owner has a path to prove what they hold even if elliptic-curve math fails. This is quantum recoverability, described in [ZIP 2005](https://zips.z.cash/zip-2005).

**Orchard closed to new value.** New shielded value now lands in Ironwood. Wallets move older funds across in fixed amounts over time, so the move does not reveal your balance ([ZIP 318](https://zips.z.cash/zip-0318)).

**Sprout switch-off.** NU7 is targeted for 5 November 2026. Once it activates, funds left in the Sprout pool can no longer be spent ([ZIP 259](https://zips.z.cash/zip-0259)).

## What is open

The Recovery Protocol, the actual emergency exit, is only outlined so far. Nobody has scheduled the switch-off of Orchard and Sapling. Until that happens, a quantum attacker could hurt every shielded pool. ZIP 2005 calls this the critical exposure period.

A fully post-quantum Zcash, with new proofs, signatures and encryption, has been an open research item since 2016. In May 2026, ZODL CEO Josh Swihart said the goal is full post-quantum security within 12 to 18 months. No ZIP sets that date yet. [Project Tachyon](/zcash-tech/project-tachyon), a proposed scaling upgrade, would add post-quantum privacy along the way. It is a proposal, and nothing from it is live.

---

## The part beginners miss

**Quantum-recoverable and quantum-proof are two different promises.** A recoverable note has an exit door. A quantum-proof note would have a lock that nobody can pick. Zcash has the first one for Ironwood notes today.

**Old notes have no exit.** Sapling and Orchard notes cannot be recovered later. Only Ironwood notes can.

**Transparent addresses are the weakest spot.** Once you spend from a transparent address, its public key sits on the chain for good.

**There is no reason to panic.** Machines that can do this do not exist today. Preparing early is cheaper and safer than rushing later.

---

## Put it into practice

- Let your wallet move your shielded funds into Ironwood.
- Holding old Sprout funds? Move them before NU7 activates. See [Recovering Funds](/using-zcash/recovering-funds).
- Give each payer a fresh shielded address. Unified addresses cost nothing to create.
- Never reuse transparent addresses.
- Keep your seed phrase safe. A future recovery spend needs the keys your wallet derives from it.
- Trust ZIPs and your wallet team over rumors and "quantum-proof" marketing.

---

## Resources

- [ZIP 2005: Ironwood Quantum Recoverability](https://zips.z.cash/zip-2005)
- [ZIP 318: Orchard to Ironwood Migration](https://zips.z.cash/zip-0318)
- [ZIP 259: Deployment of the NU7 Network Upgrade](https://zips.z.cash/zip-0259)
- [NIST: First finalized post-quantum encryption standards](https://www.nist.gov/news-events/news/2024/08/nist-releases-first-3-finalized-post-quantum-encryption-standards)
- [Decrypt: Zcash Targeting Post-Quantum Crypto Milestone by 2027](https://decrypt.co/367250/zcash-targeting-post-quantum-crypto-milestone-by-2027)

## Related pages

- [Is Zcash Post-Quantum?](/zcash-tech/is-zcash-post-quantum)
- [Post-Quantum Security in Zcash](/zcash-tech/post-quantum-security)
- [Ironwood](/zcash-tech/ironwood)
- [The Turnstile](/zcash-tech/the-turnstile)
- [Who Can See Your Zcash Payment?](/start-here/who-can-see-your-zcash-payment)
- [Project Tachyon](/zcash-tech/project-tachyon)

---

*If you would like to add or suggest edits to this wiki page, please head to the [ZecHub GitHub repo](https://github.com/ZecHub/zechub) and submit a pull request.*
