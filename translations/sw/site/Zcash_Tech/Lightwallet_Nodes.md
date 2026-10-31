<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>


# Node za Lightwallet Zcash

## Kwa Muhtasari

* Watu wengi hutumia Zcash kupitia pochi nyepesi [light wallet], ambayo haipakui blockchain yote. Badala yake, huwasiliana na seva ambayo tayari imefanya kazi hiyo.
* Vipande viwili vya programu huhudumia pochi nyepesi leo: **lightwalletd**, huduma ya awali iliyoandikwa kwa Go, na **Zaino**, kiorodheshi kipya zaidi kilichoandikwa kwa Rust.
* Funguo zako haziondoki kamwe kwenye kifaa chako, na seva haiwezi kutumia fedha zako wala kusoma kiasi na jumbe ndani ya miamala ya faragha kamili.
* Kile ambacho seva iko katika nafasi nzuri ya kujifunza ni anwani yako ya IP na muda wa shughuli zako — miamala ya faragha hulinda kinachotokea kwenye blockchain, si muunganisho wako kwa seva.
* Tor huondoa kitambulishi cha IP; inapatikana katika pochi zilizoundwa kwenye `zcash_client_backend`, na katika ZODL ni mpangilio katika Mipangilio ya Kina.
* Unaweza kubadilisha seva ambayo pochi yako hutumia, au kuendesha yako mwenyewe — lightwalletd na Zaino zote ni chanzo huria.

## Maelezo ya Msingi

Watu wengi hutumia Zcash kupitia pochi nyepesi, ambayo haipakui blockchain yote. Badala yake, huwasiliana na seva ambayo tayari imefanya kazi hiyo. Ukurasa huu unaeleza seva hizo ni nini, zinaweza na haziwezi kuona nini kukuhusu, jinsi ya kupitisha muunganisho wako kupitia Tor, na jinsi ya kubadilisha seva ambayo pochi yako hutumia.

Vipande viwili vya programu huhudumia pochi nyepesi leo. **lightwalletd** ni huduma ya awali, iliyoandikwa kwa Go. **Zaino** ni kiorodheshi kipya zaidi kilichoandikwa kwa Rust, kilichoundwa kama sehemu ya kazi ya kusitisha zcashd.

### Seva ya pochi nyepesi hufanya nini

Seva ya pochi nyepesi hukaa kati ya pochi yako na blockchain ya Zcash na kuipa mtazamo wa mnyororo unaotumia data kidogo. Hukufanyia mambo matatu.

Hutoa block zilizofinyazwa. Badala ya block kamili, hutuma muundo mfupi unaobeba tu kile ambacho pochi inahitaji ili kutambua malipo kwa anwani yake ya faragha, kutambua matumizi ya madokezo yake, na kusasisha thibitisho zake.

Husambaza miamala yako. Unapotuma, pochi yako hukabidhi muamala uliokamilika kwa seva, ambayo huutangaza kwa mtandao.

Hujibu hoja za mnyororo, kama vile urefu wa sasa na maelezo ya ada [fee] ambayo pochi yako inahitaji.

Pochi yako bado hufanya kazi za faragha kwenye kifaa chako. Huhifadhi funguo zako, husimbua block kwa majaribio ili kupata madokezo yako, na huunda na kutia sahihi miamala kwenye kifaa chako.

### Kile ambacho seva inaweza na haiwezi kuona

Hii ndiyo sehemu ambayo ni rahisi kuielewa vibaya. Funguo zako haziondoki kamwe kwenye kifaa chako, lakini hiyo si sawa na kusema seva haijifunzi chochote kukuhusu.

Marejeleo hapa ni muundo wa vitisho wa programu ya pochi ya [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), ambao unastahili kusomwa kikamilifu ikiwa unajali suala hili. Unaainisha aina kadhaa za wapinzani. Anayohusika kwa ukurasa huu ni mpinzani anayeweza kufuatilia trafiki kati ya pochi yako na intaneti, na kati ya seva na intaneti. Anayeendesha seva yuko kwa asili katika sehemu ya nafasi hiyo, kwa sababu pochi yako huunganishwa nao moja kwa moja.

