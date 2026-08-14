<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Sapling.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Sapling

> Sapling alienda kuishi kwenye Zcash mainnet katika block 419,200 (Oktoba 29, 2018, 02:15 UTC).

Nini wewe kuchukua mbali: Sapling alifanya binafsi Zcash malipo ya haraka na mwanga kutosha kuendesha kwenye simu au mkoba vifaa.

Sapling was the second major Zcash network upgrade, activating on Zcash's second anniversary. It was a consensus hard fork that rebuilt how shielded (private) transactions are put together. The deployment is defined by ZIP 205, the new transaction signature rules by ZIP 243, and both build on ZIP 200, the network upgrade mechanism. The full details live in the Zcash Protocol Specification. Electric Coin Company built the upgrade and shipped the first version that supported it, zcashd 2.0.0, in August 2018. On chain, the network identifies the Sapling rules by its consensus branch id.

Why this matters. Before Sapling, making a truly private payment meant waiting minutes while your computer chewed through gigabytes of memory to build the proof. That was too slow and too heavy for most people, so a lot of users, exchanges, and shops skipped shielded transactions and sent ZEC in the open instead. Sapling cut the work down to a few seconds and about 40 megabytes of memory. That single change is what made shielded ZEC practical to use in everyday life, on ordinary phones and on hardware wallets.

## Ni nini kilichobadilika?

The heart of Sapling is a faster way to build the zero-knowledge proof that keeps a shielded transaction private. The original Sprout design used a single proving circuit (the JoinSplit circuit) that was slow and memory-hungry. Sapling replaced it with two purpose-built circuits, a Spend circuit and an Output circuit, described in the Zcash Protocol Specification. The result is a large drop in cost. Per Electric Coin Company, a shielded transaction can be built in as little as a few seconds using about 40 megabytes of memory. The pre-Sapling Sprout baseline was far heavier, on the order of minutes and several gigabytes of memory (these Sprout-side figures are the widely cited approximate baseline).

![Sprout versus Sapling shielded transaction cost](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-before-after.png)

## Funguo mpya

Sapling also introduced a new set of shielded addresses and keys. One key can derive many diversified addresses, which are separate payment addresses that an outside observer cannot link back to each other. Sapling added viewing keys too: a full or incoming viewing key lets you share the ability to see a wallet's transaction details without handing over the ability to spend its funds. That is useful for auditing, accounting, or simply proving a payment was made.

A related change is that Sapling separated the job of building the proof from the job of signing the transaction. The device that constructs the zero-knowledge proof no longer has to be the device that holds spend authority. This decoupling is what lets a hardware wallet keep your spending key isolated while a separate device does the heavier proving work.

![Proving device hands the proof to a separate signing device](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-decoupled-spend.png)

## Uanzishaji wa kuaminika

Mzunguko wa Sapling unategemea seti ya vigezo vya umma ambavyo vilitakiwa kuzalishwa kwa uangalifu. Ikiwa chama kimoja kiliwaleta peke yake na kuweka data iliyobaki siri ("takataka zenye sumu"), chama hicho kingeweza kudanganya uthibitisho. Ili kuepuka hili, vigezeo vilikuja kutoka katika hatua mbili za sherehe nyingi. Awamu 1, inayoitwa Nguvu za Tau, ilikuwa mzunguko-agnostic, ikimaanisha haikuunganishwa na mizunguko maalum ya Sapling. Awamridi 2, Sapling MPC, ilikuwa mahususi kwa mzungulo. Kila awamu inakaa salama maadamu angalau mmoja anayeshiriki alikuwa mwaminifu na aliharibu taka zao zenye sumu, hivyo sherehe hiyo itashindwa tu ikiwa kila mshiriki ataungana.

## Jinsi ilivyotenda kazi

Sapling followed Overwinter, the June 2018 upgrade that prepared the network's upgrade mechanism. Electric Coin Company set the mainnet activation height in zcashd 2.0.0, released in August 2018, and the network switched to the Sapling rules when block 419,200 was mined. On chain, that moment is marked by the Sapling consensus branch id.

![Timeline from Zcash launch to Sapling activation](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/sapling-timeline.png)

## Orodha ya maneno

