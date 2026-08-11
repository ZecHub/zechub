
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Shielded Mali za fedha

## TL;DR

Zcash Shielded Assets (ZSA) ni upanuzi wa itifaki uliopendekezwa ambao unaruhusu mali ** zingine isipokuwa ZEC**  stablecoins, ishara za utawala, au mali yoyote ya kawaida  kuishi ndani ya dimbwi la ulinzi la Zcash, na mtumaji, mpokeaji, na kiasi kilichohifadhiwa faragha.

- ** Ni nini:** ERC-20-style mali desturi, lakini kulindwa kwa default.
- ** Nani anajenga:** [QEDIT](https://qed-it.com/), chini ya ruzuku kutoka Zcash Foundation, kwa kushirikiana na Electric Coin Company.
- ** Jinsi ilivyoainishwa:** [ZIP 226](https://zips.z.cash/zip-0226) (kuhamisha na kuchoma) pamoja na [ZIP 227](https://zips.z.cash/zip-0227) (kutolewa).
- ** Hali:** si kuishi juu ya mainnet. itifaki ZSA imepangwa kwa ajili ya kupelekwa katika Mtandao Upgrade 7 (NU7).
- ** Ada:** daima kulipwa katika ZEC, bila kujali mali ni wakiongozwa.

---

## Maelezo ya msingi

Zcash Shielded Assets (ZSA) ni mapendekezo ya kuboresha itifaki za Zcash ambazo zingewezesha uundaji, uhamishaji na kuchoma mali maalum kwenye mlolongo wa Zcash.

Kama unafahamu [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) ishara ya kiwango juu Ethereum blockchain, ZSAs ni kwa Zcash kama ERC-20 ishara ni kwa Ethereum.

Zcash Shielded Assets itawezesha uundaji wa ishara maalum kwenye blockchain ya Zcash, na hivyo kuruhusu alama zingine isipokuwa [ZEC](/guides/using-zec-privately) kufaidika na kutokujulikana na faragha ya shughuli za ulinzi kwenye blockchain Zcash.

A major potential use of ZSAs would be to issue stablecoins on the Zcash protocol. Stablecoins are cryptocurrencies that peg their value to a fiat currency, such as the US Dollar or Euro. Currently, some of the most widely circulated stablecoins are ERC-20 tokens such as [USDC](https://www.circle.com/en/usdc) na [Dai](https://docs.makerdao.com/).

Another potential use of ZSAs would be for the issuing of governance tokens. For example, Zechub (the publisher of this wiki) is a Decentralized Autonomous Organization (DAO) and could create and issue to its members a ZSA for voting on proposals and governance decisions.

ZSAs ni kuwa maendeleo na [QEDIT](https://qed-it.com/), chini ya ruzuku kubwa kutoka [Zcash Foundation](/zcash-organizations/zcash-foundation) kwa kushirikiana na [Electric Coin Company](/zcash-organizations/electric-coin-company)Kama mradi huu bado ni kuwa kikamilifu maendeleo, updates posted juu ya [ thread hii ](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) of the Zcash forum. The [ZSA grant application](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) na QEDIT inapatikana kutoka kwa Zcash Foundation misaada tovuti.

---

## Visual / Ulinganisho

### Kifuniko kilichofungwa kwa muhuri.

Picha Zcash kulindwa shughuli kama plain, muhuri bahasha imeshuka katika mailbox umma. Mtu yeyote anaweza kuona kwamba envelope alikuwa posted. Hakuna mtu anayeweza kuona ambaye alimtuma, ambao hukusanya yake, au nini ni ndani  na kila bahasha inaonekana sawa kwa kila mmoja mwingine moja.

Leo, bahasha kwenye mtandao wa Zcash inaweza kubeba kitu kimoja tu: ZEC.

ZSA haibadilishi bahasha. Inabadilisha ** kile kinachoruhusiwa ndani yake** Baada ya ZSA, bahasha hiyo iliyofungwa inaweza kubeba sarafu thabiti, ishara ya utawala wa DAO, au alama ya uaminifu wa kampuni  na kutoka nje bado ingeonekana sawa kama kila bahasha nyingine kwenye mtandao.

Kuna jambo moja ambalo ni muhimu kukumbuka: ** malipo ya posta hulipwa kwa ZEC**, bila kujali kile kilicho ndani ya bahasha.

### Kile ambacho mtazamaji wa nje anaweza kuona

Mtazamaji anaweza kuona ERC-20 kwenye Ethereum, ZSA katika Zcash.
| --- | --- | --- |
Ni nani aliyeituma? - Umma Ulinzi.
Nani alipokea? Umma ulinzi.
Kiasi gani kilihamishwa? Umma. Kililindwa?
Usawa wa mtu binafsi. Umma. Ulinzi.
│ Jumla ya usambazaji wa mali Public. │ **Public  makusudi**
Fedha ada ni kulipwa katika ETH ZEC.

### Kwa nini safu ya usambazaji si mdudu

mistari ya chini mbili za meza ni ambapo ZSA inakuwa kuvutia.

ZIP 227 makusudi anaendelea ** utoaji wa uwazi, hivyo kwamba kusambazwa usambazaji wa kila mali inaweza kufuatiliwa on-mnyororo. umiliki mtu binafsi na malipo ya kibinafsi kukaa faragha; jumla idadi ya ishara katika kuwepo haina.

Kwa stablecoin mtoa, kwamba pamoja ni uhakika badala ya maelewano. akiba inaweza kuwa audited dhidi ya umma verifiable ugavi, wakati watu kweli kutumia ishara kuweka mizani yao na malipo kwa wenyewe.

### Mali moja, utambulisho mmoja

Every asset gets a unique **Asset Identifier**, derived from the issuer's issuance key together with a text description of the asset. Two different issuers cannot produce the same identifier, and minting or changing an asset requires cryptographic authorization from its issuer. In envelope terms: anyone can post an envelope, but only the mint that owns a given asset can print more of it.

---

## Kuzama kwa Kina Chini ya Maji

### ZSA Demo juu ya Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

** Run demo kwa ajili yako mwenyewe!**

Clone kuhifadhi zcash-tx-tool: <https://github.com/QED-it/zcash_tx_tool>

### Mapendekezo ya Uboreshaji wa Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Uhamisho na Kuungua kwa Zcash Shielded Mali
- [ZIP 227](https://zips.z.cash/zip-0227): Utoaji wa Zcash Shielded Mali
- [ZIP 230](https://zips.z.cash/zip-0230): Toleo 6 Transaction Format

> ** Kumbuka juu ya ZIP 230:** ZIP 230, tangu wakati huo imekuwa kuondolewa na si kupelekwa. toleo la shughuli 6 sasa ni inajulikana kwa [ZIP 229](https://zips.z.cash/zip-0229). Ona taarifa juu ya [ZIP 230](https://zips.z.cash/zip-0230) ukurasa.

ZIP 226 defines the OrchardZSA protocol — an extension of the Orchard protocol that carries the transfer and burn of custom assets. ZIP 227 defines how those assets are created in the first place, and must only be implemented alongside ZIP 226.

### ZSA Grant Pendekezo

pendekezo ZSA kwa ajili ya kulindwa Mali (ZSA / UDA) iliwasilishwa na [QEDIT](https://qed-it.com/) Timu ya kujenga mali generic ulinzi juu Zcash blockchain. Hizi ni kawaida inajulikana kama User Defined Mali (UDA) au kama Zcash Shielded Mali, (ZSA).

Kwa pendekezo hili, timu katika [QEDIT] iliamua kuanzisha programu ya utafiti wa hali ya juu.](https://qed-it.com/) mipango ya kuleta DeFi kwa mazingira Zcash na, wakati huo huo kuwezesha matumizi ya teknolojia bora faragha ndani ya mfumo wa ikolojia zilizopo za DeFi. Katika utafiti uchaguzi, timu aliuliza, na jamii akajibu kwamba [generic walinzi mali (ZSA / UDA) ni kipengele zaidi ombi katika sasa](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Mapendekezo haya ni kiufundi wanaambatana na [Zcash Uboreshaji Pendekezo (ZIP) ](https://zips.z.cash/zip-0000) vipimo na ni ilivyoelezwa katika ZIP 226 & ZIP227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Uhamisho na Kuungua kwa Zcash Shielded Mali
2. [ZIP 227](https://zips.z.cash/zip-0227): Utoaji wa Zcash Shielded Mali

---

## Matokeo ya Kimatendo

** Ikiwa unashikilia au kutumia ZEC**

- ZSAs ni kufafanuliwa kama ugani wa Orchard ("OrchardZSA"), hivyo wao kushiriki mashine shielded ZEC tayari anatumia. mkoba wako itahitaji wazi msaada ZSA kabla ya kushikilia au kutuma yao.
- Unahitaji ZEC wakati wote. ada ya kutoa na kuhamisha ZSA hulipwa katika ZEC, si kwa mali yenyewe.
- Hakuna mabadiliko kuhusu mikataba yako ya ZEC iliyopo.

** Kama wewe ni mtoa uwezo  stablecoin, DAO, kampuni**

- Kutoa mali inahitaji cryptographic idhini amefungwa kwa ufunguo wa utoaji, hivyo tu unaweza mint au kubadilisha sifa ya mali yako mwenyewe.
- mali yako ya kusambaza ugavi ni umma auditable wakati mizani na uhamisho wa watumiaji wako si. Kwa mtoa regulated, hii kwa kawaida exact combination required.
- Utoaji moja shughuli inaweza kujenga mali zaidi ya moja kwa wakati mmoja.

** Kwa ajili ya mazingira**

- Kwa sababu kila ada ZSA ni jina katika ZEC, shughuli yoyote ya baadaye mali iliyotolewa juu ya Zcash inajenga mahitaji kwa ajili ya ZEC yenyewe.

---

## Makosa ya Kawaida

Imani ya kawaida. Nini hasa kesi?
| --- | --- |
"ZSAs ni kuishi juu ya Zcash leo". Hawako. ZSA imepangwa kwa ajili ya kupelekwa katika Mtandao Upgrade 7 (NU7) na bado chini ya ukaguzi na kupima.
"ZSA huleta mikataba smart kwa Zcash". ZSA inabainisha utoaji, kuhamishwa na kuchoma ya mali. Si mpango wa jumla- Madhumuni programu mkataba safu.
"Unaweza kulipa ada za ZSA katika ishara ya ZSA yenyewe". Ada zinalipwa kwa ZEC.
"Ikiwa ni kulindwa, ishara ya ugavi lazima pia kuwa siri". ZIP 227 hufanya utoaji wa wazi kwa makusudi, hivyo usambazaji wa kila mali inaweza kufuatiliwa hadharani. mizani na kuhamisha kubaki binafsi; Ugavi haina.
"ZIP 230 ni toleo la sasa 6 shughuli format". ZIP 230 imeondolewa. Toleo 6 sasa hufafanuliwa na 229 ya posta.

---

## Kurasa Zinazohusiana

- [Halo](/zcash-tech/halo)  kuthibitisha mfumo nyuma Orchard, itifaki ZSA huongeza
- [Zk-SNARKs](/zcash-tech/zk-snarks)  ushahidi zero-ujuzi kwamba basi uhamisho shielded kuthibitishwa bila kuwa wazi
- [Bwawa za Kuhifadhi](/using-zcash/shielded-pools)  ambapo ZSAs kuishi kando na ZEC
- [Mashirika ya biashara](/using-zcash/transactions)  jinsi ya Zcash shughuli ni kuweka pamoja
- [Zebra Full Node](/zcash-tech/zebra-full-node)  uanzishwaji node kutumika katika ZSA demo juu ya
