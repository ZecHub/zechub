<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Payment_Disclosures.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Uthibitisho wa malipo na ufichuzi wa malipo uliolindwa

## TL;DR

- Kitambulisho cha muamala kinatambua muamala, lakini hakionyeshi mpokeaji, kiasi, au memo iliyolindwa.
- Ufichuzi wa malipo umeundwa ili kumruhusu mtumaji kuthibitisha maelezo yaliyochaguliwa ya malipo moja bila kufichua historia iliyobaki ya pochi yake.
- Ufunguo wa kutazama hutoa ufikiaji unaoendelea wa kusoma anwani au akaunti. Utumie kwa ukaguzi unaoendelea, si kwa mgogoro wa malipo moja.
- Ufichuzi wa malipo hauwezi kuthibitisha uwasilishaji wa bidhaa, kumtambua mtu peke yake, kubatilisha malipo, au kubadilisha ukaguzi wa uthibitisho.
- [ZIP 311](https://zips.z.cash/zip-0311) bado ni **Rasimu**. Maandishi yake ya sasa hayajakamilisha usaidizi wa Orchard, usaidizi wa kuingiza data kwa uwazi, usimbaji, uundaji wa matoleo, na sheria za kiolesura cha mtumiaji.

## Kwa nini kitambulisho cha muamala hakitoshi

Mtu yeyote anaweza kukagua maelezo ya umma ya malipo ya uwazi ya Zcash. Mchunguzi wa block anaweza kuonyesha anwani zake, kiasi, na hali ya uthibitisho.

Malipo yaliyolindwa hufanya kazi tofauti. Mnyororo unathibitisha kwamba muamala ulifuata sheria za Zcash, lakini hauchapishi mtumaji, mpokeaji, kiasi, au memo iliyolindwa. Kushiriki kitambulisho cha muamala kunaweza kuonyesha kwamba muamala ulichimbwa, lakini hauwezi kumthibitishia mfanyabiashara au mtu wa tatu ni malipo gani ya kibinafsi yalikuwa ndani yake.

Hili linaleta tatizo la vitendo. Mteja anaweza kuhitaji kutatua mgogoro wa mfanyabiashara, mbadilishaji anaweza kuhitaji kuthibitisha kwamba alishughulikia utoaji, au mfadhili anaweza kutaka kuthibitisha mchango mmoja. Kushiriki ufunguo kamili wa kutazama kutafichua mengi zaidi kuliko kesi yoyote kati ya hizi inavyohitaji.

[ZIP 311: Ufichuzi wa Malipo ya Zcash](https://zips.z.cash/zip-0311) inapendekeza jibu finyu zaidi: kufichua na kuthibitisha taarifa zilizochaguliwa kutoka kwa muamala mmoja.

![A transaction ID proves that a transaction exists but does not reveal shielded payment details. A ZIP 311 payment disclosure would let a verifier authenticate only the selected recipient, amount, memo, and optional sender details against the mined transaction.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-proof-flow.png)

## Jinsi ufichuzi wa malipo unavyofanya kazi

Mtiririko wa msingi ni:

1. Kithibitishaji humpa mtumaji changamoto au marejeleo ya kipekee, wakati uthibitisho shirikishi unafaa.
2. Mtumaji huchagua muamala na matokeo au matokeo yaliyolindwa ili kufichua.
3. Programu inayolingana ya pochi huunda ufichuzi wa malipo unaohusiana na muamala huo na, kwa hiari, changamoto.
4. Mtumaji hutoa ufichuzi kwa mthibitishaji.
5. Kithibitishaji hupata muamala halisi kutoka kwa nodi ya Zcash inayoaminika, huangalia kwamba ilichimbwa, na kuthibitisha ufichuzi dhidi yake.
6. Matokeo halali yanathibitisha tu madai yaliyomo katika ufichuzi huo.

The ZIP's Sapling design uses an outgoing cipher key to recover each selected output. This can reveal the output's recipient, amount, and memo. It also requires proof of spend authority for at least one transaction input, so a person who merely sees the transaction cannot create a valid disclosure as though they sent it.

A Sapling payment disclosure does not have to reveal a sender address. Spend authority can control many diversified addresses, so proving control of the spend does not automatically identify one address. ZIP 311 includes an optional address proof for cases where linking the proof to a known sender address is necessary.

## Ufichuzi wa malipo au ufunguo wa kutazama?

| Mbinu | Matumizi bora | Inafunua nini | Ufikiaji unaoendelea? | Je, imeunganishwa kidijitali na malipo? |
| --- | --- | --- | --- | --- |
| Kitambulisho cha Muamala | Kuhakikisha kwamba muamala ulichimbwa | Data ya muamala wa umma na uthibitisho | Hapana | Ndiyo, lakini maelezo ya malipo yaliyolindwa yanabaki kufichwa |
| Picha ya skrini au risiti | Utunzaji usio rasmi wa kumbukumbu | Chochote mtumaji anachochagua kuonyesha | Hapana | Hapana; picha inaweza kuhaririwa |
| Ufichuzi wa malipo | Kuthibitisha maelezo yaliyochaguliwa ya malipo moja | Matokeo ya miamala yaliyochaguliwa na uthibitisho wowote wa mtumaji au wa kupinga uliojumuishwa | Hapana, lakini uthibitisho ulioshirikiwa unaweza kunakiliwa | Ndiyo |
| Incoming Viewing Key | Monitoring payments received by an account | Incoming activity covered by the key | Yes | It decrypts matching incoming payments |
| Full Viewing Key | Accounting or auditing an account | Incoming and outgoing activity, amounts, memos, and balances covered by the key | Yes | It decrypts matching account activity |

Tumia ufichuzi mdogo zaidi unaojibu swali. Mzozo wa mfanyabiashara kuhusu malipo moja kwa kawaida hauhalalishi ufikiaji wa kila malipo katika akaunti. Mhasibu ambaye lazima apitie kipindi kamili cha kuripoti anaweza kuhitaji ufunguo wa kutazama badala yake.

Hakuna njia yoyote inayoruhusu matumizi. Kamwe usishiriki kifungu cha kwanza, ufunguo wa matumizi, ufunguo wa faragha, au nakala rudufu ya pochi kama uthibitisho wa malipo.

![A transaction record is available today but provides no new third-party proof. A payment disclosure would prove selected details of one payment. A viewing key provides broader, ongoing visibility.](https://raw.githubusercontent.com/ZecHub/zechub/main/site/Zcash_Tech/assets/payment-disclosure-scope.png)

## Ninaweza kutumia nini leo?

Hakuna pochi ya sasa inayotambuliwa hapa kama inayotekeleza uundaji au uthibitishaji wa ufichuzi wa malipo wa ZIP 311. ZIP inabaki kuwa rasimu na inaorodhesha utekelezaji wake wa marejeleo kama "TBD." Zana zifuatazo zinazodumishwa bado zinaweza kumsaidia mtumaji, mpokeaji, au mkaguzi aliyeidhinishwa kukagua rekodi zinazopatikana leo:

| Programu | Inafaa leo kwa | Kikomo muhimu |
| --- | --- | --- |
| [Zkool](https://github.com/hhanh00/zkool2) | Kuangalia metadata ya kina ya miamala, kiasi, ingizo na matokeo ya pamoja, na memo; kuingiza funguo za kutazama za Unified au Sapling kwenye akaunti za kutazama pekee | Haitangazi uundaji au uthibitishaji wa ufichuzi wa ZIP 311 |
| [Zingo PC](https://github.com/zingolabs/zingo-pc) | Reviewing shielded transaction history and memos; importing a Unified Full Viewing Key in read-only mode | A wallet record or read-only account is not a selectively scoped payment disclosure |
| [Zallet](https://zcash.github.io/zallet/) | Mtiririko wa kazi wa waendeshaji kwa kutumia `z_viewtransaction`, `z_exportviewingkey`na `z_importviewingkey` | Programu ya Beta; RPC zake za ufunguo wa kutazama na miamala ni rekodi pana au za ndani, si uthibitisho wa ZIP 311 |

Tumia pochi iliyotuma au kupokea malipo kwanza. Angalia maelezo yake ya muamala, memo, kitambulisho cha muamala, na uthibitisho, kisha mwombe mhusika mwingine kulinganisha maelezo hayo na rekodi zake. Usiweke pochi mpya na uingize kifungu cha mbegu ili tu kutoa ushahidi. Ikiwa mkaguzi anahitaji mwonekano unaoendelea, fikiria akaunti inayolingana ya kutazama pekee na uelewe upeo wa ufunguo wa kutazama kabla ya kuushiriki.

Programu hizi ni njia mbadala zinazofaa za kuangalia rekodi, si uthibitisho kwamba ufichuzi wa malipo sanifu unapatikana. Picha ya skrini inaweza kuwasaidia watu kulinganisha rekodi, lakini inaweza kuhaririwa na si uthibitisho wa usimbaji fiche.

## Pale ambapo ufichuzi wa malipo unatumika

### Migogoro ya wafanyabiashara

Mteja anaweza kuthibitisha kwamba kiasi fulani kilitumwa kwa anwani iliyolindwa ya mfanyabiashara. Uthibitisho hauthibitishi kwamba bidhaa ziliwasilishwa, kwamba marejesho yanadaiwa, au kwamba mtu anayewasilisha ana utambulisho maalum wa kisheria. Maswali hayo bado yanategemea rekodi ya oda na makubaliano ya pande zote.

### Kutoa pesa kwa ulinzi

ZIP 311 inaorodhesha utoaji wa pesa uliolindwa kama matumizi lengwa: ubadilishaji ungethibitisha mpokeaji na kiasi bila kuchapisha maelezo hayo kwenye mnyororo. Uthibitisho wake wa kuingiza data kwa uwazi bado haujakamilika, kwa hivyo huu bado sio mtiririko kamili wa kazi sanifu. Mteja lazima pia aangalie hali ya uthibitisho wa muamala kwa kujitegemea.

### Michango

Mfadhili au kampeni inaweza kuthibitisha mchango fulani huku ikiacha malipo yasiyohusiana kuwa ya faragha. Kuchapisha taarifa hiyo huweka maelezo yake yaliyochaguliwa hadharani kwa kila mtu anayepokea nakala, kwa hivyo njia ya uthibitishaji wa kibinafsi ni salama zaidi wakati uthibitisho wa umma hauhitajiki.

### Uhasibu

Tumia ufichuzi wa malipo wakati mhasibu anahitaji ushahidi kwa muamala mmoja. Tumia kitufe cha kutazama kinachofaa zaidi wakati mhasibu anahitaji ufikiaji endelevu wa miamala mingi au kipindi kamili cha kuripoti.

## Mtiririko wa kazi unaozingatia usalama wa faragha

ZIP 311 bado si kiwango cha pochi kilichokamilika na kinachoweza kutumika kwa wingi. Wakati zana zinazofaa za mtumaji na uthibitishaji zinapopatikana, tumia orodha hii ya ukaguzi:

1. **Thibitisha utangamano kwanza.** Zana zote mbili lazima ziunge mkono umbizo sawa la ufichuzi na kundi lililolindwa linalotumiwa na malipo.
2. **Tatua matatizo ya kawaida kwanza.** Angalia usawazishaji wa pochi, kitambulisho cha muamala, idadi ya uthibitisho, hali ya muda wa matumizi, na rekodi za mpokeaji kabla ya kufichua maelezo ya faragha.
3. **Omba changamoto.** Kwa mzozo, mthibitishaji anapaswa kutoa nambari mpya ya agizo au changamoto ya nasibu ili ufichuzi huo uambatane na ombi hilo.
4. **Chagua matokeo yanayohitajika pekee.** Usijumuishe matokeo yasiyohusiana kutoka kwa muamala huo huo.
5. **Hakikisha kila sehemu iliyofichuliwa.** Angalia mpokeaji, kiasi, memo, uthibitisho wa anwani ya mtumaji, na changamoto kabla ya kuhamisha.
6. **Shiriki kupitia njia ya faragha.** Ufichuzi si ufunguo wa siri wa matumizi, lakini mtu yeyote anayeupokea anaweza kuhifadhi au kusambaza tena taarifa anazofichua.
7. **Thibitisha dhidi ya mnyororo.** Kithibitishaji lazima kichukue muamala halisi kutoka kwa nodi inayoaminika, kithibitishe kwamba iko kwenye mtandao unaokusudiwa na kizuizi, kisha kithibitishe ufichuzi.
8. **Andika matokeo, si siri za ziada.** Weka tu kile ambacho mzozo, uondoaji, mchango, au mchakato wa uhasibu unahitaji.

Ikiwa pochi haiwezi kutoa ufichuzi, usibadilishe ufunguo kamili wa kutazama bila kuelewa wigo wake mpana na wa kudumu. Muulize kama mpokeaji anaweza kuthibitisha malipo kutoka kwa rekodi zake za pochi au kukubali rekodi isiyo na unyeti mwingi badala yake.

## Kile ambacho ufichuzi halali hauthibitishi

Uthibitisho uliofanikiwa hauthibitishi:

- Kwamba muamala una uthibitisho wa kutosha kwa sera ya hatari ya mthibitishaji
- Kwamba upangaji upya wa mnyororo hauwezi kuondoa muamala wa hivi karibuni
- Kwamba bidhaa au huduma zilitolewa
- Kwamba marejesho ya pesa au marejesho yanahitajika
- Kwamba mtumaji anadhibiti anwani fulani, isipokuwa kama uthibitisho sahihi wa anwani umejumuishwa
- Kwamba mtu anayewasilisha ufichuzi ana utambulisho halisi unaodaiwa
- Kwamba matokeo ambayo hayajafichuliwa, miamala mingine, au salio la pochi lina thamani yoyote maalum
- Kwamba ufichuzi unabaki kuwa wa faragha baada ya kushirikiwa

Kithibitishaji lazima kiangalie hali ya kuingizwa kwa mnyororo na uthibitisho kando. Utaratibu wa uthibitishaji wa ZIP 311 unadhania kuwa mpigaji simu tayari amepata muamala uliochimbwa na urefu wake wa block.

## Vikwazo vya sasa

Tumia ZIP 311 kama kiwango kilichopendekezwa, si kama ahadi kwamba pochi ya sasa ina kitufe cha **Thibitisha malipo** kinachofanya kazi.

Rasimu kwa sasa inabainisha matumizi na matokeo ya Sapling, lakini bado ina vipengee ambavyo havijakamilika kwa Orchard, ingizo wazi, usimbaji wa ufichuzi, uundaji wa matoleo, na jinsi pochi zinavyopaswa kuonyesha viwango tofauti vya uhalali. Utekelezaji wake wa marejeleo pia umeorodheshwa kama "TBD." Kama ilivyoandikwa, haifafanui ufichuzi wa malipo kwa malipo ya Orchard au Ironwood.

Mtumaji anaweza pia asiweze kufichua matokeo ikiwa muamala uliundwa kimakusudi bila ufunguo wa kutazama unaotoka kwa matokeo hayo. ZIP 311 huhifadhi chaguo hilo la faragha badala ya kuunda njia mpya ya kurejesha data.

Nyaraka za zamani zinaelezea majaribio `z_getpaymentdisclosure` na `z_validatepaymentdisclosure` amri katika `zcashd`Amri hizo ziliunga mkono matokeo ya **Sprout JoinSplit pekee**, sio muundo wa Sapling katika ZIP 311, na ziliondolewa kwenye huduma. `zcashd` ilifikia kikomo chake cha mwisho cha Mwisho wa Usaidizi mnamo Julai 2026. Usitumie mwongozo huo wa zamani kama maagizo ya fedha za sasa.

Mapengo haya hayafanyi wazo hilo kuwa lisilofaa. Yanaelezea kwa nini mwongozo makini lazima utenganishe mfumo wa faragha na matumizi kutoka kwa programu ambayo iko tayari kwa watumiaji wa kawaida.

## Maswali Yanayoulizwa Mara kwa Mara

### Je, ninaweza kuthibitisha malipo yaliyolindwa kwa kutumia kitambulisho cha muamala pekee?

Hapana. Kitambulisho kinaweza kutambua muamala na hali ya uthibitisho wake, lakini mpokeaji aliyelindwa, kiasi, na memo si vya umma.

### Je, ufichuzi wa malipo ni sawa na ufunguo wa kutazama?

Hapana. Ufichuzi umeelekezwa kwa maelezo yaliyochaguliwa ya muamala mmoja. Ufunguo wa kutazama unaweza kufichua shughuli inayolingana kwa anwani au akaunti baada ya muda.

### Je, mpokeaji anaweza kutoa uthibitisho wa mtumaji?

Sio chini ya muundo wa ZIP 311. Ufichuzi halali lazima uthibitishe mamlaka ya matumizi kwa angalau mchango mmoja. Mpokeaji anaweza kuthibitisha malipo kwa kutumia rekodi zake za pochi, lakini hilo ni dai tofauti.

### Je, ninaweza kubatilisha ufichuzi baada ya kuushiriki?

Hapana. Haitoi ufikiaji wa akaunti ya baadaye kama ufunguo wa kutazama, lakini data na uthibitisho uliofichuliwa unaweza kunakiliwa. Shiriki kwa uangalifu kama rekodi yoyote ya kifedha ya kibinafsi.

### Je, uthibitishaji huhamisha au kufunga ZEC yoyote?

Hapana. Kuunda au kuthibitisha ufichuzi hakutumii, hakurejeshi pesa, hakufungi, au hakubadilishi pesa.

### Nitumie nini leo ikiwa pochi yangu haina kipengele cha kufichua?

Anza na rekodi za pochi za mpokeaji, kitambulisho cha muamala na hali ya uthibitisho, marejeleo ya ankara katika hati iliyosimbwa kwa njia fiche, au risiti nyingine inayokubaliwa na pande zote mbili. Tumia ufunguo wa kutazama tu wakati wigo wake mpana unahitajika na unaeleweka kweli.

## Rasilimali

- [ZIP 311: Ufichuzi wa Malipo ya Zcash](https://zips.z.cash/zip-0311) - muundo wa rasimu, mahitaji, mchakato wa uthibitishaji, na mambo ya kuzingatia kuhusu faragha
- [ZIP 310: Security Properties of Sapling Viewing Keys](https://zips.z.cash/zip-0310) - funguo za kutazama zinafunua nini na ni nini kinachohakikisha zinatoa
- [ZIP 304: Sapling Address Signatures](https://zips.z.cash/zip-0304) - utaratibu wa hiari wa kuzuia anwani unaorejelewa na ZIP 311
- [Vipimo vya itifaki ya Zcash](https://zips.z.cash/protocol/protocol.pdf) - Sapling note encryption, outgoing viewing keys, and spend authorization
- [Hati ya ufichuzi wa malipo ya zcashd iliyohifadhiwa](https://github.com/zcash/zcash/blob/master/doc/payment-disclosure.md) - utekelezaji wa kihistoria wa Sprout pekee, si mwongozo wa sasa
- [vipengele vilivyoachwa bila kuidhinishwa vya zcashd](https://zcash.github.io/zcash/user/deprecation.html) - hali ya amri za zamani za ufichuzi wa majaribio

## Kurasa zinazohusiana

- [Miamala](/using-zcash/transactions) - Malipo yaliyolindwa, uthibitisho, na utatuzi wa miamala
- [Funguo za kutazama](/zcash-tech/viewing-keys) - ufikiaji unaoendelea wa kusoma pekee na chaguo za sasa za usafirishaji
- [Kile ambacho mchunguzi wa vitalu anaweza kuona](/zcash-tech/what-a-block-explorer-can-see) - nyanja za miamala ya umma na ya kibinafsi
- [Kuweka kumbukumbu na ZEC iliyolindwa](/zcash-use-cases/keeping-records-with-shielded-zec) - uhasibu bila kuchapisha historia ya pochi
