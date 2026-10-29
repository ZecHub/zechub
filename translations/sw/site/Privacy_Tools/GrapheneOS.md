<a href="https://github.com/zechub/zechub/edit/main/site/Privacy_Tools/GrapheneOS.md" target="_blank">
  <img src="https://img.shields.io/badge/Edit-blue" alt="Edit Page"/>
</a>

# Mfumo wa Uendeshaji wa Graphene

## TL;DR

- **GrapheneOS** ni mfumo endeshi wa simu usio wa faida, unaolenga faragha na usalama, na unaoendana kikamilifu na programu za kila siku Android
- Nguvu kuu: kisanduku cha majaribio cha programu kilichoimarishwa, msimbo salama wa kumbukumbu na upunguzaji wa matumizi, kuwasha kuthibitishwa kunakoungwa mkono na vifaa, ruhusa zilizochongoka, na ulinzi wa mlango wa USB-C wakati kifaa kimefungwa
- Usakinishaji unafanywa kupitia kisakinishi rasmi cha **WebUSB** (kinachopendekezwa kwa watumiaji wengi) au mtiririko wa **mstari wa amri** kwa watumiaji wa kiufundi
- Kwa mtumiaji wa Zcash, ni msingi imara wa kujilinda kwa simu: unganisha na pochi iliyohifadhiwa vizuri na usafi wa kawaida wa OPSEC

GrapheneOS ni mradi usio wa faida, chanzo huria uliojitolea kuimarisha faragha na usalama kwenye vifaa vya mkononi huku ukidumisha utangamano na programu za Android. Mfumo huu wa uendeshaji unatilia mkazo sana katika kuendeleza teknolojia za faragha na usalama, ukilenga hasa kuimarisha sandboxing, kutumia mbinu za kupunguza matumizi, na kuboresha mfumo wa ruhusa. Ulizaliwa mwaka wa 2014 chini ya jina la utani **CopperheadOS**, tangu wakati huo umebadilika na kuwa mlinzi hodari wa faragha na usalama wako wa kidijitali.

Lengo kuu la GrapheneOS ni kuimarisha mipaka ya usalama, kama vile kisanduku cha majaribio cha programu, bila kuathiri vibaya uzoefu wa mtumiaji. 

GrapheneOS inaweza kuanzisha vibadilishaji mbalimbali kwa vipengele maalum, kama vile ruhusa za Mtandao, ruhusa za Vihisi, au vikwazo wakati kifaa kimefungwa (kinachofunika vipengele kama vile vifaa vya pembeni vya USB, ufikiaji wa kamera, na vigae vya haraka). Zaidi ya hayo, vipengele tata zaidi vya faragha na usalama vinavyomkabili mtumiaji vimeundwa kwa uangalifu ili kudumisha hali rahisi kwa mtumiaji, kila kimoja kikiwa na maboresho yake ya kiolesura cha mtumiaji.

## **Vipengele vya GrapheneOS**

**Uimarishaji wa Usalama** GrapheneOS inajumuisha maboresho makubwa ya usalama, kama vile lugha za programu zinazotumia kumbukumbu salama na vipengele vya usalama vinavyotegemea mkusanyaji ili kupunguza udhaifu wa kawaida.

**Sandboxing** Inaimarisha sandboxing ya programu ili kutenganisha programu kutoka kwa nyingine, na kupunguza uwezekano wa mashambulizi.

**Washi Iliyothibitishwa** GrapheneOS hutumia funguo zinazoungwa mkono na vifaa na mchakato wa kuwasha unaoweza kuthibitishwa ili kuhakikisha uadilifu wa mfumo endeshi.

**Ruhusa Zilizoboreshwa** Hutoa udhibiti ulioboreshwa wa ruhusa za programu, na kuwaruhusu watumiaji kurekebisha na kudhibiti data ambayo programu zinaweza kufikia.

**Dashibodi ya Faragha** Watumiaji wanaweza kufuatilia na kudhibiti tabia ya programu kupitia dashibodi ya faragha, na kutoa uwazi katika matumizi ya data.

**Masasisho ya Usalama Yaliyojengwa Ndani** GrapheneOS hutoa masasisho ya usalama kwa wakati unaofaa, kuhakikisha watumiaji wana ulinzi wa hivi karibuni dhidi ya udhaifu.

**Usimbaji Fiche Ulio imara** Inatumia usimbaji fiche wa diski nzima kwa chaguo-msingi, kulinda data iliyohifadhiwa kwenye kifaa.

**Usalama wa Kivinjari Ulioboreshwa** Kivinjari chaguo-msingi kimeundwa kwa ajili ya usalama ulioimarishwa, ikiwa ni pamoja na ulinzi dhidi ya ufuatiliaji.

