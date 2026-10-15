
<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Zcash_Shielded_Assets.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>
<a href="">
    <img src="/content-images/image-2023-11-18-160742427-658dda69c0.webp" alt="" width="800" height="500"/>
</a>

# Mali Zilizolindwa za Zcash

## TL;DR

Mali Zilizolindwa za Zcash (ZSA) ni kiendelezi cha itifaki kilichopendekezwa ambacho kingeruhusu mali **isipokuwa ZEC** — sarafu thabiti, tokeni za utawala, au mali yoyote maalum — kuishi ndani ya bwawa Zcash's lililolindwa, huku mtumaji, mpokeaji, na kiasi kikiwa siri.

- **Ni nini:** Vipengee maalum vya mtindo wa ERC-20, lakini vimelindwa kwa chaguo-msingi.
- **Nani anaijenga:** [QEDIT](https://qed-it.com/), chini ya ruzuku kutoka kwa Zcash Foundation, kwa ushirikiano na Electric Coin Company.
- **Jinsi inavyobainishwa:** [ZIP 226](https://zips.z.cash/zip-0226) (kuhamisha na kuchoma) pamoja na [ZIP 227](https://zips.z.cash/zip-0227) (utoaji).
- **Hali:** haipatikani moja kwa moja kwenye mtandao mkuu na si sehemu ya Uboreshaji wa Mtandao 7 (NU7). [ZIP 259](https://zips.z.cash/zip-0259), ambayo inaorodhesha kila kitu ambacho NU7 inatekeleza, haijumuishi ZIP 226 au ZIP 227, na hakuna tarehe ya uanzishaji ya ZSA iliyowekwa.
- **Ada:** hulipwa kila wakati katika ZEC, bila kujali mali inayohamishwa.

---

## Maelezo ya Msingi

Mali Zilizolindwa za Zcash (ZSA) ni uboreshaji uliopendekezwa kwa itifaki ya Zcash ambayo ingewezesha uundaji, uhamisho, na uchomaji wa mali maalum kwenye mnyororo wa Zcash.

Kama unaifahamu [ERC-20](https://ethereum.org/en/developers/docs/standards/tokens/erc-20/) Kiwango cha tokeni kwenye blockchain ya Ethereum, ZSAs ni kwa Zcash kama tokeni za ERC-20 zilivyo kwa Ethereum.

Zcash Shielded Assets ingewezesha uundaji wa tokeni maalum kwenye blockchain Zcash, na hivyo kuruhusu tokeni zingine isipokuwa [ZEC](/guides/using-zec-privately) kunufaika na kutokujulikana na faragha ya miamala iliyolindwa kwenye blockchain Zcash.

Matumizi makubwa ya ZSA yatakuwa kutoa sarafu thabiti kwenye itifaki Zcash. Sarafu thabiti ni sarafu za kidijitali zinazoweka thamani yake kwenye sarafu ya fiat, kama vile Dola ya Marekani au Euro. Hivi sasa, baadhi ya sarafu thabiti zinazosambazwa sana ni tokeni za ERC-20 kama vile [USDC](https://www.circle.com/en/usdc) na [Dai](https://docs.makerdao.com/).

Matumizi mengine yanayowezekana ya ZSA yatakuwa kwa ajili ya kutoa tokeni za utawala. Kwa mfano, ZecHub (mchapishaji wa wiki hii) ni Shirika Linalojitegemea la Madaraka (DAO) na linaweza kuunda na kutoa kwa wanachama wake ZSA kwa ajili ya kupigia kura mapendekezo na maamuzi ya utawala.

ZSA zinatengenezwa na [QEDIT](https://qed-it.com/), chini ya ruzuku kubwa kutoka kwa [Zcash Foundation](/zcash-organizations/zcash-foundation) kwa ushirikiano na [Electric Coin Company](/zcash-organizations/electric-coin-company)Kwa kuwa mradi huu bado unaendelezwa kikamilifu, masasisho yanachapishwa kwenye [uzi huu](https://forum.zcashcommunity.com/t/grant-update-zcash-shielded-assets-monthly-updates/41153) ya jukwaa la Zcash [Maombi ya ruzuku ya ZSA](https://zcashgrants.org/gallery/25215916-53ea-4041-a3b2-6d00c487917d/33106640/) na QEDIT inapatikana kutoka tovuti ya ruzuku Zcash Foundation.

---

## Taswira / Analojia

### Bahasha iliyofungwa

Fikiria muamala uliofunikwa na Zcash kama bahasha ya kawaida, iliyofungwa ikiwa imeangushwa kwenye sanduku la barua la umma. Mtu yeyote anaweza kuona kwamba bahasha ilichapishwa. Hakuna anayeweza kuona ni nani aliyeituma, ni nani aliyeichukua, au kilicho ndani - na kila bahasha inaonekana sawa na nyingine.

Leo, bahasha kwenye mtandao wa Zcash inaweza kubeba kitu kimoja tu: ZEC.

ZSA haibadilishi bahasha. Inabadilisha **kinachoruhusiwa ndani yake**. Baada ya ZSA, bahasha hiyo hiyo iliyofungwa inaweza kubeba sarafu ya kudumu, tokeni ya utawala ya DAO, au sehemu ya uaminifu wa kampuni — na kutoka nje bado ingeonekana kama bahasha nyingine yoyote kwenye mtandao.

Jambo moja muhimu ni kushikilia: **malipo ya posta hulipwa kila wakati katika ZEC**, bila kujali ni nini kilicho ndani ya bahasha.

### Kile ambacho mtazamaji wa nje anaweza kuona

| Mtazamaji anaweza kuona... | ERC-20 kwenye Ethereum | ZSA kwenye Zcash |
| --- | --- | --- |
| Nani aliituma | Umma | Imehifadhiwa |
| Nani aliipokea | Umma | Imehifadhiwa |
| Kiasi gani kilihamishwa | Umma | Imehifadhiwa |
| Mizani ya mtu binafsi | Umma | Imehifadhiwa |
| Jumla ya usambazaji wa mali | Umma | **Hadharani — kwa makusudi** |
| Sarafu ambayo ada hulipwa | ETH | ZEC |

### Kwa nini safu ya usambazaji si hitilafu

Safu mbili za chini za jedwali ndizo ambapo ZSA inavutia.

ZIP 227 huweka kimakusudi **utoaji wazi**, ili usambazaji unaozunguka wa kila mali uweze kufuatiliwa ndani ya mnyororo. Malipo ya mtu binafsi na malipo ya mtu binafsi yabaki kuwa ya faragha; jumla ya idadi ya tokeni zilizopo hazipo.

Kwa mtoaji wa sarafu thabiti, mchanganyiko huo ndio hoja badala ya maelewano. Akiba inaweza kukaguliwa dhidi ya usambazaji unaoweza kuthibitishwa hadharani, huku watu wanaotumia tokeni hiyo wakiweka salio na malipo yao wenyewe.

### Mali moja, utambulisho mmoja

Kila mali hupata **Kitambulisho cha Mali** cha kipekee, kinachotokana na ufunguo wa utoaji wa mtoaji pamoja na maelezo ya maandishi ya mali. Watoaji wawili tofauti hawawezi kutoa kitambulisho kimoja, na kuchora au kubadilisha mali kunahitaji idhini ya kriptografia kutoka kwa mtoaji wake. Kwa maneno ya bahasha: mtu yeyote anaweza kuchapisha bahasha, lakini ni mnanaa tu anayemiliki mali fulani anayeweza kuchapisha zaidi yake.

---

## Kupiga Mbizi Kina

### Onyesho la ZSA kwenye Zebra

[![Video Thumbnail](/content-images/hqdefault-3ae84de424.webp)](https://youtu.be/1MZMGC9ViyA)

**Endesha onyesho mwenyewe!**

Fanya nakala ya hazina ya zana ya zcash-tx: [https://github.com/QED-it/zcash_tx_tool](https://github.com/QED-it/zcash_tx_tool)

### Mapendekezo ya Uboreshaji wa Zcash (ZIP)

- [ZIP 226](https://zips.z.cash/zip-0226)Uhamisho na Uchomaji wa Mali Zilizolindwa za Zcash
- [ZIP 227](https://zips.z.cash/zip-0227)Utoaji wa Mali Zilizolindwa za Zcash
- [ZIP 230](https://zips.z.cash/zip-0230): Muundo wa Muamala wa Toleo la 6

> **Dokezo kwenye ZIP 230:** ZIP 230 imeondolewa na haitatumika. Toleo la muamala la 6 sasa linafafanuliwa na [ZIP 229](https://zips.z.cash/zip-0229)Tazama notisi iliyo juu ya [ZIP 230](https://zips.z.cash/zip-0230) ukurasa.

ZIP 226 inafafanua itifaki ya OrchardZSA — kiendelezi cha itifaki ya Orchard kinachobeba uhamisho na uchomaji wa mali maalum. ZIP 227 inafafanua jinsi mali hizo zinavyoundwa hapo awali, na lazima zitekelezwe pamoja na ZIP 226 pekee.

### Pendekezo la Ruzuku ya ZSA

Pendekezo la ZSA la Mali Zilizolindwa (ZSA/UDA) liliwasilishwa na [QEDIT](https://qed-it.com/) timu ya kujenga mali za kawaida zilizolindwa kwenye blockchain ya Zcash. Hizi kwa kawaida hujulikana kama Mali Zilizofafanuliwa na Mtumiaji (UDA) au kama Mali Zilizolindwa za Zcash (ZSA).

Kwa pendekezo hili, timu ya [QEDIT](https://qed-it.com/) inapanga kuileta DeFi kwenye mfumo ikolojia Zcash na, wakati huo huo, kuwezesha matumizi ya teknolojia bora ya faragha ndani ya mfumo ikolojia uliopo wa DeFi. Katika utafiti wa kura ya maoni, timu iliuliza, na jamii ikajibu hilo [Mali za kawaida zilizolindwa (ZSA/UDA) ndizo zinazoombwa zaidi kwa sasa](https://twitter.com/BenarrochDaniel/status/1428327864034791429).

Mapendekezo haya yanafuata kanuni za kitaalamu [Pendekezo la Uboreshaji wa Zcash (ZIP)](https://zips.z.cash/zip-0000) vipimo na vimefafanuliwa katika ZIP 226 na ZIP 227.

1. [ZIP 226](https://zips.z.cash/zip-0226)Uhamisho na Uchomaji wa Mali Zilizolindwa za Zcash
2. [ZIP 227](https://zips.z.cash/zip-0227)Utoaji wa Mali Zilizolindwa za Zcash

---

## Matokeo ya Kivitendo

**Ukishikilia au unatumia ZEC**

- ZSA hufafanuliwa kama kiendelezi cha Orchard ("OrchardZSA"), kwa hivyo wangeshiriki mashine iliyolindwa ZEC tayari inatumia. Pochi yako itahitaji usaidizi dhahiri wa ZSA kabla haijaweza kuishikilia au kuituma.
- Utahitaji ZEC kila wakati. Ada za kutoa na kuhamisha ZSA hulipwa katika ZEC, si katika mali yenyewe.
- Hakuna kinachobadilika kuhusu miamala yako ZEC iliyopo.

**Kama wewe ni mtoaji mtarajiwa — sarafu thabiti, DAO, kampuni**

- Kutoa mali kunahitaji idhini ya usimbaji fiche iliyounganishwa na ufunguo wa utoaji, kwa hivyo ni wewe tu unayeweza kubadilisha au kubadilisha sifa za mali yako mwenyewe.
- Ugavi unaozunguka wa mali yako unaweza kukaguliwa hadharani ilhali salio na uhamisho wa watumiaji wako haukaguliwa. Kwa mtoaji anayedhibitiwa, huu kwa kawaida ndio mchanganyiko kamili unaohitajika.
- Muamala mmoja wa utoaji unaweza kuunda zaidi ya mali moja kwa wakati mmoja.

**Kwa mfumo ikolojia**

- Kwa sababu kila ada ya ZSA imeorodheshwa katika ZEC, shughuli katika mali yoyote ya baadaye iliyotolewa kwenye Zcash husababisha mahitaji ya ZEC yenyewe.

---

## Makosa ya Kawaida

| Imani ya pamoja | Ni nini hasa? |
| --- | --- |
| "ZSA ziko moja kwa moja kwenye Zcash leo." | Haziko hivyo. ZSA si sehemu ya Network Upgrade 7 (NU7), ambayo [ZIP 259](https://zips.z.cash/zip-0259) hufafanua bila ZIP 226 au ZIP 227, na bado inapitiwa na kupimwa. |
| "ZSA yaleta mikataba mizuri kwa Zcash." | ZSA hubainisha utoaji, uhamisho na uchomaji wa mali. Sio safu ya mkataba inayoweza kupangwa kwa madhumuni ya jumla. |
| "Unaweza kulipa ada za ZSA katika tokeni ya ZSA yenyewe." | Ada hulipwa katika ZEC. |
| "Ikiwa imefunikwa, usambazaji wa tokeni lazima uwe siri pia." | ZIP 227 hufanya utoaji uwe wazi kwa makusudi, ili usambazaji wa kila mali uweze kufuatiliwa hadharani. Salio na uhamisho hubaki kuwa wa faragha; usambazaji haufanyi hivyo. |
| "ZIP 230 ni umbizo la sasa la muamala wa toleo la 6." | ZIP 230 imeondolewa. Toleo la 6 sasa linafafanuliwa na ZIP 229. |

---

## Kurasa Zinazohusiana

- [Halo](/zcash-tech/halo) — mfumo unaothibitisha nyuma ya Orchard, itifaki ya ZSA inapanua
- [zk-SNARKs](/zcash-tech/zk-snarks) — ushahidi usio na maarifa unaoruhusu uhamisho uliolindwa kuthibitishwa bila kufichuliwa
- [Mabwawa ya Kuogelea Yenye Ngao](/using-zcash/shielded-pools) — ambapo ZSA zingeishi kando ya ZEC
- [Miamala](/using-zcash/transactions) — jinsi muamala wa Zcash unavyowekwa pamoja
- [Kifundo Kamili cha Zebra](/zcash-tech/zebra-full-node) — utekelezaji wa nodi uliotumika katika onyesho la ZSA hapo juu
