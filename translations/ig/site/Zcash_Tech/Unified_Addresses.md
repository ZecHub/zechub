# Nkwado Adreesị Ejikọtara Ọnụ (Unified Address) (ZIP-316)

*Nke a bụ ntuziaka mmụta, ọ bụghị decoder ejikọrọ ọnụ ma ọ bụ ọbá akwụkwọ Kwụọ ụhwọ a ga-edetuo ma mado. Ọ na-akọwa otú e si ahazi Adreesị Ejikọtara Ọnụ ka ị nwee ike ịghọta ihe ọbá akwụkwọ ndị a na-elekọta na-eme n'ime ya. Maka ihe ọ bụla na-ejikwa ezigbo ego, dabere na nkọwapụta [ZIP-316](https://zips.z.cash/zip-0316) na mmejuputa gọọmentị e jikọtara n'okpuru.*

---

## Nnukwu nkọwa

Adreesị Ejikọtara Ọnụ (UA) bụ otu ahịrị Adreesị akpa ego nke na-ebu ọtụtụ ụdị receiver: **Oha (Transparent)**, **Sapling**, **Orchard**, ma ọ bụ njikọta ha. E-akpa ego nke onye na-akwụ ụgwọ na-ahọrọ ozugbo pool receiver kacha mma ọ na-akwado.

Chee UA dịka envelopu e mechiri emechi nke nwere ọtụtụ kaadị e debere akara. Kaadị ọ bụla na-anọchi anya ụzọ dị iche iji ruo gị. Iji lelee Adreesị akpa ego, ngwa ga-emerịrị:

1. **Mepee envelopu ahụ:** Decode ahịrị ederede ahụ.
2. **Weghachite usoro ihe dị n'ime ya:** Kagbuo ngwakọta nchedo (**F4Jumble**).
3. **Gụọ kaadị ọ bụla:** Wepụ receiver nke ọ bụla.
4. **Mepụta iwu protocol:** Leghara ma ọ bụ jụ entries anya dabere na typecode range ha.

---

## Ihe mere “nanị decode Bech32m” anaghị ezu

UA na-eji usoro ederede Bech32m, mana naanị idecode Bech32m anaghị ekpughe receiver a pụrụ iji.

ZIP-316 na-akpachapụ anya agwakọta payload site na iji **F4Jumble** tupu encoding. F4Jumble na-eme ka ịgbanwe ọbụna naanị otu mkpụrụedemede n'ime Adreesị akpa ego gbanwee kpamkpam output e decode-rụrụ. Nke a na-egbochi mwakpo mgbanwe Adreesị akpa ego ebe onye mwakpo na-agbanwe bytes n'etiti Adreesị akpa ego mgbe prefix na suffix ka na-adị ka ha dị mma.

> **Iwu dị mkpa:** Nchedo mgbanwe na-arụ ọrụ naanị ma ọ bụrụ na ngwa gị emee pipeline decode na nkwado zuru ezu. Decode nke ezughị ezu na-ewepụ nchekwa ma hapụ ihe ize ndụ niile.

---

## Pipeline decode, nzọụkwụ site na nzọụkwụ

### Nzọụkwụ 1: Decode Bech32m ma lelee netwọk
- **Akụkụ mmadụ nwere ike ịgụ (Human-readable part, HRP):** `u` na-akọwa mainnet; `utest` na-akọwa testnet. *(UA mainnet na-amalite na `u1`, ebe `1` bụ separator Bech32.)*
- **Oke ogologo:** Bech32m ọkọlọtọ na-akwado oke mkpụrụedemede 90. UA na-agafekarị oke a, yabụ a ga-agbanyụrịrị nyocha ogologo ọkọlọtọ n'ime decoder.
- Gbanwee okwu Bech32m bit-5 laghachi na bytes bit-8 ọkọlọtọ.

