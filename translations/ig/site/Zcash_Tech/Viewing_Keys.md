<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Igodo nlele [Viewing Keys]

Adreesị akpa ego nke e chebere echebe na-enye gị ohere ịzụmahia ebe ị na-ekpughe ntakịrị o kwere mee na Zcash blockchain. Ya mere, gịnị na-eme mgbe ọ dị gị mkpa igosi otu akụkụ kpọmkwem ihe ị nwere, ma ọ bụ ihe ị zitere? Viewing key na-enye ohere ịgụ na-enweghị inye ikike imefu ego. Viewing keys adịlarị maka Sprout; Sapling gbakwụnyere ikike dịka ịchọpụta mgbe e mefuru note anataara. [ZIP 310](https://zips.z.cash/zip-0310) bụ edemede ozi mbụ nke na-edepụta njirimara nchekwa nke Sapling viewing keys, ọ bụghị network upgrade webatara viewing keys.

Viewing key bụ ngwá ọrụ maka Mpughe ahọpụtara [selective disclosure]: ị na-ahọrọ onye ga-ahụ ihe, ọ dịghịkwa mgbe ị na-enyefe ikike imefu ego iji mee ya.

## Nchịkọta ngwa ngwa

Viewing key na-enye ohere **ịgụ naanị** n'ihe omume nke Adreesị akpa ego nke e chebere echebe Zcash ma ọ bụ akaụntụ: onye ọbụla ji ya nwere ike ịhụ Azụmahia na-abata (na, maka full viewing keys, Azụmahia na-apụ), mana ọ nweghị mgbe ọ ga-enwe ike imefu ego.

- **Ihe ọ bụ:** ngwá ọrụ Mpughe ahọpụtara nke pool ndị e chebere echebe, nke ikike ya dị iche dabere na pool na ụdị key. [ZIP 310](https://zips.z.cash/zip-0310) na-akọwa ihe Sapling full viewing key na-ekpughe na ozi nke a na-ekwe nkwa, nke ekwenyebeghị, nke akọwaghị, ma ọ bụ nke ekpughebeghị.
- **Ihe ọ na-enye:** ịchọpụta nkwụnye ego (`uivk…` incoming keys) ma ọ bụ ọhụhụ zuru ezu nke ihe na-abata/na-apụ maka akaụntụ (`uview…` unified full viewing keys), yana legacy Sapling `zxviews…` keys.
- **Ihe ọ naghị enye:** ikike imefu ego. Ọ nweghị ihe onye ji viewing key mee nwere ike ibugharị ego.
- **Ebe ọ na-arụ ọrụ taa:** mbupụ/mwebata na [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) yana akaụntụ watch-only n'ime e-akpa ego dịka Zkool; lee ibe [Wallets](/using-zcash/wallets) maka matriks nkwado dị ugbu a.
- **Iwu isi mkpịsị aka:** họrọ key kacha warara nke na-aza ajụjụ a jụrụ, ma cheta na key e nyefere enweghị ike ịweghachi — naanị ibugharị ego nwere ike ime ka ọ kwụsị ịdị mkpa.

---

## Gịnị mere eji viewing key?

Ihe Electric Coin Company dere gbasara isiokwu a na-akọwa ọnọdụ ndị na-emekarị, ha ka bụkwa ndị a na-ahụkarị taa:

- **Exchange na-ele nkwụnye ego anya.** Exchange ahụ na-ebunye incoming viewing key n'elu node nchọpụta nke jikọtara na ịntanetị ka ọ nwee ike ịhụ nkwụnye ego ndị ahịa na Adreesị akpa ego nke e chebere echebe, ebe Igodo ego na-anọ na hardware nke na-adịghị emetụ network aka.
- **Onye nlekọta ego na-egosi ihe o ji.** Onye nlekọta ego ahụ na-enye onye nyocha full viewing key maka Adreesị akpa ego ọ bụla nke e chebere echebe. Onye nyocha ahụ nwere ike nyochaa nguzo ego ndị ahụ ma lelee ọrụ gara aga gaa na si na adreesị ndị ahụ apụta, ma ọ nweghị ihe ọzọ ọ pụrụ ime.
- **Nyocha kwesịrị ekwesị maka onye mmekọ.** Ebe exchange chọrọ inyocha akụkọ nke e chebere echebe nke onye ahịa dịka akụkụ nke nyocha siri ike, ọ nwere ike ịrịọ viewing key kama ego ahụ.

## Ihe viewing key na-ekpughe na ihe ọ naghị ekpughe

E nwere ihe karịrị otu ụdị key, ọdịiche dị n'etiti ha na-ekpebi ókè ihe ị na-enye.

| Key | Prefix | Ihe ọ na-enye |
|---|---|---|
| Unified full viewing key (UFVK) | `uview…` | Na-ahụ Azụmahia na-abata **na** na-apụ maka pool ọ bụla dị n'akaụntụ |
| Unified incoming viewing key (UIVK) | `uivk…` | Na-ahụ naanị Azụmahia na-abata, maka pool ọ bụla dị n'akaụntụ |
| Sapling extended full viewing key | `zxviews…` | Na-ahụ ihe omume Sapling na-abata na na-apụ maka adreesị nke key ahụ |

Ọ nweghị nke ndị a nwere ike imefu ego. Ha niile bụ ndị na-adịgide adịgide n'ụzọ dị mkpa: key ị nyefegoro enweghị ike ịweghachi, naanị ibugharị ego gaa n'akaụntụ nke akụkụ ọzọ enweghị keys ya pụrụ ime ka ọ ghara ịdị irè.

E nwere ọnyà mkpughe abụọ kwesịrị ịma tupu ịkekọrịta ihe ọbụla.

**Incoming apụtaghị warara.** Unified incoming viewing key metụtara akaụntụ dum, ọ bụghị naanị otu adreesị a jụrụ gị maka ya. Ịbupụ UIVK maka otu Adreesị akpa ego Sapling ka na-enye ọhụhụ nke ihe na-abata n'ofe pool ọ bụla dị n'akaụntụ ahụ, ya mere ọ na-ekpughe karịa adreesị ọ kpọrọ aha. [Zallet Book](https://zcash.github.io/zallet/zcashd/json_rpc.html) na-ekwu nke a hoo haa.

**Adreesị e bipụtara ekpugheela incoming viewing key ya nye onye iro n'ọdịnihu.** [ZIP 326](https://zips.z.cash/zip-0326) na-ekwu na onye iro nwere quantum computer nwere ike ịweghachi incoming viewing key site n'adreesị diversified e bipụtara, nke ga-ekwe omume n'ụzọ iweghachite nullifier key na-adịghị ekwe omume. Ibipụta adreesị abụghị otu ihe na ibipụta viewing key taa, mana ha abụọ na-adịwanye nso n'ime ogologo oge.

## Viewing keys mgbe Ironwood gasịrị

NU6.3 webatara Ironwood pool nke e chebere echebe ma mee Orchard pool ka ọ bụrụ nke a pụrụ iji naanị mee mmefu, yabụ ego na-akwaga site n'otu gaa n'ọzọ ka oge na-aga. Lee [Ironwood](/zcash-tech/ironwood) na [The turnstile](/zcash-tech/the-turnstile) maka upgrade ahụ n'onwe ya.

**Viewing key ewepụtara tupu Ironwood ka na-arụ ọrụ mgbe mbugharị gasịrị.** ZIP 326 na-akọwa na receiver, yana incoming viewing key kwekọrọ na ya, metụtara Orchard *protocol* kama pool: otu incoming viewing key ahụ na-anwale-nzobe ederede ma Orchard-pool ma Ironwood-pool note ciphertexts. Zallet na-emejuputa ya otú ahụ, na-akọwa Ironwood notes dị ka ndị Orchard nwere ọdịdị ma na-eji Orchard viewing keys nke akaụntụ anwale-nzobe ederede ha n'okpuru mpaghara nzobe note Ironwood.

Nsonaazụ atọ maka onye ọbụla ji ma ọ bụ na-enye key:

1. **Nguzo ego na-agagharị n'etiti pools, onye na-ekiri na-ahụkwa ka nke a na-eme.** [ZIP 318](https://zips.z.cash/zip-0318) na-akọwa mbugharị dị ka usoro Azụmahia nta Orchard-gaa-Ironwood nwere ụma ịdị otu, nke a na-agbasa n'usoro oge e mere random, nke ọ bụla na-emefu otu note Orchard ma mepụta otu output Ironwood nke canonical denomination. Onye nyocha ji viewing key na-ekiri na-ahụ ihe o ji na-esi n'otu pool aga n'ọzọ n'usoro nzọụkwụ n'ime ọtụtụ izu, ọ bụghị n'otu mbugharị. E-akpa ego nwere ike iji viewing keys ya rụgharịa ọganihu mbugharị nke ya site na data chain.
2. **Nzọụkwụ mbugharị ọ bụla na-ekpughe uru ọ na-ebuga.** Nke a dị n'ime ịgafe turnstile, ọ bụkwa ihe na-eme ka mbugharị ahụ bụrụ nke a pụrụ inyocha. Ikewa nguzo ego n'ime canonical denominations pụtara na ọ nweghị otu Azụmahia na-ekpughe nguzo ego pool Orchard dum.
3. **Akaụntụ e kere mgbe Ironwood gasịrị nwere ike isi n'ụzọ dị iche nweta keys ha.** [ZIP 2005](https://zips.z.cash/zip-2005) na-agbakwunye flag `use_qsk` maka keys quantum-recoverable, ọ na-agbanwekwa ka esi enweta incoming, outgoing na diversifier keys, yabụ keys `use_qsk = true` bụ keys dị iche n'ezie. ZIP 326 chọrọ ka flag ahụ bụrụ otu n'ofe akaụntụ ma machibido ịmepụta keys `use_qsk = true` tupu NU6.3 amalite na Mainnet. Ya mere, key e bubatara n'akaụntụ dị tupu Ironwood bụ key `use_qsk = false`, ma ọ ka ziri ezi maka akaụntụ ahụ. Echela na key ewepụtara n'otu akaụntụ na-akọwa akaụntụ ọzọ.

## Ịbupụ viewing key

### Zallet

[Zallet](https://github.com/zcash/zallet) bụ e-akpa ego full-node dochiri e-akpa ego dị n'ime zcashd. Mbupụ na mwebata viewing-key bịara na **v0.1.0-beta.2 (28 Julaị 2026)**, yabụ buru ụzọ lelee version gị; builds ndị tupu ya enweghị methods ndị a. Argument ọ bụla dị mgbe aha method gasịrị ga-abụrịrị JSON ziri ezi, nke pụtara na string values na-edobe double quotes nke ha. [Zallet Quick Reference Guide](/using-zcash/zallet-quick-reference-guide) na-akọwa usoro command n'ozuzu.

Depụta ihe e-akpa ego ji:

```bash
zallet rpc listaddresses
```

Bupụ unified full viewing key nke akaụntụ site n'inye unified address:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Bupụ unified incoming viewing key nke akaụntụ kama, jiri argument nhọrọ `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Ịnye adreesị Sapling na-eweghachite extended full viewing key Sapling nke akaụntụ ahụ (`zxviews…`), kwekọrọ n'omume ochie nke zcashd. E nwere oke abụọ edere: a na-ajụ adreesị Sprout, na enweghị ike ibupụ extended full viewing key Sapling n'akaụntụ e bubatara n'onwe ya dị ka view-only, n'ihi na e-akpa ego enweghị ike ịrụgharịa ya. Ụdị `ivk` na-arụ ọrụ maka akaụntụ view-only e bubatara.

### E-akpa ego na-ebupụ viewing keys site na interface nke ha

Ibe [Wallets](/using-zcash/wallets) na-enyocha nkwado viewing-key na njikere Ironwood maka e-akpa ego ọ bụla. N'oge a na-ede ihe, e-akpa ego depụtara ma nkwado viewing-key na **Ironwood: Ready** gụnyere ZODL, Zingo!, Zkool, Cake, Zallet, zecd na Nozy. Lelee ibe ahụ kama ibe a tupu ịdabere na e-akpa ego ọ bụla, n'ihi na njikere na-agbanwe.

## Ịwebata viewing key dịka akaụntụ watch-only

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) bụ nhọrọ kacha agbanwe agbanwe ebe a, n'ihi na ọ na-anabata unified keys yana legacy ones. README ya na-edepụta akaụntụ view-only e kere site na **unified viewing key** ma ọ bụ **Sapling extended viewing key**, tinyere legacy shielded extended keys e bubatara site na zcashd. Tinye akaụntụ ọhụrụ, họrọ ụzọ view-only, ma mado key `uview…` ma ọ bụ `zxviews…`; akaụntụ ahụ ga-emekọrịta ma kọọ nguzo ego na akụkọ na-enweghị ikike imefu ego.

Nkwado protocol Ironwood na mbugharị Orchard-gaa-Ironwood batara na Zkool 6.24.0 (20 Julaị 2026), ma 6.26.1 (2 Ọgọọst 2026) doziri nchọpụta Azụmahia Ironwood na mempool. Jiri 6.26.1 ma ọ bụ nke mechara.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Argument nke abụọ bụ iwu rescan: `"whenkeyisnew"` (ndabara), `"yes"` ma ọ bụ `"no"`. Nke atọ bụ elu block a ga-esi rescan. Zallet na-ebubata key ahụ dị ka akaụntụ view-only ma na-enyocha Azụmahia na-abata na na-apụ maka adreesị ya na-enweghị ikike imefu ego.

**Zallet na-ebubata naanị Sapling extended full viewing keys.** Ọ gaghị ebubata unified full viewing key `uview…`, n'agbanyeghị na ọ nwere ike ibupụ otu. Iji nye ohere ịgụ akaụntụ unified dum, bupụ UFVK site na Zallet ma bubata ya n'ime e-akpa ego na-anabata unified keys, dịka Zkool.

Iji gbanwee key e bubatara ka ọ bụrụ faịlụ akụkọ Azụmahia zuru ezu, nwere txids, ugwo na memos, lee [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export).

## Ihe gbanwere, na ihe ị ga-akwụsị ịchọ

Ọ bụrụ na ị gbasoro version ochie nke ibe a, ma ọ bụ ntụgharị asụsụ ya, ụzọ atọ anaghịzi arụ ọrụ.

- **`zcash-cli z_exportviewingkey` na `z_importviewingkey`.** zcashd ruru nkwụsị njedebe nkwado ya na 18 Julaị 2026 ma ọ naghịzi arụ ọrụ. Methods ndị nwere otu aha nke Zallet bụ ndị dochiri ya; lee [migration guide](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Nduzi Ywallet.** Ibe Wallets na-akara Ywallet dịka **Ironwood: Not Ready**, yabụ ọ bụghị e-akpa ego a ga-atụnye ndị mmadụ aka maka viewing keys nke oge Ironwood. Zkool, sitere n'aka otu onye mmepụta, na-anabata otu ụdị keys ahụ ma akara ya bụ Ready.
- **zcashblockexplorer.com/vk.** Ọrụ ahụ na-eweghachite HTTP 503 yana certificate na-adịghị irè, e wepụwokwa ya kama dochie ya. Ịmado viewing key n'ime weebụsaịtị na-enye onye na-agba weebụsaịtị ahụ akụkọ Azụmahia gị dum, nke bụ mgbe niile nhọrọ kacha esighi ike n'ime atọ dị n'ibe ochie ahụ. Kama nke ahụ, bubata key ahụ n'ime e-akpa ego ị na-agba.

## Ihe ngosi / Ntụnyere

### Windo onye nyocha

Chee maka akaụntụ nke e chebere echebe dịka ụlọ nchekwa n'ụlọ akụ:

- **Igodo ego** bụ igodo ụlọ ahụ. Onye ọbụla ji ya nwere ike imeghe igbe ma wepụta ihe dị n'ime ha.
- **Viewing key** bụ windo onye nyocha na-ele n'ime ụlọ ahụ. Onye nyocha nwere ike ile igbe ọ bụla ka ọ na-abanye ma na-apụ, gụọ labels, ma debe ledger — mana windo ahụ enweghị handle. Onye na-ele n'ime ya enweghị ike ibugharị ihe ọbụla dị n'ime ụlọ ahụ.

### Ihe windo ahụ enweghị ike igosi

Windo ahụ na-eche ụlọ ahụ ihu, ọ bụghị ụwa dị n'èzí ya. Ọ na-egosi ọrụ e chebere echebe nke akaụntụ a na-ele anya; ọ naghị eme onye na-ekiri ya onye na-ekiri blockchain dum, ọ naghịkwa ekwe ka ọ jikọta ọrụ akaụntụ ahụ na akụkọ Oha nke onye ọzọ. Ma n'ihi na a wụnyere windo ahụ n'ogo akaụntụ, inye mmadụ oghere nlele maka otu igbe nkwụnye ego (otu adreesị) ka na-enye ya ọhụhụ nke ihe na-abata n'ime ụlọ dum — nke ahụ kpọmkwem bụ ihe mere iwu key kacha warara ji dị.

### Ihe mere ị na-enweghị ike iweghachi windo ahụ

Viewing key bụ mpempe ozi, ọ bụghị ndenye ikike. Ozugbo e depụtachara ya, ọ na-adị ruo mgbe ego hapụrụ akaụntụ ọ na-ele. Ngwọta bara uru bụ ntụgharị: bugharịa nguzo ego gaa n'akaụntụ ọhụrụ nke akụkụ ọzọ enwetaghị keys ya, windo ochie ahụ ga-eche ụlọ efu ihu.

## Nnyocha miri emi

### Trial decryption: otu ikiri si arụ ọrụ n'ezie

Azụmahia ọ bụla nke e chebere echebe na-ezo note plaintexts ya nye onye e bu n'obi nata ha. E-akpa ego ji viewing key na-eme **trial decryption**: maka Azụmahia ọ bụla ọ hụrụ na chain, ọ na-anwa iwepụ nzobe note ciphertexts site na key ahụ. Ihe gara nke ọma na-ekpughe uru note ahụ, diversifier onye nata ya na memo; ihe dara ada anaghị efu ihe ọbụla. Nke a bụ ihe mere otu incoming viewing key ji nọgide na-arụ ọrụ n'ofe pools Orchard na Ironwood — [ZIP 326](https://zips.z.cash/zip-0326) na-ejikọta receiver na Orchard *protocol*, ya mere note ciphertexts Ironwood nwere ọdịdị Orchard ma jiri viewing keys Orchard nke akaụntụ anwale-nzobe ederede ha n'okpuru mpaghara nzobe note Ironwood.

### Full megide incoming: ihe derivation na-ekpebi

Viewing key **zuru ezu** nwere ike isi na ya nweta ikike outgoing-viewing, nke bụ ihe na-eme ka onye nyocha rụgharịa akụkụ *onye zitere* nke mbufe ozugbo ewepụrụ nzobe Azụmahia ahụ. Viewing key **incoming** na-akwụsị n'ebumnuche: ọ na-achọpụta ma na-ewepụ nzobe notes na-abata mana enweghị ike ịrụgharịa njikọ na-apụ. Derivation dị n'etiti ikike ndị a bụ otu ụzọ — a na-enweta incoming key *site na* full key, ọ dịghị mgbe ọ bụ n'ụzọ ọzọ — nke bụ ihe na-eme “incoming only” ka ọ bụrụ mbenata n'ezie kama nkwa. Flag `use_qsk` sitere na [ZIP 2005](https://zips.z.cash/zip-2005) na-agbanwe derivation ahụ n'onwe ya, yabụ keys quantum-recoverable bụ ezinụlọ key dị iche kpamkpam, ọ bụghị ụdị nke ochie.

### Ihe mbugharị dị ka nye onye na-ekiri

Ebe ọ bụ na mbugharị [ZIP 318](https://zips.z.cash/zip-0318) bụ usoro random nke Azụmahia nta Orchard-gaa-Ironwood nwere ụma ịdị otu, onye na-ekiri ji key ahụ na-ahụ steepụ: ọtụtụ nzọụkwụ uru canonical-denomination kama otu nnukwu mmali. Ọ nweghị otu nzọụkwụ na-ekpughe nguzo ego dum a na-ebuga, mana *usoro ahụ* na-adị mfe ịmata — nke bụ mgbanwe a tụrụ anya ya maka turnstile a pụrụ inyocha.

## Mmetụta bara uru

- **Maka exchanges na ndị nhazi payment:** bunye incoming viewing key nke akaụntụ (ma ọ bụ UFVK maka mkpuchi zuru ezu) n'elu node nchọpụta ma mezie nkwụnye ego ndị ahịa na akpaka, dịka ị ga-esi mee ya na Adreesị akpa ego Oha — mana Igodo ego onye ahịa ahụ anaghị apụ na nchekwa oyi.
- **Maka ndị nyocha na proof-of-reserves:** full viewing key na-agbanwe “tukwasị anyị obi” ka ọ bụrụ “nyochaa nke a”: nguzo ego na akụkọ Azụmahia zuru ezu maka akaụntụ a na-ele, na-enweghị ikike ọbụla imetụ ha aka. Jikọta ya na [Payment disclosures](/zcash-tech/payment-disclosures) maka proofs otu ugboro gbasara otu payment.
- **Maka nyocha kwesịrị ekwesị:** nye onye mmekọ key maka akaụntụ metụtara mmekọrịta ahụ, ọ bụghị e-akpa ego gị dum. Ọ bụrụ na mmekọrịta ahụ akwụsị, tụgharịa akaụntụ ahụ.
- **Maka nhọrọ ngwá ọrụ:** Zallet na-ebupụ UFVKs ma na-ebubata Sapling extended full viewing keys; Zkool na-anabata unified na legacy keys dịka akaụntụ watch-only. Lelee ibe [Wallets](/using-zcash/wallets) maka matriks njikere Ironwood dị ugbu a tupu ịhazi otu e-akpa ego dịka ọkọlọtọ.
- **Ọnụ mkpughe na-adịgide adịgide:** onye ọ bụla ọzọ ji key bụ akara kredit Nzuzo na-adịgide adịgide nke ị na-enweghị ike imechi. Nye keys kwa-mmekọrịta, mee ka ha metụta otu akaụntụ, ma detuo onye ji ihe.

## Njehie a na-ahụkarị

| Nkwenkwe a na-ahụkarị | Ihe bụ eziokwu n'ezie |
| --- | --- |
| "Viewing key nwere ike imefu ego ma ọ bụrụ na ọ dapụ." | Ọ nweghị ike. Viewing keys enweghị ikike imefu ego; ihe kacha njọ ntapu nwere ike ime bụ ikpughe akụkọ. |
| "Enwere m ike ịkagbu viewing key ma emechaa." | Ị nweghị ike. Key e nyefere na-arụ ọrụ ruo mgbe ego kwagara n'akaụntụ nke akụkụ ọzọ enweghị keys ya. |
| "Ịbupụ UIVK maka otu adreesị na-egosi naanị adreesị ahụ." | Viewing keys metụtara akaụntụ. UIVK na-egosi ọrụ na-abata maka pool ọ bụla dị n'akaụntụ ahụ. |
| "`zcash-cli z_exportviewingkey` ka na-arụ ọrụ." | Mba. zcashd ruru nkwụsị njedebe nkwado ya na 18 Julaị 2026; jiri Zallet's `z_exportviewingkey` / `z_importviewingkey` kama. |
| "Ịmado viewing key n'ime ngwá ọrụ weebụ dị nchebe n'ihi na ọ bụ naanị ịgụ." | Ịgụ naanị ka pụtara na e nyefere onye na-agba saịtị ahụ akụkọ Azụmahia gị dum maka akaụntụ ahụ. Bubata key ahụ n'ime e-akpa ego ị na-agba. |
| "Zallet nwere ike ibubata viewing key ọ bụla Zallet nwere ike ibupụ." | Mba. Zallet na-ebubata naanị Sapling extended full viewing keys; unified `uview…` keys ga-aga n'ime e-akpa ego na-anabata unified keys, dịka Zkool. |

## Ibe ndị metụtara ya

- [Payment Disclosures](/zcash-tech/payment-disclosures) — igosi nkọwa ahọpụtara nke otu payment na-enweghị inye ohere na-aga n'ihu n'akaụntụ
- [Unified Addresses](/zcash-tech/unified-addresses) — oyi akwa adreesị nke na-ebu receivers viewing-key
- [Ironwood](/zcash-tech/ironwood) — pool nke e chebere echebe NU6.3 nke Orchard na-akwaga n'ime ya
- [The Turnstile](/zcash-tech/the-turnstile) — usoro mbugharị Orchard-gaa-Ironwood ndị na-ekiri nwere ike ile
- [Wallets](/using-zcash/wallets) — ndekọ zuru ezu nke e-akpa ego, nkwado viewing-key na njikere Ironwood
- [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export) — ịgbanwe key e bubatara ka ọ bụrụ faịlụ akụkọ txid/ugwo/memo zuru ezu

## Akụrụngwa

Jiri viewing keys naanị mgbe ọ dị mkpa, ma họrọ key kacha warara nke na-aza ajụjụ a jụrụ.

- [Payment disclosures](/zcash-tech/payment-disclosures) - igosi nkọwa ahọpụtara nke otu payment na-enweghị inye ohere na-aga n'ihu n'akaụntụ
- [ZIP 326: Nsonaazụ NU6.3 maka e-akpa ego](https://zips.z.cash/zip-0326) — otu viewing keys si arụ ọrụ n'ofe pools Orchard na Ironwood
- [ZIP 229: Ụdị Azụmahia Version 6](https://zips.z.cash/zip-0229) — na-akọwa pools Orchard na Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — nkọwapụta viewing key
- [Zallet changelog](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — release nke gbakwunyere RPC method ọ bụla
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — ụdị akaụntụ na key akwadoro
- [ECC, Ịkọwa Viewing Keys](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Mpughe ahọpụtara na Viewing Keys](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Ngosi Vidio](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
