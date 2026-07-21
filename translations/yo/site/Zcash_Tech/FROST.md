<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/FROST.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
# FROST [ìyẹn ìrì dídì]


## TL;DR

* FROST (Flexible Round-Optimised Schnorr Threshold Signatures) is a threshold signature and distributed key generation protocol: several signers each hold a share of a common private key, and a threshold number of them must cooperate to produce one signature.
* Nitoripe abajade jẹ iwe-aṣẹ Schnorr kan, iṣowo ti a ṣe ni ọna yii dabi iṣowo deede lori nẹtiwọọki naa.
* Ó máa ń gba ìjùmọ̀sọ̀rọ̀ díẹ̀, ó lè máa bára ṣe, ó sì lè dá ẹni tó bá hùwà àìdáa mọ̀ kó sì yọ ọ́ kúrò nínú ètò náà.
* For Zcash, this means FROST enables multiple, geographically separated parties to control the spend authority of shielded ZEC — useful for custody, escrow, non-custodial services, and Zcash Shielded Assets (ZSA).
* O ti ṣẹda nipasẹ Chelsea Komlo (Yunivesiti ti Waterloo, Zcash Foundation) ati Ian Goldberg (Yunivesiti ti waterloo).

## Àlàyé Ìjìnlẹ̀

### Kí ni àmì Schnorr?

Àmì ọ̀rọ̀ dígítálì Schnorr jẹ́ àpapọ̀ àwọn ìlànà: (KeyGen, Sign, Verify).

Schnorr signatures have several advantages. One key advantage is that when multiple keys are used to sign the same message, the resulting signatures can be combined into a single signature. This can significantly reduce the size of multisig payments and other multisig-related transactions.

### Kí ni FROST?

** Awọn ami-aṣẹ Iwọn Schnorr ti o dara julọ ti o wa ni iyipo ** -
*Awon ti o da nipa Chelsea Komlo (Yunivesiti ti Waterloo, Zcash Foundation) & Ian Goldberg (Yunivesiti ti waterloo).*

FROST is a threshold signature and distributed key generation protocol that requires minimal communication rounds and can be run in parallel. FROST protocol is a threshold version of the Schnorr signature scheme.

Unlike signatures in a single-party setting, threshold signatures require cooperation among a threshold number of signers, each holding a share of a common private key.

