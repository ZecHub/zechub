<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Osisi osisi Sapling

> Sapling gara ndụ na Zcash mainnet na ngọngọ 419,200 (Ọktoba 29, 2018, 02:15 UTC).

Ihe ị ga-ewepụ: Sapling mere ka ego Zcash nkeonwe dị ngwa ma dịkwa mfe iji rụọ ọrụ na ekwentị ma ọ bụ obere akpa akụrụngwa.

Sapling was the second major Zcash network upgrade, activating on Zcash's second anniversary. It was a consensus hard fork that rebuilt how shielded (private) transactions are put together. The deployment is defined by ZIP 205, the new transaction signature rules by ZIP 243, and both build on ZIP 200, the network upgrade mechanism. The full details live in the Zcash Protocol Specification. Electric Coin Company built the upgrade and shipped the first version that supported it, zcashd 2.0.0, in August 2018. On chain, the network identifies the Sapling rules by its consensus branch id.

Why this matters. Before Sapling, making a truly private payment meant waiting minutes while your computer chewed through gigabytes of memory to build the proof. That was too slow and too heavy for most people, so a lot of users, exchanges, and shops skipped shielded transactions and sent ZEC in the open instead. Sapling cut the work down to a few seconds and about 40 megabytes of memory. That single change is what made shielded ZEC practical to use in everyday life, on ordinary phones and on hardware wallets.

## Ihe gbanwere

The heart of Sapling is a faster way to build the zero-knowledge proof that keeps a shielded transaction private. The original Sprout design used a single proving circuit (the JoinSplit circuit) that was slow and memory-hungry. Sapling replaced it with two purpose-built circuits, a Spend circuit and an Output circuit, described in the Zcash Protocol Specification. The result is a large drop in cost. Per Electric Coin Company, a shielded transaction can be built in as little as a few seconds using about 40 megabytes of memory. The pre-Sapling Sprout baseline was far heavier, on the order of minutes and several gigabytes of memory (these Sprout-side figures are the widely cited approximate baseline).

