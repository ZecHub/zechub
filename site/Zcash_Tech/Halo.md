<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

- **Halo** is a trustless, recursive zero-knowledge proof system discovered by Sean Bowe at Electric Coin Co.
- It removes the need for a trusted setup, which means new proving systems can be deployed without a ceremony that creates secret "toxic waste."
- Halo uses recursive proof composition: one proof can attest to the correctness of many other proofs.
- Zcash uses the Halo 2 proving system in the Orchard shielded pool, activated with Network Upgrade 5 (NU5).
- The main benefits for Zcash are stronger trust assumptions, easier protocol upgrades, and a foundation for future scalability work.

---

## Core Explanation

Halo is a zero-knowledge proof system designed to be both trustless and recursive. It was first described by Sean Bowe at Electric Coin Co. and is widely regarded as a breakthrough because earlier practical zk-SNARK systems either required a trusted setup or made recursion expensive.

The trusted-setup problem matters because older proving systems required a common reference string (CRS) to be generated before proofs could be created and verified. If the secret material from that ceremony, often called "toxic waste," was not destroyed, a dishonest party could potentially create fraudulent proofs. Zcash reduced that risk through secure multi-party computation ceremonies for Sprout and Sapling, but Halo removes the need for that kind of ceremony.

Halo also supports recursive proof composition. Recursion allows one proof to verify other proofs, so a large amount of computation can be compressed into a small proof that is still fast to check. In a blockchain context, that is useful because many participants need to verify the correctness of the system without redoing all of the underlying work themselves.

