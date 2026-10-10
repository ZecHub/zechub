<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kupiga Kura kwa Mwenye Sarafu Aliyelindwa

> Mnamo Agosti 2026, Zcash iliendesha kura ya maoni ya wamiliki wa sarafu ambapo kura zilibaki zimesimbwa kwa njia fiche na jumla ya mwisho pekee ndiyo iliyofunuliwa, kwa kutumia itifaki ya upigaji kura iliyolindwa iliyojengwa na Valar Group.

Utakachochukua: jinsi kura inavyoweza kupimwa na kiasi cha ZEC unachoshikilia, kuwekwa faragha, na bado kuhesabiwa kwa usahihi, yote bila mtu yeyote kujua jinsi ulivyopiga kura au kiasi cha unachomiliki.

Kupiga kura kwa wenye sarafu waliolindwa huwaruhusu wenye Zcash kupiga kura kuhusu maswali ya mfumo ikolojia kwa kutumia ZEC. Hakuna anayejua ni nini mtu yeyote alipiga kura au ni kiasi gani ZEC anacho, lakini mtu yeyote anaweza kukagua kama jumla ni sahihi. Inaendeshwa kwenye mnyororo maalum wa upigaji kura uliojengwa na Valar Group, tofauti na mtandao mkuu Zcash, kwa hivyo fedha zako halisi hazihamishwi kamwe. Kwa jinsi Zcash inavyofanya maamuzi kwa upana zaidi, tazama [Muhtasari wa Ufadhili na Utawala wa Zcash](../zcash-community/zcash-governance)Ukurasa huu unahusu itifaki ya upigaji kura ya kriptografia pekee.

Je, ni mgeni katika Zcash? Anza na [ZEC na Zcash ni nini?](../start-here/what-is-zec-and-zcash), [Mabwawa ya Kuogelea Yenye Ngao](../using-zcash/shielded-pools)na [zk-SNARKs](../zcash-tech/zk-snarks), kisha rudi hapa.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Kwa nini kupiga kura binafsi ni vigumu

Kura nzuri ya mwenye sarafu inataka vitu vinne kwa wakati mmoja, na njia dhahiri za kuvifanya vipigane.

1. Uzito kwa dau, kwa hivyo kushikilia ZEC zaidi hubeba uzito zaidi.
2. Faragha ya chaguo, kwa hivyo hakuna mtu anayejifunza jinsi ulivyopiga kura.
3. Faragha ya usawa, ili hakuna mtu anayejua ni kiasi gani cha ZEC unacho.
4. Hesabu sahihi na inayoweza kukaguliwa ambayo mtu yeyote anaweza kuiangalia.

Kwa uzito kwa dau unaonekana unahitaji usawa wa kila mtu. Ili kuhesabu kura unaonekana unahitaji kuzifungua. Kufanya ama kwa njia isiyo na ujinga huvuja taarifa za kibinafsi haswa [bwawa la kuogelea lenye ngao](../using-zcash/shielded-pools) ipo ili kulinda, na kura za awali za sarafu zilivuja taarifa za usawa kwa sababu hii. Upigaji kura uliolindwa hutatua mvutano kwa zana zile zile ambazo ziliwezesha malipo yaliyolindwa: [ushahidi wa kutojua chochote](../zcash-tech/zk-snarks), vibatilishi, na usimbaji fiche.

## Intuition: sanduku la kura linalojihesabu lenyewe

> Kisanduku cha kupigia kura kinakuruhusu kuhesabu kinachopita kwenye ghala la benki bila kuona ndani. Sanduku la kupigia kura lenye ngao huenda hatua moja zaidi: linaongeza kura zilizofungwa bila kuzifungua.

Fikiria sanduku la kura lenye mamlaka matatu yasiyo ya kawaida. Linaweza kuongeza bahasha iliyofungwa kwenye jumla inayoendelea bila kuifungua. Kundi la maafisa, hakuna hata mmoja aliyeshika ufunguo, baadaye hufichua jumla ya mwisho pekee. Na kabla hujaingiza bahasha, unathibitisha kimya kimya kwamba uliishikilia ZEC kwa wakati uliopangwa uliopita na bado hujapiga kura, bila kuonyesha ni sarafu gani ni zako. Kila kitu hapa chini ni jinsi sanduku hilo linavyojengwa.

## Ustahiki na picha

