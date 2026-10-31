<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Shielded_Coinholder_Voting.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>

# Upigaji Kura wa Wamiliki wa Sarafu za Faragha

> Mnamo Agosti 2026, Zcash iliendesha kura ya wamiliki wa sarafu ambapo kura zilisalia zikiwa zimesimbwa fiche na jumla za mwisho pekee ndizo zilizofichuliwa, kwa kutumia itifaki ya upigaji kura wa faragha iliyoundwa na Valar Group.

Utakachojifunza: Jinsi kura inavyoweza kupimwa kulingana na kiasi cha ZEC unachomiliki, kubaki ya faragha, na bado kuhesabiwa kwa usahihi, bila mtu yeyote kujua ulivyopiga kura au kiasi unachomiliki.

Upigaji kura wa wamiliki wa sarafu za faragha huwaruhusu wamiliki wa Zcash kupiga kura kuhusu masuala ya mfumo ikolojia wakitumia ZEC zao za faragha. Hakuna anayejua mtu binafsi alipigia nini kura au kiasi cha ZEC anachomiliki, ilhali mtu yeyote anaweza kukagua kuwa jumla ni sahihi. Unafanyika kwenye blockchain maalumu ya upigaji kura iliyojengwa na Valar Group, tofauti na mainnet ya Zcash, kwa hiyo fedha zako halisi hazihamishwi kamwe. Kwa maelezo kuhusu jinsi Zcash inavyofanya maamuzi kwa upana zaidi, tazama muhtasari wa [Ufadhili na Utawala wa Zcash](../zcash-community/zcash-governance). Ukurasa huu unahusu itifaki ya kriptografia ya upigaji kura pekee.

Je, wewe ni mpya kwa Zcash? Anza na [ZEC ni nini na Zcash](../start-here/what-is-zec-and-zcash), [Mabwawa ya Faragha](../using-zcash/shielded-pools), na [zk-SNARKs](../zcash-tech/zk-snarks), kisha rudi hapa.

![Shielded voting flow: a voter proves their Ironwood balance at a snapshot, casts an encrypted ballot split into shares, which are homomorphically tallied and then threshold-decrypted into totals only](/content-images/shielded-voting-flow.webp)

## Kwa nini upigaji kura wa faragha ni mgumu

Kura nzuri ya wamiliki wa sarafu hutaka mambo manne kwa wakati mmoja, na njia dhahiri za kuyapata zinakinzana.

1. Kupima kwa hisa, ili kumiliki ZEC nyingi kuwe na uzito zaidi.
2. Faragha ya chaguo, ili hakuna anayejua ulivyopiga kura.
3. Faragha ya salio, ili hakuna anayejua kiasi cha ZEC unachomiliki.
4. Hesabu sahihi inayoweza kukaguliwa na mtu yeyote.

Ili kupima kwa hisa, huenda ikaonekana unahitaji salio la kila mtu. Ili kuhesabu kura, huenda ikaonekana unahitaji kuzifungua. Kufanya lolote kati ya hayo kwa njia ya kawaida hufichua hasa taarifa za faragha ambazo [bwawa la faragha](../using-zcash/shielded-pools) lipo kulinda, na kura za awali za sarafu zilifichua taarifa za salio kwa sababu hii. Upigaji kura wa faragha hutatua mvutano huo kwa vifaa vilevile vinavyowezesha malipo ya faragha: [mathibitisho ya maarifa sifuri](../zcash-tech/zk-snarks), nullifier, na usimbaji fiche.

## Dhana kuu: Sanduku la kura linalojihesabu

> Turnstile hukuruhusu kuhesabu kinachopita katika hifadhi ya benki bila kuona ndani. Sanduku la kura la faragha huenda hatua moja zaidi: Hujumlisha kura zilizofungwa bila kuzifungua kamwe.

Fikiria sanduku la kura lenye uwezo tatu usio wa kawaida. Linaweza kuongeza bahasha iliyofungwa kwenye jumla inayoendelea bila kuifungua. Kundi la maafisa, ambalo hakuna mmoja mwenye ufunguo, baadaye hufichua jumla za mwisho pekee. Na kabla hujaruhusiwa kutumbukiza bahasha ndani, unathibitisha kwa siri kuwa ulimiliki ZEC wakati mahususi uliopita na kwamba hujapiga kura tayari, bila kuonyesha sarafu zipi ni zako. Yote yaliyo hapa chini ni jinsi sanduku hilo linavyojengwa kivitendo.

## Ustahiki na nakala ya wakati

