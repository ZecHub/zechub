<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kedu adreesị Zcash TEX?

## TL;DR

* Adreesị TEX bụ adreesị Zcash doro anya nke e dere n'ụdị dị iche. Ọ na-amalite site na `tex1` ma a kọwara ya na [ZIP 320](https://zips.z.cash/zip-0320).
* Ọ na-agwa obere akpa gị otu ihe: kwụọ adreesị a naanị site na ego doro anya.
* Ọ bụrụ na ego gị dị n'ime akpa gị, obere akpa dakọtara ga-emere gị nzọụkwụ abụọ. Ọ ga-ebuga ego ahụ gaa na adreesị nwa oge doro anya, wee ziga ya na adreesị TEX.
* Na 2023, Binance rịọrọ ndị obodo Zcash ka ha jụ itinye ego echekwara ma weghachite ha. Adreesị TEX bụ azịza ya, Binance bụkwa mgbanwe na ZecHub [Mgbanwe Ụlọ Nlereanya](/using-zcash/custodial-exchanges) ndepụta nke na-ewe ego TEX.
* Nkwado amụbaala n'akụkụ izipu ozi: Coinbase na-ekwe ka ndị ọrụ ya ziga ZEC na adreesị TEX, ngwaọrụ akpa ego agbakwunyela nkwado ZIP 320.
* Ịkwụ ụgwọ na adreesị TEX bụ ihe ọha na eze na blockchain, dịka ịkwụ ụgwọ ọ bụla doro anya. Ihe fọdụrụ n'ime ego nchekwa gị na-anọgide na nzuzo.

## Nkọwa Isi

Adreesị Zcash TEX bụ ụdị adreesị nnata pụrụ iche. TEX pụtara "Transparent Exchange". Ọ bụ nhazigharị Bech32m nke otu adreesị p2pkh Transparent. Adreesị TEX na-amalite na `tex1` ma ha bụ ụdị dị iche na Adreesị Ndị Dị n'Otu.

Adreesị TEX na-agwa obere akpa dakọtara ka ọ rụọ azụmahịa Transparent-Naanị (T -> T). 

Usoro a dị otu a: Mgbe obere akpa dakọtara chọpụtara Adreesị TEX, ọ na-agbanwe ya iji nweta onye nnata Transparent nke dị na ya. Obere akpa ahụ na-eziga ego achọrọ maka tx site na ọdọ mmiri Shielded gaa na adreesị Transparent dị iche, nke onye ọrụ na-achịkwa, nke ephemeral (Z -> T). Ọ na-eziga ego ndị ahụ na onye nnata Transparent nke adreesị TEX (T -> T). 

