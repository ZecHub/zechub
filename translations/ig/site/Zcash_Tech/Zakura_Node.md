<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zakura_Node.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Zakura Node

> 🇧🇷 [Dị na Pọtugal](/zechubglobal/zcashbrasil/zcashtech/zakura)

Zakura bụ mmemme n'efu, nke mepere emepe maka Zcash, nke e wuru maka nha. [Zebra](Zebra_Full_Node.md) ma mepụta ya site na mmekorita dị n'etiti **Valar Group** na **Project Tachyon**, Zakura na-enye mmekorita ngwa ngwa, ịkpụcha blọk ala, na oyi akwa ndakọrịta maka ihe nketa. `zcashd` ngwaọrụ. E wepụtara ụdị 1.0.0 na Julaị 15, 2026.

---

## TL;DR

- Zakura is a **consensus-compatible Zcash full node** — an alternative to Zebra and zcashd, forked from Zebra.
- Mmekọrịta Blockchain dị ihe dị ka **5× ọsọ karịa Zebra**; bootstrapping snapshot ga-agwụ n'ime **n'okpuru nkeji 2**.
- **Ịchacha ngọngọ nkịtị** na-enye ndị ọrụ ohere ịgba ọsọ n'ime oghere zuru oke na obere oghere diski dị oke njọ (ihe osise pruned nke ruru 11 GB megide 300 GB maka n'ime oghere Zebra zuru oke).
- Ụdị ndakọrịta nke **zcashd RPC** na-ekwe ka obere akpa na njikọta ndị dị adị rụọ ọrụ na-enweghị mgbanwe.
- Oyi akwa mbufe P2P nke **nwale** (nke ndabara agbanyụrụ) na-elekwasị anya na mgbasa nke obere ngọngọ 500ms site na asịrị na-eguzogide DoS.
- Dakọtara na **Ironwood (NU6.3)**, mmelite netwọkụ Zcash malitere n'etiti afọ 2026.
- **Zakura Common** (v1.3.0, Ọgọst 2026) na-eme ka obere akpa nzuzo eji arụ azụmahịa nkeonwe dị ngwa: site na ihe karịrị sekọnd 3 ruo ihe na-erughị 200 ms n'ọtụtụ oge, dịka ụkpụrụ Zakura si dị.
- Onye isi ya bụ **Sean Bowe** (onye hiwere Zcash, Project Tachyon) na **Dev Ojha** (Valar Group).

---

## Gịnị bụ Zakura?

Zakura bụ Zcash zuru oke nke e mere site na mmalite ruo n'ọkwa iji dị njikere maka mmepụta. Ọ bụ ezie na ọ na-ejikọta nkwekọrịta na Zebra - nke pụtara na ọ na-akwado ma na-agbaso otu iwu usoro Zcash - Zakura na-ewebata mmezi injinia dị mkpa iji belata ihe mgbochi iji mee Zcash zuru oke.

Ọrụ a bụ ọrụ jikọrọ aka n'etiti **Ọrụ Tachyon** (nke Sean Bowe, otu n'ime ndị injinia mbụ nke Zcash dere) na **Valar Group** (nke Dev Ojha duziri). Ha na-elekwasị anya n'ịkwalite usoro Zcash nke ọgbọ na-abịa, Zakura na-arụkwa ọrụ dị ka ebe ntụaka maka ọrụ ahụ.

---

## Isi Atụmatụ

### Mmekọrịta Agbụ 5× Ngwa Ngwa

Zakura na-enweta njikọ blockchain dị ihe dị ka 5× ngwa ngwa ma e jiri ya tụnyere Zebra. Nke a na-eme ka ọ dịkwuo irè maka ndị ọrụ chọrọ ịgbagharị node ngwa ngwa ma ọ bụ gbakee site na oge ọrụ.

### Foto Bootstrapping

Zakura na-ebipụta foto ndị e wuru n'usoro nke na-ebelata oge mmekọrịta mbụ nke ukwuu:

| Usoro Bootstrap | Oge |
|-----------------|------|
| Foto nchekwa | ~ Nkeji 37 |
| Foto e gbubiri gbubiri | **N'okpuru nkeji 2** |
| Zebra (mmekọrịta zuru oke) | ~Awa 20 |

Foto ndị e gbubiri egbu dị ihe dị ka **11 GB**, nke na-eme ka eriri n'ime **680× dị ngwa ngwa** ma e jiri ya tụnyere njikọta site na mmalite.

### Ịkwacha Native Block

Zakura na-akwado ịkpụcha blọk a na-ahazi, na-enye ndị na-arụ ọrụ n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime n'ime.

### zcashd RPC Compatibility Mode

Zakura nwere ụdị ndakọrịta nke na-emegharị ihe nketa ahụ `zcashd` Njikọ JSON-RPC. Obere akpa ego, mgbanwe, na njikọta dị adị nke dabere na `zcashd` Ndị RPC nwere ike ịgbanwe gaa na Zakura n'achọghị mgbanwe koodu.

### Oyi akwa njem P2P nnwale

