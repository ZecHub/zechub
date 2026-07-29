<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) is a threshold signature and distributed key generation protocol: several signers each hold a share of a common private key, and a threshold number of them must cooperate to produce one signature.
* Kwa sababu matokeo ni moja Schnorr saini, shughuli kufanywa kwa njia hii inaonekana kama shughuli ya kawaida kwenye mtandao.
* Inahitaji raundi ndogo ya mawasiliano, inaweza kukimbia kwa sambamba, na inaweza kutambua na kuwatenga mshiriki anayejiendesha vibaya.
* Kwa Zcash, hii inamaanisha FROST inaruhusu vyama vingi, tofauti kijiografia kudhibiti mamlaka ya matumizi ya ZEC iliyohifadhiwa  muhimu kwa uhifadhi, escrow, huduma zisizo za kuhifadhi, na Zcash Shielded Assets (ZSA).
* Ilianzishwa na Chelsea Komlo (Chuo Kikuu cha Waterloo, Zcash Foundation) na Ian Goldberg (Chemchemi ya Chuo kikuu cha waterloo).

## Maelezo ya msingi

### Ishara ya Schnorr ni nini?

Saini ya dijiti ya Schnorr ni seti ya algorithms: (KeyGen, Saini, Thibitisha).

Mikataba ya Schnorr ina faida kadhaa. Faida moja muhimu ni kwamba wakati funguo nyingi zinatumiwa kusaini ujumbe huo huo, saini zinazosababishwa zinaweza kuunganishwa kuwa saini moja. Hii inaweza kupunguza kwa kiasi kikubwa saizi ya malipo ya multisig na shughuli zingine zinazohusiana na multisig.

### FROST ni nini?

** Flexible Round-Optimized Schnorr Threshold Signatures ** -
*Kuundwa na Chelsea Komlo (Chuo Kikuu cha Waterloo, Zcash Foundation) & Ian Goldberg (Chuu Kikuu ya Waterloo).*

FROST ni saini kizingiti na kusambazwa muhimu kizazi itifaki ambayo inahitaji raundi ya mawasiliano ya chini na inaweza kuendeshwa kwa sambamba. FROST itifaki ni toleo kiingiliano ya Schnorr saini mpango.

Unlike signatures in a single-party setting, threshold signatures require cooperation among a threshold number of signers, each holding a share of a common private key.

