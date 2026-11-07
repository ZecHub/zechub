<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Ɣaɣla dzesi ŋɔŋlɔ

Zakura nye ɣaɣla dzesi ŋɔŋlɔ blibo [full node] ƒe dɔwɔwɔ si nye fɛɛ, eye wode eƒe source code ɖe go, si woɖo na dzidzime kɛkɛ; wodee ɖe Zcash ta. Woɖe eƒe afã tso [Zebra](Zebra_Full_Node.md) me, eye **Valar Group** kple Project Tachyon wɔe ɖe ɖekawɔwɔ me. Zakura na sync va yɔ wu aɖeŋu, eƒe gaɖoɖowo ƒuƒoƒe [block] ƒe ƒeƒeɖeɖe le eƒe me, eye wòwɔ be xoxo `zcashd` ƒe dɔwɔnuwo nasɔ ɖe eŋu. Woɖe version 1.0.0 ɖe go le July 15, 2026.

---

## TL;DR

- Zakura nye **consensus-compatible [consensus-compatible] Zcash ɣaɣla dzesi ŋɔŋlɔ blibo** — eya nye Zebra kple zcashd ƒe fli, si woɖe tso Zebra me.
- Gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu [blockchain] ƒe sync yɔ wu Zebra ƒetɔ teƒe 5; snapshot ƒe bootstrap wowɔe le **miniti 2 me o**.
- **Gaɖoɖowo ƒuƒoƒe ƒe ƒeƒeɖeɖe si le eƒe me** na dɔwɔlawo ŋu woatsɔ disk ƒe teƒe sue ŋutɔ awɔ ɣaɣla dzesi ŋɔŋlɔ blibo (snapshot si woɖe ɖeɖi ƒe ~11 GB vs. 300 GB na Zebra ƒe ɣaɣla dzesi ŋɔŋlɔ blibo).
- **zcashd RPC ƒe mɔnu si wòkplɔ xoxo nu** na gakotokuwo kple ɖekawɔwɔwo siwo le xoxo la nɔ dɔ wɔm ntle be woatrɔ naneke.
- **P2P ƒe gbeɖoɖo ƒe akpa si wonɔ kpɔm** (woɖe wòwɔwɔ le eƒe gɔmedzedze me) di be gaɖoɖowo ƒuƒoƒe ƒe gbeɖoɖo nava le 500ms te, kple gossip si ƒe DoS mate ŋu awɔ nu na.
- Wòdo ɖeka kple **Ironwood (NU6.3)**, Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ [network upgrade] si dze egɔme le 2026 ƒe titina me.
- **Zakura Common** (v1.3.0, August 2026) wɔ be cryptography si gakotokuwo zazãna tsɔ wɔ gaɖoɖo ɣaɣla na yɔ wu: tso sekondi 3 wu dzi va ɖe 200 ms te le nyawo geɖe me, ɖe Zakura ƒe benchmarkwo nu.
- **Sean Bowe** (Zcash ƒe hadɔwɔkplɔla, Project Tachyon) kple **Dev Ojha** (Valar Group) kplɔa eƒe dɔ dzi.

---

## Zakura nye nu kae?

Zakura nye Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo si woɖo tso eƒe gɔmedzedze me be wòanɔ klalo na dɔwɔwɔ le dzidzime kɛkɛ me. Togbɔ be wòdo ɖeka le consensus [consensus] me kple Zebra — esia fia be wòxɔa eye wòkplɔa Zcash ƒe protocol se mawo — Zakura tsɔ mɔ̃ ƒe ɖoɖo ƒe nyuitɔ geɖewo va, siwo ƒe ta nye be ɣaɣla dzesi ŋɔŋlɔ blibo Zcash ƒe dɔwɔwɔ nagbɔ na amewo.

Dɔa nye ɖekawɔwɔ le **Project Tachyon** (Sean Bowe, si nye Zcash ƒe cryptography mɔ̃ ƒe ɖoɖoŋlɔla [developer] gbãtɔwo dometɔ ɖeka, kplɔe dzi) kple **Valar Group** (Dev Ojha kplɔe dzi) dome. Ɖekae woƒoa ŋku Zcash ƒe protocol ƒe nyuitɔ siwo tso dzidzime yeyee me ŋu, eye Zakura nye ɣaɣla dzesi ŋɔŋlɔ si wotsɔa ɖo dɔa ma ƒe kpɔɖeŋu.

