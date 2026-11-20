<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Dezie Ibe"/>
</a>

# Zakura Node

Zakura bụ mmejuputa full node efu, mepere emepe maka Zcash, nke e wuru ka ọ too. E si na [Zebra](Zebra_Full_Node.md) wepụta ya, ma site na mmekorita dị n'etiti **Valar Group** na **Project Tachyon** mepụta ya. Zakura na-enye mmekọrịta ngwa ngwa nke ukwuu, mkpụcha block e wuru n'ime ya, na oyi akwa ndakọrịta maka ngwá ọrụ `zcashd` ochie. E wepụtara ụdị 1.0.0 na Julaị 15, 2026. Kemgbe ahụ, a na-ewepụta ụdị ọhụrụ ngwa ngwa: 1.7.0 (Ọktoba 22, 2026) mere ka NU7 rụọ ọrụ na Mainnet, usoro 1.8 sokwa na Nọvemba.

---

## TL;DR

- Zakura bụ **full node Zcash dakọtara na consensus** — nhọrọ ọzọ na Zebra na zcashd, nke e si na Zebra wepụta.
- Mmekọrịta na blockchain dị ihe dị ka **5× ngwa ngwa karịa Zebra**; ịmalite site na snapshot na-ewe **ihe na-erughị nkeji 2**.
- **Mkpụcha block e wuru n'ime ya** na-eme ka ndị na-arụ ọrụ nwee ike iji ohere diski pere mpe nke ukwuu rụọ full node (~11 GB maka snapshot a kpụchara ma e jiri ya tụnyere 300 GB maka full node Zebra).
- **Ụdị ndakọrịta RPC zcashd** na-eme ka e-akpa ego na njikọ ndị dị adị rụọ ọrụ n'enweghị mgbanwe.
- **Oyi akwa njem P2P a na-anwale** (a na-agbanyụghị ya na ndabara) na-achọ ịgbasa block n'okpuru 500ms, site na gossip na-eguzogide DoS.
- Ọ dakọtara na **Ironwood (NU6.3)**, network upgrade Zcash nke malitere ịrụ ọrụ n'etiti afọ 2026.
- Ọ na-agbaso **NU7**: Zakura 1.7.0 bụ ụdị mere ka ọ rụọ ọrụ na Mainnet. Ụdị ọ bụla na-akwụsịkwa ịrụ ọrụ na block njedebe nkwado izu ole na ole ka e wepụtara ya, ya mere hazie ka unu na-emelite ya mgbe niile (lee Ihe Ị Ga-ebu N'uche Tupu Ị Rụọ Ya n'okpuru).
- **Zakura Common** (v1.3.0, Ọgọst 2026) na-eme ka cryptography e-akpa ego ji arụ azụmahịa nzuzo dị ngwa: site n'ihe karịrị sekọnd 3 ruo n'okpuru 200 ms n'ọtụtụ ọnọdụ, dịka nsonaazụ ule Zakura si dị.
- **Sean Bowe** (onye tọrọ Zcash, Project Tachyon) na-edu ya, ya na **Dev Ojha** (Valar Group).

---

## Gịnị bụ Zakura?

Zakura bụ full node Zcash e mere site na mmalite ka o dị njikere iji rụọ ọrụ n'ọtụtụ ebe n'ọ̀tụ̀tụ̀ buru ibu. Ọ bụ ezie na ọ dabara na Zebra n'ihe gbasara consensus — nke pụtara na ọ na-enyocha ma na-agbaso otu iwu protocol Zcash — Zakura na-eweta nnukwu mmezi n'ọrụ injinịa iji mee ka ịrụ full node Zcash dị mfe karị.

