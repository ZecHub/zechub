# Nkwenye Unified Address (ZIP-316)

*Nke a bụ ntuziaka mmụta, ọ bụghị ihe e ji akpọchi ihe ma ọ bụ akwụkwọ ndekọ ịkwụ ụgwọ. Ọ na-akọwa otu esi ahazi Unified Address ka i wee ghọta ihe ọbá akwụkwọ ndị a na-elekọta na-eme n'okpuru mkpuchi. Maka ihe ọ bụla na-ejikwa ego n'ezie, lezie anya na ya [Nkọwapụta ZIP-316](https://zips.z.cash/zip-0316) na mmejuputa iwu ndị e jikọtara n'okpuru.*

---

## Nnukwu foto ahụ

Unified Address (UA) bụ otu eriri adreesị nke nwere ọtụtụ ụdị nnata: **Transparent**, **Sapling**, **Orchard**, ma ọ bụ ngwakọta. Akpa ego na-akwụ ụgwọ na-ahọrọ akpaghị aka nke kacha mma nnata ọ na-akwado.

Were UA dị ka envelopu e mechiri emechi nke nwere ọtụtụ kaadị e dere aha. Kaadị ọ bụla na-anọchite anya ụzọ dị iche iche isi ruo gị aka. Iji lelee adreesị, ngwa ga-emerịrị:

1. **Mepee envelopu ahụ:** Detuo eriri ederede ahụ.
2. **Meghee ihe dị n'ime ya:** Meghee ihe nchekwa ahụ (**F4Jumble**).
3. **Gụọ kaadị ọ bụla:** Wepụta ndị nnata nke ọ bụla.
4. **Mee ka iwu usoro ihe omume sikwuo ike:** Lezie anya ma ọ bụ jụ ntinye dịka oke koodu ha si dị.

---

## Gịnị kpatara "naanị depụta Bech32m" ezughị oke

UA na-eji koodu ederede Bech32m eme ihe, mana naanị nkọwapụta Bech32m anaghị ekpughe ndị nnata nwere ike iji.

ZIP-316 na-eji **F4Jumble** akpachara anya na-achịkọta ibu ọrụ ahụ tupu e dee ya. F4Jumble na-eme ka ọ dị mma na ịgbanwe ọbụna otu mkpụrụedemede dị na adreesị ahụ na-agbanwe mmepụta edezi kpamkpam. Nke a na-egbochi mwakpo mgbanwe adreesị ebe onye mwakpo gbanwere byte n'etiti adreesị ebe ọ na-ahapụ prefix na mgbakwunye dị ka ihe ziri ezi.

> **Iwu dị mkpa:** Nchedo ịdị mfe na-arụ ọrụ naanị ma ọ bụrụ na ngwa gị na-arụ ọrụ zuru oke nke nhazi na nkwenye. Nhazi akụkụ na-ewepụ nchekwa ma na-echekwa ihe egwu niile.

---

## Usoro nhazi nke ọkpọkọ, nzọụkwụ site na nzọụkwụ

### Nzọụkwụ 1: Gbanwee Bech32m wee lelee netwọk ahụ
- **Akụkụ mmadụ nwere ike ịgụ (HRP):** `u` achọpụta isi netwọk; `utest` na-achọpụta testnet. *(Mainnet UAs na-amalite na `u1`, ebe `1` bụ ihe nkewa Bech32.)*
- **Oke ogologo:** Nhazi Bech32m na-eme ka oke mkpụrụedemede 90 dị. UA na-agafekarị oke a, yabụ a ga-agbanyụrịrị nlele ogologo ọkọlọtọ na dekoda.
- Gbanwee okwu Bech32m nke 5-bit laghachi azụ na byte 8-bit nkịtị.

### Nzọụkwụ nke 2: Gbanwee F4Jumble
F4Jumble bụ netwọk Feistel nke agba anọ nke e wuru na BLAKE2b:
- **Ọkara aka ekpe:** `min(64, floor(length / 2))` Okpu nke byte 64 kwekọrọ na oke mmepụta kachasị nke BLAKE2b. Ọkara aka nri nwere ibu ọrụ fọdụrụ.
- **Ọrụ Hash:** Na-agbanwe G na H site na iji akara njirimara ahaziri ahazi (`UA_F4Jumble_G` na `UA_F4Jumble_H`).
- **Ịhazi okirikiri:** Ịhazi n'ihu na-agba ọsọ G(0) → H(0) → G(1) → H(1). Ịgbanwe (unscrambling) na-agba ọsọ H(1) → G(1) → H(0) → G(0).
- **Nlele oke:** Jụ ntinye ndị dị n'èzí oke nha ibu ZIP-316.

### Nzọụkwụ nke 3: Wepụ ihe mkpuchi ahụ ma nyochaa HRP
Tupu a na-agbagharị, ihe ndeksi ahụ na-agbakwunye byte iri na isii nwere HRP, nke e ji efu kpuchie.
- Wepụ byte iri na isii ikpeazụ mgbe ị gbasasịrị ihe.
- Kwenye na HRP etinyere na-adakọ na netwọk a tụrụ anya ya (`u` or `utest`Nke a na-egbochi nnabata adreesị testnet na mainnet n'amaghị ama.

### Nzọụkwụ nke 4: Wepụta ndị nnata
Ibu ndị ọzọ fọdụrụ nwere `(typecode, length, content)` ntinye, ebe a na-echekwa koodu na ogologo dị ka ọnụọgụgụ dị obere (otu byte maka obere uru). Koodu ụdị nnata a ma ama:

| Koodu ụdị | Ụdị nnata       | Ogologo ọdịnaya |
| :------- | :------------------ | :------------- |
| `0x00`   | Ihe na-egosi ihe doro anya (P2PKH) | 20 bytes       |
| `0x01`   | Transparent (P2SH)  | 20 bytes       |
| `0x02`   | Sapling             | 43 bytes       |
| `0x03`   | Orchard             | 43 bytes       |

Karịa ndị a, ZIP-316 nwere oke abụọ ọzọ maka ndakọrịta n'ihu:

- **`0xC0`–`0xDF` (data ndị na-anaghị aghọta ihe ha na-ekwu):** Ndị ahịa ga-eleghara ihe metadata ha na-amaghị anya n'ókè a.
- **`0xE0` na `0xE1` (e kenyere ihe ndị a ga-aghọta tupu oge agwụ):** Ndekọ ZIP-316 dị ugbu a na-enye ndị a iji lebara anya n'ogologo na oge njedebe. Ndị ahịa ga-aghọta ihe ndị a ma ọ bụ jụ adreesị ahụ.
- **`0xE2`–`0xFC` (a ga-aghọtaghị metadata nke a na-enyeghị):** ndị ahịa ga-ajụ adreesị ahụ ma ọ bụrụ na ha ahụ ihe a na-amaghị na oke a.

Maka ụdị nnata a maara, lelee ma ogologo e tinyere koodu ahụ dabara na ogologo ọdịnaya nke ụdị ahụ akọwapụtara. Maka ihe metadata, jiri ogologo nha ha e tinyere koodu ahụ iji chọpụta ogologo ọdịnaya ahụ. Jụ ndenye e bepụrụ abepụ ma ọ bụ baịtị ọ bụla na-esote.

**Nhọrọ nnata a kacha amasị.** Ozugbo a tụlere adreesị nke ọma, obere akpa ma ọ bụ ngwa ịkwụ ụgwọ kwesịrị ịhọrọ onye nnata kacha mma n'usoro a: Orchard, wee Sapling, wee doo anya.

---

## Iwu ndị a na-ajụ maka ịjụ ZIP-316 dị mkpa

**Ịgbanwe koodu nke ọma anaghị eme ka adreesị dị irè.** Akpa Zcash gọọmentị na-ajụ adreesị ndị na-emebi iwu ndị a kpamkpam. Ngwaọrụ weebụ aghaghịkwa ịjụ ha iji gbochie ọdịda ịkwụ ụgwọ:

- **Ndị nnata echekwara efu:** Adreesị ahụ **ga-enwerịrị opekata mpe otu onye nnata Sapling ma ọ bụ Orchard. UA nwere naanị ndị nnata doro anya adịghị mma n'okpuru ZIP-316.
- **Koodu ụdịdị abụọ:** Ụdị nnata ọ bụla nwere ike ịpụta ihe karịrị otu ugboro.
- **Koodu ụdịdị a na-ahazighị ahazi:** Ndị nnata ga-apụta n'usoro koodu ụdịdị a na-arị elu nke ọma.
- **Ndị nnata na-anaghị agbagha agbagha:** UA nwere ike ịnwe P2PKH ma ọ bụ P2SH, mana **ọ bụghị ha abụọ**.
- **Ntinye ma ọ bụ padding na-adịghị mma:** Mbido netwọk ndị na-adabaghị adaba, ibu ọrụ e belatara, ma ọ bụ enweghị nkwekọ ogologo ga-akpalite ịjụ ozugbo.
- **Koodu ụdịdị a na-amaghị:** Ndị ahịa ga-eleghara ihe ndị a na-amaghị anya ma e wezụga ihe ndị dị na usoro metadata a ga-aghọtarịrị anya (`0xE0`–`0xFC`), nke ha ga-ajụ mgbe a na-amataghị ha. N'akwụkwọ ndekọ dị ugbu a, `0xE0` na `0xE1` e kenyere ụdị njedebe, ebe `0xE2`–`0xFC` enweghị onye ga-ekenye ha. N'onwe gị, jụ adreesị ọ bụla nke na-ada iwu ndị dị n'elu, gụnyere ihe achọrọ maka onye na-anata Sapling ma ọ bụ Orchard.

---

## Omume kacha mma maka ndị mmepe

- **Tụlee ndị nnata a gbanyere agbawa, ọ bụghị eriri ndị e ji aka dee.** Buru ụzọ kọwaa adreesị tupu ị lelee nha anya.
- **Jiri ọbá akwụkwọ echekwara maka ihe ọ bụla na-ejide ego.** Chịkọta igbe Rust gọọmentị (dị ka `zcash_address`) gaa na WebAssembly kama itinye ihe nhazi JavaScript omenala.
- **Kpachara anya na ihe ndị e ji aka dee.** Ọ bụrụ na ị dee otu ka ị mụta, were ya dị ka ọrụ ọmụmụ ihe ma nwalee ya na ihe ndị e dere n'okpuru tupu ị tụkwasị ya obi na ihe ọ bụla.

---

## Nkọwapụta gọọmentị na mmejuputa ntụaka

- **[ZIP-316: Adreesị na igodo nlele dị n'otu](https://zips.z.cash/zip-0316)**
- **[igbe adreesị zcash (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/zcash_address)**
- **[igbe f4jumble (librustzcash)](https://github.com/zcash/librustzcash/tree/main/components/f4jumble)**
- **Ndị na-anwale ule gọọmentị:**
  - [F4Jumble ule vektọ](https://github.com/zcash/librustzcash/blob/main/components/f4jumble/src/test_vectors.rs)
  - [Vektọ ule Unified Address](https://github.com/zcash/librustzcash/blob/main/components/zcash_address/src/kind/unified/address/test_vectors.rs)

---

## Nkọwa Okwu

| Oge okwu | Ihe ọ pụtara |
| :----------------------- | :-------------------------------------------------------------------- |
| **Unified Address (UA)** | Otu eriri adreesị na-ejikọta ọtụtụ ọdọ mmiri nnata. |
| **Receiver** | Ụdị ebe ịkwụ ụgwọ a kapịrị ọnụ (ihe doro anya, Sapling, ma ọ bụ Orchard). |
| **Bech32m** | Usoro ndetu ederede eji eme eriri UA. |
| **HRP** | Akụkụ mmadụ ma ọ bụ prefix netwọk a pụrụ ịgụ (`u` or `utest`). |
| **F4Jumble** | Algọridim obfuscation nke a na-agbanwe agbanwe na-ahụ na adreesị ziri ezi. |
| **Typecode** | Nọmba dị na ntinye ọ bụla nke na-akọwa ụdị onye nnata na ibu ọrụ. |
| **Malleability** | Mgbanwe na-enweghị ikike nke byte adreesị na-enweghị nchọpụta. |

Lee kwa: [Igodo Ilele](./Viewing_Keys.md)
