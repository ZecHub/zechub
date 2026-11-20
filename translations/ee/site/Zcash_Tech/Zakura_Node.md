<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Ɣaɣla dzesi ŋɔŋlɔ

Zakura nye ɣaɣla dzesi ŋɔŋlɔ blibo [full node] ƒe dɔwɔwɔ si nye fɛɛ, eye wode eƒe source code ɖe go, si woɖo na dzidzime kɛkɛ; wodee ɖe Zcash ta. Woɖe eƒe afã tso [Zebra](Zebra_Full_Node.md) me, eye **Valar Group** kple Project Tachyon wɔe ɖe ɖekawɔwɔ me. Zakura na sync va yɔ wu aɖeŋu, eƒe gaɖoɖowo ƒuƒoƒe [block] ƒe ƒeƒeɖeɖe le eƒe me, eye wòwɔ be xoxo `zcashd` ƒe dɔwɔnuwo nasɔ ɖe eŋu. Woɖe version 1.0.0 ɖe go le July 15, 2026. Esi ema va yi la, woɖe version yeye geɖe ɖe go kaba: 1.7.0 (October 22, 2026) wɔ be NU7 dze dɔ le Mainnet, eye 1.8 series va emegbe le November.

---

## TL;DR

- Zakura nye **consensus-compatible [consensus-compatible] Zcash ɣaɣla dzesi ŋɔŋlɔ blibo** — eya nye Zebra kple zcashd ƒe fli, si woɖe tso Zebra me.
- Gaɖoɖowo ƒuƒoƒo ƒe ɖoɖonu ƒe sync yɔ wu Zebra ƒetɔ teƒe 5; snapshot ƒe bootstrap wowɔe le **miniti 2 me o**.
- **Gaɖoɖowo ƒuƒoƒe ƒe ƒeƒeɖeɖe si le eƒe me** na dɔwɔlawo ŋu woatsɔ disk ƒe teƒe sue ŋutɔ awɔ ɣaɣla dzesi ŋɔŋlɔ blibo (~11 GB ƒe snapshot si woɖe gaɖoɖowo ƒuƒoƒe ɖeɖi vs. 300 GB na Zebra ƒe ɣaɣla dzesi ŋɔŋlɔ blibo).
- **zcashd RPC ƒe mɔnu si wòkplɔ xoxo nu** na gakotokuwo kple ɖekawɔwɔwo siwo le xoxo la nɔ dɔ wɔm, eye woatrɔ naneke o.
- **P2P ƒe gbeɖoɖo ƒe akpa si wonɔ kpɔm** (woɖe wòwɔwɔ le eƒe gɔmedzedze me) di be gaɖoɖowo ƒuƒoƒe ƒe gbeɖoɖo nava le 500ms te, kple gossip si ƒe DoS mate ŋu awɔ nu na.
- Wòdo ɖeka kple **Ironwood (NU6.3)**, Zcash ƒe mɔ̃ ƒe sewo trɔtrɔ si dze egɔme le 2026 ƒe titina me.
- Ɖoa to **NU7**: Zakura 1.7.0 nye release si wɔa be wòazɔ le Mainnet. Release ɖesiaɖe hã ɖoa nuwuwu le end-of-support block me, ƒe kwasiɖa aɖewo megbe esime woɖee, eya ta ɖo ŋku be nàtrɔe ɖoɖoɖo (kpɔ Before You Run It si le afisia).
- **Zakura Common** (v1.3.0, August 2026) wɔa be cryptography si gakotokuwo zazãna tsɔ wɔ gaɖoɖo siwo le ɣaɣla la yɔ wu: tso sekondi 3 wu va ɖe 200 ms te le nyawo geɖe me, ɖe Zakura ƒe benchmarkwo nu.
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

### NU7

