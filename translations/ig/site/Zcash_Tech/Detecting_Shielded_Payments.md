# Ịchọpụta ịkwụ ụgwọ nke e chebere echebe: ego ole nyocha na-efu

Azụmahịa na-anabata ZEC nke e chebere echebe ga-achọta ịkwụ ụgwọ ndị na-abata. N’ime pool Oha, nke ahụ bụ ịchọ ndeksi. N’ime pool ndị e chebere echebe, ọ dịghị onye nwere ike ịmepụta ndeksi ịkwụ ụgwọ site na Adreesị akpa ego, ya mere e-akpa ego ma ọ bụ sistemụ azụ azụ ga-anwale mmepụta nke e chebere echebe ọ bụla dị na chain site na iji igodo nke ya. Ibe a na-akọwa otu nke a si arụ ọrụ, ego ole ọ na-efu, na otu a ga-esi họrọ nhazi akaụntụ nke na-achịkwa ụgwọ ahụ.

## TL;DR

* Ego nyocha nke ihe e chebere echebe na-abawanye dabere n’ọnụọgụ **igodo viewing key** ị na-enyocha, ọ bụghị ọnụọgụ Adreesị akpa ego ị na-enye ndị mmadụ
* Otu akaụntụ nwere ike inye onye ahịa ma ọ bụ akwụkwọ ọnụahịa ọ bụla Adreesị akpa ego dị iche iche, nke Ihe na-apughi ijikọ ọnụ, na-enweghị ụgwọ nyocha ọzọ
* Igodo viewing key na-egosi **akaụntụ ya dum**. Ọ bụrụ na onye nyocha ga-ahụ naanị otu onye ahịa, onye ahịa ahụ ga-enwerịrị akaụntụ nke ya, akaụntụ ọ bụla agbakwunyere na-emekwa ka ọrụ nyocha na block ọ bụla bawanye
* Hazie ihe nyocha maka **block zuru ezu**, ọ bụghị nkezi. Mainnet na-emepụta ọtụtụ block ndị fọrọ nke nta ka ha jupụta
* Tụọ ụgwọ otu nnwale na ngwaike nke gị tupu i kpebie nha ihe ọ bụla

## Ihe kpatara na enweghị ike ịmepụta ndeksi maka ịkwụ ụgwọ nke e chebere echebe

Maka Adreesị akpa ego Oha, node nwere ike ịgụ Adreesị akpa ego dị na mmepụta ọ bụla ma wuo ndeksi jikọtara Adreesị akpa ego na mmepụta. Zebra na-enye nke a site na `getaddressutxos` na `getaddresstxids`.

Omume nke e chebere echebe enweghị Adreesị akpa ego a pụrụ ịgụ. O nwere commitment nke note, igodo ọha nwa oge na note ezoro ezo. Ọ dịghị ihe dị na byte ndị a na-egosi onye a na-akwụ ụgwọ ahụ, ya mere node ma ọ bụ [indexer](Lightwallet_Nodes.md) enweghị ike iwupụta ndeksi Adreesị akpa ego.

Ya mere, nchọpụta na-arụ ọrụ n’ụzọ ọzọ. E-akpa ego na-ewere mmepụta nke e chebere echebe ọ bụla ma jụọ “nke a ọ bụ nke m?” site n’ịgbalị imeghe nzobe ya. A na-akpọ nke a **imeghe nzobe nnwale**. [Viewing keys](Viewing_Keys.md) na-akọwa ihe igodo ndị ahụ na-ekpughe, ebe [Zcash imekọrịta e-akpa ego](Zcash_Wallet_Syncing.md) na-akọwa otu e-akpa ego si hazie ọrụ ahụ.

## Otu nnwale si arụ ọrụ

Maka ụdị omume Orchard-protocol, nke pool Orchard na Ironwood abụọ na-eji:

1. **Nkwekọrịta igodo:** mụbaa igodo ọha nwa oge nke omume ahụ site na igodo nlele na-abata gị. Nke a bụ ịmụba scalar na Pallas curve, ọ bụkwa ya na-akpata ọtụtụ n’ime ụgwọ ahụ
2. **Mwepụta igodo:** were nzuzo e kekọrịtara mepụta igodo symmetric site na hash
3. **Meghee nzobe byte 52 mbụ** nke note: diversifier, uru na `rseed`
4. **Wughachi commitment nke note** site n’ihe i meghere nzobe ya
5. **Tụnyere** ya na `cmx` nke omume ahụ. Ọ bụrụ na ha dakọtara, note ahụ bụ nke gị

Ị ga-amata ma note ahụ ọ̀ bụ nke gị naanị na nzọụkwụ 5, ya mere **nnwale na-enweghị dakọtara na-efu ihe dịka nnwale dakọtara**. Ihe fọrọ nke nta ka ọ bụrụ omume niile dị na chain bụ nke onye ọzọ, ya mere ihe fọrọ nke nta ka ọ bụrụ ọrụ niile bụ nnwale na-enweghị dakọtara.