Awamu ya upigaji kura huweka urefu wa nakala ya wakati, block moja ya mainnet ya Zcash, na uzito wako ni salio lako la faragha linaloweza kutumika katika bwawa la [Ironwood](../zcash-tech/ironwood) kwenye block hiyo. Kanuni ni rahisi: Ironwood moja ya ZEC wakati wa nakala ya wakati ni sawa na kura moja. Kwa kura ya upeo wa NU7, nakala ya wakati ilikuwa block 3,459,350 ya mainnet, takriban Agosti 24, 2026 saa 19:00 UTC, huku upigaji kura ukiwa wazi hadi Septemba 14, 2026 saa 19:00 UTC. ZEC za uwazi hushughulikiwa kando kwa mbinu ya zamani, si kwa itifaki hii.

1. Fedha zako hazihamishwi wala hazifungwi kamwe. Ustahiki huwekwa wakati wa nakala ya wakati, kwa hiyo unaweza kutumia au kuhamisha ZEC mara moja baadaye bila kuathiri kura yako.
2. Hakuna hatua ya usajili. Urefu wa nakala ya wakati pekee unahitajika, jambo linalofanya mchakato uwe mwepesi na kuepuka kufichua nani anakusudia kupiga kura.

## Kuthibitisha salio lako bila kulifichua

Unapopiga kura, pochi yako hutengeneza thibitisho la maarifa sifuri kwamba wakati wa nakala ya wakati ulidhibiti ZEC fulani za faragha ambazo hazijatumika. Huthibitisha salio halali na ukubwa wake kwa mfumo wa kibinafsi wa kuhesabu, lakini haufichui madokezo yoyote wala hautengenezi muamala kwenye mainnet ya Zcash.

Thibitisho hilo hutengeneza salio la kura kwenye blockchain ya upigaji kura linalolingana na salio lako la nakala ya wakati, likimilikiwa na ufunguo mpya wa upigaji kura ambao pochi yako hutengeneza kwa ajili ya awamu hii pekee. Kwa sababu ufunguo huo ni mpya na haujaunganishwa na anwani zako za Zcash, hakuna chochote kwenye blockchain ya upigaji kura kinachoweza kufuatiliwa hadi kwenye madokezo yako halisi. Utambulisho wako wa on-chain na kura yako haviwezi kuhusishwa kwa muundo.

## Kuzuia kupiga kura mara mbili, kwa faragha

Ili kumzuia yeyote kupiga kura mara mbili kwa sarafu zilezile, mfumo lazima uthibitishe kwamba madokezo yaliyo nyuma ya salio lako hayakuwa yamekwisha kutumika wakati wa nakala ya wakati. Kwenye mainnet hili hufanywa kwa kufichua nullifier ya dokezo, alama yake ya kipekee ya matumizi, ambayo full node hukagua kwa matumizi ya kurudiwa. Lakini kufichua nullifier yako hapa kungeunganisha kura yako moja kwa moja na madokezo yako.

![Private double-vote prevention: instead of revealing a nullifier, the wallet uses Private Information Retrieval to fetch proof material while hiding which nullifier it asked about, then proves the note was unspent](/content-images/shielded-voting-pir.webp)

Kwa hiyo itifaki huthibitisha kinyume chake kwa faragha. Hutengeneza orodha ya kila nullifier iliyotumika tayari kufikia nakala ya wakati, na pochi yako huthibitisha kwa maarifa sifuri kwamba nullifier ya dokezo lako haimo kwenye orodha hiyo, ikionyesha kuwa dokezo halijatumika bila kufichua ni dokezo lipi.

Tatizo moja linasalia. Kupakua sehemu inayohitajika ya orodha hiyo kutoka kwa seva kungefichua nullifier yako kwa seva, na orodha kamili ni kubwa, takriban GB 2 kwa data ya enzi ya Orchard na kubwa zaidi kadiri Zcash inavyokua. [Urejeshaji wa Taarifa Binafsi](../zcash-tech/private-information-retrieval) (PIR) hutatua yote mawili: pochi yako hupakua data kamili inayohitaji huku ikificha kwa kriptografia data iliyoombwa. Matokeo hukaguliwa dhidi ya muhtasari uliochapishwa wa orodha ya nullifier, kwa hiyo seva isiyo ya uaminifu haiwezi kughushi matokeo bandia.

## Kutoa kura iliyosimbwa fiche

Kwa kila swali, pochi yako hufanya mambo matatu.