Anza na kile kinacholindwa. Dhidi ya kila mpinzani katika muundo huo, akiwemo yule ambaye amehujumu seva, “hawezi kujifunza nyenzo zozote za funguo za kriptografia za mtumiaji (funguo za kutumia pesa, funguo za kutazama, maneno ya kurejesha pochi, n.k.)”, hawezi kuiba fedha zako, wala hawezi kukufanya utume fedha ambazo hukukusudia kutuma. Kiasi na jumbe ndani ya miamala ya faragha kamili hubaki zimesimbwa fiche.

Kisha kuna kile kisicholindwa. Muundo wa vitisho unaorodhesha haya kama udhaifu unaojulikana dhidi ya mpinzani anayefuatilia trafiki:

| Udhaifu | Jinsi |
|:--|:--|
| Kujua wewe ni nani | “Mpinzani anajua anwani ya IP ya mtumiaji, ambayo inaweza kumwongoza kwenye utambulisho halisi wa mtumiaji” |
| Kujua kwa makadirio ulipo | Kutafuta IP yako “katika hifadhidata ya eneo la kijiografia ili kukadiria mahali walipo” |
| Kujua kwamba na wakati ulituma au kupokea muamala wa faragha | Kutuma “hutumia data zaidi, jambo linaloonekana ingawa muunganisho umesimbwa fiche”. Muundo huo unabainisha kwamba tendo la kutuma na kupokea linaonekana kwa seva yenyewe |
| Kuhesabu miamala mingapi umefanya baada ya muda | Mienendo ileile ya data, inayofuatiliwa kwa kipindi kirefu zaidi |
| Kugundua mienendo ya malipo inayojirudia | Kufuatilia wakati shughuli inatokea |
| Kubaini kama anwani ni yako | Mpinzani ambaye tayari anajua anwani “anaweza kutuma fedha kwa anwani hiyo na kufuatilia kuona kama kuna ongezeko la matumizi ya data” kutoka kwenye pochi yako ikiichukua |

Muundo huo pia unabainisha kwamba hali ya kawaida huchukulia “uhusiano wa uaminifu kati ya mtumiaji na mwendeshaji wa seva ya lightwalletd”.

Kwa hiyo, muhtasari wa kweli ni huu. Seva ya pochi nyepesi haiwezi kutumia fedha zako, na haiwezi kusoma kiasi au jumbe katika miamala yako ya faragha. Kile ilicho katika nafasi nzuri ya kujifunza ni anwani yako ya IP na muda wa shughuli zako, na vitu hivyo viwili kwa pamoja vinaweza kusema mengi kuhusu mtu. Miamala ya faragha hulinda kinachotokea kwenye blockchain. Haifichi, yenyewe pekee, muunganisho wako kwa seva.

## Taswira / Mfano

Fikiria maktaba ya umma inayohifadhi kila gazeti lililowahi kuchapishwa. Full node ni msomaji anayechukua kumbukumbu nzima kwenda nyumbani. Pochi nyepesi ni msomaji anayemwomba msimamizi wa maktaba muhtasari wa kila siku badala yake — karatasi nyembamba yenye taarifa za kutosha tu kugundua kama kuna chochote kinachomhusu.

Muhtasari umefungwa: msimamizi wa maktaba huukusanya bila kuweza kusoma ni habari zipi ni muhimu kwako, nawe huufungua nyumbani kwa ufunguo wako mwenyewe. Hiyo ndiyo block iliyofinyazwa, na kufungua huko ni usimbuaji wa majaribio kwenye kifaa chako.

Lakini msimamizi wa maktaba bado huona msomaji gani aliingia, kwa wakati gani, na kifurushi alichobeba kilikuwa kinene kiasi gani. Hiyo ndiyo anwani ya IP na muda — unaoonekana kwenye dawati, bila kujali bahasha imefungwa vizuri kiasi gani. Tor ni sawa na kutuma mjumbe asiyejulikana: msimamizi wa maktaba bado hukabidhi kifurushi kilekile, lakini hajui tena kinaenda kwenye nyumba ya nani.

## Uchambuzi wa Kina

### Kupitisha muunganisho kupitia Tor

Tor hukata kiungo kati ya anwani yako ya IP na trafiki ya pochi yako, jambo linaloondoa kitambulishi chenye nguvu zaidi katika jedwali hapo juu.