### Nzọụkwụ 2: Tụgharịa F4Jumble
F4Jumble bụ netwọk Feistel round-4 e wuru na BLAKE2b:
- **Ogologo ọkara aka ekpe:** `min(64, floor(length / 2))` bytes. Oke bytes 64 kwekọrọ na oke output BLAKE2b nwere ike ịmepụta. Ọkara aka nri nwere payload fọdụrụ.
- **Ọrụ hash:** Na-atụgharị G na H site n'iji labels personalization a kapịrị ọnụ (`UA_F4Jumble_G` na `UA_F4Jumble_H`).
- **Usoro round:** Encoding n'ihu na-agba G(0) → H(0) → G(1) → H(1). Ntughari azụ (iwepu ngwakọta) na-agba H(1) → G(1) → H(0) → G(0).
- **Nlele range:** Jụ inputs dị n'èzí oke payload ZIP-316.

### Nzọụkwụ 3: Wepụ padding ma nyochaa HRP
Tupu ngwakọta, encoder na-etinye bytes 16 nwere HRP, nke e ji zeros mejupụta.
- Wepụ bytes 16 ikpeazụ mgbe i wepụchara ngwakọta.
- Kwenye na HRP e tinyere n'ime ya dabara na netwọk a tụrụ anya ya (`u` ma ọ bụ `utest`). Nke a na-egbochi ịnakwere Adreesị akpa ego testnet na mainnet n'amaghị ama.

### Nzọụkwụ 4: Wepụ receivers
Payload fọdụrụ nwere entries `(typecode, length, content)`, ebe a na-echekwa typecode na ogologo dịka integers compact-size (otu byte maka obere values). Typecode receiver amaara:

| Typecode | Ụdị receiver       | Ogologo ọdịnaya |
| :------- | :------------------ | :------------- |
| `0x00`   | Oha (P2PKH) | bytes 20       |
| `0x01`   | Oha (P2SH)  | bytes 20       |
| `0x02`   | Sapling             | bytes 43       |
| `0x03`   | Orchard             | bytes 43       |

N'azụ ndị a, ZIP-316 debere ranges abụọ ọzọ maka ndakọrịta n'ọdịnihu:

- **`0xC0`–`0xDF` (metadata na-abụghị MUST-understand):** consumers ga-eleghara items metadata ha anaghị amata n'ime range a anya.
- **`0xE0` na `0xE1` (metadata expiry MUST-understand e kenyere):** registry ZIP-316 dị ugbu a kenyere ndị a na height na oge expiry Adreesị akpa ego. Consumers ga-aghọta items ndị a ma ọ bụ jụ Adreesị akpa ego ahụ.
- **`0xE2`–`0xFC` (metadata MUST-understand e kenyebeghị):** consumers ga-ajụ Adreesị akpa ego ahụ ma ọ bụrụ na ha zutere item ha anaghị amata n'ime range a.

Maka ụdị receiver amaara, nyochaa na ogologo e encode-rụrụ dabara na ogologo ọdịnaya a kapịrị ọnụ maka ụdị ahụ. Maka items metadata, jiri ogologo compact-size ha e encode-rụrụ chọpụta ogologo ọdịnaya. Jụ entries e bipụtarala ma ọ bụ bytes ọ bụla fọdụrụ.

**Usoro receiver a họọrọ.** Ozugbo e parse-rụrụ Adreesị akpa ego nke ọma, e-akpa ego ma ọ bụ ngwá ọrụ Kwụọ ụhwọ kwesịrị ịhọrọ receiver kacha mma n'usoro a: Orchard, mesịa Sapling, mesịa Oha.

---

## Iwu ịjụ ZIP-316 a ga-agbasorịrị

**Idecode nke ọma anaghị eme Adreesị akpa ego ka ọ bụrụ nke ziri ezi.** E-akpa ego Zcash gọọmentị na-ajụ kpamkpam Adreesị akpa ego ndị mebiri iwu ndị a. Ngwá ọrụ Weebụ ga-ajụkwa ha iji gbochie ọdịda Kwụọ ụhgwọ:

