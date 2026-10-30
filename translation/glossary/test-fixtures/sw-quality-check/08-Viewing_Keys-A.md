<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Viewing_Keys.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Funguo za Kutazama

Anwani za faragha [shielded addresses] hukuruhusu kufanya miamala huku ukifichua kidogo iwezekanavyo kwenye mnyororo wa vizuizi [blockchain] wa Zcash. Hivyo, nini hutokea unapohitaji kumwonyesha mhusika mahususi kile unachomiliki, au kile ulichotuma? Kila anwani ya faragha ina ufunguo wa kutazama [viewing key] unaotoa ufikiaji wa kusoma bila kutoa uwezo wa kutumia pesa. Funguo za kutazama zilianzishwa katika [ZIP 310](https://zips.z.cash/zip-0310) na kuongezwa kwenye itifaki katika uboreshaji wa mtandao [network upgrade] wa Sapling.

Ufunguo wa kutazama ni kifaa cha selective disclosure: unachagua ni nani anayeona nini, na kamwe humkabidhi mamlaka ya kutumia pesa ili kufanya hivyo.

## Kwa Ufupi

Ufunguo wa kutazama hutoa ufikiaji wa **kusoma pekee** kwa shughuli za anwani au akaunti ya Zcash ya faragha: yeyote anayeushikilia anaweza kuona miamala inayoingia (na, kwa funguo kamili za kutazama, inayotoka), lakini hawezi kamwe kutumia pesa.

- **Ni nini:** kifaa cha selective disclosure cha mabwawa ya faragha [shielded pools]. Kilianzishwa katika [ZIP 310](https://zips.z.cash/zip-0310), na kuongezwa kwenye itifaki katika uboreshaji wa mtandao wa Sapling.
- **Kinachotoa:** utambuzi wa amana (funguo zinazoingia [incoming keys] za `uivk…`) au mwonekano kamili wa vinavyoingia/vinavyotoka kwa akaunti (funguo kamili zilizounganishwa za kutazama [unified full viewing keys] za `uview…`), pamoja na funguo za urithi za Sapling `zxviews…`.
- **Kisichotoa:** mamlaka ya kutumia pesa. Hakuna jambo analofanya mshikiliaji wa ufunguo wa kutazama linaloweza kuhamisha fedha.
- **Mahali kinapofanya kazi leo:** kuhamisha nje/kuingiza katika [Zallet](https://github.com/zcash/zallet) (v0.1.0-beta.2+, `z_exportviewingkey` / `z_importviewingkey`) na akaunti za kutazama pekee katika pochi kama Zkool; tazama ukurasa wa [Pochi](/using-zcash/wallets) kwa jedwali la sasa la usaidizi.
- **Kanuni ya jumla:** pendelea ufunguo finyu zaidi unaojibu swali lililoulizwa, na kumbuka kuwa ufunguo uliotolewa hauwezi kurejeshwa — unaweza tu kupitwa na wakati kwa kuhamisha fedha.

---

## Kwa nini utumie ufunguo wa kutazama?

Maandishi ya Electric Coin Company kuhusu mada hii yanaeleza hali zinazojitokeza mara nyingi zaidi, na hizo bado ndizo za kawaida leo:

- **Soko la kubadilishana sarafu linalofuatilia amana.** Soko la kubadilishana sarafu hupakia ufunguo wa kutazama unaoingia kwenye node ya utambuzi iliyo wazi kwenye intaneti ili liweze kutambua amana za wateja kwenye anwani ya faragha, huku ufunguo wa kutumia pesa ukibaki kwenye maunzi ambayo hayawahi kuunganishwa na mtandao.
- **Mlinzi wa mali anayethibitisha mali anazoshikilia.** Mlinzi wa mali humpa mkaguzi ufunguo kamili wa kutazama kwa kila anwani ya faragha. Mkaguzi anaweza kukagua salio hizo na kupitia shughuli za zamani kwenda na kutoka kwenye anwani hizo, na hawezi kufanya jambo lingine lolote.
- **Uangalizi wa kina kwa mshirika.** Pale soko la kubadilishana sarafu linapohitaji kupitia historia ya faragha ya mteja kama sehemu ya uangalizi wa kina ulioimarishwa, linaweza kuomba ufunguo wa kutazama badala ya fedha.

## Kile ufunguo wa kutazama hufichua na usichofichua

Kuna aina zaidi ya moja ya ufunguo, na tofauti yake huamua kiasi unachofichua.

| Ufunguo | Kiambishi | Hutoa |
|---|---|---|
| Ufunguo kamili uliounganishwa wa kutazama (UFVK) | `uview…` | Huona miamala inayoingia **na** inayotoka kwa kila bwawa katika akaunti |
| Ufunguo uliounganishwa unaoingia wa kutazama (UIVK) | `uivk…` | Huona miamala inayoingia pekee, kwa kila bwawa katika akaunti |
| Ufunguo kamili wa kutazama uliopanuliwa wa Sapling | `zxviews…` | Huona shughuli zinazoingia na zinazotoka za Sapling kwa anwani za ufunguo |

Hakuna kati ya hizi zinazoweza kutumia pesa. Zote ni za kudumu kwa namna muhimu: ufunguo uliokwisha kutolewa hauwezi kurejeshwa, unaweza tu kupitwa na wakati kwa kuhamisha fedha kwenye akaunti ambayo mhusika mwingine hana funguo zake.

Mitego miwili ya ufichuaji inafaa kujulikana kabla ya kushiriki chochote.

**Kuingia hakumaanishi kuwa finyu.** Ufunguo uliounganishwa unaoingia wa kutazama unahusu akaunti nzima, si anwani moja uliyoombwa kuizungumzia. Kuhamisha UIVK nje kwa anwani moja ya Sapling bado hutoa mwonekano wa vinavyoingia katika kila bwawa la akaunti hiyo, kwa hivyo hufichua zaidi ya anwani inayotajwa. Kitabu cha [Zallet](https://zcash.github.io/zallet/zcashd/json_rpc.html) kinaeleza hili waziwazi.

**Anwani iliyochapishwa tayari hufichua ufunguo wake wa kutazama unaoingia kwa adui wa baadaye.** [ZIP 326](https://zips.z.cash/zip-0326) inabainisha kuwa adui mwenye kompyuta ya quantum anaweza kurejesha ufunguo wa kutazama unaoingia kutoka kwenye anwani mseto iliyochapishwa, jambo linalowezekana kwa namna ambayo kurejesha ufunguo wa nullifier hakuwezekani. Kuchapisha anwani si sawa na kuchapisha ufunguo wa kutazama leo, lakini hivi viwili hukaribiana zaidi kwa muda mrefu wa kutosha.

## Funguo za kutazama baada ya Ironwood

NU6.3 ilianzisha bwawa la faragha la Ironwood na kufanya bwawa la Orchard litumike kwa matumizi ya pesa pekee, kwa hivyo fedha huhama kutoka moja hadi jingine kadiri muda unavyopita. Tazama [Ironwood](/zcash-tech/ironwood) na [Turnstile](/zcash-tech/the-turnstile) kwa uboreshaji wenyewe.

**Ufunguo wa kutazama uliotolewa kabla ya Ironwood unaendelea kufanya kazi baada ya uhamaji.** ZIP 326 inabainisha kuwa kipokezi, na ufunguo wake unaolingana wa kutazama unaoingia, unahusu *itifaki* ya Orchard badala ya bwawa: ufunguo huo huo wa kutazama unaoingia hufanya usimbuaji wa majaribio kwa maandishi fiche ya dokezo la bwawa la Orchard na la bwawa la Ironwood. Zallet huitekeleza kwa njia hiyo, ikieleza madokezo ya Ironwood kuwa yana umbo la Orchard na kufanyiwa usimbuaji wa majaribio kwa funguo za kutazama za Orchard za akaunti chini ya kikoa cha usimbaji fiche wa dokezo la Ironwood.

Matokeo matatu kwa yeyote anayeshikilia au kutoa ufunguo:

1. **Salio huhama kati ya mabwawa, na mtazamaji huona yakitokea.** [ZIP 318](https://zips.z.cash/zip-0318) inaeleza uhamaji kama mfululizo wa miamala midogo ya Orchard-kwenda-Ironwood yenye ufanano wa kimakusudi, inayotangazwa kwa ratiba iliyochanganywa bila mpangilio, kila mmoja ukitumia dokezo moja la Orchard na kutoa toweo moja la Ironwood la thamani ya kawaida. Mkaguzi anayetazama kwa ufunguo wa kutazama huona mali zikihama kutoka bwawa moja hadi jingine kwa hatua katika wiki kadhaa, si kwa mwendo mmoja. Pochi inaweza kutengeneza upya maendeleo yake yenyewe ya uhamaji kutoka kwa data ya mnyororo kwa kutumia funguo zake za kutazama.
2. **Kila hatua ya uhamaji hufichua thamani inayohamisha.** Hili ni la asili katika kuvuka turnstile, na ndilo linaloufanya uhamaji ukagulikane. Kugawanya salio katika thamani za kawaida kunamaanisha kuwa hakuna muamala mmoja unaofichua salio zima la bwawa la Orchard.
3. **Akaunti zilizoundwa baada ya Ironwood zinaweza kuzalisha funguo zake kwa njia tofauti.** [ZIP 2005](https://zips.z.cash/zip-2005) huongeza alama ya `use_qsk` kwa funguo zinazoweza kurejeshwa na quantum, na hubadilisha jinsi funguo zinazoingia, zinazotoka na za diversifier zinavyozalishwa, kwa hivyo funguo za `use_qsk = true` ni funguo tofauti kikweli. ZIP 326 inahitaji alama hiyo iwe sawa katika akaunti nzima na inakataza kuzalisha funguo za `use_qsk = true` kabla ya NU6.3 kuamilishwa kwenye Mainnet. Kwa hiyo ufunguo uliosafirishwa kutoka kwenye akaunti iliyokuwepo kabla ya Ironwood ni ufunguo wa `use_qsk = false`, na unabaki sahihi kwa akaunti hiyo. Usidhanie kuwa ufunguo uliosafirishwa kutoka kwenye akaunti moja unaeleza akaunti nyingine.

## Kusafirisha ufunguo wa kutazama

### Zallet

[Zallet](https://github.com/zcash/zallet) ni pochi ya full node iliyochukua nafasi ya pochi iliyokuwa ndani ya zcashd. Usafirishaji na uingizaji wa ufunguo wa kutazama uliwasili katika **v0.1.0-beta.2 (28 Julai 2026)**, kwa hivyo angalia toleo lako kwanza; matoleo ya awali hayana mbinu hizi. Kila hoja baada ya jina la mbinu lazima iwe JSON halali, ambayo inamaanisha thamani za mifuatano hubakiza alama zake mbili za nukuu. Mwongozo wa Marejeo ya Haraka wa [Zallet](/using-zcash/zallet-quick-reference-guide) unaeleza mtindo wa jumla wa amri.

Orodhesha kile ambacho pochi inashikilia:

```bash
zallet rpc listaddresses
```

Safirisha ufunguo kamili uliounganishwa wa kutazama wa akaunti kwa kupitisha anwani iliyounganishwa:

```bash
zallet rpc z_exportviewingkey '"<unified address>"'
```

Safirisha ufunguo uliounganishwa unaoingia wa kutazama wa akaunti badala yake, ukitumia hoja ya hiari ya `ivk`:

```bash
zallet rpc z_exportviewingkey '"<unified address>"' true
```

Kupitisha anwani ya Sapling hurejesha ufunguo kamili wa kutazama uliopanuliwa wa Sapling wa akaunti hiyo (`zxviews…`), ukiendana na tabia ya zamani ya zcashd. Vizuizi viwili vilivyoandikwa: anwani za Sprout hukataliwa, na ufunguo kamili wa kutazama uliopanuliwa wa Sapling hauwezi kusafirishwa kutoka kwenye akaunti ambayo yenyewe iliingizwa kama ya kutazama pekee, kwa sababu pochi haiwezi kuutengeneza upya. Fomu ya `ivk` hufanya kazi kwa akaunti zilizoingizwa za kutazama pekee.

### Pochi zinazohamisha funguo za kutazama kutoka kwenye kiolesura chao

Ukurasa wa [Pochi](/using-zcash/wallets) hufuatilia usaidizi wa ufunguo wa kutazama na utayari wa Ironwood kwa kila pochi. Wakati wa kuandika, pochi zinazoorodhesha usaidizi wa ufunguo wa kutazama na **Ironwood: Tayari** zinajumuisha ZODL, Zingo!, Zkool, Cake, Zallet, zecd na Nozy. Angalia ukurasa huo badala ya huu kabla ya kutegemea pochi yoyote moja, kwa sababu utayari hubadilika.

## Kuingiza ufunguo wa kutazama kama akaunti ya kutazama pekee

### Zkool

[Zkool](https://github.com/hhanh00/zkool2) ndilo chaguo linaloweza kubadilika zaidi hapa, kwa sababu hukubali funguo zilizounganishwa pamoja na za urithi. README yake huandika akaunti za kutazama pekee zilizoundwa kutoka kwenye **ufunguo uliounganishwa wa kutazama** au **ufunguo wa kutazama uliopanuliwa wa Sapling**, pamoja na funguo za urithi zilizopanuliwa za faragha zilizosafirishwa kutoka zcashd. Ongeza akaunti mpya, chagua njia ya kutazama pekee, na ubandike ufunguo wa `uview…` au `zxviews…`; akaunti hiyo husawazisha na kuripoti salio na historia bila mamlaka ya kutumia pesa.

Usaidizi wa itifaki ya Ironwood na uhamaji wa Orchard-kwenda-Ironwood uliwasili katika Zkool 6.24.0 (20 Julai 2026), na 6.26.1 (2 Agosti 2026) ilisahihisha utambuzi wa muamala wa Ironwood katika mempool. Tumia 6.26.1 au toleo la baadaye.

### Zallet

```bash
zallet rpc z_importviewingkey '"<zxviews… key>"' '"whenkeyisnew"' 0
```

Hoja ya pili ni sera ya kuchanganua upya: `"whenkeyisnew"` (chaguo-msingi), `"yes"` au `"no"`. Ya tatu ni kimo cha kizuizi cha kuanzia kuchanganua upya. Zallet huingiza ufunguo kama akaunti ya kutazama pekee na kufuatilia miamala inayoingia na inayotoka kwa anwani zake bila mamlaka ya kutumia pesa.

**Zallet huingiza funguo kamili za kutazama zilizopanuliwa za Sapling pekee.** Haiingizi ufunguo kamili uliounganishwa wa kutazama wa `uview…`, ingawa inaweza kusafirisha mmoja. Ili kutoa ufikiaji wa kusoma kwa akaunti nzima iliyounganishwa, safirisha UFVK kutoka Zallet na uiingize kwenye pochi inayokubali funguo zilizounganishwa, kama Zkool.

Ili kugeuza ufunguo ulioingizwa kuwa faili kamili ya historia ya miamala, yenye txid, ada na jumbe, tazama [Kusafirisha Historia ya Miamala kutoka kwenye Viewing Key](/guides/viewing-key-transaction-export).

## Kile kilichobadilika, na kile cha kuacha kukitafuta

Ikiwa ulifuata toleo la zamani la ukurasa huu, au tafsiri yake, njia tatu hazifanyi kazi tena.

- **`zcash-cli z_exportviewingkey` na `z_importviewingkey`.** zcashd ilifikia kusitishwa kwake kwa mwisho wa usaidizi tarehe 18 Julai 2026 na haiendeshi tena. Mbinu za Zallet zenye jina sawa ndizo mbadala; tazama mwongozo wa [uhamaji](/guides/migration-guide-zcashd-to-zebrad-zallet).
- **Mwongozo wa Ywallet.** Ukurasa wa Pochi unaweka Ywallet kama **Ironwood: Haiko Tayari**, kwa hivyo si pochi ya kuwaelekeza watu kwa funguo za kutazama za enzi ya Ironwood. Zkool, kutoka kwa msanidi programu huyo huyo, hukubali aina hiyohiyo ya funguo na imewekwa alama ya Tayari.
- **zcashblockexplorer.com/vk.** Huduma hurejesha HTTP 503 yenye cheti batili, na imeondolewa badala ya kubadilishwa. Kubandika ufunguo wa kutazama kwenye tovuti humkabidhi anayeendesha tovuti hiyo historia yako yote ya miamala, jambo ambalo daima lilikuwa dhaifu zaidi kati ya chaguo tatu kwenye ukurasa wa zamani. Ingiza ufunguo kwenye pochi unayoendesha badala yake.

## Taswira / Mfano

### Dirisha la mkaguzi

Fikiria akaunti ya faragha kama chumba cha amana salama katika benki:

- **Ufunguo wa kutumia pesa** ni ufunguo wa chumba. Yeyote anayeushikilia anaweza kufungua masanduku na kutoa yaliyomo.
- **Ufunguo wa kutazama** ni dirisha la mkaguzi linalotazama ndani ya chumba hicho. Mkaguzi anaweza kutazama kila sanduku likiingia na kutoka, kusoma lebo, na kuweka leja — lakini dirisha halina mpini. Hakuna kitu ndani ya chumba kinachoweza kuhamishwa na mtu anayetazama kupitia humo.

### Kile ambacho dirisha haliwezi kuonyesha

Dirisha linaelekea chumbani, si ulimwengu wa nje. Linaonyesha shughuli za faragha za akaunti inayotazamwa; halimgeuzi mtazamaji kuwa mwangalizi wa mnyororo mzima wa vizuizi, wala halimruhusu mtazamaji kuhusianisha shughuli za akaunti na historia ya uwazi ya mtu mwingine yeyote. Na kwa sababu dirisha limewekwa katika kiwango cha akaunti, kumpa mtu tundu la kutazamia sanduku moja la amana (anwani moja) bado humpa mwonekano wote wa vinavyoingia katika chumba — ndiyo maana sheria ya ufunguo finyu zaidi ipo.

### Kwa nini huwezi kurudisha dirisha

Ufunguo wa kutazama ni kipande cha taarifa, si ingizo la ruhusa. Ukishanakiliwa, huendelea kuwepo hadi fedha ziondoke kwenye akaunti inayotazama. Suluhisho la vitendo ni mzunguko: hamisha salio kwenye akaunti mpya ambayo mhusika mwingine hakuwahi kupokea funguo zake, na dirisha la zamani hutazama chumba tupu.

## Uchambuzi wa Kina

### Usimbuaji wa majaribio: jinsi utazamaji unavyofanya kazi

Kila muamala wa faragha husimba kwa fiche maandishi wazi ya madokezo kwa mpokeaji anayelengwa. Pochi inayoshikilia ufunguo wa kutazama hufanya **usimbuaji wa majaribio [trial decryption]**: kwa kila muamala unaopata kwenye mnyororo, hujaribu kusimbua kwa kufungua maandishi fiche ya madokezo kwa ufunguo huo. Mafanikio hufichua thamani ya dokezo, diversifier ya mpokeaji na ujumbe; kushindwa hakugharimu chochote. Hii ndiyo sababu ufunguo huo huo wa kutazama unaoingia huendelea kufanya kazi katika mabwawa ya Orchard na Ironwood — [ZIP 326](https://zips.z.cash/zip-0326) huweka kipokezi katika *itifaki* ya Orchard, kwa hivyo maandishi fiche ya dokezo la Ironwood yana umbo la Orchard na hufanyiwa usimbuaji wa majaribio kwa funguo za kutazama za Orchard za akaunti chini ya kikoa cha usimbaji fiche wa dokezo la Ironwood.

### Kamili dhidi ya inayoingia: kile uzalishaji unachoamua

Ufunguo **kamili** wa kutazama unaweza kuzalisha uwezo wa kutazama unaotoka, ambao humruhusu mkaguzi kutengeneza upya upande wa *mtumaji* wa uhamisho baada ya muamala kufunguliwa kwa usimbuaji. Ufunguo wa kutazama **unaoingia** hukoma kimakusudi mapema: hutambua na kufungua madokezo yanayoingia lakini hauwezi kutengeneza upya kiunganishi kinachotoka. Uzalishaji kati ya uwezo huu ni wa mwelekeo mmoja — ufunguo unaoingia huzalishwa *kutoka* kwenye ufunguo kamili, kamwe kinyume chake — jambo linalofanya “unaoingia pekee” kuwa upunguzaji halisi badala ya ahadi. Alama ya `use_qsk` kutoka [ZIP 2005](https://zips.z.cash/zip-2005) hubadilisha uzalishaji wenyewe, kwa hivyo funguo zinazoweza kurejeshwa na quantum ni familia tofauti kabisa ya funguo, si lahaja ya ile ya zamani.

### Jinsi uhamaji unavyoonekana kwa mtazamaji

Kwa sababu uhamaji wa [ZIP 318](https://zips.z.cash/zip-0318) ni mfululizo uliochanganywa bila mpangilio wa miamala midogo, yenye ufanano wa Orchard-kwenda-Ironwood, mtazamaji anayeshikilia ufunguo huona ngazi: hatua nyingi za thamani ya kiwango cha kawaida badala ya mruko mmoja. Hakuna hatua moja hufichua jumla ya salio linalohamishwa, lakini *muundo* unatambulika — ambayo ndiyo ubadilishanaji unaokusudiwa wa turnstile inayoweza kukaguliwa.

## Athari za Kivitendo

- **Kwa masoko ya kubadilishana sarafu na wachakataji wa malipo:** pakia ufunguo wa kutazama unaoingia wa akaunti (au UFVK kwa ufunikaji kamili) kwenye node ya utambuzi na sawazisha amana za wateja kiotomatiki, sawa na ungefanya kwa anwani ya uwazi — lakini ufunguo wa kutumia pesa wa mteja hauondoki kamwe kwenye hifadhi baridi.
- **Kwa wakaguzi na uthibitisho wa akiba:** ufunguo kamili wa kutazama hubadilisha “tuamini” kuwa “thibitisha hili”: salio na historia kamili ya miamala kwa akaunti zinazotazamwa, bila uwezo wowote wa kuzigusa. Changanya na [Ufichuaji wa Malipo](/zcash-tech/payment-disclosures) kwa uthibitisho wa mara moja kuhusu malipo moja.
- **Kwa uangalizi wa kina:** mpe mshirika ufunguo wa akaunti inayohusiana na ushirikiano, si pochi yako nzima. Uhusiano ukiisha, zungusha akaunti.
- **Kwa uchaguzi wa vifaa:** Zallet husafirisha UFVK na huingiza funguo kamili za kutazama zilizopanuliwa za Sapling; Zkool hukubali funguo zilizounganishwa na za urithi kama akaunti za kutazama pekee. Angalia ukurasa wa [Pochi](/using-zcash/wallets) kwa jedwali la sasa la utayari wa Ironwood kabla ya kusanifisha pochi.
- **Gharama ya ufichuaji ni ya kudumu:** kila mshikiliaji wa ziada wa ufunguo ni mstari wa kudumu wa mkopo wa faragha usioweza kufungwa. Toa funguo kwa kila uhusiano, ziweke katika akaunti moja, na andika ni nani anashikilia nini.

## Makosa ya Kawaida

| Imani ya kawaida | Hali halisi |
| --- | --- |
| “Ufunguo wa kutazama unaweza kutumia fedha ukiivuja.” | Hauwezi. Funguo za kutazama hazibebi mamlaka ya kutumia pesa; jambo baya zaidi linalosababishwa na uvujaji ni kufichua historia. |
| “Ninaweza kubatilisha ufunguo wa kutazama baadaye.” | Huwezi. Ufunguo uliotolewa hufanya kazi hadi fedha zihamie kwenye akaunti ambayo mhusika mwingine hana funguo zake. |
| “Kusafirisha UIVK kwa anwani moja huonyesha anwani hiyo pekee.” | Funguo za kutazama huhusu akaunti. UIVK huonyesha shughuli zinazoingia kwa kila bwawa katika akaunti. |
| “`zcash-cli z_exportviewingkey` bado hufanya kazi.” | Hapana. zcashd ilifikia kusitishwa kwake kwa mwisho wa usaidizi tarehe 18 Julai 2026; tumia Zallet ya `z_exportviewingkey` / `z_importviewingkey` badala yake. |
| “Kubandika ufunguo wa kutazama kwenye kifaa cha wavuti ni salama kwa sababu ni wa kusoma pekee.” | Kusoma pekee bado kunamaanisha historia yako yote ya miamala kwa akaunti hiyo inakabidhiwa kwa yeyote anayeendesha tovuti. Ingiza ufunguo kwenye pochi unayoendesha. |
| “Zallet inaweza kuingiza ufunguo wowote wa kutazama ambao Zallet inaweza kusafirisha.” | Hapana. Zallet huingiza funguo kamili za kutazama zilizopanuliwa za Sapling pekee; funguo zilizounganishwa za `uview…` lazima ziingie kwenye pochi zinazokubali funguo zilizounganishwa, kama Zkool. |

## Kurasa Husika

- [Ufichuaji wa Malipo](/zcash-tech/payment-disclosures) — kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kutoa ufikiaji endelevu wa akaunti
- [Anwani Zilizounganishwa](/zcash-tech/unified-addresses) — safu ya anwani inayobeba vipokezi vya ufunguo wa kutazama
- [Ironwood](/zcash-tech/ironwood) — bwawa la faragha la NU6.3 ambamo Orchard huhamia
- [Turnstile](/zcash-tech/the-turnstile) — utaratibu wa uhamaji wa Orchard-kwenda-Ironwood ambao watazamaji wanaweza kuangalia
- [Pochi](/using-zcash/wallets) — saraka kamili ya pochi, usaidizi wa ufunguo wa kutazama na utayari wa Ironwood
- [Kusafirisha Historia ya Miamala kutoka kwenye Viewing Key](/guides/viewing-key-transaction-export) — kugeuza ufunguo ulioingizwa kuwa faili kamili ya historia ya txid/ada/ujumbe

## Rasilimali

Tumia funguo za kutazama inapohitajika, na pendelea ufunguo finyu zaidi unaojibu swali lililoulizwa.

- [Ufichuaji wa Malipo](/zcash-tech/payment-disclosures) - kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kutoa ufikiaji endelevu wa akaunti
- [ZIP 326: Athari za NU6.3 kwa Pochi](https://zips.z.cash/zip-0326) — jinsi funguo za kutazama zinavyofanya kazi katika mabwawa ya Orchard na Ironwood
- [ZIP 229: Muundo wa Muamala wa Toleo la 6](https://zips.z.cash/zip-0229) — hufafanua mabwawa ya Orchard na Ironwood
- [ZIP 310](https://zips.z.cash/zip-0310) — ufafanuzi wa ufunguo wa kutazama
- [Zallet kumbukumbu ya mabadiliko](https://github.com/zcash/zallet/blob/main/CHANGELOG.md) — ni toleo gani lililoongeza mbinu gani ya RPC
- [Zkool README](https://github.com/hhanh00/zkool2/blob/main/README.md) — aina za akaunti na funguo zinazoungwa mkono
- [ECC, Kuelezea Funguo za Kutazama](https://electriccoin.co/blog/explaining-viewing-keys/)
- [ECC, Selective Disclosure na Funguo za Kutazama](https://electriccoin.co/blog/viewing-keys-selective-disclosure/)
- [ECC, Uwasilishaji wa Video wa Zcash Viewing Key](https://www.youtube.com/watch?v=NXjK_Ms7D5U&t=199s)
