<a href="https://github.com/zechub/zechub/edit/main/site/Zcash_Tech/Lightwallet_Nodes.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Hariri Ukurasa"/>
</a>


# Zcash Node za Lightwallet

## Kwa Ufupi

* Watu wengi hutumia Zcash kupitia pochi nyepesi (light wallet), ambayo haipakui blockchain nzima. Badala yake, huwasiliana na seva ambayo tayari imefanya kazi hiyo.
* Programu tatu ndizo zinazotoa huduma kwa pochi nyepesi kwa kawaida leo: **lightwalletd** (ya awali, ya Go), **Zaino** (kiweka faharasa cha Rust), na ztreamer (kiweka faharasa cha Rust chenye utendaji wa juu kutoka Zcash Labs, kinachowezesha mtandao wa umma wa fastz.cash).
* Funguo zako haziondoki kamwe kwenye kifaa chako, na seva haiwezi kutumia pesa zako au kusoma kiasi na jumbe ndani ya miamala ya faragha kikamilifu.
* Seva inaweza kujua anwani yako ya IP na nyakati za shughuli zako kwa urahisi — miamala ya faragha hulinda yanayotokea kwenye blockchain, si muunganisho wako na seva.
* Tor huondoa kitambulisho cha IP; inapatikana katika pochi zilizojengwa kwa kutumia `zcash_client_backend`, na katika ZODL ni mpangilio ndani ya Mipangilio ya Kina.
* Unaweza kubadilisha seva inayotumiwa na pochi yako, au kuendesha seva yako mwenyewe — lightwalletd, Zaino, na ztreamer zote ni programu huria.

## Maelezo ya Msingi

Watu wengi hutumia Zcash kupitia pochi nyepesi, ambayo haipakui blockchain nzima. Badala yake, huwasiliana na seva ambayo tayari imefanya kazi hiyo. Ukurasa huu unaeleza seva hizo ni nini, zinaweza na haziwezi kuona kukuhusu, jinsi ya kuelekeza muunganisho wako kupitia Tor, na jinsi ya kubadilisha seva inayotumiwa na pochi yako.

Programu tatu ndizo zinazotoa huduma kwa pochi nyepesi kwa kawaida leo. **lightwalletd** ndiyo huduma ya awali, iliyoandikwa kwa Go. **Zaino** ni kiweka faharasa kipya zaidi kilichoandikwa kwa Rust, kilichoundwa kama sehemu ya kazi ya kuacha kutumia zcashd. **ztreamer** ni kiweka faharasa cha Rust chenye utendaji wa juu kutoka Zcash Labs, kinachowezesha mtandao wa umma wa fastz.cash.

### Kazi ya seva ya pochi nyepesi

Seva ya pochi nyepesi huwa kati ya pochi yako na blockchain ya Zcash, na huipa pochi yako mwonekano wa mnyororo unaotumia kipimo data kwa ufanisi. Hukufanyia mambo matatu.

Hutoa blocks fupi. Badala ya blocks nzima, hutuma muundo mfupi unaobeba tu taarifa ambazo pochi inahitaji ili kutambua malipo yanayoingia kwenye anwani yake ya faragha, kutambua matumizi ya madokezo yake, na kusasisha mashahidi wake.

Husambaza miamala yako. Unapotuma, pochi yako hukabidhi muamala uliokamilika kwa seva, nayo huitangaza kwenye mtandao.

Hujibu maswali kuhusu mnyororo, kama vile urefu wake wa sasa na taarifa za ada ambazo pochi yako inahitaji.

Pochi yako bado hufanya kazi ya faragha kwenye kifaa chako. Huhifadhi funguo zako, hujaribu kusimbua blocks ili kupata madokezo yako, na huunda na kutia saini miamala kwenye kifaa chako.

### Seva inaweza na haiwezi kuona nini

Hili ndilo jambo ambalo ni rahisi kulielewa vibaya. Funguo zako haziondoki kamwe kwenye kifaa chako, lakini hilo halimaanishi kuwa seva haijifunzi chochote kukuhusu.

