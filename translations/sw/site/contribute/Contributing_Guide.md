<a href="https://github.com/zechub/zechub/edit/main/site/contribute/Contributing_Guide.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Kuchangia kwa ZecHub

ZecHub husaidia watu kujifunza kuhusu Zcash. Ikiwa unasoma ukurasa huu, tunafurahi sana kwamba unafikiria kuchangia! Mchango wowote utakaotoa utaonekana kwenye [zechub.wiki](https://www.zechub.wiki/) na mitandao mingine ya kijamii ya ZecHub.

### Wachangiaji wapya

Ili kupata muhtasari wa ZecHub, soma [README](https://github.com/ZecHub/zechub/blob/main/README.md).


### Kuanza

ZecHub hutumia GitHub kusimamia michango ya jamii. Ikiwa wewe ni mpya kwa GitHub, usiwe na wasiwasi! Tutafafanua jinsi unavyoweza kushiriki kama mchangiaji wa jamii kwa ZecHub. Tunatoa zawadi ndogo katika ZEC ya faragha [shielded] kwa mchango unaokubaliwa. Kiasi cha zawadi hakijawekwa bila kubadilika katika ZEC — tazama [Jinsi zawadi zinavyowekwa](#how-rewards-are-set). Katika mwongozo huu utapata muhtasari wa mchakato wa kuchangia, kuanzia kufungua tiketi [issue], kuunda ombi la kuvuta [pull request] (PR), kukagua, hadi kuunganisha PR.


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/8eYDTyV39a4"
    title="How to Contribute to ZecHub!"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>


### Jiunge na mazungumzo

Kwanza, jiunge na mazungumzo kupitia [viungo vya jamii](https://zechub.wiki/zcash-community/community-links).

### Miongozo ya mtindo

Mchango wowote kwa ZecHub unapaswa kufuata mwongozo wa mtindo wa [ZecHub](https://zechub.wiki/contribute/style-guide). Hii inajumuisha wiki, nyaraka na maudhui ya mitandao ya kijamii.

### Njia unazoweza kuchangia

ZecHub ni mradi unaoongozwa na jamii unaolenga kutoa msaada na rasilimali kwa watumiaji na wasanidi programu [developers] wa Zcash. Kuna njia nyingi za kushiriki katika ZecHub, zikiwemo kuandika kwa jarida letu la habari [newsletter] la kila wiki, kuchangia kwenye msingi wetu wa maarifa, au kusaidia miradi ya maendeleo.

Hizi ni aina za michango ambazo ZecHub inakubali kwa sasa:

### Jinsi zawadi zinavyowekwa

Zawadi ndogo hulipwa katika ZEC ya faragha. Namba za ZEC zilizokuwa katika vichwa hapa chini zilikuwa picha za kihistoria kwa kiwango cha zamani cha ZEC/USD. Usizichukulie kama viwango vya sasa.

Jinsi kiasi kinavyochaguliwa:

1. Linganisha kazi na wigo wa USD katika sera ya [kiasi cha zawadi](https://bounties.zechub.wiki/docs/bounty-amounts).
2. Chagua lengo ndani ya wigo huo — si kiotomati kiwango cha juu zaidi.
3. Badilisha kwa kiwango cha hadharani cha papo hapo cha ZEC/USD na uweke ZEC kwenye zawadi:

```
zec_to_enter = usd_target / zec_usd_spot
```

Zungusha hadi sehemu 4 za desimali. Faili ya sera ndiyo chanzo pekee cha ukweli. Ikiwa ukurasa huu na faili hiyo vinatofautiana, sera ndiyo inayoshinda.

Kazi zinazolipwa zimeorodheshwa kwenye [ZEC Bounties](https://bounties.zechub.wiki/).

<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/Lb5Bvl1GkRQ"
    title="ZecBounties Explained | Earn ZEC by Contributing"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Hali tatu ambazo si sawa:

1. **Imeunganishwa** — PR imekubaliwa kwenye hazina.
2. **Zawadi imeidhinishwa** — mfadhili au DAO inakubali kwamba zawadi inadaiwa, na kiasi chake.
3. **Imelipwa** — ZEC hufika kwenye Anwani yako Iliyounganishwa ya faragha.

Mchango uliounganishwa hauidhinishi zawadi wenyewe. Zawadi iliyoidhinishwa si malipo [payment] yaliyokamilika.

#### Kazi ya usanidi

Kazi yoyote ya usanidi iliyoidhinishwa inayosaidia kujenga mfumo ikolojia wa Zcash. Hii inaweza kujumuisha wiki yetu, pochi [wallets] mpya, au programu yoyote unayoweza kuifikiria.

#### Mafunzo ya Zcash (video)

Hapa chini kuna mfano wa mafunzo:


<div className="my-8 w-full aspect-video max-w-3xl mx-auto rounded-2xl overflow-hidden shadow-lg bg-black">
  <iframe
    className="w-full h-full"
    src="https://www.youtube.com/embed/qz4KzDjkqu8"
    title="WSL Install + zcashd Compile/Transaction Tutorial"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
    allowFullScreen
    loading="lazy"
  />
</div>

Unda na ushiriki mafunzo kuhusu programu za Zcash, kisha upate zawadi. Tuma PR kwa zechub/tutorials au tuma video kwenye chaneli ya #video-content katika Discord. Ikiwa video inatimiza vigezo vyetu, tutaichapisha na kukupa zawadi ndogo.

#### Wiki ya ZecHub - ukurasa mpya wa wiki uliochapishwa

Tovuti yetu ya wiki hutoa nyenzo za elimu za Zcash katika muundo rahisi na unaoeleweka. Zcash ni teknolojia ya hali ya juu sana yenye jamii hai, kwa hivyo bado kuna nyaraka zaidi tunazohitaji kuunda. Lengo letu ni kuunda nyaraka kuhusu:

```
- Zcash and its related technologies
- ZEC (Zcash currency) Use cases
- New User Guides
- Zcash Community and Ecosystem
- Privacy Ecosystem & Tools
```

Haya ni maeneo mapana sana, kwa hiyo kuna kazi nyingi za kufanyia kazi. Ikiwa unataka msukumo, angalia [tovuti yetu ya sasa ya wiki-docs](https://zechub.wiki/) na uone kinachokosekana. Mara tu unapobaini unachotaka kuandika, anza kufanya mabadiliko yako na ujifunze jinsi ya kutuma PR kwenye hazina ya ZecHub. Nyaraka zetu zote huundwa na kudumishwa katika hazina hii. Fuata mwongozo wa mtindo wa [ZecHub](https://zechub.wiki/contribute/style-guide) unapoandika ukurasa wa wiki, na tumia ukurasa uliopo katika sehemu hiyo hiyo kama rejeleo la muundo. Baada ya kutuma PR, tafadhali tuma ujumbe kwa @dismad, @squirrel, au @vito katika sehemu ya #zechub ya discord, nao watakagua PR yako na kuiunganisha ikiwa iko tayari kuongezwa kwenye tovuti. Ikiunganishwa, wataongeza nyaraka kwenye tovuti ya ZecHub. Ikiwa nyaraka hazijawa tayari, watakupendekezea marekebisho katika PR.

#### Wiki ya ZecHub - ukurasa wa wiki uliotafsiriwa

Lengo la ZecHub ni kutoa kitovu cha elimu cha chanzo huria ambacho mtu yeyote katika jamii ya Zcash anaweza kuchangia. Mojawapo ya mafanikio makubwa ya kitovu hiki ni kuona wanajamii wakitafsiri nyenzo za ZecHub katika lugha yao ya eneo.

Dokezo: Kiwango cha juu cha tafsiri za kurasa za Global za ZecHub ni kurasa 10 kwa wiki.

Kurasa za lugha zilizoratibiwa chini ya `translations/<locale>/site/` hufuatiliwa dhidi ya chanzo chake cha Kiingereza kwa manifesti ya hash ya chanzo. Tazama [translation/README-sync.md](https://github.com/ZecHub/zechub/blob/main/translation/README-sync.md) kwa utambuzi wa kupitwa na wakati, mchakato wa usawazishaji, na uthibitishaji wa istilahi zilizolindwa.

#### Wiki ya ZecHub - marekebisho kwa nyaraka zilizopo

Wakati mwingine taarifa zetu katika nyaraka si sahihi kabisa. Hilo ni sawa. Ndiyo sababu tunazifanya kuwa za chanzo huria! Ukipata jambo linalohitaji kubadilishwa katika wiki-doc, tafadhali nenda kwenye kijachini cha nyaraka (kinachounganisha kwenye ukurasa wake wa GitHub) na upendekeze mabadiliko kupitia PR.

#### Wiki ya ZecHub - kiungo kilichovunjika kimerekebishwa

Ukigundua kuwa kiungo kimevunjika, au jambo muhimu limeandikwa vibaya, tafadhali nenda kwenye kijachini cha nyaraka (kinachounganisha kwenye ukurasa wake wa GitHub) na upendekeze mabadiliko kupitia PR.

#### Jarida la habari - toleo jipya

Tunatayarisha jarida la habari la kila wiki la mfumo ikolojia. Hii ni njia rahisi sana ya kushiriki! Jarida la habari hutumwa kila Ijumaa au Jumamosi. Ikiwa unataka kuandika jarida la habari, tuma ujumbe kwa @squirrel katika sehemu ya #zecweekly ya Discord ili kuwajulisha.

Baada ya kufanya hivyo, unaweza kwenda kwenye [sehemu ya jarida la habari ya hazina hii](/newsletter/newsletterbasics.md) na kutuma ombi la kuvuta ili kuunda toleo jipya la jarida la habari. Tafadhali fuata muundo unaotumika katika [kiolezo](/newsletter/newslettertemplate.md) hiki.

Baada ya kufanya hivi, @squirrel au (katika Discord) wataona kwamba toleo lako jipya la jarida la habari linapatikana, na watalikagua kisha kulinganisha kwenye hazina. Baada ya kuunganishwa, watachukua maudhui na kuyachapisha kupitia Substack.

#### Jarida la habari - tafsiri

Kwa sasa tuna matoleo katika Kihispania, Kireno na Kirusi. Matoleo yaliyotafsiriwa huchapishwa kwenye mitandao yao ya kijamii, na tunajitahidi kuyasambaza zaidi kupitia mtandao wa kijamii wa ZecHub.

Ikiwa unataka kutafsiri jarida la habari katika lugha yako ya eneo, tujulishe ni chaneli gani ungeishiriki kutoka humo na lugha ambayo ungechapisha jarida la habari, ili tuweze kuratibu uchapishaji wake.

#### Podikasti - kipindi kilichochapishwa kwenye mitandao ya kijamii ya ZecHub

Je, una wazo la kipindi cha habari, podikasti, mazungumzo ya Twitter, au jambo lingine la video/sauti? Tuambie katika #video-content ya Discord na tutazungumza.

Zawadi za aina hii ya maudhui ni kubwa zaidi kidogo, kwa hivyo pendekezo lingehitaji kutumwa kwa DAO ya ZecHub kabla ya kuidhinisha matumizi hayo.

#### Machapisho bunifu ya mitandao ya kijamii

Tunataka maudhui mapya yanayovutia kwa mitandao yetu ya kijamii. Video fupi, GIF, meme, na machapisho mengine bunifu yanakubaliwa yanapoendana na mwongozo wa mtindo wa [ZecHub](https://zechub.wiki/contribute/style-guide). Kiasi cha zawadi hufuata sera ya [kiasi cha zawadi](https://bounties.zechub.wiki/docs/bounty-amounts).

Unaweza pia kubuni vijipicha vya jarida letu la habari na podikasti. Ikiwa una kipaji cha ubunifu, tutumie ujumbe katika #design kwenye Discord.

#### Mawazo mengine? Tujulishe!

Je, una pendekezo lingine? Tuambie katika #general kwenye Discord. Tunaweza kulijadili na kuona kama DAO ya ZecHub italiunga mkono.

### Kukamilisha

Tafadhali usisite kuanza kuchangia kwenye mojawapo ya itifaki zinazoheshimika zaidi katika sekta hii. Hii ni njia nzuri ya kushiriki katika Zcash. Ikiwa una maswali yoyote kuhusu kuchangia, tafadhali tujulishe kwenye [Discord](#join-the-conversation).

Asante!