## Usoro mgbakọ ụgwọ

```text
work per block = K × I × A × t

K  accounts you watch
I  incoming viewing keys per account (2: external and internal)
A  shielded actions in the block
t  time for one trial on one core
```

Enweghị ihe gbasara Adreesị akpa ego na usoro a. E-akpa ego na-anwale igodo mpụga (Adreesị akpa ego ị na-enye ndị mmadụ) na igodo ime (ego mgbanwe), nke a mere `I = 2`. Ị nwere ike ịhụ nke a n’ime loops `for scope in [Scope::External, Scope::Internal]` dị na librustzcash’s `zcash_client_backend/src/scanning.rs`.

[ZIP 218](https://zips.z.cash/zip-0218) na-amachi omume nke e chebere echebe ka ha ghara ịkarị **330 n’ime block ọ bụla**, ya mere `A` agaghị akarị 330.

## Adreesị dị iche iche: ọtụtụ Adreesị akpa ego, otu igodo

Adreesị Orchard-protocol bụ diversifier `d` (byte 11) tinyere igodo nnyefe e si n’otu igodo nlele na-abata ahụ mepụta. [ZIP 32](https://zips.z.cash/zip-0032) na-eji nzobe FF1 emepụta diversifier ọ bụla site na ndeksi nwere bit 88, ya mere otu akaụntụ nwere **Adreesị akpa ego 2^88**, ma nke ọ bụla n’ime ha dabara na protocol Orchard.

Nke a na-enye sistemụ azụ azụ ịkwụ ụgwọ uru abụọ:

* **Enweghị ike ijikọ Adreesị akpa ego ndị ahụ.** Ọ bụrụ na mmadụ enweghị igodo viewing key, Adreesị akpa ego abụọ dị iche iche sitere n’otu akaụntụ na-adị ka à ga-asị na ha bụ nke e-akpa ego abụọ dị iche
* **Ịkwụ ụgwọ na-ejikọta na akwụkwọ ọnụahịa n’enweghị tebụl ndeksi.** Mgbe imeghe nzobe nnwale gara nke ọma, note e meghere nzobe ya nwere `d`. Igodo diversifier nke akaụntụ na-emeghe nzobe `d` iji nwetaghachi ndeksi ya, ya mere ọ bụrụ na ndeksi ahụ bụ nọmba akwụkwọ ọnụahịa gị, ị ga-amata akwụkwọ ọnụahịa a kwụrụ

Tinye Adreesị akpa ego ọ bụla n’ime [adreesị jikọtara ọnụ](../Using_Zcash/Unified_Addresses.md) ([ZIP 316](https://zips.z.cash/zip-0316)) tupu igosi ya onye ahịa.

## Ihe a ga-echebara echiche: igodo viewing key na-egosi akaụntụ dum

Ị nweghị ike ibelata igodo viewing key ka o metụta naanị otu Adreesị akpa ego dị iche iche, n’ihi na Adreesị akpa ego niile dị n’akaụntụ ahụ na-eji otu igodo. Ya mere, akaụntụ bụkwa ókè a na-eji ekpughe ozi. Onye ọ bụla nwetara igodo viewing key nke akaụntụ ga-ahụ ịkwụ ụgwọ niile e zigara na Adreesị akpa ego niile dị n’ime ya.

Nke a na-eme ka ihe atọ bụrụ otu mkpebi:

| Nhazi | Ego nyocha | Ihe onye nyocha nwere ike ịhụ |
|:--|:--|:--|
| Otu akaụntụ, Adreesị akpa ego dị iche iche maka onye ahịa ọ bụla | Otu igodo, n’agbanyeghị ọnụọgụ ndị ahịa | Ihe niile ma ọ bụ ihe ọ bụla |
| Otu akaụntụ maka onye ahịa ọ bụla | Otu igodo maka onye ahịa ọ bụla, na block ọ bụla | Otu onye ahịa n’otu oge |
| Otu akaụntụ maka onye ahịa na oge ọ bụla | Otu igodo maka onye ahịa na oge ọ bụla | Otu onye ahịa maka otu oge |

Họrọ nhazi akaụntụ tupu ịmalite. Ikewa akaụntụ ma emechaa pụtara ịkwaga ego ya n’akaụntụ ọhụrụ, nke na-efu ugwo ma na-emepụta usoro a pụrụ ịhụ.

## Ego ole ọ na-efu n’ezi ọrụ

Nọmba ndị a sitere n’otu kọmputa laptọọpụ core (Apple M3 Pro, ụdị e wuru maka mwepụta), site na iji `try_compact_note_decryption` sitere na `zcash_note_encryption` 0.5.1 na omume Ironwood n’ezie sitere na testnet:

| Ihe atụnyere | Uru |
|:--|:--|
| Otu nnwale, otu igodo n’otu oge | ihe dịka 82 µs |
| Otu nnwale, a chịkọtara ya n’ofe igodo 10 ma ọ bụ 100 | ihe dịka 42 µs |

Ịchịkọba na-ebelata ụgwọ ihe dịka ọkara, librustzcash’s ihe nyocha na-achịkọbakwa n’otu ihe kpatara ya.

Mgbe e nwere `t = 42 µs` na block zuru ezu nwere omume 330:

| Akaụntụ a na-enyocha | Oge core maka block zuru ezu | Core achọrọ iji na-enyocha block zuru ezu n’oge |
|:--|:--|:--|
| 1 | 28 ms | 0.001 |
| 1,000,000 (otu maka onye ahịa ọ bụla) | awa 7.7 | ihe dịka 1,109 |

Ọ bụrụ na otu nde ndị ahịa ahụ jiri Adreesị akpa ego dị iche iche n’otu akaụntụ, ọ ga-efu 28 ms maka block zuru ezu. Naanị ihe dị iche bụ ebe ókè akaụntụ dị.

## Hazie maka oge ọrụ na-arị elu, ọ bụghị nkezi

N’ime block mainnet 5,000 ruo n’ịdị elu 3,582,677 (nlele e mere na 17 Nọvemba 2026):

* 62% nke block enweghị mmepụta nke e chebere echebe, ọnụọgụ dị n’etiti bụkwa efu
* Nkezi bụ mmepụta nke e chebere echebe 12.3 n’ime block ọ bụla
* Block 153 dị n’etiti ịdị elu 3,579,935 na 3,580,346, ihe dịka awa atọ nke chain, nwere ihe karịrị mmepụta 250 n’otu n’otu, ọtụtụ mgbe na-esochi ibe ha. Ha nwere 75% nke mmepụta niile dị na nlele ahụ

Ihe nyocha e mere nha ya maka nkezi ga-ada azụ n’oge ọrụ dị otú ahụ na-arị elu. Hapụ ohere nchekwa (dịka ọmụmaatụ, mee atụmatụ iji ọkara nke oge sekọnd 25 nke block ọ bụla) ma hazie maka oke kacha elu.

## Block kọmpat na-enyere aka na bandwit, ọ bụghị na ọnụ ọgụgụ nnwale

E-akpa ego dị fechaa na-enyocha block kọmpat sitere na sava lightwallet. Omume kọmpat bụ byte 148, ebe nke zuru ezu bụ byte 820. Ọ na-edobe naanị ihe nnwale chọrọ: igodo nwa oge, byte 52 mbụ nke ciphertext, nullifier na `cmx`. A na-eziga data Oha naanị ma ọ bụrụ na onye ahịa rịọrọ ya.

Block kọmpat na-ebelata nha nbudata. Ha anaghị ebelata ọnụ ọgụgụ nnwale, n’ihi na a ka ga-eji igodo ọ bụla nwalee omume niile.

## Ndepụta nlele maka sistemụ azụ azụ ịkwụ ụgwọ

* Kpebie onye ga-achọ ịhụ ihe tupu ịmepụta akaụntụ
* Nye akwụkwọ ọnụahịa ọ bụla Adreesị akpa ego dị iche iche site n’otu akaụntụ ebe usoro ikpughe ozi kwere
* Jiri batching mepere emepe tụọ `t` na ngwaike nke gị
* Hazie nyocha nke ọnụ ọgụgụ kacha ọhụrụ maka omume 330 n’ime block ọ bụla, tinyekwa ohere nchekwa
* Kewaa nyocha ọzọ site n’ogologo elu n’ofe ndị ọrụ. Akụkọ gara aga anaghị agbanwe, ya mere nkewa a na-arụ ọrụ nke ọma
* Cheta na a ga-enyochakwa akaụntụ ọhụrụ ọ bụla laghachi azụ ruo n’ogo ịdị elu ụbọchị ọmụmụ ya

## Mụtakwuo

* [ZIP 218: oge ebumnuche maka block bụ sekọnd 25](https://zips.z.cash/zip-0218), tinyere oke omume maka block ọ bụla
* [ZIP 32: e-akpa ego hierarchical deterministic nke e chebere echebe](https://zips.z.cash/zip-0032)
* [ZIP 316: Adreesị jikọtara ọnụ na igodo viewing key jikọtara ọnụ](https://zips.z.cash/zip-0316)
* [Lightwallet protocol: compact_formats.proto](https://github.com/zcash/lightwallet-protocol/tree/main/walletrpc)
* [librustzcash](https://github.com/zcash/librustzcash): `zcash_client_backend` nyocha na `zcash_note_encryption`
* [Otu igodo viewing key, otu nde ndị ahịa](https://udokaam.dev/writing/one-viewing-key-a-million-customers/): nha zuru ezu, tinyere koodu ụlọ nyocha iji megharịa ya