**Programu Ndogo Zilizosakinishwa** GrapheneOS huja na programu chache zilizosakinishwa awali, hivyo kupunguza hatari zinazowezekana za usalama na faragha.

**Ulinzi wa Lango Hasi la USB** Inatoa ulinzi dhidi ya ufikiaji usioidhinishwa wa kifaa kupitia milango ya USB wakati kifaa kimefungwa.

**Kinga dhidi ya Programu Hasidi** GrapheneOS inajumuisha vipengele vya kugundua na kuzuia programu hasidi inayojulikana.

**Inalenga Faragha** Mfumo wa uendeshaji umeundwa kwa msisitizo mkubwa juu ya faragha ya mtumiaji, kupunguza ukusanyaji na ufichuzi wa data.

**Chanzo Huria** Ni mradi wa chanzo huria, unaoruhusu uwazi na michango ya jamii ili kuboresha usalama.

**Sera za Usalama Zinazoweza Kubinafsishwa** Watumiaji wana uwezo wa kubinafsisha sera mbalimbali za usalama ili ziendane na mapendeleo yao.

**Utangamano** GrapheneOS inajitahidi kudumisha utangamano na programu za Android, ili watumiaji waweze kuendelea kutumia programu wanazozipenda huku wakinufaika na vipengele vilivyoimarishwa vya usalama na faragha.

## **Kusakinisha GrapheneOS**

