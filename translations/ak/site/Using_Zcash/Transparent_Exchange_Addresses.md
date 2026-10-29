<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dɛn Ne Zcash TEX Address ahorow?

## TL;DR

* TEX address yɛ Zcash address a ɛda adi pefee a wɔakyerɛw no ɔkwan foforo so. Efi ase wɔ `tex1` na wɔakyerɛkyerɛ mu wɔ [ZIP 320 na ɛwɔ hɔ](https://zips.z.cash/zip-0320).
* Ɛka ade biako kyerɛ wo sika kotoku: fa sika a ɛda adi pefee nkutoo tua address yi.
* Sɛ wɔabɔ wo sika a aka no ho ban a, sika kotoku a ɛne no hyia yɛ anammɔn abien ma wo. Ɛde sika no kɔ bere tiaa mu address a ɛda adi pefee so, afei ɛde kɔ TEX address no so.
* Wɔ afe 2023 mu no, Binance bisaa Zcash mpɔtam hɔfoɔ sɛ wɔmma wɔn ɔkwan a wɔbɛfa so apow sika a wɔde asie a wɔabɔ ho ban na wɔde asan akɔ. TEX address ahorow ne mmuae no, na Binance ne exchange no wɔ ZecHub no so [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges) list a ɛfa TEX sika a wɔde asie.
* Mmoa anyin wɔ ɔfã a wɔde mena no nso: Coinbase ma wɔn a wɔde di dwuma no de ZEC kɔ TEX address ahorow so, na sika kotoku nnwinnade de ZIP 320 mmoa aka ho.
* Katua a wɔde kɔ TEX address so no yɛ baguam wɔ blockchain no so, te sɛ sikatua biara a ɛda adi pefee. Wo sika a wɔabɔ ho ban no nkae no tra kokoam.

## Nkyerɛkyerɛmu Titiriw

Zcash TEX address yɛ address soronko bi a wɔde gye. TEX gyina hɔ ma "Transparent Exchange". Ɛyɛ Bech32m re-encoding a ɛyɛ p2pkh Transparent address biako. TEX address ahorow no fi ase `tex1` na ɛyɛ ɔkwan a ɛyɛ soronko wɔ Unified Addresses ho.

TEX address ka kyerɛ sika kotoku a ɛne no hyia sɛ ɔnyɛ Transparent-Only (T -> T) asɛm. 

Nteaseɛ no te sɛ deɛ ɛdidi soɔ yi: Sɛ sika kotokuo a ɛne no hyia hu TEX Address bi a, ɛdecode no na ama anya Transparent receiver a ɛwɔ mu no. Afei sika kotoku no de sika a wɔhwehwɛ ma tx no fi Shielded pool no mu kɔ address a ɛyɛ soronko, a nea ɔde di dwuma no di so, a ɛyɛ bere tiaa mu Transparent address (Z -> T). Afei ɛde saa sika no kɔma Transparent receiver a wɔabɔ no decoded a ɛwɔ TEX address (T -> T) no so. 

Wɔakyerɛ mfiridwuma ho nyansahyɛ a ɛfa TEX address ahorow ho wɔ Zcash mu [ZIP 320 na ɛwɔ hɔ](https://zips.z.cash/zip-0320), a ɛkyerɛkyerɛ address su bi a wɔde begye sika afi Transparent Addresses nkutoo mu.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

### Wɔde TEX address ahorow di dwuma kɛse dɛn?

Abofra a wɔfa wɔn sɛ wɔn mma no da so ara yɛ fã bi, nanso ɛnyɛ nea wɔde sesa ade biako pɛ bio. Ɛfata sɛ yɛtetew dwumadi ahorow abien mu:

* **TEX deposit address ahorow a wɔde ma.** Binance ne exchange a ɛwɔ yɛn [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges) list a ɛde TEX address a wɔde sie ma, sɛnea ɛbɛyɛ a sika no befi baabi a ɛda adi pefee ([ZIP 320, Akyisɛm](https://zips.z.cash/zip-0320#background)). ZIP 320 nhwɛ kwan sɛ exchange afoforo bɛma TEX address gye sɛ ɛho hia sɛ wohu address a sikatua bi fi bae.
* **Sending to TEX addresses.** Eyi ne ɔfã a anyin. Wɔ October 2024 mu no, Coinbase de too gua sɛ Coinbase.com dwumadiefoɔ bɛtumi de Zcash akɔ TEX address ahodoɔ so ([Coinbase Agyapadeɛ ho dawurubɔ](https://x.com/CoinbaseAssets/status/1844428577921507416)). Wallet toolkits de ZIP 320 mmoa nso aka ho: KeepKey de nsaano nkyerɛwee aka ho ama TEX nkitahodi wɔ firmware 7.15 ([keepkey/hdwallet #75 na ɛwɔ hɔ](https://github.com/keepkey/hdwallet/pull/75)), ne XChainJS `zcash-js` nhomakorabea no yɛɛ patch bere a ɛpow sɛ ɛyɛ nokware akyi `tex1` wɔn a wogye no (ɛno ho nsɛm pii wɔ ase ha).

Enti TEX address ahorow nyɛ amansan nyinaa de, nanso ɛnsɛ sɛ ɔkenkanfo fa no bio sɛ Binance nkutoo ne beae a epue.

### Bere Bɛn na Mehia TEX Address

#### Wohia TEX address bere a wode sika rekɔ Transparent address so denam sika kotoku a ɛnboa sɛ wode bɛkɔ Transparent address so tẽẽ no so.

Sika kotoku binom mma kwan mma wɔmfa nkɔ Transparent address so tẽẽ, na ebia nea ogye no remfa TEX a ɛne no sɛ no mma. Enti, ɛtɔ mmere bi a, ebia ɛho behia sɛ wobɛdan afi Transparent so akɔ TEX address so. Wobetumi de nsa ayɛ eyi denam reference implementation a wɔakyerɛkyerɛ mu wɔ [zip-320 na ɛwɔ hɔ](https://zips.z.cash/zip-0320#reference-implementation).

#### Wohia TEX address bere a wode sika rekɔ centralized exchange a ɛhwehwɛ sɛ saa sika no fi Transparent fibea.

[Binance](https://www.binance.com/) ne nea enti a TEX address ahorow wɔ hɔ no. Wɔ November 2023 mu no, ɛka kyerɛɛ Zcash mpɔtam hɔfoɔ sɛ wɔbɛtumi ayi ZEC afiri wɔn din mu gye sɛ ɔkwan bi wɔ hɔ a wɔbɛfa so apow sika a wɔde bɛto hɔ afiri address a wɔabɔ ho ban so na wɔde asan akɔma nea ɔde sika asie no ([ZIP 320, Akyisɛm](https://zips.z.cash/zip-0320#background)). ZIP 320 nhwɛ kwan sɛ exchange afoforo bɛma TEX address gye sɛ ɛho hia sɛ wohu address a sikatua bi fi bae. Binance ne exchange no wɔ yɛn so [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges) list a ɛde sika a wɔde asie kɔ TEX address bi so.
TEX address ahorow no bɔ sika kotoku a ɛne no hyia amanneɛ sɛ ɛsɛ sɛ sika a wɔde kɔ saa address no so nyinaa yɛ nea ɛda adi pefee na ɛyi bo biara a wɔabɔ ho ban no fi mu na wɔmfa nkɔ address a wɔaka ho asɛm no so.
Sɛ exchange te sɛ Binance pow bo a wɔde amena no a, ɛwɔ ɔkwan a ɛho hia a ɛbɛsan de saa bo no asan akɔ address a efi so bae no so. Ɛsan nso boa nnwumakuw te sɛ Binance ma wodi mmara ne nhyehyɛe ahorow a aban anaa atumfoɔ afoforo de ahyɛ wɔn so no so.

### Sika kotoku bɛn na ɛboa TEX Address ahorow?

Wubetumi ahwɛ list a ɛyɛ foforo sen biara wɔ yɛn [sika kotoku](/using-zcash/wallets) kratafa. Fa TEX Address afiri no di dwuma.

## Aniwa so / Nsɛso

Fa wo sika a wɔabɔ ho ban no sɛ sika a ɛwɔ sikakorabea a wɔato mu wɔ fie. Obiara nni abɔnten a obetumi ahu dodow a ɛwɔ mu no.

Exchange te sɛ Binance wɔ sɛnkyerɛnne bi wɔ ne counter so: sikatua a wogye tom wɔ envelope a emu da hɔ nkutoo mu, enti sika sohwɛfo no betumi ahu baabi a sika no fi na ɔde asan de ama sɛ ɛho hia a. TEX address no ne saa sɛnkyerɛnne no.

Sɛ wo sika kotoku no hu sɛnkyerɛnne no a, eyi sika no fi sikakorabea no mu, de gu krataa a emu da hɔ a wo sankɔ address wɔ so mu (bere tiaa mu address a ɛda adi pefee), na ɛde krataa no kɔ counter no so. Safe no kɔ so to mu, na obiara nsua nea ɛwɔ mu bio.

## Deep Dive a Wɔde Nsu Gu Mu

### Sɛnea wɔkyekye TEX address

Address a ɛyɛ mmerɛw a ɛda adi pefee a efi ase `t1` kura 20-byte key hash, a wɔakyerɛw wɔ Base58Check mu. TEX address kura baiti 20 koro no ara, a wɔasan de ahyɛ Bech32m mu a wɔde prefix no ahyɛ mu `tex` (`textest` wɔ testnet so). Sɛ wobɛdan biako akɔ foforo mu a, egye koodu nkyerɛwde kakraa bi, a ZIP 320 kyerɛ wɔ ne nkyerɛkyerɛmu a wɔde di dwuma no mu.

Na nhyehyeɛ a ɛnyɛ den no yɛ ahwehwɛdeɛ a ɛfiri Binance: na ɛsɛ sɛ nsakraeɛ no tu mmirika a Base58Check ne Bech32m nwomakorabea nko ara na ɛwɔ exchange no anim-awieɛ koodu mu. ZIP 320 a wɔadi kan ayɛ no de adwene no yɛɛ Unified Addresses, na wogyaee saa nkyerɛase no esiane eyi nti.

TEX address ahorow no fɛm Bech32m encoding no fi Unified Address format no mu nanso ɛkame ayɛ sɛ ɛnkora ne nhyehyɛe no mu biara so. Sɛ woyɛ foforo wɔ Bech32m ne sɛnea Zcash address ahorow no yɛ nokware a,.. [Address ahorow a Wɔaka abom](/using-zcash/unified-addresses) kratafa no ka mfitiasesɛm a ɛwɔ ase hɔ no ho asɛm [ZIP 316 na ɛwɔ hɔ](https://zips.z.cash/zip-0316). TEX address yɛ soronko wɔ Unified Address ho wɔ akwan anan a ɛyɛ nokware so:

| | Address a Wɔaka abom (ZIP 316) | TEX address (ZIP 320) |
|---|---|---|
| Nea ɛkura mu | agyefo pii a wɔaboaboa ano | P2PKH a ɛyɛ mmerɛw a wɔde gye nneɛma biako |
| Nsɛmfua a wɔde di kan a nnipa tumi kenkan (HRP) | `u` (mainnet) | `tex` (`textest` wɔ testnet so) |
| F4Jumble a ɛyɛ adwenem naayɛ | Aane | no |
| Typecodes ma obiara a ogye no | Aane | no |

Ne tiawa mu no, TEX address ne Bech32m wrapper a ɛda adi pefee sen biara: key hash biako a ɛda adi, a `tex` prefix, na biribi foforo biara nni hɔ.

### Mmara a ɛfa sika kotoku ne integrators ho dwumadie ho

Eyi ne ɔfã a implementations ayɛ nea ɛnteɛ, enti ɛfata sɛ yɛka no pefee. Sɛ wohu TEX address a, ɛnsɛ sɛ sika kotoku anaa integrator **sɛe sika fi shielded pool no mu kɔ TEX destination no mu tẽẽ.** ZIP 320 hwehwɛ sɛ biribiara a wɔde bɛkɔ TEX akatua mu no yɛ nea ɛda adi pefee, enti wɔkyekye sikatua no sɛ anammɔn abien:

1. **Deshield.** Fa sika no fi shielded pool no mu kɔ address foforo a ɔde di dwuma no so bere tiaa mu transparent address a sika kotoku no wɔ (Z -> T).
2. **Send transparent to transparent.** Fa saa ephemeral output no kɔ decoded P2PKH receiver a ɛwɔ TEX address no mu (T -> T).

Mmara kakraa bi ma eyi yɛ nea ahobammɔ wom, ne nyinaa fi ZIP 320:

* Ɛsɛ sɛ wonya address a ɛyɛ bere tiaa mu de no fi wo aba kasasin no mu, sɛnea ɛbɛyɛ a sɛ exchange no san de sika no ba a, wo sika kotoku no da so ara betumi ahu na wɔasɛe no.
* Ɛsɛ sɛ wɔde address foforo a wɔde di dwuma bere tiaa bi di dwuma bere biara, enti wontumi mfa sikatua ahorow a ɛsono emu biara nka wɔn ho wɔn ho ho.
* Ɛsɛ sɛ asɛm a ɛto so abien no sɛe nneɛma a wɔde ba a ɛda adi pefee nkutoo, enti nsakrae no hu sika a wɔde asie a ɛho tew a ɛda adi pefee a ɛda adi pefee.

Nsakyeraeɛ ne anammɔn mmienu a ɛsen no wɔakyerɛ wɔ [ZIP 320 nkyerɛkyerɛmu a wɔde di dwuma](https://zips.z.cash/zip-0320#reference-implementation). Eyi a wobɛnya no bɔne yɛ ɔhaw ankasa, nnansa yi ara: wɔ October 2026 mu no XChainJS `zcash-js` nhomakorabea a wɔpowee sɛ ɛyɛ nokware `tex1` agyefoɔ a wɔwɔ "Invalid 'to' address" mfomsoɔ, ɛfiri sɛ ne validator no gyee Base58Check nko ara `t1` form, a ɛbubuu ZEC deposits to services a ɛtintim a `tex1` adrɛse ([nsɛmma nhoma #1782](https://github.com/xchainjs/xchainjs-lib/issues/1782)). Wɔnam kyerɛkyerɛɛ a wɔkyerɛkyerɛɛ validator no sɛ onnye ZIP 320 encoding ([PR #1783](https://github.com/xchainjs/xchainjs-lib/pull/1783)).

### Nea TEX a wɔde mena da no adi

TEX sikatua yɛ sikatua a ɛda adi pefee, enti ɛyɛ ɔmanfo de, nanso ɛfata sɛ yɛka nea obi a ɔhwɛ ade betumi ahu ne nea ontumi nhu no pɛpɛɛpɛ.

Nea ɛyɛ **visible** wɔ nkɔnsɔnkɔnsɔn so:

* Address a ɛda adi bere tiaa bi no, efisɛ ɛda adi sɛ nea efi deshield anammɔn no mu ba ne nea wɔde kɔma nea etwa to no.
* Sika mmienu no nyinaa: boɔ a ɛfirii shielded pool no mu wɔ Z -> T anammɔn no mu, ne boɔ a wɔde maeɛ wɔ T -> T anammɔn no mu.
* Exchange no transparent receiver, a ɛyɛ P2PKH address a wɔakyerɛw wɔ TEX address no mu.

Nea ɛtra hɔ **hintaw**:

* Wo sika a aka a wɔabɔ ho ban no nkae, ne nkrataa pɔtee a wɔabɔ ho ban na ɛde sika tuaa sika no. Deshield anammɔn no da no adi sɛ *bi* boɔ gyaw ɔtare no kɔɔ ephemeral address no so, ɛnyɛ baabi a ɛfiri ɔtare no mu.

Enti obi a ɔhwɛ ade betumi de bere tiaa mu address no abata sika a wɔde sesa nneɛma no ho (sika koro no ara, a ɛda adi pefee kosi nea ɛda adi pefee) na obetumi ahu sɛ wɔde kaa ho fii sika a wɔayi a wɔabɔ ho ban mu. Wɔrentumi mfa nkɔ wo sika anaa dwumadi afoforo a wɔabɔ ho ban no ho. Biribiara nni hɔ a ɛwɔ nkɔnsɔnkɔnsɔn so a ɛhyɛ sikatua no agyirae ankasa sɛ "TEX" a wɔde mena: sɛnea ZIP 320 hyɛ no nsow no, sikatua a wɔde kɔ TEX address so no, wontumi nkyerɛ nsonsonoe a ɛda sikatua a wɔde kɔ nea ɛne no hyia no ntam `t1` address, efisɛ mmara a wɔpene so no nsakrae na mmara no nyinaa te sika kotoku no mu.

![On-chain footprint of a TEX send: funds leave the shielded pool to an ephemeral transparent address, then go transparent-to-transparent to the exchange; the ephemeral address, both amounts and the exchange address are visible, while the rest of the shielded balance stays hidden](/content-images/tex-onchain-footprint.webp)

### Nea blockchain no kyerɛ

TEX mmara no te sika kotoku mu. Nodes nhwɛ mu, enti mmara a wɔpene so no tra hɔ sɛnea ɛte no ara. On-chain, sika a wotua kɔ TEX address so no te sɛ sika a wotua ma nea ɛne no hyia no `t1` adrɛse. Sika dodow, bere tiaa mu address, ne address a wɔde sesa nneɛma no yɛ ɔmanfo de, te sɛ nea ɛte wɔ asɛm biara a ɛda adi pefee ho no.

## Nkratafa a Ɛfa Ho

- [Address ahorow a Wɔaka abom](/using-zcash/unified-addresses): no `u1` address format wɔ ZIP 316 ase, ne Bech32m mfitiaseɛ no TEX address bi san de di dwuma.
- [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges): exchange ahorow a wogye address ahorow a wogye tom, Binance's TEX deposits ka ho.
- [Sika kotoku](/using-zcash/wallets): fa TEX Address filter no di dwuma de hwehwɛ sika kotoku a ebetumi atua TEX address bi.
- [Atare a Wɔabɔ Ho Ban](/using-zcash/shielded-pools): baabi a wo private balance te ansa na TEX akatua bi de ne fã bi akɔ.
- [Hena na Obetumi Ahu Wo Zcash Katua](/start-here/who-can-see-your-zcash-payment): nea ɛbɛyɛ nea wotumi hu bere a sika afi ɔtare a wɔabɔ ho ban no mu pɛn no.
- [Nea Block Explorer Betumi Ahu](/zcash-tech/what-a-block-explorer-can-see): sɛnea sikatua a ɛda adi pefee da adi wɔ nkɔnsɔnkɔnsɔn so.
- [Zcash Katua Abisade URI ahorow](/using-zcash/payment-request-uris): sika kotoku gyinapɛn foforo a wɔde tua sika a wɔadi kan ahyɛ mu ma.

**Wɔyɛɛ no foforo nea etwa to:** October 2026