1. Husimba fiche uzito wa kura yako kwa kamati ya kuhesabu kwa kutumia usimbaji fiche homomofiki, aina ya usimbaji fiche ambayo maandishi yake yaliyosimbwa fiche yanaweza kujumlishwa bila kufumbuliwa. Hiki ndicho kinachoruhusu sanduku kujumlisha kura lisizoweza kusoma.
2. Hugawa kura yako katika hisa 16 tofauti, ili hata kamati inayoshirikiana kikamilifu ipate ugumu wa kuunda upya kiasi ambacho mtu yeyote alipiga kura nacho.
3. Hutuma hisa hizo kwa nyakati zilizochanganywa kupitia seva nyingi, ili mtazamaji asiweze kujua kuwa hisa hizo ni za mpiga kura yuleyule kwa kutegemea muda wa kuwasili.

Kila hisa hubeba thibitisho lake la maarifa sifuri kwamba ni sehemu halali ya kura halali, kwa hiyo hakuna anayeweza kuongeza kura zisizo na uthibitisho. Hisa zilizothibitishwa huongezwa kwa njia homomofiki kwenye jumla iliyosimbwa fiche inayoendelea kwa jibu ulilochagua.

## Kuhesabu bila kufungua kura yoyote

Hesabu huendeshwa na mamlaka ya uchaguzi iliyosambazwa: angalau validator 10 wa blockchain ya upigaji kura, ambao hakuna mmoja wao anayeweza kufumbua chochote. Mwanzoni mwa awamu kwa pamoja huendesha sherehe ya kutengeneza ufunguo inayozalisha ufunguo wa usimbaji fiche, ambao ufunguo wake linganifu wa kufumbua hugawanywa miongoni mwao wote na haukusanywi kamwe mahali pamoja.

> Hakuna afisa mmoja anayeshikilia ufunguo. Sanduku hufunguka tu wakati theluthi mbili yao wanapotumia funguo zao pamoja, na hata hapo hufichua jumla pekee.

Awamu inapofungwa, jumla zilizosimbwa fiche tayari zipo kutokana na uongezaji homomofiki hapo juu. Kila validator huchapisha ufumbuzi wa sehemu pamoja na thibitisho kwamba alifumbua kwa usahihi. Baada ya angalau theluthi mbili kuchangia, sehemu zao huunganishwa kuwa hesabu ya mwisho ya maandishi wazi kwa kila swali, na hakuna kingine kinachofumbuliwa kamwe. Kisha full node yoyote inaweza kukagua thibitisho la usahihi lililounganishwa, kwa hiyo umma unaweza kuthibitisha hesabu bila kuwaamini validator.

## Nani anayeiendesha, na wasichoweza kufanya

Muundo huu hutenganisha majukumu mawili ili hakuna kundi liwe na mamlaka mengi kupita kiasi.

![Separation of powers: a coordinator multisig sets which questions appear but cannot see votes, while a validator set counts but cannot read individual ballots or forge a tally](/content-images/shielded-voting-roles.webp)

Multisig ya mratibu ni kundi la 2-kati-ya-5 lenye wawakilishi kutoka Project Tachyon, [Zcash Foundation](../zcash-organizations/zcash-foundation), ZODL, [Shielded Labs](../zcash-organizations/shielded-labs), na Valar Group. Huamua maswali yanayofika kwenye mnyororo na kuthibitisha ufunguo wa usimbaji fiche wa kila awamu, lakini haliwezi kuona, kubadilisha, au kuzuia kura za watu binafsi. Mtu yeyote asiyependa maswali anaweza kuendesha blockchain yake mwenyewe ya upigaji kura, kwa kuwa programu ni wazi na bila ruhusa.

Validator ni node zisizopungua 10 zinazoshikilia ufunguo wa ufumbuzi uliogawanywa na kutekeleza ufumbuzi wa kizingiti. Haziwezi kufumbua kura za mtu binafsi wala kutengeneza hesabu bandia, kwa sababu kila ufumbuzi huambatana na thibitisho la umma la usahihi.

## Madhumuni ya akidi

Waandalizi huweka kizingiti cha ushiriki: Matokeo ya kura huchukuliwa kuwa yanawakilisha wamiliki wa sarafu iwapo angalau ZEC 1,000,000 hushiriki katika angalau swali moja, ikijumuisha kutoshiriki. Akidi haiamui swali lolote na haitumiki kwa kila swali. Ni ukaguzi mmoja wa kura nzima, kwa hiyo matokeo huchukuliwa kwa uzito tu kiasi kikubwa cha ZEC kinapojitokeza. Chini ya kiwango hicho, matokeo hayachukuliwi kuwa ishara yenye maana.