---

## Nɔnɔme Veviwo

### Ɖoɖonu ƒe Sync Yɔ Wu Teƒe 5

Zakura wɔa gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe sync yɔ wu teƒe 5 sɔ kple Zebra. Esia wɔe be wòanɔ bɔbɔe na dɔwɔlawo siwo hia be woawɔ ɣaɣla dzesi ŋɔŋlɔ le zã ɖeka me alo woagbugbɔ tso dɔtsiɖi me.

### Snapshot ƒe Bootstrap

Zakura ɖea ɖoɖonu ƒe snapshot si woɖo ɖi xoxo ɖe go, siwo ɖea sync ƒe gɔmedzedze ƒe gaƒoƒo kpɔtɔ:

| Bootstrap Mɔnu | Gaƒoƒo |
|-----------------|------|
| Archive snapshot | ~37 miniti |
| Snapshot si woɖe ɖeɖi | **Miniti 2 te** |
| Zebra (sync blibo) | ~awa 20 |

Snapshot si woɖe ɖeɖi la le **11 GB** te, eye esia na ɣaɣla dzesi ŋɔŋlɔ ƒe bootstrap yɔ wu **teƒe 680** sɔ kple sync si dze egɔme tso genesis.

### Gaɖoɖowo Ƒuƒoƒe Ƒe Ƒeƒeɖeɖe Si Le Eƒe Me

Zakura xɔa gaɖoɖowo ƒuƒoƒe ƒe ƒeƒeɖeɖe si wòte ŋu woawɔ ƒe ɖoɖo, na ɣaɣla dzesi ŋɔŋlɔ ƒe dɔwɔlawo ŋu woaɖo ɖoɖonu ƒe ŋutinya ƒe akpa si woakpɔ ɖeɖi. Esia wɔe be woate ŋu awɔ ɣaɣla dzesi ŋɔŋlɔ blibo le hardware si ƒe nutome le sue dzi — eƒe nyuie na validators, mɔ̃ ƒe ɖoɖoŋlɔlawo, kple infrastructure ƒe nudzɔdzɔlawo siwo mehia ɖoɖonu ƒe ŋutinya blibo o.

### zcashd RPC Ƒe Mɔnu Si Wòkplɔ Xoxo Nu

Zakura ƒe mɔnu si wòkplɔ xoxo nu le eŋu, si gbugbɔna xoxo `zcashd` JSON-RPC ƒe interface. Gakotokuwo, gatrɔƒewo [exchange], kple ɖekawɔwɔwo siwo ɖoa ɖoku ɖe `zcashd` RPCwo ŋu ate ŋu atrɔ va Zakura gbɔ ne code ƒe tɔtrɔ aɖeke mele o.

### P2P Ƒe Gbeɖoɖo Ƒe Akpa Si Wonɔ Kpɔm

Zakura va kple peer-to-peer gbeɖoɖo ƒe akpa si tso dzidzime yeyee me, si **woɖe wòwɔwɔ le eƒe gɔmedzedze me**. Ne wowɔe la, eƒe tame nye:

- Gaɖoɖowo ƒuƒoƒe ƒe gbeɖoɖo si ƒe vɔ̃ wu katã meva le 500ms te le network blibo me
- Mempool ƒe nuƒoƒo be gaɖoɖo ƒe gbeɖoɖo nasɔ nyuie wu
- Gossip protocol si ƒe DoS mate ŋu awɔ nu na, be network ƒe sesẽsesẽ nasɔ nyuie wu

Akpa sia nye Zcash ƒe network ƒe nyuitɔ siwo wogbeŋu nɔ ɖoɖom le Project Tachyon te ƒe kpɔɖeŋu.

### Ironwood (NU6.3) Do Ɖeka Kple Eŋu

Zakura do ɖeka blibo kple Ironwood ƒe mɔ̃ ƒe sewo trɔtrɔ (NU6.3), si dze egɔme le Zcash mainnet dzi le 2026 ƒe titina me.

---

## Zakura Common: Gakotoku Ƒe Cryptography Yɔ Wu