Duru ya kupiga kura hurekebisha urefu wa picha, kizuizi kimoja cha mtandao mkuu Zcash, na uzito wako ni salio lako linaloweza kutumika na lililolindwa katika [Ironwood](../zcash-tech/ironwood) bwawa katika eneo hilo. Sheria ni moja tu Ironwood ZEC katika picha ni sawa na kura moja. Kwa kura ya maoni ya wigo NU7 picha ilikuwa mainnet block 3,459,350, karibu Agosti 24, 2026 saa 19:00 UTC, huku upigaji kura ukiwa wazi hadi Septemba 14, 2026 saa 19:00 UTC. ZEC ya uwazi inashughulikiwa kando na njia ya zamani, si kwa itifaki hii.

1. Fedha zako hazihamishwi kamwe na hazifungiwi kamwe. Ustahiki umewekwa kwenye picha, kwa hivyo unaweza kutumia au kuhamisha ZEC mara baada ya hapo bila kuathiri kura yako.
2. Hakuna hatua ya usajili. Urefu wa picha ndio unaohitajika tu, ambao huweka mchakato kuwa mwepesi na huepuka kufichua ni nani anayekusudia kupiga kura.

## Kuthibitisha usawa wako bila kuufichua

Unapopiga kura, pochi yako hutoa uthibitisho wa kutojua kwamba kwenye picha ulidhibiti baadhi ya ZEC. Inaweka salio halali na ukubwa wake kwa mashine za kuhesabu pesa za kibinafsi, lakini haionyeshi noti na haitoi muamala wowote kwenye mtandao mkuu Zcash.

Ushahidi huo unaongeza thamani ya upigaji kura kwenye mnyororo wa upigaji kura sawa na salio lako la picha, linalomilikiwa na ufunguo mpya wa upigaji kura ambao pochi yako hutoa kwa raundi hii pekee. Kwa sababu ufunguo ni mpya na haujaunganishwa na anwani zako za Zcash, hakuna kitu kwenye mnyororo wa upigaji kura kinachoweza kufuatiliwa hadi kwenye noti zako halisi. Utambulisho wako kwenye mnyororo na kura yako haziwezi kuunganishwa na muundo.

## Kuzuia upigaji kura mara mbili, faraghani

Ili kumzuia mtu yeyote kupiga kura mara mbili kwa sarafu zile zile, mfumo lazima uthibitishe kwamba noti zilizo nyuma ya salio lako hazikutumika kwenye picha. Kwenye mtandao mkuu hii inafanywa kwa kufichua kifuta nukuu cha noti, alama yake ya kipekee ya matumizi, ambayo nodi kamili huangalia kwa matumizi tena. Lakini kufichua kifuta nukuu chako hapa kutaunganisha kura yako moja kwa moja na noti zako.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Kwa hivyo itifaki inathibitisha kinyume chake kibinafsi. Inaunda orodha ya kila kifuta nukuu ambacho tayari kimetumika kwenye picha, na pochi yako inathibitisha bila kujua kwamba kifuta nukuu cha noti yako hakipo kwenye orodha hiyo, ikionyesha noti hiyo haikutumika bila kufichua ni noti gani.

Tatizo moja linabaki. Kuchukua kipande kinachohitajika cha orodha hiyo kutoka kwa seva kutafichua kifuta data chako kwa seva, na orodha kamili ni kubwa, takriban GB 2 kwa data ya Orchard-era na ni kubwa zaidi kadri Zcash inavyokua. [Urejeshaji wa Taarifa Binafsi](../zcash-tech/private-information-retrieval) (PIR) hutatua zote mbili: pochi yako huchota data inayohitaji huku ikificha kwa njia ya siri data iliyoomba. Matokeo yake huangaliwa dhidi ya muhtasari uliochapishwa wa orodha ya vifuta data, kwa hivyo seva isiyo ya kweli haiwezi kughushi matokeo bandia.

## Kupiga kura kwa njia fiche

Kwa kila swali, pochi yako hufanya mambo matatu.