[Kí ni Àwọn Àmì Ìlàjú? Chelsea Komlo - Zcon3](https://youtu.be/cAfTTfblzoU?t=110)

Consequently, generating signatures in a threshold setting incurs overhead due to network rounds among signers, making it costly when secret shares are stored on network-limited devices or when coordination occurs over unreliable networks.

Nẹtiwọọki overhead nigba ti wole isẹ ti wa ni din nipa lilo a titun imuposi ti o dabobo lodi si forgery kolu ati ki o jẹ wulo si miiran eto bi daradara.

FROST ṣe ilọsiwaju awọn ilana ibuwọlu ti o ni opin nipa gbigba nọmba ailopin ti awọn iṣẹ ibuwọlẹ lati ṣee ṣe lailewu ni igbakanna (iṣọkan).

O le ṣee lo bi boya a 2-ipo ilana, ibi ti awọn onisowo firanṣẹ ki o si gba 2 ifiranṣẹ ni lapapọ, tabi bi ohun iṣapeye single-ipo wole ilana pẹlu kan preprocessing ipele.

FROST ṣe aṣeyọri awọn ilọsiwaju ṣiṣe rẹ ni apakan nipasẹ gbigba ilana lati fagile niwaju olukopa ti ko tọ, ẹniti o jẹ idanimọ ati yọ kuro ninu awọn iṣẹ iwaju.

Awọn ẹri aabo ti o fihan pe FROST ni aabo lodi si awọn ikọlu ifiranṣẹ ti o yan, ti o gba pe iṣoro logarithm iyatọ jẹ lile, ati pe alatako n ṣakoso awọn olukopa diẹ sii ju opin lọ, ni a pese [nibi]](https://eprint.iacr.org/2020/852.pdf#page=16).

### How does FROST work?

Àkọsílẹ̀ FROST ní àwọn apá pàtàkì méjì nínú:

First, n participants run a distributed key generation (DKG) protocol to generate a common verification key. At the end, each participant obtains a private secret key share and a public verification key share.

Lẹ́yìn náà, ẹnikẹ́ni t-out-of-n tó bá kópa lè lo ìlànà ìforúkọsílẹ̀ láti fi ṣe ìfọ̀rọ̀wánilẹ́nuwò tí yóò jẹ́ kí wọ́n lè ṣe ìfọwọ́sí Schnorr tó tọ́.

<a href="">
    <img src="https://static.cryptohopper.com/images/news/uploads/1634081807-frost-flexible-round-optimized-schnorr-threshold-signatures-1.jpg" alt="" width="400" height="300"/>
</a>

## Àwòrán / Àfiwé

Think of FROST like a safe-deposit box that opens only when several authorised keyholders turn their keys together — but not every keyholder is required; just a set number (for example, any 3 of 5). Once the box is open, an outside observer cannot tell which keyholders showed up, or even that more than one was involved. In the same way, a group can jointly authorise a Zcash transaction while the network sees only one ordinary-looking signature.

## Wọ inú Òkun Jìn

**Igbesile bọtini ti a pin kaakiri (DKG) **

Ìlépa ìgbésẹ̀ yìí ni láti dá àwọn kókó ìpamọ́ tí ó wà fún ìgbà pípẹ́ àti kókó ìdánilójú tí a jọ ṣe.

FROST builds its own key generation phase on Pedersen's DKG (GJKR03), which uses both Shamir's secret sharing and Feldman's verifiable secret sharing schemes as subroutines. In addition, each participant must demonstrate knowledge of their own secret by sending a zero-knowledge proof to the other participants, which is itself a Schnorr signature. This additional step protects against rogue-key attacks when t ≥ n/2.

At the end of the DKG protocol, a joint verification key vk is generated. Each participant Pᵢ holds a value (i, skᵢ ) that is their long-lived secret share and a verification key share vkᵢ = skᵢ *G. Participant Pᵢ's verification key share vkᵢ is used by other participants to verify the correctness of Pᵢ's signature shares during the signing phase, while the verification key vk is used by external parties to verify signatures issued by the group.

**Ìmúṣẹ Ìlàlóye**

Ipele yii kọ lori awọn ilana ti a mọ ti o lo pinpin aṣiri afikun ati iyipada pinpin lati ṣe agbekalẹ nonce fun ibuwọlu kọọkan. O tun nlo awọn imọ-ẹrọ asopọ lati yago fun awọn ikọlu ẹtan ti o mọ laisi ihamọ concurrency.

Ni ipele iṣaaju, olukopa kọọkan ṣetan nọmba ti o wa titi ti awọn orisii ti Elliptic Curve (EC) fun lilo nigbamii.

<a href="">
    <img src="https://i.ibb.co/nQD1c3n/preprocess.png" alt="" width="400" height="300"/>
</a>

Signing Round 1: Each participant Pᵢ begins by generating a single private nonce pair (dᵢ, eᵢ) and corresponding pair of EC points (Dᵢ, Eᵢ), then broadcasts this pair of points to all other participants. Each participant stores these pairs of EC points for later use. Signing rounds 2 and 3 are the actual operations in which t-out-of-n participants cooperate to create a valid Schnorr signature.

Ìforúkọsílẹ̀ Ìyí 2: Àwọn olùkópa ṣiṣẹ́ pọ̀ láti dá ìforúkọsórí Schnorr tó bágbà mu.

This step prevents forgery attacks because attackers cannot combine signature shares across distinct signing operations or permute the set of signers or published points for each signer.

<a href="">
    <img src="https://i.ibb.co/b5rJbXx/sign.png" alt="" width="400" height="300"/>
</a>

Having computed the challenge c, each participant can compute the response zᵢ using the single-use nonces and the long-term secret shares, which are t-out-of-n (degree t-1) Shamir secret shares of the group's long-lived key. At the end of signing round 2, each participant broadcasts zᵢ to other participants.

[Ka ìwé ìròyìn náà látòkèdélẹ̀](https://eprint.iacr.org/2020/852.pdf)

### Lílo FROST nínú ètò àyíká tó gbòòrò

**FROST nínú [Coinbase](https://github.com/coinbase/kryptology/tree/master/pkg/dkg/frost)**

Lati mu ilọsiwaju ti awọn eto ibuwọlu ti Coinbase pọ si, wọn ṣe agbekalẹ ẹya kan ti FROST. Imuse Coinbase yii ṣe awọn ayipada kekere lati inu apẹrẹ FROST atilẹba.

wọ́n yàn láti má ṣe lo iṣẹ́ àpapọ̀ ìforúkọsílẹ̀. dípò bẹ́ẹ̀, olùkópa kọ̀ọ̀kan jẹ́ olùkópọ̀ ìfọwọ́sí. àtúnṣe yìí jẹ́ ààbò púpọ̀: gbogbo àwọn tó ń kópa nínú ìlànà náà ṣàyẹ̀wò àwọn ìṣirò àwọn ẹlòmíràn, nípa bẹ́ẹ̀ ó ń mú ààbò tí ó ga jùlọ dé àti dín ewu kù. a tún yọ ìgbésẹ̀ ìdásílẹ̀ ìgbàkan náà kúrò láti mú kí ìmúṣẹ náà yára kánkán, pẹ̀lú ìyípadà ìsọ̀rí ìdìbò kẹta tí a lò dípò.

---

**[Ìdáná](https://eprint.iacr.org/2022/550.pdf) nipasẹ Blockstream**

A ṣe iṣeduro ilọsiwaju kan pato fun ohun elo lori FROST fun lilo lori [Blockstream Liquid Sidechain](https://blog.blockstream.com/roast-robust-asynchronous-schnorr-threshold-signatures/) fún Bitcoin.

“ROAST is a simple wrapper around threshold signature schemes like FROST. It guarantees that a quorum of honest signers, e.g., the Liquid functionaries, can always obtain a valid signature even in the presence of disruptive signers when network connections have arbitrarily high latency.”

---

**FROST nínú IETF**

The Internet Engineering Task Force, founded in 1986, is the premier standards development organisation for the Internet. The IETF develops voluntary standards that are often adopted by Internet users, network operators, and equipment vendors, helping shape the Internet's trajectory.

Àdàkọ FROST 11 (àdàkọ tó ní ìpele méjì) ni a [fi ránṣẹ́ sí IRTF](https://datatracker.ietf.org/doc/draft-irtf-cfrg-frost/11/)Eyi jẹ igbesẹ pataki si igbelewọn pipe ti FROST bi eto eto ibuwọlu tuntun fun lilo kọja intanẹẹti, ninu awọn ẹrọ ohun elo, ati fun awọn iṣẹ miiran ni awọn ọdun to nbo.


## Àwọn Ohun Tó Yẹ Ká Ṣe

Absolutely yes. The introduction of FROST to Zcash will allow multiple parties, separated geographically, to control the spend authority of shielded ZEC. Transactions broadcast using this signature scheme will be indistinguishable from other transactions on the network, maintaining strong resistance to payment tracking and limiting the amount of blockchain data available for analysis.

Ni iṣe, eyi jẹ ki ọpọlọpọ awọn ohun elo tuntun lati kọ lori nẹtiwọọki, ti o wa lati awọn olupese idogo si awọn iṣẹ miiran ti kii ṣe idaduro.

FROST will also become an essential component in the secure issuance and management of Zcash Shielded Assets (ZSA), enabling safer management of spend authority within development orgs & ZEC custodians such as exchanges, while also providing this capability to Zcash users.

## Àwọn Àṣìṣe Tó Máa Ń Ṣẹlẹ̀

**Confusing FROST with traditional on-chain multisig**. Traditional multisig can reveal multiple signers or multiple signatures on-chain. FROST produces a single aggregated Schnorr signature, so a transaction is indistinguishable from a single-signature transaction.

Nìkan nọmba ti o kere ju (t-out-of-n) ti awọn olukopa ti n ṣiṣẹ papọ le ṣe agbewọle to wulo; eyikeyi ẹgbẹ kekere ko le.

** Ifá pé FROST fi ohun gbogbo pamọ ní ìta-ìpínlẹ̀**. FROST dáàbò bo ìforúkọsílẹ̀ on-chain, sùgbọ́n àjùmọ̀sọ̀kan láàrin àwọn tó fọwọ́ sí ìwé náà ṣì ń ṣẹlẹ̀ ní òde-ìpamọ́ tí ó sì nílò ìkápá ìpamọ̀ àti ààbò tirẹ̀.


## Àwọn ojúewé tó tan mọ́ ọn

- [Halo](/zcash-tech/halo)  ètò ìdánilójú tí kò ní ìfọkàntánni, tí ó jẹ́ àtúnyẹ̀wò tí a lò nínú ikọ̀ Orchard ti Zcash.
- [Àwọn Kọ́kọ́rọ́ Ìwòye](/zcash-tech/viewing-keys)  ìfilọ́lẹ̀ ààyò fún àwọn àdéhùn tí a fi ààbò bo.
- [Awọn ohun-ini ti o ni aabo Zcash](/zcash-tech/zcash-shielded-assets)  níbi tí FROST ti ń ṣèrànwọ́ láti ṣakoso àṣẹ ìnáwó/ìfilọlẹ.
- [Ìmúṣiṣẹ́pọ̀ àpò Zcash](/zcash-tech/zcash-wallet-syncing)  apá pàtàkì mìíràn nínú ètò ìpamọ́ Zcash.


## Mímọ̀ Sí I

[Àpilẹ̀kọ tó dá lórí owó ẹyọ - Àwọn Àkọsílẹ̀ Ẹ̀wọ̀n](https://www.coinbase.com/blog/threshold-digital-signatures)

[Shamir Ìjìnlẹ̀ pínpín - Explainer & Àpẹẹrẹ](https://www.geeksforgeeks.org/shamirs-secret-sharing-algorithm-cryptography/)

[Àwòkẹ́kọ̀ọ́ Kúrú Nípa Àwọn Àmì Ọwọ́ Tí Wọ́n Fi Orí Íńtánẹ́ẹ̀tì Ṣe]](https://youtu.be/r9hJiDrtukI?t=19)

___
___