![Halo overview](https://electriccoin.co/wp-content/uploads/2024/03/Halo-on-Z-EX-1024x512.png "Halo overview")

Key components:

- **Succinct polynomial commitment scheme.** A committer can commit to a polynomial with a short string, and a verifier can use that commitment to check claimed evaluations.
- **Polynomial interactive oracle proof.** A verifier asks the prover algorithm to open commitments at chosen points, then checks that the expected identities hold between them.

## Visual / Analogy

Think of Halo recursion like a stack of receipts. Instead of checking every item in every receipt from the beginning, each new receipt can prove that the previous receipts were already checked correctly. A verifier only needs to check the latest proof to gain confidence in the whole chain of work.

That is the key difference from a normal one-off proof: Halo is built so proofs can reason about other proofs.

## Deep Dive

### No Trusted Setup

zk-SNARKs rely on public parameters for proving and verifying. In many older systems, those parameters had to be generated in advance by a trusted party or by a secure multi-party computation. Zcash and other projects used elaborate [trusted setup ceremonies](https://zkproof.org/2021/06/30/setup-ceremonies/amp/) to reduce the chance that any one participant could compromise the system.

Sprout used BCTV14, and Sapling used Groth16. These systems were efficient and secure when the setup was performed correctly, but each setup was tied to specific circuits or applications. The ceremony also introduced a trust assumption: users had to believe that the secret material created during setup was destroyed.

Halo avoids that trusted setup by using a polynomial commitment scheme based on an inner product argument and a recursive technique called **nested amortization**. Instead of relying on secret setup material, Halo repeatedly collapses multiple hard-problem instances together over cycles of elliptic curves. This lets the system prove the correctness of prior proofs without creating new toxic waste.

Halo gives Zcash users two important assurances:

1. No participant in an earlier proving-system ceremony can use hidden toxic waste to create false proofs for the Halo-based system.
2. The proof system can continue to evolve without repeating a trusted setup for each major upgrade.

[Sean Bowe's explainer on Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

### Recursive Proofs

Recursive proof composition allows one proof to attest to the correctness of many other proofs. This is useful for scaling because a large amount of computation can be compressed into a smaller verification step.

Before Halo, efficient recursion usually required either a trusted setup or significant proving overhead. Halo's nested amortization technique made recursive composition practical without requiring a trusted setup.

In the [Halo paper](https://eprint.iacr.org/2019/1021.pdf), Electric Coin Co. described a polynomial commitment scheme and an aggregation technique that lets many independently created proofs be verified almost as quickly as a single proof. That alone made Halo a strong alternative to earlier zk-SNARK systems used in Zcash.

### Halo 2

Halo 2 is a high-performance zk-SNARK implementation written in Rust. It generalizes the original Halo approach and is the proving system used by Zcash's Orchard shielded pool.

<a href="">
    <img src="https://electriccoin.co/wp-content/uploads/2020/09/Halo-puzzle-03-1024x517.jpg" alt="Halo puzzle illustration" width="500" height="300"/>
</a>

Halo 2 uses an **accumulation scheme**. In this design, proofs are added to an object called an accumulator. Each new proof reasons about the previous state of the accumulator, so checking the current accumulator state gives confidence that the earlier proofs were also correct.

<a href="">
    <img src="https://i.imgur.com/l4HrYgE.png" alt="Halo 2 accumulation scheme diagram" width="500" height="300"/>
</a>

Halo 2 also builds on improvements in polynomial interactive oracle proofs. In parallel with Halo research, other teams developed more efficient Polynomial IOPs such as Marlin and PLONK. PLONK provides flexibility for application-specific circuits and improved prover performance compared with Sonic.

[Overview of PLONK](https://www.youtube.com/watch?v=P1JeN30RdwQ)

## Practical Implications

### For Zcash

The Orchard shielded pool activated with NU5 in 2022 and uses Halo 2. Orchard was introduced with the same turnstile design used between Sprout and Sapling, with the long-term goal of encouraging migration to a fully trustless proof system and reducing Zcash's implementation complexity and attack surface.

Halo 2 matters for Zcash because it removes the need to coordinate a trusted setup for new shielded-pool upgrades. Trusted setups are difficult to coordinate and introduce systemic risk if the secret material is ever retained. Removing that dependency makes future protocol upgrades safer to ship.

Orchard also introduced "Actions" to replace the older input/output model for shielded transactions, helping reduce transaction metadata. After NU5, recursive-proof integration became possible, although broader recursive scaling work is still an area of ongoing research and development.

### For future scalability

Recursive proof composition has the potential to compress large amounts of computation into proofs that are small and fast to verify. That can support auditable distributed systems, future Zcash protocol extensions, and higher Layer 1 capacity at the upper end of full-node usage, including future protocol directions such as Proof of Stake research.

Halo-style proving systems may also be useful for Zcash Shielded Assets and other privacy-preserving protocol extensions.

## Halo in the Wider Ecosystem

Electric Coin Co. has explored Halo research with Protocol Labs, the Filecoin Foundation, and the Ethereum Foundation. The shared interest is better scalability, interoperability, and privacy across Web3 ecosystems.

Halo 2 is available under the [MIT and Apache 2.0 open-source licenses](https://github.com/zcash/halo2#readme), so other projects can build with the proving system.

### Filecoin

The Halo 2 library has been adopted in projects such as zkEVM work, and there is potential for Halo 2 to support Filecoin proof-system improvements. Filecoin requires many costly proofs of spacetime and proofs of replication, so proof compression is valuable for scaling the network.

[Filecoin Foundation video with Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw)

Zcash and Filecoin also have complementary privacy and storage goals. It would be useful for Filecoin storage payments to support ZEC, giving users the same level of privacy for storage purchases that they can get from Zcash shielded transfers. Related work could include encrypted file storage, mobile-client support, and Zcash encrypted memo attachments.

[ECC x Filecoin blog post](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

### Ethereum

Halo 2 research has also been explored in connection with efficient Verifiable Delay Functions (VDFs). A VDF is a cryptographic primitive that can be used for randomness, smart-contract applications, and leader election in Proof of Stake systems.

ECC, the Filecoin Foundation, Protocol Labs, and the Ethereum Foundation have also worked with [Supranational](https://www.supranational.net/), a hardware-accelerated cryptography vendor, for potential GPU and ASIC design and development of VDF-related work.

The [Privacy and Scaling Exploration group](https://appliedzkp.org/) has researched ways Halo 2 proofs can improve privacy and scalability in the Ethereum ecosystem.

### Other projects using Halo

- [Taiga, Anoma's resource-machine proving system](https://specs.anoma.net/main/arch/node/ordering/execution/taiga.html)
- [Orbis, an L2 zkRollup on Cardano](https://docs.orbisprotocol.com/orbis/technology/halo-2)
- [DarkFi, a private L1 zkVM blockchain](https://dark.fi/book/arch/overview.html)

## Common Mistakes

- **Thinking Halo is a wallet or chain.** Halo is a proving-system design, and Halo 2 is an implementation used by Zcash and other projects.
- **Assuming every Zcash pool uses Halo.** Orchard uses Halo 2. Older pools such as Sprout and Sapling used earlier proving systems.
- **Treating recursion as finished scaling by itself.** Halo makes recursive proofs possible, but production scaling still depends on protocol design, engineering work, and wallet/full-node support.
- **Confusing no trusted setup with no cryptographic assumptions.** Halo removes setup trust, but it still depends on the security assumptions of its proof system and implementation.

## Related Pages

- [ZK-SNARKs](/zcash-tech/zk-snarks) - The zero-knowledge proof family that Halo builds on
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) - Future shielded asset work that can benefit from modern Zcash proving systems
- [Shielded Pools](/using-zcash/shielded-pools) - Orchard, Sapling, Sprout, and transparent value pools
- [Transactions](/using-zcash/transactions) - How Zcash transactions use shielded privacy

## Further Learning

- [An introduction to ZKP and Halo 2 - Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 with Daira & Str4d - ZKPodcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Technical explainer blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 community showcase - Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

## Documentation

- [Halo 2 resources](https://github.com/adria0/awesome-halo2)
- [Halo 2 docs](https://zcash.github.io/halo2/)
- [Halo 2 GitHub repository](https://github.com/zcash/halo2)
