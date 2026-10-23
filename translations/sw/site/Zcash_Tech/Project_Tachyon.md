<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mradi Tachyon

## TL;DR

- Tachyon ni muundo mpya uliopendekezwa wa jinsi pochi za Zcash zinavyopata na kutumia pesa zilizolindwa, unaokusudiwa kuruhusu mtandao kukua hadi idadi kubwa ya watumiaji
- Leo pochi inabidi ijaribu kuondoa sehemu kubwa ya blockchain ili kugundua ni malipo gani ambayo ni yake, na hiyo ndiyo sababu kuu ya kusawazisha kwa ulinzi kunahisi polepole
- Tachyon hubadilisha hilo na **usawazishaji usio wazi**, kwa hivyo pochi huchota kile inachohitaji bila kuchanganua kila kitu na bila kumwambia seva ni sehemu gani ilitaka
- Pia huhamisha maelezo ya malipo kutoka kwenye blockchain na kuingia kwenye ombi la malipo lenyewe, jambo ambalo hurahisisha itifaki lakini huhamisha jukumu kwenye pochi
- Ni pendekezo, lililochapishwa kwa mara ya kwanza Aprili 2025. Sio **sehemu ya NU7** na **haijasafirishwa**, na inahitaji juhudi za uhandisi katika kiwango cha uboreshaji wa Sapling

<br/>

## Hii ni kwa ajili ya nani

- Mtu yeyote ambaye ametazama usawazishaji wa pochi iliyolindwa na kujiuliza kwa nini inachukua muda mrefu hivyo
- Wageni wanaoendelea kumuona Tachyon akitajwa karibu na NU7 na Zcash scaling
- Wasomaji wanaotaka wazo kwanza na usimbaji fiche wa pili

<br/>

## Tatizo ambalo Tachyon anatatua

Zcash huficha malipo ni ya nani. Hilo ndilo jambo kuu, na husababisha tatizo lisilo la kawaida: ikiwa hakuna mtu anayeweza kujua malipo ni ya nani, pochi yako mwenyewe hupataje yako?

Katika Bitcoin hii ni rahisi. Anwani ni za umma, kwa hivyo pochi inaweza kuuliza seva "ni nini kilitumwa kwa anwani hii?" na kupata jibu. Pochi Zcash haiwezi kuuliza swali hilo, kwa sababu kuuliza kungefichua haswa kile ambacho bwawa lililofunikwa limeundwa kuficha.

Kwa hivyo Zcash hufanya kitu tofauti. Mtumaji husimba maelezo ya malipo na kuyaingiza ndani ya muamala wenyewe. Kisha pochi yako hufanya kazi kupitia miamala kwenye mnyororo na kujaribu kusimba kila moja. Karibu kila jaribio hushindwa. Machache yanayofanikiwa ni malipo yako. Hii inaitwa **kusimba kwa majaribio**, na ni ya faragha, sahihi, na polepole.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Kinachovutia ni kazi inategemea. Juhudi ambazo pochi yako hutumia huwekwa na ukubwa wa mnyororo, si kwa kiasi cha malipo uliyopokea. Mtu ambaye hajawahi kupokea malipo hata moja hufanya kazi karibu sawa na mtu anayeyapokea kila siku. Kadri Zcash inavyokua, hilo linazidi kuwa baya kwa kila mtu. Kwa maneno ya pendekezo, "halipandi tu."

<br/>

## Kinachobadilika Tachyon

Tachyon inashambulia tatizo hilo kutoka kwenye chanzo chake: inaacha kutumia blockchain kama njia ya uwasilishaji wa siri za malipo.

Badala yake, maelezo unayohitaji yanasafirishwa na ombi lenyewe la malipo, nje ya bendi. Ombi la malipo, URI, au msimbo wa QR hubeba taarifa ambazo zilikuwa zimesimbwa kwa njia fiche katika muamala. Sean Bowe anaelezea hili kama kukumbatia **malipo ya nje ya bendi** kwa mara ya kwanza katika itifaki iliyolindwa ya Zcash.

Mara tu mnyororo unapokuwa haujabeba taarifa hiyo tena, pochi yako haina sababu tena ya kuitafuta, na tatizo la majaribio ya usimbaji fiche hutoweka.

Pochi yako bado inahitaji kujua hali ya mnyororo wa sasa ili kutumia, ingawa. Hiyo ni nusu ya pili ya muundo, **usawazishaji usio wazi**: njia ya pochi kupata vitu maalum inavyohitaji bila kufichua kwa seva ni vitu gani iliomba.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Ingekuwa na maana gani kwa mtu anayetumia pochi