Le August 2026 me la, Zakura ƒe hatɔwo ɖe Zakura Common ɖe go, si nye cryptography ƒe librarywo ƒe fork siwo yɔ wu, si Zcash ƒe gakotokuwo kple ɣaɣla dzesi ŋɔŋlɔwo ɖoa ɖoku ɖe woŋu. Zakura trɔ yi stack yeye sia gbɔ le version 1.3.0 me, eye Vizor Wallet nye gakotoku gbãtɔwo dometɔ ɖeka si tsɔe wɔ dɔ.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Le Zakura ƒe benchmarkwo ŋu la:

| Dɔwɔwɔ | Yɔwɔwɔ ƒe dzidzime |
|--|--|
| Ɖaseɖigbalɛ [proof] ƒe wɔwɔ le mobile | Wu teƒe 14 (desktop: wu teƒe 5) |
| Sinsemilla ƒe hashing | Wu teƒe 21 |
| zk-SNARK ƒe kpekpeɖeŋu | Teƒe 4–8 |
| Trial decryption | Wu teƒe 1.5 |

Na zãlawo la, tɔtrɔ si woakpɔ kpuie wu nye lala ƒe gaƒoƒo. Tsã la, gakotoku hia sekondi etɔ wu be wòawɔ gaɖoɖo ɣaɣla. Kple Zakura Common la, wòte ŋu azɔ ɖe 200 ms te le nyawo geɖe me. Esia nye gaƒoƒo si wòƒe mɔ̃ wɔa dɔ kple be wòadzra gaɖoɖoa ɖo, menye gaƒoƒo si network hiana be wòakpe ɖe edzi o.


---

## Ale Si Zakura Doa Ɖeka Kple Zcash Ƒe Ɣaɣla Dzesi Ŋɔŋlɔwo

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Gbegbe | C++ (woɖe tso Bitcoin me) | Rust | Rust (woɖe tso Zebra me) |
| Nɔnɔme | Woɖe eƒe dɔwɔwɔ ɖe te | Le dɔ wɔm | Le dɔ wɔm (v1.0.0, Jul 2026) |
| Sync ƒe yɔwɔwɔ | Gɔmedzedze | ~1× | ~5× yɔ wu |
| Gaɖoɖowo ƒuƒoƒe ƒe ƒeƒeɖeɖe | Ao | Ao | Ẽ |
| zcashd RPC ƒe mɔnu si wòkplɔ xoxo nu | Le eƒe me | Akpa aɖe | Ẽ (mɔnu si wòkplɔ xoxo nu) |
| Snapshot ƒe bootstrap | Ao | Ao | Ẽ (miniti 2 te) |
| P2P si wonɔ kpɔm | Ao | Ao | Ẽ (wòle zãla ƒe tiatia nu) |

---

## Ɖo Gɔme

Wòate ŋu axɔ download ƒe mɔnuwo, snapshotwo, kple ɖoɖo ƒe dokumentiwo le:

- **Download & ɖoɖo ƒe mɔfiame:** [zakura.com/download](https://zakura.com/download/)
- **Ɖoɖonu ƒe snapshotwo:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Source code:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Axɔxɔwo Si Do Ɖeka Kple Eŋu

- [Zebra Ɣaɣla dzesi ŋɔŋlɔ blibo](Zebra_Full_Node.md) — Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo si woɖe Zakura tsoe
- [Zaino Indexer](Zaino.md) — indexer si ɖoa ɖoku ɖe Rust ŋu, eye wòdo ɖeka kple Zebra kple Zakura
- [Ɣaɣla dzesi ŋɔŋlɔwo blibo](Full_Nodes.md) — Zcash ƒe ɣaɣla dzesi ŋɔŋlɔ blibo ƒe tiatiawo ƒe nɔnɔmetata
- [Lightwallet ƒe ɣaɣla dzesi ŋɔŋlɔwo](Lightwallet_Nodes.md) — client ƒe fli siwo kɔ wu

## Nudzɔdzɔwo

- [Ɖoɖe Zakura ƒe nya — announcement](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura ƒe Website](https://zakura.com/)
- [Zakura le X/Twitter](https://x.com/ZakuraZcash) dzi
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura Common ƒe announcement](https://zakura.com/announcements/zakura-common/)
