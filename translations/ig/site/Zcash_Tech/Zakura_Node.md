<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node

Zakura bụ mmejuputa full node mepere emepe, nke a na-akwụghị ụgwọ maka Zcash, e wuru ya maka nnukwu ogo. E kewapụrụ ya na [Zebra](Zebra_Full_Node.md) ma mepụta ya site na mmekorita dị n'etiti **Valar Group** na **Project Tachyon**, Zakura na-enye mmekọrịta ngwa ngwa nke ukwuu, mbelata block nke e wuru n'ime ya, na oyi akwa ndakọrịta maka ngwaọrụ ochie nke `zcashd`. E wepụtara ụdị 1.0.0 na Julaị 15, 2026.

---

## Nchịkọta

- Zakura bụ **full node Zcash nke dakọtara na consensus** — nhọrọ ọzọ karịa Zebra na zcashd, nke e kewapụrụ na Zebra.
- Mmekọrịta blockchain dị ihe dịka **ugboro 5 ngwa ngwa karịa Zebra**; ịmalite site na snapshot na-ewe **erughị nkeji 2**.
- **Mbelata block e wuru n'ime ya** na-enye ndị na-arụ ọrụ ohere ịgba full node site na obere oghere diski karịa nke ukwuu (~11 GB snapshot e belatara ma e jiri ya tụnyere 300 GB maka node Zebra zuru ezu).
- **Ụdị ndakọrịta RPC nke zcashd** na-eme ka e-akpa ego [wallet] na njikọta ndị dị adị rụọ ọrụ n'enweghị mgbanwe.
- **Oyi akwa nnwale maka mbufe P2P** (agbanyụrụ ya na ndabara) na-achọ mgbasa block n'okpuru 500ms nke gossip na-eguzogide DoS.
- Ọ dakọtara na **Ironwood (NU6.3)**, network upgrade nke Zcash a rụrụ ọrụ n'etiti 2026.
- **Zakura Common** (v1.3.0, Ọgọst 2026) na-eme ngwa ngwa cryptography e-akpa ego ji arụ Azụmahia nzuzo: site n'ihe karịrị sekọnd 3 ruo n'okpuru 200 ms n'ọtụtụ ọnọdụ, dịka nyocha Zakura siri kwuo.
- Ndị na-edu ya bụ **Sean Bowe** (onye hibere Zcash ọnụ, Project Tachyon) na **Dev Ojha** (Valar Group).

---

## Gịnị bụ Zakura?

Zakura bụ full node Zcash e mere site na ntọala ka ọ dị njikere maka mmepụta n'ogo buru ibu. Ọ bụ ezie na ọ na-ekerịta ndakọrịta consensus na Zebra — nke pụtara na ọ na-enyocha ma na-agbaso otu iwu protocol nke Zcash — Zakura na-eweta nkwalite injinia dị mkpa nke ebumnuche ha bụ ibelata ihe mgbochi dị n'ịgba full node Zcash.

Ọrụ a bụ njikọ aka n'etiti **Project Tachyon** (nke Sean Bowe na-edu, otu n'ime ndị injinia cryptographic mbụ nke Zcash) na **Valar Group** (nke Dev Ojha na-edu). Ha abụọ na-elekwasị anya na nkwalite protocol ọgbọ na-esote nke Zcash, ma Zakura na-arụ ọrụ dị ka node ntụaka maka ọrụ ahụ.

---

## Akụkụ Ndị Dị Mkpa

### Mmekọrịta Chain Ngwa Ngwa Ugboro 5

Zakura na-enweta mmekọrịta blockchain dị ihe dịka ugboro 5 ngwa ngwa ma e jiri ya tụnyere Zebra. Nke a na-eme ka ọ baa uru karịa nke ukwuu maka ndị na-arụ ọrụ chọrọ ịmalite node ngwa ngwa ma ọ bụ nwetaghachi mgbe nkwụsị ọrụ gasịrị.

### Ịmalite Site na Snapshot

Zakura na-ebipụta snapshot chain arụgoro nke na-ebelata oge mmekọrịta mbụ nke ukwuu:

| Usoro Bootstrap | Oge |
|-----------------|------|
| Snapshot archive | ~37 nkeji |
| Snapshot e belatara | **N'okpuru nkeji 2** |
| Zebra (mmekọrịta zuru ezu) | ~awa 20 |

Snapshot e belatara dị ihe dịka **11 GB**, na-eme ka ịmalite node bụrụ **ugboro 680 ngwa ngwa** ma e jiri ya tụnyere mmekọrịta site na genesis.

### Mbelata Block E Wuru N'Imé Ya

Zakura na-akwado mbelata block a pụrụ ịhazi, na-enye ndị na-arụ ọrụ node ohere ikpebi ole akụkọ chain ha ga-edobe. Nke a na-eme ka ịgba full node dị irè n'ọrụ na hardware nwere nchekwa pere mpe — bara uru maka validators, ndị mmepụta, na ndị na-eweta akụrụngwa na-adịghị mkpa chain akụkọ ihe mere eme zuru ezu.