- **Kusawazisha huacha kukua na mnyororo.** Muda ambao pochi yako hutumia kufuatilia shughuli zako mwenyewe badala ya ukubwa wa Zcash.
- **Malipo yanakuwa kama kumpa mtu bili.** Ombi la malipo hubeba kile ambacho mpokeaji anahitaji, kwa hivyo ubadilishanaji kati ya mtumaji na mpokeaji ni muhimu zaidi kuliko ilivyo leo.
- **Pochi zina jukumu zaidi.** Kwa sababu mnyororo hauna tena nakala iliyosimbwa ya maelezo yako ya malipo, kupoteza data ya pochi yako ni muhimu zaidi. Kuhama kwa chelezo na urejeshaji kutoka kuwa kipengele cha itifaki hadi kitu ambacho programu ya pochi lazima ifanye kazi vizuri.
- **Baadhi ya vipande vinavyojulikana husogea au kutoweka.** Tachyon huondoa utofautishaji wa funguo, funguo za kutazama, na anwani za malipo kutoka kwa itifaki kuu, na kuziacha kwenye safu ya pochi. Hii ni moja ya sehemu muhimu zaidi za pendekezo na bado inafanyiwa kazi.

<br/>

## Mtazamo wa karibu kwa wasomaji wa kiufundi

Tachyon inaelezewa kama mabadiliko yanayoendana kinyume na itifaki ya Orchard. Inaweza kutumika kama uboreshaji hadi bwawa lililopo Orchard au kama bwawa tofauti lililolindwa linalofikiwa kupitia [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), utaratibu uleule ambao Zcash iliutumia kwa Ironwood. Chaguo huathiri utekelezwaji, si muundo.

Inaficha mambo kadhaa kutoka kwa Orchard: Urekebishaji upya wa ufunguo wa RedPallas, ahadi za thamani za homomorphic na sahihi za kufunga, na muundo wa ufunguo uliogawanywa ambao huruhusu kifaa kugawanya uthibitisho bila kukabidhi mamlaka ya matumizi.

Kazi ya kuongeza ukubwa hutegemea **data ya kubeba uthibitisho**, mbinu ambayo data husafiri pamoja na uthibitisho wa usahihi wake, ili kuichanganya na data nyingine ya kubeba uthibitisho hutoa kitu kinachorithi na kupanua uthibitisho huo. Hili ndilo linaloruhusu kiasi kikubwa cha kazi iliyothibitishwa kubanwa kuwa kitu kidogo na cha haraka kukaguliwa. Halo, iliyogunduliwa na timu iliyo nyuma ya Zcash, ndiyo iliyofanya data ya kubeba uthibitisho iwe ya vitendo vya kutosha kujenga juu yake.

Mstari wa tatu ni **vijumlisho vya miamala vilivyolindwa**, ambavyo hubadilisha jinsi mabadiliko ya hali yaliyolindwa yanavyowasilishwa na huwa na athari za kugonga jinsi utiaji saini unavyofanya kazi.

<br/>

## Ambapo kazi iko