[Ni nini Saini ya Kiwango cha Kiwango? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Matokeo yake, kuzalisha saini katika kuweka kizingiti hujitokeza kwa sababu ya mzunguko wa mtandao kati ya wasaini, na kuifanya kuwa ghali wakati hisa za siri zimehifadhiwa kwenye vifaa vya mtandao-vifupi au wakati uratibu unatokea kwenye mitandao isiyoaminika.

Mtandao overhead wakati wa kusaini shughuli ni kupunguzwa kwa kutumia mbinu riwaya ambayo inalinda dhidi ya mashambulizi bandia na ni husika kwa miradi mingine pia.

FROST inaboresha itifaki ya saini ya kizingiti kwa kuruhusu idadi isiyo na kikomo ya shughuli za saini kufanywa kwa usalama sambamba (mshikamano).

Ni inaweza kutumika kama ama 2-mzunguko itifaki, ambapo saini kutuma na kupokea 2 ujumbe katika jumla, au kama optimized moja-mzunguku kusaini itifaki na hatua ya kabla ya usindikaji.

FROST hufikia uboreshaji wake wa ufanisi kwa sehemu kwa kuruhusu itifaki kukomesha katika uwepo wa mshiriki ambaye ana tabia mbaya, ambaye hutambuliwa na kutengwa kutoka kwa shughuli za baadaye.

Proofs of security demonstrating that FROST is secure against chosen-message attacks, assuming the discrete logarithm problem is hard, and the adversary controls fewer participants than the threshold, are provided [here](https://eprint.iacr.org/2020/852.pdf#page=16).

### FROST hufanyaje kazi?

Itifaki ya FROST ina vipengele viwili muhimu:

First, n participants run a distributed key generation (DKG) protocol to generate a common verification key. At the end, each participant obtains a private secret key share and a public verification key share.

Baadaye, yoyote t-nje-ya-n washiriki wanaweza kukimbia kizingiti kusaini itifaki kwa kushirikiana kuzalisha sahihi halali Schnorr.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Visual / Ulinganisho

Think of FROST like a safe-deposit box that opens only when several authorised keyholders turn their keys together — but not every keyholder is required; just a set number (for example, any 3 of 5). Once the box is open, an outside observer cannot tell which keyholders showed up, or even that more than one was involved. In the same way, a group can jointly authorise a Zcash transaction while the network sees only one ordinary-looking signature.

## Kuzama kwa Kina

** Usambazaji wa ufunguo uliosambazwa (DKG) **

Lengo la awamu hii ni kuzalisha muda mrefu siri funguo hisa na pamoja uthibitishaji muhimu. awamu hii inaendeshwa na washiriki n.

FROST builds its own key generation phase on Pedersen's DKG (GJKR03), which uses both Shamir's secret sharing and Feldman's verifiable secret sharing schemes as subroutines. In addition, each participant must demonstrate knowledge of their own secret by sending a zero-knowledge proof to the other participants, which is itself a Schnorr signature. This additional step protects against rogue-key attacks when t ≥ n/2.

At the end of the DKG protocol, a joint verification key vk is generated. Each participant Pᵢ holds a value (i, skᵢ ) that is their long-lived secret share and a verification key share vkᵢ = skᵢ *G. Participant Pᵢ's verification key share vkᵢ is used by other participants to verify the correctness of Pᵢ's signature shares during the signing phase, while the verification key vk is used by external parties to verify signatures issued by the group.

** Kuweka Saini ya Kiwango**

This phase builds upon known techniques that employ additive secret sharing and share conversion to non-interactively generate the nonce for each signature. It also leverages binding techniques to avoid known forgery attacks without limiting concurrency.

In the preprocessing stage, each participant prepares a fixed number of pairs of Elliptic Curve (EC) points for later use. This stage runs once across multiple threshold signing phases.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signing Round 1: Each participant Pᵢ begins by generating a single private nonce pair (dᵢ, eᵢ) and corresponding pair of EC points (Dᵢ, Eᵢ), then broadcasts this pair of points to all other participants. Each participant stores these pairs of EC points for later use. Signing rounds 2 and 3 are the actual operations in which t-out-of-n participants cooperate to create a valid Schnorr signature.

Kusaini Round 2: Washiriki kazi pamoja ili kujenga sahihi halali Schnorr. msingi mbinu nyuma ya mzunguko huu ni t-nje-ya-t nyongeza siri kugawana.

Hatua hii inazuia mashambulizi bandia kwa sababu washambuliaji hawawezi kuchanganya saini hisa katika tofauti kusaini shughuli au permute seti ya saini au kuchapishwa pointi kwa kila saini.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Having computed the challenge c, each participant can compute the response zᵢ using the single-use nonces and the long-term secret shares, which are t-out-of-n (degree t-1) Shamir secret shares of the group's long-lived key. At the end of signing round 2, each participant broadcasts zᵢ to other participants.

[Soma makala nzima](https://eprint.iacr.org/2020/852.pdf)

### Matumizi ya FROST katika mazingira pana

** FROST katika [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Ili kuboresha ufanisi wa Coinbase ya mipaka ya kusaini mifumo, wao maendeleo toleo la FROST. utekelezaji huu Coinbase hufanya mabadiliko madogo kutoka awali FROST rasimu.

They opted not to use the signature aggregator role. Instead, each participant is a signature aggregator. This design is more secure: all participants in the protocol verify others' computations, thereby achieving a higher level of security and reducing risk. The one-time preprocessing stage was also removed to speed up the implementation, with a third signing round used instead.

---

**[KUTAMBWA](https://eprint.iacr.org/2022/550.pdf) na Blockstream**

Uboreshaji maalum wa maombi juu ya FROST unapendekezwa kwa matumizi kwenye [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) kwa Bitcoin.

“ROAST is a simple wrapper around threshold signature schemes like FROST. It guarantees that a quorum of honest signers, e.g., the Liquid functionaries, can always obtain a valid signature even in the presence of disruptive signers when network connections have arbitrarily high latency.”

---

** FROST katika IETF **

Internet Engineering Task Force, ilianzishwa mwaka 1986, ni shirika la maendeleo ya viwango vya premier kwa ajili ya mtandao. IETF yanaendelea viwango vya hiari kwamba ni mara nyingi kupitishwa na watumiaji wa mtandao, waendeshaji wa mitandao, na wauzaji wa vifaa, kusaidia sura ya trajectory mtandao.

FROST toleo 11 (mzunguko mbili variant) imekuwa [wasilishwa kwa IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/)Hii ni hatua muhimu kuelekea tathmini kamili ya FROST kama kiwango kipya cha mpango wa saini ya kizingiti kwa matumizi kwenye mtandao, katika vifaa vya vifaa, na kwa huduma zingine katika miaka ijayo.


## Matokeo ya Kihalisi

Absolutely yes. The introduction of FROST to Zcash will allow multiple parties, separated geographically, to control the spend authority of shielded ZEC. Transactions broadcast using this signature scheme will be indistinguishable from other transactions on the network, maintaining strong resistance to payment tracking and limiting the amount of blockchain data available for analysis.

Katika mazoezi, hii inaruhusu mbalimbali ya maombi mpya ya kujengwa kwenye mtandao, kuanzia watoa huduma escrow kwa huduma nyingine zisizo uhifadhi.

FROST will also become an essential component in the secure issuance and management of Zcash Shielded Assets (ZSA), enabling safer management of spend authority within development orgs & ZEC custodians such as exchanges, while also providing this capability to Zcash users.

## Makosa ya Kawaida

**Kuchanganya FROST na jadi on-chain multisig**. Multisig ya jadi inaweza kufunua wasaini wengi au saini nyingi kwenye mnyororo. FROST inazalisha saini moja ya Schnorr iliyounganishwa, kwa hivyo shughuli haiwezi kutofautishwa na shughuli moja ya saini.

** Kudhani chini ya kizingiti wanaweza saini **. Tu kizingitisho idadi (t-nje-ya-n) ya washiriki wanaofanya kazi pamoja wanaweza kuzalisha saini halali; kikundi chochote kidogo hakiwezi.

**Assuming FROST hides everything off-chain**. FROST protects the on-chain signature, but coordination between signers still occurs off-chain and requires its own privacy and security controls.


## Kurasa Zinazohusiana

- [Halo](/zcash-tech/halo)  the trustless, recursive proof system used in Zcash's Orchard pool.  mfumo wa uthibitisho usioaminika, uliotumiwa katika bwawa la Orchard la Zcash.
- [Kuona funguo](/zcash-tech/viewing-keys)  ufunuo kuchagua kwa ajili ya shughuli shielded.
- [Zcash Shielded Mali](/zcash-tech/zcash-shielded-assets)  ambapo FROST husaidia kusimamia matumizi / utoaji mamlaka.
- [Zcash mkoba Syncing](/zcash-tech/zcash-wallet-syncing)  nyingine ya msingi kipande cha Zcash faragha miundombinu.


## Kujifunza Zaidi

[Coinbase Ibara - Threshold Signatures](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Siri Kushiriki - Explainer & Mfano](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Video fupi juu ya Schnorr Digital Signatures](https://youtu.be/r9hJiDrtukI?t=19)

___
___
