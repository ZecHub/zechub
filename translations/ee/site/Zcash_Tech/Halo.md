<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Halo.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Halo

## TL;DR

Halo nye kakaɖedzimanɔamesi, recursive zero-knowledge proof (ZKP) system si ŋu Sean Bowe ke ɖo le Electric Coin Co. Eɖea ɖoɖo si dzi woka ɖo ƒe hiahiã ɖa eye wònana recursive proof composition wɔa dɔ, si nye gɔmeɖoanyi na Zcash's fifi scalability kple dedienɔnɔ ƒe mɔfiame.

- **Nusi wònye:** zk-SNARK xɔtutu si me gbugbɔgawɔ nyuie le eye ɖoɖowɔwɔ ƒe kɔnu si dzi woka ɖo aɖeke mele o.
- **Nusita wòle vevie:** Zcash's Orchard shielded pool, si wowɔ dɔ kple NU5 le ƒe 2022 me, zɔna le Halo 2 — numekuku sia ƒe wɔwɔme dzi.
- **Nu veviwo:** "gbeɖuɖɔ si me aɖi le" aɖeke metso ɖoɖowɔwɔ ƒe kɔnuwo me o, kple kpeɖodzi siwo ateŋu aɖo kpe kpeɖodzi bubu siwo seɖoƒe meli na o kloe dzi.
- **Mɔɖegbalẽnana:** Halo 2 nye ʋuʋu dzɔtsoƒe le [MIT kple Apache 2.0](https://github.com/zcash/halo2#readme), ale be amesiame si le lãwo ƒe agbenɔnɔ ƒe ɖoɖoa me ate ŋu atu ɖe edzi.

---

## Numeɖeɖe Vevitɔ

Halo nye kakaɖedzimanɔamesi, si gbugbɔna zero-sidzedze kpeɖodzi ɖoɖo si ŋu Sean Bowe ke ɖo le Electric Coin Co. Eɖea ɖoɖo si dzi woka ɖo la ɖa eye wòɖea mɔ na Zcash blockchain ƒe scalability geɖe wu. Halo nye zero-sidzedze kpeɖodzi ɖoɖo gbãtɔ si wɔa dɔ nyuie eye wògbugbɔna — si ame geɖe buna be enye dzɔdzɔmeŋutinunya me ŋgɔyiyi.

![halo](/content-images/_unavailable.svg "halo")

### Akpa eveawo

- **Succinct Polynomial Commitment Scheme.** Enaa mɔ na committer be wòatsɔ eɖokui ana polynomial si me ka kpui aɖe le si verifier ateŋu azã atsɔ aɖo kpe committed ƒe dodokpɔ siwo wogblɔ be wowɔ dzi.
- **Polynomial Interactive Oracle Proof.** Dzesidela la bia tso prover (algorithm) si be wòaʋu adzɔgbeɖeɖewo katã le teƒe siwo wòtia, to polynomial commitment scheme zazã me, eye wòléa ŋku ɖe eŋu be dzesidenua le nyateƒe le wo dome hã.

### Ðoɖo aɖeke meli si dzi woka ɖo o

zk-SNARKs ɖoa ŋu ɖe common reference string (CRS) ŋu abe dutoƒo parameter ene hena kpeɖodzi kple kpeɖodzi. Ele be ame aɖe si dzi woka ɖo nawɔ CRS sia do ŋgɔ. Vaseɖe nyitsɔ laa la, akɔntabubu siwo me ame geɖe le (MPC) siwo le dedie — abe esiwo Aztec habɔbɔ kple Zcash wɔna ene — hiã be woatsɔ aɖe afɔku si le esia me dzi akpɔtɔ [ɖoɖowɔɖi ƒe kɔnu si dzi woka ɖo](https://zkproof.org/2021/06/30/setup-ceremonies/amp/).

Zcash's Sprout kple Sapling akpoxɔnu ta siwo do ŋgɔ la zã BCTV14 kple Groth16 zk-proving systems. Togbɔ be esiawo nɔ dedie hã la, seɖoƒewo nɔ wo ŋu: womate ŋu adzi wo ɖe edzi o elabena wobla wo ɖe dɔwɔwɔ ɖeka ŋu, "gbeɖuɖɔ si me aɖi le" (nya ɣaɣlawo ƒe susɔe siwo wowɔ le gɔmedzedzea ƒe wɔnawo me) ate ŋu anɔ anyi, eye kakaɖedzi ƒe akpa aɖe nɔ anyi (togbɔ be miniti sue aɖe koe wònye hã) be woabu kɔnua be esɔ.

Halo ɖea ɖoɖo si dzi woka ɖo la ɖa to kuxi sesẽwo ƒe kpɔɖeŋu geɖewo ƒoƒo ɖekae enuenu le elliptic curves ƒe tsatsam dzi, ale be woate ŋu azã akɔntabubu ƒe kpeɖodziwo atsɔ ade ŋugble le wo ɖokui ŋu nyuie (nested amortization). Nusi dona tso emee nye be nufiame ka si woɖo (nusi do tso kɔnu aɖe me) va zua esi woate ŋu atrɔ asi le, si wɔnɛ be woate ŋu awɔ dɔ abe smart contracts ene.

Halo naa kakaɖedzi vevi eve ezãlawo ku ɖe dedienɔnɔ si le sidzedze zero-sidzedze ƒe kpeɖodziɖoɖo gã aɖe ŋu. Gbã la, enaa ezãlawo te ŋu ɖoa kpe edzi be ame aɖeke si kpɔ gome le gɔmedzedze ƒe wɔnaa me mewɔ megbeʋɔtru aɖe le adzame be woatsɔ awɔ asitsatsa siwo me ameflunyawo le o. Evelia, enaa ezãlawo ɖenɛ fiana be ɖoɖoa gakpɔtɔ le dedie le ɣeyiɣi aɖe megbe, togbɔ be wowɔ asitɔtrɔ kple tɔtrɔwo le eŋu gɔ̃ hã.

[Sean Bowe's numeɖela le Dystopia Labs](https://www.youtube.com/watch?v=KdkVTEHUxgo)

---

## Nukpɔkpɔ / Nusɔsrɔ̃

### Agbalẽŋlɔlawo ƒe kɔsɔkɔsɔa

Bu zk-SNARK si sɔ ŋu abe nuŋlɔɖi si woŋlɔ ɖe agbalẽ me ene: stamp ɖeka, kpeɖodzi ɖeka, wowɔe. Azɔ tsɔe be ehiã be nàɖo kpe edzi be nuŋlɔɖi akpe ewo ƒe ƒuƒoƒo nye nyateƒe. Ne womegbugbɔ ŋlɔe o la, ele be amesi ɖo kpe edzi nalé ŋku ɖe stamp ɖesiaɖe ŋu.

Halo trɔa nuŋlɔɖi ɖesiaɖe si ŋu woɖo kpee wòzua stamp le *nuŋlɔɖi si kplɔe ɖo* dzi, vaseɖe esime stack bliboa nagbã wòazu nuŋlɔɖi ɖeka si ŋu stamp ɖeka le. Nuŋlɔɖi mamlɛtɔ me toto sɔ gbɔ be woaka ɖe kɔsɔkɔsɔ bliboa dzi — eye vevietɔ la, Halo's agbalẽŋlɔla (ɖoɖo si ɖo kpe edzi) wɔa eya ŋutɔ ƒe stampwo evɔ mehiãa gotagome ŋusẽ aɖeke gbeɖe be wòaɖo eƒe nutrenu o.

### Nukatae ɖoɖo si dzi woka ɖo la ɖeɖeɖa le vevie

Le ɖoɖo xoxowo me la, "nutrenu" (CRS) la tso kɔnu aɖe me. Ele be gomekpɔlawo nagblẽ domedomenuwo dome, eye ele be amesiame naka ɖe edzi be yewogblẽe. Akɔntabubu ɖeɖekoe wɔa Halo's nutrenu: naneke meli woagblẽ o, naneke meli si ado go o, eye kɔnu aɖeke meli si dzi woaka ɖo o.

---

## Deep Dive (Tsi me tsi goglo)

### Kpeɖodzi siwo wogbugbɔ gblɔna

Kpeɖodzi ƒe wɔwɔme si wogbugbɔ ŋlɔna ɖea mɔ na kpeɖodzi ɖeka be wòaɖo kpe kpeɖodzi bubu siwo seɖoƒe meli na o kloe ƒe nyateƒenyenye dzi, si ƒoa akɔntabubu (kple nyatakaka) gbogbo aɖe nu ƒu. Esia nye akpa vevi aɖe na scalability, elabena enaa network la te ŋu scale le tsia dzi esime gomekpɔlawo ƒe kotokuwo ateŋu aka ɖe network la ƒe akpa susɔea ƒe blibonyenye dzi kokoko.

Do ŋgɔ na Halo, kpeɖodzi si wogbugbɔna ƒe wɔwɔme gbɔ ɖoɖo bia akɔntabubu ƒe gazazã gã kple ɖoɖo si dzi woka ɖo. Nu vevi siwo ŋu woke ɖo dometɔ ɖekae nye mɔnu aɖe si woyɔna be **nested amortization**: recursive composition si zãa polynomial commitment scheme si wotu ɖe ememe nuwɔna ƒe nyaʋiʋli dzi, si na dɔwɔwɔ nyo ɖe edzi ŋutɔ esime woƒo asa na ɖoɖo si dzi woka ɖo.

The [Halo pepa](https://eprint.iacr.org/2019/1021.pdf) ɖɔ polynomial commitment scheme sia bliboe eye wòkpɔe be aggregation mɔnu yeye aɖe nɔ eme. Mɔnua na woate ŋu aɖo kpe kpeɖodzi gbogbo aɖewo siwo wowɔ le wo ɖokui si dzi kabakaba abe kpeɖodzi ɖeka dzi dada ene kloe. Le eɖokui si la, ema na mɔnu bubu si nyo wu xoxo wu zk-SNARKs siwo wozãna tsã siwo wozãna le Zcash.

### Halo 2 lia

Halo 2 nye zk-SNARK dɔwɔwɔ si wɔa dɔ nyuie si woŋlɔ ɖe Rust me si ɖea ɖoɖo si dzi woka ɖo ƒe hiahiã ɖa esime wòle afɔɖeɖe ɖom na scalability le Zcash.

<a href="">
    <img src="/content-images/Halo-puzzle-03-1024x517-e034023d10.webp" alt="" width="500" height="300"/>
</a>

Elɔ mɔnu si woyɔna be **nuƒoƒoƒu ƒe ɖoɖo** ƒe nyawo gbɔgblɔ le mɔ gbadza nu ɖe eme. Sedziwɔwɔ sia ɖe alesi nested amortization wɔa dɔ ŋutɔŋutɔ ɖe go: to kpeɖodziwo tsɔtsɔ kpe ɖe nusi woyɔna be **accumulator** ŋu, afisi kpeɖodzi ɖesiaɖe susu le accumulator ƒe nɔnɔme si nɔ anyi va yi ŋu le la, woate ŋu alé ŋku ɖe kpeɖodzi siwo katã nɔ anyi va yi ŋu (to induction me) to accumulator ƒe nɔnɔme si li fifia me dzodzro ko me.

<a href="">
    <img src="/content-images/l4HrYgE-1ea7bc32f7.webp" alt="" width="500" height="300"/>
</a>

Le ɣeyiɣi ma ke me la, ƒuƒoƒo bubu geɖe nɔ Polynomial IOP siwo wɔa dɔ nyuie wu Sonic (si wozã le Halo 1 me), abe Marlin ene la ke ɖem. Ðoɖo siawo dometɔ si wɔa dɔ nyuie wue nye PLONK, si naa asitɔtrɔ gã aɖe le ɖoɖowɔwɔ ɖe dɔwɔwɔ nyuie ŋu si wotu ɖe dɔwɔwɔ-koŋ ƒe hiahiãwo dzi eye wònaa 5× prover ɣeyiɣi si nyo wu Sonic.

[PLONK ƒe nyatakaka kpui aɖe](https://www.youtube.com/watch?v=P1JeN30RdwQ)

### Halo le lãwo ƒe agbenɔnɔ ƒe ɖoɖo si keke ta wu me

Electric Coin Company wɔ nubabla kple Protocol Labs, Filecoin Foundation, kple Ethereum Foundation be woaku Halo R&D me, si me alesi woate ŋu azã mɔ̃ɖaŋununya la le woƒe networkwo me hã le. Nubabla la ƒe taɖodzinue nye be wòana woate ŋu atrɔ asi le nu ŋu nyuie wu, awɔ dɔ aduadu, eye wòana ame ŋutɔ ƒe nyawo nanɔ ɣaɣla le lãwo ƒe agbenɔnɔ ƒe ɖoɖowo katã me kple na Nyatakakadzraɖoƒe 3.0.

Tsɔ kpe ɖe eŋu la, Halo 2 le.. [MIT kple Apache 2.0 ƒe mɔɖegbalẽ siwo le ʋuʋu ɖi](https://github.com/zcash/halo2#readme), si fia be amesiame si le lãwo ƒe agbenɔnɔ ƒe ɖoɖoa me ate ŋu atu kple ɖoɖo si ɖo kpe edzi.

**Filecoin.** Tso esime woɖoe ɖe dɔ me la, woxɔ halo2 agbalẽdzraɖoƒea le dɔwo abe zkEVM ene me, eye Halo 2 ƒe ɖekawɔwɔ si ate ŋu adzɔ ɖe kpeɖodziɖoɖoa me na Filecoin Virtual Machine la li. Filecoin bia be woakpɔ yamenutomeɣeyiɣi ƒe kpeɖodzi gbogbo aɖewo siwo xɔ asi ŋutɔ kple kpeɖodzi siwo ku ɖe wo gbugbɔgawɔ ŋu; Halo 2 le vevie ŋutɔ le yamenutome zazã ƒe nutete kple network la ƒe lolome dzi ɖeɖe kpɔtɔ nyuie wu me. [Filecoin Foundation video kple Zooko](https://www.youtube.com/watch?v=t4XOdagc9xw). Aɖe vi na lãwo ƒe agbenɔnɔ ƒe ɖoɖo eveawo hã ne woate ŋu axe Filecoin nudzraɖoƒe ƒe fewo le ZEC, si ana adzamenyawo ma ke na nudzraɖoƒe ƒeƒle si li le Zcash nudzraɖoƒe ƒe asitɔtrɔwo me — si me faɛlwo ɣla ɖe Filecoin nudzraɖoƒe kple kpekpeɖeŋu nana asitelefon dzi asisi siwo tsɔa nyadzɔdzɔwo kpena ɖe Zcash nuŋlɔɖi si wotsɔ nya ɣaɣlawo ŋlɔ ŋu. [ECC × Filecoin ƒe blog me nya](https://electriccoin.co/blog/ethereum-zcash-filecoin-collab/)

**Ethereum.** Wole Halo 2 ƒe kpeɖodzi aɖe wɔm na Verifiable Delay Function (VDF) si wɔa dɔ nyuie. VDF nye cryptographic primitive si me woateŋu azãe geɖe le, siwo dometɔ aɖewoe nye taɖodzinu gbadzaa ƒe randomness na smart contracts kple kplɔla tiatia le Proof of Stake me. ECC, Filecoin Foundation, Protocol Labs, kple Ethereum Foundation hã le dɔ wɔm kplii [SupraNational](https://www.supranational.net/), si nye nudzrala si bi ɖe nya ɣaɣla siwo wotsɔa xɔtunuwo ƒoa ƒui kabakaba me, hena VDF ƒe GPU kple ASIC wɔwɔ si ate ŋu adzɔ. The [Ame ŋutɔ ƒe nyawo kple Scaling Explorations ƒe ƒuƒoƒo](https://appliedzkp.org/) le numekuku wɔm tso mɔ bubu siwo dzi Halo 2 ƒe kpeɖodziwo ate ŋu ato ana ame ŋutɔ ƒe nyawo kple woƒe lolome nanyo ɖe edzi na Ethereum.

### Dɔ bubu siwo wowɔ to Halo zazã me

- [Anoma](https://anoma.net/blog/hash-functions-in-plonkup) — atɔm ɖɔliɖɔli ƒe ɖoɖo si me kɔsɔkɔsɔ geɖe le si kpɔa ame ŋutɔ ƒe nyawo ta
- [Orbis](https://docs.orbisprotocol.com/orbis/technology/halo-2) — L2 zkRollup aɖe si le Cardano dzi
- [DarkFi](https://dark.fi/book/arch/arch.html) — ame ŋutɔ ƒe L1 zkEVM blockchain
- [Agbalẽxatsaxatsa](https://scroll.mirror.xyz/nDAbJbSIJdQIWqp9kn8J0MVS4s6pYBwHmK7keidQs-k) — L2 zkRollup aɖe le Ethereum dzi

---

## Nusiwo wòfia ŋutɔŋutɔ

**Na Zcash ŋutɔ**

- Orchard shielded pool, si wowɔ dɔ kple NU5, nye kpeɖodziɖoɖo yeye sia ƒe dɔwɔwɔ le Zcash network dzi. Wotsɔa ʋuƒo si wotsɔ trɔa asi le nu ŋu ƒe nɔnɔme ma ke si wozãna le Sprout kple Sapling, kple susu be yewoaɖe asi le ta xoxo siwo ŋu wokpɔ akpoxɔnu le la ŋu vivivi.
- Le NU5 (ƒe 2022 ƒe domedome) megbe la, kpeɖodzi siwo wogbugbɔ gblɔ ƒe ƒoƒo ƒu va te ŋu dzɔ, eye ameŋunyatakakawo ƒe nyonyo geɖewo va kpe ɖe eŋu — vevietɔ ‘Nuwɔnawo’ ƒe dodo ɖe nusiwo wotsɔ de eme/do goe teƒe, si ɖea asitsatsa ƒe metadata ƒe agbɔsɔsɔ dzi kpɔtɔna.
- Ðoɖo siwo dzi woka ɖo ɖeɖeɖa ɖea ɖoɖowɔɖi ƒe afɔku si ne menye nenema o la, ahiã be woagbugbɔ awɔ na ɖoɖowɔɖi ƒe tɔtrɔ gã ɖesiaɖe la ɖa.

**Na amesiwo le wo si kple dɔwɔlawo**

- Recursive proof composition lé ŋutete si le eŋu be wòaƒo akɔntabubu ƒe agbɔsɔsɔ si seɖoƒe meli na o nu ƒu, awɔ auditable distributed systems, eye wòana Layer 1 ƒe ŋutete nanyo ɖe edzi na full-node operators — si sɔ na kekeɖenudɔwo abe Zcash Shielded Assets kple Zcash's ɣeyiɣi didi ƒe ɖoɖowo.

---

## Vodada Siwo Bɔ

| Dzixɔse si bɔ | Nukae nye nyateƒe |
| --- | --- |
| "Halo nye etsɔme tɔtrɔ si Zcash le lalam." | Orchard, si le agbe le mainnet dzi tso NU5 (2022), le du dzi xoxo le Halo 2. |
| "Ðoɖo si dzi woka ɖo aɖeke meli o fia be parameter aɖeke meli kura o." | Halo gakpɔtɔ zãa parameter siwo woɖo ɖe ɖoɖo nu; vovototoae nye be wometsɔa gbeɖuɖɔ aɖeke si me aɖi le o eye woate ŋu awɔ wo ahawɔ wo ŋudɔ nyuie wu kɔnu aɖeke manɔmee si dzi wòle be gomekpɔlawo naka ɖo. |
| "Halo 2 kple Halo pepa la nye nu ɖeka." | The [pɛpa](https://eprint.iacr.org/2019/1021.pdf) ƒo nu tso polynomial commitment scheme kple nested amortization ŋu; Halo 2 nye ewɔwɔ Rust ƒe dɔwɔwɔ kple nuƒoƒoƒu ƒe ɖoɖo kple PLONKish akɔntabubu. |
| "Recursion kpena ɖe ame ŋu le scaling block verification ko me." | Recursion hã ƒoa akɔntabubu le dɔwɔwɔ ƒe ɖoɖo nu — kpɔ Filecoin's kpeɖodziwo le spacetime/replication kple VDF dɔwɔwɔ na Ethereum. |

---

## Axa Siwo Do Ƒome Kplii

- [zk-SNARKs](/zcash-tech/zk-snarks) — mɔ̃ɖaŋununya ƒe hatsotso si me Halo le le xexeame katã
- [Halo (numekukugbalẽ)](https://eprint.iacr.org/2019/1021.pdf) — agbalẽ gbãtɔ si wota
- [Ironwood](/zcash-tech/ironwood) kple [Turnstile ƒe ʋuƒoa](/zcash-tech/the-turnstile) — alesi tadeaguƒe siwo ŋu wokpɔ akpoxɔnu le ʋunae esime ame tsitsiwo le dzudzɔ xɔm le dɔme
- [Zcash Nunɔamesi Siwo Wokpɔna](/zcash-tech/zcash-shielded-assets) — kekeɖenudɔ si ɖea vi tso kpeɖodzi siwo wogbugbɔ gblɔna me
- [Zebra Node Bliboe](/zcash-tech/zebra-full-node) — node ƒe dɔwɔwɔ si ɖoa kpe kpeɖodziwo dzi le kɔsɔkɔsɔ dzi

## Nusɔsrɔ̃ Bubuwo

- [ZKP kple Halo 2 ƒe ŋgɔdonya aɖe — Hanh Huynh Huu](https://www.youtube.com/watch?v=jDHWJLjQ9oA)
- [Halo 2 kple Daira & Str4d — ZK Podcast](https://www.youtube.com/watch?v=-lZH8T5i-K4)
- [Mɔ̃ɖaŋu ŋuti numeɖela ƒe blog](https://electriccoin.co/blog/technical-explainer-halo-on-zcash/)
- [Halo 2 Nutoa me Nukpɔkpɔ — Ying Tong @ Zcon3](https://www.youtube.com/watch?v=JJi2TT2Ahp0)

**Nuŋlɔɖiwo**

- [Halo 2 ƒe nunɔamesiwo](https://github.com/mhchia/awesome-halo2)
- [Halo 2 ƒe nuŋlɔɖiwo](https://zcash.github.io/halo2/)
- [Halo 2 GitHub](https://github.com/zcash/halo2)