Rejeo hapa ni muundo wa vitisho vya programu ya pochi ya [Zcash](https://zcash.readthedocs.io/en/latest/rtd_pages/wallet_threat_model.html), ambao inafaa kuusoma wote ikiwa unajali suala hili. Unaeleza aina kadhaa za washambuliaji. Aina inayohusika na ukurasa huu ni mshambuliaji anayeweza kufuatilia trafiki kati ya pochi yako na intaneti, na kati ya seva na intaneti. Mtu yeyote anayeendesha seva kwa asili huwa sehemu ya nafasi hiyo, kwa sababu pochi yako huunganisha moja kwa moja na seva hiyo.

Anza na mambo yanayolindwa. Dhidi ya kila mshambuliaji katika muundo huo, ikiwemo yule aliyeathiri seva, mshambuliaji “hawezi kujifunza taarifa zozote za kriptografia za funguo za mtumiaji (funguo za kutumia pesa, funguo za kutazama, maneno ya kurejesha pochi, n.k.)”, hawezi kuiba pesa zako, na hawezi kukufanya utume pesa ambazo hukukusudia kutuma. Kiasi na jumbe ndani ya miamala ya faragha kikamilifu hubaki zimesimbwa fiche.

Kisha kuna mambo yasiyolindwa. Muundo wa vitisho unayaorodhesha kama udhaifu unaojulikana dhidi ya mshambuliaji anayefuatilia trafiki:

| Udhaifu | Jinsi |
|:--|:--|
| Kutambua wewe ni nani | “Mshambuliaji anajua anwani ya IP ya mtumiaji, ambayo inaweza kumwezesha kujua utambulisho halisi wa mtumiaji” |
| Kukadiria mahali ulipo | Kutafuta IP yako “katika hifadhidata ya mahali ili kukadiria ulipo” |
| Kujua kwamba na lini ulituma au kupokea muamala wa faragha | Kutuma “hutumia kipimo data zaidi, jambo linaloonekana hata ingawa muunganisho umesimbwa fiche”. Muundo huo unaeleza kuwa seva yenyewe inaweza kuona tendo la kutuma na kupokea |
| Kuhesabu idadi ya miamala uliyofanya baada ya muda | Miundo ileile ya matumizi ya kipimo data, inayofuatiliwa kwa muda mrefu zaidi |
| Kugundua miundo ya malipo inayojirudia | Kufuatilia nyakati ambazo shughuli zinafanyika |
| Kubaini kama anwani ni yako | Mshambuliaji ambaye tayari anajua anwani “anaweza kutuma pesa kwenye anwani hiyo na kuangalia kama matumizi ya kipimo data yanaongezeka ghafla” kutoka kwenye pochi yako inapoitafuta |

Muundo huo pia unaeleza kuwa hali ya kawaida hudhani “kuna uhusiano wa kuaminiana kati ya mtumiaji na mwendeshaji wa seva ya lightwalletd”.

Kwa hiyo, muhtasari wa kweli ni huu. Seva ya pochi nyepesi haiwezi kutumia pesa zako, wala kusoma kiasi au jumbe katika miamala yako ya faragha. Lakini inaweza kujua anwani yako ya IP na nyakati za shughuli zako kwa urahisi, na mambo hayo mawili kwa pamoja yanaweza kufichua mengi kumhusu mtu. Miamala ya faragha hulinda yanayotokea kwenye blockchain. Yenyewe peke yake haiwezi kuficha muunganisho wako na seva.

## Taswira / Mfano

Fikiria maktaba ya umma yenye kila gazeti lililowahi kuchapishwa. Full node ni msomaji anayechukua nyumbani hifadhi yote. Pochi nyepesi ni msomaji anayemwomba mkutubi muhtasari wa kila siku badala yake — karatasi nyembamba yenye taarifa za kutosha tu kutambua kama kuna jambo linalomhusu.

Muhtasari huo umefungwa: mkutubi huutayarisha bila kuweza kusoma ni vipengee vipi vinavyokuhusu, nawe huufungua nyumbani kwa kutumia ufunguo wako mwenyewe. Huo ndio block mfupi, na kuufungua ni jaribio la kusimbua kwenye kifaa chako.

Lakini mkutubi bado huona msomaji aliyeingia, wakati aliingia, na ukubwa wa kifurushi alichobeba alipotoka. Huo ndio anwani ya IP na nyakati — vinavyoonekana kutoka kwenye dawati, hata bahasha ikiwa imefungwa vizuri kadiri gani. Tor ni sawa na kutuma mjumbe asiyejulikana: mkutubi bado hukabidhi kifurushi kilekile, lakini hajui tena kinaenda kwenye nyumba ya nani.

## Maelezo ya Kina

### Kuelekeza kupitia Tor

Tor hukata uhusiano kati ya anwani yako ya IP na trafiki ya pochi yako, na hivyo kuondoa kitambulisho chenye nguvu zaidi katika jedwali lililo hapo juu.

Msaada wake unapatikana katika maktaba za Rust ambazo pochi nyingi za Zcash hujengwa juu yake. zcash_client_backend ina moduli ya Tor iliyojengwa juu ya [Arti](https://tpo.pages.torproject.net/core/arti/), utekelezaji wa Tor wa Rust, ili pochi iweze kuelekeza usawazishaji, utangazaji wa miamala na utafutaji wa bei kupitia Tor bila kuhitaji kusambaza mteja tofauti wa Tor.

Wasanidi wa Zaino wanatoa hoja hiyohiyo, wakirejelea moja kwa moja muundo wa vitisho: kuna “haja ya kutumia itifaki za usafirishaji zisizotambulisha mtumiaji (kama vile Nym au Tor) ili kuficha utambulisho wa wateja dhidi ya seva za uwekeaji faharasa za Zcash”.

Katika **ZODL**, Tor ni mpangilio ndani ya Mipangilio ya Kina. Maelezo ya toleo la pochi hiyo yanawaelekeza watumiaji kutumia hali ya muunganisho wa mikono “pamoja na kuwasha Tor katika Mipangilio ya Kina” ikiwa “wanapendelea kupunguza ufichuaji wa metadata”, na programu hutoa chaguo la kuwasha Tor kabla ya kurejesha pochi, wakati ambapo anwani mpya ya IP vinginevyo ingeunganishwa na historia yote ya pochi.

Kuna tahadhari mbili. Tor huficha IP yako dhidi ya seva, lakini haibadilishi taarifa ambazo seva hujifunza kutokana na maombi unayotuma. Pia, uelekezaji kupitia onion huongeza ucheleweshaji, kwa hiyo usawazishaji huchukua muda mrefu zaidi. Kuendesha seva yako mwenyewe huepusha suala la kuaminiana kwa namna tofauti, kwa kuwa wewe ndiye mwendeshaji.

### Zaino, kiweka faharasa cha Rust

[Zaino](/zcash-tech/zaino) ni kiweka faharasa kilichoandikwa kwa Rust na timu ya Zingo, kilichoundwa kuchukua nafasi ya lightwalletd kama sehemu ya kazi ya kuacha kutumia zcashd. Hutoa huduma kwa wateja wepesi, wateja kamili na vivinjari vya blocks, na husoma data ya mnyororo inayohifadhiwa na “validator kamili ya Zebra au ya zcashd”.

Bado kinaendelezwa, na toleo la 0.10.1 lilitolewa Septemba 2026. Kinalenga kuendelea kuendana na lightwalletd kwa kadiri inavyowezekana, ili pochi ziweze kukielekezea bila kuandikwa upya.

Zaino ina ukurasa wake wenye michoro ya usanifu, kwa hiyo ukurasa huu unaeleza tu jukumu lake kama seva ya pochi nyepesi.

### ztreamer na fastz.cash

[ztreamer](https://github.com/zcashlabs/ztreamer) ni kiweka faharasa na seva ya pochi nyepesi ya Zcash yenye utendaji wa juu, iliyoandikwa kwa Rust na Zcash Labs. Imeundwa kwa ucheleweshaji mdogo na uwezo mkubwa wa kushughulikia maombi, na huwezesha mtandao wa umma wa viweka faharasa wa [fastz.cash](https://forum.zcashcommunity.com/t/announcing-fastz-cash-rpc-by-zcash-labs/59478) (uliotangazwa tarehe 19 Novemba 2026).

fastz.cash ina seva za ukingoni za kikanda (kwa sasa Frankfurt, London, Virginia, Oregon, São Paulo, Singapore na Osaka). Kila eneo lina full node yake na faharasa ya ztreamer ya ndani. TLS huishia kwenye node. Muda wa wastani uliopimwa hadi jibu la kwanza kwa ombi la GetLatestBlock ulikuwa takriban ms 35 duniani kote. Inaripotiwa kuwa usawazishaji wa safu za blocks ni hadi ~3× wa haraka zaidi kuliko lightwalletd za hivi karibuni, na faharasa ndogo (~18 GB) inayorahisisha kutumia maeneo mengine ya ukingo.

Hali na kituo cha karibu zaidi: [status.fastz.cash](https://status.fastz.cash).

**Dokezo kuhusu faragha:** fastz.cash pia huendesha huduma ya wallet-pir ya Valar Group. Watumiaji wa Vizor wanaweza kuitumia leo kwa maombi ya usawazishaji ya faragha yanayopunguza metadata ambayo seva hujifunza kuhusu madokezo au safu zinazoombwa. Hii ni safu ya ziada ya faragha juu ya muundo wa kawaida wa vitisho vya pochi nyepesi ulioelezwa hapo juu; haichukui nafasi ya Tor wala ya uchaguzi wa mwendeshaji.

ztreamer ni programu huria na inaweza kuendeshwa kivyake (node ya Zakura iliyopachikwa au hali ya mbali). Kama lightwalletd na Zaino, hutoa itifaki ya pochi nyepesi kupitia gRPC. Bado inaendelezwa, na inalenga kutumika kama miundombinu ya uzalishaji na kama uwanja wa majaribio ya maboresho yajayo ya itifaki ya pochi nyepesi.

### Kuendesha seva yako mwenyewe

Chaguo lenye nguvu zaidi ni kuwa mwendeshaji wako mwenyewe, jambo linaloondoa kabisa suala la kuaminiana. Seva zote tatu ni programu huria: [lightwalletd](https://github.com/zcash/lightwalletd) katika Go, [Zaino](https://github.com/zingolabs/zaino) katika Rust, na [ztreamer](https://github.com/zcashlabs/ztreamer) katika Rust. Zinasoma data kutoka kwa validator kamili, kwa hiyo utahitaji pia [Zebra](/zcash-tech/zebra-full-node) au Zakura. Seva za zec.rocks huwekwa kwa kutumia [Zcash Stack](/guides/zcash-stack), chati huria ya Helm na kifurushi cha Compose cha Docker kinachoendesha Zebra na lightwalletd pamoja.

## Athari za Kiutendaji

### Orodha ya seva

Dashibodi ya [hosh.zec.rocks](https://hosh.zec.rocks/zec) hufuatilia seva za umma na hali yake, na ndiyo mahali pa kuangalia ni seva zipi zinazofanya kazi kwa sasa. [status.zec.rocks](https://status.zec.rocks/) huonyesha hali ya huduma. Kwa mtandao wa fastz.cash, angalia [status.fastz.cash](https://status.fastz.cash).

Seva zilizoorodheshwa kwenye dashibodi hiyo wakati wa kuandika:

| Seva | Maelezo |
|:--|:--|
| zec.rocks:443 | Vituo vya kikanda vimeorodheshwa pamoja nayo katika na.zec.rocks, eu.zec.rocks, ap.zec.rocks na sa.zec.rocks |
| zec-node.cakewallet.com:443 | Kwenye kikoa cha pochi ya Cake |
| zec.0xrpc.io:443 | Inaendeshwa na 0xRPC, inayotoa vituo vya umma bila malipo kwa minyororo kadhaa na kuomba michango ili kulipia uwezo |
| zaino.unsafe.zec.rocks:443 | Instance ya Zaino. Zingatia jina la seva pangishi na ichukulie kuwa ya majaribio |
| testnet.zec.rocks:443 | Testnet, yenye instance ya testnet ya Zaino iliyoorodheshwa kwenye zaino.testnet.unsafe.zec.rocks |
| rpc.fastz.cash | Mtandao wa umma wa ztreamer wa Zcash Labs. Angalia status.fastz.cash kwa vituo vya kikanda na hali ya huduma. |

Angalia dashibodi badala ya kutegemea orodha hii. Waendeshaji huja na kuondoka, na ukurasa kama huu hupitwa na wakati.

### Kubadilisha seva kwenye pochi yako

Inafaa kufanya hivyo ikiwa unataka kuchagua mwendeshaji unayemwamini, kusambaza shughuli kati ya waendeshaji, au kuelekeza pochi yako kwenye seva yako mwenyewe.

Njia za menyu zilizo hapa chini zilikuwa sahihi wakati ukurasa huu uliposasishwa, lakini violesura vya pochi hubadilika; kwa hiyo zichukulie kama mwongozo badala ya njia kamili. Tafuta Mipangilio ya Kina au chaguo la seva.

#### ZODL

Hapo awali ilikuwa Zashi. Bofya alama ya gia kwenye kona ya juu kulia, kisha Mipangilio ya Kina. Tor ipo kwenye skrini hiyo hiyo. ZODL pia hutoa njia ya mkato ya Kubadilisha seva hitilafu ya usawazishaji inaposababishwa na seva iliyopitwa na wakati.

#### Zkool

Mrithi wa Ywallet, kutoka kwa msanidi programu huyo huyo (Ywallet yenyewe haitunzwii tena na haiwezi kufuatilia mtandao baada ya Ironwood). Bofya alama ya gia (Fungua Mipangilio) juu ya skrini ya akaunti, kisha uga wa Seva ya Light Node. Kitufe cha orodha kilicho kando yake huchagua kutoka kwa seva zinazojulikana, na swichi ya Direct / Tor / Nym / Proxy iliyo chini yake huweka jinsi pochi inavyounganisha.

#### Zingo

Bofya menyu ya mistari mitatu kwenye kona ya juu kushoto, kisha Mipangilio, halafu telezesha chini.

![Zingo server settings](/content-images/ea8f7672-e644-41a5-a422-db131740404a-2626f5fa79.webp)

#### eZcash

Bofya menyu ya mistari mitatu kwenye kona ya juu kushoto, kisha Mipangilio, halafu Kina.

![eZcash server settings](/content-images/655c0172-61a0-4322-b8cf-4eee4bb53b51-0b93df2e71.webp)

Picha hizo za skrini zilipigwa Machi 2025, na programu zimetoa matoleo mapya tangu wakati huo, kwa hiyo huenda vitufe vimehamishwa.

## Makosa ya Kawaida

**Kudhani seva inaweza kusoma miamala yako**. Haiwezi. Funguo zako hubaki kwenye kifaa chako, na kiasi na jumbe ndani ya miamala ya faragha kikamilifu hubaki zimesimbwa fiche — hata dhidi ya mshambuliaji aliyeathiri seva.

**Kuelewa “ya faragha” kana kwamba inamaanisha “muunganisho usiojulikana”**. Miamala ya faragha hulinda yanayotokea kwenye blockchain. Anwani yako ya IP na nyakati za shughuli zako ni safu tofauti, na hiyo ndiyo hasa seva huiona.

**Kudhani Tor huondoa kila dalili**. Tor huficha IP yako dhidi ya seva, lakini haibadilishi taarifa ambazo seva hujifunza kutokana na maombi unayotuma, na huongeza ucheleweshaji wa usawazishaji.

**Kuamini orodha ya seva iliyo kwenye ukurasa wa wiki**. Waendeshaji huja na kuondoka. Angalia [hosh.zec.rocks](https://hosh.zec.rocks/zec) na [status.fastz.cash](https://status.fastz.cash) ili kujua zinazofanya kazi kwa sasa kabla ya kuelekeza pochi yako kwenye seva yoyote.

## Muhtasari

Pochi nyepesi hukupa bwawa la faragha bila kuhitaji nafasi ya diski, jambo ambalo ni ubadilishanaji mzuri. Elewa tu unachobadilishana. Seva haiwezi kuchukua pesa zako au kusoma kiasi chako cha faragha, lakini inaweza kuona anwani yako ya IP na nyakati unazofanya miamala kwa urahisi. Elekeza muunganisho kupitia Tor, chagua mwendeshaji wako kwa makini, au endesha seva yako mwenyewe.

## Kurasa Zinazohusiana

- [Nani Anaweza Kuona Malipo Yako ya Zcash ](/start-here/who-can-see-your-zcash-payment) — maelezo ya kiwango cha wanaoanza kuhusu swali hilohilo.
- [Mambo Ambayo Kivinjari cha Blocks Kinaweza Kuona](/zcash-tech/what-a-block-explorer-can-see) — yanayoonekana on-chain, tofauti na yale yanayoonekana kwenye seva.
- [Zaino](/zcash-tech/zaino) — michoro ya usanifu na jukumu pana la kiweka faharasa cha Rust.
- [Zinder](/zcash-tech/zinder) — kiweka faharasa cha alpha cha Zcash Foundation, kinachotoa huduma kwa pochi nyepesi kupitia adapta inayooana na lightwalletd.
- [Zebra Full Node](/zcash-tech/zebra-full-node) — validator ambayo seva ya pochi nyepesi husoma data kutoka kwake.
- [Zcash Usawazishaji wa Pochi](/zcash-tech/zcash-wallet-syncing) — jinsi pochi yako inavyochakata blocks fupi zinazotumwa na seva.
- [ztreamer](https://github.com/zcashlabs/ztreamer) — kiweka faharasa cha Rust chenye utendaji wa juu kinachotumiwa na mtandao wa fastz.cash.

**Ilisasishwa mwisho:** Novemba 2026