1. Inasimba uzito wa kura yako kwa kamati ya kuhesabu kwa kutumia usimbaji fiche wa homomorphic, aina ya usimbaji fiche ambao maandishi yake ya siri yanaweza kuongezwa pamoja bila kufutwa. Hiki ndicho kinachoruhusu kisanduku cha jumla ya kura ambazo hakiwezi kusoma.
2. Inagawanya kura yako katika hisa 16 tofauti, kiasi kwamba hata kamati iliyoshirikiana kikamilifu ingepata shida kukusanya upya ni kiasi gani mtu mmoja alipiga kura.
3. Huwasilisha hisa hizo kwa nyakati zisizo na mpangilio kupitia seva nyingi, kwa hivyo mtazamaji hawezi kujua hisa hizo ni za mpiga kura mmoja anapofika.

Kila hisa ina uthibitisho wake usio na ufahamu kwamba ni kipande halali cha kura halali, kwa hivyo hakuna mtu anayeweza kuongeza kura zisizo na msingi. Hisa zilizothibitishwa huongezwa kwa njia ya umbo moja kwenye jumla ya utendakazi iliyosimbwa kwa jibu ulilochagua.

## Kuhesabu bila kufungua kura yoyote

Hesabu hiyo inaendeshwa na mamlaka ya uchaguzi iliyosambazwa: angalau wathibitishaji 10 wa mnyororo wa upigaji kura, ambao hakuna hata mmoja wao anayeweza kusimba chochote. Mwanzoni mwa raundi wanaendesha kwa pamoja sherehe ya uzalishaji muhimu ambayo hutoa ufunguo wa usimbaji fiche ambao ufunguo wake wa kusimba fiche unaolingana umegawanywa katika yote na haujakusanywa mahali pamoja.

> Hakuna afisa hata mmoja anayeshikilia ufunguo. Sanduku hufunguka tu wakati theluthi mbili yao huzungusha funguo zao pamoja, na hata hivyo huonyesha jumla tu.

Wakati raundi inapofungwa, jumla zilizosimbwa kwa njia fiche tayari zipo kutoka kwa nyongeza ya homomorphic hapo juu. Kila kithibitishaji huchapisha uondoaji fiche kwa sehemu pamoja na uthibitisho uliouondoa kwa usahihi. Mara tu angalau theluthi mbili zimechangia, sehemu zao huchanganyika katika hesabu ya mwisho ya maandishi wazi kwa kila swali, na hakuna kingine kinachowahi kufutwa. Nodi yoyote kamili inaweza kisha kuangalia uthibitisho wa usahihi uliojumuishwa, ili umma uweze kuthibitisha hesabu bila kuwaamini wathibitishaji.

## Nani anaendesha, na nini hawawezi kufanya

Ubunifu hutenganisha majukumu mawili kwa hivyo hakuna kundi lenye nguvu nyingi sana.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Mratibu wa multisig ni kundi la watu 2 kati ya 5 lenye wawakilishi kutoka Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), na Valar Group. Huamua ni maswali gani yanayofikia mnyororo na kuthibitisha ufunguo wa usimbaji fiche wa kila raundi, lakini haiwezi kuona, kubadilisha, au kuzuia kura za mtu binafsi. Mtu yeyote ambaye hapendi maswali anaweza kuendesha mnyororo wake wa upigaji kura, kwa kuwa programu hiyo iko wazi na haina ruhusa.

Vithibitishaji ni angalau nodi 10 zinazoshikilia ufunguo wa mgawanyiko wa usimbaji fiche na hufanya usimbaji fiche wa kizingiti. Haziwezi kusimba fiche kura za mtu binafsi au kutengeneza hesabu ya uwongo, kwa sababu kila usimbaji fiche husafirishwa na uthibitisho wa usahihi wa umma.

## Akidi ni ya nini

Waandaaji huweka kizingiti cha ushiriki: matokeo ya kura yanachukuliwa kama uwakilishi wa wenye sarafu tu ikiwa angalau ZEC 1,000,000 watashiriki katika angalau swali moja, ikiwa ni pamoja na kutohudhuria. Akidi huamua hakuna swali na haitumiki kwa kila swali. Ni ukaguzi mmoja kwenye kura ya maoni yote, kwa hivyo matokeo huchukuliwa kwa uzito tu wakati kiasi kikubwa cha ZEC kinaonekana. Chini ya kiwango hicho, matokeo hayazingatiwi kama ishara yenye maana.

## Kile ambacho itifaki hii hailinde dhidi yake

Kuwa wazi kuhusu kingo ni sehemu ya kuelewa muundo.

