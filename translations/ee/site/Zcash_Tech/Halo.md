<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo nye zero-knowledge ɖaseɖigbalɛ [proof] (ZKP) ƒe ɖoɖo si me mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted setup] mele o, eye wòte ŋu wɔ ɖaseɖigbalɛwo ƒe wo nɔewo me gbugbɔ ƒoƒo, si Sean Bowe kpɔ le Electric Coin Co. Eɖe mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe hiahiã ɖa, eye ewɔe be ɖaseɖigbalɛwo ƒe wo nɔewo me gbugbɔ ƒoƒo nanye nusi wòate ŋu wɔ, si nye Zcash ƒe nu ƒe dziyiyi [scaling] kple dedienyenye ƒe mɔɖoɖo si le fifia ƒe gɔmeɖoƒe.

- **Nu si wònye:** zk-SNARK ƒe ɖoɖo si me gbugbɔ ƒoƒo wɔa dɔ nyuie, eye mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe vɔsa mele o.
- **Nu ka ta wòle vevie:** Zcash ƒe Orchard ɣaɣla [shielded] gaƒuƒoƒo [pool], si wɔ dɔ kple NU5 le 2022 me, zãa Halo 2 — nyadzɔdzɔ me dɔwɔwɔ si wotsɔ gɔmeɖeɖe sia wɔe.
- **Nɔnɔme vevi:** "Toxic waste" aɖeke metsɔ tso vɔsa ƒe mɔɖoɖowɔwɔwo me o, eye ɖaseɖigbalɛwo ate ŋu aɖo ɖase kple ɖaseɖigbalɛ bubu siwo menye woƒe xexlẽme o.
- **Mɔ̃ na ame be wòazã:** Halo 2 nye dɔwɔnu si ƒe teƒe ŋuti nya le ame sia ame ƒe asi me le [MIT kple Apache 2.0](https://github.com/zcash/halo2#readme) te, eyata ame sia ame le ekosystem me ate ŋu atu ɖe edzi.

---

## Gɔmeɖeɖe Vevi

Halo nye zero-knowledge ɖaseɖigbalɛ ƒe ɖoɖo si me mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o, eye wòte ŋu wɔ wo nɔewo me gbugbɔ ƒoƒo, si Sean Bowe kpɔ le Electric Coin Co. Eɖe mɔ̃ ƒe ɖoɖo xexlẽnuwo ɖa eye ena be Zcash gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe nu ƒe dziyiyi nanɔ sɔ gbɔ. Halo nye zero-knowledge ɖaseɖigbalɛ ƒe ɖoɖo gbãtɔ si me dɔwɔwɔ nyuie kple wo nɔewo me gbugbɔ ƒoƒo le — ame geɖe bua be enye sayensi ƒe dɔkpɔkpɔ gã aɖe.

![halo](/content-images/_unavailable.svg "halo")

### Akpa eveawo

- **Polynomial Commitment Scheme.** Ena be ame si dea adzɔgbeɖeɖe [commitment] te polynomial aɖe ate ŋu adee te kple agbalẽkpa kpuie aɖe, si ame si le kpɔɖeŋu wɔm ate ŋu azã atsɔ akpɔ polynomial si wode adzɔgbeɖeɖe te la ƒe xexlẽme siwo wogblɔe la ƒe nyateƒe.
- **Polynomial Interactive Oracle Proof.** Ame si le kpɔɖeŋu wɔm bia be ame si dea ɖase fia (algorithm aɖe) naʋu adzɔgbeɖeɖeawo katã le teƒe siwo wòtsɔe, kple polynomial adzɔgbeɖeɖe ƒe ɖoɖo la, eye wokpɔe be sɔsɔme le wo dome nyateƒetɔ.

### Mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o

zk-SNARK ƒe tutuwo aɖewo, abe Groth16 ene, hia mɔ̃ ƒe ɖoɖo xexlẽnuwo be woawɔ woƒe ame katã ƒe parameterwo, si woyɔna be common reference string (CRS). Woma CRS la na ɖasefiawo kple ɖasekpɔlawo; menye ɣaɣla si wòle be wòatsrɔ̃ o. Ele be woaɖe ɣaɣla ƒe titina nu si tututu ma ƒe wɔwɔ hea, si woyɔna be "toxic waste", ɖa. Dedie multi-party computation [secure multi-party computation] ate ŋu ama mɔ̃ sia nava dze ame geɖewo dome: Ceremonia la nye dedie ne ame ɖeka le hã le eƒe katãwo dome de asi protocol la me eye wòatsrɔ̃ eƒe ɣaɣla ƒe kpekpeɖeŋu. Kpɔ ECC ƒe [ame katã ƒe parameterwo kple toxic waste ƒe gɔmeɖeɖe](https://zodl.com/snark-parameters/).

Zcash ƒe Sprout kple Sapling ɣaɣla gaƒuƒoƒowo zã mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted-setup] ƒe ɖaseɖigbalɛ ƒe ɖoɖowo, BCTV14 kple Groth16 le woƒe ɖeɖe me. Woƒe dukɔ ƒe parameterwo [public parameters] gale afɔku hã be woatsɔ awɔ ɖaseɖigbalɛ kple akpɔe. Nɔnɔme si ƒe amegã le nye be, ɖoɖo ƒe nyagbe nuwo [secret setup material] wɔe ɖe asi mea, si ate ŋu ana ɖaseɖigbalɛ siwo menye nyateƒe o nadzɔ; CRS ŋutɔ ƒe tata afia wɔwɔ le mɔ̃ me eye mena nyagbe nuwo ma ƒe ɖeɖe o.

Halo ƒoa recursive ɖaseɖigbalɛ ƒe ɖoɖo kple polynomial adzɔgbeɖeɖe ƒe ɖoɖo si tso inner product ƒe argument me. Eƒe dukɔ ƒe parameterwo mehia mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe vɔsa alo ɣaɣla setup trapdoor ƒe tsrɔ̃. [Halo 2 ƒe agbalẽ la gblɔ dukɔ ƒe group parameterwo siawo ŋuti](https://zcash.github.io/halo2/background/pc-ipa.html#setup). Esia to vɔsa me wodzi structured reference string si ate ŋu woatrɔe la gbɔ.

Ɖoɖo sia ƒe hiãhiãɖeɖe le ɖa be woagatsɔ ɣaɣla nu siwo wozã le vɔsa me ƒe tsrɔ̃tsrɔ̃ akɔ ɖe Halo ƒe ɖaseɖigbalɛwo ŋu o. Menye ɖase be Sprout alo Sapling ƒe vɔsa si do ŋgɔ la mekpɔ nu vɔ̃ aɖeke o, eye menana ɖase be protocol ƒe tɔtrɔ siwo va emegbe la katã le dedie o. Ɖaseɖigbalɛ siwo le wo ŋutɔ dzi [recursive proofs] dea ɖase ɖe akɔnta siwo wode ɖe woƒe sɛkuitiwo me la ŋu, le ɖaseɖigbalɛ ƒe ɖoɖo la ƒe dzitsinya me. Sɛkuiti siwo le ete kple wɔnana siwo le ete la gale vevie; ECC ƒe [Halo 2 ƒe ɖoɖo ƒe gɔmeɖeɖe](https://zodl.com/technical-explainer-halo-on-zcash/) gblɔ kpuie be afɔɖeɖe yeye alo ɖoɖo ƒe vodada yeyewo ƒe afɔku le eme.

[Sean Bowe ƒe gɔmeɖeɖe le Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Nɔnɔmetata / Ɖeɖeŋu

### Notary ƒe ɖoɖonu

Bu ɖe zk-SNARK si le mɔ̃ me abe agbalẽ si woɖe asi na ene: xexlẽdzesi ɖeka, kpekpeɖeŋu ɖeka, wowu. Fifia, bu ɖe eŋu be ele na wò be nàɖe ɖase be agbalẽ akpe wu ene nyateƒe. Ne recursion mele o la, ame si le kpekpeɖeŋu le dzrom la anɔ be yeakpɔ xexlẽdzesi ɖe sia ɖe.

Halo trɔa agbalẽ si wokpɔ ɖeŋu la ɖe dzesi aɖe dzi le agbalẽ *si kplɔe ɖo* la ŋu, va se ɣeyiɣi si agbalẽwo katã ƒe ƒuƒoƒe la va ƒo ɖe agbalẽ ɖeka kple dzesi ɖeka me. Agbalẽ mamlɛtɔ ƒe kpɔɖeŋu wɔwɔ ko hia be woaxɔ ɖoɖonu blibo la dzi ase — eye esi le vevie ŋutɔ nye be Halo ƒe notary (ɖasefia ƒe ɖoɖo) wɔa eya ŋutɔ ƒe dzesiwo mekpɔa hia be authority si le gota naɖo eƒe seal ɖo o.

### Nu ka ta mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe ɖeɖa le vevie

Le mɔ̃ ƒe ɖoɖo xexlẽnuwo [trusted setup] tsã me la, "seal" si ame kata ate ŋu akpɔ (CRS) tsoa vɔsa aɖe me. Ele be ame siwo va le vɔsa la me nagbã woƒe nudzɔdzɔ ƒe akpa ɣaɣla siwo li le dome, eye woade mɔ na ame sia ame nakpɔ parameter siwo le wazi. Halo ƒe mɔ meɖo vɔsa la kple eƒe ɖoɖo ɣaɣla ƒe trapdoor o. Eya meɖe be mele be woaɣlɔlã zãlawo ƒe gazazãsafuiwo o, alo be woatsi ɖaseɖigbalɛ [proof] ƒe ɖoɖo siwo woɖe asi le kple eƒe dɔwɔwɔ kpɔ o.

---

## Nya Kpɔtɔ

### Gbugbɔ ɖaseɖigbalɛwo

Gbugbɔ ɖaseɖigbalɛ ƒe ƒoƒo nana be ɖaseɖigbalɛ ɖeka naɖo ɖase tso ɖaseɖigbalɛ bubu siwo menye woƒe xexlẽme o ƒe nyateƒe ŋu, eye wòna xexlẽme (kple nyatakakawo) gã aɖe va ƒo ɖe kpuie me. Esia le vevie na nu ƒe dziyiyi, elabena ena be network la nadze edzi le akpa geɖe me, esi ame siwo le akpa aɖewo me hã ate ŋu axɔ network ƒe akpa si lia la ƒe blibonyenye dzi ase.

Hafi Halo va la, gbugbɔ ɖaseɖigbalɛ ƒe ƒoƒo wɔwɔ bia xexlẽme ƒe ga gã aɖe kple mɔ̃ ƒe ɖoɖo xexlẽnuwo. Nusiwo kpɔ wo la ƒe vevi aɖe nye mɔ aɖe si woyɔna be **nested amortization**: gbugbɔ ƒoƒo si zã polynomial adzɔgbeɖeɖe ƒe ɖoɖo si wotu ɖe inner product argument dzi, si wɔ dɔwɔwɔ nyuie ŋutɔ eye wòle mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe hiahiã ɖam.

[Halo ƒe agbalẽ](https://eprint.iacr.org/2019/1021.pdf) ɖe polynomial adzɔgbeɖeɖe ƒe ɖoɖo sia me blibo eye ekpɔ be ƒoƒo ƒe mɔ yeye aɖe le eme. Mɔ la na be ɖaseɖigbalɛ geɖe siwo ame vovovo wɔ le wo ŋutɔwo me la ƒe kpɔɖeŋu nawɔ kaba abe ɖaseɖigbalɛ ɖeka ƒe kpɔɖeŋu ene. Ne wòli eya ɖeŋu ko hã la, ena mɔ nyuitɔ wu zk-SNARKs si wozã le Zcash tsã.

### Halo 2

Halo 2 nye zk-SNARK ƒe dɔwɔwɔ si wɔa dɔ nyuie ŋutɔ, si wòŋlɔ le Rust me, eye wòɖea mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe hiahiã ɖa, esi wòle teƒe ɖom na nu ƒe dziyiyi le Zcash me.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Eme le mɔ sia ƒe gɔmeɖeɖe gãtɔ aɖe si woyɔna be **accumulation scheme**. Ɖoɖoɖo sia fia ale si nested amortization wɔa dɔe nyateƒe: to ɖaseɖigbalɛwo ƒoƒo kpe ɖe nu si woyɔna be **accumulator** ŋu, afi si ɖaseɖigbalɛ sia sia ƒe nya tso accumulator ƒe nɔnɔme si do ŋgɔ ŋu la, woate ŋu akpɔ ɖaseɖigbalɛ siwo katã va yi la ɖeŋu (to induction) to accumulator ƒe nɔnɔme si le fifia ƒe kpɔɖeŋu wɔwɔ ko.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Le ɣeyiɣi ma ke me la, ha geɖe bubu hã le Polynomial IOPs siwo wɔ dɔ nyuie wu Sonic (si wozã le Halo 1) ƒe kpɔkpɔm, abe Marlin ene. Protocol si wɔ dɔ nyuie wu wo katã nye PLONK, si naa ablɔɖe gã aɖe le dɔwɔwɔ nyuie ƒe dɔwɔwɔwo ƒe ɖoɖo me, si dze ɖe dɔwɔwɔ ƒe hiahiãwo ŋu, eye wòna prover ƒe ɣeyiɣi nanye nyuitɔ 5× wu Sonic.

[PLONK ƒe nukpɔkpɔ blibo](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo le ekosystem gã la me

Electric Coin Company wɔ ɖeka kple Protocol Labs, Filecoin Foundation, kple Ethereum Foundation be woakpɔ Halo R&D ɖa, si me wòle ale si woate ŋu azã technology la le woƒe network vovovowo me hã. Ɖekaɖeka sia ƒe ta nye be wòana nu ƒe dziyiyi, ɖekawɔwɔ, kple ɣaɣla [privacy] nanye nyuitɔ le ekosystemwo katã me kple Web 3.0 ta.

Tsɔ kpe ɖe eŋu la, Halo 2 le [MIT kple Apache 2.0 ƒe dɔwɔnu si ƒe teƒe ŋuti nya le ame sia ame ƒe asi me ƒe mɔ̃wo te](https://github.com/zcash/halo2#readme), si fia be ame sia ame le ekosystem me ate ŋu atsɔ ɖasefia ƒe ɖoɖo la awɔ dɔ.

**Filecoin.** Tso eƒe dɔwɔwɔ gɔmedzedze me la, halo2 library la me va zã le dɔwɔwɔwo abe zkEVM ene me, eye ƒome siwo ate ŋu akpe Halo 2 ɖe ɖasefia ƒe ɖoɖo la me na Filecoin Virtual Machine hã li. Filecoin hia spacetime ƒe ɖasewo kple replication ƒe ɖasewo geɖe siwo xɔa ga; Halo 2 le vevie ŋutɔ le space ƒe zazã ƒoƒo kple network la ƒe nu ƒe dziyiyi nyuitɔ wɔwɔ me. [Filecoin Foundation ƒe video kple Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Eanye nyuitɔ na ekosystem eveawo hã ne Filecoin ƒe storage fexexewo ate ŋu woawɔ wo le ZEC me, si ana ɣaɣla ma ke na storage ƒe nuƒoƒo abe esi le Zcash ƒe ɣaɣla transfers me ene — si me wòle filewo ƒe ɣaɣlaŋlɔŋlɔ [encryption] le Filecoin storage me kple mobile clients ƒe kpekpeɖeŋu be woatsɔ media akpe ɖe Zcash ƒe nya kpui [memo] si woŋlɔ ɣaɣlaŋlɔŋlɔe ŋu. [ECC × Filecoin ƒe blog ƒe nyatia](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Wole Halo 2 ƒe ɖaseɖigbalɛ aɖe na Verifiable Delay Function (VDF) si wɔa dɔ nyuie ƒe wɔm. VDF nye crypto ƒe nu gɔmedzedze aɖe si ƒe zã nyawo [use case] geɖe li, si me wòle randomness si wòate ŋu awɔ dɔ sia sia na mɔ̃ŋlɔ ƒe dɔwɔwɔwo kple ŋgɔɖola ƒe tiatia le Proof of Stake me. ECC, Filecoin Foundation, Protocol Labs, kple Ethereum Foundation hã le dɔ wɔm kple [SupraNational](https://www.supranational.net/), ame si wɔa dɔ kple hardware-accelerated cryptography, be woakpɔ GPU kple ASIC ƒe dɔwɔwɔ na VDF la ɖa. [Privacy and Scaling Explorations group](https://appliedzkp.org/) le mɔ bubuwo si Halo 2 ƒe ɖaseɖigbalɛwo ate ŋu ana ɣaɣla kple nu ƒe dziyiyi nanye nyuitɔ na Ethereum la tom.

### Dɔwɔwɔ bubu siwo zã Halo

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — ɖɔli ɖɔli [swap] ƒe protocol si me ɣaɣla le, si wɔa dɔ le ɖoɖonu geɖewo me
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup le Cardano dzi
- [DarkFi](https://dark.fi/book/arch/arch.html) — L1 zkEVM blockchain si me ɣaɣla le
- [Scroll](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — L2 zkRollup le Ethereum dzi

---

## Nu Siwo Wòfia Le Dɔwɔwɔ Me

**Na Zcash ŋutɔ**

- Orchard ƒe ɣaɣla gaƒuƒoƒo, si wɔ dɔ kple NU5, nye ɖaseɖigbalɛ ƒe ɖoɖo yeye sia ƒe dɔwɔwɔ le Zcash network la me. Woɖoe ɖe gaɖoɖowo ƒe xexlẽdzikpɔɖeƒe [turnstile] ƒe ɖoɖo ma ke si wozã le Sprout kple Sapling dome la te, be woaɖe ɣaɣla gaƒuƒoƒo tsãwo ɖa zi ɖe zi.
- Le NU5 (2022 ƒe titina) megbe la, gbugbɔ ɖaseɖigbalɛwo ƒe tsɔtsɔ ge ɖe eme zu nusi wòate ŋu wɔ, eye ɣaɣla ƒe nyonyo geɖe va kplɔe ɖo — si le vevie wu katã nye 'Actions' ƒe gɔmedzedze si tsɔ teƒe na inputs/outputs, si gbɔna gaɖoɖo ƒe metadata ƒe home.
- Mɔ̃ ƒe ɖoɖo xexlẽnuwo ƒe ɖeɖa ɖea afɔku si le system blibo me, si mele be woagbugbɔ awɔe na protocol ƒe yayra gã sia sia o.

**Na nudzɔdzɔ ƒe tɔwo kple dɔwɔlawo**

- Gbugbɔ ɖaseɖigbalɛ ƒe ƒoƒo ate ŋu afɔ xexlẽme si menye woƒe xexlẽme o ɖe kpuie me, awɔ distributed systems siwo woate ŋu akpɔ ɖeŋu, eye wòana Layer 1 ƒe ŋusẽ nasɔ gbɔ na ɣaɣla dzesi ŋɔŋlɔ blibo [full node] ƒe dɔwɔlawo — si le vevie na extensionwo abe Zcash Shielded Assets kple Zcash ƒe mɔɖoɖo siwo dzudzɔ ɣeyiɣi me ene.

---

## Vodada Siwo Dzɔa Zã

| Nusi ame geɖe xɔe se | Nusi nye nyateƒe |
| --- | --- |
| "Halo nye yayra si gbɔna la si Zcash le lala ɖe." | Orchard, si le mainnet dzi tso NU5 (2022) me, le Halo 2 dzi xoxo. |
| "Mɔ̃ ƒe ɖoɖo xexlẽnuwo mele o fia be parameters aɖeke mele o." | Halo gale zã public parameters. Menye be woahĩa vɔsa aɖe si me wòle be ame siwo va eme la axɔe dzi ase be woatsrɔ secret setup material la o. |
| "Halo 2 kple Halo ƒe agbalẽ nye nu ma ke." | [agbalẽ](https://eprint.iacr.org/2019/1021.pdf) la ɖe polynomial adzɔgbeɖeɖe ƒe ɖoɖo kple nested amortization me; Halo 2 nye nyadzɔdzɔ me Rust ƒe dɔwɔwɔ si me accumulation scheme kple PLONKish arithmetisation le. |
| "Gbugbɔ ƒoƒo kpena ɖe gaɖoɖowo ƒuƒoƒe [block] ƒe kpɔɖeŋu wɔwɔ ƒe nu ƒe dziyiyi ko ŋu." | Gbugbɔ ƒoƒo hã fɔa application ƒe xexlẽme ɖe kpuie me — kpɔ Filecoin ƒe spacetime/replication ƒe ɖasewo kple VDF ƒe dɔwɔwɔ na Ethereum. |

---

## Axɔ Ƒe Axa Siwo Kplɔe Ɖo

- [zk-SNARKs](/zcash-tech/zk-snarks) — technology ƒe akpa gã si Halo le eme
- [Halo (research paper)](https://eprint.iacr.org/2019/1021.pdf) — ŋlɔŋlɔ gbãtɔ
- [Ironwood](/zcash-tech/ironwood) kple [The Turnstile](/zcash-tech/the-turnstile) — ale si ɣaɣla gaƒuƒoƒowo wɔa migration esi tsãtɔwo le ɖeɖem ɖa
- [Zcash Shielded Assets](/zcash-tech/zcash-shielded-assets) — extension si kpena ɖe eŋu tso gbugbɔ ɖaseɖigbalɛwo me
- [Zebra Full Node](/zcash-tech/zebra-full-node) — ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔwɔ si kpɔa ɖasewo ɖeŋu le ɖoɖonu [chain] dzi

## Nusrɔ̃ Ɖe Edzi

- [ZKP kple Halo 2 ƒe gɔmeɖeɖe — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 kple Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Technical explainer blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Community Showcase — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Dokumentewo**

- [Halo 2 ƒe nuŋkɔwo](https://github.com/mhchia/awesome-halo2)
- [Halo 2 ƒe docs](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