Ọrụ a bụ nke Project Tachyon (nke Sean Bowe na-edu, otu n'ime ndị injinia cryptography mbụ Zcash) na **Valar Group** (nke Dev Ojha na-edu) na-emekọ ọnụ. Ha na-elekwasị anya ọnụ n'imezi protocol Zcash nke ọgbọ na-abịa, Zakura na-arụkwa ọrụ dị ka node ntụaka maka ọrụ ahụ.

---

## Njirimara Ndị Dị Mkpa

### Mmekọrịta Chain Dị 5× Ngwa Ngwa Karị

Zakura na-eme ka mmekọrịta blockchain dị ihe dị ka 5× ngwa ngwa ma e jiri ya tụnyere Zebra. Nke a na-eme ka ọ dị mfe karị nye ndị na-arụ ọrụ chọrọ ịmalite node ngwa ngwa ma ọ bụ nwetaghachi ya mgbe ọ kwụsịrị.

### Ịmalite Site na Snapshot

Zakura na-ebipụta snapshot chain ndị e wubere tupu oge eruo, nke na-ebelata nke ukwuu oge mmekọrịta mbụ:

| Usoro Bootstrap | Oge |
|-----------------|------|
| Snapshot Archive | ~37 nkeji |
| Snapshot a kpụchara | **N'okpuru nkeji 2** |
| Zebra (mmekọrịta zuru ezu) | ~20 awa |

Snapshot ndị a kpụchara dị ihe dị ka **11 GB**, na-eme ka ịmalite node dị **680× ngwa ngwa** karịa ịmekọrịta site na genesis.

### Mkpụcha Block E Wuru N'ime Ya

Zakura na-akwado mkpụcha block a pụrụ ịhazi, na-eme ka ndị na-arụ node nwee ike ikpebi ego ole n'ime akụkọ chain ha ga-echekwa. Nke a na-eme ka o kwe omume iji ngwaike nwere ohere nchekwa pere mpe rụọ full node — ọ bara uru nye ndị na-enyocha nkwado, ndị mmepe, na ndị na-enye akụrụngwa na-achọghị chain akụkọ ihe mere eme dum.

### Ụdị Ndakọrịta RPC zcashd

Zakura nwere ụdị ndakọrịta nke na-eṅomi interface JSON-RPC ochie nke `zcashd`. E-akpa ego, exchange, na njikọ ndị dị adị dabere na RPC nke `zcashd` nwere ike ịgafe na Zakura n'enweghị mgbanwe koodu.

### Oyi akwa Njem P2P A Na-anwale

Zakura na-abịa na oyi akwa njem peer-to-peer ọgbọ na-abịa, nke **a na-agbanyụghị ugbu a na ndabara**. Mgbe e gbanyere ya, ọ na-achọ ime ihe ndị a:

- Ịgbasa block n'ofe netwọk n'okpuru 500ms n'ọnọdụ kacha njọ
- Ịchịkọta Mempool ka izipu azụmahịa dịkwuo irè
- Iji protocol gossip na-eguzogide DoS kwalite nkwụsi ike netwọk

Oyi akwa a na-egosi nlele mbụ nke mmezi netwọk Zcash ga-abịa, nke a na-emepụta n'okpuru Project Tachyon.

### Dakọtara na Ironwood (NU6.3)

Zakura dakọtara nke ọma na network upgrade Ironwood (NU6.3), nke malitere ịrụ ọrụ na mainnet Zcash n'etiti afọ 2026.

### NU7

Zakura 1.7.0, nke e wepụtara na Ọktoba 22, 2026, bụ ụdị mere ka NU7 rụọ ọrụ na Mainnet ([akwụkwọ ndetu mwepụta](https://github.com/zakura-core/zakura/releases/tag/v1.7.0)). Node chọrọ ụdị 1.7.0 ma ọ bụ nke ọhụrụ ka o wee soro chain mgbe network upgrade gasịrị. [NU7](NU7.md) na-akọwa mgbanwe network upgrade ahụ wetara.

---

## Zakura Common: Cryptography E-akpa Ego Dị Ngwa Ngwa Karị

N'Ọgọst 2026, ndị otu Zakura wepụtara Zakura Common, otu fork ndị e mere ka ha dị ngwa nke ọba akwụkwọ cryptography nke e-akpa ego na node Zcash na-adabere na ya. Zakura gbanwere gaa na usoro ọhụrụ ahụ na ụdị 1.3.0, Vizor Wallet sokwa n'ime e-akpa ego mbụ jikọtara ya.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Dị ka nsonaazụ ule nke Zakura si dị:

| Ọrụ | Ogo mmụba ọsọ |
|--|--|
| Ịmepụta proof na ekwentị | karịa 14× (kọmputa: karịa 5×) |
| Ịgba hash Sinsemilla | karịa 21× |
| Nyocha zk-SNARK | 4–8× |
| Nkọwa nzuzo nwa oge | karịa 1.5× |

Maka ndị ọrụ, mgbanwe a kacha pụta ìhè bụ oge ichere. Ịrụ azụmahịa nzuzo na-ewebu e-akpa ego ihe karịrị sekọnd atọ. Site na Zakura Common, n'ọtụtụ ọnọdụ ọ nwere ike iwe ihe na-erughị 200 ms. Nke a bụ oge ngwaọrụ unu na-eji akwadebe azụmahịa ahụ, ọ bụghị oge netwọk chọrọ iji kwenye na ya.


---

## Mmekọrịta Zakura na Node Zcash Ndị Ọzọ

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Asụsụ | C++ (e si na Bitcoin wepụta ya) | Rust | Rust (e si na Zebra wepụta ya) |
| Ọnọdụ | Akwụsịla iji ya | Na-arụ ọrụ | Na-arụ ọrụ (v1.0.0 Julaị 2026; v1.8.8 Nọvemba 2026) |
| Ọsọ mmekọrịta | Nke mbụ e ji atụnyere | ~1× | ~5× ngwa ngwa |
| Mkpụcha block | Mba | Mba | Ee |
| Ndakọrịta RPC zcashd | E wuru n'ime ya | Nke ụfọdụ | Ee (ụdị ndakọrịta) |
| Ịmalite site na snapshot | Mba | Mba | Ee (ihe na-erughị nkeji 2) |
| P2P a na-anwale | Mba | Mba | Ee (a ga-ahọrọ ịgbanye ya) |

---

## Ịmalite Iji Ya

Nhọrọ nbudata, snapshot, na akwụkwọ nhazi dị na:

- **Ntuziaka nbudata na nhazi:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot Chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Koodu isi mmalite:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)
- **Akwụkwọ ndetu mwepụta:** [github.com/zakura-core/zakura/releases](https://github.com/zakura-core/zakura/releases)

### Inye E-akpa Ego Dịfeghị Ibu Ọrụ

Zakura abụghị sava e-akpa ego dịfeghị ibu ọrụ. Ọ naghị etinye `CompactTxStreamer`, protocol gRPC nke e-akpa ego dịfeghị ibu ọrụ dịka Zodl (nke a na-akpọbu Zashi) na-eji, ya mere e-akpa ego enweghị ike ijikọ na `zakurad` ozugbo. Iji nye e-akpa ego dịfeghị ibu ọrụ ọrụ, rụọnụ otu n'ime ihe ndị a n'ihu ya:

- [Zaino](Zaino.md) (nke a họọrọ)
- [lightwalletd](Lightwallet_Nodes.md)
- [Ztreamer](https://github.com/zcashlabs/ztreamer), ihe ndekọ chain na sava e-akpa ego dịfeghị ibu ọrụ nke Zcash Labs, nke na-agụ chain site na node Zakura, ma ọ bụ nke etinyere n'ime usoro nke ya ma ọ bụ nke dịpụrụ adịpụ site na JSON-RPC

gRPC indexer nke Zakura n'onwe ya (`indexer_listen_addr` dị na ngalaba `[rpc]`, a na-agbanyụghị ya na ndabara) bụ interface dị iche: iyi block, Mempool na chain-tip maka sọftụwia ntụkwasị obi unu na-arụ n'onwe unu; ọ bụghị protocol e-akpa ego dịfeghị ibu ọrụ. A na-ekwe ka e jiri plaintext naanị na loopback, adreesị ọ bụla ọzọ chọkwara mutual TLS ([ntụaka nhazi](https://github.com/zakura-core/zakura/blob/v1.8.7/crates/zakura-rpc/src/config/rpc.rs)).

### Ihe Ị Ga-ebu N'uche Tupu Ị Rụọ Ya

E nwere ihe ole na ole dị n'akwụkwọ ndetu mwepụta 1.8 nwere ike iju ndị na-arụ ọrụ anya:

- **Ụdị mwepụta na-agwụ.** Mwepụta Zakura ọ bụla nwere ịdị elu njedebe nkwado, node Mainnet na-arụ ya akwụsịkwa na block ahụ. Mwepụta 1.8.x bụ "A ga-akwado ya na Mainnet ruo block 3,643,309, ihe dị ka Disemba 3, 2026", ịdọ aka ná ntị maka imelite ya amalitekwa ihe dị ka ụbọchị atọ tupu oge ahụ ([v1.8.8](https://github.com/zakura-core/zakura/releases/tag/v1.8.8)). Lelee mwepụta kacha ọhụrụ tupu ụbọchị ahụ, unu etinyekwala ụdị ochie n'ime script ma ọ bụ ndebiri mbugharị na-enweghị atụmatụ imelite ya.
- **Achọrọ CPU x86-64 kemgbe 1.8.0.** Binary mwepụta na onyonyo Docker na-eji ntuziaka BMI2/ADX, nke pụtara na achọrọ Intel Broadwell, AMD Zen ma ọ bụ nke ọhụrụ. Na CPU ochie, `zakurad` na-akwụsị mgbe ọ na-amalite ma nye mperi na-akọ aha extensions na-efu. Jirọnụ `--features portable` wuo ya site na koodu isi mmalite ka ọ rụọ ọrụ n'igwe ndị ahụ ([v1.8.0](https://github.com/zakura-core/zakura/releases/tag/v1.8.0)).
- **Nhazi ochie e mepụtara na P2P nke e wuru n'ime ya.** `zakurad generate` na-ede `peer_memory_budget_bytes = 8589934592` (8 GiB) na mbụ. Kemgbe 1.8.3, nke ahụ na-enye ohere ka njikọ P2P e wuru n'ime ya dị ihe dị ka ọkara; 4 GiB ma ọ bụ ihe na-erughị ya agaghị ekwe ka node nwere P2P e wuru n'ime ya malite. Welite `[network.zakura] peer_memory_budget_bytes` ka ọ dịkarịa ala 15 GiB, ma ọ bụ hichapụ ahịrị ahụ ka o jiri ndabara ọhụrụ nke 15 GiB ([v1.8.3](https://github.com/zakura-core/zakura/releases/tag/v1.8.3)).
- **Ebufela ngwa ọrụ steeti n'ime `zakurad`.** Kemgbe 1.8.3, anaghịzi ezipu binary `zakura-prune-state` na `zakura-rollback-state` ndị kwụụrụ onwe ha, gụnyere n'ime Docker. Jirọnụ `zakurad prune-state` na `zakurad rollback-state` kama. Ha na-anabata otu arụmụka ndị ahụ, mana ha na-ebu `zakura.toml`, ya mere nyefee `--cache-dir` iji gosi nchekwa steeti a kapịrị ọnụ.

---

## Ibe Ndị Metụtara Ya

- [Zebra Full Node](Zebra_Full_Node.md) — full node Zcash nke e si na ya wepụta Zakura
- [Zaino Indexer](Zaino.md) — indexer nke dabere na Rust, nke dakọtara na Zebra na Zakura
- [Full Nodes](Full_Nodes.md) — nkọwa gbasara nhọrọ full node Zcash
- [Lightwallet Nodes](Lightwallet_Nodes.md) — nhọrọ ndị ahịa dịfeghị ibu ọrụ

## Akụrụngwa

- [Na-ewebata Zakura — ọkwa](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Zakura Weebụsaịtị](https://zakura.com/)
- [Zakura na X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Zakura ọkwa Common](https://zakura.com/announcements/zakura-common/)