1. Ni ishara, si uamuzi wa lazima. Kura ya maoni ya wenye sarafu hupima hisia zinazopimwa kwa hisa na huchangia katika hali ya kawaida Zcash's [mchakato wa utawala](../zcash-community/zcash-governance) badala ya kuibadilisha.
2. Ina uzito wa sarafu, kwa hivyo ushawishi hufuata vizuizi. Msuguano mdogo unaweza kuongeza idadi ya watu wanaoingia lakini haubadilishi mkusanyiko wa ZEC.
3. Ajenda huwekwa na mratibu wa multisig, ambaye huchagua maswali yanayojitokeza. Haiwezi kugusa kura, na mtu yeyote anaweza kuendesha mnyororo unaoshindana, lakini upangaji wa ajenda bado ni sehemu ya ushawishi.
4. Kuhesabu kunahitaji wathibitishaji mtandaoni. Kutoa hesabu kunahitaji angalau theluthi mbili yao kushirikiana, kwa hivyo kukatika kwa kiasi kikubwa au kukataa kwa uratibu kunaweza kuchelewesha matokeo.
5. Kusawazisha faragha chini ya ushirikiano kamili ni ulinzi wa kina, si nadharia. Ikiwa kamati nzima iliunda upya ufunguo kwa siri, mgawanyiko wa hisa na uwasilishaji wa wakati ndio unaolinda usawa wako, na wabunifu wanakubali kuwa hizi ni dhaifu chini ya ushirikiano. Uchambuzi wa trafiki wa kisasa ni hatari iliyobaki.
6. Sehemu zinazosonga zaidi kuliko muundo wa zamani. Seva za PIR, seva za uwasilishaji, ufunguo mpya wa kupiga kura, na uthibitisho wa hatua nyingi ni mahali ambapo hitilafu au usanidi usiofaa unaweza kuonekana. Mfumo huu ni chanzo huria na sehemu zimekaguliwa kwa kujitegemea, ambayo hudhibiti hatari hiyo badala ya kuiondoa.

Kinacholinda, kwa nguvu na kwa uhakika, ni mambo mawili muhimu zaidi: kura yako haiwezi kuhusishwa na utambulisho wako, na ni jumla ya mwisho pekee ndiyo hufichuliwa.

## Faharasa

| Muhula | Maana ya Kiingereza cha kawaida |
|---|---|
| Voting chain | Blockchain tofauti, iliyojengwa na Valar Group, inayoendesha kura; noti zako Zcash hazibadiliki kamwe |
| Snapshot height | Kizuizi kikuu ambacho salio lake huweka uzito wa kupiga kura (kizuizi 3,459,350 kwa kura ya maoni NU7) |
| Nullifier | Alama ya kipekee ya matumizi ya noti; kufichua kwamba ingeunganisha kura na noti, kwa hivyo kupiga kura kunathibitisha kutokuwa mwanachama badala yake |
| Private Information Retrieval (PIR) | Inaleta data kutoka kwa seva huku ikificha data uliyoomba |
| Homomorphic encryption | Usimbaji fiche ambao maandishi yake ya siri yanaweza kuongezwa pamoja bila kufutwa |
| Coordinator multisig | Kundi la 2 kati ya 5 linaloidhinisha maswali na ufunguo wa duara, lakini haliwezi kuona au kubadilisha kura |
| Election authority | Vidhibiti 10 au zaidi vinavyoshikilia kwa pamoja ufunguo wa mgawanyiko wa usimbaji fiche na kufichua hesabu ya mwisho pekee |
| Threshold decryption | Kurejesha matokeo tu wakati wamiliki wa hisa muhimu wa kutosha, hapa theluthi mbili, wanashirikiana |
| Quorum | Ushiriki wa chini kabisa wa ZEC 1,000,000 kwa kura ya maoni utazingatiwa kuwa wawakilishi |

## Maswali Yanayoulizwa Mara kwa Mara

Je, sarafu zangu husogea au hufungwa ninapopiga kura? Hapana. Ustahiki hupimwa kwenye sehemu ya picha, kwa hivyo ZEC yako inaendelea kutumika na inaweza kutumika. Kupiga kura hutoa uthibitisho kwenye mnyororo tofauti, si muamala wa Zcash.

Je, kuna mtu yeyote anayeweza kusema jinsi nilivyopiga kura au ni kiasi gani ninacho? Hapana. Kura zimesimbwa kwa njia fiche na jumla ya jumla pekee ndiyo huondolewa kwenye njia fiche. Kura yako haihusiani na utambulisho wako, na salio lako limegawanywa katika hisa 16 zilizopangwa kwa wakati ili kuilinda hata dhidi ya kamati ya ushirikiano.

