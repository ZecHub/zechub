# Unified Address (ZIP-316) a Wɔde Di Dwuma

*Eyi yɛ adesua akwankyerɛ, ɛnyɛ decoder a wɔaboaboa ano anaa copy-paste payment library. Ɛkyerɛkyerɛ sɛnea wɔahyehyɛ Unified Address sɛnea ɛbɛyɛ a wubetumi ate nea nhomakorabea ahorow a wɔhwɛ so yɛ wɔ hood no ase no ase. Sɛ wopɛ biribiara a edi sika ankasa ho dwuma a, defer to the [ZIP-316 nkyerɛkyerɛmu](https://zips.z.cash/zip-0316) ne aban dwumadie a wɔde abata ho wɔ aseɛ ha no.*

---

## Mfonini kɛse no

Unified Address (UA) yɛ address ahama biako a ɛde agyefo ahorow pii: **Transparent**, **Sapling**, **Orchard**, anaa nea wɔaka abom. Sika kotoku a wotua ho ka no ankasa paw receiver pool a eye sen biara a ɛboa.

Fa no sɛ UA yɛ krataa a wɔatoto mu a nkrataa pii a wɔakyerɛw so wom. Kaad biara gyina hɔ ma ɔkwan soronko a wɔfa so du wo nkyɛn. Sɛ wopɛ sɛ wohwɛ address bi a, ɛsɛ sɛ akwammisa krataa bi:

1. **Bue envelope no:** Decode nkyerɛwee ahama no mu.
2. **Un-shuffle emu nsɛm:** Undo ahobammɔ scramble (**F4Jumble**).
3. **Kenkan kaad biara:** Yi ankorankoro agyefo.
4. **Hyɛ protocol mmara:** Bu w'ani gu anaa pow nsɛm a wɔakyerɛw no sɛnea wɔn typecode range te.

---

## Dɛn nti na "decode Bech32m kɛkɛ" no nnɔɔso

UA de Bech32m text encoding di dwuma, nanso decoding Bech32m nkutoo nkyerɛ receivers a wobetumi de adi dwuma.

ZIP-316 hyɛ da scrambles payload no denam **F4Jumble** ansa na encoding. F4Jumble hwɛ hu sɛ sɛ wosakra nkyerɛwde biako mpo wɔ address no mu a, ɛsakra decoded output no koraa. Wei siw address malleability ntua a ɔtowhyɛfo bi sesa bytes wɔ address bi mfinimfini bere a ogyaw prefix ne suffix no sɛnea ɛte sɛ nea ɛfata no ano.

> **Key rule:** Malleability ahobanbɔ yɛ adwuma sɛ wo application no yɛ decoding ne validation pipeline no nyinaa nkutoo a. Decoding fã bi yi ahobammɔ fi hɔ bere a wɔkora asiane no nyinaa so no.

---

## Decoding pipeline no, anammɔn biara

### Anamɔn 1: Decode Bech32m na hwɛ network no
- **Ɔfã a nnipa tumi kenkan (HRP):** `u` kyerɛ mainnet; `utest` kyerɛ testnet. *(Mainnet UA ahorow no fi ase `u1`, ɛhe `1` ne Bech32 mpaapaemu.)*
- **Ne tenten anohyeto:** Standard Bech32m hyɛ anohyeto a ɛyɛ nkyerɛwde 90. UAs taa boro saa anohyeto yi so, enti ɛsɛ sɛ wɔma standard length checks no yɛ adwuma wɔ decoder no mu.
- Dane 5-bit Bech32m nsɛmfua no san kɔ 8-bit bytes a wɔahyɛ da ayɛ no so.

### Anamɔn 2: Dane F4Jumble
F4Jumble yɛ Feistel network a ɛwɔ 4-round a wɔasi wɔ BLAKE2b so:
- **Benkum fã tenten:** `min(64, floor(length / 2))` baiti ahorow. Cap a ɛyɛ 64 bytes no ne BLAKE2b output kɛseɛ a ɛkyɛn so no hyia. Fa nifa no kura payload a aka no.
- **Hash dwumadie:** Ɛsesa G ne H denam personalization labels a wɔahyɛ da ayɛ so (`UA_F4Jumble_G` ne `UA_F4Jumble_H`).
- **Nhyehyɛe a ɛyɛ kurukuruwa:** Encoding a ɛkɔ anim no tu mmirika G(0) → H(0) → G(1) → H(1). Sɛ wɔdan akyi (wɔnsɛe no) tu mmirika H(1) → G(1) → H(0) → G(0).
- **Range check:** Pow inputs a ɛwɔ ZIP-316 payload kɛse anohyeto no akyi.

### Anamɔn 3: Yi padding na hwɛ sɛ HRP no yɛ nokware
Ansa na wobɛbɔ no, encoder no de baiti 16 a HRP no wom ka ho, a wɔde zero ahyɛ mu ma.
- Yi baiti 16 a etwa to no fi hɔ bere a woabue awie no.
- Si so dua sɛ HRP a wɔde ahyɛ mu no ne ntwamutam a wɔhwɛ kwan no hyia (`u` or `utest`). Wei mma testnet address ahorow nnye ntom wɔ akwanhyia mu wɔ mainnet so.

### Anamɔn 4: Yi agyefo
Payload a aka no yɛ `(typecode, length, content)` entries, baabi a wɔde typecode ne ne tenten sie sɛ compact-size integers (byte biako ma values nketewa). Nkyerɛwde ahorow a wonim sɛ wɔde gye nsɛm:

| Typecode a wɔde kyerɛw nsɛm | Receiver no su       | Nsɛm a ɛwɔ mu no tenten |
| :------- | :------------------ | :------------- |
| `0x00`   | Nneɛma a ɛda adi pefee (P2PKH) | 20 baiti       |
| `0x01`   | Nneɛma a ɛda adi pefee (P2SH)  | 20 baiti       |
| `0x02`   | Sapling             | 43 baiti ahorow       |
| `0x03`   | Orchard             | 43 baiti ahorow       |

Eyinom akyi no, ZIP-316 de akwan abien foforo sie ma anim a ɛne ne ho hyia:

- **`0xC0`–`0xDF` (non-MUST-understand metadata):** ɛsɛ sɛ adetɔfo bu wɔn ani gu metadata nneɛma a wonnim wɔ saa kwan yi so.
- **`0xE0` ne `0xE1` (wɔde ama MUST-te expiry metadata):** mprempren ZIP-316 registry no de eyinom ma address expiry sorokɔ ne bere. Ɛsɛ sɛ adetɔfo te saa nneɛma yi ase anaasɛ wɔpow address no.
- **`0xE2`–`0xFC` (unassigned MUST-understand metadata):** ɛsɛ sɛ adetɔfoɔ po address no sɛ wɔhyia adeɛ a wɔnhunu wɔ saa kwan yi mu a.

Wɔ receiver ahodoɔ a wonim no ho no, hwɛ sɛ encoded tenten no ne type no content tenten a wɔakyerɛ no hyia. Wɔ metadata nneɛma ho no, fa wɔn encoded compact-size tenten di dwuma de kyerɛ emu nsɛm tenten. Pow nsɛm a wɔatwitwa anaa baiti biara a edi akyi.

**Preferred receiver order.** Sɛ address bi parse yie a, ɛsɛ sɛ wallet anaa payment adwinnadeɛ bi paw receiver a ɛyɛ papa wɔ saa nhyehyɛeɛ yi mu: Orchard, afei Sapling, afei transparent.

---

## Mmara a ɛyɛ ahyɛde a ɛfa ZIP-316 a wɔpow ho

**Decoding yie no mma address bi nyɛ adwuma.** Official Zcash wallets pow address ahorow a ɛto mmara a edidi so yi so denneennen. Ɛsɛ sɛ wɛbsaet nnwinnade nso pow wɔn na wɔasiw sikatua a entumi nyɛ yiye ano:

- **Missing shielded receivers:** Address no **ɛsɛ sɛ** anyɛ yiye koraa no, Sapling anaa Orchard receiver biako na ɛwɔ mu. UA a ɛwɔ receivers a ɛda adi nkutoo no nyɛ adwuma wɔ ZIP-316.
- **Duplicate typecodes:** Ebia receiver type biara bɛpue anyɛ yie koraa no pɛnkoro.
- **Typecodes a wɔanhyehyɛ:** Ɛsɛ sɛ agyefoɔ no pue wɔ typecode nhyehyɛeɛ a ɛkɔ soro katee mu.
- **Conflicting transparent receivers:** UA betumi akura P2PKH anaa P2SH, nanso **ɛnyɛ abien no nyinaa da**.
- **Malformed entries anaa padding:** Ɛsɛ sɛ network prefixes a ɛnhyia, payloads a wɔatwa, anaa tenten a ɛnhyia no kanyan pow ntɛm ara.
- **Typecodes a wonnim:** Ɛsɛ sɛ adetɔfo bu wɔn ani gu nneɛma a wonnim so gye nneɛma a ɛwɔ metadata kwan a ƐSƐ sɛ wɔte ase (`0xE0`–`0xFC`), a ɛsɛ sɛ wɔpo bere a wonhu no. Wɔ mprempren dinkyerɛw mu no, `0xE0` ne `0xE1` wɔde expiry types ama, bere a `0xE2`–`0xFC` yɛ a wɔmfa wɔn nsa nhyɛ mu. Wɔ ahofadi mu no, pow address biara a ɛdi nkogu wɔ mmara a ɛyɛ ahyɛde a ɛwɔ atifi hɔ no mu, a ahwehwɛde a ɛfa Sapling anaa Orchard agyefo ho ka ho.

---

## Nneyɛe a eye sen biara ma developers

- **Fa toto parsed receivers ho, ɛnyɛ raw strings.** Di kan decode addresses ansa na woahwɛ sɛ ɛyɛ pɛ.
- **Fa nhomakorabea ahorow a wɔahwɛ so di dwuma ma biribiara a edi sika ho dwuma.** Compile official Rust crates (te sɛ `zcash_address`) kɔ WebAssembly sen sɛ wode JavaScript decoder ahorow a wɔahyɛ da ayɛ no bedi dwuma.
- **Hwɛ yie wɔ parsers a wɔde nsa akyerɛw ho.** Sɛ wokyerɛw bi sɛ wobɛsua a, fa no sɛ adesua adwuma na sɔ hwɛ wɔ official vectors a ɛwɔ aseɛ ha no ho ansa na wode biribiara agye mu.

---

## Official specifications ne reference implementations

- **[ZIP-316: Address a Wɔaka abom ne Nsafoa a Wɔde Hwɛ](https://zips.z.cash/zip-0316)**
- **[zcash_address adaka (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble adaka (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Official sɔhwɛ vectors:**
  - [F4Jumble sɔhwɛ vectors](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Unified Address sɔhwɛ vectors](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Nsɛmfua Nkyerɛase

| Asɛmfua | Kyerɛ |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Address biako ahama a ɛboaboa agyefo pool ahorow pii ano. |
| **Receiver** | Beae pɔtee a wɔde tua ka (a ɛda adi, Sapling, anaa Orchard). |
| **Bech32m** | Text encoding nhyehyɛe a wɔde di dwuma ma UA nhama. |
| **HRP** | Ɔfã anaa network prefix a onipa betumi akenkan (`u` or `utest`). |
| **F4Jumble** | Reversible obfuscation algorithm a ɛhwɛ hu sɛ address no yɛ pɛ. |
| **Typecode** | Nnɔmba a ɛwɔ entry biara mu a ɛkyerɛkyerɛ receiver type a ɛwɔ payload no mu. |
| **Malleability** | Address bytes a wɔsesa a wɔmma ho kwan a wonhu. |

Hwɛ nso: [Nneɛma a Wɔde Hwɛ Nneɛma](./Viewing_Keys.md)