Zakura 1.7.0, si wòdo go le October 22, 2026, nye ɖoɖo si wɔa be NU7 nàdze Mainnet ([nuwɔnaŋuti nyawo](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Ɣaɣla dzesi ŋɔŋlɔ hia 1.7.0 alo si wu be wòate ŋu akplɔ ɖoɖonu la le mɔ̃ ƒe sewo trɔtrɔ megbe. [NU7](NU7.md) ɖe nu si mɔ̃ ƒe sewo trɔtrɔ la trɔ la ŋu.

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
| Gbe | C++ (forked from Bitcoin) | Rust | Rust (forked from Zebra) |
| Nɔnɔme | Deprecated | Active | Active (v1.0.0 Jul 2026; v1.8.8 Nov 2026) |
| Ɖoɖo ƒe kaba | Baseline | ~1× | ~5× faster |
| Gaɖoɖowo ƒuƒoƒe ƒe ɖeɖe ɖa | No | No | Yes |
| zcashd RPC ƒe ƒoƒo | Native | Partial | Yes (compat mode) |
| Snapshot bootstrap | No | No | Yes (less than 2 min) |
| Experimental P2P | No | No | Yes (opt-in) |

---

## Ɖo Gɔme

Wòate ŋu axɔ download ƒe mɔnuwo, snapshotwo, kple ɖoɖo ƒe dokumentiwo le:

- **Ŋuɖoɖo kple ɖoɖoɖeɖe ƒe ɖeɖeɖe:** [zakura.com/download](https://zakura.com/download/)
- **Ɖoɖonu ƒe nɔnɔmetatawo:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Dzɔtsoƒe ƒe kɔpi ƒe ŋɔŋlɔ:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Ɖeɖefefe ƒe nyatakakawo:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Dɔwɔna na Gakotoku Siwo ƒe Kɔkɔe Le

Zakura menye server na gakotoku siwo le abe alɔ̃ ene o. Ewɔa `CompactTxStreamer`, gRPC protocol si gakotoku siwo le abe alɔ̃ ene abe Zodl (si woyɔna xoxo be Zashi) zã la o, eya ta gakotoku aɖeke mate ŋu akpe ɖe `zakurad` ŋu tẽ o. Ne nèle be wòakpe ɖe gakotoku siwo le abe alɔ̃ ene ŋu la, zã nu siawo dometɔ ɖeka le eŋgɔ:

- [Zaino](Zaino.md) (susu wò)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), Zcash Labs ƒe indexer kple light-wallet server, si le ɖoɖonu la xle tso Zakura ɣaɣla dzesi ŋɔŋlɔ, esi wòate ŋu anɔ eya ŋutɔ ƒe process me alo le remote dzi to JSON-RPC nu.

gRPC ŋɔŋlɔviŋlɔŋlɔnu si nye tɔ Zakura ŋutɔ (`indexer_listen_addr` le ƒuƒoƒe `[rpc]` me, wòwɔna o le gɔmedzedze me) nye mɔ si le ɖeka: gaɖoɖowo ƒuƒoƒe, mempool kple ɖoɖonu ƒe ta ƒuƒoƒe ƒe srɔ̃ɖeɖe siwo nye dɔwɔnu siwo wò nɔ wò ɖokui ƒe ŋgɔ, menye light-wallet ƒe mɔ o. Plaintext le mɔɖeɖe ko le loopback dzi; gaɖoƒe bubuwo katã hia mutual TLS ([config reference](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Hafi nàwɔe la

Nya siwo le 1.8 ƒe vɔ̃ɖiŋɔŋlɔ me, siwo naa mɔ̃ wɔnɔlawo ku ɖe eŋu:

- **Releasewo ƒe ŋkeke vɔna.** Zakura release ɖesiaɖe li kple mɔ̃ dzi wɔwɔ ƒe ɣeyiɣi nuwuwu ƒe ƒuƒoƒe, eye Mainnet ɣaɣla dzesi ŋɔŋlɔ si wòwɔa dɔ kple esia la fiana dɔwɔwɔ le gaɖoɖowo ƒuƒoƒe ma dzi. 1.8.x releasewo nye "Woaxɔe le Mainnet dzi va se ɖe gaɖoɖowo ƒuƒoƒe 3,643,309, le 2026 ƒe December 3 ƒe ɣeyiɣi me", kple upgrade ɖoɖoɖeɖe siwo doa ŋku ɖe esia ŋu ŋkeke etɔ̃ do ŋgɔ ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Kpɔ release yeye wu le ŋkeke ma hafi, eye mètsɔ version xoxo ɖe script alo deployment template me, ne mɔ̃ aɖe mele asiwò be nàtrɔe o.
- **X86-64 CPU hia tso 1.8.0 dzi.** Release binaries kple Docker imagewo zã BMI2/ADX instructionwo, si fia be Broadwell, AMD Zen alo esiwo do ŋgɔ vɛ (Intel) hia. Le CPU xoxo ŋu la, `zakurad` tutua dɔwɔwɔ le gɔmedzedze me kple vodada si ŋlɔ extension siwo bu la ɖe edzi. Wɔe tso source kple `--features portable` be nàwɔ dɔ le mɔ̃ mawo dzi ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Config xoxo siwo woŋlɔ ɖe edzi kple native P2P.** `zakurad generate` kpɔna be wòaŋlɔ `peer_memory_budget_bytes = 8589934592` (8 GiB). Tso 1.8.3 la, esia ɖea native P2P kɔnɛkshɔnwo ƒe nɔŋlɔ me abe afã ene, eye 4 GiB alo esiwo sɔ gbɔ vie la, wɔa be ɣaɣla dzesi ŋɔŋlɔ si zã native P2P magate ŋu adze egɔme o. Ɖo `[network.zakura] peer_memory_budget_bytes` ɖe 15 GiB sɔgbɔ, alo tutrɔ asi le xexlẽdzesi la ŋu be nàzã 15 GiB si nye nyateƒe yeye ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **State dɔwɔnua trɔ ɖe `zakurad` me.** Tso 1.8.3 la, `zakura-prune-state` kple `zakura-rollback-state` binary siwo le afã geɖe o medzena dɔwɔwɔ o, siwo me Docker hã le. Zã `zakurad prune-state` kple `zakurad rollback-state` ɖe eŋu. Woawo zãa nyawo siawo ke, gake woxɔa `zakura.toml`, eye emata `--cache-dir` be nàfia state directory ɖeka si wòdi.

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