Tachyon ni **pendekezo, si kipengele kilichosafirishwa**. Ilichapishwa Aprili 2025, na chapisho la ufuatiliaji mnamo Mei 2025 lilishughulikia matokeo ya makubaliano. Iliteuliwa kama mgombea wa NU7, uboreshaji unaofuata baada ya Ironwood, lakini wigo wa NU7 uliokubaliwa mnamo Septemba 17, 2026 haujumuishi: [ZIP 259](https://zips.z.cash/zip-0259) inaorodhesha kile ambacho NU7 inatekeleza, na [tangazo la jukwaa](https://forum.zcashcommunity.com/t/nu7-timeline/57655) inasema hakuna umbizo jipya la muamala linaloonekana ndani yake. Hakuna tarehe ya uanzishaji iliyowekwa kwa Tachyon.

Muundo wa mwandishi mwenyewe ni kwamba huu ni mpango unaoweza kutekelezeka badala ya utafiti wa kubahatisha, lakini unaohitaji juhudi za uhandisi zinazofanana na Sapling, huku maswali magumu zaidi yakiachwa kwa makusudi kwa ajili ya baadaye.

Kazi inayohusiana tayari inaonekana. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), nodi kamili iliyotolewa Julai 2026, ni juhudi za pamoja kati ya Project Tachyon na Valar Group na inakagua baadhi ya mabadiliko haya ya kiwango cha mtandao. [Urejeshaji wa taarifa binafsi](https://zechub.wiki/zcash-tech/private-information-retrieval) Utafiti unalenga katika kikwazo kile kile cha uchanganuzi kutoka pembe tofauti.

<br/>

## Dhana potofu za kawaida

- **Tachyon haipo.** Hakuna pochi inayoitumia leo, na hakuna sasisho lililoiwezesha.
- **Tachyon si sawa na Ironwood.** Ironwood ilianzishwa mnamo Julai 2026 na kushughulikiwa na bwawa Orchard na turnstile. Tachyon ni pendekezo tofauti, la baadaye kuhusu upandishaji.
- **Tachyon si kupunguza faragha.** Lengo ni kuweka leja isiyotofautiana huku ikiondoa gharama ya kuongeza thamani, si kubadilishana faragha kwa kasi.
- **zk-SNARK haukuwa kikwazo kamwe.** Pendekezo liko wazi kwamba sehemu ya polepole ni jinsi pochi zinavyogundua na kuratibu hali, si gharama ya uthibitisho wa ukaguzi.
- **Tachyon haipo katika NU7.** Iliwahi kutajwa kama mgombea, lakini wigo uliokubaliwa mnamo Septemba 2026 unashughulikia vitalu vya sekunde 25, kuchakata ada na mwisho wa miamala ya toleo la 4, bila muundo mpya wa miamala ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Faharasa

| Muhula | Maana |
|---|---|
| Trial decryption | Kujaribu kuficha miamala moja baada ya nyingine ili kupata ile iliyoelekezwa kwako |
| In-band secret distribution | Kuweka siri ya malipo ndani ya muamala kwenye blockchain, kama Zcash inavyofanya leo |
| Out-of-band payment | Kupitisha maelezo ya malipo moja kwa moja kati ya mtumaji na mpokeaji badala ya kupitia mnyororo |
| Oblivious synchronization | Kuchukua data ya mnyororo ambayo pochi inahitaji bila kufichua ni data gani iliyoombwa |
| Proof-carrying data (PCD) | Data inayosafiri ikiwa na uthibitisho wa usahihi wake, ili uthibitisho uweze kuunganishwa na kubanwa |
| Shielded transaction aggregate | Njia Tachyon's ya kuunganisha mabadiliko ya hali yaliyolindwa, kubadilisha jinsi yanavyowasilishwa na kusainiwa |
| ledger indistinguishability | Mali iliyolinda miamala haiwezi kutofautishwa kati ya mali nyingine |

<br/>

## Maswali Yanayoulizwa Mara kwa Mara

**Je, hii itafanya pochi yangu isawazike haraka zaidi?** Hilo ndilo lengo. Muda wa kusawazisha ungefuata shughuli yako mwenyewe badala ya ukubwa wa mnyororo. Hakuna kilichosafirishwa, kwa hivyo hakuna takwimu iliyopimwa ya kunukuu bado.

**Je, ninahitaji kufanya chochote sasa?** Hapana. Tachyon ni pendekezo. Ikiwa litapitishwa, litapatikana kupitia uboreshaji wa mtandao kwa notisi ya kawaida.

**Je, kuondoa funguo za kutazama kunamaanisha kupoteza uwezo wa kushiriki ufikiaji wa kusoma?** Pendekezo hilo linaondoa uwezo huo kutoka kwa itifaki kuu na kuingia kwenye safu ya pochi. Jinsi hilo linavyoonekana katika vitendo ni mojawapo ya maswali yaliyo wazi.

**Je, pesa zangu ziko hatarini ikiwa Tachyon itasafirishwa?** Uhamisho utatumia uboreshaji wa Orchard au turnstile, zote zimeundwa ili thamani ibadilike chini ya sheria za uhasibu wa umma. Ukurasa Ironwood unaelezea jinsi turnstile inavyofanya kazi.

<br/>

## Kurasa zinazohusiana

- [Urejeshaji wa Taarifa Binafsi](https://zechub.wiki/zcash-tech/private-information-retrieval) - mbinu nyingine ya kikwazo sawa cha kuchanganua pochi
- [Njia ya Zakura](https://zechub.wiki/zcash-tech/zakura-node) - nodi iliyojengwa kwa sehemu kutokana na juhudi za uhandisi Tachyon's
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - uboreshaji ulioanza kutumika Julai 2026, mara nyingi huchanganyikiwa na Tachyon
- [Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - utaratibu ambao Tachyon inaweza kutumia ikiwa itatumika kama bwawa lake la kuogelea
- [Usalama wa Baada ya Kiasi](https://zechub.wiki/zcash-tech/post-quantum-security) - ambapo Tachyon iko pamoja na kazi ya itifaki ya muda mrefu
- [Jinsi Zcash Inavyopangwa](https://zechub.wiki/start-here/how-zcash-is-organized) - ni nani anayefanya kazi hii na jinsi mfumo ikolojia unavyoendana

<br/>

## Rasilimali

- [Tachyon: Kuongeza Zcash kwa Usawazishaji Usiojulikana](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Aprili 2025, pendekezo la awali
- [Kukabiliana kwa Mbali](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mei 2025, makubaliano na athari za itifaki, iliyoandikwa kwa ajili ya watengenezaji itifaki
- [Blogu Sean Bowe's](https://seanbowe.com/blog/) - ambapo mfululizo wa Tachyon huchapishwa
- [tachyon.z.cash](https://tachyon.z.cash/) - eneo la mradi