### Ụdị Ndakọrịta RPC nke zcashd

Zakura gụnyere ụdị ndakọrịta nke na-emepụtaghachi interface JSON-RPC ochie nke `zcashd`. E-akpa ego, exchanges, na njikọta ndị dị adị na-adabere na RPC `zcashd` nwere ike ịgbanwee gaa na Zakura na-enweghị mkpa mgbanwe koodu.

### Oyi Akwa Nnwale Maka Mbufe P2P

Zakura ji oyi akwa mbufe peer-to-peer ọgbọ na-esote abịa, nke ugbu a **agbanyụrụ na ndabara**. Mgbe agbanyere ya, ọ na-achọ:

- Mgbasa block kachasị njọ n'okpuru 500ms n'ofe network
- Ịkpakọba mempool maka ibufe Azụmahia nke ọma karị
- Protocol gossip na-eguzogide DoS iji meziwanye nkwụsi ike network

Oyi akwa a bụ nhụchalụ nke nkwalite ọkwa network Zcash n'ọdịnihu a na-emepụta n'okpuru Project Tachyon.

### Dakọtara na Ironwood (NU6.3)

Zakura dakọtara nke ọma na network upgrade Ironwood (NU6.3), nke arụpụtara na mainnet Zcash n'etiti 2026.

---

## Zakura Common: Cryptography E-akpa Ego Ngwa Ngwa Karị

N'Ọgọst 2026, otu Zakura wepụtara Zakura Common, otu fork e mere ngwa ngwa nke ọbá akwụkwọ cryptography nke e-akpa ego na node Zcash na-adabere na ya. Zakura gbanwere gaa na stack ọhụrụ ahụ na ụdị 1.3.0, ma Vizor Wallet bụ otu n'ime e-akpa ego mbụ jikọtara ya.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Dịka nyocha nke Zakura n'onwe ya si kwuo:

| Ọrụ | Ọsọ mgbakwunye |
|--|--|
| Ịmepụta proof na mobile | karịa 14× (desktop: karịa 5×) |
| Hashing Sinsemilla | karịa 21× |
| Nyocha zk-SNARK | 4–8× |
| Decryption nnwale | karịa 1.5× |

Maka ndị ọrụ, mgbanwe kacha apụta ìhè bụ oge ichere. Iwulite Azụmahia nzuzo na-ewe e-akpa ego ihe karịrị sekọnd atọ. Site na Zakura Common, ọ nwere ike iwe ihe na-erughị 200 ms n'ọtụtụ ọnọdụ. Nke a bụ oge ngwaọrụ gị na-etinye n'ịkwadebe Azụmahia, ọ bụghị oge network chọrọ iji kwado ya.


---

## Otu Zakura Si Metụta Node Zcash Ndị Ọzọ

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Asụsụ | C++ (e kewapụrụ na Bitcoin) | Rust | Rust (e kewapụrụ na Zebra) |
| Ọnọdụ | Akwụsịla iji ya | Na-arụ ọrụ | Na-arụ ọrụ (v1.0.0, Julaị 2026) |
| Ọsọ mmekọrịta | Ntọala | ~1× | ~5× ngwa ngwa |
| Mbelata block | Mba | Mba | Ee |
| Ndakọrịta RPC zcashd | Nke e wuru n'ime ya | Nke akụkụ | Ee (ụdị ndakọrịta) |
| Ịmalite site na snapshot | Mba | Mba | Ee (erughị nkeji 2) |
| P2P nnwale | Mba | Mba | Ee (nhọrọ onye ọrụ) |

---

## Ịmalite

Nhọrọ nbudata, snapshot, na akwụkwọ nhazi dị na:

- **Ntuziaka nbudata na nhazi:** [zakura.com/download](https://zakura.com/download/)
- **Snapshot chain:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Koodu isi:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Peeji Ndị Metụtara Ya

- [Zebra Full Node](Zebra_Full_Node.md) — full node elu nke Zcash nke e kewapụrụ Zakura na ya
- [Zaino Indexer](Zaino.md) — indexer dabere na Rust nke dakọtara na Zebra na Zakura
- [Full Nodes](Full_Nodes.md) — nchịkọta nhọrọ full node Zcash
- [Lightwallet Nodes](Lightwallet_Nodes.md) — nhọrọ ndị ahịa dị fechaa

## Akụrụngwa

- [Iwebata Zakura — ọkwa](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Weebụsaịtị Zakura](https://zakura.com/)
- [Zakura na X/Twitter](https://x.com/ZakuraZcash)
- [Project Tachyon](https://electriccoin.co/blog/)
- [Ọkwa Zakura Common](https://zakura.com/announcements/zakura-common/)
