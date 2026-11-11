<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Gịnị Bụ Zcash Adreesị TEX?

## Nchịkọta Ngwa Ngwa

* Adreesị TEX bụ Adreesị akpa ego Oha [transparent] Zcash e dere n’ụdị ọzọ. Ọ na-amalite na `tex1` ma kọwaa ya na [ZIP 320](https://zips.z.cash/zip-0320).
* Ọ na-agwa e-akpa ego [wallet] gị otu ihe: jiri naanị ego Oha kwụọ Adreesị akpa ego a.
* Ọ bụrụ na nguzozi gị bụ nke e chebere echebe [shielded], e-akpa ego dakọtara na-eme nzọụkwụ abụọ maka gị. Ọ na-ebufe ego ahụ gaa na Adreesị akpa ego Oha nwa oge, mesịa ziga ya na Adreesị TEX.
* Na 2023, Binance jụrụ obodo Zcash maka ụzọ isi jụ nkwụnye ego nke e chebere echebe ma zighachi ha azụ. Adreesị TEX bụ azịza ya, Binance bụkwa exchange [exchange] nọ na ndepụta ZecHub [Custodial Exchanges](/using-zcash/custodial-exchanges) nke na-anabata nkwụnye TEX.
* Nkwado etoola n’akụkụ izipu kwa: Coinbase na-ahapụ ndị ọrụ ya iziga ZEC na adreesị TEX, ngwaọrụ e-akpa ego agbakwụnyekwala nkwado ZIP 320.
* Kwụọ ụgwọ [payment] gaa na Adreesị TEX bụ nke ọhaneze na blockchain [blockchain], dịka Kwụọ ụgwọ Oha ọ bụla. Nguzozi gị nke e chebere echebe fọdụrụ na nzuzo.

## Nkọwa Isi

Adreesị TEX Zcash bụ ụdị pụrụ iche nke Adreesị akpa ego nnata. TEX pụtara “Transparent Exchange”. Ọ bụ ntụgharị Bech32m nke otu Adreesị akpa ego P2PKH Oha. Adreesị TEX na-amalite na `tex1` ma bụrụ ụdị dị iche na Unified Addresses.

Adreesị TEX na-agwa e-akpa ego dakọtara ka ọ mee Azụmahia [transaction] naanị-Oha (T -> T). 

Usoro ya bụ nke a: Mgbe e-akpa ego dakọtara chọpụtara Adreesị TEX, ọ na-ekpebi ya iji nweta onye nnata Oha dị n’ime ya. E-akpa ego ahụ na-eziga ego achọrọ maka tx site na pool [pool] nke e chebere echebe gaa na Adreesị akpa ego Oha dị iche, nwa oge, nke onye ọrụ na-achịkwa (Z -> T). Ọ na-ezigakwa ego ahụ na onye nnata Oha a kọwara nke Adreesị TEX (T -> T).  

Atụmatụ teknụzụ maka adreesị TEX ka e depụtara na Zcash [ZIP 320](https://zips.z.cash/zip-0320), nke kọwara ụdị Adreesị akpa ego naanị maka ịnara ego sitere na Adreesị akpa ego Oha.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Olee otú adreesị TEX si gbasaa n’iji ya?

Ịnakwere ya ka bụ nke akụkụ, mana ọ naghịzi ejedebe naanị na otu exchange. Ọ bara uru ikewapụ ọrụ abụọ dị iche:

* **Inye adreesị nkwụnye TEX.** Binance bụ exchange nọ na ndepụta [Custodial Exchanges](/using-zcash/custodial-exchanges) anyị nke na-enye Adreesị TEX maka nkwụnye ego, ka ego wee si n’ebe Oha bịa ([ZIP 320, Background](https://zips.z.cash/zip-0320#background)). ZIP 320 anaghị atụ anya ka exchange ndị ọzọ nye adreesị TEX ma ọ bụrụhaala na ha achọghị ịmata Adreesị akpa ego ego kwụọ ụgwọ sitere na ya.
* **Izigara adreesị TEX.** Nke a bụ akụkụ toro eto. N’Ọktoba 2024, Coinbase kwupụtara na ndị ọrụ Coinbase.com nwere ike iziga Zcash na adreesị TEX ([Coinbase Assets announcement](https://x.com/CoinbaseAssets/status/1844428577921507416)). Ngwaọrụ e-akpa ego agbakwụnyekwala nkwado ZIP 320: KeepKey gbakwụnyere ịbịanye aka maka azụmahịa TEX na firmware 7.15 ([keepkey/hdwallet #75](https://github.com/keepkey/hdwallet/pull/75)), a meziekwara ọbá akwụkwọ XChainJS `zcash-js` mgbe ọ jụrụ ndị nnata `tex1` ziri ezi (ihe ndị ọzọ gbasara nke a dị n’okpuru).

Ya mere, adreesị TEX abụghị nke zuru ụwa ọnụ, mana onye na-agụ ekwesịghịzi iche na Binance bụ naanị ebe ha pụtara.

### Mgbe M Chọrọ Adreesị TEX

#### Ị chọrọ Adreesị TEX mgbe ị na-eziga ego na Adreesị akpa ego Oha site n’e-akpa ego anaghị akwado iziga ozugbo na Adreesị akpa ego Oha.

Ụfọdụ e-akpa ego anaghị ekwe ka e ziga ozugbo na Adreesị akpa ego Oha, onye nnata nwekwara ike ọ gaghị enye nke TEX kwekọrọ na ya. Ya mere, ịtụgharị site na Adreesị akpa ego Oha gaa na Adreesị TEX nwere ike ịdị mkpa mgbe ụfọdụ. Enwere ike ime nke a n’onwe gị site n’ịgba mmejuputa ntụaka e depụtara na [zip-320](https://zips.z.cash/zip-0320#reference-implementation).

#### Ị chọrọ Adreesị TEX mgbe ị na-eziga ego na exchange etiti nke chọrọ ka ego ahụ si n’ebe Oha bịa.

[Binance](https://www.binance.com/) bụ ihe kpatara adreesị TEX ji dị. Na Nọvemba 2023, ọ gwara obodo Zcash na enwere ike iwepụ ZEC na ndepụta ma ọ bụrụ na enweghi ụzọ isi jụ nkwụnye sitere na adreesị nke e chebere echebe ma zighachi ha onye nkwụnye ego ([ZIP 320, Background](https://zips.z.cash/zip-0320#background)). ZIP 320 anaghị atụ anya ka exchange ndị ọzọ nye adreesị TEX ma ọ bụrụhaala na ha achọghị ịmata Adreesị akpa ego ego kwụọ ụgwọ sitere na ya. Binance bụ exchange nọ na ndepụta [Custodial Exchanges](/using-zcash/custodial-exchanges) anyị na-anabata nkwụnye na Adreesị TEX.
Adreesị TEX na-agwa e-akpa ego dakọtara na ego niile ezigara na Adreesị akpa ego ahụ ga-abụrịrị Oha ma wepụ uru ọ bụla nke e chebere echebe ka a ghara iziga na Adreesị akpa ego ahụ.
Ọ bụrụ na exchange dịka Binance jụrụ uru ezitere, ọ nwere ụzọ dị mkpa iji zighachi uru ahụ na Adreesị akpa ego o siri bịa. Ọ na-enyekwara ụlọ ọrụ dịka Binance irube isi n’iwu na ụkpụrụ gọọmenti ma ọ bụ ndị ọchịchị ọzọ tiri.

### Kedu e-akpa ego na-akwado Adreesị TEX?

Ị nwere ike ịhụ ndepụta kacha ọhụrụ na ibe [wallets](/using-zcash/wallets) anyị. Jiri nzacha TEX Address.

## Ihe Anya / Ntụnyere

Chee nguzozi gị nke e chebere echebe dịka ego dị n’igbe nchekwa ekpochiri ekpochi n’ụlọ. Ọ dịghị onye nọ n’èzí nwere ike ịhụ ole dị n’ime ya.

Exchange dịka Binance nwere akara n’elu tebụl ya: a na-anabata naanị Kwụọ ụgwọ n’ime envelopu doro anya, ka onye na-anakọta ego hụ ebe ego ahụ siri bịa ma nyeghachi ya ma ọ dị mkpa. Adreesị TEX bụ akara ahụ.

Mgbe e-akpa ego gị hụrụ akara ahụ, ọ na-ewepụta ego ahụ n’igbe nchekwa, tinye ya n’envelopu doro anya nwere Adreesị akpa ego nloghachi gị (Adreesị akpa ego Oha nwa oge), ma buru envelopu ahụ gaa n’elu tebụl. Igbe nchekwa ahụ na-anọgide ekpochiri, ọ dịghịkwa onye maara ihe ọzọ dị n’ime ya.

## Nnyocha Miri Emi

### Otu esi arụ Adreesị TEX

Adreesị akpa ego Oha nkịtị na-amalite na `t1` na-ejide hash igodo byte 20, e dere ya na Base58Check. Adreesị TEX na-ejide otu byte 20 ahụ, e degharịrị ya na Bech32m nwere mgbakwunye `tex` (`textest` na testnet). Ịtụgharị otu gaa na nke ọzọ chọrọ ahịrị koodu ole na ole, nke ZIP 320 na-egosi na mmejuputa ntụaka ya.

Nhazi dị mfe a bụ ihe Binance chọrọ: ntụgharị ahụ aghaghị ịrụ ọrụ naanị site na ọbá akwụkwọ Base58Check na Bech32m n’ime koodu front-end nke exchange. Mbipụta mbụ nke ZIP 320 tinyere echiche ahụ n’ime Unified Addresses, a tụfuru ụdị ahụ n’ihi nke a.

Adreesị TEX na-agbazite ntinye Bech32m site n’ụdị Unified Address mana ọ na-edobe ihe fọrọ nke nta ka ọ bụrụ enweghị nhazi ya. Ọ bụrụ na Bech32m na otú e si akwado adreesị Zcash bụ ihe ọhụrụ nye gị, ibe [Unified Addresses](/using-zcash/unified-addresses) na-ekpuchi isi ihe n’okpuru [ZIP 316](https://zips.z.cash/zip-0316). Adreesị TEX dị iche na Unified Address n’ụzọ anọ doro anya:

| | Unified Address (ZIP 316) | Adreesị TEX (ZIP 320) |
|---|---|---|
| Ihe ọ na-ejide | ọtụtụ ndị nnata ejikọrọ ọnụ | otu onye nnata P2PKH Oha |
| Mgbakwunye mmadụ nwere ike ịgụ (HRP) | `u` (mainnet) | `tex` (`textest` na testnet) |
| Nzobe F4Jumble | ee | mba |
| Typecode maka onye nnata ọ bụla | ee | mba |

N’ụzọ dị mkpirikpi, Adreesị TEX bụ mkpuchi Bech32m kachasị dị mfe: otu hash igodo Oha, mgbakwunye `tex`, na enweghị ihe ọzọ.

### Iwu njikwa maka e-akpa ego na ndị na-ejikọ usoro

Nke a bụ akụkụ mmejuputa na-emehie, ya mere ọ bara uru ikwu ya n’ụzọ doro anya. Mgbe e-akpa ego ma ọ bụ onye na-ejikọ usoro chọpụtara Adreesị TEX, ọ **agaghị eji pool nke e chebere echebe kwụọ ozugbo n’ebe TEX aga.** ZIP 320 chọrọ ka ntinye ọ bụla na Kwụọ ụgwọ TEX bụrụ nke Oha, ya mere a na-ewu Kwụọ ụgwọ ahụ n’usoro abụọ:

1. **Wepụ nchebe.** Bugharịa ego ahụ site na pool nke e chebere echebe gaa na Adreesị akpa ego Oha ọhụrụ, nwa oge, nke onye ọrụ na-achịkwa, nke e-akpa ego nwere (Z -> T).
2. **Ziga Oha gaa na Oha.** Wepụta mmepụta nwa oge ahụ gaa na onye nnata P2PKH a kọwara n’ime Adreesị TEX (T -> T).

Iwu ole na ole na-eme ka nke a dị nchebe, ha niile sitere na ZIP 320:

* E kwesịrị isi na Mkpuru mgbake [seed phrase] gị wepụta Adreesị akpa ego nwa oge ahụ, ka ọ bụrụ na exchange ezighachi ego ahụ, e-akpa ego gị ka nwee ike ịchọta ma wepụta ya.
* E kwesịrị iji Adreesị akpa ego nwa oge ọhụrụ oge ọ bụla, ka a ghara ijikọta Kwụọ ụgwọ dị iche iche ọnụ.
* Azụmahia nke abụọ kwesịrị iji naanị ntinye Oha, ka exchange hụ nkwụnye Oha gaa na Oha dị ọcha.

A na-egosi ntụgharị ahụ na usoro nzọụkwụ abụọ na [ZIP 320 reference implementation](https://zips.z.cash/zip-0320#reference-implementation). Imehie nke a bụ nsogbu n’ezie, nke mere n’oge na-adịbeghị anya: n’Ọktoba 2026, ọbá akwụkwọ XChainJS `zcash-js` jụrụ ndị nnata `tex1` ziri ezi n’ihi njehie “Invalid 'to' address”, n’ihi na onye nkwado ya nabatara naanị ụdị Base58Check `t1`, nke mebiri nkwụnye ZEC na ọrụ ndị na-ebipụta Adreesị `tex1` ([issue #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). E doziri ya site n’ịkụziri onye nkwado ahụ ka ọ nabata ntinye ZIP 320 ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Ihe izipu TEX na-ekpughe

Kwụọ ụgwọ TEX bụ Kwụọ ụgwọ Oha, ya mere ọ bụ nke ọhaneze, mana ọ bara uru ikwu kpọmkwem ihe onye na-ekiri nwere na enweghị ike ịhụ.

Ihe **a na-ahụ** on-chain [on-chain]:

* Adreesị akpa ego Oha nwa oge, n’ihi na ọ pụtara dịka mmepụta nke nzọụkwụ iwepụ nchebe na ntinye nke izipu ikpeazụ.
* Ego abụọ ahụ: uru hapụrụ pool nke e chebere echebe na nzọụkwụ Z -> T, na uru e nyefere na nzọụkwụ T -> T.
* Onye nnata Oha nke exchange, nke bụ Adreesị akpa ego P2PKH e tinyere n’ime Adreesị TEX.

Ihe na-anọgide **zoro ezo**:

* Nguzozi gị nke e chebere echebe fọdụrụ, na note [note] nke e chebere echebe kpọmkwem kwadoro Kwụọ ụgwọ ahụ. Nzọụkwụ iwepụ nchebe na-ekpughe na *ụfọdụ* uru hapụrụ pool gaa na Adreesị akpa ego nwa oge, ọ bụghị ebe o siri bịa n’ime pool ahụ.

Ya mere, onye na-ekiri nwere ike ijikọta Adreesị akpa ego nwa oge na Kwụọ ụgwọ exchange (otu ego ahụ, Oha gaa na Oha) ma hụ na e si na mwepụ nke e chebere echebe tinye ya ego. Ha enweghị ike ijikọta ya na ego gị ndị ọzọ nke e chebere echebe ma ọ bụ ọrụ gị. Ọ dịghị ihe on-chain na-akara Kwụọ ụgwọ ahụ dịka izipu “TEX”: dịka ZIP 320 siri kwuo, Kwụọ ụgwọ na Adreesị TEX enweghị ihe dị iche na Kwụọ ụgwọ na Adreesị `t1` kwekọrọ na ya, n’ihi na iwu consensus [consensus] agbanwebeghị, iwu ahụ niile dị n’e-akpa ego.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Ihe blockchain na-egosi

Iwu TEX dị n’e-akpa ego. Node [node] anaghị enyocha ya, ya mere iwu consensus na-adị otu. On-chain, Kwụọ ụgwọ gaa na Adreesị TEX yiri Kwụọ ụgwọ gaa na Adreesị `t1` kwekọrọ na ya. Ego ahụ, Adreesị akpa ego nwa oge, na Adreesị akpa ego exchange bụ nke ọhaneze, dịka Azụmahia Oha ọ bụla.

## Ibe Ndị Metụtara Ya

- [Unified Addresses](/using-zcash/unified-addresses): usoro Adreesị akpa ego `u1` n’okpuru ZIP 316, na isi Bech32m nke Adreesị TEX ji ọzọ.
- [Custodial Exchanges](/using-zcash/custodial-exchanges): exchange ndị na-anabata ụdị Adreesị akpa ego dị iche iche, gụnyere nkwụnye TEX nke Binance.
- [Wallets](/using-zcash/wallets): jiri nzacha TEX Address chọta e-akpa ego ndị nwere ike ịkwụ Adreesị TEX.
- [Shielded Pools](/using-zcash/shielded-pools): ebe nguzozi nzuzo gị nọ tupu Kwụọ ụgwọ TEX ebupụta akụkụ ya.
- [Who Can See Your Zcash Payment](/start-here/who-can-see-your-zcash-payment): ihe na-apụta ìhè ozugbo ego hapụrụ pool nke e chebere echebe.
- [What a Block Explorer Can See](/zcash-tech/what-a-block-explorer-can-see): otú Kwụọ ụgwọ Oha si apụta on-chain.
- [Zcash Payment Request URIs](/using-zcash/payment-request-uris): ụkpụrụ e-akpa ego ọzọ maka Kwụọ ụgwọ ejuputara tupu oge eruo.

**Emelitere ikpeazụ:** Ọktoba 2026
