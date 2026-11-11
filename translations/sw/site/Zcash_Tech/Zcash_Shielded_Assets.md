<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Zcash Mali za Faragha

## Kwa Ufupi

Zcash Mali za Faragha [Shielded Assets] (ZSA) ni upanuzi wa itifaki unaopendekezwa ambao ungewezesha mali **zisizo ZEC** — stablecoin, tokeni za utawala, au mali yoyote maalumu — kuwepo ndani ya bwawa la faragha la Zcash, huku mtumaji, mpokeaji, na kiasi vikihifadhiwa kwa faragha.

- **Ni nini:** Mali maalumu za mtindo wa ERC-20, lakini zenye faragha kwa chaguo-msingi.
- **Nani anaijenga:** [QEDIT](https://qed-it.com/), chini ya ruzuku kutoka Zcash Foundation, kwa ushirikiano na Electric Coin Company.
- **Jinsi inavyobainishwa:** [ZIP 226](https://zips.z.cash/zip-0226) (uhamishaji na uchomaji) pamoja na [ZIP 227](https://zips.z.cash/zip-0227) (utoaji).
- **Hali:** Haijaanzishwa kwenye mainnet na si sehemu ya Uboreshaji wa Mtandao 7 [Network Upgrade 7] (NU7). [ZIP 259](https://zips.z.cash/zip-0259), ambayo huorodhesha kila kitu kinachoanzishwa na NU7, haijumuishi ZIP 226 wala ZIP 227, na hakuna tarehe ya kuanzisha ZSA iliyowekwa.
- **Ada:** Daima hulipwa kwa ZEC, bila kujali mali inayohamishwa.

---

## Maelezo ya Msingi

Zcash Mali za Faragha (ZSA) ni uboreshaji unaopendekezwa wa itifaki ya Zcash ambao ungewezesha uundaji, uhamishaji, na uchomaji wa mali maalumu kwenye mnyororo wa Zcash.

Ikiwa unaifahamu kiwango cha tokeni cha [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) kwenye blockchain ya Ethereum, ZSA ni kwa Zcash kama tokeni za ERC-20 zilivyo kwa Ethereum.

Zcash Mali za Faragha zingewezesha uundaji wa tokeni maalumu kwenye blockchain ya Zcash, na hivyo kuruhusu tokeni zisizo [ZEC](/guides/using-zec-privately) kunufaika na kutotambulika na faragha ya miamala ya faragha kwenye blockchain ya Zcash.

Matumizi makuu yanayowezekana ya ZSA yangekuwa kutoa stablecoin kwenye itifaki ya Zcash. Stablecoin ni sarafu-fiche ambazo thamani yake hufungamanishwa na sarafu ya fiat, kama vile Dola ya Marekani au Euro. Kwa sasa, baadhi ya stablecoin zinazosambazwa zaidi ni tokeni za ERC-20 kama vile [USDC](https://www.circle.com/en/usdc) na [Dai](https://docs.makerdao.com/).

Matumizi mengine yanayowezekana ya ZSA yangekuwa utoaji wa tokeni za utawala. Kwa mfano, ZecHub (mchapishaji wa wiki hii) ni Shirika Huru Lililogatuliwa (DAO) na linaweza kuunda na kuwapa wanachama wake ZSA kwa ajili ya kupigia kura mapendekezo na maamuzi ya utawala.

ZSA zinatengenezwa na [QEDIT](https://qed-it.com/), chini ya ruzuku kubwa kutoka [Zcash Foundation](/zcash-organizations/zcash-foundation) kwa ushirikiano na [Electric Coin Company](/zcash-organizations/electric-coin-company). Kwa kuwa mradi huu bado unatengenezwa kikamilifu, masasisho huchapishwa kwenye [mazungumzo haya](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) ya jukwaa la Zcash. [Ombi la ruzuku la ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) lililotolewa na QEDIT linapatikana kwenye tovuti ya ruzuku ya Zcash Foundation.

---

## Taswira / Mfano

### Bahasha iliyofungwa

Wazia muamala wa faragha wa Zcash kama bahasha tupu, iliyofungwa na kutupwa katika sanduku la posta la umma. Kila mtu anaweza kuona kwamba bahasha imetumwa. Hakuna anayeweza kuona aliyeituma, anayeichukua, au kilichomo ndani — na kila bahasha hufanana na kila bahasha nyingine.

Leo, bahasha kwenye mtandao wa Zcash inaweza kubeba kitu kimoja tu: ZEC.

ZSA haibadilishi bahasha. Inabadilisha **kile kinachoruhusiwa kuwa ndani yake**. Baada ya ZSA, bahasha hiyo hiyo iliyofungwa ingeweza kubeba stablecoin, tokeni ya utawala ya DAO, au pointi ya uaminifu ya kampuni — na kwa mtazamo wa nje bado ingeonekana sawa kabisa na kila bahasha nyingine kwenye mtandao.

Jambo moja ni muhimu kukumbuka: **gharama ya posta daima hulipwa kwa ZEC**, bila kujali kilichomo ndani ya bahasha.

### Kile ambacho mtazamaji wa nje anaweza kuona

| Mtazamaji anaweza kuona... | ERC-20 kwenye Ethereum | ZSA kwenye Zcash |
| --- | --- | --- |
| Aliyeituma | Ya umma | Ya faragha |
| Aliyeipokea | Ya umma | Ya faragha |
| Kiasi kilichohamishwa | Ya umma | Ya faragha |
| Salio za watu binafsi | Ya umma | Ya faragha |
| Jumla ya ugavi wa mali | Ya umma | **Ya umma — kwa makusudi** |
| Sarafu inayotumika kulipa ada | ETH | ZEC |

### Kwa nini mstari wa ugavi si hitilafu

Mistari miwili ya mwisho ya jedwali ndiyo sehemu ambapo ZSA inakuwa ya kuvutia.

ZIP 227 huweka **utoaji katika uwazi** kwa makusudi, ili ugavi unaozunguka wa kila mali uweze kufuatiliwa on-chain. Umiliki wa watu binafsi na malipo ya watu binafsi hubaki ya faragha; jumla ya tokeni zilizopo haibaki hivyo.

Kwa mtoaji wa stablecoin, mchanganyiko huo ndio kusudi badala ya maelewano. Akiba zinaweza kukaguliwa dhidi ya ugavi unaoweza kuthibitishwa hadharani, huku watu wanaotumia tokeni wakihifadhi salio na malipo yao kwao wenyewe.

### Mali moja, utambulisho mmoja

Kila mali hupata **Kitambulisho cha Mali**, kinachotokana na ufunguo wa utoaji wa mtoaji pamoja na maelezo ya maandishi kuhusu mali hiyo. Watoaji wawili tofauti hawawezi kutengeneza kitambulisho kilekile, na kutengeneza au kubadilisha mali kunahitaji uidhinishaji wa kifumbo kutoka kwa mtoaji wake. Kwa mfano wa bahasha: yeyote anaweza kutuma bahasha, lakini ni kiwanda pekee kinachomiliki mali fulani kinaweza kuchapisha zaidi yake.

---

## Uchambuzi wa Kina

### Onyesho la ZSA kwenye Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Endesha onyesho wewe mwenyewe!**

Nakili hazina ya zcash-tx-tool: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Mapendekezo ya Uboreshaji ya Zcash (ZIPs)

- [ZIP 226](https://zips.z.cash/zip-0226): Uhamishaji na Uchomaji wa Mali za Faragha za Zcash
- [ZIP 227](https://zips.z.cash/zip-0227): Utoaji wa Mali za Faragha za Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Muundo wa Muamala wa Toleo la 6

> **Dokezo kuhusu ZIP 230:** ZIP 230 imeondolewa tangu wakati huo na haitaanzishwa. Toleo la muamala 6 sasa linafafanuliwa na [ZIP 229](https://zips.z.cash/zip-0229). Tazama taarifa iliyo juu ya ukurasa wa [ZIP 230](https://zips.z.cash/zip-0230).

ZIP 226 hufafanua itifaki ya OrchardZSA — upanuzi wa itifaki ya Orchard unaoshughulikia uhamishaji na uchomaji wa mali maalumu. ZIP 227 hufafanua jinsi mali hizo zinavyoundwa tangu mwanzo, na lazima itekelezwe pamoja tu na ZIP 226.

### Pendekezo la Ruzuku la ZSA

Pendekezo la ZSA la Mali za Faragha (ZSA/UDA) liliwasilishwa na timu ya [QEDIT](https://qed-it.com/) ili kujenga mali za jumla za faragha kwenye blockchain ya Zcash. Hizi kwa kawaida huitwa Mali Zilizobainishwa na Mtumiaji (UDA) au Mali za Faragha za Zcash (ZSA).

Kwa pendekezo hili, timu ya [QEDIT](https://qed-it.com/) inapanga kuleta DeFi kwenye mfumo ikolojia wa Zcash na, wakati huohuo, kuwezesha matumizi ya teknolojia bora zaidi ya faragha ndani ya mfumo ikolojia uliopo wa DeFi. Katika utafiti wa kura, timu iliuliza, na jumuiya ikajibu kwamba [mali za jumla za faragha (ZSA/UDA) ndicho kipengele kinachoombwa zaidi kwa sasa](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Mapendekezo haya yanafuata kiufundi vipimo vya Pendekezo la Uboreshaji la [Zcash (ZIP)](https://zips.z.cash/zip-0000) na yamefafanuliwa katika ZIP 226 & ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226): Uhamishaji na Uchomaji wa Mali za Faragha za Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227): Utoaji wa Mali za Faragha za Zcash

---

## Athari za Kivitendo

**Ikiwa unamiliki au unatumia ZEC**

- ZSA zinafafanuliwa kama upanuzi wa Orchard (“OrchardZSA”), kwa hivyo zingeshiriki mifumo ya faragha ambayo ZEC tayari hutumia. Pochi yako itahitaji usaidizi mahsusi wa ZSA kabla ya kuweza kuzihifadhi au kuzituma.
- Daima utahitaji kiasi fulani cha ZEC. Ada za kutoa na kuhamisha ZSA hulipwa kwa ZEC, si kwa mali yenyewe.
- Hakuna chochote kinachobadilika kuhusu miamala yako iliyopo ya ZEC.

**Ikiwa wewe ni mtoaji anayetarajiwa — stablecoin, DAO, kampuni**

- Kutoa mali kunahitaji uidhinishaji wa kifumbo unaohusishwa na ufunguo wa utoaji, hivyo ni wewe pekee unayeweza kutengeneza au kubadilisha sifa za mali yako mwenyewe.
- Ugavi unaozunguka wa mali yako unaweza kukaguliwa hadharani, ilhali salio na uhamishaji wa watumiaji wako haviwezi. Kwa mtoaji anayedhibitiwa, kwa kawaida huu ndio mchanganyiko unaohitajika hasa.
- Muamala mmoja wa utoaji unaweza kuunda zaidi ya mali moja kwa wakati mmoja.

**Kwa mfumo ikolojia**

- Kwa sababu kila ada ya ZSA hutolewa kwa ZEC, shughuli katika mali yoyote ya baadaye inayotolewa kwenye Zcash huunda mahitaji ya ZEC yenyewe.

---

## Makosa ya Kawaida

| Imani ya kawaida | Hali halisi ni ipi |
| --- | --- |
| “ZSA ziko hai kwenye Zcash leo.” | Haziko hai. ZSA si sehemu ya Uboreshaji wa Mtandao 7 (NU7), ambao [ZIP 259](https://zips.z.cash/zip-0259) hufafanua bila ZIP 226 au ZIP 227, na bado ziko katika mapitio na majaribio. |
| “ZSA huleta mikataba mahiri kwenye Zcash.” | ZSA hubainisha utoaji, uhamishaji na uchomaji wa mali. Si safu ya jumla ya mikataba inayoweza kupangwa. |
| “Unaweza kulipa ada za ZSA kwa tokeni ya ZSA yenyewe.” | Ada hulipwa kwa ZEC. |
| “Ikiwa ina faragha, ugavi wa tokeni lazima uwe siri pia.” | ZIP 227 hufanya utoaji uwe wa uwazi kwa makusudi, ili ugavi wa kila mali uweze kufuatiliwa hadharani. Salio na uhamishaji hubaki ya faragha; ugavi haubaki hivyo. |
| “ZIP 230 ni muundo wa sasa wa muamala wa toleo la 6.” | ZIP 230 imeondolewa. Toleo la 6 sasa linafafanuliwa na ZIP 229. |

---

## Kurasa Zinazohusiana

- [Halo](/zcash-tech/halo) — mfumo wa uthibitishaji ulio nyuma ya Orchard, itifaki ambayo ZSA huipanua
- [zk-SNARKs](/zcash-tech/zk-snarks) — uthibitisho wa maarifa sifuri unaoruhusu uhamishaji wa faragha kuthibitishwa bila kufichuliwa
- [Mabwawa ya Faragha](/using-zcash/shielded-pools) — mahali ambapo ZSA zingeishi pamoja na ZEC
- [Miamala](/using-zcash/transactions) — jinsi muamala wa Zcash unavyoundwa
- [Zebra Full Node](/zcash-tech/zebra-full-node) — utekelezaji wa node uliotumika katika onyesho la ZSA hapo juu
