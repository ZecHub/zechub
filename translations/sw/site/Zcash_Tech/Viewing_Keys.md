<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Funguo za Kutazama

Anwani zilizolindwa hukuruhusu kufanya miamala huku ukifichua machache iwezekanavyo kwenye blockchain ya Zcash. Kwa hivyo nini kinatokea unapohitaji kuonyesha mhusika maalum kile unachomiliki, au kile ulichotuma? Kila anwani iliyolindwa ina ufunguo wa kutazama unaoruhusu ufikiaji wa kusoma bila kutoa uwezo wa kutumia. Funguo za kutazama zilianzishwa katika [ZIP 310](https://zips.z.cash/zip-0310) na kuongezwa kwenye itifaki katika uboreshaji wa mtandao wa Sapling.

Ufunguo wa kutazama ni kifaa cha kutoa taarifa kwa njia teule: unachagua nani anaona nini, na kamwe hutoi mamlaka ya kufanya hivyo.

## Kwa nini utumie ufunguo wa kutazama?

Electric Coin Company's writing on the subject sets out the situations that come up most often, and they are still the common ones today:

- **Bandari inayoangalia amana.** Bandari hiyo hupakia kitufe cha kutazama kinachoingia kwenye nodi ya kugundua inayoangalia intaneti ili iweze kugundua amana za wateja kwenye anwani iliyolindwa, huku ufunguo wa matumizi ukibaki kwenye vifaa ambavyo havigusi mtandao.
- **Mlinzi anayethibitisha umiliki wake.** Mlinzi humpa mkaguzi ufunguo kamili wa kutazama kwa kila anwani iliyolindwa. Mkaguzi anaweza kuangalia salio hilo na kukagua shughuli zilizopita kwenda na kutoka kwa anwani hizo, na hawezi kufanya kingine chochote.
- **Uchunguzi wa kina kuhusu mwenzako.** Pale ambapo soko linahitaji kupitia historia ya mteja iliyolindwa kama sehemu ya uchunguzi ulioimarishwa, linaweza kuomba ufunguo wa kutazama badala ya fedha.

## Kile ambacho ufunguo wa kutazama hufanya na ambacho hakifichui

Kuna zaidi ya aina moja ya ufunguo, na tofauti huamua ni kiasi gani utatoa.

| Ufunguo | Kiambishi awali | Ruzuku |
|---|---|---|
| Kitufe cha kutazama kilichounganishwa kikamilifu (UFVK) | `uview…` | Huona miamala inayoingia na inayotoka kwa kila kundi kwenye akaunti |
| Kitufe cha kutazama kinachoingia kilichounganishwa (UIVK) | `uivk…` | Huona miamala inayoingia pekee, kwa kila kundi kwenye akaunti |
| Sapling extended full viewing key | `zxviews…` | Sees incoming and outgoing Sapling activity for the key's addresses |

Hakuna hata moja kati ya hizi linaloweza kutumia. Zote ni za kudumu kwa jinsi ilivyo muhimu: ufunguo uliotoa hauwezi kurejeshwa, bali kuishi muda mrefu zaidi, kwa kuhamisha fedha kwenye akaunti ambayo mhusika mwingine hana funguo zake.

Mitego miwili ya kufichua habari inafaa kuijua kabla ya kushiriki chochote.

**Inayoingia haimaanishi kuwa nyembamba.** Kitufe cha kutazama kinachoingia kimeunganishwa kwenye akaunti nzima, si kwa anwani moja uliyoulizwa. Kuhamisha UIVK kwa anwani moja ya Sapling bado hutoa mwonekano unaoingia katika kila bwawa katika akaunti hiyo, kwa hivyo hufichua zaidi ya anwani inayotaja. [Kitabu cha Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) inasema hili waziwazi.

**Anwani iliyochapishwa tayari inafichua ufunguo wake wa kutazama unaoingia kwa adui wa siku zijazo.**. [ZIP 326](https://zips.z.cash/zip-0326) inabainisha kwamba adui mwenye kompyuta ya quantum anaweza kurejesha ufunguo unaoingia wa kutazama kutoka kwa anwani iliyochapishwa yenye mseto, jambo ambalo linawezekana kwa njia ambayo kurejesha ufunguo wa kubatilisha si sawa. Kuchapisha anwani si sawa na kuchapisha ufunguo wa kutazama leo, lakini hizo mbili zinakaa karibu zaidi kwa muda mrefu wa kutosha.

## Kuangalia funguo baada ya Ironwood

NU6.3 ilianzisha bwawa la kuogelea lenye ulinzi la Ironwood na kufanya bwawa la Orchard litumike pekee, kwa hivyo fedha huhama kutoka moja hadi nyingine baada ya muda. [Mbao ya Ironwood](/zcash-tech/ironwood) na [Kijiti cha kugeuza](/zcash-tech/the-turnstile) kwa ajili ya uboreshaji wenyewe.

**Ufunguo wa kutazama uliotolewa kabla ya Ironwood kuendelea kufanya kazi baada ya uhamishaji.** ZIP 326 hubainisha kuwa kipokezi, na ufunguo wake unaoingia unaolingana, huelekezwa kwenye itifaki ya Orchard *badala ya bwawa: jaribio lile lile la ufunguo wa kutazama linaloingia huondoa usimbaji fiche wa Orchard-pool na noti za Ironwood-pool. Zallet hutekeleza kwa njia hiyo, ikielezea noti za Ironwood kama zenye umbo la Orchard na zilizoondolewa usimbaji fiche kwa kutumia funguo za kutazama za Orchard za akaunti chini ya kikoa cha usimbaji fiche wa noti za Ironwood.

Matokeo matatu kwa mtu yeyote anayeshikilia au kutoa ufunguo:

1. **Mizani husogea kati ya mabwawa, na mtazamaji huona ikitokea.**. [ZIP 318](https://zips.z.cash/zip-0318) hubainisha uhamiaji kama mfululizo wa miamala midogo, iliyopangwa kwa makusudi kutoka Orchard hadi Ironwood inayotangazwa kwa ratiba isiyo rasmi, kila moja ikitumia noti moja ya Orchard na kutoa matokeo moja ya Ironwood ya dhehebu la kisheria. Mkaguzi anayeangalia kwa kutumia ufunguo wa kutazama anaona hisa zikihama kutoka bwawa moja hadi jingine kwa hatua kwa wiki, si kwa hatua moja. Pochi inaweza kujenga upya maendeleo yake ya uhamiaji kutoka kwa data ya mnyororo kwa kutumia funguo zake za kutazama.
2. **Kila hatua ya uhamiaji inaonyesha thamani inayosogea.** Hilo ni muhimu katika kuvuka turnstile, na ndilo linalofanya uhamiaji uweze kukaguliwa. Kugawanya salio katika madhehebu ya kisheria kunamaanisha hakuna muamala mmoja unaoonyesha salio lote la Orchard-pool.
3. **Akaunti zilizoundwa baada ya Ironwood zinaweza kupata funguo zake kwa njia tofauti.**. [ZIP 2005](https://zips.z.cash/zip-2005) anaongeza `use_qsk` bendera ya funguo zinazoweza kurejeshwa kwa quantum, na hubadilisha jinsi funguo zinazoingia, zinazotoka na zinazotofautisha zinavyotolewa, kwa hivyo `use_qsk = true` Funguo ni funguo tofauti kabisa. ZIP 326 inahitaji bendera iwe sawa katika akaunti na inakataza kutengeneza `use_qsk = true` funguo kabla ya NU6.3 kuamilishwa kwenye Mainnet. Kwa hivyo, ufunguo uliosafirishwa kutoka kwa akaunti iliyokuwepo kabla ya Ironwood ni `use_qsk = false` ufunguo, na unabaki sahihi kwa akaunti hiyo. Usidhani kwamba ufunguo uliosafirishwa kutoka akaunti moja unaelezea mwingine.

## Kuhamisha ufunguo wa kutazama

### Zallet

[Zallet](https://github.com/zcash/zallet) ni pochi ya nodi kamili iliyochukua nafasi ya pochi ndani ya zcashd. Uhamishaji na uingizaji wa ufunguo wa kutazama ulifika katika **v0.1.0-beta.2 (28 Julai 2026)**, kwa hivyo angalia toleo lako kwanza; miundo ya awali haina mbinu hizi. Kila hoja baada ya jina la mbinu lazima iwe halali JSON, ambayo ina maana kwamba thamani za mfuatano huweka nukuu zao mbili. [Mwongozo wa Marejeleo ya Haraka ya Zallet](/using-zcash/zallet-quick-reference-guide) inashughulikia mtindo wa jumla wa amri.

Orodhesha kile kilichopo kwenye pochi:

```bash
zallet rpc listaddresses
```

Hamisha ufunguo kamili wa kutazama wa akaunti kwa kupitisha anwani iliyounganishwa:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Hamisha kitufe cha kutazama kinachoingia cha akaunti kilichounganishwa badala yake, kwa kutumia chaguo la hiari `ivk` hoja:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Kupitisha anwani ya Sapling hurejesha ufunguo kamili wa kutazama wa akaunti ya Sapling (`zxviews…`), inayolingana na tabia ya zamani ya zcashd. Vikomo viwili vilivyoandikwa: Anwani za Sprout zinakataliwa, na ufunguo kamili wa kutazama wa Sapling hauwezi kuhamishwa kutoka kwa akaunti ambayo yenyewe iliingizwa kama ya kutazama pekee, kwa sababu pochi haiwezi kuijenga upya. `ivk` Fomu inafanya kazi kwa akaunti zilizoingizwa za kutazama pekee.

### Pochi zinazohamisha funguo za kutazama kutoka kwa kiolesura chao

Ya [Pochi](/using-zcash/wallets) Ukurasa hufuatilia usaidizi wa ufunguo wa kutazama na utayari wa Ironwood kwa kila pochi. Wakati wa kuandika haya, pochi zinazoorodhesha usaidizi wa ufunguo wa kutazama na **Ironwood: Tayari** zinajumuisha ZODL, Zingo!, Zkool, Cake, Zallet, Zecd na Nozy. Angalia ukurasa huo badala ya huu kabla ya kutegemea pochi yoyote, kwa sababu utayari hubadilika.

## Kuingiza ufunguo wa kutazama kama akaunti ya kutazama pekee

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ndio chaguo linaloweza kubadilika zaidi hapa, kwa sababu inakubali funguo zilizounganishwa pamoja na zile za zamani. README yake huhifadhi akaunti za kutazama pekee zilizoundwa kutoka kwa **funguo moja ya kutazama** au **funguo iliyopanuliwa ya kutazama ya Sapling**, pamoja na funguo zilizopanuliwa zilizolindwa zilizosafirishwa kutoka zcashd. Ongeza akaunti mpya, chagua njia ya kutazama pekee, na ubandike `uview…` or `zxviews…` ufunguo; akaunti kisha inasawazisha na kuripoti salio na historia bila idhini ya matumizi.

Usaidizi wa itifaki ya Ironwood na uhamiaji wa Orchard-to-Ironwood ulitua katika Zkool 6.24.0 (20 Julai 2026), na 6.26.1 (2 Agosti 2026) ilirekebisha ugunduzi wa miamala ya Ironwood katika memo. Inatumia 6.26.1 au baadaye.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Hoja ya pili ni sera ya kuchanganua upya: `"whenkeyisnew"` (chaguo-msingi), `"yes"` or `"no"`. Ya tatu ni urefu wa kizuizi cha kuchanganua tena. Zallet huingiza ufunguo kama akaunti ya kutazama pekee na hufuatilia miamala inayoingia na kutoka kwa anwani zake bila idhini ya matumizi.

**Zallet imports Sapling extended full viewing keys only.** It will not import a `uview…` ufunguo kamili wa kutazama uliounganishwa, ingawa unaweza kuhamisha mmoja. Ili kukabidhi ufikiaji wa kusoma kwa akaunti nzima iliyounganishwa, hamisha UFVK kutoka Zallet na uingize kwenye pochi inayokubali funguo zilizounganishwa, kama vile Zkool.

Ili kubadilisha ufunguo ulioingizwa kuwa faili kamili ya historia ya miamala, pamoja na txids, ada na memo, tazama [Exporting Transaction History from a Viewing Key](/guides/viewing-key-transaction-export).

## Ni nini kilichobadilika, na nini cha kuacha kutafuta

Ukifuata toleo la zamani la ukurasa huu, au tafsiri yake, njia tatu hazifanyi kazi tena.

- **`zcash-cli z_exportviewingkey` na `z_importviewingkey`.** zcashd ilifikia kikomo chake cha mwisho wa usaidizi mnamo 18 Julai 2026 na haitumiki tena. Mbinu za Zallet zilizopewa jina moja ndizo mbadala; tazama [mwongozo wa uhamiaji](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Mtazamo wa Ywallet.** Ukurasa wa Pochi unaashiria Ywallet **Ironwood: Haiko Tayari**, kwa hivyo sio pochi ya kuwaelekeza watu kwa funguo za kutazama za enzi ya Ironwood. Zkool, kutoka kwa msanidi programu huyo huyo, anakubali aina sawa za funguo na amepewa alama ya Tayari.
- **zcashblockexplorer.com/vk.** Huduma hiyo inarudisha HTTP 503 ikiwa na cheti batili, na imeachwa badala ya kubadilishwa. Kubandika ufunguo wa kutazama kwenye tovuti humpa mtu yeyote anayeendesha tovuti hiyo historia yako yote ya miamala, ambayo ilikuwa chaguo dhaifu zaidi kati ya tatu kwenye ukurasa wa zamani. Ingiza ufunguo kwenye pochi unayotumia badala yake.

## Rasilimali

Tumia vitufe vya kutazama kwa msingi unaohitajika, na unapendelea kitufe chembamba zaidi kinachojibu swali linaloulizwa.

- [Ufichuzi wa malipo](/zcash-tech/payment-disclosures) - kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kutoa ufikiaji unaoendelea wa akaunti
- [ZIP 326: Matokeo ya NU6.3 kwa Pochi](https://zips.z.cash/zip-0326) — jinsi funguo za kutazama zinavyofanya kazi katika mabwawa ya Orchard na Ironwood
- [ZIP 229: Umbizo la Muamala la Toleo la 6](https://zips.z.cash/zip-0229) — hufafanua mabwawa ya Orchard na Ironwood
- [Logo ya mabadiliko ya Zallet](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — ni toleo gani lililoongeza mbinu gani ya RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — akaunti zinazoungwa mkono na aina muhimu
- [ECC, Kuelezea Funguo za Kutazama](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Ufichuzi Teule na Funguo za Kutazama](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Zcash Viewing Key Video Presentation](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
