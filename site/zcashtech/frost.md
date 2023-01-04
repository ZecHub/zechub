# FROST 


## What is a Schnorr signature?

A Schnorr digital signature is a set of algorithms: (KeyGen, Sign, Verify).

Schnorr signatures have several advantages. One key advantage is that when multiple keys are used to sign the same message, the resulting signatures can be combined into a single signature. This can be used to significantly reduce the size of multisig payments and other multisig related transactions.


## What is FROST?

**Flexible Round-Optimized Schnorr Threshold Signatures** -
*Created by Chelsea Komlo (University of Waterloo, Zcash Foundation) & Ian Goldberg (University of Waterloo).*

FROST is a threshold signature and distributed key generation protocol that offers minimal rounds of communication and is secure to be run in parallel. FROST protocol is a threshold version of the Schnorr signature scheme.

Unlike signatures in a single-party setting, threshold signatures require cooperation among a threshold number of signers each holding a share of a common private key. 

[What are Threshold Signatures? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequently, generating signatures in a threshold setting imposes overhead due to network rounds among signers, proving costly when secret shares are stored on network-limited devices or when coordination occurs over unreliable networks.

Network overhead during signing operations is reduced by employing a novel technique to protect against forgery attacks applicable to other schemes.
 
FROST improves upon threshold signature protocols as an unlimited number of signature operations can be performed safely in parallel (concurrency).
 
It can be used as either a 2-round protocol where signers send and receive 2 messages in total, or optimized to a single-round signing protocol with a pre-processing stage. 

FROST achieves its efficiency improvements in part by allowing the protocol to abort in the presence of a misbehaving participant (who is then identified and excluded from future operations).
 
Proofs of security demonstrating that FROST is secure against chosen-message attacks assuming the discrete logarithm problem is hard and the adversary controls fewer participants than the threshold are provided [here](https://eprint.iacr.org/2020/852.pdf#page=16).


## How does FROST work?

The FROST protocol contains two important components:

First, n participants run a *distributed key generation (DKG) protocol* to generate a common verification key; at the end, each participant obtains a private secret key share and a public verification key share. 

Afterwards, any t-out-of-n participants can run a *threshold signing protocol* to collaboratively generate a valid Schnorr signature. 

![Threshold sign](https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg "thresholdsign")


**Distributed key generation (DKG)**

The goal of this phase is to generate long-lived secret key shares and a joint verification key. This phase is run by n participants. 

FROST builds its own key generation phase upon [Pedersen’s DKG (GJKR03)](https://blog.gtank.cc/notes-on-threshold-signatures/)  in which it uses both Shamir secret sharing and Feldman’s verifiable secret sharing schemes as subroutines. In addition, Each participant is required to demonstrate knowledge of their own secret by sending to other participants a zero-knowledge proof, which itself is a Schnorr signature. This additional step protects against rogue-key attacks in the setting where t ≥ n/2.

At the end of the DKG protocol, a joint verification key vk is generated. Also, each participant P ᵢ holds a value (i, sk ᵢ ) that is their long-lived secret share and a verification key share vk ᵢ = sk ᵢ *G. Participant P ᵢ’s verification key share vk ᵢis used by other participants to verify the correctness of P ᵢ’s signature shares in the signing phase, while the verification key vk is used by external parties to verify signatures issued by the group.

**Threshold Signing**

This phase builds upon known techniques that employ additive secret sharing and share conversion to non-interactively generate the nonce for each signature. This phase also leverages binding techniques to avoid known forgery attacks without limiting concurrency.

Preprocessing: In the preprocessing stage, each participant prepares a fixed number of Elliptic Curve (EC) point pairs for further use, which is run for a single time for multiple threshold signing phases.

![Preprocessing](https://i.ibb.co/nQD1c3n/preprocess.png "preprocess stage")

Signing Round 1: Each participant Pᵢ begins by generating a single private nonce pair (dᵢ, eᵢ) and corresponding pair of EC points (Dᵢ, Eᵢ) and broadcasts this pair of points to all other participants. Each participant stores these pairs of EC points received for use later. Signing rounds 2 and 3 are the actual operations in which t-out-of-n participants cooperate to create a valid Schnorr signature.

Signing Round 2: To create a valid Schnorr signature, any t participants work together to execute this round. The core technique behind this round is t-out-of-t additive secret sharing.

This step prevents forgery attack because attackers cannot combine signature shares across distinct signing operations or permute the set of signers or published points for each signer. 

![Signing protocol](https://i.ibb.co/b5rJbXx/sign.png "signing protocol")

Having computed the challenge c, each participant is able to compute the response zᵢ to the challenge using the single-use nonces and the long-term secret shares, which are t-out-of-n (degree t-1) Shamir secret shares of the group’s long-lived key. At the end of signing round 2, each participant broadcasts zᵢ to other participants.

[Read the full paper](https://eprint.iacr.org/2020/852.pdf)


## Does it benefit Zcash?

Absolutey yes. The introduction of FROST to Zcash will allow multiple parties, seperated geographically to control spend authority of shielded ZEC. An advantage being that transactions broadcast using this signature scheme will be indistinguishable from other transactions on the network, maintaining strong resistance to payment tracking and limiting the amount of blockchain data available for analysis. 

In practice this allows for an entire host of new applications to be built on the network ranging from escrow providers or other non-custodial services. 

FROST will also become an essential component in the secure issuance and management of Zcash Shielded Assets (ZSA) enabling safer management of spend authority within development orgs & ZEC custodians such as exchanges by further distributing trust while providing this capability to Zcash users as well. 


## FROST use in the wider ecosystem

**FROST in [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

In order to improve efficiency of Coinbase’s threshold-signing systems they developed a version of FROST. The Coinbase implementation making slight changes from the original FROST draft.

They opted not use the signature aggregator role. Instead, each participant is a signature aggregator. This design is more secure: all the participants of the protocol verify what others have computed to achieve a higher level of security and reduce risk. The (one-time) preprocessing stage was also removed in order to speed up the implementation, having a third signing round instead.

___

**[ROAST](https://eprint.iacr.org/2022/550.pdf) by Blockstream** 

An application specific improvement on FROST proposed for use on [Blockstream's Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) for Bitcoin.

"ROAST is a simple wrapper around threshold signature schemes like FROST. It guarantees that a quorum of honest signers, e.g., the Liquid functionaries, can always obtain a valid signature even in the presence of disruptive signers when network connections have arbitrarily high latency." 

___

**FROST in IETF**

The Internet Engineering Task Force, founded in 1986, is the premiere standards development organization for the Internet. The IETF makes voluntary standards that are often adopted by Internet users, network operators, and equipment vendors, and it thus helps shape the trajectory of the development of the Internet.

FROST version 11 (two-round variant) has been [submitted to IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/). 

This is an important step for the complete evaluation & of FROST as a new threshold signatture scheme standard for use across the internet, in hardware devices and for other services in the years to come. 
___


Further Learning:

[Coinbase Article - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Secret Sharing - Explainer & Example](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Short Video on Schnorr Digital Signatures](https://youtu.be/r9hJiDrtukI?t=19)

___
___




