<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) is a threshold signature and distributed key generation protocol: several signers each hold a share of a common private key, and a threshold number of them must cooperate to produce one signature.
* N'ihi na nsonaazụ ya bụ otu mbinye aka Schnorr, azụmahịa a mere n'ụzọ dị otú a yiri azụmahịa nkịtị na netwọk.
* Ọ na-achọ obere mkparịta ụka, nwere ike ịgba ọsọ n'otu oge, ma nwee ike ịchọpụta ma wepụ onye sonyere na-adịghị mma.
* For Zcash, this means FROST enables multiple, geographically separated parties to control the spend authority of shielded ZEC — useful for custody, escrow, non-custodial services, and Zcash Shielded Assets (ZSA).
* Ọ bụ Chelsea Komlo (mahadum nke Waterloo, Zcash Foundation) na Ian Goldberg (Mahadum Waterloo) mepụtara ya.

## Isi Nkọwa

### Gịnị bụ akara Schnorr?

Ntinye aka dijitalụ Schnorr bụ usoro nke algọridim: (KeyGen, Sign, Verify).

Schnorr signatures have several advantages. One key advantage is that when multiple keys are used to sign the same message, the resulting signatures can be combined into a single signature. This can significantly reduce the size of multisig payments and other multisig-related transactions.

### Gịnị bụ FROST?

** Mgbanwe gburugburu-kachasị Schnorr Threshold Signatures ** -
* Onye mepụtara ya bụ Chelsea Komlo (mahadum nke Waterloo, Zcash Foundation) & Ian Goldberg (Mahadum Waterloo).*

FROST bụ mbinye aka na-eme ka a na-ekesa usoro nhazi nke na-achọ obere nkwurịta okwu ma nwee ike ịgba ọsọ n'otu oge. FROST protocol bụ mbipute nke Schnorr signature scheme.

N'adịghị ka mbinye aka na ntọala otu-onye, mbinye akwụkwọ ọnụ ụzọ chọrọ nkwado n'etiti ọnụ ọgụgụ ọnụ ọgụgụ nke ndị na-edebanye aha, onye ọ bụla na-ejide òkè nke otu igodo nzuzo.