Ni nini kinachomzuia mtu kupiga kura mara mbili, au kupiga kura kwa sarafu ambazo hana? Kila kura ina ushahidi wa kutojua kwamba inaungwa mkono na salio halisi la picha ambalo halijatumika, na uthibitisho wa kutokuwa mwanachama unaotegemea PIR unaonyesha noti ya msingi haikuwa tayari imetumika, bila kufichua ni noti gani.

Nani anahesabu kura? Seti iliyosambazwa ya angalau vithibitishaji 10, ambavyo hakuna hata mmoja wao anayeweza kufichua chochote peke yake. Theluthi mbili lazima zishirikiane kufichua jumla, na kila ufichuzi huja na uthibitisho wa usahihi wa umma.

Je, matokeo yanafungamana? Ni ishara ya hisia ya mmiliki wa sarafu inayopimwa kwa dau. Inafahamisha utawala wa kawaida Zcash's badala ya kutekeleza mabadiliko kiotomatiki.

Je, ninaweza kuendesha au kukagua hili mwenyewe? Ndiyo. Programu ya mnyororo wa upigaji kura, saketi, mfumo wa PIR, na mkaguzi wa hesabu zote huchapishwa na Valar Group kwa mtu yeyote kukagua na kuendesha.

## Jaribu uelewa wako

Ikiwa kila kura imesimbwa kwa njia fiche na kila mpiga kura hana jina, mtu anawezaje kuhakikisha jumla iliyochapishwa ni sahihi na kwamba hakuna mtu aliyepiga kura mara mbili?

<details>
<summary>Answer</summary>

Uthibitisho tatu hufanya kazi. Kila kura ina uthibitisho usio na ufahamu kwamba inaungwa mkono na uwiano halisi wa picha, kwa hivyo hakuna kura zisizo na usaidizi zinazohesabiwa. Uthibitisho usio wa uanachama unaotegemea PIR unaonyesha kwamba noti iliyo nyuma yake haikutumika, na kuzuia upigaji kura mara mbili bila kufichua noti. Na wathibitishaji wanapoondoa jumla ya hati, kila moja huchapisha uthibitisho wa usahihi, ili noti yoyote kamili iweze kuthibitisha kwamba nambari za mwisho ziliondolewa kwa uaminifu kutoka kwa kura zilizosimbwa kwa njia fiche.
</details>

## Rasilimali

- [Tangazo la Kura ya Mwenye Sarafu wa NU7 (Valar Group na Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - chapisho la jukwaa linaloangazia kura ya maoni, urefu wa picha, na ratiba
- [Mnyororo wa Kupiga Kura wa Mwenye Sarafu: muundo wa kiufundi](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - uandishi wa itifaki ukurasa huu unategemea
- [Nyaraka za upigaji kura zilizolindwa na Valar Group](https://valargroup.gitbook.io/shielded-vote-docs) - marejeleo yanayodumishwa kwa mnyororo wa upigaji kura
- [Nambari ya upigaji kura na ukaguzi wa Valar Group (GitHub)](https://github.com/valargroup/vote-sdk) - utekelezaji wa chanzo huria na ukaguzi wake

## Kurasa zinazohusiana

- [Urejeshaji wa Taarifa Binafsi](../zcash-tech/private-information-retrieval) - mbinu ya kuthibitisha kutokuwa mwanachama nyuma ya kuzuia kura mbili za kibinafsi
- [Ironwood](../zcash-tech/ironwood) - bwawa lililolindwa ambalo mizani yake huweka uzito wa kura
- [zk-SNARKs](../zcash-tech/zk-snarks) - mfumo wa uthibitisho nyuma ya usawa na uthibitisho wa ustahiki
- [Mabwawa ya Kuogelea Yenye Ngao](../using-zcash/shielded-pools) - usawa uliolindwa ni nini na kwa nini unabaki siri
- [Muhtasari wa Ufadhili na Utawala wa Zcash](../zcash-community/zcash-governance) - jinsi ishara hii ya hisia inavyochangia mchakato mpana wa maamuzi Zcash's
- [Shielded Labs](../zcash-organizations/shielded-labs) - mmoja wa wanachama watano wa mratibu wa multisig
