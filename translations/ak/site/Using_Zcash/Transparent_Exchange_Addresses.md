<a href="https://github.com/zechub/zechub/edit/main/site/Using_Zcash/Transparent_Exchange_Addresses.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Dɛn Ne Zcash TEX Address ahorow?

## TL;DR

* TEX address yɛ Zcash address a ɛda adi pefee a wɔakyerɛw no ɔkwan foforo so. Efi ase wɔ `tex1` na wɔakyerɛkyerɛ mu wɔ [ZIP 320 na ɛwɔ hɔ](https://zips.z.cash/zip-0320).
* Ɛka ade biako kyerɛ wo sika kotoku: fa sika a ɛda adi pefee nkutoo tua address yi.
* Sɛ wɔabɔ wo sika a aka no ho ban a, sika kotoku a ɛne no hyia yɛ anammɔn abien ma wo. Ɛde sika no kɔ bere tiaa mu address a ɛda adi pefee so, afei ɛde kɔ TEX address no so.
* Wɔ afe 2023 mu no, Binance bisaa Zcash mpɔtam hɔfoɔ sɛ wɔmma wɔn ɔkwan a wɔbɛfa so apow sika a wɔde asie a wɔabɔ ho ban na wɔde asan akɔ. TEX address ahorow ne mmuae no, na Binance ne exchange no wɔ ZecHub no so [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges) list a ɛfa TEX sika a wɔde asie.
* Katua a wɔde kɔ TEX address so no yɛ baguam wɔ blockchain no so, te sɛ sikatua biara a ɛda adi pefee. Wo sika a wɔabɔ ho ban no nkae no tra kokoam.

## Nkyerɛkyerɛmu Titiriw

Zcash TEX address yɛ address soronko bi a wɔde gye. TEX gyina hɔ ma "Transparent Exchange". Ɛyɛ Bech32m re-encoding a ɛyɛ p2pkh Transparent address biako. TEX address ahorow no fi ase `tex1` na ɛyɛ ɔkwan a ɛyɛ soronko wɔ Unified Addresses ho.

TEX address ka kyerɛ sika kotoku a ɛne no hyia sɛ ɔnyɛ Transparent-Only (T -> T) asɛm. 

Nteaseɛ no te sɛ deɛ ɛdidi soɔ yi: Sɛ sika kotokuo a ɛne no hyia hu TEX Address bi a, ɛdecode no na ama anya Transparent receiver a ɛwɔ mu no. Afei sika kotoku no de sika a wɔhwehwɛ ma tx no fi Shielded pool no mu kɔ address a ɛyɛ soronko, a nea ɔde di dwuma no di so, a ɛyɛ bere tiaa mu Transparent address (Z -> T). Afei ɛde saa sika no kɔma Transparent receiver a wɔabɔ no decoded a ɛwɔ TEX address (T -> T) no so. 

Wɔakyerɛ mfiridwuma ho nyansahyɛ a ɛfa TEX address ahorow ho wɔ Zcash mu [ZIP 320 na ɛwɔ hɔ](https://zips.z.cash/zip-0320), a ɛkyerɛkyerɛ address su bi a wɔde begye sika afi Transparent Addresses nkutoo mu.

![TEX](/content-images/ZashiTex-b1cbec5f07.webp)

Wɔnnya nnyee TEX address ahorow no ntom kɛse. Ebia wɔbɛhwehwɛ sɛ Zcash dwumadiefoɔ de di dwuma awiei koraa.

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

### TEX address a wotua fi sika a wɔabɔ ho ban mu

ZIP 320 hwehwɛ sika kotoku a ɛne no hyia na ama woatumi ayɛ nkitahodi abien wɔ ha. Nea edi kan no de sika no fi wo sika a wɔabɔ ho ban no mu kɔ address foforo a ɛda adi bere tiaa bi so. Nea ɛto so abien no de wɔn fi saa address no so kɔ TEX address no so.

Sɛ exchange no pow sika a wɔde asie no a, ɛsan de sika no kɔ address a wɔde asie bere tiaa bi no so. Ɛsɛ sɛ wo sika kotoku no tumi hwehwɛ na sɛe wɔn, enti ZIP 320 bisa sika kotoku sɛ wonnya bere tiaa mu address ahorow mfi wo aba kasasin no mu. Ɛsan nso bisa sika kotoku sɛ wɔmfa bere tiaa mu address foforo nni dwuma bere biara, sɛnea ɛbɛyɛ a wɔrentumi mfa sikatua ahorow a ɛsono emu biara nka wɔn ho wɔn ho ho.

### Nea blockchain no kyerɛ

TEX mmara no te sika kotoku mu. Nodes nhwɛ mu, enti mmara a wɔpene so no tra hɔ sɛnea ɛte no ara. On-chain, sika a wotua kɔ TEX address so no te sɛ sika a wotua ma nea ɛne no hyia no `t1` adrɛse. Sika dodow, bere tiaa mu address, ne address a wɔde sesa nneɛma no yɛ ɔmanfo de, te sɛ nea ɛte wɔ asɛm biara a ɛda adi pefee ho no.

## Nkratafa a Ɛfa Ho

- [Nneɛma a Wɔde Sesa Wɔn a Wɔhwɛ Nnipa So](/using-zcash/custodial-exchanges): exchange ahorow a wogye address ahorow a wogye tom, Binance's TEX deposits ka ho.
- [Sika kotoku](/using-zcash/wallets): fa TEX Address filter no di dwuma de hwehwɛ sika kotoku a ebetumi atua TEX address bi.
- [Atare a Wɔabɔ Ho Ban](/using-zcash/shielded-pools): baabi a wo private balance te ansa na TEX akatua bi de ne fã bi akɔ.
- [Hena na Obetumi Ahu Wo Zcash Katua](/start-here/who-can-see-your-zcash-payment): nea ɛbɛyɛ nea wotumi hu bere a sika afi ɔtare a wɔabɔ ho ban no mu pɛn no.
- [Nea Block Explorer Betumi Ahu](/zcash-tech/what-a-block-explorer-can-see): sɛnea sikatua a ɛda adi pefee da adi wɔ nkɔnsɔnkɔnsɔn so.
- [Zcash Katua Abisade URI ahorow](/using-zcash/payment-request-uris): sika kotoku gyinapɛn foforo a wɔde tua sika a wɔadi kan ahyɛ mu ma.

**Wɔyɛɛ no foforo nea etwa to:** October 2026