Kama ilivyoelezwa katika sehemu ya utendaji bora, inashauriwa kutumia mwongozo rasmi wa usakinishaji unaopendekezwa. Kuna njia mbili za kusakinisha GrapheneOS ambazo ni kwa kutumia [Kisakinishi WebUSB-based](https://grapheneos.org/install/web) au kutumia [mwongozo wa usakinishaji wa mstari wa amri](https://grapheneos.org/install/cli)

**Usakinishaji Unaotegemea USB ya Wavuti** Ili kusakinisha GrapheneOS kwa kutumia njia ya usakinishaji wa Wavuti, kwa kawaida utahitaji nyenzo na rasilimali zifuatazo:

- 2GB ya kumbukumbu ya bure na 32GB ya nafasi ya bure ya kuhifadhi.
- Kebo ya USB (A au C)
- Mfumo Endeshi Unaoungwa Mkono: Windows 10, Windows 11, macOS Big Sur (11 - 13), Arch Linux, Debian (10 - 12), Ubuntu (22.04, 22.10 na 23.04), ChromeOS, GrapheneOS, Google Android (OS ya Pixel)
- Vivinjari Vinavyotumika: Chromium (haitumiki na Ubuntu), Vanadium (GrapheneOS), Google Chrome, Microsoft Edge, Kivinjari Kinachotumia Brave.

Angalia Mwongozo wa usakinishaji kupitia kiungo kilicho hapa chini na ufuate mchakato wa usakinishaji

[Mwongozo wa Kisakinishi cha Wavuti GrapheneOS](https://grapheneos.org/install/web#prerequisites)

**Usakinishaji wa Laini ya Amri** Usakinishaji wa laini ya amri haupendekezwi kwa watumiaji ambao hawajaelekezwa kitaalamu na zana na rasilimali zilizo hapa chini zinahitajika kwa Usakinishaji wa Laini ya Amri;

- Unapaswa kuwa na angalau 2GB ya kumbukumbu ya bure inayopatikana na 32GB ya nafasi ya bure ya kuhifadhi
- Kebo ya USB (A au C)
- Mfumo Endeshi Unaoungwa Mkono Windows 10 Windows 11 macOS Big Sur (11) macOS Monterey (12) macOS Ventura (13) Arch Linux Debian 10 (buster) Debian 11 (bullseye) Debian 12 (bookworm) Ubuntu 20.04 LTS Ubuntu 22.04 LTS Ubuntu 22.10 Ubuntu 23.04
- Kisakinishi cha Wavuti kutoka Android, ChromeOS au GrapheneOS

Angalia Mwongozo wa usakinishaji kupitia kiungo kilicho hapa chini na ufuate mchakato wa usakinishaji 

[Usakinishaji wa Mstari wa Amri](https://grapheneos.org/install/cli#prerequisites)

## **Kazi Bora**

**Weka Mfumo wa Uendeshaji Upya** Sasisha GrapheneOS mara kwa mara ili kuhakikisha una viraka na maboresho ya usalama ya hivi karibuni.

**Tumia Manenosiri Madhubuti** Weka manenosiri thabiti na ya kipekee kwa ajili ya usimbaji fiche wa kifaa na kuingia kwenye programu ili kuzuia ufikiaji usioidhinishwa.

**Ruhusa za Programu** Kagua na udhibiti ruhusa za programu kwa uangalifu, ukitoa tu kile kinachohitajika kwa kila programu kufanya kazi.

**Nakala Rudufu za Kawaida** Fanya nakala rudufu za data yako mara kwa mara iwapo kifaa kitapoteza au kuharibika kwa data.

**Simba Hifadhi** Ikiwa haijawezeshwa kwa chaguo-msingi, simba hifadhi ya kifaa chako ili kulinda data yako ikiwa kifaa kitapotea au kuibiwa.

**Skrini Salama ya Kufunga** Tumia skrini salama ya kufunga, kama vile PIN, nenosiri, au uthibitishaji wa kibiometriki, ili kuzuia ufikiaji usioidhinishwa.

**Epuka Kuweka Mizizi kwenye Kifaa chako Android** Epuka kuweka mizizi au kufungua kidhibiti cha bootloader, kwani hii inaweza kudhoofisha usalama wa kifaa.

**Thibitisha Vyanzo vya Programu** Thibitisha uhalisi wa programu na vyanzo vyake ili kuepuka kusakinisha programu hasidi.

**Sakinisha Kivinjari Kinachozingatia Faragha** Fikiria kutumia kivinjari kinachozingatia faragha kama vile kivinjari cha Brave, Firefox au Bromite kwa ajili ya kuvinjari kwa usalama.

**Kagua Programu Mara kwa Mara** Kagua na uondoe programu ambazo hutumii tena au huziamini ili kupunguza eneo la mashambulizi.

**Wezesha Uthibitishaji wa Vipengele Viwili (2FA)** Wezesha 2FA kwa akaunti zako za mtandaoni ili kuongeza safu ya ziada ya usalama.

**Epuka Wi-Fi ya Umma** Kuwa mwangalifu unapounganisha kwenye mitandao ya Wi-Fi ya umma, kwani inaweza kuwa salama kidogo. Tumia VPN inapohitajika.

**Kuwa mwangalifu na Data ya Eneo** Punguza ufuatiliaji wa eneo kwa programu na fikiria kutumia zana ya kudanganya eneo ikiwa unathamini faragha.

**Epuka Viungo na Viambatisho Visivyojulikana** Kuwa mwangalifu na viungo visivyoombwa na viambatisho vya barua pepe, kwani vinaweza kuwa majaribio ya ulaghai au programu hasidi.

**Pitia Mipangilio Chaguo-Msingi** Pitia kwa uangalifu na urekebishe mipangilio chaguo-msingi ili iendane na mapendeleo yako ya faragha.

**Usaidizi wa Jamii** Jiunge na jumuiya ya GrapheneOS na majukwaa kwa vidokezo, masasisho, na ushauri wa usalama. Unaweza kuwasiliana na timu na kuendelea kupata taarifa kwa kubofya [hapa](https://grapheneos.org/contact) ili kuchunguza mawasiliano zaidi.

**Tumia Mbinu Rasmi ya Usakinishaji** GrapheneOS inatoa mbinu mbili za usakinishaji zinazoungwa mkono rasmi. Watumiaji wanaweza kuchagua kisakinishi WebUSB-based, ambacho kinapendekezwa kwa watu wengi, au wanaweza kufuata mwongozo wa usakinishaji wa mstari wa amri, ulioundwa kwa watumiaji wenye mwelekeo zaidi wa kitaalamu.

## **Hitimisho**

Kimsingi, GrapheneOS inalenga kutoa mfumo mbadala wa uendeshaji wa simu unaoweka kipaumbele faragha na usalama wa watumiaji wake, na kuwapa udhibiti mkubwa zaidi wa maisha yao ya kidijitali huku ikitoa utangamano na programu wanazotegemea. Ni mradi unaolenga kuweka kiwango cha juu cha usalama na faragha ya vifaa vya mkononi katika enzi ambayo masuala haya ni muhimu sana.

## Kurasa zinazohusiana

- [Wajumbe Salama](Secure_Messengers.md) — mawasiliano ya faragha kwenye kifaa kilichoimarishwa
- [Usimbaji fiche wa PGP](PGP_Encryption.md) — ubadilishanaji wa barua pepe na faili kwa njia fiche
- [VPN na DVPN](VPN_and_DVPN.md) — faragha ya safu ya mtandao kwenye simu
- [Vivinjari vya Wavuti](Web_Browsers.md) — kuchagua na kuimarisha kivinjari cha simu