## Kile ambacho itifaki hii hailindi dhidi yake

Kuwa wazi kuhusu mipaka ni sehemu ya kuelewa muundo.

1. Ni ishara, si uamuzi unaofunga. Kura ya wamiliki wa sarafu hupima maoni yanayopimwa kwa hisa na huingiza katika Zcash mchakato wa kawaida wa [utawala](../zcash-community/zcash-governance) badala ya kuubadilisha.
2. Inapimwa kwa sarafu, kwa hiyo ushawishi hufuata umiliki. Msuguano mdogo unaweza kuongeza mwitikio lakini haubadilishi mkusanyiko wa ZEC.
3. Ajenda huwekwa na multisig ya mratibu, ambayo huchagua maswali yanayoonekana. Haiwezi kugusa kura, na mtu yeyote anaweza kuendesha mnyororo shindani, lakini uwekaji wa ajenda bado ni sehemu ya ushawishi.
4. Kuhesabu kunahitaji validator wawe mtandaoni. Kutengeneza hesabu kunahitaji angalau theluthi mbili yao kushirikiana, kwa hiyo hitilafu kubwa au kukataa kwa uratibu kunaweza kuchelewesha matokeo.
5. Faragha ya salio chini ya ushirikiano kamili ni ulinzi wa tabaka nyingi, si nadharia. Ikiwa kamati nzima ingejenga upya ufunguo kwa siri, ugawaji wa hisa na utumaji wa muda ndio hulinda salio lako, na wabunifu wanakubali kuwa haya ni dhaifu zaidi chini ya ushirikiano. Uchanganuzi wa hali ya juu wa trafiki ni hatari inayosalia.
6. Sehemu nyingi zaidi zinazohama kuliko muundo wa zamani. Seva za PIR, seva za utumaji, ufunguo mpya wa upigaji kura, na mathibitisho ya hatua nyingi kila kimoja ni mahali ambapo hitilafu au usanidi mbaya unaweza kutokea. Mfumo ni wa chanzo huria na sehemu zake zimekaguliwa kwa kujitegemea, jambo linalosimamia hatari hiyo badala ya kuiondoa.

Kile unacholinda, kwa nguvu na kwa namna inayoweza kuthibitishwa, ni mambo mawili muhimu zaidi: Kura yako haiwezi kuunganishwa na utambulisho wako, na jumla za mwisho pekee ndizo hufichuliwa.

## Kamusi

| Neno | Maana kwa lugha rahisi |
|---|---|
| Voting chain | Blockchain tofauti, iliyojengwa na Valar Group, inayosimamia kura; madokezo yako ya Zcash hayahamishwi kamwe kwenda humo |
| Snapshot height | Block ya mainnet ambayo salio zake huweka uzito wa kura (block 3,459,350 kwa kura ya NU7) |
| Nullifier | Alama ya kipekee ya matumizi ya dokezo; kuifichua kungeunganisha kura na dokezo, kwa hiyo upigaji kura huthibitisha kutokuwamo badala yake |
| Private Information Retrieval (PIR) | Kupakua data kutoka kwa seva huku ukificha data uliyoomba |
| Homomorphic encryption | Usimbaji fiche ambao maandishi yake yaliyosimbwa fiche yanaweza kujumlishwa bila kufumbuliwa |
| Coordinator multisig | Kundi la 2-kati-ya-5 linaloidhinisha maswali na ufunguo wa awamu, lakini haliwezi kuona au kubadilisha kura |
| Election authority | Validator 10 au zaidi ambao kwa pamoja hushikilia ufunguo wa ufumbuzi uliogawanywa na kufichua hesabu ya mwisho pekee |
| Threshold decryption | Kupata matokeo tu wakati wamiliki wa hisa za ufunguo wa kutosha, hapa theluthi mbili, wanashirikiana |
| Quorum | Kiwango cha chini cha ushiriki wa ZEC 1,000,000 ili kura ichukuliwe kuwa inawakilisha |

## Maswali Yanayoulizwa Mara Kwa Mara

Je, sarafu zangu zinahamishwa au kufungwa ninapopiga kura? Hapana. Ustahiki hupimwa kwenye block ya nakala ya wakati, kwa hiyo ZEC yako husalia mahali pake na inaweza kutumika. Upigaji kura hutengeneza mathibitisho kwenye mnyororo tofauti, si muamala wa Zcash.

