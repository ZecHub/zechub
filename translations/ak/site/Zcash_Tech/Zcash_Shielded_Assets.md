
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Akorafoɔ a wɔhwɛ wɔn so no

## TL;DR

Zcash Shielded Assets (ZSA) are a proposed protocol extension that would let assets **other than ZEC** — stablecoins, governance tokens, or any custom asset — live inside Zcash's shielded pool, with the sender, the recipient, and the amount kept private.

- Nea ɛyɛ: Custom assets a ɛte sɛ ERC-20, nanso wɔabɔ ho ban.
- **Nea ɔreyɛ no:** [QEDIT]](https://qed-it.com/), wɔ Zcash Foundation mmoa a wɔde ma no mu, ne Electric Coin Company ayɛ adwuma.
- **Sɛnea wɔ kyerɛ no:** [ZIP code 226]](https://zips.z.cash/zip-0226) (de akɔto na wɔ ahyew) ne [ZIP code 227] nyinaa bom.](https://zips.z.cash/zip-0227) (Ɔfã a wɔyi no).
- **Status:** no live on mainnet. ZSA protocol na w'ahyehyɛ sɛ wɔde bɛyɛ adwuma wɔ Network Upgrade 7 (NU7).
- ** Fees:** always paid in ZEC, regardless of the asset being moved. - Akwantu no a wɔfa so de kɔ mmeae foforo biara yɛ nea wɔde di dwuma bere nyinaa.

---

## Nkyerεkyerεmu Titiriw

Zcash Shielded Assets (ZSA) yɛ nhyehyɛeɛ a wɔabɔ ho dawuro sɛ wɔbɛboa ama wɔnya kwan de abɔ, wɔde akɔma afoforo na wɔasɔ nneɛma bi agu so.

Sɛ w'ani gye [ERC-20 ho a, fa yɛ nhwehwɛmu na hu sɛ:](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) Token a y'atwe no asi hɔ wɔ Ethereum blockchain so, ZSAs yɛ ma Zcash te sɛ ERC-20 tokens ne Ethereum.

Zcash Shielded Assets bɛma kwan ama aberɛbɔ tokens wɔ zcash blockchain so, na ɛnam saa nti no ɛbɛma tokens a ɛnnyɛ [ZEC]](/guides/using-zec-privately) sɛ wobenya mfasoɔ afi din a wɔnnim ne kokoam nsɛm mu wɔ Zcash blockchain so.