Neno la Kiingereza lisilo na maana.
|---|---|
"Shirikisho la kulindwa" ni shughuli ya Zcash binafsi ambayo huficha mtumaji, mpokeaji na kiasi.
Sprout. awali ulinzi itifaki Zcash ilizinduliwa na, polepole zaidi na nzito kuliko Sapling.
❖ Matumizi na pato mzunguko. mbili mpya Sapling kuthibitisha mizunguko ambayo kubadilishwa Sprout ya moja JoinSplit circuit.
Anwani ya Diversified. Moja ya anwani nyingi unlinkable malipo unaweza kupata kutoka ufunguo mmoja.
---- ufunguo wa kuangalia. Ufunguo ambao unamruhusu mtu kuona shughuli za mkoba bila kuwa na uwezo wa kutumia kutoka kwake.
◯ Id ya tawi la makubaliano. Kifupi cha nambari ambayo inaambia mtandao ambao upgrades sheria shughuli kufuata.

## FAQs

Je, Sapling kubadilishwa jinsi ZEC mimi mwenyewe? Hapana. Sapling iliyopita jinsi shughuli ulinzi ni kujengwa, si kiasi cha ZEC mtu yeyote ana au usambazaji jumla. salio yako ilikuwa unaffected.

Je, ZEC yangu bado binafsi baada ya Sapling? Ndiyo, na zaidi usable. Sapling ilidumisha siri kali ya shughuli ulinzi na kuwafanya haraka na rahisi kutosha kwa kweli kutumia. fedha Shielded kubaki siri njia sawa.

Je, mimi na kufanya kitu chochote? Hakuna hatua inahitajika kutoka kwenu kama mmiliki. Sapling ilikuwa mtandao kuboresha kwamba mkoba na node programu iliyopitishwa. pochi kisasa tayari msaada anwani ya Sapling.

What is the difference between Sprout and Sapling? Sprout was the first shielded protocol and used one slow, memory-heavy proving circuit. Sapling replaced it with faster Spend and Output circuits, added viewing keys and diversified addresses, and made shielded transactions light enough for phones and hardware wallets.

Why do some sources say October 28 and others October 29? The activation height was set in advance to target October 28, 2018. The block that actually triggered the change, block 419,200, was mined in the early hours of October 29 UTC. In many local time zones that was still October 28. It is the same block and the same moment either way.

Nini ni kuangalia muhimu? Angalia muhimu utapata kushiriki kusoma upatikanaji wa mkoba shielded. Mtu na kamili au zinazoingia kuona ufunguo unaweza kuona maelezo ya manunuzi mfuko lakini hawezi kutumia fedha zake. Tazama [Kuangalia funguo za kuvinjari](../zcash-tech/viewing-keys) kwa ajili ya zaidi.

## Jaribu uelewevu wako

Chini ya Sprout, kwa nini watu wengi sana waliepuka shughuli za ulinzi na Sapling alirekebishaje?

<details>
<summary>Answer</summary>
Under Sprout, building a shielded transaction took minutes and used gigabytes of memory, so it was too slow and heavy for most users, exchanges, and shops. Sapling introduced faster Spend and Output circuits that cut the work to a few seconds and about 40 megabytes, making shielded transactions practical on everyday phones and hardware wallets.
</details>

### Rasilimali

- [ZIP 205: Utekelezaji wa Sapling Network Upgrade](https://zips.z.cash/zip-0205)
- [ZIP 243: Transaction Signature Validation kwa Sapling](https://zips.z.cash/zip-0243)
- [Zcash Sapling ukurasa kuboresha](https://z.cash/upgrade/sapling/)
- [Electric Coin Company: Sapling tangazo](https://electriccoin.co/blog/sapling/)
- [Electric Coin Company: Kutangaza Sapling MPC](https://electriccoin.co/blog/sapling-mpc/)

### Angalia pia:

- [Vidimbwi Vilivyohifadhiwa kwa Kifaa cha Kuzuia Mlipuko](../using-zcash/shielded-pools)
- [Kuangalia funguo za kuvinjari](../zcash-tech/viewing-keys)
- [zk-SNARKS](../zcash-tech/zk-snarks)
- [Zcash Network Upgrades (Ubadilishaji wa Mtandao)](../start-here/network-upgrades)
- [Mkoba](../using-zcash/wallets)
- [Electric Coin Company](../zcash-organizations/electric-coin-company)

---

Mfululizo: [Kiwango cha Upgrades Network](../start-here/network-upgrades) · Zamani: [Kuishi kwa majira ya baridi kali](../zcash-tech/overwinter) · Kisha: [Maua ya maua](../zcash-tech/blossom)
