<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Project_Tachyon.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mradi wa Tachyon

## Kwa Ufupi

- Tachyon ni usanifu upya unaopendekezwa wa jinsi pochi za Zcash zinavyopata na kutumia fedha za faragha, unaokusudiwa kuruhusu mtandao ukue hadi kuwa na idadi kubwa sana ya watumiaji
- Leo, pochi hulazimika kujaribu kufumbua kwa usimbaji fiche sehemu kubwa ya blockchain ili kugundua malipo yake yenyewe, na hii ndiyo sababu kuu ya usawazishaji wa faragha kuonekana polepole
- Tachyon hubadilisha hilo kwa **usawazishaji usiofichua taarifa**, ili pochi ipate inachohitaji bila kuchanganua kila kitu na bila kuijulisha seva ni sehemu zipi ilizotaka
- Pia huondoa maelezo ya malipo kutoka blockchain na kuyaweka katika ombi la malipo lenyewe, jambo linalorahisisha itifaki lakini kuhamishia wajibu kwenye pochi
- Ni pendekezo, lililochapishwa kwa mara ya kwanza Aprili 2025. **Si sehemu ya NU7** na **halijatolewa**, na linahitaji juhudi za uhandisi zinazolingana na kiwango cha uboreshaji wa Sapling

<br/>

## Hii ni kwa ajili ya nani

- Mtu yeyote ambaye ametazama pochi ya faragha ikisawazisha na kujiuliza kwa nini inachukua muda mrefu
- Wageni wanaoendelea kuona Tachyon ikitajwa pamoja na kupanua uwezo wa NU7 na Zcash
- Wasomaji wanaotaka kuelewa wazo kwanza na kriptografia baadaye

<br/>

## Tatizo linalotatuliwa na Tachyon

Zcash huficha malipo yamekusudiwa nani. Hilo ndilo kusudi lake lote, na huleta tatizo gumu: ikiwa hakuna anayeweza kujua malipo ni ya nani, pochi yako hupataje yaliyo yako?

Katika Bitcoin hili ni rahisi. Anwani ni za umma, hivyo pochi inaweza kuuliza seva, “Ni nini kimetumwa kwa anwani hii?” na kupata jibu. Pochi ya Zcash haiwezi kuuliza swali hilo, kwa sababu kuliuliza kungefichua hasa kile ambacho bwawa la faragha limekusudiwa kuficha.

Kwa hiyo Zcash hufanya jambo tofauti. Mtumaji husimba fiche maelezo ya malipo na kuyaficha ndani ya muamala wenyewe. Pochi yako kisha hupitia miamala kwenye mnyororo na kujaribu kufumbua kila mmoja kwa usimbaji fiche. Karibu kila jaribio hushindwa. Yale machache yanayofaulu ni malipo yako. Hii huitwa **ufumbuaji wa majaribio [trial decryption]**, na ni ya faragha, sahihi, na polepole.

![Today a Zcash wallet downloads every shielded transaction and tries to decrypt each one, with almost every attempt failing, to find the few payments that belong to it](/content-images/tachyon-scanning-today.svg)

Kikwazo ni kile ambacho kazi hiyo hutegemea. Juhudi zinazotumiwa na pochi yako huamuliwa na ukubwa wa mnyororo, si idadi ya malipo uliyopokea hasa. Mtu ambaye hajawahi kupokea hata malipo moja hufanya karibu kazi nyingi sawa na mtu anayeyapokea kila siku. Zcash inapokua, hali hiyo huwa mbaya zaidi kwa kila mtu. Kwa maneno ya pendekezo, “haiwezi kupanuka uwezo kabisa.”

<br/>

## Mabadiliko yanayoletwa na Tachyon

Tachyon hushambulia tatizo kwenye chanzo chake: huacha kutumia blockchain kama njia ya kuwasilisha siri za malipo.