A major potential use of ZSAs would be to issue stablecoins on the Zcash protocol. Stablecoins are cryptocurrencies that peg their value to a fiat currency, such as the US Dollar or Euro. Currently, some of the most widely circulated stablecoins are ERC-20 tokens such as [USDC](https://www.circle.com/en/usdc) ne [Dai no ho a'a]](https://docs.makerdao.com/).

Ade foforo a wobetumi de ZSA adi dwuma ne sɛ wɔbɛma wɔn kwan ama wɔadi akwankyerɛ so. SƐ nhwɛso no, Zechub (ɔno na ɔhyehyɛ wiki yi) yɛ Decentralized Autonomous Organization (DAO), enti obetumi abɔ ma n'asafofoɔ anya tumi atow aba afa nhyehyɛe ho anaa aban gyinaesi ahorow mu.

ZSAs a w'ayε no yε [QEDIT] na εde reboa.](https://qed-it.com/), wɔ [Zcash Foundation no ntoboa kɛse bi ase.](/zcash-organizations/zcash-foundation) wɔ ne [Electric Coin Company] ayɔnkofa mu no,](/zcash-organizations/electric-coin-company).Esiane sɛ saa dwumadie yi da so wɔ nkɔso mu nti, wɔde nsɛm a aba foforo no hyɛ [ɔkwan foforɔ] yi so.](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) Zcash forum no. [ZSA mmoa ho adesrɛde] a wɔabisae sɛ wɔde ma obi biara, na wɔn nyinaa de maa yɛn".](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) QEDIT wɔ Zcash Foundation mmoa website no so.

---

## Adwene a wohwɛ mu / Sɛnsεm

### Krataafa a wɔabɔ ano pam no.

Susuw Zcash a w'abɔ ho ban no sɛ envelope bi a wɔato mu na wɔde ato baguam. Obiara tumi hu sɛ yɛde enveloppe no agu krataa so, obiara ntumi nhu nea ɔsomaa no anaa ɔfaa ne de bae anaasɛ deɛ ɛwɔ emu  na enveloppes nyinaa yɛ pɛ biara.

Ɛnnɛ, biribi biako pɛ na ebetumi akɔ envelope a ɛwɔ Zcash dwumadibea no mu: ZEC.

ZSA nsesa envelope no. Ɛsesa nea wɔ ma ho kwan wͻ mu**. Wᴐ ZSA akyi, saa enveloppe a ͻwͻ nkatabo ano yi ara betumi de stablecoin, DAO nniso tokens anaa adwumakuw nokwaredi agyiraehyɛde bi adi dwuma na efi abɔnten so no bεda adi sԑ ne nyinaa te sɛ envelopa biara wᴐ network no mu.

Ade biako a ɛsɛ sɛ yɛkae: ** wɔtua ZEC mu daa, ɛmfa ho nea ɛwɔ envelope no mu.

### Nea obi a ɔwɔ abɔnten betumi ahu

Obi a ɔhwɛ no bɛtumi ahu... ERC-20 wɔ Ethereum so, ZSA wɔ Zcash so.
| --- | --- | --- |
Ԑhefo na wɔsomaa no? Aban abɔ wɔn ho ban.
Ԑhefo na wɔgyee no? Aban abɔ wɔn ho ban.
Ԑhe na wɔsesaa no? Yԑde ato dwa. Yɛbɔ ho ban.
Ankorankoro nkaeԑbɔ. Aban no mu nnipa a wɔabɔ wɔn ho ban.
de no nyinaa ma w'ade mu wɔ baguam. (Ɔmanfo) **Abanfoɔ a wɔn ani da so**
Dwetɛ a wɔtua ka no ETH ZEC.

### Deɛn nti na supply row no nyɛ bug?

Nsaano nkyerɛwee a ɛwɔ ase hɔ no yɛ nea ZSA ani gye ho.

ZIP 227 deliberately keeps **issuance transparent**, so that the circulating supply of every asset can be tracked on-chain. Individual holdings and individual payments stay private; the total number of tokens in existence does not.

Wɔ stablecoin a wɔde ma no ho de, saa nkitahodi yi yɛ ade titiriw sen sɛ ɛbɛboa. Wobetumi ahwɛ nnwumakuw so wɔ baabiara na wɔatumi ahu wɔn mu biara sika dodow anaa ne kɛse, bere a nnipa a wͻde tokens di dwuma ankasa no sie wɔn akatua ne ka ahorow no ma wɔn ara.

### Ade biako, su koro a ɛne nnipa bɔbea hyia.

Aset biara nya **Asset Identifier** soronko, a efi nea ɔde no ma ne krataa mu. Nsesafo mmienu ntumi mma wɔn nsa nka identifier koro no ara na sɛ obi pɛ sɛ ɔtwe sika bi anaa ɔsesa biribi a ɛsɛsɛ onya cryptographic tumi afiri deɛ ɔde mae hɔ. Sɛ yɛde envelope di dwuma aa: obiara betumi de enveloppe ato dwa nanso mint nkoara na ɛtumi tintim emu pii.

---

## Fa Wo Ho Hyɛ Ahonya Mu Kɔɔ Firi Ase

### ZSA Demos wɔ Zebra so

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Fa demo no yɛ wo ankasa!**

Fa zcash-tx-tool akoraeɛ no siesie: <https://github.com/QED-it/zcash_tx_tool>

### Zcash Ntɔsoɔ a Wɔbɔ (ZIPs)

- [ZIP code 226] Ɔyɛ ɔmansin sohwɛfo.](https://zips.z.cash/zip-0226): Zcash Akorae a Wɔbɔ Ho Ban Nkyekyɛm ne Ɔhyew
- [ZIP code 227] Ɔyɛ ɔmansin sohwɛfo.](https://zips.z.cash/zip-0227): Zcash Akora Ahodoɔ a Wɔbɔ Ho Ban no ho Nsɛm
- [ZIP code 230] Ɔyɛ ɔmansin sohwɛfo.](https://zips.z.cash/zip-0230): Nkyerεmu 6 Dwumadie no Nhyehyɛe

> **Notes on ZIP 230:**ZIP 230 no na wɔayi afi mu, wonfa nni dwuma.](https://zips.z.cash/zip-0229). Hwɛ nkrataa a ɛwɔ [ZIP code 230] no atifi hɔ.](https://zips.z.cash/zip-0230) kratafa.

ZIP 226 kyerɛ OrchardZSA protocol ase  yɛ nhyehyeɛ ma Orchard a ɛfa ɔdanse ne ahodeɛ ho. ZIP227 kyerɛ sɛnea wɔbɔ saa nneɛma no, na ɛsɛ sɛ wɔde di dwuma ɛkofa ZIP226 nkutoo.

### ZSA Grant Proposal (Ɔboa a wɔhyɛ sɛ wɔde ma)

ZSA nsahyɛ a ɛfa Akorae A Ɛbɔ Ho Ban (ZSA/UDA) no, [QEDIT] de too dwa.](https://qed-it.com/) Saa nneɛma yi yɛ nea wɔtaa frɛ no User Defined Assets (UDA) anaa Zcash Shielded Asset (ZSA).

Saa nsԑm yi nti, kuw a ɔwɔ [QEDIT] no de nhwehwεmu ne nhwehwɛmu ahorow bi too dwa.](https://qed-it.com/) plans to bring DeFi to the Zcash ecosystem and, at the same time, enable the use of the best privacy technology within the existing DeFi ecosystem. In a poll survey, the team asked, and the community answered that [generic shielded assets (ZSA/UDA) are the most requested feature at the moment](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Saa nsԑm yi yԑde sԑe [Zcash Improvement Proposal (ZIP) ] no.](https://zips.z.cash/zip-0000) specification and are defined in ZIP 226 & ZIP 227.

1. [ZIP code 226] Ɔyɛ ɔmansin sohwɛfo.](https://zips.z.cash/zip-0226): Zcash Akorae a Wɔbɔ Ho Ban Nkyekyɛm ne Ɔhyew
2. [ZIP code 227] Ɔyɛ ɔmansin sohwɛfo.](https://zips.z.cash/zip-0227): Zcash Akora Ahodoɔ a Wɔbɔ Ho Ban no ho Nsɛm

---

## Nea Ɛfa Ho a Ɛbɛboa Wo Wɔ Asetram

** Sɛ wowɔ ZEC anaa wode di dwuma a**

- ZSAs no yɛ Orchard ("OrchardZSA") nkyeresoɔ, enti wɔbɛkyɛ afidie a ɛbɔ wɔn ho ban a ZEC de di dwuma dada. Wo sika kotoku bɛhia mmoa soronko ansa na atumi asie anaa atwe saa nneɛma yi akɔ wo nkyɛn.
- Wo hia ZEC bere biara. Wode ZSA a wobԑto na wode akɔma obi no tua ka wɔ ZEC mu, ɛnyɛ sika ankasa bi.
- Biribiara nni w'ahyehyɛde a ɛwɔ ZEC mu no so nsakrae.

** Sɛ woyɛ obi a wobɛtumi de stablecoin, DAO anaa adwumakuo bi ato gua**

- Sɛ wode biribi a wobɛtumi de adi dwuma no di dwuma a, ɛsɛ sɛ wo nsa ka tumi krataa bi wɔ kɔmputa so na wɔde ato ɔfã biara ho. Enti w'ankasa nkutoo na wubetumi ayɛ anaa woasesa nneɛma a ɛwɔ wo ankasa sika mu no.
- W'ahodeɛ a ɛretwam no yɛ nea wɔtumi di ho dwuma, nanso wo defoɔ nkaeɛ ne wɔn nkrataa deɛ ɛnyɛ. Sɛ wode sika ma obi a wogye to mu sɛ ɔtɔ so mmienu na ɛyɛ adwuma a, saa ara na ɛte ankasa.
- Asɛdeɛ bebree na ɛbɛtumi anya ne ho adi wɔ berɛ koro mu.

**Wɔn a wɔhwɛ abɔde mu nneɛma so no**

- Because every ZSA fee is denominated in ZEC, activity in any future asset issued on Zcash creates demand for ZEC itself.

---

## Mfomso a Wɔtaa Di

Ԑyԑ adwene a obiara kura. Deɛ ԑne no ankasa ne dɛn?
| --- | --- |
ZSAs yɛ adwuma wɔ Zcash nnɛ. "Ɛnyɛ saa, ɛyɛ a na ɛreyɛ ayɛ sɛ wɔbɛfa no adi dwuma wɔ Network Upgrade 7 (NU7) mu, na ɛda so ara wɔ nhwehwԑmu ne nsɔhwɛ ase".
| "ZSA brings smart contracts to Zcash." | ZSA specifies the issuance, transfer and burn of assets. It is not a general-purpose programmable contract layer. |
"Wobɛtumi atua ZSA ka wɔ sika a wode yɛ adwuma no mu". Wɔtua ɛka no wɔ ZEC.
"Sɛ wɔabɔ ho ban a, ɛsɛ sɛ ahyɛnsode no nso yɛ kokoam". ZIP 227 ma sikasɛm mu da hɔ pefee. Enti wobetumi adi dwuma biara so mfasoɔ bi ano atoom ama ɔmanfo ahu. Ntua ne ntransem gyina nkonim; nanso ɛnyɛ ɛno na ɛyɛ adwuma.
"ZIP 230 yɛ mprenpren nsesaeԑ a ԑwɔ 6 mu no. Wɔayi ZIP 230 afi hɔ, afei nso wɔama nsesaeɛ a ɛwɔ 6 ne 229 adi dwuma".

---

## Nkrataafa a Ɛwɔ Ho Nsɛm

- [Halo] Ɔyɛ ɔkɛse.](/zcash-tech/halo)  the proving system behind Orchard, protocol ZSA extends
- [Zk-SNARKs]](/zcash-tech/zk-snarks)  no-knowledge proofs a ma kwan sɛ wobԑdi ntransem bi so na wɔayi w'ano
- [Nsuo a wɔabɔ ho ban]](/using-zcash/shielded-pools)  baabi a ZSAs bɛtena afa ZEC ho
- [Nsɛm a wobɛyɛ de ayi ntoboa]](/using-zcash/transactions)  sɛdeɛ Zcash transaction yɛ no bom a,
- [Zebra Node a Ɛwɔ Mu Yiye]](/zcash-tech/zebra-full-node)  node implementations used in the ZSA demo above (ZSA) - noode implementation use, a.k.a., "nood" implemention;