- **Receiver nke e chebere echebe na-efu:** Adreesị akpa ego **ga-enwerịrị** opekata mpe otu receiver Sapling ma ọ bụ Orchard. UA nke nwere naanị receivers Oha ezighị ezi n'okpuru ZIP-316.
- **Typecodes oyiri:** Ụdị receiver ọ bụla nwere ike ịpụta naanị otu ugboro.
- **Typecodes na-adịghị n'usoro:** Receivers ga-apụta n'usoro typecode na-arịgo nke ọma.
- **Receivers Oha na-emegide ibe ha:** UA nwere ike ibu P2PKH ma ọ bụ P2SH, mana **ọ dịghị mgbe ha abụọ**.
- **Entries ma ọ bụ padding nwere ntụpọ:** Prefixes netwọk na-adabaghị, payloads e bipụtarala, ma ọ bụ ogologo na-adabaghị ga-ebute ịjụ ozugbo.
- **Typecodes anaghị amata:** Consumers ga-eleghara items ha anaghị amata anya belụsọ items nọ na range metadata MUST-understand (`0xE0`–`0xFC`), nke ha ga-ajụ mgbe ha anaghị amata ha. N'ime registry ugbu a, `0xE0` na `0xE1` bụ ụdị expiry e kenyere, ebe `0xE2`–`0xFC` e kenyebeghị. N'adabereghị na nke a, jụ Adreesị akpa ego ọ bụla nke dara iwu nkwado a ga-agbaso n'elu, tinyere ihe achọrọ maka receiver Sapling ma ọ bụ Orchard.

---

## Nrụọrụ kacha mma maka onye mmepụta (developer)

- **Tụnyere receivers e parse-rụrụ, ọ bụghị raw strings.** Decode Adreesị akpa ego mbụ tupu ịlele nha ha.
- **Jiri ọbá akwụkwọ a na-elekọta maka ihe ọ bụla na-ejikwa ego.** Compile crates Rust gọọmentị (dịka `zcash_address`) gaa WebAssembly kama ibipụta decoders JavaScript omenala.
- **Kpachara anya maka parsers ejiri aka dee.** Ọ bụrụ na ị dee otu maka ịmụ ihe, were ya dịka ọrụ ọmụmụ ma nwalee ya megide vectors gọọmentị dị n'okpuru tupu ịtụkwasị ya obi n'ihe ọ bụla.

---

## Nkọwapụta gọọmentị na mmejuputa ntụaka

- **[ZIP-316: Adreesị Ejikọtara Ọnụ na Viewing Keys](https://zips.z.cash/zip-0316)**
- **[zcash_address crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[f4jumble crate (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Vectors ule gọọmentị:**
  - [Vectors ule F4Jumble](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vectors ule Adreesị Ejikọtara Ọnụ](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Nkowa okwu

| Okwu | Ihe ọ pụtara |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Otu ahịrị Adreesị akpa ego na-achịkọta ọtụtụ pools receiver. |
| **Receiver** | Ụdị ebe Kwụọ ụhwọ pụrụ iche (Oha, Sapling, ma ọ bụ Orchard). |
| **Bech32m** | Usoro encoding ederede eji maka ahịrị UA. |
| **HRP** | Akụkụ mmadụ nwere ike ịgụ ma ọ bụ prefix netwọk (`u` ma ọ bụ `utest`). |
| **F4Jumble** | Algorithm obfuscation a pụrụ ịtụgharị azụ nke na-ahụ maka ịdị n'otu Adreesị akpa ego. |
| **Typecode** | Ọnụọgụ dị na entry ọ bụla nke na-akọwa ụdị receiver dị na payload. |
| **Malleability** | Mgbanwe bytes Adreesị akpa ego na-enweghị ikike na-enweghị achọpụta ya. |

Hụkwa: [Viewing Keys](./Viewing_Keys.md)