Badala yake, maelezo unayohitaji husafiri pamoja na ombi la malipo lenyewe, nje ya njia kuu. Ombi la malipo, URI, au msimbo wa QR hubeba taarifa ambazo hapo awali zilisimbwa fiche ndani ya muamala. Sean Bowe hueleza hili kama kukumbatia **malipo ya nje ya njia kuu [out-of-band payments]** kwa mara ya kwanza katika itifaki ya faragha ya Zcash.

Mara mnyororo usipobeba tena taarifa hiyo, pochi yako haina tena sababu ya kuutafuta, na tatizo la ufumbuaji wa majaribio hutoweka.

Hata hivyo, pochi yako bado inahitaji kujua hali ya sasa ya mnyororo ili kutumia fedha. Hii ni nusu ya pili ya usanifu, **usawazishaji usiofichua taarifa [oblivious synchronization]**: njia ya pochi kupata vitu mahususi inavyohitaji bila kufichua kwa seva ni vitu gani ilivyoomba.

![With Tachyon the sender passes payment details to the recipient out of band, and the wallet uses oblivious synchronization to retrieve only the data it needs instead of scanning the whole chain](/content-images/tachyon-oblivious-sync.svg)

<br/>

## Maana yake kwa mtu anayetumia pochi

- **Usawazishaji haukui tena pamoja na mnyororo.** Muda ambao pochi yako hutumia kufikia hali ya sasa ungefuata shughuli zako mwenyewe badala ya ukubwa wa Zcash.
- **Malipo huwa zaidi kama kumpa mtu ankara.** Ombi la malipo hubeba kile ambacho mpokeaji anahitaji, hivyo mawasiliano kati ya mtumaji na mpokeaji huwa muhimu zaidi kuliko yalivyo leo.
- **Pochi hubeba wajibu zaidi.** Kwa sababu mnyororo haushikilii tena nakala iliyosimbwa fiche ya maelezo yako ya malipo, kupoteza data ya pochi yako kunakuwa na athari kubwa zaidi. Hifadhi rudufu na urejeshaji hubadilika kutoka kuwa kipengele cha itifaki hadi kuwa jambo ambalo programu ya pochi lazima ilifanye kwa usahihi.
- **Baadhi ya vipengele vinavyozoeleka huhama au kutoweka.** Tachyon huondoa utofautishaji wa funguo, funguo za kutazama, na anwani za malipo kutoka itifaki ya msingi, na kuziacha kwa safu ya pochi. Hii ni mojawapo ya sehemu zenye athari kubwa zaidi za pendekezo na bado inafanyiwa kazi.

<br/>

## Mtazamo wa karibu kwa wasomaji wa kiufundi