Zakura na-ebuga ya na usoro njem ọgbọ na-esote, nke a na-akpọ "peer-to-peer" ugbu a. Mgbe etinyere ya, ọ na-elekwasị anya na:

- Mgbasa nke obere nsogbu kacha njọ nke dị n'okpuru 500ms na netwọk ahụ
- Nchịkọta Mempool maka nnyefe azụmahịa dị irè karị
- Usoro asịrị na-eguzogide DoS iji melite iguzogide netwọk

Oyi akwa a na-anọchite anya ihe ngosi nke mmezi ọkwa netwọkụ Zcash n'ọdịnihu nke a na-emepụta n'okpuru Project Tachyon.

### Ironwood (NU6.3) Dakọtara

Zakura dakọtara nke ọma na mmelite netwọkụ Ironwood (NU6.3), nke arụpụtara na isi Zcash na etiti afọ 2026.

---

## Zakura Common: Ngwa ngwa ngwa cryptography obere akpa

Na Ọgọst 2026, ndị otu Zakura wepụtara Zakura Common, otu ngwa ngwa nke ọbá akwụkwọ cryptography nke obere akpa Zcash na nodes na-adabere na ya. Zakura gbanwere gaa na stack ọhụrụ na ụdị 1.3.0, Vizor Wallet sokwa na obere akpa mbụ jikọtara ya.

![Private Zcash payment: zk-SNARK verification 4 to 8 times faster, transaction building from over 3 seconds to under 200 ms, proof generation over 14 times faster on mobile, hashing 21 times faster, trial decryption 1.5 times faster, and open source libraries that need no protocol upgrade](/content-images/zakuracommonspeedups.webp)

Dịka ihe Zakura kwuru si dị:

| Ọrụ | Ọsọ ọsọ |
|--|--|
| Mmepụta ihe akaebe na ekwentị | ihe karịrị 14× (desktọpụ: ihe karịrị 5×) |
| Ịhazi Sinsemilla | ihe karịrị 21× |
| nkwenye zk-SNARK | 4–8× |
| Nkọwapụta nnwale | ihe karịrị 1.5× |

Maka ndị ọrụ, mgbanwe kachasị apụta ìhè bụ oge ichere. Ịrụpụta azụmahịa nkeonwe na-ewe obere akpa ego ihe karịrị sekọnd atọ. Site na Zakura Common, ọ nwere ike were ihe na-erughị 200 ms n'ọtụtụ oge. Nke a bụ oge ngwaọrụ gị ji akwado azụmahịa ahụ, ọ bụghị oge netwọk kwesịrị iji kwado ya.


---

## Otu Zakura si ejikọta ya na Zcash Nodes ndị ọzọ

| | zcashd | Zebra | Zakura |
|--|--------|-------|--------|
| Asụsụ | C++ (a kpụrụ site na Bitcoin) | Nchara | Nchara (a kpụrụ site na Zebra) |
| Ọnọdụ | Akwụsịla | Na-arụ ọrụ | Na-arụ ọrụ (v1.0.0, Julaị 2026) |
| Ọsọ mmekọrịta | Ntọala ntọala | ~1× | ~5× ọsọ ọsọ |
| Ịchacha ngọngọ | Mba | Mba | Ee |
| zcashd RPC compat | Native | Partial | Ee (ụdị compat) |
| Foto ntanye mmalite | Mba | Mba | Ee (ihe na-erughị nkeji 2) |
| P2P nnwale | Mba | Mba | Ee (nhọrọ) |

---

## Na-amalite

Nhọrọ nbudata, foto, na akwụkwọ nhazi dị na:

- **Budata ma hazie ntuziaka:** [zakura.com/download](https://zakura.com/download/)
- **Nseta eserese nke agbụ:** [zakura.com/snapshots](https://zakura.com/snapshots/)
- **Koodu isi mmalite:** [github.com/zakura-core/zakura](https://github.com/zakura-core/zakura)

---

## Peeji ndị metụtara ya

- [Zebra zuru oke](Zebra_Full_Node.md) — e si n'elu Zcash gbapụta Zakura site na njikọ zuru oke.
- [Ihe ngosi Zaino](Zaino.md) - ihe ndeksi dabere na Rust dakọtara na Zebra na Zakura
- [Ọnụ zuru ezu](Full_Nodes.md) - nchịkọta nke nhọrọ Zcash zuru oke
- [Ọnụọgụ obere akpa](Lightwallet_Nodes.md) - nhọrọ ndị ahịa dị mfe

## akụrụngwa

- [Na-ewebata Zakura - ọkwa](https://zakura.com/announcements/introducing-zakura/)
- [Zakura GitHub](https://github.com/zakura-core/zakura)
- [Weebụsaịtị Zakura](https://zakura.com/)
- [Zakura na X/Twitter](https://x.com/ZakuraZcash)
- [Ọrụ Tachyon](https://electriccoin.co/blog/)
- [Nkwupụta nkịtị Zakura](https://zakura.com/announcements/zakura-common/)