Je, mtu yeyote anaweza kujua nilivyopiga kura au kiasi ninachomiliki? Hapana. Kura zimesimbwa fiche na jumla zilizojumlishwa pekee ndizo hufumbuliwa. Kura yako haiwezi kuhusishwa na utambulisho wako, na salio lako hugawanywa katika hisa 16 zenye muda ili kulilinda hata dhidi ya kamati inayoshirikiana.

Ni nini kinachomzuia mtu kupiga kura mara mbili, au kupiga kura kwa sarafu ambazo hana? Kila kura hubeba mathibitisho ya maarifa sifuri kuwa inaungwa mkono na salio halisi la nakala ya wakati ambalo halijatumika, na thibitisho la kutokuwamo linalotegemea PIR huonyesha dokezo la msingi halikuwa limetumika tayari, bila kufichua ni dokezo gani.

Nani huhesabu kura? Kundi lililosambazwa la validator wasiopungua 10, ambao hakuna mmoja anayeweza kufumbua chochote peke yake. Theluthi mbili lazima washirikiane kufichua jumla, na kila ufumbuzi huja na thibitisho la umma la usahihi.

Je, matokeo yanafungamana? Ni ishara ya maoni ya wamiliki wa sarafu inayopimwa kwa hisa. Hujulisha utawala wa kawaida wa Zcash badala ya kutekeleza mabadiliko kiotomatiki.

Je, ninaweza kuendesha au kukagua hili mwenyewe? Ndiyo. Programu ya blockchain ya upigaji kura, circuits, mfumo wa PIR, na kikaguzi cha hesabu vyote vimechapishwa na Valar Group ili mtu yeyote avikague na kuviendesha.

## Jaribu uelewa wako

Ikiwa kila kura imesimbwa fiche na kila mpiga kura hana jina, mtu yeyote anawezaje kuwa na uhakika kuwa jumla zilizochapishwa ni sahihi na kwamba hakuna aliyepiga kura mara mbili?

<details>
<summary>Jibu</summary>

Mathibitisho matatu hufanya kazi hiyo. Kila kura hubeba thibitisho la maarifa sifuri kwamba inaungwa mkono na salio halisi la nakala ya wakati, kwa hiyo hakuna kura zisizo na uthibitisho zinazohesabiwa. Thibitisho la kutokuwamo linalotegemea PIR huonyesha dokezo lililo nyuma yake halikutumika, na kuzuia kupiga kura mara mbili bila kufichua dokezo. Na validator wanapofumbua jumla, kila mmoja huchapisha thibitisho la usahihi, kwa hiyo full node yoyote inaweza kuthibitisha namba za mwisho zilifumbuliwa kwa uaminifu kutoka kwa kura zilizosimbwa fiche.
</details>

## Rasilimali

- [NU7 Tangazo la Kura ya Wamiliki wa Sarafu (Valar Group na Project Tachyon)](https://forum.zcashcommunity.com/t/nu7-coinholder-vote/56912) - chapisho la jukwaa linaloweka upeo wa kura, urefu wa nakala ya wakati, na ratiba
- [Blockchain ya Upigaji Kura wa Wamiliki wa Sarafu: muundo wa kiufundi](https://forum.zcashcommunity.com/t/the-coinholder-voting-chain/56925) - maelezo ya itifaki ambayo ukurasa huu unategemea
- [Valar Group nyaraka za upigaji kura wa faragha](https://valargroup.gitbook.io/shielded-vote-docs) - rejeleo linalodumishwa la blockchain ya upigaji kura
- [Valar Group msimbo wa upigaji kura na ukaguzi (GitHub)](https://github.com/valargroup/vote-sdk) - utekelezaji wa chanzo huria na ukaguzi wake

## Kurasa zinazohusiana

- [Urejeshaji wa Taarifa Binafsi](../zcash-tech/private-information-retrieval) - mbinu ya thibitisho la kutokuwamo inayosimamia uzuiaji binafsi wa kupiga kura mara mbili
- [Ironwood](../zcash-tech/ironwood) - bwawa la faragha ambalo salio zake huweka uzito wa kura
- [zk-SNARKs](../zcash-tech/zk-snarks) - mfumo wa uthibitisho unaosimamia mathibitisho ya salio na ustahiki
- [Mabwawa ya Faragha](../using-zcash/shielded-pools) - salio la faragha ni nini na kwa nini husalia limefichwa
- [Muhtasari wa Ufadhili na Utawala wa Zcash](../zcash-community/zcash-governance) - jinsi ishara hii ya maoni inavyoingia katika mchakato mpana wa maamuzi wa Zcash
- [Shielded Labs](../zcash-organizations/shielded-labs) - mmoja wa wanachama watano wa multisig ya mratibu