![Sprout versus Sapling shielded transaction cost](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Igodo ọhụrụ .

Sapling webatara usoro ọhụrụ nke adreesị na igodo echekwara. Otu isi nwere ike nweta ọtụtụ adres dị iche, bụ ndị a pụrụ ịkwụ ụgwọ ha n'otu oge ahụ onye nyocha si n'èzí enweghị ike ijikọ ibe ya ọzọ. Sapling gbakwunyere igodo elele: Igodo zuru ezu ma ọ bụ ntinye ọhụụ na-enye gị ohere ikesa ikike ịhụ nkọwa azụmahịa obere akpa ego na-enweghị inyefe ikike iji mefuo ego ya. Nke ahụ bara uru maka nyochaa, ndekọ ego, ma ọ bụkwanụ naanị gosipụta ka akwụgoro ụgwọ.

A related change is that Sapling separated the job of building the proof from the job of signing the transaction. The device that constructs the zero-knowledge proof no longer has to be the device that holds spend authority. This decoupling is what lets a hardware wallet keep your spending key isolated while a separate device does the heavier proving work.

![Proving device hands the proof to a separate signing device](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Nhazi a tụkwasịrị obi.

Sapling's circuits rely on a set of public parameters that had to be generated carefully. If a single party had produced them alone and kept the leftover secret data (the "toxic waste"), that party could have forged proofs. To avoid this, the parameters came from a two-phase, multi-party ceremony. Phase 1, called Powers of Tau, was circuit-agnostic, meaning it was not tied to Sapling's specific circuits. Phase 2, the Sapling MPC, was circuit-specific. Each phase stays secure as long as at least one participant was honest and destroyed their toxic waste, so the ceremony only fails if every single participant colludes.

## Otú e si rụọ ya .

Sapling followed Overwinter, the June 2018 upgrade that prepared the network's upgrade mechanism. Electric Coin Company set the mainnet activation height in zcashd 2.0.0, released in August 2018, and the network switched to the Sapling rules when block 419,200 was mined. On chain, that moment is marked by the Sapling consensus branch id.

![Timeline from Zcash launch to Sapling activation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Akwụkwọ ọkọwa okwu

Okwu. N'asụsụ Bekee nkịtị pụtara:
|---|---|
❖ Nkwekọrịta a na-echekwa echebe. Ihe azụmahịa Zcash nke onwe ya nke na-ezo onye zitere, onye natara ihe, na ego ahụ.
Sprout. Usoro mbụ echekwara nke Zcash bidoro, dị nwayọ ma sie ike karịa Sapling.
◯ Spend na Output circuits. Ihe ọhụrụ abụọ Sapling egosi sekit nke dochie Sprout si otu Jikọọ-Kewaa circuit.
Adreesị dịgasị iche. Otu n'ime ọtụtụ adreesị ịkwụ ụgwọ na-enweghị ike ijikọ ọnụ nke i nwere ike isi na otu igodo nweta.
◯ Igodo nlele ❑ Igodo nke na-eme ka mmadụ hụ azụmahịa dị n'akpa ego ma ghara iji ya emefu ihe.
◯ Consensus branch id. A obere koodu na-agwa netwọk nke nwelite iwu a azụmahịa esote.

## Ajụjụ ndị a na-ajụkarị

Sapling gbanwere otú e si arụ azụmahịa ndị a na-echebe, ọ bụghị ego ole ZEC onye ọbụla nwere maọbụ ngụkọta ọkọnọ. Ọ dịghị emetụta nguzo gị.

ZEC m ka bụ nkeonwe mgbe Sapling? Ee, na ihe ọzọ usable. Sapling nọgidere ike nzuzo nke kpuchie azụmahịa ma mee ha ngwa ngwa na ọnụ ala iji n'ezie-eji. Echebe ego ịnọgide zoro ezo otu ụzọ ahụ.

Enwere m ihe ọ bụla? Ọ dịghị mkpa ka ị mee ya dịka onye nwe. Sapling bụ nkwalite netwọk nke obere akpa na sọftụwia node nakweere. Akpa ego ndị dị ugbu a akwadolarị adreesị Sapling.

What is the difference between Sprout and Sapling? Sprout was the first shielded protocol and used one slow, memory-heavy proving circuit. Sapling replaced it with faster Spend and Output circuits, added viewing keys and diversified addresses, and made shielded transactions light enough for phones and hardware wallets.

N'ihi gịnị ka ụfọdụ isi mmalite na-ekwu October 28 ma ndị ọzọ Ọkt 29? E setịpụrụ ịdị elu nke ọrụ ahụ tupu oge eruo iji lekwasị anya n'Ọktoba 28, 2018. A tụpụtara ngọngọ nke kpatara mgbanwe, ogige 419,200, n'isi ụtụtụ nke October 29 UTC. Na ọtụtụ mpaghara mpaghara ebe ọ bụ October 28. Ọ bụ otu ihe mgbochi ahụ na otu oge ahụ kwa ụzọ.

Kedu ihe bụ igodo nlele? Igodo nlekota na-ahapụ gị ka ịkekọrịta ohere ịgụ akwụkwọ maka obere akpa echedoro. Onye nwere mkpịsị ugodi zuru ezu ma ọ bụ nke na - abata nwere ike ịhụ nkọwa azụmahịa nke obere akpa ahụ mana enweghị ike iji ego ya mee ihe. Lee [Igodo Nlele](../zcash-tech/viewing-keys) maka ihe ndị ọzọ.

## Nwalee nghọta gị .

N'okpuru Sprout, gịnị mere ọtụtụ ndị ji ezere azụmahịa e chebere echebe, oleekwa otú Sapling si dozie ya?

<details>
<summary>Answer</summary>
Under Sprout, building a shielded transaction took minutes and used gigabytes of memory, so it was too slow and heavy for most users, exchanges, and shops. Sapling introduced faster Spend and Output circuits that cut the work to a few seconds and about 40 megabytes, making shielded transactions practical on everyday phones and hardware wallets.
</details>

### Akụnụba

- [ZIP 205: Ịmepụta nkwalite netwọkụ Sapling](https://zips.z.cash/zip-0205)
- [ZIP 243: Nkwado nkwekọrịta azụmahịa maka Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling mmelite peeji nke](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling announcement](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Announcing the Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Lee kwa nke a.

- [Ọdọ Mmiri Ndị E Chebere Echiche Ha Na Ya](../using-zcash/shielded-pools)
- [Igodo Nlele](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Nwelite netwọk Zcash](../start-here/network-upgrades)
- [Akpa ego](../using-zcash/wallets)
- [Ụlọ ọrụ Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Usoro: [Nhazi nke netwọkụ na-emelite.](../start-here/network-upgrades) · Nke gara aga: [Oge oyi na-agafe.](../zcash-tech/overwinter) · Nke ọzọ: [Osisi okooko osisi Blossom](../zcash-tech/blossom)
