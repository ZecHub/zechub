<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Igodo Ilele

Adreesị e ji kpuchie ekpuchi na-enye gị ohere ịzụ ahịa ma na-ekpughe obere ihe o kwere mee na Zcash blockchain. Yabụ gịnị na-eme ma ọ bụrụ na ịchọrọ igosi otu onye kpọmkwem ihe ị nwere, ma ọ bụ ihe i zigara? Adreesị ọ bụla e ji kpuchie ekpuchi nwere igodo ikiri nke na-enye ohere ịnweta ọgụgụ na-enweghị inye ikike imefu ego. E tinyere igodo ikiri na [ZIP 310](https://zips.z.cash/zip-0310) ma tinye ya na protocol na nkwalite netwọkụ Sapling.

Igodo nlele bụ ngwaọrụ maka ikpughe ihe dị iche iche: ị na-ahọrọ onye na-ahụ ihe, ị naghịkwa enye ikike imefu ihe iji mee ya.

## Gịnị mere e ji eji igodo nlele?

Electric Coin Company's writing on the subject sets out the situations that come up most often, and they are still the common ones today:

- **Ịgbanwe ego na-ele anya maka ego e tinyere.** Mgbanwe ahụ na-ebunye igodo nlele na-abata na ebe nchọpụta ịntanetị ka o wee nwee ike ịhụ ego ndị ahịa na-etinye na adreesị echekwara, ebe igodo mmefu na-anọgide na ngwaike nke na-emetụghị netwọk ahụ aka.
- **Onye nlekọta na-egosi na o nwere ihe ọ bụla.** Onye nlekọta na-enye onye nyocha igodo nlele zuru oke maka adreesị ọ bụla e chebere. Onye nyocha nwere ike ịlele nguzozi ndị ahụ ma nyochaa ihe ndị mere n'oge gara aga gaa na site na adreesị ndị ahụ, ọ nweghịkwa ike ime ihe ọ bụla ọzọ.
- **Nlebara anya kwesịrị ekwesị na onye ọzọ.** Ebe mgbanwe ego kwesịrị inyocha akụkọ ihe mere eme nke onye ahịa dị ka akụkụ nke nyocha ka mma, ọ nwere ike ịrịọ maka igodo nlele kama ịchọ ego ahụ.

## Ihe igodo nlele na-eme na ihe ọ naghị ekpughe

E nwere ihe karịrị otu ụdị isi, ọdịiche dị na ya na-ekpebi ego ole ị na-enye.

| Igodo | Ndozi Okwu | Onyinye |
|---|---|---|
| Igodo nlele zuru oke ejikọtara ọnụ (UFVK) | `uview…` | Na-ahụ azụmahịa **na** na-abata maka ọdọ mmiri ọ bụla dị na akaụntụ ahụ |
| Igodo nlele na-abata nke ejikọtara ọnụ (UIVK) | `uivk…` | Na-ahụ naanị azụmahịa na-abata, maka ọdọ mmiri ọ bụla dị na akaụntụ ahụ |
| Igodo nlele zuru oke nke Sapling | `zxviews…` | Na-ahụ ọrụ Sapling na-abata na nke na-apụ apụ maka adreesị igodo ahụ |

Ọ dịghị nke ọ bụla n'ime ihe ndị a nwere ike imefu ego. Ha niile na-adịgide adịgide n'ụzọ dị mkpa: a pụghị icheta igodo ị nyere, naanị ihe ị ga-eme bụ ịbufe ego gaa na akaụntụ nke igodo onye nke ọzọ na-ejideghị.

Ọ dị mkpa ka ị mara ihe abụọ gbasara mkpughe tupu ị gwa ha ihe ọ bụla.

**Ịbata apụtaghị obere.** A na-eji igodo nlele abata eme ihe n'otu aka na akaụntụ ahụ dum, ọ bụghị n'otu adreesị a jụrụ gị. Ịbupụ UIVK maka otu adreesị Sapling ka na-enye ohere ịhụ ihe na-abata n'ime ọdọ mmiri ọ bụla dị na akaụntụ ahụ, yabụ ọ na-ekpughe ihe karịrị adreesị ọ kpọrọ aha. [Akwụkwọ Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) na-ekwu nke a nke ọma.

**Adreesị ebipụtara ekpugheela ụzọ ikiri ya na-abata nye onye iro ga-abịa n'ọdịnihu.** [ZIP 326](https://zips.z.cash/zip-0326) na-ekwu na onye iro nwere kọmputa quantum nwere ike nweta igodo nlele na-abata site na adreesị dị iche iche ebipụtara, nke a ga-ekwe omume n'ụzọ nke na-eme ka ị nweta igodo nullifier ghara ịdị. Ibipụta adreesị abụghị otu ihe ahụ dị ka ibipụta igodo nlele taa, mana ha abụọ nọdụrụ nso n'elu mbara igwe dị ogologo.

## Ịlele igodo mgbe Ironwood gasịrị

NU6.3 webatara ọdọ mmiri Ironwood nke e ji ihe nchebe kpuchie ma mee ka ọdọ mmiri Orchard bụrụ naanị ihe a na-emefu, ka ego wee si n'otu gaa na nke ọzọ na-agafe ka oge na-aga. [Osisi ígwè](/zcash-tech/ironwood) na [Ogwe aka ahụ](/zcash-tech/the-turnstile) maka mmelite ahụ n'onwe ya.

**E nyere igodo nlele tupu Ironwood agaa n'ihu na-arụ ọrụ mgbe njem ahụ gasịrị.** ZIP 326 na-akọwapụta na a na-eji usoro *protocol* nke onye nnata na-anabata ihe, na igodo nlele ya na-abata, enyocha ya na Orchard kama ịbanye n'ọdọ mmiri: otu igodo nlele ahụ na-abata na-akọwapụta ma ederede ederede Orchard-pool na nke Ironwood-pool. Zallet na-eme ya n'ụzọ ahụ, na-akọwa ndetu Ironwood dị ka nke Orchard ma jiri igodo nlele Orchard nke akaụntụ ahụ decryption n'okpuru ngalaba nzuzo note-encryption nke Ironwood.

Ihe atọ ga-esi na ya pụta nye onye ọ bụla ji ma ọ bụ nye igodo:

1. **Nhazi na-agagharị n'etiti ọdọ mmiri, onye na-ekiri ya na-ahụkwa ka ọ na-eme.** [ZIP 318](https://zips.z.cash/zip-0318) na-akọwapụta mbugharị dị ka usoro obere azụmahịa Orchard-to-Ironwood nke e mere n'oge a na-anaghị ahazi, nke ọ bụla na-emefu otu akwụkwọ Orchard ma na-emepụta otu mmepụta Ironwood nke otu akwụkwọ iwu. Onye nyocha na-ekiri ihe na-ekiri na-ahụ na ihe ndị e ji ejide ihe na-agbanwe site n'otu ọdọ mmiri gaa na nke ọzọ n'ime izu ole na ole, ọ bụghị n'otu mmegharị. Akpa ego nwere ike imegharị ọganihu mbugharị nke ya site na data yinye site na iji igodo nlele ya.
2. **Nzọụkwụ mbugharị ọ bụla na-egosi uru ọ na-eme.** Nke ahụ bụ ihe dị n'ime ịgafe ebe a na-atụgharị ihe, ọ bụkwa ya mere a ga-eji nyochaa mbugharị ahụ. Ikewa nguzozi ahụ n'ime otu okpukpe pụtara na ọ dịghị otu azụmahịa na-egosi nguzozi niile nke ọdọ mmiri Orchard.
3. **Akaụntụ e mepụtara mgbe Ironwood gasịrị nwere ike ịchọta igodo ha n'ụzọ dị iche iche.** [ZIP 2005](https://zips.z.cash/zip-2005) na-agbakwụnye `use_qsk` ọkọlọtọ maka igodo ndị a na-agbanwe agbanwe nke quantum, ọ na-agbanwekwa otu esi enweta igodo ndị na-abata, ndị na-apụ apụ na ndị na-agbanwe ihe, yabụ `use_qsk = true` igodo bụ igodo dị iche n'ezie. ZIP 326 chọrọ ka ọkọlọtọ ahụ dịrị otu n'ofe akaụntụ ma gbochie imepụta `use_qsk = true` igodo tupu NU6.3 arụ ọrụ na Mainnet. Ya mere, e si na akaụntụ dịbu adị tupu Ironwood ebupụ igodo `use_qsk = false` igodo, ma na-anọgide na-adị mma maka akaụntụ ahụ. Echela na igodo e si n'otu akaụntụ wepụta na-akọwa nke ọzọ.

## Mbupụ igodo nlele

### Zallet

[Zallet](https://github.com/zcash/zallet) bụ obere akpa zuru oke nke dochie obere akpa dị n'ime zcashd. Mbupụ na mbubata nke Viewing-key rutere na **v0.1.0-beta.2 (28 Julaị 2026)**, yabụ lelee ụdị gị mbụ; ihe owuwu mbụ enweghị usoro ndị a. Arụmụka ọ bụla mgbe aha usoro ahụ gasịrị ga-abụrịrị JSON ziri ezi, nke pụtara na uru eriri na-edebe nhota abụọ nke ha. [Nduzi Ntụaka Ngwa Ngwa Zallet](/using-zcash/zallet-quick-reference-guide) kpuchiri ụdị iwu izugbe.

Depụta ihe akpa ego ahụ nwere:

```bash
zallet rpc listaddresses
```

Bupụ igodo nlele zuru oke nke akaụntụ ahụ site na ịgafe adreesị ejikọtara ọnụ:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Bupụ igodo nlele nke akaụntụ ahụ, site na iji nhọrọ `ivk` arụmụka:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Inyefe adreesị Sapling na-eweghachi igodo nlele zuru oke nke akaụntụ ahụ (`zxviews…`), kwekọrọ na omume zcashd ochie. Oke abụọ edere ede: A jụrụ adreesị Sprout, enweghịkwa ike ibupụ igodo nlele zuru oke nke Sapling site na akaụntụ nke e bubatara n'onwe ya dị ka echiche-naanị, n'ihi na obere akpa ahụ enweghị ike iwughachi ya. `ivk` ụdị ahụ na-arụ ọrụ maka akaụntụ nlele-naanị ebubata.

### Obere akpa ego ndị na-ebupụ igodo nlele site na interface nke ha

Ihe [Obere akpa](/using-zcash/wallets) Ibe akwụkwọ ahụ na-egosi nkwado igodo nlele na njikere Ironwood maka obere akpa ọ bụla. N'oge a na-ede ihe a, obere akpa nwere ihe nkwado igodo nlele na **Ironwood: Njikere** gụnyere ZODL, Zingo!, Zkool, Achịcha, Zallet, Zecd na Nozy. Lelee ibe ahụ kama nke a tupu ị dabere na obere akpa ọ bụla, n'ihi na njikere na-agbanwe.

## Ibubata igodo nlele dị ka akaụntụ elekere naanị

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) bụ nhọrọ kachasị mfe ebe a, n'ihi na ọ na-anabata igodo ndị ejikọtara ọnụ yana ndị ochie. README ya na-edekọ akaụntụ ndị na-elele naanị nke e mepụtara site na **igodo nlele jikọtara ọnụ** ma ọ bụ igodo nlele ogologo Sapling**, yana igodo ndị echekwara ochie nke e si na zcashd zipụ. Tinye akaụntụ ọhụrụ, họrọ ụzọ nlele naanị, ma mado ya. `uview…` or `zxviews…` igodo; akaụntụ ahụ na-emekọrịta ma na-akọ akụkọ ihe mere eme na-enweghị ikike mmefu ego.

Nkwado usoro Ironwood na njem Orchard-to-Ironwood rutere na Zkool 6.24.0 (20 Julaị 2026), yana 6.26.1 (2 Ọgọst 2026) edoziri nchọpụta azụmahịa Ironwood na mempool. Gbaa 6.26.1 ma ọ bụ karịa.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Arụmụka nke abụọ bụ amụma nyochagharị: `"whenkeyisnew"` (ndabara), `"yes"` or `"no"`Nke atọ bụ ogologo blọk ahụ ị ga-enyocha ọzọ. Zallet na-ebubata igodo ahụ dị ka akaụntụ nlele naanị ma na-esochi azụmahịa na-abata na nke na-apụ maka adreesị ya na-enweghị ikike imefu ego.

**Zallet na-ebubata Sapling naanị igodo nlele zuru oke.** Ọ gaghị ebubata `uview…` igodo nlele zuru oke, ọbụlagodi na ọ nwere ike ibupụ otu. Iji nye ohere ịgụ akwụkwọ na akaụntụ ejikọtara ọnụ, bupụ UFVK site na Zallet wee bubata ya n'ime obere akpa nke na-anabata igodo ejikọtara ọnụ, dịka Zkool.

Iji gbanwee igodo ebubatara ka ọ bụrụ faịlụ akụkọ ihe mere eme azụmahịa zuru oke, yana txids, ụgwọ na memos, lee [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export).

## Ihe gbanwere, na ihe ị ga-akwụsị ịchọ

Ọ bụrụ na ị soro ụdị ochie nke ibe a, ma ọ bụ nsụgharị ya, ụzọ atọ agaghị arụ ọrụ ọzọ.

- **`zcash-cli z_exportviewingkey` na `z_importviewingkey`.** zcashd ruru nkwụsị nkwado ya na 18 Julaị 2026 ma ọ naghịzi arụ ọrụ. Ụzọ Zallet kpọrọ aha otu ihe ahụ bụ nnọchi; lee [ntuziaka mbugharị](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Nlele Ywallet.** Peeji Wallets na-egosi Ywallet **Ironwood: Adịghị njikere**, yabụ ọ bụghị obere akpa ahụ ka e ji atụ ndị mmadụ aka maka igodo nlele nke oge Ironwood. Zkool, sitere n'aka otu onye nrụpụta ahụ, na-anabata otu ụdị igodo ahụ ma tinye akara ya na Ready.
- **zcashblockexplorer.com/vk.** Ọrụ ahụ na-eweghachi HTTP 503 na asambodo na-adịghị mma, a tụfukwara ya kama ịgbanwe ya. Ịmanye igodo nlele na weebụsaịtị na-enye akụkọ azụmahịa gị niile nye onye ọ bụla na-agba weebụsaịtị ahụ, nke bụ mgbe niile nhọrọ atọ kachasị adịghị ike na ibe ochie. Bubata igodo ahụ na obere akpa ị na-agba.

## akụrụngwa

Jiri igodo nlele dịka ọ dị mkpa, họrọkwa igodo kacha dị warara nke na-aza ajụjụ a na-ajụ.

- [Mkpughe ịkwụ ụgwọ](/zcash-tech/payment-disclosures) - igosi nkọwa ahọpụtara nke otu ịkwụ ụgwọ na-enweghị inye ohere na-aga n'ihu na akaụntụ
- [ZIP 326: NU6.3 Ihe ga-esi na obere akpa pụta](https://zips.z.cash/zip-0326) - otu igodo nlele si eme omume n'ofe ọdọ mmiri Orchard na Ironwood
- [ZIP 229: Ụdị nke 6 Usoro Azụmahịa](https://zips.z.cash/zip-0229) - na-akọwa ọdọ mmiri Orchard na Ironwood
- [Ndekọ mgbanwe Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) - nke ewepụtara gbakwunyere usoro RPC nke
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) - akaụntụ akwadoro na ụdị isi okwu
- [ECC, Nkọwa Igodo Ilele](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Mkpughe na Igodo Nlele Nhọrọ](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
