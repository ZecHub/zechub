<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Thibitisho la malipo ya faragha na ufichuzi wa malipo

## Kwa ufupi

- Kitambulisho cha muamala [transaction] hutambulisha muamala, lakini hakifichui mpokeaji wa faragha [shielded], kiasi, au ujumbe [memo].
- Ufichuzi wa malipo umeundwa ili kumwezesha mtumaji kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kufichua sehemu nyingine ya historia ya pochi [wallet] yake.
- Ufunguo wa kutazama [viewing key] hutoa ufikiaji endelevu wa kusoma kwa anwani au akaunti. Utumie kwa ukaguzi unaoendelea, si kwa mzozo wa malipo moja.
- Ufichuzi wa malipo hauwezi kuthibitisha utoaji wa bidhaa, kumtambua mtu peke yake, kurejesha malipo, au kuchukua nafasi ya ukaguzi wa uthibitisho.
- [ZIP 311](https://zips.z.cash/zip-0311) bado ni **Rasimu**. Maandishi yake ya sasa yanaacha usaidizi wa Orchard, usaidizi wa ingizo la uwazi [transparent], usimbaji, uwekaji wa matoleo, na kanuni za kiolesura cha mtumiaji bila kukamilishwa.

## Kwa nini kitambulisho cha muamala hakitoshi

Mtu yeyote anaweza kukagua maelezo ya umma ya malipo ya Zcash ya uwazi. Kivinjari cha block kinaweza kuonyesha anwani zake, kiasi, na hali ya uthibitisho.

Malipo ya faragha hufanya kazi kwa njia tofauti. Mnyororo [chain] huthibitisha kuwa muamala ulifuata kanuni za Zcash, lakini hauchapishi mtumaji wa faragha, mpokeaji, kiasi, au ujumbe. Kushiriki kitambulisho cha muamala kunaweza kuonyesha kuwa muamala ulichimbwa, lakini hakuwezi kuthibitisha kwa mfanyabiashara au mhusika wa tatu ni malipo gani ya faragha yaliyokuwa ndani yake.

Hili huleta tatizo la kiutendaji. Mteja anaweza kuhitaji kutatua mzozo na mfanyabiashara, soko la kubadilishana sarafu [exchange] linaweza kuhitaji kuthibitisha kuwa lilishughulikia utoaji, au mfadhili anaweza kutaka kuthibitisha mchango mmoja. Kushiriki ufunguo kamili wa kutazama kungefichua mengi zaidi kuliko yanavyohitaji matukio haya.

[ZIP 311: Zcash Ufichuzi wa Malipo](https://zips.z.cash/zip-0311) unapendekeza jibu finyu zaidi: kufichua na kuthibitisha taarifa zilizochaguliwa kutoka muamala mmoja.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](/content-images/payment-disclosure-proof-flow-208c033e06.webp)

## Jinsi ufichuzi wa malipo unavyofanya kazi

Mtiririko wa msingi ni:

1. Mthibitishaji humpa mtumaji changamoto au rejeleo la kipekee, wakati thibitisho shirikishi linafaa.
2. Mtumaji huchagua muamala na towe au matowe ya faragha ya kufichua.
3. Programu ya pochi inayooana huunda ufichuzi wa malipo unaohusishwa na muamala huo na, kwa hiari, changamoto hiyo.
4. Mtumaji humpa mthibitishaji ufichuzi huo.
5. Mthibitishaji hupata muamala halisi kutoka node ya Zcash inayoaminika, hukagua kuwa ulichimbwa, na huthibitisha ufichuzi dhidi yake.
6. Matokeo halali huthibitisha madai yaliyo katika ufichuzi huo pekee.

Muundo wa ZIP wa Sapling hutumia ufunguo wa usimbaji fiche wa utokaji kurejesha kila towe lililochaguliwa. Hii inaweza kufichua mpokeaji wa towe, kiasi, na ujumbe. Pia huhitaji thibitisho la mamlaka ya kutumia pesa [spend authority] kwa angalau ingizo moja la muamala, ili mtu anayeuona tu muamala asiweze kuunda ufichuzi halali kana kwamba ndiye aliyeutuma.

Ufichuzi wa malipo wa Sapling si lazima ufichue anwani ya mtumaji. Mamlaka ya kutumia pesa yanaweza kudhibiti anwani nyingi zilizotofautishwa, hivyo kuthibitisha udhibiti wa matumizi hakumtambulishi moja kwa moja anwani moja. ZIP 311 inajumuisha thibitisho la anwani la hiari kwa matukio ambapo kuunganisha thibitisho na anwani ya mtumaji inayojulikana ni muhimu.

## Ufichuzi wa malipo au ufunguo wa kutazama?

| Mbinu | Matumizi bora | Kile inachofichua | Ufikiaji unaoendelea? | Je, umefungamanishwa kwa njia ya kriptografia na malipo? |
| --- | --- | --- | --- | --- |
| Transaction ID | Kukagua kuwa muamala ulichimbwa | Data ya umma ya muamala na uthibitisho | Hapana | Ndiyo, lakini maelezo ya malipo ya faragha hubaki yamefichwa |
| Screenshot or receipt | Utunzaji usio rasmi wa kumbukumbu | Chochote ambacho mtumaji anachagua kuonyesha | Hapana | Hapana; picha inaweza kuhaririwa |
| Payment disclosure | Kuthibitisha maelezo yaliyochaguliwa ya malipo moja | Matowe ya muamala yaliyochaguliwa na thibitisho lolote lililojumuishwa la mtumaji au changamoto | Hapana, lakini thibitisho lililoshirikiwa linaweza kunakiliwa | Ndiyo |
| Incoming Viewing Key | Kufuatilia malipo yaliyopokelewa na akaunti | Shughuli zinazoingia zinazofunikwa na ufunguo | Ndiyo | Husimbua malipo yanayoingia yanayolingana |
| Full Viewing Key | Uhasibu au ukaguzi wa akaunti | Shughuli zinazoingia na kutoka, kiasi, jumbe, na salio zinazofunikwa na ufunguo | Ndiyo | Husimbua shughuli za akaunti zinazolingana |

Tumia ufichuzi mdogo zaidi unaojibu swali. Mzozo wa mfanyabiashara kuhusu malipo moja kwa kawaida hauhalalishi ufikiaji wa kila malipo katika akaunti. Mhasibu anayepaswa kukagua kipindi kamili cha utoaji taarifa anaweza kuhitaji ufunguo wa kutazama badala yake.

Hakuna mbinu inayotoa ruhusa ya kutumia pesa. Kamwe usishiriki maneno ya kurejesha pochi [seed phrase], ufunguo wa kutumia pesa [spending key], ufunguo binafsi, au nakala rudufu ya pochi kama thibitisho la malipo.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](/content-images/payment-disclosure-scope-0585cdc075.webp)

## Ninaweza kutumia nini leo?

Hakuna pochi ya sasa inayotambuliwa hapa kama inayotekeleza uundaji au uthibitishaji wa ufichuzi wa malipo wa ZIP 311. ZIP inasalia kuwa rasimu na inaorodhesha utekelezaji wake wa marejeleo kama “TBD.” Vifaa vifuatavyo vinavyodumishwa bado vinaweza kumsaidia mtumaji, mpokeaji, au mkaguzi aliyeidhinishwa kukagua kumbukumbu zinazopatikana leo:

| Programu | Inayofaa leo kwa | Kikomo muhimu |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Kuona metadata ya kina ya muamala, kiasi, ingizo na matowe ya bwawa [pool], na jumbe; kuingiza funguo za kutazama za Unified au Sapling katika akaunti za kutazama pekee | Haitangazi uundaji au uthibitishaji wa ufichuzi wa ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Kukagua historia ya miamala ya faragha na jumbe; kuingiza Unified Full Viewing Key katika hali ya kusoma pekee | Rekodi ya pochi au akaunti ya kusoma pekee si ufichuzi wa malipo wenye upeo uliochaguliwa |
| [Zallet](https://zcash.github.io/zallet/) | Mitiririko ya kazi ya waendeshaji kwa kutumia `z_viewtransaction`, `z_exportviewingkey`, na `z_importviewingkey` | Programu ya beta; RPC zake za ufunguo wa kutazama na muamala ni pana zaidi au ni kumbukumbu za ndani, si thibitisho za ZIP 311 |

Tumia pochi iliyotuma au kupokea malipo kwanza. Kagua maelezo yake ya muamala, ujumbe, kitambulisho cha muamala, na uthibitisho, kisha mwombe mhusika mwingine alinganishe maelezo hayo na kumbukumbu zake mwenyewe. Usiweke pochi mpya na kuingiza maneno ya kurejesha pochi ili tu kuzalisha ushahidi. Ikiwa mkaguzi anahitaji mwonekano endelevu, zingatia akaunti inayooana ya kutazama pekee na uelewe upeo wa ufunguo wa kutazama kabla ya kuushiriki.

Programu hizi ni njia mbadala za kiutendaji za kukagua kumbukumbu, si uthibitisho kwamba ufichuzi sanifu wa malipo unapatikana. Picha ya skrini inaweza kuwasaidia watu kulinganisha kumbukumbu, lakini inaweza kuhaririwa na si thibitisho la kriptografia.

## Mahali ufichuzi wa malipo unapotumika

### Migogoro ya wafanyabiashara

Mteja anaweza kuthibitisha kuwa kiasi mahususi kilitumwa kwa anwani ya faragha ya mfanyabiashara. Thibitisho halithibitishi kuwa bidhaa ziliwasilishwa, kwamba marejesho yanadaiwa, au kwamba mtu anayeliwasilisha ana utambulisho mahususi wa kisheria. Maswali hayo bado hutegemea rekodi ya agizo na makubaliano ya wahusika.

### Utoaji wa faragha

ZIP 311 inaorodhesha utoaji wa faragha kama matumizi lengwa: soko la kubadilishana sarafu lingethibitisha mpokeaji na kiasi bila kuchapisha maelezo hayo on-chain. Thibitisho lake la ingizo la uwazi bado halijakamilishwa, kwa hivyo hii bado si mtiririko wa kazi sanifu ulio kamili. Mteja lazima pia akague hali ya uthibitisho wa muamala kwa kujitegemea.

### Michango

Mfadhili au kampeni inaweza kuthibitisha mchango mahususi huku ikiacha malipo yasiyohusiana yakiwa ya faragha. Kuchapisha ufichuzi hufanya maelezo yake yaliyochaguliwa yawe ya umma kwa kila mtu anayepokea nakala, hivyo njia binafsi ya uthibitishaji ni salama zaidi wakati thibitisho la umma halihitajiki.

### Uhasibu

Tumia ufichuzi wa malipo wakati mhasibu anahitaji ushahidi wa muamala mmoja. Tumia ufunguo wa kutazama wenye upeo mwembamba unaofaa wakati mhasibu anahitaji ufikiaji endelevu wa miamala mingi au kipindi kamili cha utoaji taarifa.

## Mtiririko wa kazi unaolinda faragha

ZIP 311 bado si kiwango cha pochi kilichokamilika na kinachoweza kutekelezwa kwa upana. Vifaa vinavyooana vya mtumaji na mthibitishaji vitakapopatikana, tumia orodha hii ya ukaguzi:

1. **Thibitisha uoanifu kwanza.** Vifaa vyote viwili lazima viunge mkono muundo sawa wa ufichuzi na bwawa la faragha lililotumika na malipo.
2. **Tatua matatizo ya kawaida kwanza.** Kagua usawazishaji wa pochi, kitambulisho cha muamala, idadi ya uthibitisho, hali ya kuisha muda, na kumbukumbu za mpokeaji kabla ya kufichua maelezo binafsi.
3. **Omba changamoto.** Kwa mzozo, mthibitishaji anapaswa kutoa nambari mpya ya agizo au changamoto ya nasibu ili ufichuzi uhusishwe na ombi hilo.
4. **Chagua towe linalohitajika pekee.** Usijumuishe matowe yasiyohusiana kutoka muamala huo huo.
5. **Kagua awali kila sehemu inayofichuliwa.** Kagua mpokeaji, kiasi, ujumbe, thibitisho la anwani ya mtumaji, na changamoto kabla ya kuhamisha.
6. **Shiriki kupitia njia binafsi.** Ufichuzi si ufunguo wa siri wa kutumia pesa, lakini yeyote anayeupokea anaweza kuhifadhi au kusambaza upya taarifa unazofichua.
7. **Thibitisha dhidi ya mnyororo.** Mthibitishaji lazima apate muamala kamili kutoka node inayoaminika, athibitishe kuwa uko katika mtandao na block inayokusudiwa, kisha athibitishe ufichuzi.
8. **Rekodi matokeo, si siri za ziada.** Hifadhi tu kile kinachohitajika na mzozo, utoaji, mchango, au mchakato wa uhasibu.

Ikiwa pochi haiwezi kuzalisha ufichuzi, usibadilishe kwa ufunguo kamili wa kutazama bila kuelewa upeo wake mpana na wa kudumu. Uliza kama mpokeaji anaweza kuthibitisha malipo kutoka rekodi zake mwenyewe za pochi au kukubali rekodi isiyo nyeti zaidi badala yake.

## Kile ambacho ufichuzi halali hauthibitishi

Uthibitishaji uliofanikiwa hauthibitishi:

- Kwamba muamala una uthibitisho wa kutosha kwa sera ya hatari ya mthibitishaji
- Kwamba upangaji upya wa mnyororo hauwezi kuondoa muamala wa hivi karibuni
- Kwamba bidhaa au huduma ziliwasilishwa
- Kwamba marejesho au kurejesha malipo kunahitajika
- Kwamba mtumaji anadhibiti anwani mahususi, isipokuwa thibitisho linalofaa la anwani limejumuishwa
- Kwamba mtu anayewasilisha ufichuzi ana utambulisho halisi anaodai
- Kwamba matowe yasiyofichuliwa, miamala mingine, au salio la pochi vina thamani yoyote mahususi
- Kwamba ufichuzi unabaki binafsi baada ya kushirikiwa

Mthibitishaji lazima akague ujumuishaji katika mnyororo na hali ya uthibitisho kando. Utaratibu wa uthibitishaji wa ZIP 311 hudhani kwamba mwitaji tayari amepata muamala uliochimbwa na urefu wake wa block.

## Vikwazo vya sasa

Ichukulie ZIP 311 kama kiwango kinachopendekezwa, si kama ahadi kwamba pochi ya sasa ina kitufe kinachofanya kazi cha **Thibitisha malipo**.

Rasimu kwa sasa hubainisha matumizi na matowe ya Sapling, lakini bado ina vipengele visivyokamilika vya Orchard, ingizo za uwazi, usimbaji wa ufichuzi, uwekaji wa matoleo, na jinsi pochi zinapaswa kuonyesha viwango tofauti vya uhalali. Utekelezaji wake wa marejeleo pia umeorodheshwa kama “TBD.” Kama ilivyoandikwa, haifafanui ufichuzi wa malipo kwa malipo ya Orchard au Ironwood.

Mtumaji anaweza pia kushindwa kufichua towe ikiwa muamala uliundwa kwa makusudi bila ufunguo wa kutazama wa utokaji kwa towe hilo. ZIP 311 huhifadhi chaguo hilo la faragha badala ya kuunda njia mpya ya kurejesha.

Nyaraka za zamani zinaelezea amri za majaribio za `z_getpaymentdisclosure` na `z_validatepaymentdisclosure` katika `zcashd`. Amri hizo ziliunga mkono **matowe ya JoinSplit ya Sprout pekee**, si muundo wa Sapling katika ZIP 311, na zimepitwa na wakati. `zcashd` ilifikia kusimamishwa kwake kwa mwisho kwa Mwisho wa Usaidizi mnamo Julai 2026. Usitumie mwongozo huo wa zamani kama maelekezo ya fedha za sasa.

Mapungufu haya hayafanyi wazo hili lisifae. Yanaeleza kwa nini mwongozo makini lazima utenganishe muundo wa faragha na matumizi kutoka programu iliyo tayari kwa watumiaji wa kawaida.

## Maswali Yanayoulizwa Mara kwa Mara

### Je, ninaweza kuthibitisha malipo ya faragha kwa kitambulisho cha muamala pekee?

Hapana. Kitambulisho kinaweza kutambua muamala na hali yake ya uthibitisho, lakini mpokeaji wa faragha, kiasi, na ujumbe si vya umma.

### Je, ufichuzi wa malipo ni sawa na ufunguo wa kutazama?

Hapana. Ufichuzi una upeo wa maelezo yaliyochaguliwa ya muamala mmoja. Ufunguo wa kutazama unaweza kufichua shughuli zinazolingana za anwani au akaunti kwa muda.

### Je, mpokeaji anaweza kuunda thibitisho la mtumaji?

Si chini ya muundo wa ZIP 311. Ufichuzi halali lazima uthibitishe mamlaka ya kutumia pesa kwa angalau ingizo moja. Mpokeaji anaweza kuthibitisha malipo kwa kutumia rekodi zake mwenyewe za pochi, lakini hilo ni dai tofauti.

### Je, ninaweza kufuta ufichuzi baada ya kuushiriki?

Hapana. Hautoi ufikiaji wa baadaye wa akaunti kama ufunguo wa kutazama, lakini data na thibitisho lililofichuliwa vinaweza kunakiliwa. Ushare kwa uangalifu sawa na rekodi yoyote binafsi ya kifedha.

### Je, uthibitishaji huhamisha au kufunga ZEC yoyote?

Hapana. Kuunda au kuthibitisha ufichuzi hakutumii, hakurejeshi, hakufungii, wala hakubatilishi fedha.

### Ninapaswa kutumia nini leo ikiwa pochi yangu haina kipengele cha ufichuzi?

Anza na rekodi za pochi za mpokeaji, kitambulisho cha muamala na hali ya uthibitisho, rejeleo la ankara katika ujumbe uliosimbwa fiche, au risiti nyingine iliyokubaliwa kwa pamoja. Tumia ufunguo wa kutazama tu wakati upeo wake mpana unahitajika kweli na unaeleweka.

## Rasilimali

- [ZIP 311: Zcash Ufichuzi wa Malipo](https://zips.z.cash/zip-0311) - muundo wa rasimu, mahitaji, mchakato wa uthibitishaji, na masuala ya faragha
- [ZIP 310: Sifa za Usalama za Sapling Funguo za Kutazama](https://zips.z.cash/zip-0310) - kile ambacho funguo za kutazama hufichua na dhamana wanazotoa
- [ZIP 304: Sapling Sahihi za Anwani](https://zips.z.cash/zip-0304) - utaratibu wa hiari wa thibitisho la anwani unaorejelewa na ZIP 311
- [Zcash ubainishaji wa itifaki](https://zips.z.cash/protocol/protocol.pdf) - usimbaji fiche wa dokezo [note] wa Sapling, funguo za kutazama za utokaji, na uidhinishaji wa matumizi
- [Hati ya ufichuzi wa malipo ya zcashd iliyohifadhiwa kwenye kumbukumbu](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - utekelezaji wa kihistoria wa Sprout-pekee, si mwongozo wa sasa
- [zcashd vipengele vilivyopitwa na wakati](https://zcash.github.io/zcash/user/deprecation.html) - hali ya amri za zamani za majaribio za ufichuzi

## Kurasa zinazohusiana

- [Miamala](/using-zcash/transactions) - malipo ya faragha, uthibitisho, na utatuzi wa matatizo ya miamala
- [Funguo za kutazama](/zcash-tech/viewing-keys) - ufikiaji endelevu wa kusoma pekee na chaguo za sasa za kuhamisha
- [Kile ambacho kivinjari cha block kinaweza kuona](/zcash-tech/what-a-block-explorer-can-see) - sehemu za umma na binafsi za muamala
- [Kuhifadhi kumbukumbu kwa kutumia ZEC za faragha](/zcash-use-cases/keeping-records-with-shielded-zec) - uhasibu bila kuchapisha historia ya pochi