Tachyon hufafanuliwa kama mabadiliko yanayooana kwa kinyume na itifaki ya Orchard. Inaweza kutekelezwa ama kama uboreshaji wa bwawa lililopo la Orchard au kama bwawa tofauti la faragha linalofikiwa kupitia [turnstile](https://zechub.wiki/zcash-tech/the-turnstile), utaratibu uleule ambao Zcash ilitumia kwa Ironwood. Chaguo hilo huathiri utekelezaji, si usanifu.

Inahifadhi mambo kadhaa kutoka Orchard: uundaji upya wa nasibu wa funguo wa RedPallas, commitments za thamani za homomorphic na sahihi za binding, pamoja na muundo wa funguo uliogawanywa unaoruhusu kifaa kukabidhi uthibitishaji bila kukabidhi mamlaka ya kutumia fedha.

Kazi ya kupanua uwezo hutegemea **data inayobeba uthibitisho [proof-carrying data]**, mbinu ambayo data husafiri pamoja na thibitisho la usahihi wake yenyewe, ili kuichanganya na data nyingine inayobeba uthibitisho kuzalishe kitu kinachorithi na kupanua mathibitisho hayo. Hiki ndicho kinachoruhusu kiasi kikubwa cha kazi iliyothibitishwa kufinywa kuwa kitu kidogo na cha kukaguliwa haraka. Halo, iliyogunduliwa na timu nyuma ya Zcash, ndiyo iliyofanya data inayobeba uthibitisho iwe halisi vya kutosha kujengewa juu yake.

Uzi wa tatu ni **jumla za miamala ya faragha [shielded transaction aggregates]**, ambao hubadilisha jinsi mabadiliko ya hali ya faragha yanavyowasilishwa na una athari zinazofuata kuhusu jinsi utiaji sahihi unavyofanya kazi.

<br/>

## Hali ya kazi

Tachyon ni **pendekezo, si kipengele kilichotolewa**. Ilichapishwa Aprili 2025, na chapisho la ufuatiliaji Mei 2025 lilichambua athari za makubaliano. Ilitajwa kama mgombea wa NU7, uboreshaji unaofuata baada ya Ironwood, lakini wigo wa NU7 uliokubaliwa tarehe 17 Septemba 2026 hauijumuishi: [ZIP 259](https://zips.z.cash/zip-0259) huorodhesha kile ambacho NU7 hutekeleza, na tangazo la jukwaa la [forum announcement](https://forum.zcashcommunity.com/t/nu7-timeline/57655) linasema hakuna muundo mpya wa muamala unaoonekana humo. Hakuna tarehe ya uanzishaji iliyowekwa kwa Tachyon.

Mtazamo wa mwandishi mwenyewe ni kwamba huu ni mpango unaoweza kutekelezwa badala ya utafiti wa kubahatisha, lakini unaohitaji juhudi za uhandisi zinazolingana na Sapling, huku baadhi ya maswali magumu yakiachwa kimakusudi kwa baadaye.

Kazi zinazohusiana tayari zinaonekana. [Zakura](https://zechub.wiki/zcash-tech/zakura-node), full node iliyotolewa Julai 2026, ni juhudi ya pamoja kati ya Mradi wa Tachyon na Valar Group na huonyesha mapema baadhi ya mabadiliko haya ya kiwango cha mtandao. Utafiti wa [Urejeshaji wa taarifa binafsi](https://zechub.wiki/zcash-tech/private-information-retrieval) unalenga kikwazo kilekile cha uchanganuzi kutoka mtazamo tofauti.

<br/>

## Dhana potofu za kawaida

- **Tachyon haijaanza kutumika.** Hakuna pochi inayoitumia leo, na hakuna uboreshaji ulioianzisha.
- **Tachyon si sawa na Ironwood.** Ironwood ilianzishwa Julai 2026 na ilishughulikia bwawa la Orchard na turnstile. Tachyon ni pendekezo tofauti, la baadaye, kuhusu kupanua uwezo.
- **Tachyon si upunguzaji wa faragha.** Lengo ni kudumisha kutotofautishika kwa leja huku ukiondoa gharama ya kupanua uwezo, si kubadilisha faragha kwa kasi.
- **Uthibitishaji wa zk-SNARK haujawahi kuwa kikwazo.** Pendekezo linaeleza wazi kwamba sehemu polepole ni jinsi pochi zinavyogundua na kuratibu hali, si gharama ya kukagua mathibitisho.
- **Tachyon haipo katika NU7.** Iliwahi kutajwa kama mgombea, lakini wigo uliokubaliwa Septemba 2026 unahusu block za sekunde 25, urejelezaji wa ada na mwisho wa miamala ya toleo la 4, bila muundo mpya wa muamala ([ZIP 259](https://zips.z.cash/zip-0259)).

<br/>

## Kamusi

| Neno | Maana |
|---|---|
| Trial decryption | Kujaribu kufumbua miamala kwa usimbaji fiche mmoja baada ya mwingine ili kupata ile iliyoelekezwa kwako |
| In-band secret distribution | Kuweka siri ya malipo ndani ya muamala kwenye blockchain, kama Zcash inavyofanya leo |
| Out-of-band payment | Kupitisha maelezo ya malipo moja kwa moja kati ya mtumaji na mpokeaji badala ya kupitia mnyororo |
| Oblivious synchronization | Kupata data ya mnyororo inayohitajika na pochi bila kufichua data gani iliombwa |
| Proof-carrying data (PCD) | Data inayosafiri pamoja na thibitisho la usahihi wake yenyewe, ili mathibitisho yaweze kuunganishwa na kufinywa |
| Shielded transaction aggregate | Njia ya Tachyon ya kuunganisha mabadiliko ya hali ya faragha, ikibadilisha jinsi yanavyowasilishwa na kutiwa sahihi |
| ledger indistinguishability | Sifa kwamba miamala ya faragha haiwezi kutofautishwa kutoka kwa mingine |

<br/>

## Maswali Yanayoulizwa Mara kwa Mara

**Je, hii itafanya pochi yangu isawazishe kwa kasi zaidi?** Hilo ndilo lengo. Muda wa kusawazisha ungefuata shughuli zako mwenyewe badala ya ukubwa wa mnyororo. Hakuna kilichotolewa, hivyo bado hakuna kipimo kilichopimwa cha kunukuu.

**Je, ninahitaji kufanya chochote sasa?** Hapana. Tachyon ni pendekezo. Ikiwa itapitishwa, ingewasili kupitia uboreshaji wa mtandao kwa taarifa ya kawaida.

**Je, kuondoa funguo za kutazama kunamaanisha kupoteza uwezo wa kushiriki ufikiaji wa kusoma?** Pendekezo huhamisha uwezo huo kutoka itifaki ya msingi hadi safu ya pochi. Jinsi hilo litakavyoonekana kwa vitendo ni mojawapo ya maswali yaliyo wazi.

**Je, fedha zangu ziko hatarini ikiwa Tachyon itatolewa?** Utekelezaji ungetumia ama uboreshaji wa Orchard au turnstile, zote zikiwa zimeundwa ili thamani ihame chini ya kanuni za uhasibu wa umma. Ukurasa wa Ironwood hueleza jinsi turnstile inavyofanya kazi.

<br/>

## Kurasa zinazohusiana

- [Urejeshaji wa Taarifa Binafsi](https://zechub.wiki/zcash-tech/private-information-retrieval) - mbinu nyingine kwa kikwazo kilekile cha uchanganuzi wa pochi
- [Zakura Node](https://zechub.wiki/zcash-tech/zakura-node) - node iliyojengwa kwa sehemu kutokana na juhudi za uhandisi za Tachyon
- [Ironwood](https://zechub.wiki/zcash-tech/ironwood) - uboreshaji ulioanzishwa Julai 2026, ambao mara nyingi huchanganywa na Tachyon
- [Turnstile](https://zechub.wiki/zcash-tech/the-turnstile) - utaratibu ambao Tachyon inaweza kutumia ikiwa itatekelezwa kama bwawa lake yenyewe
- [Usalama wa Baada ya Quantum](https://zechub.wiki/zcash-tech/post-quantum-security) - mahali ambapo Tachyon ipo pamoja na kazi ya itifaki ya muda mrefu
- [Jinsi Zcash Inavyopangwa](https://zechub.wiki/start-here/how-zcash-is-organized) - nani anayefanya kazi hii na jinsi mfumo ikolojia unavyoungana

<br/>

## Rasilimali

- [Tachyon: Kupanua uwezo wa Zcash kwa Usawazishaji Usiofichua Taarifa](https://seanbowe.com/blog/tachyon-scaling-zcash-oblivious-synchronization/) - Sean Bowe, 2 Aprili 2025, pendekezo la asili
- [Tachyaction kwa Umbali](https://seanbowe.com/blog/tachyaction-at-a-distance/) - Sean Bowe, 15 Mei 2025, athari za makubaliano na itifaki, lililoandikwa kwa wasanidi wa itifaki
- [Blogu ya Sean Bowe](https://seanbowe.com/blog/) - mahali ambapo mfululizo wa Tachyon huchapishwa
- [tachyon.z.cash](https://tachyon.z.cash/) - tovuti ya mradi
