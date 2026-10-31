<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Funguo za kutazama

Anwani za faragha [shielded addresses] hukuruhusu kufanya miamala huku ukifichua kiasi kidogo iwezekanavyo kwenye blockchain ya Zcash. Hivyo, nini hutokea unapohitaji kumwonyesha mhusika maalumu unachomiliki, au ulichotuma? Kila anwani ya faragha ina ufunguo wa kutazama [viewing key] unaotoa ufikiaji wa kusoma bila kutoa uwezo wa kutumia pesa. Funguo za kutazama zilianzishwa katika [ZIP 310](https://zips.z.cash/zip-0310) na kuongezwa kwenye itifaki katika uboreshaji wa mtandao [network upgrade] wa Sapling.

Ufunguo wa kutazama ni kifaa cha selective disclosure: unachagua ni nani aone nini, na kamwe humpi mamlaka ya kutumia pesa ili kufanya hivyo.

## Kwa ufupi

Ufunguo wa kutazama hutoa ufikiaji wa **kusoma pekee** shughuli za anwani au akaunti ya faragha ya Zcash: yeyote anayeushikilia anaweza kuona miamala inayoingia (na, kwa funguo kamili za kutazama, inayotoka), lakini hawezi kamwe kutumia pesa.

- **Ni nini:** Kifaa cha selective disclosure cha mabwawa ya faragha [shielded pools]. Kilianzishwa katika [ZIP 310](https://zips.z.cash/zip-0310), na kuongezwa kwenye itifaki katika uboreshaji wa mtandao wa Sapling.
- **Kinachotoa:** Utambuzi wa amana (funguo za kuingia za `uivk…`) au uwezo kamili wa kuona kinachoingia/kinachotoka kwa akaunti (funguo kamili zilizounganishwa za kutazama za `uview…`), pamoja na funguo za zamani za Sapling `zxviews…`.
- **Kisichotoa:** Mamlaka ya kutumia pesa. Hakuna chochote anachofanya mmiliki wa ufunguo wa kutazama kinachoweza kuhamisha fedha.
- **Mahali kinapofanya kazi leo:** Kuuza nje/kuingiza katika [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) na akaunti za kutazama pekee katika pochi kama Zkool; tazama ukurasa wa [Pochi](/using-zcash/wallets) kwa jedwali la sasa la usaidizi.
- **Kanuni ya jumla:** Pendelea ufunguo wenye upeo mwembamba zaidi unaojibu swali linaloulizwa, na kumbuka kwamba ufunguo uliotolewa hauwezi kurejeshwa — unaweza tu kupitwa na wakati kwa kuhamisha fedha.

---

## Kwa nini utumie ufunguo wa kutazama?

Maandishi ya Electric Coin Company kuhusu mada hii yanaeleza hali zinazojitokeza mara nyingi zaidi, na bado ndizo hali za kawaida leo:

- **Soko la kubadilishana sarafu linalofuatilia amana.** Soko la kubadilishana sarafu hupakia ufunguo wa kutazama unaoingia kwenye node ya utambuzi inayofikika kupitia intaneti ili liweze kutambua amana za wateja kwenye anwani ya faragha, huku ufunguo wa kutumia pesa ukibaki kwenye hardware wallet ambayo haigusi mtandao kamwe.
- **Mlezi anayethibitisha mali zake.** Mlezi humpa mkaguzi ufunguo kamili wa kutazama kwa kila anwani ya faragha. Mkaguzi anaweza kukagua salio hizo na kupitia shughuli za zamani kwenda na kutoka kwenye anwani hizo, na hawezi kufanya jambo lingine.
- **Uchunguzi wa kina wa mhusika mwingine.** Pale ambapo soko la kubadilishana sarafu linahitaji kupitia historia ya faragha ya mteja kama sehemu ya uchunguzi wa kina ulioimarishwa, linaweza kuomba ufunguo wa kutazama badala ya fedha.

## Ufunguo wa kutazama hufichua nini na haufichui nini

Kuna zaidi ya aina moja ya ufunguo, na tofauti hiyo huamua kiasi unachotoa.

| Ufunguo | Kiambishi awali | Hutoa |
|---|---|---|
| Ufunguo kamili uliounganishwa wa kutazama (UFVK) | `uview…` | Huona miamala inayoingia **na** inayotoka kwa kila bwawa katika akaunti |
| Ufunguo uliounganishwa unaoingia wa kutazama (UIVK) | `uivk…` | Huona miamala inayoingia pekee, kwa kila bwawa katika akaunti |
| Ufunguo kamili uliopanuliwa wa kutazama wa Sapling | `zxviews…` | Huona shughuli zinazoingia na zinazotoka za Sapling kwa anwani za ufunguo huo |

Hakuna kati ya hizi zinazoweza kutumia pesa. Zote ni za kudumu kwa namna muhimu: ufunguo ulioutoa hauwezi kurejeshwa, unaweza tu kupitwa na wakati kwa kuhamisha fedha kwenye akaunti ambayo mhusika mwingine hana funguo zake.

Kuna mitego miwili ya ufichuaji inayofaa kuijua kabla ya kushiriki chochote.

**Kuingia hakumaanishi upeo mwembamba.** Ufunguo uliounganishwa unaoingia wa kutazama una upeo wa akaunti nzima, si wa anwani moja uliyoombwa. Kuuza nje UIVK kwa anwani moja ya Sapling bado hutoa mwonekano wa miamala inayoingia katika kila bwawa la akaunti hiyo, hivyo hufichua zaidi ya anwani inayotajwa. Kitabu cha [Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) kinasema hili waziwazi.

**Anwani iliyochapishwa tayari hufichua ufunguo wake unaoingia wa kutazama kwa mpinzani wa baadaye.** [ZIP 326](https://zips.z.cash/zip-0326) inaeleza kwamba mpinzani mwenye kompyuta ya quantum anaweza kurejesha ufunguo wa kutazama unaoingia kutoka kwenye anwani iliyochapishwa yenye diversifier, jambo linalowezekana kwa namna ambayo kurejesha ufunguo wa nullifier hakujawa. Kuchapisha anwani si sawa na kuchapisha ufunguo wa kutazama leo, lakini mambo hayo mawili hukaribiana zaidi baada ya muda mrefu wa kutosha.

## Funguo za kutazama baada ya Ironwood

NU6.3 ilianzisha bwawa la faragha la Ironwood na kulifanya bwawa la Orchard litumike kwa matumizi pekee, hivyo fedha huhama kutoka moja hadi jingine kadiri muda unavyopita. Tazama [Ironwood](/zcash-tech/ironwood) na [Turnstile](/zcash-tech/the-turnstile) kwa maelezo ya uboreshaji wenyewe.

**Ufunguo wa kutazama uliotolewa kabla ya Ironwood unaendelea kufanya kazi baada ya uhamaji.** ZIP 326 hubainisha kwamba mpokeaji, na ufunguo wake unaolingana wa kutazama unaoingia, una upeo wa itifaki ya Orchard badala ya bwawa: ufunguo huohuo wa kutazama unaoingia hujaribu kufumbua maandishi fiche ya madokezo ya bwawa la Orchard na bwawa la Ironwood. Zallet hutekeleza hali hiyo, ikieleza madokezo ya Ironwood kuwa yenye muundo wa Orchard na yanayojaribiwa kufumbuliwa kwa funguo za kutazama za Orchard za akaunti chini ya kikoa cha usimbaji fiche wa dokezo cha Ironwood.

Matokeo matatu kwa yeyote anayeshikilia au kutoa ufunguo:

1. **Salio huhama kati ya mabwawa, na mtazamaji huona hili likitokea.** [ZIP 318](https://zips.z.cash/zip-0318) hubainisha uhamaji kama mfululizo wa miamala midogo ya Orchard-kwenda-Ironwood iliyo na viwango vilivyokusudiwa kufanana, inayotangazwa kwa ratiba iliyochanganywa kwa nasibu; kila mmoja hutumia dokezo moja la Orchard na kutoa matokeo moja ya Ironwood yenye dhehebu la kawaida. Mkaguzi anayetazama kwa ufunguo wa kutazama huona mali zikihama kutoka bwawa moja hadi jingine kwa hatua katika wiki kadhaa, si kwa uhamisho mmoja. Pochi inaweza kujenga upya maendeleo yake yenyewe ya uhamaji kutoka data ya mnyororo kwa kutumia funguo zake za kutazama.
2. **Kila hatua ya uhamaji hufichua thamani inayohamishwa.** Hili ni la asili katika kuvuka turnstile, na ndilo hufanya uhamaji ukagulikwe. Kugawa salio katika madhehebu ya kawaida humaanisha hakuna muamala mmoja unaofichua salio lote la bwawa la Orchard.
3. **Akaunti zilizoanzishwa baada ya Ironwood zinaweza kupata funguo zake kwa njia tofauti.** [ZIP 2005](https://zips.z.cash/zip-2005) huongeza alama ya `use_qsk` kwa funguo zinazoweza kurejeshwa kwa quantum, na hubadilisha namna funguo za kuingia, kutoka na diversifier zinavyopatikana, hivyo funguo za `use_qsk = true` ni funguo tofauti kweli. ZIP 326 huhitaji alama hiyo ifanane katika akaunti nzima na hukataza kuzalisha funguo za `use_qsk = true` kabla ya NU6.3 kuanzishwa kwenye Mainnet. Kwa hiyo ufunguo unaouzwa nje kutoka akaunti iliyokuwepo kabla ya Ironwood ni ufunguo wa `use_qsk = false`, na unaendelea kuwa sahihi kwa akaunti hiyo. Usidhanie kwamba ufunguo unaouzwa nje kutoka akaunti moja unaeleza akaunti nyingine.

## Kuuza nje ufunguo wa kutazama

### Zallet

[Zallet](https://github.com/zcash/zallet) ni pochi ya full node iliyochukua nafasi ya pochi iliyokuwa ndani ya zcashd. Uuzaji nje na uingizaji wa funguo za kutazama uliwasili katika **v0.1.0-beta.2 (28 Julai 2026)**, kwa hiyo hakikisha toleo lako kwanza; matoleo ya awali hayana mbinu hizi. Kila hoja baada ya jina la mbinu lazima iwe JSON halali, kumaanisha thamani za maandishi hubaki na alama zao mbili za nukuu. Mwongozo wa Marejeo ya Haraka wa [Zallet](/using-zcash/zallet-quick-reference-guide) unaeleza mtindo wa jumla wa amri.

Orodhesha kile ambacho pochi inashikilia:

```bash
zallet rpc listaddresses
```

Uza nje ufunguo kamili uliounganishwa wa kutazama wa akaunti kwa kupitisha anwani iliyounganishwa:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Badala yake, uza nje ufunguo uliounganishwa unaoingia wa kutazama wa akaunti, ukitumia hoja ya hiari ya `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Kupitisha anwani ya Sapling hurejesha ufunguo kamili uliopanuliwa wa kutazama wa Sapling wa akaunti hiyo (`zxviews…`), unaolingana na tabia ya zamani ya zcashd. Kuna vikwazo viwili vilivyoandikwa: anwani za Sprout hukataliwa, na ufunguo kamili uliopanuliwa wa kutazama wa Sapling hauwezi kuuzwa nje kutoka akaunti ambayo yenyewe iliingizwa kama ya kutazama pekee, kwa kuwa pochi haiwezi kuujenga upya. Muundo wa `ivk` hufanya kazi kwa akaunti zilizoingizwa za kutazama pekee.

### Pochi zinazouza nje funguo za kutazama kupitia kiolesura chao wenyewe

Ukurasa wa [Pochi](/using-zcash/wallets) hufuatilia usaidizi wa funguo za kutazama na utayari wa Ironwood kwa kila pochi. Wakati wa kuandika, pochi zinazoorodhesha usaidizi wa funguo za kutazama na **Ironwood: Tayari** zinajumuisha ZODL, Zingo!, Zkool, Cake, Zallet, zecd na Nozy. Kagua ukurasa huo badala ya huu kabla ya kutegemea pochi yoyote moja, kwa sababu utayari hubadilika.

## Kuingiza ufunguo wa kutazama kama akaunti ya kutazama pekee

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ndilo chaguo lenye kubadilika zaidi hapa, kwa sababu linakubali funguo zilizounganishwa pamoja na zile za zamani. README yake huandika akaunti za kutazama pekee zilizoundwa kutoka **ufunguo wa kutazama uliounganishwa** au **ufunguo uliopanuliwa wa kutazama wa Sapling**, pamoja na funguo za zamani zilizopanuliwa za faragha zilizouzwa nje kutoka zcashd. Ongeza akaunti mpya, chagua njia ya kutazama pekee, na ubandike ufunguo wa `uview…` au `zxviews…`; akaunti hiyo kisha husawazisha na kuripoti salio na historia bila mamlaka ya kutumia pesa.

Usaidizi wa itifaki wa Ironwood na uhamaji wa Orchard-kwenda-Ironwood uliwasili katika Zkool 6.24.0 (20 Julai 2026), na 6.26.1 (2 Agosti 2026) ilirekebisha utambuzi wa miamala ya Ironwood katika mempool. Tumia 6.26.1 au toleo la baadaye.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Hoja ya pili ni sera ya kuchanganua upya: `"whenkeyisnew"` (chaguo-msingi), `"yes"` au `"no"`. Ya tatu ni urefu wa block wa kuanzia kuchanganua upya. Zallet huingiza ufunguo kama akaunti ya kutazama pekee na hufuatilia miamala inayoingia na inayotoka kwa anwani zake bila mamlaka ya kutumia pesa.

**Zallet huingiza funguo kamili zilizopanuliwa za kutazama za Sapling pekee.** Haitaingiza ufunguo kamili uliounganishwa wa kutazama wa `uview…`, ingawa inaweza kuuza nje huo. Ili kutoa ufikiaji wa kusoma kwa akaunti nzima iliyounganishwa, uza nje UFVK kutoka Zallet na uiingize kwenye pochi inayokubali funguo zilizounganishwa, kama Zkool.

Ili kubadilisha ufunguo ulioingizwa kuwa faili kamili ya historia ya miamala, yenye txid, ada na jumbe, tazama [Kuuza Nje Historia ya Miamala kutoka Viewing Key](/guides/viewing-key-transaction-export).

## Kilichobadilika, na unachopaswa kuacha kutafuta

Ikiwa ulifuata toleo la zamani la ukurasa huu, au tafsiri yake, njia tatu hazifanyi kazi tena.

- **`zcash-cli z_exportviewingkey` na `z_importviewingkey`.** zcashd ilifikia kusitishwa kwake kwa mwisho wa usaidizi tarehe 18 Julai 2026 na haifanyi kazi tena. Mbinu za Zallet zenye majina sawa ndizo mbadala; tazama mwongozo wa uhamaji wa [](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Mwongozo wa Ywallet.** Ukurasa wa Pochi unaweka alama kwa Ywallet kuwa **Ironwood: Haiko Tayari**, kwa hiyo si pochi ya kuelekeza watu kwa funguo za kutazama za enzi ya Ironwood. Zkool, kutoka kwa msanidi programu yuleyule, hukubali aina hiyohiyo ya funguo na imewekewa alama Tayari.
- **zcashblockexplorer.com/vk.** Huduma hii hurejesha HTTP 503 yenye cheti batili, na imeondolewa badala ya kubadilishwa. Kubandika ufunguo wa kutazama kwenye tovuti hukabidhi historia yako yote ya miamala kwa yeyote anayeendesha tovuti hiyo, jambo ambalo daima lilikuwa chaguo dhaifu zaidi kati ya yale matatu kwenye ukurasa wa zamani. Ingiza ufunguo kwenye pochi unayoendesha badala yake.

## Taswira / Mfano

### Dirisha la mkaguzi

Fikiria akaunti ya faragha kama chumba cha sanduku za amana salama katika benki:

- **Ufunguo wa kutumia pesa** ni ufunguo wa chumba. Yeyote anayeshikilia anaweza kufungua sanduku na kutoa yaliyomo.
- **Ufunguo wa kutazama** ni dirisha la mkaguzi linaloangalia chumba hicho. Mkaguzi anaweza kutazama kila sanduku likiingia na kutoka, kusoma lebo, na kuweka leja — lakini dirisha halina kipini. Hakuna kilichomo ndani ya chumba kinachoweza kuhamishwa na mtu anayetazama kupitia hilo.

### Kile ambacho dirisha haliwezi kuonyesha

Dirisha linatazama chumba, si ulimwengu wa nje. Linaonyesha shughuli za faragha za akaunti inayofuatiliwa; halimgeuzi mtazamaji kuwa mwangalizi wa blockchain nzima, wala halimruhusu mtazamaji kuhusianisha shughuli za akaunti na historia ya uwazi ya mtu mwingine. Na kwa kuwa dirisha limesakinishwa katika kiwango cha akaunti, kumpa mtu tundu la kutazamia sanduku moja la amana (anwani moja) bado humpa mtazamo wa miamala inayoingia wa chumba kizima — hasa ndiyo sababu kanuni ya ufunguo wenye upeo mwembamba zaidi ipo.

### Kwa nini huwezi kulichukua dirisha tena

Ufunguo wa kutazama ni taarifa, si ingizo la ruhusa. Baada ya kunakiliwa, huendelea kuwepo hadi fedha zitoke kwenye akaunti inayotazama. Suluhisho la vitendo ni mzunguko: hamisha salio kwenye akaunti mpya ambayo funguo zake hazikuwahi kupokewa na mhusika mwingine, na dirisha la zamani hutazama chumba tupu.

## Uchambuzi wa Kina

### Ufumbuzi wa majaribio: jinsi utazamaji unavyofanya kazi

Kila muamala wa faragha husimba kwa fiche maandishi wazi ya madokezo kwa mpokeaji aliyekusudiwa. Pochi inayoshikilia ufunguo wa kutazama hufanya **ufumbuzi wa majaribio**: kwa kila muamala unaoupata kwenye mnyororo, hujaribu kufumbua maandishi fiche ya madokezo kwa ufunguo huo. Mafanikio hufichua thamani ya dokezo, diversifier ya mpokeaji na ujumbe; kutofaulu hakugharimu chochote. Hii ndiyo sababu ufunguo huohuo wa kutazama unaoingia huendelea kufanya kazi katika mabwawa ya Orchard na Ironwood — [ZIP 326](https://zips.z.cash/zip-0326) huweka upeo wa mpokeaji kwenye itifaki ya Orchard, hivyo maandishi fiche ya dokezo ya Ironwood yana muundo wa Orchard na hujaribiwa kufumbuliwa kwa funguo za kutazama za Orchard za akaunti chini ya kikoa cha usimbaji fiche wa dokezo cha Ironwood.

### Kamili dhidi ya unaoingia: kile kinachoamuliwa na upataji

Ufunguo wa kutazama **kamili** unaweza kupata uwezo wa kutazama unaotoka, ambao humruhusu mkaguzi kujenga upya upande wa *mtumaji* wa uhamisho baada ya muamala kufumbuliwa. Ufunguo wa kutazama **unaoingia** hukomea kwa makusudi: hutambua na kufumbua madokezo yanayoingia lakini hauwezi kujenga upya uhusiano unaotoka. Upataji kati ya uwezo huu ni wa njia moja — ufunguo unaoingia hupatikana *kutoka* kwenye ufunguo kamili, kamwe si kinyume chake — jambo linalofanya “unaoingia pekee” kuwa upunguzaji halisi badala ya ahadi. Alama ya `use_qsk` kutoka [ZIP 2005](https://zips.z.cash/zip-2005) hubadilisha upataji wenyewe, hivyo funguo zinazoweza kurejeshwa kwa quantum ni familia tofauti kabisa ya funguo, si toleo la zile za zamani.

### Uhamaji huonekanaje kwa mtazamaji

Kwa sababu uhamaji wa [ZIP 318](https://zips.z.cash/zip-0318) ni mfululizo uliochanganywa kwa nasibu wa miamala midogo yenye viwango vinavyofanana ya Orchard-kwenda-Ironwood, mtazamaji anayeshikilia ufunguo huona ngazi: hatua nyingi za thamani ya dhehebu la kawaida badala ya mruko mmoja. Hakuna hatua moja inayofichua salio lote linalohamishwa, lakini *muundo* unatambulika — ambayo ndiyo ubadilishanaji uliokusudiwa wa turnstile inayoweza kukaguliwa.

## Athari za Vitendo

- **Kwa masoko ya kubadilishana sarafu na wachakataji wa malipo:** Pakia ufunguo wa kutazama unaoingia wa akaunti (au UFVK kwa ufunikaji kamili) kwenye node ya utambuzi na sawazisha amana za wateja kiotomatiki, kama ungefanya kwa anwani ya uwazi — lakini ufunguo wa kutumia pesa wa mteja hautoki kamwe kwenye uhifadhi baridi.
- **Kwa wakaguzi na uthibitisho wa akiba:** Ufunguo kamili wa kutazama hubadilisha “tuamini” kuwa “thibitisha hili”: salio na historia kamili ya miamala kwa akaunti zinazotazamwa, bila uwezo wowote wa kuzigusa. Changanya na [Ufichuaji wa Malipo](/zcash-tech/payment-disclosures) kwa uthibitisho wa mara moja kuhusu malipo moja.
- **Kwa uchunguzi wa kina:** Mpe mhusika mwingine ufunguo wa akaunti inayohusika na makubaliano, si pochi yako yote. Ikiwa uhusiano utaisha, zungusha akaunti.
- **Kwa uchaguzi wa vifaa:** Zallet huuza nje UFVK na huingiza funguo kamili zilizopanuliwa za kutazama za Sapling; Zkool hukubali funguo zilizounganishwa na za zamani kama akaunti za kutazama pekee. Kagua ukurasa wa [Pochi](/using-zcash/wallets) kwa jedwali la sasa la utayari wa Ironwood kabla ya kusanifisha pochi.
- **Gharama ya ufichuaji ni ya kudumu:** Kila mmiliki wa ziada wa ufunguo ni mstari wa kudumu wa faragha usioweza kufungwa. Toa funguo kwa kila uhusiano, ziwekee upeo wa akaunti moja, na andika ni nani anashikilia nini.

## Makosa ya Kawaida

| Imani ya kawaida | Hali halisi |
| --- | --- |
| "Ufunguo wa kutazama unaweza kutumia fedha ukivuja." | Hauwezi. Funguo za kutazama hazina mamlaka ya kutumia pesa; ubaya mkubwa wa uvujaji ni kufichua historia. |
| "Ninaweza kubatilisha ufunguo wa kutazama baadaye." | Huwezi. Ufunguo uliotolewa hufanya kazi hadi fedha zihamishwe kwenye akaunti ambayo mhusika mwingine hana funguo zake. |
| "Kuuza nje UIVK kwa anwani moja huonyesha anwani hiyo pekee." | Funguo za kutazama zina upeo wa akaunti. UIVK huonyesha shughuli zinazoingia kwa kila bwawa katika akaunti. |
| "`zcash-cli z_exportviewingkey` bado inafanya kazi." | Hapana. zcashd ilifikia kusitishwa kwake kwa mwisho wa usaidizi tarehe 18 Julai 2026; tumia Zallet za `z_exportviewingkey` / `z_importviewingkey` badala yake. |
| "Kubandika ufunguo wa kutazama kwenye kifaa cha wavuti ni salama kwa sababu ni wa kusoma pekee." | Kusoma pekee bado kunamaanisha historia yako yote ya miamala ya akaunti hiyo inakabidhiwa kwa yeyote anayeendesha tovuti. Ingiza ufunguo kwenye pochi unayoendesha. |
| "Zallet inaweza kuingiza ufunguo wowote wa kutazama ambao Zallet inaweza kuuza nje." | Hapana. Zallet huingiza funguo kamili zilizopanuliwa za kutazama za Sapling pekee; funguo zilizounganishwa za `uview…` lazima ziende kwenye pochi zinazokubali funguo zilizounganishwa, kama Zkool. |

## Kurasa Zinazohusiana

- [Ufichuaji wa Malipo](/zcash-tech/payment-disclosures) — kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kutoa ufikiaji endelevu kwa akaunti
- [Anwani Zilizounganishwa](/zcash-tech/unified-addresses) — safu ya anwani inayobeba vipokezi vya funguo za kutazama
- [Ironwood](/zcash-tech/ironwood) — bwawa la faragha la NU6.3 ambalo Orchard huhamia ndani yake
- [Turnstile](/zcash-tech/the-turnstile) — utaratibu wa uhamaji wa Orchard-kwenda-Ironwood ambao watazamaji wanaweza kufuatilia
- [Pochi](/using-zcash/wallets) — saraka kamili ya pochi, usaidizi wa funguo za kutazama na utayari wa Ironwood
- [Kuuza Nje Historia ya Miamala kutoka Viewing Key](/guides/viewing-key-transaction-export) — kubadilisha ufunguo ulioingizwa kuwa faili kamili ya historia ya txid/ada/ujumbe

## Rasilimali

Tumia funguo za kutazama inapohitajika, na pendelea ufunguo wenye upeo mwembamba zaidi unaojibu swali linaloulizwa.

- [Ufichuaji wa Malipo](/zcash-tech/payment-disclosures) - kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kutoa ufikiaji endelevu kwa akaunti
- [ZIP 326: Madhara ya NU6.3 kwa Pochi](https://zips.z.cash/zip-0326) — jinsi funguo za kutazama zinavyofanya kazi katika mabwawa ya Orchard na Ironwood
- [ZIP 229: Muundo wa Muamala wa Toleo la 6](https://zips.z.cash/zip-0229) — hufafanua mabwawa ya Orchard na Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — vipimo vya ufunguo wa kutazama
- [Zallet kumbukumbu ya mabadiliko](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — ni toleo gani lililoongeza mbinu gani ya RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — aina za akaunti na funguo zinazosaidiwa
- [ECC, Kueleza Funguo za Kutazama](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure na Funguo za Kutazama](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Uwasilishaji wa Video wa Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