[Gịnị bụ Nkwekọrịta Threshold? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequently, generating signatures in a threshold setting incurs overhead due to network rounds among signers, making it costly when secret shares are stored on network-limited devices or when coordination occurs over unreliable networks.

Network overhead during signing operations is reduced by employing a novel technique that protects against forgery attacks and is applicable to other schemes as well.

FROST improves threshold signature protocols by allowing an unlimited number of signature operations to be performed safely in parallel (concurrency).

It can be used as either a 2-round protocol, where signers send and receive 2 messages in total, or as an optimised single-round signing protocol with a preprocessing stage.

FROST achieves its efficiency improvements in part by allowing the protocol to abort in the presence of a misbehaving participant, who is then identified and excluded from future operations.

Proofs of security demonstrating that FROST is secure against chosen-message attacks, assuming the discrete logarithm problem is hard, and the adversary controls fewer participants than the threshold, are provided [here](https://eprint.iacr.org/2020/852.pdf#page=16).

### How does FROST work?

Usoro iwu FROST nwere ihe abụọ dị mkpa:

First, n participants run a distributed key generation (DKG) protocol to generate a common verification key. At the end, each participant obtains a private secret key share and a public verification key share.

Mgbe nke ahụ gasịrị, onye ọ bụla t-nke-n nwere ike ịgba ọsọ ntinye aka n'ókè iji rụkọta ọrụ wee mepụta mbinye aka Schnorr.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Anya / Nkọwapụta

Think of FROST like a safe-deposit box that opens only when several authorised keyholders turn their keys together — but not every keyholder is required; just a set number (for example, any 3 of 5). Once the box is open, an outside observer cannot tell which keyholders showed up, or even that more than one was involved. In the same way, a group can jointly authorise a Zcash transaction while the network sees only one ordinary-looking signature.

## Ịbanye n'Okpuru Mmiri

** Nkesa isi ọgbọ (DKG) **

Ebumnuche nke usoro a bụ ịmepụta ihe nzuzo nzuzo na-adịru ogologo oge na igodo nyocha. Nke a na-agba ọsọ site n ndị sonyere.

FROST builds its own key generation phase on Pedersen's DKG (GJKR03), which uses both Shamir's secret sharing and Feldman's verifiable secret sharing schemes as subroutines. In addition, each participant must demonstrate knowledge of their own secret by sending a zero-knowledge proof to the other participants, which is itself a Schnorr signature. This additional step protects against rogue-key attacks when t ≥ n/2.

At the end of the DKG protocol, a joint verification key vk is generated. Each participant Pᵢ holds a value (i, skᵢ ) that is their long-lived secret share and a verification key share vkᵢ = skᵢ *G. Participant Pᵢ's verification key share vkᵢ is used by other participants to verify the correctness of Pᵢ's signature shares during the signing phase, while the verification key vk is used by external parties to verify signatures issued by the group.

** Ntinye aka n'ọnụ ụzọ**

This phase builds upon known techniques that employ additive secret sharing and share conversion to non-interactively generate the nonce for each signature. It also leverages binding techniques to avoid known forgery attacks without limiting concurrency.

Na preprocessing ogbo, onye ọ bụla so na-akwadebe a ofu ọnụ ọgụgụ nke ụzọ abụọ nke elliptic usoro (EC) ihe maka mgbe e mesịrị ojiji.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signing Round 1: Each participant Pᵢ begins by generating a single private nonce pair (dᵢ, eᵢ) and corresponding pair of EC points (Dᵢ, Eᵢ), then broadcasts this pair of points to all other participants. Each participant stores these pairs of EC points for later use. Signing rounds 2 and 3 are the actual operations in which t-out-of-n participants cooperate to create a valid Schnorr signature.

Ntinye aka nke abụọ: Ndị sonyere na-arụkọ ọrụ ọnụ iji mepụta mbinye aka Schnorr dị mma.

This step prevents forgery attacks because attackers cannot combine signature shares across distinct signing operations or permute the set of signers or published points for each signer.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Having computed the challenge c, each participant can compute the response zᵢ using the single-use nonces and the long-term secret shares, which are t-out-of-n (degree t-1) Shamir secret shares of the group's long-lived key. At the end of signing round 2, each participant broadcasts zᵢ to other participants.

[Gụọ akwụkwọ akụkọ ahụ n'ozuzu ya](https://eprint.iacr.org/2020/852.pdf)

### Ojiji nke FROST n'ime usoro okike sara mbara

** FROST na [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

To improve the efficiency of Coinbase's threshold-signing systems, they developed a version of FROST. This Coinbase implementation makes slight changes from the original FROST draft.

They opted not to use the signature aggregator role. Instead, each participant is a signature aggregator. This design is more secure: all participants in the protocol verify others' computations, thereby achieving a higher level of security and reducing risk. The one-time preprocessing stage was also removed to speed up the implementation, with a third signing round used instead.

---

**[Ejikọtara ọnụ](https://eprint.iacr.org/2022/550.pdf) site na Blockstream**

A na-atụ aro mmelite ngwa ngwa na FROST maka iji ya na [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) maka Bitcoin.

“ROAST is a simple wrapper around threshold signature schemes like FROST. It guarantees that a quorum of honest signers, e.g., the Liquid functionaries, can always obtain a valid signature even in the presence of disruptive signers when network connections have arbitrarily high latency.”

---

**FROST na IETF**

The Internet Engineering Task Force, founded in 1986, is the premier standards development organisation for the Internet. The IETF develops voluntary standards that are often adopted by Internet users, network operators, and equipment vendors, helping shape the Internet's trajectory.

FROST version 11 (abụọ-gburugburu variant) e [nyefere ka IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/)Nke a bụ nzọụkwụ dị mkpa maka nyocha zuru ezu nke FROST dị ka ọkọlọtọ usoro ntinye aka ọhụrụ maka iji gafee ịntanetị, na ngwaọrụ ngwaike, yana maka ọrụ ndị ọzọ n'afọ ndị na-abịanụ.


## Mmetụta Ndị Bara Uru

Absolutely yes. The introduction of FROST to Zcash will allow multiple parties, separated geographically, to control the spend authority of shielded ZEC. Transactions broadcast using this signature scheme will be indistinguishable from other transactions on the network, maintaining strong resistance to payment tracking and limiting the amount of blockchain data available for analysis.

In practice, this enables a wide range of new applications to be built on the network, ranging from escrow providers to other non-custodial services.

FROST will also become an essential component in the secure issuance and management of Zcash Shielded Assets (ZSA), enabling safer management of spend authority within development orgs & ZEC custodians such as exchanges, while also providing this capability to Zcash users.

## Mmehie Ndị A Na-emekarị

**Confusing FROST with traditional on-chain multisig**. Traditional multisig can reveal multiple signers or multiple signatures on-chain. FROST produces a single aggregated Schnorr signature, so a transaction is indistinguishable from a single-signature transaction.

Naanị ọnụ ọgụgụ ọnụ ọgụgụ (t-nke-n) nke ndị sonyere na-arụkọ ọrụ ọnụ nwere ike ịmepụta mbinye aka ziri ezi; obere ìgwè ọ bụla enweghị ike.

**Assuming FROST hides everything off-chain**. FROST protects the on-chain signature, but coordination between signers still occurs off-chain and requires its own privacy and security controls.


## Peeji ndị metụtara ya

- [Halo](/zcash-tech/halo)  enweghị ntụkwasị obi, usoro ihe akaebe na-emegharị emegharị nke ejiri na ọdọ mmiri Orchard nke Zcash.
- [Ịhụ Igodo](/zcash-tech/viewing-keys)  nhọrọ ngosi maka ekpuchi azụmahịa.
- [Zcash echebe akụ](/zcash-tech/zcash-shielded-assets)  ebe FROST na-enyere aka ijikwa ikike mmefu / mbipụta.
- [Zcash obere akpa syncing](/zcash-tech/zcash-wallet-syncing)  akụkụ ọzọ dị mkpa nke akụrụngwa nzuzo Zcash.


## Ịmụtakwu Ihe

[Isiokwu Coinbase - Ntinye aka n'ókè](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explainer & Ihe Nlereanya](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video dị mkpirikpi na Schnorr Digital Signatures](https://youtu.be/r9hJiDrtukI?t=19)

___
___