A kọwara atụmatụ teknụzụ maka adreesị TEX na Zcash [ZIP 320](https://zips.z.cash/zip-0320), nke na-akọwa ụdị adreesị naanị maka ịnata ego site na Adreesị Na-enweghị Ntụgharị.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Kedu ka esi eji adreesị TEX eme ihe?

Nnabata nwa ka bụ akụkụ nke obere ihe, mana ọ bụghịzi naanị otu mgbanwe. Ọrụ abụọ dị iche iche kwesịrị ikewapụ:

* **Ịnye adreesị nkwụnye ego TEX.** Binance bụ mgbanwe na anyị [Mgbanwe Ụlọ Nlereanya](/using-zcash/custodial-exchanges) depụta adreesị TEX maka nkwụnye ego, ka ego wee si n'ebe doro anya bịa ([ZIP 320, Ndabere](https://zips.z.cash/zip-0320#background)ZIP 320 anaghị atụ anya na mgbanwe ndị ọzọ ga-enye adreesị TEX ọ gwụla ma ha chọrọ ịma adreesị nke ịkwụ ụgwọ si.
* **Izipu ozi na adreesị TEX.** Nke a bụ akụkụ nke torola eto. Na Ọktoba 2024, Coinbase kwupụtara na ndị ọrụ Coinbase.com nwere ike izipu Zcash na adreesị TEX ([Nkwupụta Coinbase Akụ](https://x.com/CoinbaseAssets/status/1844428577921507416)). Ngwa nchekwa akpa ego agbakwunyela nkwado ZIP 320: KeepKey tinyere ntinye aka maka azụmahịa TEX na firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), na XChainJS `zcash-js` e mechachara ọbá akwụkwọ ahụ mgbe ọ jụrụ ịdị irè `tex1` ndị nnata (ihe ndị ọzọ gbasara nke ahụ n'okpuru).

Ya mere, adreesị TEX abụghị ihe zuru ụwa ọnụ, mana onye na-agụ akwụkwọ ekwesịghị iche na Binance bụ naanị ebe ha pụtara.

### Kedu mgbe m chọrọ adreesị TEX

#### Ị chọrọ adreesị TEX mgbe ị na-eziga ego na adreesị Transparent site na iji obere akpa ego nke na-anaghị akwado izipu ozugbo na adreesị Transparent.

Ụfọdụ obere akpa ego anaghị ekwe ka e ziga ya ozugbo na adreesị Transparent, onye nnata ahụ nwekwara ike ọ gaghị enye ihe yiri TEX. Ya mere, a pụrụ ịchọ ịgbanwe site na adreesị Transparent gaa na adreesị TEX mgbe ụfọdụ. Enwere ike ime nke a n'aka site na iji aka mee ihe e depụtara na ntinye aka [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Ị chọrọ adreesị TEX mgbe ị na-eziga ego na mgbanwe etiti nke chọrọ ka ego ndị ahụ si na isi iyi Transparent.

[Binance](https://www.binance.com/) bụ ihe mere adreesị TEX ji dịrị. Na Nọvemba 2023, ọ gwara ndị obodo Zcash na enwere ike iwepụ ZEC ma ọ gwụla ma enwere ụzọ isi jụ itinye ego na adreesị echekwara ma weghachite ha nye onye na-etinye ego ([ZIP 320, Ndabere](https://zips.z.cash/zip-0320#background)ZIP 320 anaghị atụ anya na mgbanwe ndị ọzọ ga-enye adreesị TEX ọ gwụla ma ha chọrọ ịma adreesị nke ịkwụ ụgwọ si. Binance bụ mgbanwe na anyị [Mgbanwe Ụlọ Nlereanya](/using-zcash/custodial-exchanges) ndepụta nke na-ebuga ego na adreesị TEX.
Adreesị TEX na-agwa obere akpa dakọtara na ego niile e zigara na adreesị ahụ ga-edo anya ma wepụ uru ọ bụla echekwara na adreesị ahụ.
Ọ bụrụ na mgbanwe dịka Binance ajụ uru ezitere, o nwere ụzọ dị mkpa iji weghachite uru ahụ na adreesị o si bịa. Ọ na-enyekwa aka n'iwu na ụkpụrụ Binance ma ọ bụ ndị ọchịchị ndị ọzọ tinyere.

### Kedu obere akpa ego na-akwado adreesị TEX?

Ị nwere ike ịhụ ndepụta kachasị ọhụrụ na anyị [obere akpa ego](/using-zcash/wallets) peeji. Jiri nzacha adreesị TEX.

## Anya / Ihe atụ

Chee echiche banyere ego ị ga-etinye n'ime ihe nchekwa dị n'ụlọ. Ọ dịghị onye nọ n'èzí nke nwere ike ịhụ ego ole dị n'ime ya.

Mgbanwe dịka Binance nwere akara n'elu ihe e ji akwụ ụgwọ: a na-anabata ụgwọ naanị n'ime envelopu doro anya, ka onye na-akwụ ụgwọ wee hụ ebe ego ahụ si bịa ma nyeghachi ya ma ọ bụrụ na ọ dị mkpa. Adreesị TEX bụ akara ahụ.

Mgbe obere akpa gị hụrụ akara ahụ, ọ na-ewepụ ego ahụ n'ime nchekwa ahụ, tinye ya n'ime envelopu doro anya nke nwere adreesị nloghachi gị (adreesị nwa oge doro anya), ma buru envelopu ahụ gaa na counter. Nchekwa ahụ na-anọ n'ime mkpọchi, ọ dịghịkwa onye ga-amata ihe ọzọ dị na ya.

## Mmiri miri emi

### Otu esi ewu adreesị TEX

Adreesị doro anya nkịtị na-amalite na `t1` nwere hash igodo 20-byte, nke e dere na Base58Check. Adreesị TEX nwere otu byte 20 ahụ, e tinyere koodu ọzọ na Bech32m na prefix `tex` (`textest` na testnet). Ịtụgharị otu gaa na nke ọzọ na-ewe ahịrị koodu ole na ole, nke ZIP 320 na-egosi na mmejuputa ya.

Nhazi dị mfe ahụ bụ ihe Binance: mgbanwe ahụ ga-eji naanị ọbá akwụkwọ Base58Check na Bech32m dị na koodu mmalite nke mgbanwe ahụ. Mpempe akwụkwọ ZIP 320 nke mbụ wuru echiche ahụ n'ime Adreesị Unified, a tụfukwara ụdị ahụ n'ihi nke a.

Adreesị TEX gbaziri koodu Bech32m site na usoro Unified Adreesị mana ọ fọrọ nke nta ka ọ ghara inwe nhazi ọ bụla. Ọ bụrụ na ị bụ onye ọhụrụ na Bech32m na otu esi akwado adreesị Zcash, [Adreesị Ndị Ejikọtara Ọnụ](/using-zcash/unified-addresses) peeji na-ekpuchi ihe ndị bụ isi dị n'okpuru [ZIP 316](https://zips.z.cash/zip-0316)Adreesị TEX dị iche na Adreesị Njikota n'ụzọ anọ doro anya:

| | Adreesị Ejikọtara Ọnụ (ZIP 316) | Adreesị TEX (ZIP 320) |
|---|---|---|
| Ihe ọ na-ejide | ọtụtụ ndị nnata ejikọtara ọnụ | otu onye nnata P2PKH doro anya |
| Mmalite nke mmadụ nwere ike ịgụ (HRP) | `u` (isi netwọk) | `tex` (`textest` na testnet) |
| F4 Jumble obfuscation | ee | no |
| Koodu ụdị maka onye nnata ọ bụla | ee | no |

Na nkenke, adreesị TEX bụ ihe mkpuchi Bech32m kachasị mfe: otu hash igodo doro anya, a `tex` prefix, na ihe ọ bụla ọzọ.

### Iwu njikwa maka obere akpa ego na ndị na-ejikọta ọnụ

Nke a bụ akụkụ nke mmejuputa iwu na-ezighi ezi, yabụ ọ bara uru ikwu nke ọma. Mgbe achọpụtara adreesị TEX, obere akpa ego ma ọ bụ ihe njikọta **agaghị emefu ego site na ọdọ mmiri echekwara ozugbo gaa ebe TEX na-aga.** ZIP 320 chọrọ ka ntinye ọ bụla na ụgwọ TEX doo anya, yabụ a na-ewu ụgwọ ahụ dị ka usoro abụọ:

1. **Deshield.** Bufee ego ahụ site na ọdọ mmiri e ji kpuchie gaa na adreesị ọhụrụ, nke onye ọrụ na-achịkwa nke ọma nke obere akpa ahụ nwere (Z -> T).
2. **Zipu ihe na-egosighi ihe ọ bụla ka ọ bụrụ ihe na-egosighi ihe ọ bụla.** Tinye ihe ahụ e wepụtara n'oge na-adịghị anya na ihe nnata P2PKH nke e dekọrọ n'ime adreesị TEX (T -> T).

Iwu ole na ole na-eme ka nke a dị nchebe, ihe niile sitere na ZIP 320:

* A ga-esi n'okwu mkpụrụ gị nweta adreesị ephemeral ahụ, ka ọ bụrụ na mgbanwe ahụ eweghachi ego ahụ, obere akpa gị ka nwere ike ịchọta ma mefuo ha.
* A ga-eji adreesị ọhụrụ eme ihe oge ọ bụla, yabụ na a gaghị ejikọta ụgwọ dị iche iche na ibe ha.
* Azụmahịa nke abụọ kwesịrị imefu naanị ntinye doro anya, yabụ mgbanwe ahụ na-ahụ nkwụnye ego doro anya site na nke doro anya.

A na-egosi mgbanwe na usoro nzọụkwụ abụọ na [Mmejuputa ntụaka ZIP 320](https://zips.z.cash/zip-0320#reference-implementation)Ihiehie nke a bụ nsogbu dị adị n'oge na-adịbeghị anya: na Ọktoba 2026 XChainJS `zcash-js` ọbá akwụkwọ a jụrụ dị irè `tex1` ndị nnata nwere njehie "Adreesị 'na-ezighi ezi', n'ihi na ihe nkwado ya nabatara naanị Base58Check `t1` ụdị, nke mebiri ego ZEC na ọrụ ndị na-ebipụta `tex1` adreesị ([mbipụta #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)E doziri ya site n'ịkụziri onye na-akwado ya ka ọ nabata koodu ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Ihe ozi TEX na-ekpughe

Ụgwọ TEX bụ ịkwụ ụgwọ doro anya, yabụ ọ bụ maka ọha, mana ọ bara uru ịkọwa kpọmkwem ihe onye na-ekiri nwere ike ịhụ na ihe ọ na-apụghị ịhụ.

Ihe a na-ahụ anya** n'usoro:

* Adreesị ahụ na-apụta ìhè nke na-adịghị agbanwe agbanwe, ebe ọ bụ na ọ na-apụta dị ka mmepụta nke nzọụkwụ deshield na ntinye nke izipu ikpeazụ.
* Ego abụọ a: uru nke hapụrụ ọdọ mmiri a na-echebe na nzọụkwụ Z -> T, na uru e nyere na nzọụkwụ T -> T.
* Onye nnata doro anya nke mgbanwe ahụ, nke bụ adreesị P2PKH nke e tinyere na adreesị TEX.

Ihe na-anọ **ezo ezo**:

* Ihe fọdụrụ n'ime ego nchekwa gị, na akwụkwọ ndetu ndị a kapịrị ọnụ nke e ji kpuchie ụgwọ ahụ. Nzọụkwụ deshield ahụ na-egosi na *ụfọdụ* uru hapụrụ ọdọ mmiri ahụ gaa na adreesị ephemeral, ọ bụghị ebe ọ si n'ime ọdọ mmiri ahụ pụta.

Ya mere, onye na-ekiri ihe nwere ike ijikọ adreesị ephemeral na ụgwọ mgbanwe (otu ego ahụ, nke doro anya na nke doro anya) ma hụ na e tinyere ya n'elu site na mwepụ echekwara. Ha enweghị ike ijikọ ya na ego ma ọ bụ ihe omume gị ndị ọzọ echekwara. Ọ dịghị ihe dị n'usoro na-egosi ịkwụ ụgwọ ahụ dị ka izipu "TEX": dị ka ndetu ZIP 320, ịkwụ ụgwọ na adreesị TEX enweghị ike ịmata ọdịiche dị n'etiti ịkwụ ụgwọ na nke dakọtara `t1` adreesị, n'ihi na iwu nkwekọrịta anaghị agbanwe agbanwe, iwu ahụ dum dịkwa n'ime obere akpa ego.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Ihe blockchain na-egosi

Iwu TEX dị na obere akpa ego. Nodes anaghị enyocha ya, yabụ iwu nkwekọrịta na-anọgide otu. N'usoro agbụ, ịkwụ ụgwọ na adreesị TEX yiri otu ịkwụ ụgwọ maka ndakọrịta `t1` Adreesị. Ego ahụ, adreesị e mere ka ọ dị obere, na adreesị mgbanwe ahụ bụ ihe ọha na eze, dịka ọ dị na azụmahịa ọ bụla doro anya.

## Peeji ndị metụtara ya

- [Adreesị Ndị Ejikọtara Ọnụ](/using-zcash/unified-addresses): nke `u1` Usoro adreesị n'okpuru ZIP 316, yana isi ihe Bech32m na-eji adreesị TEX eme ihe ọzọ.
- [Mgbanwe Ụlọ Nlereanya](/using-zcash/custodial-exchanges): mgbanwe ndị a na-anabata ụdị adreesị ndị a, gụnyere ego Binance's TEX.
- [Obere akpa](/using-zcash/wallets): jiri nzacha adreesị TEX chọta obere akpa ndị nwere ike ịkwụ ụgwọ adreesị TEX.
- [Ọdọ Mmiri E Kpuchiri Ekpuchi](/using-zcash/shielded-pools): ebe ego nkeonwe gị dị tupu ịkwụ ụgwọ TEX ewepụ akụkụ ya.
- [Ònye Nwere Ike Ịhụ Ụgwọ Zcash Gị](/start-here/who-can-see-your-zcash-payment): ihe na-apụta ìhè ozugbo ego si n'ọdọ mmiri ahụ pụọ.
- [Ihe Onye Nchọgharị Block Nwere Ike Ịhụ](/zcash-tech/what-a-block-explorer-can-see): otu esi akwụ ụgwọ doro anya si apụta n'usoro.
- [Arịrịọ Ịkwụ Ụgwọ Zcash URIs](/using-zcash/payment-request-uris): ọkọlọtọ obere akpa ego ọzọ maka ịkwụ ụgwọ e jupụtaburu.

**Emelitere ikpeazụ:** Ọktoba 2026