Usaidizi upo katika maktaba za Rust ambazo pochi nyingi za Zcash hujengwa juu yake. zcash_client_backend inajumuisha moduli ya Tor iliyojengwa kwenye [Arti](https://tpo.pages.torproject.net/core/arti/), utekelezaji wa Rust wa Tor, hivyo pochi inaweza kupitisha ulandanishi, utangazaji wa miamala, na utafutaji wa bei kupitia Tor bila kusafirisha mteja tofauti wa Tor.

Wasanidi programu wa Zaino wanatoa hoja hiyo hiyo, wakinukuu moja kwa moja muundo wa vitisho: kuna “haja ya kutumia itifaki za usafirishaji zisizotambulisha (kama Nym au Tor) ili kuficha utambulisho wa wateja dhidi ya seva za kuorodhesha za Zcash”.

Katika **ZODL**, Tor ni mpangilio katika Mipangilio ya Kina. Maelezo ya toleo la pochi yanaelekeza watumiaji kwenye hali ya muunganisho wa mkono “pamoja na kuwezesha Tor katika Mipangilio ya Kina” ikiwa “wanapendelea kupunguza ufichuzi wa metadata”, na programu hutoa kuwezesha Tor kabla ya kurejesha pochi, ambao ni wakati IP mpya ingeunganishwa vinginevyo na historia nzima ya pochi.

Tahadhari mbili. Tor huficha IP yako kutoka kwa seva, lakini haibadilishi kile ambacho seva hujifunza kutoka kwa maombi unayofanya. Na uelekezaji wa onion huongeza muda wa kusubiri, hivyo ulandanishi huchukua muda mrefu zaidi. Kuendesha seva yako mwenyewe huepuka swali la uaminifu kwa njia tofauti, kwa kuwa mwendeshaji basi ni wewe.

### Zaino, kiorodheshi cha Rust

[Zaino](/zcash-tech/zaino) ni kiorodheshi kilichoandikwa kwa Rust na timu ya Zingo, kilichoundwa kuchukua nafasi ya lightwalletd kama sehemu ya kazi ya kusitisha zcashd. Huhudumia light client, wateja kamili, na vivinjari vya block, kikisoma data ya mnyororo iliyohifadhiwa na “aidha Zebra au kithibitishaji kamili cha zcashd”.

Kiko katika maendeleo hai, na toleo la 0.8.0 lilitolewa Agosti 2026. Kinalenga kubaki sambamba na lightwalletd kwa kadiri iwezekanavyo, ili pochi ziweze kuelekezwa kukitumia bila kuandikwa upya.

Zaino kina ukurasa wake wenye michoro ya usanifu, hivyo ukurasa huu unashughulikia tu jukumu lake kama seva ya pochi nyepesi.

### Kuendesha yako mwenyewe

Chaguo imara zaidi ni kuwa mwendeshaji wako mwenyewe, jambo linaloondoa swali la uaminifu kabisa. Seva zote mbili ni chanzo huria: [lightwalletd](https://github.com/zcash/lightwalletd) katika Go na [Zaino](https://github.com/zingolabs/zaino) katika Rust. Zote husoma kutoka kwa kithibitishaji kamili, hivyo utahitaji pia [Zebra](/zcash-tech/zebra-full-node).

## Athari za Kivitendo

### Orodha ya seva

Dashibodi ya [hosh.zec.rocks](https://hosh.zec.rocks/zec) hufuatilia seva za umma na hali yake, na ndiyo mahali pa kuangalia kinachoendesha kwa kweli. [status.zec.rocks](https://status.zec.rocks/) huonyesha hali ya huduma.

Seva zilizoorodheshwa kwenye dashibodi hiyo wakati wa kuandika:

| Seva | Maelezo |
|:--|:--|
| zec.rocks:443 | Vituo vya kikanda vimeorodheshwa kando yake katika na.zec.rocks, eu.zec.rocks, ap.zec.rocks na sa.zec.rocks |
| zec-node.cakewallet.com:443 | Kwenye kikoa cha Wallet ya Cake |
| zec.0xrpc.io:443 | Inaendeshwa na 0xRPC, ambayo hutoa vituo vya umma bila malipo kwa minyororo kadhaa na kuomba michango kufidia uwezo |
| zaino.unsafe.zec.rocks:443 | Toleo la Zaino. Zingatia jina la mwenyeji, lichukulie kama la majaribio |
| testnet.zec.rocks:443 | Testnet, yenye toleo la testnet la Zaino lililoorodheshwa katika zaino.testnet.unsafe.zec.rocks |

Angalia dashibodi badala ya kuamini orodha hii. Waendeshaji huja na kuondoka, na ukurasa kama huu hupitwa na wakati.

### Kubadilisha seva katika pochi yako

Inafaa kufanya hivyo ikiwa unataka kuchagua mwendeshaji unayemwamini, kusambaza shughuli kati ya waendeshaji, au kuelekeza kwenye seva yako mwenyewe.

Njia za menyu hapa chini zilikuwa sahihi wakati ukurasa huu ulisasishwa, lakini miolesura ya pochi hubadilika, kwa hiyo ichukulie kama dokezo badala ya njia kamili. Tafuta Mipangilio ya Kina au chaguo la seva.

#### ZODL

Hapo awali ilikuwa Zashi. Gonga ikoni ya gia kwenye kona ya juu kulia, kisha Mipangilio ya Kina. Tor ipo katika skrini hiyo hiyo. ZODL pia hutoa njia ya mkato ya Kubadilisha seva wakati hitilafu ya ulandanishi imesababishwa na seva kupitwa na wakati.

#### Ywallet

Gonga ikoni ya gia kwenye kona ya juu kulia, kisha kichupo cha Zcash.

![Ywallet server settings](/content-images/b0a2910b-dbdf-4292-8e69-af5a386aa183-f51f098d19.webp)

#### Zingo

Gonga menyu ya hamburger kwenye kona ya juu kushoto, kisha Mipangilio, halafu telezesha chini.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Gonga menyu ya hamburger kwenye kona ya juu kushoto, kisha Mipangilio, halafu Kina.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Picha hizo za skrini zilichukuliwa Machi 2025, na programu zimetoa matoleo tangu wakati huo, kwa hiyo vitufe vinaweza kuwa vimehamishwa.

## Makosa ya Kawaida

**Kufikiri seva inaweza kusoma miamala yako**. Haiwezi. Funguo zako hubaki kwenye kifaa chako, na kiasi pamoja na jumbe ndani ya miamala ya faragha kamili hubaki zimesimbwa fiche — hata dhidi ya mpinzani ambaye amehujumu seva.

**Kusoma “shielded” kama “muunganisho usiojulikana”**. Miamala ya faragha hulinda kinachotokea kwenye blockchain. Anwani yako ya IP na muda wa shughuli zako ni safu tofauti, na safu hiyo ndiyo hasa seva huona.

**Kudhani Tor huondoa kila athari**. Tor huficha IP yako kutoka kwa seva, lakini haibadilishi kile ambacho seva hujifunza kutoka kwa maombi unayofanya, na huongeza muda wa kusubiri katika ulandanishi.

**Kuamini orodha ya seva kwenye ukurasa wa wiki**. Waendeshaji huja na kuondoka. Angalia [hosh.zec.rocks](https://hosh.zec.rocks/zec) ili kujua kinachoendesha kwa kweli kabla ya kuelekeza pochi yako kwenye chochote.

## Muhtasari

Pochi nyepesi hukupa bwawa la faragha [shielded pool] bila nafasi ya diski, ambayo ni ubadilishanaji mzuri. Elewa tu kwa wazi kile unachobadilishana. Seva haiwezi kuchukua fedha zako wala kusoma kiasi chako cha faragha, lakini iko katika nafasi nzuri ya kuona anwani yako ya IP na wakati unapofanya muamala. Pitisha muunganisho kupitia Tor, chagua mwendeshaji wako kwa makusudi, au endesha yako mwenyewe.

## Kurasa Zinazohusiana

- [Nani Anaweza Kuona Malipo Yako ya Zcash](/start-here/who-can-see-your-zcash-payment) — mtazamo wa kiwango cha wanaoanza kuhusu swali lilelile.
- [Kile Ambacho Kivinjari cha Block Kinaweza Kuona](/zcash-tech/what-a-block-explorer-can-see) — kile kinachoonekana on-chain, kinyume na kinachoonekana kwenye seva.
- [Zaino](/zcash-tech/zaino) — michoro ya usanifu na jukumu pana la kiorodheshi cha Rust.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — kithibitishaji ambacho seva ya pochi nyepesi husoma kutoka kwake.
- [Ulandanishi wa Pochi wa Zcash](/zcash-tech/zcash-wallet-syncing) — jinsi block zilizofinyazwa ambazo seva hutuma huchakatwa na pochi yako.

**Ilisasishwa mwisho:** Agosti 2026
