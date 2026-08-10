
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Agyapadeɛ

## TL;DR

Zcash Shielded Assets (ZSA) yɛ protocol ntrɛwmu a wɔahyɛ ho nyansa a ɛbɛma agyapade **a ɛnyɛ ZEC** — stablecoins, governance tokens, anaa amanne agyapade biara — atra Zcash shielded pool no mu, a nea ɔde kɔmaa, nea ogye, ne sika dodow no bɛkora kokoam.

- **Nea ɛyɛ:** ERC-20-style amanne agyapade, nanso wɔabɔ ho ban denam default so.
- **Hena na ɔresi no:** [QEDIT NKYERƐKYERƐMU](https://qed-it.com/), wɔ mmoa a efi Zcash Foundation hɔ ase, a wɔne Electric Coin Company ayɛ biako.
- **Sɛnea wɔakyerɛ:** [ZIP 226 na ɛwɔ hɔ](https://zips.z.cash/zip-0226) (transfer na hyew) bom ne [ZIP 227 na ɛwɔ hɔ](https://zips.z.cash/zip-0227) (a wɔde ma).
- **Status:** ɛntena mainnet so. Wɔayɛ nhyehyɛe sɛ wɔde ZSA protocol no bedi dwuma wɔ Network Upgrade 7 (NU7) mu.
- **Fees:** bere nyinaa wotua wɔ ZEC mu, a agyapade a wɔretu no mfa ho.

---

## Nkyerɛkyerɛmu Titiriw

Zcash Shielded Assets (ZSA) yɛ nkɔsoɔ a wɔahyɛ ho nyansa wɔ Zcash protocol no mu a ɛbɛma wɔatumi abɔ, de akɔ baabi foforɔ, na wɔahyew amanne kwan so agyapadeɛ wɔ Zcash nkɔnsɔnkɔnsɔn no so.

Sɛ wunim no yiye a [ERC-20 na ɛwɔ hɔ](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) token gyinapɛn wɔ Ethereum blockchain no so, ZSAs yɛ Zcash sɛnea ERC-20 token yɛ Ethereum.

Zcash Shielded Assets bɛma wɔatumi abɔ amanneɛ tokens wɔ Zcash blockchain no so, na ɛnam so ama tokens a ɛnyɛ [ZEC](/guides/using-zec-privately) sɛnea ɛbɛyɛ a wobenya mfaso afi nsɛm a wɔmmɔ ne kokoam nsɛm a wɔabɔ ho ban wɔ Zcash blockchain no so no mu.

Ade titiriw a wobetumi de ZSA ahorow adi dwuma bɛyɛ sɛ wɔde stablecoins bɛma wɔ Zcash protocol no so. Stablecoins yɛ cryptocurrencies a ɛde wɔn boɔ to fiat sika so, te sɛ US Dollar anaa Euro. Mprempren, stablecoins a wɔkyekyɛ no kɛse no bi ne ERC-20 tokens te sɛ [USDC](https://www.circle.com/en/usdc) ne [Dai](https://docs.makerdao.com/).

Ade foforo a wobetumi de ZSA ahorow adi dwuma ne sɛ wɔde nniso token bɛma. Sɛ nhwɛsoɔ no, Zechub (wiki yi tintimfoɔ) yɛ Decentralized Autonomous Organization (DAO) na ɔbɛtumi ayɛ na ɔde ZSA ama ne mufoɔ ama wɔato aba wɔ nsusuiɛ ne nnisoɔ ho gyinaesie ho.

Wɔreyɛ ZSA ahorow no denam... [QEDIT NKYERƐKYERƐMU](https://qed-it.com/), wɔ mmoa kɛse bi a efi [Zcash Foundation](/zcash-organizations/zcash-foundation) wɔ biakoyɛ mu ne [Electric Coin Company](/zcash-organizations/electric-coin-company). Bere a wɔda so ara reyɛ adwuma yi denneennen no, wɔde nsɛm foforo gu so [saa asaawa yi](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) a ɛwɔ Zcash forum no mu. No [ZSA mmoa akwammisa krataa](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) denam QEDIT so no, wobetumi anya afi Zcash Foundation mmoa wɛbsaet hɔ.

---

## Aniwa so / Nsɛso

### Envelope a wɔatoto mu no

Fa w’adwene bu Zcash a wɔabɔ ho ban wɔ asɛm bi ho sɛ envelope a ɛnyɛ den a wɔatoto mu a wɔde agu ɔmanfo nkrataa adaka mu. Obiara betumi ahu sɛ wɔde envelope bi too hɔ. Obiara ntumi nhu onii a ɔde kɔmaa, onii a ɔboaboa ano, anaa nea ɛwɔ mu — na envelope biara te sɛ nea ɛne foforo biara yɛ pɛ.

Ɛnnɛ, envelope bi a ɛwɔ Zcash network no so tumi kura ade biako pɛ: ZEC.

ZSA nnsesa envelope no. Ɛsesa **nea wɔma ho kwan wɔ mu**. ZSA akyi no, envelope koro no ara a wɔatoto mu no betumi akura stablecoin, DAO nniso token, anaa company nokwaredi point — na sɛ wohwɛ abɔnten a, ɛbɛda so ara te sɛ envelope foforo biara a ɛwɔ network no so pɛpɛɛpɛ.

Ade biako a ɛfata sɛ wokura mu: **wɔtua poste no bere nyinaa wɔ ZEC** mu, ɛmfa ho nea ɛwɔ envelope no mu.

### Nea obi a ɔhwɛ abɔnten so betumi ahu

| Obi a ɔhwɛ ade betumi ahu... | ERC-20 wɔ Ethereum so | ZSA wɔ Zcash so |
| --- | --- | --- |
| Hena na ɔde kɔmaa | Ɔmanfo | Wɔabɔ ho ban |
| Hena na onyaa no | Ɔmanfo | Wɔabɔ ho ban |
| Sɛnea wɔde tu kɔɔ baabi foforo | Ɔmanfo | Wɔabɔ ho ban |
| Ankorankoro kari pɛ | Ɔmanfo | Wɔabɔ ho ban |
| Nneɛma a wɔde ma nyinaa a wɔde ma wɔ agyapade no ho | Ɔmanfo | **Ɔmanfoɔ — wɔahyɛ da** |
| Sika a wotua sika no wɔ | ETH | ZEC |

### Nea enti a supply row no nyɛ bɔne

Ntoatoasoɔ mmienu a ɛwɔ aseɛ wɔ pon no so no ne baabi a ZSA nya anigyeɛ.

ZIP 227 hyɛ da ma **asɛm a wɔde ma no yɛ nea ɛda adi pefee**, sɛnea ɛbɛyɛ a wobetumi adi agyapade biara a ɛkyinkyini no akyi wɔ nkɔnsɔnkɔnsɔn so. Ankorankoro a wokura ne ankorankoro sika a wotua no tra hɔ kokoam; token dodow a ɛwɔ hɔ nyinaa nyɛ saa.

Wɔ stablecoin issuer fam no, saa nkabom no ne asɛm no mmom sen sɛ ɛbɛyɛ apam. Wobetumi ayɛ sika a wɔde asie no ho akontaabu de atoto nneɛma a ɔmanfo betumi agye atom ho, bere a nnipa a wɔde token no di dwuma ankasa no de wɔn sika a aka ne sika a wɔatua no sie wɔn ho.

### Agyapade biako, nipasu biako

Agyapadeɛ biara nya **Agyapadeɛ Nkyerɛkyerɛmu** soronko, a ɛfiri deɛ ɔde maeɛ no safoa a ɔde maeɛ no mu a ɛka agyapadeɛ no ho nkyerɛkyerɛmu a wɔakyerɛw ho. Wɔn a wɔde mae ahorow abien ntumi nyɛ ade a ɛkyerɛ sɛ obi yɛ ade koro, na sɛ wobɛbɔ agyapade bi anaasɛ wobɛsesa a, ɛhwehwɛ sɛ wɔde cryptographic tumi krataa fi nea ɔde mae no hɔ. Wɔ envelope mu no: obiara betumi de envelope bi ahyɛ krataa so, nanso mint a ɛwɔ agyapade bi a wɔde ama no nkutoo na ebetumi atintim pii.

---

## Deep Dive a Wɔde Nsu Gu Mu

### ZSA Demo wɔ Zebra so

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Run demo no ma wo ho!**

Clone zcash-tx-tool akoraeɛ no: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Nkɔsoɔ Ho Nsusuiɛ (ZIPs) .

- [ZIP 226 na ɛwɔ hɔ](https://zips.z.cash/zip-0226): Zcash Shielded Assets a wɔde kɔ baabi foforo ne nea wɔhyew
- [ZIP 227 na ɛwɔ hɔ](https://zips.z.cash/zip-0227): Zcash Shielded Assets a Wɔde Ma
- [ZIP 230 na ɛwɔ hɔ](https://zips.z.cash/zip-0230): Version 6 Nkitahodi Nhyehyɛe

> **Hyɛ no nsow wɔ ZIP 230 ho:** Efi saa bere no wɔayi ZIP 230 afi hɔ na wɔremfa nni dwuma. Transaction version 6 no afei wɔakyerɛkyerɛ mu denam [ZIP 229 na ɛwɔ hɔ](https://zips.z.cash/zip-0229). Hwɛ amanneɛbɔ a ɛwɔ atifi hɔ no [ZIP 230 na ɛwɔ hɔ](https://zips.z.cash/zip-0230) kratafa.

ZIP 226 kyerɛkyerɛ OrchardZSA protocol — Orchard protocol no ntrɛwmu a ɛde amanne kwan so agyapadeɛ a wɔde kɔ baabi foforɔ ne nea wɔhyeeɛ. ZIP 227 kyerɛkyerɛ sɛdeɛ wɔbɔ saa agyapadeɛ no wɔ nea ɛdi kan no mu, na ɛsɛ sɛ wɔde di dwuma ka ZIP 226 ho nko ara.

### ZSA Mmoa Ho Nsusuwii

ZSA nyansahyɛ a ɛfa Shielded Assets (ZSA/UDA) ho no,... [QEDIT NKYERƐKYERƐMU](https://qed-it.com/) kuw a wɔbɛkyekyere generic shielded agyapade wɔ Zcash blockchain no so. Wɔtaa frɛ eyinom sɛ User Defined Assets (UDA) anaa Zcash Shielded Assets (ZSA).

Wɔde saa nyansahyɛ yi mae no, kuw a ɛwɔ... [QEDIT NKYERƐKYERƐMU](https://qed-it.com/) nhyehyɛe sɛ wɔde DeFi bɛba Zcash abɔdeɛ a nkwa wom nhyehyɛeɛ no mu na, berɛ korɔ no ara mu no, wɔama wɔatumi de kokoamsɛm mfiridwuma a ɛyɛ papa adi dwuma wɔ DeFi abɔdeɛ a nkwa wom nhyehyɛeɛ a ɛwɔ hɔ dada no mu. Wɔ nhwehwɛmu bi a wɔyɛe wɔ nhwehwɛmu bi mu no, kuw no bisae, na mpɔtam hɔfo buae saa [generic shielded assets (ZSA/UDA) ne ade a wɔhwehwɛ sen biara mprempren](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Saa nsusuwii ahorow yi yɛ nea wɔbata ho wɔ mfiridwuma mu [Zcash Nkɔsoɔ Ho Nsusuiɛ (ZIP) .](https://zips.z.cash/zip-0000) nkyerɛkyerɛmu na wɔakyerɛkyerɛ mu wɔ ZIP 226 & ZIP 227 mu.

1. [ZIP 226 na ɛwɔ hɔ](https://zips.z.cash/zip-0226): Zcash Shielded Assets a wɔde kɔ baabi foforo ne nea wɔhyew
2. [ZIP 227 na ɛwɔ hɔ](https://zips.z.cash/zip-0227): Zcash Shielded Assets a Wɔde Ma

---

## Nkyerɛkyerɛmu a mfaso wɔ so

**Sɛ wokura anaa wode ZEC di dwuma a**

- Wɔakyerɛ ZSA ase sɛ Orchard ntrɛwmu ("OrchardZSA"), enti anka wɔbɛkyɛ mfiri a wɔabɔ ho ban a ZEC de di dwuma dedaw no. Wo sika kotoku no behia ZSA mmoa a ɛda adi pefee ansa na atumi akura anaa ɛde amena.
- Wobɛhia ZEC bi wɔ wo nsam bere nyinaa. Wɔtua sika a wɔbɔ wɔ ZSA a wɔde ma ne nea wɔde kɔ baabi foforo ho wɔ ZEC mu, na ɛnyɛ agyapade no ankasa mu.
- Biribiara nni wo ZEC nnwuma a ɛwɔ hɔ dedaw no ho a ɛsakra.

**Sɛ woyɛ obi a obetumi de ama — stablecoin, DAO, adwumakuw**

- Agyapade a wode bɛma no hwehwɛ sɛ wode cryptographic tumi krataa a wɔakyekyere wɔ safoa a wɔde ma ho, enti wo nkutoo na wubetumi ayɛ mint anaa woasesa w’ankasa w’agyapade no su ahorow.
- W’agyapade no circulating supply no yɛ nea ɔmanfo betumi ahwɛ bere a wo users’ balances ne transfers no nyɛ saa. Wɔ obi a wɔahyɛ no mmara sɛ ɔde ma fam no, mpɛn pii no eyi ne nea wɔaka abom pɛpɛɛpɛ a wɔhwehwɛ.
- Adwuma biako a wɔde ma no betumi ama wɔanya agyapade bɛboro biako prɛko pɛ.

**Ma abɔde a nkwa wom ho nhyehyɛe**

- Esiane sɛ wɔde ZSA ka biara wɔ ZEC mu nti, dwumadi a ɛwɔ daakye agyapade biara a wɔde bɛma wɔ Zcash so no ma wɔhwehwɛ ZEC ankasa.

---

## Mfomso a Ɛtaa Tu

| Gyidi a wɔtaa nya | Dɛn na ɛte ankasa |
| --- | --- |
| "ZSAs no wɔ Zcash so nnɛ." | Wɔnnyɛ saa. Wɔayɛ nhyehyɛe sɛ wɔde ZSA bedi dwuma wɔ Network Upgrade 7 (NU7) mu na wɔda so ara wɔ nhwehwɛmu ne sɔhwɛ mu. |
| "ZSA de smart contracts brɛ Zcash." | ZSA kyerɛ sɛnea wɔde agyapade bɛma, wɔde bɛma ne sɛnea wɔhyew. Ɛnyɛ apam a wɔde yɛ nhyehyɛe a wɔde di dwuma wɔ ɔkwan a ɛkɔ akyiri so. |
| "Wobɛtumi atua ZSA ka wɔ ZSA token no ankasa mu." | Wɔtua sika no wɔ ZEC mu. |
| "Sɛ wɔabɔ ho ban a, ɛsɛ sɛ token supply no nso yɛ kokoam." | ZIP 227 ma wɔhyɛ da ma nneɛma a wɔde ma no da adi pefee, enti wobetumi adi agyapade biara a wɔde ma no akyi wɔ baguam. Sika a aka ne sika a wɔde kɔma afoforo no tra hɔ kokoam; nea wɔde ma no nyɛ saa. |
| "ZIP 230 yɛ mprempren version 6 asɛmdi nhyehyɛe." | Wɔayi ZIP 230 no afi hɔ. Mprempren wɔde ZIP 229 na ɛkyerɛkyerɛ Version 6 no mu. |

---

## Nkratafa a Ɛfa Ho

- [Halo](/zcash-tech/halo) — proving nhyehyɛe a ɛwɔ Orchard akyi, protocol ZSA trɛw
- [Zk-SNARKs a wɔde di dwuma](/zcash-tech/zk-snarks) — zero-nimdeɛ adanseɛ a ɛma wɔdi shielded transfer bi ho adanseɛ a wɔanna no adi
- [Atare a Wɔabɔ Ho Ban](/using-zcash/shielded-pools) — baabi a na ZSAs bɛtena ZEC nkyɛn
- [Nkitahodi ahorow](/using-zcash/transactions) — sɛnea wɔde Zcash asɛm bi bom
- [Zebra Full Node a Ɛyɛ Fɛ](/zcash-tech/zebra-full-node) — node dwumadie a wɔde di dwuma wɔ ZSA demo a ɛwɔ atifi hɔ no mu
